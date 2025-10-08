document.getElementById("input_field").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    
    let input = document.forms["input"]["input_field"].value;
    
    document.forms["input"]["input_field"].value = "";
  }
}, true);
