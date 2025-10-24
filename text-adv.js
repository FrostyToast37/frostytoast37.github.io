//Room definition
class Room {
  constructor(x, y, floor, exits = [], dialogue = "", items = []) {
    this.x = x;
    this.y = y;
    this.z = floor - 1;
    this.exits = exits;
    this.dialogue = dialogue; //property
    this.items = items;
  }
  // methods
  search() {}
  loot() {}
}

//create 3d array to store Rooms
let map = [];
let length = 9, width = 7, floors = 2;
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
const r_gate =           new Room(4, 0, 1, ["N"], "You see a big open gate, a path continues North through the gate");
const r_path =           new Room(4, 1, 1, ["N","S"], "On the path you spy the door to a giant Mansion through the fog");
const r_door =           new Room(4, 2, 1, ["N","S"]);
const r_mainRoom =       new Room(4, 3, 1, ["N","E","S","W"]);
const r_mainStairsZ1 =   new Room(4, 4, 1, ["S"]);
const r_frontDesk =      new Room(3, 3, 1, ["N","E","W"]);
const r_deskCloset =     new Room(2, 3, 1, ["E","W"]);
const r_secretRoom =     new Room(1, 3, 1, ["E"]);
const r_h_X1Y0 =         new Room(5, 3, 1, ["E","W"]);
const r_h_X2Y0 =         new Room(6, 3, 1, ["N","E","W"]);
const r_diningRoom =     new Room(7, 3, 1, ["E","W"]);
const r_kitchen =        new Room(8, 3, 1, ["N","W"]);
const r_pantry =         new Room(8, 4, 1, ["S"]);
const r_h_X2Y1 =         new Room(6, 4, 1, ["N","S"]);
const r_lounge =         new Room(7, 4, 1, ["E","S"]);
const r_poolRoom =       new Room(7, 5, 1, ["W"]);
const r_h_Xn1Y1 =        new Room(3, 4, 1, ["S","W"]);
const r_h_Xn2Y1 =        new Room(2, 4, 1, ["E","W"]);
const r_h_Xn3Y1 =        new Room(1, 4, 1, ["E","W"]);
const r_greenhouse =     new Room(0, 4, 1, ["E","W"]);

//upper floor (z = 2)
const r_mainStairsZ2 =   new Room(4, 4, 2, ["N"]);
const r_h_X2Y1Z2 =       new Room(4, 5, 2, ["N","S"]);

//list of Rooms
const Rooms = [
  r_gate, r_path, r_door, r_mainRoom, r_mainStairsZ1,
  r_frontDesk, r_deskCloset, r_secretRoom,
  r_h_X1Y0, r_h_X2Y0, r_diningRoom, r_kitchen,
  r_pantry, r_h_X2Y1, r_lounge, r_poolRoom,
  r_h_Xn1Y1, r_h_Xn2Y1, r_h_Xn3Y1, r_greenhouse,
  r_mainStairsZ2, r_h_X2Y1Z2
];
//fill map with Rooms
for (const RoomObj of Rooms) {
  map[RoomObj.x][RoomObj.y][RoomObj.z] = RoomObj;
}

//starting room
let currentRoom = r_gate;
document.getElementById("output").innerHTML = "<p>" + currentRoom.dialogue + "</p>";

//Commands
let rawOutput;
//move
function move(inputRoom, direction) {
  if (!inputRoom.exits.includes(direction)) {
    rawOutput = "You can't go that way."; return;
  }
  let changes = [0, 0, 0];
  if (direction === "N") changes = [0, 1, 0];
  if (direction === "E") changes = [1, 0, 0];
  if (direction === "S") changes = [0, -1, 0];
  if (direction === "W") changes = [-1, 0, 0];

  const newRoom = map[inputRoom.x + changes[0]][inputRoom.y + changes[1]][inputRoom.z + changes[2]];
  if (newRoom) {
    currentRoom = newRoom;
    rawOutput = currentRoom.dialogue || "You see nothing special.";
  } else {
    rawOutput = "You can't go that way.";
  }
}



//TERMINAL SCRIPTING
let output;
let outputLog = "";
document.getElementById("prompt_input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    //input
    event.preventDefault();
    const input = document.getElementById("prompt_input").value.trim().toUpperCase();
    document.getElementById("prompt_input").value = "";

    //turn
    if (input == "N" || input == "E" || input == "S" || input == "W") {
      move(currentRoom, input);
    } else {
      rawOutput = "Unknown command.";
    }

    
    //output
    output = rawOutput;
    outputLog = outputLog + "<br>" + output;
    document.getElementById("output").innerHTML = "<p>" + outputLog + "</p>";
  }
}, true);
