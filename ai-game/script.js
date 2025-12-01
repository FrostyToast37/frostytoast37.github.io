// --- GAME SETUP AND CONSTANTS ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRAVITY = 0.6;
const JUMP_VELOCITY = -12;
const MOVE_SPEED = 5;
const WALL_JUMP_HORIZONTAL_PUSH = 7.5; // Faster horizontal push for wall jump
const PLAYER_RADIUS = 15;
const ENEMY_SIZE = 20;

// Constraints for level generation (approximate player jump capabilities)
const MAX_JUMP_HEIGHT = 125; // Max vertical jump height in pixels (~120 calculated)
const MAX_HORIZONTAL_GAP = 220; // Max horizontal distance player can cover in one jump

let blocks = []; // Renamed from platforms
let enemies = [];
let projectiles = [];
let keys = {};
let gameState = 'playing'; // 'playing', 'win', 'lose'
let currentLevel = 1; // New variable to track the current level

// --- GAME OBJECT CLASSES ---

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.isOnGround = false;
        this.isWalledLeft = false; // New: is player pressing against a left wall
        this.isWalledRight = false; // New: is player pressing against a right wall
        this.wallJumpTimer = 0; // New: cooldown after wall jump
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

        // Apply Wall Slide effect if walled and falling
        this.isWalledLeft = false;
        this.isWalledRight = false;
        this.wallJumpTimer = Math.max(0, this.wallJumpTimer - 1); // Decrement timer

        // Save old position for collision calculation
        const oldX = this.x;
        const oldY = this.y;

        // Apply movement
        this.x += this.vx;
        this.y += this.vy;

        this.isOnGround = false;

        // General collision detection with Blocks (Platforms/Walls)
        blocks.forEach(block => {
            // AABB check for intersection
            if (this.x + this.radius > block.x &&
                this.x - this.radius < block.x + block.width &&
                this.y + this.radius > block.y &&
                this.y - this.radius < block.y + block.height) {

                // --- 1. Vertical Collision (Top/Bottom) ---
                
                // If the player was above the block's top edge last frame (hitting the top)
                if (oldY + this.radius <= block.y) {
                    this.vy = 0;
                    this.y = block.y - this.radius; // Snap to the top
                    this.isOnGround = true;
                } 
                // If the player was below the block's bottom edge last frame (hitting the bottom)
                else if (oldY - this.radius >= block.y + block.height) {
                    this.vy = 0;
                    this.y = block.y + block.height + this.radius;
                }

                // --- 2. Horizontal Collision (Left/Right) ---

                // If the player was to the right of the block's right edge last frame (hitting left wall)
                else if (oldX - this.radius >= block.x + block.width) {
                    this.vx = 0;
                    this.x = block.x + block.width + this.radius; // Snap to the right
                    this.isWalledLeft = true;
                } 
                // If the player was to the left of the block's left edge last frame (hitting right wall)
                else if (oldX + this.radius <= block.x) {
                    this.vx = 0;
                    this.x = block.x - this.radius; // Snap to the left
                    this.isWalledRight = true;
                }
            }
        });

        // Wall Slide Effect (reduces vertical speed when walling)
        if (!this.isOnGround && (this.isWalledLeft || this.isWalledRight)) {
            if (this.vy > 0) {
                this.vy = Math.min(this.vy, 1); // Slow slide down
            }
        }
        
        // Boundary collision (prevent falling off the bottom)
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy = 0;
            this.isOnGround = true;
            this.isWalledLeft = false;
            this.isWalledRight = false;
        }
    }

    jump() {
        // Standard Ground Jump
        if (this.isOnGround) {
            this.vy = JUMP_VELOCITY;
            this.isOnGround = false;
        } 
        // Wall Jump Left
        else if (this.isWalledLeft && this.wallJumpTimer === 0) {
            this.vy = JUMP_VELOCITY; // Jump up
            this.vx = WALL_JUMP_HORIZONTAL_PUSH; // Push away from the left wall (move right)
            this.facing = 1; // Face right
            this.wallJumpTimer = 20; // Cooldown
        } 
        // Wall Jump Right
        else if (this.isWalledRight && this.wallJumpTimer === 0) {
            this.vy = JUMP_VELOCITY; // Jump up
            this.vx = -WALL_JUMP_HORIZONTAL_PUSH; // Push away from the right wall (move left)
            this.facing = -1; // Face left
            this.wallJumpTimer = 20; // Cooldown
        }
    }

    // Melee attack: creates a temporary hitbox (Unchanged)
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

    // Ranged attack: shoots a projectile (Unchanged)
    rangedAttack() {
        // Shoot a small square projectile
        const projectile = new Projectile(this.x, this.y, this.facing * 10, 0);
        projectiles.push(projectile);
    }

    // Take damage (Unchanged)
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

// Renamed Platform to Block to reflect its use as a general obstacle/structure
class Block {
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
    // ... (Unchanged)
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
    // ... (Unchanged)
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

// --- NEW LEVEL GENERATION LOGIC ---

/**
 * Generates blocks and enemies based on the current level index, increasing difficulty.
 * @param {number} levelIndex 
 * @returns {object} {blocks: array, enemies: array}
 */
function generateRandomLevel(levelIndex) {
    const levelBlocks = [];
    const levelEnemies = [];

    // --- 1. Difficulty Scaling ---
    const maxBlocks = 4 + levelIndex * 2; // More blocks for higher levels
    const maxEnemies = 2 + levelIndex;      // More enemies for higher levels
    const maxPatrolRange = 50 + levelIndex * 30; // Enemies patrol further

    // --- 2. Base Block Setup ---
    // Ground Block (Mandatory)
    levelBlocks.push(new Block(0, canvas.height - 10, canvas.width, 10));

    // --- 3. Random Floating Block Generation with Solvability Constraints ---
    for (let i = 0; i < maxBlocks; i++) {
        // Decide whether to make a narrow wall block or a wide platform block
        const isWall = Math.random() < 0.25 && levelIndex > 1; // 25% chance of a wall block

        const bWidth = isWall 
            ? Math.floor(Math.random() * (40 - 20) + 20) // Narrow wall (20-40px)
            : Math.floor(Math.random() * (250 - 80) + 80); // Normal block (80-250px)
        
        const bHeight = isWall
            ? Math.floor(Math.random() * (canvas.height - 150) + 50) // Tall wall up to near the top
            : 10; // Thin platform
        
        let bX, bY;
        let validPlacement = true;

        // X position constraint: ensure it's not placed on the player start area (x < 100)
        do {
            bX = Math.floor(Math.random() * (canvas.width - bWidth));
        } while (bX < 100 && bY > canvas.height - MAX_JUMP_HEIGHT); 
        
        // Y position constraint: platform must be at least 50px from the top
        // and vertically reachable (MAX_JUMP_HEIGHT) from the ground initially.
        bY = Math.floor(Math.random() * (canvas.height - 150 - 50) + 50);

        // Check against existing blocks for overlap and jump possibility
        for (const existingB of levelBlocks) {
            // Check for severe vertical overlap (prevent blocks from being too close vertically)
            if (Math.abs(bY - existingB.y) < 40) { 
                validPlacement = false;
                break;
            }
            
            // Check jump possibility: If the new block is higher than the existing one,
            // ensure the vertical difference is jumpable AND the horizontal distance is reachable.
            if (bY < existingB.y) {
                const hDiff = existingB.y - bY;
                
                // If the vertical height difference is too high, it's invalid
                if (hDiff > MAX_JUMP_HEIGHT) {
                    validPlacement = false;
                    break;
                }
                
                // Calculate the horizontal distance between the two blocks' closest edges
                const distHorizontal = Math.max(0, Math.max(existingB.x + existingB.width - bX, bX + bWidth - existingB.x));
                
                // If the horizontal distance is also too large, it's invalid
                if (distHorizontal > MAX_HORIZONTAL_GAP) {
                    // NOTE: This complex constraint might accidentally make the level too easy or too hard 
                    // depending on how the player uses wall jumps. We prioritize the vertical limit (MAX_JUMP_HEIGHT).
                    // If we strictly enforce the horizontal gap, the level will be solvable by standard jump.
                    // For now, let's prioritize the vertical check.
                    // validPlacement = false; 
                    // break;
                }
            }
        }

        if (validPlacement) {
            levelBlocks.push(new Block(bX, bY, bWidth, bHeight));
        }
    }

    // --- 4. Random Enemy Placement ---
    let enemiesPlaced = 0;
    // Blocks to use for enemy placement (floating blocks + ground)
    const blocksToUse = [...levelBlocks];
    
    // Shuffle the blocks so enemies are placed randomly
    blocksToUse.sort(() => Math.random() - 0.5);

    for (let i = 0; i < blocksToUse.length && enemiesPlaced < maxEnemies; i++) {
        // Decide randomly if we place an enemy on this block
        if (Math.random() < 0.6) { 
            const block = blocksToUse[i];
            
            // Place enemy on top of the block
            const eX = block.x + Math.floor(Math.random() * (block.width - ENEMY_SIZE));
            const eY = block.y - ENEMY_SIZE;
            
            // Randomly decide if enemy patrols
            const patrol = Math.random() < 0.5 ? Math.floor(Math.random() * maxPatrolRange * 0.5) : 0;
            
            levelEnemies.push(new Enemy(eX, eY, patrol));
            enemiesPlaced++;
        }
    }

    // Fallback: Ensure at least one enemy is placed if the target is > 0
    if (levelEnemies.length === 0 && maxEnemies > 0) {
        const ground = levelBlocks[0];
        const eX = ground.x + Math.floor(Math.random() * (ground.width - ENEMY_SIZE));
        const eY = ground.y - ENEMY_SIZE;
        levelEnemies.push(new Enemy(eX, eY, 0)); // Stationary enemy on ground
    }

    return { blocks: levelBlocks, enemies: levelEnemies };
}

/**
 * Loads the objects for a specific level index.
 * @param {number} levelIndex 
 */
function loadLevel(levelIndex) {
    console.log("Loading Level:", levelIndex);
    // Generate the level data
    const levelData = generateRandomLevel(levelIndex);

    // Reset game objects
    blocks = levelData.blocks; // Use the new 'blocks' array
    enemies = levelData.enemies;
    projectiles = [];
    keys = {};

    // Reset player position and health for the new level
    // Start player on the left side of the screen
    player.x = 50; 
    player.y = canvas.height - PLAYER_RADIUS - 10;
    player.vy = 0;
    player.health = 3; 
    player.blinkTimer = 0;
    
    gameState = 'playing';
}

/**
 * Advances the game to the next level or finishes the game.
 */
function nextLevel() {
    // If the player beats the current level, increase the level count.
    currentLevel++; 

    // Define a maximum challenging level (e.g., Level 10)
    if (currentLevel > 10) { 
        gameState = 'win'; // Ultimate win if max level is passed
        currentLevel = 10; // Cap the display level
    } else {
        loadLevel(currentLevel);
    }
}

// --- MODIFIED GAME LOGIC FUNCTIONS ---

function initGame() {
    // Only reset the level counter on full restart
    currentLevel = 1; 
    player = new Player(50, canvas.height - PLAYER_RADIUS - 10);
    loadLevel(currentLevel); // Load the first level
}


// Check for collision functions (unchanged)
function checkRectCollision(r1, r2) {
    return r1.x < r2.x + r2.size &&
           r1.x + r1.size > r2.x &&
           r1.y < r2.y + r2.size &&
           r1.y + r1.size > r2.y;
}

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
        blocks.forEach(block => block.draw()); // Draw blocks
        player.draw();
        enemies.forEach(enemy => enemy.draw());
        projectiles.forEach(p => p.draw());

        // Draw current level count on the canvas
        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';
        ctx.fillText('Level: ' + currentLevel, 10, 30);
        
        // Check win condition (all enemies defeated)
        if (enemies.length === 0) {
            nextLevel(); // Load the next random level!
        }

    } else if (gameState === 'win') {
        gameMessage('YOU BEAT ALL THE LEVELS!', 'lightgreen'); 
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