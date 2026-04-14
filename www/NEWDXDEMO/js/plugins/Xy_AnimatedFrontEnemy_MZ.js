/*:
 * @target MZ
 * @plugindesc [MZ] Animated Front-Facing Enemies with Idle, Attack, Damage, and Status Animations [by XyScripts]
 * @author XyScript
 *
 * @help
 * Converts static enemy battlers into fully animated front-facing sprites.
 * Supports idle loops, attack animations, damage reactions, and death/status effects.
 *
 * HOW TO USE:
 * - Set the enemy image to blank in the database.
 * - Use note tags on the enemy to define frame sequences.
 *
 * Note Tags:
 * <Frame 1: slimeIdle1>
 * <Attack Frame 1: slimeAttack1>
 * <Damage Frame 1: slimeHurt1>
 * <Death Frame 1: slimeDeath1>
 * <Sleep Frame 1: slimeSleep1>  (and so on...)
 * <Frame Speed: 15>
 * <Position X: 400>
 * <Position Y: 300>
 *
 * @param Default Frame Speed
 * @type number
 * @default 15
 * @desc Speed of idle, attack, damage, and status animations.
 *
 * @param Horizontal Offset
 * @type number
 * @default 50
 * @desc Spacing between multiple enemies horizontally.
 *
 * @param Vertical Offset
 * @type number
 * @default 30
 * @desc Spacing between multiple enemies vertically.
 *
 * @param State Icon Y Offset
 * @type number
 * @default -20
 * @desc Vertical position offset for state icons (like poison).
 */

/*:
 * @plugindesc Animated Front-Facing Enemies with Idle, Attack, Damage, and Status Animations [by XyScripts]
 * @author XyScripts
 *
 * @help
 * This plugin allows you to display fully animated, front-facing enemy sprites in RPG Maker MV,
 * including support for idle loops, attack sequences, damage reactions, and default status effects
 * (like Sleep, Poison, Confusion, etc).
 *
 * HOW TO USE:
 * 1. Set the enemy's image to transparent in the Database.
 * 2. Add note tags in the Enemies tab using the format below.
 *
 * Note Tags:
 * <Frame 1: slimeIdle1>
 * <Frame 2: slimeIdle2>
 * <Frame Speed: 15>
 * <Attack Frame 1: slimeAttack1>
 * <Damage Frame 1: slimeHurt1>
 * <Position X: 500>
 * <Position Y: 350>
 *
 * Status Effect Animations (each supports up to 10 frames):
 * <Sleep Frame 1: slimeSleep1>
 * <Poison Frame 1: slimePoison1>
 * <Blind Frame 1: slimeBlind1>
 * <Silence Frame 1: slimeSilence1>
 * <Confusion Frame 1: slimeConfuse1>
 * <Paralyze Frame 1: slimeParalyze1>
 * <Stun Frame 1: slimeStun1>
 *
 * Each frame number must increment (Frame 1, Frame 2, etc.) up to Frame 10.
 * All animations will automatically play in order and loop as needed.
 *
 * This plugin supports multiple enemies of the same type by offsetting their positions.
 *
 * @param Default Frame Speed
 * @type number
 * @default 15
 * @desc Speed of idle, attack, damage, and status frame animations.

 * @param Horizontal Offset
 * @type number
 * @default 50
 * @desc Auto-spacing between multiple enemies horizontally.

 * @param Vertical Offset
 * @type number
 * @default 30
 * @desc Auto-spacing between multiple enemies vertically.

 * @param State Icon Y Offset
 * @type number
 * @default -20
 * @desc Vertical offset to raise or lower the state icons (e.g. poison).
 */

(function () {
  const params = PluginManager.parameters('Xy_AnimatedFrontEnemy');
  const DEFAULT_SPEED = Number(params['Default Frame Speed']) || 15;
  const H_OFFSET = Number(params['Horizontal Offset']) || 50;
  const V_OFFSET = Number(params['Vertical Offset']) || 30;
  const STATE_ICON_Y = Number(params['State Icon Y Offset']) || -20;


  let enemyCounter = 0;

  const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
  Sprite_Enemy.prototype.initMembers = function () {
    _Sprite_Enemy_initMembers.call(this);
    this._frameSprites = [];
    this._attackSprites = [];
    this._damageSprites = [];
    this._frameIndex = 0;
    this._frameCounter = 0;
    this._frameSpeed = DEFAULT_SPEED;
    this._customX = null;
    this._customY = null;
    this._enemyInstanceId = enemyCounter++;
    this._isPlayingAttack = false;
    this._isPlayingDamage = false;
    this._lastHp = undefined;
    this._deathSprites = [];
    this._isPlayingDeath = false;
    this._playedDeath = false;
    this._deathIndex = 0;
  };

  const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function (battler) {
    _Sprite_Enemy_setBattler.call(this, battler);
    if (battler && battler.enemy) {
      this.setupAnimatedFrames(battler.enemy());
    
  if (this._stateIconSprite) {
    this._stateIconSprite.y += STATE_ICON_Y;
  }

    }
  };

  Sprite_Enemy.prototype.setupAnimatedFrames = function (enemy) {
    const note = enemy.note;
    this._frameSprites = [];
    this._attackSprites = [];
    this._damageSprites = [];

    // Load idle frames
    for (let i = 1; i <= 10; i++) {
      const match = note.match(new RegExp(`<Frame[ ]${i}:[ ](.+?)>`, 'i'));
      if (match) {
        const sprite = new Sprite(ImageManager.loadEnemy(match[1].trim()));
        sprite.visible = false;
        sprite.anchor.set(0.5, 1.0);
        this._frameSprites.push(sprite);
        this.addChild(sprite);
      }
    }

    // Load attack frames
    for (let i = 1; i <= 10; i++) {
      const atk = note.match(new RegExp(`<Attack Frame[ ]${i}:[ ](.+?)>`, 'i'));
      if (atk) {
        const sprite = new Sprite(ImageManager.loadEnemy(atk[1].trim()));
        sprite.visible = false;
        sprite.anchor.set(0.5, 1.0);
        this._attackSprites.push(sprite);
        this.addChild(sprite);
      }
    }

    // Load damage frames
    // Load death frames
    this._deathSprites = [];
    for (let i = 1; i <= 10; i++) {
      const deathMatch = note.match(new RegExp(`<Death Frame[ ]${i}:[ ](.+?)>`, 'i'));
      if (deathMatch) {
        const sprite = new Sprite(ImageManager.loadEnemy(deathMatch[1].trim()));
        sprite.visible = false;
        sprite.anchor.set(0.5, 1.0);
        this._deathSprites.push(sprite);
        this.addChild(sprite);
      }
    }

    // Load status effect animations by state ID
    this._statusAnimations = {};

    const stateFrameTypes = ['Poison', 'Blind', 'Silence', 'Confusion', 'Sleep', 'Paralyze', 'Stun'];

    stateFrameTypes.forEach(tag => {
      for (let i = 1; i <= 10; i++) {
        const match = note.match(new RegExp(`<${tag} Frame[ ]${i}:[ ](.+?)>`, 'i'));
        if (match) {
          const name = match[1].trim();
          const sprite = new Sprite(ImageManager.loadEnemy(name));
          sprite.visible = false;
          sprite.anchor.set(0.5, 1.0);

          // Find state ID by name match once
          if (!this._statusAnimations[tag]) {
            const state = $dataStates.find(s => s && s.name.toLowerCase() === tag.toLowerCase());
            if (state) this._statusAnimations[tag] = { id: state.id, sprites: [] };
          }

          if (this._statusAnimations[tag]) {
            this._statusAnimations[tag].sprites.push(sprite);
            this.addChild(sprite);
          }
        }
      }
    });

    for (let i = 1; i <= 10; i++) {
      const dmg = note.match(new RegExp(`<Damage Frame[ ]${i}:[ ](.+?)>`, 'i'));
      if (dmg) {
        const sprite = new Sprite(ImageManager.loadEnemy(dmg[1].trim()));
        sprite.visible = false;
        sprite.anchor.set(0.5, 1.0);
        this._damageSprites.push(sprite);
        this.addChild(sprite);
      }
    }

    if (this._frameSprites.length === 0) return;

  // DEATH ANIMATION
  if (this._battler && this._battler.isDead()) {
    if (!this._playedDeath && this._deathSprites.length > 0) {
      this._playedDeath = true;
      this._deathIndex = 0;
      this._frameCounter = 0;
      this._isPlayingDeath = true;

      this._frameSprites.forEach(s => s.visible = false);
      this._attackSprites.forEach(s => s.visible = false);
      this._damageSprites.forEach(s => s.visible = false);
      if (this._statusAnimations) {
        Object.values(this._statusAnimations).forEach(entry => entry.sprites.forEach(s => s.visible = false));
      }
      this._deathSprites[0].visible = true;
      return;
    }

    if (this._isPlayingDeath && this._deathSprites.length > 0) {
      this._frameCounter++;
      if (this._frameCounter >= this._frameSpeed) {
        this._deathSprites[this._deathIndex].visible = false;
        this._deathIndex++;
        if (this._deathIndex < this._deathSprites.length) {
          this._deathSprites[this._deathIndex].visible = true;
        } else {
          this._isPlayingDeath = false;
          // Lock on final frame
        }
        this._frameCounter = 0;
      }
      return;
    }

    // Already dead, animation finished
    return;
  }


  // DEATH CHECK - Hide all visuals if dead
  if (this._battler && this._battler.isDead()) {
    this._frameSprites.forEach(s => s.visible = false);
    this._attackSprites.forEach(s => s.visible = false);
    this._damageSprites.forEach(s => s.visible = false);
    if (this._statusAnimations) {
      Object.values(this._statusAnimations).forEach(entry => entry.sprites.forEach(s => s.visible = false));
    }
    return;
  }


    const speedMatch = note.match(/<Frame[ ]Speed:[ ](\d+)>/i);
    if (speedMatch) this._frameSpeed = Number(speedMatch[1]);

    const xMatch = note.match(/<Position[ ]X:[ ](\d+)>/i);
    const yMatch = note.match(/<Position[ ]Y:[ ](\d+)>/i);
    const baseX = xMatch ? Number(xMatch[1]) : Graphics.width / 2;
    const baseY = yMatch ? Number(yMatch[1]) : Graphics.height / 2;
    const offsetX = (this._enemyInstanceId % 3 - 1) * H_OFFSET;
    const offsetY = Math.floor(this._enemyInstanceId / 3) * V_OFFSET;
    this.x = baseX + offsetX;
    this.y = baseY + offsetY - 40;

    this.bitmap = null;

    const first = this._frameSprites[0];
    first.bitmap.addLoadListener(() => {
      first.visible = true;
    });
  };

  const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
  
})();


Sprite_Enemy.prototype.update = function () {
  Sprite_Battler.prototype.update.call(this);
  if (this._frameSprites.length === 0) return;

  // DEATH ANIMATION
  if (this._battler && this._battler.isDead()) {
    if (!this._playedDeath && this._deathSprites.length > 0) {
      this._playedDeath = true;
      this._deathIndex = 0;
      this._frameCounter = 0;
      this._isPlayingDeath = true;

      this._frameSprites.forEach(s => s.visible = false);
      this._attackSprites.forEach(s => s.visible = false);
      this._damageSprites.forEach(s => s.visible = false);
      if (this._statusAnimations) {
        Object.values(this._statusAnimations).forEach(entry => entry.sprites.forEach(s => s.visible = false));
      }
      this._deathSprites[0].visible = true;
      return;
    }

    if (this._isPlayingDeath && this._deathSprites.length > 0) {
      this._frameCounter++;
      if (this._frameCounter >= this._frameSpeed) {
        this._deathSprites[this._deathIndex].visible = false;
        this._deathIndex++;
        if (this._deathIndex < this._deathSprites.length) {
          this._deathSprites[this._deathIndex].visible = true;
        } else {
          this._isPlayingDeath = false;
          // Lock on final frame
        }
        this._frameCounter = 0;
      }
      return;
    }

    // Already dead, animation finished
    return;
  }


  // DEATH CHECK - Hide all visuals if dead
  if (this._battler && this._battler.isDead()) {
    this._frameSprites.forEach(s => s.visible = false);
    this._attackSprites.forEach(s => s.visible = false);
    this._damageSprites.forEach(s => s.visible = false);
    if (this._statusAnimations) {
      Object.values(this._statusAnimations).forEach(entry => entry.sprites.forEach(s => s.visible = false));
    }
    return;
  }


  const hideAll = () => {
    this._frameSprites.forEach(s => s.visible = false);
    this._attackSprites.forEach(s => s.visible = false);
    this._damageSprites.forEach(s => s.visible = false);
    if (this._statusAnimations) {
      Object.values(this._statusAnimations).forEach(entry => entry.sprites.forEach(s => s.visible = false));
    }
  };

  if (this._battler) {
    const currentHp = this._battler.hp;
    if (this._lastHp === undefined) this._lastHp = currentHp;

    if (currentHp < this._lastHp && this._damageSprites.length > 0 && !this._isPlayingDamage) {
      hideAll();
      this._damageIndex = 0;
      this._isPlayingDamage = true;
      this._damageSprites[0].visible = true;
      this._lastHp = currentHp;
      return;
    }
    this._lastHp = currentHp;
  }

  if (this._isPlayingDamage && this._damageSprites.length > 0) {
    this._frameCounter++;
    if (this._frameCounter >= this._frameSpeed) {
      this._damageSprites[this._damageIndex].visible = false;
      this._damageIndex++;
      if (this._damageIndex < this._damageSprites.length) {
        this._damageSprites[this._damageIndex].visible = true;
      } else {
        this._isPlayingDamage = false;
      }
      this._frameCounter = 0;
    }
    return;
  }

  if (this._battler && this._battler._actionState === 'acting' && !this._isPlayingAttack && this._attackSprites.length > 0) {
    hideAll();
    this._attackIndex = 0;
    this._isPlayingAttack = true;
    this._attackSprites[0].visible = true;
    return;
  }

  if (this._isPlayingAttack && this._attackSprites.length > 0) {
    this._frameCounter++;
    if (this._frameCounter >= this._frameSpeed) {
      this._attackSprites[this._attackIndex].visible = false;
      this._attackIndex++;
      if (this._attackIndex < this._attackSprites.length) {
        this._attackSprites[this._attackIndex].visible = true;
      } else {
        this._isPlayingAttack = false;
      }
      this._frameCounter = 0;
    }
    return;
  }

  if (this._battler && this._battler.isAlive() && Object.keys(this._statusAnimations).length > 0) {
    for (const tag in this._statusAnimations) {
      const { id, sprites } = this._statusAnimations[tag];
      if (this._battler.isStateAffected(id) && sprites.length > 0) {
        if (!this._isPlayingStatus || this._activeStatus !== tag) {
          hideAll();
          this._statusIndex = 0;
          this._isPlayingStatus = true;
          this._activeStatus = tag;
          this._frameCounter = 0;
          sprites[0].visible = true;
        } else {
          this._frameCounter++;
          if (this._frameCounter >= this._frameSpeed) {
            sprites[this._statusIndex].visible = false;
            this._statusIndex = (this._statusIndex + 1) % sprites.length;
            sprites[this._statusIndex].visible = true;
            this._frameCounter = 0;
          }
        }
        return;
      }
    }

    if (this._isPlayingStatus && this._activeStatus && this._statusAnimations[this._activeStatus]) {
      this._statusAnimations[this._activeStatus].sprites.forEach(s => s.visible = false);
    }
    this._isPlayingStatus = false;
    this._activeStatus = null;
  }

  // Default: play idle
  this._frameCounter++;
  if (this._frameCounter >= this._frameSpeed) {
    this._frameSprites[this._frameIndex].visible = false;
    this._frameIndex = (this._frameIndex + 1) % this._frameSprites.length;
    this._frameSprites[this._frameIndex].visible = true;
    this._frameCounter = 0;
  }
};
