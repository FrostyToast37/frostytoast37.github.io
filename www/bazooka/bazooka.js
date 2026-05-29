const canvas = new fabric.StaticCanvas("myCanvas");
const helloWorld = new fabric.FabricText('Hello world!');
canvas.add(helloWorld);
canvas.centerObject(helloWorld);