let input;
let output_log;
document.getElementById("input_field").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    input = document.forms["input"]["input_field"].value;
    document.forms["input"]["input_field"].value = "";
    
    //output
    output = input
    output_log = output + "<br>" + output_log
    document.getElementById("output").innerHTML = output_log;
  }
}, true);

