const canvasDOM = document.getElementById("myCanvas");
canvasDOM.width = window.innerWidth;
canvasDOM.height = window.innerHeight;

//CANVAS
	//helloWorld
		const canvas = new fabric.StaticCanvas("myCanvas");
		const helloWorld = new fabric.FabricText("Hello world!");
		canvas.add(helloWorld);
		canvas.centerObject(helloWorld);
	//playerCircle
		const playerCircle = new fabric.Circle({
			radius: 20,          // Radius of the circle
			fill: "orange",      // Inner color
			stroke: "black",     // Border color
			strokeWidth: 3,      // Border width
			left: 100,           // X-coordinate position from the left
			top: 100,         // Y-coordinate position from the top
			selectable: true     // Allows the user to move/resize the circle
		});
		canvas.add(playerCircle);
	//aimLine
		const aimLine = new fabric.Line([100, 100, 0, 0], {
			stroke: "gold",
			strokeWidth: 2,
			strokeDashArray: [2,5]
		});
		canvas.add(aimLine);




//MOVEMENT
let speedX = 0;
let speedY = 0;
let playerX = 100;
let playerY = 100;
let mouseX = 0;
let mouseY = 0;
const maxSpeed = 25;
const speedConst = 3.5;
const friction = 0.85;

//an array for all key states
const keysPressed = {};

window.addEventListener("keydown", (event) => {
	keysPressed[event.code] = true;
	event.preventDefault();
});
window.addEventListener("keyup", (event) => {
	keysPressed[event.code] = false;
	event.preventDefault();
});

window.addEventListener("mousemove", (event) => {
	mouseY = event.clientY;
	mouseX = event.clientX;
});
window.addEventListener("onclick", (event) => {
	shoot();
});

//function defs
	function move() {
		if (keysPressed["KeyW"] || keysPressed["ArrowUp"]) {
			if(speedY > -maxSpeed) {speedY -= speedConst;}
		}
		if (keysPressed["KeyA"] || keysPressed["ArrowLeft"]) {
			if(speedX > -maxSpeed) {speedX -= speedConst;}
		}
		if (keysPressed["KeyS"] || keysPressed["ArrowDown"]) {
			if(speedY < maxSpeed) {speedY += speedConst;}
		}
		if (keysPressed["KeyD"] || keysPressed["ArrowRight"]) {
			if(speedX < maxSpeed) {speedX += speedConst;}
		}

		if (!keysPressed["KeyW"] && !keysPressed["ArrowUp"] && !keysPressed["KeyS"] && !keysPressed["ArrowDown"]) {
			speedY *= friction; 
			if (Math.abs(speedY) < 0.1) speedY = 0; // Stop micro-drifting
		}
		if (!keysPressed["KeyA"] && !keysPressed["ArrowLeft"] && !keysPressed["KeyD"] && !keysPressed["ArrowRight"]) {
			speedX *= friction;
			if (Math.abs(speedX) < 0.1) speedX = 0;
		}

		let currentSpeed = Math.sqrt(speedX * speedX + speedY * speedY);	

		if (currentSpeed > maxSpeed) {
			speedX = (speedX / currentSpeed) * maxSpeed;
			speedY = (speedY / currentSpeed) * maxSpeed;
		}

		playerX += speedX;
		playerY += speedY;

		playerCircle.set({ left: playerX, top: playerY });
	}
	function shoot() {
		//make shoot here
	}

function animate() {
	move();
	aimLine.set({
		x1: playerX,
    y1: playerY,
    x2: mouseX,
    y2: mouseY
  });
  aimLine.setCoords();
	canvas.renderAll();

	//this line means it loops
	requestAnimationFrame(animate);
}

//starts loop
requestAnimationFrame(animate);