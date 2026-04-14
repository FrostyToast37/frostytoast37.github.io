//-----------------------------------------------------------------------------
//  Galv's Animated Battleback
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_AnimatedBattleback.js
//-----------------------------------------------------------------------------
//  2016-08-29 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_AnimatedBattleback = true;

var Galv = Galv || {};        // Galv's main object
Galv.AnimBB = Galv.AnimBB || {};      // Galv's plugin stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Allows you to use a battleback image with multiple frames for animated backgrounds in battle
 *
 * @author Galv - galvs-scripts.com
 *
 * @help
 *   Galv's Animated Battlebacks
 * ----------------------------------------------------------------------------
 * In order to make a battleback animated, you need to use specially made
 * battleback files that contains multiple backgrounds lined up next to each
 * other and the filename to include in braquets a number of how many frames
 * are in the image, a comma and then the speed the frames cycle. 
 * Each frame should be the size of your game window dimensions.
 * (See demo for example).
 *
 * EXAMPLE:
 * A battleback with 3 frames and speed 10 would have a filename like:
 * Forest(3,10).png
 *
 * Keep in mind that large image sizes can cause loading lag, so you use this
 * sparingly and maybe get a pre-caching plugin to precache your battlebacks.
 *   
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.AnimBB.Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	this.checkAnimBBs();
	Galv.AnimBB.Spriteset_Battle_initialize.call(this);
};

Spriteset_Battle.prototype.checkAnimBBs = function() {
	this.bb1anim = this.battleback1Name().match(/\((.*)\)/i);
	this.bb2anim = this.battleback2Name().match(/\((.*)\)/i);
	if (this.bb1anim || this.bb2anim) {
		this._animatedBB = true;
	};
};

Galv.AnimBB.Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {
	Galv.AnimBB.Spriteset_Battle_createBattleback.call(this);
	this.setAnimatedBattlebacks();
};

Galv.AnimBB.Spriteset_Battle_locateBattleback = Spriteset_Battle.prototype.locateBattleback;
Spriteset_Battle.prototype.locateBattleback = function() {
	if (this._animatedBB) return;
    Galv.AnimBB.Spriteset_Battle_locateBattleback.call(this);
};

Spriteset_Battle.prototype.setAnimatedBattlebacks = function() {
	if (this.bb1anim) {
		var array = this.bb1anim[1].split(",");
		this._back1Sprite._aFrames = Number(array[0]);
		this._back1Sprite._aSpeed = Number(array[1]);
		this._back1Sprite._aFrame = 0;
		this._back1Sprite._aTicker = 0;
		this._back1Sprite.update = TilingSprite.prototype.updateAnimBattleback;
		this._back1Sprite.x = 0;
	};
	if (this.bb2anim) {
		var array = this.bb2anim[1].split(",");
		this._back2Sprite._aFrames = Number(array[0]);
		this._back2Sprite._aSpeed = Number(array[1]);
		this._back2Sprite._aFrame = 0;
		this._back2Sprite._aTicker = 0;
		this._back2Sprite.update = TilingSprite.prototype.updateAnimBattleback;
		this._back2Sprite.x = 0;
	};
};

TilingSprite.prototype.updateAnimBattleback = function() {
	TilingSprite.prototype.update.call(this);
	if (this._aTicker <= 0) {
		this._aFrame = this._aFrame === this._aFrames - 1 ? 0 : this._aFrame + 1;
		this.origin.x = this._aFrame * (this.bitmap.width / this._aFrames);
		this._aTicker = this._aSpeed;
	};
	this._aTicker -= 1;
};
})();