const canvasDOM = document.getElementById("myCanvas");
canvasDOM.width = window.innerWidth;
canvasDOM.height = window.innerHeight;

const canvas = new fabric.StaticCanvas("myCanvas");
const helloWorld = new fabric.FabricText('Hello world!');
canvas.add(helloWorld);
canvas.centerObject(helloWorld);