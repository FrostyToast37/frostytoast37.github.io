let gameboard = [], row = 20, col = 20, off = ".", on = "#";
let goAround = [[-1,1],[0,1],[1,1],
                [-1,0],[0,0],[1,0],
               [-1,-1],[0,-1],[1,-1]
// Initialize gameboard with "off" values
for (let i = 0; i < row; i++) {
  let temp = [];
  for (let j = 0; j < col; j++) {
    temp[j] = off;
  }
  gameboard.push(temp);
}

// Function to create the table
function createTableWithInnerHTML() {
  let tableHTML = '<table id="gameboard">';

  // Generate the table rows and cells
  for (let i = 0; i < row; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < col; j++) {
      // Use unique IDs for each cell using concatonation
      tableHTML += '<td onclick="change('+i+','+j+')" id="cell-'+i+','+j+'" class="off">' + gameboard[i][j] + '</td>';
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  // Append the generated table to the body
  document.body.innerHTML += tableHTML;
}

// Function to change the value of the clicked cell
function change(i, j) {
  // Get the correct cell by ID and change its content to "on" value
  let cell = document.getElementById('cell-'+i+','+j+'');
  if (cell.className == "off") {
    cell.innerHTML = on;
    cell.className = "on";
  }
  else if (cell.className == "on") {
    cell.innerHTML = off;
    cell.className = "off";
  }
}
function updateBoard() {
  for (i = 0; i < row; j++) {
    for (j = 0; j < col; j++) {
      for (k = 0; k < 8; k++) {
        
      }
    }
  }

// Call the function to generate the table
createTableWithInnerHTML();
