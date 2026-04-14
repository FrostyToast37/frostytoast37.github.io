//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.13] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * - VisuMZ_1_BattleCore
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
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * Battle System - FTB
 * Battle System - ETB
 * Battle System - PTB
 * 
 * These battle systems are incompatible with Auto Skill Triggers. This is due
 * to their turn structures, making them highly incompatible with the way that
 * Auto Skill Triggers work.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
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
 * Version 1.13: January 20, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System OTB's forced action update.
 *    Update made by Olivia.
 * 
 * Version 1.12: June 30, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.11: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 16, 2021
 * * Compatibility Update!
 * ** Auto Skill Triggers is now disabled with the following battle systems:
 *    ETB, FTB, and PTB. This is due to the way their turn structures work,
 *    making them highly incompatible with one another.
 * ** We may revisit this in the future, but for now, Auto Skill Triggers are
 *    to be disabled by code when any of the battle systems are detected.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section.
 * 
 * Version 1.09: June 25, 2021
 * * Feature Update!
 * ** Added failsafe for those using illegal syntax charactes inside of their
 *    database type names which conflict with notetag creation. Fix by Irina.
 * 
 * Version 1.08: March 19, 2021
 * * Bug Fixes!
 * ** Death Triggers that cannot be used will no longer cause the battler to
 *    become immortal. Fix made by Irina.
 * 
 * Version 1.07: March 12, 2021
 * * Bug Fixes!
 * ** Battle Start auto-triggers should now work properly for actors when using
 *    auto-skills set up to be battle screen only. Fix made by Irina.
 * 
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x305d33=_0x5623;(function(_0x146546,_0x398caf){const _0xa14e03=_0x5623,_0x44ab91=_0x146546();while(!![]){try{const _0x3185af=-parseInt(_0xa14e03(0x163))/0x1*(-parseInt(_0xa14e03(0x1da))/0x2)+parseInt(_0xa14e03(0x1bd))/0x3+-parseInt(_0xa14e03(0x1b6))/0x4*(parseInt(_0xa14e03(0x199))/0x5)+parseInt(_0xa14e03(0x175))/0x6*(-parseInt(_0xa14e03(0x20f))/0x7)+parseInt(_0xa14e03(0x1fd))/0x8*(-parseInt(_0xa14e03(0x18b))/0x9)+-parseInt(_0xa14e03(0x16b))/0xa+parseInt(_0xa14e03(0x1b8))/0xb*(parseInt(_0xa14e03(0x157))/0xc);if(_0x3185af===_0x398caf)break;else _0x44ab91['push'](_0x44ab91['shift']());}catch(_0x1311b1){_0x44ab91['push'](_0x44ab91['shift']());}}}(_0x3725,0x40494));var label='AutoSkillTriggers',tier=tier||0x0,dependencies=[_0x305d33(0x153)],pluginData=$plugins['filter'](function(_0x359be2){const _0x296ef9=_0x305d33;return _0x359be2[_0x296ef9(0x14f)]&&_0x359be2[_0x296ef9(0x1ff)][_0x296ef9(0x1ca)]('['+label+']');})[0x0];VisuMZ[label][_0x305d33(0x18d)]=VisuMZ[label][_0x305d33(0x18d)]||{},VisuMZ[_0x305d33(0x1d0)]=function(_0x81f9d0,_0x3c058a){const _0x45008e=_0x305d33;for(const _0x35b9f8 in _0x3c058a){if('mhLuI'!=='YqrDZ'){if(_0x35b9f8[_0x45008e(0x22e)](/(.*):(.*)/i)){const _0x5b11bd=String(RegExp['$1']),_0x618114=String(RegExp['$2'])[_0x45008e(0x224)]()[_0x45008e(0x204)]();let _0x5b1b2e,_0x989ead,_0x4083e3;switch(_0x618114){case _0x45008e(0x193):_0x5b1b2e=_0x3c058a[_0x35b9f8]!==''?Number(_0x3c058a[_0x35b9f8]):0x0;break;case _0x45008e(0x19d):_0x989ead=_0x3c058a[_0x35b9f8]!==''?JSON[_0x45008e(0x1aa)](_0x3c058a[_0x35b9f8]):[],_0x5b1b2e=_0x989ead[_0x45008e(0x217)](_0x4247d0=>Number(_0x4247d0));break;case _0x45008e(0x1df):_0x5b1b2e=_0x3c058a[_0x35b9f8]!==''?eval(_0x3c058a[_0x35b9f8]):null;break;case _0x45008e(0x1e6):_0x989ead=_0x3c058a[_0x35b9f8]!==''?JSON['parse'](_0x3c058a[_0x35b9f8]):[],_0x5b1b2e=_0x989ead[_0x45008e(0x217)](_0x105301=>eval(_0x105301));break;case _0x45008e(0x22f):_0x5b1b2e=_0x3c058a[_0x35b9f8]!==''?JSON[_0x45008e(0x1aa)](_0x3c058a[_0x35b9f8]):'';break;case _0x45008e(0x156):_0x989ead=_0x3c058a[_0x35b9f8]!==''?JSON[_0x45008e(0x1aa)](_0x3c058a[_0x35b9f8]):[],_0x5b1b2e=_0x989ead[_0x45008e(0x217)](_0x537ac3=>JSON[_0x45008e(0x1aa)](_0x537ac3));break;case _0x45008e(0x1db):_0x5b1b2e=_0x3c058a[_0x35b9f8]!==''?new Function(JSON['parse'](_0x3c058a[_0x35b9f8])):new Function(_0x45008e(0x226));break;case _0x45008e(0x21e):_0x989ead=_0x3c058a[_0x35b9f8]!==''?JSON[_0x45008e(0x1aa)](_0x3c058a[_0x35b9f8]):[],_0x5b1b2e=_0x989ead[_0x45008e(0x217)](_0x1e6248=>new Function(JSON[_0x45008e(0x1aa)](_0x1e6248)));break;case _0x45008e(0x229):_0x5b1b2e=_0x3c058a[_0x35b9f8]!==''?String(_0x3c058a[_0x35b9f8]):'';break;case _0x45008e(0x1fe):_0x989ead=_0x3c058a[_0x35b9f8]!==''?JSON[_0x45008e(0x1aa)](_0x3c058a[_0x35b9f8]):[],_0x5b1b2e=_0x989ead[_0x45008e(0x217)](_0x2151ae=>String(_0x2151ae));break;case _0x45008e(0x1d4):_0x4083e3=_0x3c058a[_0x35b9f8]!==''?JSON['parse'](_0x3c058a[_0x35b9f8]):{},_0x5b1b2e=VisuMZ[_0x45008e(0x1d0)]({},_0x4083e3);break;case _0x45008e(0x231):_0x989ead=_0x3c058a[_0x35b9f8]!==''?JSON['parse'](_0x3c058a[_0x35b9f8]):[],_0x5b1b2e=_0x989ead[_0x45008e(0x217)](_0x4b5bcc=>VisuMZ[_0x45008e(0x1d0)]({},JSON[_0x45008e(0x1aa)](_0x4b5bcc)));break;default:continue;}_0x81f9d0[_0x5b11bd]=_0x5b1b2e;}}else _0xbc4376=!![];}return _0x81f9d0;},(_0x31631b=>{const _0x557bfa=_0x305d33,_0x13e384=_0x31631b[_0x557bfa(0x150)];for(const _0x31f831 of dependencies){if(_0x557bfa(0x1a1)!==_0x557bfa(0x1a1)){if(!this['canMove']())return;this[_0x557bfa(0x159)](_0x466a73['id']),this[_0x557bfa(0x20c)](0x1,!![]);const _0x4a8628=_0x79c41d[_0x557bfa(0x161)];_0x4a8628['unshift'](_0x4a8628[_0x557bfa(0x1ef)]());const _0x41d887=_0x29270e[_0x557bfa(0x195)][_0x557bfa(0x1ea)];_0x41d887&&_0x41d887[_0x557bfa(0x1ba)](this);}else{if(!Imported[_0x31f831]){if(_0x557bfa(0x1d5)===_0x557bfa(0x1ec))_0x308b8c[_0x557bfa(0x17a)]['Game_BattlerBase_revive'][_0x557bfa(0x22a)](this),this[_0x557bfa(0x1ed)]();else{alert(_0x557bfa(0x14d)[_0x557bfa(0x20a)](_0x13e384,_0x31f831)),SceneManager[_0x557bfa(0x178)]();break;}}}}const _0x5e44b4=_0x31631b['description'];if(_0x5e44b4['match'](/\[Version[ ](.*?)\]/i)){const _0x309d1b=Number(RegExp['$1']);_0x309d1b!==VisuMZ[label][_0x557bfa(0x1a6)]&&(_0x557bfa(0x1e7)===_0x557bfa(0x1e7)?(alert(_0x557bfa(0x1b9)['format'](_0x13e384,_0x309d1b)),SceneManager[_0x557bfa(0x178)]()):_0x3e2c3b['adjustTurnOrderAutoSkillTrigger'](this));}if(_0x5e44b4[_0x557bfa(0x22e)](/\[Tier[ ](\d+)\]/i)){const _0x448d77=Number(RegExp['$1']);_0x448d77<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x13e384,_0x448d77,tier)),SceneManager[_0x557bfa(0x178)]()):tier=Math[_0x557bfa(0x1f5)](_0x448d77,tier);}VisuMZ[_0x557bfa(0x1d0)](VisuMZ[label][_0x557bfa(0x18d)],_0x31631b[_0x557bfa(0x1a5)]);})(pluginData);function _0x3725(){const _0x2d88bd=['FUNC','isCertainHit','CreateNotetags','BLjDK','EVAL','_forceAction','canActivateDeathAutoSkillTrigger','prototype','Game_BattlerBase_isImmortal','Opponents','_autoSkillTrigger','ARRAYEVAL','ytnBI','(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)','BattleManager_endAction','_otbTurnOrderWindow','canPerformInputComboSkills','XDrJN','clearDeathAutoSkillTrigger','isActiveChainSkillsUiVisible','pop','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','onBattleEnd','_currentTurn','Game_Action_isValid','addNewState','max','performAutoSkillTriggers','cCfkL','item','VisuMZ_3_ActiveChainSkills','elements','(?:ATTACK\x20%1|STRIKE\x20%1)','refresh','1485136OFyIMo','ARRAYSTR','description','on%2Element%1','_savedAutoSkillTriggerActions','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)','trim','canUse','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)','in\x20order\x20for\x20VisuMZ_3_AutoSkillTriggers\x20to\x20work.','jKLOd','getElementNameFromID','format','constructAutoSkillTrigger','otbAddActions','_deathAutoSkillTriggerPerformed','IpAjw','34573okVuBC','battler','===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20===','stripNameTextCodes','Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.','process_VisuMZ_AutoSkillTriggers_Notetags','constructor','isSceneBattle','map','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','on%1Guard','elementId','some','revive','aliveMembers','ARRAYFUNC','FRIENDS\x20ONLY','log','WNGBi','_subject','_instance','toUpperCase','length','return\x200','_positionDuration','BattleManager_checkBattleEnd','STR','call','Game_Action_clear','Game_BattlerBase_addNewState','endAction','match','JSON','User','ARRAYSTRUCT','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','getAutoSkillTriggerSTypes','isSkill','VisuMZ_2_BattleSystemOTB','ONDEATH','clone','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','allBattleMembers','status','name','VisuMZ_1_SkillsStatesCore','VisuMZ_3_InputComboSkills','VisuMZ_1_BattleCore','isBattleSys','FLJhT','ARRAYJSON','6852fLchMH','_deathAutoSkillTriggerActive','forceAutoSkillTrigger','test','on%1Item','hasDeathAutoSkillTrigger','getSkillTypeNameFromID','isEnemy','setAutoSkillTrigger','turnCount','_actionBattlers','startTurn','1SczMQz','clearTpbChargeTime','requestUpdateTurnOrders','isImmortal','onAllActionsEnd','DWMNg','Scene_Boot_onDatabaseLoaded','VisuMZ_1_ElementStatusCore','2590750NXTINP','Friends','Game_Battler_clearTpbChargeTime','VisuMZ_2_BattleSystemOTB\x20needs\x20to\x20be\x20updated\x20','YKNGp','isItem','applyGlobal','onBattleStart','ETB','Game_Battler_onBattleStart','390FmnkCD','canMove','_CHANCE','exit','filter','AutoSkillTriggers','qgCgR','(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)','processAutoSkillTriggers','eCCGW','isOTB','ENEMY','OPPONENTS','FriendsOnly','processDeathAutoSkillTriggerEffects','_onBattleWinAutoSkillTriggerOn','Target','subject','XpNsS','ETpHH','hasDeathTransform','push','9fDuNFz','isValid','Settings','TARGET','NCgOg','on%1SType%2','on%1Attack','stypeId','NUM','getSkillTypes','_scene','isAlive','\x20\x20\x20','skillTypes','11060deGeCK','on%1Magical','forceAction','wzmxs','ARRAYNUM','oVhgf','nyEFX','_action','aXSrU','checkDeathAutoSkillTriggerRemoval','replace','Game_Battler_onBattleEnd','parameters','version','damage','applyAutoSkillTriggers','on%2SType%1','parse','isOptionValid','clear','_targets','isAllDead','Game_BattlerBase_revive','HMVWG','constructAutoSkillTriggerOTB','hxZJL','onDeath','occasion','isAutoSkillTrigger','236aLCXQJ','Game_Unit_onBattleStart','12001UiUJfS','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','adjustTurnOrderAutoSkillTrigger','hasLifeStateAutoLifeEffect','CreateNotetag','510114abONdQ','on%1Element%2','_forcedBattlers','returnSavedAutoSkillTriggerActions','PTB','RegExp','_autoSkillTriggerBypassTpbClear','_inBattle','on%1Certain','isActor','Enemy','random','note','includes','PfUAI','processAutoSkillTrigger','VisuMZ_3_LifeStateEffects','jjNwc','unshift','ConvertParams','isAutoSkillTriggerCompatible','_actions','on%1Physical','STRUCT','bjeNu','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','attackElements','jvdIh','hasOtbForcedActionAutoSkillBattler','733154xrbmKG'];_0x3725=function(){return _0x2d88bd;};return _0x3725();}if(Imported[_0x305d33(0x235)]&&VisuMZ['BattleSystemOTB'][_0x305d33(0x1a6)]<1.13){let text='';text+=_0x305d33(0x16e),text+=_0x305d33(0x207),alert(text),SceneManager[_0x305d33(0x178)]();}VisuMZ[_0x305d33(0x17a)][_0x305d33(0x169)]=Scene_Boot[_0x305d33(0x1e2)]['onDatabaseLoaded'],Scene_Boot[_0x305d33(0x1e2)]['onDatabaseLoaded']=function(){const _0x2e7bc9=_0x305d33;VisuMZ['AutoSkillTriggers'][_0x2e7bc9(0x169)][_0x2e7bc9(0x22a)](this),this['process_VisuMZ_AutoSkillTriggers_Notetags']();},Scene_Boot[_0x305d33(0x1e2)][_0x305d33(0x214)]=function(){const _0x5b3edb=_0x305d33;VisuMZ[_0x5b3edb(0x17a)][_0x5b3edb(0x1dd)]();},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x1c2)]={},VisuMZ[_0x305d33(0x17a)]['CreateNotetags']=function(){const _0x5f4347=_0x305d33;let _0x46490a=[[_0x5f4347(0x230),'USER'],[_0x5f4347(0x185),_0x5f4347(0x18e)],['Ally','ALLY'],['Enemy',_0x5f4347(0x180)],[_0x5f4347(0x16c),'FRIENDS'],['FriendsOnly',_0x5f4347(0x21f)],[_0x5f4347(0x1e4),_0x5f4347(0x181)]],_0x37402d=[[_0x5f4347(0x172),_0x5f4347(0x232)],['onBattleWin',_0x5f4347(0x206)],[_0x5f4347(0x1b3),'(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)']];for(const _0x271ca3 of _0x46490a){if(_0x5f4347(0x1b0)===_0x5f4347(0x1b0)){if(!_0x271ca3)continue;_0x37402d[_0x5f4347(0x18a)]([_0x5f4347(0x191)[_0x5f4347(0x20a)](_0x271ca3[0x0]),_0x5f4347(0x1fb)[_0x5f4347(0x20a)](_0x271ca3[0x1])]),_0x37402d[_0x5f4347(0x18a)]([_0x5f4347(0x219)[_0x5f4347(0x20a)](_0x271ca3[0x0]),'(?:GUARD\x20%1|GUARD\x20%1)'[_0x5f4347(0x20a)](_0x271ca3[0x1])]),_0x37402d[_0x5f4347(0x18a)]([_0x5f4347(0x15b)[_0x5f4347(0x20a)](_0x271ca3[0x0]),'(?:ITEM\x20%1|ITEM\x20%1)'[_0x5f4347(0x20a)](_0x271ca3[0x1])]),_0x37402d[_0x5f4347(0x18a)]([_0x5f4347(0x1d3)[_0x5f4347(0x20a)](_0x271ca3[0x0]),_0x5f4347(0x203)['format'](_0x271ca3[0x1])]),_0x37402d[_0x5f4347(0x18a)](['on%1Magical'[_0x5f4347(0x20a)](_0x271ca3[0x0]),_0x5f4347(0x17c)[_0x5f4347(0x20a)](_0x271ca3[0x1])]),_0x37402d[_0x5f4347(0x18a)]([_0x5f4347(0x1c5)[_0x5f4347(0x20a)](_0x271ca3[0x0]),_0x5f4347(0x1e8)[_0x5f4347(0x20a)](_0x271ca3[0x1])]);}else this['performAutoSkillTriggers'](_0x1a5534,_0x5f4347(0x182));}for(const _0x151947 of $dataSystem[_0x5f4347(0x198)]){if(_0x5f4347(0x18f)!==_0x5f4347(0x18f))this[_0x5f4347(0x1bc)](_0x575562[0x0],_0x5b062b[0x1]);else{if(!_0x151947)continue;let _0x719ab=DataManager[_0x5f4347(0x212)](_0x151947);for(const _0x13bca7 of _0x46490a){if(_0x5f4347(0x19c)==='wzmxs'){if(!_0x13bca7)continue;_0x37402d['push']([_0x5f4347(0x1a9)[_0x5f4347(0x20a)](_0x719ab['replace'](/[ ]/gi,''),_0x13bca7[0x0]),_0x5f4347(0x202)[_0x5f4347(0x20a)](_0x719ab,_0x13bca7[0x1])]);}else _0x23ba8b['AutoSkillTriggers'][_0x5f4347(0x1dd)]();}}}for(const _0x2b3489 of $dataSystem[_0x5f4347(0x1fa)]){if(!_0x2b3489)continue;let _0x1cb76c=DataManager[_0x5f4347(0x212)](_0x2b3489);for(const _0x540aa7 of _0x46490a){if(!_0x540aa7)continue;_0x37402d[_0x5f4347(0x18a)]([_0x5f4347(0x200)[_0x5f4347(0x20a)](_0x1cb76c[_0x5f4347(0x1a3)](/[ ]/gi,''),_0x540aa7[0x0]),'(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)'[_0x5f4347(0x20a)](_0x1cb76c,_0x540aa7[0x1])]);}}for(const _0x21078e of _0x37402d){this[_0x5f4347(0x1bc)](_0x21078e[0x0],_0x21078e[0x1]);}},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x1bc)]=function(_0x6f626d,_0x4d6b55){const _0x36120f=_0x305d33;_0x6f626d=_0x6f626d[_0x36120f(0x224)]()['trim']();const _0x2ffa42='<AUTO\x20TRIGGER:[\x20]%1>'[_0x36120f(0x20a)](_0x4d6b55),_0x560d8b=_0x6f626d+_0x36120f(0x177),_0x48f9a6=_0x36120f(0x218)[_0x36120f(0x20a)](_0x4d6b55);try{if(_0x36120f(0x16f)===_0x36120f(0x16f))VisuMZ[_0x36120f(0x17a)][_0x36120f(0x1c2)][_0x6f626d]=new RegExp(_0x2ffa42,'i'),VisuMZ[_0x36120f(0x17a)][_0x36120f(0x1c2)][_0x560d8b]=new RegExp(_0x48f9a6,'i');else return _0x59790f[_0x36120f(0x14f)]&&_0x341c3d[_0x36120f(0x1ff)][_0x36120f(0x1ca)]('['+_0x3bef4d+']');}catch(_0x479887){if('MtLJV'!==_0x36120f(0x1d8)){if(Utils[_0x36120f(0x1ab)](_0x36120f(0x15a))){if(_0x36120f(0x221)==='dLaCR')return _0x54e6b1;else console[_0x36120f(0x220)](_0x36120f(0x211)),console[_0x36120f(0x220)](_0x36120f(0x1d6)[_0x36120f(0x20a)](_0x2ffa42,_0x48f9a6)),console[_0x36120f(0x220)](_0x36120f(0x213)),console[_0x36120f(0x220)](_0x36120f(0x197));}}else return this[_0x36120f(0x183)]();}},DataManager[_0x305d33(0x15d)]=function(_0x533b58){const _0x5af2e6=_0x305d33;return this[_0x5af2e6(0x212)]($dataSystem[_0x5af2e6(0x198)][_0x533b58]);},DataManager[_0x305d33(0x212)]=function(_0x18e853){const _0x54eb6a=_0x305d33;if(!_0x18e853)return'';return _0x18e853=_0x18e853[_0x54eb6a(0x1a3)](/\\V\[(\d+)\]/gi,''),_0x18e853=_0x18e853[_0x54eb6a(0x1a3)](/\\I\[(\d+)\]/gi,''),_0x18e853=_0x18e853[_0x54eb6a(0x1a3)](/\\C\[(\d+)\]/gi,''),_0x18e853=_0x18e853[_0x54eb6a(0x1a3)](/\\N\[(\d+)\]/gi,''),_0x18e853=_0x18e853[_0x54eb6a(0x1a3)](/\\P\[(\d+)\]/gi,''),(_0x18e853||'')['toUpperCase']()[_0x54eb6a(0x204)]();},DataManager[_0x305d33(0x209)]=function(_0x508d84){const _0x428fab=_0x305d33;return this[_0x428fab(0x212)]($dataSystem[_0x428fab(0x1fa)][_0x508d84]);},BattleManager[_0x305d33(0x1d1)]=function(){const _0x3612c4=_0x305d33;if(this[_0x3612c4(0x154)]('ETB'))return![];if(this[_0x3612c4(0x154)]('FTB'))return![];if(this[_0x3612c4(0x154)](_0x3612c4(0x1c1)))return![];if(Imported[_0x3612c4(0x1f9)]){if(_0x3612c4(0x17e)!=='UvDYO'){const _0x11c34f=SceneManager[_0x3612c4(0x195)];if(_0x11c34f&&_0x11c34f[_0x3612c4(0x1ee)]())return![];}else{this[_0x3612c4(0x201)]=_0x2d159d,_0x1db286[_0x3612c4(0x1c4)]=!![],_0x3a7c1c[_0x3612c4(0x17a)][_0x3612c4(0x174)]['call'](this,_0x4f5fe6);if(_0x4da2aa[_0x3612c4(0x235)]&&_0x17be1f[_0x3612c4(0x17f)]())return;this[_0x3612c4(0x1cc)](_0x3612c4(0x172)),this[_0x3612c4(0x1ed)]();}}if(Imported[_0x3612c4(0x152)]){if('uMeVh'!=='uMeVh'){const _0x2fd117=(_0x33edba(_0x57a718['$1'])||0x0)*0.01;_0x3a7701=_0x40ec26[_0x3612c4(0x1c8)]()<_0x2fd117;}else{const _0x461fc2=SceneManager[_0x3612c4(0x195)];if(_0x461fc2&&_0x461fc2[_0x3612c4(0x1eb)]())return![];}}return!![];},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x1e9)]=BattleManager[_0x305d33(0x22d)],BattleManager[_0x305d33(0x22d)]=function(){const _0x4a7eae=_0x305d33,_0x364e64=this[_0x4a7eae(0x1a0)]&&this[_0x4a7eae(0x1a0)][_0x4a7eae(0x1b5)](),_0x26bab4=this[_0x4a7eae(0x222)];_0x364e64&&(this[_0x4a7eae(0x222)][_0x4a7eae(0x1c3)]=!![]),VisuMZ[_0x4a7eae(0x17a)][_0x4a7eae(0x1e9)][_0x4a7eae(0x22a)](this),_0x26bab4&&_0x364e64&&_0x26bab4[_0x4a7eae(0x1c0)]();},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x228)]=BattleManager['checkBattleEnd'],BattleManager['checkBattleEnd']=function(){const _0x25cd0d=_0x305d33;$gameTroop[_0x25cd0d(0x1ae)]()&&$gameParty['processOnBattleWinAutoSkillTriggers']();if(this[_0x25cd0d(0x1bf)]['length']>0x0)return![];if(BattleManager[_0x25cd0d(0x1d9)]())return![];return VisuMZ[_0x25cd0d(0x17a)][_0x25cd0d(0x228)][_0x25cd0d(0x22a)](this);},BattleManager[_0x305d33(0x1d9)]=function(){const _0x17dc0a=_0x305d33;if(!Imported[_0x17dc0a(0x235)])return![];if(!BattleManager['isOTB']())return![];return this[_0x17dc0a(0x161)][_0x17dc0a(0x21b)](_0x56dfad=>_0x56dfad[_0x17dc0a(0x1d2)][_0x17dc0a(0x21b)](_0x1c4380=>_0x1c4380&&_0x1c4380[_0x17dc0a(0x1e0)]));},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x22b)]=Game_Action[_0x305d33(0x1e2)][_0x305d33(0x1ac)],Game_Action[_0x305d33(0x1e2)][_0x305d33(0x1ac)]=function(){const _0x4f9b6c=_0x305d33;VisuMZ[_0x4f9b6c(0x17a)][_0x4f9b6c(0x22b)][_0x4f9b6c(0x22a)](this),this[_0x4f9b6c(0x15f)](![]);},Game_Action[_0x305d33(0x1e2)]['setAutoSkillTrigger']=function(_0x227240){const _0x443239=_0x305d33;this[_0x443239(0x1e5)]=_0x227240;},Game_Action['prototype'][_0x305d33(0x1b5)]=function(){const _0x16d587=_0x305d33;return!!this[_0x16d587(0x1e5)];},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x1f3)]=Game_Action[_0x305d33(0x1e2)]['isValid'],Game_Action[_0x305d33(0x1e2)][_0x305d33(0x18c)]=function(){const _0x2c40b8=_0x305d33;let _0x115a2f=VisuMZ[_0x2c40b8(0x17a)][_0x2c40b8(0x1f3)][_0x2c40b8(0x22a)](this),_0xe8aa50=this['item']()?this[_0x2c40b8(0x1f8)]()['occasion']:-0x1;if(this[_0x2c40b8(0x1f8)]()&&this[_0x2c40b8(0x1b5)]()){if('fqeAz'===_0x2c40b8(0x20e)){const _0x142d2d=_0x55274b['_scene'];if(_0x142d2d&&_0x142d2d[_0x2c40b8(0x1eb)]())return![];}else return this[_0x2c40b8(0x1f8)]()['occasion']=0x0,_0x115a2f=_0x115a2f&&this[_0x2c40b8(0x186)]()[_0x2c40b8(0x205)](this[_0x2c40b8(0x1f8)]()),this[_0x2c40b8(0x1f8)]()[_0x2c40b8(0x1b4)]=_0xe8aa50,_0x115a2f;}else return _0x2c40b8(0x1f7)!=='QoFFM'?_0x115a2f:this[_0x2c40b8(0x212)](_0x1a65c1[_0x2c40b8(0x1fa)][_0x328710]);},VisuMZ[_0x305d33(0x17a)]['Game_Action_applyGlobal']=Game_Action['prototype'][_0x305d33(0x171)],Game_Action[_0x305d33(0x1e2)][_0x305d33(0x171)]=function(){const _0x498565=_0x305d33;VisuMZ[_0x498565(0x17a)]['Game_Action_applyGlobal'][_0x498565(0x22a)](this),this[_0x498565(0x1a8)]();},Game_Action['prototype'][_0x305d33(0x233)]=function(){const _0x5aa3a2=_0x305d33;if(!this[_0x5aa3a2(0x234)]())return[];let _0x9e23c7=[];return Imported[_0x5aa3a2(0x151)]?_0x9e23c7=DataManager[_0x5aa3a2(0x194)](this['item']()):_0x9e23c7[_0x5aa3a2(0x18a)](this['item']()[_0x5aa3a2(0x192)]),_0x9e23c7[_0x5aa3a2(0x217)](_0x32c38a=>DataManager[_0x5aa3a2(0x15d)](_0x32c38a));},Game_Action['prototype']['getAutoSkillTriggerElements']=function(){const _0x43f467=_0x305d33;let _0x546917=[];if(Imported[_0x43f467(0x16a)])_0x546917=this[_0x43f467(0x1fa)]();else{if(this[_0x43f467(0x1f8)]()[_0x43f467(0x1a7)]['elementId']<0x0){if(_0x43f467(0x1b2)!==_0x43f467(0x1ce)){const _0x3a5b60=this[_0x43f467(0x186)]();_0x546917=_0x3a5b60[_0x43f467(0x1d7)]();}else{if(this[_0x43f467(0x1c3)]){this[_0x43f467(0x1c3)]=_0x40a408;return;}_0x3b655b[_0x43f467(0x17a)][_0x43f467(0x16d)]['call'](this);}}else _0x546917=[this['item']()['damage'][_0x43f467(0x21a)]];}return _0x546917['map'](_0x6e1338=>DataManager[_0x43f467(0x209)](_0x6e1338));},Game_Action[_0x305d33(0x1e2)][_0x305d33(0x1a8)]=function(){const _0x3cb0b6=_0x305d33;if(!SceneManager[_0x3cb0b6(0x216)]())return;if(!BattleManager[_0x3cb0b6(0x1d1)]())return;if(!this['item']())return;if(this[_0x3cb0b6(0x1f8)]()[_0x3cb0b6(0x1c9)]['match'](/<NO AUTO SKILL TRIGGER>/i))return;if(this[_0x3cb0b6(0x1f8)]()['note'][_0x3cb0b6(0x22e)](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x4ca6f4=this[_0x3cb0b6(0x186)](),_0x39b5cc=BattleManager[_0x3cb0b6(0x1ad)][_0x3cb0b6(0x179)]((_0x36458a,_0x39939a,_0x595b42)=>_0x595b42['indexOf'](_0x36458a)===_0x39939a),_0xe4a1b=_0x4ca6f4['friendsUnit']()['aliveMembers'](),_0x4b2680=_0x4ca6f4['opponentsUnit']()[_0x3cb0b6(0x21d)]();this['performAutoSkillTriggers'](_0x4ca6f4,_0x3cb0b6(0x230));for(const _0x3d5b50 of _0x39b5cc){this[_0x3cb0b6(0x1f6)](_0x3d5b50,_0x3cb0b6(0x185));if(_0x3d5b50[_0x3cb0b6(0x1c6)]()===_0x4ca6f4[_0x3cb0b6(0x1c6)]())_0x3cb0b6(0x1cb)==='zioGN'?this[_0x3cb0b6(0x201)]=this[_0x3cb0b6(0x1d2)][_0x3cb0b6(0x14c)]():this['performAutoSkillTriggers'](_0x3d5b50,'Ally');else _0x3d5b50['isActor']()!==_0x4ca6f4[_0x3cb0b6(0x1c6)]()&&this[_0x3cb0b6(0x1f6)](_0x3d5b50,_0x3cb0b6(0x1c7));}for(const _0x357655 of _0xe4a1b){this[_0x3cb0b6(0x1f6)](_0x357655,_0x3cb0b6(0x16c)),_0x357655!==_0x4ca6f4&&this['performAutoSkillTriggers'](_0x357655,'FriendsOnly');}for(const _0x125cdd of _0x4b2680){this[_0x3cb0b6(0x1f6)](_0x125cdd,_0x3cb0b6(0x1e4));}},Game_Action[_0x305d33(0x1e2)]['performAutoSkillTriggers']=function(_0x574ec9,_0x2d8fb9){const _0x3c0f14=_0x305d33;if(!_0x574ec9)return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(this['isAttack']())_0x574ec9[_0x3c0f14(0x1cc)](_0x3c0f14(0x191)[_0x3c0f14(0x20a)](_0x2d8fb9));if(this['isGuard']())_0x574ec9['processAutoSkillTrigger']('on%1Guard'['format'](_0x2d8fb9));if(this[_0x3c0f14(0x170)]())_0x574ec9[_0x3c0f14(0x1cc)](_0x3c0f14(0x15b)['format'](_0x2d8fb9));if(this['isPhysical']())_0x574ec9[_0x3c0f14(0x1cc)](_0x3c0f14(0x1d3)[_0x3c0f14(0x20a)](_0x2d8fb9));if(this['isMagical']())_0x574ec9[_0x3c0f14(0x1cc)](_0x3c0f14(0x19a)[_0x3c0f14(0x20a)](_0x2d8fb9));if(this[_0x3c0f14(0x1dc)]())_0x574ec9[_0x3c0f14(0x1cc)]('on%1Certain'['format'](_0x2d8fb9));const _0x17dd33=this[_0x3c0f14(0x233)]();for(let _0x237fe7 of _0x17dd33){if(!_0x237fe7)continue;_0x237fe7=_0x237fe7[_0x3c0f14(0x1a3)](/[ ]/gi,''),_0x574ec9[_0x3c0f14(0x1cc)](_0x3c0f14(0x190)[_0x3c0f14(0x20a)](_0x2d8fb9,_0x237fe7));}const _0x1ad9b2=this['getAutoSkillTriggerElements']();for(let _0x40345e of _0x1ad9b2){if(!_0x40345e)continue;_0x40345e=_0x40345e[_0x3c0f14(0x1a3)](/[ ]/gi,''),_0x574ec9[_0x3c0f14(0x1cc)](_0x3c0f14(0x1be)[_0x3c0f14(0x20a)](_0x2d8fb9,_0x40345e));}},VisuMZ[_0x305d33(0x17a)]['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x305d33(0x1e2)][_0x305d33(0x1f4)],Game_BattlerBase[_0x305d33(0x1e2)][_0x305d33(0x1f4)]=function(_0x4b7fa5){const _0x55cf82=_0x305d33;if(this[_0x55cf82(0x1e1)](_0x4b7fa5)){if(_0x55cf82(0x155)!==_0x55cf82(0x208))return this['processDeathAutoSkillTriggerEffects']();else{const _0x2f3804=_0x49c2a5(_0x2e3bf9['$1']);_0x2f3804<_0x46f573?(_0x1e2bf2(_0x55cf82(0x1f0)['format'](_0x4af16f,_0x2f3804,_0x3dbfa6)),_0x422d95['exit']()):_0x577574=_0x288765[_0x55cf82(0x1f5)](_0x2f3804,_0x5cb9ca);}}VisuMZ[_0x55cf82(0x17a)]['Game_BattlerBase_addNewState']['call'](this,_0x4b7fa5);},Game_BattlerBase[_0x305d33(0x1e2)][_0x305d33(0x1e1)]=function(_0x2dfa48){const _0x311c46=_0x305d33;if(_0x2dfa48!==this['deathStateId']())return![];if(Imported[_0x311c46(0x1cd)]){if('ulqJM'!=='ulqJM')_0x52f8cc('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x311c46(0x20a)](_0x173df6,_0x409e97)),_0x43ac22['exit']();else{if(this[_0x311c46(0x1bb)]())return![];if(this[_0x311c46(0x15e)]()&&this[_0x311c46(0x189)]())return![];}}return this[_0x311c46(0x15c)]();},Game_BattlerBase[_0x305d33(0x1e2)][_0x305d33(0x15c)]=function(){const _0x36ce6c=_0x305d33;if(!SceneManager[_0x36ce6c(0x216)]())return![];if(!this['canMove']())return![];if(this[_0x36ce6c(0x20d)])return![];return this['skills']()[_0x36ce6c(0x21b)](_0x3b2b54=>this['meetsDeathAutoSkillTrigger'](_0x3b2b54));},Game_BattlerBase['prototype']['meetsDeathAutoSkillTrigger']=function(_0x5587c2){const _0x517260=_0x305d33,_0x1ea4ee=VisuMZ['AutoSkillTriggers'][_0x517260(0x1c2)][_0x517260(0x14b)];return _0x5587c2&&_0x5587c2[_0x517260(0x1c9)][_0x517260(0x22e)](_0x1ea4ee)&&this['canUse'](_0x5587c2);},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x1e3)]=Game_BattlerBase['prototype'][_0x305d33(0x166)],Game_BattlerBase[_0x305d33(0x1e2)]['isImmortal']=function(){const _0x4945fa=_0x305d33;if(this[_0x4945fa(0x158)])return!![];return VisuMZ[_0x4945fa(0x17a)]['Game_BattlerBase_isImmortal']['call'](this);},Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x1cc)]=function(_0x141a76){const _0xee552f=_0x305d33;if(!SceneManager[_0xee552f(0x216)]())return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;_0x141a76=_0x141a76[_0xee552f(0x224)]()[_0xee552f(0x204)]();const _0x1f250a=VisuMZ[_0xee552f(0x17a)][_0xee552f(0x1c2)][_0x141a76],_0x1754d9=_0x141a76+_0xee552f(0x177),_0x2976a4=VisuMZ[_0xee552f(0x17a)][_0xee552f(0x1c2)][_0x1754d9];if(!_0x1f250a&&!_0x2976a4)return;if(!this[_0xee552f(0x176)]())return;for(const _0xf8b0dc of this['skills']()){if(!_0xf8b0dc)continue;if(!this[_0xee552f(0x205)](_0xf8b0dc))continue;let _0x3e610c=![];if(_0xf8b0dc[_0xee552f(0x1c9)][_0xee552f(0x22e)](_0x1f250a)){if(_0xee552f(0x17b)!=='qgCgR'){let _0xd0f51a=[];if(_0xbdc63b[_0xee552f(0x16a)])_0xd0f51a=this[_0xee552f(0x1fa)]();else{if(this[_0xee552f(0x1f8)]()[_0xee552f(0x1a7)]['elementId']<0x0){const _0x15a3d9=this[_0xee552f(0x186)]();_0xd0f51a=_0x15a3d9[_0xee552f(0x1d7)]();}else _0xd0f51a=[this[_0xee552f(0x1f8)]()[_0xee552f(0x1a7)]['elementId']];}return _0xd0f51a[_0xee552f(0x217)](_0x584d4e=>_0x12d9fb[_0xee552f(0x209)](_0x584d4e));}else _0x3e610c=!![];}else{if(_0xf8b0dc[_0xee552f(0x1c9)][_0xee552f(0x22e)](_0x2976a4)){const _0x4959fe=(Number(RegExp['$1'])||0x0)*0.01;_0x3e610c=Math[_0xee552f(0x1c8)]()<_0x4959fe;}}_0x3e610c&&(Imported[_0xee552f(0x235)]&&BattleManager[_0xee552f(0x17f)]()?this[_0xee552f(0x1b1)](_0xf8b0dc):this[_0xee552f(0x20b)](_0xf8b0dc));}},Game_Battler['prototype']['constructAutoSkillTrigger']=function(_0x4ea13a){const _0x1c49b5=_0x305d33;this[_0x1c49b5(0x159)](_0x4ea13a['id']);const _0x58a164=BattleManager[_0x1c49b5(0x161)][_0x1c49b5(0x14c)](),_0x33f721=BattleManager['_subject'];BattleManager[_0x1c49b5(0x222)]=null,BattleManager[_0x1c49b5(0x19b)](this),BattleManager[_0x1c49b5(0x161)]=_0x58a164,BattleManager[_0x1c49b5(0x222)]=_0x33f721;},Game_Battler[_0x305d33(0x1e2)]['constructAutoSkillTriggerOTB']=function(_0x310fd0){const _0x5632c3=_0x305d33;if(!this[_0x5632c3(0x176)]())return;this[_0x5632c3(0x159)](_0x310fd0['id']),this[_0x5632c3(0x20c)](0x1,!![]);const _0x7f2018=BattleManager[_0x5632c3(0x161)];_0x7f2018[_0x5632c3(0x1cf)](_0x7f2018[_0x5632c3(0x1ef)]());const _0x1494ab=SceneManager[_0x5632c3(0x195)][_0x5632c3(0x1ea)];_0x1494ab&&_0x1494ab[_0x5632c3(0x1ba)](this);},Game_Battler[_0x305d33(0x1e2)]['forceAutoSkillTrigger']=function(_0x42e045){const _0x320265=_0x305d33;if(!BattleManager[_0x320265(0x1d1)]())return;!this[_0x320265(0x201)]&&(this[_0x320265(0x201)]=this[_0x320265(0x1d2)][_0x320265(0x14c)]());this['forceAction'](_0x42e045,-0x2);if(!this['_actions'])return;const _0x475b04=this['_actions'][this[_0x320265(0x1d2)]['length']-0x1];_0x475b04[_0x320265(0x15f)](!![]);},Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x1c0)]=function(){const _0x587143=_0x305d33;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(!this['_savedAutoSkillTriggerActions'])return;if(this[_0x587143(0x1d2)][_0x587143(0x225)]>0x0)return;this[_0x587143(0x1d2)]=this[_0x587143(0x201)],this['_savedAutoSkillTriggerActions']=undefined;},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x1a4)]=Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x1f1)],Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x1f1)]=function(){const _0x42944e=_0x305d33;this[_0x42944e(0x201)]=undefined,VisuMZ[_0x42944e(0x17a)]['Game_Battler_onBattleEnd']['call'](this);},VisuMZ[_0x305d33(0x17a)]['Game_Battler_clearTpbChargeTime']=Game_Battler['prototype'][_0x305d33(0x164)],Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x164)]=function(){const _0x551b24=_0x305d33;if(this['_autoSkillTriggerBypassTpbClear']){this[_0x551b24(0x1c3)]=undefined;return;}VisuMZ[_0x551b24(0x17a)][_0x551b24(0x16d)][_0x551b24(0x22a)](this);},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x174)]=Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x172)],Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x172)]=function(_0x492ecf){const _0x4e1378=_0x305d33;this['_savedAutoSkillTriggerActions']=undefined,$gameParty[_0x4e1378(0x1c4)]=!![],VisuMZ[_0x4e1378(0x17a)][_0x4e1378(0x174)][_0x4e1378(0x22a)](this,_0x492ecf);if(Imported[_0x4e1378(0x235)]&&BattleManager[_0x4e1378(0x17f)]()){if(_0x4e1378(0x1de)!==_0x4e1378(0x188))return;else _0x472e69[_0x4e1378(0x22a)](this),this['checkDeathAutoSkillTriggerRemoval']();}this[_0x4e1378(0x1cc)](_0x4e1378(0x172)),this[_0x4e1378(0x1ed)]();},VisuMZ[_0x305d33(0x17a)]['BattleManager_startTurn']=BattleManager[_0x305d33(0x162)],BattleManager['startTurn']=function(){const _0x2f2877=_0x305d33;VisuMZ[_0x2f2877(0x17a)]['BattleManager_startTurn']['call'](this);if(Imported[_0x2f2877(0x235)]&&BattleManager[_0x2f2877(0x17f)]()&&$gameTroop[_0x2f2877(0x160)]()===0x1)for(const _0x390e2e of this[_0x2f2877(0x14e)]()){if(_0x2f2877(0x19f)!==_0x2f2877(0x19f)){if(this['canActivateDeathAutoSkillTrigger'](_0x344991))return this[_0x2f2877(0x183)]();_0xe067cc[_0x2f2877(0x17a)][_0x2f2877(0x22c)][_0x2f2877(0x22a)](this,_0x2367af);}else{if(_0x390e2e){if(_0x2f2877(0x19e)==='oVhgf')_0x390e2e[_0x2f2877(0x1cc)](_0x2f2877(0x172)),_0x390e2e[_0x2f2877(0x1ed)]();else{if(!_0x3740ed[_0x2f2877(0x1d1)]())return;if(!this['_savedAutoSkillTriggerActions'])return;if(this[_0x2f2877(0x1d2)][_0x2f2877(0x225)]>0x0)return;this['_actions']=this[_0x2f2877(0x201)],this['_savedAutoSkillTriggerActions']=_0x2d8ff3;}}}}},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x1af)]=Game_BattlerBase[_0x305d33(0x1e2)][_0x305d33(0x21c)],Game_BattlerBase[_0x305d33(0x1e2)][_0x305d33(0x21c)]=function(){const _0x285955=_0x305d33;VisuMZ[_0x285955(0x17a)]['Game_BattlerBase_revive'][_0x285955(0x22a)](this),this[_0x285955(0x1ed)]();},Game_Battler['prototype'][_0x305d33(0x1ed)]=function(){const _0x190c4b=_0x305d33;this[_0x190c4b(0x158)]=![],this[_0x190c4b(0x20d)]=![];},Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x183)]=function(){const _0x44ba9f=_0x305d33;if(!this[_0x44ba9f(0x176)]())return;if(!SceneManager['isSceneBattle']())return;this[_0x44ba9f(0x158)]=!![],this[_0x44ba9f(0x1cc)](_0x44ba9f(0x1b3));};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x167)];Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x167)]=function(){const _0x43b704=_0x305d33;_Game_Battler_onAllActionsEnd_[_0x43b704(0x22a)](this),this[_0x43b704(0x1a2)]();},Game_Battler[_0x305d33(0x1e2)][_0x305d33(0x1a2)]=function(){const _0xb735ee=_0x305d33;if(!this['_deathAutoSkillTriggerActive'])return;if(this['_deathAutoSkillTriggerPerformed'])return;const _0x1de4d8=BattleManager[_0xb735ee(0x1bf)];for(const _0x25b42e of _0x1de4d8){if(_0xb735ee(0x168)!==_0xb735ee(0x187)){if(!_0x25b42e)continue;if(_0x25b42e[0x0]===this)return;}else{if(this[_0xb735ee(0x154)](_0xb735ee(0x173)))return![];if(this['isBattleSys']('FTB'))return![];if(this['isBattleSys'](_0xb735ee(0x1c1)))return![];if(_0x2e774e[_0xb735ee(0x1f9)]){const _0x180caa=_0x5f1604[_0xb735ee(0x195)];if(_0x180caa&&_0x180caa[_0xb735ee(0x1ee)]())return![];}if(_0x4d9696['VisuMZ_3_InputComboSkills']){const _0x5126d0=_0xb4b7ef[_0xb735ee(0x195)];if(_0x5126d0&&_0x5126d0['canPerformInputComboSkills']())return![];}return!![];}}this[_0xb735ee(0x158)]=![],this[_0xb735ee(0x20d)]=!![],this[_0xb735ee(0x1fc)]();if(this[_0xb735ee(0x196)]())this[_0xb735ee(0x1ed)]();},VisuMZ[_0x305d33(0x17a)][_0x305d33(0x1b7)]=Game_Unit[_0x305d33(0x1e2)][_0x305d33(0x172)],Game_Unit['prototype'][_0x305d33(0x172)]=function(_0x1667a5){const _0x1c4807=_0x305d33;VisuMZ['AutoSkillTriggers'][_0x1c4807(0x1b7)][_0x1c4807(0x22a)](this,_0x1667a5);if(this[_0x1c4807(0x215)]===Game_Party)this[_0x1c4807(0x184)]=![];},Game_Unit['prototype'][_0x305d33(0x17d)]=function(_0x4774a9,_0x19ea17){const _0x56599e=_0x305d33;_0x19ea17=_0x19ea17||null;const _0x2ff0ab=this[_0x56599e(0x21d)]()[_0x56599e(0x179)](_0x5b0f25=>_0x5b0f25!==_0x19ea17);for(const _0x25c561 of _0x2ff0ab){if(!_0x25c561)continue;_0x25c561[_0x56599e(0x1cc)](_0x4774a9);}},Game_Party['prototype']['processOnBattleWinAutoSkillTriggers']=function(){const _0x3b7a98=_0x305d33;if(this[_0x3b7a98(0x184)])return;this[_0x3b7a98(0x184)]=!![],this[_0x3b7a98(0x17d)]('onBattleWin');};Imported['VisuMZ_2_BattleSystemOTB']&&(Window_OTB_TurnOrder['prototype'][_0x305d33(0x1ba)]=function(_0x437a73){const _0x292606=_0x305d33;let _0x517a01=null;for(const _0x2183c0 of this['_currentTurn']){if(!_0x2183c0)continue;if(_0x2183c0[_0x292606(0x210)]()!==_0x437a73)continue;_0x517a01=_0x2183c0,_0x2183c0[_0x292606(0x223)]=_0x2183c0[_0x292606(0x223)]||0x0,_0x2183c0['_instance']++;}_0x517a01['_instance']=0x0,_0x517a01[_0x292606(0x227)]=0x258,_0x517a01['x']=this['_subjectX'],this[_0x292606(0x1f2)][_0x292606(0x1cf)](this[_0x292606(0x1f2)][_0x292606(0x1ef)]()),this[_0x292606(0x165)]();});function _0x5623(_0x39990b,_0x16dd67){const _0x372539=_0x3725();return _0x5623=function(_0x56235f,_0xd0ed44){_0x56235f=_0x56235f-0x14b;let _0x24c4a1=_0x372539[_0x56235f];return _0x24c4a1;},_0x5623(_0x39990b,_0x16dd67);};