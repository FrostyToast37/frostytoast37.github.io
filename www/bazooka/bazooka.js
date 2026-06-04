//DOM elements
const canvasDOM = document.getElementById("myCanvas");
canvasDOM.width = window.innerWidth;
canvasDOM.height = window.innerHeight;

//game constants (marked by k_)
const k_collisionEnergy = 0.5; //1=perfectly elastic
const k_maxSpeed = 30;
const k_speedConst = 3;
const k_friction = 0.83;
const k_laserSpeed = 25; //starting this slow for testing purposes
const k_laserLength = 50;

let activeLasers = [];

class Laser {
	constructor(x1, y1, x2, y2) {
		//starting coords and destination coords
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;

		//calculating unit vectors
		//distances
		const dx = x2 - x1;
		const dy = y2 - y1;
		//magnitude
		this.magV = Math.sqrt(dx * dx + dy * dy);
		//unit vectors themselves
		this.ux = dx / this.magV;
		this.uy = dy / this.magV;

		this.dTraveled = 0;
		this.frame = 0;
		//coords of front of laser
		this.Xf = x1;
		this.Yf = y1;
		//coords of backk of laser
		this.Xb = x1;
		this.Yb = y1;

		this.isActive = true;
	}
	step() {
		this.dTraveled += k_laserSpeed;
		if (this.dTraveled < this.magV) {
			this.Xf = (this.dTraveled * this.ux) + this.x1;
			this.Yf = (this.dTraveled * this.uy) + this.y1;
			this.Xb = ((this.dTraveled - k_laserLength) * this.ux) + this.x1;
			this.Yb = ((this.dTraveled - k_laserLength) * this.uy) + this.y1;
		} else {
			this.isActive = false;
		}

	}
}

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
			stroke: "red",
			strokeWidth: 2,
			strokeDashArray: [3,6]
		});
		canvas.add(aimLine);




//MOVEMENT
let speedX = 0;
let speedY = 0;
let playerX = 100;
let playerY = 100;
let mouseX = 0;
let mouseY = 0;
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
window.addEventListener("click", (event) => {
	shoot();
});

//function defs
	function move() {
		if (keysPressed["KeyW"] || keysPressed["ArrowUp"]) {
			if(speedY > -k_maxSpeed) {speedY -= k_speedConst;}
		}
		if (keysPressed["KeyA"] || keysPressed["ArrowLeft"]) {
			if(speedX > -k_maxSpeed) {speedX -= k_speedConst;}
		}
		if (keysPressed["KeyS"] || keysPressed["ArrowDown"]) {
			if(speedY < k_maxSpeed) {speedY += k_speedConst;}
		}
		if (keysPressed["KeyD"] || keysPressed["ArrowRight"]) {
			if(speedX < k_maxSpeed) {speedX += k_speedConst;}
		}

		if (!keysPressed["KeyW"] && !keysPressed["ArrowUp"] && !keysPressed["KeyS"] && !keysPressed["ArrowDown"]) {
			speedY *= k_friction; 
			if (Math.abs(speedY) < 0.1) speedY = 0; // Stop micro-drifting
		}
		if (!keysPressed["KeyA"] && !keysPressed["ArrowLeft"] && !keysPressed["KeyD"] && !keysPressed["ArrowRight"]) {
			speedX *= k_friction;
			if (Math.abs(speedX) < 0.1) speedX = 0;
		}

		let currentSpeed = Math.sqrt(speedX * speedX + speedY * speedY);	

		if (currentSpeed > k_maxSpeed) {
			speedX = (speedX / currentSpeed) * k_maxSpeed;
			speedY = (speedY / currentSpeed) * k_maxSpeed;
		}

		if( (((playerX + speedX) - 10) <= 0) || (((playerX + speedX) + 10) >= canvasDOM.width) ) {
			speedX = -speedX * k_collisionEnergy;
		}
		if( (((playerY + speedY) - 10) <= 0) || (((playerY + speedY) + 10) >= canvasDOM.height) ) {
			speedY = -speedY * k_collisionEnergy;
		}

		playerX += speedX;
		playerY += speedY;

		playerCircle.set({ left: playerX, top: playerY });
	}
	function shoot() {
		const m_tempLaser = new Laser(playerX, playerY, mouseX, mouseY);
		const tempCanvasLaser = new fabric.Line([m_tempLaser.Xf, m_tempLaser.Yf, m_tempLaser.Xb, m_tempLaser.Yb], {
			stroke: "red",
			strokeWidth: 5,
		});
		canvas.add(tempCanvasLaser);
		const tempEntry = [m_tempLaser, tempCanvasLaser]
		activeLasers.push(tempEntry);
	}

function animate() {
	activeLasers.forEach(laserEntry => {
		const [m_laser, canvasLaser] = laserEntry;
		m_laser.step();
		if( m_laser.isActive === false) {
			canvas.remove(canvasLaser);
		}
	});
	activeLasers = activeLasers.filter(laserEntry => laserEntry[0].isActive !== false);
	activeLasers.forEach(laserEntry => {
		const [m_laser, canvasLaser] = laserEntry;
		canvasLaser.set({
			x1: m_laser.Xf,
			y1: m_laser.Yf,
			x2: m_laser.Xb,
			y2: m_laser.Yb //here!
		});
	});
	
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