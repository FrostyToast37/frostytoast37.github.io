let gameboard = [], row = 20, col = 20, off = ".", on = "#";
let neighbors = [[-1, 1],[0, 1],[ 1, 1],
                 [-1, 0],       [ 1, 0],
                 [-1,-1],[0,-1],[ 1,-1];
let newX, newY, aliveNeighbors;
let running;

// Initialize gameboard with "off" values
for (let x = 0; x < row; x++) {
  let temp = [];
  for (let y = 0; y < col; y++) {
    temp[y] = off;
  }
  gameboard.push(temp);
}

// Function to create the table
function createTableWithInnerHTML() {
  let tableHTML = '<table id="gameboard">';

  // Generate the table rows and cells
  for (let x = 0; x < row; x++) {
    tableHTML += '<tr>';
    for (let y = 0; y < col; y++) {
      // Use unique IDs for each cell using concatonation
      tableHTML += '<td onclick="change('+x+','+y+')" id="cell-'+x+','+y+'" class="off">' + gameboard[x][y] + '</td>';
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  // Append the generated table to the body
  document.body.innerHTML += tableHTML;
}

// Function to change the value of the clicked cell
function changeOn(x, y) {
  // Get the correct cell by ID and change its content to "on" value
  let cell = document.getElementById('cell-'+x+','+y+'');
  cell.innerHTML = on;
  cell.className = "on";

  }
}

function changeOff(x, y) {
  let cell = document.getElementById('cell-'+x+','+y+'');
  cell.innerHTML = off;
  cell.className = "off";
}

function tick() {
  //checks every cell
  for (x = 0; x < row; y++) {
    for (y = 0; y < col; y++) {
      aliveNeighbors = 0;
      //checks every neighbor of the cell
      for (i = 0; i < 8; i++) {
        newX = x + neighbors[i,0];
        newY = y + neighbors[i,1];
        neighbor = gameboard[newX,newY];
        //counts the amount of neighbors that are "on" or alive
        if (neighbor == on) {
          aliveNeighbors += 1;
        }
      }
      //Rules get defined
      //Underpopulation
      if (aliveNeighbors < 2) {
        changeOff(x,y);
      }
      if (aliveNeighbors == 2) {
      }
      if (aliveNeighbors == 3) {
        changeOn(x,y);
      }
      if (aliveNeighbors > 3) {
        changeOff(x,y);
      }
    }
  }
}
function stop() {
  running = false;
}

function start() {
  running = true;
  while(running == true) {
    tick();
  }
}

// Call the function to generate the table
createTableWithInnerHTML();


