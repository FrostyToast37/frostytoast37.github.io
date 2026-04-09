tableDiv = document.getElementById("table");


class Element {
  constructor(data) {
    //assign properties to objects
    Object.assign(this, data); 
  }
}

async function loadJSON() {
  try {
    // get file
    const data = await fetch("elements.json");

    // parse
    const parsedJSON = await data.json();

    return parsedJSON;

  } catch (err) {
    console.error("Error loading file:", err);
  }
}
async function BuildPeriodicTable() {
  const ptableJSON = await loadJSON();
  const elementsList = ptableJSON.map(jsonItem => new Element(jsonItem));

  //declare
  let table = [];

  //gotta make 1d first
  for (let group = 0; group <= 18; group++) {
      table[group] = [];
  }

  //make 2d array
  for (let period = 0; period <= 10; period++) {
    for (let group = 0; group <= 18; group++) {
      table[group][period] = elementsList.find(element => element.xpos == group && element.ypos == period);
    }
  }


  let tableHTML = '<table id="ptable">';

  // Generate the table periods and groups
  for (let period = 0; period <= 10; period++) {
    tableHTML += '<tr>';
    for (let group = 0; group <= 18; group++) {
      // Use unique IDs for each element using parameters
      const currentElement = table[group][period];
      const idString = currentElement?.name ? `id="${currentElement.name}"` : '';
      const symbolString = currentElement?.symbol || "&nbsp;";
      tableHTML += `<td ${idString} class="element"><div class="symbol">${symbolString}</div></td>`;
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  // Append the generated table to the tableDiv
  tableDiv.innerHTML = tableHTML;
}

BuildPeriodicTable();