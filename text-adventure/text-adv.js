//global
let rawOutput;
let diddyBlud = 3;
let devTest = false;
let devPass = "PASSWORD123";
let devtools = false;
let gameState = "playing";
let outputLog = "";
let viewItems = document.getElementById("view_items");

//utils
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHTML(str) {
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}

//Others

async function deadTextAnimation() {
  let text = document.getElementById("output").textContent;
  let randomIndex = 0;
  let iterations = text.length;
  for (let i = 0; i < iterations; i++) {
    randomIndex = Math.floor(Math.random() * text.length);
    text = text.slice(0, randomIndex) + text.slice(randomIndex + 1);
    if (i % 5 == 0) {
      document.getElementById("output").textContent = text;
      await sleep(10);
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
    currentRoom = map[4][0][1];
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
      await sleep(500);
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
    let dialogue = "";
    let magFree = this.magCap - this.mag;
    let amountToLoad = Math.min(magFree,this.loadAmount)

    if(this.ammoType){

      let ammo = p_player.inventory.find((item) => item && item.name === this.ammoType)

      if (ammo) {
        if(ammo.name == this.ammoType && ammo.quantity >= amountToLoad) {
          this.mag += amountToLoad;
          ammo.quantity -= amountToLoad;
          dialogue = "you used " + amountToLoad + " " + this.ammoType + " to load your " + this.name + ". It now has " + this.mag + " uses.";
        } else {
          dialogue = "You don't have enough " + this.ammoType + " to load your " + this.name + ".";
        }
      } else {
        dialogue = "You don't have any " + this.ammoType + " to load your " + this.name + ".";
      }
        


    } else {
      this.mag += amountToLoad;
      dialogue = "your " + this.name + " now has " + this.mag + " uses.";
    }

    return dialogue;
  }
}

const w_dagger =          new Weapon("Dagger", "melee", 2, 1, 0, 1, 1, null); 
const w_candlestick =     new Weapon("Candlestick", "melee", 1, 1, 0, 1, 1, null);
const w_StarterPistol =   new Weapon("Starter Pistol", "ranged", 3, 1, 1, 0, 6, "44magnums"); 
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

class Food {
    constructor(name, health, uses) {
    //properties
    this.name = name;
    this.health = health;
    this.uses = uses;
  }
  //methods
  eat(eater) {
    eater.health += this.health;
    this.uses -= 1;
  }
}

//Room definition
class Room {
  constructor(id, x, y, floor, exits = [], dialogue = "", items = [], monster = null) {
    this.id = id;
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


const registry = {
  "w_candlestick": w_candlestick,
  "i_shells": i_shells,
  "w_DBshotgun": w_DBshotgun,
  "m_g_chef": m_g_chef,
  "m_g_hydrangeaSons": m_g_hydrangeaSons
};

async function initRooms() {
  const res = await fetch("./rooms.json");
  const data = await res.json();

  data.rooms.forEach(room => {
    const resolvedItems = room.items ? room.items.map(id => registry[id]) : [];
    const resolvedMonster = room.monster ? registry[room.monster] : null;

    const newRoom = new Room(
      room.id,
      room.x, room.y, room.z, 
      room.exits, 
      room.dialogue, 
      resolvedItems, 
      resolvedMonster
    );

    map[room.x][room.y][room.z] = newRoom;

    if (room.id === "r_gate") {
      currentRoom = newRoom;
    }
  });



}

//Initializing
let currentRoom;
async function initWorld() {
  p_player.inventory[0] = w_dagger;
  await initRooms();
  document.getElementById("output").innerHTML = "<p>" + currentRoom.dialogue + "</p>";
  outputLog = (currentRoom.dialogue);
  document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";
}
initWorld();


//Commands
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
  if (p_player.inventory[0] instanceof Weapon) {
    rawOutput = p_player.inventory[0].load();
  }
  else {rawOutput = "You don't have a weapon in your first slot."}
}

function attack() {
  let weaponUsed = p_player.inventory[0];
  if (!currentRoom.monster) {
    if (weaponUsed.mag <= weaponUsed.mag) {
      rawOutput = "There's no monster here... \n  \n So you attacked a wall! The wall remains undamaged.";
    } else {
      rawOutput = "Your " + weaponUsed.name + " isn't loaded enough to attack!";
    }
    return;
  }
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

function drop(slot) {
  let itemToDrop = p_player.inventory[slot];
  p_player.inventory[slot] = null;
  currentRoom.items.push(itemToDrop);

  rawOutput = `you dropped your ${itemToDrop.name}`;
}

function view(slot) {
  let itemToView = p_player.inventory[slot];
  viewItems.classList.toggle("show");
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
            //rawOutput = eval(match[1]); //comment out in production
            rawOutput = "yeah sorry man I disabled this for safety";
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
      } else if (/^DROP (.+)$/.test(input)) {
        let match = input.match(/^DROP (.+)$/);
        drop(match[1]);
      } else if (/^VIEW (.+)$/.test(input)) {
        let match = input.match(/^VIEW (.+)$/);
        view(match[1]);
      } else if (input == "BLOCK") {
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
        let safeInput = escapeHTML(userInput); //sanitize for xss
        outputLog = outputLog + "<br>" + "&gt;&gt;&gt;" + safeInput + "<br>" + output;
        document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";
        document.body.scrollTop = document.body.scrollHeight;
      }
    }
  }, true);
