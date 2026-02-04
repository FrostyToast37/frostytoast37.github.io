// --- GAME SETUP AND CONSTANTS ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRAVITY = 0.6;
const JUMP_VELOCITY = -12; // Standard ground jump vertical force
const WALL_JUMP_V_VELOCITY = -10; // Slightly less vertical boost for wall jump
const MOVE_SPEED = 5;
const WALL_JUMP_HORIZONTAL_PUSH = 14; // Increased horizontal push for angled launch
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
        this.isWalledLeft = false; 
        this.isWalledRight = false; 
        this.wallJumpTimer = 0; 
        this.radius = PLAYER_RADIUS;
        this.facing = 1; 
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

        // Reset wall status and cooldown
        this.isWalledLeft = false;
        this.isWalledRight = false;
        this.wallJumpTimer = Math.max(0, this.wallJumpTimer - 1); // Decrement timer

// ---*** THIS IS THE AIR CONTROL FIX ***---
        // This logic allows the player to control horizontal movement
        // both on the ground and in the air.

        if (this.isOnGround) {
            // On the ground: velocity is set directly by keys
            this.vx = 0;
            if (keys['a']) {
                this.vx = -MOVE_SPEED;
                this.facing = -1;
            }
            if (keys['d']) {
                this.vx = MOVE_SPEED;
                this.facing = 1;
            }
        } else {
            // In the air: Keys *override* the current horizontal velocity.
            // If no keys are pressed, this.vx (from a wall jump) is preserved,
            // allowing the player to "drift".
            if (keys['a']) {
                this.vx = -MOVE_SPEED;
                this.facing = -1;
            }
            if (keys['d']) {
                this.vx = MOVE_SPEED;
                this.facing = 1;
            }
        }
        // --- END OF FIX ---

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
                // Only check horizontal block collisions if not wall jumping
                if (this.wallJumpTimer === 0) {
                    // If the player was to the right of the block's right edge last frame (hitting left wall)
                    if (oldX - this.radius >= block.x + block.width) {
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
            }
        });

        // Wall Slide Effect (reduces vertical speed when walling)
        if (!this.isOnGround && (this.isWalledLeft || this.isWalledRight)) {
            if (this.vy > 0) {
                this.vy = Math.min(this.vy, 1); // Slow slide down
            }
        }
        
        // --- Canvas Boundary Collision (Walls of the screen) ---

        // 1. Right Wall Boundary
        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            if (this.wallJumpTimer === 0) { this.vx = 0; } // Stop movement only if not wall jumping
            if (!this.isOnGround) {
                this.isWalledRight = true; // Enable wall slide/jump on canvas edge
            }
        }

        // 2. Left Wall Boundary
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            if (this.wallJumpTimer === 0) { this.vx = 0; } // Stop movement only if not wall jumping
            if (!this.isOnGround) {
                this.isWalledLeft = true; // Enable wall slide/jump on canvas edge
            }
        }
        
        // 3. Bottom Boundary (prevent falling off the bottom)
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
        // Wall Jump Left (Launch away from the left wall)
        else if (this.isWalledLeft && this.wallJumpTimer === 0) {
            this.vy = WALL_JUMP_V_VELOCITY; // Jump up
            this.vx = WALL_JUMP_HORIZONTAL_PUSH; // Push away from the left wall (move right)
            this.facing = 1; // Face right
            this.wallJumpTimer = 20; // Cooldown (prevents spamming)
        } 
        // Wall Jump Right (Launch away from the right wall)
        else if (this.isWalledRight && this.wallJumpTimer === 0) {
            this.vy = WALL_JUMP_V_VELOCITY; // Jump up
            this.vx = -WALL_JUMP_HORIZONTAL_PUSH; // Push away from the right wall (move left)
            this.facing = -1; // Face left
            this.wallJumpTimer = 20; // Cooldown (prevents spamming)
        }
    }

    // Melee attack: creates a temporary hitbox
    meleeAttack() {
        if (this.isAttacking) return;
        this.isAttacking = true;
        
        const hitBox = {
            x: this.x + (this.facing * this.radius),
            y: this.y - this.radius,
            width: 30,
            height: 30
        };

        enemies = enemies.filter(enemy => {
            const hit = hitBox.x < enemy.x + enemy.size &&
                        hitBox.x + hitBox.width > enemy.x &&
                        hitBox.y < enemy.y + enemy.size &&
                        hitBox.y + hitBox.height > enemy.y;
            
            return !hit; 
        });

        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

    // Ranged attack: shoots a projectile
    rangedAttack() {
        const projectile = new Projectile(this.x, this.y, this.facing * 10, 0);
        projectiles.push(projectile);
    }

    // Take damage 
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
    constructor(x, y, movementRange = 0) {
        this.x = x;
        this.y = y;
        this.size = ENEMY_SIZE;
        this.color = '#dc143c'; 
        this.startX = x;
        this.movementRange = movementRange; 
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
        this.color = '#ffd700'; 
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

// --- LEVEL GENERATION LOGIC ---

function generateRandomLevel(levelIndex) {
    const levelBlocks = [];
    const levelEnemies = [];

    // --- 1. Difficulty Scaling ---
    const targetFloatingBlocks = 4 + levelIndex * 2; // More blocks for higher levels
    const maxEnemies = 2 + levelIndex;      // More enemies for higher levels
    const maxPatrolRange = 50 + levelIndex * 30; // Enemies patrol further

    // --- 2. Base Block Setup ---
    // Ground Block (Mandatory)
    levelBlocks.push(new Block(0, canvas.height - 10, canvas.width, 10));

    // --- 3. Random Floating Block Generation with Solvability Constraints ---
    let attempts = 0;
    const maxAttempts = targetFloatingBlocks * 10; // Safety limit to prevent infinite loops
    
    // ---*** THIS IS THE PLATFORM GENERATION FIX ***---
    // Loop until we have (targetFloatingBlocks + 1 ground block), or hit max attempts
    // The condition is now correct: (levelBlocks.length - 1) counts ONLY floating blocks
    while ((levelBlocks.length - 1) < targetFloatingBlocks && attempts < maxAttempts) {
        attempts++;
        
        // Decide whether to make a narrow wall block or a wide platform block
        const isWall = Math.random() < 0.25 && levelIndex > 1; 

        const bWidth = isWall 
            ? Math.floor(Math.random() * (40 - 20) + 20) 
            : Math.floor(Math.random() * (250 - 80) + 80); 
        
        const bHeight = isWall
            ? Math.floor(Math.random() * (canvas.height - 150) + 50) 
            : 10; 
        
        let bX, bY;
        let validPlacement = true;

        // Y position constraint: platform must be at least 50px from the top
        bY = Math.floor(Math.random() * (canvas.height - 150 - 50) + 50);

        // X position constraint: ensure it's not placed on the player start area (x < 100)
        do {
            bX = Math.floor(Math.random() * (canvas.width - bWidth));
        } while (bX < 100 && bY > canvas.height - 100); 
        
        // Check against existing blocks for overlap and jump possibility
        for (const existingB of levelBlocks) {
            // Check for severe vertical overlap (prevent blocks from being too close vertically)
            if (Math.abs(bY - existingB.y) < 40) { 
                validPlacement = false;
                break;
            }
            
            // Simple overlap check
            const overlapX = Math.max(0, Math.min(bX + bWidth, existingB.x + existingB.width) - Math.max(bX, existingB.x));
            const overlapY = Math.max(0, Math.min(bY + bHeight, existingB.y + existingB.height) - Math.max(bY, existingB.y));

            if (overlapX > 0 && overlapY > 0) {
                validPlacement = false;
                break;
            }
        }
        // --- END OF FIX ---

        if (validPlacement) {
            levelBlocks.push(new Block(bX, bY, bWidth, bHeight));
        }
    }

    // --- 4. Random Enemy Placement ---
    let enemiesPlaced = 0;
    const blocksToUse = [...levelBlocks];
    
    blocksToUse.sort(() => Math.random() - 0.5);

    for (let i = 0; i < blocksToUse.length && enemiesPlaced < maxEnemies; i++) {
        if (Math.random() < 0.6) { 
            const block = blocksToUse[i];
            
            const eX = block.x + Math.floor(Math.random() * (block.width - ENEMY_SIZE));
            const eY = block.y - ENEMY_SIZE;
            
            const patrol = Math.random() < 0.5 ? Math.floor(Math.random() * maxPatrolRange * 0.5) : 0;
            
            levelEnemies.push(new Enemy(eX, eY, patrol));
            enemiesPlaced++;
        }
    }

    // Fallback: Ensure at least one enemy is placed if the target is > 0
    if (levelEnemies.length === 0 && maxEnemies > 0) {
        const ground = levelBlocks[0];
        // ---*** FIX FOR ENEMY_SERVICE TYPO ***---
        const eX = ground.x + Math.floor(Math.random() * (ground.width - (ENEMY_SIZE + 5)) + 5);
        const eY = ground.y - ENEMY_SIZE;
        levelEnemies.push(new Enemy(eX, eY, 0)); 
    }

    return { blocks: levelBlocks, enemies: levelEnemies };
}

function loadLevel(levelIndex) {
    console.log("Loading Level:", levelIndex);
    
    const levelData = generateRandomLevel(levelIndex);

    blocks = levelData.blocks; 
    enemies = levelData.enemies;
    projectiles = [];
    keys = {};

    // Reset player position and health for the new level
    if (player) { // Check if player exists before resetting
        player.x = 50; 
        player.y = canvas.height - PLAYER_RADIUS - 10;
        player.vy = 0;
        player.health = 3; 
        player.blinkTimer = 0;
    }
    
    gameState = 'playing';
}

function nextLevel() {
    currentLevel++; 

    if (currentLevel > 10) { 
        gameState = 'win'; 
        currentLevel = 10; 
    } else {
        loadLevel(currentLevel);
    }
}

function initGame() {
    currentLevel = 1; 
    player = new Player(50, canvas.height - PLAYER_RADIUS - 10);
    loadLevel(currentLevel);
}

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
                return false; 
            }
            return true; 
        });
        return !projectile.isOutOfBounds() && !hitEnemy; 
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

    // ---*** FIX FOR canvas.w_width TYPO ***---
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
        blocks.forEach(block => block.draw()); 
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
            nextLevel(); 
        }

    } else if (gameState === 'win') {
        gameMessage('YOU BEAT ALL THE LEVELS!', 'lightgreen'); 
    } else if (gameState === 'lose') {
        gameMessage('Game Over', 'crimson'); 
    }

    requestAnimationFrame(animate);
}

// --- INPUT HANDLING ---

// ---*** FIX FOR (e). TYPO ***---
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    if (gameState === 'playing') {
        if (e.key === ' ' || e.key === 'w') {
            player.jump();
        }
        if (e.key.toLowerCase() === 'j') { 
            player.meleeAttack();
        }
        if (e.key.toLowerCase() === 'k') { 
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
    // Also adjust dimensions if the window is resized
    // Note: resizing will restart the level
    window.addEventListener('resize', initGame);
};