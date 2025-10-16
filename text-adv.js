let output_log = "&nbsp;";

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

