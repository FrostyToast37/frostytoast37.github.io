let output_log = "";

document.getElementById("input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = document.getElementById("input").value;
    document.getElementById("input").value = "";
    
    //output
    output = input + "(output)";
    output_log = output_log + "<br>" + output;
    document.getElementById("output").innerHTML = "<p>" + output_log + "</p>;
  }
}, true);

