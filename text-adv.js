let output_log = "";

document.getElementById("prompt_input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = document.getElementById("prompt_input").value;
    document.getElementById("prompt_input").value = "";
    
    //output
    output = input + "(output)";
    output_log = "<p>" + output_log "</p>" + "<p>" + output + "</p>";
    document.getElementById("output").innertext =  output_log;
  }
}, true);
