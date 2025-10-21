//Room definition
class room {
  constructor(x, y, floor, dialogue, items) {
    this.x = x; // property
    this.y = y; // property
    this.dialogue = dialogue; //property
  }
  // methods
  search() {
  }
  loot() {
  }
}

new const r_gate = new room(0,-3, 1);
new const r_path = new room(0,-2, 1);
new const r_door = new room(0,-1, 1);
new const r_mainRoom = new room(0, 0, 1);
new const r_mainStairsZ1 = new room(0, 1, 1);
new const r_mainStairsZ2 = new room(0, 1, 2);
new const r_frontDesk = new room(-1, 0, 1);
new const r_deskCloset = new room(-2, 0, 1);
new const r_secretRoom = new room(-3, 0, 1);
new const r_hallwayX1Y0 = new room(1, 0, 1);
new const r_hallwayX2Y0 = new room(2, 0, 1);
new const r_diningRoom = new room(3, 0, 1);
new const r_kitchen = new room(4, 0, 1);


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
