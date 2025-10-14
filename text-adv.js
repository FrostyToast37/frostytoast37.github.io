let output_log = "";

document.getElementById("input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = document.getElementById("input").value;
    document.getElementById("input").value = "";
    
    //output
    output = input + "(output)";
    output_log = "<p>" + output_log + output + "</p>";
    document.getElementById("output").innerHTML = output_log;
  }
}, true);

