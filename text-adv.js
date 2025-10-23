//Room definition
class room {
  constructor(x, y, floor, exits, dialogue, items) {
    this.x = x; // property
    this.y = y; // property
    this.floor = floor;
    this.exits = exits;
    this.dialogue = dialogue; //property
    this.items = items;
  }
  // methods
  progress() {
  }
  search() {
  }
  loot() {
  }
}

class hall {
  constructor(x, y, floor, exits) {
    this.x = x;
    this.y = y;
    this.floor = floor;
    this.exits = exits;
  }
}

//ground floor
const r_gate =           new room(0,-3, 1, [N]);
const r_path =           new room(0,-2, 1, [N,S]);
const r_door =           new room(0,-1, 1, [N,S]);
const r_mainRoom =       new room(0, 0, 1, [N,E,S,W]);
const r_mainStairsZ1 =   new room(0, 1, 1, [S]);
const r_frontDesk =      new room(-1, 0, 1, [N,E,W]);
const r_deskCloset =     new room(-2, 0, 1, [E,W]);
const r_secretRoom =     new room(-3, 0, 1, [E]);
const r_h_X1Y0 =         new hall(1, 0, 1, [E,W]);
const r_h_X2Y0 =         new hall(2, 0, 1, [N,E,W]);
const r_diningRoom =     new room(3, 0, 1, [E,W]);
const r_kitchen =        new room(4, 0, 1, [N,W]);
const r_pantry =         new room(4, 1, 1, [S]);
const r_h_X2Y1 =         new hall(2, 1, 1, [N,S]);
const r_lounge =         new room(3, 1, 1, [E,S]);
const r_poolRoom =       new room(3, 2, 1, [W]);
const r_h_Xn1Y1 =        new hall(-1, 1, 1, [S,W]);
const r_h_Xn2Y1 =        new hall(-2, 1, 1, [E,W]);
const r_h_Xn3Y1 =        new hall(-3, 1, 1, [E,W]);
const r_greenhouse =     new hall(-4, 1, 1, [E,W]);

//upper floor
const r_mainStairsZ2 =   new room(0, 1, 2, [N]);
const r_h_X2Y1Z2 =       new hall(0, 2, 2, [N,S]);

map = 
  //ground floor
  [[ , , , , , , , , ],
   [ , , , , , , , , ],
  ]
  //upper floor
  []

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
