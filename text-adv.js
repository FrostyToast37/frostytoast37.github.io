let output_log = "";

document.getElementById("prompt_input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = document.getElementById("prompt_input").value;
    document.getElementById("prompt_input").value = "";
    
    //output
    output = input + "(output)";
    output_log = "<code>" + output_log + "</code>" + "<br>" + "<code>" + output + "</code>";
    document.getElementById("output").innerHTML = output_log;
  }
}, true);

