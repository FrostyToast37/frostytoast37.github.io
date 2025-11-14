//global
let rawOutput;
let diddyBlud = 3;
let devTest = false;
let devPass = "PASSWORD123";
let devtools = false;
let gameState = "playing";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deadTextAnimation() {
  let text = document.getElementById("output").textContent;
  let randomIndex = 0;
  let iterations = text.length;
  for (i = 0; i < iterations; i++) {
    randomIndex = Math.floor(Math.random() * text.length);
    text = text.slice(0, randomIndex) + text.slice(randomIndex + 1);
    if (i % 5 == 0) {
      document.getElementById("output").textContent = text;
      await sleep(0.005);
    }
  }
}

class Player {
  constructor() {
    this.health = 10;
    this.inventory = [null, null, null, null, null, null, null, null];
    this.turn = "";
  }
  //methods
  deathReset(){
    const itemsToDrop = this.inventory.filter(item => item !== null);
    currentRoom.items.push(...itemsToDrop)
    currentRoom = r_gate;
    this.health = 10;
    this.inventory = [w_dagger, null, null, null, null, null, null, null];
  }
  async deathCheck() {
    if (this.health <= 0 && gameState === "playing") {
      gameState = "dead";
      rawOutput = "<h1>YOU DIED.</h1>";
      outputLog = outputLog + "<br>" + rawOutput;
      document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";

      await sleep(1500);
      await deadTextAnimation();
      await sleep(500)
      this.deathReset();

      outputLog = "";
      rawOutput = "You awake back at the gate. You can continue north back to the mansion.";
      outputLog = rawOutput;
      document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";
      
      gameState = "playing";
      return true;
    }
    else {return false;}
  }
}

const p_player = new Player();

class Item {
  constructor(name, quantity = 1) {
    this.name = name;
    this.quantity = quantity;
  }
}

const i_shells = new Item("shells", 10);

class Weapon {
  constructor(name, type, damage, loadAmount, loadReq, mag, magCap, ammoType) {
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.loadAmount = loadAmount;
    this.loadReq = loadReq;
    this.mag = mag;
    this.magCap = magCap;
    this.ammoType = ammoType;
  }
  load() {
    this.mag += this.loadAmount;
  }
}

const w_dagger =          new Weapon("Dagger", "melee", 2, 1, 0, 0, 0, null); 
const w_candlestick =     new Weapon("Candlestick", "melee", 1, 1, 0, 0, 0, null);
const w_StarterPistol =   new Weapon("Starter Pistol", "ranged", 3, 1, 1, 0, 2, "44magnums"); 
const w_DBshotgun =       new Weapon("Double Barrel Shotgun", "ranged", 5, 2, 1, 0, 2, "shells"); 

//Monster definition
class Monster {
  constructor(health, pattern, damage, name, turn) {
    //properties
    this.turn = turn;
    this.health = health;
    this.pattern = pattern;
    this.damage = damage;
    this.name = name;
    this.patternCount = -1;
  }
  //methods
  takeDamage(playerAttack) {
    this.health -= playerAttack;
  }
  setTurn(){
    this.patternCount = (this.patternCount + 1) % this.pattern.length;
    this.turn = this.pattern[this.patternCount];
  }
  dealDamage() {
    p_player.health -= this.damage;
  }
  doTurn() {
    if (this.turn == "attack") {
      if(p_player.turn != "block") {
        this.dealDamage();
        rawOutput += " The " + this.name + " dealt " + this.damage + " damage to you. You are now at " + p_player.health + " health";
      }
      else {rawOutput += " The " + this.name + "'s attack failed because you blocked.";}
    } 
    else if (this.turn == "load") {
      rawOutput += " The " + this.name + " loaded its weapon."
    }
  }
  deathCheck() {
    if (this.health <= 0) {
      rawOutput += " You have slain " + currentRoom.monster.name;
      currentRoom.monster = null;
      return true;
    } else {
      return false;
    }
  }
}

const m_g_chef =          new Monster(5, ["load", "attack", "block", "block"], 1, "Pierre the Polturgeist");
const m_g_hydrangeaSons = new Monster(20, ["attack", "block", "load", "load", "attack", "attack", "block", "block"], 4, "Hydrangea's Sons");

//Room definition
class Room {
  constructor(x, y, floor, exits = [], dialogue = "", items = [], monster = null) {
    this.x = x;
    this.y = y;
    this.z = floor;
    this.exits = exits;
    this.dialogue = dialogue; //property
    this.items = items;
    this.monster = monster;
  }
  // methods
  search() {
    let itemList = "";
    for (const itemObj of this.items) {
      itemList += "a " + itemObj.name + ", ";
    }
    if (currentRoom.items.length == 0) {
      itemList = "nothing"
    }
    rawOutput = "In this room you find " + itemList;
  }
  
}

//create 3d array to store Rooms
let map = [];
let length = 9, width = 7, floors = 3;
for (let x = 0; x < length; x++) {
  map[x] = [];
  for (let y = 0; y < width; y++) {
    map[x][y] = []
    for (let z = 0; z < floors; z++) {
      map[x][y][z] = null;
    }
  }
}

//Room Object creations
//ground floor (z = 1)

const r_gate =           new Room(4, 0, 1, ["N"], gate_d);
const r_path =           new Room(4, 1, 1, ["N","S"], path_d);
const r_door =           new Room(4, 2, 1, ["N","S"], door_d);
const r_mainRoom =       new Room(4, 3, 1, ["N","E","S","W"], mainRoom_d);
const r_mainStairsZ1 =   new Room(4, 4, 1, ["S","U"], mainStairsZ1_d);
const r_frontDesk =      new Room(3, 3, 1, ["N","E","W"], frontDesk_d, [w_candlestick,i_shells]);
const r_deskCloset =     new Room(2, 3, 1, ["E","W"], deskCloset_d, [w_DBshotgun]);
const r_secretRoom =     new Room(1, 3, 1, ["E"], secretRoom_d);
const r_h_X5Y3 =         new Room(5, 3, 1, ["E","W"], X5Y3h_d);
const r_h_X6Y3 =         new Room(6, 3, 1, ["N","E","W"], X6Y3h_d);
const r_diningRoom =     new Room(7, 3, 1, ["E","W"], diningRoom_d);
const r_kitchen =        new Room(8, 3, 1, ["N","W", "S"], kitchen_d, [], m_g_chef);
const r_porch =          new Room(8, 2, 1, ["S","N"], porch_d);
const r_pantry =         new Room(8, 4, 1, ["S"], pantry_d);
const r_h_X6Y4 =         new Room(6, 4, 1, ["N","S"], X6Y4h_d);
const r_lounge =         new Room(6, 5, 1, ["E","S"], lounge_d);
const r_poolRoom =       new Room(7, 5, 1, ["W"], pool_d);
const r_h_X3Y4 =         new Room(3, 4, 1, ["S","W"], X3Y4h_d);
const r_h_X2Y4 =         new Room(2, 4, 1, ["E","W"], X2Y4h_d);
const r_h_X1Y4 =         new Room(1, 4, 1, ["N","E","W",], X1Y4h_d);
const r_greenhouse =     new Room(0, 4, 1, ["E"], greenhouse_d);
const r_h_X1Y5 =         new Room(1, 5, 1, ["N","S"], X1Y5h_d);
const r_h_X1Y6 =         new Room(1, 6, 1, ["E","S","W"], X1Y6h_d);
const r_secretRoom_2 =   new Room(0, 6, 1, ["E"], secretRoom2_d);
const r_mapRoom =        new Room(2, 6, 1, ["E","W"], mapRoom_d);
const r_secretRoom_3 =   new Room(3, 6, 1, ["W"], secretRoom3_d);

//upper floor (z = 2)
const r_mainStairsZ2 =   new Room(4, 4, 2, ["W","D","E"], mainStairsZ2_d);
const r_h_X3Y4Z2 =       new Room(3, 4, 2, ["E","W"], X3Y4Z2h_d);
const r_h_X2Y4Z2 =       new Room(2, 4, 2, ["E","S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the east and west, and there is a room to your south.");
const r_h_X1Y4Z2 =       new Room(1, 4, 2, ["N","E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches, except, for one thing... The hallway continues to the east and there are rooms to your north and west. Then it hits you! The torch on the west wall looks a little dull.");
const r_laboratory =     new Room(2, 3, 2, ["N"], "The smell of chlorine and chemicals greets your nose as you enter the laboratory. As you enter, you see active experiments occurring, but before you get a good look, the emergency doors slide shut, blocking your view. Do you go back north?");
const r_mirrorMaze =     new Room(1, 5, 2, ["S"], "As you walk in, you are immediately disoriented by the sheer amount of mirrors. They face every direction, throwing weird reflections across the room. You manage to make it to the center and spot a crossbow sitting on a pedestal. The hallway is to the south.");
const r_secretRoom_4 =   new Room(0, 4, 2, ["E"], "As you pull the fake torch down, the wall splits in half, and you enter the secret room. On the far side of the wall, there is a weirdly shaped banner with a interesting pattern on it. The room is comfortably furnished and well treated, unlike the other couches you've seen in here. You realize it is the meeting place for someone... Do you exit back east?");
const r_h_X5Y4Z2 =       new Room(5, 4, 2, ["N","E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the east and there are rooms to your north and west.");
const r_h_X6Y4Z2 =       new Room(6, 4, 2, ["S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the west and there is a room to your south.");
const r_sh_X7Y3Z2 =      new Room(7, 3, 2, ["E","W"], "After you twist the lamp, a door opens leading into a hallway. The hallway looks the same as every other: medieval architecture and glowing ethereal torches. It coninues to the east and there is a room to your west.");
const r_h_X8Y3Z2 =       new Room(8, 3, 2, ["N","S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the west and there are rooms to your north and south.");
const r_breakRoom =      new Room(5, 5, 2, ["S"], "The room's smell hits you immediately. It smells like a combination of rot, mildew, and popcorn. There is a small counter with some sort of old machine behind it. There are old, dusty couches in a semicircle around a coffee table to the side. There is a hallway to your south.");
const r_masterBed =      new Room(6, 3, 2, ["N","E"], "The bedroom looks pretty similar to a bedroom nowadays, except for the dust and mildew covering everything. There is a shiny new lamp on the east wall and a coffee table next to the bed. The bed itself is a deep red color with curtains on the west side only. There is a hallway to your north.");
const r_lockedStairs =   new Room(8, 4, 2, ["S"], "LOCKED");
const r_keyRoom =        new Room(8, 2, 2, ["N"], "You enter the room and immediately notice something is off. You see two ghost-like creatures hovering across from you, and you sigh, preparing to fight once again. But something is different this time; something is wrong. The two ghosts don't look like the others in the manor, they have a skeletal body and head. They simultaneously speak 'Why have you come here, mortal? To die?' Before you can respond, the dooor slams shut behind you and they grab nearby staffs. Their staffs start to glow with an ethereal light and you feel the manor's torches start to flicker. The room is thrown into near darkness, with the only light being their two glowing staffs. From the darkness, you hear a voice, 'Then DIE, mortal'. You prepare to fight this new opponent, with a sinking feeling this might be your last battle in the manor.", [], m_g_hydrangeaSons);
const Rooms = [
  r_gate, r_path, r_door, r_mainRoom, r_mainStairsZ1,
  r_frontDesk, r_deskCloset, r_secretRoom,
  r_h_X5Y3, r_h_X6Y3, r_diningRoom, r_kitchen,
  r_pantry, r_h_X6Y4, r_lounge, r_poolRoom,
  r_h_X3Y4, r_h_X2Y4, r_h_X1Y4, r_greenhouse,
  r_mainStairsZ2, r_porch, r_h_X1Y5, r_h_X1Y6, 
  r_secretRoom_2, r_mapRoom, r_secretRoom_3,
  r_h_X3Y4Z2, r_h_X2Y4Z2, r_h_X1Y4Z2,
  r_laboratory, r_mirrorMaze, r_secretRoom_4, 
  r_h_X5Y4Z2, r_h_X6Y4Z2, r_sh_X7Y3Z2, r_masterBed, 
  r_h_X8Y3Z2, r_breakRoom, r_lockedStairs, r_keyRoom
];
//fill map with Rooms
for (const RoomObj of Rooms) {
  map[RoomObj.x][RoomObj.y][RoomObj.z] = RoomObj;
}

//Initializing
p_player.inventory[0] = w_dagger;
let currentRoom = r_gate;
document.getElementById("output").innerHTML = "<p>" + currentRoom.dialogue + "</p>";
let outputLog = (currentRoom.dialogue);
document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";

//Commands

//move
function move(inputRoom, direction) {
  if (!inputRoom.exits.includes(direction)) {
    rawOutput = "You can't go that way."; return;
  }
  let changes = [0, 0, 0];
  if (direction === "N") {changes = [0, 1, 0]}
  if (direction === "E") {changes = [1, 0, 0]}
  if (direction === "S") {changes = [0, -1, 0]}
  if (direction === "W") {changes = [-1, 0, 0]}
  if (direction === "U") {changes = [0, 0, 1]}
  if (direction === "D") {changes = [0, 0, -1]}

  const newRoom = map[inputRoom.x + changes[0]][inputRoom.y + changes[1]][inputRoom.z + changes[2]];
  if (newRoom) {
    currentRoom = newRoom;
    rawOutput = currentRoom.dialogue || "You see nothing special.";
  } else {
    rawOutput = "You can't go that way.";
  }
}

function showInventory(){
  let tempOut = "";
  for (const invObj of p_player.inventory) {
    tempOut += invObj ? "["+invObj.name+"]" : "[empty]";
    tempOut += " ";
  }
  rawOutput = tempOut;
}

function swap(slot1,slot2) {
  let tempslot1 = p_player.inventory[slot1];
  let tempslot2 = p_player.inventory[slot2];
  p_player.inventory[slot1] = tempslot2;
  p_player.inventory[slot2] = tempslot1;
  showInventory();
}

function grab(item) {
  for (const itemObj of currentRoom.items) {
    if (item.toUpperCase() == itemObj.name.toUpperCase()) {
      let slotNum = 0;
      for (const slot of p_player.inventory) {
        if (!slot) {
          p_player.inventory[slotNum] = itemObj;
          currentRoom.items.splice(currentRoom.items.indexOf(itemObj), 1);
          showInventory();
          rawOutput += "You picked up the " + itemObj.name;
          break;
        }
        slotNum += 1;
      }
    }
  }
}

function load() {
  p_player.inventory[0].load()
  rawOutput = "your " + p_player.inventory[0].name + " now has " + p_player.inventory[0].mag + " uses.";
}

function attack() {
  if (!currentRoom.monster) {
  rawOutput = "There's nothing here to attack.";
  return;}
  let weaponUsed = p_player.inventory[0];
  let monster = currentRoom.monster;
  if (weaponUsed.loadReq <= weaponUsed.mag) {
    weaponUsed.mag -= weaponUsed.loadReq;
    if (monster.turn != "block") {
      monster.takeDamage(weaponUsed.damage);
      rawOutput = "You attack " + monster.name + " with your " + weaponUsed.name +", dealing " + weaponUsed.damage +" damage. It has " + monster.health + " health left.";
    } else {
      rawOutput = "You attack, but " + monster.name + " blocks, so your attack doesn't go through."
    }
   } else {
    rawOutput = "Your " + weaponUsed.name + " isn't loaded enough to attack!";
  }
}

function block() {
  if (!currentRoom.monster) {
  rawOutput = "There’s nothing here to block.";
  return;}
  rawOutput  = "You block."
}


//TERMINAL SCRIPTING
let output;
document.getElementById("prompt_input").addEventListener("keypress", 
  async function(inputProcessing) {

    if (gameState === "dead") {
      inputProcessing.preventDefault();
      return;
    }

    if (inputProcessing.key === "Enter") {
      //input
      inputProcessing.preventDefault();
      const userInput = document.getElementById("prompt_input").value;
      const input = userInput.trim().toUpperCase();
      document.getElementById("prompt_input").value = "";

      //pre-turn
      rawOutput = "";
      

      //turn
      if (currentRoom.monster && ["ATTACK", "LOAD", "BLOCK"].includes(input)) {
        currentRoom.monster.setTurn();
      }

      //input handling
        //devtools
          //setting up devtools
      if (input == "DEVTOOLS") {
        devTest = true;
        rawOutput = "You are trying to use devtools, please enter password";
      } else if (devTest == true) {
        if (input == devPass) {
          devtools = true;
          devTest = false;
          rawOutput = "Devtools enabled";
        }
        else {
          devTest = false;
          rawOutput = "Password incorrect";
        }
          //devtools commands
      } else if (/^\//.test(input) && devtools == true) {
        if (/^\/TP \((\d+)\,(\d+)\,(\d+)\)$/.test(input)) {
          let match = input.match(/^\/TP \((\d+),(\d+),(\d+)\)$/);
          currentRoom = map[parseInt(match[1])][parseInt(match[2])][parseInt(match[3])];
          rawOutput = currentRoom.dialogue;
        } else if (/^\/RUN (.+)$/.test(input)) {
          let match = userInput.match(/^\/run (.+)$/i);
          try {
            // Code that might throw an error
            rawOutput = eval(match[1]);
          } catch (error) {
            // Code that runs if an error happens
            rawOutput = error.message;
          }
        } else {
          rawOutput = "dev command invalid";
        }

        //Other commands
      } else if (input == "N" || input == "E" || input == "S" || input == "W" || input == "D" || input == "U") {
        move(currentRoom, input);
      } else if (input == "INVENTORY" || input == "INV") {
        showInventory();
      } else if (input == "SEARCH") {
        currentRoom.search();
      } else if (/^SWAP [0-7] [0-7]$/.test(input)) {
        const slot1 = parseInt(input[5]);
        const slot2 = parseInt(input[7]);
        swap(slot1, slot2);
      } else if (/^GRAB (.+)$/.test(input)) {
        let match = input.match(/^GRAB (.+)$/);
        grab(match[1]);
      }else if (input == "BLOCK") {
        p_player.turn = "block";
      } else if (input == "ATTACK") {
        p_player.turn = "attack";
      } else if (input == "LOAD") {
        p_player.turn = "load";
      } else {
        rawOutput = "Unknown command.";
      }

      //post-turn
      if (p_player.turn == "load") {
        load();
      } else if (p_player.turn == "attack") {
        attack();
      } else if (p_player.turn == "block") {
        block();
      }

      if (currentRoom.monster) {
        currentRoom.monster.deathCheck();
      }
      if (currentRoom.monster) {
        currentRoom.monster.doTurn();
      }
      p_player.turn = "";
      const playerDied = await p_player.deathCheck();
      
      //output 
      if (!playerDied) {
        output = rawOutput;
        outputLog = outputLog + "<br>" + "&gt;&gt;&gt;" + userInput + "<br>" + output;
        document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";
        document.body.scrollTop = document.body.scrollHeight;
      }
    }
  }, true);
