// --- GAME SETUP AND CONSTANTS ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRAVITY = 0.6;
const JUMP_VELOCITY = -12;
const MOVE_SPEED = 5;
const PLAYER_RADIUS = 15;
const ENEMY_SIZE = 20;

let platforms = [];
let enemies = [];
let projectiles = [];
let keys = {};
let gameState = 'playing'; // 'playing', 'win', 'lose'

// --- GAME OBJECT CLASSES ---

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.isOnGround = false;
        this.radius = PLAYER_RADIUS;
        this.facing = 1; // 1 for right, -1 for left
        this.isAttacking = false;
        this.health = 3;
        this.blinkTimer = 0;
    }

    draw() {
        // Blink effect after being hit
        if (this.blinkTimer > 0 && Math.floor(Date.now() / 100) % 2 === 0) {
            this.blinkTimer -= 1;
            return; // Skip drawing to create blink effect
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isAttacking ? '#f08080' : '#4682b4'; // Player color (Steel Blue / Light Coral when attacking)
        ctx.fill();
        ctx.closePath();

        // Draw health indicators
        ctx.fillStyle = '#ff4757';
        for (let i = 0; i < this.health; i++) {
            ctx.fillRect(this.x - 20 + (i * 15), this.y - 30, 10, 5); // Simple red blocks
        }
    }

    update() {
        // Apply gravity
        this.vy += GRAVITY;

        // Handle horizontal movement input
        this.vx = 0;
        if (keys['a']) {
            this.vx = -MOVE_SPEED;
            this.facing = -1;
        }
        if (keys['d']) {
            this.vx = MOVE_SPEED;
            this.facing = 1;
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Simple collision detection with platforms
        this.isOnGround = false;
        platforms.forEach(platform => {
            if (
                this.x > platform.x &&
                this.x < platform.x + platform.width &&
                this.y + this.radius <= platform.y + this.vy && // Check next frame position
                this.y + this.radius >= platform.y - 1 &&
                this.vy >= 0 // Only check if falling
            ) {
                this.vy = 0;
                this.y = platform.y - this.radius; // Snap to the top
                this.isOnGround = true;
            }
        });

        // Boundary collision (prevent falling off the bottom)
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy = 0;
            this.isOnGround = true;
        }
    }

    jump() {
        if (this.isOnGround) {
            this.vy = JUMP_VELOCITY;
            this.isOnGround = false;
        }
    }

    // Melee attack: creates a temporary hitbox
    meleeAttack() {
        if (this.isAttacking) return;
        this.isAttacking = true;
        
        // Define the melee hit area relative to the player
        const hitBox = {
            x: this.x + (this.facing * this.radius),
            y: this.y - this.radius,
            width: 30,
            height: 30
        };

        // Check for collision with enemies
        enemies = enemies.filter(enemy => {
            // Simple AABB collision check between hitBox and Enemy
            const hit = hitBox.x < enemy.x + enemy.size &&
                        hitBox.x + hitBox.width > enemy.x &&
                        hitBox.y < enemy.y + enemy.size &&
                        hitBox.y + hitBox.height > enemy.y;
            
            return !hit; // Keep the enemy if no hit
        });

        // Visual cue (set attack state for a moment)
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

    // Ranged attack: shoots a projectile
    rangedAttack() {
        // Shoot a small square projectile
        const projectile = new Projectile(this.x, this.y, this.facing * 10, 0);
        projectiles.push(projectile);
    }

    takeDamage() {
        if (this.blinkTimer === 0) {
            this.health -= 1;
            this.blinkTimer = 60; // 1 second of invulnerability (60 frames)
            if (this.health <= 0) {
                gameState = 'lose';
            }
        }
    }
}

class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = '#555';
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#777';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor(x, y, movementRange = 0) {
        this.x = x;
        this.y = y;
        this.size = ENEMY_SIZE;
        this.color = '#dc143c'; // Crimson Red square
        this.startX = x;
        this.movementRange = movementRange; // If > 0, patrol
        this.patrolDir = 1;
        this.speed = 1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        if (this.movementRange > 0) {
            // Simple patrolling movement
            this.x += this.speed * this.patrolDir;

            if (this.x > this.startX + this.movementRange || this.x < this.startX) {
                this.patrolDir *= -1;
            }
        }
    }
}

class Projectile {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = 6;
        this.color = '#ffd700'; // Gold for ranged attack
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    // Check if projectile is out of bounds
    isOutOfBounds() {
        return this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height;
    }
}

// --- GAME LOGIC FUNCTIONS ---

function initGame() {
    // Player starts near the bottom left
    player = new Player(50, canvas.height - PLAYER_RADIUS - 10);

    // Level design (Platforms)
    platforms = [
        // Ground
        new Platform(0, canvas.height - 10, canvas.width, 10),
        // Floating platforms
        new Platform(150, 300, 150, 10),
        new Platform(400, 200, 200, 10),
        new Platform(650, 300, 100, 10),
    ];

    // Enemies (Squares)
    enemies = [
        // Stationary
        new Enemy(500, canvas.height - ENEMY_SIZE - 10),
        // Patrolling
        new Enemy(180, 280 - ENEMY_SIZE, 100),
        new Enemy(450, 180 - ENEMY_SIZE, 150),
    ];

    projectiles = [];
    gameState = 'playing';
    keys = {};
}

// Check for collision between two rectangles (used for Projectile vs Enemy)
function checkRectCollision(r1, r2) {
    return r1.x < r2.x + r2.size &&
           r1.x + r1.size > r2.x &&
           r1.y < r2.y + r2.size &&
           r1.y + r1.size > r2.y;
}

// Check for collision between a circle (Player) and a rectangle (Enemy)
function checkCircleRectCollision(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.size));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.size));
    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;
    
    return (distanceX * distanceX + distanceY * distanceY) < (circle.radius * circle.radius);
}

function handleCollisions() {
    // 1. Projectile vs Enemy collision
    projectiles = projectiles.filter(projectile => {
        let hitEnemy = false;
        enemies = enemies.filter(enemy => {
            if (checkRectCollision(projectile, enemy)) {
                hitEnemy = true;
                return false; // Enemy is hit and removed
            }
            return true; // Keep enemy
        });
        return !projectile.isOutOfBounds() && !hitEnemy; // Keep projectile if it hasn't hit an enemy or gone out of bounds
    });

    // 2. Player vs Enemy collision (Player takes damage)
    if (player.blinkTimer === 0) {
        enemies.forEach(enemy => {
            if (checkCircleRectCollision(player, enemy)) {
                player.takeDamage();
            }
        });
    }
}

function gameMessage(text, color) {
    ctx.font = '30px sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 50);
}

// --- GAME LOOP ---

function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'playing') {
        // Update
        player.update();
        enemies.forEach(enemy => enemy.update());
        projectiles.forEach(p => p.update());

        // Handle interactions
        handleCollisions();

        // Draw
        platforms.forEach(platform => platform.draw());
        player.draw();
        enemies.forEach(enemy => enemy.draw());
        projectiles.forEach(p => p.draw());

        // Check win condition (all enemies defeated)
        if (enemies.length === 0) {
            gameState = 'win';
        }

    } else if (gameState === 'win') {
        gameMessage('You Won!', 'lightgreen'); 
    } else if (gameState === 'lose') {
        gameMessage('Game Over', 'crimson'); 
    }

    requestAnimationFrame(animate);
}

// --- INPUT HANDLING ---

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    if (gameState === 'playing') {
        if (e.key === ' ' || e.key === 'w') {
            player.jump();
        }
        if (e.key.toLowerCase() === 'j') { // J for Melee
            player.meleeAttack();
        }
        if (e.key.toLowerCase() === 'k') { // K for Ranged
            player.rangedAttack();
        }
    }

    if (gameState !== 'playing' && e.key.toLowerCase() === 'r') {
        initGame();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});


// Start the game when the window loads
let player;
window.onload = function() {
    initGame();
    animate();
};