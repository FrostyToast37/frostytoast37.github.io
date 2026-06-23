//DOM elements
	const canvasDOM = document.getElementById("myCanvas");
	canvasDOM.width = window.innerWidth;
	canvasDOM.height = window.innerHeight;

//game constants (marked by k_)
	const k_collisionEnergy = 0.5; //1=perfectly elastic
	const k_maxSpeed = 18;
	const k_jumpHeight = 35;
	const k_speedConst = 2;
	const k_friction = 0.87;
	const k_laserSpeed = 25; //starting this slow for testing purposes
	const k_laserLength = 50;
	const k_bulletSpeed = 35;
	const k_bulletGrav = 0.2;
	const k_magSize = 5;
	const g = 3;

//global declerations
	let lastTime = 0;
	let activeAmmo = [];
	let mag = k_magSize;
	let loaded = true;
	let selectedAmmo = "lasers";

//ammo classes
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
		draw() {
			this.canvasLaser = new fabric.Line([this.Xf, this.Yf, this.Xb, this.Yb], {
					stroke: "red",
					strokeWidth: 5,
				});
			canvas.add(this.canvasLaser);
		}
		step(dt) {
			this.dTraveled += (k_laserSpeed  * (dt * 60));
			this.Xf = (this.dTraveled * this.ux) + this.x1;
			this.Yf = (this.dTraveled * this.uy) + this.y1;
			this.Xb = ((this.dTraveled - k_laserLength) * this.ux) + this.x1;
			this.Yb = ((this.dTraveled - k_laserLength) * this.uy) + this.y1;
			this.canvasLaser.set({
				x1: this.Xf,
				y1: this.Yf,
				x2: this.Xb,
				y2: this.Yb //here!
			});
			if (this.Xf < 0 || this.Xf > canvasDOM.width || this.Yf < 0 || this.Yf > canvasDOM.height) {
				this.isActive = false;
				canvas.remove(this.canvasLaser);
			}

		}
	}
	class Bullet { //fix this
		constructor(x1, y1, x2, y2) {
			//starting coords and destination coords
			this.x1 = x1;
			this.y1 = y1;
			
			//math
			const mx = x2 - x1;
			const my = y2 - y1;
			const myx = Math.sqrt((mx * mx) + (my * my));
			const ratio = k_bulletSpeed / myx;

			//calculating vectors
			this.vx = ratio * mx;//velocity in the x direction
			this.vy = ratio * my;//velocity in the y direction

			//coords of front of laser
			this.x = x1;
			this.y = y1;

			this.isActive = true;
		}

		draw() {
			this.canvasBullet = new fabric.Circle({
				radius: 2,
				fill: "black",
				stroke: "black",
				strokeWidth: 2,
				left: this.x,         
				top: this.y,		
				originX: "center", 
				originY: "center",
				selectable: false
			});
			canvas.add(this.canvasBullet);
		}

		step(dt) {
			this.vy += g * k_bulletGrav * dt * 60;
			this.x += this.vx * dt * 60;
			this.y += this.vy * dt * 60;

			this.canvasBullet.set({
				left: this.x,
				top: this.y
			});

			if (this.x < 0 || this.x > canvasDOM.width || this.y < 0 || this.y > canvasDOM.height) {
				this.isActive = false;
				canvas.remove(this.canvasBullet);
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
			top: 100,			 // Y-coordinate position from the top
			originX: "center",   //Aligns Fabric with your physics center
    		originY: "center",   // '
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
	let speedYgrav = 0;
	let playerX = 100;
	let playerY = 100;
	let mouseX = 0;
	let mouseY = 0;
	let grounded = true;
//an array for all key states
	const keysPressed = {};
//event listeners
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
	function move(dt) {
		const timeScale = dt * 60;

		if (keysPressed["KeyW"] || keysPressed["ArrowUp"] || keysPressed["Space"]) {
			if(grounded === true) {
				speedY -= k_jumpHeight; // Instant impulse, no dt needed
				grounded = false; 
			}
		}
		if (keysPressed["KeyS"] || keysPressed["ArrowDown"]) {
			if(grounded === false) {
				speedY -= k_speedConst * timeScale;
			}
		}
		if (keysPressed["KeyA"] || keysPressed["ArrowLeft"]) {
			if(speedX > -k_maxSpeed) { speedX -= k_speedConst * timeScale; }
		}
		if (keysPressed["KeyD"] || keysPressed["ArrowRight"]) {
			if(speedX < k_maxSpeed) { speedX += k_speedConst * timeScale; }
		}

		if (!keysPressed["KeyA"] && !keysPressed["ArrowLeft"] && !keysPressed["KeyD"] && !keysPressed["ArrowRight"]) {
			speedX *= Math.pow(k_friction, timeScale);
			if (Math.abs(speedX) < 0.05) speedX = 0;
		}

		speedY = speedY + (g * timeScale);

		//predict positions
		let nextX = playerX + (speedX * timeScale);
		let nextY = playerY + (speedY * timeScale);

		//collision calcs
		if ((nextX - 20 <= 0) || (nextX + 20 >= canvasDOM.width)) {
			speedX = -speedX * k_collisionEnergy;
			if (Math.abs(speedX) <= 0.5) speedX = 0;
		}
		if ((nextY - 20 <= 0)) {
			speedY = -speedY * k_collisionEnergy;
			if (Math.abs(speedY) <= 0.5) speedY = 0;
		}
		if ((nextY + 20 >= canvasDOM.height)) {
			speedY = -speedY * k_collisionEnergy;
			grounded = true;
			if (Math.abs(speedY) <= 0.5) speedY = 0;
		}

		//change pos based on dt
		playerX += speedX * timeScale;
		playerY += speedY * timeScale;

		playerCircle.set({ left: playerX, top: playerY });
	}

	function shoot() {
		if (selectedAmmo === "lasers" ){
			const m_tempLaser = new Laser(playerX, playerY, mouseX, mouseY);
			m_tempLaser.draw();
			activeAmmo.push(m_tempLaser);
		}
		if (selectedAmmo === "bullets" ){
			if (mag > 0) {
				mag--;
				const m_tempBullet = new Bullet(playerX, playerY, mouseX, mouseY);
				m_tempBullet.draw();
				activeAmmo.push(m_tempBullet);
			
				//reload
				if (mag === 0) {
					loaded = false;
					setTimeout(() => {
						mag = 5;
						loaded = true;
					}, 3000);
				}
			}
		}
	}
//gameloop
	function animate(currentTime) {
		//deltatime
			let dt = (currentTime - lastTime) / 1000;
			//cap dt to prevent massive jumps if the user switches tabs
			if (dt > 0.1) dt = 0.1; 
			lastTime = currentTime;
		//place to check for key presses
			if (keysPressed["Digit1"]) {
				selectedAmmo = "lasers";
			}
			if (keysPressed["Digit2"]) {
				selectedAmmo = "bullets";
			}

		//ammo
			activeAmmo.forEach(ammo => {
				ammo.step(dt);
			});
			activeAmmo = activeAmmo.filter(ammo => ammo.isActive !== false);
		
		move(dt);
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
	requestAnimationFrame((time) => {
		lastTime = time;
		requestAnimationFrame(animate);
	});