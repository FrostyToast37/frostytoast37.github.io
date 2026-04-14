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

