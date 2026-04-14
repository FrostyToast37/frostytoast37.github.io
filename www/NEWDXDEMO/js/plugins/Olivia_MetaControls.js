//=============================================================================
// Olivia Engine - Meta Controls - for RPG Maker MV version 1.6.1
// Olivia_MetaControls.js
//=============================================================================
 /*:
 * @plugindesc <MetaControls> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that lets you control switches and variables
 * that last across a meta level on a game. A switch or variable designated to
 * function as a meta switch or meta variable can persist across different save
 * files. To assist in controlling meta properties of the game some more, the
 * developer can assign common events to run at the start of a new game or when
 * a game is loaded. Saving the game can also register map data to variables.
 *
 *
 *
 * ------------
 * Instructions
 * ------------
 *
 * <Global Meta>
 * - Place this in the name of a switch or variable that you want to have its
 * data persist across different saves and even new games. This does not have to
 * be the full name. It can be just a part of the switch or variable's name.
 *
 * <Local Meta>
 * - Place this in the name of a switch or variable that you want to have its
 * data persist across only related saves. This does not have to be the full
 * name. It can be a part of the switch or variable's name.
 *
 *
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Common Event on New Game: Run this common event when a new game is started.
 * Leave as 0 to not use this function.
 *
 * Common Event on Load: Run this common event when a game is loaded. Leave as
 * 0 to not use this function.
 *
 * Variables on Save: If any of these are set to variables, then those variables
 * will acquire the Map ID, Map X position, or Map Y position whenever the
 * player makes a save.
 *
 *
 *
 * ------------------------------------------
 * Which Saves Are Affected By <Local Meta> ?
 * ------------------------------------------
 *
 * Let's say you create three new games A, B, and C.
 *
 * If in playthrough A, you save in files 1 and 2, then <Local Meta> data will
 * affect both files 1 and 2. They will not affect the saves from playthroughs
 * B and C. To affect playthroughs B and C, it will have to be <Global Meta>.
 *
 * In playthrough B, you save in files 3, 4, 5. The saves made in playthroughs
 * A and C will not be affected by the <Local Meta> data made during playthrough
 * B and its saves. To affect them all, use <Global Meta>.
 *
 * For playthrough C, save files 6, 7, 8, 9, 10 are used. All other playthroughs
 * are completely unaffected by the <Local Meta> data used in playthrough C.
 * To affect other playthroughs, <Global Meta> has to be used.
 *
 * But there is a warning: <Local Meta> will not affect related playthroughs
 * for save files made before installing this plugin. This is due to the lack
 * proper linking across those saves to be used for meta data.
 *
 *
 *
 * -------------------
 * W A R N I N G ! ! !
 * -------------------
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 *
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins without credit.
 *
 *
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 * 
 * - Fallen Angel Olivia
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Common Event on New Game
 * @type common_event
 * @desc Run this common event when a new game is started. Leave as 0 to not use this function.
 * @default 0
 *
 * @param Common Event on Load
 * @type common_event
 * @desc Run this common event when a game is loaded. Leave as 0 to not use this function.
 * @default 0
 *
 * @param Variables on Save
 *
 * @param Map ID
 * @parent Variables on Save
 * @type variable
 * @desc Save the Map ID to this variable whenever the player saves. Recommended to be used with the <Local Meta> nametag.
 * @default 0
 *
 * @param Map X
 * @parent Variables on Save
 * @type variable
 * @desc Save the Map ID to this variable whenever the player saves. Recommended to be used with the <Local Meta> nametag.
 * @default 0
 *
 * @param Map Y
 * @parent Variables on Save
 * @type variable
 * @desc Save the Map ID to this variable whenever the player saves. Recommended to be used with the <Local Meta> nametag.
 * @default 0
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_MetaControls = true;

var Olivia = Olivia || {};
Olivia.MetaControls = Olivia.MetaControls || {};

var parameters = $plugins.filter(function(p) { return p.description.contains('<MetaControls>') })[0].parameters;

Olivia.MetaControls.NewGameCommonEvent = parseInt(parameters['Common Event on New Game'] || 0);
Olivia.MetaControls.LoadGameCommonEvent = parseInt(parameters['Common Event on Load'] || 0);
Olivia.MetaControls.VariableMapID = parseInt(parameters['Map ID'] || 0);
Olivia.MetaControls.VariableMapX = parseInt(parameters['Map X'] || 0);
Olivia.MetaControls.VariableMapY = parseInt(parameters['Map Y'] || 0);

//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.

Olivia.MetaControls.___DataManager_setupNewGame___ = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    Olivia.MetaControls.___DataManager_setupNewGame___.call(this);
    if (Olivia.MetaControls.NewGameCommonEvent > 0) {
        $gameTemp.reserveCommonEvent(Olivia.MetaControls.NewGameCommonEvent);
    }
};

Olivia.MetaControls.___DataManager_saveGame___ = DataManager.saveGame;
DataManager.saveGame = function(savefileId) {
    if (!!$gameVariables) {
        this.saveGameMetaControls();
    }
    return Olivia.MetaControls.___DataManager_saveGame___.call(this, savefileId);
};

DataManager.saveGameMetaControls = function() {
    if (Olivia.MetaControls.VariableMapID > 0) {
        $gameVariables.setValue(Olivia.MetaControls.VariableMapID, $gameMap.mapId());
    }
    if (Olivia.MetaControls.VariableMapX > 0) {
        $gameVariables.setValue(Olivia.MetaControls.VariableMapX, $gamePlayer.x);
    }
    if (Olivia.MetaControls.VariableMapY > 0) {
        $gameVariables.setValue(Olivia.MetaControls.VariableMapY, $gamePlayer.y);
    }
};

Olivia.MetaControls.___DataManager_loadGame___ = DataManager.loadGame;
DataManager.loadGame = function(savefileId) {
    var success = Olivia.MetaControls.___DataManager_loadGame___.call(this, savefileId);
    if (success) {
        $gameSystem.loadMetaSwitchesVariables();
        if (Olivia.MetaControls.LoadGameCommonEvent > 0) {
            $gameTemp.reserveCommonEvent(Olivia.MetaControls.LoadGameCommonEvent);
        }
    }
    return success;
};

//-----------------------------------------------------------------------------
// ConfigManager
//
// The static class that manages the configuration data.

Olivia.MetaControls.___ConfigManager_makeData___ = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Olivia.MetaControls.___ConfigManager_makeData___.call(this);
    config.MetaControlsData = this.MetaControlsData;
    return config;
};

Olivia.MetaControls.___ConfigManager_applyData___ = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Olivia.MetaControls.___ConfigManager_applyData___.call(this, config);
    this.MetaControlsData = config.MetaControlsData || {};
};

ConfigManager.getMetaControlsData = function(id) {
    this.MetaControlsData = this.MetaControlsData || {};
    this.MetaControlsData[id] = this.MetaControlsData[id] || { switches: [0], variables: [0] };
    return this.MetaControlsData[id];
};

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

Olivia.MetaControls.___Game_System_initialize___ = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Olivia.MetaControls.___Game_System_initialize___.call(this);
    this.initializeMetaID();
};

Game_System.prototype.initializeMetaID = function() {
    this._metaID = Date.now();
    this.loadMetaSwitchesVariables();
};

Game_System.prototype.getMetaID = function() {
    if (this._metaID == undefined) {
        this.initializeMetaID();
    }
    return this._metaID;
};

Game_System.prototype.loadMetaSwitchesVariables = function() {
    this.loadMetaSwitches();
    this.loadMetaVariables();
    if (!!$gameMap) {
        $gameMap.requestRefresh();
    }
};

Game_System.prototype.loadMetaSwitches = function() {
    if (!!$gameSwitches) {
        var switches = $dataSystem.switches;
        for (var i = 1; i < switches.length; i++) {
            if (switches[i].match(/<(?:Global|Global Meta)>/i || /<(?:Local|Local Meta|Meta)>/i)) {
                $gameSwitches.value(i);
            }
        }
    }
};

Game_System.prototype.loadMetaVariables = function() {
    if (!!$gameVariables) {
        var variables = $dataSystem.variables;
        for (var i = 1; i < variables.length; i++) {
            if (variables[i].match(/<(?:Global|Global Meta)>/i || /<(?:Local|Local Meta|Meta)>/i)) {
                $gameVariables.value(i);
            }
        }
    }
};

//-----------------------------------------------------------------------------
// Game_Switches
//
// The game object class for switches.

Olivia.MetaControls.___Game_Switches_value___ = Game_Switches.prototype.value;
Game_Switches.prototype.value = function(switchId) {
    if (!$dataSystem.switches[switchId]) {
        return Olivia.MetaControls.___Game_Switches_value___.call(this, switchId);
    }
    if ($dataSystem.switches[switchId].match(/<(?:Global|Global Meta)>/i)) {
        var value = !!ConfigManager.getMetaControlsData(0).switches[switchId];
        this._data[switchId] = value;
        return value;
    } else if ($dataSystem.switches[switchId].match(/<(?:Local|Local Meta|Meta)>/i)) {
        var value = !!ConfigManager.getMetaControlsData($gameSystem.getMetaID()).switches[switchId];
        this._data[switchId] = value;
        return value;
    } else {
        return Olivia.MetaControls.___Game_Switches_value___.call(this, switchId);
    }
};

Olivia.MetaControls.___Game_Switches_setValue___ = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
    Olivia.MetaControls.___Game_Switches_setValue___.call(this, switchId, value);
    if (switchId > 0 && switchId < $dataSystem.switches.length) {
        if ($dataSystem.switches[switchId].match(/<(?:Global|Global Meta)>/i)) {
            this.processMetaChange(switchId, value, true);
        } else if ($dataSystem.switches[switchId].match(/<(?:Local|Local Meta|Meta)>/i)) {
            this.processMetaChange(switchId, value, false);
        }
    }
};

Game_Switches.prototype.processMetaChange = function(switchId, value, global) {
    if (global) {
        var data = ConfigManager.getMetaControlsData(0);
    } else {
        var data = ConfigManager.getMetaControlsData($gameSystem.getMetaID());
    }
    data.switches[switchId] = value;
    this._data[switchId] = value;
    ConfigManager.save();
};

//-----------------------------------------------------------------------------
// Game_Variables
//
// The game object class for variables.

Olivia.MetaControls.___Game_Variables_value___ = Game_Variables.prototype.value;
Game_Variables.prototype.value = function(variableId) {
    if ($dataSystem.variables[variableId].match(/<(?:Global|Global Meta)>/i)) {
        var value = ConfigManager.getMetaControlsData(0).variables[variableId] || 0;
        this._data[variableId] = value;
        return value;
    } else if ($dataSystem.variables[variableId].match(/<(?:Local|Local Meta|Meta)>/i)) {
        var value = ConfigManager.getMetaControlsData($gameSystem.getMetaID()).variables[variableId] || 0;
        this._data[variableId] = value;
        return value;
    } else {
        return Olivia.MetaControls.___Game_Variables_value___.call(this, variableId);
    }
};

Olivia.MetaControls.___Game_Variables_setValue___ = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
    Olivia.MetaControls.___Game_Variables_setValue___.call(this, variableId, value);
    if (variableId > 0 && variableId < $dataSystem.variables.length) {
        if ($dataSystem.variables[variableId].match(/<(?:Global|Global Meta)>/i)) {
            this.processMetaChange(variableId, value, true);
        } else if ($dataSystem.variables[variableId].match(/<(?:Local|Local Meta|Meta)>/i)) {
            this.processMetaChange(variableId, value, false);
        }
    }
};

Game_Variables.prototype.processMetaChange = function(variableId, value, global) {
    if (global) {
        var data = ConfigManager.getMetaControlsData(0);
    } else {
        var data = ConfigManager.getMetaControlsData($gameSystem.getMetaID());
    }
    if (typeof value === 'number') {
        value = Math.floor(value);
    }
    data.variables[variableId] = value;
    this._data[variableId] = value;
    ConfigManager.save();
};

























