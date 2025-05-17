let gameboard = [], row = 40, col = 80, off = ".", on = "#";
let neighbors = [[-1, 1],[0, 1],[ 1, 1],
                 [-1, 0],       [ 1, 0],
                 [-1,-1],[0,-1],[ 1,-1]];
let newGameboard, newX, newY, aliveNeighbors;
let intervalId;

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
      // Use unique IDs for each cell using concatenation
      tableHTML += '<td onclick="change('+x+','+y+')" id="cell-'+x+','+y+'" class="off"><div class="content">' + gameboard[x][y] + '</div></td>';
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  // Append the generated table to the body
  document.body.innerHTML += tableHTML;
}

// Function to change the value of the clicked cell
function change(x, y) {
  let cell = document.getElementById('cell-'+x+','+y+'');
  if (cell.className === "off") {
    cell.innerHTML = on;
    cell.className = "on";
    gameboard[x][y] = on;
  } else if (cell.className === "on") {
    cell.innerHTML = off;
    cell.className = "off";
    gameboard[x][y] = off;
  }
}

function live(x, y) {
  // Get the correct cell by ID and change its content to "on" value
  let cell = document.getElementById('cell-'+x+','+y+'');
  cell.innerHTML = on;
  cell.className = "on";
  newGameboard[x][y] = on;
}

function die(x, y) {
  let cell = document.getElementById('cell-'+x+','+y+'');
  cell.innerHTML = off;
  cell.className = "off";
  newGameboard[x][y] = off;
}

function tick() {
  // Create a deep copy of the current gameboard to track the next state
  newGameboard = JSON.parse(JSON.stringify(gameboard));

  // Iterate over each cell to apply the rules
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      aliveNeighbors = 0;

      // Check each neighbor
      for (let i = 0; i < 8; i++) {
        newX = x + neighbors[i][0];
        newY = y + neighbors[i][1];

        // Ensure newX and newY are within bounds
        if (newX >= 0 && newX < row && newY >= 0 && newY < col) {
          let neighbor = gameboard[newX][newY];  // Safe to access now
          if (neighbor === on) {
            aliveNeighbors++;
          }
        }
      }

      // Apply the Game of Life rules
      if (gameboard[x][y] === on) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          die(x, y);  // Cell dies due to underpopulation or overpopulation
        }
      } else {
        if (aliveNeighbors === 3) {
          live(x, y);  // Cell comes to life due to reproduction
        }
      }
    }
  }

  //Update gameboard to new values
  gameboard = newGameboard;
}

function stop() {
  clearInterval(intervalId);
  // Release our intervalId from the variable
  intervalId = null;
}

function start() {
  // Check if an interval has already been set up
  if (!intervalId) {
    intervalId = setInterval(tick, 100);
  }
}

// Call the function to generate the table
createTableWithInnerHTML();
