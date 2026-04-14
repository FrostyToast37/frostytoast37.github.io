//=============================================================================
// VisuStella MZ - Message Letter Sounds
// VisuMZ_3_MessageSounds.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_MessageSounds = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MsgLetterSounds = VisuMZ.MsgLetterSounds || {};
VisuMZ.MsgLetterSounds.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.03] [MsgLetterSounds]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Letter_Sounds_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables your messages to play sound effects per letter (or at
 * certain intervals of letters) whenever they appear in a message window.
 * Letter sounds can be used to add emotion, character, and feeling to scenes 
 * and provide audio feedback to the activity going on in the screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Declare which message letter sounds, their volume, pitch, and pan.
 * * Add variance to the volume, pitch, and pan to produce more speech-like
 *   behaviors.
 * * Blacklist certain letters from having any sounds played at all.
 * * Change the sounds through Plugin Commands and/or text codes to alter the
 *   feeling of a message.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_MessageCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_OptionsCore
 *
 * An added option to the Audio category of the default Options Core settings
 * allow players to turn on/off the Message Letter Sounds in case they may find
 * them to be unpleasing.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that have been added through this plugin. These
 * text codes will not work with your game if the plugin is OFF or not present.
 *
 * ---
 *
 * --------------------------   -----------------------------------------------
 * Text Code                    Effect (Message Window Only)
 * --------------------------   -----------------------------------------------
 * <Letter Sound On>            Turns on the Message Letter Sounds.
 * <Letter Sound Off>           Turns off the Message letter Sounds.
 * 
 * \LetterSoundName<filename>   Changes SFX played to 'filename'. Do not use or
 *                              insert the file extension. Case sensitive.
 * \LetterSoundVolume[x]        Changes SFX volume to x value.
 * \LetterSoundPitch[x]         Changes SFX pitch to x value.
 * \LetterSoundPan[x]           Changes SFX pan to x value.
 * \LetterSoundVolumeVar[x]     Changes SFX volume variance to x value.
 * \LetterSoundPitchVar[x]      Changes SFX pitch variance to x value.
 * \LetterSoundPanVar[x]        Changes SFX pan variance to x value.
 * 
 * ---
 * 
 * For those who want to use shorter text codes:
 * 
 * ---
 * 
 * -------------   ------------------------------------------------------------
 * Text Code       Effect (Message Window Only)
 * -------------   ------------------------------------------------------------
 * 
 * \LSON           Turns on the Message Letter Sounds.
 * \LSOFF          Turns off the Message letter Sounds.
 * 
 * \LSN<filename>  Changes SFX played to 'filename'. Do not use or insert the
 *                 file extension. Case sensitive.
 * \LSV[x]         Changes SFX volume to x value.
 * \LSPI[x]        Changes SFX pitch to x value.
 * \LSPA[x]        Changes SFX pan to x value.
 * \LSVV[x]        Changes SFX volume variance to x value.
 * \LSPIV[x]       Changes SFX pitch variance to x value.
 * \LSPAV[x]       Changes SFX pan variance to x value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Sound Plugin Commands ===
 * 
 * ---
 *
 * Message Sound: Change
 * - Change the settings to the Message Sound settings below.
 *
 *   Filename:
 *   - Filename of the sound effect played.
 *
 *   Interval:
 *   - Interval the sound effect from being played between how many characters?
 *
 *   Volume:
 *   - Volume of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the volume by how much?
 *
 *   Pitch:
 *   - Pitch of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the pitch by how much?
 *
 *   Pan:
 *   - Pan of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the pan by how much?
 *
 * ---
 *
 * Message Sound: Reset
 * - Resets the settings to the Plugin Parameters settings.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable/Disable Letter Sounds
 * - Enables/disables Message Letter Sounds for the game.
 *
 *   Enable/Disable?:
 *   - Enables/disables Message Letter Sounds for the game.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the settings that determine the default settings for the letter
 * sound as well as default enabling of the sounds. There is also a blacklist
 * here to let you decide which letter characters will not play sounds.
 *
 * ---
 *
 * Enable
 * 
 *   Default Enable?:
 *   - Enable Letter Sounds by default?
 * 
 *   Blacklisted Letters:
 *   - This is a list of individual characters that are blacklisted from having
 *     sounds play.
 *
 * ---
 *
 * Default Sound Settings
 *
 *   Filename:
 *   - Filename of the sound effect played.
 *
 *   Interval:
 *   - Interval the sound effect from being played between how many characters?
 *
 *   Volume:
 *   - Volume of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the volume by how much?
 *
 *   Pitch:
 *   - Pitch of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the pitch by how much?
 *
 *   Pan:
 *   - Pan of the sound effect played.
 *
 *     Variance:
 *     - When playing the sound effect, vary the pan by how much?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: September 29, 2022
 * * Bug Fixes!
 * ** Sound effects should now work better with Word Wrap. Fix made by Irina.
 * 
 * Version 1.02: May 14, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Empty text won't prompt a message sound effect to play. Fixed by Yanfly.
 *
 * Version 1.00: January 6, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgSoundChangeMessageSound
 * @text Message Sound: Change
 * @desc Change the settings to the Message Sound settings below.
 * 
 * @arg name:str
 * @text Filename
 * @parent Default
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Cursor3
 *
 * @arg Interval:num
 * @text Interval
 * @parent name:str
 * @type number
 * @desc Interval the sound effect from being played between how many characters?
 * @default 2
 *
 * @arg volume:num
 * @text Volume
 * @parent Default
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @arg VolVariance:num
 * @text Variance
 * @parent volume:num
 * @type number
 * @desc When playing the sound effect, vary the volume by how much?
 * @default 10
 *
 * @arg pitch:num
 * @text Pitch
 * @parent Default
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @arg PitchVariance:num
 * @text Variance
 * @parent pitch:num
 * @type number
 * @desc When playing the sound effect, vary the pitch by how much?
 * @default 20
 *
 * @arg pan:num
 * @text Pan
 * @parent Default
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @arg PanVariance:num
 * @text Variance
 * @parent pan:num
 * @type number
 * @desc When playing the sound effect, vary the pan by how much?
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgSoundResetMessageSound
 * @text Message Sound: Reset
 * @desc Resets the settings to the Plugin Parameters settings.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableMessageSounds
 * @text System: Enable/Disable Letter Sounds
 * @desc Enables/disables Message Letter Sounds for the game.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Message Letter Sounds for the game.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageSounds
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Enable
 *
 * @param EnableSound:eval
 * @text Default Enable?
 * @parent Enable
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Letter Sounds by default?
 * @default true
 *
 * @param BlackList:arraystr
 * @text Blacklisted Letters
 * @parent Enable
 * @type string[]
 * @desc This is a list of individual characters that are blacklisted from having sounds play.
 * @default [" ","~","\"","'"]
 *
 * @param Default
 * @text Default Sound Settings
 * 
 * @param name:str
 * @text Filename
 * @parent Default
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Cursor3
 *
 * @param Interval:num
 * @text Interval
 * @parent name:str
 * @type number
 * @desc Interval the sound effect from being played between how many characters?
 * @default 2
 *
 * @param volume:num
 * @text Volume
 * @parent Default
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param VolVariance:num
 * @text Variance
 * @parent volume:num
 * @type number
 * @desc When playing the sound effect, vary the volume by how much?
 * @default 10
 *
 * @param pitch:num
 * @text Pitch
 * @parent Default
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param PitchVariance:num
 * @text Variance
 * @parent pitch:num
 * @type number
 * @desc When playing the sound effect, vary the pitch by how much?
 * @default 20
 *
 * @param pan:num
 * @text Pan
 * @parent Default
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param PanVariance:num
 * @text Variance
 * @parent pan:num
 * @type number
 * @desc When playing the sound effect, vary the pan by how much?
 * @default 5
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x439335=_0x5e59;function _0x2fc5(){const _0x3099ae=['preFlushTextState','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','PitchVariance','JSON','prototype','VisuMZ_1_OptionsCore','Window_Message_preConvertEscapeCharacters','378492VdWCwK','wwmxJ','obtainEscapeParam','622prxEgo','Game_System_initialize','MSGLETTERSOUNDON','trim','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ARRAYFUNC','LETTERSOUNDPANVAR','afapz','log','QtElc','format','setMessageSoundSfx','LETTERSOUNDVOLUMEVARIANCE','NNIUR','map','NuHew','Enable','LETTERSOUNDINTERVAL','parse','910357rppjwr','playSe','Window_Message_newPage','1964235PfAKyI','LSI','838952fJdmZu','pitch','setMessageSoundVolumeVariance','LSVV','GlBGF','msgLetterSound','_messageSoundSfx','VisuMZ_1_MessageCore','LSPIV','pan','_messageSoundVolumeVariance','_messageSoundPitchVariance','ZzTxt','call','NUM','PanVariance','return\x200','MSGLETTERSOUNDOFF','ConvertParams','_messageSoundPanVariance','_messageSoundEnable','10479Kixmxx','ateKw','match','LETTERSOUNDNAME','STRUCT','LSN','initMessageSoundsSettings','ARRAYNUM','gXTIE','FUNC','Settings','initialize','MsgLetterSounds','volume','vhffx','QfHti','LETTERSOUNDPAN','version','getMessageSoundVolumeVariance','description','mpEDq','2367684kcBrGY','LETTERSOUNDPITCH','setMessageSoundEnabled','VolVariance','getMessageSoundInterval','ARRAYEVAL','playMessageSound','RQbrT','parameters','ARRAYJSON','status','processEscapeCharacter','ARRAYSTRUCT','setMessageSoundPanVariance','tDafP','setMessageSoundInterval','LETTERSOUNDPANVARIANCE','preConvertEscapeCharacters','registerCommand','buffer','randomInt','isMessageSoundEnabled','MsgSoundChangeMessageSound','Window_Message_preFlushTextState','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawing','\x1bMsgLetterSoundOn[0]','max','convertMessageSoundsTextCodes','BlackList','EVAL','Interval','SystemEnableMessageSounds','name','LETTERSOUNDVOLUMEVAR','filter','exit','isMessageSoundPlayed','makeDeepCopy','gFxIE','Window_Message_processEscapeCharacter','21405344sKXeQb','getMessageSoundSfx','isMsgLetterSoundBlacklisted','includes','LETTERSOUNDPITCHVAR','\x1bMsgLetterSoundOff[0]','LETTERSOUNDVOLUME','getMessageSoundPanVariance','_messageSoundInterval','replace'];_0x2fc5=function(){return _0x3099ae;};return _0x2fc5();}(function(_0x4fe86e,_0x490646){const _0x106173=_0x5e59,_0x21663b=_0x4fe86e();while(!![]){try{const _0x2e16e9=-parseInt(_0x106173(0x12b))/0x1+parseInt(_0x106173(0x113))/0x2*(-parseInt(_0x106173(0x140))/0x3)+parseInt(_0x106173(0x110))/0x4+parseInt(_0x106173(0x129))/0x5+-parseInt(_0x106173(0x155))/0x6+-parseInt(_0x106173(0x126))/0x7+parseInt(_0x106173(0xff))/0x8;if(_0x2e16e9===_0x490646)break;else _0x21663b['push'](_0x21663b['shift']());}catch(_0x207547){_0x21663b['push'](_0x21663b['shift']());}}}(_0x2fc5,0xae1ee));function _0x5e59(_0x7fb1e4,_0xcd0a8a){const _0x2fc56e=_0x2fc5();return _0x5e59=function(_0x5e5982,_0x2b3588){_0x5e5982=_0x5e5982-0xe4;let _0x1dbbca=_0x2fc56e[_0x5e5982];return _0x1dbbca;},_0x5e59(_0x7fb1e4,_0xcd0a8a);}var label='MsgLetterSounds',tier=tier||0x0,dependencies=[_0x439335(0x132)],pluginData=$plugins[_0x439335(0xf9)](function(_0x6ac0b8){const _0x444c78=_0x439335;return _0x6ac0b8[_0x444c78(0x15f)]&&_0x6ac0b8[_0x444c78(0x153)][_0x444c78(0x102)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x439335(0x14a)]||{},VisuMZ['ConvertParams']=function(_0x2e9c5a,_0x3a65fe){const _0x341871=_0x439335;for(const _0x3e7ba3 in _0x3a65fe){if(_0x3e7ba3[_0x341871(0x142)](/(.*):(.*)/i)){const _0x26217e=String(RegExp['$1']),_0xf86a54=String(RegExp['$2'])['toUpperCase']()[_0x341871(0x116)]();let _0x3f90d4,_0x2cea33,_0x357f5b;switch(_0xf86a54){case _0x341871(0x139):_0x3f90d4=_0x3a65fe[_0x3e7ba3]!==''?Number(_0x3a65fe[_0x3e7ba3]):0x0;break;case _0x341871(0x147):_0x2cea33=_0x3a65fe[_0x3e7ba3]!==''?JSON[_0x341871(0x125)](_0x3a65fe[_0x3e7ba3]):[],_0x3f90d4=_0x2cea33[_0x341871(0x121)](_0x592a32=>Number(_0x592a32));break;case _0x341871(0xf4):_0x3f90d4=_0x3a65fe[_0x3e7ba3]!==''?eval(_0x3a65fe[_0x3e7ba3]):null;break;case _0x341871(0x15a):_0x2cea33=_0x3a65fe[_0x3e7ba3]!==''?JSON[_0x341871(0x125)](_0x3a65fe[_0x3e7ba3]):[],_0x3f90d4=_0x2cea33['map'](_0x360703=>eval(_0x360703));break;case _0x341871(0x10c):_0x3f90d4=_0x3a65fe[_0x3e7ba3]!==''?JSON[_0x341871(0x125)](_0x3a65fe[_0x3e7ba3]):'';break;case _0x341871(0x15e):_0x2cea33=_0x3a65fe[_0x3e7ba3]!==''?JSON[_0x341871(0x125)](_0x3a65fe[_0x3e7ba3]):[],_0x3f90d4=_0x2cea33[_0x341871(0x121)](_0x3f8617=>JSON[_0x341871(0x125)](_0x3f8617));break;case _0x341871(0x149):_0x3f90d4=_0x3a65fe[_0x3e7ba3]!==''?new Function(JSON['parse'](_0x3a65fe[_0x3e7ba3])):new Function(_0x341871(0x13b));break;case _0x341871(0x118):_0x2cea33=_0x3a65fe[_0x3e7ba3]!==''?JSON[_0x341871(0x125)](_0x3a65fe[_0x3e7ba3]):[],_0x3f90d4=_0x2cea33[_0x341871(0x121)](_0x144d62=>new Function(JSON[_0x341871(0x125)](_0x144d62)));break;case'STR':_0x3f90d4=_0x3a65fe[_0x3e7ba3]!==''?String(_0x3a65fe[_0x3e7ba3]):'';break;case'ARRAYSTR':_0x2cea33=_0x3a65fe[_0x3e7ba3]!==''?JSON[_0x341871(0x125)](_0x3a65fe[_0x3e7ba3]):[],_0x3f90d4=_0x2cea33[_0x341871(0x121)](_0x3d2bbe=>String(_0x3d2bbe));break;case _0x341871(0x144):_0x357f5b=_0x3a65fe[_0x3e7ba3]!==''?JSON['parse'](_0x3a65fe[_0x3e7ba3]):{},_0x3f90d4=VisuMZ[_0x341871(0x13d)]({},_0x357f5b);break;case _0x341871(0x161):_0x2cea33=_0x3a65fe[_0x3e7ba3]!==''?JSON[_0x341871(0x125)](_0x3a65fe[_0x3e7ba3]):[],_0x3f90d4=_0x2cea33[_0x341871(0x121)](_0x36e44b=>VisuMZ['ConvertParams']({},JSON[_0x341871(0x125)](_0x36e44b)));break;default:continue;}_0x2e9c5a[_0x26217e]=_0x3f90d4;}}return _0x2e9c5a;},(_0x37d03c=>{const _0x4385f7=_0x439335,_0x3991d8=_0x37d03c[_0x4385f7(0xf7)];for(const _0x19e3be of dependencies){if(_0x4385f7(0x12f)===_0x4385f7(0x148)){if(_0x1d8b23[_0x4385f7(0x10e)]){if(_0x5ca76b&&_0x35fe36['msgLetterSound']!==_0x1994fa){if(!_0x1ac6f1[_0x4385f7(0x130)])return![];}}if(this[_0x4385f7(0x107)]-->0x0)return![];if(!_0x4a3172[_0x4385f7(0xeb)]())return![];if(!_0x10decf[_0x4385f7(0xef)])return![];return!![];}else{if(!Imported[_0x19e3be]){alert(_0x4385f7(0x117)[_0x4385f7(0x11d)](_0x3991d8,_0x19e3be)),SceneManager[_0x4385f7(0xfa)]();break;}}}const _0x34b30f=_0x37d03c[_0x4385f7(0x153)];if(_0x34b30f[_0x4385f7(0x142)](/\[Version[ ](.*?)\]/i)){if(_0x4385f7(0xe4)==='tDafP'){const _0x3fa475=Number(RegExp['$1']);_0x3fa475!==VisuMZ[label][_0x4385f7(0x151)]&&(alert(_0x4385f7(0xee)['format'](_0x3991d8,_0x3fa475)),SceneManager[_0x4385f7(0xfa)]());}else return _0x535572[_0x4385f7(0x15f)]&&_0x6bb62b[_0x4385f7(0x153)][_0x4385f7(0x102)]('['+_0x4990a0+']');}if(_0x34b30f[_0x4385f7(0x142)](/\[Tier[ ](\d+)\]/i)){if(_0x4385f7(0x14e)!==_0x4385f7(0x14e))this[_0x4385f7(0x131)]===_0x1811a9&&this['initMessageSoundsSettings'](),this[_0x4385f7(0x131)]=_0x3a6ab3;else{const _0x4e1ad6=Number(RegExp['$1']);if(_0x4e1ad6<tier){if(_0x4385f7(0x154)!==_0x4385f7(0x14f))alert(_0x4385f7(0x10a)[_0x4385f7(0x11d)](_0x3991d8,_0x4e1ad6,tier)),SceneManager[_0x4385f7(0xfa)]();else{if(!_0x5636cb[_0x4385f7(0x130)])return![];}}else tier=Math[_0x4385f7(0xf1)](_0x4e1ad6,tier);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x37d03c[_0x4385f7(0x15d)]);})(pluginData),PluginManager[_0x439335(0xe8)](pluginData['name'],_0x439335(0xec),_0x4795d7=>{const _0x10447e=_0x439335;VisuMZ[_0x10447e(0x13d)](_0x4795d7,_0x4795d7);const _0x20b255={'name':_0x4795d7[_0x10447e(0xf7)],'volume':_0x4795d7['volume'],'pitch':_0x4795d7[_0x10447e(0x12c)],'pan':_0x4795d7[_0x10447e(0x134)]};$gameSystem[_0x10447e(0x11e)](_0x20b255),$gameSystem[_0x10447e(0xe5)](_0x4795d7[_0x10447e(0xf5)]),$gameSystem[_0x10447e(0x12d)](_0x4795d7[_0x10447e(0x158)]),$gameSystem['setMessageSoundPitchVariance'](_0x4795d7[_0x10447e(0x10b)]),$gameSystem[_0x10447e(0x162)](_0x4795d7[_0x10447e(0x13a)]);}),PluginManager[_0x439335(0xe8)](pluginData[_0x439335(0xf7)],'MsgSoundResetMessageSound',_0x3adfe7=>{const _0x5a20e0=_0x439335,_0x10d1b9=$gameSystem[_0x5a20e0(0xeb)]();$gameSystem[_0x5a20e0(0x146)](),$gameSystem[_0x5a20e0(0x157)](_0x10d1b9);}),PluginManager[_0x439335(0xe8)](pluginData[_0x439335(0xf7)],_0x439335(0xf6),_0x64c465=>{const _0x808aa2=_0x439335;VisuMZ[_0x808aa2(0x13d)](_0x64c465,_0x64c465),$gameSystem['setMessageSoundEnabled'](_0x64c465[_0x808aa2(0x123)]);}),SoundManager[_0x439335(0x15b)]=function(_0x460c3a){const _0x2cc8fe=_0x439335,_0x32e82f=$gameSystem['getMessageSoundSfx']();let _0x3d55b5=$gameSystem[_0x2cc8fe(0x159)](),_0x20ed47=$gameSystem[_0x2cc8fe(0x152)](![]),_0x16a9ab=$gameSystem['getMessageSoundPitchVariance'](![]),_0x3c147f=$gameSystem[_0x2cc8fe(0x106)](![]);return _0x32e82f[_0x2cc8fe(0x14d)]+=_0x20ed47,_0x32e82f[_0x2cc8fe(0x14d)]=Math['max'](0x0,_0x32e82f[_0x2cc8fe(0x14d)]),_0x32e82f[_0x2cc8fe(0x12c)]+=_0x16a9ab,_0x32e82f['pitch']=Math['max'](0x0,_0x32e82f['pitch']),_0x32e82f[_0x2cc8fe(0x134)]+=_0x3c147f,AudioManager[_0x2cc8fe(0x127)](_0x32e82f),_0x3d55b5;},VisuMZ[_0x439335(0x14c)][_0x439335(0x114)]=Game_System['prototype'][_0x439335(0x14b)],Game_System['prototype'][_0x439335(0x14b)]=function(){const _0x262c6b=_0x439335;VisuMZ[_0x262c6b(0x14c)][_0x262c6b(0x114)][_0x262c6b(0x138)](this),this[_0x262c6b(0x146)]();},Game_System[_0x439335(0x10d)]['initMessageSoundsSettings']=function(){const _0x367c32=_0x439335,_0x2e6923=VisuMZ[_0x367c32(0x14c)][_0x367c32(0x14a)];this['_messageSoundSfx']={'name':_0x2e6923[_0x367c32(0xf7)],'volume':_0x2e6923[_0x367c32(0x14d)],'pitch':_0x2e6923[_0x367c32(0x12c)],'pan':_0x2e6923[_0x367c32(0x134)]},this['_messageSoundInterval']=_0x2e6923[_0x367c32(0xf5)],this[_0x367c32(0x135)]=_0x2e6923[_0x367c32(0x158)],this['_messageSoundPitchVariance']=_0x2e6923[_0x367c32(0x10b)],this[_0x367c32(0x13e)]=_0x2e6923[_0x367c32(0x13a)],this['_messageSoundEnable']=_0x2e6923['EnableSound'];},Game_System[_0x439335(0x10d)][_0x439335(0xeb)]=function(){const _0x3fa44f=_0x439335;return this[_0x3fa44f(0x13f)]===undefined&&(_0x3fa44f(0x15c)===_0x3fa44f(0x111)?this[_0x3fa44f(0x146)]():this[_0x3fa44f(0x146)]()),this[_0x3fa44f(0x13f)];},Game_System['prototype'][_0x439335(0x157)]=function(_0x35fb34){const _0x339159=_0x439335;this[_0x339159(0x13f)]===undefined&&this[_0x339159(0x146)](),this['_messageSoundEnable']=_0x35fb34;},Game_System[_0x439335(0x10d)]['getMessageSoundSfx']=function(){const _0x23f55a=_0x439335;return this['_messageSoundSfx']===undefined&&this[_0x23f55a(0x146)](),JsonEx[_0x23f55a(0xfc)](this[_0x23f55a(0x131)]);},Game_System[_0x439335(0x10d)][_0x439335(0x11e)]=function(_0x46c03d){const _0x674da3=_0x439335;if(this[_0x674da3(0x131)]===undefined){if('NNIUR'!==_0x674da3(0x120)){_0xb6e184[_0x674da3(0x14c)][_0x674da3(0xfe)][_0x674da3(0x138)](this,_0x1fec14,_0x3bac7f);return;}else this[_0x674da3(0x146)]();}this['_messageSoundSfx']=_0x46c03d;},Game_System['prototype'][_0x439335(0x159)]=function(){const _0x239e72=_0x439335;return this['_messageSoundInterval']===undefined&&this[_0x239e72(0x146)](),this[_0x239e72(0x107)];},Game_System[_0x439335(0x10d)][_0x439335(0xe5)]=function(_0x9bf4ab){const _0x29b50c=_0x439335;if(this[_0x29b50c(0x107)]===undefined){if(_0x29b50c(0x122)==='NuHew')this[_0x29b50c(0x146)]();else return _0x22369b=_0x15d48b[_0x29b50c(0x108)](/\x1bLSON/gi,_0x29b50c(0xf0)),_0x4abbae=_0x5563de[_0x29b50c(0x108)](/\x1bLSOFF/gi,_0x29b50c(0x104)),_0x31b4d3=_0x4e9b4f[_0x29b50c(0x108)](/<(?:LETTER SOUND ON|LETTERSOUNDON)>/gi,'\x1bMsgLetterSoundOn[0]'),_0x479f06=_0x3884b2[_0x29b50c(0x108)](/<(?:LETTER SOUND OFF|LETTERSOUNDOFF)>/gi,_0x29b50c(0x104)),_0x3a6726;}this[_0x29b50c(0x107)]=_0x9bf4ab;},Game_System[_0x439335(0x10d)][_0x439335(0x152)]=function(_0x146779){const _0x4c3178=_0x439335;this[_0x4c3178(0x135)]===undefined&&this[_0x4c3178(0x146)]();if(_0x146779)return this[_0x4c3178(0x135)];let _0x342ffc=Math[_0x4c3178(0xea)](this[_0x4c3178(0x135)]*0x2);return _0x342ffc-=this['_messageSoundVolumeVariance'],Math[_0x4c3178(0xf1)](0x0,_0x342ffc);},Game_System[_0x439335(0x10d)][_0x439335(0x12d)]=function(_0x1c20b7){const _0x19f444=_0x439335;this[_0x19f444(0x135)]===undefined&&(_0x19f444(0x137)===_0x19f444(0x137)?this['initMessageSoundsSettings']():(_0x239a46(_0x19f444(0xee)[_0x19f444(0x11d)](_0x29286d,_0x430783)),_0x336143['exit']())),this[_0x19f444(0x135)]=_0x1c20b7;},Game_System[_0x439335(0x10d)]['getMessageSoundPitchVariance']=function(_0x1c2f31){const _0x5454ca=_0x439335;this[_0x5454ca(0x136)]===undefined&&this[_0x5454ca(0x146)]();if(_0x1c2f31)return this[_0x5454ca(0x136)];let _0x2166a3=Math['randomInt'](this[_0x5454ca(0x136)]*0x2);return _0x2166a3-=this['_messageSoundPitchVariance'],Math[_0x5454ca(0xf1)](0x0,_0x2166a3);},Game_System[_0x439335(0x10d)]['setMessageSoundPitchVariance']=function(_0x46c606){const _0x2d6564=_0x439335;this[_0x2d6564(0x136)]===undefined&&this['initMessageSoundsSettings'](),this[_0x2d6564(0x136)]=_0x46c606;},Game_System['prototype'][_0x439335(0x106)]=function(_0x238a6e){const _0x1a29b7=_0x439335;if(this['_messageSoundPanVariance']===undefined){if(_0x1a29b7(0xfd)!==_0x1a29b7(0x11a))this[_0x1a29b7(0x146)]();else return _0x1c2320=this[_0x1a29b7(0xf2)](_0x2f4f88),_0x23febb[_0x1a29b7(0x14c)][_0x1a29b7(0x10f)][_0x1a29b7(0x138)](this,_0x5b7fdb);}if(_0x238a6e)return this['_messageSoundPanVariance'];let _0x35836e=Math[_0x1a29b7(0xea)](this[_0x1a29b7(0x13e)]*0x2);return _0x35836e-=this['_messageSoundPanVariance'],_0x35836e;},Game_System[_0x439335(0x10d)][_0x439335(0x162)]=function(_0x437dcc){const _0x162d70=_0x439335;this['_messageSoundPanVariance']===undefined&&('ateKw'===_0x162d70(0x141)?this[_0x162d70(0x146)]():this['initMessageSoundsSettings']()),this[_0x162d70(0x13e)]=_0x437dcc;},VisuMZ[_0x439335(0x14c)][_0x439335(0x128)]=Window_Message[_0x439335(0x10d)]['newPage'],Window_Message[_0x439335(0x10d)]['newPage']=function(_0x1a3aa6){const _0x4da22f=_0x439335;this['_messageSoundInterval']=0x0,VisuMZ[_0x4da22f(0x14c)]['Window_Message_newPage']['call'](this,_0x1a3aa6);},VisuMZ['MsgLetterSounds'][_0x439335(0xed)]=Window_Message[_0x439335(0x10d)][_0x439335(0x109)],Window_Message[_0x439335(0x10d)][_0x439335(0x109)]=function(_0x4a36e3){const _0x4c9688=_0x439335;VisuMZ[_0x4c9688(0x14c)][_0x4c9688(0xed)][_0x4c9688(0x138)](this,_0x4a36e3),this['playMessageSound'](_0x4a36e3);},Window_Message[_0x439335(0x10d)]['isMessageSoundPlayed']=function(_0x242325){const _0x1955b5=_0x439335;if(Imported[_0x1955b5(0x10e)]){if(ConfigManager&&ConfigManager[_0x1955b5(0x130)]!==undefined){if(_0x1955b5(0x11c)!==_0x1955b5(0x11c)){const _0x225f5f=_0x165b7a[_0x1955b5(0xeb)]();_0x49b074['initMessageSoundsSettings'](),_0x14b751[_0x1955b5(0x157)](_0x225f5f);}else{if(!ConfigManager[_0x1955b5(0x130)])return![];}}}if(this['_messageSoundInterval']-->0x0)return![];if(!$gameSystem[_0x1955b5(0xeb)]())return![];if(!_0x242325[_0x1955b5(0xef)])return![];return!![];},Window_Message[_0x439335(0x10d)][_0x439335(0x15b)]=function(_0x392e78){const _0x3be6c3=_0x439335;if(!this[_0x3be6c3(0xfb)](_0x392e78))return;if(this[_0x3be6c3(0x101)](_0x392e78[_0x3be6c3(0xe9)]))return;const _0x41243e=SoundManager[_0x3be6c3(0x15b)](_0x392e78);this[_0x3be6c3(0x107)]=_0x41243e;},Window_Message[_0x439335(0x10d)][_0x439335(0x101)]=function(_0x379c3b){const _0x1c9e72=_0x439335;if(_0x379c3b==='')return!![];if(_0x379c3b==='\x20')return!![];if(_0x379c3b==='\x0a')return!![];if(_0x379c3b==='\x0d')return!![];if(_0x379c3b[_0x1c9e72(0x142)](/\[(.*?)\]/i))return!![];if(_0x379c3b[_0x1c9e72(0x142)](/<(.*?)>/i))return!![];return VisuMZ[_0x1c9e72(0x14c)][_0x1c9e72(0x14a)][_0x1c9e72(0xf3)][_0x1c9e72(0x102)](_0x379c3b);},VisuMZ[_0x439335(0x14c)][_0x439335(0x10f)]=Window_Message['prototype'][_0x439335(0xe7)],Window_Message[_0x439335(0x10d)][_0x439335(0xe7)]=function(_0x54187a){const _0x43a641=_0x439335;return _0x54187a=this['convertMessageSoundsTextCodes'](_0x54187a),VisuMZ[_0x43a641(0x14c)][_0x43a641(0x10f)][_0x43a641(0x138)](this,_0x54187a);},Window_Message[_0x439335(0x10d)][_0x439335(0xf2)]=function(_0x54c734){const _0x2bde90=_0x439335;return _0x54c734=_0x54c734[_0x2bde90(0x108)](/\x1bLSON/gi,_0x2bde90(0xf0)),_0x54c734=_0x54c734[_0x2bde90(0x108)](/\x1bLSOFF/gi,_0x2bde90(0x104)),_0x54c734=_0x54c734[_0x2bde90(0x108)](/<(?:LETTER SOUND ON|LETTERSOUNDON)>/gi,'\x1bMsgLetterSoundOn[0]'),_0x54c734=_0x54c734[_0x2bde90(0x108)](/<(?:LETTER SOUND OFF|LETTERSOUNDOFF)>/gi,'\x1bMsgLetterSoundOff[0]'),_0x54c734;},VisuMZ[_0x439335(0x14c)][_0x439335(0xfe)]=Window_Message['prototype'][_0x439335(0x160)],Window_Message[_0x439335(0x10d)][_0x439335(0x160)]=function(_0x27978b,_0x4c1ea9){const _0x4c5c17=_0x439335;if(!_0x4c1ea9[_0x4c5c17(0xef)]){VisuMZ[_0x4c5c17(0x14c)]['Window_Message_processEscapeCharacter'][_0x4c5c17(0x138)](this,_0x27978b,_0x4c1ea9);return;}let _0x523453,_0x5313fd;switch(_0x27978b){case _0x4c5c17(0x115):const _0x3728fa=this[_0x4c5c17(0x112)](_0x4c1ea9);console[_0x4c5c17(0x11b)]('on',_0x3728fa),$gameSystem['setMessageSoundEnabled'](!![]);break;case _0x4c5c17(0x13c):const _0x4dd36a=this[_0x4c5c17(0x112)](_0x4c1ea9);console[_0x4c5c17(0x11b)]('off',_0x4dd36a),$gameSystem[_0x4c5c17(0x157)](![]);break;case _0x4c5c17(0x143):case _0x4c5c17(0x145):_0x5313fd=$gameSystem['getMessageSoundSfx'](),_0x5313fd['name']=this['obtainEscapeString'](_0x4c1ea9),$gameSystem[_0x4c5c17(0x11e)](_0x5313fd);break;case _0x4c5c17(0x124):case _0x4c5c17(0x12a):_0x523453=this[_0x4c5c17(0x112)](_0x4c1ea9),$gameSystem[_0x4c5c17(0xe5)](_0x523453);break;case _0x4c5c17(0x105):case'LSV':_0x523453=this['obtainEscapeParam'](_0x4c1ea9),_0x5313fd=$gameSystem[_0x4c5c17(0x100)](),_0x5313fd[_0x4c5c17(0x14d)]=_0x523453,$gameSystem[_0x4c5c17(0x11e)](_0x5313fd);break;case _0x4c5c17(0x156):case'LSPI':_0x523453=this[_0x4c5c17(0x112)](_0x4c1ea9),_0x5313fd=$gameSystem[_0x4c5c17(0x100)](),_0x5313fd[_0x4c5c17(0x12c)]=_0x523453,$gameSystem['setMessageSoundSfx'](_0x5313fd);break;case _0x4c5c17(0x150):case'LSPA':_0x523453=this[_0x4c5c17(0x112)](_0x4c1ea9),_0x5313fd=$gameSystem['getMessageSoundSfx'](),_0x5313fd['pan']=_0x523453,$gameSystem[_0x4c5c17(0x11e)](_0x5313fd);break;case _0x4c5c17(0x11f):case _0x4c5c17(0xf8):case _0x4c5c17(0x12e):_0x523453=this['obtainEscapeParam'](_0x4c1ea9),$gameSystem[_0x4c5c17(0x12d)](_0x523453);break;case'LETTERSOUNDPITCHVARIANCE':case _0x4c5c17(0x103):case _0x4c5c17(0x133):_0x523453=this[_0x4c5c17(0x112)](_0x4c1ea9),$gameSystem['setMessageSoundPitchVariance'](_0x523453);break;case _0x4c5c17(0xe6):case _0x4c5c17(0x119):case'LSPAV':_0x523453=this[_0x4c5c17(0x112)](_0x4c1ea9),$gameSystem[_0x4c5c17(0x162)](_0x523453);break;default:VisuMZ[_0x4c5c17(0x14c)][_0x4c5c17(0xfe)]['call'](this,_0x27978b,_0x4c1ea9);break;}};