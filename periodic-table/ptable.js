tableDiv = document.getElementById("table");

async function loadJSON() {
  try {
    // get file
    const data = await fetch("/elements.json");

    // parse
    const parsedJSON = await data.json();

    return parsedJSON;

  } catch (err) {
    console.error("Error loading file:", err);
  }
}

class Element {
  constructor(data) {
    //assign properties to objects
    Object.assign(this, data); 
  }
}

const elementsList = loadJSON().map(jsonItem => new Element(jsonItem));

let table = [];

for (let period = 0; period <= 10; period++) {
  for (let group = 0; group <= 18; group++) {
    table[group][period] = elementsList.find(element => element.xpos == group && element.ypos == period);
  }
}

let tableHTML = '<table id="ptable">';

// Generate the table rows and cells
for (let period = 0; period <= 10; period++) {
  tableHTML += '<tr>';
  for (let group = 0; group <= 18; group++) {
    // Use unique IDs for each cell using concatenation
    tableHTML += `<td id="${table[group][period].name || null}" class="element"><div class="symbol">${table[group][period].symbol || " "}</div></td>`;
  }
  tableHTML += '</tr>';
}
tableHTML += '</table>';

// Append the generated table to the body
tableDiv.innerHTML = tableHTML;

