//directions
const N = "north", S = "south", E = "east", W = "west";

//Room definition
class room {
  constructor(x, y, floor, exits [], dialogue = "", items = []) {
    this.x = x;
    this.y = y;
    this.floor = floor;
    this.exits = exits;
    this.dialogue = dialogue; //property
    this.items = items;
  }
  // methods
  search() {}
  loot() {}
}

//create 3d array to store rooms
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
const r_gate =           new room(4, 0, 1, [N]);
const r_path =           new room(4, 1, 1, [N,S]);
const r_door =           new room(4, 2, 1, [N,S]);
const r_mainRoom =       new room(4, 3, 1, [N,E,S,W]);
const r_mainStairsZ1 =   new room(4, 4, 1, [S]);
const r_frontDesk =      new room(3, 3, 1, [N,E,W]);
const r_deskCloset =     new room(2, 3, 1, [E,W]);
const r_secretRoom =     new room(1, 3, 1, [E]);
const r_h_X1Y0 =         new room(5, 3, 1, [E,W]);
const r_h_X2Y0 =         new room(6, 3, 1, [N,E,W]);
const r_diningRoom =     new room(7, 3, 1, [E,W]);
const r_kitchen =        new room(8, 3, 1, [N,W]);
const r_pantry =         new room(8, 4, 1, [S]);
const r_h_X2Y1 =         new room(6, 4, 1, [N,S]);
const r_lounge =         new room(7, 4, 1, [E,S]);
const r_poolRoom =       new room(7, 5, 1, [W]);
const r_h_Xn1Y1 =        new room(3, 4, 1, [S,W]);
const r_h_Xn2Y1 =        new room(2, 4, 1, [E,W]);
const r_h_Xn3Y1 =        new room(1, 4, 1, [E,W]);
const r_greenhouse =     new room(0, 4, 1, [E,W]);

//upper floor (z = 2)
const r_mainStairsZ2 =   new room(4, 4, 2, [N]);
const r_h_X2Y1Z2 =       new room(4, 5, 2, [N,S]);

//list of rooms
const rooms = [
  r_gate, r_path, r_door, r_mainRoom, r_mainStairsZ1,
  r_frontDesk, r_deskCloset, r_secretRoom,
  r_h_X1Y0, r_h_X2Y0, r_diningRoom, r_kitchen,
  r_pantry, r_h_X2Y1, r_lounge, r_poolRoom,
  r_h_Xn1Y1, r_h_Xn2Y1, r_h_Xn3Y1, r_greenhouse,
  r_mainStairsZ2, r_h_X2Y1Z2
];
//fill map with rooms
for (const roomObj of rooms) {
  map[roomObj.x][roomObj.y][roomObj.floor - 1] = roomObj;
}
  
//TERMINAL SCRIPTING
let output_log = "";
document.getElementById("prompt_input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = document.getElementById("prompt_input").value;
    document.getElementById("prompt_input").value = "";
    //output
    output = input + "(output)";
    output_log = output_log + "<br>" + output;
    document.getElementById("output").innerHTML = "<p>" + output_log + "</p>";
  }
}, true);
