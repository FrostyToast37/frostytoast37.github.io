const farmCanvas =  document.getElementById("farm_canvas").getContext("2d");

const image = new Image();
image.onload = () => {
  // Draw the image into the canvas
  farmCanvas.drawImage(image, 0, 0);
};
image.src = "/images/frostytoast.gif";