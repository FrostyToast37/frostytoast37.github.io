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
const r_path =           new Room(4, 1, 1, ["N","S"], "On the path you spy the door to a giant Mansion to the north through the fog");
const r_door =           new Room(4, 2, 1, ["N","S"], "You encounter a massive set of Oak doors. Above them is a sign saying 'The Hydrangea Hotel', but spraypainted all around are warnings not to go in. Do you proceed north through the doors?");
const r_mainRoom =       new Room(4, 3, 1, ["N","E","S","W"], "A gargantuan main lobby welcomes you in. There is a welcome desk to the west, a stairway to the north, and a hallway to the east.");
const r_mainStairsZ1 =   new Room(4, 4, 1, ["S"]);
const r_frontDesk =      new Room(3, 3, 1, ["N","E","W"]);
const r_deskCloset =     new Room(2, 3, 1, ["E","W"]);
const r_secretRoom =     new Room(1, 3, 1, ["E"]);
const r_h_X1Y0 =         new Room(5, 3, 1, ["E","W"], "The hallway would be completely dark without the gloomy torches on either side of the wall, providing an eerie green light. The torches look like they have been lit for centuries and never go out. The hallway continues to the east, and to the west is the main lobby.");
const r_h_X2Y0 =         new Room(6, 3, 1, ["N","E","W"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the north and west, and the east opens up into a room.");
const r_diningRoom =     new Room(7, 3, 1, ["E","W"], "An abandoned dining room has torches along the walls, chairs and dishes strewn along the room, and a twisted wooden table in the midst of the clutter. There is a hallway to the west and another room to the east.");
const r_kitchen =        new Room(8, 3, 1, ["N","W", "S"], "You can clearly see this room was once a kitchen, as pots, pans, and dishes are found in sinks around the area. The room is in disarray, with rotting food thrown across the room, creating a horrible smell. There are rooms to your north, south, and west.");
const r_porch =          new Room(8, 2, 1, ["S","N"], "As you walk in, a clearly recognizable bloody shirt is on the floor, along with dusty footprints that look fresh. Back to your north is the kitchen.");
const r_pantry =         new Room(8, 4, 1, ["S"], "The first thing that you recognize as you walk in is the smell. A combination of blood, rot, and death provides your nose with a reason to fall off your face. You see blood splattered across the room, along with gashes in the wall and rotting food along the floor. Back to the south is the kitchen");
const r_h_X2Y1 =         new Room(6, 4, 1, ["N","S"], "The hallway looks the same as every other: medieval architecture and glowing ethereal torches. The hallway continues to the south and there is a room to the north.");
const r_lounge =         new Room(7, 4, 1, ["E","S"], "Once, the couch that greeets your eyes might be considered comfy, but with the amount of gashes, dust, and mildew on it, you don't feel comfortable trying it anymore. There are bookshelves around the room, and the room looks mostly untouched over the years. There is a hallway to the south and a room to the east.");
const r_poolRoom =       new Room(7, 5, 1, ["W"], "An abandoned dry pit in the middle of this room grabs your attention. After careful consideration, you realize this must have been a pool. Around the room, there are towels with mildew and swim trunks. Back to your west is the lounge.");
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
  r_mainStairsZ2, r_h_X2Y1Z2, r_porch
];
//fill map with Rooms
for (const RoomObj of Rooms) {
  map[RoomObj.x][RoomObj.y][RoomObj.z] = RoomObj;
}

//Initializing
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
