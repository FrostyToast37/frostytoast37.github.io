//=============================================================================
// Maliki's Rolling Stats MZ
// MalMZRollingStats.js
// version 1.1aa
//=============================================================================
/*: 
 * @target MZ
 *  
 * @plugindesc ver1.1a - Allows HP, MP and/or TP stats to change in a more 
 * gradual manner during battles.
 * 
 * @author Maliki79
 *
 * @param HP Tick Delay 
 * @type integer    
 * @desc Amount of frames the plugin will wait before processing a tick
 * (30 frames = approx 1 sec real time; the lower the number, the faster the stats will roll)
 * @default 10
 *
 * @param MP Tick Delay 
 * @type integer    
 * @desc Amount of frames the plugin will wait before processing a tick
 * (30 frames = approx 1 sec real time; the lower the number, the faster the stats will roll)
 * @default 10
 *
 * @param TP Tick Delay 
 * @type integer    
 * @desc Amount of frames the plugin will wait before processing a tick
 * (30 frames = approx 1 sec real time; the lower the number, the faster the stats will roll)
 * @default 10      
 *
 * @help This plugin is currently plug and play.
 * Just install this plugin and it will do as intended. 
 * Optional: You can edit the params to adjust the speed by which the stats roll.
 * (Set a param to 0 to not use that stat.)
 */
 
var MalRollingPar1  = PluginManager.parameters('MalMZRollingStats')["HP Tick Delay"];
if(MalRollingPar1 < 0) MalRollingPar1 = 0;
var MalRollingPar2  = PluginManager.parameters('MalMZRollingStats')["MP Tick Delay"];
if(MalRollingPar2 < 0) MalRollingPar2 = 0;
var MalRollingPar3  = PluginManager.parameters('MalMZRollingStats')["TP Tick Delay"];
if(MalRollingPar3 < 0) MalRollingPar3 = 0;
 
var MalRollingDatabaseLoad = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!MalRollingDatabaseLoad.call(this)) return false;
  if (!DataManager._malRolling_DatabaseLoaded) {
    this.processRollingData($dataActors);
    DataManager._malRolling_DatabaseLoaded = true;
  }
  return true;
};
 
DataManager.processRollingData = function (group) {
for (i = 1; i < group.lenght; i++) {
    var obj = group[i];
    obj.rollingHP = 0;
    obj.rollingMP = 0;
    obj.rollingTP = 0;
	obj.playDeathSE = true;
};
};
 
var MalRollingHpBMSetup = BattleManager.setup
BattleManager.setup = function(troopId, canEscape, canLose) {
    MalRollingHpBMSetup.call(this, troopId, canEscape, canLose);
    this.rollingUpdaterHP = 0;
    this.rollingUpdaterMP = 0;
    this.rollingUpdaterTP = 0;
    this.rollingStatSetup();
};
 
BattleManager.rollingStatSetup = function() {
for(var i = 0; i < $gameParty.members().length; i++) {
    actor = $gameParty.members()[i];
    actor.rollingHP = actor.hp;
    actor.rollingMP = actor.mp;
    actor.rollingTP = actor.tp;
};
};
 
var MalRollingHpBMUpdate = BattleManager.update
BattleManager.update = function(timeActive) {
    this.updateRollingStats();
    MalRollingHpBMUpdate.call(this, timeActive);
    if(this._currentActor && this._currentActor.isDead()) this.selectNextCommand();
};
 
BattleManager.updateRollingStats = function() {
if(MalRollingPar1 != 0) this.rollingUpdaterHP++;
if(MalRollingPar2 != 0) this.rollingUpdaterMP++;
if(MalRollingPar3 != 0) this.rollingUpdaterTP++;
if(this.rollingUpdaterHP > MalRollingPar1) {
    this.rollingUpdaterHP = 0;
    this.checkRollingStatHP($gameParty.members());
} 
if(this.rollingUpdaterMP > MalRollingPar2) {
    this.rollingUpdaterMP = 0;
    this.checkRollingStatMP($gameParty.members());
}
if(this.rollingUpdaterTP > MalRollingPar3) {
    this.rollingUpdaterTP = 0;
    this.checkRollingStatTP($gameParty.members());
}
};
 
BattleManager.checkRollingStatHP = function(actors){
for(var i = 0; i < actors.length; i++) {
    var actor = actors[i];
    actor.rollingHP = Math.floor(actor.rollingHP);  
    if (actor.hp != actor.rollingHP){
        var multi = 1;
        if(actor.hp > actor.rollingHP) multi *= -1;
        actor.gainHp(multi);
        if(actor.hp == 0) {
            actor.performCollapse();
            actor.rollingHP = 0;
        };
        if (actor.hp > actor.mhp) {
            actor.hp = actor.mhp;
            actor.rollingHP = actor.mhp;
        };
    }
};
};
 
BattleManager.checkRollingStatMP = function(actors){
for(var i = 0; i < actors.length; i++) {
    var actor = actors[i];
    actor.rollingMP = Math.floor(actor.rollingMP);
    if (actor.mp != actor.rollingMP){
    var multi = 1;
    if(actor.mp > actor.rollingMP) multi *= -1;
        actor.gainMp(multi);
    };
    if(actor.mp > actor.mmp) {
        actor.mp = actor.mmp;
        actor.rollingMP = actor.mmp;
    };
};
};
 
BattleManager.checkRollingStatTP = function(actors){
for(var i = 0; i < actors.length; i++) {
    var actor = actors[i];
    actor.rollingTP = Math.floor(actor.rollingTP);
    if (actor._tp != actor.rollingTP){
    var multi = 1;
    if(actor._tp > actor.rollingTP) multi *= -1;
        actor._tp += multi;
    }
};
};
 
var MalRollingGAXHPDam = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    if (this.isDrain()) {
        value = Math.min(target.hp, value);
    }
    this.makeSuccess(target);
    if(target.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar1 != 0) {
        var tLuck = target.luk;
        var sLuck = this.subject().luk;
        var perc = 50 + (Math.abs(Math.randomInt(tLuck) - Math.randomInt(sLuck)));
        if(perc > 100) perc = 100;
        if(tLuck < sLuck)  {
            var directDam = parseInt(value * (perc / 100));
            var slideDam = value - directDam;
        } else {
            var slideDam = parseInt(value * (perc / 100));
            var directDam = value - slideDam;
            
        };
        target.gainHp(-directDam);
        target.rollingHP -= Math.floor(value);
        if(target.rollingHP < 0) target.rollingHP = 0;
		if (target.rollingHP == 0 && target.playDeathSE) this.playDeathSound(target);
        if(target.rollingHP > target.mhp) target.rollingHP = target.mhp;
        target._result.hpDamage = value;
        target._result.hpAffected = true;
    } else {
    target.gainHp(-value);
    };
    if (value > 0) {
        target.onDamage(value);
    }
    this.gainDrainedHp(value);
};
 
Game_Action.prototype.executeMpDamage = function(target, value) {
    if (!this.isMpRecover()) {
        value = Math.min(target.mp, value);
    }
    if (value !== 0) {
        this.makeSuccess(target);
        if(target.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar2 != 0) {
            var tLuck = target.luk;
            var sLuck = this.subject().luk;
            var perc = 50 + (Math.abs(Math.randomInt(tLuck) - Math.randomInt(sLuck)));
            if(perc > 100) perc = 100;
            if(tLuck < sLuck)  {
                var directDam = parseInt(value * (perc / 100));
                var slideDam = value - directDam;
            } else {
                var slideDam = parseInt(value * (perc / 100));
                var directDam = value - slideDam;
            
            };
        target.gainMp(-directDam);
        target.rollingMP -= Math.floor(value);
        if(target.rollingMP < 0) target.rollingMP = 0;
        if(target.rollingMP > target.mmp) target.rollingMP = target.mmp;
        target._result.mpDamage = value;
        } else {    
        target.gainMp(-value);
        };
    this.gainDrainedMp(value);
    };
};
 
Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
    let value = (target.mhp * effect.value1 + effect.value2) * target.rec;
    if (this.isItem()) {
        value *= this.subject().pha;
    }
    value = Math.floor(value);
    if (value !== 0) {
        var tLuck = target.luk;
        var sLuck = this.subject().luk;
        var perc = 50 + (Math.abs(Math.randomInt(tLuck) - Math.randomInt(sLuck)));
        if(perc > 100) perc = 100;
        if(tLuck < sLuck)  {
            var directDam = parseInt(value * (perc / 100));
            var slideDam = value - directDam;
        } else {
            var slideDam = parseInt(value * (perc / 100));
            var directDam = value - slideDam;
            
        };
        if(target.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar1 != 0) {
        target.gainHp(directDam);
        target.rollingHP += Math.floor(value);
        if(target.rollingHP < 0) target.rollingHP = 0;
        if(target.rollingHP > target.mhp) target.rollingHP = target.mhp;
        target._result.hpDamage = -value;
        target._result.hpAffected = true;
    } else {
        target.gainHp(value);
    };
        this.makeSuccess(target);
    }
};

 Game_Battler.prototype.regenerateHp = function() {
    const minRecover = -this.maxSlipDamage();
    const value = Math.max(Math.floor(this.mhp * this.hrg), minRecover);
    if (value !== 0) {
		if (this.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar1 != 0) {
			this.rollingHP += value;
			if(this.rollingHP < 0) this.rollingHP = 0;
		} else {
        this.gainHp(value);
		}
	}
};


Game_Battler.prototype.regenerateMp = function() {
    const value = Math.floor(this.mmp * this.mrg);
    if (value !== 0) {
		if(this.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar2 != 0) {
			this.rollingMP += value;
			if(this.rollingMP < 0) this.rollingMP = 0;
		} else {
        this.gainMp(value);
		}
    }
};


Game_Action.prototype.gainDrainedHp = function(value) {
    if (this.isDrain()) {
        let gainTarget = this.subject();
        if (this._reflectionTarget) {
            gainTarget = this._reflectionTarget;
        }
		if(gainTarget.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar1 != 0) {
			gainTarget.rollingHP += value;
			if(gainTarget.rollingHP < 0) gainTarget.rollingHP = 0;
		} else {
        gainTarget.gainHp(value);
		}
    }
};

Game_Action.prototype.gainDrainedMp = function(value) {
    if (this.isDrain()) {
        let gainTarget = this.subject();
        if (this._reflectionTarget) {
            gainTarget = this._reflectionTarget;
        }
		if(gainTarget.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar2 != 0) {
			gainTarget.rollingMP += value;
			if(gainTarget.rollingMP < 0) gainTarget.rollingMP = 0;
		} else {
        gainTarget.gainMp(value);
		}
    }
};

Game_Action.prototype.itemEffectRecoverMp = function(target, effect) {
    let value = (target.mmp * effect.value1 + effect.value2) * target.rec;
    if (this.isItem()) {
        value *= this.subject().pha;
    }
    value = Math.floor(value);
    if (value !== 0) {
        var tLuck = target.luk;
        var sLuck = this.subject().luk;
        var perc = 50 + (Math.abs(Math.randomInt(tLuck) - Math.randomInt(sLuck)));
        if(perc > 100) perc = 100;
        if(tLuck < sLuck)  {
            var directDam = parseInt(value * (perc / 100));
            var slideDam = value - directDam;
        } else {
            var slideDam = parseInt(value * (perc / 100));
            var directDam = value - slideDam;
            
        };
        if(target.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar2 != 0) {
        target.gainMp(directDam);
        target.rollingMP += Math.floor(value);
        if(target.rollingMP < 0) target.rollingMP = 0;
        if(target.rollingMP > target.mmp) target.rollingMP = target.mmp;
        target._result.mpDamage = -value;
    } else {
        target.gainMp(value);
    };
        this.makeSuccess(target);
    }
};
 
Game_Action.prototype.playDeathSound = function (actor) {
	var sound = {
            name: "Bell1",
            volume: 100,
            pitch: 100,
            pan: 0,
			};
	AudioManager.playSe(sound);
}; 
 
Game_Battler.prototype.gainTp = function(value) {
     if(this.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar3 != 0) {
     this._result.tpDamage = -value;
     this.rollingTP += value;
     if(this.rollingTP > this.maxTp()) this.rollingTP = this.maxTp();
     } else {
    this.setTp(this.tp + value);
    };
};
 
Game_Battler.prototype.gainSilentTp = function(value) {
     if(this.isActor() && SceneManager._scene instanceof Scene_Battle && MalRollingPar3 != 0) {
     this.rollingTP += value;
     if(this.rollingTP > this.maxTp()) this.rollingTP = this.maxTp();
     } else {
    this.setTp(this.tp + value);
    };
};
 
Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
    const value = Math.floor(50 * damageRate * this.tcr);
    this.rollingTP += value;
     if(this.rollingTP > this.maxTp()) this.rollingTP = this.maxTp();
    this.gainSilentTp(value);
};
 
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    if(this.isActor() && SceneManager._scene instanceof Scene_Battle) {
        if(MalRollingPar2 != 0) {
            this.rollingMP -= this.skillMpCost(skill);
        } else {
            this._mp -= this.skillMpCost(skill);
        };
        if(MalRollingPar3 != 0) {
            this.rollingTP -= this.skillTpCost(skill);
        } else {
            this._tp -= this.skillTpCost(skill);
        };
    } else {
        this._mp -= this.skillMpCost(skill);
        this._tp -= this.skillTpCost(skill);
    };
};
 
var malRollingStatsInitTp = Game_Battler.prototype.initTp;
Game_Battler.prototype.initTp = function() {
    malRollingStatsInitTp.call(this);
    this.rollingTP = this._tp;
};
ColorManager.hpColor = function(actor) {
    if (!actor) {
        return this.normalColor();
    } else if (actor.isDead() || (actor.rollingHP == 0 && SceneManager._scene instanceof Scene_Battle)) {
        return this.deathColor();
    } else if (actor.isDying()) {
        return this.crisisColor();
    } else {
        return this.normalColor();
    }
};