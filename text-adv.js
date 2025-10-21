let output_log = "";

// Class definition
class Room {
  constructor(x, y, dialogue, items) {
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
