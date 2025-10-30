
//global
let playerHealth = 10;
let inventory = [null, null, null, null, null, null, null, null];

class Weapon {
  constructor(name, damage, loadAmount, loadReq, mag) {
    this.name = name;
    this.damage = damage;
    this.loadAmount = loadAmount;
    this.loadReq = loadReq;
    this.mag = mag;
  }
  load() {
    this.mag += this.loadAmount;
  }
}

const w_dagger = new Weapon("Dagger", 1, 1, 1, 1); 

//Monster definition
class Monster {
  constructor(health, pattern, damage, name, turn) {
    //properties
    this.turn = turn;
    this.health = health;
    this.pattern = pattern;
    this.damage = damage;
    this.name = name;
    this.patternCount = 0;
  }
  //methods
  takeDamage(playerAttack) {
    this.health -= playerAttack;
  }
  doturn(){
    this.patternCount += 1;
    this.turn = this.pattern[this.patternCount];
  }
  dealDamage() {
    playerHealth -= this.damage;
  }
  deathCheck() {
    if (this.health <= 0) {
      rawOutput = "You have slain " + currentRoom.monster.name;
      currentRoom.monster = null;
      return true;
    } else {
      return false;
    }
  }
}

const m_g_chef =          new Monster(5, ["Load", "Shoot", "Block", "Block"], 1, "Pierre the Polturgeist");
const m_g_hydrangeaSons = new Monster(20, ["Shoot", "Block", "Block", "Shoot", "Shoot", "Shoot", "Block"], 4, "Hydrangea's Sons");

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
  search() {}
  loot() {}
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
const r_frontDesk =      new Room(3, 3, 1, ["N","E","W"], frontDesk_d);
const r_deskCloset =     new Room(2, 3, 1, ["E","W"], deskCloset_d);
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
const r_mainStairsZ2 =   new Room(4, 4, 2, ["W","D","E"], "If you look back down the stairwell, only darkness is visible. There is a singular window directly across the spiral staircase and you can see the forest surrounding you out of it. There are hallways leading to your east and west.");
const r_h_X3Y4Z2 =       new Room(3, 4, 2, ["E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the west and the stairwell is to the east.");
const r_h_X2Y4Z2 =       new Room(2, 4, 2, ["E","S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the east and west, and there is a room to your south.");
const r_h_X1Y4Z2 =       new Room(1, 4, 2, ["N","E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches, except, for one thing... The hallway continues to the east and there are rooms to your north and west. Then it hits you! The torch on the west wall looks a littel dull.");
const r_laboratory =     new Room(2, 3, 2, ["N"], "The smell of chlorine and chemicals greets your nose as you enter the laboratory. As you enter, you see active experiments occuring, but before you get a good look, the emergency doors slide shut, blocking your view. Do you go back north?");
const r_mirrorMaze =     new Room(1, 5, 2, ["S"], "As you walk in, you are immediately disoriented by the sheer amount of mirrors. They face every direction, throwing weird reflections across the room. You manage to make it to the center and spot a crossbow sitting on a pedestal. The hallway is to the south.");
const r_secretRoom_4 =   new Room(0, 4, 2, ["E"], "As you pull the fake torch down, the wall splits in half, and you enter the secret room. On the far side of the wall, there is a wierdly shaped banner with a weird pattern on it. The room is comfortably furnished and well treated, unlike the other couches you've seen in here. You realize it is the meeting place for someone... Do you exit back east?");
const r_h_X5Y4Z2 =       new Room(5, 4, 2, ["N","E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the east and there are rooms to your north and west.");
const r_h_X6Y4Z2 =       new Room(6, 4, 2, ["S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the west and there is a room to your south.");
const r_sh_X7Y3Z2 =      new Room(7, 3, 2, ["E","W"], "After you twist the lamp, a door opens leading into a hallway. The hallway looks the same as every other: medieval architecture and glowing ethereal torches. It coninues to the east and there is a room to your west.");
const r_h_X8Y3Z2 =       new Room(8, 3, 2, ["N","S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the west and there are rooms to your north and south.");
const r_breakRoom =      new Room(5, 5, 2, ["S"], "The room's smell hits you immediately. It smells like a combonation of rot, mildew, and popcorn. There is a small counter with some sort of old machine behind it. There are old, dusty couches in a semicricle around a coffee table to the side. There is a hallway to yuor south.");
const r_masterBed =      new Room(6, 3, 2, ["N","E"], "The bedroom looks pretty similar to a bedroom nowadays, except for the dust and mildew covering everything. There is a shiny new lamp on the east wall and a coffee table next to the bed. The bed itself is a deep red color with curtains on the west side only. There is a hallway to your north.");
const r_lockedStairs =   new Room(8, 4, 2, ["S"], "LOCKED");
const r_keyRoom =        new Room(8, 2, 2, ["N"], "You enter the room and immediately notice something is off. You see two ghost-like creatures hovering across from you, and you sigh, preparing to fight once again. But smomething is different this time; something is wrong. The two ghosts don't look like the others in the manor, they have a skeletal body and head. They simultaneously speak 'Why have you come here, mortal? To die?' Before you can respond, the dooor slams shut behind you and they grab nearby staffs. Their staffs start to glow with an ethereal light and you feel the manor's torches start to flicker. The room is thrown into near darkness, with the only light being their two glowing staffs. From the darknes, you hear a voice, 'Then DIE, mortal'. You prepare to fight this new opponet, with a sinking feeling this might be your last battle in the manor.", [], m_g_hydrangeaSons);
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
inventory[0] = w_dagger;
let currentRoom = r_gate;
document.getElementById("output").innerHTML = "<p>" + currentRoom.dialogue + "</p>";
let outputLog = (currentRoom.dialogue);
document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";

//Commands
let rawOutput;

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
  for (const invObj of inventory) {
    tempOut += invObj ? "["+invObj.name+"]" : "[empty]";
    tempOut += " ";
  }
  rawOutput = tempOut;
}

function swap(slot1,slot2) {
  let tempslot1 = inventory[slot1];
  let tempslot2 = inventory[slot2];
  inventory[slot1] = tempslot2;
  inventory[slot2] = tempslot1;
  showInventory();
}

function load() {
  inventory[0].load()
  rawOutput = "your " + inventory[0].name + " now has " + inventory[0].mag + " uses";
}

function attack() {
  let weaponUsed = inventory[0];
  let monster = currentRoom.monster;
  if (weaponUsed.loadReq <= weaponUsed.mag) {
    if (monster.turn != "Block") {
      monster.takeDamage(weaponUsed.damage);
      weaponUsed.mag -= weaponUsed.loadReq;
      rawOutput = "You attack the " + monster.name + " with your " + weaponUsed.name +", dealing " + weaponUsed.damage +" damage. It has " + monster.health + " health left.";
    }
   } else {
    rawOutput = "Your " + weaponUsed.name + " isn't loaded enough to attack!";
  }
}


//TERMINAL SCRIPTING
let output;
document.getElementById("prompt_input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    //input
    event.preventDefault();
    const userInput = document.getElementById("prompt_input").value;
    const input = userInput.trim().toUpperCase();
    document.getElementById("prompt_input").value = "";

    //pre-turn
    
    //turn
    if (input == "N" || input == "E" || input == "S" || input == "W" || input == "D" || input == "U") {
      move(currentRoom, input);
    } else if (input == "INVENTORY" || input == "INV") {
      showInventory();
    } else if (/^SWAP [0-7] [0-7]$/.test(input)) {
      const slot1 = parseInt(input[5]);
      const slot2 = parseInt(input[7]);
      swap(slot1, slot2);
      } else {
      rawOutput = "Unknown command.";
    }

    
    //output
    output = rawOutput;
    outputLog = outputLog + "<br>" + "&gt;&gt;&gt;" + userInput + "<br>" + output;
    document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";
    document.body.scrollTop = document.body.scrollHeight;
  }
}, true);
