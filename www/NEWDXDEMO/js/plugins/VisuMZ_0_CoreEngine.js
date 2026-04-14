//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.35;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.35] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
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
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x381d=['RegExp','batch','image-rendering','_data','anchorCoreEasing','_encounterCount','updatePositionCoreEngineShakeOriginal','CustomParamType','MAT','usableSkills','playTestF6','OptionsMenu','GoldOverlap','UStrz','ALT','push','buttonAssistOk','sqrt','SystemLoadImages','DummyRect','isMaxLevel','RBfmC','OUTCUBIC','CustomParamAbb','Window','itemBackColor1','ctGaugeColor2','_paramPlus','sparamRateJS','WIN_OEM_PA3','_playtestF7Looping','max','FontSize','loadBitmap','CodeJS','_movementWholeDuration','NoTileShadows','DigitGroupingStandardText','buttonAssistWindowRect','integer','IconSParam7','CZjov','removeChild','dLYnp','NWauX','repositionEnemiesByResolution','MDF','toString','RhPGC','hpColor','updateMain','missed','isActiveTpb','GdKqH','moveCancelButtonSideButtonLayout','KvqXZ','AGI','helpAreaTop','system','liNwb','STB','blendFunc','EPLaJ','colSpacing','updatePositionCoreEngineShakeHorz','maxLvGaugeColor2','LESS_THAN','EZWVQ','Scene_MenuBase_createCancelButton','Gold','lRCDr','end','getCoreEngineScreenShakeStyle','setCoreEngineScreenShakeStyle','F24','MsmqM','Game_Character_processMoveCommand','initMembers','Scene_Boot_startNormalGame','bqrCh','backspace','Scene_Name_onInputOk','buttonAssistKey2','Window_Base_update','SwitchActorText','process_VisuMZ_CoreEngine_RegExp','processHandling','setBackgroundOpacity','ypuMN','ParseSkillNotetags','MAX_SAFE_INTEGER','#%1','cFsqX','Game_Map_setup','endAnimation','skipBranch','helpAreaHeight','paramRate1','getLevel','F20','contents','_anchor','ARRAYFUNC','ARRAYSTRUCT','ATTN','battlebacks1','ColorGaugeBack','_listWindow','buttonAssistText1','createCommandWindow','LcIvW','AMPERSAND','_stored_gaugeBackColor','Window_Base_drawCharacter','Scene_Item_create','EgTNt','iconWidth','escape','SParameterFormula','retrieveFauxAnimation','_targetAnchor','_stored_ctGaugeColor2','openness','drawParamName','_backSprite2','ALTGR','initialLevel','_context','_defaultStretchMode','setBattleSystem','_targetOffsetY','setTargetAnchor','CTB','buttonAssistText3','WIN_OEM_JUMP','NUMPAD2','ONE','_registerKeyInput','BVdvf','Scene_Map_updateScene','onInputBannedWords','_actorWindow','initCoreEngineScreenShake','_refreshPauseSign','BgFilename2','setColorTone','open','RightMenus','SystemSetWindowPadding','XParamVocab5','_addShadow','setHandler','boxHeight','IconXParam9','Graphics_defaultStretchMode','KEEP','clearStencil','_sideButtonLayout','hit','Sprite_Gauge_gaugeRate','Eejkq','zQMzr','uqIrZ','VisuMZ_2_BattleSystemOTB','ShopMenu','zkyJX','2462NXuxmX','_hovered','processTouch','updatePadding','cursorPageup','adjustPictureAntiZoom','drawTextEx','WIN_OEM_ATTN','SideButtons','min','_repositioned','Window_EquipItem_isEnabled','RevertPreserveNumbers','Window_Base_createTextState','Scene_MenuBase_createBackground','skillId','srYfa','faceHeight','STRUCT','dummyWindowRect','traitObjects','INSERT','img/%1/','gaugeBackColor','bgsVolume','XParamVocab3','_numberWindow','setGuard','ParseAllNotetags','LINEAR','vVfzK','xdg-open','xparamFlat1','currentExp','isOptionValid','prototype','EXOTE','keyCode','up2','mpColor','OutlineColorGauge','Input_clear','faces','LvExpGauge','commandWindowRect','updateEffekseer','WIN_OEM_WSCTRL','tab','XParameterFormula','ColorMPGauge2','OUTBACK','drawAllParams','_windowskin','kmkMz','RequireFocus','win32','F7key','moveMenuButtonSideButtonLayout','resetTextColor','WIN_OEM_FINISH','isPlaytest','process_VisuMZ_CoreEngine_CustomParameters','PictureEraseAll','initMembersCoreEngine','altKey','450764uzrbZs','_battlerName','dQwoD','xparamPlus1','SkillTypeRect','Window_NameInput_cursorLeft','%1/','playOk','repositionCancelButtonSideButtonLayout','goto','split','mainAreaTop','bviaC','INCUBIC','sRXqi','stringKeyMap','_pauseSignSprite','EVAL','isGamepadButtonPressed','OUTELASTIC','Bitmap_drawTextOutline','scale','updateOrigin','BTestWeapons','DocumentTitleFmt','createBuffer','ISIiF','areTileShadowsHidden','INSINE','WvgXQ','SIPYh','advanced','value','platform','mainAreaHeight','F14','onClick','wait','DYcwu','EJKBf','paramRate2','SceneManager_onKeyDown','Bitmap_measureTextWidth','KeySHIFT','_mirror','YkpDE','OpenURL','setFrame','SEMICOLON','scaleSprite','parse','isNextScene','paramFlatJS','TPB\x20WAIT','DOvdz','_screenY','buttonAssistKey5','Window_NameInput_processTouch','categoryWindowRect','_cacheScaleY','Control\x20Variables\x20Script\x20Error','sHUuS','ForceNoPlayTest','tpaIP','IconXParam4','DOLLAR','setActorHomeRepositioned','ItemStyle','_centerElementCoreEngine','titles2','_storedStack','useDigitGrouping','UCMVH','_buttonAssistWindow','(\x5cd+\x5c.?\x5cd+)>','DysQy','Game_Screen_initialize','DefaultStyle','Sprite_AnimationMV_processTimingData','isNumpadPressed','937827YoQVxL','_fauxAnimationSprites','AccuracyBoost','Rate2','ivbWO','length','AUsbX','processCursorMoveModernControls','select','map','sparamRate','STENCIL_TEST','updatePositionCoreEngineShakeVert','left','sparamPlusJS','applyEasing','updateCoreEasing','IconSParam8','openingSpeed','_gamepadWait','DKFZh','gnWjC','setActorHome','VOLUME_MUTE','IconXParam7','createFauxAnimationQueue','processCursorHomeEndTrigger','HgVOk','snapForBackground','PDSIZ','jpeli','FINAL','catchUnknownError','battlebacks2','drawGameVersion','maxLevel','TILDE','stretch','xparamPlusJS','xparamRate1','canEquip','HbWgW','Scene_Base_createWindowLayer','guardSkillId','_stored_deathColor','getButtonAssistLocation','onMoveEnd','_baseSprite','OPEN_PAREN','expRate','Window_Selectable_drawBackgroundRect','EditBgType','_hideTileShadows','Scene_Battle_update','_statusWindow','Window_NameInput_refresh','WIN_ICO_CLEAR','KeyboardInput','outlineColorDmg','TextCodeNicknames','sv_actors','initButtonHidden','MRG','aFrbx','Window_StatusBase_drawActorSimpleStatus','jvxdV','jsQuickFunc','zIfeJ','isAlive','getBackgroundOpacity','style','BgType','pagedown','_isWindow','REPLACE','CRSEL','xovPW','Input_setupEventHandlers','Game_Interpreter_command122','_viewportSize','hinYR','processKeyboardEnd','gradientFillRect','inputWindowRect','process_VisuMZ_CoreEngine_Functions','zBWhQ','_commandWindow','ConvertNumberToString','GFfNr','clearRect','itemSuccessRate','XedmS','SParamVocab6','NEAREST','constructor','targetObjects','INQUINT','sparamRate1','uiAreaWidth','original','EXCLAMATION','WIN_OEM_RESET','BACKSPACE','_customModified','characters','sparamFlat2','TRG','LnOdP','result','Novnm','cancelShowButton','stop','filterArea','JUNJA','ActorTPColor','OlAVL','catchLoadError','createSpriteset','WIN_ICO_HELP','setViewportCoreEngineFix','Plus1','uiAreaHeight','hide','jVpFb','GoldRect','EVA','lkJHL','NHIXo','_stored_powerUpColor','isBottomHelpMode','code','Window_Base_initialize','Version','pageup','paramchangeTextColor','_stored_crisisColor','VisuMZ_2_BattleSystemFTB','VOLUME_UP','Scene_Battle_createCancelButton','iBhNB','catchException','IconSParam1','BqmAP','LnCBm','Window_Base_drawText','initialize','EREOF','ApplyEasing','JRauP','Scene_Shop_create','processKeyboardDelete','StartID','paramMax','setEnemyAction','krVug','bgm','gYgdg','update','command105','WIN_ICO_00','checkCacheKey','adjustBoxSize','F21','_hideButtons','qUTlO','textColor','_index','Graphics_centerElement','WIN_OEM_FJ_ROYA','Scene_Status_create','TAB','openURL','SEPARATOR','Game_Interpreter_PluginCommand','height','isTouchedInsideFrame','_createInternalTextures','call','makeDocumentTitle','down','lRRLy','visible','Sprite_Battler_startMove','FXlNE','CONVERT','Show\x20Scrolling\x20Text\x20Script\x20Error','ColorCrisis','text','processCursorMove','randomInt','PLAY','roHsY','GoldMax','playCursor','stencilFunc','animationBaseDelay','useDigitGroupingEx','test','dimColor1','Input_shouldPreventDefault','horizontal','ParseTilesetNotetags','drawCurrentParam','_number','performEscape','mhp','sparam','down2','cWZCv','parallaxes','helpWindowRect','OS_KEY','IconParam2','WIN_OEM_FJ_LOYA','ColorPowerDown','Padding','isFullDocumentTitle','EndingID','%1%2','evaded','MenuBg','processKeyboardHome','SystemSetFontSize','_baseTexture','Game_Picture_initBasic','clamp','isSmartEventCollisionOn','_cancelButton','MAXMP','Window_Selectable_cursorUp','processKeyboardDigitChange','createMenuButton','ctMJm','isGamepadTriggered','F23','calcEasing','setMute','itemLineRect','itemPadding','evaluate','currencyUnit','_list','CRI','isEnabled','HOckv','_effectsContainer','playTestF7','QnpVm','contentsOpacity','start','F19','(\x5cd+)([%％])>','WIN_OEM_CLEAR','cursorRight','mev','Sprite_Animation_setViewport','FvRBF','Scene_Boot_updateDocumentTitle','buttonAssistKey1','isFauxAnimationPlaying','isRepeated','PictureFilename','asin','FUNC','ZOOM','paramValueByName','helpAreaTopSideButtonLayout','NUMPAD0','DummyBgType','MINUS','ParamChange','gaugeRate','ButtonFadeSpeed','buttonAssistSwitch','drawText','innerHeight','destroyCoreEngineMarkedBitmaps','Mqkzi','setEasingType','Window_ShopSell_isEnabled','Scene_Options_create','_stored_ctGaugeColor1','PreserveNumbers','updateMove','bgmVolume','processFauxAnimationRequests','dLUnW','createFauxAnimation','contains','setCoreEngineUpdateWindowBg','URL','OpenConsole','_fauxAnimationQueue','playBuzzer','IconXParam2','wholeDuration','EQUALS','CustomParamIcons','ceil','_buyWindow','_animation','cdmYa','titles1','Scene_MenuBase_mainAreaTop','OUTQUINT','addChildToBack','updateDashToggle','ColorTPGauge1','ColorDeath','isSideView','iIGwC','itemWindowRect','SnapshotOpacity','Sprite_destroy','_lastPluginCommandInterpreter','WIN_OEM_COPY','SParamVocab7','lineHeight','StatusEquipRect','updateOpen','SceneManager_isGameActive','bgs','_helpWindow','refresh','INOUTBACK','_backSprite1','createChildSprite','_realScale','FjnzJ','VBLdG','sparamFlat1','_colorCache','buttonAssistOffset2','drawIcon','_upArrowSprite','LevelUpFullMp','currentLevelExp','isGamepadConnected','boxWidth','_downArrowSprite','applyCoreEasing','dimColor2','scaleMode','Bitmap_blt','GmxNc','_pagedownButton','BattleSystem','_blank','ParamArrow','ZVwcr','runCombinedScrollingTextAsCode','(\x5cd+)>','xparam','([\x5c+\x5c-]\x5cd+)([%％])>','home','strokeRect','padding','KeyItemProtect','STENCIL_BUFFER_BIT','ZKOhJ','CommandList','setAttack','VisuMZ_2_BattleSystemCTB','Scene_Unlisted','damageColor','buttonAssistWindowSideRect','paramFlat','isSpecialCode','buttonAssistText%1','NUMPAD7','AntiZoomPictures','_itemWindow','ctrlKey','outbounce','xcruc','origin','Scene_MenuBase_createPageButtons','width','_mode','ASTERISK','IconParam7','_hp','DisplayedParams','tslqi','windowPadding','loadWindowskin','ALWAYS','_stored_mpGaugeColor2','KeyTAB','Abbreviation','drawCurrencyValue','mBrSU','Input_update','drawGauge','479gkQSnn','processKeyboardHandling','create','terminate','qusKM','drawActorNickname','paramY','terms','UqjWY','JtVPk','onDatabaseLoaded','ShowItemBackground','PictureEasingType','updateTransform','startShake','_screenX','gmuQs','NUMPAD8','xScrollLinkedOffset','_onKeyDown','WIN_OEM_BACKTAB','isItem','ParseStateNotetags','requestFauxAnimation','_actor','maxLvGaugeColor1','_dummyWindow','updatePositionCoreEngine','number','_setupEventHandlers','_drawTextShadow','pendingColor','drawNewParam','animationNextDelay','F13','buttonAreaHeight','lWdoa','TaptI','_scene','playEscape','en-US','_stored_mpCostColor','render','_stored_mpGaugeColor1','exit','KxTrI','subject','OnLoadJS','cursorDown','_stored_hpGaugeColor2','command355','tHxPE','addCommand','itWxE','Xviup','SystemSetBattleSystem','updateClose','HANJA','Game_Actor_paramBase','Window_NameInput_cursorDown','LineHeight','Power','isExpGaugeDrawn','charCode','_inputString','Plus2','getInputMultiButtonStrings','round','jsBqU','Scene_Battle_createSpriteset','pikDM','TRAIT_PARAM','ExtJS','_offsetY','Rate','ParamMax','_statusParamsWindow','Scene_Menu_create','Flat','worldTransform','smallParamFontSize','REC','_internalTextures','toLowerCase','level','_inputWindow','Window_NameInput_cursorPageup','buttonAssistOffset4','startAutoNewGame','statusParamsWindowRect','CNT','_duration','ParseClassNotetags','Window_NameInput_cursorRight','Location','fadeSpeed','tileWidth','BACK_SLASH','BackOpacity','tOwOL','defineProperty','Window_Base_drawFace','isInputting','OpenSpeed','ScreenShake','buttonAssistText4','FDR','SLASH','TCR','isNormalPriority','abs','TtQoD','iADKr','Manual','isMenuButtonAssistEnabled','DimColor1','1KqgFWL','_stored_expGaugeColor2','encounterStepsMinimum','drawActorSimpleStatus','INBACK','IconParam4','filters','destroy','_height','param','gPtnT','lazBi','isCollidedWithEvents','ParamName','IconSParam5','mainFontSize','replace','maxItems','_statusEquipWindow','drawGameSubtitle','_opening','EfBJy','forceOutOfPlaytest','hdFiT','maxGold','createTitleButtons','INOUTCUBIC','ColorMaxLvGauge1','735454nJnTtA','ItemBgType','inbounce','WHgsN','Spriteset_Base_initialize','_isButtonHidden','requestMotion','KeyUnlisted','gHXVV','right','Keyboard','eventsXyNt','tTUaH','toFixed','processDigitChange','paramBase','OutlineColorDmg','UIBLm','Game_Troop_setup','ARRAYJSON','loadSystemImages','CommandBgType','isTpb','uwpIX','drawParamText','<%1\x20%2:[\x20]','volume','META','VAnoE','originalJS','mUuiK','applyForcedGameTroopSettingsCoreEngine','IconParam1','VKHLj','eva','TimeProgress','paramX','Game_Action_itemEva','aNoQY','tileHeight','dxkDu','gjxbW','MenuLayout','CEV','obCrL','_movementDuration','setLastPluginCommandInterpreter','tgros','CustomParam','OTB','button','easingType','TBBKX','itemHit','AnimationMirrorOffset','_dimmerSprite','isBottomButtonMode','concat','learnings','getColorDataFromPluginParameters','MAXHP','Game_Temp_initialize','get','status','_inputSpecialKeyCode','wTIjL','_timerSprite','paramFlatBonus','ColorHPGauge2','Graphics_printError','getBattleSystem','Spriteset_Battle_createEnemies','ValueJS','drawFace','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','areButtonsHidden','IconSet','seVolume','ColorHPGauge1','Sprite_Gauge_currentValue','popScene','addLoadListener','StatusParamsBgType','floor','levelUp','keypress','PDR','reduce','blt','isHandled','_maxDigits','ParseArmorNotetags','RowSpacing','buttons','HOME','bitmapHeight','exp','tpGaugeColor2','cTqHs','ItemBackColor1','allowShiftScrolling','DataManager_setupNewGame','WASD','INOUTELASTIC','PHA','name','startMove','vertJS','ActorMPColor','KANA','MEV','focus','startNormalGame','Scene_Map_initialize','FxObv','ocqMa','meVolume','random','makeActionList','imageSmoothingEnabled','maxCols','checkSmartEventCollision','NUM','flush','UVUiG','Game_System_initialize','translucentOpacity','_width','_spriteset','top','NewGameCommonEvent','Window_Selectable_itemRect','displayY','bitmapWidth','sparamFlatBonus','F6key','drawGameTitle','movePageButtonSideButtonLayout','attackSkillId','_clientArea','ACCEPT','uzUkB','updatePlayTestF7','Flat1','vertical','StatusMenu','gameTitle','cos','ColSpacing','IconXParam1','SkillMenu','EscapeAlways','HmvRg','xCHdj','lilRS','DFvlx','paramPlus','getInputButtonString','_goldWindow','0.00','WpTij','isMaskingEnabled','ItemRect','XParamVocab6','IconParam6','ShowButtons','type','pKDDC','paramWidth','isRightInputMode','process_VisuMZ_CoreEngine_Settings','ColorManager_loadWindowskin','VisuMZ_1_OptionsCore','subtitle','JUGfr','command357','outlineColor','CLOSE_CURLY_BRACKET','WPpqL','clear','ColorNormal','faceWidth','340905IIiWvN','processMoveCommand','IconSParam3','log','makeCoreEngineCommandList','_shouldPreventDefault','Bitmap_drawText','HRG','_stored_tpGaugeColor1','pop','ljqZV','ESC','sellWindowRect','jKMjL','_offsetX','Conditional\x20Branch\x20Script\x20Error','Window_NameInput_initialize','umBed','ConvertParams','actorWindowRect','QoL','Game_Actor_levelUp','removeAllFauxAnimations','PGDN','showFauxAnimations','_forcedTroopView','isItemStyle','QFcEI','xWEvi','TextManager_param','makeEncounterCount','Total','WtHxm','GoldFontSize','isOpen','getColor','powerUpColor','switchModes','DATABASE','gRWcF','_digitGrouping','Enable','EncounterRateMinimum','targetEvaRate','Plus','F16','AutoStretch','renderNoMask','INQUAD','smoothSelect','updatePosition','_buttonType','wLOFv','sparamPlus','NUMPAD1','createJsQuickFunction','ColorTPCost','Input_pollGamepads','SmartEventCollisionPriority','createCustomParameter','_CoreEngineSettings','zZFbM','stencilOp','Bitmap_gradientFillRect','Input_onKeyDown','targetScaleX','equips','outlineColorGauge','drawRightArrow','QUOTE','ColorTPGauge2','Bitmap_resize','enemy','Untitled','offsetX','_margin','drawCircle','EnableNameInput','setClickHandler','SystemSetSideView','buttonAssistText5','cursorPagedown','setMainFontSize','MIN_SAFE_INTEGER','_clickHandler','includes','Title','dashToggle','sparamPlus1','BlurFilter','center','makeAutoBattleActions','NUMPAD9','CustomParamNames','FadeSpeed','normal','createBackground','raJfb','tATww','isWindowMaskingEnabled','ONE_MINUS_SRC_ALPHA','process_VisuMZ_CoreEngine_Notetags','HXOcq','Game_Picture_calcEasing','Wykvn','Game_Picture_show','hoerC','drawActorLevel','_centerElement','Wait','isKeyItem','setHome','active','IWKEx','expGaugeColor2','LevelUpFullHp','loadTitle2','DIVIDE','backOpacity','Tilemap_addShadow','initVisuMZCoreEngine','BasicParameterFormula','drawValue','TGR','getCombinedScrollingText','createFauxAnimationSprite','_refreshArrows','StatusEquipBgType','drawItem','_stored_pendingColor','resetBattleSystem','ListBgType','itemEva','playCursorSound','PIFQB','touchUI','_tempActor','numActions','Sprite_Animation_processSoundTimings','QGogP','gold','DEF','Scene_MenuBase_mainAreaHeight','Scene_Boot_onDatabaseLoaded','CommandWidth','mmp','INOUTCIRC','setSkill','displayX','randomJS','DELETE','slice','enableDigitGrouping','keyboard','changeTextColor','_stored_systemColor','sFtUw','VOLUME_DOWN','NewGameBoot','onKeyDownKeysF6F7','Nwtqf','gaugeLineHeight','HkGKD','updatePictureAntiZoom','IconSParam0','buttonAssistWindowButtonRect','xparamPlus2','onButtonImageLoad','jNqhL','%2%1%3','mainAreaBottom','PERIOD','isGameActive','cXGPI','elFtr','rFQsJ','parameters','Game_Event_isCollidedWithEvents','BattleManager_processEscape','NewGameCommonEventAll','targetPosition','ctGaugeColor1','Scene_Map_createSpriteset','clearForcedGameTroopSettingsCoreEngine','pictures','trim','_shakePower','dVlfQ','GBAdR','drawGoldItemStyle','INBOUNCE','currentClass','_coreEasing','shift','Symbol','IconXParam6','_updateFilterArea','Game_Party_consumeItem','Activated','filter','Type','setWindowPadding','sin','SellRect','ItemMenu','default','picture','children','HSEou','kZftJ','isOpenAndActive','_playTestFastMode','isBusy','skillTypeWindowRect','isPlaying','XParamVocab0','NUM_LOCK','isMagical','nextLevelExp','isArrowPressed','isUseModernControls','_targetOffsetX','HIT','CTRL','Game_Picture_x','QwertyLayout','updateMotion','makeTargetSprites','setupValueFont','OPEN_BRACKET','mainAreaHeightSideButtonLayout','inBattle','tpCostColor','setupNewGame','Window_NameInput_cursorPagedown','_optionsWindow','HYPHEN_MINUS','createEnemies','updateOpacity','onEscapeSuccess','xparamFlatBonus','QUESTION_MARK','buttonAssistKey3','mSarw','_changingClass','InputRect','hpGaugeColor1','CoreEngine','EQUAL','LoadError','ModernControls','itemBackColor2','TextCodeClassNames','createButtonAssistWindow','numberWindowRect','sv_enemies','IconSParam4','ImprovedAccuracySystem','clearCachedKeys','backgroundBitmap','CLOSE_BRACKET','printError','F11','sparamRate2','ButtonHeight','blockWidth','Layer','horzJS','nBnDh','ShowDevTools','ptFDv','createPageButtons','reservePlayTestNewGameCommonEvent','NUMPAD3','forceStencil','paramMaxJS','_commandList','MCR','showDevTools','ActorBgType','CommandRect','updateDocumentTitle','SkillTypeBgType','textSizeEx','SellBgType','targetY','Game_BattlerBase_initMembers','fontSize','_slotWindow','clone','isDying','Spriteset_Base_update','Game_Picture_updateMove','PRINT','mirror','zKvUZ','Scene_Map_updateMainMultiply','ParseItemNotetags','setupCoreEngine','Game_Picture_y','BTestAddedQuantity','IconXParam8','_closing','_forcedBattleSys','bitmap','keyMapper','WIN_OEM_PA1','processTouchModernControls','eIell','SUBTRACT','InIoG','WIN_OEM_PA2','statusWindowRect','setAnchor','getLastPluginCommandInterpreter','areButtonsOutsideMainUI','resize','processKeyboardBackspace','_coreEasingType','setupCoreEasing','MDR','SLEEP','INOUTQUAD','save','IconXParam5','ARRAYNUM','_onKeyPress','OUTSINE','mute','ParseActorNotetags','EditRect','SCROLL_LOCK','JNISG','isPressed','enemies','reserveNewGameCommonEvent','parseForcedGameTroopSettingsCoreEngine','enter','mpGaugeColor2','FjHyB','MaFjJ','text%1','_shakeSpeed','xparamRateJS','match','SPACE','WIN_OEM_AUTO','AIlVr','itemHeight','DigitGroupingDamageSprites','mShBy','StatusRect','ColorPowerUp','TjKtU','IconSParam9','isTriggered','changeClass','BACK_QUOTE','_cacheScaleX','TextStr','toUpperCase','BoxMargin','isActor','XFSds','string','processEscape','bOGuM','updateMainMultiply','updateFauxAnimations','pictureButtons','fillRect','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','apply','COMMA','vvAvI','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Interpreter_command355','titleCommandWindow','CyYWE','initDigitGrouping','Sprite_Picture_updateOrigin','StatusBgType','Window_NumberInput_start','COLON','_mapNameWindow','WIN_OEM_CUSEL','centerSprite','setup','resetFontSettings','OPEN_CURLY_BRACKET','285646qYjsjN','key%1','XParamVocab7','buttonAssistOffset1','qqklh','LATIN1','TextJS','Basic','cursorUp','<JS\x20%1\x20%2:[\x20](.*)>','option','rvXnt','MODECHANGE','listWindowRect','doesNameContainBannedWords','return\x200','drawActorExpGauge','Window_Selectable_processTouch','MultiKeyFmt','_sellWindow','yScrollLinkedOffset','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','VFtwB','HRtdj','buttonAssistKey%1','isSideButtonLayout','SParamVocab3','Window_Selectable_cursorDown','zWdjf','duration','transform','_pictureContainer','fSwYe','MainMenu','optSideView','_muteSound','setSideView','Graphics','ProfileRect','addChild','_backgroundFilter','description','targetOpacity','drawBackgroundRect','LnUNm','Bitmap_fillRect','adjustSprite','\x5c}❪SHIFT❫\x5c{','NumberRect','systemColor','cursorLeft','makeCommandList','MRF','shake','zyfrq','EnableMasking','RJzBy','WindowLayer_render','foxav','powerDownColor','waiting','processAlwaysEscape','PIPE','anchor','SHIFT','SzUgG','TitleCommandList','_backgroundSprite','GroupDigits','markCoreEngineModified','actor','gmfFo','ccQXl','cPAAt','SceneManager_initialize','wkOHD','Window_NameInput_cursorUp','loadPicture','profileWindowRect','VisuMZ_2_BattleSystemBTB','targetBackOpacity','EnableNumberInput','OHqXB','initCoreEasing','Scene_Skill_create','ColorMPGauge1','iconHeight','YVuNy','BTestArmors','TextFmt','OkText','makeFontSmaller','removeFauxAnimation','XGpvK','Renderer','buttonAssistOffset%1','_drawTextOutline','WKOKp','Settings','updateShadow','keyRepeatWait','processBack','ShowJS','optionsWindowRect','defaultInputMode','process_VisuMZ_CoreEngine_jsQuickFunctions','ZsECO','_coreEngineShakeStyle','drawCharacter','setSize','setActionState','updateKeyText','joAJY','updateScene','getCustomBackgroundSettings','offsetY','nyfFT','moveRelativeToResolutionChange','initCoreEngine','isMapScrollLinked','ctNnl','OutlineColor','valueOutlineColor','innerWidth','paramPlusJS','registerCommand','isEnemy','paramRateJS','Flat2','determineSideButtonLayoutValid','Bitmap_drawCircle','targets','SQerx','wXiQS','Game_Interpreter_command111','_cache','Game_Interpreter_command105','EXR','Script\x20Call\x20Error','CAPSLOCK','IconParam0','contentsBack','note','_refreshBack','pixelated','mpGaugeColor1','onNameOk','QEByx','buyWindowRect','command122','ColorMaxLvGauge2','ZERO','OUTEXPO','CategoryBgType','toLocaleString','updateAnchor','ghUNq','initialBattleSystem','SParamVocab5','ActorRect','Bitmap_strokeRect','currentValue','erasePicture','EXECUTE','CreateBattleSystemID','cNJoX','Sprite_Button_updateOpacity','textWidth','BTB','BottomHelp','gainItem','_windowLayer','ButtonAssist','OptionsRect','createWindowLayer','_bitmap','Sprite_Button_initialize','show','loadGameImagesCoreEngine','ColorCTGauge2','Max','CLOSE_PAREN','measureTextWidth','OUTQUAD','paramName','EnableJS','pictureId','ItemBackColor2','HelpRect','title','version','layoutSettings','skillTypes','GREATER_THAN','SELECT','EXSEL','GameEnd','Xvfbq','auurt','Spriteset_Base_updatePosition','GRD','aeOgM','KtKgs','IconXParam3','cdjdt','setSideButtonLayout','DigitGroupingLocale','processTimingData','ColorSystem','_digitGroupingEx','drawSegment','ysTUn','INEXPO','Subtitle','gainGold','Window_Selectable_processCursorMove','PixelateImageRendering','MAX_GL_TEXTURES','_skillTypeWindow','ParseEnemyNotetags','catchNormalError','isCursorMovable','INCIRC','Scene_Map_createMenuButton','valueOutlineWidth','onInputOk','hpGaugeColor2','_shakeDuration','PERCENT','commandWindowRows','vpXoO','ASFNS','IconParam3','Page','targetScaleY','Scene_Title_drawGameTitle','atbActive','battleSystem','LUK','INOUTQUINT','PKted','index','UNDERSCORE','buttonAssistKey4','itemRect','END','INOUTSINE','setupButtonImage','Linear','calcCoreEasing','sparamFlatJS','traitsPi','Spriteset_Base_destroy','DashToggleR','1EkSPDX','rightArrowWidth','disable','XParamVocab1','connected','_editWindow','xparamRate','createTextState','Scene_Name_create','IconSParam2','GoldBgType','bInjx','_stored_tpCostColor','setBackgroundType','alwaysDash','INOUTBOUNCE','MCtEU','Scene_Boot_loadSystemImages','opacity','ItemHeight','IconXParam0','INQUART','itemHitImprovedAccuracy','Bitmap_clearRect','_categoryWindow','BgFilename1','expGaugeColor1','GYXsq','GoldIcon','animationId','DECIMAL','ErFhQ','FunctionName','createCancelButton','VisuMZ_2_BattleSystemSTB','TqGQL','SideView','helpAreaBottom','CallHandlerJS','pow','F22','TitlePicButtons','ColorExpGauge2','getGamepads','nlumW','qFtLv','item','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','InputBgType','gKxxw','SParamVocab0','HelpBgType','SParamVocab8','setMoveEasingType','INOUTQUART','\x5c}❪TAB❫\x5c{','hnGcn','Scene_MenuBase_helpAreaTop','SParamVocab2','updatePositionCoreEngineShakeRand','xparamFlat2','setAction','DOUBLE_QUOTE','DefaultMode','([\x5c+\x5c-]\x5cd+)>','GJWYy','Scene_Equip_create','tilesets','Key%1','format','_pollGamepads','qTLeT','loadTitle1','WIN_OEM_FJ_MASSHOU','xparamPlus','canUse','PkatS','Param','ListRect','Color','DigitGroupingGaugeSprites','addWindow','command111','_stored_expGaugeColor1','_profileWindow','cancel','OUTQUART','Window_Base_drawIcon','bind','qdaOu','76226bfBvaV','nickname','ctrl','PGUP','lmtiy','_stored_hpGaugeColor1','ActorHPColor','FuSQC','PkPpO','isPhysical','sparamPlus2','BottomButtons','ATK','rowSpacing','ARRAYSTR','_pageupButton','OptionsBgType','params','HVEXk','processSoundTimings','nLiia','enable','mainAreaTopSideButtonLayout','Game_BattlerBase_refresh','startAnimation','FTB','EISU','Game_Actor_changeClass','move','Game_Picture_move'];const _0x304852=_0x5986;(function(_0x53412a,_0x7a6f27){const _0x2467fd=_0x5986;while(!![]){try{const _0x14e508=-parseInt(_0x2467fd(0x6d3))+parseInt(_0x2467fd(0x323))*-parseInt(_0x2467fd(0xd5))+parseInt(_0x2467fd(0x33f))*parseInt(_0x2467fd(0x679))+parseInt(_0x2467fd(0x2af))*-parseInt(_0x2467fd(0x797))+parseInt(_0x2467fd(0x3f5))+parseInt(_0x2467fd(0x125))+parseInt(_0x2467fd(0x57b));if(_0x14e508===_0x7a6f27)break;else _0x53412a['push'](_0x53412a['shift']());}catch(_0x2ebfdc){_0x53412a['push'](_0x53412a['shift']());}}}(_0x381d,0x90e88));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x304852(0x4bc)](function(_0x19950c){const _0x2e827c=_0x304852;return _0x19950c[_0x2e827c(0x37e)]&&_0x19950c[_0x2e827c(0x5a4)][_0x2e827c(0x44a)]('['+label+']');})[0x0];VisuMZ[label][_0x304852(0x5dd)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x304852(0x407)]=function(_0x15e784,_0x30c821){const _0x589a52=_0x304852;for(const _0x3e1cef in _0x30c821){if(_0x3e1cef[_0x589a52(0x54d)](/(.*):(.*)/i)){const _0x220ac9=String(RegExp['$1']),_0x2f517e=String(RegExp['$2'])[_0x589a52(0x55d)]()[_0x589a52(0x4ae)]();let _0x1a00fe,_0x526ac5,_0x377753;switch(_0x2f517e){case _0x589a52(0x3b9):_0x1a00fe=_0x30c821[_0x3e1cef]!==''?Number(_0x30c821[_0x3e1cef]):0x0;break;case _0x589a52(0x53a):_0x526ac5=_0x30c821[_0x3e1cef]!==''?JSON[_0x589a52(0x107)](_0x30c821[_0x3e1cef]):[],_0x1a00fe=_0x526ac5['map'](_0x19951c=>Number(_0x19951c));break;case _0x589a52(0xe6):_0x1a00fe=_0x30c821[_0x3e1cef]!==''?eval(_0x30c821[_0x3e1cef]):null;break;case'ARRAYEVAL':_0x526ac5=_0x30c821[_0x3e1cef]!==''?JSON[_0x589a52(0x107)](_0x30c821[_0x3e1cef]):[],_0x1a00fe=_0x526ac5[_0x589a52(0x12e)](_0x26bdfd=>eval(_0x26bdfd));break;case'JSON':_0x1a00fe=_0x30c821[_0x3e1cef]!==''?JSON[_0x589a52(0x107)](_0x30c821[_0x3e1cef]):'';break;case _0x589a52(0x352):_0x526ac5=_0x30c821[_0x3e1cef]!==''?JSON[_0x589a52(0x107)](_0x30c821[_0x3e1cef]):[],_0x1a00fe=_0x526ac5[_0x589a52(0x12e)](_0x4fddee=>JSON['parse'](_0x4fddee));break;case _0x589a52(0x22c):_0x1a00fe=_0x30c821[_0x3e1cef]!==''?new Function(JSON[_0x589a52(0x107)](_0x30c821[_0x3e1cef])):new Function(_0x589a52(0x58a));break;case _0x589a52(0x757):_0x526ac5=_0x30c821[_0x3e1cef]!==''?JSON[_0x589a52(0x107)](_0x30c821[_0x3e1cef]):[],_0x1a00fe=_0x526ac5['map'](_0xe7e2d8=>new Function(JSON['parse'](_0xe7e2d8)));break;case'STR':_0x1a00fe=_0x30c821[_0x3e1cef]!==''?String(_0x30c821[_0x3e1cef]):'';break;case _0x589a52(0x6e1):_0x526ac5=_0x30c821[_0x3e1cef]!==''?JSON[_0x589a52(0x107)](_0x30c821[_0x3e1cef]):[],_0x1a00fe=_0x526ac5[_0x589a52(0x12e)](_0x388a72=>String(_0x388a72));break;case _0x589a52(0x7a9):_0x377753=_0x30c821[_0x3e1cef]!==''?JSON['parse'](_0x30c821[_0x3e1cef]):{},_0x15e784[_0x220ac9]={},VisuMZ[_0x589a52(0x407)](_0x15e784[_0x220ac9],_0x377753);continue;case _0x589a52(0x758):_0x526ac5=_0x30c821[_0x3e1cef]!==''?JSON[_0x589a52(0x107)](_0x30c821[_0x3e1cef]):[],_0x1a00fe=_0x526ac5['map'](_0x5af3b6=>VisuMZ[_0x589a52(0x407)]({},JSON[_0x589a52(0x107)](_0x5af3b6)));break;default:continue;}_0x15e784[_0x220ac9]=_0x1a00fe;}}return _0x15e784;},(_0x2a966b=>{const _0x5e63e2=_0x304852,_0x221d9f=_0x2a966b['name'];for(const _0x34275a of dependencies){if(_0x5e63e2(0x5b1)===_0x5e63e2(0x5b1)){if(!Imported[_0x34275a]){alert(_0x5e63e2(0x6a8)[_0x5e63e2(0x6be)](_0x221d9f,_0x34275a)),SceneManager[_0x5e63e2(0x2db)]();break;}}else{function _0x52386f(){const _0x4e888c=_0x5e63e2;_0x249c37[_0x4e888c(0x4ec)]['Sprite_Animation_setViewport'][_0x4e888c(0x1d6)](this,_0xb2a0cf);}}}const _0x1e102a=_0x2a966b[_0x5e63e2(0x5a4)];if(_0x1e102a['match'](/\[Version[ ](.*?)\]/i)){const _0x38f7d2=Number(RegExp['$1']);if(_0x38f7d2!==VisuMZ[label][_0x5e63e2(0x639)]){if(_0x5e63e2(0x597)===_0x5e63e2(0x7bb)){function _0x9620c7(){const _0x575965=_0x5e63e2;return _0x5be47d[_0x575965(0x438)]();}}else alert(_0x5e63e2(0x590)['format'](_0x221d9f,_0x38f7d2)),SceneManager[_0x5e63e2(0x2db)]();}}if(_0x1e102a[_0x5e63e2(0x54d)](/\[Tier[ ](\d+)\]/i)){if(_0x5e63e2(0x5a7)!==_0x5e63e2(0x5a7)){function _0x272ae8(){const _0x41bcb9=_0x5e63e2;return _0x49e411[_0x41bcb9(0x15f)]();}}else{const _0x21349b=Number(RegExp['$1']);if(_0x21349b<tier)alert(_0x5e63e2(0x56c)[_0x5e63e2(0x6be)](_0x221d9f,_0x21349b,tier)),SceneManager[_0x5e63e2(0x2db)]();else{if(_0x5e63e2(0x541)===_0x5e63e2(0x406)){function _0x9e950b(){const _0x5bdcf6=_0x5e63e2;_0x2a0a18+=_0x5bdcf6(0x220);}}else tier=Math[_0x5e63e2(0x710)](_0x21349b,tier);}}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x2a966b[_0x5e63e2(0x4a5)]);})(pluginData),VisuMZ[_0x304852(0x4ec)][_0x304852(0x4bb)]={'PluginCommands':!![]},PluginManager[_0x304852(0x5f8)](pluginData['name'],_0x304852(0x103),_0xfdc555=>{const _0x656687=_0x304852;VisuMZ['ConvertParams'](_0xfdc555,_0xfdc555);const _0x573268=_0xfdc555[_0x656687(0x247)];VisuMZ[_0x656687(0x1d0)](_0x573268);}),PluginManager[_0x304852(0x5f8)](pluginData[_0x304852(0x3a8)],'GoldChange',_0xbba34d=>{const _0x5de9b2=_0x304852;VisuMZ['ConvertParams'](_0xbba34d,_0xbba34d);const _0x431101=_0xbba34d[_0x5de9b2(0xf5)]||0x0;$gameParty[_0x5de9b2(0x651)](_0x431101);}),PluginManager[_0x304852(0x5f8)](pluginData[_0x304852(0x3a8)],_0x304852(0x2bb),_0x4fd36a=>{const _0x58bf60=_0x304852;VisuMZ['ConvertParams'](_0x4fd36a,_0x4fd36a);const _0x2f05b4=_0x4fd36a[_0x58bf60(0x635)]||0x1,_0x31b3c9=_0x4fd36a[_0x58bf60(0x372)]||_0x58bf60(0x673),_0x41405c=$gameScreen[_0x58bf60(0x4c3)](_0x2f05b4);_0x41405c&&_0x41405c[_0x58bf60(0x23b)](_0x31b3c9);}),PluginManager[_0x304852(0x5f8)](pluginData[_0x304852(0x3a8)],_0x304852(0xd2),_0x5b4b99=>{const _0x3acde5=_0x304852;for(let _0x2b3550=0x1;_0x2b3550<=0x64;_0x2b3550++){$gameScreen[_0x3acde5(0x61d)](_0x2b3550);}}),PluginManager[_0x304852(0x5f8)](pluginData[_0x304852(0x3a8)],'PictureEraseRange',_0x56d3a0=>{const _0x83abd9=_0x304852;VisuMZ[_0x83abd9(0x407)](_0x56d3a0,_0x56d3a0);const _0x4f8581=Math[_0x83abd9(0x7a0)](_0x56d3a0['StartID'],_0x56d3a0[_0x83abd9(0x1fe)]),_0x21637f=Math['max'](_0x56d3a0[_0x83abd9(0x1bc)],_0x56d3a0[_0x83abd9(0x1fe)]);for(let _0x4b2910=_0x4f8581;_0x4b2910<=_0x21637f;_0x4b2910++){$gameScreen[_0x83abd9(0x61d)](_0x4b2910);}}),PluginManager[_0x304852(0x5f8)](pluginData['name'],_0x304852(0x317),_0x2e5679=>{const _0x4cf0f0=_0x304852;VisuMZ['ConvertParams'](_0x2e5679,_0x2e5679);const _0x18c51e=_0x2e5679[_0x4cf0f0(0x4bd)]||_0x4cf0f0(0x3b4),_0x42147d=_0x2e5679[_0x4cf0f0(0x2ec)][_0x4cf0f0(0x206)](0x1,0x9),_0x221afb=_0x2e5679['Speed']['clamp'](0x1,0x9),_0x253b94=_0x2e5679['Duration']||0x1,_0x3dcfd7=_0x2e5679[_0x4cf0f0(0x462)];$gameScreen[_0x4cf0f0(0x73a)](_0x18c51e),$gameScreen[_0x4cf0f0(0x2bd)](_0x42147d,_0x221afb,_0x253b94);if(_0x3dcfd7){if(_0x4cf0f0(0x5f3)===_0x4cf0f0(0x23a)){function _0x23b7bd(){const _0x43dec9=_0x4cf0f0,_0x3bde98=_0x51381c(_0x39cfb1['$1']);_0x3bde98<_0x14c372?(_0x3ce674('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x43dec9(0x6be)](_0x24b810,_0x3bde98,_0x7c303c)),_0x445be5[_0x43dec9(0x2db)]()):_0x1447d5=_0x1054c4[_0x43dec9(0x710)](_0x3bde98,_0x2aaaca);}}else{const _0x1754db=$gameTemp[_0x4cf0f0(0x52f)]();if(_0x1754db)_0x1754db[_0x4cf0f0(0xfa)](_0x253b94);}}}),PluginManager[_0x304852(0x5f8)](pluginData['name'],_0x304852(0x203),_0x6c64b0=>{const _0x2576b7=_0x304852;VisuMZ[_0x2576b7(0x407)](_0x6c64b0,_0x6c64b0);const _0x32da8c=_0x6c64b0[_0x2576b7(0x585)]||0x1;$gameSystem['setMainFontSize'](_0x32da8c);}),PluginManager[_0x304852(0x5f8)](pluginData[_0x304852(0x3a8)],_0x304852(0x444),_0x421d5e=>{const _0x219f50=_0x304852;if($gameParty[_0x219f50(0x4dc)]())return;VisuMZ[_0x219f50(0x407)](_0x421d5e,_0x421d5e);const _0x11694f=_0x421d5e[_0x219f50(0x585)];if(_0x11694f[_0x219f50(0x54d)](/Front/i)){if('bVGgM'==='cWKoN'){function _0x2e6539(){const _0x19558f=_0x219f50;this[_0x19558f(0x691)][_0x19558f(0x686)](_0x3958a4[_0x19558f(0x63a)][_0x19558f(0x614)]);}}else $gameSystem[_0x219f50(0x59f)](![]);}else{if(_0x11694f[_0x219f50(0x54d)](/Side/i)){if(_0x219f50(0x645)===_0x219f50(0x645))$gameSystem['setSideView'](!![]);else{function _0x3a11ae(){const _0x47c474=_0x219f50;var _0x44b62d=_0x5dbbb9(_0x2a0230['$1']);try{_0x28a50a*=_0x5130fd(_0x44b62d);}catch(_0x565818){if(_0xc3a93c['isPlaytest']())_0x20e592[_0x47c474(0x3f8)](_0x565818);}}}}else{if(_0x219f50(0x139)!==_0x219f50(0x5bc))$gameSystem['setSideView'](!$gameSystem[_0x219f50(0x25a)]());else{function _0x1004a8(){return![];}}}}}),PluginManager[_0x304852(0x5f8)](pluginData['name'],'SystemLoadAudio',_0xef8298=>{const _0x246bba=_0x304852;if($gameParty[_0x246bba(0x4dc)]())return;VisuMZ[_0x246bba(0x407)](_0xef8298,_0xef8298);const _0x4092e7=[_0x246bba(0x1c0),_0x246bba(0x266),'me','se'];for(const _0x1899d5 of _0x4092e7){if(_0x246bba(0xe3)===_0x246bba(0xe3)){const _0x37e195=_0xef8298[_0x1899d5],_0x59d41e=_0x246bba(0xdb)['format'](_0x1899d5);for(const _0x2d6414 of _0x37e195){console['log'](_0x59d41e,_0x2d6414),AudioManager[_0x246bba(0xee)](_0x59d41e,_0x2d6414);}}else{function _0x18249a(){const _0x4cd625=_0x246bba;return _0x363d70[_0x4cd625(0x530)]()?this['mainAreaTopSideButtonLayout']():_0x565c6c['CoreEngine'][_0x4cd625(0x254)]['call'](this);}}}}),PluginManager[_0x304852(0x5f8)](pluginData['name'],_0x304852(0x703),_0x1863f6=>{const _0x897ff=_0x304852;if($gameParty['inBattle']())return;VisuMZ[_0x897ff(0x407)](_0x1863f6,_0x1863f6);const _0x52540e=['animations',_0x897ff(0x75a),_0x897ff(0x146),_0x897ff(0x18d),'enemies',_0x897ff(0xbe),_0x897ff(0x1f6),_0x897ff(0x4ad),_0x897ff(0x161),_0x897ff(0x4f4),'system',_0x897ff(0x6bc),_0x897ff(0x253),_0x897ff(0x11a)];for(const _0x194c1f of _0x52540e){const _0xcd0dd4=_0x1863f6[_0x194c1f],_0x24660c=_0x897ff(0x7ad)['format'](_0x194c1f);for(const _0x360a5c of _0xcd0dd4){if(_0x897ff(0x5c2)===_0x897ff(0x5c2))ImageManager[_0x897ff(0x712)](_0x24660c,_0x360a5c);else{function _0x553347(){return 0x0;}}}}}),PluginManager[_0x304852(0x5f8)](pluginData[_0x304852(0x3a8)],_0x304852(0x2e6),_0x4a1268=>{const _0x233d3e=_0x304852;if($gameParty['inBattle']())return;VisuMZ[_0x233d3e(0x407)](_0x4a1268,_0x4a1268);const _0x4fead0=_0x4a1268[_0x233d3e(0x585)][_0x233d3e(0x55d)]()[_0x233d3e(0x4ae)](),_0x2e0738=VisuMZ['CoreEngine'][_0x233d3e(0x61f)](_0x4fead0);$gameSystem[_0x233d3e(0x772)](_0x2e0738);}),VisuMZ[_0x304852(0x4ec)][_0x304852(0x61f)]=function(_0x701f79){const _0x3ecf8b=_0x304852;_0x701f79=_0x701f79||_0x3ecf8b(0x41b),_0x701f79=String(_0x701f79)[_0x3ecf8b(0x55d)]()[_0x3ecf8b(0x4ae)]();switch(_0x701f79){case'DTB':return 0x0;case'TPB\x20ACTIVE':Imported[_0x3ecf8b(0x3eb)]&&(ConfigManager['atbActive']=!![]);return 0x1;case _0x3ecf8b(0x10a):if(Imported[_0x3ecf8b(0x3eb)]){if(_0x3ecf8b(0x432)==='zZFbM')ConfigManager['atbActive']=![];else{function _0x329549(){const _0x2e649d=_0x3ecf8b;this[_0x2e649d(0x37f)]=_0x57c2ab[_0x2e649d(0x7bc)],_0x5f5aaa[_0x2e649d(0x4ec)][_0x2e649d(0x435)][_0x2e649d(0x1d6)](this,_0x230020);}}}return 0x2;case'CTB':if(Imported[_0x3ecf8b(0x28f)])return _0x3ecf8b(0x775);break;case'STB':if(Imported[_0x3ecf8b(0x69b)])return _0x3ecf8b(0x72d);break;case _0x3ecf8b(0x623):if(Imported[_0x3ecf8b(0x5ca)])return _0x3ecf8b(0x623);break;case _0x3ecf8b(0x6ec):if(Imported[_0x3ecf8b(0x1ad)]){if(_0x3ecf8b(0x3ff)===_0x3ecf8b(0x368)){function _0x5574eb(){const _0x2cac21=_0x3ecf8b,_0x755a72=_0x2eae87[_0x2cac21(0x6d4)]()[_0x2cac21(0x333)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x4cc295[_0x2cac21(0x6d4)](),_0x95406d,_0x277e73,_0x5d8fe6);}}else return _0x3ecf8b(0x6ec);}break;case'OTB':if(Imported[_0x3ecf8b(0x794)])return _0x3ecf8b(0x370);break;}return $dataSystem[_0x3ecf8b(0x668)];},PluginManager[_0x304852(0x5f8)](pluginData['name'],_0x304852(0x785),_0x14f580=>{const _0x2e3715=_0x304852;VisuMZ[_0x2e3715(0x407)](_0x14f580,_0x14f580);const _0x354126=_0x14f580['option']||0x1;$gameSystem[_0x2e3715(0x4be)](_0x354126);}),VisuMZ[_0x304852(0x4ec)][_0x304852(0x484)]=Scene_Boot[_0x304852(0x7ba)]['onDatabaseLoaded'],Scene_Boot[_0x304852(0x7ba)][_0x304852(0x2b9)]=function(){const _0x507ed9=_0x304852;VisuMZ[_0x507ed9(0x4ec)]['Scene_Boot_onDatabaseLoaded'][_0x507ed9(0x1d6)](this),this[_0x507ed9(0x746)](),this[_0x507ed9(0x45a)](),this[_0x507ed9(0x3e9)](),this[_0x507ed9(0x179)](),this[_0x507ed9(0xd1)](),VisuMZ[_0x507ed9(0x7b3)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x6f1)]={},Scene_Boot['prototype'][_0x304852(0x746)]=function(){const _0x513ff9=_0x304852,_0x55fdbd=[_0x513ff9(0x37b),'MAXMP',_0x513ff9(0x6df),_0x513ff9(0x482),_0x513ff9(0x6f9),_0x513ff9(0x71f),_0x513ff9(0x729),_0x513ff9(0x669)],_0x2278b2=[_0x513ff9(0x4d3),_0x513ff9(0x1a2),_0x513ff9(0x217),_0x513ff9(0x36a),_0x513ff9(0x3ad),'MRF','CNT',_0x513ff9(0x3fc),'MRG',_0x513ff9(0x18f)],_0xbb4bb9=[_0x513ff9(0x470),_0x513ff9(0x643),_0x513ff9(0x300),_0x513ff9(0x3a7),'MCR',_0x513ff9(0x31b),'PDR','MDR',_0x513ff9(0x319),_0x513ff9(0x604)],_0x458717=[_0x55fdbd,_0x2278b2,_0xbb4bb9],_0x5ca466=['Plus',_0x513ff9(0x19d),_0x513ff9(0x2f0),_0x513ff9(0x62f),_0x513ff9(0x2f9),'Rate1',_0x513ff9(0x128),_0x513ff9(0x2fd),_0x513ff9(0x3ce),_0x513ff9(0x5fb)];for(const _0x4a781b of _0x458717){let _0x221b5f='';if(_0x4a781b===_0x55fdbd)_0x221b5f=_0x513ff9(0x32c);if(_0x4a781b===_0x2278b2)_0x221b5f=_0x513ff9(0x285);if(_0x4a781b===_0xbb4bb9)_0x221b5f=_0x513ff9(0x1f3);for(const _0x8b5879 of _0x5ca466){if('qBqNF'!==_0x513ff9(0x556)){let _0x288755=_0x513ff9(0x1ff)['format'](_0x221b5f,_0x8b5879);VisuMZ[_0x513ff9(0x4ec)][_0x513ff9(0x6f1)][_0x288755]=[],VisuMZ['CoreEngine']['RegExp'][_0x288755+'JS']=[];let _0x3313f6=_0x513ff9(0x358);if([_0x513ff9(0x421),_0x513ff9(0x2fd)]['includes'](_0x8b5879))_0x3313f6+=_0x513ff9(0x6b9);else{if(['Plus1','Flat1'][_0x513ff9(0x44a)](_0x8b5879))_0x3313f6+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x513ff9(0x2f0),'Flat2'][_0x513ff9(0x44a)](_0x8b5879))_0x3313f6+=_0x513ff9(0x568);else{if(_0x8b5879==='Max'){if('QhHPv'===_0x513ff9(0x120)){function _0x5368c7(){const _0x87406e=_0x513ff9;return this[_0x87406e(0x126)][_0x87406e(0x12a)]>0x0;}}else _0x3313f6+=_0x513ff9(0x284);}else{if(_0x8b5879==='Rate1'){if(_0x513ff9(0x1f5)!==_0x513ff9(0x2ac))_0x3313f6+=_0x513ff9(0x220);else{function _0x27a31d(){const _0x299bf9=_0x513ff9,_0x1dd12c=_0x36a613[_0x299bf9(0x4ec)]['Settings'][_0x299bf9(0x15e)];return this['_inputWindow'][_0x299bf9(0x29f)]===_0x299bf9(0x48e)?_0x1dd12c['Keyboard']||_0x299bf9(0x349):_0x1dd12c['Manual']||_0x299bf9(0x320);}}}else _0x8b5879==='Rate2'&&(_0x3313f6+=_0x513ff9(0x11f));}}}}for(const _0x308efa of _0x4a781b){if(_0x513ff9(0x2a4)!=='tslqi'){function _0x239730(){const _0x118348=_0x513ff9;return _0x3e469e[_0x118348(0x4ec)][_0x118348(0x6f8)][_0x4586ef]===_0x118348(0x718)?_0x369609:_0x5ca6af((_0x4d7017*0x64)[_0x118348(0x34c)](_0x28bb6c))+'%';}}else{let _0x762f31=_0x8b5879[_0x513ff9(0x333)](/[\d+]/g,'')[_0x513ff9(0x55d)]();const _0x50957f=_0x3313f6['format'](_0x308efa,_0x762f31);VisuMZ[_0x513ff9(0x4ec)][_0x513ff9(0x6f1)][_0x288755]['push'](new RegExp(_0x50957f,'i'));const _0x1471dd=_0x513ff9(0x584)[_0x513ff9(0x6be)](_0x308efa,_0x762f31);VisuMZ['CoreEngine'][_0x513ff9(0x6f1)][_0x288755+'JS'][_0x513ff9(0x700)](new RegExp(_0x1471dd,'i'));}}}else{function _0x38606f(){const _0x4c4edd=_0x513ff9;_0x208c49[_0x4c4edd(0x7b9)](_0x4c4edd(0x1ea))&&_0xf1833b[_0x4c4edd(0x4ec)][_0x4c4edd(0x5dd)][_0x4c4edd(0x409)][_0x4c4edd(0x493)]?this[_0x4c4edd(0x307)]():_0x38e092[_0x4c4edd(0x4ec)]['Scene_Boot_startNormalGame'][_0x4c4edd(0x1d6)](this);}}}}},Scene_Boot[_0x304852(0x7ba)][_0x304852(0x45a)]=function(){const _0x4ec256=_0x304852;if(VisuMZ[_0x4ec256(0x7b3)])return;},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Settings']=function(){const _0x414ed5=_0x304852;VisuMZ[_0x414ed5(0x4ec)][_0x414ed5(0x5dd)][_0x414ed5(0x409)][_0x414ed5(0x248)]&&VisuMZ['ShowDevTools'](!![]);VisuMZ['CoreEngine'][_0x414ed5(0x5dd)][_0x414ed5(0x409)][_0x414ed5(0x4ef)]&&(Input['keyMapper'][0x23]=_0x414ed5(0x738),Input[_0x414ed5(0x526)][0x24]='home');if(VisuMZ[_0x414ed5(0x4ec)][_0x414ed5(0x5dd)][_0x414ed5(0x627)]){if(_0x414ed5(0x41c)===_0x414ed5(0x41c)){const _0x27735e=VisuMZ[_0x414ed5(0x4ec)][_0x414ed5(0x5dd)][_0x414ed5(0x627)];_0x27735e[_0x414ed5(0x100)]=_0x27735e[_0x414ed5(0x100)]||_0x414ed5(0x5aa),_0x27735e[_0x414ed5(0x2a9)]=_0x27735e['KeyTAB']||_0x414ed5(0x6b0);}else{function _0x42fd7a(){const _0x5b844d=_0x414ed5;this[_0x5b844d(0x524)]=0x1;}}}if(VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x414ed5(0x3a5)]){if(_0x414ed5(0x72c)!=='BWwYv')Input[_0x414ed5(0x526)][0x57]='up',Input[_0x414ed5(0x526)][0x41]=_0x414ed5(0x132),Input['keyMapper'][0x53]=_0x414ed5(0x1d8),Input[_0x414ed5(0x526)][0x44]=_0x414ed5(0x348),Input[_0x414ed5(0x526)][0x45]=_0x414ed5(0x16d);else{function _0x261983(){const _0x2b1f31=_0x414ed5;if(_0xd3be48[_0x2b1f31(0xd0)]())_0x4c494f['log'](_0x20e519);}}}VisuMZ[_0x414ed5(0x4ec)][_0x414ed5(0x5dd)][_0x414ed5(0x15e)][_0x414ed5(0x678)]&&(Input[_0x414ed5(0x526)][0x52]='dashToggle');},Scene_Boot[_0x304852(0x7ba)][_0x304852(0x179)]=function(){const _0x15b6a2=_0x304852;this[_0x15b6a2(0x5e4)]();},Scene_Boot[_0x304852(0x7ba)][_0x304852(0x5e4)]=function(){const _0x3e9c2d=_0x304852,_0x54d265=VisuMZ['CoreEngine'][_0x3e9c2d(0x5dd)][_0x3e9c2d(0x167)];for(const _0x180ae4 of _0x54d265){if(_0x3e9c2d(0x749)==='gAvyF'){function _0x2c93c0(){const _0x1d4187=_0x3e9c2d;_0x3300fc=_0x282909['CoreEngine'][_0x1d4187(0x6b2)][_0x1d4187(0x1d6)](this);}}else{const _0x554985=_0x180ae4[_0x3e9c2d(0x699)][_0x3e9c2d(0x333)](/[ ]/g,''),_0x1ae780=_0x180ae4[_0x3e9c2d(0x713)];VisuMZ[_0x3e9c2d(0x4ec)]['createJsQuickFunction'](_0x554985,_0x1ae780);}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x42c)]=function(_0x35f040,_0x33874e){const _0x502103=_0x304852;if(!!window[_0x35f040]){if($gameTemp[_0x502103(0xd0)]())console['log'](_0x502103(0x389)[_0x502103(0x6be)](_0x35f040));}const _0x1507a0='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x502103(0x6be)](_0x35f040,_0x33874e);window[_0x35f040]=new Function(_0x1507a0);},Scene_Boot[_0x304852(0x7ba)][_0x304852(0xd1)]=function(){const _0x21d234=_0x304852,_0x40072f=VisuMZ['CoreEngine']['Settings'][_0x21d234(0x36f)];if(!_0x40072f)return;for(const _0x45c672 of _0x40072f){if(_0x21d234(0x29b)!=='ldWUg'){if(!_0x45c672)continue;VisuMZ[_0x21d234(0x4ec)][_0x21d234(0x430)](_0x45c672);}else{function _0x121f6d(){const _0x450c85=_0x21d234;_0x360ab8['CoreEngine'][_0x450c85(0x15a)][_0x450c85(0x1d6)](this);if(_0x4d347b['_playTestFastMode'])this[_0x450c85(0x3cd)]();}}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x452)]={},VisuMZ[_0x304852(0x4ec)][_0x304852(0x24e)]={},VisuMZ[_0x304852(0x4ec)][_0x304852(0x6f8)]={},VisuMZ[_0x304852(0x4ec)]['CustomParamAbb']={},VisuMZ[_0x304852(0x4ec)][_0x304852(0x430)]=function(_0x5d3fee){const _0x1db25d=_0x304852,_0x366c5f=_0x5d3fee[_0x1db25d(0x2aa)],_0x50809a=_0x5d3fee[_0x1db25d(0x330)],_0x2441e1=_0x5d3fee['Icon'],_0x4a880d=_0x5d3fee[_0x1db25d(0x4bd)],_0xad0fad=new Function(_0x5d3fee[_0x1db25d(0x387)]);VisuMZ[_0x1db25d(0x4ec)][_0x1db25d(0x452)][_0x366c5f[_0x1db25d(0x55d)]()['trim']()]=_0x50809a,VisuMZ[_0x1db25d(0x4ec)]['CustomParamIcons'][_0x366c5f[_0x1db25d(0x55d)]()[_0x1db25d(0x4ae)]()]=_0x2441e1,VisuMZ[_0x1db25d(0x4ec)][_0x1db25d(0x6f8)][_0x366c5f[_0x1db25d(0x55d)]()[_0x1db25d(0x4ae)]()]=_0x4a880d,VisuMZ['CoreEngine'][_0x1db25d(0x708)][_0x366c5f[_0x1db25d(0x55d)]()['trim']()]=_0x366c5f,Object[_0x1db25d(0x313)](Game_BattlerBase[_0x1db25d(0x7ba)],_0x366c5f,{'get'(){const _0x58e3f8=_0x1db25d,_0x4834d9=_0xad0fad[_0x58e3f8(0x1d6)](this);return _0x4a880d===_0x58e3f8(0x718)?Math[_0x58e3f8(0x2f2)](_0x4834d9):_0x4834d9;}});},VisuMZ['ParseAllNotetags']=function(){const _0x291feb=_0x304852;for(const _0x411f37 of $dataActors){if('LQjYy'!==_0x291feb(0x4e8)){if(_0x411f37)VisuMZ['ParseActorNotetags'](_0x411f37);}else{function _0x5d0579(){const _0x3a830e=_0x291feb;_0x407d32[_0x3a830e(0x667)]=!![];}}}for(const _0x401ec9 of $dataClasses){if(_0x401ec9)VisuMZ[_0x291feb(0x30b)](_0x401ec9);}for(const _0xaae542 of $dataSkills){if(_0xaae542)VisuMZ['ParseSkillNotetags'](_0xaae542);}for(const _0x30b93a of $dataItems){if(_0x291feb(0x1e4)!==_0x291feb(0x171)){if(_0x30b93a)VisuMZ[_0x291feb(0x51e)](_0x30b93a);}else{function _0x55f3f4(){const _0x5c76e4=_0x291feb;(this[_0x5c76e4(0x4d2)]!==_0x18db29||this[_0x5c76e4(0x773)]!==_0x6b99de)&&(this['setMoveEasingType']('Linear'),this['_movementWholeDuration']=_0x1c9127),_0x2eba5b[_0x5c76e4(0x4ec)][_0x5c76e4(0x1db)]['call'](this,_0xe55ced,_0x1bc5a1,_0x4d1df8);}}}for(const _0x4b00fb of $dataWeapons){if(_0x4b00fb)VisuMZ['ParseWeaponNotetags'](_0x4b00fb);}for(const _0x553b9d of $dataArmors){if('rCPLy'===_0x291feb(0x342)){function _0x149930(){const _0x3d927f=_0x291feb;var _0x26cf21=_0x16680b(_0x24b7c1['$1']);try{_0x3c9a75+=_0x5170e0(_0x26cf21);}catch(_0x5a3b55){if(_0x38b5d0[_0x3d927f(0xd0)]())_0x937b2[_0x3d927f(0x3f8)](_0x5a3b55);}}}else{if(_0x553b9d)VisuMZ['ParseArmorNotetags'](_0x553b9d);}}for(const _0x5214ab of $dataEnemies){if(_0x5214ab)VisuMZ[_0x291feb(0x656)](_0x5214ab);}for(const _0x4c4c4a of $dataStates){if(_0x4c4c4a)VisuMZ[_0x291feb(0x2c5)](_0x4c4c4a);}for(const _0xac9a34 of $dataTilesets){if(_0xac9a34)VisuMZ[_0x291feb(0x1ee)](_0xac9a34);}},VisuMZ[_0x304852(0x53e)]=function(_0x189c10){},VisuMZ[_0x304852(0x30b)]=function(_0x320239){},VisuMZ[_0x304852(0x74a)]=function(_0x2248b5){},VisuMZ[_0x304852(0x51e)]=function(_0xc03566){},VisuMZ['ParseWeaponNotetags']=function(_0x94596c){},VisuMZ[_0x304852(0x39a)]=function(_0x556f60){},VisuMZ['ParseEnemyNotetags']=function(_0xc1f201){},VisuMZ[_0x304852(0x2c5)]=function(_0x2ce80f){},VisuMZ['ParseTilesetNotetags']=function(_0x31fc32){},VisuMZ[_0x304852(0x4ec)][_0x304852(0x53e)]=VisuMZ[_0x304852(0x53e)],VisuMZ[_0x304852(0x53e)]=function(_0x316876){const _0x418dfd=_0x304852;VisuMZ[_0x418dfd(0x4ec)]['ParseActorNotetags'][_0x418dfd(0x1d6)](this,_0x316876);const _0x4a4237=_0x316876[_0x418dfd(0x609)];if(_0x4a4237[_0x418dfd(0x54d)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x418dfd(0x548)!==_0x418dfd(0x164)){_0x316876[_0x418dfd(0x148)]=Number(RegExp['$1']);if(_0x316876['maxLevel']===0x0)_0x316876[_0x418dfd(0x148)]=Number[_0x418dfd(0x74b)];}else{function _0xa7c659(){const _0x5adfd6=_0x418dfd;return _0xd8d513[_0x5adfd6(0x4ec)][_0x5adfd6(0x5dd)][_0x5adfd6(0x709)]['TranslucentOpacity'];}}}_0x4a4237['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x316876[_0x418dfd(0x76f)]=Math[_0x418dfd(0x7a0)](Number(RegExp['$1']),_0x316876[_0x418dfd(0x148)]));},VisuMZ[_0x304852(0x4ec)]['ParseClassNotetags']=VisuMZ[_0x304852(0x30b)],VisuMZ['ParseClassNotetags']=function(_0x422e34){const _0x572307=_0x304852;VisuMZ[_0x572307(0x4ec)][_0x572307(0x30b)][_0x572307(0x1d6)](this,_0x422e34);if(_0x422e34[_0x572307(0x379)]){if(_0x572307(0x661)!==_0x572307(0x661)){function _0x236134(){const _0x49f3ae=_0x572307;this[_0x49f3ae(0x15b)][_0x49f3ae(0x686)](_0x21beb4[_0x49f3ae(0x63a)][_0x49f3ae(0x572)]);}}else for(const _0x58d822 of _0x422e34[_0x572307(0x379)]){_0x58d822[_0x572307(0x609)][_0x572307(0x54d)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x58d822[_0x572307(0x303)]=Math['max'](Number(RegExp['$1']),0x1));}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x656)]=VisuMZ[_0x304852(0x656)],VisuMZ[_0x304852(0x656)]=function(_0x47cbee){const _0x2da225=_0x304852;VisuMZ[_0x2da225(0x4ec)][_0x2da225(0x656)]['call'](this,_0x47cbee),_0x47cbee[_0x2da225(0x303)]=0x1;const _0x2ef935=_0x47cbee[_0x2da225(0x609)];if(_0x2ef935[_0x2da225(0x54d)](/<LEVEL:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x303)]=Number(RegExp['$1']);if(_0x2ef935['match'](/<MAXHP:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x6e4)][0x0]=Number(RegExp['$1']);if(_0x2ef935[_0x2da225(0x54d)](/<MAXMP:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x6e4)][0x1]=Number(RegExp['$1']);if(_0x2ef935[_0x2da225(0x54d)](/<ATK:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x6e4)][0x2]=Number(RegExp['$1']);if(_0x2ef935[_0x2da225(0x54d)](/<DEF:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x6e4)][0x3]=Number(RegExp['$1']);if(_0x2ef935[_0x2da225(0x54d)](/<MAT:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x6e4)][0x4]=Number(RegExp['$1']);if(_0x2ef935['match'](/<MDF:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x6e4)][0x5]=Number(RegExp['$1']);if(_0x2ef935['match'](/<AGI:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x6e4)][0x6]=Number(RegExp['$1']);if(_0x2ef935[_0x2da225(0x54d)](/<LUK:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x6e4)][0x7]=Number(RegExp['$1']);if(_0x2ef935[_0x2da225(0x54d)](/<EXP:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x39f)]=Number(RegExp['$1']);if(_0x2ef935[_0x2da225(0x54d)](/<GOLD:[ ](\d+)>/i))_0x47cbee[_0x2da225(0x481)]=Number(RegExp['$1']);},VisuMZ[_0x304852(0x4ec)]['Graphics_defaultStretchMode']=Graphics[_0x304852(0x771)],Graphics['_defaultStretchMode']=function(){const _0x7950e0=_0x304852;switch(VisuMZ[_0x7950e0(0x4ec)][_0x7950e0(0x5dd)][_0x7950e0(0x409)]['AutoStretch']){case'stretch':return!![];case _0x7950e0(0x454):return![];default:return VisuMZ[_0x7950e0(0x4ec)]['Graphics_defaultStretchMode'][_0x7950e0(0x1d6)](this);}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x384)]=Graphics[_0x304852(0x4fa)],Graphics[_0x304852(0x4fa)]=function(_0x5b5784,_0xe0136,_0x440e5a=null){const _0xc49baf=_0x304852;VisuMZ[_0xc49baf(0x4ec)][_0xc49baf(0x384)][_0xc49baf(0x1d6)](this,_0x5b5784,_0xe0136,_0x440e5a),VisuMZ[_0xc49baf(0x502)](![]);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x1cc)]=Graphics[_0x304852(0x461)],Graphics[_0x304852(0x461)]=function(_0x383489){const _0x78ea82=_0x304852;VisuMZ['CoreEngine'][_0x78ea82(0x1cc)][_0x78ea82(0x1d6)](this,_0x383489),this['_centerElementCoreEngine'](_0x383489);},Graphics[_0x304852(0x119)]=function(_0x5d538a){const _0x1fcccf=_0x304852;VisuMZ[_0x1fcccf(0x4ec)]['Settings'][_0x1fcccf(0x409)]['FontSmoothing']&&(_0x5d538a[_0x1fcccf(0x16b)]['font-smooth']='none');if(VisuMZ['CoreEngine'][_0x1fcccf(0x5dd)]['QoL'][_0x1fcccf(0x653)]){if(_0x1fcccf(0x57f)==='qqklh')_0x5d538a[_0x1fcccf(0x16b)][_0x1fcccf(0x6f3)]=_0x1fcccf(0x60b);else{function _0x41b491(){const _0xf24622=_0x1fcccf;return _0x2ea325[_0xf24622(0x4ec)][_0xf24622(0x5dd)]['Window']['EnableMasking'];}}}const _0x460ed2=Math[_0x1fcccf(0x710)](0x0,Math[_0x1fcccf(0x392)](_0x5d538a[_0x1fcccf(0x29e)]*this[_0x1fcccf(0x26c)])),_0x68ed9=Math[_0x1fcccf(0x710)](0x0,Math['floor'](_0x5d538a['height']*this['_realScale']));_0x5d538a[_0x1fcccf(0x16b)][_0x1fcccf(0x29e)]=_0x460ed2+'px',_0x5d538a[_0x1fcccf(0x16b)][_0x1fcccf(0x1d3)]=_0x68ed9+'px';},Bitmap[_0x304852(0x7ba)][_0x304852(0x5c0)]=function(){const _0x3f8b25=_0x304852;this[_0x3f8b25(0x18c)]=!![];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x25e)]=Sprite['prototype']['destroy'],Sprite[_0x304852(0x7ba)][_0x304852(0x32a)]=function(){const _0x29703d=_0x304852;VisuMZ[_0x29703d(0x4ec)][_0x29703d(0x25e)]['call'](this),this[_0x29703d(0x239)]();},Sprite[_0x304852(0x7ba)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x104c74=_0x304852;if(!this[_0x104c74(0x525)])return;if(!this['bitmap']['_customModified'])return;this[_0x104c74(0x525)][_0x104c74(0x204)]&&!this[_0x104c74(0x62a)][_0x104c74(0x204)]['destroyed']&&this[_0x104c74(0x525)][_0x104c74(0x32a)]();},VisuMZ['CoreEngine'][_0x304852(0x43c)]=Bitmap[_0x304852(0x7ba)][_0x304852(0x531)],Bitmap[_0x304852(0x7ba)][_0x304852(0x531)]=function(_0x70a402,_0x167774){const _0x487e9e=_0x304852;VisuMZ[_0x487e9e(0x4ec)][_0x487e9e(0x43c)][_0x487e9e(0x1d6)](this,_0x70a402,_0x167774),this[_0x487e9e(0x5c0)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x27c)]=Bitmap[_0x304852(0x7ba)][_0x304852(0x397)],Bitmap[_0x304852(0x7ba)][_0x304852(0x397)]=function(_0x9168d0,_0xa5a0,_0x376956,_0x279b19,_0x17416b,_0x263b4b,_0x45e012,_0x50cb28,_0x24f0d7){const _0x453518=_0x304852;VisuMZ['CoreEngine']['Bitmap_blt'][_0x453518(0x1d6)](this,_0x9168d0,_0xa5a0,_0x376956,_0x279b19,_0x17416b,_0x263b4b,_0x45e012,_0x50cb28,_0x24f0d7),this[_0x453518(0x5c0)]();},VisuMZ[_0x304852(0x4ec)]['Bitmap_clearRect']=Bitmap[_0x304852(0x7ba)][_0x304852(0x17e)],Bitmap['prototype']['clearRect']=function(_0x498455,_0x58700b,_0x585972,_0x375bf9){const _0x16e362=_0x304852;VisuMZ['CoreEngine'][_0x16e362(0x690)][_0x16e362(0x1d6)](this,_0x498455,_0x58700b,_0x585972,_0x375bf9),this['markCoreEngineModified']();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x5a8)]=Bitmap[_0x304852(0x7ba)]['fillRect'],Bitmap[_0x304852(0x7ba)][_0x304852(0x567)]=function(_0x17d0c6,_0x39e93b,_0x192713,_0x3492b5,_0x3621d8){const _0x341609=_0x304852;VisuMZ[_0x341609(0x4ec)]['Bitmap_fillRect'][_0x341609(0x1d6)](this,_0x17d0c6,_0x39e93b,_0x192713,_0x3492b5,_0x3621d8),this[_0x341609(0x5c0)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x61b)]=Bitmap['prototype'][_0x304852(0x288)],Bitmap['prototype'][_0x304852(0x288)]=function(_0x1ef277,_0x57724,_0x3301d0,_0x4c2401,_0x56d7e5){const _0x184dd3=_0x304852;VisuMZ[_0x184dd3(0x4ec)][_0x184dd3(0x61b)][_0x184dd3(0x1d6)](this,_0x1ef277,_0x57724,_0x3301d0,_0x4c2401,_0x56d7e5),this[_0x184dd3(0x5c0)]();},VisuMZ[_0x304852(0x4ec)]['Bitmap_gradientFillRect']=Bitmap[_0x304852(0x7ba)][_0x304852(0x177)],Bitmap[_0x304852(0x7ba)][_0x304852(0x177)]=function(_0x1e2413,_0x3e587c,_0x2471a2,_0x57789b,_0x1eee3d,_0x45f912,_0x2928a3){const _0x4f2a0d=_0x304852;VisuMZ[_0x4f2a0d(0x4ec)][_0x4f2a0d(0x434)]['call'](this,_0x1e2413,_0x3e587c,_0x2471a2,_0x57789b,_0x1eee3d,_0x45f912,_0x2928a3),this[_0x4f2a0d(0x5c0)]();},VisuMZ['CoreEngine'][_0x304852(0x5fd)]=Bitmap[_0x304852(0x7ba)][_0x304852(0x441)],Bitmap['prototype']['drawCircle']=function(_0x11b026,_0x3f88a4,_0x111917,_0x449f9d){const _0x457551=_0x304852;_0x11b026=Math[_0x457551(0x2f2)](_0x11b026),_0x3f88a4=Math[_0x457551(0x2f2)](_0x3f88a4),_0x111917=Math[_0x457551(0x2f2)](_0x111917),VisuMZ[_0x457551(0x4ec)]['Bitmap_drawCircle']['call'](this,_0x11b026,_0x3f88a4,_0x111917,_0x449f9d),this[_0x457551(0x5c0)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0xff)]=Bitmap[_0x304852(0x7ba)][_0x304852(0x631)],Bitmap[_0x304852(0x7ba)][_0x304852(0x631)]=function(_0x46fc05){const _0x48c9ae=_0x304852;return Math[_0x48c9ae(0x2f2)](VisuMZ[_0x48c9ae(0x4ec)]['Bitmap_measureTextWidth'][_0x48c9ae(0x1d6)](this,_0x46fc05));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x3fb)]=Bitmap['prototype']['drawText'],Bitmap[_0x304852(0x7ba)]['drawText']=function(_0x48d70a,_0x2aba44,_0x8eb559,_0x434600,_0x3ec93e,_0x207d17){const _0x2cbdd0=_0x304852;_0x2aba44=Math['round'](_0x2aba44),_0x8eb559=Math['round'](_0x8eb559),_0x434600=Math[_0x2cbdd0(0x2f2)](_0x434600),_0x3ec93e=Math['round'](_0x3ec93e),VisuMZ[_0x2cbdd0(0x4ec)][_0x2cbdd0(0x3fb)][_0x2cbdd0(0x1d6)](this,_0x48d70a,_0x2aba44,_0x8eb559,_0x434600,_0x3ec93e,_0x207d17),this[_0x2cbdd0(0x5c0)]();},VisuMZ[_0x304852(0x4ec)]['Bitmap_drawTextOutline']=Bitmap[_0x304852(0x7ba)][_0x304852(0x5db)],Bitmap[_0x304852(0x7ba)][_0x304852(0x5db)]=function(_0x5eda88,_0x2194c9,_0x4b3ac7,_0x348bf8){const _0x2ab71e=_0x304852;VisuMZ[_0x2ab71e(0x4ec)][_0x2ab71e(0x5dd)]['QoL']['FontShadows']?this[_0x2ab71e(0x2cd)](_0x5eda88,_0x2194c9,_0x4b3ac7,_0x348bf8):VisuMZ[_0x2ab71e(0x4ec)][_0x2ab71e(0xe9)][_0x2ab71e(0x1d6)](this,_0x5eda88,_0x2194c9,_0x4b3ac7,_0x348bf8);},Bitmap[_0x304852(0x7ba)]['_drawTextShadow']=function(_0x34d821,_0x5a7f48,_0x3358c6,_0x125e0c){const _0x166a62=_0x304852,_0x2ac335=this['context'];_0x2ac335['fillStyle']=this[_0x166a62(0x3ef)],_0x2ac335['fillText'](_0x34d821,_0x5a7f48+0x2,_0x3358c6+0x2,_0x125e0c);},VisuMZ[_0x304852(0x4ec)][_0x304852(0xbd)]=Input[_0x304852(0x3f2)],Input[_0x304852(0x3f2)]=function(){const _0x3a1fd3=_0x304852;VisuMZ['CoreEngine'][_0x3a1fd3(0xbd)][_0x3a1fd3(0x1d6)](this),this[_0x3a1fd3(0x2ef)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x3a1fd3(0x138)]=Input[_0x3a1fd3(0x5df)];},VisuMZ['CoreEngine'][_0x304852(0x2ad)]=Input[_0x304852(0x1c2)],Input['update']=function(){const _0x32b350=_0x304852;VisuMZ['CoreEngine'][_0x32b350(0x2ad)]['call'](this);if(this[_0x32b350(0x138)])this[_0x32b350(0x138)]--;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x42e)]=Input[_0x304852(0x6bf)],Input[_0x304852(0x6bf)]=function(){const _0x5a6f1a=_0x304852;if(this[_0x5a6f1a(0x138)])return;VisuMZ[_0x5a6f1a(0x4ec)][_0x5a6f1a(0x42e)][_0x5a6f1a(0x1d6)](this);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x172)]=Input[_0x304852(0x2cc)],Input['_setupEventHandlers']=function(){const _0xb43d0b=_0x304852;VisuMZ['CoreEngine']['Input_setupEventHandlers']['call'](this),document['addEventListener'](_0xb43d0b(0x394),this[_0xb43d0b(0x53b)]['bind'](this));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x435)]=Input[_0x304852(0x2c2)],Input[_0x304852(0x2c2)]=function(_0x4a8ed3){const _0x9f599f=_0x304852;this[_0x9f599f(0x37f)]=_0x4a8ed3[_0x9f599f(0x7bc)],VisuMZ[_0x9f599f(0x4ec)]['Input_onKeyDown'][_0x9f599f(0x1d6)](this,_0x4a8ed3);},Input[_0x304852(0x53b)]=function(_0x5d6109){const _0x52c522=_0x304852;this[_0x52c522(0x77a)](_0x5d6109);},Input['_registerKeyInput']=function(_0x57b3f5){const _0x6d7b44=_0x304852;this['_inputSpecialKeyCode']=_0x57b3f5[_0x6d7b44(0x7bc)];let _0x3fc562=String['fromCharCode'](_0x57b3f5[_0x6d7b44(0x2ee)]);if(this[_0x6d7b44(0x2ef)]===undefined){if(_0x6d7b44(0xfc)===_0x6d7b44(0xfc))this[_0x6d7b44(0x2ef)]=_0x3fc562;else{function _0x29bf79(){const _0x505d77=_0x6d7b44;this[_0x505d77(0x488)](_0x42b58e);}}}else{if('kurHK'!=='kurHK'){function _0x507f19(){const _0x42d0fa=_0x6d7b44;this[_0x42d0fa(0x4b2)]();}}else this[_0x6d7b44(0x2ef)]+=_0x3fc562;}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x1ec)]=Input[_0x304852(0x3fa)],Input[_0x304852(0x3fa)]=function(_0x44efad){const _0x56b598=_0x304852;if(_0x44efad===0x8)return![];return VisuMZ[_0x56b598(0x4ec)]['Input_shouldPreventDefault'][_0x56b598(0x1d6)](this,_0x44efad);},Input[_0x304852(0x294)]=function(_0x25c250){const _0x5377a3=_0x304852;if(_0x25c250['match'](/backspace/i))return this[_0x5377a3(0x37f)]===0x8;if(_0x25c250[_0x5377a3(0x54d)](/enter/i))return this[_0x5377a3(0x37f)]===0xd;if(_0x25c250['match'](/escape/i))return this[_0x5377a3(0x37f)]===0x1b;},Input[_0x304852(0x124)]=function(){const _0x2f6b6c=_0x304852;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x2f6b6c(0x245)](this[_0x2f6b6c(0x37f)]);},Input[_0x304852(0x4d0)]=function(){const _0x631add=_0x304852;return[0x25,0x26,0x27,0x28][_0x631add(0x245)](this['_inputSpecialKeyCode']);},Input[_0x304852(0x276)]=function(){const _0x1c83b3=_0x304852;if(navigator['getGamepads']){if(_0x1c83b3(0x6da)==='bFnkE'){function _0x4043ff(){if(_0x17acb4)_0x460859['ParseWeaponNotetags'](_0x3372ae);}}else{const _0x19952f=navigator[_0x1c83b3(0x6a4)]();if(_0x19952f){if(_0x1c83b3(0x36e)!==_0x1c83b3(0x36e)){function _0x7dd298(){const _0x40556a=_0x1c83b3;try{_0x504673['CoreEngine'][_0x40556a(0x56d)][_0x40556a(0x1d6)](this);}catch(_0x2370e5){_0x2f4035[_0x40556a(0xd0)]()&&(_0x15b077[_0x40556a(0x3f8)](_0x40556a(0x605)),_0xc19178['log'](_0x2370e5));}return!![];}}else for(const _0x2f8a63 of _0x19952f){if(_0x2f8a63&&_0x2f8a63[_0x1c83b3(0x67d)])return!![];}}}}return![];},Input[_0x304852(0x20e)]=function(){const _0x226dc2=_0x304852;if(navigator['getGamepads']){if(_0x226dc2(0x2b7)===_0x226dc2(0x114)){function _0x2e918f(){const _0x232ffd=_0x226dc2;try{_0x5d131c[_0x232ffd(0x4ec)]['Game_Interpreter_command111'][_0x232ffd(0x1d6)](this,_0x5a6c02);}catch(_0x3575e0){_0x245ecd[_0x232ffd(0xd0)]()&&(_0x4c6814['log'](_0x232ffd(0x404)),_0x47b578['log'](_0x3575e0)),this[_0x232ffd(0x750)]();}return!![];}}else{const _0x33c08c=navigator[_0x226dc2(0x6a4)]();if(_0x33c08c){if(_0x226dc2(0x2f3)===_0x226dc2(0x2f3))for(const _0xca1ce2 of _0x33c08c){if(_0x226dc2(0x411)==='xWEvi'){if(_0xca1ce2&&_0xca1ce2[_0x226dc2(0x67d)]){if(this[_0x226dc2(0xe7)](_0xca1ce2))return!![];}}else{function _0xe2dedc(){const _0x278afa=_0x226dc2;if(!_0x2d43ce)return;if(!_0x43fd48[_0x278afa(0x55f)]())return;const _0xfbc6b8=0x80,_0x438ae9=_0x14a504[_0x278afa(0x156)]();let _0x1bafb2=_0xe617c5[_0x278afa(0x693)](),_0x3a3bf5=_0x183d37[_0x278afa(0x467)]();_0x438ae9>=0x1&&(_0x1bafb2=_0x58443f[_0x278afa(0x2c8)](),_0x3a3bf5=_0x5a5585[_0x278afa(0x732)]()),this[_0x278afa(0x2ae)](_0x23107f,_0x210915,_0xfbc6b8,_0x438ae9,_0x1bafb2,_0x3a3bf5);}}}else{function _0x996d86(){const _0xb0b6e9=_0x226dc2;return _0x5d6bf4[_0xb0b6e9(0x524)];}}}}}return![];},Input['isGamepadButtonPressed']=function(_0x18a39f){const _0x3a22bd=_0x304852,_0x6d047=_0x18a39f[_0x3a22bd(0x39c)];for(let _0x2c1330=0x0;_0x2c1330<_0x6d047[_0x3a22bd(0x12a)];_0x2c1330++){if(_0x3a22bd(0x192)===_0x3a22bd(0x591)){function _0x568f39(){const _0x4e15af=_0x3a22bd,_0x54af2e=_0x4c01ad(_0x3455ef['$1']);_0x54af2e!==_0x340afc[_0x4477c7][_0x4e15af(0x639)]&&(_0x540369(_0x4e15af(0x590)[_0x4e15af(0x6be)](_0x4cf14d,_0x54af2e)),_0x418fa4[_0x4e15af(0x2db)]());}}else{if(_0x6d047[_0x2c1330]['pressed'])return!![];}}return![];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x46c)]=Tilemap[_0x304852(0x7ba)][_0x304852(0x787)],Tilemap[_0x304852(0x7ba)][_0x304852(0x787)]=function(_0x444271,_0x417a8a,_0x1072f7,_0x5e9272){const _0x49da8c=_0x304852;if($gameMap&&$gameMap[_0x49da8c(0xf0)]())return;VisuMZ[_0x49da8c(0x4ec)][_0x49da8c(0x46c)][_0x49da8c(0x1d6)](this,_0x444271,_0x417a8a,_0x1072f7,_0x5e9272);},Tilemap[_0x304852(0x5d9)][_0x304852(0x7ba)][_0x304852(0x1d5)]=function(){const _0x990206=_0x304852;this['_destroyInternalTextures']();for(let _0x4b5526=0x0;_0x4b5526<Tilemap[_0x990206(0x4ff)][_0x990206(0x654)];_0x4b5526++){const _0x4755eb=new PIXI['BaseTexture']();_0x4755eb[_0x990206(0x5e8)](0x800,0x800),VisuMZ[_0x990206(0x4ec)]['Settings'][_0x990206(0x409)][_0x990206(0x653)]&&(_0x4755eb[_0x990206(0x27b)]=PIXI['SCALE_MODES'][_0x990206(0x182)]),this[_0x990206(0x301)][_0x990206(0x700)](_0x4755eb);}},WindowLayer['prototype'][_0x304852(0x3e0)]=function(){const _0x532f36=_0x304852;if(SceneManager&&SceneManager[_0x532f36(0x2d5)]){if(_0x532f36(0x550)!==_0x532f36(0x550)){function _0x20b277(){const _0x99fd52=_0x532f36;if(this[_0x99fd52(0x431)]===_0x516b11)this[_0x99fd52(0x5f1)]();this['_CoreEngineSettings'][_0x99fd52(0x27f)]=this['initialBattleSystem']();}}else return SceneManager['_scene'][_0x532f36(0x458)]();}else{if(_0x532f36(0x6b1)!=='EEvQi')return!![];else{function _0x120027(){const _0x51d1db=_0x532f36;return _0x453b78[_0x51d1db(0x4ec)]['Settings'][_0x51d1db(0x409)]['ModernControls'];}}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x5b4)]=WindowLayer['prototype']['render'],WindowLayer['prototype'][_0x304852(0x2d9)]=function render(_0x4dcd4a){const _0x5e9d58=_0x304852;this['isMaskingEnabled']()?VisuMZ[_0x5e9d58(0x4ec)][_0x5e9d58(0x5b4)]['call'](this,_0x4dcd4a):this[_0x5e9d58(0x424)](_0x4dcd4a);},WindowLayer[_0x304852(0x7ba)][_0x304852(0x424)]=function render(_0x3e366a){const _0x2d2925=_0x304852;if(!this[_0x2d2925(0x1da)])return;const _0x12c444=new PIXI[(_0x2d2925(0x5a0))](),_0x4c48bc=_0x3e366a['gl'],_0x368f89=this[_0x2d2925(0x4c4)][_0x2d2925(0x516)]();_0x3e366a['framebuffer'][_0x2d2925(0x507)](),_0x12c444[_0x2d2925(0x599)]=this[_0x2d2925(0x599)],_0x3e366a[_0x2d2925(0x6f2)][_0x2d2925(0x3ba)](),_0x4c48bc[_0x2d2925(0x6e8)](_0x4c48bc[_0x2d2925(0x130)]);while(_0x368f89[_0x2d2925(0x12a)]>0x0){const _0x25c275=_0x368f89['shift']();_0x25c275[_0x2d2925(0x16e)]&&_0x25c275[_0x2d2925(0x1da)]&&_0x25c275[_0x2d2925(0x76b)]>0x0&&(_0x4c48bc[_0x2d2925(0x1e7)](_0x4c48bc[_0x2d2925(0x4ed)],0x0,~0x0),_0x4c48bc[_0x2d2925(0x433)](_0x4c48bc[_0x2d2925(0x78c)],_0x4c48bc['KEEP'],_0x4c48bc[_0x2d2925(0x78c)]),_0x25c275[_0x2d2925(0x2d9)](_0x3e366a),_0x3e366a[_0x2d2925(0x6f2)][_0x2d2925(0x3ba)](),_0x12c444[_0x2d2925(0x3f2)](),_0x4c48bc[_0x2d2925(0x1e7)](_0x4c48bc[_0x2d2925(0x2a7)],0x1,~0x0),_0x4c48bc[_0x2d2925(0x433)](_0x4c48bc[_0x2d2925(0x16f)],_0x4c48bc[_0x2d2925(0x16f)],_0x4c48bc['REPLACE']),_0x4c48bc[_0x2d2925(0x72e)](_0x4c48bc['ZERO'],_0x4c48bc[_0x2d2925(0x779)]),_0x12c444[_0x2d2925(0x2d9)](_0x3e366a),_0x3e366a[_0x2d2925(0x6f2)]['flush'](),_0x4c48bc[_0x2d2925(0x72e)](_0x4c48bc['ONE'],_0x4c48bc['ONE_MINUS_SRC_ALPHA']));}_0x4c48bc[_0x2d2925(0x67b)](_0x4c48bc[_0x2d2925(0x130)]),_0x4c48bc[_0x2d2925(0x3f2)](_0x4c48bc[_0x2d2925(0x28b)]),_0x4c48bc[_0x2d2925(0x78d)](0x0),_0x3e366a[_0x2d2925(0x6f2)][_0x2d2925(0x3ba)]();for(const _0x2ac78a of this['children']){if(_0x2d2925(0x6a6)!==_0x2d2925(0x32e))!_0x2ac78a[_0x2d2925(0x16e)]&&_0x2ac78a[_0x2d2925(0x1da)]&&_0x2ac78a['render'](_0x3e366a);else{function _0x310fd2(){const _0x1dc357=_0x2d2925;return this[_0x1dc357(0x17b)][_0x1dc357(0x334)]();}}}_0x3e366a[_0x2d2925(0x6f2)][_0x2d2925(0x3ba)]();},DataManager['isKeyItem']=function(_0x2c602e){const _0x1d2c81=_0x304852;return this[_0x1d2c81(0x2c4)](_0x2c602e)&&_0x2c602e['itypeId']===0x2;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x3a4)]=DataManager['setupNewGame'],DataManager[_0x304852(0x4de)]=function(){const _0x44baed=_0x304852;VisuMZ[_0x44baed(0x4ec)]['DataManager_setupNewGame'][_0x44baed(0x1d6)](this),this[_0x44baed(0x505)](),this[_0x44baed(0x544)]();},DataManager[_0x304852(0x505)]=function(){const _0x25c997=_0x304852;if($gameTemp['isPlaytest']()){const _0x532bea=VisuMZ[_0x25c997(0x4ec)][_0x25c997(0x5dd)][_0x25c997(0x409)][_0x25c997(0x3c1)];if(_0x532bea>0x0)$gameTemp['reserveCommonEvent'](_0x532bea);}},DataManager[_0x304852(0x544)]=function(){const _0x13c900=_0x304852,_0x503284=VisuMZ[_0x13c900(0x4ec)][_0x13c900(0x5dd)][_0x13c900(0x409)][_0x13c900(0x4a8)]||0x0;if(_0x503284>0x0)$gameTemp['reserveCommonEvent'](_0x503284);},TextManager['stringKeyMap']=['','','','CANCEL','','','HELP','',_0x304852(0x18b),_0x304852(0x1cf),'','','CLEAR','ENTER','ENTER_SPECIAL','',_0x304852(0x5bb),_0x304852(0x4d4),_0x304852(0x6ff),'PAUSE',_0x304852(0x606),_0x304852(0x3ac),_0x304852(0x6ed),_0x304852(0x196),_0x304852(0x144),_0x304852(0x2e8),'',_0x304852(0x400),_0x304852(0x1dd),'NONCONVERT',_0x304852(0x3cb),_0x304852(0x587),_0x304852(0x54e),_0x304852(0x6d6),_0x304852(0x40c),_0x304852(0x670),_0x304852(0x39d),'LEFT','UP','RIGHT','DOWN',_0x304852(0x63d),_0x304852(0x51a),_0x304852(0x61e),'PRINTSCREEN',_0x304852(0x7ac),_0x304852(0x48b),'','0','1','2','3','4','5','6','7','8','9',_0x304852(0x574),_0x304852(0x105),_0x304852(0x733),_0x304852(0x24d),_0x304852(0x63c),_0x304852(0x4e6),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x304852(0x1f8),'','CONTEXT_MENU','',_0x304852(0x536),_0x304852(0x230),_0x304852(0x42b),_0x304852(0x778),_0x304852(0x506),'NUMPAD4','NUMPAD5','NUMPAD6',_0x304852(0x296),_0x304852(0x2c0),_0x304852(0x451),'MULTIPLY','ADD',_0x304852(0x1d1),_0x304852(0x52a),_0x304852(0x697),_0x304852(0x46a),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x304852(0x4fb),'F12',_0x304852(0x2d1),_0x304852(0xf8),'F15',_0x304852(0x422),'F17','F18',_0x304852(0x21f),_0x304852(0x754),_0x304852(0x1c7),_0x304852(0x6a1),_0x304852(0x20f),_0x304852(0x73b),'','','','','','','','',_0x304852(0x4cd),_0x304852(0x540),'WIN_OEM_FJ_JISHO',_0x304852(0x6c2),'WIN_OEM_FJ_TOUROKU',_0x304852(0x1fa),_0x304852(0x1cd),'','','','','','','','','','CIRCUMFLEX',_0x304852(0x189),_0x304852(0x6b7),'HASH',_0x304852(0x116),_0x304852(0x65f),_0x304852(0x760),_0x304852(0x66d),_0x304852(0x155),_0x304852(0x630),_0x304852(0x2a0),'PLUS',_0x304852(0x5b9),_0x304852(0x4e1),_0x304852(0x57a),_0x304852(0x3f0),_0x304852(0x149),'','','','',_0x304852(0x13c),_0x304852(0x492),_0x304852(0x1ae),'','',_0x304852(0x105),'EQUALS',_0x304852(0x56a),_0x304852(0x232),_0x304852(0x4a0),_0x304852(0x31a),_0x304852(0x55a),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x304852(0x4da),_0x304852(0x310),_0x304852(0x4f9),_0x304852(0x43a),'',_0x304852(0x35a),_0x304852(0x76e),'',_0x304852(0x19b),_0x304852(0x1c4),'',_0x304852(0x15d),'','',_0x304852(0x18a),_0x304852(0x777),_0x304852(0x527),_0x304852(0x52c),_0x304852(0x70e),_0x304852(0xc2),_0x304852(0x576),_0x304852(0x79e),_0x304852(0xcf),_0x304852(0x260),_0x304852(0x54f),'WIN_OEM_ENLW',_0x304852(0x2c3),_0x304852(0x759),_0x304852(0x170),_0x304852(0x63e),_0x304852(0x1b7),_0x304852(0x1e3),_0x304852(0x22d),'','PA1',_0x304852(0x221),''],TextManager[_0x304852(0x701)]=VisuMZ[_0x304852(0x4ec)]['Settings'][_0x304852(0x627)][_0x304852(0x5d5)],TextManager['buttonAssistCancel']=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x627)]['CancelText'],TextManager[_0x304852(0x236)]=VisuMZ[_0x304852(0x4ec)]['Settings'][_0x304852(0x627)][_0x304852(0x745)],VisuMZ[_0x304852(0x4ec)][_0x304852(0x412)]=TextManager[_0x304852(0x32c)],TextManager[_0x304852(0x32c)]=function(_0x4d461b){const _0x5c41d9=_0x304852;if(typeof _0x4d461b==='number')return VisuMZ[_0x5c41d9(0x4ec)]['TextManager_param'][_0x5c41d9(0x1d6)](this,_0x4d461b);else{if(_0x5c41d9(0x31e)==='TtQoD')return this[_0x5c41d9(0x633)](_0x4d461b);else{function _0x236baa(){const _0x349846=_0x5c41d9;return _0x416e95[_0x349846(0x4ec)][_0x349846(0x23c)][_0x349846(0x1d6)](this,_0x8e0230);}}}},TextManager[_0x304852(0x633)]=function(_0x841609){const _0x539f8d=_0x304852;_0x841609=String(_0x841609||'')[_0x539f8d(0x55d)]();const _0xdb0809=VisuMZ[_0x539f8d(0x4ec)]['Settings'][_0x539f8d(0x6c6)];if(_0x841609===_0x539f8d(0x37b))return $dataSystem[_0x539f8d(0x2b6)][_0x539f8d(0x6e4)][0x0];if(_0x841609===_0x539f8d(0x209))return $dataSystem['terms'][_0x539f8d(0x6e4)][0x1];if(_0x841609===_0x539f8d(0x6df))return $dataSystem['terms'][_0x539f8d(0x6e4)][0x2];if(_0x841609===_0x539f8d(0x482))return $dataSystem[_0x539f8d(0x2b6)][_0x539f8d(0x6e4)][0x3];if(_0x841609==='MAT')return $dataSystem[_0x539f8d(0x2b6)][_0x539f8d(0x6e4)][0x4];if(_0x841609===_0x539f8d(0x71f))return $dataSystem['terms'][_0x539f8d(0x6e4)][0x5];if(_0x841609===_0x539f8d(0x729))return $dataSystem[_0x539f8d(0x2b6)][_0x539f8d(0x6e4)][0x6];if(_0x841609===_0x539f8d(0x669))return $dataSystem[_0x539f8d(0x2b6)][_0x539f8d(0x6e4)][0x7];if(_0x841609===_0x539f8d(0x4d3))return _0xdb0809[_0x539f8d(0x4cc)];if(_0x841609===_0x539f8d(0x1a2))return _0xdb0809[_0x539f8d(0x67c)];if(_0x841609==='CRI')return _0xdb0809['XParamVocab2'];if(_0x841609==='CEV')return _0xdb0809[_0x539f8d(0x7b0)];if(_0x841609===_0x539f8d(0x3ad))return _0xdb0809['XParamVocab4'];if(_0x841609===_0x539f8d(0x5af))return _0xdb0809[_0x539f8d(0x786)];if(_0x841609==='CNT')return _0xdb0809[_0x539f8d(0x3e2)];if(_0x841609==='HRG')return _0xdb0809[_0x539f8d(0x57d)];if(_0x841609===_0x539f8d(0x163))return _0xdb0809['XParamVocab8'];if(_0x841609===_0x539f8d(0x18f))return _0xdb0809['XParamVocab9'];if(_0x841609==='TGR')return _0xdb0809[_0x539f8d(0x6ab)];if(_0x841609==='GRD')return _0xdb0809['SParamVocab1'];if(_0x841609===_0x539f8d(0x300))return _0xdb0809[_0x539f8d(0x6b3)];if(_0x841609===_0x539f8d(0x3a7))return _0xdb0809[_0x539f8d(0x595)];if(_0x841609===_0x539f8d(0x50a))return _0xdb0809['SParamVocab4'];if(_0x841609===_0x539f8d(0x31b))return _0xdb0809[_0x539f8d(0x619)];if(_0x841609===_0x539f8d(0x395))return _0xdb0809[_0x539f8d(0x181)];if(_0x841609===_0x539f8d(0x535))return _0xdb0809[_0x539f8d(0x261)];if(_0x841609===_0x539f8d(0x319))return _0xdb0809[_0x539f8d(0x6ad)];if(_0x841609===_0x539f8d(0x604))return _0xdb0809['SParamVocab9'];if(VisuMZ[_0x539f8d(0x4ec)]['CustomParamNames'][_0x841609]){if(_0x539f8d(0x586)!==_0x539f8d(0x586)){function _0x14c43e(){const _0x52bc79=_0x539f8d;if(this[_0x52bc79(0x5e6)]===_0x526fd6)this[_0x52bc79(0x77f)]();this[_0x52bc79(0x5e6)]=_0x237e25[_0x52bc79(0x302)]()['trim']();}}else return VisuMZ[_0x539f8d(0x4ec)][_0x539f8d(0x452)][_0x841609];}return'';},TextManager['getInputButtonString']=function(_0x275e61){const _0x2f0607=_0x304852;if(_0x275e61===_0x2f0607(0x6ce))_0x275e61=_0x2f0607(0x766);let _0x4874de=[];for(let _0x49b1e9 in Input[_0x2f0607(0x526)]){_0x49b1e9=Number(_0x49b1e9);if(_0x49b1e9>=0x60&&_0x49b1e9<=0x69)continue;if([0x12,0x20][_0x2f0607(0x44a)](_0x49b1e9))continue;if(_0x275e61===Input['keyMapper'][_0x49b1e9]){if(_0x2f0607(0x791)==='Eejkq')_0x4874de['push'](_0x49b1e9);else{function _0x3e4e86(){const _0x49784b=_0x2f0607;_0x506554['seVolume']!==0x0?(_0x3d878f[_0x49784b(0x241)]=0x0,_0x1d2e43[_0x49784b(0x7af)]=0x0,_0x15e887[_0x49784b(0x3b3)]=0x0,_0x11492e['seVolume']=0x0):(_0x52bae1[_0x49784b(0x241)]=0x64,_0x2089b1[_0x49784b(0x7af)]=0x64,_0x136eb3['meVolume']=0x64,_0x11880f['seVolume']=0x64);_0xbf7bc[_0x49784b(0x538)]();if(this[_0x49784b(0x2d5)][_0x49784b(0x183)]===_0x19d9f1){if(this[_0x49784b(0x2d5)][_0x49784b(0x4e0)])this['_scene']['_optionsWindow'][_0x49784b(0x268)]();if(this[_0x49784b(0x2d5)]['_listWindow'])this['_scene'][_0x49784b(0x75c)]['refresh']();}}}}}for(let _0x55da1a=0x0;_0x55da1a<_0x4874de[_0x2f0607(0x12a)];_0x55da1a++){_0x4874de[_0x55da1a]=TextManager[_0x2f0607(0xe4)][_0x4874de[_0x55da1a]];}return this['makeInputButtonString'](_0x4874de);},TextManager['makeInputButtonString']=function(_0x35db1b){const _0x290f94=_0x304852,_0x132c81=VisuMZ[_0x290f94(0x4ec)]['Settings'][_0x290f94(0x627)],_0x1a28a7=_0x132c81[_0x290f94(0x346)],_0x2018db=_0x35db1b[_0x290f94(0x3fe)](),_0x5b1998=_0x290f94(0x6bd)['format'](_0x2018db);return _0x132c81[_0x5b1998]?_0x132c81[_0x5b1998]:_0x1a28a7[_0x290f94(0x6be)](_0x2018db);},TextManager[_0x304852(0x2f1)]=function(_0x598088,_0xeb8012){const _0x1920de=_0x304852,_0x1ad189=VisuMZ[_0x1920de(0x4ec)][_0x1920de(0x5dd)]['ButtonAssist'],_0x278dab=_0x1ad189[_0x1920de(0x58d)],_0x5c61b6=this[_0x1920de(0x3dc)](_0x598088),_0x549d93=this['getInputButtonString'](_0xeb8012);return _0x278dab[_0x1920de(0x6be)](_0x5c61b6,_0x549d93);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x3ea)]=ColorManager[_0x304852(0x2a6)],ColorManager['loadWindowskin']=function(){const _0x2b03a1=_0x304852;VisuMZ[_0x2b03a1(0x4ec)][_0x2b03a1(0x3ea)][_0x2b03a1(0x1d6)](this),this['_colorCache']=this['_colorCache']||{};},ColorManager[_0x304852(0x37a)]=function(_0x3372c4,_0x5cd9f2){const _0x2833df=_0x304852;return _0x5cd9f2=String(_0x5cd9f2),this[_0x2833df(0x270)]=this['_colorCache']||{},_0x5cd9f2[_0x2833df(0x54d)](/#(.*)/i)?this[_0x2833df(0x270)][_0x3372c4]='#%1'[_0x2833df(0x6be)](String(RegExp['$1'])):this[_0x2833df(0x270)][_0x3372c4]=this['textColor'](Number(_0x5cd9f2)),this['_colorCache'][_0x3372c4];},ColorManager[_0x304852(0x418)]=function(_0x490ff2){const _0x1afb22=_0x304852;return _0x490ff2=String(_0x490ff2),_0x490ff2['match'](/#(.*)/i)?_0x1afb22(0x74c)[_0x1afb22(0x6be)](String(RegExp['$1'])):this[_0x1afb22(0x1ca)](Number(_0x490ff2));},ColorManager[_0x304852(0x4f7)]=function(){const _0x11fd63=_0x304852;this[_0x11fd63(0x270)]={};},ColorManager['normalColor']=function(){const _0x27bc05=_0x304852,_0x2e0437='_stored_normalColor';this[_0x27bc05(0x270)]=this[_0x27bc05(0x270)]||{};if(this['_colorCache'][_0x2e0437])return this[_0x27bc05(0x270)][_0x2e0437];const _0x34d7a6=VisuMZ[_0x27bc05(0x4ec)]['Settings'][_0x27bc05(0x6c8)][_0x27bc05(0x3f3)];return this[_0x27bc05(0x37a)](_0x2e0437,_0x34d7a6);},ColorManager[_0x304852(0x5ac)]=function(){const _0x301699=_0x304852,_0x355f1d=_0x301699(0x490);this['_colorCache']=this[_0x301699(0x270)]||{};if(this[_0x301699(0x270)][_0x355f1d])return this[_0x301699(0x270)][_0x355f1d];const _0x1ae5f9=VisuMZ['CoreEngine'][_0x301699(0x5dd)][_0x301699(0x6c8)][_0x301699(0x64b)];return this[_0x301699(0x37a)](_0x355f1d,_0x1ae5f9);},ColorManager['crisisColor']=function(){const _0x472258=_0x304852,_0x139c3f=_0x472258(0x1ac);this[_0x472258(0x270)]=this[_0x472258(0x270)]||{};if(this[_0x472258(0x270)][_0x139c3f])return this[_0x472258(0x270)][_0x139c3f];const _0x415a96=VisuMZ['CoreEngine'][_0x472258(0x5dd)][_0x472258(0x6c8)][_0x472258(0x1df)];return this['getColorDataFromPluginParameters'](_0x139c3f,_0x415a96);},ColorManager['deathColor']=function(){const _0x364606=_0x304852,_0x3d22e7='_stored_deathColor';this[_0x364606(0x270)]=this[_0x364606(0x270)]||{};if(this['_colorCache'][_0x3d22e7])return this[_0x364606(0x270)][_0x3d22e7];const _0x440f91=VisuMZ[_0x364606(0x4ec)][_0x364606(0x5dd)]['Color']['ColorDeath'];return this[_0x364606(0x37a)](_0x3d22e7,_0x440f91);},ColorManager[_0x304852(0x7ae)]=function(){const _0x46f9a9=_0x304852,_0xe7bd1b=_0x46f9a9(0x761);this['_colorCache']=this[_0x46f9a9(0x270)]||{};if(this[_0x46f9a9(0x270)][_0xe7bd1b])return this[_0x46f9a9(0x270)][_0xe7bd1b];const _0x241fb5=VisuMZ[_0x46f9a9(0x4ec)][_0x46f9a9(0x5dd)][_0x46f9a9(0x6c8)][_0x46f9a9(0x75b)];return this['getColorDataFromPluginParameters'](_0xe7bd1b,_0x241fb5);},ColorManager[_0x304852(0x4eb)]=function(){const _0x22b2ce=_0x304852,_0x4eda73=_0x22b2ce(0x6d8);this['_colorCache']=this['_colorCache']||{};if(this[_0x22b2ce(0x270)][_0x4eda73])return this[_0x22b2ce(0x270)][_0x4eda73];const _0x50be6f=VisuMZ['CoreEngine'][_0x22b2ce(0x5dd)][_0x22b2ce(0x6c8)][_0x22b2ce(0x38d)];return this[_0x22b2ce(0x37a)](_0x4eda73,_0x50be6f);},ColorManager[_0x304852(0x65d)]=function(){const _0x4ae364=_0x304852,_0x2ce6ff=_0x4ae364(0x2e0);this['_colorCache']=this[_0x4ae364(0x270)]||{};if(this[_0x4ae364(0x270)][_0x2ce6ff])return this['_colorCache'][_0x2ce6ff];const _0x450b2a=VisuMZ[_0x4ae364(0x4ec)]['Settings']['Color'][_0x4ae364(0x383)];return this[_0x4ae364(0x37a)](_0x2ce6ff,_0x450b2a);},ColorManager[_0x304852(0x60c)]=function(){const _0x1b2d3b=_0x304852,_0x2bcf0b=_0x1b2d3b(0x2da);this[_0x1b2d3b(0x270)]=this[_0x1b2d3b(0x270)]||{};if(this[_0x1b2d3b(0x270)][_0x2bcf0b])return this[_0x1b2d3b(0x270)][_0x2bcf0b];const _0x416a70=VisuMZ[_0x1b2d3b(0x4ec)][_0x1b2d3b(0x5dd)][_0x1b2d3b(0x6c8)][_0x1b2d3b(0x5d0)];return this[_0x1b2d3b(0x37a)](_0x2bcf0b,_0x416a70);},ColorManager[_0x304852(0x547)]=function(){const _0x29eee8=_0x304852,_0xd871d7=_0x29eee8(0x2a8);this[_0x29eee8(0x270)]=this[_0x29eee8(0x270)]||{};if(this[_0x29eee8(0x270)][_0xd871d7])return this[_0x29eee8(0x270)][_0xd871d7];const _0xbf8c08=VisuMZ[_0x29eee8(0x4ec)]['Settings'][_0x29eee8(0x6c8)][_0x29eee8(0xc5)];return this['getColorDataFromPluginParameters'](_0xd871d7,_0xbf8c08);},ColorManager['mpCostColor']=function(){const _0x1f75b4=_0x304852,_0x7f4e94=_0x1f75b4(0x2d8);this['_colorCache']=this[_0x1f75b4(0x270)]||{};if(this[_0x1f75b4(0x270)][_0x7f4e94])return this[_0x1f75b4(0x270)][_0x7f4e94];const _0x18f196=VisuMZ[_0x1f75b4(0x4ec)][_0x1f75b4(0x5dd)]['Color']['ColorMPCost'];return this[_0x1f75b4(0x37a)](_0x7f4e94,_0x18f196);},ColorManager[_0x304852(0x419)]=function(){const _0x116500=_0x304852,_0x47cfa0=_0x116500(0x1a5);this[_0x116500(0x270)]=this['_colorCache']||{};if(this['_colorCache'][_0x47cfa0])return this[_0x116500(0x270)][_0x47cfa0];const _0x25a5ec=VisuMZ[_0x116500(0x4ec)][_0x116500(0x5dd)][_0x116500(0x6c8)][_0x116500(0x555)];return this['getColorDataFromPluginParameters'](_0x47cfa0,_0x25a5ec);},ColorManager[_0x304852(0x5b6)]=function(){const _0x1cb853=_0x304852,_0x1b34c7='_stored_powerDownColor';this[_0x1cb853(0x270)]=this[_0x1cb853(0x270)]||{};if(this[_0x1cb853(0x270)][_0x1b34c7])return this[_0x1cb853(0x270)][_0x1b34c7];const _0x4a6731=VisuMZ[_0x1cb853(0x4ec)][_0x1cb853(0x5dd)][_0x1cb853(0x6c8)][_0x1cb853(0x1fb)];return this[_0x1cb853(0x37a)](_0x1b34c7,_0x4a6731);},ColorManager[_0x304852(0x4aa)]=function(){const _0x5b1e98=_0x304852,_0x3ea533=_0x5b1e98(0x23e);this[_0x5b1e98(0x270)]=this[_0x5b1e98(0x270)]||{};if(this[_0x5b1e98(0x270)][_0x3ea533])return this[_0x5b1e98(0x270)][_0x3ea533];const _0x3a825e=VisuMZ[_0x5b1e98(0x4ec)][_0x5b1e98(0x5dd)][_0x5b1e98(0x6c8)]['ColorCTGauge1'];return this[_0x5b1e98(0x37a)](_0x3ea533,_0x3a825e);},ColorManager[_0x304852(0x70b)]=function(){const _0x5ccd29=_0x304852,_0x4d1348=_0x5ccd29(0x76a);this[_0x5ccd29(0x270)]=this[_0x5ccd29(0x270)]||{};if(this['_colorCache'][_0x4d1348])return this['_colorCache'][_0x4d1348];const _0x3f7ae4=VisuMZ['CoreEngine'][_0x5ccd29(0x5dd)][_0x5ccd29(0x6c8)][_0x5ccd29(0x62e)];return this[_0x5ccd29(0x37a)](_0x4d1348,_0x3f7ae4);},ColorManager['tpGaugeColor1']=function(){const _0x2c78c2=_0x304852,_0x4182a4=_0x2c78c2(0x3fd);this[_0x2c78c2(0x270)]=this['_colorCache']||{};if(this['_colorCache'][_0x4182a4])return this[_0x2c78c2(0x270)][_0x4182a4];const _0x48824c=VisuMZ['CoreEngine'][_0x2c78c2(0x5dd)][_0x2c78c2(0x6c8)][_0x2c78c2(0x258)];return this[_0x2c78c2(0x37a)](_0x4182a4,_0x48824c);},ColorManager[_0x304852(0x3a0)]=function(){const _0x143329=_0x304852,_0x67ce8c='_stored_tpGaugeColor2';this[_0x143329(0x270)]=this[_0x143329(0x270)]||{};if(this['_colorCache'][_0x67ce8c])return this[_0x143329(0x270)][_0x67ce8c];const _0x2585af=VisuMZ[_0x143329(0x4ec)]['Settings']['Color'][_0x143329(0x43b)];return this[_0x143329(0x37a)](_0x67ce8c,_0x2585af);},ColorManager[_0x304852(0x4dd)]=function(){const _0x35a077=_0x304852,_0x39d5dc=_0x35a077(0x685);this[_0x35a077(0x270)]=this[_0x35a077(0x270)]||{};if(this[_0x35a077(0x270)][_0x39d5dc])return this[_0x35a077(0x270)][_0x39d5dc];const _0x54c978=VisuMZ[_0x35a077(0x4ec)]['Settings'][_0x35a077(0x6c8)]['ColorTPCost'];return this[_0x35a077(0x37a)](_0x39d5dc,_0x54c978);},ColorManager[_0x304852(0x2ce)]=function(){const _0xca0bbc=_0x304852,_0x47fea1=_0xca0bbc(0x476);this[_0xca0bbc(0x270)]=this['_colorCache']||{};if(this[_0xca0bbc(0x270)][_0x47fea1])return this[_0xca0bbc(0x270)][_0x47fea1];const _0x44ca68=VisuMZ[_0xca0bbc(0x4ec)][_0xca0bbc(0x5dd)]['Color'][_0xca0bbc(0x42d)];return this['getColorDataFromPluginParameters'](_0x47fea1,_0x44ca68);},ColorManager[_0x304852(0x693)]=function(){const _0x50c1ff=_0x304852,_0x49890a=_0x50c1ff(0x6cc);this[_0x50c1ff(0x270)]=this[_0x50c1ff(0x270)]||{};if(this[_0x50c1ff(0x270)][_0x49890a])return this['_colorCache'][_0x49890a];const _0x264e0a=VisuMZ[_0x50c1ff(0x4ec)][_0x50c1ff(0x5dd)][_0x50c1ff(0x6c8)]['ColorExpGauge1'];return this[_0x50c1ff(0x37a)](_0x49890a,_0x264e0a);},ColorManager[_0x304852(0x467)]=function(){const _0x514e1=_0x304852,_0x39c3f=_0x514e1(0x324);this[_0x514e1(0x270)]=this[_0x514e1(0x270)]||{};if(this[_0x514e1(0x270)][_0x39c3f])return this['_colorCache'][_0x39c3f];const _0x135c05=VisuMZ[_0x514e1(0x4ec)][_0x514e1(0x5dd)][_0x514e1(0x6c8)][_0x514e1(0x6a3)];return this[_0x514e1(0x37a)](_0x39c3f,_0x135c05);},ColorManager[_0x304852(0x2c8)]=function(){const _0x55bab5=_0x304852,_0x51106c='_stored_maxLvGaugeColor1';this[_0x55bab5(0x270)]=this[_0x55bab5(0x270)]||{};if(this[_0x55bab5(0x270)][_0x51106c])return this[_0x55bab5(0x270)][_0x51106c];const _0x2306cf=VisuMZ[_0x55bab5(0x4ec)]['Settings'][_0x55bab5(0x6c8)][_0x55bab5(0x33e)];return this[_0x55bab5(0x37a)](_0x51106c,_0x2306cf);},ColorManager[_0x304852(0x732)]=function(){const _0x3a0c69=_0x304852,_0x4e6b17='_stored_maxLvGaugeColor2';this[_0x3a0c69(0x270)]=this[_0x3a0c69(0x270)]||{};if(this[_0x3a0c69(0x270)][_0x4e6b17])return this[_0x3a0c69(0x270)][_0x4e6b17];const _0x21fa58=VisuMZ[_0x3a0c69(0x4ec)][_0x3a0c69(0x5dd)][_0x3a0c69(0x6c8)][_0x3a0c69(0x611)];return this[_0x3a0c69(0x37a)](_0x4e6b17,_0x21fa58);},ColorManager[_0x304852(0x722)]=function(_0xdc5735){const _0x28fe9b=_0x304852;return VisuMZ['CoreEngine']['Settings']['Color'][_0x28fe9b(0x6d9)][_0x28fe9b(0x1d6)](this,_0xdc5735);},ColorManager[_0x304852(0xbb)]=function(_0x1c70d4){const _0x3890f2=_0x304852;return VisuMZ[_0x3890f2(0x4ec)][_0x3890f2(0x5dd)][_0x3890f2(0x6c8)][_0x3890f2(0x3ab)][_0x3890f2(0x1d6)](this,_0x1c70d4);},ColorManager['tpColor']=function(_0x444e27){const _0x5ee6d6=_0x304852;return VisuMZ[_0x5ee6d6(0x4ec)][_0x5ee6d6(0x5dd)][_0x5ee6d6(0x6c8)][_0x5ee6d6(0x197)][_0x5ee6d6(0x1d6)](this,_0x444e27);},ColorManager[_0x304852(0x1ab)]=function(_0x1df0da){const _0x438470=_0x304852;return VisuMZ['CoreEngine']['Settings'][_0x438470(0x6c8)]['ParamChange'][_0x438470(0x1d6)](this,_0x1df0da);},ColorManager[_0x304852(0x291)]=function(_0x73754a){const _0x143a4f=_0x304852;return VisuMZ[_0x143a4f(0x4ec)][_0x143a4f(0x5dd)]['Color']['DamageColor'][_0x143a4f(0x1d6)](this,_0x73754a);},ColorManager[_0x304852(0x3ef)]=function(){const _0x2cfadb=_0x304852;return VisuMZ[_0x2cfadb(0x4ec)][_0x2cfadb(0x5dd)][_0x2cfadb(0x6c8)][_0x2cfadb(0x5f4)];},ColorManager[_0x304852(0x15f)]=function(){const _0x2fa50c=_0x304852;return VisuMZ[_0x2fa50c(0x4ec)][_0x2fa50c(0x5dd)][_0x2fa50c(0x6c8)][_0x2fa50c(0x34f)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x304852(0x438)]=function(){const _0x5c7889=_0x304852;return VisuMZ[_0x5c7889(0x4ec)][_0x5c7889(0x5dd)]['Color'][_0x5c7889(0xbc)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x304852(0x1eb)]=function(){const _0x3bf999=_0x304852;return VisuMZ[_0x3bf999(0x4ec)][_0x3bf999(0x5dd)]['Color'][_0x3bf999(0x322)];},ColorManager[_0x304852(0x27a)]=function(){const _0x4a3fe5=_0x304852;return VisuMZ[_0x4a3fe5(0x4ec)][_0x4a3fe5(0x5dd)]['Color']['DimColor2'];},ColorManager[_0x304852(0x70a)]=function(){const _0x2c0d18=_0x304852;return VisuMZ['CoreEngine'][_0x2c0d18(0x5dd)]['Color'][_0x2c0d18(0x3a2)];},ColorManager[_0x304852(0x4f0)]=function(){const _0x4f8fee=_0x304852;return VisuMZ[_0x4f8fee(0x4ec)][_0x4f8fee(0x5dd)]['Color'][_0x4f8fee(0x636)];},SceneManager[_0x304852(0x11b)]=[],VisuMZ[_0x304852(0x4ec)][_0x304852(0x5c5)]=SceneManager[_0x304852(0x1b6)],SceneManager[_0x304852(0x1b6)]=function(){const _0x4c9904=_0x304852;VisuMZ['CoreEngine'][_0x4c9904(0x5c5)][_0x4c9904(0x1d6)](this),this[_0x4c9904(0x46d)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0xfe)]=SceneManager['onKeyDown'],SceneManager['onKeyDown']=function(_0x43e763){const _0x49b716=_0x304852;if($gameTemp)this[_0x49b716(0x494)](_0x43e763);VisuMZ[_0x49b716(0x4ec)][_0x49b716(0xfe)]['call'](this,_0x43e763);},SceneManager[_0x304852(0x494)]=function(_0xb333e0){const _0x4a4205=_0x304852;if(!_0xb333e0[_0x4a4205(0x299)]&&!_0xb333e0[_0x4a4205(0xd4)]){if(_0x4a4205(0x5eb)!=='lJprr')switch(_0xb333e0[_0x4a4205(0x7bc)]){case 0x75:this['playTestF6']();break;case 0x76:if(Input[_0x4a4205(0x542)]('shift')||Input[_0x4a4205(0x542)](_0x4a4205(0x6d5)))return;this[_0x4a4205(0x21b)]();break;}else{function _0x4b2ce9(){const _0x5435b4=_0x4a4205;return this[_0x5435b4(0x58f)]();}}}},SceneManager[_0x304852(0x6fb)]=function(){const _0x14d46d=_0x304852;if($gameTemp[_0x14d46d(0xd0)]()&&VisuMZ[_0x14d46d(0x4ec)][_0x14d46d(0x5dd)][_0x14d46d(0x409)][_0x14d46d(0x3c6)]){if(_0x14d46d(0x3d8)!==_0x14d46d(0x3d8)){function _0x5c581b(){const _0x4b388b=_0x14d46d;_0x37f529[_0x4b388b(0x700)](_0x3fde24);}}else{if(ConfigManager[_0x14d46d(0x38c)]!==0x0){if(_0x14d46d(0x694)!==_0x14d46d(0x694)){function _0x3ba87f(){const _0x339ef5=_0x14d46d;if(_0x467870[_0x339ef5(0xd0)]())_0x710d85[_0x339ef5(0x3f8)](_0x5534b7);}}else ConfigManager[_0x14d46d(0x241)]=0x0,ConfigManager[_0x14d46d(0x7af)]=0x0,ConfigManager[_0x14d46d(0x3b3)]=0x0,ConfigManager[_0x14d46d(0x38c)]=0x0;}else{if('RIJiK'!=='Zclmn')ConfigManager[_0x14d46d(0x241)]=0x64,ConfigManager[_0x14d46d(0x7af)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x14d46d(0x38c)]=0x64;else{function _0x261eda(){const _0x55a56b=_0x14d46d;var _0x3f81ed=_0x4e8176(_0x312070['$1']);try{_0x3c776c+=_0x534884(_0x3f81ed);}catch(_0x3b29ae){if(_0xee2e51[_0x55a56b(0xd0)]())_0x2ae110[_0x55a56b(0x3f8)](_0x3b29ae);}}}}ConfigManager['save']();if(this[_0x14d46d(0x2d5)][_0x14d46d(0x183)]===Scene_Options){if(this['_scene']['_optionsWindow'])this['_scene'][_0x14d46d(0x4e0)][_0x14d46d(0x268)]();if(this[_0x14d46d(0x2d5)][_0x14d46d(0x75c)])this[_0x14d46d(0x2d5)][_0x14d46d(0x75c)][_0x14d46d(0x268)]();}}}},SceneManager[_0x304852(0x21b)]=function(){const _0x44edf0=_0x304852;if($gameTemp['isPlaytest']()&&VisuMZ[_0x44edf0(0x4ec)][_0x44edf0(0x5dd)]['QoL'][_0x44edf0(0xcc)]){if(_0x44edf0(0x6c0)!=='qTLeT'){function _0x491bdd(){const _0xf190bd=_0x44edf0;return _0xe6c410[_0xf190bd(0x4ec)]['Settings']['Color'][_0xf190bd(0x233)][_0xf190bd(0x1d6)](this,_0x57b3c9);}}else $gameTemp[_0x44edf0(0x4c8)]=!$gameTemp[_0x44edf0(0x4c8)];}},SceneManager['initVisuMZCoreEngine']=function(){const _0x25458e=_0x304852;this[_0x25458e(0x78e)]=![],this[_0x25458e(0x1c8)]=!VisuMZ[_0x25458e(0x4ec)][_0x25458e(0x5dd)]['UI'][_0x25458e(0x3e4)];},SceneManager[_0x304852(0x648)]=function(_0x19733b){const _0x10d312=_0x304852;if(VisuMZ[_0x10d312(0x4ec)][_0x10d312(0x5dd)]['UI'][_0x10d312(0x79f)]){if(_0x10d312(0x5c4)==='cPAAt')this[_0x10d312(0x78e)]=_0x19733b;else{function _0x40d9d3(){const _0x3c72ea=_0x10d312,_0x59fd28=_0x5068b6[_0x3c72ea(0x699)]['replace'](/[ ]/g,''),_0xa2b44=_0x30378f[_0x3c72ea(0x713)];_0x311021[_0x3c72ea(0x4ec)][_0x3c72ea(0x42c)](_0x59fd28,_0xa2b44);}}}},SceneManager[_0x304852(0x594)]=function(){const _0x293fa3=_0x304852;return this[_0x293fa3(0x78e)];},SceneManager[_0x304852(0x38a)]=function(){const _0x244d87=_0x304852;return this[_0x244d87(0x1c8)];},SceneManager[_0x304852(0x530)]=function(){const _0x4367ba=_0x304852;return this[_0x4367ba(0x38a)]()||this[_0x4367ba(0x594)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x265)]=SceneManager['isGameActive'],SceneManager[_0x304852(0x4a1)]=function(){const _0x578897=_0x304852;return VisuMZ['CoreEngine'][_0x578897(0x5dd)]['QoL'][_0x578897(0xca)]?VisuMZ[_0x578897(0x4ec)]['SceneManager_isGameActive']['call'](this):!![];},SceneManager[_0x304852(0x1b1)]=function(_0x301e3a){const _0x5ba4a9=_0x304852;if(_0x301e3a instanceof Error){if('otTOI'!==_0x5ba4a9(0x282))this[_0x5ba4a9(0x657)](_0x301e3a);else{function _0x377379(){const _0x1da31b=_0x5ba4a9;_0x3945cc[_0x1da31b(0x3f8)](_0x1da31b(0x404)),_0x4486e3[_0x1da31b(0x3f8)](_0x5350bd);}}}else{if(_0x301e3a instanceof Array&&_0x301e3a[0x0]===_0x5ba4a9(0x4ee)){if('upDxp'!=='vhWqT')this[_0x5ba4a9(0x199)](_0x301e3a);else{function _0x18fde3(){const _0x1a06eb=_0x5ba4a9;return _0x40b953[_0x1a06eb(0x5c1)]()[_0x1a06eb(0x6c4)](_0x5dc347);}}}else this[_0x5ba4a9(0x145)](_0x301e3a);}this[_0x5ba4a9(0x194)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x4a7)]=BattleManager[_0x304852(0x562)],BattleManager['processEscape']=function(){const _0x40eaff=_0x304852;if(VisuMZ[_0x40eaff(0x4ec)]['Settings'][_0x40eaff(0x409)][_0x40eaff(0x3d6)])this[_0x40eaff(0x5b8)]();else return VisuMZ[_0x40eaff(0x4ec)][_0x40eaff(0x4a7)]['call'](this);},BattleManager[_0x304852(0x5b8)]=function(){const _0x246cae=_0x304852;return $gameParty[_0x246cae(0x1f1)](),SoundManager[_0x246cae(0x2d6)](),this[_0x246cae(0x4e4)](),!![];},BattleManager[_0x304852(0x355)]=function(){const _0x354f4c=_0x304852;return $gameSystem[_0x354f4c(0x385)]()>=0x1;},BattleManager[_0x304852(0x725)]=function(){const _0x2ceb41=_0x304852;return $gameSystem[_0x2ceb41(0x385)]()===0x1;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x37c)]=Game_Temp[_0x304852(0x7ba)][_0x304852(0x1b6)],Game_Temp['prototype'][_0x304852(0x1b6)]=function(){const _0xe72e85=_0x304852;VisuMZ['CoreEngine'][_0xe72e85(0x37c)]['call'](this),this['forceOutOfPlaytest'](),this[_0xe72e85(0x13e)]();},Game_Temp[_0x304852(0x7ba)][_0x304852(0x339)]=function(){const _0x1105a2=_0x304852;VisuMZ[_0x1105a2(0x4ec)][_0x1105a2(0x5dd)][_0x1105a2(0x409)][_0x1105a2(0x113)]&&(this['_isPlaytest']=![]);},Game_Temp[_0x304852(0x7ba)][_0x304852(0x13e)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x304852(0x7ba)][_0x304852(0x2c6)]=function(_0x302e86,_0xbd64fd,_0x2158d4,_0x1364e2){const _0x1c03b4=_0x304852;if(!this[_0x1c03b4(0x40d)]())return;_0x2158d4=_0x2158d4||![],_0x1364e2=_0x1364e2||![];if($dataAnimations[_0xbd64fd]){if(_0x1c03b4(0x592)===_0x1c03b4(0x45f)){function _0x346d6b(){const _0xc76b4f=_0x1c03b4;return _0x926753&&_0x87752[_0xc76b4f(0x609)]&&_0x1d2eb7[_0xc76b4f(0x609)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?_0x5f0ee8(_0x59f248['$1']):_0x573fa6['CoreEngine']['Settings'][_0xc76b4f(0x409)][_0xc76b4f(0x41f)];}}else{const _0x1358e3={'targets':_0x302e86,'animationId':_0xbd64fd,'mirror':_0x2158d4,'mute':_0x1364e2};this[_0x1c03b4(0x249)]['push'](_0x1358e3);for(const _0x262c53 of _0x302e86){_0x262c53[_0x1c03b4(0x6eb)]&&_0x262c53['startAnimation']();}}}},Game_Temp[_0x304852(0x7ba)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x304852(0x7ba)]['retrieveFauxAnimation']=function(){const _0x42d0cf=_0x304852;return this[_0x42d0cf(0x249)][_0x42d0cf(0x4b6)]();},Game_Temp[_0x304852(0x7ba)]['setLastPluginCommandInterpreter']=function(_0x26308a){this['_lastPluginCommandInterpreter']=_0x26308a;},Game_Temp[_0x304852(0x7ba)][_0x304852(0x52f)]=function(){const _0x551436=_0x304852;return this[_0x551436(0x25f)];},Game_Temp[_0x304852(0x7ba)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x1000b7=_0x304852;this[_0x1000b7(0x40e)]=undefined,this[_0x1000b7(0x524)]=undefined;},Game_Temp[_0x304852(0x7ba)][_0x304852(0x35e)]=function(_0x526e4a){const _0x178e8d=_0x304852;if($gameMap&&$dataMap&&$dataMap[_0x178e8d(0x609)]){if(_0x178e8d(0x721)===_0x178e8d(0x466)){function _0x4523a3(){const _0x19117d=_0x178e8d;_0x28f102[_0x19117d(0x5ca)]&&(this[_0x19117d(0x524)]=_0x19117d(0x623));}}else this[_0x178e8d(0x545)]($dataMap[_0x178e8d(0x609)]);}const _0x19f37f=$dataTroops[_0x526e4a];_0x19f37f&&this[_0x178e8d(0x545)](_0x19f37f[_0x178e8d(0x3a8)]);},Game_Temp[_0x304852(0x7ba)]['parseForcedGameTroopSettingsCoreEngine']=function(_0x320c93){const _0x23e691=_0x304852;if(!_0x320c93)return;if(_0x320c93['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x23e691(0x40e)]='FV';else{if(_0x320c93[_0x23e691(0x54d)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x23e691(0x40e)]='SV';else{if(_0x320c93['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x23e691(0x140)==='HgVOk'){const _0x4edb28=String(RegExp['$1']);if(_0x4edb28[_0x23e691(0x54d)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x23e691(0x40e)]='FV';else _0x4edb28[_0x23e691(0x54d)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x23e691(0x40e)]='SV');}else{function _0x1574e8(){const _0x516533=_0x23e691;if(this['_muteSound'])return;_0x303a12[_0x516533(0x4ec)][_0x516533(0x47f)][_0x516533(0x1d6)](this);}}}}}if(_0x320c93[_0x23e691(0x54d)](/<(?:DTB)>/i))this[_0x23e691(0x524)]=0x0;else{if(_0x320c93[_0x23e691(0x54d)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x320c93[_0x23e691(0x54d)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x320c93[_0x23e691(0x54d)](/<(?:CTB)>/i)){if(Imported[_0x23e691(0x28f)]){if(_0x23e691(0x457)!==_0x23e691(0x6e7))this[_0x23e691(0x524)]='CTB';else{function _0x5b4496(){const _0x109d3a=_0x23e691,_0x215085=_0x32290f[_0x109d3a(0x1b8)]((_0x153676-_0x591913)/_0x504ec0,_0x38eaaf||_0x109d3a(0x673)),_0x456683=_0x4ccdcc[_0x109d3a(0x1b8)]((_0x3ce37d-_0x926138+0x1)/_0x2ea2d4,_0x4e484a||_0x109d3a(0x673)),_0x5ea0b5=(_0x5e18d6-_0x59101c*_0x215085)/(0x1-_0x215085);return _0x5ea0b5+(_0x3f3be9-_0x5ea0b5)*_0x456683;}}}}else{if(_0x320c93['match'](/<(?:STB)>/i)){if(_0x23e691(0x5ef)!==_0x23e691(0x2b3)){if(Imported[_0x23e691(0x69b)]){if(_0x23e691(0x45b)!==_0x23e691(0x6c5))this[_0x23e691(0x524)]='STB';else{function _0x556d50(){const _0x4f23d3=_0x23e691;_0xe233c5[_0x4f23d3(0x4ec)][_0x4f23d3(0x5b4)]['call'](this,_0x7af110);}}}}else{function _0x3759fd(){const _0x1c53f6=_0x23e691;let _0x160e03=_0x4c07ae[_0x1c53f6(0x4ec)][_0x1c53f6(0x3c2)][_0x1c53f6(0x1d6)](this,_0x42d1a2);return _0x160e03['x']=_0x9888e3[_0x1c53f6(0x2f2)](_0x160e03['x']),_0x160e03['y']=_0x4e36cc[_0x1c53f6(0x2f2)](_0x160e03['y']),_0x160e03[_0x1c53f6(0x29e)]=_0x2ef17a[_0x1c53f6(0x2f2)](_0x160e03['width']),_0x160e03['height']=_0x36f018['round'](_0x160e03[_0x1c53f6(0x1d3)]),_0x160e03;}}}else{if(_0x320c93[_0x23e691(0x54d)](/<(?:BTB)>/i))Imported[_0x23e691(0x5ca)]&&(this[_0x23e691(0x524)]=_0x23e691(0x623));else{if(_0x320c93[_0x23e691(0x54d)](/<(?:FTB)>/i))Imported[_0x23e691(0x1ad)]&&(this['_forcedBattleSys']=_0x23e691(0x6ec));else{if(_0x320c93[_0x23e691(0x54d)](/<(?:OTB)>/i)){if(Imported[_0x23e691(0x794)]){if(_0x23e691(0x2dc)==='pRpjt'){function _0x352c4d(){const _0x5de64c=_0x23e691;_0x3e3727=_0x59dd85||0x10e,this[_0x5de64c(0xce)]();if(_0x3a4b8c[_0x5de64c(0x4ec)][_0x5de64c(0x5dd)]['UI'][_0x5de64c(0x160)])this['drawTextEx'](_0x246be7[_0x5de64c(0x6d4)](),_0x14cbfb,_0xa6e13e,_0x55ecf7);else{const _0x2b1240=_0x134591[_0x5de64c(0x6d4)]()[_0x5de64c(0x333)](/\\I\[(\d+)\]/gi,'');this[_0x5de64c(0x237)](_0x5c8637['nickname'](),_0x1f9295,_0x236e13,_0x46f53e);}}}else this[_0x23e691(0x524)]='OTB';}}else{if(_0x320c93['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x141de5=String(RegExp['$1']);if(_0x141de5[_0x23e691(0x54d)](/DTB/i))this[_0x23e691(0x524)]=0x0;else{if(_0x141de5[_0x23e691(0x54d)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x23e691(0x524)]=0x1;else{if(_0x141de5[_0x23e691(0x54d)](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0x141de5[_0x23e691(0x54d)](/CTB/i)){if(Imported[_0x23e691(0x28f)]){if('zIfeJ'===_0x23e691(0x168))this[_0x23e691(0x524)]=_0x23e691(0x775);else{function _0x357ded(){const _0x3fd68e=_0x23e691;this[_0x3fd68e(0x267)][_0x3fd68e(0x686)](_0x534014[_0x3fd68e(0x63a)]['HelpBgType']);}}}}else{if(_0x141de5[_0x23e691(0x54d)](/STB/i)){if('uzUkB'!==_0x23e691(0x3cc)){function _0x126bef(){const _0x162be8=_0x23e691;this[_0x162be8(0x449)]();}}else Imported[_0x23e691(0x69b)]&&(this[_0x23e691(0x524)]=_0x23e691(0x72d));}else{if(_0x141de5[_0x23e691(0x54d)](/BTB/i)){if('weivq'===_0x23e691(0x1b4)){function _0x591223(){const _0x33fd2e=_0x23e691;return _0x2a02a3[_0x33fd2e(0x361)];}}else Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']='BTB');}else{if(_0x141de5[_0x23e691(0x54d)](/FTB/i)){if(Imported[_0x23e691(0x1ad)]){if(_0x23e691(0x77b)===_0x23e691(0x1b0)){function _0x1445f1(){const _0x4dfb8d=_0x23e691,_0x215ea4=_0x4bcc87[_0x4dfb8d(0x214)]();_0x215ea4>_0x148987&&(_0xadd29f=_0x215ea4,this[_0x4dfb8d(0x6b6)](_0x481f37,_0x96f7e1));}}else this[_0x23e691(0x524)]=_0x23e691(0x6ec);}}else{if(_0x141de5[_0x23e691(0x54d)](/OTB/i)){if('HVEXk'!==_0x23e691(0x6e5)){function _0x14b1d8(){var _0x4fec4a=_0x3da41a(_0x55e788['$1'])/0x64;_0x1924a0*=_0x4fec4a;}}else Imported[_0x23e691(0x794)]&&(this[_0x23e691(0x524)]='OTB');}}}}}}}}}}}}}}}}}},VisuMZ['CoreEngine'][_0x304852(0x3bc)]=Game_System[_0x304852(0x7ba)][_0x304852(0x1b6)],Game_System[_0x304852(0x7ba)]['initialize']=function(){const _0x21714a=_0x304852;VisuMZ[_0x21714a(0x4ec)]['Game_System_initialize']['call'](this),this[_0x21714a(0x5f1)]();},Game_System['prototype']['initCoreEngine']=function(){const _0x31c31a=_0x304852;this[_0x31c31a(0x431)]={'SideView':$dataSystem[_0x31c31a(0x59d)],'BattleSystem':this[_0x31c31a(0x618)](),'FontSize':$dataSystem[_0x31c31a(0xf4)]['fontSize'],'Padding':0xc};},Game_System[_0x304852(0x7ba)]['isSideView']=function(){const _0xad93b8=_0x304852;if($gameTemp[_0xad93b8(0x40e)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0xad93b8(0x69d)]===undefined)this[_0xad93b8(0x5f1)]();return this['_CoreEngineSettings'][_0xad93b8(0x69d)];},Game_System[_0x304852(0x7ba)]['setSideView']=function(_0x488d06){const _0x38eeb2=_0x304852;if(this[_0x38eeb2(0x431)]===undefined)this['initCoreEngine']();if(this[_0x38eeb2(0x431)][_0x38eeb2(0x69d)]===undefined)this['initCoreEngine']();this[_0x38eeb2(0x431)][_0x38eeb2(0x69d)]=_0x488d06;},Game_System['prototype'][_0x304852(0x477)]=function(){const _0xf0a8f9=_0x304852;if(this['_CoreEngineSettings']===undefined)this[_0xf0a8f9(0x5f1)]();this[_0xf0a8f9(0x431)][_0xf0a8f9(0x27f)]=this[_0xf0a8f9(0x618)]();},Game_System[_0x304852(0x7ba)][_0x304852(0x618)]=function(){const _0x108455=_0x304852,_0x17cee4=(VisuMZ['CoreEngine'][_0x108455(0x5dd)][_0x108455(0x27f)]||_0x108455(0x41b))[_0x108455(0x55d)]()[_0x108455(0x4ae)]();return VisuMZ[_0x108455(0x4ec)][_0x108455(0x61f)](_0x17cee4);},Game_System['prototype']['getBattleSystem']=function(){const _0x3ce36f=_0x304852;if($gameTemp[_0x3ce36f(0x524)]!==undefined)return $gameTemp[_0x3ce36f(0x524)];if(this[_0x3ce36f(0x431)]===undefined)this[_0x3ce36f(0x5f1)]();if(this[_0x3ce36f(0x431)][_0x3ce36f(0x27f)]===undefined)this['resetBattleSystem']();return this['_CoreEngineSettings'][_0x3ce36f(0x27f)];},Game_System[_0x304852(0x7ba)]['setBattleSystem']=function(_0x27392a){const _0x31ad71=_0x304852;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x31ad71(0x431)][_0x31ad71(0x27f)]===undefined)this['resetBattleSystem']();this[_0x31ad71(0x431)][_0x31ad71(0x27f)]=_0x27392a;},Game_System['prototype']['mainFontSize']=function(){const _0x1ba186=_0x304852;if(this[_0x1ba186(0x431)]===undefined)this[_0x1ba186(0x5f1)]();if(this[_0x1ba186(0x431)][_0x1ba186(0x711)]===undefined)this[_0x1ba186(0x5f1)]();return this['_CoreEngineSettings']['FontSize'];},Game_System[_0x304852(0x7ba)][_0x304852(0x447)]=function(_0x619124){const _0x58f48c=_0x304852;if(this[_0x58f48c(0x431)]===undefined)this[_0x58f48c(0x5f1)]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this[_0x58f48c(0x5f1)]();this['_CoreEngineSettings'][_0x58f48c(0x711)]=_0x619124;},Game_System[_0x304852(0x7ba)][_0x304852(0x2a5)]=function(){const _0x57b5d7=_0x304852;if(this['_CoreEngineSettings']===undefined)this[_0x57b5d7(0x5f1)]();if(this[_0x57b5d7(0x431)][_0x57b5d7(0x1fc)]===undefined)this[_0x57b5d7(0x5f1)]();return this[_0x57b5d7(0x431)][_0x57b5d7(0x1fc)];},Game_System[_0x304852(0x7ba)][_0x304852(0x4be)]=function(_0x3e9998){const _0x12fb85=_0x304852;if(this['_CoreEngineSettings']===undefined)this[_0x12fb85(0x5f1)]();if(this['_CoreEngineSettings'][_0x12fb85(0x362)]===undefined)this[_0x12fb85(0x5f1)]();this[_0x12fb85(0x431)][_0x12fb85(0x1fc)]=_0x3e9998;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x121)]=Game_Screen['prototype'][_0x304852(0x1b6)],Game_Screen[_0x304852(0x7ba)][_0x304852(0x1b6)]=function(){const _0x5a68eb=_0x304852;VisuMZ[_0x5a68eb(0x4ec)]['Game_Screen_initialize'][_0x5a68eb(0x1d6)](this),this[_0x5a68eb(0x77f)]();},Game_Screen[_0x304852(0x7ba)]['initCoreEngineScreenShake']=function(){const _0x325963=_0x304852,_0x51e764=VisuMZ['CoreEngine']['Settings'][_0x325963(0x317)];this[_0x325963(0x5e6)]=_0x51e764?.[_0x325963(0x122)]||_0x325963(0x3b4);},Game_Screen[_0x304852(0x7ba)]['getCoreEngineScreenShakeStyle']=function(){const _0x56fce2=_0x304852;if(this[_0x56fce2(0x5e6)]===undefined)this['initCoreEngineScreenShake']();return this[_0x56fce2(0x5e6)];},Game_Screen[_0x304852(0x7ba)]['setCoreEngineScreenShakeStyle']=function(_0x16a138){const _0x1115dd=_0x304852;if(this[_0x1115dd(0x5e6)]===undefined)this[_0x1115dd(0x77f)]();this[_0x1115dd(0x5e6)]=_0x16a138[_0x1115dd(0x302)]()[_0x1115dd(0x4ae)]();},Game_Picture[_0x304852(0x7ba)][_0x304852(0x5f2)]=function(){const _0x1934e4=_0x304852;if($gameParty[_0x1934e4(0x4dc)]())return![];return this['name']()&&this[_0x1934e4(0x3a8)]()['charAt'](0x0)==='!';},VisuMZ[_0x304852(0x4ec)][_0x304852(0x4d5)]=Game_Picture['prototype']['x'],Game_Picture[_0x304852(0x7ba)]['x']=function(){const _0x3d27fd=_0x304852;if(this['isMapScrollLinked']())return this['xScrollLinkedOffset']();else{if(_0x3d27fd(0x410)===_0x3d27fd(0x410))return VisuMZ[_0x3d27fd(0x4ec)][_0x3d27fd(0x4d5)][_0x3d27fd(0x1d6)](this);else{function _0x2f6fcb(){return _0x30daea(_0xfadae8)['toLocaleString'](_0x6e8069,_0x50d264)+'.';}}}},Game_Picture[_0x304852(0x7ba)][_0x304852(0x2c1)]=function(){const _0x400cf7=_0x304852,_0x11c1f3=$gameMap[_0x400cf7(0x489)]()*$gameMap[_0x400cf7(0x30f)]();return this['_x']-_0x11c1f3;},VisuMZ['CoreEngine'][_0x304852(0x520)]=Game_Picture['prototype']['y'],Game_Picture[_0x304852(0x7ba)]['y']=function(){const _0x44e041=_0x304852;return this['isMapScrollLinked']()?this[_0x44e041(0x58f)]():VisuMZ[_0x44e041(0x4ec)][_0x44e041(0x520)][_0x44e041(0x1d6)](this);},Game_Picture[_0x304852(0x7ba)]['yScrollLinkedOffset']=function(){const _0x39139a=_0x304852,_0x40acd5=$gameMap[_0x39139a(0x3c3)]()*$gameMap[_0x39139a(0x366)]();return this['_y']-_0x40acd5;},Game_Picture['prototype'][_0x304852(0x23b)]=function(_0x2bee1e){this['_coreEasingType']=_0x2bee1e;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x45c)]=Game_Picture[_0x304852(0x7ba)][_0x304852(0x210)],Game_Picture[_0x304852(0x7ba)][_0x304852(0x210)]=function(_0x237d03){const _0x38f616=_0x304852;this[_0x38f616(0x533)]=this['_coreEasingType']||0x0;if([0x0,0x1,0x2,0x3][_0x38f616(0x44a)](this[_0x38f616(0x533)])){if(_0x38f616(0x243)===_0x38f616(0xf3)){function _0x15acde(){var _0x39cb48=_0x11ca0f(_0x44d886['$1']);_0x2ec81f+=_0x39cb48;}}else return VisuMZ[_0x38f616(0x4ec)][_0x38f616(0x45c)][_0x38f616(0x1d6)](this,_0x237d03);}else return VisuMZ['ApplyEasing'](_0x237d03,this['_coreEasingType']);},VisuMZ[_0x304852(0x4ec)]['Game_Action_itemHit']=Game_Action[_0x304852(0x7ba)][_0x304852(0x374)],Game_Action[_0x304852(0x7ba)]['itemHit']=function(_0x18d90e){const _0x546f7b=_0x304852;return VisuMZ[_0x546f7b(0x4ec)][_0x546f7b(0x5dd)][_0x546f7b(0x409)][_0x546f7b(0x4f6)]?this[_0x546f7b(0x68f)](_0x18d90e):VisuMZ[_0x546f7b(0x4ec)]['Game_Action_itemHit']['call'](this,_0x18d90e);},Game_Action[_0x304852(0x7ba)][_0x304852(0x68f)]=function(_0x373d21){const _0x1c9a59=_0x304852,_0x69b3ed=this[_0x1c9a59(0x17f)](_0x373d21),_0x4b9151=this['subjectHitRate'](_0x373d21),_0x136346=this[_0x1c9a59(0x420)](_0x373d21);return _0x69b3ed*(_0x4b9151-_0x136346);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x364)]=Game_Action[_0x304852(0x7ba)][_0x304852(0x479)],Game_Action[_0x304852(0x7ba)]['itemEva']=function(_0x2e67a0){const _0x16f5d0=_0x304852;return VisuMZ['CoreEngine'][_0x16f5d0(0x5dd)][_0x16f5d0(0x409)][_0x16f5d0(0x4f6)]?0x0:VisuMZ['CoreEngine']['Game_Action_itemEva'][_0x16f5d0(0x1d6)](this,_0x2e67a0);},Game_Action[_0x304852(0x7ba)][_0x304852(0x17f)]=function(_0x414a1e){const _0x319571=_0x304852;return this[_0x319571(0x6a7)]()['successRate']*0.01;},Game_Action[_0x304852(0x7ba)]['subjectHitRate']=function(_0xb412ec){const _0x337aef=_0x304852;if(VisuMZ['CoreEngine']['Settings'][_0x337aef(0x409)][_0x337aef(0x127)]&&this[_0x337aef(0x2c4)]())return 0x1;if(this['isPhysical']()){if(VisuMZ[_0x337aef(0x4ec)]['Settings'][_0x337aef(0x409)][_0x337aef(0x127)]&&this[_0x337aef(0x2dd)]()[_0x337aef(0x55f)]()){if(_0x337aef(0x28c)!==_0x337aef(0x28c)){function _0x1b8c8f(){const _0x4ea585=_0x337aef;return _0x157438[_0x4ea585(0x63a)][_0x4ea585(0x637)]['call'](this);}}else return this[_0x337aef(0x2dd)]()[_0x337aef(0x78f)]+0.05;}else return this['subject']()['hit'];}else{if(_0x337aef(0x529)!=='ulRES')return 0x1;else{function _0xe90997(){return![];}}}},Game_Action[_0x304852(0x7ba)][_0x304852(0x420)]=function(_0x1cd9a1){const _0x1a607b=_0x304852;if(this[_0x1a607b(0x2dd)]()[_0x1a607b(0x55f)]()===_0x1cd9a1['isActor']())return 0x0;if(this[_0x1a607b(0x6dc)]())return VisuMZ[_0x1a607b(0x4ec)][_0x1a607b(0x5dd)][_0x1a607b(0x409)]['AccuracyBoost']&&_0x1cd9a1[_0x1a607b(0x5f9)]()?_0x1cd9a1[_0x1a607b(0x361)]-0.05:_0x1cd9a1[_0x1a607b(0x361)];else return this[_0x1a607b(0x4ce)]()?_0x1cd9a1[_0x1a607b(0x223)]:0x0;},VisuMZ[_0x304852(0x4ec)]['Game_Action_updateLastTarget']=Game_Action[_0x304852(0x7ba)]['updateLastTarget'],Game_Action['prototype']['updateLastTarget']=function(_0x3f9367){const _0x2b5ff9=_0x304852;VisuMZ[_0x2b5ff9(0x4ec)]['Game_Action_updateLastTarget']['call'](this,_0x3f9367);if(VisuMZ['CoreEngine'][_0x2b5ff9(0x5dd)][_0x2b5ff9(0x409)][_0x2b5ff9(0x4f6)])return;const _0x577fb2=_0x3f9367[_0x2b5ff9(0x191)]();if(_0x577fb2[_0x2b5ff9(0x724)]){if(_0x2b5ff9(0x740)!=='bqrCh'){function _0xfdc92c(){_0x491892-=_0x349ffd;if(_0x425f8e<=0x0)_0x59c2a0=0x0;this['smoothSelect'](_0x3ced34);}}else{if(0x1-this[_0x2b5ff9(0x479)](_0x3f9367)>this[_0x2b5ff9(0x374)](_0x3f9367)){if(_0x2b5ff9(0x1c9)===_0x2b5ff9(0xe1)){function _0x2c6c8e(){const _0x3d1778=_0x2b5ff9;return _0x152a18[_0x3d1778(0x4ec)][_0x3d1778(0x5dd)][_0x3d1778(0x627)][_0x3d1778(0x41e)];}}else _0x577fb2[_0x2b5ff9(0x724)]=![],_0x577fb2[_0x2b5ff9(0x200)]=!![];}}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x513)]=Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x73e)],Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x73e)]=function(){const _0x40025b=_0x304852;this['_cache']={},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers'][_0x40025b(0x1d6)](this);},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']=Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x268)],Game_BattlerBase['prototype']['refresh']=function(){const _0x1e9c98=_0x304852;this[_0x1e9c98(0x602)]={},VisuMZ[_0x1e9c98(0x4ec)][_0x1e9c98(0x6ea)][_0x1e9c98(0x1d6)](this);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x1c5)]=function(_0x5a7c25){const _0x156af6=_0x304852;return this['_cache']=this['_cache']||{},this[_0x156af6(0x602)][_0x5a7c25]!==undefined;},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x3db)]=function(_0x4f3812){const _0x5c5fda=_0x304852,_0x4c4acd=(_0x33df30,_0x50f58f)=>{const _0xa822e=_0x5986;if(_0xa822e(0x56b)!==_0xa822e(0x56b)){function _0x130a65(){const _0x4ea7b4=_0xa822e;try{_0x487705[_0x4ea7b4(0x4ec)][_0x4ea7b4(0x73d)]['call'](this,_0x1429e2);}catch(_0x465fcd){if(_0x58522f['isPlaytest']())_0x8b60fb[_0x4ea7b4(0x3f8)](_0x465fcd);}}}else{if(!_0x50f58f)return _0x33df30;if(_0x50f58f[_0xa822e(0x609)][_0xa822e(0x54d)](VisuMZ[_0xa822e(0x4ec)][_0xa822e(0x6f1)][_0xa822e(0x3db)][_0x4f3812])){var _0x1b0600=Number(RegExp['$1']);_0x33df30+=_0x1b0600;}if(_0x50f58f['note'][_0xa822e(0x54d)](VisuMZ[_0xa822e(0x4ec)][_0xa822e(0x6f1)][_0xa822e(0x5f7)][_0x4f3812])){var _0x43a911=String(RegExp['$1']);try{_0x33df30+=eval(_0x43a911);}catch(_0x363b20){if($gameTemp[_0xa822e(0xd0)]())console[_0xa822e(0x3f8)](_0x363b20);}}return _0x33df30;}};return this[_0x5c5fda(0x7ab)]()[_0x5c5fda(0x396)](_0x4c4acd,this[_0x5c5fda(0x70c)][_0x4f3812]);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x1bd)]=function(_0x38a7bb){const _0x2fa756=_0x304852;var _0x506b99=_0x2fa756(0x582)+(this['isActor']()?'Actor':'Enemy')+_0x2fa756(0x2fa)+_0x38a7bb;if(this[_0x2fa756(0x1c5)](_0x506b99))return this[_0x2fa756(0x602)][_0x506b99];this[_0x2fa756(0x602)][_0x506b99]=eval(VisuMZ[_0x2fa756(0x4ec)][_0x2fa756(0x5dd)][_0x2fa756(0x6c6)][_0x506b99]);const _0x25b43a=(_0x348c0a,_0x32025d)=>{const _0x150cc4=_0x2fa756;if('yxurh'!==_0x150cc4(0x2d4)){if(!_0x32025d)return _0x348c0a;if(_0x32025d[_0x150cc4(0x609)][_0x150cc4(0x54d)](VisuMZ[_0x150cc4(0x4ec)][_0x150cc4(0x6f1)]['paramMax'][_0x38a7bb])){var _0x13f433=Number(RegExp['$1']);if(_0x13f433===0x0)_0x13f433=Number[_0x150cc4(0x74b)];_0x348c0a=Math[_0x150cc4(0x710)](_0x348c0a,_0x13f433);}if(_0x32025d['note']['match'](VisuMZ[_0x150cc4(0x4ec)]['RegExp'][_0x150cc4(0x508)][_0x38a7bb])){var _0x3c215b=String(RegExp['$1']);try{if(_0x150cc4(0x10b)!==_0x150cc4(0x10b)){function _0x538140(){const _0x34e3d6=_0x150cc4;if(_0x35b2cd[_0x34e3d6(0xd0)]())_0x39ee9c[_0x34e3d6(0x3f8)](_0x387dfb);}}else _0x348c0a=Math[_0x150cc4(0x710)](_0x348c0a,Number(eval(_0x3c215b)));}catch(_0x542150){if($gameTemp[_0x150cc4(0xd0)]())console[_0x150cc4(0x3f8)](_0x542150);}}return _0x348c0a;}else{function _0x4859ae(){const _0x4a4c90=_0x150cc4;this[_0x4a4c90(0x4e0)][_0x4a4c90(0x686)](_0xad67ce['layoutSettings'][_0x4a4c90(0x6e3)]);}}};if(this[_0x2fa756(0x602)][_0x506b99]===0x0)this[_0x2fa756(0x602)][_0x506b99]=Number[_0x2fa756(0x74b)];return this[_0x2fa756(0x602)][_0x506b99]=this[_0x2fa756(0x7ab)]()[_0x2fa756(0x396)](_0x25b43a,this[_0x2fa756(0x602)][_0x506b99]),this['_cache'][_0x506b99];},Game_BattlerBase['prototype']['paramRate']=function(_0x3f9667){const _0x521b44=_0x304852,_0x41b4b2=this[_0x521b44(0x676)](Game_BattlerBase[_0x521b44(0x2f6)],_0x3f9667),_0x224149=(_0x23d0e8,_0x1c8ee1)=>{const _0x6f75c5=_0x521b44;if(!_0x1c8ee1)return _0x23d0e8;if(_0x1c8ee1[_0x6f75c5(0x609)][_0x6f75c5(0x54d)](VisuMZ[_0x6f75c5(0x4ec)][_0x6f75c5(0x6f1)][_0x6f75c5(0x752)][_0x3f9667])){if(_0x6f75c5(0x166)!==_0x6f75c5(0x5cd)){var _0x17f6d4=Number(RegExp['$1'])/0x64;_0x23d0e8*=_0x17f6d4;}else{function _0x205e06(){const _0x44426b=_0x6f75c5;_0xe98f4f[_0x44426b(0x4ec)][_0x44426b(0x27c)][_0x44426b(0x1d6)](this,_0x1fb00a,_0x2ce936,_0x37ffa2,_0x1ef3b2,_0x507654,_0x5f6279,_0x1763b8,_0x4258c0,_0x4b4bdf),this[_0x44426b(0x5c0)]();}}}if(_0x1c8ee1[_0x6f75c5(0x609)][_0x6f75c5(0x54d)](VisuMZ['CoreEngine'][_0x6f75c5(0x6f1)][_0x6f75c5(0xfd)][_0x3f9667])){if(_0x6f75c5(0x792)!=='zQMzr'){function _0x42eca0(){const _0x52353a=_0x6f75c5;this[_0x52353a(0x337)]&&(this[_0x52353a(0x76b)]+=this[_0x52353a(0x137)](),this[_0x52353a(0x417)]()&&(this[_0x52353a(0x337)]=![]));}}else{var _0x17f6d4=Number(RegExp['$1']);_0x23d0e8*=_0x17f6d4;}}if(_0x1c8ee1[_0x6f75c5(0x609)][_0x6f75c5(0x54d)](VisuMZ[_0x6f75c5(0x4ec)][_0x6f75c5(0x6f1)][_0x6f75c5(0x5fa)][_0x3f9667])){var _0x8d0b7a=String(RegExp['$1']);try{_0x23d0e8*=eval(_0x8d0b7a);}catch(_0x309dff){if(_0x6f75c5(0x689)!==_0x6f75c5(0x13a)){if($gameTemp['isPlaytest']())console[_0x6f75c5(0x3f8)](_0x309dff);}else{function _0x39f0a8(){_0xa84eca+=_0x496788;if(_0x50084f>=_0x3d86d4)_0x245762=_0x115cc5-0x1;this['smoothSelect'](_0x1504f3);}}}}return _0x23d0e8;};return this[_0x521b44(0x7ab)]()[_0x521b44(0x396)](_0x224149,_0x41b4b2);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x382)]=function(_0x4b31ef){const _0x1991ff=_0x304852,_0x1b1320=(_0x5b8aa5,_0x222f78)=>{const _0x19d9b3=_0x5986;if(!_0x222f78)return _0x5b8aa5;if(_0x222f78[_0x19d9b3(0x609)]['match'](VisuMZ[_0x19d9b3(0x4ec)][_0x19d9b3(0x6f1)][_0x19d9b3(0x293)][_0x4b31ef])){var _0x34f2a8=Number(RegExp['$1']);_0x5b8aa5+=_0x34f2a8;}if(_0x222f78['note'][_0x19d9b3(0x54d)](VisuMZ[_0x19d9b3(0x4ec)][_0x19d9b3(0x6f1)][_0x19d9b3(0x109)][_0x4b31ef])){if(_0x19d9b3(0x219)==='nvLRt'){function _0xc4d542(){const _0x93f3c7=_0x19d9b3;_0x5a8f7c[_0x93f3c7(0x4ec)][_0x93f3c7(0x2f4)][_0x93f3c7(0x1d6)](this);const _0x181660=this[_0x93f3c7(0x3bf)]['_timerSprite'];if(_0x181660)this[_0x93f3c7(0x5a2)](_0x181660);}}else{var _0x379cf9=String(RegExp['$1']);try{if(_0x19d9b3(0x26d)===_0x19d9b3(0x56f)){function _0x3283d7(){var _0x350ec5=_0x35812e(_0xd2394['$1'])/0x64;_0x442b4a+=_0x350ec5;}}else _0x5b8aa5+=eval(_0x379cf9);}catch(_0x3d05a1){if($gameTemp['isPlaytest']())console['log'](_0x3d05a1);}}}return _0x5b8aa5;};return this[_0x1991ff(0x7ab)]()[_0x1991ff(0x396)](_0x1b1320,0x0);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x32c)]=function(_0x564adc){const _0x1249ed=_0x304852;let _0x4ac702=_0x1249ed(0x32c)+_0x564adc+'Total';if(this[_0x1249ed(0x1c5)](_0x4ac702))return this[_0x1249ed(0x602)][_0x4ac702];return this['_cache'][_0x4ac702]=Math['round'](VisuMZ[_0x1249ed(0x4ec)][_0x1249ed(0x5dd)][_0x1249ed(0x6c6)][_0x1249ed(0x46e)][_0x1249ed(0x1d6)](this,_0x564adc)),this[_0x1249ed(0x602)][_0x4ac702];},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x6c3)]=function(_0x433505){const _0x97a5a2=_0x304852,_0xd13a2b=(_0x216e10,_0xfe8fc9)=>{const _0x16a601=_0x5986;if(_0x16a601(0x3d7)===_0x16a601(0x3f1)){function _0xafb33f(){const _0x105f12=_0x16a601;this[_0x105f12(0x25f)]=_0x3f3f91;}}else{if(!_0xfe8fc9)return _0x216e10;if(_0xfe8fc9[_0x16a601(0x609)][_0x16a601(0x54d)](VisuMZ['CoreEngine']['RegExp'][_0x16a601(0xd8)][_0x433505])){var _0x256d57=Number(RegExp['$1'])/0x64;_0x216e10+=_0x256d57;}if(_0xfe8fc9[_0x16a601(0x609)][_0x16a601(0x54d)](VisuMZ['CoreEngine'][_0x16a601(0x6f1)][_0x16a601(0x49b)][_0x433505])){var _0x256d57=Number(RegExp['$1']);_0x216e10+=_0x256d57;}if(_0xfe8fc9[_0x16a601(0x609)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x16a601(0x14b)][_0x433505])){var _0x15a51c=String(RegExp['$1']);try{if(_0x16a601(0x32d)==='gPtnT')_0x216e10+=eval(_0x15a51c);else{function _0x472424(){const _0x223b11=_0x16a601;this[_0x223b11(0x5e4)]();}}}catch(_0x550785){if(_0x16a601(0x2d3)===_0x16a601(0x2d3)){if($gameTemp[_0x16a601(0xd0)]())console[_0x16a601(0x3f8)](_0x550785);}else{function _0x66acfc(){const _0x103a36=_0x16a601;_0x350084[_0x103a36(0x4ec)][_0x103a36(0x10e)][_0x103a36(0x1d6)](this);}}}}return _0x216e10;}};return this[_0x97a5a2(0x7ab)]()[_0x97a5a2(0x396)](_0xd13a2b,0x0);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x67f)]=function(_0x2f9197){const _0xa09773=_0x304852,_0x1b88e8=(_0x2867db,_0x857340)=>{const _0x213e0c=_0x5986;if(!_0x857340)return _0x2867db;if(_0x857340[_0x213e0c(0x609)]['match'](VisuMZ['CoreEngine'][_0x213e0c(0x6f1)][_0x213e0c(0x14c)][_0x2f9197])){var _0x5f8ded=Number(RegExp['$1'])/0x64;_0x2867db*=_0x5f8ded;}if(_0x857340[_0x213e0c(0x609)][_0x213e0c(0x54d)](VisuMZ[_0x213e0c(0x4ec)][_0x213e0c(0x6f1)]['xparamRate2'][_0x2f9197])){var _0x5f8ded=Number(RegExp['$1']);_0x2867db*=_0x5f8ded;}if(_0x857340[_0x213e0c(0x609)]['match'](VisuMZ[_0x213e0c(0x4ec)][_0x213e0c(0x6f1)][_0x213e0c(0x54c)][_0x2f9197])){var _0x3c6d19=String(RegExp['$1']);try{if(_0x213e0c(0x728)===_0x213e0c(0x198)){function _0x1df57c(){const _0x2b8dd8=_0x213e0c;_0x2c9db8['log'](_0x2b8dd8(0x1de)),_0x2dde42['log'](_0x44c3be);}}else _0x2867db*=eval(_0x3c6d19);}catch(_0x1aa87f){if(_0x213e0c(0x641)===_0x213e0c(0x641)){if($gameTemp[_0x213e0c(0xd0)]())console[_0x213e0c(0x3f8)](_0x1aa87f);}else{function _0x3bf4d1(){const _0x581868=_0x213e0c;this[_0x581868(0x5d7)](_0x120916);}}}}return _0x2867db;};return this['traitObjects']()[_0xa09773(0x396)](_0x1b88e8,0x1);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x4e5)]=function(_0x103f3a){const _0x10c96d=_0x304852,_0x308e4b=(_0xb01964,_0x3f3e9a)=>{const _0x14f7c5=_0x5986;if(!_0x3f3e9a)return _0xb01964;if(_0x3f3e9a[_0x14f7c5(0x609)]['match'](VisuMZ[_0x14f7c5(0x4ec)]['RegExp'][_0x14f7c5(0x7b7)][_0x103f3a])){var _0x1cf14c=Number(RegExp['$1'])/0x64;_0xb01964+=_0x1cf14c;}if(_0x3f3e9a['note'][_0x14f7c5(0x54d)](VisuMZ['CoreEngine'][_0x14f7c5(0x6f1)][_0x14f7c5(0x6b5)][_0x103f3a])){var _0x1cf14c=Number(RegExp['$1']);_0xb01964+=_0x1cf14c;}if(_0x3f3e9a[_0x14f7c5(0x609)][_0x14f7c5(0x54d)](VisuMZ[_0x14f7c5(0x4ec)]['RegExp']['xparamFlatJS'][_0x103f3a])){if('ouVgn'==='ouVgn'){var _0x41190f=String(RegExp['$1']);try{if(_0x14f7c5(0x1a0)==='jVpFb')_0xb01964+=eval(_0x41190f);else{function _0x2a6a48(){const _0x10c08e=_0x14f7c5;_0x3d678e[_0x10c08e(0x4ec)][_0x10c08e(0x51d)][_0x10c08e(0x1d6)](this),_0x35f660[_0x10c08e(0x4c8)]&&!_0x5a810a[_0x10c08e(0x4c9)]()&&(this[_0x10c08e(0x723)](),_0x211854[_0x10c08e(0xc1)]());}}}catch(_0x2e20d9){if($gameTemp[_0x14f7c5(0xd0)]())console[_0x14f7c5(0x3f8)](_0x2e20d9);}}else{function _0x53723b(){const _0x2ab443=_0x14f7c5;return _0x1d762b[_0x2ab443(0x4ec)][_0x2ab443(0x5dd)][_0x2ab443(0x409)][_0x2ab443(0x42f)];}}}return _0xb01964;};return this[_0x10c96d(0x7ab)]()[_0x10c96d(0x396)](_0x308e4b,0x0);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x285)]=function(_0x4438ee){const _0x31a311=_0x304852;let _0x5d6f96=_0x31a311(0x285)+_0x4438ee+_0x31a311(0x414);if(this[_0x31a311(0x1c5)](_0x5d6f96))return this['_cache'][_0x5d6f96];return this[_0x31a311(0x602)][_0x5d6f96]=VisuMZ[_0x31a311(0x4ec)]['Settings'][_0x31a311(0x6c6)][_0x31a311(0xc4)][_0x31a311(0x1d6)](this,_0x4438ee),this[_0x31a311(0x602)][_0x5d6f96];},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x42a)]=function(_0x1cfa42){const _0x3b5179=_0x304852,_0x5697df=(_0x382c5e,_0x15b2c8)=>{const _0x27fe9b=_0x5986;if(!_0x15b2c8)return _0x382c5e;if(_0x15b2c8[_0x27fe9b(0x609)][_0x27fe9b(0x54d)](VisuMZ['CoreEngine'][_0x27fe9b(0x6f1)][_0x27fe9b(0x44d)][_0x1cfa42])){if('ISIiF'!==_0x27fe9b(0xef)){function _0x4ad0d8(){return[0x25,0x26,0x27,0x28]['contains'](this['_inputSpecialKeyCode']);}}else{var _0x366719=Number(RegExp['$1'])/0x64;_0x382c5e+=_0x366719;}}if(_0x15b2c8['note'][_0x27fe9b(0x54d)](VisuMZ[_0x27fe9b(0x4ec)][_0x27fe9b(0x6f1)][_0x27fe9b(0x6dd)][_0x1cfa42])){var _0x366719=Number(RegExp['$1']);_0x382c5e+=_0x366719;}if(_0x15b2c8[_0x27fe9b(0x609)][_0x27fe9b(0x54d)](VisuMZ['CoreEngine'][_0x27fe9b(0x6f1)][_0x27fe9b(0x133)][_0x1cfa42])){var _0x31ae56=String(RegExp['$1']);try{_0x382c5e+=eval(_0x31ae56);}catch(_0x3cc020){if(_0x27fe9b(0x644)!==_0x27fe9b(0x252)){if($gameTemp[_0x27fe9b(0xd0)]())console[_0x27fe9b(0x3f8)](_0x3cc020);}else{function _0x129b44(){const _0x44f885=_0x27fe9b;this['smoothSelect'](_0x41ee7a['min'](this[_0x44f885(0x66c)](),0x0));}}}}return _0x382c5e;};return this[_0x3b5179(0x7ab)]()[_0x3b5179(0x396)](_0x5697df,0x0);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x12f)]=function(_0x5b73fb){const _0x3d2371=_0x304852,_0x181967=(_0x526dda,_0x3ecfbd)=>{const _0x2f4c9e=_0x5986;if(!_0x3ecfbd)return _0x526dda;if(_0x3ecfbd[_0x2f4c9e(0x609)][_0x2f4c9e(0x54d)](VisuMZ[_0x2f4c9e(0x4ec)]['RegExp'][_0x2f4c9e(0x186)][_0x5b73fb])){var _0x76150b=Number(RegExp['$1'])/0x64;_0x526dda*=_0x76150b;}if(_0x3ecfbd[_0x2f4c9e(0x609)][_0x2f4c9e(0x54d)](VisuMZ[_0x2f4c9e(0x4ec)][_0x2f4c9e(0x6f1)][_0x2f4c9e(0x4fc)][_0x5b73fb])){if(_0x2f4c9e(0x31f)===_0x2f4c9e(0x31f)){var _0x76150b=Number(RegExp['$1']);_0x526dda*=_0x76150b;}else{function _0x193adf(){const _0x163b15=_0x2f4c9e;_0x365b24['maxLevel']=_0x1d7fa6(_0x316b7f['$1']);if(_0x2f2584[_0x163b15(0x148)]===0x0)_0x17f72f[_0x163b15(0x148)]=_0x66e74d[_0x163b15(0x74b)];}}}if(_0x3ecfbd[_0x2f4c9e(0x609)]['match'](VisuMZ[_0x2f4c9e(0x4ec)][_0x2f4c9e(0x6f1)][_0x2f4c9e(0x70d)][_0x5b73fb])){if(_0x2f4c9e(0x71a)!=='qICiB'){var _0x3eabdf=String(RegExp['$1']);try{_0x526dda*=eval(_0x3eabdf);}catch(_0x45e0d2){if($gameTemp[_0x2f4c9e(0xd0)]())console['log'](_0x45e0d2);}}else{function _0x15836f(){this['processAlwaysEscape']();}}}return _0x526dda;};return this[_0x3d2371(0x7ab)]()[_0x3d2371(0x396)](_0x181967,0x1);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x3c5)]=function(_0x320b75){const _0x2083f6=_0x304852,_0x36d69a=(_0x284ed9,_0x5aa0be)=>{const _0x256b6f=_0x5986;if(!_0x5aa0be)return _0x284ed9;if(_0x5aa0be[_0x256b6f(0x609)][_0x256b6f(0x54d)](VisuMZ[_0x256b6f(0x4ec)]['RegExp'][_0x256b6f(0x26f)][_0x320b75])){if(_0x256b6f(0x5c6)===_0x256b6f(0x365)){function _0x6193c(){const _0x1b51f6=_0x256b6f;this[_0x1b51f6(0x10c)]+=_0x384723[_0x1b51f6(0x2f2)]((_0x3d272f[_0x1b51f6(0x1d3)]-0x270)/0x2),this['_screenY']-=_0x23e4b9['floor']((_0x4a0bba[_0x1b51f6(0x1d3)]-_0x50502e['boxHeight'])/0x2),_0x4a790f[_0x1b51f6(0x25a)]()?this[_0x1b51f6(0x2be)]-=_0x310bb3[_0x1b51f6(0x392)]((_0x22d0b9[_0x1b51f6(0x29e)]-_0x5530f3[_0x1b51f6(0x277)])/0x2):this[_0x1b51f6(0x2be)]+=_0x393f6e[_0x1b51f6(0x2f2)]((_0x560d22['boxWidth']-0x330)/0x2);}}else{var _0x502120=Number(RegExp['$1'])/0x64;_0x284ed9+=_0x502120;}}if(_0x5aa0be[_0x256b6f(0x609)][_0x256b6f(0x54d)](VisuMZ[_0x256b6f(0x4ec)]['RegExp'][_0x256b6f(0x18e)][_0x320b75])){var _0x502120=Number(RegExp['$1']);_0x284ed9+=_0x502120;}if(_0x5aa0be['note'][_0x256b6f(0x54d)](VisuMZ[_0x256b6f(0x4ec)]['RegExp'][_0x256b6f(0x675)][_0x320b75])){var _0x38d936=String(RegExp['$1']);try{if(_0x256b6f(0x2e2)!=='iZEmN')_0x284ed9+=eval(_0x38d936);else{function _0x23c9e9(){return _0x12750d(_0x105fb8)['toLocaleString'](_0x5528ff,_0x122596);}}}catch(_0x4f685c){if(_0x256b6f(0x17d)===_0x256b6f(0x3ed)){function _0x316a7a(){return 0x1;}}else{if($gameTemp[_0x256b6f(0xd0)]())console['log'](_0x4f685c);}}}return _0x284ed9;};return this['traitObjects']()[_0x2083f6(0x396)](_0x36d69a,0x0);},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x1f3)]=function(_0x4f4976){const _0x18fd9b=_0x304852;let _0x150f25='sparam'+_0x4f4976+_0x18fd9b(0x414);if(this[_0x18fd9b(0x1c5)](_0x150f25))return this[_0x18fd9b(0x602)][_0x150f25];return this[_0x18fd9b(0x602)][_0x150f25]=VisuMZ[_0x18fd9b(0x4ec)][_0x18fd9b(0x5dd)][_0x18fd9b(0x6c6)][_0x18fd9b(0x767)][_0x18fd9b(0x1d6)](this,_0x4f4976),this[_0x18fd9b(0x602)][_0x150f25];},Game_BattlerBase[_0x304852(0x7ba)][_0x304852(0x22e)]=function(_0xbde680,_0x2f5c6a){const _0x5efeea=_0x304852;if(typeof paramId===_0x5efeea(0x2cb))return this['param'](_0xbde680);_0xbde680=String(_0xbde680||'')[_0x5efeea(0x55d)]();if(_0xbde680==='MAXHP')return this[_0x5efeea(0x32c)](0x0);if(_0xbde680===_0x5efeea(0x209))return this[_0x5efeea(0x32c)](0x1);if(_0xbde680===_0x5efeea(0x6df))return this[_0x5efeea(0x32c)](0x2);if(_0xbde680===_0x5efeea(0x482))return this[_0x5efeea(0x32c)](0x3);if(_0xbde680===_0x5efeea(0x6f9))return this['param'](0x4);if(_0xbde680===_0x5efeea(0x71f))return this[_0x5efeea(0x32c)](0x5);if(_0xbde680===_0x5efeea(0x729))return this[_0x5efeea(0x32c)](0x6);if(_0xbde680===_0x5efeea(0x669))return this[_0x5efeea(0x32c)](0x7);if(_0xbde680==='HIT')return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this['xparam'](0x0)*0x64))+'%':this['xparam'](0x0);if(_0xbde680===_0x5efeea(0x1a2))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x285)](0x1)*0x64))+'%':this[_0x5efeea(0x285)](0x1);if(_0xbde680===_0x5efeea(0x217))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x285)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0xbde680===_0x5efeea(0x36a))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x285)](0x3)*0x64))+'%':this[_0x5efeea(0x285)](0x3);if(_0xbde680==='MEV')return _0x2f5c6a?String(Math['round'](this[_0x5efeea(0x285)](0x4)*0x64))+'%':this[_0x5efeea(0x285)](0x4);if(_0xbde680===_0x5efeea(0x5af))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x285)](0x5)*0x64))+'%':this[_0x5efeea(0x285)](0x5);if(_0xbde680==='CNT')return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x285)](0x6)*0x64))+'%':this[_0x5efeea(0x285)](0x6);if(_0xbde680===_0x5efeea(0x3fc))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x285)](0x7)*0x64))+'%':this[_0x5efeea(0x285)](0x7);if(_0xbde680===_0x5efeea(0x163))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x285)](0x8)*0x64))+'%':this[_0x5efeea(0x285)](0x8);if(_0xbde680==='TRG')return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x285)](0x9)*0x64))+'%':this[_0x5efeea(0x285)](0x9);if(_0xbde680===_0x5efeea(0x470))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x1f3)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0xbde680===_0x5efeea(0x643))return _0x2f5c6a?String(Math['round'](this[_0x5efeea(0x1f3)](0x1)*0x64))+'%':this[_0x5efeea(0x1f3)](0x1);if(_0xbde680===_0x5efeea(0x300))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x1f3)](0x2)*0x64))+'%':this[_0x5efeea(0x1f3)](0x2);if(_0xbde680===_0x5efeea(0x3a7))return _0x2f5c6a?String(Math['round'](this[_0x5efeea(0x1f3)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0xbde680===_0x5efeea(0x50a))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x1f3)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0xbde680===_0x5efeea(0x31b))return _0x2f5c6a?String(Math['round'](this['sparam'](0x5)*0x64))+'%':this['sparam'](0x5);if(_0xbde680===_0x5efeea(0x395))return _0x2f5c6a?String(Math['round'](this['sparam'](0x6)*0x64))+'%':this[_0x5efeea(0x1f3)](0x6);if(_0xbde680===_0x5efeea(0x535))return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x1f3)](0x7)*0x64))+'%':this[_0x5efeea(0x1f3)](0x7);if(_0xbde680==='FDR')return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this[_0x5efeea(0x1f3)](0x8)*0x64))+'%':this[_0x5efeea(0x1f3)](0x8);if(_0xbde680==='EXR')return _0x2f5c6a?String(Math[_0x5efeea(0x2f2)](this['sparam'](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x5efeea(0x4ec)][_0x5efeea(0x708)][_0xbde680]){const _0x3bd652=VisuMZ[_0x5efeea(0x4ec)][_0x5efeea(0x708)][_0xbde680],_0x5cd649=this[_0x3bd652];return VisuMZ[_0x5efeea(0x4ec)][_0x5efeea(0x6f8)][_0xbde680]===_0x5efeea(0x718)?_0x5cd649:_0x2f5c6a?String(Math[_0x5efeea(0x2f2)](_0x5cd649*0x64))+'%':_0x5cd649;}return'';},Game_BattlerBase['prototype'][_0x304852(0x517)]=function(){const _0x253709=_0x304852;return this[_0x253709(0x169)]()&&this[_0x253709(0x2a2)]<this[_0x253709(0x1f2)]*VisuMZ[_0x253709(0x4ec)]['Settings']['Param']['CrisisRate'];},Game_Battler[_0x304852(0x7ba)]['performMiss']=function(){const _0x49ac5b=_0x304852;SoundManager['playMiss'](),this[_0x49ac5b(0x345)]('evade');},VisuMZ[_0x304852(0x4ec)][_0x304852(0x2e9)]=Game_Actor[_0x304852(0x7ba)][_0x304852(0x34e)],Game_Actor[_0x304852(0x7ba)][_0x304852(0x34e)]=function(_0x526dd8){const _0x5507ec=_0x304852;if(this[_0x5507ec(0x303)]>0x63)return this['paramBaseAboveLevel99'](_0x526dd8);return VisuMZ[_0x5507ec(0x4ec)][_0x5507ec(0x2e9)][_0x5507ec(0x1d6)](this,_0x526dd8);},Game_Actor[_0x304852(0x7ba)]['paramBaseAboveLevel99']=function(_0x46bc68){const _0x803a49=_0x304852,_0x31b16a=this[_0x803a49(0x4b4)]()[_0x803a49(0x6e4)][_0x46bc68][0x63],_0x43647b=this[_0x803a49(0x4b4)]()[_0x803a49(0x6e4)][_0x46bc68][0x62];return _0x31b16a+(_0x31b16a-_0x43647b)*(this[_0x803a49(0x303)]-0x63);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x6ee)]=Game_Actor[_0x304852(0x7ba)][_0x304852(0x559)],Game_Actor[_0x304852(0x7ba)][_0x304852(0x559)]=function(_0x495fa5,_0x9cc08b){const _0x4ac43c=_0x304852;$gameTemp[_0x4ac43c(0x4e9)]=!![],VisuMZ[_0x4ac43c(0x4ec)][_0x4ac43c(0x6ee)][_0x4ac43c(0x1d6)](this,_0x495fa5,_0x9cc08b),$gameTemp[_0x4ac43c(0x4e9)]=undefined;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x40a)]=Game_Actor[_0x304852(0x7ba)]['levelUp'],Game_Actor[_0x304852(0x7ba)][_0x304852(0x393)]=function(){const _0x5d046f=_0x304852;VisuMZ['CoreEngine']['Game_Actor_levelUp'][_0x5d046f(0x1d6)](this);if(!$gameTemp[_0x5d046f(0x4e9)])this['levelUpRecovery']();},Game_Actor[_0x304852(0x7ba)]['levelUpRecovery']=function(){const _0x2ba4b8=_0x304852;this[_0x2ba4b8(0x602)]={};if(VisuMZ[_0x2ba4b8(0x4ec)][_0x2ba4b8(0x5dd)][_0x2ba4b8(0x409)][_0x2ba4b8(0x468)])this[_0x2ba4b8(0x2a2)]=this[_0x2ba4b8(0x1f2)];if(VisuMZ[_0x2ba4b8(0x4ec)]['Settings']['QoL'][_0x2ba4b8(0x274)])this['_mp']=this[_0x2ba4b8(0x486)];},Game_Actor[_0x304852(0x7ba)]['expRate']=function(){const _0x1333be=_0x304852;if(this[_0x1333be(0x705)]())return 0x1;const _0x5d6c52=this[_0x1333be(0x4cf)]()-this[_0x1333be(0x275)](),_0x17b68b=this[_0x1333be(0x7b8)]()-this['currentLevelExp']();return(_0x17b68b/_0x5d6c52)[_0x1333be(0x206)](0x0,0x1);},Game_Actor['prototype'][_0x304852(0x7ab)]=function(){const _0x55a8df=_0x304852,_0x4d914b=Game_Battler[_0x55a8df(0x7ba)][_0x55a8df(0x7ab)]['call'](this);for(const _0x542497 of this[_0x55a8df(0x437)]()){if('tmjMc'==='tmjMc')_0x542497&&_0x4d914b[_0x55a8df(0x700)](_0x542497);else{function _0x2e7ce6(){const _0x364598=_0x55a8df;_0x5beeb1['stencilFunc'](_0x4d09da['EQUAL'],0x0,~0x0),_0x46523d[_0x364598(0x433)](_0x3c9a44[_0x364598(0x78c)],_0x335654['KEEP'],_0x2fda06[_0x364598(0x78c)]),_0x7361dd[_0x364598(0x2d9)](_0x1e0c66),_0x826812[_0x364598(0x6f2)][_0x364598(0x3ba)](),_0x3b06d2[_0x364598(0x3f2)](),_0x50da1f[_0x364598(0x1e7)](_0x484ddc[_0x364598(0x2a7)],0x1,~0x0),_0x262412[_0x364598(0x433)](_0x21bfcd[_0x364598(0x16f)],_0x101baf['REPLACE'],_0x4308fe[_0x364598(0x16f)]),_0x5a2c6b['blendFunc'](_0x5c41ab[_0x364598(0x612)],_0x41e2d8[_0x364598(0x779)]),_0x7c36fb[_0x364598(0x2d9)](_0x31d58f),_0x22f66b[_0x364598(0x6f2)][_0x364598(0x3ba)](),_0x3ae5d0['blendFunc'](_0x1e61d6['ONE'],_0x2c5efa[_0x364598(0x459)]);}}}return _0x4d914b[_0x55a8df(0x700)](this[_0x55a8df(0x4b4)](),this['actor']()),_0x4d914b;},Object['defineProperty'](Game_Enemy[_0x304852(0x7ba)],_0x304852(0x303),{'get':function(){const _0x4337ca=_0x304852;return this[_0x4337ca(0x753)]();},'configurable':!![]}),Game_Enemy[_0x304852(0x7ba)][_0x304852(0x753)]=function(){const _0x4a708e=_0x304852;return this[_0x4a708e(0x43d)]()[_0x4a708e(0x303)];},Game_Enemy[_0x304852(0x7ba)][_0x304852(0x5f0)]=function(){const _0x32cf3e=_0x304852;if(!this['_repositioned']){this[_0x32cf3e(0x10c)]+=Math['round']((Graphics['height']-0x270)/0x2),this['_screenY']-=Math[_0x32cf3e(0x392)]((Graphics['height']-Graphics[_0x32cf3e(0x789)])/0x2);if($gameSystem[_0x32cf3e(0x25a)]()){if(_0x32cf3e(0x456)==='raJfb')this['_screenX']-=Math[_0x32cf3e(0x392)]((Graphics[_0x32cf3e(0x29e)]-Graphics[_0x32cf3e(0x277)])/0x2);else{function _0x4f848b(){const _0x51c1f7=_0x32cf3e;_0x24165d[_0x51c1f7(0x3f2)](),this[_0x51c1f7(0x5e0)]();}}}else{if('HgCrH'==='HgCrH')this[_0x32cf3e(0x2be)]+=Math[_0x32cf3e(0x2f2)]((Graphics[_0x32cf3e(0x277)]-0x330)/0x2);else{function _0x1bf1a7(){_0x2de219=_0x213b9a['concat'](_0x26a086);}}}}this[_0x32cf3e(0x7a1)]=!![];},Game_Party[_0x304852(0x7ba)][_0x304852(0x33b)]=function(){const _0x3f07ec=_0x304852;return VisuMZ[_0x3f07ec(0x4ec)][_0x3f07ec(0x5dd)][_0x3f07ec(0x736)][_0x3f07ec(0x1e5)];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x4ba)]=Game_Party[_0x304852(0x7ba)]['consumeItem'],Game_Party[_0x304852(0x7ba)]['consumeItem']=function(_0x55bc68){const _0xe4d27e=_0x304852;if(VisuMZ['CoreEngine']['Settings'][_0xe4d27e(0x409)][_0xe4d27e(0x28a)]&&DataManager['isKeyItem'](_0x55bc68))return;VisuMZ['CoreEngine']['Game_Party_consumeItem']['call'](this,_0x55bc68);},Game_Party[_0x304852(0x7ba)]['setupBattleTestItems']=function(){const _0x4b676b=_0x304852,_0x182e4d=VisuMZ[_0x4b676b(0x4ec)][_0x4b676b(0x5dd)]['QoL'],_0x1a3869=_0x182e4d[_0x4b676b(0x521)]??0x63;let _0x2539ab=[];if(_0x182e4d['BTestItems']??!![]){if(_0x4b676b(0x2bf)==='gmuQs')_0x2539ab=_0x2539ab['concat']($dataItems);else{function _0x3855fd(){const _0x394abf=_0x4b676b;_0x25cb7f[_0x394abf(0x4ec)]['Window_Selectable_processCursorMove'][_0x394abf(0x1d6)](this);}}}(_0x182e4d[_0x4b676b(0xec)]??!![])&&(_0x2539ab=_0x2539ab[_0x4b676b(0x378)]($dataWeapons));if(_0x182e4d[_0x4b676b(0x5d3)]??!![]){if(_0x4b676b(0x5c3)===_0x4b676b(0x5c3))_0x2539ab=_0x2539ab[_0x4b676b(0x378)]($dataArmors);else{function _0x557ee2(){const _0x403ac0=_0x4b676b;this[_0x403ac0(0x237)](_0x509339[_0x403ac0(0x4ec)][_0x403ac0(0x5dd)]['Gold']['GoldOverlap'],_0x9cfa54['x'],_0x33bcd5['y'],_0x19015f[_0x403ac0(0x29e)],_0x403ac0(0x348));}}}for(const _0x220176 of _0x2539ab){if(!_0x220176)continue;if(_0x220176[_0x4b676b(0x3a8)]['trim']()<=0x0)continue;if(_0x220176[_0x4b676b(0x3a8)][_0x4b676b(0x54d)](/-----/i))continue;this[_0x4b676b(0x625)](_0x220176,_0x1a3869);}},VisuMZ['CoreEngine'][_0x304852(0x351)]=Game_Troop[_0x304852(0x7ba)][_0x304852(0x578)],Game_Troop['prototype'][_0x304852(0x578)]=function(_0x1b6cfa){const _0x5752e0=_0x304852;$gameTemp[_0x5752e0(0x4ac)](),$gameTemp[_0x5752e0(0x35e)](_0x1b6cfa),VisuMZ['CoreEngine'][_0x5752e0(0x351)][_0x5752e0(0x1d6)](this,_0x1b6cfa);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x74e)]=Game_Map[_0x304852(0x7ba)][_0x304852(0x578)],Game_Map['prototype']['setup']=function(_0x4c8cc7){const _0x1c72b5=_0x304852;VisuMZ[_0x1c72b5(0x4ec)][_0x1c72b5(0x74e)]['call'](this,_0x4c8cc7),this['setupCoreEngine'](_0x4c8cc7);},Game_Map[_0x304852(0x7ba)]['setupCoreEngine']=function(){const _0x2e755b=_0x304852;this[_0x2e755b(0x159)]=VisuMZ[_0x2e755b(0x4ec)]['Settings'][_0x2e755b(0x409)][_0x2e755b(0x715)]||![];if($dataMap&&$dataMap[_0x2e755b(0x609)]){if($dataMap[_0x2e755b(0x609)][_0x2e755b(0x54d)](/<SHOW TILE SHADOWS>/i))this[_0x2e755b(0x159)]=![];if($dataMap[_0x2e755b(0x609)][_0x2e755b(0x54d)](/<HIDE TILE SHADOWS>/i))this[_0x2e755b(0x159)]=!![];}},Game_Map['prototype'][_0x304852(0xf0)]=function(){const _0x4f87df=_0x304852;if(this[_0x4f87df(0x159)]===undefined)this[_0x4f87df(0x51f)]();return this[_0x4f87df(0x159)];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x73d)]=Game_Character[_0x304852(0x7ba)][_0x304852(0x3f6)],Game_Character[_0x304852(0x7ba)][_0x304852(0x3f6)]=function(_0x5b21fd){const _0x533266=_0x304852;try{if('ptFDv'===_0x533266(0x503))VisuMZ[_0x533266(0x4ec)][_0x533266(0x73d)][_0x533266(0x1d6)](this,_0x5b21fd);else{function _0x1ef3d8(){return![];}}}catch(_0x5616eb){if($gameTemp[_0x533266(0xd0)]())console[_0x533266(0x3f8)](_0x5616eb);}},Game_Player[_0x304852(0x7ba)][_0x304852(0x413)]=function(){const _0xc2d7e7=_0x304852,_0x3c5068=$gameMap['encounterStep']();this[_0xc2d7e7(0x6f6)]=Math['randomInt'](_0x3c5068)+Math['randomInt'](_0x3c5068)+this['encounterStepsMinimum']();},Game_Player[_0x304852(0x7ba)][_0x304852(0x325)]=function(){const _0x20542a=_0x304852;if($dataMap&&$dataMap['note']&&$dataMap[_0x20542a(0x609)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i))return Number(RegExp['$1']);else{if(_0x20542a(0x6a5)===_0x20542a(0x6a5))return VisuMZ[_0x20542a(0x4ec)][_0x20542a(0x5dd)][_0x20542a(0x409)]['EncounterRateMinimum'];else{function _0xb36636(){const _0x1e031c=_0x20542a;_0x4e65da[_0x1e031c(0x1ad)]&&(this['_forcedBattleSys']='FTB');}}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x4a6)]=Game_Event[_0x304852(0x7ba)][_0x304852(0x32f)],Game_Event[_0x304852(0x7ba)][_0x304852(0x32f)]=function(_0x47d90e,_0x482702){const _0x5521f3=_0x304852;if(this[_0x5521f3(0x207)]()){if('zLamO'!==_0x5521f3(0x1b9))return this[_0x5521f3(0x3b8)](_0x47d90e,_0x482702);else{function _0x3fc022(){const _0x3c7e5d=_0x5521f3,_0x15bc5d=_0x7badb4(this[_0x3c7e5d(0x183)]['name']),_0x36b1c8=this[_0x3c7e5d(0x5ed)](_0x15bc5d);return _0x36b1c8?_0x36b1c8['SnapshotOpacity']:0xc0;}}}else{if(_0x5521f3(0x495)===_0x5521f3(0x6d7)){function _0x4df1cc(){const _0x4b5688=_0x5521f3;_0x459a16[_0x4b5688(0x59f)](!_0x10aa73['isSideView']());}}else return VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents'][_0x5521f3(0x1d6)](this,_0x47d90e,_0x482702);}},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x4d7ae3=_0x304852;return VisuMZ[_0x4d7ae3(0x4ec)]['Settings'][_0x4d7ae3(0x409)]['SmartEventCollisionPriority'];},Game_Event[_0x304852(0x7ba)][_0x304852(0x3b8)]=function(_0x23c829,_0x33c50c){const _0x3f3a60=_0x304852;if(!this[_0x3f3a60(0x31c)]())return![];else{const _0x5cfd22=$gameMap[_0x3f3a60(0x34a)](_0x23c829,_0x33c50c)[_0x3f3a60(0x4bc)](_0x5cc157=>_0x5cc157[_0x3f3a60(0x31c)]());return _0x5cfd22[_0x3f3a60(0x12a)]>0x0;}},VisuMZ[_0x304852(0x4ec)]['Game_Interpreter_command105']=Game_Interpreter[_0x304852(0x7ba)][_0x304852(0x1c3)],Game_Interpreter['prototype'][_0x304852(0x1c3)]=function(_0x512097){const _0x143560=_0x304852,_0x476b03=this[_0x143560(0x471)]();return _0x476b03['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x143560(0x283)](_0x476b03):VisuMZ[_0x143560(0x4ec)][_0x143560(0x603)][_0x143560(0x1d6)](this,_0x512097);},Game_Interpreter[_0x304852(0x7ba)]['getCombinedScrollingText']=function(){const _0x2d0719=_0x304852;let _0x2558cd='',_0x4406ed=this[_0x2d0719(0x1cb)]+0x1;while(this[_0x2d0719(0x216)][_0x4406ed]&&this['_list'][_0x4406ed][_0x2d0719(0x1a7)]===0x195){if(_0x2d0719(0x36b)!==_0x2d0719(0x2b8))_0x2558cd+=this[_0x2d0719(0x216)][_0x4406ed][_0x2d0719(0x4a5)][0x0]+'\x0a',_0x4406ed++;else{function _0x1f0ff8(){const _0x5dfb1d=_0x2d0719;return _0x279412[_0x5dfb1d(0x2d5)][_0x5dfb1d(0x458)]();}}}return _0x2558cd;},Game_Interpreter['prototype'][_0x304852(0x283)]=function(_0x247e13){const _0x5511fc=_0x304852;try{eval(_0x247e13);}catch(_0xf92267){$gameTemp['isPlaytest']()&&(console[_0x5511fc(0x3f8)](_0x5511fc(0x1de)),console['log'](_0xf92267));}return!![];},VisuMZ[_0x304852(0x4ec)]['Game_Interpreter_command111']=Game_Interpreter['prototype'][_0x304852(0x6cb)],Game_Interpreter['prototype'][_0x304852(0x6cb)]=function(_0x10043b){const _0x54331d=_0x304852;try{if(_0x54331d(0x5d8)===_0x54331d(0x698)){function _0x5a2fda(){const _0x29128e=_0x54331d;this[_0x29128e(0x657)](_0x4a0bd2);}}else VisuMZ[_0x54331d(0x4ec)][_0x54331d(0x601)][_0x54331d(0x1d6)](this,_0x10043b);}catch(_0x238188){if('PIFQB'!==_0x54331d(0x47b)){function _0xdc9333(){const _0x27badc=_0x54331d,_0x46c9db=_0x27badc(0x1a5);this[_0x27badc(0x270)]=this[_0x27badc(0x270)]||{};if(this['_colorCache'][_0x46c9db])return this[_0x27badc(0x270)][_0x46c9db];const _0x32186a=_0x221642[_0x27badc(0x4ec)][_0x27badc(0x5dd)][_0x27badc(0x6c8)][_0x27badc(0x555)];return this[_0x27badc(0x37a)](_0x46c9db,_0x32186a);}}else{if($gameTemp['isPlaytest']()){if(_0x54331d(0x25b)===_0x54331d(0x25b))console[_0x54331d(0x3f8)](_0x54331d(0x404)),console[_0x54331d(0x3f8)](_0x238188);else{function _0x902d59(){const _0x103db8=_0x54331d;if(_0x17b55b[_0x103db8(0xd0)]())_0x2c1067[_0x103db8(0x3f8)](_0x49a07a);}}}this[_0x54331d(0x750)]();}}return!![];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x173)]=Game_Interpreter[_0x304852(0x7ba)][_0x304852(0x610)],Game_Interpreter[_0x304852(0x7ba)]['command122']=function(_0x4b3eda){const _0x1bc248=_0x304852;try{VisuMZ[_0x1bc248(0x4ec)]['Game_Interpreter_command122'][_0x1bc248(0x1d6)](this,_0x4b3eda);}catch(_0x4dcddb){$gameTemp[_0x1bc248(0xd0)]()&&(console[_0x1bc248(0x3f8)](_0x1bc248(0x111)),console['log'](_0x4dcddb));}return!![];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x56d)]=Game_Interpreter[_0x304852(0x7ba)][_0x304852(0x2e1)],Game_Interpreter[_0x304852(0x7ba)][_0x304852(0x2e1)]=function(){const _0x217a78=_0x304852;try{VisuMZ['CoreEngine'][_0x217a78(0x56d)]['call'](this);}catch(_0x3a483b){if($gameTemp['isPlaytest']()){if('lDMUw'!==_0x217a78(0x3da))console[_0x217a78(0x3f8)](_0x217a78(0x605)),console[_0x217a78(0x3f8)](_0x3a483b);else{function _0x59355a(){const _0x18c072=_0x217a78,_0x902c76=_0x2722b4[_0x18c072(0x277)],_0x3a3b48=_0xb06614['prototype'][_0x18c072(0x262)](),_0x4c0dfc=0x0;let _0x3bd7cd=0x0;return this[_0x18c072(0x152)]()===_0x18c072(0x3c0)?_0x3bd7cd=0x0:_0x3bd7cd=_0x21d88e[_0x18c072(0x789)]-_0x3a3b48,new _0x2569f9(_0x4c0dfc,_0x3bd7cd,_0x902c76,_0x3a3b48);}}}}return!![];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x1d2)]=Game_Interpreter[_0x304852(0x7ba)][_0x304852(0x3ee)],Game_Interpreter['prototype'][_0x304852(0x3ee)]=function(_0x1bb282){const _0x119f38=_0x304852;return $gameTemp[_0x119f38(0x36d)](this),VisuMZ['CoreEngine'][_0x119f38(0x1d2)][_0x119f38(0x1d6)](this,_0x1bb282);},Scene_Base[_0x304852(0x7ba)]['fadeSpeed']=function(){const _0x4b5745=_0x304852;return VisuMZ[_0x4b5745(0x4ec)]['Settings']['UI'][_0x4b5745(0x453)];},Scene_Base[_0x304852(0x7ba)][_0x304852(0x1a6)]=function(){const _0x387e33=_0x304852;return VisuMZ[_0x387e33(0x4ec)][_0x387e33(0x5dd)]['UI'][_0x387e33(0x624)];},Scene_Base[_0x304852(0x7ba)][_0x304852(0x377)]=function(){const _0x262426=_0x304852;return VisuMZ[_0x262426(0x4ec)][_0x262426(0x5dd)]['UI'][_0x262426(0x6de)];},Scene_Base[_0x304852(0x7ba)][_0x304852(0x3e8)]=function(){const _0x8b9258=_0x304852;return VisuMZ[_0x8b9258(0x4ec)][_0x8b9258(0x5dd)]['UI'][_0x8b9258(0x784)];},Scene_Base[_0x304852(0x7ba)]['mainCommandWidth']=function(){const _0x2a4a8e=_0x304852;return VisuMZ[_0x2a4a8e(0x4ec)][_0x2a4a8e(0x5dd)]['UI'][_0x2a4a8e(0x485)];},Scene_Base['prototype'][_0x304852(0x2d2)]=function(){const _0x5d27c4=_0x304852;return VisuMZ[_0x5d27c4(0x4ec)][_0x5d27c4(0x5dd)]['UI'][_0x5d27c4(0x4fd)];},Scene_Base['prototype'][_0x304852(0x458)]=function(){const _0x3d0287=_0x304852;return VisuMZ[_0x3d0287(0x4ec)][_0x3d0287(0x5dd)][_0x3d0287(0x709)][_0x3d0287(0x5b2)];},VisuMZ['CoreEngine'][_0x304852(0x14f)]=Scene_Base['prototype'][_0x304852(0x629)],Scene_Base[_0x304852(0x7ba)]['createWindowLayer']=function(){const _0x44636d=_0x304852;VisuMZ[_0x44636d(0x4ec)]['Scene_Base_createWindowLayer'][_0x44636d(0x1d6)](this),this[_0x44636d(0x4f2)](),this[_0x44636d(0x626)]['x']=Math[_0x44636d(0x2f2)](this[_0x44636d(0x626)]['x']),this[_0x44636d(0x626)]['y']=Math[_0x44636d(0x2f2)](this['_windowLayer']['y']);},Scene_Base[_0x304852(0x7ba)][_0x304852(0x4f2)]=function(){},Scene_Base[_0x304852(0x7ba)][_0x304852(0x227)]=function(){const _0x3beb8a=_0x304852;return TextManager['getInputMultiButtonStrings']('pageup',_0x3beb8a(0x16d));},Scene_Base[_0x304852(0x7ba)][_0x304852(0x743)]=function(){const _0x50e4d5=_0x304852;return TextManager[_0x50e4d5(0x3dc)]('tab');},Scene_Base[_0x304852(0x7ba)][_0x304852(0x4e7)]=function(){const _0x50ab4d=_0x304852;return TextManager[_0x50ab4d(0x3dc)](_0x50ab4d(0x4b6));},Scene_Base['prototype'][_0x304852(0x66e)]=function(){const _0x3449dd=_0x304852;return TextManager[_0x3449dd(0x3dc)]('ok');},Scene_Base[_0x304852(0x7ba)][_0x304852(0x10d)]=function(){const _0x1dd5cf=_0x304852;return TextManager[_0x1dd5cf(0x3dc)]('cancel');},Scene_Base[_0x304852(0x7ba)][_0x304852(0x75d)]=function(){const _0x5b24aa=_0x304852;return this['_pageupButton']&&this[_0x5b24aa(0x6e2)][_0x5b24aa(0x1da)]?TextManager[_0x5b24aa(0x236)]:'';},Scene_Base[_0x304852(0x7ba)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x304852(0x7ba)][_0x304852(0x776)]=function(){return'';},Scene_Base[_0x304852(0x7ba)][_0x304852(0x318)]=function(){const _0xc96146=_0x304852;return TextManager[_0xc96146(0x701)];},Scene_Base[_0x304852(0x7ba)][_0x304852(0x445)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x304852(0x7ba)][_0x304852(0x57e)]=function(){return 0x0;},Scene_Base['prototype'][_0x304852(0x271)]=function(){return 0x0;},Scene_Base[_0x304852(0x7ba)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base['prototype'][_0x304852(0x306)]=function(){return 0x0;},Scene_Base[_0x304852(0x7ba)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x68a)]=Scene_Boot[_0x304852(0x7ba)][_0x304852(0x353)],Scene_Boot[_0x304852(0x7ba)]['loadSystemImages']=function(){const _0x5b6342=_0x304852;VisuMZ[_0x5b6342(0x4ec)][_0x5b6342(0x68a)]['call'](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x304852(0x7ba)][_0x304852(0x62d)]=function(){const _0x2995e8=_0x304852,_0x14b631=['animations','battlebacks1','battlebacks2',_0x2995e8(0x18d),_0x2995e8(0x543),_0x2995e8(0xbe),'parallaxes',_0x2995e8(0x4ad),_0x2995e8(0x161),_0x2995e8(0x4f4),_0x2995e8(0x72b),'tilesets',_0x2995e8(0x253),_0x2995e8(0x11a)];for(const _0x388229 of _0x14b631){const _0x3c48be=VisuMZ[_0x2995e8(0x4ec)][_0x2995e8(0x5dd)]['ImgLoad'][_0x388229],_0x8fce39=_0x2995e8(0x7ad)[_0x2995e8(0x6be)](_0x388229);for(const _0x287a4a of _0x3c48be){ImageManager[_0x2995e8(0x712)](_0x8fce39,_0x287a4a);}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x73f)]=Scene_Boot[_0x304852(0x7ba)][_0x304852(0x3af)],Scene_Boot[_0x304852(0x7ba)][_0x304852(0x3af)]=function(){const _0x5c7f8f=_0x304852;if(Utils[_0x5c7f8f(0x7b9)]('test')&&VisuMZ[_0x5c7f8f(0x4ec)][_0x5c7f8f(0x5dd)]['QoL'][_0x5c7f8f(0x493)])this['startAutoNewGame']();else{if(_0x5c7f8f(0x4c5)==='tNEBj'){function _0x2f4954(){const _0x1bbca0=_0x5c7f8f;return _0x28b293[_0x1bbca0(0x63a)][_0x1bbca0(0x263)][_0x1bbca0(0x1d6)](this);}}else VisuMZ[_0x5c7f8f(0x4ec)]['Scene_Boot_startNormalGame']['call'](this);}},Scene_Boot['prototype']['startAutoNewGame']=function(){const _0x5b0335=_0x304852;DataManager[_0x5b0335(0x4de)](),SceneManager[_0x5b0335(0xde)](Scene_Map);},Scene_Boot['prototype'][_0x304852(0x1c6)]=function(){const _0x151329=_0x304852,_0x1ecfc1=$dataSystem['advanced'][_0x151329(0x187)],_0x402bc4=$dataSystem[_0x151329(0xf4)]['uiAreaHeight'],_0x46b75a=VisuMZ['CoreEngine']['Settings']['UI'][_0x151329(0x55e)];Graphics['boxWidth']=_0x1ecfc1-_0x46b75a*0x2,Graphics[_0x151329(0x789)]=_0x402bc4-_0x46b75a*0x2,this[_0x151329(0x5fc)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x226)]=Scene_Boot[_0x304852(0x7ba)][_0x304852(0x50e)],Scene_Boot[_0x304852(0x7ba)][_0x304852(0x50e)]=function(){const _0x33e4b2=_0x304852;if(this[_0x33e4b2(0x1fd)]())this[_0x33e4b2(0x1d7)]();else{if(_0x33e4b2(0x35d)===_0x33e4b2(0x35d))VisuMZ['CoreEngine'][_0x33e4b2(0x226)][_0x33e4b2(0x1d6)](this);else{function _0x1a4a4f(){const _0x1c7d89=_0x33e4b2,_0x354b7b=this[_0x1c7d89(0x4b4)]()[_0x1c7d89(0x6e4)][_0x4a95d5][0x63],_0x210947=this[_0x1c7d89(0x4b4)]()[_0x1c7d89(0x6e4)][_0x41cd1c][0x62];return _0x354b7b+(_0x354b7b-_0x210947)*(this[_0x1c7d89(0x303)]-0x63);}}}},Scene_Boot[_0x304852(0x7ba)][_0x304852(0x1fd)]=function(){const _0x297342=_0x304852;if(Scene_Title[_0x297342(0x3ec)]==='')return![];if(Scene_Title['subtitle']===_0x297342(0x650))return![];if(Scene_Title[_0x297342(0x639)]==='')return![];if(Scene_Title[_0x297342(0x639)]===_0x297342(0x3de))return![];return!![];},Scene_Boot['prototype'][_0x304852(0x1d7)]=function(){const _0x35232c=_0x304852,_0x4835bf=$dataSystem[_0x35232c(0x3d1)],_0x19160b=Scene_Title[_0x35232c(0x3ec)]||'',_0x468d87=Scene_Title[_0x35232c(0x639)]||'',_0x19f51f=VisuMZ['CoreEngine'][_0x35232c(0x5dd)]['MenuLayout'][_0x35232c(0x44b)]['DocumentTitleFmt'],_0x1fbe78=_0x19f51f[_0x35232c(0x6be)](_0x4835bf,_0x19160b,_0x468d87);document[_0x35232c(0x638)]=_0x1fbe78;},Scene_Boot[_0x304852(0x7ba)][_0x304852(0x5fc)]=function(){const _0x5c4a8c=_0x304852;if(VisuMZ[_0x5c4a8c(0x4ec)][_0x5c4a8c(0x5dd)]['UI']['SideButtons']){const _0x4be471=Graphics[_0x5c4a8c(0x29e)]-Graphics[_0x5c4a8c(0x277)]-VisuMZ['CoreEngine'][_0x5c4a8c(0x5dd)]['UI']['BoxMargin']*0x2,_0x46be50=Sprite_Button[_0x5c4a8c(0x7ba)]['blockWidth'][_0x5c4a8c(0x1d6)](this)*0x4;if(_0x4be471>=_0x46be50)SceneManager['setSideButtonLayout'](!![]);}},Scene_Title[_0x304852(0x3ec)]=VisuMZ['CoreEngine'][_0x304852(0x5dd)][_0x304852(0x369)]['Title'][_0x304852(0x650)],Scene_Title[_0x304852(0x639)]=VisuMZ['CoreEngine']['Settings'][_0x304852(0x369)][_0x304852(0x44b)][_0x304852(0x1a9)],Scene_Title['pictureButtons']=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x6a2)],VisuMZ[_0x304852(0x4ec)][_0x304852(0x666)]=Scene_Title[_0x304852(0x7ba)]['drawGameTitle'],Scene_Title['prototype'][_0x304852(0x3c7)]=function(){const _0x2067f5=_0x304852;VisuMZ[_0x2067f5(0x4ec)][_0x2067f5(0x5dd)][_0x2067f5(0x369)][_0x2067f5(0x44b)]['drawGameTitle'][_0x2067f5(0x1d6)](this);if(Scene_Title[_0x2067f5(0x3ec)]!==''&&Scene_Title[_0x2067f5(0x3ec)]!==_0x2067f5(0x650))this[_0x2067f5(0x336)]();if(Scene_Title[_0x2067f5(0x639)]!==''&&Scene_Title[_0x2067f5(0x639)]!==_0x2067f5(0x3de))this[_0x2067f5(0x147)]();},Scene_Title[_0x304852(0x7ba)]['drawGameSubtitle']=function(){const _0x2f36a5=_0x304852;VisuMZ['CoreEngine'][_0x2f36a5(0x5dd)][_0x2f36a5(0x369)]['Title'][_0x2f36a5(0x336)][_0x2f36a5(0x1d6)](this);},Scene_Title[_0x304852(0x7ba)]['drawGameVersion']=function(){const _0x490f88=_0x304852;VisuMZ[_0x490f88(0x4ec)][_0x490f88(0x5dd)]['MenuLayout']['Title']['drawGameVersion'][_0x490f88(0x1d6)](this);},Scene_Title[_0x304852(0x7ba)][_0x304852(0x75e)]=function(){const _0x4cb9ee=_0x304852;this[_0x4cb9ee(0x33c)]();const _0x3ba10b=$dataSystem[_0x4cb9ee(0x56e)]['background'],_0x1ac661=this[_0x4cb9ee(0xc0)]();this['_commandWindow']=new Window_TitleCommand(_0x1ac661),this[_0x4cb9ee(0x17b)][_0x4cb9ee(0x686)](_0x3ba10b);const _0x197cad=this['commandWindowRect']();this['_commandWindow'][_0x4cb9ee(0x6ef)](_0x197cad['x'],_0x197cad['y'],_0x197cad['width'],_0x197cad[_0x4cb9ee(0x1d3)]),this['addWindow'](this[_0x4cb9ee(0x17b)]);},Scene_Title['prototype'][_0x304852(0x660)]=function(){const _0x3a07fc=_0x304852;return this[_0x3a07fc(0x17b)]?this['_commandWindow'][_0x3a07fc(0x334)]():VisuMZ[_0x3a07fc(0x4ec)][_0x3a07fc(0x5dd)][_0x3a07fc(0x5bd)][_0x3a07fc(0x12a)];},Scene_Title['prototype'][_0x304852(0xc0)]=function(){const _0x44ced7=_0x304852;return VisuMZ[_0x44ced7(0x4ec)][_0x44ced7(0x5dd)][_0x44ced7(0x369)]['Title'][_0x44ced7(0x50d)][_0x44ced7(0x1d6)](this);},Scene_Title[_0x304852(0x7ba)][_0x304852(0x33c)]=function(){const _0x57fbaa=_0x304852;for(const _0x423d30 of Scene_Title[_0x57fbaa(0x566)]){if(_0x57fbaa(0x26e)!=='GfgEq'){const _0x4dd661=new Sprite_TitlePictureButton(_0x423d30);this[_0x57fbaa(0x5a2)](_0x4dd661);}else{function _0x238a0e(){const _0x439e99=_0x57fbaa;this[_0x439e99(0x17b)]&&this[_0x439e99(0x17b)][_0x439e99(0x686)](_0x30a041['layoutSettings'][_0x439e99(0x354)]),this[_0x439e99(0x3dd)]&&this[_0x439e99(0x3dd)][_0x439e99(0x686)](_0x34e996[_0x439e99(0x63a)][_0x439e99(0x683)]),this[_0x439e99(0x15b)]&&this[_0x439e99(0x15b)][_0x439e99(0x686)](_0x14c732['layoutSettings'][_0x439e99(0x572)]);}}}},VisuMZ['CoreEngine'][_0x304852(0x3b0)]=Scene_Map['prototype'][_0x304852(0x1b6)],Scene_Map[_0x304852(0x7ba)][_0x304852(0x1b6)]=function(){const _0x20728b=_0x304852;VisuMZ[_0x20728b(0x4ec)]['Scene_Map_initialize'][_0x20728b(0x1d6)](this),$gameTemp[_0x20728b(0x4ac)]();},VisuMZ['CoreEngine'][_0x304852(0x51d)]=Scene_Map[_0x304852(0x7ba)][_0x304852(0x564)],Scene_Map['prototype']['updateMainMultiply']=function(){const _0x40a8b5=_0x304852;VisuMZ[_0x40a8b5(0x4ec)][_0x40a8b5(0x51d)]['call'](this);if($gameTemp[_0x40a8b5(0x4c8)]&&!$gameMessage[_0x40a8b5(0x4c9)]()){if('uqIrZ'===_0x40a8b5(0x793))this[_0x40a8b5(0x723)](),SceneManager[_0x40a8b5(0xc1)]();else{function _0x2b6269(){const _0x5e837e=_0x40a8b5;return _0x20a94c[_0x5e837e(0x3dc)]('tab');}}}},Scene_Map[_0x304852(0x7ba)][_0x304852(0x2b2)]=function(){const _0x21d192=_0x304852;Scene_Message['prototype'][_0x21d192(0x2b2)][_0x21d192(0x1d6)](this),!SceneManager[_0x21d192(0x108)](Scene_Battle)&&(this[_0x21d192(0x3bf)][_0x21d192(0x1c2)](),this[_0x21d192(0x575)][_0x21d192(0x19f)](),this[_0x21d192(0x626)]['visible']=![],SceneManager[_0x21d192(0x141)]()),$gameScreen['clearZoom']();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x65a)]=Scene_Map[_0x304852(0x7ba)]['createMenuButton'],Scene_Map[_0x304852(0x7ba)][_0x304852(0x20c)]=function(){const _0x133268=_0x304852;VisuMZ[_0x133268(0x4ec)][_0x133268(0x65a)][_0x133268(0x1d6)](this),SceneManager[_0x133268(0x594)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x304852(0x7ba)][_0x304852(0xcd)]=function(){const _0x2874d1=_0x304852;this['_menuButton']['x']=Graphics[_0x2874d1(0x277)]+0x4;},VisuMZ[_0x304852(0x4ec)]['Scene_Map_updateScene']=Scene_Map[_0x304852(0x7ba)][_0x304852(0x5ec)],Scene_Map[_0x304852(0x7ba)][_0x304852(0x5ec)]=function(){const _0x1ab7d2=_0x304852;VisuMZ[_0x1ab7d2(0x4ec)][_0x1ab7d2(0x77c)]['call'](this),this[_0x1ab7d2(0x257)]();},Scene_Map[_0x304852(0x7ba)][_0x304852(0x257)]=function(){const _0x340b6e=_0x304852;if(Input[_0x340b6e(0x558)](_0x340b6e(0x44c))){if('XFSds'!==_0x340b6e(0x560)){function _0x1fbe8c(){_0x2fb839['loadBitmap'](_0x18b125,_0x5b0964);}}else ConfigManager[_0x340b6e(0x687)]=!ConfigManager[_0x340b6e(0x687)],ConfigManager[_0x340b6e(0x538)]();}},VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x72a)],Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x72a)]=function(){const _0x8fec19=_0x304852;let _0x1d2eb9=0x0;return SceneManager[_0x8fec19(0x530)]()?_0x1d2eb9=this[_0x8fec19(0x22f)]():_0x1d2eb9=VisuMZ['CoreEngine'][_0x8fec19(0x6b2)][_0x8fec19(0x1d6)](this),this[_0x8fec19(0x321)]()&&this['getButtonAssistLocation']()===_0x8fec19(0x3c0)&&(_0x1d2eb9+=Window_ButtonAssist[_0x8fec19(0x7ba)][_0x8fec19(0x262)]()),_0x1d2eb9;},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x22f)]=function(){const _0x244d0e=_0x304852;return this[_0x244d0e(0x1a6)]()?this[_0x244d0e(0x49f)]():0x0;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x254)]=Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0xe0)],Scene_MenuBase['prototype'][_0x304852(0xe0)]=function(){const _0x4ae68b=_0x304852;return SceneManager[_0x4ae68b(0x530)]()?this[_0x4ae68b(0x6e9)]():VisuMZ[_0x4ae68b(0x4ec)]['Scene_MenuBase_mainAreaTop']['call'](this);},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x6e9)]=function(){const _0x26ac4e=_0x304852;if(!this[_0x26ac4e(0x1a6)]()){if(_0x26ac4e(0x5e5)===_0x26ac4e(0x5e5))return this[_0x26ac4e(0x69e)]();else{function _0x4588ac(){const _0x432d6e=_0x26ac4e;return this[_0x432d6e(0x207)]()?this['checkSmartEventCollision'](_0x3e0096,_0x577a93):_0x402ef1[_0x432d6e(0x4ec)][_0x432d6e(0x4a6)][_0x432d6e(0x1d6)](this,_0x445522,_0x4221f3);}}}else return 0x0;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x483)]=Scene_MenuBase['prototype'][_0x304852(0xf7)],Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0xf7)]=function(){const _0x26bbac=_0x304852;let _0x511ab5=0x0;if(SceneManager[_0x26bbac(0x530)]())_0x511ab5=this[_0x26bbac(0x4db)]();else{if('TBBKX'!==_0x26bbac(0x373)){function _0x2a53d6(){const _0x32c1a1=_0x26bbac,_0x1ec790=_0x2f1709[_0x32c1a1(0xf4)]['uiAreaWidth'],_0x41e491=_0x51b7ca[_0x32c1a1(0xf4)][_0x32c1a1(0x19e)],_0x56c43d=_0x18534e[_0x32c1a1(0x4ec)][_0x32c1a1(0x5dd)]['UI'][_0x32c1a1(0x55e)];_0xb6c0b5[_0x32c1a1(0x277)]=_0x1ec790-_0x56c43d*0x2,_0x46749e['boxHeight']=_0x41e491-_0x56c43d*0x2,this[_0x32c1a1(0x5fc)]();}}else _0x511ab5=VisuMZ['CoreEngine'][_0x26bbac(0x483)]['call'](this);}return this[_0x26bbac(0x321)]()&&this[_0x26bbac(0x152)]()!==_0x26bbac(0x371)&&(_0x511ab5-=Window_ButtonAssist[_0x26bbac(0x7ba)][_0x26bbac(0x262)]()),_0x511ab5;},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x4db)]=function(){const _0x418f1d=_0x304852;return Graphics[_0x418f1d(0x789)]-this[_0x418f1d(0x751)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x7a5)]=Scene_MenuBase['prototype']['createBackground'],Scene_MenuBase['prototype'][_0x304852(0x455)]=function(){const _0x17df17=_0x304852;this[_0x17df17(0x5a3)]=new PIXI[(_0x17df17(0x329))][(_0x17df17(0x44e))](clamp=!![]),this[_0x17df17(0x5be)]=new Sprite(),this[_0x17df17(0x5be)]['bitmap']=SceneManager[_0x17df17(0x4f8)](),this[_0x17df17(0x5be)][_0x17df17(0x329)]=[this[_0x17df17(0x5a3)]],this[_0x17df17(0x5a2)](this[_0x17df17(0x5be)]),this['setBackgroundOpacity'](0xc0),this[_0x17df17(0x748)](this[_0x17df17(0x16a)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x16a)]=function(){const _0x2dc303=_0x304852,_0x2ba6b4=String(this[_0x2dc303(0x183)]['name']),_0x130aae=this[_0x2dc303(0x5ed)](_0x2ba6b4);return _0x130aae?_0x130aae[_0x2dc303(0x25d)]:0xc0;},Scene_MenuBase[_0x304852(0x7ba)]['createCustomBackgroundImages']=function(){const _0x387267=_0x304852,_0x5176b0=String(this[_0x387267(0x183)][_0x387267(0x3a8)]),_0x5953d8=this[_0x387267(0x5ed)](_0x5176b0);_0x5953d8&&(_0x5953d8[_0x387267(0x692)]!==''||_0x5953d8[_0x387267(0x781)]!=='')&&(this[_0x387267(0x26a)]=new Sprite(ImageManager[_0x387267(0x6c1)](_0x5953d8[_0x387267(0x692)])),this[_0x387267(0x76d)]=new Sprite(ImageManager[_0x387267(0x469)](_0x5953d8[_0x387267(0x781)])),this['addChild'](this[_0x387267(0x26a)]),this['addChild'](this['_backSprite2']),this[_0x387267(0x26a)]['bitmap'][_0x387267(0x390)](this[_0x387267(0x5a9)][_0x387267(0x6d1)](this,this[_0x387267(0x26a)])),this['_backSprite2'][_0x387267(0x525)]['addLoadListener'](this['adjustSprite'][_0x387267(0x6d1)](this,this[_0x387267(0x76d)])));},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x5ed)]=function(_0x22d085){const _0x28a681=_0x304852;return VisuMZ[_0x28a681(0x4ec)]['Settings'][_0x28a681(0x201)][_0x22d085]||VisuMZ[_0x28a681(0x4ec)][_0x28a681(0x5dd)]['MenuBg'][_0x28a681(0x290)];},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x5a9)]=function(_0x3c308a){const _0x382ed7=_0x304852;this[_0x382ed7(0x106)](_0x3c308a),this[_0x382ed7(0x577)](_0x3c308a);},VisuMZ[_0x304852(0x4ec)]['Scene_MenuBase_createCancelButton']=Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x69a)],Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x69a)]=function(){const _0x22b264=_0x304852;VisuMZ['CoreEngine'][_0x22b264(0x735)][_0x22b264(0x1d6)](this);if(SceneManager[_0x22b264(0x594)]()){if('jJciZ'==='jrRBK'){function _0x4e010e(){const _0x3a285a=_0x22b264;switch(_0x30bc9c[_0x3a285a(0x4ec)][_0x3a285a(0x5dd)][_0x3a285a(0x409)][_0x3a285a(0x423)]){case _0x3a285a(0x14a):return!![];case'normal':return![];default:return _0xc6b003[_0x3a285a(0x4ec)][_0x3a285a(0x78b)][_0x3a285a(0x1d6)](this);}}}else this[_0x22b264(0x727)]();}},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x727)]=function(){const _0x1f4255=_0x304852;this[_0x1f4255(0x208)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x304852(0x4ec)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase['prototype'][_0x304852(0x504)],Scene_MenuBase['prototype'][_0x304852(0x504)]=function(){const _0x1354b9=_0x304852;VisuMZ['CoreEngine'][_0x1354b9(0x29d)]['call'](this),SceneManager['isSideButtonLayout']()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase['prototype'][_0x304852(0x3c8)]=function(){const _0x39a437=_0x304852;this['_pageupButton']['x']=-0x1*(this[_0x39a437(0x6e2)][_0x39a437(0x29e)]+this[_0x39a437(0x27e)][_0x39a437(0x29e)]+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x321)]=function(){const _0x3b00cd=_0x304852;return VisuMZ['CoreEngine']['Settings'][_0x3b00cd(0x627)]['Enable'];},Scene_MenuBase[_0x304852(0x7ba)]['getButtonAssistLocation']=function(){const _0x35f42c=_0x304852;return SceneManager[_0x35f42c(0x594)]()||SceneManager['areButtonsHidden']()?VisuMZ[_0x35f42c(0x4ec)][_0x35f42c(0x5dd)][_0x35f42c(0x627)][_0x35f42c(0x30d)]:_0x35f42c(0x371);},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x4f2)]=function(){const _0x348fce=_0x304852;if(!this['isMenuButtonAssistEnabled']())return;const _0x1c2788=this['buttonAssistWindowRect']();this[_0x348fce(0x11e)]=new Window_ButtonAssist(_0x1c2788),this[_0x348fce(0x6ca)](this[_0x348fce(0x11e)]);},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x717)]=function(){const _0x27dbce=_0x304852;if(this[_0x27dbce(0x152)]()===_0x27dbce(0x371)){if(_0x27dbce(0x71d)==='HsHYJ'){function _0x3dc180(){const _0x31f9f7=_0x27dbce;this[_0x31f9f7(0x602)]={},_0x4c78a9[_0x31f9f7(0x4ec)][_0x31f9f7(0x513)][_0x31f9f7(0x1d6)](this);}}else return this[_0x27dbce(0x49a)]();}else return this[_0x27dbce(0x292)]();},Scene_MenuBase[_0x304852(0x7ba)][_0x304852(0x49a)]=function(){const _0x437ba5=_0x304852,_0x1c58f5=ConfigManager[_0x437ba5(0x47c)]?(Sprite_Button[_0x437ba5(0x7ba)][_0x437ba5(0x4fe)]()+0x6)*0x2:0x0,_0x6531ec=this['buttonY'](),_0x5a9bf8=Graphics['boxWidth']-_0x1c58f5*0x2,_0x317775=this[_0x437ba5(0x2d2)]();return new Rectangle(_0x1c58f5,_0x6531ec,_0x5a9bf8,_0x317775);},Scene_MenuBase['prototype'][_0x304852(0x292)]=function(){const _0x27c1d4=_0x304852,_0x1ec5b8=Graphics[_0x27c1d4(0x277)],_0x1ee6c6=Window_ButtonAssist[_0x27c1d4(0x7ba)]['lineHeight'](),_0x25e08c=0x0;let _0x44d8ae=0x0;if(this['getButtonAssistLocation']()===_0x27c1d4(0x3c0)){if('kzWoD'===_0x27c1d4(0x12b)){function _0x15b1cd(){const _0x1473dc=_0x27c1d4;_0x49ee73[_0x1473dc(0x580)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x1473dc(0x664),'OK'];}}else _0x44d8ae=0x0;}else _0x44d8ae=Graphics[_0x27c1d4(0x789)]-_0x1ee6c6;return new Rectangle(_0x25e08c,_0x44d8ae,_0x1ec5b8,_0x1ee6c6);},Scene_Menu['layoutSettings']=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)]['MenuLayout'][_0x304852(0x59c)],VisuMZ[_0x304852(0x4ec)][_0x304852(0x2fc)]=Scene_Menu['prototype'][_0x304852(0x2b1)],Scene_Menu['prototype'][_0x304852(0x2b1)]=function(){const _0xbc14e5=_0x304852;VisuMZ['CoreEngine'][_0xbc14e5(0x2fc)][_0xbc14e5(0x1d6)](this),this[_0xbc14e5(0x246)]();},Scene_Menu['prototype'][_0x304852(0x246)]=function(){const _0x3e2422=_0x304852;if(this[_0x3e2422(0x17b)]){if(_0x3e2422(0x367)===_0x3e2422(0x367))this['_commandWindow'][_0x3e2422(0x686)](Scene_Menu[_0x3e2422(0x63a)][_0x3e2422(0x354)]);else{function _0x48f711(){const _0x2befea=_0x3e2422;this['_forcedBattleSys']=_0x2befea(0x775);}}}if(this[_0x3e2422(0x3dd)]){if('rFQsJ'===_0x3e2422(0x4a4))this['_goldWindow'][_0x3e2422(0x686)](Scene_Menu[_0x3e2422(0x63a)][_0x3e2422(0x683)]);else{function _0x365046(){return 0xc0;}}}this[_0x3e2422(0x15b)]&&this[_0x3e2422(0x15b)][_0x3e2422(0x686)](Scene_Menu[_0x3e2422(0x63a)][_0x3e2422(0x572)]);},Scene_Menu[_0x304852(0x7ba)]['commandWindowRect']=function(){const _0x25c081=_0x304852;return Scene_Menu['layoutSettings'][_0x25c081(0x50d)]['call'](this);},Scene_Menu[_0x304852(0x7ba)]['goldWindowRect']=function(){const _0xf2e0a2=_0x304852;return Scene_Menu['layoutSettings'][_0xf2e0a2(0x1a1)][_0xf2e0a2(0x1d6)](this);},Scene_Menu[_0x304852(0x7ba)][_0x304852(0x52d)]=function(){const _0x344221=_0x304852;return Scene_Menu['layoutSettings'][_0x344221(0x554)][_0x344221(0x1d6)](this);},Scene_Item[_0x304852(0x63a)]=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x369)][_0x304852(0x4c1)],VisuMZ[_0x304852(0x4ec)][_0x304852(0x763)]=Scene_Item[_0x304852(0x7ba)][_0x304852(0x2b1)],Scene_Item[_0x304852(0x7ba)]['create']=function(){const _0x4c9890=_0x304852;VisuMZ['CoreEngine']['Scene_Item_create'][_0x4c9890(0x1d6)](this),this[_0x4c9890(0x246)]();},Scene_Item[_0x304852(0x7ba)]['setCoreEngineUpdateWindowBg']=function(){const _0x27e420=_0x304852;this[_0x27e420(0x267)]&&this[_0x27e420(0x267)][_0x27e420(0x686)](Scene_Item[_0x27e420(0x63a)][_0x27e420(0x6ac)]);if(this[_0x27e420(0x691)]){if(_0x27e420(0x7a7)===_0x27e420(0x7a7))this['_categoryWindow']['setBackgroundType'](Scene_Item[_0x27e420(0x63a)]['CategoryBgType']);else{function _0x3b476a(){const _0x3d7549=_0x27e420;return _0xeadf7b[_0x3d7549(0x5c1)]()?_0x10f398[_0x3d7549(0x5c1)]()[_0x3d7549(0x6c4)](_0x100294):_0x54a870[_0x3d7549(0x7ba)][_0x3d7549(0x218)][_0x3d7549(0x1d6)](this,_0x4c8524);}}}this[_0x27e420(0x298)]&&this['_itemWindow'][_0x27e420(0x686)](Scene_Item[_0x27e420(0x63a)][_0x27e420(0x340)]),this[_0x27e420(0x77e)]&&this[_0x27e420(0x77e)]['setBackgroundType'](Scene_Item[_0x27e420(0x63a)]['ActorBgType']);},Scene_Item[_0x304852(0x7ba)][_0x304852(0x1f7)]=function(){const _0x244eb1=_0x304852;return Scene_Item[_0x244eb1(0x63a)]['HelpRect'][_0x244eb1(0x1d6)](this);},Scene_Item[_0x304852(0x7ba)][_0x304852(0x10f)]=function(){const _0x1d64d9=_0x304852;return Scene_Item[_0x1d64d9(0x63a)]['CategoryRect']['call'](this);},Scene_Item[_0x304852(0x7ba)][_0x304852(0x25c)]=function(){const _0x5ffe9c=_0x304852;return Scene_Item[_0x5ffe9c(0x63a)][_0x5ffe9c(0x3e1)][_0x5ffe9c(0x1d6)](this);},Scene_Item[_0x304852(0x7ba)]['actorWindowRect']=function(){const _0x56b9a3=_0x304852;return Scene_Item[_0x56b9a3(0x63a)][_0x56b9a3(0x61a)][_0x56b9a3(0x1d6)](this);},Scene_Skill[_0x304852(0x63a)]=VisuMZ[_0x304852(0x4ec)]['Settings'][_0x304852(0x369)][_0x304852(0x3d5)],VisuMZ[_0x304852(0x4ec)][_0x304852(0x5cf)]=Scene_Skill[_0x304852(0x7ba)]['create'],Scene_Skill['prototype'][_0x304852(0x2b1)]=function(){const _0x2fca96=_0x304852;VisuMZ[_0x2fca96(0x4ec)]['Scene_Skill_create'][_0x2fca96(0x1d6)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x304852(0x7ba)][_0x304852(0x246)]=function(){const _0x11c59e=_0x304852;if(this[_0x11c59e(0x267)]){if(_0x11c59e(0x734)!==_0x11c59e(0x640))this[_0x11c59e(0x267)][_0x11c59e(0x686)](Scene_Skill[_0x11c59e(0x63a)]['HelpBgType']);else{function _0x498b3d(){const _0x569358=_0x11c59e;for(const _0x3578c9 of this[_0x569358(0x126)]){!_0x3578c9[_0x569358(0x4cb)]()&&this[_0x569358(0x5d7)](_0x3578c9);}this['processFauxAnimationRequests']();}}}this[_0x11c59e(0x655)]&&this[_0x11c59e(0x655)][_0x11c59e(0x686)](Scene_Skill['layoutSettings'][_0x11c59e(0x50f)]);this[_0x11c59e(0x15b)]&&this[_0x11c59e(0x15b)][_0x11c59e(0x686)](Scene_Skill[_0x11c59e(0x63a)][_0x11c59e(0x572)]);this['_itemWindow']&&this[_0x11c59e(0x298)][_0x11c59e(0x686)](Scene_Skill[_0x11c59e(0x63a)][_0x11c59e(0x340)]);if(this[_0x11c59e(0x77e)]){if('iwkbh'!=='pUOCw')this[_0x11c59e(0x77e)][_0x11c59e(0x686)](Scene_Skill['layoutSettings'][_0x11c59e(0x50c)]);else{function _0x3e776c(){const _0x4e97fb=_0x11c59e;this[_0x4e97fb(0x545)](_0x2f0716[_0x4e97fb(0x609)]);}}}},Scene_Skill[_0x304852(0x7ba)][_0x304852(0x1f7)]=function(){const _0x190a7b=_0x304852;return Scene_Skill[_0x190a7b(0x63a)]['HelpRect'][_0x190a7b(0x1d6)](this);},Scene_Skill['prototype'][_0x304852(0x4ca)]=function(){const _0x1d17dc=_0x304852;return Scene_Skill[_0x1d17dc(0x63a)][_0x1d17dc(0xd9)][_0x1d17dc(0x1d6)](this);},Scene_Skill[_0x304852(0x7ba)][_0x304852(0x52d)]=function(){const _0x31c93a=_0x304852;return Scene_Skill[_0x31c93a(0x63a)][_0x31c93a(0x554)][_0x31c93a(0x1d6)](this);},Scene_Skill[_0x304852(0x7ba)][_0x304852(0x25c)]=function(){const _0x27f4df=_0x304852;return Scene_Skill[_0x27f4df(0x63a)][_0x27f4df(0x3e1)][_0x27f4df(0x1d6)](this);},Scene_Skill[_0x304852(0x7ba)][_0x304852(0x408)]=function(){const _0x34a360=_0x304852;return Scene_Skill[_0x34a360(0x63a)][_0x34a360(0x61a)][_0x34a360(0x1d6)](this);},Scene_Equip[_0x304852(0x63a)]=VisuMZ['CoreEngine'][_0x304852(0x5dd)]['MenuLayout']['EquipMenu'],VisuMZ['CoreEngine'][_0x304852(0x6bb)]=Scene_Equip[_0x304852(0x7ba)][_0x304852(0x2b1)],Scene_Equip[_0x304852(0x7ba)]['create']=function(){const _0x23126e=_0x304852;VisuMZ[_0x23126e(0x4ec)][_0x23126e(0x6bb)][_0x23126e(0x1d6)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x304852(0x7ba)][_0x304852(0x246)]=function(){const _0x5917fc=_0x304852;if(this[_0x5917fc(0x267)]){if(_0x5917fc(0x706)===_0x5917fc(0x706))this[_0x5917fc(0x267)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x5917fc(0x6ac)]);else{function _0x380aa9(){const _0x48399a=_0x5917fc;this[_0x48399a(0x655)]['setBackgroundType'](_0x548c00[_0x48399a(0x63a)][_0x48399a(0x50f)]);}}}this[_0x5917fc(0x15b)]&&this[_0x5917fc(0x15b)][_0x5917fc(0x686)](Scene_Equip[_0x5917fc(0x63a)][_0x5917fc(0x572)]),this[_0x5917fc(0x17b)]&&this['_commandWindow'][_0x5917fc(0x686)](Scene_Equip[_0x5917fc(0x63a)][_0x5917fc(0x354)]),this['_slotWindow']&&this[_0x5917fc(0x515)]['setBackgroundType'](Scene_Equip[_0x5917fc(0x63a)]['SlotBgType']),this[_0x5917fc(0x298)]&&this['_itemWindow'][_0x5917fc(0x686)](Scene_Equip['layoutSettings']['ItemBgType']);},Scene_Equip[_0x304852(0x7ba)][_0x304852(0x1f7)]=function(){const _0x2296ac=_0x304852;return Scene_Equip[_0x2296ac(0x63a)][_0x2296ac(0x637)][_0x2296ac(0x1d6)](this);},Scene_Equip['prototype']['statusWindowRect']=function(){const _0x1b8afa=_0x304852;return Scene_Equip[_0x1b8afa(0x63a)]['StatusRect'][_0x1b8afa(0x1d6)](this);},Scene_Equip[_0x304852(0x7ba)]['commandWindowRect']=function(){const _0x1a534a=_0x304852;return Scene_Equip[_0x1a534a(0x63a)][_0x1a534a(0x50d)][_0x1a534a(0x1d6)](this);},Scene_Equip[_0x304852(0x7ba)]['slotWindowRect']=function(){const _0x30c7a2=_0x304852;return Scene_Equip['layoutSettings']['SlotRect'][_0x30c7a2(0x1d6)](this);},Scene_Equip['prototype'][_0x304852(0x25c)]=function(){const _0x2f9cad=_0x304852;return Scene_Equip['layoutSettings'][_0x2f9cad(0x3e1)][_0x2f9cad(0x1d6)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x369)][_0x304852(0x3d0)],VisuMZ[_0x304852(0x4ec)][_0x304852(0x1ce)]=Scene_Status[_0x304852(0x7ba)][_0x304852(0x2b1)],Scene_Status[_0x304852(0x7ba)][_0x304852(0x2b1)]=function(){const _0x433f82=_0x304852;VisuMZ['CoreEngine'][_0x433f82(0x1ce)][_0x433f82(0x1d6)](this),this[_0x433f82(0x246)]();},Scene_Status['prototype'][_0x304852(0x246)]=function(){const _0x34a15f=_0x304852;if(this[_0x34a15f(0x6cd)]){if(_0x34a15f(0x21c)===_0x34a15f(0x501)){function _0x35b3a5(){const _0x366029=_0x34a15f,_0xc169f3=_0x366029(0x151);this[_0x366029(0x270)]=this[_0x366029(0x270)]||{};if(this['_colorCache'][_0xc169f3])return this['_colorCache'][_0xc169f3];const _0x72f8f2=_0x49e6fc[_0x366029(0x4ec)][_0x366029(0x5dd)][_0x366029(0x6c8)][_0x366029(0x259)];return this[_0x366029(0x37a)](_0xc169f3,_0x72f8f2);}}else this[_0x34a15f(0x6cd)][_0x34a15f(0x686)](Scene_Status[_0x34a15f(0x63a)]['ProfileBgType']);}if(this['_statusWindow']){if('kAFLi'===_0x34a15f(0x796)){function _0x247844(){const _0x3234e3=_0x34a15f;var _0x38dcd1=_0x51e8e9(_0x323144['$1']);if(_0x38dcd1===0x0)_0x38dcd1=_0x1cb694['MAX_SAFE_INTEGER'];_0x8ed247=_0x3b05a9[_0x3234e3(0x710)](_0x172c92,_0x38dcd1);}}else this[_0x34a15f(0x15b)][_0x34a15f(0x686)](Scene_Status[_0x34a15f(0x63a)][_0x34a15f(0x572)]);}if(this[_0x34a15f(0x2fb)]){if(_0x34a15f(0x5ff)!==_0x34a15f(0x129))this[_0x34a15f(0x2fb)][_0x34a15f(0x686)](Scene_Status[_0x34a15f(0x63a)][_0x34a15f(0x391)]);else{function _0x47b64d(){this['removeFauxAnimation'](_0x160b8c);}}}if(this['_statusEquipWindow']){if('eLjoi'!=='eLjoi'){function _0x320a8f(){const _0x377410=_0x34a15f;this[_0x377410(0x76b)]-=this[_0x377410(0x137)](),this['isClosed']()&&(this['_closing']=![]);}}else this[_0x34a15f(0x335)][_0x34a15f(0x686)](Scene_Status['layoutSettings'][_0x34a15f(0x474)]);}},Scene_Status[_0x304852(0x7ba)][_0x304852(0x5c9)]=function(){const _0x5d1e16=_0x304852;return Scene_Status[_0x5d1e16(0x63a)][_0x5d1e16(0x5a1)][_0x5d1e16(0x1d6)](this);},Scene_Status[_0x304852(0x7ba)]['statusWindowRect']=function(){const _0x3ea9b0=_0x304852;return Scene_Status[_0x3ea9b0(0x63a)]['StatusRect'][_0x3ea9b0(0x1d6)](this);},Scene_Status[_0x304852(0x7ba)][_0x304852(0x308)]=function(){const _0x28ae05=_0x304852;return Scene_Status['layoutSettings']['StatusParamsRect'][_0x28ae05(0x1d6)](this);},Scene_Status[_0x304852(0x7ba)]['statusEquipWindowRect']=function(){const _0x1a49ec=_0x304852;return Scene_Status[_0x1a49ec(0x63a)]['StatusEquipRect'][_0x1a49ec(0x1d6)](this);},Scene_Options[_0x304852(0x63a)]=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x369)][_0x304852(0x6fc)],VisuMZ[_0x304852(0x4ec)][_0x304852(0x23d)]=Scene_Options[_0x304852(0x7ba)][_0x304852(0x2b1)],Scene_Options[_0x304852(0x7ba)]['create']=function(){const _0x337d01=_0x304852;VisuMZ[_0x337d01(0x4ec)][_0x337d01(0x23d)]['call'](this),this[_0x337d01(0x246)]();},Scene_Options[_0x304852(0x7ba)][_0x304852(0x246)]=function(){const _0x2dbb14=_0x304852;if(this[_0x2dbb14(0x4e0)]){if(_0x2dbb14(0x5b3)!==_0x2dbb14(0x5b3)){function _0x240420(){const _0x1dd37b=_0x2dbb14;return _0x8a60aa[_0x1dd37b(0x4ec)][_0x1dd37b(0x4a7)][_0x1dd37b(0x1d6)](this);}}else this[_0x2dbb14(0x4e0)]['setBackgroundType'](Scene_Options['layoutSettings'][_0x2dbb14(0x6e3)]);}},Scene_Options[_0x304852(0x7ba)][_0x304852(0x5e2)]=function(){const _0x31a817=_0x304852;return Scene_Options[_0x31a817(0x63a)][_0x31a817(0x628)][_0x31a817(0x1d6)](this);},Scene_Save[_0x304852(0x63a)]=VisuMZ[_0x304852(0x4ec)]['Settings'][_0x304852(0x369)]['SaveMenu'],Scene_Save[_0x304852(0x7ba)][_0x304852(0x2b1)]=function(){const _0x1d2fd9=_0x304852;Scene_File[_0x1d2fd9(0x7ba)][_0x1d2fd9(0x2b1)]['call'](this),this[_0x1d2fd9(0x246)]();},Scene_Save['prototype'][_0x304852(0x246)]=function(){const _0x87fa5e=_0x304852;this[_0x87fa5e(0x267)]&&this[_0x87fa5e(0x267)][_0x87fa5e(0x686)](Scene_Save[_0x87fa5e(0x63a)][_0x87fa5e(0x6ac)]),this[_0x87fa5e(0x75c)]&&this[_0x87fa5e(0x75c)]['setBackgroundType'](Scene_Save[_0x87fa5e(0x63a)][_0x87fa5e(0x478)]);},Scene_Save[_0x304852(0x7ba)][_0x304852(0x1f7)]=function(){const _0xd26641=_0x304852;return Scene_Save['layoutSettings'][_0xd26641(0x637)][_0xd26641(0x1d6)](this);},Scene_Save['prototype'][_0x304852(0x588)]=function(){const _0x281cbb=_0x304852;return Scene_Save[_0x281cbb(0x63a)][_0x281cbb(0x6c7)][_0x281cbb(0x1d6)](this);},Scene_Load[_0x304852(0x63a)]=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x369)]['LoadMenu'],Scene_Load[_0x304852(0x7ba)][_0x304852(0x2b1)]=function(){const _0x585c5c=_0x304852;Scene_File['prototype'][_0x585c5c(0x2b1)][_0x585c5c(0x1d6)](this),this[_0x585c5c(0x246)]();},Scene_Load['prototype'][_0x304852(0x246)]=function(){const _0x342de5=_0x304852;if(this[_0x342de5(0x267)]){if(_0x342de5(0x726)===_0x342de5(0x11d)){function _0x54691e(){_0x250c06['push'](_0x294656);}}else this['_helpWindow']['setBackgroundType'](Scene_Load[_0x342de5(0x63a)][_0x342de5(0x6ac)]);}this[_0x342de5(0x75c)]&&this['_listWindow'][_0x342de5(0x686)](Scene_Load[_0x342de5(0x63a)][_0x342de5(0x478)]);},Scene_Load[_0x304852(0x7ba)][_0x304852(0x1f7)]=function(){const _0x5a9d2c=_0x304852;return Scene_Load[_0x5a9d2c(0x63a)]['HelpRect']['call'](this);},Scene_Load['prototype'][_0x304852(0x588)]=function(){const _0x2f1588=_0x304852;return Scene_Load[_0x2f1588(0x63a)][_0x2f1588(0x6c7)][_0x2f1588(0x1d6)](this);},Scene_GameEnd[_0x304852(0x63a)]=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)]['MenuLayout'][_0x304852(0x63f)],VisuMZ['CoreEngine']['Scene_GameEnd_createBackground']=Scene_GameEnd['prototype']['createBackground'],Scene_GameEnd[_0x304852(0x7ba)][_0x304852(0x455)]=function(){const _0x5556fa=_0x304852;Scene_MenuBase[_0x5556fa(0x7ba)][_0x5556fa(0x455)][_0x5556fa(0x1d6)](this);},Scene_GameEnd[_0x304852(0x7ba)][_0x304852(0x75e)]=function(){const _0x26552b=_0x304852,_0x40c390=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x40c390),this[_0x26552b(0x17b)]['setHandler'](_0x26552b(0x6ce),this[_0x26552b(0x38f)][_0x26552b(0x6d1)](this)),this[_0x26552b(0x6ca)](this[_0x26552b(0x17b)]),this[_0x26552b(0x17b)][_0x26552b(0x686)](Scene_GameEnd['layoutSettings'][_0x26552b(0x354)]);},Scene_GameEnd[_0x304852(0x7ba)][_0x304852(0xc0)]=function(){const _0xc1b188=_0x304852;return Scene_GameEnd['layoutSettings']['CommandRect'][_0xc1b188(0x1d6)](this);},Scene_Shop['layoutSettings']=VisuMZ['CoreEngine'][_0x304852(0x5dd)][_0x304852(0x369)][_0x304852(0x795)],VisuMZ[_0x304852(0x4ec)][_0x304852(0x1ba)]=Scene_Shop[_0x304852(0x7ba)]['create'],Scene_Shop[_0x304852(0x7ba)][_0x304852(0x2b1)]=function(){const _0x57c1f0=_0x304852;VisuMZ['CoreEngine'][_0x57c1f0(0x1ba)][_0x57c1f0(0x1d6)](this),this[_0x57c1f0(0x246)]();},Scene_Shop['prototype'][_0x304852(0x246)]=function(){const _0x5d1299=_0x304852;this['_helpWindow']&&this[_0x5d1299(0x267)][_0x5d1299(0x686)](Scene_Shop[_0x5d1299(0x63a)][_0x5d1299(0x6ac)]);this[_0x5d1299(0x3dd)]&&this['_goldWindow'][_0x5d1299(0x686)](Scene_Shop['layoutSettings']['GoldBgType']);if(this[_0x5d1299(0x17b)]){if(_0x5d1299(0x1d9)===_0x5d1299(0x1d9))this[_0x5d1299(0x17b)][_0x5d1299(0x686)](Scene_Shop[_0x5d1299(0x63a)][_0x5d1299(0x354)]);else{function _0x1a47f1(){const _0x181c91=_0x5d1299;return _0x182caa[_0x181c91(0x4ec)][_0x181c91(0x603)][_0x181c91(0x1d6)](this,_0x112e46);}}}this[_0x5d1299(0x2c9)]&&this['_dummyWindow']['setBackgroundType'](Scene_Shop[_0x5d1299(0x63a)][_0x5d1299(0x231)]);if(this[_0x5d1299(0x7b1)]){if(_0x5d1299(0x7b5)!==_0x5d1299(0x7b5)){function _0x15ee04(){const _0x369e5a=_0x5d1299;if(this[_0x369e5a(0x29f)]===_0x369e5a(0x48e)&&!_0x94934b['isArrowPressed']())return;if(_0x539b94[_0x369e5a(0x124)]())return;_0x2dc97e[_0x369e5a(0x4ec)]['Window_NameInput_cursorLeft'][_0x369e5a(0x1d6)](this,_0x5051a8),this[_0x369e5a(0x41a)](_0x369e5a(0x4c2));}}else this[_0x5d1299(0x7b1)][_0x5d1299(0x686)](Scene_Shop[_0x5d1299(0x63a)]['NumberBgType']);}this[_0x5d1299(0x15b)]&&this[_0x5d1299(0x15b)][_0x5d1299(0x686)](Scene_Shop['layoutSettings']['StatusBgType']);if(this[_0x5d1299(0x250)]){if(_0x5d1299(0x60e)!=='QEByx'){function _0x3c5495(){const _0x386970=_0x5d1299,_0x462df5=_0x386970(0x3fd);this['_colorCache']=this['_colorCache']||{};if(this[_0x386970(0x270)][_0x462df5])return this[_0x386970(0x270)][_0x462df5];const _0x5f4c8f=_0x5c90e1[_0x386970(0x4ec)]['Settings'][_0x386970(0x6c8)]['ColorTPGauge1'];return this[_0x386970(0x37a)](_0x462df5,_0x5f4c8f);}}else this[_0x5d1299(0x250)][_0x5d1299(0x686)](Scene_Shop['layoutSettings']['BuyBgType']);}if(this[_0x5d1299(0x691)]){if(_0x5d1299(0x34b)!==_0x5d1299(0x175))this[_0x5d1299(0x691)][_0x5d1299(0x686)](Scene_Shop[_0x5d1299(0x63a)][_0x5d1299(0x614)]);else{function _0x1f7ae6(){const _0x390c74=_0x5d1299;if(_0x18d7f3[_0x390c74(0x7b3)])return;}}}this['_sellWindow']&&this[_0x5d1299(0x58e)][_0x5d1299(0x686)](Scene_Shop['layoutSettings'][_0x5d1299(0x511)]);},Scene_Shop[_0x304852(0x7ba)]['helpWindowRect']=function(){const _0x2077de=_0x304852;return Scene_Shop[_0x2077de(0x63a)]['HelpRect']['call'](this);},Scene_Shop[_0x304852(0x7ba)]['goldWindowRect']=function(){const _0x38540f=_0x304852;return Scene_Shop[_0x38540f(0x63a)][_0x38540f(0x1a1)][_0x38540f(0x1d6)](this);},Scene_Shop['prototype'][_0x304852(0xc0)]=function(){const _0x1bc76f=_0x304852;return Scene_Shop[_0x1bc76f(0x63a)][_0x1bc76f(0x50d)][_0x1bc76f(0x1d6)](this);},Scene_Shop['prototype'][_0x304852(0x7aa)]=function(){const _0x2f9dd0=_0x304852;return Scene_Shop['layoutSettings']['DummyRect'][_0x2f9dd0(0x1d6)](this);},Scene_Shop[_0x304852(0x7ba)][_0x304852(0x4f3)]=function(){const _0xf464b0=_0x304852;return Scene_Shop['layoutSettings'][_0xf464b0(0x5ab)][_0xf464b0(0x1d6)](this);},Scene_Shop['prototype']['statusWindowRect']=function(){const _0x51aabb=_0x304852;return Scene_Shop[_0x51aabb(0x63a)][_0x51aabb(0x554)][_0x51aabb(0x1d6)](this);},Scene_Shop[_0x304852(0x7ba)][_0x304852(0x60f)]=function(){const _0x20bbf5=_0x304852;return Scene_Shop[_0x20bbf5(0x63a)]['BuyRect'][_0x20bbf5(0x1d6)](this);},Scene_Shop[_0x304852(0x7ba)][_0x304852(0x10f)]=function(){const _0x4ed7e1=_0x304852;return Scene_Shop[_0x4ed7e1(0x63a)]['CategoryRect'][_0x4ed7e1(0x1d6)](this);},Scene_Shop[_0x304852(0x7ba)][_0x304852(0x401)]=function(){const _0x39a2fc=_0x304852;return Scene_Shop['layoutSettings'][_0x39a2fc(0x4c0)][_0x39a2fc(0x1d6)](this);},Scene_Name[_0x304852(0x63a)]=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x369)]['NameMenu'],VisuMZ[_0x304852(0x4ec)][_0x304852(0x681)]=Scene_Name[_0x304852(0x7ba)][_0x304852(0x2b1)],Scene_Name['prototype'][_0x304852(0x2b1)]=function(){const _0x54d67d=_0x304852;VisuMZ['CoreEngine']['Scene_Name_create'][_0x54d67d(0x1d6)](this),this[_0x54d67d(0x246)]();},Scene_Name[_0x304852(0x7ba)]['setCoreEngineUpdateWindowBg']=function(){const _0x4cca73=_0x304852;this['_editWindow']&&this[_0x4cca73(0x67e)][_0x4cca73(0x686)](Scene_Name['layoutSettings'][_0x4cca73(0x158)]);if(this[_0x4cca73(0x304)]){if('ctMJm'===_0x4cca73(0x20d))this[_0x4cca73(0x304)]['setBackgroundType'](Scene_Name[_0x4cca73(0x63a)][_0x4cca73(0x6a9)]);else{function _0x2f3deb(){const _0x5c0216=_0x4cca73;return _0xc9814b[_0x5c0216(0x23f)](_0x5637cc,'[',']');}}}},Scene_Name['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x304852(0x7ba)]['editWindowRect']=function(){const _0x384fab=_0x304852;return Scene_Name[_0x384fab(0x63a)][_0x384fab(0x53f)]['call'](this);},Scene_Name[_0x304852(0x7ba)][_0x304852(0x178)]=function(){const _0x5805d5=_0x304852;return Scene_Name['layoutSettings'][_0x5805d5(0x4ea)]['call'](this);},Scene_Name[_0x304852(0x7ba)]['EnableNameInput']=function(){const _0x3c55b6=_0x304852;if(!this[_0x3c55b6(0x304)])return![];return VisuMZ[_0x3c55b6(0x4ec)][_0x3c55b6(0x5dd)][_0x3c55b6(0x15e)][_0x3c55b6(0x442)];},Scene_Name[_0x304852(0x7ba)][_0x304852(0x227)]=function(){const _0x5b7034=_0x304852;if(this[_0x5b7034(0x442)]())return TextManager[_0x5b7034(0x3dc)](_0x5b7034(0xc3));else{if(_0x5b7034(0x27d)===_0x5b7034(0x27d))return Scene_MenuBase[_0x5b7034(0x7ba)][_0x5b7034(0x227)]['call'](this);else{function _0x4f1187(){const _0x27b954=_0x5b7034;this[_0x27b954(0x449)]&&this[_0x27b954(0x449)]();}}}},Scene_Name[_0x304852(0x7ba)][_0x304852(0x75d)]=function(){const _0x673045=_0x304852;if(this[_0x673045(0x442)]()){if(_0x673045(0x52b)===_0x673045(0x350)){function _0x4cac63(){const _0x484176=_0x673045;if(this[_0x484176(0x29f)]==='keyboard')return;if(_0x512918[_0x484176(0x124)]())return;_0x418256[_0x484176(0x4ec)][_0x484176(0x305)][_0x484176(0x1d6)](this),this[_0x484176(0x41a)]('default');}}else{const _0x58d9c4=VisuMZ[_0x673045(0x4ec)][_0x673045(0x5dd)][_0x673045(0x15e)];if(this[_0x673045(0x304)]['_mode']===_0x673045(0x48e))return _0x58d9c4[_0x673045(0x349)]||'Keyboard';else{if(_0x673045(0x1b3)===_0x673045(0x17a)){function _0x5409ea(){if(this['isGamepadButtonPressed'](_0x6e369a))return!![];}}else return _0x58d9c4[_0x673045(0x320)]||_0x673045(0x320);}}}else return Scene_MenuBase[_0x673045(0x7ba)]['buttonAssistText1']['call'](this);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x742)]=Scene_Name[_0x304852(0x7ba)][_0x304852(0x65c)],Scene_Name[_0x304852(0x7ba)][_0x304852(0x65c)]=function(){const _0x431b40=_0x304852;if(this[_0x431b40(0x589)]()){if(_0x431b40(0x402)!=='mEvhA')this[_0x431b40(0x77d)]();else{function _0x457221(){this['_forcedBattleSys']='BTB';}}}else{if(_0x431b40(0x59b)!==_0x431b40(0x620))VisuMZ[_0x431b40(0x4ec)][_0x431b40(0x742)][_0x431b40(0x1d6)](this);else{function _0x1bba21(){const _0xb97c53=_0x431b40;if(_0x5578ae[_0xb97c53(0xd0)]())_0x2ca901[_0xb97c53(0x3f8)](_0x4bf30b);}}}},Scene_Name[_0x304852(0x7ba)][_0x304852(0x589)]=function(){const _0xab83d5=_0x304852,_0x12bb98=VisuMZ['CoreEngine']['Settings'][_0xab83d5(0x15e)];if(!_0x12bb98)return![];const _0x2ec945=_0x12bb98['BannedWords'];if(!_0x2ec945)return![];const _0x15e122=this[_0xab83d5(0x67e)][_0xab83d5(0x3a8)]()['toLowerCase']();for(const _0x2c2499 of _0x2ec945){if(_0x15e122[_0xab83d5(0x44a)](_0x2c2499['toLowerCase']()))return!![];}return![];},Scene_Name[_0x304852(0x7ba)][_0x304852(0x77d)]=function(){const _0x1fbb9e=_0x304852;SoundManager[_0x1fbb9e(0x24a)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x15a)]=Scene_Battle['prototype'][_0x304852(0x1c2)],Scene_Battle['prototype'][_0x304852(0x1c2)]=function(){const _0x49e3f2=_0x304852;VisuMZ[_0x49e3f2(0x4ec)][_0x49e3f2(0x15a)][_0x49e3f2(0x1d6)](this);if($gameTemp[_0x49e3f2(0x4c8)])this[_0x49e3f2(0x3cd)]();},Scene_Battle[_0x304852(0x7ba)][_0x304852(0x3cd)]=function(){const _0xce8a2a=_0x304852;!BattleManager[_0xce8a2a(0x315)]()&&!this[_0xce8a2a(0x70f)]&&!$gameMessage[_0xce8a2a(0x4c9)]()&&(this[_0xce8a2a(0x70f)]=!![],this['update'](),SceneManager[_0xce8a2a(0xc1)](),this['_playtestF7Looping']=![]);},VisuMZ[_0x304852(0x4ec)]['Scene_Battle_createCancelButton']=Scene_Battle['prototype']['createCancelButton'],Scene_Battle[_0x304852(0x7ba)][_0x304852(0x69a)]=function(){const _0x2336e5=_0x304852;VisuMZ[_0x2336e5(0x4ec)][_0x2336e5(0x1af)]['call'](this),SceneManager[_0x2336e5(0x594)]()&&this[_0x2336e5(0xdd)]();},Scene_Battle[_0x304852(0x7ba)][_0x304852(0xdd)]=function(){const _0x4cb88a=_0x304852;this['_cancelButton']['x']=Graphics[_0x4cb88a(0x277)]+0x4,this[_0x4cb88a(0x377)]()?this[_0x4cb88a(0x208)]['y']=Graphics[_0x4cb88a(0x789)]-this[_0x4cb88a(0x2d2)]():this[_0x4cb88a(0x208)]['y']=0x0;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x62b)]=Sprite_Button[_0x304852(0x7ba)][_0x304852(0x1b6)],Sprite_Button[_0x304852(0x7ba)][_0x304852(0x1b6)]=function(_0x506e4b){const _0x573ae0=_0x304852;VisuMZ[_0x573ae0(0x4ec)][_0x573ae0(0x62b)][_0x573ae0(0x1d6)](this,_0x506e4b),this[_0x573ae0(0x162)]();},Sprite_Button[_0x304852(0x7ba)]['initButtonHidden']=function(){const _0x560dde=_0x304852,_0x37d809=VisuMZ['CoreEngine'][_0x560dde(0x5dd)]['UI'];this['_isButtonHidden']=![];switch(this[_0x560dde(0x428)]){case _0x560dde(0x6ce):this[_0x560dde(0x344)]=!_0x37d809[_0x560dde(0x193)];break;case'pageup':case _0x560dde(0x16d):this[_0x560dde(0x344)]=!_0x37d809['pagedownShowButton'];break;case _0x560dde(0x1d8):case'up':case _0x560dde(0x1f4):case _0x560dde(0xba):case'ok':this[_0x560dde(0x344)]=!_0x37d809['numberShowButton'];break;case'menu':this['_isButtonHidden']=!_0x37d809['menuShowButton'];break;}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x621)]=Sprite_Button[_0x304852(0x7ba)][_0x304852(0x4e3)],Sprite_Button[_0x304852(0x7ba)][_0x304852(0x4e3)]=function(){const _0x4d4f3b=_0x304852;SceneManager['areButtonsHidden']()||this['_isButtonHidden']?this['hideButtonFromView']():VisuMZ[_0x4d4f3b(0x4ec)][_0x4d4f3b(0x621)]['call'](this);},Sprite_Button['prototype']['hideButtonFromView']=function(){const _0x55f423=_0x304852;this[_0x55f423(0x1da)]=![],this['opacity']=0x0,this['x']=Graphics[_0x55f423(0x29e)]*0xa,this['y']=Graphics[_0x55f423(0x1d3)]*0xa;},VisuMZ[_0x304852(0x4ec)]['Sprite_Battler_startMove']=Sprite_Battler['prototype'][_0x304852(0x3a9)],Sprite_Battler[_0x304852(0x7ba)][_0x304852(0x3a9)]=function(_0x535132,_0x439f3f,_0x1a2825){const _0x4bf9b8=_0x304852;(this['_targetOffsetX']!==_0x535132||this[_0x4bf9b8(0x773)]!==_0x439f3f)&&(this['setMoveEasingType'](_0x4bf9b8(0x673)),this[_0x4bf9b8(0x714)]=_0x1a2825),VisuMZ[_0x4bf9b8(0x4ec)][_0x4bf9b8(0x1db)][_0x4bf9b8(0x1d6)](this,_0x535132,_0x439f3f,_0x1a2825);},Sprite_Battler[_0x304852(0x7ba)][_0x304852(0x6ae)]=function(_0x2f6a4f){this['_moveEasingType']=_0x2f6a4f;},Sprite_Battler[_0x304852(0x7ba)]['updateMove']=function(){const _0x45e5bb=_0x304852;if(this[_0x45e5bb(0x36c)]<=0x0)return;const _0x1ea4d2=this['_movementDuration'],_0x1eebc8=this[_0x45e5bb(0x714)],_0x3fdaab=this['_moveEasingType'];this[_0x45e5bb(0x403)]=this[_0x45e5bb(0x134)](this[_0x45e5bb(0x403)],this[_0x45e5bb(0x4d2)],_0x1ea4d2,_0x1eebc8,_0x3fdaab),this[_0x45e5bb(0x2f8)]=this[_0x45e5bb(0x134)](this[_0x45e5bb(0x2f8)],this[_0x45e5bb(0x773)],_0x1ea4d2,_0x1eebc8,_0x3fdaab),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this[_0x45e5bb(0x153)]();},Sprite_Battler[_0x304852(0x7ba)][_0x304852(0x134)]=function(_0x23c3cc,_0x2f82a3,_0x582398,_0x3fce62,_0x2fb58a){const _0x3cefb5=_0x304852,_0x4bc24e=VisuMZ[_0x3cefb5(0x1b8)]((_0x3fce62-_0x582398)/_0x3fce62,_0x2fb58a||_0x3cefb5(0x673)),_0x3acd61=VisuMZ[_0x3cefb5(0x1b8)]((_0x3fce62-_0x582398+0x1)/_0x3fce62,_0x2fb58a||'Linear'),_0x2e4497=(_0x23c3cc-_0x2f82a3*_0x4bc24e)/(0x1-_0x4bc24e);return _0x2e4497+(_0x2f82a3-_0x2e4497)*_0x3acd61;},VisuMZ[_0x304852(0x4ec)]['Sprite_Actor_setActorHome']=Sprite_Actor['prototype'][_0x304852(0x13b)],Sprite_Actor[_0x304852(0x7ba)][_0x304852(0x13b)]=function(_0x156d2b){const _0xc5cfc4=_0x304852;VisuMZ[_0xc5cfc4(0x4ec)][_0xc5cfc4(0x5dd)]['UI']['RepositionActors']?this[_0xc5cfc4(0x117)](_0x156d2b):VisuMZ[_0xc5cfc4(0x4ec)]['Sprite_Actor_setActorHome'][_0xc5cfc4(0x1d6)](this,_0x156d2b);},Sprite_Actor[_0x304852(0x7ba)]['setActorHomeRepositioned']=function(_0x1462ed){const _0x33b2b2=_0x304852;let _0x251b73=Math[_0x33b2b2(0x2f2)](Graphics[_0x33b2b2(0x29e)]/0x2+0xc0);_0x251b73-=Math[_0x33b2b2(0x392)]((Graphics[_0x33b2b2(0x29e)]-Graphics['boxWidth'])/0x2),_0x251b73+=_0x1462ed*0x20;let _0x403b63=Graphics[_0x33b2b2(0x1d3)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x403b63-=Math[_0x33b2b2(0x392)]((Graphics[_0x33b2b2(0x1d3)]-Graphics[_0x33b2b2(0x789)])/0x2),_0x403b63+=_0x1462ed*0x30,this[_0x33b2b2(0x464)](_0x251b73,_0x403b63);},Sprite_Actor['prototype']['retreat']=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation[_0x304852(0x7ba)][_0x304852(0x211)]=function(_0x390f7c){const _0x4a62b2=_0x304852;this[_0x4a62b2(0x59e)]=_0x390f7c;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x47f)]=Sprite_Animation[_0x304852(0x7ba)]['processSoundTimings'],Sprite_Animation['prototype'][_0x304852(0x6e6)]=function(){const _0x2e4cbd=_0x304852;if(this[_0x2e4cbd(0x59e)])return;VisuMZ['CoreEngine'][_0x2e4cbd(0x47f)][_0x2e4cbd(0x1d6)](this);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x224)]=Sprite_Animation[_0x304852(0x7ba)]['setViewport'],Sprite_Animation[_0x304852(0x7ba)]['setViewport']=function(_0x1e6248){const _0xb13935=_0x304852;this['isAnimationOffsetXMirrored']()?this[_0xb13935(0x19c)](_0x1e6248):VisuMZ['CoreEngine'][_0xb13935(0x224)][_0xb13935(0x1d6)](this,_0x1e6248);},Sprite_Animation[_0x304852(0x7ba)]['isAnimationOffsetXMirrored']=function(){const _0xfca2df=_0x304852;if(!this[_0xfca2df(0x251)])return![];const _0x256a7b=this['_animation'][_0xfca2df(0x3a8)]||'';if(_0x256a7b['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x256a7b[_0xfca2df(0x54d)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0xfca2df(0x4ec)]['Settings'][_0xfca2df(0x409)][_0xfca2df(0x375)];},Sprite_Animation['prototype'][_0x304852(0x19c)]=function(_0x54ed8b){const _0x5147e9=_0x304852,_0x410ba3=this[_0x5147e9(0x174)],_0x3e5ac1=this[_0x5147e9(0x174)],_0x4cd595=this[_0x5147e9(0x251)][_0x5147e9(0x43f)]*(this[_0x5147e9(0x101)]?-0x1:0x1)-_0x410ba3/0x2,_0x23010f=this['_animation'][_0x5147e9(0x5ee)]-_0x3e5ac1/0x2,_0x2bb126=this[_0x5147e9(0x4a9)](_0x54ed8b);_0x54ed8b['gl']['viewport'](_0x4cd595+_0x2bb126['x'],_0x23010f+_0x2bb126['y'],_0x410ba3,_0x3e5ac1);},Sprite_Animation[_0x304852(0x7ba)]['targetSpritePosition']=function(_0x5ea4d6){const _0x2d3cea=_0x304852;if(_0x5ea4d6['_mainSprite']){}const _0x39ca38=this[_0x2d3cea(0x251)][_0x2d3cea(0x3a8)];let _0x2877c8=_0x5ea4d6[_0x2d3cea(0x1d3)]*_0x5ea4d6[_0x2d3cea(0xea)]['y'],_0x17df28=0x0,_0xcf5a10=-_0x2877c8/0x2;if(_0x39ca38[_0x2d3cea(0x54d)](/<(?:HEAD|HEADER|TOP)>/i))_0xcf5a10=-_0x2877c8;if(_0x39ca38['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0xcf5a10=0x0;if(_0x39ca38[_0x2d3cea(0x54d)](/<(?:LEFT)>/i))_0x17df28=-_0x5ea4d6[_0x2d3cea(0x29e)]/0x2;if(_0x39ca38[_0x2d3cea(0x54d)](/<(?:RIGHT)>/i))_0xcf5a10=_0x5ea4d6[_0x2d3cea(0x29e)]/0x2;if(_0x39ca38[_0x2d3cea(0x54d)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x17df28=Number(RegExp['$1'])*_0x5ea4d6[_0x2d3cea(0x29e)];_0x39ca38['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0xcf5a10=(0x1-Number(RegExp['$1']))*-_0x2877c8);_0x39ca38[_0x2d3cea(0x54d)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x17df28=Number(RegExp['$1'])*_0x5ea4d6[_0x2d3cea(0x29e)],_0xcf5a10=(0x1-Number(RegExp['$2']))*-_0x2877c8);if(_0x39ca38[_0x2d3cea(0x54d)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x17df28+=Number(RegExp['$1']);if(_0x39ca38[_0x2d3cea(0x54d)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0xcf5a10+=Number(RegExp['$1']);if(_0x39ca38[_0x2d3cea(0x54d)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x2d3cea(0x45d)===_0x2d3cea(0x2e5)){function _0x1b7800(){const _0x469609=_0x2d3cea;return _0x469609(0x6ec);}}else _0x17df28+=Number(RegExp['$1']),_0xcf5a10+=Number(RegExp['$2']);}const _0x3a8b29=new Point(_0x17df28,_0xcf5a10);return _0x5ea4d6[_0x2d3cea(0x2bc)](),_0x5ea4d6[_0x2d3cea(0x2fe)][_0x2d3cea(0x569)](_0x3a8b29);},Sprite_AnimationMV[_0x304852(0x7ba)][_0x304852(0x211)]=function(_0x9b79b2){this['_muteSound']=_0x9b79b2;},VisuMZ['CoreEngine'][_0x304852(0x123)]=Sprite_AnimationMV[_0x304852(0x7ba)][_0x304852(0x64a)],Sprite_AnimationMV[_0x304852(0x7ba)][_0x304852(0x64a)]=function(_0x38bcb2){const _0x3bf6de=_0x304852;this[_0x3bf6de(0x59e)]&&(_0x38bcb2=JsonEx['makeDeepCopy'](_0x38bcb2),_0x38bcb2['se']&&(_0x38bcb2['se'][_0x3bf6de(0x359)]=0x0)),VisuMZ[_0x3bf6de(0x4ec)][_0x3bf6de(0x123)][_0x3bf6de(0x1d6)](this,_0x38bcb2);},Sprite_Damage[_0x304852(0x7ba)]['createDigits']=function(_0x5952be){const _0x5619bd=_0x304852;let _0x4eb727=Math[_0x5619bd(0x31d)](_0x5952be)[_0x5619bd(0x720)]();this[_0x5619bd(0x11c)]()&&(_0x4eb727=VisuMZ[_0x5619bd(0x5bf)](_0x4eb727));const _0x3ec9d0=this[_0x5619bd(0x514)](),_0x47d2bc=Math[_0x5619bd(0x392)](_0x3ec9d0*0.75);for(let _0x1bde00=0x0;_0x1bde00<_0x4eb727['length'];_0x1bde00++){const _0x5d56e0=this[_0x5619bd(0x26b)](_0x47d2bc,_0x3ec9d0);_0x5d56e0[_0x5619bd(0x525)][_0x5619bd(0x237)](_0x4eb727[_0x1bde00],0x0,0x0,_0x47d2bc,_0x3ec9d0,'center'),_0x5d56e0['x']=(_0x1bde00-(_0x4eb727[_0x5619bd(0x12a)]-0x1)/0x2)*_0x47d2bc,_0x5d56e0['dy']=-_0x1bde00;}},Sprite_Damage[_0x304852(0x7ba)][_0x304852(0x11c)]=function(){const _0x448df6=_0x304852;return VisuMZ[_0x448df6(0x4ec)][_0x448df6(0x5dd)][_0x448df6(0x409)][_0x448df6(0x552)];},Sprite_Damage[_0x304852(0x7ba)][_0x304852(0x5f5)]=function(){const _0x407439=_0x304852;return ColorManager[_0x407439(0x15f)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x790)]=Sprite_Gauge['prototype'][_0x304852(0x234)],Sprite_Gauge['prototype'][_0x304852(0x234)]=function(){const _0x231801=_0x304852;return VisuMZ[_0x231801(0x4ec)][_0x231801(0x790)][_0x231801(0x1d6)](this)[_0x231801(0x206)](0x0,0x1);},VisuMZ[_0x304852(0x4ec)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x304852(0x7ba)][_0x304852(0x61c)],Sprite_Gauge[_0x304852(0x7ba)][_0x304852(0x61c)]=function(){const _0x5b24b7=_0x304852;let _0x3fd411=VisuMZ[_0x5b24b7(0x4ec)][_0x5b24b7(0x38e)][_0x5b24b7(0x1d6)](this);return _0x3fd411;},Sprite_Gauge[_0x304852(0x7ba)][_0x304852(0x46f)]=function(){const _0x54053d=_0x304852;let _0x3be702=this['currentValue']();if(this['useDigitGrouping']()){if(_0x54053d(0x662)==='JCZQJ'){function _0x250c12(){const _0x2c2407=_0x54053d;if(!this[_0x2c2407(0x251)])return![];const _0x31c18d=this[_0x2c2407(0x251)][_0x2c2407(0x3a8)]||'';if(_0x31c18d[_0x2c2407(0x54d)](/<MIRROR OFFSET X>/i))return!![];if(_0x31c18d['match'](/<NO MIRROR OFFSET X>/i))return![];return _0x53259e['CoreEngine'][_0x2c2407(0x5dd)][_0x2c2407(0x409)][_0x2c2407(0x375)];}}else _0x3be702=VisuMZ[_0x54053d(0x5bf)](_0x3be702);}const _0x2be371=this[_0x54053d(0x3c4)]()-0x1,_0x902872=this[_0x54053d(0x39e)]();this[_0x54053d(0x4d9)](),this[_0x54053d(0x525)]['drawText'](_0x3be702,0x0,0x0,_0x2be371,_0x902872,'right');},Sprite_Gauge[_0x304852(0x7ba)][_0x304852(0x65b)]=function(){return 0x3;},Sprite_Gauge[_0x304852(0x7ba)][_0x304852(0x11c)]=function(){const _0xc910a0=_0x304852;return VisuMZ[_0xc910a0(0x4ec)][_0xc910a0(0x5dd)][_0xc910a0(0x409)][_0xc910a0(0x6c9)];},Sprite_Gauge[_0x304852(0x7ba)][_0x304852(0x5f5)]=function(){const _0x2de211=_0x304852;return ColorManager[_0x2de211(0x438)]();};function Sprite_TitlePictureButton(){const _0x3a53a4=_0x304852;this[_0x3a53a4(0x1b6)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x304852(0x2b1)](Sprite_Clickable['prototype']),Sprite_TitlePictureButton[_0x304852(0x7ba)][_0x304852(0x183)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x304852(0x7ba)]['initialize']=function(_0x3753d4){const _0x5f10a6=_0x304852;Sprite_Clickable['prototype'][_0x5f10a6(0x1b6)][_0x5f10a6(0x1d6)](this),this[_0x5f10a6(0x6f4)]=_0x3753d4,this[_0x5f10a6(0x449)]=null,this[_0x5f10a6(0x578)]();},Sprite_TitlePictureButton[_0x304852(0x7ba)][_0x304852(0x578)]=function(){const _0x423a8c=_0x304852;this['x']=Graphics[_0x423a8c(0x29e)],this['y']=Graphics[_0x423a8c(0x1d3)],this['visible']=![],this[_0x423a8c(0x672)]();},Sprite_TitlePictureButton[_0x304852(0x7ba)]['setupButtonImage']=function(){const _0x194271=_0x304852;this[_0x194271(0x525)]=ImageManager[_0x194271(0x5c8)](this[_0x194271(0x6f4)][_0x194271(0x22a)]),this[_0x194271(0x525)][_0x194271(0x390)](this[_0x194271(0x49c)][_0x194271(0x6d1)](this));},Sprite_TitlePictureButton[_0x304852(0x7ba)][_0x304852(0x49c)]=function(){const _0x2d6434=_0x304852;this[_0x2d6434(0x6f4)][_0x2d6434(0x2de)][_0x2d6434(0x1d6)](this),this[_0x2d6434(0x6f4)]['PositionJS'][_0x2d6434(0x1d6)](this),this[_0x2d6434(0x443)](this[_0x2d6434(0x6f4)][_0x2d6434(0x69f)][_0x2d6434(0x6d1)](this));},Sprite_TitlePictureButton[_0x304852(0x7ba)]['update']=function(){const _0x4fe47b=_0x304852;Sprite_Clickable['prototype'][_0x4fe47b(0x1c2)][_0x4fe47b(0x1d6)](this),this[_0x4fe47b(0x4e3)](),this[_0x4fe47b(0x799)]();},Sprite_TitlePictureButton[_0x304852(0x7ba)][_0x304852(0x30e)]=function(){const _0x13659b=_0x304852;return VisuMZ[_0x13659b(0x4ec)]['Settings']['MenuLayout'][_0x13659b(0x44b)][_0x13659b(0x235)];},Sprite_TitlePictureButton[_0x304852(0x7ba)][_0x304852(0x4e3)]=function(){const _0x545a97=_0x304852;this['_pressed']||this[_0x545a97(0x798)]?this[_0x545a97(0x68b)]=0xff:(this[_0x545a97(0x68b)]+=this[_0x545a97(0x1da)]?this[_0x545a97(0x30e)]():-0x1*this[_0x545a97(0x30e)](),this[_0x545a97(0x68b)]=Math[_0x545a97(0x7a0)](0xc0,this[_0x545a97(0x68b)]));},Sprite_TitlePictureButton[_0x304852(0x7ba)][_0x304852(0x443)]=function(_0x34ab87){const _0x4d0008=_0x304852;this[_0x4d0008(0x449)]=_0x34ab87;},Sprite_TitlePictureButton['prototype'][_0x304852(0xf9)]=function(){const _0x13c452=_0x304852;this[_0x13c452(0x449)]&&this[_0x13c452(0x449)]();},VisuMZ[_0x304852(0x4ec)][_0x304852(0x343)]=Spriteset_Base['prototype'][_0x304852(0x1b6)],Spriteset_Base[_0x304852(0x7ba)]['initialize']=function(){const _0x4b7586=_0x304852;VisuMZ[_0x4b7586(0x4ec)]['Spriteset_Base_initialize'][_0x4b7586(0x1d6)](this),this[_0x4b7586(0xd3)]();},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0xd3)]=function(){const _0x1b648a=_0x304852;this[_0x1b648a(0x126)]=[],this[_0x1b648a(0x55b)]=this[_0x1b648a(0xea)]['x'],this[_0x1b648a(0x110)]=this[_0x1b648a(0xea)]['y'];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x677)]=Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x32a)],Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x32a)]=function(_0x4af62c){const _0x18bf81=_0x304852;this[_0x18bf81(0x40b)](),VisuMZ['CoreEngine'][_0x18bf81(0x677)]['call'](this,_0x4af62c);},VisuMZ[_0x304852(0x4ec)]['Spriteset_Base_update']=Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x1c2)],Spriteset_Base[_0x304852(0x7ba)]['update']=function(){const _0x2a903b=_0x304852;VisuMZ[_0x2a903b(0x4ec)][_0x2a903b(0x518)][_0x2a903b(0x1d6)](this),this[_0x2a903b(0x498)](),this[_0x2a903b(0x565)]();},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x498)]=function(){const _0x42aa0b=_0x304852;if(!VisuMZ[_0x42aa0b(0x4ec)][_0x42aa0b(0x5dd)][_0x42aa0b(0x409)][_0x42aa0b(0x297)])return;if(this['_cacheScaleX']===this[_0x42aa0b(0xea)]['x']&&this[_0x42aa0b(0x110)]===this['scale']['y'])return;this['adjustPictureAntiZoom'](),this['_cacheScaleX']=this[_0x42aa0b(0xea)]['x'],this['_cacheScaleY']=this[_0x42aa0b(0xea)]['y'];},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x79c)]=function(){const _0x43233d=_0x304852;if(this[_0x43233d(0xea)]['x']!==0x0){if(_0x43233d(0x360)!=='ctrrx')this[_0x43233d(0x59a)]['scale']['x']=0x1/this[_0x43233d(0xea)]['x'],this[_0x43233d(0x59a)]['x']=-(this['x']/this[_0x43233d(0xea)]['x']);else{function _0x30322b(){const _0x1936b5=_0x43233d;this[_0x1936b5(0x176)]();}}}if(this[_0x43233d(0xea)]['y']!==0x0){if(_0x43233d(0x2f5)===_0x43233d(0x2f5))this[_0x43233d(0x59a)][_0x43233d(0xea)]['y']=0x1/this[_0x43233d(0xea)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x43233d(0xea)]['y']);else{function _0x1b6f8c(){const _0x2b0f8e=_0x43233d;_0x571ee9+=_0x2b0f8e(0x286);}}}},Spriteset_Base['prototype'][_0x304852(0x565)]=function(){const _0x5ccdf9=_0x304852;for(const _0x4bd5d8 of this[_0x5ccdf9(0x126)]){if(!_0x4bd5d8[_0x5ccdf9(0x4cb)]()){if(_0x5ccdf9(0x112)!==_0x5ccdf9(0x112)){function _0x51274c(){const _0x488803=_0x5ccdf9;return _0x1cc797[_0x488803(0x63a)][_0x488803(0x50d)][_0x488803(0x1d6)](this);}}else this[_0x5ccdf9(0x5d7)](_0x4bd5d8);}}this[_0x5ccdf9(0x242)]();},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x242)]=function(){const _0x39e842=_0x304852;for(;;){const _0x18a54c=$gameTemp[_0x39e842(0x768)]();if(_0x18a54c)this[_0x39e842(0x244)](_0x18a54c);else break;}},Spriteset_Base[_0x304852(0x7ba)]['createFauxAnimation']=function(_0xb039e9){const _0x4de7b0=_0x304852,_0x41eb87=$dataAnimations[_0xb039e9[_0x4de7b0(0x696)]],_0x4c0cb5=_0xb039e9[_0x4de7b0(0x5fe)],_0x8735e2=_0xb039e9[_0x4de7b0(0x51b)],_0x7c5092=_0xb039e9[_0x4de7b0(0x53d)];let _0x193cc7=this[_0x4de7b0(0x1e8)]();const _0x43787d=this[_0x4de7b0(0x2d0)]();if(this['isAnimationForEach'](_0x41eb87))for(const _0x4ec547 of _0x4c0cb5){this[_0x4de7b0(0x472)]([_0x4ec547],_0x41eb87,_0x8735e2,_0x193cc7,_0x7c5092),_0x193cc7+=_0x43787d;}else this['createFauxAnimationSprite'](_0x4c0cb5,_0x41eb87,_0x8735e2,_0x193cc7,_0x7c5092);},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x472)]=function(_0xa6d28,_0x4a999e,_0x2af029,_0x4c3863,_0x56a8db){const _0x4fb9db=_0x304852,_0x127dd6=this['isMVAnimation'](_0x4a999e),_0x2ea749=new(_0x127dd6?Sprite_AnimationMV:Sprite_Animation)(),_0xfa3c22=this[_0x4fb9db(0x4d8)](_0xa6d28);this['animationShouldMirror'](_0xa6d28[0x0])&&(_0x2af029=!_0x2af029),_0x2ea749[_0x4fb9db(0x184)]=_0xa6d28,_0x2ea749[_0x4fb9db(0x578)](_0xfa3c22,_0x4a999e,_0x2af029,_0x4c3863),_0x2ea749[_0x4fb9db(0x211)](_0x56a8db),this[_0x4fb9db(0x21a)][_0x4fb9db(0x5a2)](_0x2ea749),this[_0x4fb9db(0x126)][_0x4fb9db(0x700)](_0x2ea749);},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x5d7)]=function(_0x35c3cb){const _0xc75530=_0x304852;this[_0xc75530(0x126)]['remove'](_0x35c3cb),this['_effectsContainer'][_0xc75530(0x71b)](_0x35c3cb);for(const _0xae7fc4 of _0x35c3cb[_0xc75530(0x184)]){_0xae7fc4[_0xc75530(0x74f)]&&_0xae7fc4[_0xc75530(0x74f)]();}_0x35c3cb[_0xc75530(0x32a)]();},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x40b)]=function(){const _0x15562d=_0x304852;for(const _0x36b626 of this['_fauxAnimationSprites']){if(_0x15562d(0x338)===_0x15562d(0x617)){function _0x331f4b(){const _0x382446=_0x15562d;_0x20151e[_0x382446(0x4ec)][_0x382446(0x601)][_0x382446(0x1d6)](this,_0x2e5078);}}else this[_0x15562d(0x5d7)](_0x36b626);}},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x228)]=function(){const _0x38d70b=_0x304852;return this[_0x38d70b(0x126)][_0x38d70b(0x12a)]>0x0;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x642)]=Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x427)],Spriteset_Base[_0x304852(0x7ba)]['updatePosition']=function(){const _0x3972d1=_0x304852;VisuMZ['CoreEngine'][_0x3972d1(0x642)][_0x3972d1(0x1d6)](this),this[_0x3972d1(0x2ca)]();},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x2ca)]=function(){const _0x311c29=_0x304852;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x311c29(0x2f2)]($gameScreen[_0x311c29(0x5b0)]());const _0x1a925d=$gameScreen[_0x311c29(0x739)]();switch($gameScreen[_0x311c29(0x739)]()){case _0x311c29(0x188):this['updatePositionCoreEngineShakeOriginal']();break;case _0x311c29(0x1ed):this[_0x311c29(0x731)]();break;case _0x311c29(0x3cf):this[_0x311c29(0x131)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x6f7)]=function(){const _0x40cfce=_0x304852,_0x33ac31=VisuMZ[_0x40cfce(0x4ec)][_0x40cfce(0x5dd)][_0x40cfce(0x317)];if(_0x33ac31&&_0x33ac31[_0x40cfce(0x35c)])return _0x33ac31['originalJS']['call'](this);this['x']+=Math[_0x40cfce(0x2f2)]($gameScreen[_0x40cfce(0x5b0)]());},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x6b4)]=function(){const _0x43ab2e=_0x304852,_0x419d97=VisuMZ[_0x43ab2e(0x4ec)][_0x43ab2e(0x5dd)][_0x43ab2e(0x317)];if(_0x419d97&&_0x419d97[_0x43ab2e(0x48a)])return _0x419d97[_0x43ab2e(0x48a)][_0x43ab2e(0x1d6)](this);const _0x23a43f=$gameScreen[_0x43ab2e(0x4af)]*0.75,_0x1dac0d=$gameScreen[_0x43ab2e(0x54b)]*0.6,_0x244c08=$gameScreen[_0x43ab2e(0x65e)];this['x']+=Math['round'](Math[_0x43ab2e(0x1e2)](_0x23a43f)-Math[_0x43ab2e(0x1e2)](_0x1dac0d))*(Math[_0x43ab2e(0x7a0)](_0x244c08,0x1e)*0.5),this['y']+=Math[_0x43ab2e(0x2f2)](Math[_0x43ab2e(0x1e2)](_0x23a43f)-Math[_0x43ab2e(0x1e2)](_0x1dac0d))*(Math[_0x43ab2e(0x7a0)](_0x244c08,0x1e)*0.5);},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x731)]=function(){const _0x50e34d=_0x304852,_0x171773=VisuMZ[_0x50e34d(0x4ec)][_0x50e34d(0x5dd)][_0x50e34d(0x317)];if(_0x171773&&_0x171773[_0x50e34d(0x500)])return _0x171773[_0x50e34d(0x500)]['call'](this);const _0x2f11dc=$gameScreen[_0x50e34d(0x4af)]*0.75,_0x2465c0=$gameScreen[_0x50e34d(0x54b)]*0.6,_0x3f5905=$gameScreen['_shakeDuration'];this['x']+=Math[_0x50e34d(0x2f2)](Math['randomInt'](_0x2f11dc)-Math[_0x50e34d(0x1e2)](_0x2465c0))*(Math[_0x50e34d(0x7a0)](_0x3f5905,0x1e)*0.5);},Spriteset_Base[_0x304852(0x7ba)][_0x304852(0x131)]=function(){const _0x40c978=_0x304852,_0x37de63=VisuMZ[_0x40c978(0x4ec)]['Settings'][_0x40c978(0x317)];if(_0x37de63&&_0x37de63['vertJS']){if('cTqHs'===_0x40c978(0x3a1))return _0x37de63['vertJS'][_0x40c978(0x1d6)](this);else{function _0x36be51(){const _0x3c15c2=_0x40c978;return _0x56e3b2[_0x3c15c2(0x63a)][_0x3c15c2(0x554)]['call'](this);}}}const _0x33871a=$gameScreen[_0x40c978(0x4af)]*0.75,_0x36c4c9=$gameScreen[_0x40c978(0x54b)]*0.6,_0xf8362d=$gameScreen[_0x40c978(0x65e)];this['y']+=Math[_0x40c978(0x2f2)](Math[_0x40c978(0x1e2)](_0x33871a)-Math['randomInt'](_0x36c4c9))*(Math[_0x40c978(0x7a0)](_0xf8362d,0x1e)*0.5);},Spriteset_Battle['prototype'][_0x304852(0x455)]=function(){const _0x4307b3=_0x304852;this[_0x4307b3(0x5a3)]=new PIXI['filters']['BlurFilter'](clamp=!![]),this[_0x4307b3(0x5be)]=new Sprite(),this['_backgroundSprite'][_0x4307b3(0x525)]=SceneManager[_0x4307b3(0x4f8)](),this[_0x4307b3(0x5be)][_0x4307b3(0x329)]=[this[_0x4307b3(0x5a3)]],this[_0x4307b3(0x154)][_0x4307b3(0x5a2)](this[_0x4307b3(0x5be)]);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x386)]=Spriteset_Battle['prototype'][_0x304852(0x4e2)],Spriteset_Battle[_0x304852(0x7ba)][_0x304852(0x4e2)]=function(){const _0x56419c=_0x304852;if(VisuMZ['CoreEngine'][_0x56419c(0x5dd)]['UI']['RepositionEnemies']){if('KwQiP'===_0x56419c(0x429)){function _0x4a7dee(){return'';}}else this[_0x56419c(0x71e)]();}VisuMZ['CoreEngine'][_0x56419c(0x386)][_0x56419c(0x1d6)](this);},Spriteset_Battle[_0x304852(0x7ba)][_0x304852(0x71e)]=function(){const _0x4e0e31=_0x304852;for(member of $gameTroop['members']()){member[_0x4e0e31(0x5f0)]();}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x1a8)]=Window_Base[_0x304852(0x7ba)][_0x304852(0x1b6)],Window_Base[_0x304852(0x7ba)]['initialize']=function(_0x4255f){const _0x5e53a7=_0x304852;_0x4255f['x']=Math[_0x5e53a7(0x2f2)](_0x4255f['x']),_0x4255f['y']=Math[_0x5e53a7(0x2f2)](_0x4255f['y']),_0x4255f[_0x5e53a7(0x29e)]=Math[_0x5e53a7(0x2f2)](_0x4255f['width']),_0x4255f[_0x5e53a7(0x1d3)]=Math['round'](_0x4255f[_0x5e53a7(0x1d3)]),this[_0x5e53a7(0x570)](),VisuMZ[_0x5e53a7(0x4ec)][_0x5e53a7(0x1a8)]['call'](this,_0x4255f),this[_0x5e53a7(0x5ce)]();},Window_Base[_0x304852(0x7ba)][_0x304852(0x570)]=function(){const _0x51e737=_0x304852;this[_0x51e737(0x41d)]=VisuMZ[_0x51e737(0x4ec)][_0x51e737(0x5dd)]['QoL'][_0x51e737(0x716)],this[_0x51e737(0x64c)]=VisuMZ[_0x51e737(0x4ec)]['Settings'][_0x51e737(0x409)]['DigitGroupingExText'];},Window_Base['prototype'][_0x304852(0x262)]=function(){const _0x316be3=_0x304852;return VisuMZ[_0x316be3(0x4ec)][_0x316be3(0x5dd)]['Window'][_0x316be3(0x2eb)];},Window_Base['prototype'][_0x304852(0x213)]=function(){const _0x4638e2=_0x304852;return VisuMZ[_0x4638e2(0x4ec)][_0x4638e2(0x5dd)]['Window']['ItemPadding'];},Window_Base[_0x304852(0x7ba)]['updateBackOpacity']=function(){const _0x5a4a45=_0x304852;this[_0x5a4a45(0x46b)]=VisuMZ['CoreEngine'][_0x5a4a45(0x5dd)][_0x5a4a45(0x709)][_0x5a4a45(0x311)];},Window_Base[_0x304852(0x7ba)][_0x304852(0x3bd)]=function(){const _0x58ca5a=_0x304852;return VisuMZ[_0x58ca5a(0x4ec)][_0x58ca5a(0x5dd)][_0x58ca5a(0x709)]['TranslucentOpacity'];},Window_Base[_0x304852(0x7ba)][_0x304852(0x137)]=function(){const _0x45c026=_0x304852;return VisuMZ[_0x45c026(0x4ec)][_0x45c026(0x5dd)][_0x45c026(0x709)][_0x45c026(0x316)];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x744)]=Window_Base[_0x304852(0x7ba)][_0x304852(0x1c2)],Window_Base[_0x304852(0x7ba)][_0x304852(0x1c2)]=function(){const _0x407eef=_0x304852;VisuMZ[_0x407eef(0x4ec)][_0x407eef(0x744)]['call'](this),this[_0x407eef(0x135)]();},Window_Base[_0x304852(0x7ba)][_0x304852(0x264)]=function(){const _0x59b2b7=_0x304852;this['_opening']&&(this['openness']+=this['openingSpeed'](),this['isOpen']()&&(this[_0x59b2b7(0x337)]=![]));},Window_Base['prototype'][_0x304852(0x2e7)]=function(){const _0x11d405=_0x304852;this[_0x11d405(0x523)]&&(this[_0x11d405(0x76b)]-=this[_0x11d405(0x137)](),this['isClosed']()&&(this[_0x11d405(0x523)]=![]));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x1b5)]=Window_Base['prototype']['drawText'],Window_Base['prototype'][_0x304852(0x237)]=function(_0x5df42c,_0x3f8314,_0x3c4e2f,_0x1f9d5d,_0x423698){const _0x128767=_0x304852;if(this[_0x128767(0x11c)]())_0x5df42c=VisuMZ[_0x128767(0x5bf)](_0x5df42c);VisuMZ[_0x128767(0x4ec)][_0x128767(0x1b5)]['call'](this,_0x5df42c,_0x3f8314,_0x3c4e2f,_0x1f9d5d,_0x423698);},Window_Base['prototype'][_0x304852(0x11c)]=function(){const _0x4f2145=_0x304852;return this[_0x4f2145(0x41d)];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x7a4)]=Window_Base[_0x304852(0x7ba)][_0x304852(0x680)],Window_Base[_0x304852(0x7ba)][_0x304852(0x680)]=function(_0x4e4a5a,_0x522517,_0x131042,_0x5d3637){const _0x5246d4=_0x304852;var _0x4f0d75=VisuMZ[_0x5246d4(0x4ec)][_0x5246d4(0x7a4)][_0x5246d4(0x1d6)](this,_0x4e4a5a,_0x522517,_0x131042,_0x5d3637);if(this[_0x5246d4(0x1e9)]())_0x4f0d75[_0x5246d4(0x1e0)]=VisuMZ[_0x5246d4(0x5bf)](_0x4f0d75[_0x5246d4(0x1e0)]);return _0x4f0d75;},Window_Base[_0x304852(0x7ba)][_0x304852(0x1e9)]=function(){const _0x47f700=_0x304852;return this[_0x47f700(0x64c)];},Window_Base[_0x304852(0x7ba)][_0x304852(0x48d)]=function(_0x12ab5e){const _0x2605c7=_0x304852;this[_0x2605c7(0x41d)]=_0x12ab5e;},Window_Base[_0x304852(0x7ba)]['enableDigitGroupingEx']=function(_0x2169c3){const _0x32a783=_0x304852;this[_0x32a783(0x64c)]=_0x2169c3;},VisuMZ['CoreEngine']['Window_Base_drawIcon']=Window_Base['prototype'][_0x304852(0x272)],Window_Base[_0x304852(0x7ba)][_0x304852(0x272)]=function(_0x2e4def,_0x11b9a6,_0x2f1e01){const _0x59c2dc=_0x304852;_0x11b9a6=Math[_0x59c2dc(0x2f2)](_0x11b9a6),_0x2f1e01=Math[_0x59c2dc(0x2f2)](_0x2f1e01),VisuMZ[_0x59c2dc(0x4ec)][_0x59c2dc(0x6d0)][_0x59c2dc(0x1d6)](this,_0x2e4def,_0x11b9a6,_0x2f1e01);},VisuMZ['CoreEngine']['Window_Base_drawFace']=Window_Base[_0x304852(0x7ba)][_0x304852(0x388)],Window_Base[_0x304852(0x7ba)][_0x304852(0x388)]=function(_0x237599,_0x2c756a,_0x1367c8,_0x4fba5c,_0x5416c9,_0x2b3282){const _0x5a5e8e=_0x304852;_0x5416c9=_0x5416c9||ImageManager[_0x5a5e8e(0x3f4)],_0x2b3282=_0x2b3282||ImageManager[_0x5a5e8e(0x7a8)],_0x1367c8=Math[_0x5a5e8e(0x2f2)](_0x1367c8),_0x4fba5c=Math['round'](_0x4fba5c),_0x5416c9=Math[_0x5a5e8e(0x2f2)](_0x5416c9),_0x2b3282=Math[_0x5a5e8e(0x2f2)](_0x2b3282),VisuMZ[_0x5a5e8e(0x4ec)][_0x5a5e8e(0x314)][_0x5a5e8e(0x1d6)](this,_0x237599,_0x2c756a,_0x1367c8,_0x4fba5c,_0x5416c9,_0x2b3282);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x762)]=Window_Base[_0x304852(0x7ba)][_0x304852(0x5e7)],Window_Base['prototype'][_0x304852(0x5e7)]=function(_0x18149e,_0x5b7567,_0x116306,_0x5227e0){const _0x3f31aa=_0x304852;_0x116306=Math[_0x3f31aa(0x2f2)](_0x116306),_0x5227e0=Math['round'](_0x5227e0),VisuMZ['CoreEngine'][_0x3f31aa(0x762)][_0x3f31aa(0x1d6)](this,_0x18149e,_0x5b7567,_0x116306,_0x5227e0);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x3c2)]=Window_Selectable[_0x304852(0x7ba)][_0x304852(0x66f)],Window_Selectable['prototype']['itemRect']=function(_0x49b0ce){const _0x2b1f1a=_0x304852;let _0x294802=VisuMZ['CoreEngine'][_0x2b1f1a(0x3c2)][_0x2b1f1a(0x1d6)](this,_0x49b0ce);return _0x294802['x']=Math[_0x2b1f1a(0x2f2)](_0x294802['x']),_0x294802['y']=Math['round'](_0x294802['y']),_0x294802['width']=Math['round'](_0x294802[_0x2b1f1a(0x29e)]),_0x294802[_0x2b1f1a(0x1d3)]=Math[_0x2b1f1a(0x2f2)](_0x294802[_0x2b1f1a(0x1d3)]),_0x294802;},VisuMZ[_0x304852(0x4ec)][_0x304852(0x165)]=Window_StatusBase[_0x304852(0x7ba)][_0x304852(0x326)],Window_StatusBase['prototype'][_0x304852(0x326)]=function(_0xec6cd3,_0x1534c2,_0x7ca6b5){const _0x2b7840=_0x304852;_0x1534c2=Math['round'](_0x1534c2),_0x7ca6b5=Math[_0x2b7840(0x2f2)](_0x7ca6b5),VisuMZ['CoreEngine'][_0x2b7840(0x165)][_0x2b7840(0x1d6)](this,_0xec6cd3,_0x1534c2,_0x7ca6b5);},Window_Base[_0x304852(0x7ba)]['initCoreEasing']=function(){const _0x16a325=_0x304852;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x16a325(0x7b4),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x16a325(0xea)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x16a325(0x68b)],'targetBackOpacity':this[_0x16a325(0x46b)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x304852(0x7ba)][_0x304852(0x135)]=function(){const _0x3ce16a=_0x304852;if(!this[_0x3ce16a(0x4b5)])return;if(this['_coreEasing'][_0x3ce16a(0x598)]<=0x0)return;this['x']=this[_0x3ce16a(0x279)](this['x'],this[_0x3ce16a(0x4b5)]['targetX']),this['y']=this[_0x3ce16a(0x279)](this['y'],this[_0x3ce16a(0x4b5)]['targetY']),this[_0x3ce16a(0xea)]['x']=this[_0x3ce16a(0x279)](this[_0x3ce16a(0xea)]['x'],this[_0x3ce16a(0x4b5)][_0x3ce16a(0x436)]),this[_0x3ce16a(0xea)]['y']=this[_0x3ce16a(0x279)](this[_0x3ce16a(0xea)]['y'],this[_0x3ce16a(0x4b5)][_0x3ce16a(0x665)]),this[_0x3ce16a(0x68b)]=this[_0x3ce16a(0x279)](this[_0x3ce16a(0x68b)],this[_0x3ce16a(0x4b5)][_0x3ce16a(0x5a5)]),this[_0x3ce16a(0x46b)]=this[_0x3ce16a(0x279)](this[_0x3ce16a(0x46b)],this['_coreEasing'][_0x3ce16a(0x5cb)]),this[_0x3ce16a(0x21d)]=this[_0x3ce16a(0x279)](this['contentsOpacity'],this[_0x3ce16a(0x4b5)]['targetContentsOpacity']),this[_0x3ce16a(0x4b5)][_0x3ce16a(0x598)]--;},Window_Base[_0x304852(0x7ba)][_0x304852(0x279)]=function(_0x5597dd,_0x2df6db){const _0xa8e2f7=_0x304852;if(!this['_coreEasing'])return _0x2df6db;const _0x2118e4=this[_0xa8e2f7(0x4b5)][_0xa8e2f7(0x598)],_0x3c3beb=this[_0xa8e2f7(0x4b5)][_0xa8e2f7(0x24c)],_0x383c26=this[_0xa8e2f7(0x674)]((_0x3c3beb-_0x2118e4)/_0x3c3beb),_0x15ada6=this['calcCoreEasing']((_0x3c3beb-_0x2118e4+0x1)/_0x3c3beb),_0x32f6ee=(_0x5597dd-_0x2df6db*_0x383c26)/(0x1-_0x383c26);return _0x32f6ee+(_0x2df6db-_0x32f6ee)*_0x15ada6;},Window_Base[_0x304852(0x7ba)][_0x304852(0x674)]=function(_0x1b1500){const _0x231a2c=_0x304852;if(!this['_coreEasing'])return _0x1b1500;return VisuMZ[_0x231a2c(0x1b8)](_0x1b1500,this[_0x231a2c(0x4b5)][_0x231a2c(0x3e5)]||_0x231a2c(0x7b4));},Window_Base[_0x304852(0x7ba)][_0x304852(0x6f5)]=function(_0x499a23,_0x4c2ff2){const _0x3f45b1=_0x304852;if(!this[_0x3f45b1(0x4b5)])return;this['x']=this[_0x3f45b1(0x4b5)]['targetX'],this['y']=this[_0x3f45b1(0x4b5)][_0x3f45b1(0x512)],this[_0x3f45b1(0xea)]['x']=this[_0x3f45b1(0x4b5)][_0x3f45b1(0x436)],this[_0x3f45b1(0xea)]['y']=this[_0x3f45b1(0x4b5)][_0x3f45b1(0x665)],this['opacity']=this[_0x3f45b1(0x4b5)]['targetOpacity'],this[_0x3f45b1(0x46b)]=this[_0x3f45b1(0x4b5)][_0x3f45b1(0x5cb)],this['contentsOpacity']=this[_0x3f45b1(0x4b5)]['targetContentsOpacity'],this[_0x3f45b1(0x534)](_0x499a23,_0x4c2ff2,this['x'],this['y'],this[_0x3f45b1(0xea)]['x'],this[_0x3f45b1(0xea)]['y'],this[_0x3f45b1(0x68b)],this[_0x3f45b1(0x46b)],this['contentsOpacity']);},Window_Base[_0x304852(0x7ba)][_0x304852(0x534)]=function(_0x5ab458,_0x440ca0,_0x4f6b43,_0x2f603a,_0x310dcb,_0x5abe34,_0x31dcba,_0xa23928,_0x241b10){const _0x2653a5=_0x304852;this[_0x2653a5(0x4b5)]={'duration':_0x5ab458,'wholeDuration':_0x5ab458,'type':_0x440ca0,'targetX':_0x4f6b43,'targetY':_0x2f603a,'targetScaleX':_0x310dcb,'targetScaleY':_0x5abe34,'targetOpacity':_0x31dcba,'targetBackOpacity':_0xa23928,'targetContentsOpacity':_0x241b10};},Window_Base[_0x304852(0x7ba)][_0x304852(0x2ab)]=function(_0x2640b6,_0x5e3093,_0xcba4b,_0x2377ed,_0x49aa73){const _0x423741=_0x304852;this[_0x423741(0x579)](),this[_0x423741(0x755)][_0x423741(0x514)]=VisuMZ['CoreEngine'][_0x423741(0x5dd)][_0x423741(0x736)][_0x423741(0x416)];const _0x1a6913=VisuMZ[_0x423741(0x4ec)][_0x423741(0x5dd)]['Gold'][_0x423741(0x695)];if(_0x1a6913>0x0&&_0x5e3093===TextManager[_0x423741(0x215)]){const _0x51d48d=_0x2377ed+(this[_0x423741(0x262)]()-ImageManager[_0x423741(0x5d1)])/0x2;this[_0x423741(0x272)](_0x1a6913,_0xcba4b+(_0x49aa73-ImageManager[_0x423741(0x765)]),_0x51d48d),_0x49aa73-=ImageManager['iconWidth']+0x4;}else{if('gsRCC'===_0x423741(0x563)){function _0xd76028(){const _0xf31d61=_0x423741;_0x3e00ae[_0xf31d61(0x59f)](!![]);}}else this[_0x423741(0x48f)](ColorManager[_0x423741(0x5ac)]()),this['drawText'](_0x5e3093,_0xcba4b,_0x2377ed,_0x49aa73,_0x423741(0x348)),_0x49aa73-=this[_0x423741(0x622)](_0x5e3093)+0x6;}this[_0x423741(0xce)]();const _0x3b67a8=this[_0x423741(0x622)](this[_0x423741(0x41d)]?VisuMZ['GroupDigits'](_0x2640b6):_0x2640b6);if(_0x3b67a8>_0x49aa73)this[_0x423741(0x237)](VisuMZ['CoreEngine'][_0x423741(0x5dd)][_0x423741(0x736)][_0x423741(0x6fd)],_0xcba4b,_0x2377ed,_0x49aa73,_0x423741(0x348));else{if(_0x423741(0x180)===_0x423741(0x180))this['drawText'](_0x2640b6,_0xcba4b,_0x2377ed,_0x49aa73,'right');else{function _0x2f3105(){const _0x41e2b8=_0x423741;this[_0x41e2b8(0x472)]([_0x5d4563],_0x25531b,_0x417ee8,_0x5be877,_0x31021d),_0x40e8fc+=_0x177100;}}}this[_0x423741(0x579)]();},Window_Base['prototype']['drawIconBySize']=function(_0x2bbd8d,_0x42728e,_0x1c4a4a,_0x5ec2bc,_0x2ec16e){const _0x3dce70=_0x304852,_0xcd20c=ImageManager['loadSystem'](_0x3dce70(0x38b)),_0x23cfad=ImageManager[_0x3dce70(0x765)],_0x20e92d=ImageManager[_0x3dce70(0x5d1)],_0x25696f=_0x2bbd8d%0x10*_0x23cfad,_0x39e722=Math[_0x3dce70(0x392)](_0x2bbd8d/0x10)*_0x20e92d,_0x38e212=_0x5ec2bc,_0x39f7b3=_0x5ec2bc;this[_0x3dce70(0x755)][_0x3dce70(0x770)][_0x3dce70(0x3b6)]=_0x2ec16e,this['contents'][_0x3dce70(0x397)](_0xcd20c,_0x25696f,_0x39e722,_0x23cfad,_0x20e92d,_0x42728e,_0x1c4a4a,_0x38e212,_0x39f7b3),this[_0x3dce70(0x755)][_0x3dce70(0x770)][_0x3dce70(0x3b6)]=!![];},Window_Base[_0x304852(0x7ba)][_0x304852(0x2ae)]=function(_0x418250,_0x4d2c54,_0x2840d0,_0x47fec0,_0x253242,_0x41e223){const _0x4b279f=_0x304852,_0x44fce8=Math[_0x4b279f(0x392)]((_0x2840d0-0x2)*_0x47fec0),_0x45a470=Sprite_Gauge[_0x4b279f(0x7ba)]['gaugeHeight'][_0x4b279f(0x1d6)](this),_0x123597=_0x4d2c54+this['lineHeight']()-_0x45a470-0x2;this['contents'][_0x4b279f(0x567)](_0x418250,_0x123597,_0x2840d0,_0x45a470,ColorManager[_0x4b279f(0x7ae)]()),this[_0x4b279f(0x755)][_0x4b279f(0x177)](_0x418250+0x1,_0x123597+0x1,_0x44fce8,_0x45a470-0x2,_0x253242,_0x41e223);},Window_Selectable[_0x304852(0x7ba)][_0x304852(0x2df)]=function(_0x45afec){const _0x4f3ce2=_0x304852;let _0x357c66=this[_0x4f3ce2(0x66c)]();const _0x18a23d=this[_0x4f3ce2(0x334)](),_0x3574a0=this[_0x4f3ce2(0x3b7)]();if(this['isUseModernControls']()&&(_0x357c66<_0x18a23d||_0x45afec&&_0x3574a0===0x1)){_0x357c66+=_0x3574a0;if(_0x357c66>=_0x18a23d)_0x357c66=_0x18a23d-0x1;this[_0x4f3ce2(0x426)](_0x357c66);}else!this[_0x4f3ce2(0x4d1)]()&&((_0x357c66<_0x18a23d-_0x3574a0||_0x45afec&&_0x3574a0===0x1)&&this['smoothSelect']((_0x357c66+_0x3574a0)%_0x18a23d));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x596)]=Window_Selectable[_0x304852(0x7ba)][_0x304852(0x2df)],Window_Selectable[_0x304852(0x7ba)][_0x304852(0x2df)]=function(_0x42e99b){const _0x51683e=_0x304852;this[_0x51683e(0x4d1)]()&&_0x42e99b&&this[_0x51683e(0x3b7)]()===0x1&&this[_0x51683e(0x66c)]()===this[_0x51683e(0x334)]()-0x1?this['smoothSelect'](0x0):VisuMZ[_0x51683e(0x4ec)][_0x51683e(0x596)]['call'](this,_0x42e99b);},Window_Selectable['prototype'][_0x304852(0x583)]=function(_0x3266dd){const _0x50d645=_0x304852;let _0x5a06dd=Math[_0x50d645(0x710)](0x0,this['index']());const _0x11ea6c=this['maxItems'](),_0x527c64=this[_0x50d645(0x3b7)]();if(this[_0x50d645(0x4d1)]()&&_0x5a06dd>0x0||_0x3266dd&&_0x527c64===0x1){if(_0x50d645(0x380)===_0x50d645(0x380)){_0x5a06dd-=_0x527c64;if(_0x5a06dd<=0x0)_0x5a06dd=0x0;this['smoothSelect'](_0x5a06dd);}else{function _0x1bd597(){const _0x3c0e08=_0x50d645;this['_pressed']||this[_0x3c0e08(0x798)]?this[_0x3c0e08(0x68b)]=0xff:(this[_0x3c0e08(0x68b)]+=this[_0x3c0e08(0x1da)]?this[_0x3c0e08(0x30e)]():-0x1*this[_0x3c0e08(0x30e)](),this[_0x3c0e08(0x68b)]=_0x47c74c[_0x3c0e08(0x7a0)](0xc0,this[_0x3c0e08(0x68b)]));}}}else!this[_0x50d645(0x4d1)]()&&((_0x5a06dd>=_0x527c64||_0x3266dd&&_0x527c64===0x1)&&this[_0x50d645(0x426)]((_0x5a06dd-_0x527c64+_0x11ea6c)%_0x11ea6c));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x20a)]=Window_Selectable[_0x304852(0x7ba)][_0x304852(0x583)],Window_Selectable[_0x304852(0x7ba)][_0x304852(0x583)]=function(_0x41536f){const _0x56fc2f=_0x304852;if(this['isUseModernControls']()&&_0x41536f&&this[_0x56fc2f(0x3b7)]()===0x1&&this[_0x56fc2f(0x66c)]()===0x0){if(_0x56fc2f(0x764)==='PErxM'){function _0x5ca351(){const _0xe65446=_0x56fc2f;_0x39c46b['DrawItemBackgroundJS'][_0xe65446(0x1d6)](this,_0x416192);}}else this[_0x56fc2f(0x426)](this['maxItems']()-0x1);}else VisuMZ[_0x56fc2f(0x4ec)][_0x56fc2f(0x20a)][_0x56fc2f(0x1d6)](this,_0x41536f);},Window_Selectable[_0x304852(0x7ba)][_0x304852(0x4d1)]=function(){const _0x2c3b14=_0x304852;return VisuMZ['CoreEngine'][_0x2c3b14(0x5dd)][_0x2c3b14(0x409)][_0x2c3b14(0x4ef)];},VisuMZ[_0x304852(0x4ec)][_0x304852(0x652)]=Window_Selectable[_0x304852(0x7ba)][_0x304852(0x1e1)],Window_Selectable[_0x304852(0x7ba)][_0x304852(0x1e1)]=function(){const _0x585c3f=_0x304852;this[_0x585c3f(0x4d1)]()?(this[_0x585c3f(0x12c)](),this[_0x585c3f(0x13f)]()):VisuMZ['CoreEngine']['Window_Selectable_processCursorMove'][_0x585c3f(0x1d6)](this);},Window_Selectable[_0x304852(0x7ba)][_0x304852(0x3a3)]=function(){return!![];},Window_Selectable[_0x304852(0x7ba)][_0x304852(0x12c)]=function(){const _0x1c16e0=_0x304852;if(this[_0x1c16e0(0x658)]()){const _0x3a9ec4=this[_0x1c16e0(0x66c)]();if(Input['isRepeated'](_0x1c16e0(0x1d8))){if(Input[_0x1c16e0(0x542)](_0x1c16e0(0x4b6))&&this[_0x1c16e0(0x3a3)]()){if(_0x1c16e0(0x143)!=='TlkjT')this['cursorPagedown']();else{function _0xa9b394(){const _0x1b9018=_0x1c16e0;return _0x41e6d6[_0x1b9018(0x4ec)][_0x1b9018(0x5dd)][_0x1b9018(0x6c8)][_0x1b9018(0x3a2)];}}}else this[_0x1c16e0(0x2df)](Input[_0x1c16e0(0x558)](_0x1c16e0(0x1d8)));}Input[_0x1c16e0(0x229)]('up')&&(Input[_0x1c16e0(0x542)]('shift')&&this[_0x1c16e0(0x3a3)]()?this['cursorPageup']():this[_0x1c16e0(0x583)](Input[_0x1c16e0(0x558)]('up')));if(Input['isRepeated'](_0x1c16e0(0x348))){if(_0x1c16e0(0x4b0)!=='inWwf')this[_0x1c16e0(0x222)](Input[_0x1c16e0(0x558)]('right'));else{function _0x3ee418(){const _0x191458=_0x1c16e0;if(this[_0x191458(0x29f)]===_0x191458(0x48e)&&!_0x438cdf[_0x191458(0x4d0)]())return;if(_0x23191d[_0x191458(0x124)]())return;_0x43cada[_0x191458(0x4ec)][_0x191458(0x2ea)]['call'](this,_0x2b0f0b),this[_0x191458(0x41a)](_0x191458(0x4c2));}}}Input[_0x1c16e0(0x229)](_0x1c16e0(0x132))&&this[_0x1c16e0(0x5ad)](Input['isTriggered'](_0x1c16e0(0x132))),!this[_0x1c16e0(0x398)](_0x1c16e0(0x16d))&&Input['isRepeated'](_0x1c16e0(0x16d))&&this['cursorPagedown'](),!this[_0x1c16e0(0x398)](_0x1c16e0(0x1aa))&&Input[_0x1c16e0(0x229)](_0x1c16e0(0x1aa))&&this[_0x1c16e0(0x79b)](),this['index']()!==_0x3a9ec4&&this[_0x1c16e0(0x47a)]();}},Window_Selectable[_0x304852(0x7ba)]['processCursorHomeEndTrigger']=function(){const _0x5c4959=_0x304852;if(this[_0x5c4959(0x658)]()){if(_0x5c4959(0x1dc)===_0x5c4959(0x1dc)){const _0x10a289=this[_0x5c4959(0x66c)]();Input[_0x5c4959(0x558)](_0x5c4959(0x287))&&this[_0x5c4959(0x426)](Math[_0x5c4959(0x7a0)](this[_0x5c4959(0x66c)](),0x0));Input[_0x5c4959(0x558)]('end')&&this[_0x5c4959(0x426)](Math[_0x5c4959(0x710)](this[_0x5c4959(0x66c)](),this[_0x5c4959(0x334)]()-0x1));if(this[_0x5c4959(0x66c)]()!==_0x10a289){if('iIsJh'==='iIsJh')this[_0x5c4959(0x47a)]();else{function _0x334a47(){const _0xa583ad=_0x5c4959;_0x416de7[_0xa583ad(0xd0)]()&&(_0x4c68dc[_0xa583ad(0x3f8)](_0xa583ad(0x404)),_0x5d6b78[_0xa583ad(0x3f8)](_0x5c84e0)),this[_0xa583ad(0x750)]();}}}}else{function _0x5195f4(){const _0x3f5968=_0x5c4959;_0x34b606=_0x4576c0[_0x3f5968(0x2c8)](),_0x3a8604=_0xcdce1f[_0x3f5968(0x732)]();}}}},VisuMZ['CoreEngine']['Window_Selectable_processTouch']=Window_Selectable['prototype'][_0x304852(0x799)],Window_Selectable['prototype'][_0x304852(0x799)]=function(){const _0x21a8ed=_0x304852;if(this[_0x21a8ed(0x4d1)]()){if(_0x21a8ed(0x190)!==_0x21a8ed(0x190)){function _0x2a6565(){const _0x5e3501=_0x21a8ed;var _0x15e1db=_0x8b9ba2(_0x2e1680['$1']);try{_0xd0b55e=_0x1c3105[_0x5e3501(0x710)](_0x558f93,_0x336000(_0x3e9549(_0x15e1db)));}catch(_0x4cad60){if(_0x6ad0f0[_0x5e3501(0xd0)]())_0x14d21b[_0x5e3501(0x3f8)](_0x4cad60);}}}else this[_0x21a8ed(0x528)]();}else{if('ckyZi'!=='ckyZi'){function _0x8c45b(){const _0xdb0e31=_0x21a8ed;return _0xda517d&&_0x3373c7[_0xdb0e31(0x2d5)]?_0x1017eb[_0xdb0e31(0x2d5)][_0xdb0e31(0x458)]():!![];}}else VisuMZ[_0x21a8ed(0x4ec)]['Window_Selectable_processTouch'][_0x21a8ed(0x1d6)](this);}},Window_Selectable[_0x304852(0x7ba)][_0x304852(0x528)]=function(){const _0x112346=_0x304852;VisuMZ[_0x112346(0x4ec)]['Window_Selectable_processTouch'][_0x112346(0x1d6)](this);},Window_Selectable[_0x304852(0x7ba)][_0x304852(0x730)]=function(){const _0x5be7a0=_0x304852;return VisuMZ['CoreEngine']['Settings'][_0x5be7a0(0x709)][_0x5be7a0(0x3d3)];},Window_Selectable[_0x304852(0x7ba)][_0x304852(0x6e0)]=function(){const _0xc4039a=_0x304852;return VisuMZ[_0xc4039a(0x4ec)][_0xc4039a(0x5dd)][_0xc4039a(0x709)][_0xc4039a(0x39b)];},Window_Selectable['prototype']['itemHeight']=function(){const _0xe16b26=_0x304852;return Window_Scrollable[_0xe16b26(0x7ba)][_0xe16b26(0x551)][_0xe16b26(0x1d6)](this)+VisuMZ[_0xe16b26(0x4ec)]['Settings']['Window'][_0xe16b26(0x68c)];;},VisuMZ[_0x304852(0x4ec)]['Window_Selectable_drawBackgroundRect']=Window_Selectable['prototype']['drawBackgroundRect'],Window_Selectable[_0x304852(0x7ba)][_0x304852(0x5a6)]=function(_0x999c17){const _0x5b56c1=_0x304852,_0x1add81=VisuMZ[_0x5b56c1(0x4ec)][_0x5b56c1(0x5dd)]['Window'];if(_0x1add81[_0x5b56c1(0x2ba)]===![])return;_0x1add81['DrawItemBackgroundJS']?_0x1add81['DrawItemBackgroundJS']['call'](this,_0x999c17):VisuMZ[_0x5b56c1(0x4ec)][_0x5b56c1(0x157)][_0x5b56c1(0x1d6)](this,_0x999c17);},VisuMZ[_0x304852(0x4ec)]['Window_Gold_refresh']=Window_Gold['prototype'][_0x304852(0x268)],Window_Gold['prototype'][_0x304852(0x268)]=function(){const _0x381092=_0x304852;if(this[_0x381092(0x40f)]())this['drawGoldItemStyle']();else{if(_0x381092(0x6ba)===_0x381092(0x6ba))VisuMZ[_0x381092(0x4ec)]['Window_Gold_refresh']['call'](this);else{function _0x310061(){const _0x2f443f=_0x381092;_0x4f1b99=_0x8e4d70[_0x2f443f(0x789)]-_0x504154;}}}},Window_Gold[_0x304852(0x7ba)][_0x304852(0x40f)]=function(){const _0x5dadba=_0x304852;if(TextManager[_0x5dadba(0x215)]!==this[_0x5dadba(0x215)]())return![];return VisuMZ[_0x5dadba(0x4ec)]['Settings']['Gold'][_0x5dadba(0x118)];},Window_Gold[_0x304852(0x7ba)]['drawGoldItemStyle']=function(){const _0x215701=_0x304852;this['resetFontSettings'](),this[_0x215701(0x755)][_0x215701(0x3f2)](),this[_0x215701(0x755)][_0x215701(0x514)]=VisuMZ[_0x215701(0x4ec)][_0x215701(0x5dd)][_0x215701(0x736)][_0x215701(0x416)];const _0xcc309c=VisuMZ[_0x215701(0x4ec)][_0x215701(0x5dd)][_0x215701(0x736)][_0x215701(0x695)],_0x30d052=this[_0x215701(0x212)](0x0);if(_0xcc309c>0x0){if(_0x215701(0x5dc)===_0x215701(0x6db)){function _0x5d6811(){const _0x198abb=_0x215701;_0x5ecaa9+=this[_0x198abb(0x216)][_0x43d311][_0x198abb(0x4a5)][0x0]+'\x0a',_0x2f2d0a++;}}else{const _0x37130a=_0x30d052['y']+(this[_0x215701(0x262)]()-ImageManager['iconHeight'])/0x2;this[_0x215701(0x272)](_0xcc309c,_0x30d052['x'],_0x37130a);const _0x3f6f2b=ImageManager[_0x215701(0x765)]+0x4;_0x30d052['x']+=_0x3f6f2b,_0x30d052[_0x215701(0x29e)]-=_0x3f6f2b;}}this[_0x215701(0x48f)](ColorManager[_0x215701(0x5ac)]()),this['drawText'](this[_0x215701(0x215)](),_0x30d052['x'],_0x30d052['y'],_0x30d052['width'],'left');const _0x50f44d=this[_0x215701(0x622)](this['currencyUnit']())+0x6;;_0x30d052['x']+=_0x50f44d,_0x30d052[_0x215701(0x29e)]-=_0x50f44d,this[_0x215701(0xce)]();const _0x1f8790=this[_0x215701(0xf5)](),_0x4d906a=this['textWidth'](this[_0x215701(0x41d)]?VisuMZ[_0x215701(0x5bf)](this[_0x215701(0xf5)]()):this['value']());if(_0x4d906a>_0x30d052[_0x215701(0x29e)])this['drawText'](VisuMZ[_0x215701(0x4ec)][_0x215701(0x5dd)][_0x215701(0x736)][_0x215701(0x6fd)],_0x30d052['x'],_0x30d052['y'],_0x30d052['width'],_0x215701(0x348));else{if('tOwOL'!==_0x215701(0x312)){function _0x57c933(){const _0x5523e5=_0x215701,_0xd153e=_0x3846fa['CoreEngine'][_0x5523e5(0x5dd)]['ScreenShake'];if(_0xd153e&&_0xd153e[_0x5523e5(0x3aa)])return _0xd153e[_0x5523e5(0x3aa)][_0x5523e5(0x1d6)](this);const _0x1659ab=_0xc56c7d['_shakePower']*0.75,_0xf3a228=_0xab702c[_0x5523e5(0x54b)]*0.6,_0x1bd7f9=_0x3baa32['_shakeDuration'];this['y']+=_0x1d1c6e[_0x5523e5(0x2f2)](_0x430479[_0x5523e5(0x1e2)](_0x1659ab)-_0x3f6ae1[_0x5523e5(0x1e2)](_0xf3a228))*(_0x3f1410[_0x5523e5(0x7a0)](_0x1bd7f9,0x1e)*0.5);}}else this['drawText'](this[_0x215701(0xf5)](),_0x30d052['x'],_0x30d052['y'],_0x30d052['width'],_0x215701(0x348));}this[_0x215701(0x579)]();},Window_StatusBase[_0x304852(0x7ba)]['drawParamText']=function(_0x17cb19,_0x231bdf,_0x9f2042,_0x406b15,_0x173746){const _0x2a31bb=_0x304852;_0x406b15=String(_0x406b15||'')['toUpperCase']();if(VisuMZ[_0x2a31bb(0x4ec)][_0x2a31bb(0x5dd)]['Param']['DrawIcons']){const _0x22a29c=VisuMZ['GetParamIcon'](_0x406b15);_0x173746?(this['drawIconBySize'](_0x22a29c,_0x17cb19,_0x231bdf,this['gaugeLineHeight']()),_0x9f2042-=this[_0x2a31bb(0x496)]()+0x2,_0x17cb19+=this[_0x2a31bb(0x496)]()+0x2):(this['drawIcon'](_0x22a29c,_0x17cb19+0x2,_0x231bdf+0x2),_0x9f2042-=ImageManager[_0x2a31bb(0x765)]+0x4,_0x17cb19+=ImageManager['iconWidth']+0x4);}const _0x38cb57=TextManager[_0x2a31bb(0x32c)](_0x406b15);this[_0x2a31bb(0x579)](),this['changeTextColor'](ColorManager[_0x2a31bb(0x5ac)]());if(_0x173746){if(_0x2a31bb(0x33a)===_0x2a31bb(0x3b2)){function _0x1f57cc(){const _0x34b19a=_0x2a31bb;this[_0x34b19a(0x755)][_0x34b19a(0x514)]=this['smallParamFontSize'](),this[_0x34b19a(0x755)]['drawText'](_0xf63b6b,_0x44bd0a,_0x4b74e5,_0x5b6dc9,this[_0x34b19a(0x496)](),_0x34b19a(0x132));}}else this[_0x2a31bb(0x755)]['fontSize']=this[_0x2a31bb(0x2ff)](),this[_0x2a31bb(0x755)][_0x2a31bb(0x237)](_0x38cb57,_0x17cb19,_0x231bdf,_0x9f2042,this[_0x2a31bb(0x496)](),_0x2a31bb(0x132));}else this['drawText'](_0x38cb57,_0x17cb19,_0x231bdf,_0x9f2042);this[_0x2a31bb(0x579)]();},Window_StatusBase[_0x304852(0x7ba)]['smallParamFontSize']=function(){const _0x5b9a43=_0x304852;return $gameSystem[_0x5b9a43(0x332)]()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0x2671ce,_0x329198,_0x5d9da3,_0x402f90){const _0x5e336a=_0x304852;_0x402f90=_0x402f90||0xa8,this['resetTextColor']();if(VisuMZ[_0x5e336a(0x4ec)][_0x5e336a(0x5dd)]['UI'][_0x5e336a(0x4f1)]){if(_0x5e336a(0x1a3)!==_0x5e336a(0x1a3)){function _0x1fd372(){return'';}}else this[_0x5e336a(0x79d)](_0x2671ce[_0x5e336a(0x4b4)]()['name'],_0x329198,_0x5d9da3,_0x402f90);}else{const _0x10161d=_0x2671ce[_0x5e336a(0x4b4)]()['name'][_0x5e336a(0x333)](/\\I\[(\d+)\]/gi,'');this[_0x5e336a(0x237)](_0x10161d,_0x329198,_0x5d9da3,_0x402f90);}},Window_StatusBase['prototype'][_0x304852(0x2b4)]=function(_0x28efd1,_0x25b223,_0x6d0b69,_0x579efc){const _0x2777e9=_0x304852;_0x579efc=_0x579efc||0x10e,this[_0x2777e9(0xce)]();if(VisuMZ[_0x2777e9(0x4ec)][_0x2777e9(0x5dd)]['UI'][_0x2777e9(0x160)])this[_0x2777e9(0x79d)](_0x28efd1[_0x2777e9(0x6d4)](),_0x25b223,_0x6d0b69,_0x579efc);else{if(_0x2777e9(0x49d)==='jNqhL'){const _0x1a1a79=_0x28efd1['nickname']()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x2777e9(0x237)](_0x28efd1[_0x2777e9(0x6d4)](),_0x25b223,_0x6d0b69,_0x579efc);}else{function _0x2fb0e7(){const _0x5e7505=_0x2777e9;this[_0x5e7505(0x41a)]('default');}}}},VisuMZ[_0x304852(0x4ec)]['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x304852(0x7ba)][_0x304852(0x460)],Window_StatusBase[_0x304852(0x7ba)][_0x304852(0x460)]=function(_0x5b8dc8,_0x286504,_0x1bebe9){const _0xf7b22b=_0x304852;if(this[_0xf7b22b(0x2ed)]())this[_0xf7b22b(0x58b)](_0x5b8dc8,_0x286504,_0x1bebe9);VisuMZ[_0xf7b22b(0x4ec)]['Window_StatusBase_drawActorLevel'][_0xf7b22b(0x1d6)](this,_0x5b8dc8,_0x286504,_0x1bebe9);},Window_StatusBase['prototype']['isExpGaugeDrawn']=function(){const _0x144399=_0x304852;return VisuMZ[_0x144399(0x4ec)]['Settings']['UI'][_0x144399(0xbf)];},Window_StatusBase['prototype'][_0x304852(0x58b)]=function(_0x2afada,_0x2121b6,_0x231b18){const _0x26c07d=_0x304852;if(!_0x2afada)return;if(!_0x2afada['isActor']())return;const _0xbce84f=0x80,_0x52ba31=_0x2afada[_0x26c07d(0x156)]();let _0xb0a3c2=ColorManager[_0x26c07d(0x693)](),_0x2abbc1=ColorManager['expGaugeColor2']();_0x52ba31>=0x1&&(_0xb0a3c2=ColorManager[_0x26c07d(0x2c8)](),_0x2abbc1=ColorManager[_0x26c07d(0x732)]()),this[_0x26c07d(0x2ae)](_0x2121b6,_0x231b18,_0xbce84f,_0x52ba31,_0xb0a3c2,_0x2abbc1);},Window_EquipStatus[_0x304852(0x7ba)][_0x304852(0xc7)]=function(){const _0x3d577f=_0x304852;let _0x1be065=0x0;for(const _0x3d77c5 of VisuMZ[_0x3d577f(0x4ec)][_0x3d577f(0x5dd)][_0x3d577f(0x6c6)]['DisplayedParams']){const _0x137c68=this['itemPadding'](),_0x2f73a7=this[_0x3d577f(0x2b5)](_0x1be065);this['drawItem'](_0x137c68,_0x2f73a7,_0x3d77c5),_0x1be065++;}},Window_EquipStatus[_0x304852(0x7ba)][_0x304852(0x76c)]=function(_0x590bcf,_0x580516,_0x1d50e4){const _0x40ca61=_0x304852,_0x4290fe=this[_0x40ca61(0x363)]()-this[_0x40ca61(0x213)]()*0x2;this['drawParamText'](_0x590bcf,_0x580516,_0x4290fe,_0x1d50e4,![]);},Window_EquipStatus[_0x304852(0x7ba)][_0x304852(0x1ef)]=function(_0x4affa5,_0x154c52,_0x8f1549){const _0x5abd91=_0x304852,_0x16d29a=this[_0x5abd91(0x3e7)]();this[_0x5abd91(0xce)](),this[_0x5abd91(0x237)](this[_0x5abd91(0x2c7)][_0x5abd91(0x22e)](_0x8f1549,!![]),_0x4affa5,_0x154c52,_0x16d29a,'right');},Window_EquipStatus['prototype'][_0x304852(0x439)]=function(_0x56ee3e,_0x201a1e){const _0x2194b2=_0x304852,_0x1347be=this[_0x2194b2(0x67a)]();this[_0x2194b2(0x48f)](ColorManager[_0x2194b2(0x5ac)]());const _0x4f8221=VisuMZ[_0x2194b2(0x4ec)]['Settings']['UI'][_0x2194b2(0x281)];this['drawText'](_0x4f8221,_0x56ee3e,_0x201a1e,_0x1347be,_0x2194b2(0x44f));},Window_EquipStatus[_0x304852(0x7ba)][_0x304852(0x2cf)]=function(_0x795b37,_0x38b2e9,_0x4a0fe5){const _0x180dc8=_0x304852,_0x504428=this[_0x180dc8(0x3e7)](),_0x13e02a=this[_0x180dc8(0x47d)][_0x180dc8(0x22e)](_0x4a0fe5),_0x270e40=_0x13e02a-this[_0x180dc8(0x2c7)]['paramValueByName'](_0x4a0fe5);this['changeTextColor'](ColorManager[_0x180dc8(0x1ab)](_0x270e40)),this['drawText'](this[_0x180dc8(0x47d)][_0x180dc8(0x22e)](_0x4a0fe5,!![]),_0x795b37,_0x38b2e9,_0x504428,_0x180dc8(0x348));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x7a2)]=Window_EquipItem['prototype'][_0x304852(0x218)],Window_EquipItem[_0x304852(0x7ba)][_0x304852(0x218)]=function(_0x4c52ce){const _0xc7ecb6=_0x304852;return _0x4c52ce&&this[_0xc7ecb6(0x2c7)]?this[_0xc7ecb6(0x2c7)][_0xc7ecb6(0x14d)](_0x4c52ce):VisuMZ['CoreEngine'][_0xc7ecb6(0x7a2)][_0xc7ecb6(0x1d6)](this,_0x4c52ce);},Window_StatusParams[_0x304852(0x7ba)][_0x304852(0x334)]=function(){const _0x14dfc9=_0x304852;return VisuMZ['CoreEngine']['Settings'][_0x14dfc9(0x6c6)][_0x14dfc9(0x2a3)]['length'];},Window_StatusParams[_0x304852(0x7ba)]['drawItem']=function(_0x4342e0){const _0x5aee1c=_0x304852,_0x594ddc=this[_0x5aee1c(0x212)](_0x4342e0),_0x4d74a0=VisuMZ['CoreEngine']['Settings'][_0x5aee1c(0x6c6)][_0x5aee1c(0x2a3)][_0x4342e0],_0xbc3698=TextManager['param'](_0x4d74a0),_0x4faf47=this[_0x5aee1c(0x2c7)][_0x5aee1c(0x22e)](_0x4d74a0,!![]);this[_0x5aee1c(0x357)](_0x594ddc['x'],_0x594ddc['y'],0xa0,_0x4d74a0,![]),this[_0x5aee1c(0xce)](),this['drawText'](_0x4faf47,_0x594ddc['x']+0xa0,_0x594ddc['y'],0x3c,_0x5aee1c(0x348));};if(VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x15e)][_0x304852(0x442)]){VisuMZ[_0x304852(0x4ec)]['Settings']['KeyboardInput'][_0x304852(0x4d6)]&&(Window_NameInput[_0x304852(0x580)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x304852(0x4ec)][_0x304852(0x405)]=Window_NameInput[_0x304852(0x7ba)]['initialize'],Window_NameInput['prototype'][_0x304852(0x1b6)]=function(_0x3ba98c){const _0x4c5416=_0x304852;this[_0x4c5416(0x29f)]=this[_0x4c5416(0x5e3)](),VisuMZ['CoreEngine']['Window_NameInput_initialize'][_0x4c5416(0x1d6)](this,_0x3ba98c);if(this[_0x4c5416(0x29f)]===_0x4c5416(0x4c2))this[_0x4c5416(0x12d)](0x0);else{if(_0x4c5416(0x3e6)===_0x4c5416(0x5d2)){function _0x35e36f(){const _0x182ce9=_0x4c5416;this[_0x182ce9(0xdd)]();}}else Input[_0x4c5416(0x3f2)](),this['deselect']();}},Window_NameInput[_0x304852(0x7ba)][_0x304852(0x5e3)]=function(){const _0x1bf98a=_0x304852;if(Input[_0x1bf98a(0x276)]())return _0x1bf98a(0x4c2);return VisuMZ['CoreEngine'][_0x1bf98a(0x5dd)][_0x1bf98a(0x15e)][_0x1bf98a(0x6b8)]||_0x1bf98a(0x48e);},VisuMZ[_0x304852(0x4ec)]['Window_NameInput_processHandling']=Window_NameInput['prototype'][_0x304852(0x747)],Window_NameInput[_0x304852(0x7ba)][_0x304852(0x747)]=function(){const _0x551444=_0x304852;if(!this[_0x551444(0x417)]())return;if(!this[_0x551444(0x465)])return;if(this[_0x551444(0x29f)]===_0x551444(0x48e)&&Input[_0x551444(0x20e)]())this[_0x551444(0x41a)]('default');else{if(Input['isSpecialCode'](_0x551444(0x741)))Input['clear'](),this[_0x551444(0x5e0)]();else{if(Input[_0x551444(0x558)](_0x551444(0xc3))){Input[_0x551444(0x3f2)]();if(this[_0x551444(0x29f)]===_0x551444(0x48e))this[_0x551444(0x41a)]('default');else{if(_0x551444(0x553)!==_0x551444(0x553)){function _0x387342(){const _0x5752fc=_0x551444,_0x2b8462=_0x24d6eb[_0x5752fc(0x3d1)],_0x46a030=_0x48ce05[_0x5752fc(0x3ec)]||'',_0x53332e=_0x785ed5[_0x5752fc(0x639)]||'',_0x41c7e8=_0x297606['CoreEngine'][_0x5752fc(0x5dd)][_0x5752fc(0x369)][_0x5752fc(0x44b)][_0x5752fc(0xed)],_0x5f1edf=_0x41c7e8[_0x5752fc(0x6be)](_0x2b8462,_0x46a030,_0x53332e);_0x14f320[_0x5752fc(0x638)]=_0x5f1edf;}}else this[_0x551444(0x41a)]('keyboard');}}else{if(this[_0x551444(0x29f)]===_0x551444(0x48e)){if(_0x551444(0x1a4)!==_0x551444(0x3df))this[_0x551444(0x2b0)]();else{function _0x8fa33c(){const _0x2d64ca=_0x551444;this[_0x2d64ca(0x48f)](_0x15a803[_0x2d64ca(0x5ac)]()),this[_0x2d64ca(0x237)](_0x25c679,_0x50d45e,_0x5d4444,_0x58be17,_0x2d64ca(0x348)),_0x4ea1e0-=this[_0x2d64ca(0x622)](_0x57ce3b)+0x6;}}}else{if(Input[_0x551444(0x294)]('escape')){if('MaFjJ'!==_0x551444(0x549)){function _0x1864ee(){const _0x2a75ff=_0x551444;return _0x36b809[_0x2a75ff(0x63a)][_0x2a75ff(0x628)]['call'](this);}}else Input[_0x551444(0x3f2)](),this[_0x551444(0x41a)]('keyboard');}else VisuMZ[_0x551444(0x4ec)]['Window_NameInput_processHandling']['call'](this);}}}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x10e)]=Window_NameInput[_0x304852(0x7ba)][_0x304852(0x799)],Window_NameInput[_0x304852(0x7ba)][_0x304852(0x799)]=function(){const _0xf54840=_0x304852;if(!this[_0xf54840(0x4c7)]())return;if(this[_0xf54840(0x29f)]===_0xf54840(0x48e)){if(TouchInput[_0xf54840(0x558)]()&&this[_0xf54840(0x1d4)]())this[_0xf54840(0x41a)](_0xf54840(0x4c2));else{if(TouchInput['isCancelled']()){if(_0xf54840(0x4b1)===_0xf54840(0x4b1))this[_0xf54840(0x41a)](_0xf54840(0x4c2));else{function _0x1ba501(){const _0x25b057=_0xf54840,_0x4d7531=_0x25b057(0x6d8);this[_0x25b057(0x270)]=this[_0x25b057(0x270)]||{};if(this[_0x25b057(0x270)][_0x4d7531])return this[_0x25b057(0x270)][_0x4d7531];const _0x20309f=_0x2c89bd['CoreEngine']['Settings'][_0x25b057(0x6c8)][_0x25b057(0x38d)];return this[_0x25b057(0x37a)](_0x4d7531,_0x20309f);}}}}}else VisuMZ['CoreEngine'][_0xf54840(0x10e)][_0xf54840(0x1d6)](this);},Window_NameInput[_0x304852(0x7ba)][_0x304852(0x2b0)]=function(){const _0x5bd297=_0x304852;if(Input[_0x5bd297(0x294)](_0x5bd297(0x546)))Input['clear'](),this[_0x5bd297(0x60d)]();else{if(Input['_inputString']!==undefined){let _0x2165ca=Input['_inputString'],_0x4045ff=_0x2165ca[_0x5bd297(0x12a)];for(let _0x496aa1=0x0;_0x496aa1<_0x4045ff;++_0x496aa1){this['_editWindow']['add'](_0x2165ca[_0x496aa1])?SoundManager[_0x5bd297(0xdc)]():SoundManager[_0x5bd297(0x24a)]();}Input[_0x5bd297(0x3f2)]();}}},Window_NameInput[_0x304852(0x7ba)][_0x304852(0x41a)]=function(_0x246d52){const _0x5d141b=_0x304852;let _0x462819=this[_0x5d141b(0x29f)];this[_0x5d141b(0x29f)]=_0x246d52;if(_0x462819!==this[_0x5d141b(0x29f)]){if(_0x5d141b(0x480)===_0x5d141b(0xc9)){function _0x406f18(){const _0x6276b1=_0x5d141b;_0x5d5e07=_0x234577['round'](_0x553769),_0x1d51bc=_0xf20573[_0x6276b1(0x2f2)](_0x406b4e),_0x49835f=_0x538433[_0x6276b1(0x2f2)](_0x2e2e29),_0x474787['CoreEngine'][_0x6276b1(0x5fd)][_0x6276b1(0x1d6)](this,_0x552d13,_0x5d0f00,_0x57bbdf,_0x307b2b),this[_0x6276b1(0x5c0)]();}}else{this['refresh'](),SoundManager['playOk']();if(this[_0x5d141b(0x29f)]===_0x5d141b(0x4c2)){if('cPJIL'!==_0x5d141b(0x66b))this[_0x5d141b(0x12d)](0x0);else{function _0x14a297(){const _0x299f98=_0x5d141b;_0x107c71[_0x299f98(0x4ec)][_0x299f98(0x68a)][_0x299f98(0x1d6)](this),this[_0x299f98(0x62d)]();}}}else{if(_0x5d141b(0x69c)!==_0x5d141b(0xf2))this['select'](-0x1);else{function _0x3f2e6d(){return this['subject']()['hit'];}}}}}},VisuMZ[_0x304852(0x4ec)][_0x304852(0x2ea)]=Window_NameInput[_0x304852(0x7ba)][_0x304852(0x2df)],Window_NameInput[_0x304852(0x7ba)][_0x304852(0x2df)]=function(_0x1018b9){const _0x24e82d=_0x304852;if(this[_0x24e82d(0x29f)]===_0x24e82d(0x48e)&&!Input[_0x24e82d(0x4d0)]())return;if(Input[_0x24e82d(0x124)]())return;VisuMZ['CoreEngine'][_0x24e82d(0x2ea)][_0x24e82d(0x1d6)](this,_0x1018b9),this[_0x24e82d(0x41a)](_0x24e82d(0x4c2));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x5c7)]=Window_NameInput[_0x304852(0x7ba)][_0x304852(0x583)],Window_NameInput[_0x304852(0x7ba)][_0x304852(0x583)]=function(_0x42e5cc){const _0x1213a0=_0x304852;if(this[_0x1213a0(0x29f)]===_0x1213a0(0x48e)&&!Input[_0x1213a0(0x4d0)]())return;if(Input[_0x1213a0(0x124)]())return;VisuMZ[_0x1213a0(0x4ec)][_0x1213a0(0x5c7)]['call'](this,_0x42e5cc),this['switchModes'](_0x1213a0(0x4c2));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x30c)]=Window_NameInput['prototype'][_0x304852(0x222)],Window_NameInput['prototype'][_0x304852(0x222)]=function(_0x577166){const _0x41c2b5=_0x304852;if(this['_mode']===_0x41c2b5(0x48e)&&!Input['isArrowPressed']())return;if(Input[_0x41c2b5(0x124)]())return;VisuMZ[_0x41c2b5(0x4ec)][_0x41c2b5(0x30c)][_0x41c2b5(0x1d6)](this,_0x577166),this[_0x41c2b5(0x41a)](_0x41c2b5(0x4c2));},VisuMZ[_0x304852(0x4ec)][_0x304852(0xda)]=Window_NameInput[_0x304852(0x7ba)][_0x304852(0x5ad)],Window_NameInput[_0x304852(0x7ba)][_0x304852(0x5ad)]=function(_0x265b51){const _0x137daf=_0x304852;if(this[_0x137daf(0x29f)]===_0x137daf(0x48e)&&!Input[_0x137daf(0x4d0)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine']['Window_NameInput_cursorLeft'][_0x137daf(0x1d6)](this,_0x265b51),this['switchModes'](_0x137daf(0x4c2));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x4df)]=Window_NameInput[_0x304852(0x7ba)][_0x304852(0x446)],Window_NameInput['prototype'][_0x304852(0x446)]=function(){const _0x162d0d=_0x304852;if(this[_0x162d0d(0x29f)]===_0x162d0d(0x48e))return;if(Input[_0x162d0d(0x124)]())return;VisuMZ['CoreEngine'][_0x162d0d(0x4df)][_0x162d0d(0x1d6)](this),this['switchModes'](_0x162d0d(0x4c2));},VisuMZ[_0x304852(0x4ec)][_0x304852(0x305)]=Window_NameInput['prototype'][_0x304852(0x79b)],Window_NameInput['prototype']['cursorPageup']=function(){const _0x3ea595=_0x304852;if(this[_0x3ea595(0x29f)]==='keyboard')return;if(Input[_0x3ea595(0x124)]())return;VisuMZ[_0x3ea595(0x4ec)]['Window_NameInput_cursorPageup'][_0x3ea595(0x1d6)](this),this[_0x3ea595(0x41a)](_0x3ea595(0x4c2));},VisuMZ['CoreEngine'][_0x304852(0x15c)]=Window_NameInput[_0x304852(0x7ba)][_0x304852(0x268)],Window_NameInput[_0x304852(0x7ba)][_0x304852(0x268)]=function(){const _0x18fa94=_0x304852;if(this['_mode']===_0x18fa94(0x48e)){if('pyUfD'===_0x18fa94(0x1bf)){function _0x58010e(){const _0x201f9b=_0x18fa94;return _0x409b4c[_0x201f9b(0x4ec)]['Game_Picture_calcEasing'][_0x201f9b(0x1d6)](this,_0xefe5aa);}}else{this[_0x18fa94(0x755)]['clear'](),this[_0x18fa94(0x608)][_0x18fa94(0x3f2)](),this[_0x18fa94(0xce)]();let _0x3e4361=VisuMZ[_0x18fa94(0x4ec)][_0x18fa94(0x5dd)][_0x18fa94(0x15e)]['NameInputMessage'][_0x18fa94(0xdf)]('\x0a'),_0x5a51a0=_0x3e4361[_0x18fa94(0x12a)],_0x55a620=(this[_0x18fa94(0x238)]-_0x5a51a0*this[_0x18fa94(0x262)]())/0x2;for(let _0x589968=0x0;_0x589968<_0x5a51a0;++_0x589968){if(_0x18fa94(0x1c1)===_0x18fa94(0x1c1)){let _0x136310=_0x3e4361[_0x589968],_0x37d980=this[_0x18fa94(0x510)](_0x136310)[_0x18fa94(0x29e)],_0x5f339e=Math[_0x18fa94(0x392)]((this['contents'][_0x18fa94(0x29e)]-_0x37d980)/0x2);this[_0x18fa94(0x79d)](_0x136310,_0x5f339e,_0x55a620),_0x55a620+=this['lineHeight']();}else{function _0x2f1089(){const _0x423a46=_0x18fa94;this[_0x423a46(0x524)]=0x2;}}}}}else VisuMZ[_0x18fa94(0x4ec)][_0x18fa94(0x15c)][_0x18fa94(0x1d6)](this);};};VisuMZ['CoreEngine'][_0x304852(0x23c)]=Window_ShopSell[_0x304852(0x7ba)][_0x304852(0x218)],Window_ShopSell[_0x304852(0x7ba)][_0x304852(0x218)]=function(_0x355875){const _0x5902ef=_0x304852;if(VisuMZ['CoreEngine']['Settings'][_0x5902ef(0x409)][_0x5902ef(0x28a)]&&DataManager[_0x5902ef(0x463)](_0x355875))return![];else{if('vjbdA'!==_0x5902ef(0x6fe))return VisuMZ[_0x5902ef(0x4ec)][_0x5902ef(0x23c)]['call'](this,_0x355875);else{function _0x259ccf(){const _0x19c23b=_0x5902ef;_0x4273e6[_0x19c23b(0x4ec)]['Scene_MenuBase_createPageButtons'][_0x19c23b(0x1d6)](this),_0x132efb[_0x19c23b(0x594)]()&&this[_0x19c23b(0x3c8)]();}}}},Window_NumberInput[_0x304852(0x7ba)][_0x304852(0x4d1)]=function(){return![];};VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)]['KeyboardInput'][_0x304852(0x5cc)]&&(VisuMZ[_0x304852(0x4ec)][_0x304852(0x573)]=Window_NumberInput[_0x304852(0x7ba)][_0x304852(0x21e)],Window_NumberInput[_0x304852(0x7ba)][_0x304852(0x21e)]=function(){const _0x403265=_0x304852;VisuMZ['CoreEngine'][_0x403265(0x573)][_0x403265(0x1d6)](this),this[_0x403265(0x12d)](this['_maxDigits']-0x1);},VisuMZ[_0x304852(0x4ec)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x304852(0x7ba)][_0x304852(0x34d)],Window_NumberInput[_0x304852(0x7ba)][_0x304852(0x34d)]=function(){const _0x55b50e=_0x304852;if(!this['isOpenAndActive']())return;if(Input[_0x55b50e(0x124)]())this[_0x55b50e(0x20b)]();else{if(Input['isSpecialCode'](_0x55b50e(0x741)))this[_0x55b50e(0x532)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x55b50e(0x1bb)]();else{if(Input[_0x55b50e(0x37f)]===0x24)this[_0x55b50e(0x202)]();else{if(Input[_0x55b50e(0x37f)]===0x23)this[_0x55b50e(0x176)]();else{if(_0x55b50e(0x225)!=='DXPtX')VisuMZ[_0x55b50e(0x4ec)]['Window_NumberInput_processDigitChange'][_0x55b50e(0x1d6)](this),Input[_0x55b50e(0x3f2)]();else{function _0x285cd2(){const _0x289351=_0x55b50e;_0x31ca72[_0x289351(0x4ec)]['Settings']['MenuLayout'][_0x289351(0x44b)][_0x289351(0x147)]['call'](this);}}}}}}}},Window_NumberInput[_0x304852(0x7ba)]['processCursorMove']=function(){const _0x404f59=_0x304852;if(!this[_0x404f59(0x658)]())return;if(Input[_0x404f59(0x124)]()){if(_0x404f59(0x4c6)===_0x404f59(0x4c6))this[_0x404f59(0x20b)]();else{function _0x587908(){const _0x445b9f=_0x404f59;_0x5607a6=_0x826ecd[_0x445b9f(0x5bf)](_0x58debf);}}}else{if(_0x404f59(0x142)==='PDSIZ')Window_Selectable['prototype']['processCursorMove'][_0x404f59(0x1d6)](this);else{function _0x51d8f7(){const _0x1a72ba=_0x404f59;_0x785a8f[_0x1a72ba(0x7ba)][_0x1a72ba(0x2b1)][_0x1a72ba(0x1d6)](this),this[_0x1a72ba(0x246)]();}}}},Window_NumberInput[_0x304852(0x7ba)][_0x304852(0x13f)]=function(){},Window_NumberInput['prototype'][_0x304852(0x20b)]=function(){const _0x5def0f=_0x304852;if(String(this[_0x5def0f(0x1f0)])[_0x5def0f(0x12a)]>=this[_0x5def0f(0x399)])return;this[_0x5def0f(0x1f0)]=Number(String(this[_0x5def0f(0x1f0)])+Input[_0x5def0f(0x2ef)]);const _0x17a569='9'['repeat'](this[_0x5def0f(0x399)]);this['_number']=this[_0x5def0f(0x1f0)][_0x5def0f(0x206)](0x0,_0x17a569),Input[_0x5def0f(0x3f2)](),this[_0x5def0f(0x268)](),SoundManager['playCursor'](),this[_0x5def0f(0x12d)](this[_0x5def0f(0x399)]-0x1);},Window_NumberInput['prototype'][_0x304852(0x532)]=function(){const _0x375a73=_0x304852;this[_0x375a73(0x1f0)]=Number(String(this[_0x375a73(0x1f0)])[_0x375a73(0x48c)](0x0,-0x1)),this[_0x375a73(0x1f0)]=Math[_0x375a73(0x710)](0x0,this[_0x375a73(0x1f0)]),Input['clear'](),this[_0x375a73(0x268)](),SoundManager['playCursor'](),this[_0x375a73(0x12d)](this[_0x375a73(0x399)]-0x1);},Window_NumberInput[_0x304852(0x7ba)][_0x304852(0x1bb)]=function(){const _0x58b46d=_0x304852;this['_number']=Number(String(this['_number'])['substring'](0x1)),this[_0x58b46d(0x1f0)]=Math[_0x58b46d(0x710)](0x0,this[_0x58b46d(0x1f0)]),Input[_0x58b46d(0x3f2)](),this['refresh'](),SoundManager[_0x58b46d(0x1e6)](),this[_0x58b46d(0x12d)](this[_0x58b46d(0x399)]-0x1);});;Window_TitleCommand[_0x304852(0x509)]=VisuMZ[_0x304852(0x4ec)]['Settings'][_0x304852(0x5bd)],Window_TitleCommand[_0x304852(0x7ba)]['makeCommandList']=function(){const _0x58a3ec=_0x304852;this[_0x58a3ec(0x3f9)]();},Window_TitleCommand['prototype'][_0x304852(0x3f9)]=function(){const _0x1fc2be=_0x304852;for(const _0x5c0090 of Window_TitleCommand['_commandList']){if('dLYnp'===_0x1fc2be(0x71c)){if(_0x5c0090[_0x1fc2be(0x5e1)]['call'](this)){const _0xc8d20c=_0x5c0090['Symbol'];let _0x3d13aa=_0x5c0090[_0x1fc2be(0x55c)];if(['','Untitled'][_0x1fc2be(0x44a)](_0x3d13aa))_0x3d13aa=_0x5c0090[_0x1fc2be(0x581)][_0x1fc2be(0x1d6)](this);const _0x99e4af=_0x5c0090[_0x1fc2be(0x634)][_0x1fc2be(0x1d6)](this),_0x23e0eb=_0x5c0090['ExtJS'][_0x1fc2be(0x1d6)](this);this[_0x1fc2be(0x2e3)](_0x3d13aa,_0xc8d20c,_0x99e4af,_0x23e0eb),this[_0x1fc2be(0x788)](_0xc8d20c,_0x5c0090['CallHandlerJS'][_0x1fc2be(0x6d1)](this,_0x23e0eb));}}else{function _0x543981(){const _0x9d9c0b=_0x1fc2be;_0x21033b[_0x9d9c0b(0x4ec)][_0x9d9c0b(0x45e)][_0x9d9c0b(0x1d6)](this,_0x66cbc8,_0x55c6fa,_0x3efe31,_0x3e1324,_0x46344c,_0x49d364,_0x41cb4e,_0xe424f5),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x2d2ff7]||{'x':0x0,'y':0x0});}}}},Window_GameEnd[_0x304852(0x509)]=VisuMZ[_0x304852(0x4ec)][_0x304852(0x5dd)][_0x304852(0x369)]['GameEnd'][_0x304852(0x28d)],Window_GameEnd[_0x304852(0x7ba)][_0x304852(0x5ae)]=function(){const _0x3d416a=_0x304852;this[_0x3d416a(0x3f9)]();},Window_GameEnd[_0x304852(0x7ba)]['makeCoreEngineCommandList']=function(){const _0x44891d=_0x304852;for(const _0x160502 of Window_GameEnd[_0x44891d(0x509)]){if(_0x44891d(0x600)!==_0x44891d(0x4a3)){if(_0x160502[_0x44891d(0x5e1)][_0x44891d(0x1d6)](this)){const _0x12a9cc=_0x160502[_0x44891d(0x4b7)];let _0x47d2f0=_0x160502[_0x44891d(0x55c)];if(['',_0x44891d(0x43e)]['includes'](_0x47d2f0))_0x47d2f0=_0x160502['TextJS'][_0x44891d(0x1d6)](this);const _0x586108=_0x160502[_0x44891d(0x634)]['call'](this),_0x498d78=_0x160502[_0x44891d(0x2f7)][_0x44891d(0x1d6)](this);this[_0x44891d(0x2e3)](_0x47d2f0,_0x12a9cc,_0x586108,_0x498d78),this['setHandler'](_0x12a9cc,_0x160502[_0x44891d(0x69f)][_0x44891d(0x6d1)](this,_0x498d78));}}else{function _0x2678fa(){const _0x155535=_0x44891d;this[_0x155535(0x523)]=![];}}}};function Window_ButtonAssist(){const _0x54ea37=_0x304852;this[_0x54ea37(0x1b6)](...arguments);}function _0x5986(_0x42a5c1,_0x4eb77){_0x42a5c1=_0x42a5c1-0xba;let _0x381d31=_0x381d[_0x42a5c1];return _0x381d31;}Window_ButtonAssist[_0x304852(0x7ba)]=Object[_0x304852(0x2b1)](Window_Base['prototype']),Window_ButtonAssist[_0x304852(0x7ba)][_0x304852(0x183)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x304852(0x1b6)]=function(_0x5cc843){const _0x3fa24d=_0x304852;this[_0x3fa24d(0x6f4)]={},Window_Base[_0x3fa24d(0x7ba)][_0x3fa24d(0x1b6)][_0x3fa24d(0x1d6)](this,_0x5cc843),this['setBackgroundType'](VisuMZ[_0x3fa24d(0x4ec)][_0x3fa24d(0x5dd)][_0x3fa24d(0x627)][_0x3fa24d(0x16c)]||0x0),this[_0x3fa24d(0x268)]();},Window_ButtonAssist[_0x304852(0x7ba)]['makeFontBigger']=function(){const _0x340722=_0x304852;this[_0x340722(0x755)][_0x340722(0x514)]<=0x60&&(this[_0x340722(0x755)]['fontSize']+=0x6);},Window_ButtonAssist[_0x304852(0x7ba)][_0x304852(0x5d6)]=function(){const _0x33b5f9=_0x304852;this[_0x33b5f9(0x755)][_0x33b5f9(0x514)]>=0x18&&(this[_0x33b5f9(0x755)]['fontSize']-=0x6);},Window_ButtonAssist[_0x304852(0x7ba)][_0x304852(0x1c2)]=function(){const _0x19358e=_0x304852;Window_Base['prototype'][_0x19358e(0x1c2)]['call'](this),this[_0x19358e(0x5ea)]();},Window_ButtonAssist[_0x304852(0x7ba)][_0x304852(0x79a)]=function(){const _0x2cb016=_0x304852;this['padding']=SceneManager['_scene']['getButtonAssistLocation']()!==_0x2cb016(0x371)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x304852(0x5ea)]=function(){const _0x537a44=_0x304852,_0x42c73f=SceneManager[_0x537a44(0x2d5)];for(let _0x14589e=0x1;_0x14589e<=0x5;_0x14589e++){if(this[_0x537a44(0x6f4)]['key%1'[_0x537a44(0x6be)](_0x14589e)]!==_0x42c73f[_0x537a44(0x593)['format'](_0x14589e)]()){if(_0x537a44(0x35b)!=='VAnoE'){function _0x337ff6(){const _0x49d2a3=_0x537a44;_0x34483c[_0x49d2a3(0x4de)](),_0x4e3671[_0x49d2a3(0xde)](_0x104954);}}else return this[_0x537a44(0x268)]();}if(this[_0x537a44(0x6f4)][_0x537a44(0x54a)[_0x537a44(0x6be)](_0x14589e)]!==_0x42c73f[_0x537a44(0x295)[_0x537a44(0x6be)](_0x14589e)]()){if(_0x537a44(0x3bb)!==_0x537a44(0x3bb)){function _0x3a24fd(){const _0x58cd14=_0x537a44;let _0xc1aed8=0x0;for(const _0x25386a of _0x320668[_0x58cd14(0x4ec)][_0x58cd14(0x5dd)]['Param'][_0x58cd14(0x2a3)]){const _0x442311=this[_0x58cd14(0x213)](),_0x3aaa9f=this[_0x58cd14(0x2b5)](_0xc1aed8);this[_0x58cd14(0x475)](_0x442311,_0x3aaa9f,_0x25386a),_0xc1aed8++;}}}else return this[_0x537a44(0x268)]();}}},Window_ButtonAssist[_0x304852(0x7ba)][_0x304852(0x268)]=function(){const _0x150a05=_0x304852;this['contents']['clear']();for(let _0x5efdea=0x1;_0x5efdea<=0x5;_0x5efdea++){if(_0x150a05(0x51c)===_0x150a05(0x684)){function _0x2ca726(){const _0x31250f=_0x150a05;return this[_0x31250f(0x68f)](_0x209472);}}else this[_0x150a05(0x64d)](_0x5efdea);}},Window_ButtonAssist[_0x304852(0x7ba)][_0x304852(0x64d)]=function(_0x3d00e6){const _0x12ae5a=_0x304852,_0x35a857=this[_0x12ae5a(0x5f6)]/0x5,_0x1a0b0c=SceneManager[_0x12ae5a(0x2d5)],_0x1cc7aa=_0x1a0b0c['buttonAssistKey%1'[_0x12ae5a(0x6be)](_0x3d00e6)](),_0x52c171=_0x1a0b0c[_0x12ae5a(0x295)[_0x12ae5a(0x6be)](_0x3d00e6)]();this[_0x12ae5a(0x6f4)][_0x12ae5a(0x57c)[_0x12ae5a(0x6be)](_0x3d00e6)]=_0x1cc7aa,this[_0x12ae5a(0x6f4)][_0x12ae5a(0x54a)[_0x12ae5a(0x6be)](_0x3d00e6)]=_0x52c171;if(_0x1cc7aa==='')return;if(_0x52c171==='')return;const _0x4861b6=_0x1a0b0c[_0x12ae5a(0x5da)['format'](_0x3d00e6)](),_0x5ede05=this['itemPadding'](),_0x5ce13e=_0x35a857*(_0x3d00e6-0x1)+_0x5ede05+_0x4861b6,_0x10a60c=VisuMZ[_0x12ae5a(0x4ec)][_0x12ae5a(0x5dd)]['ButtonAssist'][_0x12ae5a(0x5d4)];this[_0x12ae5a(0x79d)](_0x10a60c['format'](_0x1cc7aa,_0x52c171),_0x5ce13e,0x0,_0x35a857-_0x5ede05*0x2);},VisuMZ['ShowDevTools']=function(_0x595579){const _0x460832=_0x304852;if(Utils[_0x460832(0x7b9)](_0x460832(0x1ea))){if(_0x460832(0x647)!==_0x460832(0x72f)){var _0x5b210e=require('nw.gui')[_0x460832(0x709)][_0x460832(0x37d)]();SceneManager[_0x460832(0x50b)]();if(_0x595579)setTimeout(_0x5b210e[_0x460832(0x3ae)][_0x460832(0x6d1)](_0x5b210e),0x190);}else{function _0x2650a6(){const _0x2d49d8=_0x460832;this[_0x2d49d8(0x5ba)]['x']=_0x3e4efe[_0x2d49d8(0x5ba)]()['x'],this[_0x2d49d8(0x5ba)]['y']=_0x473e0d[_0x2d49d8(0x5ba)]()['y'];}}}},VisuMZ[_0x304852(0x1b8)]=function(_0xc9f39a,_0x28b00f){const _0xd30fa6=_0x304852;_0x28b00f=_0x28b00f[_0xd30fa6(0x55d)]();var _0x14fb54=1.70158,_0x38f6db=0.7;switch(_0x28b00f){case'LINEAR':return _0xc9f39a;case _0xd30fa6(0xf1):return-0x1*Math[_0xd30fa6(0x3d2)](_0xc9f39a*(Math['PI']/0x2))+0x1;case _0xd30fa6(0x53c):return Math[_0xd30fa6(0x4bf)](_0xc9f39a*(Math['PI']/0x2));case _0xd30fa6(0x671):return-0.5*(Math['cos'](Math['PI']*_0xc9f39a)-0x1);case _0xd30fa6(0x425):return _0xc9f39a*_0xc9f39a;case _0xd30fa6(0x632):return _0xc9f39a*(0x2-_0xc9f39a);case _0xd30fa6(0x537):return _0xc9f39a<0.5?0x2*_0xc9f39a*_0xc9f39a:-0x1+(0x4-0x2*_0xc9f39a)*_0xc9f39a;case _0xd30fa6(0xe2):return _0xc9f39a*_0xc9f39a*_0xc9f39a;case _0xd30fa6(0x707):var _0x367cd7=_0xc9f39a-0x1;return _0x367cd7*_0x367cd7*_0x367cd7+0x1;case _0xd30fa6(0x33d):return _0xc9f39a<0.5?0x4*_0xc9f39a*_0xc9f39a*_0xc9f39a:(_0xc9f39a-0x1)*(0x2*_0xc9f39a-0x2)*(0x2*_0xc9f39a-0x2)+0x1;case _0xd30fa6(0x68e):return _0xc9f39a*_0xc9f39a*_0xc9f39a*_0xc9f39a;case _0xd30fa6(0x6cf):var _0x367cd7=_0xc9f39a-0x1;return 0x1-_0x367cd7*_0x367cd7*_0x367cd7*_0x367cd7;case _0xd30fa6(0x6af):var _0x367cd7=_0xc9f39a-0x1;return _0xc9f39a<0.5?0x8*_0xc9f39a*_0xc9f39a*_0xc9f39a*_0xc9f39a:0x1-0x8*_0x367cd7*_0x367cd7*_0x367cd7*_0x367cd7;case _0xd30fa6(0x185):return _0xc9f39a*_0xc9f39a*_0xc9f39a*_0xc9f39a*_0xc9f39a;case _0xd30fa6(0x255):var _0x367cd7=_0xc9f39a-0x1;return 0x1+_0x367cd7*_0x367cd7*_0x367cd7*_0x367cd7*_0x367cd7;case _0xd30fa6(0x66a):var _0x367cd7=_0xc9f39a-0x1;return _0xc9f39a<0.5?0x10*_0xc9f39a*_0xc9f39a*_0xc9f39a*_0xc9f39a*_0xc9f39a:0x1+0x10*_0x367cd7*_0x367cd7*_0x367cd7*_0x367cd7*_0x367cd7;case _0xd30fa6(0x64f):if(_0xc9f39a===0x0)return 0x0;return Math[_0xd30fa6(0x6a0)](0x2,0xa*(_0xc9f39a-0x1));case _0xd30fa6(0x613):if(_0xc9f39a===0x1){if(_0xd30fa6(0x3b1)!==_0xd30fa6(0x102))return 0x1;else{function _0x3d65ef(){const _0xbe95ee=_0xd30fa6;_0x4d6dc0[_0xbe95ee(0x4ec)][_0xbe95ee(0x642)][_0xbe95ee(0x1d6)](this),this['updatePositionCoreEngine']();}}}return-Math[_0xd30fa6(0x6a0)](0x2,-0xa*_0xc9f39a)+0x1;case'INOUTEXPO':if(_0xc9f39a===0x0||_0xc9f39a===0x1)return _0xc9f39a;var _0x12ac3d=_0xc9f39a*0x2,_0x52c0ea=_0x12ac3d-0x1;if(_0x12ac3d<0x1){if(_0xd30fa6(0xfb)===_0xd30fa6(0xfb))return 0.5*Math[_0xd30fa6(0x6a0)](0x2,0xa*_0x52c0ea);else{function _0x37979d(){const _0x39722f=_0xd30fa6;if(_0x169753['isPlaytest']())_0x2e0848[_0x39722f(0x3f8)](_0x164b92);}}}return 0.5*(-Math['pow'](0x2,-0xa*_0x52c0ea)+0x2);case _0xd30fa6(0x659):var _0x12ac3d=_0xc9f39a/0x1;return-0x1*(Math[_0xd30fa6(0x702)](0x1-_0x12ac3d*_0xc9f39a)-0x1);case'OUTCIRC':var _0x367cd7=_0xc9f39a-0x1;return Math[_0xd30fa6(0x702)](0x1-_0x367cd7*_0x367cd7);case _0xd30fa6(0x487):var _0x12ac3d=_0xc9f39a*0x2,_0x52c0ea=_0x12ac3d-0x2;if(_0x12ac3d<0x1)return-0.5*(Math[_0xd30fa6(0x702)](0x1-_0x12ac3d*_0x12ac3d)-0x1);return 0.5*(Math[_0xd30fa6(0x702)](0x1-_0x52c0ea*_0x52c0ea)+0x1);case _0xd30fa6(0x327):return _0xc9f39a*_0xc9f39a*((_0x14fb54+0x1)*_0xc9f39a-_0x14fb54);case _0xd30fa6(0xc6):var _0x12ac3d=_0xc9f39a/0x1-0x1;return _0x12ac3d*_0x12ac3d*((_0x14fb54+0x1)*_0x12ac3d+_0x14fb54)+0x1;break;case _0xd30fa6(0x269):var _0x12ac3d=_0xc9f39a*0x2,_0x3a8925=_0x12ac3d-0x2,_0x54b9c9=_0x14fb54*1.525;if(_0x12ac3d<0x1)return 0.5*_0x12ac3d*_0x12ac3d*((_0x54b9c9+0x1)*_0x12ac3d-_0x54b9c9);return 0.5*(_0x3a8925*_0x3a8925*((_0x54b9c9+0x1)*_0x3a8925+_0x54b9c9)+0x2);case'INELASTIC':if(_0xc9f39a===0x0||_0xc9f39a===0x1)return _0xc9f39a;var _0x12ac3d=_0xc9f39a/0x1,_0x52c0ea=_0x12ac3d-0x1,_0x5eba30=0x1-_0x38f6db,_0x54b9c9=_0x5eba30/(0x2*Math['PI'])*Math[_0xd30fa6(0x22b)](0x1);return-(Math[_0xd30fa6(0x6a0)](0x2,0xa*_0x52c0ea)*Math[_0xd30fa6(0x4bf)]((_0x52c0ea-_0x54b9c9)*(0x2*Math['PI'])/_0x5eba30));case _0xd30fa6(0xe8):var _0x5eba30=0x1-_0x38f6db,_0x12ac3d=_0xc9f39a*0x2;if(_0xc9f39a===0x0||_0xc9f39a===0x1)return _0xc9f39a;var _0x54b9c9=_0x5eba30/(0x2*Math['PI'])*Math[_0xd30fa6(0x22b)](0x1);return Math[_0xd30fa6(0x6a0)](0x2,-0xa*_0x12ac3d)*Math['sin']((_0x12ac3d-_0x54b9c9)*(0x2*Math['PI'])/_0x5eba30)+0x1;case _0xd30fa6(0x3a6):var _0x5eba30=0x1-_0x38f6db;if(_0xc9f39a===0x0||_0xc9f39a===0x1){if(_0xd30fa6(0x6aa)==='gKxxw')return _0xc9f39a;else{function _0x22fbf4(){const _0xa3679f=_0xd30fa6;this['_statusEquipWindow'][_0xa3679f(0x686)](_0x8a2a5d[_0xa3679f(0x63a)][_0xa3679f(0x474)]);}}}var _0x12ac3d=_0xc9f39a*0x2,_0x52c0ea=_0x12ac3d-0x1,_0x54b9c9=_0x5eba30/(0x2*Math['PI'])*Math[_0xd30fa6(0x22b)](0x1);if(_0x12ac3d<0x1){if('sFtUw'!==_0xd30fa6(0x491)){function _0x2b7c91(){const _0x24e021=_0xd30fa6;_0x5abeda['isTriggered'](_0x24e021(0x44c))&&(_0x1c0c6f[_0x24e021(0x687)]=!_0x4f4251['alwaysDash'],_0x491b0e['save']());}}else return-0.5*(Math[_0xd30fa6(0x6a0)](0x2,0xa*_0x52c0ea)*Math[_0xd30fa6(0x4bf)]((_0x52c0ea-_0x54b9c9)*(0x2*Math['PI'])/_0x5eba30));}return Math[_0xd30fa6(0x6a0)](0x2,-0xa*_0x52c0ea)*Math['sin']((_0x52c0ea-_0x54b9c9)*(0x2*Math['PI'])/_0x5eba30)*0.5+0x1;case'OUTBOUNCE':var _0x12ac3d=_0xc9f39a/0x1;if(_0x12ac3d<0x1/2.75)return 7.5625*_0x12ac3d*_0x12ac3d;else{if(_0x12ac3d<0x2/2.75){var _0x3a8925=_0x12ac3d-1.5/2.75;return 7.5625*_0x3a8925*_0x3a8925+0.75;}else{if(_0x12ac3d<2.5/2.75){if(_0xd30fa6(0x737)!==_0xd30fa6(0x415)){var _0x3a8925=_0x12ac3d-2.25/2.75;return 7.5625*_0x3a8925*_0x3a8925+0.9375;}else{function _0x479550(){const _0x3a2691=_0xd30fa6;_0x3f5d61[_0x3a2691(0x4ac)](),_0xca99b0[_0x3a2691(0x35e)](_0xcdc7d2),_0x36e8c5['CoreEngine'][_0x3a2691(0x351)][_0x3a2691(0x1d6)](this,_0x2aa465);}}}else{if('qTGCa'!=='qTGCa'){function _0x2476b4(){const _0x333407=_0xd30fa6;return this[_0x333407(0x5f2)]()?this[_0x333407(0x2c1)]():_0x2e6d6d[_0x333407(0x4ec)][_0x333407(0x4d5)][_0x333407(0x1d6)](this);}}else{var _0x3a8925=_0x12ac3d-2.625/2.75;return 7.5625*_0x3a8925*_0x3a8925+0.984375;}}}}case _0xd30fa6(0x4b3):var _0xc6a294=0x1-VisuMZ[_0xd30fa6(0x1b8)](0x1-_0xc9f39a,_0xd30fa6(0x29a));return _0xc6a294;case _0xd30fa6(0x688):if(_0xc9f39a<0.5)var _0xc6a294=VisuMZ[_0xd30fa6(0x1b8)](_0xc9f39a*0x2,_0xd30fa6(0x341))*0.5;else var _0xc6a294=VisuMZ[_0xd30fa6(0x1b8)](_0xc9f39a*0x2-0x1,_0xd30fa6(0x29a))*0.5+0.5;return _0xc6a294;default:return _0xc9f39a;}},VisuMZ['GetParamIcon']=function(_0xf167ce){const _0x4c7ba3=_0x304852;_0xf167ce=String(_0xf167ce)[_0x4c7ba3(0x55d)]();const _0x4cf652=VisuMZ[_0x4c7ba3(0x4ec)][_0x4c7ba3(0x5dd)][_0x4c7ba3(0x6c6)];if(_0xf167ce===_0x4c7ba3(0x37b))return _0x4cf652[_0x4c7ba3(0x607)];if(_0xf167ce===_0x4c7ba3(0x209))return _0x4cf652[_0x4c7ba3(0x35f)];if(_0xf167ce==='ATK')return _0x4cf652[_0x4c7ba3(0x1f9)];if(_0xf167ce===_0x4c7ba3(0x482))return _0x4cf652[_0x4c7ba3(0x663)];if(_0xf167ce===_0x4c7ba3(0x6f9))return _0x4cf652[_0x4c7ba3(0x328)];if(_0xf167ce===_0x4c7ba3(0x71f))return _0x4cf652['IconParam5'];if(_0xf167ce===_0x4c7ba3(0x729))return _0x4cf652[_0x4c7ba3(0x3e3)];if(_0xf167ce==='LUK')return _0x4cf652[_0x4c7ba3(0x2a1)];if(_0xf167ce===_0x4c7ba3(0x4d3))return _0x4cf652[_0x4c7ba3(0x68d)];if(_0xf167ce==='EVA')return _0x4cf652[_0x4c7ba3(0x3d4)];if(_0xf167ce==='CRI')return _0x4cf652[_0x4c7ba3(0x24b)];if(_0xf167ce===_0x4c7ba3(0x36a))return _0x4cf652[_0x4c7ba3(0x646)];if(_0xf167ce===_0x4c7ba3(0x3ad))return _0x4cf652[_0x4c7ba3(0x115)];if(_0xf167ce==='MRF')return _0x4cf652[_0x4c7ba3(0x539)];if(_0xf167ce==='CNT')return _0x4cf652[_0x4c7ba3(0x4b8)];if(_0xf167ce==='HRG')return _0x4cf652[_0x4c7ba3(0x13d)];if(_0xf167ce===_0x4c7ba3(0x163))return _0x4cf652[_0x4c7ba3(0x522)];if(_0xf167ce==='TRG')return _0x4cf652[_0x4c7ba3(0x78a)];if(_0xf167ce===_0x4c7ba3(0x470))return _0x4cf652[_0x4c7ba3(0x499)];if(_0xf167ce===_0x4c7ba3(0x643))return _0x4cf652[_0x4c7ba3(0x1b2)];if(_0xf167ce===_0x4c7ba3(0x300))return _0x4cf652[_0x4c7ba3(0x682)];if(_0xf167ce===_0x4c7ba3(0x3a7))return _0x4cf652[_0x4c7ba3(0x3f7)];if(_0xf167ce===_0x4c7ba3(0x50a))return _0x4cf652[_0x4c7ba3(0x4f5)];if(_0xf167ce===_0x4c7ba3(0x31b))return _0x4cf652[_0x4c7ba3(0x331)];if(_0xf167ce===_0x4c7ba3(0x395))return _0x4cf652['IconSParam6'];if(_0xf167ce==='MDR')return _0x4cf652[_0x4c7ba3(0x719)];if(_0xf167ce===_0x4c7ba3(0x319))return _0x4cf652[_0x4c7ba3(0x136)];if(_0xf167ce===_0x4c7ba3(0x604))return _0x4cf652[_0x4c7ba3(0x557)];if(VisuMZ[_0x4c7ba3(0x4ec)]['CustomParamIcons'][_0xf167ce]){if(_0x4c7ba3(0x2e4)===_0x4c7ba3(0x356)){function _0x2f9238(){const _0xdcbbde=_0x4c7ba3,_0x57ae41=_0x13e1c9(_0x238ae8['$1']);if(_0x57ae41[_0xdcbbde(0x54d)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x57ae41[_0xdcbbde(0x54d)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}else return VisuMZ['CoreEngine'][_0x4c7ba3(0x24e)][_0xf167ce]||0x0;}return 0x0;},VisuMZ[_0x304852(0x17c)]=function(_0x4cc857,_0x130e44,_0x13a9f1){const _0x3a402a=_0x304852;if(_0x13a9f1===undefined&&_0x4cc857%0x1===0x0)return _0x4cc857;if(_0x13a9f1!==undefined&&['MAXHP',_0x3a402a(0x209),_0x3a402a(0x6df),'DEF',_0x3a402a(0x6f9),'MDF',_0x3a402a(0x729),_0x3a402a(0x669)]['includes'](String(_0x13a9f1)['toUpperCase']()[_0x3a402a(0x4ae)]()))return _0x4cc857;_0x130e44=_0x130e44||0x0;if(VisuMZ[_0x3a402a(0x4ec)][_0x3a402a(0x708)][_0x13a9f1]){if(VisuMZ[_0x3a402a(0x4ec)][_0x3a402a(0x6f8)][_0x13a9f1]===_0x3a402a(0x718))return _0x4cc857;else{if('vaOWk'==='lyHVD'){function _0x5dd467(){const _0x9ebed3=_0x3a402a;this[_0x9ebed3(0x4d1)]()?this[_0x9ebed3(0x528)]():_0x3d6788['CoreEngine'][_0x9ebed3(0x58c)][_0x9ebed3(0x1d6)](this);}}else return String((_0x4cc857*0x64)[_0x3a402a(0x34c)](_0x130e44))+'%';}}return String((_0x4cc857*0x64)[_0x3a402a(0x34c)](_0x130e44))+'%';},VisuMZ['GroupDigits']=function(_0x34ad1b){const _0x1acad1=_0x304852;_0x34ad1b=String(_0x34ad1b);if(!_0x34ad1b)return _0x34ad1b;if(typeof _0x34ad1b!==_0x1acad1(0x561))return _0x34ad1b;const _0xdf1af0=VisuMZ[_0x1acad1(0x4ec)][_0x1acad1(0x5dd)][_0x1acad1(0x409)][_0x1acad1(0x649)]||_0x1acad1(0x2d7),_0x1aef96={'maximumFractionDigits':0x6};_0x34ad1b=_0x34ad1b['replace'](/\[(.*?)\]/g,(_0x201a7a,_0x3f2f88)=>{return VisuMZ['PreserveNumbers'](_0x3f2f88,'[',']');}),_0x34ad1b=_0x34ad1b['replace'](/<(.*?)>/g,(_0x2740d8,_0x5724b8)=>{const _0x4cd46e=_0x1acad1;return VisuMZ[_0x4cd46e(0x23f)](_0x5724b8,'<','>');}),_0x34ad1b=_0x34ad1b[_0x1acad1(0x333)](/\{\{(.*?)\}\}/g,(_0x8b0387,_0x5310e6)=>{const _0x397117=_0x1acad1;if(_0x397117(0x74d)===_0x397117(0x73c)){function _0x252fe7(){return!![];}}else return VisuMZ[_0x397117(0x23f)](_0x5310e6,'','');}),_0x34ad1b=_0x34ad1b[_0x1acad1(0x333)](/(\d+\.?\d*)/g,(_0x4c6853,_0x2b7c3f)=>{const _0x2e6363=_0x1acad1;if('gHXVV'===_0x2e6363(0x347)){let _0x3b12e4=_0x2b7c3f;if(_0x3b12e4[0x0]==='0')return _0x3b12e4;if(_0x3b12e4[_0x3b12e4[_0x2e6363(0x12a)]-0x1]==='.')return Number(_0x3b12e4)[_0x2e6363(0x615)](_0xdf1af0,_0x1aef96)+'.';else{if(_0x3b12e4[_0x3b12e4[_0x2e6363(0x12a)]-0x1]===',')return Number(_0x3b12e4)[_0x2e6363(0x615)](_0xdf1af0,_0x1aef96)+',';else{if(_0x2e6363(0xd7)!==_0x2e6363(0x75f))return Number(_0x3b12e4)[_0x2e6363(0x615)](_0xdf1af0,_0x1aef96);else{function _0x4d3e9c(){const _0xeffd92=_0x2e6363;let _0x10c8c1='',_0x45d119=this['_index']+0x1;while(this[_0xeffd92(0x216)][_0x45d119]&&this[_0xeffd92(0x216)][_0x45d119][_0xeffd92(0x1a7)]===0x195){_0x10c8c1+=this['_list'][_0x45d119]['parameters'][0x0]+'\x0a',_0x45d119++;}return _0x10c8c1;}}}}}else{function _0x41f893(){const _0x3407e8=_0x2e6363,_0x1c8090=_0x5c6cf1[_0x3407e8(0x4ec)][_0x3407e8(0x5dd)][_0x3407e8(0x317)];if(_0x1c8090&&_0x1c8090[_0x3407e8(0x48a)])return _0x1c8090[_0x3407e8(0x48a)][_0x3407e8(0x1d6)](this);const _0x1dc400=_0x37cc10[_0x3407e8(0x4af)]*0.75,_0x4bdd56=_0x4e8003[_0x3407e8(0x54b)]*0.6,_0x519518=_0x454c20[_0x3407e8(0x65e)];this['x']+=_0x1acf1d[_0x3407e8(0x2f2)](_0x585eb2[_0x3407e8(0x1e2)](_0x1dc400)-_0x2aff24['randomInt'](_0x4bdd56))*(_0x283f40[_0x3407e8(0x7a0)](_0x519518,0x1e)*0.5),this['y']+=_0x3b3fae[_0x3407e8(0x2f2)](_0x5f022a[_0x3407e8(0x1e2)](_0x1dc400)-_0xfb51c1['randomInt'](_0x4bdd56))*(_0x5a2234[_0x3407e8(0x7a0)](_0x519518,0x1e)*0.5);}}});let _0x14a421=0x3;while(_0x14a421--){_0x34ad1b=VisuMZ[_0x1acad1(0x7a3)](_0x34ad1b);}return _0x34ad1b;},VisuMZ[_0x304852(0x23f)]=function(_0x3570e1,_0x5332ae,_0xc099d0){const _0x1a1222=_0x304852;return _0x3570e1=_0x3570e1[_0x1a1222(0x333)](/(\d)/gi,(_0xee40fc,_0xf2010)=>'PRESERVCONVERSION(%1)'['format'](Number(_0xf2010))),_0x1a1222(0x49e)['format'](_0x3570e1,_0x5332ae,_0xc099d0);},VisuMZ[_0x304852(0x7a3)]=function(_0x5b8519){const _0x32f3a1=_0x304852;return _0x5b8519=_0x5b8519[_0x32f3a1(0x333)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3ca008,_0x3f8eb4)=>Number(parseInt(_0x3f8eb4))),_0x5b8519;},VisuMZ[_0x304852(0x1d0)]=function(_0x511f5c){const _0x2e9e03=_0x304852;SoundManager[_0x2e9e03(0xdc)]();if(!Utils['isNwjs']()){if('INQhi'===_0x2e9e03(0x14e)){function _0x4c700f(){const _0x325c3e=_0x2e9e03;if(typeof _0x2c5810==='number')return this[_0x325c3e(0x32c)](_0x24170f);_0x8c7609=_0x496b2d(_0x4e8ab7||'')[_0x325c3e(0x55d)]();if(_0xdceaf6===_0x325c3e(0x37b))return this[_0x325c3e(0x32c)](0x0);if(_0x28b17f==='MAXMP')return this[_0x325c3e(0x32c)](0x1);if(_0x4c1f77==='ATK')return this[_0x325c3e(0x32c)](0x2);if(_0x1da0f6==='DEF')return this[_0x325c3e(0x32c)](0x3);if(_0x2ce138===_0x325c3e(0x6f9))return this[_0x325c3e(0x32c)](0x4);if(_0x1f05f8==='MDF')return this[_0x325c3e(0x32c)](0x5);if(_0x10ea29===_0x325c3e(0x729))return this['param'](0x6);if(_0x2fc534==='LUK')return this[_0x325c3e(0x32c)](0x7);if(_0x59dbb3===_0x325c3e(0x4d3))return _0x2c5a12?_0x1a3144(_0x15f3d3[_0x325c3e(0x2f2)](this['xparam'](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x41b0b9===_0x325c3e(0x1a2))return _0x52cfc0?_0xaf5316(_0x3b6098[_0x325c3e(0x2f2)](this[_0x325c3e(0x285)](0x1)*0x64))+'%':this[_0x325c3e(0x285)](0x1);if(_0x365964===_0x325c3e(0x217))return _0x391895?_0x24205f(_0xb9c5ec[_0x325c3e(0x2f2)](this[_0x325c3e(0x285)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x5aca43==='CEV')return _0x7843ad?_0x38c790(_0x26afcf[_0x325c3e(0x2f2)](this[_0x325c3e(0x285)](0x3)*0x64))+'%':this[_0x325c3e(0x285)](0x3);if(_0xdd8ba6===_0x325c3e(0x3ad))return _0x3f598c?_0x24bbf3(_0x26cee1[_0x325c3e(0x2f2)](this[_0x325c3e(0x285)](0x4)*0x64))+'%':this[_0x325c3e(0x285)](0x4);if(_0x4b9f47===_0x325c3e(0x5af))return _0x8baa?_0x3d756c(_0x314ca6[_0x325c3e(0x2f2)](this[_0x325c3e(0x285)](0x5)*0x64))+'%':this[_0x325c3e(0x285)](0x5);if(_0x56e671===_0x325c3e(0x309))return _0xca50fc?_0x56b5b8(_0x944b8[_0x325c3e(0x2f2)](this['xparam'](0x6)*0x64))+'%':this[_0x325c3e(0x285)](0x6);if(_0x562e62==='HRG')return _0x4d076f?_0xfb7175(_0xe18455[_0x325c3e(0x2f2)](this[_0x325c3e(0x285)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x5981e5==='MRG')return _0x1c27a1?_0x34721e(_0x73aa3a['round'](this[_0x325c3e(0x285)](0x8)*0x64))+'%':this[_0x325c3e(0x285)](0x8);if(_0x1c9388===_0x325c3e(0x18f))return _0x5ab4c9?_0x1897fe(_0x11c9e6['round'](this[_0x325c3e(0x285)](0x9)*0x64))+'%':this[_0x325c3e(0x285)](0x9);if(_0x44d9a9===_0x325c3e(0x470))return _0x2af84d?_0x3590aa(_0x560935['round'](this[_0x325c3e(0x1f3)](0x0)*0x64))+'%':this[_0x325c3e(0x1f3)](0x0);if(_0x53ad89==='GRD')return _0xef9b40?_0x3de950(_0xc5b7b9[_0x325c3e(0x2f2)](this[_0x325c3e(0x1f3)](0x1)*0x64))+'%':this[_0x325c3e(0x1f3)](0x1);if(_0x5205a8==='REC')return _0x45d0e5?_0x43a27b(_0x544fc7[_0x325c3e(0x2f2)](this[_0x325c3e(0x1f3)](0x2)*0x64))+'%':this[_0x325c3e(0x1f3)](0x2);if(_0x4200c7===_0x325c3e(0x3a7))return _0x3d4324?_0x1589e4(_0x329862['round'](this[_0x325c3e(0x1f3)](0x3)*0x64))+'%':this[_0x325c3e(0x1f3)](0x3);if(_0x4e606a===_0x325c3e(0x50a))return _0x41c751?_0x6dac85(_0x5a2360[_0x325c3e(0x2f2)](this[_0x325c3e(0x1f3)](0x4)*0x64))+'%':this[_0x325c3e(0x1f3)](0x4);if(_0x326902==='TCR')return _0x58d68f?_0x5c698f(_0xae6a69['round'](this['sparam'](0x5)*0x64))+'%':this[_0x325c3e(0x1f3)](0x5);if(_0x5be7de==='PDR')return _0x4c0063?_0x32d2a9(_0x4c1222['round'](this[_0x325c3e(0x1f3)](0x6)*0x64))+'%':this[_0x325c3e(0x1f3)](0x6);if(_0x5580f4===_0x325c3e(0x535))return _0xc63473?_0x50e326(_0x59a696[_0x325c3e(0x2f2)](this[_0x325c3e(0x1f3)](0x7)*0x64))+'%':this[_0x325c3e(0x1f3)](0x7);if(_0x5c4fa3===_0x325c3e(0x319))return _0x3b03bc?_0x571d74(_0x1816e9['round'](this[_0x325c3e(0x1f3)](0x8)*0x64))+'%':this[_0x325c3e(0x1f3)](0x8);if(_0xf1049c===_0x325c3e(0x604))return _0x33857c?_0x4f6cb3(_0x44b3a9[_0x325c3e(0x2f2)](this[_0x325c3e(0x1f3)](0x9)*0x64))+'%':this[_0x325c3e(0x1f3)](0x9);if(_0x1ca9d5['CoreEngine']['CustomParamAbb'][_0x4e9c55]){const _0x1f5c73=_0x15da5e[_0x325c3e(0x4ec)]['CustomParamAbb'][_0x48e0c6],_0x126aa7=this[_0x1f5c73];return _0x8c1962['CoreEngine'][_0x325c3e(0x6f8)][_0x4ae361]==='integer'?_0x126aa7:_0x403774?_0x33068a(_0x285080['round'](_0x126aa7*0x64))+'%':_0x126aa7;}return'';}}else{const _0x2e00e7=window['open'](_0x511f5c,_0x2e9e03(0x280));}}else{if('xQjVf'!=='Vpbbp'){const _0x2dc88e=process[_0x2e9e03(0xf6)]=='darwin'?_0x2e9e03(0x783):process[_0x2e9e03(0xf6)]==_0x2e9e03(0xcb)?'start':_0x2e9e03(0x7b6);require('child_process')['exec'](_0x2dc88e+'\x20'+_0x511f5c);}else{function _0xf1ba46(){this['playCursorSound']();}}}},Game_Picture[_0x304852(0x7ba)][_0x304852(0x5ba)]=function(){const _0x34bac8=_0x304852;return this[_0x34bac8(0x756)];},VisuMZ['CoreEngine'][_0x304852(0x205)]=Game_Picture[_0x304852(0x7ba)]['initBasic'],Game_Picture[_0x304852(0x7ba)]['initBasic']=function(){const _0x213917=_0x304852;VisuMZ['CoreEngine'][_0x213917(0x205)][_0x213917(0x1d6)](this),this[_0x213917(0x756)]={'x':0x0,'y':0x0},this['_targetAnchor']={'x':0x0,'y':0x0};},VisuMZ[_0x304852(0x4ec)]['Game_Picture_updateMove']=Game_Picture['prototype'][_0x304852(0x240)],Game_Picture['prototype'][_0x304852(0x240)]=function(){const _0xf5607a=_0x304852;this[_0xf5607a(0x616)](),VisuMZ[_0xf5607a(0x4ec)][_0xf5607a(0x519)][_0xf5607a(0x1d6)](this);},VisuMZ['CoreEngine']['Game_Picture_show']=Game_Picture[_0x304852(0x7ba)][_0x304852(0x62c)],Game_Picture['prototype'][_0x304852(0x62c)]=function(_0x263368,_0x496d92,_0x3af485,_0x37f50d,_0x21c8f1,_0x184f2a,_0x45109f,_0x343ac1){const _0x1fa451=_0x304852;VisuMZ['CoreEngine']['Game_Picture_show'][_0x1fa451(0x1d6)](this,_0x263368,_0x496d92,_0x3af485,_0x37f50d,_0x21c8f1,_0x184f2a,_0x45109f,_0x343ac1),this[_0x1fa451(0x52e)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x496d92]||{'x':0x0,'y':0x0});},VisuMZ[_0x304852(0x4ec)][_0x304852(0x6f0)]=Game_Picture[_0x304852(0x7ba)]['move'],Game_Picture[_0x304852(0x7ba)][_0x304852(0x6ef)]=function(_0x3fd2da,_0x106f2a,_0x17042d,_0x27cd57,_0x437eca,_0x3ffe65,_0xb7a502,_0x2cd0e9,_0x1e076f){const _0x57021a=_0x304852;VisuMZ[_0x57021a(0x4ec)][_0x57021a(0x6f0)]['call'](this,_0x3fd2da,_0x106f2a,_0x17042d,_0x27cd57,_0x437eca,_0x3ffe65,_0xb7a502,_0x2cd0e9,_0x1e076f),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3fd2da]||{'x':0x0,'y':0x0});},Game_Picture[_0x304852(0x7ba)]['updateAnchor']=function(){const _0x3b1185=_0x304852;this[_0x3b1185(0x30a)]>0x0&&(this[_0x3b1185(0x756)]['x']=this['applyEasing'](this[_0x3b1185(0x756)]['x'],this['_targetAnchor']['x']),this['_anchor']['y']=this[_0x3b1185(0x134)](this['_anchor']['y'],this[_0x3b1185(0x769)]['y']));},Game_Picture[_0x304852(0x7ba)][_0x304852(0x52e)]=function(_0x102937){const _0x5a31ef=_0x304852;this[_0x5a31ef(0x756)]=_0x102937,this[_0x5a31ef(0x769)]=JsonEx['makeDeepCopy'](this[_0x5a31ef(0x756)]);},Game_Picture['prototype'][_0x304852(0x774)]=function(_0x5f5320){const _0x17f70a=_0x304852;this[_0x17f70a(0x769)]=_0x5f5320;},VisuMZ['CoreEngine'][_0x304852(0x571)]=Sprite_Picture['prototype']['updateOrigin'],Sprite_Picture[_0x304852(0x7ba)][_0x304852(0xeb)]=function(){const _0x37af4d=_0x304852,_0x44781a=this[_0x37af4d(0x4c3)]();!_0x44781a[_0x37af4d(0x5ba)]()?VisuMZ[_0x37af4d(0x4ec)][_0x37af4d(0x571)][_0x37af4d(0x1d6)](this):(this[_0x37af4d(0x5ba)]['x']=_0x44781a[_0x37af4d(0x5ba)]()['x'],this[_0x37af4d(0x5ba)]['y']=_0x44781a[_0x37af4d(0x5ba)]()['y']);},Game_Action[_0x304852(0x7ba)][_0x304852(0x1be)]=function(_0x5754d5){const _0x259182=_0x304852;if(_0x5754d5){const _0x5778bc=_0x5754d5[_0x259182(0x7a6)];if(_0x5778bc===0x1&&this[_0x259182(0x2dd)]()[_0x259182(0x3c9)]()!==0x1)this[_0x259182(0x28e)]();else{if(_0x5778bc===0x2&&this[_0x259182(0x2dd)]()[_0x259182(0x150)]()!==0x2){if('ysTUn'!==_0x259182(0x64e)){function _0x2ca45b(){const _0xe1cd0b=_0x259182;0x1-this['itemEva'](_0x55ad76)>this[_0xe1cd0b(0x374)](_0x4b15ee)&&(_0x2fb1c4[_0xe1cd0b(0x724)]=![],_0x131d5a[_0xe1cd0b(0x200)]=!![]);}}else this[_0x259182(0x7b2)]();}else this[_0x259182(0x488)](_0x5778bc);}}else{if(_0x259182(0x5b5)!==_0x259182(0x4a2))this['clear']();else{function _0x19184f(){const _0x280f34=_0x259182;return this[_0x280f34(0x756)];}}}},Game_Actor['prototype'][_0x304852(0x6fa)]=function(){const _0x239c0b=_0x304852;return this['skills']()[_0x239c0b(0x4bc)](_0x169ccc=>this[_0x239c0b(0x6c4)](_0x169ccc)&&this[_0x239c0b(0x63b)]()['includes'](_0x169ccc['stypeId']));},Window_Base[_0x304852(0x7ba)]['createDimmerSprite']=function(){const _0x3e6f7e=_0x304852;this[_0x3e6f7e(0x376)]=new Sprite(),this[_0x3e6f7e(0x376)][_0x3e6f7e(0x525)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x3e6f7e(0x256)](this[_0x3e6f7e(0x376)]);},Window_Base[_0x304852(0x7ba)]['refreshDimmerBitmap']=function(){const _0x4276bf=_0x304852;if(this[_0x4276bf(0x376)]){const _0x3c45e4=this[_0x4276bf(0x376)][_0x4276bf(0x525)],_0x5e1364=this['width'],_0x240f3b=this['height'],_0x1ea58a=this[_0x4276bf(0x289)],_0x5c8afd=ColorManager[_0x4276bf(0x1eb)](),_0x53d025=ColorManager[_0x4276bf(0x27a)]();_0x3c45e4[_0x4276bf(0x531)](_0x5e1364,_0x240f3b),_0x3c45e4[_0x4276bf(0x177)](0x0,0x0,_0x5e1364,_0x1ea58a,_0x53d025,_0x5c8afd,!![]),_0x3c45e4['fillRect'](0x0,_0x1ea58a,_0x5e1364,_0x240f3b-_0x1ea58a*0x2,_0x5c8afd),_0x3c45e4[_0x4276bf(0x177)](0x0,_0x240f3b-_0x1ea58a,_0x5e1364,_0x1ea58a,_0x5c8afd,_0x53d025,!![]),this[_0x4276bf(0x376)]['setFrame'](0x0,0x0,_0x5e1364,_0x240f3b);}},Game_Actor['prototype'][_0x304852(0x450)]=function(){const _0x553e9e=_0x304852;for(let _0x4d28cf=0x0;_0x4d28cf<this[_0x553e9e(0x47e)]();_0x4d28cf++){if(_0x553e9e(0x497)!==_0x553e9e(0x497)){function _0x1d78c7(){return![];}}else{const _0x55d671=this[_0x553e9e(0x3b5)]();let _0x53d42b=Number[_0x553e9e(0x448)];this[_0x553e9e(0x6b6)](_0x4d28cf,_0x55d671[0x0]);for(const _0x1e9f02 of _0x55d671){if(_0x553e9e(0x6d2)!=='qdaOu'){function _0x57e592(){const _0x298840=_0x553e9e;_0x519c31['prototype'][_0x298840(0x455)][_0x298840(0x1d6)](this);}}else{const _0x30ab04=_0x1e9f02[_0x553e9e(0x214)]();_0x30ab04>_0x53d42b&&(_0x53d42b=_0x30ab04,this[_0x553e9e(0x6b6)](_0x4d28cf,_0x1e9f02));}}}}this[_0x553e9e(0x5e9)](_0x553e9e(0x5b7));},Window_BattleItem['prototype'][_0x304852(0x218)]=function(_0x11ee7e){const _0x42f0af=_0x304852;if(BattleManager['actor']()){if(_0x42f0af(0x3d9)===_0x42f0af(0x3d9))return BattleManager[_0x42f0af(0x5c1)]()[_0x42f0af(0x6c4)](_0x11ee7e);else{function _0x2d7b3e(){const _0x103372=_0x42f0af;return _0x476596[_0x103372(0x63a)][_0x103372(0x704)][_0x103372(0x1d6)](this);}}}else return Window_ItemList[_0x42f0af(0x7ba)]['isEnabled'][_0x42f0af(0x1d6)](this,_0x11ee7e);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x4ab)]=Scene_Map[_0x304852(0x7ba)][_0x304852(0x19a)],Scene_Map[_0x304852(0x7ba)][_0x304852(0x19a)]=function(){const _0x451617=_0x304852;VisuMZ[_0x451617(0x4ec)][_0x451617(0x4ab)][_0x451617(0x1d6)](this);const _0x10e9ff=this[_0x451617(0x3bf)][_0x451617(0x381)];if(_0x10e9ff)this[_0x451617(0x5a2)](_0x10e9ff);},VisuMZ[_0x304852(0x4ec)][_0x304852(0x2f4)]=Scene_Battle[_0x304852(0x7ba)][_0x304852(0x19a)],Scene_Battle['prototype'][_0x304852(0x19a)]=function(){const _0x1e8e7b=_0x304852;VisuMZ[_0x1e8e7b(0x4ec)][_0x1e8e7b(0x2f4)]['call'](this);const _0x760e51=this[_0x1e8e7b(0x3bf)][_0x1e8e7b(0x381)];if(_0x760e51)this['addChild'](_0x760e51);},Sprite_Actor[_0x304852(0x7ba)][_0x304852(0x1c2)]=function(){const _0x5e1174=_0x304852;Sprite_Battler[_0x5e1174(0x7ba)]['update'][_0x5e1174(0x1d6)](this),this[_0x5e1174(0x5de)]();if(this[_0x5e1174(0x2c7)])this[_0x5e1174(0x4d7)]();else this['_battlerName']!==''&&(this[_0x5e1174(0xd6)]='');},Window[_0x304852(0x7ba)][_0x304852(0x473)]=function(){const _0x368f51=_0x304852,_0x268e8f=this[_0x368f51(0x3be)],_0xaf1b84=this[_0x368f51(0x32b)],_0x3aa5db=0x18,_0x4fda76=_0x3aa5db/0x2,_0x52d35b=0x60+_0x3aa5db,_0x37aae6=0x0+_0x3aa5db;this[_0x368f51(0x278)][_0x368f51(0x525)]=this[_0x368f51(0xc8)],this['_downArrowSprite'][_0x368f51(0x5ba)]['x']=0.5,this['_downArrowSprite'][_0x368f51(0x5ba)]['y']=0.5,this[_0x368f51(0x278)][_0x368f51(0x104)](_0x52d35b+_0x4fda76,_0x37aae6+_0x4fda76+_0x3aa5db,_0x3aa5db,_0x4fda76),this[_0x368f51(0x278)][_0x368f51(0x6ef)](Math[_0x368f51(0x2f2)](_0x268e8f/0x2),Math[_0x368f51(0x2f2)](_0xaf1b84-_0x4fda76)),this[_0x368f51(0x273)][_0x368f51(0x525)]=this[_0x368f51(0xc8)],this[_0x368f51(0x273)][_0x368f51(0x5ba)]['x']=0.5,this[_0x368f51(0x273)][_0x368f51(0x5ba)]['y']=0.5,this[_0x368f51(0x273)][_0x368f51(0x104)](_0x52d35b+_0x4fda76,_0x37aae6,_0x3aa5db,_0x4fda76),this[_0x368f51(0x273)][_0x368f51(0x6ef)](Math['round'](_0x268e8f/0x2),Math[_0x368f51(0x2f2)](_0x4fda76));},Window[_0x304852(0x7ba)][_0x304852(0x780)]=function(){const _0x2a9847=_0x304852,_0x31d415=0x90,_0x1fe817=0x60,_0x5d7d1b=0x18;this[_0x2a9847(0xe5)]['bitmap']=this[_0x2a9847(0xc8)],this[_0x2a9847(0xe5)][_0x2a9847(0x5ba)]['x']=0.5,this['_pauseSignSprite']['anchor']['y']=0x1,this['_pauseSignSprite'][_0x2a9847(0x6ef)](Math[_0x2a9847(0x2f2)](this[_0x2a9847(0x3be)]/0x2),this[_0x2a9847(0x32b)]),this[_0x2a9847(0xe5)]['setFrame'](_0x31d415,_0x1fe817,_0x5d7d1b,_0x5d7d1b),this['_pauseSignSprite']['alpha']=0x0;},Window[_0x304852(0x7ba)][_0x304852(0x4b9)]=function(){const _0x303f5b=_0x304852,_0x445cc8=this[_0x303f5b(0x3ca)][_0x303f5b(0x2fe)]['apply'](new Point(0x0,0x0)),_0x3ae626=this[_0x303f5b(0x3ca)][_0x303f5b(0x195)];_0x3ae626['x']=_0x445cc8['x']+this['origin']['x'],_0x3ae626['y']=_0x445cc8['y']+this[_0x303f5b(0x29c)]['y'],_0x3ae626[_0x303f5b(0x29e)]=Math['ceil'](this[_0x303f5b(0x5f6)]*this[_0x303f5b(0xea)]['x']),_0x3ae626[_0x303f5b(0x1d3)]=Math[_0x303f5b(0x24f)](this['innerHeight']*this[_0x303f5b(0xea)]['y']);},Window[_0x304852(0x7ba)][_0x304852(0x60a)]=function(){const _0x117b9e=_0x304852,_0x42c6a6=this[_0x117b9e(0x440)],_0x3e9b75=Math[_0x117b9e(0x710)](0x0,this['_width']-_0x42c6a6*0x2),_0x144391=Math[_0x117b9e(0x710)](0x0,this[_0x117b9e(0x32b)]-_0x42c6a6*0x2),_0x1a07f2=this['_backSprite'],_0x18b362=_0x1a07f2[_0x117b9e(0x4c4)][0x0];_0x1a07f2[_0x117b9e(0x525)]=this[_0x117b9e(0xc8)],_0x1a07f2['setFrame'](0x0,0x0,0x60,0x60),_0x1a07f2[_0x117b9e(0x6ef)](_0x42c6a6,_0x42c6a6),_0x1a07f2['scale']['x']=_0x3e9b75/0x60,_0x1a07f2[_0x117b9e(0xea)]['y']=_0x144391/0x60,_0x18b362[_0x117b9e(0x525)]=this[_0x117b9e(0xc8)],_0x18b362[_0x117b9e(0x104)](0x0,0x60,0x60,0x60),_0x18b362[_0x117b9e(0x6ef)](0x0,0x0,_0x3e9b75,_0x144391),_0x18b362[_0x117b9e(0xea)]['x']=0x60/_0x3e9b75,_0x18b362[_0x117b9e(0xea)]['y']=0x60/_0x144391,_0x1a07f2[_0x117b9e(0x782)](this['_colorTone']);};