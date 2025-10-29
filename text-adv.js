
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
  constructor(health, pattern, damage) {
    //properties
    this.health = health;
    this.pattern = pattern;
    this.damage = damage;
  }
  //methods
  takeDamage(playerAttack) {
    this.health -= playerAttack;
  }
  dealDamage() {
    playerHealth -= this.damage;
  }
}

const m_g_chef = new Monster(5, ["Load", "Shoot", "Block", "Block"], 1);

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
const r_gate =           new Room(4, 0, 1, ["N"], "You see an old, twisted, metal gate, from which, a winding path leads north.");
const r_path =           new Room(4, 1, 1, ["N","S"], "Along the old dirt path you spy the door to a giant mansion to the north through the fog.");
const r_door =           new Room(4, 2, 1, ["N","S"], "You encounter a massive set of oak doors with a sign above them saying 'The Hydrangea Hotel'. However, spraypainted all around the doors are warnings not to go in. Do you proceed north through the doors?");
const r_mainRoom =       new Room(4, 3, 1, ["N","E","S","W"], "A gargantuan main lobby welcomes you in. There is a welcome desk to the west, a stairway to the north, and a hallway to the east.");
const r_mainStairsZ1 =   new Room(4, 4, 1, ["S","U"], "Large wooden stairs loom, leading up to the next floor, and tinted windows cover the walls.");
const r_frontDesk =      new Room(3, 3, 1, ["N","E","W"], "A large wooden desk slouches in the corner of a dark room with a sign on it saying 'W lco e'. Around it are dingy couches with suitcases littered around. To your north is a hallway, while to the east is the main lobby and west leads into a closet.");
const r_deskCloset =     new Room(2, 3, 1, ["E","W"], "The closet contains old, rotting coats, the strong smell of mildew, and boots on the floor in neat rows. Cobwebs fill the room and various items are in a state of dissarray. You can hardly see anything, and that is with the door open. Back to the east is the welcome area.");
const r_secretRoom =     new Room(1, 3, 1, ["E"], "The secret door swings open loudly, the rust falling off as the inside reveals a plain room. The walls are filled with shelves with books, and a single table sits in the middle. There are torches along the walls and on the table sits a plain, metal chest with a rusty lock.");
const r_h_X5Y3 =         new Room(5, 3, 1, ["E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the east, and to the west is the main lobby.");
const r_h_X6Y3 =         new Room(6, 3, 1, ["N","E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the north and west, and the east opens up into a room.");
const r_diningRoom =     new Room(7, 3, 1, ["E","W"], "An abandoned dining room has torches along the walls, chairs and dishes strewn along the room, and a twisted wooden table in the midst of the clutter. There is a hallway to the west and another room to the east.");
const r_kitchen =        new Room(8, 3, 1, ["N","W", "S"], "You can clearly see this room was once a kitchen, as pots, pans, and dishes are found in sinks around the area. The room is in disarray, with rotting food thrown across the room, creating a horrible smell. There are rooms to your north, south, and west. As you enter, something that can only be described as a ghost attacks. He is wearing a white apron and has a corrupted bow in front. Before you can move, he loads an arrow and fires, narrowly missing you and slamming the door behind you shut. Your only option now is to fight.", [], m_g_chef);
const r_porch =          new Room(8, 2, 1, ["S","N"], "As you walk in, a clearly recognizable bloody shirt is on the floor, along with dusty footprints that look fresh. This room is clearly a porch, and it has a ripped screen netting around it. Back to your north is the kitchen.");
const r_pantry =         new Room(8, 4, 1, ["S"], "The first thing that you recognize as you walk in is the smell. A combination of blood, rot, and death provides your nose with a reason to fall off your face. You see blood splattered across the room, along with gashes in the wall and rotting food along the floor. Back to the south is the kitchen.");
const r_h_X6Y4 =         new Room(6, 4, 1, ["N","S"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the south and there is a room to the north.");
const r_lounge =         new Room(6, 5, 1, ["E","S"], "Once, the couch that greeets your eyes might be considered comfy, but with the amount of gashes, dust, and mildew on it, you don't feel comfortable trying it anymore. There are bookshelves around the room, and the room looks mostly untouched over the years. There is a hallway to the south and a room to the east.");
const r_poolRoom =       new Room(7, 5, 1, ["W"], "An abandoned dry pit in the middle of this room grabs your attention. After careful consideration, you realize this must have been a pool. Around the room, there are towels with mildew and swim trunks. Back to your west is the lounge.");
const r_h_X3Y4 =         new Room(3, 4, 1, ["S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. To the south is the front desk room and the hallway continues to the west.");
const r_h_X2Y4 =         new Room(2, 4, 1, ["E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues in both directions: east and west.");
const r_h_X1Y4 =         new Room(1, 4, 1, ["N","E","W",], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the east and north, and the west opens into a room.");
const r_greenhouse =     new Room(0, 4, 1, ["E"], "The room is covered in cracked, stained, dirty glass panes. You can spot glimpses of the woods that sorround you out of them. Plants cover the walls, ceiling, and floor and grow out of their containers as they spread around the room. Back to the east is the hallway.");
const r_h_X1Y5 =         new Room(1, 5, 1, ["N","S"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the north and south.");
const r_h_X1Y6 =         new Room(1, 6, 1, ["E","S","W"],  "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the south and there is a room to the east.");
const r_secretRoom_2 =   new Room(0, 6, 1, ["E"], "The door swings open quietly, the hinges well oiled. When it opens, you see an altar made of cracked stone. It is surrounded in an otherworldly light, and you feel drawn to it. As you walk over in a trance, the light suddenly shuts out, the room darkens noticeably and you hear the screaming of thousands, simultaneously saying 'YOU ARE NOT WORTHY! LEAVE NOW, MORTAL FOOL, OR RISK ETERNAL JUDGEMENT!' Do you exit back to the east?");
const r_mapRoom =        new Room(2, 6, 1, ["E","W"], "The room is filled wall to wall with maps. Maps of the universe, of the world, and of the manor. All the mpas are old and fragile, meaning you can't read or pick them up. However, one of the maps has a note scribbled on the bottom corner: 'do not enter the room due west'.");
const r_secretRoom_3 =   new Room(3, 6, 1, ["W"], "You slide past the map to the east and enter a secret room. This room contains absolutely nothing except for a small chair with a book on top. A single torch is fitted into the wall on one side.");

//upper floor (z = 2)
const r_mainStairsZ2 =   new Room(4, 4, 2, ["W","D","E"], "The stairway decends into darkness as youi look down. There is a singular window directly across the spiral staircase and you can see the forest sorrounding you out of it. There are hallways leading to your east and west.");
const r_h_X3Y4Z2 =       new Room(3, 4, 2, ["E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the west and the stairwell is to the east.");
const r_h_X2Y4Z2 =       new Room(2, 4, 2, ["E","S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the east and west and there is a room to your south.");
const r_h_X1Y4Z2 =       new Room(1, 4, 2, ["N","E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches except for . The hallway continues to the east and there are rooms to your north and west. The torch on the west wall looks a little dull...");
const r_laboratory =     new Room(2, 3, 2, ["N"], "The smell of chlorine and chemicals greets your nose as you enter the laboratory. As you enter, you see active experiments occuring, but before you get a good look, the emergency doors slide shut, blocking your view. Do you go back north?);
const r_mirrorMaze =     new Room(1, 5, 2, ["S"], "As you walk in, you are immideatly disoriented by the sheer amount of mirrors. They face every direction, throwing weird reflections across the room. You manage to make it to the center and spot a crossbow sitting on a pedestal. The hallway is to the south.");
const r_secretRoom_4 =   new Room(0, 4, 2, ["E"], "As you pull the fake torch down, the wall splits in half, and you enter the secret room. On the far side of the wall, there is a wierdly shaped banner with a weird pattern on it. The room is comfortbaly furnished and well treated, unlike the other couches you've seen in here. You realize it is the meeting place for someone... Do you exit back east?");
const r_h_X5Y4Z2 =       new Room(5, 4, 2, ["N","E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the east and there are rooms to your north and west.");
const r_h_X6Y4Z2 =       new Room(6, 4, 2, ["S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the west and their is a room to your south.");
const r_sh_X7Y3Z2 =      new Room(7, 3, 2, ["E","W"], "After you twist the lmap, a door opens leading into a hallway. The hallway looks the same as every other: medieval architecture and glowing ethereal torches. It coninues to the east and there is a room to your west.");
const r_h_X8Y3Z2 =       new Room(8, 3, 2, ["N","S","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the west and there are rooms to your north and south.");
const r_breakRoom =      new Room(5, 5, 2, ["S"]);
const r_masterBed =      new Room(6, 3, 2, ["N","E"]);
const r_lockedStairs =   new Room(8, 4, 2, ["S"], "LOCKED");
const r_keyRoom =        new Room(8, 2, 2, ["N"]);
//list of Rooms
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
  r_h_X5Y4Z2, r_h_X6Y4Z2, r_sh_X7Y3Z2, 
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
  for (invObj of inventory) {
    tempOut += invObj ? "["+invObj.name+"]" : "[empty]";
    tempOut += " ";
  }
  rawOutput = tempOut;
}

function load() {
  inventory[0].load()
  rawOutput = "your " + inventory[0].name + " now has " + inventory[0].mag + " uses";
}

function attack() {
  let weaponUsed = inventory[0];
  let monster = currentRoom.monster;
  if (weaponUsed.loadReq <= weaponUsed.mag) {
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
