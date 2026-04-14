//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.36;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.36] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x5a5150=_0x185b;(function(_0x1253c6,_0x1f8086){const _0x50ae7d=_0x185b,_0x40ac46=_0x1253c6();while(!![]){try{const _0x30ca85=parseInt(_0x50ae7d(0x2ab))/0x1*(parseInt(_0x50ae7d(0x4df))/0x2)+parseInt(_0x50ae7d(0x28a))/0x3*(-parseInt(_0x50ae7d(0x44d))/0x4)+parseInt(_0x50ae7d(0x3e3))/0x5*(-parseInt(_0x50ae7d(0x232))/0x6)+-parseInt(_0x50ae7d(0x3f9))/0x7+parseInt(_0x50ae7d(0x4c3))/0x8+parseInt(_0x50ae7d(0x406))/0x9+-parseInt(_0x50ae7d(0x30c))/0xa;if(_0x30ca85===_0x1f8086)break;else _0x40ac46['push'](_0x40ac46['shift']());}catch(_0x1df7e2){_0x40ac46['push'](_0x40ac46['shift']());}}}(_0xc21d,0x21b83));function _0x185b(_0x5fd0b2,_0x3d5868){const _0xc21dd6=_0xc21d();return _0x185b=function(_0x185bc1,_0x971e90){_0x185bc1=_0x185bc1-0x1c1;let _0x345e11=_0xc21dd6[_0x185bc1];return _0x345e11;},_0x185b(_0x5fd0b2,_0x3d5868);}var label=_0x5a5150(0x22c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5a5150(0x30d)](function(_0x130652){const _0x7dd3eb=_0x5a5150;return _0x130652[_0x7dd3eb(0x4dd)]&&_0x130652[_0x7dd3eb(0x3e6)][_0x7dd3eb(0x258)]('['+label+']');})[0x0];VisuMZ[label][_0x5a5150(0x25b)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5a5150(0x2a4)]=function(_0x11ee42,_0x57d9ad){const _0x308e69=_0x5a5150;for(const _0x2aa66c in _0x57d9ad){if(_0x2aa66c[_0x308e69(0x3eb)](/(.*):(.*)/i)){const _0x2d6bef=String(RegExp['$1']),_0x421054=String(RegExp['$2'])[_0x308e69(0x409)]()[_0x308e69(0x2dc)]();let _0x40d9db,_0x594b0f,_0x2a4b6c;switch(_0x421054){case'NUM':_0x40d9db=_0x57d9ad[_0x2aa66c]!==''?Number(_0x57d9ad[_0x2aa66c]):0x0;break;case _0x308e69(0x4c1):_0x594b0f=_0x57d9ad[_0x2aa66c]!==''?JSON[_0x308e69(0x1f5)](_0x57d9ad[_0x2aa66c]):[],_0x40d9db=_0x594b0f[_0x308e69(0x282)](_0x1fa493=>Number(_0x1fa493));break;case _0x308e69(0x3fc):_0x40d9db=_0x57d9ad[_0x2aa66c]!==''?eval(_0x57d9ad[_0x2aa66c]):null;break;case _0x308e69(0x3e7):_0x594b0f=_0x57d9ad[_0x2aa66c]!==''?JSON['parse'](_0x57d9ad[_0x2aa66c]):[],_0x40d9db=_0x594b0f[_0x308e69(0x282)](_0x940129=>eval(_0x940129));break;case _0x308e69(0x34c):_0x40d9db=_0x57d9ad[_0x2aa66c]!==''?JSON['parse'](_0x57d9ad[_0x2aa66c]):'';break;case'ARRAYJSON':_0x594b0f=_0x57d9ad[_0x2aa66c]!==''?JSON[_0x308e69(0x1f5)](_0x57d9ad[_0x2aa66c]):[],_0x40d9db=_0x594b0f[_0x308e69(0x282)](_0x255ab6=>JSON[_0x308e69(0x1f5)](_0x255ab6));break;case _0x308e69(0x2c4):_0x40d9db=_0x57d9ad[_0x2aa66c]!==''?new Function(JSON[_0x308e69(0x1f5)](_0x57d9ad[_0x2aa66c])):new Function('return\x200');break;case'ARRAYFUNC':_0x594b0f=_0x57d9ad[_0x2aa66c]!==''?JSON['parse'](_0x57d9ad[_0x2aa66c]):[],_0x40d9db=_0x594b0f[_0x308e69(0x282)](_0x100694=>new Function(JSON[_0x308e69(0x1f5)](_0x100694)));break;case _0x308e69(0x415):_0x40d9db=_0x57d9ad[_0x2aa66c]!==''?String(_0x57d9ad[_0x2aa66c]):'';break;case _0x308e69(0x350):_0x594b0f=_0x57d9ad[_0x2aa66c]!==''?JSON[_0x308e69(0x1f5)](_0x57d9ad[_0x2aa66c]):[],_0x40d9db=_0x594b0f[_0x308e69(0x282)](_0xeeadd4=>String(_0xeeadd4));break;case _0x308e69(0x1f9):_0x2a4b6c=_0x57d9ad[_0x2aa66c]!==''?JSON[_0x308e69(0x1f5)](_0x57d9ad[_0x2aa66c]):{},_0x11ee42[_0x2d6bef]={},VisuMZ['ConvertParams'](_0x11ee42[_0x2d6bef],_0x2a4b6c);continue;case'ARRAYSTRUCT':_0x594b0f=_0x57d9ad[_0x2aa66c]!==''?JSON[_0x308e69(0x1f5)](_0x57d9ad[_0x2aa66c]):[],_0x40d9db=_0x594b0f['map'](_0x186451=>VisuMZ[_0x308e69(0x2a4)]({},JSON[_0x308e69(0x1f5)](_0x186451)));break;default:continue;}_0x11ee42[_0x2d6bef]=_0x40d9db;}}return _0x11ee42;},(_0x5b8eff=>{const _0x223aca=_0x5a5150,_0x238cf2=_0x5b8eff[_0x223aca(0x398)];for(const _0x17c0c7 of dependencies){if(_0x223aca(0x4c6)!==_0x223aca(0x4c6))return this['totalStateCategory'](_0x5e196a)>0x0;else{if(!Imported[_0x17c0c7]){if(_0x223aca(0x271)==='GTSee'){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x223aca(0x1e6)](_0x238cf2,_0x17c0c7)),SceneManager[_0x223aca(0x2d4)]();break;}else{const _0x468f40=this[_0x223aca(0x422)][_0x223aca(0x2c1)]||0x0;this['gainMp'](_0x58756a),this[_0x223aca(0x422)][_0x223aca(0x2c1)]+=_0x468f40;}}}}const _0x36b5df=_0x5b8eff[_0x223aca(0x3e6)];if(_0x36b5df[_0x223aca(0x3eb)](/\[Version[ ](.*?)\]/i)){const _0x56b5cd=Number(RegExp['$1']);_0x56b5cd!==VisuMZ[label][_0x223aca(0x3f0)]&&(alert(_0x223aca(0x345)[_0x223aca(0x1e6)](_0x238cf2,_0x56b5cd)),SceneManager[_0x223aca(0x2d4)]());}if(_0x36b5df[_0x223aca(0x3eb)](/\[Tier[ ](\d+)\]/i)){const _0x4c5a49=Number(RegExp['$1']);if(_0x4c5a49<tier){if('NDvKu'!==_0x223aca(0x494)){const _0x3aa4d8=[_0x3cebfa];for(const _0xa35736 of _0x3f5434){_0xa35736[_0x223aca(0x3eb)](/<REMOVE OTHER (.*) STATES>/i);const _0x96eaa=_0x4a4375(_0x49329d['$1']);this[_0x223aca(0x382)](_0x96eaa,_0x3aa4d8);}}else alert(_0x223aca(0x202)[_0x223aca(0x1e6)](_0x238cf2,_0x4c5a49,tier)),SceneManager[_0x223aca(0x2d4)]();}else _0x223aca(0x47d)!==_0x223aca(0x2f3)?tier=Math['max'](_0x4c5a49,tier):this[_0x223aca(0x236)]();}VisuMZ['ConvertParams'](VisuMZ[label][_0x223aca(0x25b)],_0x5b8eff['parameters']);})(pluginData),VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x357)]=Scene_Boot[_0x5a5150(0x20f)][_0x5a5150(0x2f1)],Scene_Boot[_0x5a5150(0x20f)][_0x5a5150(0x2f1)]=function(){const _0x361a11=_0x5a5150;VisuMZ[_0x361a11(0x22c)]['Scene_Boot_onDatabaseLoaded'][_0x361a11(0x1c7)](this),this[_0x361a11(0x4fa)](),VisuMZ[_0x361a11(0x22c)][_0x361a11(0x3cd)]();},Scene_Boot['prototype'][_0x5a5150(0x4fa)]=function(){const _0x5ec079=_0x5a5150;if(VisuMZ[_0x5ec079(0x46e)])return;this[_0x5ec079(0x2d2)](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot[_0x5a5150(0x20f)][_0x5a5150(0x2d2)]=function(){const _0xf5d2de=_0x5a5150;for(const _0x2efed3 of $dataSkills){if('DTcFI'!=='bPsYI'){if(!_0x2efed3)continue;VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Cost'](_0x2efed3),VisuMZ[_0xf5d2de(0x22c)][_0xf5d2de(0x370)](_0x2efed3);}else _0x2c4beb[_0xf5d2de(0x264)](_0x5e47c2,_0x3d4367),this[_0xf5d2de(0x3dc)](_0x5935a1);}},Scene_Boot[_0x5a5150(0x20f)][_0x5a5150(0x26a)]=function(){const _0x58e595=_0x5a5150;for(const _0x17d05c of $dataStates){if(!_0x17d05c)continue;VisuMZ[_0x58e595(0x22c)][_0x58e595(0x2af)](_0x17d05c),VisuMZ[_0x58e595(0x22c)][_0x58e595(0x36c)](_0x17d05c),VisuMZ[_0x58e595(0x22c)]['Parse_Notetags_State_SlipEffectJS'](_0x17d05c),VisuMZ[_0x58e595(0x22c)][_0x58e595(0x4ef)](_0x17d05c);}},VisuMZ[_0x5a5150(0x22c)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ['ParseSkillNotetags']=function(_0x5d2076){const _0x174325=_0x5a5150;VisuMZ[_0x174325(0x22c)][_0x174325(0x2ff)][_0x174325(0x1c7)](this,_0x5d2076),VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Cost'](_0x5d2076),VisuMZ['SkillsStatesCore'][_0x174325(0x370)](_0x5d2076);},VisuMZ[_0x5a5150(0x22c)]['ParseStateNotetags']=VisuMZ['ParseStateNotetags'],VisuMZ['ParseStateNotetags']=function(_0x394fed){const _0x254bc1=_0x5a5150;VisuMZ[_0x254bc1(0x22c)]['ParseStateNotetags'][_0x254bc1(0x1c7)](this,_0x394fed),VisuMZ[_0x254bc1(0x22c)]['Parse_Notetags_State_Category'](_0x394fed),VisuMZ[_0x254bc1(0x22c)][_0x254bc1(0x36c)](_0x394fed),VisuMZ[_0x254bc1(0x22c)][_0x254bc1(0x3cc)](_0x394fed),VisuMZ[_0x254bc1(0x22c)][_0x254bc1(0x4ef)](_0x394fed);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x26f)]=function(_0x5117aa){const _0x578215=_0x5a5150,_0x1c27a7=_0x5117aa['note'];_0x1c27a7['match'](/<MP COST:[ ](\d+)>/i)&&(_0x5117aa[_0x578215(0x40e)]=Number(RegExp['$1'])),_0x1c27a7[_0x578215(0x3eb)](/<TP COST:[ ](\d+)>/i)&&(_0x5117aa[_0x578215(0x27e)]=Number(RegExp['$1']));},VisuMZ[_0x5a5150(0x22c)]['skillEnableJS']={},VisuMZ[_0x5a5150(0x22c)]['skillVisibleJS']={},VisuMZ['SkillsStatesCore'][_0x5a5150(0x370)]=function(_0x535f46){const _0x3dcd31=_0x5a5150,_0x1ad496=_0x535f46[_0x3dcd31(0x24c)];if(_0x1ad496['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x354875=String(RegExp['$1']),_0x309478='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x354875);VisuMZ[_0x3dcd31(0x22c)][_0x3dcd31(0x2aa)][_0x535f46['id']]=new Function(_0x3dcd31(0x211),_0x309478);}if(_0x1ad496[_0x3dcd31(0x3eb)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x3fc7f5=String(RegExp['$1']),_0x452dc3=_0x3dcd31(0x4b0)[_0x3dcd31(0x1e6)](_0x3fc7f5);VisuMZ[_0x3dcd31(0x22c)][_0x3dcd31(0x1fa)][_0x535f46['id']]=new Function('skill',_0x452dc3);}},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x2af)]=function(_0x5d09c3){const _0x5eb994=_0x5a5150;_0x5d09c3[_0x5eb994(0x374)]=[_0x5eb994(0x3b8),_0x5eb994(0x2e4)];const _0x3a2929=_0x5d09c3[_0x5eb994(0x24c)],_0xf4f922=_0x3a2929[_0x5eb994(0x3eb)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xf4f922)for(const _0x885017 of _0xf4f922){if(_0x5eb994(0x259)!==_0x5eb994(0x349)){_0x885017[_0x5eb994(0x3eb)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2dbdf9=String(RegExp['$1'])[_0x5eb994(0x409)]()['trim']()[_0x5eb994(0x4e2)](',');for(const _0x1d4a27 of _0x2dbdf9){if(_0x5eb994(0x3a0)!==_0x5eb994(0x3a0)){const _0x1eaf39=_0x30f6e4[_0x5eb994(0x24c)];if(_0x5d20a3==='death'&&_0x1eaf39[_0x5eb994(0x3eb)](/<NO DEATH CLEAR>/i))return![];if(_0x19dc73===_0x5eb994(0x446)&&_0x1eaf39[_0x5eb994(0x3eb)](/<NO RECOVER ALL CLEAR>/i))return![];}else _0x5d09c3['categories'][_0x5eb994(0x4a4)](_0x1d4a27[_0x5eb994(0x2dc)]());}}else{const _0x25d875=this[_0x5eb994(0x372)](),_0x43b16e=this[_0x5eb994(0x1e5)][_0x5eb994(0x410)],_0x112a59=this['isRightInputMode']()?0x0:_0x2475c8[_0x5eb994(0x385)]-this[_0x5eb994(0x372)](),_0x5a6a0f=this[_0x5eb994(0x1e5)]['y'];return new _0x56fea5(_0x112a59,_0x5a6a0f,_0x25d875,_0x43b16e);}}if(_0x3a2929[_0x5eb994(0x3eb)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x8e11af=RegExp['$1'][_0x5eb994(0x4e2)](/[\r\n]+/);for(const _0xcae233 of _0x8e11af){if(_0x5eb994(0x45f)!==_0x5eb994(0x45f)){const _0x318375=this[_0x5eb994(0x417)][_0x54bb5a];_0xa677ec[_0x5eb994(0x22c)][_0x5eb994(0x1d6)]['call'](this,_0x24aada);if(_0x318375>0x0)this[_0x5eb994(0x1f3)](_0x3bde8f);if(_0x318375<0x0)this[_0x5eb994(0x3f7)](_0x11275e);}else _0x5d09c3[_0x5eb994(0x374)][_0x5eb994(0x4a4)](_0xcae233['toUpperCase']()[_0x5eb994(0x2dc)]());}}_0x3a2929[_0x5eb994(0x3eb)](/<POSITIVE STATE>/i)&&_0x5d09c3['categories']['push'](_0x5eb994(0x38c)),_0x3a2929[_0x5eb994(0x3eb)](/<NEGATIVE STATE>/i)&&_0x5d09c3[_0x5eb994(0x374)][_0x5eb994(0x4a4)](_0x5eb994(0x4db));},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x1d1)]={},VisuMZ['SkillsStatesCore'][_0x5a5150(0x36c)]=function(_0x52df02){const _0x2ad794=_0x5a5150,_0x332ebe=_0x52df02['note'];if(_0x332ebe[_0x2ad794(0x3eb)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x7908ac=String(RegExp['$1']),_0x64de56=_0x2ad794(0x32c)['format'](_0x7908ac);VisuMZ[_0x2ad794(0x22c)][_0x2ad794(0x1d1)][_0x52df02['id']]=new Function(_0x2ad794(0x206),_0x64de56);}},VisuMZ['SkillsStatesCore'][_0x5a5150(0x27a)]={},VisuMZ[_0x5a5150(0x22c)]['stateHpSlipHealJS']={},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x472)]={},VisuMZ[_0x5a5150(0x22c)]['stateMpSlipHealJS']={},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x2fe)]={},VisuMZ[_0x5a5150(0x22c)]['stateTpSlipHealJS']={},VisuMZ[_0x5a5150(0x22c)]['Parse_Notetags_State_SlipEffectJS']=function(_0x422345){const _0x72785b=_0x5a5150,_0x39cab5=_0x422345['note'],_0x160aec='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x39cab5[_0x72785b(0x3eb)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x2b73b3=String(RegExp['$1']),_0x7592dc=_0x160aec[_0x72785b(0x1e6)](_0x2b73b3,_0x72785b(0x3ad),-0x1,_0x72785b(0x27d));VisuMZ[_0x72785b(0x22c)][_0x72785b(0x27a)][_0x422345['id']]=new Function(_0x72785b(0x403),_0x7592dc);}else{if(_0x39cab5['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if(_0x72785b(0x1c8)!=='FVMrV'){const _0x738141=String(RegExp['$1']),_0x524548=_0x160aec['format'](_0x738141,_0x72785b(0x344),0x1,'slipHp');VisuMZ[_0x72785b(0x22c)][_0x72785b(0x3c4)][_0x422345['id']]=new Function('stateId',_0x524548);}else _0x5237c5[_0x72785b(0x22c)]['Sprite_StateIcon_loadBitmap'][_0x72785b(0x1c7)](this),this[_0x72785b(0x3b7)]();}}if(_0x39cab5[_0x72785b(0x3eb)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x3d4fee=String(RegExp['$1']),_0x3b5200=_0x160aec[_0x72785b(0x1e6)](_0x3d4fee,'damage',-0x1,_0x72785b(0x2bc));VisuMZ[_0x72785b(0x22c)]['stateMpSlipDamageJS'][_0x422345['id']]=new Function('stateId',_0x3b5200);}else{if(_0x39cab5[_0x72785b(0x3eb)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x2ca975=String(RegExp['$1']),_0x18f5cc=_0x160aec[_0x72785b(0x1e6)](_0x2ca975,_0x72785b(0x344),0x1,_0x72785b(0x2bc));VisuMZ[_0x72785b(0x22c)][_0x72785b(0x44c)][_0x422345['id']]=new Function('stateId',_0x18f5cc);}}if(_0x39cab5[_0x72785b(0x3eb)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x4ee5b0=String(RegExp['$1']),_0x262da7=_0x160aec['format'](_0x4ee5b0,_0x72785b(0x3ad),-0x1,_0x72785b(0x41d));VisuMZ[_0x72785b(0x22c)][_0x72785b(0x2fe)][_0x422345['id']]=new Function('stateId',_0x262da7);}else{if(_0x39cab5[_0x72785b(0x3eb)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if('tYQHP'==='zUDeJ'){const _0x56362a=_0x443e7a[_0x72785b(0x1f5)]('['+_0x44c392['$1']['match'](/\d+/g)+']');for(const _0x1a7250 of _0x56362a){if(_0x5177ed[_0x72785b(0x235)](_0x1a7250))return![];}return!![];}else{const _0x200a87=String(RegExp['$1']),_0x13e874=_0x160aec['format'](_0x200a87,'heal',0x1,_0x72785b(0x41d));VisuMZ[_0x72785b(0x22c)]['stateTpSlipHealJS'][_0x422345['id']]=new Function(_0x72785b(0x403),_0x13e874);}}}},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x2a2)]={},VisuMZ[_0x5a5150(0x22c)]['stateEraseJS']={},VisuMZ['SkillsStatesCore'][_0x5a5150(0x493)]={},VisuMZ[_0x5a5150(0x22c)]['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x2a3204){const _0x35847f=_0x5a5150,_0x58e105=_0x2a3204[_0x35847f(0x24c)],_0x176dd8='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x58e105[_0x35847f(0x3eb)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if(_0x35847f(0x24f)!==_0x35847f(0x312)){const _0x1fdd99=String(RegExp['$1']),_0x41a0e2=_0x176dd8[_0x35847f(0x1e6)](_0x1fdd99);VisuMZ['SkillsStatesCore'][_0x35847f(0x2a2)][_0x2a3204['id']]=new Function(_0x35847f(0x403),_0x41a0e2);}else return _0xdf412e[_0x35847f(0x2cd)]()-0x6;}if(_0x58e105['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if(_0x35847f(0x3ed)===_0x35847f(0x3ed)){const _0x353ff3=String(RegExp['$1']),_0x1ede10=_0x176dd8[_0x35847f(0x1e6)](_0x353ff3);VisuMZ[_0x35847f(0x22c)][_0x35847f(0x39c)][_0x2a3204['id']]=new Function(_0x35847f(0x403),_0x1ede10);}else{if(_0xaadfbe[_0x35847f(0x3eb)](/<member-(\d+)>/i))return _0x185b20[_0x35847f(0x2d1)]()[_0xa10e5(_0x23cf22['$1'])];}}if(_0x58e105[_0x35847f(0x3eb)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x3da7a4=String(RegExp['$1']),_0x450128=_0x176dd8[_0x35847f(0x1e6)](_0x3da7a4);VisuMZ[_0x35847f(0x22c)][_0x35847f(0x493)][_0x2a3204['id']]=new Function('stateId',_0x450128);}},VisuMZ['SkillsStatesCore']['CheckIncompatibleStates']=function(){const _0x36ff44=_0x5a5150;if(!VisuMZ[_0x36ff44(0x22c)][_0x36ff44(0x25b)][_0x36ff44(0x4e8)][_0x36ff44(0x3f3)])return;for(const _0x3b1278 of $dataStates){if(!_0x3b1278)continue;if(_0x3b1278[_0x36ff44(0x2a0)]===0x4&&_0x3b1278[_0x36ff44(0x24b)]===0x1){if(_0x36ff44(0x3e2)!==_0x36ff44(0x218))_0x3b1278[_0x36ff44(0x24b)]=0x2;else{const _0x3fe834=_0x4d59ed[_0x2fa9ee[_0x36ff44(0x273)]];if(_0x3fe834&&!_0x1a6bbb['includes'](_0x3fe834))_0x50690e[_0x36ff44(0x4a4)](_0x3fe834);}}}},DataManager[_0x5a5150(0x3f5)]=function(_0x5d7aa7){const _0x12bf0a=_0x5a5150;_0x5d7aa7=_0x5d7aa7[_0x12bf0a(0x409)]()[_0x12bf0a(0x2dc)](),this[_0x12bf0a(0x330)]=this[_0x12bf0a(0x330)]||{};if(this[_0x12bf0a(0x330)][_0x5d7aa7])return this[_0x12bf0a(0x330)][_0x5d7aa7];for(const _0x2dc84d of $dataClasses){if(!_0x2dc84d)continue;let _0x5f0827=_0x2dc84d['name'];_0x5f0827=_0x5f0827[_0x12bf0a(0x401)](/\x1I\[(\d+)\]/gi,''),_0x5f0827=_0x5f0827[_0x12bf0a(0x401)](/\\I\[(\d+)\]/gi,''),this[_0x12bf0a(0x330)][_0x5f0827[_0x12bf0a(0x409)]()[_0x12bf0a(0x2dc)]()]=_0x2dc84d['id'];}return this[_0x12bf0a(0x330)][_0x5d7aa7]||0x0;},DataManager['getSkillTypes']=function(_0x63e6c3){const _0x4e2870=_0x5a5150;this[_0x4e2870(0x302)]=this[_0x4e2870(0x302)]||{};if(this[_0x4e2870(0x302)][_0x63e6c3['id']])return this[_0x4e2870(0x302)][_0x63e6c3['id']];this[_0x4e2870(0x302)][_0x63e6c3['id']]=[_0x63e6c3['stypeId']];if(_0x63e6c3['note'][_0x4e2870(0x3eb)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x57b8a7=JSON['parse']('['+RegExp['$1'][_0x4e2870(0x3eb)](/\d+/g)+']');this[_0x4e2870(0x302)][_0x63e6c3['id']]=this[_0x4e2870(0x302)][_0x63e6c3['id']][_0x4e2870(0x4e0)](_0x57b8a7);}else{if(_0x63e6c3[_0x4e2870(0x24c)][_0x4e2870(0x3eb)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x3e57bf=RegExp['$1'][_0x4e2870(0x4e2)](',');for(const _0x101382 of _0x3e57bf){if('PmRtU'!=='PmRtU'){if(typeof _0x15034d!==_0x4e2870(0x47b))_0x4611c6=_0x2f242f['id'];this['isStateAffected'](_0x2f2613)&&(_0x5a1355+=this[_0x4e2870(0x47f)](_0x22fd9b),this['setStateTurns'](_0x280543,_0x41315c));}else{const _0x5064b9=DataManager[_0x4e2870(0x4bc)](_0x101382);if(_0x5064b9)this[_0x4e2870(0x302)][_0x63e6c3['id']]['push'](_0x5064b9);}}}}return this[_0x4e2870(0x302)][_0x63e6c3['id']];},DataManager[_0x5a5150(0x4bc)]=function(_0x5e7c08){const _0x4898b5=_0x5a5150;_0x5e7c08=_0x5e7c08[_0x4898b5(0x409)]()[_0x4898b5(0x2dc)](),this[_0x4898b5(0x302)]=this[_0x4898b5(0x302)]||{};if(this[_0x4898b5(0x302)][_0x5e7c08])return this['_stypeIDs'][_0x5e7c08];for(let _0x10fc61=0x1;_0x10fc61<0x64;_0x10fc61++){if(!$dataSystem[_0x4898b5(0x267)][_0x10fc61])continue;let _0x5e6e51=$dataSystem[_0x4898b5(0x267)][_0x10fc61]['toUpperCase']()[_0x4898b5(0x2dc)]();_0x5e6e51=_0x5e6e51['replace'](/\x1I\[(\d+)\]/gi,''),_0x5e6e51=_0x5e6e51[_0x4898b5(0x401)](/\\I\[(\d+)\]/gi,''),this[_0x4898b5(0x302)][_0x5e6e51]=_0x10fc61;}return this[_0x4898b5(0x302)][_0x5e7c08]||0x0;},DataManager[_0x5a5150(0x23e)]=function(_0x488787){const _0x37f5c8=_0x5a5150;_0x488787=_0x488787[_0x37f5c8(0x409)]()[_0x37f5c8(0x2dc)](),this[_0x37f5c8(0x1c4)]=this[_0x37f5c8(0x1c4)]||{};if(this[_0x37f5c8(0x1c4)][_0x488787])return this['_skillIDs'][_0x488787];for(const _0xa6247a of $dataSkills){if('cXCqG'===_0x37f5c8(0x4de)){if(!_0xa6247a)continue;this[_0x37f5c8(0x1c4)][_0xa6247a['name'][_0x37f5c8(0x409)]()[_0x37f5c8(0x2dc)]()]=_0xa6247a['id'];}else return _0x478db0[_0x37f5c8(0x3ea)];}return this['_skillIDs'][_0x488787]||0x0;},DataManager[_0x5a5150(0x26d)]=function(_0x12e13c){const _0x46f98d=_0x5a5150;_0x12e13c=_0x12e13c['toUpperCase']()['trim'](),this[_0x46f98d(0x4e4)]=this['_stateIDs']||{};if(this['_stateIDs'][_0x12e13c])return this[_0x46f98d(0x4e4)][_0x12e13c];for(const _0xe4de00 of $dataStates){if(!_0xe4de00)continue;this[_0x46f98d(0x4e4)][_0xe4de00['name'][_0x46f98d(0x409)]()[_0x46f98d(0x2dc)]()]=_0xe4de00['id'];}return this[_0x46f98d(0x4e4)][_0x12e13c]||0x0;},DataManager['stateMaximumTurns']=function(_0xee9fb6){const _0x5a06d8=_0x5a5150;this[_0x5a06d8(0x368)]=this['_stateMaxTurns']||{};if(this[_0x5a06d8(0x368)][_0xee9fb6])return this[_0x5a06d8(0x368)][_0xee9fb6];return $dataStates[_0xee9fb6][_0x5a06d8(0x24c)][_0x5a06d8(0x3eb)](/<MAX TURNS:[ ](\d+)>/i)?_0x5a06d8(0x448)===_0x5a06d8(0x392)?(this[_0x5a06d8(0x4fb)]={},_0x5c5af0[_0x5a06d8(0x22c)][_0x5a06d8(0x38e)][_0x5a06d8(0x1c7)](this)):this[_0x5a06d8(0x368)][_0xee9fb6]=Number(RegExp['$1']):_0x5a06d8(0x32a)!==_0x5a06d8(0x304)?this['_stateMaxTurns'][_0xee9fb6]=VisuMZ['SkillsStatesCore']['Settings'][_0x5a06d8(0x4e8)]['MaxTurns']:this[_0x5a06d8(0x2ce)](_0x11efd3)&&(_0x339502+=this[_0x5a06d8(0x408)](_0x37b222),this[_0x5a06d8(0x440)](_0x458853,_0x26c30a)),this[_0x5a06d8(0x368)][_0xee9fb6];},ColorManager[_0x5a5150(0x2d7)]=function(_0x49444b,_0x16319d){const _0x30ee00=_0x5a5150;return _0x16319d=String(_0x16319d),this[_0x30ee00(0x480)]=this[_0x30ee00(0x480)]||{},_0x16319d[_0x30ee00(0x3eb)](/#(.*)/i)?this[_0x30ee00(0x480)][_0x49444b]='#%1'[_0x30ee00(0x1e6)](String(RegExp['$1'])):this[_0x30ee00(0x480)][_0x49444b]=this[_0x30ee00(0x4a1)](Number(_0x16319d)),this[_0x30ee00(0x480)][_0x49444b];},ColorManager['getColor']=function(_0x2127f4){const _0x47d339=_0x5a5150;_0x2127f4=String(_0x2127f4);if(_0x2127f4[_0x47d339(0x3eb)](/#(.*)/i))return _0x47d339(0x4a6)['format'](String(RegExp['$1']));else{if(_0x47d339(0x2bf)===_0x47d339(0x284))this[_0x47d339(0x2a1)](_0x59c288[_0x47d339(0x1ce)]());else return this[_0x47d339(0x4a1)](Number(_0x2127f4));}},ColorManager[_0x5a5150(0x4d5)]=function(_0x2103c3){const _0x1d534e=_0x5a5150;if(typeof _0x2103c3===_0x1d534e(0x47b))_0x2103c3=$dataStates[_0x2103c3];const _0x262628=_0x1d534e(0x4d3)[_0x1d534e(0x1e6)](_0x2103c3['id']);this[_0x1d534e(0x480)]=this[_0x1d534e(0x480)]||{};if(this[_0x1d534e(0x480)][_0x262628])return this[_0x1d534e(0x480)][_0x262628];const _0x77107d=this['retrieveStateColor'](_0x2103c3);return this[_0x1d534e(0x2d7)](_0x262628,_0x77107d);},ColorManager['retrieveStateColor']=function(_0x19a2f0){const _0x3efed4=_0x5a5150,_0x1b7f8f=_0x19a2f0[_0x3efed4(0x24c)];if(_0x1b7f8f[_0x3efed4(0x3eb)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1b7f8f[_0x3efed4(0x3eb)](/<POSITIVE STATE>/i))return VisuMZ[_0x3efed4(0x22c)][_0x3efed4(0x25b)][_0x3efed4(0x4e8)][_0x3efed4(0x3d1)];else return _0x1b7f8f[_0x3efed4(0x3eb)](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore'][_0x3efed4(0x25b)][_0x3efed4(0x4e8)][_0x3efed4(0x287)]:VisuMZ[_0x3efed4(0x22c)][_0x3efed4(0x25b)][_0x3efed4(0x4e8)][_0x3efed4(0x491)];}},ColorManager[_0x5a5150(0x275)]=function(){const _0x401f00=_0x5a5150,_0xdbb0ea='_stored_buffColor';this[_0x401f00(0x480)]=this['_colorCache']||{};if(this[_0x401f00(0x480)][_0xdbb0ea])return this[_0x401f00(0x480)][_0xdbb0ea];const _0x52b380=VisuMZ[_0x401f00(0x22c)][_0x401f00(0x25b)][_0x401f00(0x32f)]['ColorBuff'];return this['getColorDataFromPluginParameters'](_0xdbb0ea,_0x52b380);},ColorManager[_0x5a5150(0x487)]=function(){const _0x3581a3=_0x5a5150,_0x20318a=_0x3581a3(0x246);this['_colorCache']=this[_0x3581a3(0x480)]||{};if(this[_0x3581a3(0x480)][_0x20318a])return this[_0x3581a3(0x480)][_0x20318a];const _0x47c22e=VisuMZ[_0x3581a3(0x22c)][_0x3581a3(0x25b)][_0x3581a3(0x32f)][_0x3581a3(0x216)];return this[_0x3581a3(0x2d7)](_0x20318a,_0x47c22e);},SceneManager[_0x5a5150(0x443)]=function(){const _0x497802=_0x5a5150;return this['_scene']&&this[_0x497802(0x244)][_0x497802(0x393)]===Scene_Battle;},VisuMZ[_0x5a5150(0x22c)]['BattleManager_endAction']=BattleManager[_0x5a5150(0x230)],BattleManager[_0x5a5150(0x230)]=function(){const _0x5a5e54=_0x5a5150;this['updateStatesActionEnd'](),VisuMZ[_0x5a5e54(0x22c)][_0x5a5e54(0x2be)][_0x5a5e54(0x1c7)](this);},BattleManager['updateStatesActionEnd']=function(){const _0x4fc8c9=_0x5a5150,_0x3bba95=VisuMZ[_0x4fc8c9(0x22c)][_0x4fc8c9(0x25b)][_0x4fc8c9(0x4e8)];if(!_0x3bba95)return;if(_0x3bba95[_0x4fc8c9(0x3f3)]===![])return;if(!this[_0x4fc8c9(0x3a1)])return;this[_0x4fc8c9(0x3a1)]['updateStatesActionEnd']();},Game_Battler['prototype'][_0x5a5150(0x2fa)]=function(){const _0x548a50=_0x5a5150;if(BattleManager[_0x548a50(0x4f6)]!==_0x548a50(0x4cb))return;if(this[_0x548a50(0x49e)]===Graphics['frameCount'])return;this[_0x548a50(0x49e)]=Graphics[_0x548a50(0x1ec)];for(const _0x48fed3 of this[_0x548a50(0x49a)]){const _0x157392=$dataStates[_0x48fed3];if(!_0x157392)continue;if(_0x157392[_0x548a50(0x24b)]!==0x1)continue;if(this['_stateTurns'][_0x48fed3]>0x0){if('ybypm'===_0x548a50(0x1c9)){if(_0x242348[_0x548a50(0x428)]&&_0x30ee59[_0x548a50(0x257)]!==_0x20981a)return _0x4c9a96['uiHelpPosition'];else{if(this[_0x548a50(0x43f)]())return this['updatedLayoutStyle']()[_0x548a50(0x3eb)](/LOWER/i);else _0x550bb5[_0x548a50(0x20f)][_0x548a50(0x3fb)][_0x548a50(0x1c7)](this);}}else this['_stateTurns'][_0x48fed3]--;}}this[_0x548a50(0x377)](0x1);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x427)]=function(){const _0x33dc03=_0x5a5150,_0x2d8baf=VisuMZ[_0x33dc03(0x22c)][_0x33dc03(0x25b)][_0x33dc03(0x4e8)];for(const _0x19afce of this[_0x33dc03(0x49a)]){const _0x5200fa=$dataStates[_0x19afce];if(_0x2d8baf&&_0x2d8baf[_0x33dc03(0x3f3)]!==![]){if(_0x5200fa&&_0x5200fa[_0x33dc03(0x24b)]===0x1)continue;}this[_0x33dc03(0x2ec)][_0x19afce]>0x0&&this[_0x33dc03(0x2ec)][_0x19afce]--;}},VisuMZ['SkillsStatesCore'][_0x5a5150(0x2c5)]=Game_Switches[_0x5a5150(0x20f)][_0x5a5150(0x3de)],Game_Switches[_0x5a5150(0x20f)][_0x5a5150(0x3de)]=function(){const _0x181295=_0x5a5150;VisuMZ[_0x181295(0x22c)][_0x181295(0x2c5)][_0x181295(0x1c7)](this);const _0x285ade=VisuMZ[_0x181295(0x22c)]['Settings']['PassiveStates'][_0x181295(0x1d9)]??!![];if(!_0x285ade)return;if(SceneManager[_0x181295(0x443)]()){if(_0x181295(0x2e1)!==_0x181295(0x2e1)){const _0x18d4f9=_0x3aba36['parse']('['+_0x3a7dc8['$1'][_0x181295(0x3eb)](/\d+/g)+']');for(const _0x446bab of _0x18d4f9){if(!_0x1e80a1[_0x181295(0x235)](_0x446bab))return![];}return!![];}else for(const _0x185d8b of BattleManager[_0x181295(0x3b4)]()){if(_0x185d8b)_0x185d8b[_0x181295(0x463)]();}}},VisuMZ['SkillsStatesCore'][_0x5a5150(0x329)]=Game_Variables[_0x5a5150(0x20f)][_0x5a5150(0x3de)],Game_Variables['prototype'][_0x5a5150(0x3de)]=function(){const _0x3169ad=_0x5a5150;VisuMZ['SkillsStatesCore']['Game_Variables_onChange']['call'](this);const _0xd9b1ba=VisuMZ[_0x3169ad(0x22c)][_0x3169ad(0x25b)][_0x3169ad(0x268)][_0x3169ad(0x39d)]??!![];if(!_0xd9b1ba)return;if(SceneManager[_0x3169ad(0x443)]())for(const _0x5e441f of BattleManager[_0x3169ad(0x3b4)]()){if(_0x5e441f)_0x5e441f[_0x3169ad(0x463)]();}},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x1d5)]=Game_Action[_0x5a5150(0x20f)][_0x5a5150(0x215)],Game_Action[_0x5a5150(0x20f)][_0x5a5150(0x215)]=function(_0x10e114){const _0x24caa4=_0x5a5150;VisuMZ[_0x24caa4(0x22c)][_0x24caa4(0x1d5)]['call'](this,_0x10e114),this[_0x24caa4(0x4c4)](_0x10e114);},Game_Action[_0x5a5150(0x20f)][_0x5a5150(0x4c4)]=function(_0x3e9545){const _0x3fd926=_0x5a5150;this['applyStateCategoryRemovalEffects'](_0x3e9545),this[_0x3fd926(0x3ff)](_0x3e9545),this[_0x3fd926(0x231)](_0x3e9545),this[_0x3fd926(0x3d6)](_0x3e9545);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x26e)]=Game_Action[_0x5a5150(0x20f)]['testApply'],Game_Action['prototype'][_0x5a5150(0x453)]=function(_0x4e3152){const _0x3eda5b=_0x5a5150;if(this[_0x3eda5b(0x4f4)](_0x4e3152)){if(_0x3eda5b(0x324)===_0x3eda5b(0x1c1)){const _0x2da1d3=_0x5d3af0(_0x104644['$1'])['split'](',')[_0x3eda5b(0x282)](_0x362e94=>_0x362e94[_0x3eda5b(0x2dc)]()),_0x4a5ae0=_0x40650f[_0x3eda5b(0x22c)][_0x3eda5b(0x266)](_0x2da1d3);return _0x4a5ae0[_0x3eda5b(0x258)](this[_0x3eda5b(0x3f2)]());}else return!![];}return VisuMZ[_0x3eda5b(0x22c)][_0x3eda5b(0x26e)][_0x3eda5b(0x1c7)](this,_0x4e3152);},Game_Action[_0x5a5150(0x20f)][_0x5a5150(0x4f4)]=function(_0x1c5aac){const _0x41f4c5=_0x5a5150;if(!this[_0x41f4c5(0x354)]())return;const _0xaa912e=this[_0x41f4c5(0x354)]()['note'];if(_0xaa912e[_0x41f4c5(0x3eb)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x382d3b=String(RegExp['$1']);if(_0x1c5aac[_0x41f4c5(0x34d)](_0x382d3b))return!![];}if(_0xaa912e[_0x41f4c5(0x3eb)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x1678ac=Number(RegExp['$1']);if(_0x1c5aac[_0x41f4c5(0x458)](_0x1678ac))return!![];}else{if(_0xaa912e[_0x41f4c5(0x3eb)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x469e71=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x1c5aac[_0x41f4c5(0x458)](_0x469e71))return!![];}}return![];},Game_Action['prototype'][_0x5a5150(0x373)]=function(_0x394903){const _0xb331a7=_0x5a5150;if(_0x394903['states']()[_0xb331a7(0x2ba)]<=0x0)return;const _0x57bcb2=this[_0xb331a7(0x354)]()[_0xb331a7(0x24c)];{if(_0xb331a7(0x29d)===_0xb331a7(0x212))return _0x3174d9[_0xb331a7(0x20f)][_0xb331a7(0x317)]();else{const _0x3ed4a6=_0x57bcb2['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x3ed4a6)for(const _0x44b08a of _0x3ed4a6){_0x44b08a[_0xb331a7(0x3eb)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x32e0da=String(RegExp['$1']);_0x394903[_0xb331a7(0x382)](_0x32e0da);}}}{if(_0xb331a7(0x2f9)!=='KbWmK'){const _0x1c7e6d=_0x57bcb2['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x1c7e6d){if('iwEWR'===_0xb331a7(0x1f1))for(const _0x23cadf of _0x1c7e6d){if(_0xb331a7(0x2a7)===_0xb331a7(0x2a7)){_0x23cadf[_0xb331a7(0x3eb)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x291111=String(RegExp['$1']),_0x533211=Number(RegExp['$2']);_0x394903[_0xb331a7(0x213)](_0x291111,_0x533211);}else return this[_0xb331a7(0x337)]();}else return _0x493508['SkillsStatesCore'][_0xb331a7(0x25b)][_0xb331a7(0x35a)][_0xb331a7(0x44f)];}}else{const _0x8b9354=_0xc1fdae[_0xb331a7(0x3eb)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x8b9354)for(const _0x289ea3 of _0x8b9354){_0x289ea3['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x30a659=_0x12081e(_0x2e15f3['$1']),_0x235c3f=_0x495d6f(_0x363253['$2']);_0x119774[_0xb331a7(0x213)](_0x30a659,_0x235c3f);}}}},Game_Action[_0x5a5150(0x20f)][_0x5a5150(0x3ff)]=function(_0x1ad636){const _0x396960=_0x5a5150,_0x12bd13=this[_0x396960(0x354)]()['note'],_0x4dfc5a=_0x12bd13['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x4dfc5a){if('OfpMv'!=='OfpMv')return _0x5f316d[_0x396960(0x22c)][_0x396960(0x25b)][_0x396960(0x4e8)][_0x396960(0x413)]??0x14;else for(const _0x4c9637 of _0x4dfc5a){let _0x2c7044=0x0,_0x3e5905=0x0;if(_0x4c9637[_0x396960(0x3eb)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x396960(0x469)===_0x396960(0x469))_0x2c7044=Number(RegExp['$1']),_0x3e5905=Number(RegExp['$2']);else{const _0x2e0d5d=_0x258fa4[_0x396960(0x1f5)]('['+_0x4a2c41['$1']['match'](/\d+/g)+']');for(const _0x2ce222 of _0x2e0d5d){if(_0x1c8d9e[_0x396960(0x3bd)](_0x2ce222))return!![];}return![];}}else _0x4c9637[_0x396960(0x3eb)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2c7044=DataManager[_0x396960(0x26d)](RegExp['$1']),_0x3e5905=Number(RegExp['$2']));_0x1ad636['setStateTurns'](_0x2c7044,_0x3e5905),this[_0x396960(0x3dc)](_0x1ad636);}}const _0xe762ea=_0x12bd13[_0x396960(0x3eb)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0xe762ea)for(const _0x444d40 of _0xe762ea){let _0x5a66f3=0x0,_0x8a69a=0x0;if(_0x444d40[_0x396960(0x3eb)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x5a66f3=Number(RegExp['$1']),_0x8a69a=Number(RegExp['$2']);else{if(_0x444d40['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x396960(0x210)!=='PWYpv'){const _0x117193=_0x241735['parse']('['+_0x4cf567['$1'][_0x396960(0x3eb)](/\d+/g)+']');for(const _0x458bcc of _0x117193){if(!_0x2f104c[_0x396960(0x3bd)](_0x458bcc))return![];}return!![];}else _0x5a66f3=DataManager[_0x396960(0x26d)](RegExp['$1']),_0x8a69a=Number(RegExp['$2']);}}_0x1ad636[_0x396960(0x4ed)](_0x5a66f3,_0x8a69a),this[_0x396960(0x3dc)](_0x1ad636);}},Game_Action[_0x5a5150(0x20f)][_0x5a5150(0x231)]=function(_0x432414){const _0x15be03=_0x5a5150,_0x48f2c0=[_0x15be03(0x298),_0x15be03(0x34b),_0x15be03(0x1c2),_0x15be03(0x4ce),_0x15be03(0x221),_0x15be03(0x43d),_0x15be03(0x1eb),_0x15be03(0x4a0)],_0x5abd22=this[_0x15be03(0x354)]()[_0x15be03(0x24c)],_0x15bad3=_0x5abd22[_0x15be03(0x3eb)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x15bad3){if('slgct'!==_0x15be03(0x343))for(const _0x4ecb4a of _0x15bad3){_0x4ecb4a[_0x15be03(0x3eb)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0xfc0005=_0x48f2c0[_0x15be03(0x462)](String(RegExp['$1'])['toUpperCase']()),_0x4991b7=Number(RegExp['$2']);if(_0xfc0005>=0x0){if(_0x15be03(0x4b9)===_0x15be03(0x396)){if(typeof _0x3e2536!==_0x15be03(0x47b))_0x596e89=_0x53376d['id'];return this[_0x15be03(0x2ec)][_0x2e9bd1]||0x0;}else _0x432414[_0x15be03(0x30a)](_0xfc0005,_0x4991b7),this[_0x15be03(0x3dc)](_0x432414);}}else _0x5551d5[_0x15be03(0x374)][_0x15be03(0x4a4)](_0x1e42a0[_0x15be03(0x409)]()['trim']());}const _0x14d434=_0x5abd22[_0x15be03(0x3eb)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x14d434){if(_0x15be03(0x251)!==_0x15be03(0x251))this['drawItemStyleIconText'](_0x57f5af);else for(const _0x15084c of _0x15bad3){_0x15084c[_0x15be03(0x3eb)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x255138=_0x48f2c0[_0x15be03(0x462)](String(RegExp['$1'])[_0x15be03(0x409)]()),_0x3bc5cf=Number(RegExp['$2']);_0x255138>=0x0&&(_0x432414['addBuffTurns'](_0x255138,_0x3bc5cf),this['makeSuccess'](_0x432414));}}},Game_Action[_0x5a5150(0x20f)][_0x5a5150(0x3d6)]=function(_0x47d27a){const _0xf0eb8c=_0x5a5150,_0x1943ef=[_0xf0eb8c(0x298),_0xf0eb8c(0x34b),'ATK','DEF',_0xf0eb8c(0x221),_0xf0eb8c(0x43d),_0xf0eb8c(0x1eb),_0xf0eb8c(0x4a0)],_0x16fbd3=this['item']()[_0xf0eb8c(0x24c)],_0x5e81d6=_0x16fbd3[_0xf0eb8c(0x3eb)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x5e81d6)for(const _0x2abdb1 of _0x5e81d6){_0x2abdb1[_0xf0eb8c(0x3eb)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x2efed9=_0x1943ef[_0xf0eb8c(0x462)](String(RegExp['$1'])[_0xf0eb8c(0x409)]()),_0x4b30b9=Number(RegExp['$2']);if(_0x2efed9>=0x0){if(_0xf0eb8c(0x261)===_0xf0eb8c(0x261))_0x47d27a[_0xf0eb8c(0x327)](_0x2efed9,_0x4b30b9),this[_0xf0eb8c(0x3dc)](_0x47d27a);else{const _0x2b5038=this['getStateRetainType']();if(_0x2b5038!==''){const _0x2e9dc8=_0x4b567c[_0xf0eb8c(0x24c)];if(_0x2b5038===_0xf0eb8c(0x3a5)&&_0x2e9dc8[_0xf0eb8c(0x3eb)](/<NO DEATH CLEAR>/i))return![];if(_0x2b5038===_0xf0eb8c(0x446)&&_0x2e9dc8[_0xf0eb8c(0x3eb)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0xf0eb8c(0x458)](_0x212534['id']);}}}const _0xb4d91f=_0x16fbd3[_0xf0eb8c(0x3eb)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0xb4d91f)for(const _0x4a7030 of _0x5e81d6){_0x4a7030[_0xf0eb8c(0x3eb)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x43784a=_0x1943ef[_0xf0eb8c(0x462)](String(RegExp['$1'])[_0xf0eb8c(0x409)]()),_0x19afbc=Number(RegExp['$2']);_0x43784a>=0x0&&(_0x47d27a['addDebuffTurns'](_0x43784a,_0x19afbc),this['makeSuccess'](_0x47d27a));}},VisuMZ[_0x5a5150(0x22c)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x5a5150(0x20f)]['initMembers'],Game_BattlerBase['prototype']['initMembers']=function(){const _0x46a678=_0x5a5150;this['_cache']={},this[_0x46a678(0x3f4)](),VisuMZ[_0x46a678(0x22c)]['Game_BattlerBase_initMembers'][_0x46a678(0x1c7)](this);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x3f4)]=function(){const _0x59425b=_0x5a5150;this[_0x59425b(0x227)]='',this['_stateData']={},this[_0x59425b(0x4f2)]={},this['_stateOrigin']={};},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x2a3dce){const _0x32ab47=_0x5a5150;return this['_cache']=this[_0x32ab47(0x4fb)]||{},this[_0x32ab47(0x4fb)][_0x2a3dce]!==undefined;},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x38e)]=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x463)],Game_BattlerBase['prototype']['refresh']=function(){const _0x46b02c=_0x5a5150;this['_cache']={},VisuMZ[_0x46b02c(0x22c)][_0x46b02c(0x38e)][_0x46b02c(0x1c7)](this);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x45d)]=Game_BattlerBase['prototype'][_0x5a5150(0x49f)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x49f)]=function(_0x24f73a){const _0x1264ff=_0x5a5150;let _0x233c48=this[_0x1264ff(0x458)](_0x24f73a);VisuMZ[_0x1264ff(0x22c)]['Game_BattlerBase_eraseState'][_0x1264ff(0x1c7)](this,_0x24f73a);if(_0x233c48&&!this[_0x1264ff(0x458)](_0x24f73a))this['onRemoveState'](_0x24f73a);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x1fd)]=function(_0x585cb5){const _0xf04103=_0x5a5150;this['clearStateData'](_0x585cb5),this[_0xf04103(0x278)](_0x585cb5),this['clearStateOrigin'](_0x585cb5);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts']=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x293)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x293)]=function(_0x3353db){const _0x12c5be=_0x5a5150,_0x44d05e=$dataStates[_0x3353db],_0x33e10f=this[_0x12c5be(0x47f)](_0x3353db),_0x31466d=this[_0x12c5be(0x2db)](_0x44d05e)[_0x12c5be(0x36a)]()['trim']();switch(_0x31466d){case _0x12c5be(0x341):if(_0x33e10f<=0x0)VisuMZ[_0x12c5be(0x22c)][_0x12c5be(0x499)]['call'](this,_0x3353db);break;case'reset':VisuMZ[_0x12c5be(0x22c)][_0x12c5be(0x499)][_0x12c5be(0x1c7)](this,_0x3353db);break;case _0x12c5be(0x359):VisuMZ['SkillsStatesCore'][_0x12c5be(0x499)][_0x12c5be(0x1c7)](this,_0x3353db),this[_0x12c5be(0x2ec)][_0x3353db]=Math[_0x12c5be(0x364)](this['_stateTurns'][_0x3353db],_0x33e10f);break;case'add':VisuMZ[_0x12c5be(0x22c)][_0x12c5be(0x499)][_0x12c5be(0x1c7)](this,_0x3353db),this[_0x12c5be(0x2ec)][_0x3353db]+=_0x33e10f;break;default:VisuMZ[_0x12c5be(0x22c)]['Game_BattlerBase_resetStateCounts'][_0x12c5be(0x1c7)](this,_0x3353db);break;}},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x2db)]=function(_0x1015b4){const _0x38bd2e=_0x5a5150,_0xd09383=_0x1015b4[_0x38bd2e(0x24c)];return _0xd09383['match'](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore'][_0x38bd2e(0x25b)][_0x38bd2e(0x4e8)][_0x38bd2e(0x241)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x35b)],Game_BattlerBase[_0x5a5150(0x20f)]['overwriteBuffTurns']=function(_0x31f5c3,_0x121863){const _0x501a6b=_0x5a5150,_0x126019=VisuMZ[_0x501a6b(0x22c)]['Settings']['Buffs'][_0x501a6b(0x241)],_0x4e117a=this[_0x501a6b(0x408)](_0x31f5c3);switch(_0x126019){case'ignore':if(_0x4e117a<=0x0)this['_buffTurns'][_0x31f5c3]=_0x121863;break;case _0x501a6b(0x476):this[_0x501a6b(0x460)][_0x31f5c3]=_0x121863;break;case _0x501a6b(0x359):this['_buffTurns'][_0x31f5c3]=Math[_0x501a6b(0x364)](_0x4e117a,_0x121863);break;case _0x501a6b(0x3fd):this[_0x501a6b(0x460)][_0x31f5c3]+=_0x121863;break;default:VisuMZ[_0x501a6b(0x22c)][_0x501a6b(0x296)][_0x501a6b(0x1c7)](this,_0x31f5c3,_0x121863);break;}const _0x338f78=VisuMZ[_0x501a6b(0x22c)][_0x501a6b(0x25b)]['Buffs'][_0x501a6b(0x20c)];this['_buffTurns'][_0x31f5c3]=this[_0x501a6b(0x460)][_0x31f5c3][_0x501a6b(0x1e3)](0x0,_0x338f78);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x39b)]=function(){const _0x1a509f=_0x5a5150;if(this['_cache']['groupDefeat']!==undefined)return this[_0x1a509f(0x4fb)][_0x1a509f(0x3a2)];this[_0x1a509f(0x4fb)][_0x1a509f(0x3a2)]=![];const _0x2822a3=this['states']();for(const _0x15cba of _0x2822a3){if(_0x1a509f(0x333)===_0x1a509f(0x1e9))for(const _0x33c36a of _0x39f34b){_0x33c36a[_0x1a509f(0x3eb)](_0x2795bb);const _0x4aee08=_0x4c02f3(_0x329db3['$1'])[_0x1a509f(0x4e2)](',')[_0x1a509f(0x282)](_0x2ec5cf=>_0x56ca7d(_0x2ec5cf)[_0x1a509f(0x409)]()['trim']());_0x23785d=_0x599cd2[_0x1a509f(0x4e0)](_0x4aee08);}else{if(!_0x15cba)continue;if(_0x15cba[_0x1a509f(0x24c)][_0x1a509f(0x3eb)](/<GROUP DEFEAT>/i)){if('fCbnh'===_0x1a509f(0x4a9)){this[_0x1a509f(0x4fb)][_0x1a509f(0x3a2)]=!![];break;}else return _0x2fc2eb['SkillsStatesCore'][_0x1a509f(0x25b)][_0x1a509f(0x35a)]['LayoutStyle'];}}}return this[_0x1a509f(0x4fb)][_0x1a509f(0x3a2)];},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x4f5)]=Game_Unit[_0x5a5150(0x20f)][_0x5a5150(0x32b)],Game_Unit['prototype'][_0x5a5150(0x32b)]=function(){const _0x2f8f7c=_0x5a5150;let _0x1daf85=VisuMZ['SkillsStatesCore']['Game_Unit_deadMembers'][_0x2f8f7c(0x1c7)](this);return BattleManager[_0x2f8f7c(0x301)]&&(_0x1daf85=_0x1daf85['concat'](this['members']()['filter'](_0x237728=>_0x237728['isGroupDefeatStateAffected']()))),_0x1daf85;},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x203)]=Game_BattlerBase['prototype'][_0x5a5150(0x399)],Game_BattlerBase['prototype']['clearStates']=function(){const _0x3cd469=_0x5a5150;if(this[_0x3cd469(0x229)]()!==''){if(_0x3cd469(0x495)!=='ebOKS'){this[_0x3cd469(0x23b)]();const _0x58b9d6=_0x9520da[_0x1e7f2a];if(_0x58b9d6)!_0x279a17[_0x3cd469(0x258)](_0x58b9d6)&&this[_0x3cd469(0x2f6)](_0x32723d,_0x58b9d6,_0x300780,_0x2d0783),this[_0x3cd469(0x4dc)](_0x19c609,_0x58b9d6,_0x72be4,_0x36286c),_0x447a5c[_0x3cd469(0x4a4)](_0x58b9d6);else{const _0x469ca8=_0x4720dd[_0x32d354-_0x5e95d0[_0x3cd469(0x2ba)]];this['drawActorBuffTurns'](_0x1b9de1,_0x469ca8,_0x7d9cc6,_0x20b2aa),this[_0x3cd469(0x33e)](_0x2affa4,_0x469ca8,_0x90d3fb,_0x35c57d);}_0x907a74+=_0x1a3b72;}else this[_0x3cd469(0x270)]();}else VisuMZ[_0x3cd469(0x22c)]['Game_BattlerBase_clearStates']['call'](this),this[_0x3cd469(0x3f4)]();},Game_Actor['prototype'][_0x5a5150(0x399)]=function(){const _0x18da19=_0x5a5150;this[_0x18da19(0x4f8)]=this[_0x18da19(0x4f8)]||{},Game_Battler[_0x18da19(0x20f)][_0x18da19(0x399)]['call'](this);},Game_BattlerBase[_0x5a5150(0x20f)]['clearStatesWithStateRetain']=function(){const _0x4e93be=_0x5a5150,_0x229d4f=this['states']();for(const _0x1cbef7 of _0x229d4f){if('ABqNr'===_0x4e93be(0x39a)){if(_0x1cbef7&&this[_0x4e93be(0x4d2)](_0x1cbef7))this[_0x4e93be(0x49f)](_0x1cbef7['id']);}else for(const _0x20c9a1 of _0xc65338){_0x20c9a1[_0x4e93be(0x3eb)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x32df0a=_0x506a27(_0x2b8d02['$1'])[_0x4e93be(0x409)]()['trim']()['split'](',');for(const _0x42391b of _0x32df0a){_0xf6d078[_0x4e93be(0x374)][_0x4e93be(0x4a4)](_0x42391b[_0x4e93be(0x2dc)]());}}}this[_0x4e93be(0x4fb)]={};},Game_BattlerBase['prototype'][_0x5a5150(0x4d2)]=function(_0x231371){const _0x51988b=_0x5a5150,_0x5ebad9=this['getStateRetainType']();if(_0x5ebad9!==''){if(_0x51988b(0x4b3)!==_0x51988b(0x4b3))return _0x2d14f9[_0x51988b(0x22c)]['Settings']['States'][_0x51988b(0x287)];else{const _0x248741=_0x231371[_0x51988b(0x24c)];if(_0x5ebad9===_0x51988b(0x3a5)&&_0x248741[_0x51988b(0x3eb)](/<NO DEATH CLEAR>/i))return![];if(_0x5ebad9==='recover\x20all'&&_0x248741[_0x51988b(0x3eb)](/<NO RECOVER ALL CLEAR>/i))return![];}}return this[_0x51988b(0x458)](_0x231371['id']);},Game_BattlerBase['prototype'][_0x5a5150(0x229)]=function(){const _0x542a80=_0x5a5150;return this[_0x542a80(0x227)];},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x2de)]=function(_0x41c30d){this['_stateRetainType']=_0x41c30d;},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x3be)]=function(){const _0x2440fa=_0x5a5150;this[_0x2440fa(0x227)]='';},VisuMZ['SkillsStatesCore'][_0x5a5150(0x31c)]=Game_BattlerBase[_0x5a5150(0x20f)]['die'],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x316)]=function(){const _0x117422=_0x5a5150;this['setStateRetainType']('death'),VisuMZ[_0x117422(0x22c)][_0x117422(0x31c)][_0x117422(0x1c7)](this),this[_0x117422(0x3be)]();},VisuMZ[_0x5a5150(0x22c)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x3c6)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x3c6)]=function(){const _0x1b1e5b=_0x5a5150;this[_0x1b1e5b(0x2de)](_0x1b1e5b(0x446)),VisuMZ[_0x1b1e5b(0x22c)][_0x1b1e5b(0x4b1)][_0x1b1e5b(0x1c7)](this),this[_0x1b1e5b(0x3be)]();},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x2d9)]=function(_0x3122da){const _0x116566=_0x5a5150;for(settings of VisuMZ[_0x116566(0x22c)][_0x116566(0x25b)][_0x116566(0x248)]){const _0x5cb01d=settings[_0x116566(0x36d)][_0x116566(0x1c7)](this,_0x3122da);if(!settings[_0x116566(0x3b0)][_0x116566(0x1c7)](this,_0x3122da,_0x5cb01d))return![];}return!![];},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x265)]=function(_0x5b1924){const _0x4c088f=_0x5a5150;for(settings of VisuMZ[_0x4c088f(0x22c)]['Settings'][_0x4c088f(0x248)]){if('OWXQF'!==_0x4c088f(0x28e))this['onEraseStateCustomJS'](_0x4b49a1),this['onEraseStateGlobalJS'](_0x7f2f1),_0x3b8038[_0x4c088f(0x20f)][_0x4c088f(0x1fd)]['call'](this,_0x58db4a);else{const _0x235ce5=settings[_0x4c088f(0x36d)][_0x4c088f(0x1c7)](this,_0x5b1924);settings['PayJS']['call'](this,_0x5b1924,_0x235ce5);}}},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x40c)]=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x4ea)],Game_BattlerBase['prototype'][_0x5a5150(0x4ea)]=function(_0x44fbf1){const _0x13f369=_0x5a5150;if(!_0x44fbf1)return![];if(!VisuMZ[_0x13f369(0x22c)]['Game_BattlerBase_meetsSkillConditions'][_0x13f369(0x1c7)](this,_0x44fbf1))return![];if(!this[_0x13f369(0x205)](_0x44fbf1))return![];if(!this[_0x13f369(0x4fc)](_0x44fbf1))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x44fbf1))return![];return!![];},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x205)]=function(_0x3a210f){const _0x151657=_0x5a5150;if(!this[_0x151657(0x33d)](_0x3a210f))return![];return!![];},Game_BattlerBase['prototype'][_0x5a5150(0x33d)]=function(_0x748859){const _0x20a3f2=_0x5a5150,_0x1f0d5c=_0x748859[_0x20a3f2(0x24c)];if(_0x1f0d5c[_0x20a3f2(0x3eb)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b2571=JSON[_0x20a3f2(0x1f5)]('['+RegExp['$1'][_0x20a3f2(0x3eb)](/\d+/g)+']');for(const _0x49516a of _0x1b2571){if('GlhaF'!==_0x20a3f2(0x286))return _0x588959['menuActor']();else{if(!$gameSwitches['value'](_0x49516a))return![];}}return!![];}if(_0x1f0d5c['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x20a3f2(0x1e4)!==_0x20a3f2(0x3b3)){const _0x3370ec=JSON[_0x20a3f2(0x1f5)]('['+RegExp['$1'][_0x20a3f2(0x3eb)](/\d+/g)+']');for(const _0x39414f of _0x3370ec){if(_0x20a3f2(0x2ed)!==_0x20a3f2(0x2ed)){if(!_0x301afc[_0x20a3f2(0x3bd)](_0x43b752))return![];}else{if(!$gameSwitches[_0x20a3f2(0x3bd)](_0x39414f))return![];}}return!![];}else{if(!_0x43653f[_0x20a3f2(0x39b)]())return![];}}if(_0x1f0d5c[_0x20a3f2(0x3eb)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x31aaf9=JSON[_0x20a3f2(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x16bafd of _0x31aaf9){if($gameSwitches[_0x20a3f2(0x3bd)](_0x16bafd))return!![];}return![];}if(_0x1f0d5c[_0x20a3f2(0x3eb)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('bgaai'===_0x20a3f2(0x3ae)){const _0x26a11c=JSON[_0x20a3f2(0x1f5)]('['+RegExp['$1'][_0x20a3f2(0x3eb)](/\d+/g)+']');for(const _0x43ead9 of _0x26a11c){if(!$gameSwitches['value'](_0x43ead9))return!![];}return![];}else{const _0x309759=_0x2b7d1d[_0x20a3f2(0x24c)];if(_0x309759[_0x20a3f2(0x3eb)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x1e7197=_0x14e659(_0x36209f['$1']),_0x3017eb=_0x20a3f2(0x32c)[_0x20a3f2(0x1e6)](_0x1e7197);_0x240ebd[_0x20a3f2(0x22c)][_0x20a3f2(0x1d1)][_0x2c3d03['id']]=new _0x44d4ea(_0x20a3f2(0x206),_0x3017eb);}}}if(_0x1f0d5c[_0x20a3f2(0x3eb)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x419fd5=JSON[_0x20a3f2(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4b738c of _0x419fd5){if(!$gameSwitches['value'](_0x4b738c))return!![];}return![];}if(_0x1f0d5c[_0x20a3f2(0x3eb)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32e9e1=JSON[_0x20a3f2(0x1f5)]('['+RegExp['$1'][_0x20a3f2(0x3eb)](/\d+/g)+']');for(const _0x55cf1d of _0x32e9e1){if($gameSwitches['value'](_0x55cf1d))return![];}return!![];}return!![];},Game_BattlerBase[_0x5a5150(0x20f)]['meetsSkillConditionsEnableJS']=function(_0x9a9f29){const _0x5dec01=_0x5a5150,_0x414612=_0x9a9f29[_0x5dec01(0x24c)],_0xeede9d=VisuMZ[_0x5dec01(0x22c)][_0x5dec01(0x2aa)];if(_0xeede9d[_0x9a9f29['id']]){if(_0x5dec01(0x2ae)===_0x5dec01(0x209)){const _0x445592='<enemy-%1>'['format'](_0x149c27[_0x5dec01(0x2d6)]()),_0x24a271='<member-%1>'['format'](_0x583ae7['index']()),_0x8c4b21=_0x5dec01(0x477)[_0x5dec01(0x1e6)](_0x136474['getCurrentTroopUniqueID']());return'%1\x20%2\x20%3'[_0x5dec01(0x1e6)](_0x445592,_0x24a271,_0x8c4b21);}else return _0xeede9d[_0x9a9f29['id']]['call'](this,_0x9a9f29);}else return!![];},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x400)]=function(_0x583325){const _0x268561=_0x5a5150;return VisuMZ[_0x268561(0x22c)][_0x268561(0x25b)][_0x268561(0x35a)][_0x268561(0x439)]['call'](this,_0x583325);},VisuMZ[_0x5a5150(0x22c)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase['prototype'][_0x5a5150(0x38a)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x38a)]=function(_0x34d396){const _0x295b53=_0x5a5150;for(settings of VisuMZ[_0x295b53(0x22c)][_0x295b53(0x25b)]['Costs']){if('eteko'===_0x295b53(0x26b))this[_0x295b53(0x2ee)]=_0xf70e02,this[_0x295b53(0x21f)]();else{if(settings['Name'][_0x295b53(0x409)]()==='MP')return settings[_0x295b53(0x36d)][_0x295b53(0x1c7)](this,_0x34d396);}}return VisuMZ[_0x295b53(0x22c)][_0x295b53(0x24e)][_0x295b53(0x1c7)](this,_0x34d396);},VisuMZ['SkillsStatesCore'][_0x5a5150(0x252)]=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x240)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x240)]=function(_0x1f8339){const _0x369980=_0x5a5150;for(settings of VisuMZ[_0x369980(0x22c)][_0x369980(0x25b)][_0x369980(0x248)]){if(settings[_0x369980(0x37f)][_0x369980(0x409)]()==='TP'){if(_0x369980(0x454)!==_0x369980(0x3a7))return settings[_0x369980(0x36d)][_0x369980(0x1c7)](this,_0x1f8339);else _0x45f59a[_0x369980(0x22c)]['Scene_Skill_createItemWindow'][_0x369980(0x1c7)](this),this['allowCreateShopStatusWindow']()&&this[_0x369980(0x236)]();}}return VisuMZ[_0x369980(0x22c)][_0x369980(0x252)][_0x369980(0x1c7)](this,_0x1f8339);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x322)]=function(_0x188a08){const _0x2a5dec=_0x5a5150;if(typeof _0x188a08===_0x2a5dec(0x47b))_0x188a08=$dataStates[_0x188a08];return this[_0x2a5dec(0x4ba)]()['includes'](_0x188a08);},VisuMZ[_0x5a5150(0x22c)]['Game_BattlerBase_states']=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x4ba)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x4ba)]=function(){const _0x4cd799=_0x5a5150;let _0x422958=VisuMZ['SkillsStatesCore'][_0x4cd799(0x285)][_0x4cd799(0x1c7)](this);if($gameTemp[_0x4cd799(0x2f7)])return _0x422958;return $gameTemp[_0x4cd799(0x2f7)]=!![],this[_0x4cd799(0x29a)](_0x422958),$gameTemp[_0x4cd799(0x2f7)]=undefined,_0x422958;},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x29a)]=function(_0x5aefab){const _0x17f28e=_0x5a5150,_0x115e35=this[_0x17f28e(0x3ef)]();for(state of _0x115e35){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x5aefab[_0x17f28e(0x258)](state))continue;_0x5aefab[_0x17f28e(0x4a4)](state);}_0x115e35['length']>0x0&&(_0x17f28e(0x407)!==_0x17f28e(0x352)?_0x5aefab['sort']((_0x577d2a,_0x5ee2f0)=>{const _0x5547ea=_0x17f28e;if(_0x5547ea(0x2fc)!==_0x5547ea(0x2fc))return this[_0x5547ea(0x22e)]&&this[_0x5547ea(0x3aa)]?this[_0x5547ea(0x1e1)]():_0x290e72[_0x5547ea(0x22c)][_0x5547ea(0x1cf)][_0x5547ea(0x1c7)](this);else{const _0xcd4906=_0x577d2a[_0x5547ea(0x2b6)],_0x3f154f=_0x5ee2f0['priority'];if(_0xcd4906!==_0x3f154f){if('NzSdN'===_0x5547ea(0x2bb))return _0x3f154f-_0xcd4906;else{const _0x49b160=_0x561f05[_0x5547ea(0x22c)][_0x5547ea(0x25b)][_0x5547ea(0x305)];return _0x49b160[_0x5547ea(0x249)]===_0x5547ea(0x47b)?_0xf55c5['mainFontSize']()-0x6:_0x3df87c[_0x5547ea(0x2cd)]()-0x2;}}return _0x577d2a-_0x5ee2f0;}}):this[_0x17f28e(0x3aa)]=null);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x1e8)]=function(_0x863d81){const _0x2114a4=_0x5a5150;return _0x863d81[_0x2114a4(0x24c)][_0x2114a4(0x3eb)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x416)]=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x2dd)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x2dd)]=function(_0x19d574){const _0x40da66=_0x5a5150;this[_0x40da66(0x45b)]=!![];let _0x1f0706=VisuMZ[_0x40da66(0x22c)][_0x40da66(0x416)][_0x40da66(0x1c7)](this,_0x19d574);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x1f0706;},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x4d6)]=function(){const _0x95714b=_0x5a5150;let _0x5b94d8=[];this[_0x95714b(0x303)]=this['_passiveStateResults']||{};for(;;){_0x5b94d8=[];let _0x2828a5=!![];for(const _0x3ca84a of this[_0x95714b(0x4fb)][_0x95714b(0x3ef)]){const _0x19259d=$dataStates[_0x3ca84a];if(!_0x19259d)continue;let _0xb5ed38=this[_0x95714b(0x369)](_0x19259d);if(this['_passiveStateResults'][_0x3ca84a]!==_0xb5ed38){if('cXokc'===_0x95714b(0x4f1))return'\x20';else _0x2828a5=![],this[_0x95714b(0x303)][_0x3ca84a]=_0xb5ed38;}if(!_0xb5ed38)continue;_0x5b94d8[_0x95714b(0x4a4)](_0x19259d);}if(_0x2828a5)break;else{if(!this[_0x95714b(0x45b)])this[_0x95714b(0x463)]();this['createPassiveStatesCache']();}}return _0x5b94d8;},Game_BattlerBase['prototype'][_0x5a5150(0x369)]=function(_0x53b1f4){const _0x409664=_0x5a5150;if(!this[_0x409664(0x331)](_0x53b1f4))return![];if(!this[_0x409664(0x45e)](_0x53b1f4))return![];if(!this[_0x409664(0x2c0)](_0x53b1f4))return![];if(!this[_0x409664(0x4b2)](_0x53b1f4))return![];return!![];},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x331)]=function(_0x36fe63){return!![];},Game_Actor[_0x5a5150(0x20f)]['meetsPassiveStateConditionClasses']=function(_0x48fc84){const _0x25e9fa=_0x5a5150,_0x39a5ae=_0x48fc84[_0x25e9fa(0x24c)];if(_0x39a5ae['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){if('fZmup'==='fZmup'){const _0x544b75=String(RegExp['$1'])['split'](',')['map'](_0x2c1ea9=>_0x2c1ea9['trim']()),_0x500664=VisuMZ['SkillsStatesCore'][_0x25e9fa(0x266)](_0x544b75);return _0x500664[_0x25e9fa(0x258)](this['currentClass']());}else{if(!_0x194767[_0x25e9fa(0x3bd)](_0x517b5d))return!![];}}if(_0x39a5ae[_0x25e9fa(0x3eb)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x25e9fa(0x4b8)===_0x25e9fa(0x360)){const _0x535e57=_0x32208b[_0x25e9fa(0x1f5)]('['+_0x57a83e['$1']['match'](/\d+/g)+']');for(const _0x445840 of _0x535e57){if(!_0x5a4b33[_0x25e9fa(0x235)](_0x445840))return!![];}return![];}else{const _0x441f62=String(RegExp['$1'])[_0x25e9fa(0x4e2)](',')['map'](_0x52a02a=>_0x52a02a[_0x25e9fa(0x2dc)]()),_0x3cf2c9=VisuMZ[_0x25e9fa(0x22c)][_0x25e9fa(0x266)](_0x441f62);let _0x189b4b=[this[_0x25e9fa(0x3f2)]()];return Imported[_0x25e9fa(0x3ab)]&&this[_0x25e9fa(0x33c)]&&(_0x189b4b=this[_0x25e9fa(0x33c)]()),_0x3cf2c9[_0x25e9fa(0x30d)](_0x1527f8=>_0x189b4b[_0x25e9fa(0x258)](_0x1527f8))[_0x25e9fa(0x2ba)]>0x0;}}return Game_BattlerBase[_0x25e9fa(0x20f)][_0x25e9fa(0x331)][_0x25e9fa(0x1c7)](this,_0x48fc84);},VisuMZ['SkillsStatesCore'][_0x5a5150(0x266)]=function(_0x59a12a){const _0x3a8a0c=_0x5a5150,_0x3d40a5=[];for(let _0x31c40d of _0x59a12a){_0x31c40d=(String(_0x31c40d)||'')[_0x3a8a0c(0x2dc)]();const _0x1dd073=/^\d+$/[_0x3a8a0c(0x3c0)](_0x31c40d);_0x1dd073?'MUMyy'!=='oboEq'?_0x3d40a5['push'](Number(_0x31c40d)):this[_0x3a8a0c(0x3e0)][_0x3a8a0c(0x381)](_0xba55c8,_0x44563b,_0x45789a,_0x279acd,this[_0x3a8a0c(0x3e0)]['height'],_0x3c809e):_0x3d40a5[_0x3a8a0c(0x4a4)](DataManager[_0x3a8a0c(0x3f5)](_0x31c40d));}return _0x3d40a5[_0x3a8a0c(0x282)](_0x4779e1=>$dataClasses[Number(_0x4779e1)])[_0x3a8a0c(0x42b)](null);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x45e)]=function(_0x5c6c60){const _0x5860b8=_0x5a5150,_0x52c2e0=_0x5c6c60[_0x5860b8(0x24c)];if(_0x52c2e0[_0x5860b8(0x3eb)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x439566=JSON[_0x5860b8(0x1f5)]('['+RegExp['$1'][_0x5860b8(0x3eb)](/\d+/g)+']');for(const _0x22fdf2 of _0x439566){if(_0x5860b8(0x27c)!=='MVfIO'){if(!$gameSwitches[_0x5860b8(0x3bd)](_0x22fdf2))return![];}else this['recalculateSlipDamageJS'](),_0x4cba5a[_0x5860b8(0x22c)][_0x5860b8(0x269)][_0x5860b8(0x1c7)](this),this[_0x5860b8(0x384)](),this['regenerateAllSkillsStatesCore']();}return!![];}if(_0x52c2e0[_0x5860b8(0x3eb)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4cc4ef=JSON['parse']('['+RegExp['$1'][_0x5860b8(0x3eb)](/\d+/g)+']');for(const _0x1a08a3 of _0x4cc4ef){if(_0x5860b8(0x390)===_0x5860b8(0x390)){if(!$gameSwitches['value'](_0x1a08a3))return![];}else{if(!_0x53fb3d['isLearnedSkill'](_0x3ede6a))return![];}}return!![];}if(_0x52c2e0[_0x5860b8(0x3eb)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('UkUaD'===_0x5860b8(0x20d)){if(_0xb7adcf['Name'][_0x5860b8(0x409)]()==='TP')return _0x526d95[_0x5860b8(0x36d)]['call'](this,_0x5d543c);}else{const _0x33aa6e=JSON[_0x5860b8(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x171532 of _0x33aa6e){if($gameSwitches[_0x5860b8(0x3bd)](_0x171532))return!![];}return![];}}if(_0x52c2e0['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c0aad=JSON[_0x5860b8(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x59a9bf of _0x2c0aad){if(!$gameSwitches[_0x5860b8(0x3bd)](_0x59a9bf))return!![];}return![];}if(_0x52c2e0[_0x5860b8(0x3eb)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5cec93=JSON[_0x5860b8(0x1f5)]('['+RegExp['$1'][_0x5860b8(0x3eb)](/\d+/g)+']');for(const _0x2eb2d1 of _0x5cec93){if(!$gameSwitches[_0x5860b8(0x3bd)](_0x2eb2d1))return!![];}return![];}if(_0x52c2e0[_0x5860b8(0x3eb)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ca2f9=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x56ac96 of _0x1ca2f9){if(_0x5860b8(0x47c)!==_0x5860b8(0x47c)){_0x56949a[_0x5860b8(0x22c)][_0x5860b8(0x2b2)][_0x5860b8(0x1c7)](this,_0x340906);if(!this[_0x5860b8(0x394)](_0x5cd02a))this['eraseBuff'](_0x8addb0);}else{if($gameSwitches[_0x5860b8(0x3bd)](_0x56ac96))return![];}}return!![];}return!![];},Game_BattlerBase[_0x5a5150(0x20f)]['meetsPassiveStateConditionJS']=function(_0x183a1d){const _0x3df041=_0x5a5150,_0x2060f4=VisuMZ[_0x3df041(0x22c)][_0x3df041(0x1d1)];if(_0x2060f4[_0x183a1d['id']]&&!_0x2060f4[_0x183a1d['id']][_0x3df041(0x1c7)](this,_0x183a1d))return![];return!![];},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x4b2)]=function(_0x2a619c){const _0x20b11b=_0x5a5150;return VisuMZ[_0x20b11b(0x22c)][_0x20b11b(0x25b)][_0x20b11b(0x268)][_0x20b11b(0x2d3)][_0x20b11b(0x1c7)](this,_0x2a619c);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x3ef)]=function(){const _0xdcd459=_0x5a5150;if(this[_0xdcd459(0x3f6)](_0xdcd459(0x3ef)))return this['convertPassiveStates']();if(this[_0xdcd459(0x283)])return[];return this[_0xdcd459(0x283)]=!![],this[_0xdcd459(0x223)](),this[_0xdcd459(0x283)]=undefined,this['convertPassiveStates']();},Game_BattlerBase['prototype'][_0x5a5150(0x223)]=function(){const _0x154f63=_0x5a5150;this[_0x154f63(0x283)]=!![],this[_0x154f63(0x4fb)][_0x154f63(0x3ef)]=[],this['addPassiveStatesFromOtherPlugins'](),this[_0x154f63(0x46c)](),this[_0x154f63(0x25d)](),this[_0x154f63(0x283)]=undefined;},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x22b)]=function(){const _0x3bd3b5=_0x5a5150;if(Imported[_0x3bd3b5(0x3d5)])this[_0x3bd3b5(0x43c)]();},Game_BattlerBase[_0x5a5150(0x20f)]['passiveStateObjects']=function(){return[];},Game_BattlerBase['prototype'][_0x5a5150(0x46c)]=function(){const _0x146b21=_0x5a5150,_0x242702=this[_0x146b21(0x421)]();for(const _0x3d24db of _0x242702){if(!_0x3d24db)continue;const _0x13f7b4=_0x3d24db['note'][_0x146b21(0x3eb)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x13f7b4){if('hynEL'==='hynEL')for(const _0x2fbb34 of _0x13f7b4){if(_0x146b21(0x48c)==='epAhj'){if(!_0x3a93ae[_0x146b21(0x3bd)](_0x277a01))return!![];}else{_0x2fbb34['match'](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x4e3eab=RegExp['$1'];if(_0x4e3eab[_0x146b21(0x3eb)](/(\d+(?:\s*,\s*\d+)*)/i)){if('YdOBR'===_0x146b21(0x4bb)){const _0x1cebe5=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x146b21(0x4fb)][_0x146b21(0x3ef)]=this[_0x146b21(0x4fb)]['passiveStates'][_0x146b21(0x4e0)](_0x1cebe5);}else this[_0x146b21(0x2f6)](_0x516e70,_0xaa48c8,_0x4737c3,_0x30a827);}else{if(_0x146b21(0x3d3)===_0x146b21(0x3d3)){const _0x2d8b76=_0x4e3eab[_0x146b21(0x4e2)](',');for(const _0x1fe39b of _0x2d8b76){const _0x21528e=DataManager[_0x146b21(0x26d)](_0x1fe39b);if(_0x21528e)this[_0x146b21(0x4fb)]['passiveStates']['push'](_0x21528e);}}else{const _0x358a53=_0x138d5b['CalcJS'][_0x146b21(0x1c7)](this,_0x4893e8);_0x268d0a[_0x146b21(0x2f8)][_0x146b21(0x1c7)](this,_0x1e1ad6,_0x358a53);}}}}else return this[_0x146b21(0x41b)]&&this[_0x146b21(0x41b)][_0x146b21(0x431)]();}}},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x25d)]=function(){const _0x57bbaa=_0x5a5150,_0x26d7a3=VisuMZ['SkillsStatesCore'][_0x57bbaa(0x25b)][_0x57bbaa(0x268)][_0x57bbaa(0x3b2)];this['_cache'][_0x57bbaa(0x3ef)]=this[_0x57bbaa(0x4fb)]['passiveStates']['concat'](_0x26d7a3);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x47f)]=function(_0x317e0e){const _0x1de3c5=_0x5a5150;if(typeof _0x317e0e!==_0x1de3c5(0x47b))_0x317e0e=_0x317e0e['id'];return this[_0x1de3c5(0x2ec)][_0x317e0e]||0x0;},Game_BattlerBase[_0x5a5150(0x20f)]['setStateTurns']=function(_0x2631ef,_0xf3add4){const _0xb7c693=_0x5a5150;if(typeof _0x2631ef!==_0xb7c693(0x47b))_0x2631ef=_0x2631ef['id'];if(this[_0xb7c693(0x458)](_0x2631ef)){if(_0xb7c693(0x442)!==_0xb7c693(0x464)){const _0xb5af69=DataManager['stateMaximumTurns'](_0x2631ef);this[_0xb7c693(0x2ec)][_0x2631ef]=_0xf3add4['clamp'](0x0,_0xb5af69);if(this[_0xb7c693(0x2ec)][_0x2631ef]<=0x0)this[_0xb7c693(0x2a1)](_0x2631ef);}else return _0x1bd7da[_0xb7c693(0x4a2)]();}},Game_BattlerBase['prototype'][_0x5a5150(0x4ed)]=function(_0x3740a3,_0x2cdae4){const _0x392bd0=_0x5a5150;if(typeof _0x3740a3!==_0x392bd0(0x47b))_0x3740a3=_0x3740a3['id'];this[_0x392bd0(0x458)](_0x3740a3)&&(_0x2cdae4+=this['stateTurns'](_0x3740a3),this[_0x392bd0(0x440)](_0x3740a3,_0x2cdae4));},VisuMZ[_0x5a5150(0x22c)]['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x423)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x423)]=function(_0x1de5c6){const _0x42a73c=_0x5a5150,_0x2787ec=this[_0x42a73c(0x417)][_0x1de5c6];VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseBuff'][_0x42a73c(0x1c7)](this,_0x1de5c6);if(_0x2787ec>0x0)this[_0x42a73c(0x1f3)](_0x1de5c6);if(_0x2787ec<0x0)this['onEraseDebuff'](_0x1de5c6);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x430)]=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x36e)],Game_BattlerBase['prototype']['increaseBuff']=function(_0x2fc48e){const _0x3acfa2=_0x5a5150;VisuMZ[_0x3acfa2(0x22c)]['Game_BattlerBase_increaseBuff'][_0x3acfa2(0x1c7)](this,_0x2fc48e);if(!this['isBuffOrDebuffAffected'](_0x2fc48e))this['eraseBuff'](_0x2fc48e);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x2b2)]=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x2eb)],Game_BattlerBase[_0x5a5150(0x20f)]['decreaseBuff']=function(_0x412027){const _0x660953=_0x5a5150;VisuMZ['SkillsStatesCore']['Game_BattlerBase_decreaseBuff'][_0x660953(0x1c7)](this,_0x412027);if(!this[_0x660953(0x394)](_0x412027))this[_0x660953(0x423)](_0x412027);},Game_BattlerBase[_0x5a5150(0x20f)]['onEraseBuff']=function(_0x36cd7e){},Game_BattlerBase['prototype']['onEraseDebuff']=function(_0x2640d4){},Game_BattlerBase[_0x5a5150(0x20f)]['isMaxBuffAffected']=function(_0x3c948d){const _0x18f140=_0x5a5150;return this[_0x18f140(0x417)][_0x3c948d]===VisuMZ['SkillsStatesCore'][_0x18f140(0x25b)][_0x18f140(0x32f)][_0x18f140(0x233)];},Game_BattlerBase[_0x5a5150(0x20f)]['isMaxDebuffAffected']=function(_0x4f79c8){const _0xa5880f=_0x5a5150;return this[_0xa5880f(0x417)][_0x4f79c8]===-VisuMZ[_0xa5880f(0x22c)]['Settings'][_0xa5880f(0x32f)]['StackDebuffMax'];},VisuMZ[_0x5a5150(0x22c)]['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x3e9)],Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x3e9)]=function(_0x3724d0,_0x239174){const _0x205348=_0x5a5150;return _0x3724d0=_0x3724d0[_0x205348(0x1e3)](-0x2,0x2),VisuMZ[_0x205348(0x22c)][_0x205348(0x35e)][_0x205348(0x1c7)](this,_0x3724d0,_0x239174);},Game_BattlerBase[_0x5a5150(0x20f)]['paramBuffRate']=function(_0x3dd4ae){const _0x47b94c=_0x5a5150,_0xe2d63a=this[_0x47b94c(0x417)][_0x3dd4ae];return VisuMZ[_0x47b94c(0x22c)]['Settings'][_0x47b94c(0x32f)][_0x47b94c(0x4a8)][_0x47b94c(0x1c7)](this,_0x3dd4ae,_0xe2d63a);},Game_BattlerBase['prototype'][_0x5a5150(0x408)]=function(_0x1aa65c){const _0x2be722=_0x5a5150;return this[_0x2be722(0x460)][_0x1aa65c]||0x0;},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x25f)]=function(_0x48255d){const _0x4ae8da=_0x5a5150;return this[_0x4ae8da(0x408)](_0x48255d);},Game_BattlerBase['prototype'][_0x5a5150(0x30a)]=function(_0x377989,_0xa3907){const _0x1cbc73=_0x5a5150;if(this[_0x1cbc73(0x2ce)](_0x377989)){const _0x3af410=VisuMZ['SkillsStatesCore'][_0x1cbc73(0x25b)][_0x1cbc73(0x32f)]['MaxTurns'];this['_buffTurns'][_0x377989]=_0xa3907[_0x1cbc73(0x1e3)](0x0,_0x3af410);}},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x295)]=function(_0x2cf55c,_0x2f9a56){const _0x43aec4=_0x5a5150;this[_0x43aec4(0x2ce)](_0x2cf55c)&&(_0x2f9a56+=this[_0x43aec4(0x408)](stateId),this[_0x43aec4(0x440)](_0x2cf55c,_0x2f9a56));},Game_BattlerBase[_0x5a5150(0x20f)]['setDebuffTurns']=function(_0x1aa013,_0x33692b){const _0x41f993=_0x5a5150;if(this['isDebuffAffected'](_0x1aa013)){const _0x42bc35=VisuMZ[_0x41f993(0x22c)][_0x41f993(0x25b)]['Buffs']['MaxTurns'];this[_0x41f993(0x460)][_0x1aa013]=_0x33692b['clamp'](0x0,_0x42bc35);}},Game_BattlerBase['prototype']['addDebuffTurns']=function(_0x50477c,_0x2e34fa){const _0x15f6c1=_0x5a5150;this['isDebuffAffected'](_0x50477c)&&('rCzNc'!==_0x15f6c1(0x3bb)?(_0x435588=_0x540109[_0x15f6c1(0x26d)](_0x5d7c2c['$1']),_0x4227fa=_0x3212fc(_0xd0fd26['$2'])):(_0x2e34fa+=this[_0x15f6c1(0x408)](stateId),this[_0x15f6c1(0x440)](_0x50477c,_0x2e34fa)));},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x279)]=function(_0x147f78){const _0x33d315=_0x5a5150;if(typeof _0x147f78!==_0x33d315(0x47b))_0x147f78=_0x147f78['id'];return this[_0x33d315(0x3a4)]=this[_0x33d315(0x3a4)]||{},this[_0x33d315(0x3a4)][_0x147f78]=this[_0x33d315(0x3a4)][_0x147f78]||{},this[_0x33d315(0x3a4)][_0x147f78];},Game_BattlerBase[_0x5a5150(0x20f)]['getStateData']=function(_0x315c62,_0x402192){const _0x11537a=_0x5a5150;if(typeof _0x315c62!==_0x11537a(0x47b))_0x315c62=_0x315c62['id'];const _0x472f75=this['stateData'](_0x315c62);return _0x472f75[_0x402192];},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x1d3)]=function(_0x128b7f,_0x23e2e5,_0x28420e){if(typeof _0x128b7f!=='number')_0x128b7f=_0x128b7f['id'];const _0x230097=this['stateData'](_0x128b7f);_0x230097[_0x23e2e5]=_0x28420e;},Game_BattlerBase[_0x5a5150(0x20f)]['clearStateData']=function(_0x3f7cf0){const _0x3b0506=_0x5a5150;if(typeof _0x3f7cf0!==_0x3b0506(0x47b))_0x3f7cf0=_0x3f7cf0['id'];this[_0x3b0506(0x3a4)]=this[_0x3b0506(0x3a4)]||{},this[_0x3b0506(0x3a4)][_0x3f7cf0]={};},Game_BattlerBase[_0x5a5150(0x20f)]['getStateDisplay']=function(_0x2717b9){const _0x30dd2f=_0x5a5150;if(typeof _0x2717b9!==_0x30dd2f(0x47b))_0x2717b9=_0x2717b9['id'];return this[_0x30dd2f(0x4f2)]=this[_0x30dd2f(0x4f2)]||{},this['_stateDisplay'][_0x2717b9]===undefined&&(this['_stateDisplay'][_0x2717b9]=''),this[_0x30dd2f(0x4f2)][_0x2717b9];},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x3d8)]=function(_0xd5fde0,_0x56c2ef){const _0x5836f7=_0x5a5150;if(typeof _0xd5fde0!==_0x5836f7(0x47b))_0xd5fde0=_0xd5fde0['id'];this['_stateDisplay']=this[_0x5836f7(0x4f2)]||{},this[_0x5836f7(0x4f2)][_0xd5fde0]=_0x56c2ef;},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x278)]=function(_0x152931){const _0x385317=_0x5a5150;if(typeof _0x152931!==_0x385317(0x47b))_0x152931=_0x152931['id'];this[_0x385317(0x4f2)]=this[_0x385317(0x4f2)]||{},this[_0x385317(0x4f2)][_0x152931]='';},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x1da)]=function(_0xddb4d0){const _0x4ac5eb=_0x5a5150;if(typeof _0xddb4d0!==_0x4ac5eb(0x47b))_0xddb4d0=_0xddb4d0['id'];this[_0x4ac5eb(0x2b7)]=this[_0x4ac5eb(0x2b7)]||{},this[_0x4ac5eb(0x2b7)][_0xddb4d0]=this['_stateOrigin'][_0xddb4d0]||_0x4ac5eb(0x2b4);const _0x40c17c=this[_0x4ac5eb(0x2b7)][_0xddb4d0];return this[_0x4ac5eb(0x1dc)](_0x40c17c);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x433)]=function(_0x444b2c,_0x19c479){const _0x240b13=_0x5a5150;this[_0x240b13(0x2b7)]=this[_0x240b13(0x2b7)]||{};const _0x739be9=_0x19c479?this[_0x240b13(0x438)](_0x19c479):this[_0x240b13(0x3db)]();this['_stateOrigin'][_0x444b2c]=_0x739be9;},Game_BattlerBase['prototype'][_0x5a5150(0x1dd)]=function(_0x911f3b){const _0x51ab3c=_0x5a5150;this[_0x51ab3c(0x2b7)]=this['_stateOrigin']||{},delete this[_0x51ab3c(0x2b7)][_0x911f3b];},Game_BattlerBase[_0x5a5150(0x20f)]['getCurrentStateOriginKey']=function(){const _0x472dec=_0x5a5150,_0x45e9be=this['getCurrentStateActiveUser']();return this[_0x472dec(0x438)](_0x45e9be);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x24d)]=function(){const _0x572604=_0x5a5150;if($gameParty[_0x572604(0x488)]()){if(BattleManager['_subject'])return BattleManager[_0x572604(0x3a1)];else{if(BattleManager[_0x572604(0x3ea)]){if(_0x572604(0x247)!==_0x572604(0x247))_0x392ec9['SkillsStatesCore'][_0x572604(0x357)][_0x572604(0x1c7)](this),this[_0x572604(0x4fa)](),_0x24a64f[_0x572604(0x22c)]['CheckIncompatibleStates']();else return BattleManager[_0x572604(0x3ea)];}}}else{if(_0x572604(0x414)!==_0x572604(0x224)){const _0x53a5b=SceneManager[_0x572604(0x244)];if(![Scene_Map,Scene_Item][_0x572604(0x258)](_0x53a5b['constructor']))return $gameParty[_0x572604(0x473)]();}else _0xc497fb[_0x572604(0x4a4)](_0x54858c[_0x572604(0x3f5)](_0x442469));}return this;},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x438)]=function(_0x405c61){const _0x16f2a6=_0x5a5150;if(!_0x405c61)return _0x16f2a6(0x2b4);if(_0x405c61['isActor']())return _0x16f2a6(0x3d7)[_0x16f2a6(0x1e6)](_0x405c61['actorId']());else{const _0x156fe0=_0x16f2a6(0x4e3)[_0x16f2a6(0x1e6)](_0x405c61[_0x16f2a6(0x2d6)]()),_0x150815=_0x16f2a6(0x21e)[_0x16f2a6(0x1e6)](_0x405c61[_0x16f2a6(0x47e)]()),_0xc5ceff=_0x16f2a6(0x477)['format']($gameTroop[_0x16f2a6(0x290)]());return'%1\x20%2\x20%3'['format'](_0x156fe0,_0x150815,_0xc5ceff);}return _0x16f2a6(0x2b4);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x1dc)]=function(_0x11cc3e){const _0x498e5c=_0x5a5150;if(_0x11cc3e===_0x498e5c(0x2b4)){if('NRucJ'==='NRucJ')return this;else{const _0x2d4a62=new _0x5f6e06(0x0,0x0,_0x7a0ca4[_0x498e5c(0x367)],_0x261c50[_0x498e5c(0x410)]);this[_0x498e5c(0x46f)]=new _0x236158(_0x2d4a62),this['_commandNameWindow']['opacity']=0x0,this[_0x498e5c(0x3f1)](this['_commandNameWindow']),this[_0x498e5c(0x4c7)]();}}else{if(_0x11cc3e[_0x498e5c(0x3eb)](/<actor-(\d+)>/i))return _0x498e5c(0x2e9)!==_0x498e5c(0x204)?$gameActors['actor'](Number(RegExp['$1'])):_0x413d15[_0x498e5c(0x318)]();else{if(_0x498e5c(0x332)===_0x498e5c(0x36f))return _0x593de0[_0x498e5c(0x22c)]['Scene_Skill_helpWindowRect'][_0x498e5c(0x1c7)](this);else{if($gameParty[_0x498e5c(0x488)]()&&_0x11cc3e[_0x498e5c(0x3eb)](/<troop-(\d+)>/i)){if(_0x498e5c(0x419)===_0x498e5c(0x445))this['isStateExpired'](_0x116b2f['id'])&&_0x49418f[_0x498e5c(0x24b)]===_0x5baec9&&(this['removeState'](_0x3b97ac['id']),this[_0x498e5c(0x3fe)](_0x44206a['id']),this[_0x498e5c(0x45c)](_0x40dd7b['id']));else{const _0x3745d7=Number(RegExp['$1']);if(_0x3745d7===$gameTroop[_0x498e5c(0x290)]()){if(_0x11cc3e[_0x498e5c(0x3eb)](/<member-(\d+)>/i))return $gameTroop[_0x498e5c(0x2d1)]()[Number(RegExp['$1'])];}}}if(_0x11cc3e[_0x498e5c(0x3eb)](/<enemy-(\d+)>/i)){if(_0x498e5c(0x1f0)===_0x498e5c(0x1f0))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);else{const _0x3e7594=this['gaugeLineHeight']();this['resetFontSettings'](),this['drawParamText'](_0x3bc0f9,_0x45e7dd,_0x5ed53d,_0x3fa5f5,!![]),this['resetTextColor'](),this[_0x498e5c(0x3e0)][_0x498e5c(0x2cc)]-=0x8;const _0x53d842=this[_0x498e5c(0x379)][_0x498e5c(0x4ee)](_0x53cf3c,!![]);this['contents']['drawText'](_0x53d842,_0x1ebc90,_0x3da6fa,_0x44f0d4,_0x3e7594,_0x498e5c(0x470));}}}}}return this;},VisuMZ[_0x5a5150(0x22c)]['Game_Battler_addState']=Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x49b)],Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x49b)]=function(_0xe4661e){const _0x22cd51=_0x5a5150,_0x16daf7=this[_0x22cd51(0x475)](_0xe4661e);VisuMZ['SkillsStatesCore'][_0x22cd51(0x2b1)][_0x22cd51(0x1c7)](this,_0xe4661e);if(_0x16daf7&&this[_0x22cd51(0x322)]($dataStates[_0xe4661e])){this['onAddState'](_0xe4661e);;}},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x3c3)]=Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x475)],Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x475)]=function(_0x16f15e){const _0x51e706=_0x5a5150,_0x18bb4e=$dataStates[_0x16f15e];if(_0x18bb4e&&_0x18bb4e[_0x51e706(0x24c)][_0x51e706(0x3eb)](/<NO DEATH CLEAR>/i)){if(_0x51e706(0x263)==='HEdNX')return!this['isStateResist'](_0x16f15e)&&!this[_0x51e706(0x478)](_0x16f15e)&&!this[_0x51e706(0x422)][_0x51e706(0x3b6)](_0x16f15e);else{const _0x401e69=this[_0x51e706(0x38d)](),_0x3d0223=this['calcWindowHeight'](0x3,!![]),_0x38fe6=this[_0x51e706(0x3fb)]()?_0x566fdd[_0x51e706(0x385)]-_0x401e69:0x0,_0x42e93b=this[_0x51e706(0x2b9)]();return new _0x55f5c6(_0x38fe6,_0x42e93b,_0x401e69,_0x3d0223);}}return VisuMZ[_0x51e706(0x22c)][_0x51e706(0x3c3)][_0x51e706(0x1c7)](this,_0x16f15e);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x3ac)]=function(_0x2aafea){const _0x498481=_0x5a5150;this[_0x498481(0x433)](_0x2aafea),this[_0x498481(0x27f)](_0x2aafea),this[_0x498481(0x291)](_0x2aafea),this[_0x498481(0x328)](_0x2aafea),this[_0x498481(0x42a)](_0x2aafea);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x1fd)]=function(_0x4e2f36){const _0x2a872b=_0x5a5150;this[_0x2a872b(0x342)](_0x4e2f36),this[_0x2a872b(0x219)](_0x4e2f36),Game_BattlerBase[_0x2a872b(0x20f)][_0x2a872b(0x1fd)][_0x2a872b(0x1c7)](this,_0x4e2f36);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x377)]=function(_0x54b812){const _0x41afff=_0x5a5150;for(const _0x55eaba of this[_0x41afff(0x4ba)]()){if(this['isStateExpired'](_0x55eaba['id'])&&_0x55eaba[_0x41afff(0x24b)]===_0x54b812){if(_0x41afff(0x48a)!=='IoElR')return _0x1c7c5c['SkillsStatesCore']['Settings'][_0x41afff(0x35a)]['ListWindowCols'];else this[_0x41afff(0x2a1)](_0x55eaba['id']),this['onExpireState'](_0x55eaba['id']),this[_0x41afff(0x45c)](_0x55eaba['id']);}}},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x3fe)]=function(_0x35a4e7){const _0x155226=_0x5a5150;this[_0x155226(0x3a8)](_0x35a4e7);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x328)]=function(_0x57c2ed){const _0x2d3c78=_0x5a5150;if(this[_0x2d3c78(0x25e)]||this[_0x2d3c78(0x4cc)])return;const _0x35e935=VisuMZ[_0x2d3c78(0x22c)]['stateAddJS'];if(_0x35e935[_0x57c2ed])_0x35e935[_0x57c2ed][_0x2d3c78(0x1c7)](this,_0x57c2ed);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x342)]=function(_0x3cd1c7){const _0x41223d=_0x5a5150;if(this['_tempActor']||this[_0x41223d(0x4cc)])return;const _0x13bafe=VisuMZ[_0x41223d(0x22c)][_0x41223d(0x39c)];if(_0x13bafe[_0x3cd1c7])_0x13bafe[_0x3cd1c7]['call'](this,_0x3cd1c7);},Game_Battler['prototype'][_0x5a5150(0x3a8)]=function(_0x42591e){const _0x155f75=_0x5a5150;if(this['_tempActor']||this['_tempBattler'])return;const _0x4f18b0=VisuMZ[_0x155f75(0x22c)][_0x155f75(0x493)];if(_0x4f18b0[_0x42591e])_0x4f18b0[_0x42591e][_0x155f75(0x1c7)](this,_0x42591e);},Game_Battler['prototype'][_0x5a5150(0x42a)]=function(_0x43f2fb){const _0x54fe34=_0x5a5150;if(this[_0x54fe34(0x25e)]||this[_0x54fe34(0x4cc)])return;try{VisuMZ[_0x54fe34(0x22c)][_0x54fe34(0x25b)][_0x54fe34(0x4e8)][_0x54fe34(0x4b6)][_0x54fe34(0x1c7)](this,_0x43f2fb);}catch(_0x49db43){if($gameTemp[_0x54fe34(0x311)]())console[_0x54fe34(0x37a)](_0x49db43);}},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x219)]=function(_0x57e3e9){const _0x29f066=_0x5a5150;if(this[_0x29f066(0x25e)]||this[_0x29f066(0x4cc)])return;try{VisuMZ[_0x29f066(0x22c)]['Settings'][_0x29f066(0x4e8)][_0x29f066(0x4d1)]['call'](this,_0x57e3e9);}catch(_0x4184f8){if($gameTemp[_0x29f066(0x311)]())console['log'](_0x4184f8);}},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x45c)]=function(_0x304da2){const _0x23669b=_0x5a5150;if(this['_tempActor']||this[_0x23669b(0x4cc)])return;try{'UsOac'!==_0x23669b(0x31f)?this[_0x23669b(0x227)]=_0x4e478a:VisuMZ[_0x23669b(0x22c)][_0x23669b(0x25b)][_0x23669b(0x4e8)][_0x23669b(0x3a3)][_0x23669b(0x1c7)](this,_0x304da2);}catch(_0xd66062){if(_0x23669b(0x294)!==_0x23669b(0x3bf)){if($gameTemp[_0x23669b(0x311)]())console['log'](_0xd66062);}else for(const _0xb11426 of this[_0x23669b(0x4ba)]()){this[_0x23669b(0x226)](_0xb11426['id'])&&_0xb11426[_0x23669b(0x24b)]===_0x82720c&&(this[_0x23669b(0x2a1)](_0xb11426['id']),this['onExpireState'](_0xb11426['id']),this['onExpireStateGlobalJS'](_0xb11426['id']));}}},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x46d)]=function(_0x104368){const _0x59ffd4=_0x5a5150;return _0x104368=_0x104368[_0x59ffd4(0x409)]()[_0x59ffd4(0x2dc)](),this[_0x59ffd4(0x4ba)]()[_0x59ffd4(0x30d)](_0x776388=>_0x776388[_0x59ffd4(0x374)][_0x59ffd4(0x258)](_0x104368));},Game_Battler['prototype'][_0x5a5150(0x213)]=function(_0x4136b7,_0x3c2977){const _0x64cc0d=_0x5a5150;_0x4136b7=_0x4136b7[_0x64cc0d(0x409)]()['trim'](),_0x3c2977=_0x3c2977||0x0;const _0x2ec1b4=this[_0x64cc0d(0x46d)](_0x4136b7),_0x2d3d0f=[];for(const _0x48adb2 of _0x2ec1b4){if(_0x64cc0d(0x28c)!==_0x64cc0d(0x28c)){if(_0x4d777f['isLearnedSkill'](_0x2d8394))return!![];}else{if(!_0x48adb2)continue;if(_0x3c2977<=0x0)break;_0x2d3d0f[_0x64cc0d(0x4a4)](_0x48adb2['id']),this['_result']['success']=!![],_0x3c2977--;}}while(_0x2d3d0f[_0x64cc0d(0x2ba)]>0x0){this[_0x64cc0d(0x2a1)](_0x2d3d0f[_0x64cc0d(0x1ce)]());}},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x382)]=function(_0x2f699e,_0x4c4296){const _0x345e8d=_0x5a5150;_0x2f699e=_0x2f699e[_0x345e8d(0x409)]()[_0x345e8d(0x2dc)](),_0x4c4296=_0x4c4296||[];const _0x24d4e8=this[_0x345e8d(0x46d)](_0x2f699e),_0x4827cc=[];for(const _0x5be7d6 of _0x24d4e8){if('paTeZ'!=='ZokyU'){if(!_0x5be7d6)continue;if(_0x4c4296[_0x345e8d(0x258)](_0x5be7d6))continue;_0x4827cc['push'](_0x5be7d6['id']),this['_result']['success']=!![];}else return this[_0x345e8d(0x3e8)]();}while(_0x4827cc[_0x345e8d(0x2ba)]>0x0){'hnmWq'==='hnmWq'?this[_0x345e8d(0x2a1)](_0x4827cc['shift']()):this['onAddDebuffGlobalJS'](_0x2193a2,_0x9a472d);}},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x34d)]=function(_0x5f5608){const _0x386a45=_0x5a5150;return this[_0x386a45(0x2ad)](_0x5f5608)>0x0;},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x348)]=function(_0x2183d2){const _0x9a48ec=_0x5a5150;return this[_0x9a48ec(0x366)](_0x2183d2)>0x0;},Game_Battler['prototype'][_0x5a5150(0x2ad)]=function(_0x28a5e0){const _0x4c830e=_0x5a5150,_0x4ec903=this[_0x4c830e(0x46d)](_0x28a5e0)[_0x4c830e(0x30d)](_0x57f471=>this[_0x4c830e(0x458)](_0x57f471['id']));return _0x4ec903[_0x4c830e(0x2ba)];},Game_Battler[_0x5a5150(0x20f)]['totalStateCategory']=function(_0x487d55){const _0x1afabe=_0x5a5150,_0x11e51c=this['statesByCategory'](_0x487d55);return _0x11e51c[_0x1afabe(0x2ba)];},VisuMZ['SkillsStatesCore'][_0x5a5150(0x4da)]=Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x455)],Game_BattlerBase['prototype'][_0x5a5150(0x455)]=function(_0x3acf1){const _0x3d3266=_0x5a5150,_0x2f74b5=$dataStates[_0x3acf1];if(_0x2f74b5&&_0x2f74b5['categories'][_0x3d3266(0x2ba)]>0x0){if('LPsOE'===_0x3d3266(0x46a))_0x9e24d8=_0x44c039,_0x350741+=_0x46d267;else for(const _0x2a1272 of _0x2f74b5[_0x3d3266(0x374)]){if(this[_0x3d3266(0x356)](_0x2a1272))return!![];}}return VisuMZ['SkillsStatesCore'][_0x3d3266(0x4da)][_0x3d3266(0x1c7)](this,_0x3acf1);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x356)]=function(_0x4df3da){const _0x5c6d42=_0x5a5150;let _0x35c994=_0x5c6d42(0x485);if(this[_0x5c6d42(0x3f6)](_0x35c994))return this[_0x5c6d42(0x4fb)][_0x35c994][_0x5c6d42(0x258)](_0x4df3da);return this[_0x5c6d42(0x4fb)][_0x35c994]=this[_0x5c6d42(0x2fb)](),this[_0x5c6d42(0x4fb)][_0x35c994][_0x5c6d42(0x258)](_0x4df3da);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x2fb)]=function(){const _0x5d3fb2=_0x5a5150,_0x3f1c69=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x154b3a=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x57805a=[];for(const _0x51bf65 of this[_0x5d3fb2(0x2cb)]()){if(!_0x51bf65)continue;const _0x1c3ef5=_0x51bf65[_0x5d3fb2(0x24c)],_0x49cd51=_0x1c3ef5[_0x5d3fb2(0x3eb)](_0x3f1c69);if(_0x49cd51){if(_0x5d3fb2(0x1cc)!=='heaES'){const _0x4637bc=this[_0x5d3fb2(0x46f)];_0x4637bc[_0x5d3fb2(0x3e0)][_0x5d3fb2(0x280)]();const _0x2e7aaa=this[_0x5d3fb2(0x276)](this['index']());if(_0x2e7aaa==='icon'&&this[_0x5d3fb2(0x3dd)]()>0x0){const _0x107292=this[_0x5d3fb2(0x37e)](this['index']());let _0x1670fc=this[_0x5d3fb2(0x1fb)](this[_0x5d3fb2(0x47e)]());_0x1670fc=_0x1670fc[_0x5d3fb2(0x401)](/\\I\[(\d+)\]/gi,''),_0x4637bc[_0x5d3fb2(0x23b)](),this[_0x5d3fb2(0x2e5)](_0x1670fc,_0x107292),this[_0x5d3fb2(0x28d)](_0x1670fc,_0x107292),this[_0x5d3fb2(0x418)](_0x1670fc,_0x107292);}}else for(const _0x114b1b of _0x49cd51){_0x114b1b['match'](_0x3f1c69);const _0x1c2cf7=String(RegExp['$1'])['split'](',')['map'](_0x5eeacc=>String(_0x5eeacc)[_0x5d3fb2(0x409)]()[_0x5d3fb2(0x2dc)]());_0x57805a=_0x57805a['concat'](_0x1c2cf7);}}if(_0x1c3ef5[_0x5d3fb2(0x3eb)](_0x154b3a)){const _0x45edfa=String(RegExp['$1'])[_0x5d3fb2(0x4e2)](/[\r\n]+/)[_0x5d3fb2(0x282)](_0x1bcdd3=>String(_0x1bcdd3)[_0x5d3fb2(0x409)]()['trim']());_0x57805a=_0x57805a[_0x5d3fb2(0x4e0)](_0x45edfa);}}return _0x57805a;},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x27f)]=function(_0x4662b8){const _0xa065c0=_0x5a5150,_0x17fddf=$dataStates[_0x4662b8];if(!_0x17fddf)return;const _0x440915=_0x17fddf[_0xa065c0(0x24c)]||'',_0x46aa2d=_0x440915[_0xa065c0(0x3eb)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x46aa2d){const _0x339822=[_0x17fddf];for(const _0x2ceb6c of _0x46aa2d){_0x2ceb6c[_0xa065c0(0x3eb)](/<REMOVE OTHER (.*) STATES>/i);const _0x59aa08=String(RegExp['$1']);this[_0xa065c0(0x382)](_0x59aa08,_0x339822);}}},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x424)]=Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x277)],Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x277)]=function(_0x57622d,_0xd7866a){const _0x3151c3=_0x5a5150;VisuMZ[_0x3151c3(0x22c)]['Game_Battler_addBuff'][_0x3151c3(0x1c7)](this,_0x57622d,_0xd7866a),this['isBuffAffected'](_0x57622d)&&this['onAddBuff'](_0x57622d,_0xd7866a);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x467)]=function(_0x4873bc){},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x3b1)]=Game_Battler['prototype'][_0x5a5150(0x4d0)],Game_Battler[_0x5a5150(0x20f)]['addDebuff']=function(_0x57953b,_0x4487b1){const _0x38a6f4=_0x5a5150;VisuMZ[_0x38a6f4(0x22c)][_0x38a6f4(0x3b1)]['call'](this,_0x57953b,_0x4487b1),this[_0x38a6f4(0x321)](_0x57953b)&&(_0x38a6f4(0x1e2)===_0x38a6f4(0x1e2)?this[_0x38a6f4(0x4bf)](_0x57953b,_0x4487b1):(_0x1f61cc[_0x38a6f4(0x22c)][_0x38a6f4(0x4af)][_0x38a6f4(0x1c7)](this),this[_0x38a6f4(0x48b)]()));},Game_Battler[_0x5a5150(0x20f)]['removeBuffsAuto']=function(){const _0x3a76eb=_0x5a5150;for(let _0x497fec=0x0;_0x497fec<this[_0x3a76eb(0x365)]();_0x497fec++){if(this[_0x3a76eb(0x2b3)](_0x497fec)){const _0x5c4112=this[_0x3a76eb(0x417)][_0x497fec];this[_0x3a76eb(0x412)](_0x497fec);if(_0x5c4112>0x0)this['onExpireBuff'](_0x497fec);if(_0x5c4112<0x0)this[_0x3a76eb(0x363)](_0x497fec);}}},Game_Battler['prototype'][_0x5a5150(0x481)]=function(_0x4b55da,_0x582213){const _0x4d7456=_0x5a5150;this[_0x4d7456(0x4ca)](_0x4b55da,_0x582213);},Game_Battler['prototype'][_0x5a5150(0x4bf)]=function(_0xaffe72,_0x466537){this['onAddDebuffGlobalJS'](_0xaffe72,_0x466537);},Game_Battler[_0x5a5150(0x20f)]['onEraseBuff']=function(_0x33d824){const _0x3aa6f5=_0x5a5150;Game_BattlerBase['prototype'][_0x3aa6f5(0x1f3)][_0x3aa6f5(0x1c7)](this,_0x33d824),this[_0x3aa6f5(0x411)](_0x33d824);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x3f7)]=function(_0x5d345c){const _0x41d314=_0x5a5150;Game_BattlerBase[_0x41d314(0x20f)]['onEraseDebuff']['call'](this,_0x5d345c),this[_0x41d314(0x4a5)](_0x5d345c);},Game_Battler[_0x5a5150(0x20f)]['onExpireBuff']=function(_0x2b05f1){this['onExpireBuffGlobalJS'](_0x2b05f1);},Game_Battler['prototype'][_0x5a5150(0x363)]=function(_0x1f3bae){const _0x12ed05=_0x5a5150;this[_0x12ed05(0x3c5)](_0x1f3bae);},Game_Battler['prototype']['onAddBuffGlobalJS']=function(_0x336bc4,_0x32fb3e){const _0x134ee7=_0x5a5150;VisuMZ['SkillsStatesCore'][_0x134ee7(0x25b)]['Buffs'][_0x134ee7(0x1e7)][_0x134ee7(0x1c7)](this,_0x336bc4,_0x32fb3e);},Game_Battler['prototype']['onAddDebuffGlobalJS']=function(_0x58336b,_0x8728b7){const _0x73cd53=_0x5a5150;VisuMZ[_0x73cd53(0x22c)][_0x73cd53(0x25b)][_0x73cd53(0x32f)][_0x73cd53(0x34f)][_0x73cd53(0x1c7)](this,_0x58336b,_0x8728b7);},Game_BattlerBase[_0x5a5150(0x20f)]['onEraseBuffGlobalJS']=function(_0xcffb26){const _0x206de0=_0x5a5150;VisuMZ['SkillsStatesCore'][_0x206de0(0x25b)][_0x206de0(0x32f)][_0x206de0(0x253)][_0x206de0(0x1c7)](this,_0xcffb26);},Game_BattlerBase[_0x5a5150(0x20f)][_0x5a5150(0x4a5)]=function(_0xf48770){const _0x212fc7=_0x5a5150;VisuMZ[_0x212fc7(0x22c)][_0x212fc7(0x25b)][_0x212fc7(0x32f)]['onEraseDebuffJS']['call'](this,_0xf48770);},Game_Battler['prototype'][_0x5a5150(0x2bd)]=function(_0x1c671a){const _0x3837a4=_0x5a5150;VisuMZ['SkillsStatesCore'][_0x3837a4(0x25b)][_0x3837a4(0x32f)][_0x3837a4(0x346)][_0x3837a4(0x1c7)](this,_0x1c671a);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x3c5)]=function(_0x2b9bd6){const _0x486000=_0x5a5150;VisuMZ[_0x486000(0x22c)][_0x486000(0x25b)]['Buffs'][_0x486000(0x2b5)][_0x486000(0x1c7)](this,_0x2b9bd6);},Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x291)]=function(_0x4fb538){const _0x481f5a=_0x5a5150,_0x2ed098=VisuMZ[_0x481f5a(0x22c)],_0x50d9e5=[_0x481f5a(0x27a),_0x481f5a(0x3c4),_0x481f5a(0x472),_0x481f5a(0x44c),_0x481f5a(0x2fe),_0x481f5a(0x23d)];for(const _0x3e323d of _0x50d9e5){'SJAuK'===_0x481f5a(0x42d)?(_0x4b8b8c=_0x99efdd['getStateIdWithName'](_0x28ebb4['$1']),_0x4c636f=_0x1ceb6e(_0x327779['$2'])):_0x2ed098[_0x3e323d][_0x4fb538]&&_0x2ed098[_0x3e323d][_0x4fb538][_0x481f5a(0x1c7)](this,_0x4fb538);}},VisuMZ[_0x5a5150(0x22c)]['Game_Battler_regenerateAll']=Game_Battler[_0x5a5150(0x20f)]['regenerateAll'],Game_Battler[_0x5a5150(0x20f)][_0x5a5150(0x2a9)]=function(){const _0x26dbb6=_0x5a5150;this[_0x26dbb6(0x20b)](),VisuMZ[_0x26dbb6(0x22c)][_0x26dbb6(0x269)][_0x26dbb6(0x1c7)](this),this[_0x26dbb6(0x384)](),this[_0x26dbb6(0x2d8)]();},Game_Battler['prototype'][_0x5a5150(0x384)]=function(){const _0x3fb13e=_0x5a5150;for(const _0x2559e3 of this[_0x3fb13e(0x3ef)]()){if(!_0x2559e3)continue;this[_0x3fb13e(0x291)](_0x2559e3['id']);}},Game_Battler['prototype'][_0x5a5150(0x20b)]=function(){const _0x550bdd=_0x5a5150;for(const _0x29ed94 of this[_0x550bdd(0x4ba)]()){if(_0x550bdd(0x4be)!==_0x550bdd(0x3a9)){if(!_0x29ed94)continue;_0x29ed94[_0x550bdd(0x24c)]['match'](/<JS SLIP REFRESH>/i)&&this[_0x550bdd(0x291)](_0x29ed94['id']);}else{if(this[_0x550bdd(0x25e)]||this[_0x550bdd(0x4cc)])return;try{_0x465c26['SkillsStatesCore'][_0x550bdd(0x25b)][_0x550bdd(0x4e8)][_0x550bdd(0x4b6)]['call'](this,_0x1afb45);}catch(_0x506052){if(_0x250731[_0x550bdd(0x311)]())_0x5ac0b4[_0x550bdd(0x37a)](_0x506052);}}}},Game_Battler[_0x5a5150(0x20f)]['regenerateAllSkillsStatesCore']=function(){const _0x1e5489=_0x5a5150;if(!this[_0x1e5489(0x436)]())return;const _0x3524e0=this[_0x1e5489(0x4ba)]();for(const _0x543848 of _0x3524e0){if('RJvJP'!==_0x1e5489(0x425)){if(!_0x543848)continue;this[_0x1e5489(0x225)](_0x543848);}else{_0x19a04f[_0x1e5489(0x3eb)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x1cc851=_0x303169(_0x2f6fc1['$1']);_0x27cb80[_0x1e5489(0x382)](_0x1cc851);}}},Game_Battler['prototype'][_0x5a5150(0x225)]=function(_0x384532){const _0x4daca5=_0x5a5150,_0x14cc69=this[_0x4daca5(0x1ca)](_0x384532['id'],'slipHp')||0x0,_0x4b8054=-this[_0x4daca5(0x242)](),_0x2f9f52=Math[_0x4daca5(0x364)](_0x14cc69,_0x4b8054);if(_0x2f9f52!==0x0){const _0x5310cd=this[_0x4daca5(0x422)][_0x4daca5(0x449)]||0x0;this['gainHp'](_0x2f9f52),this[_0x4daca5(0x422)]['hpDamage']+=_0x5310cd;}const _0x13e7a9=this[_0x4daca5(0x1ca)](_0x384532['id'],_0x4daca5(0x2bc))||0x0;if(_0x13e7a9!==0x0){if(_0x4daca5(0x44e)===_0x4daca5(0x299)){if(this[_0x4daca5(0x25e)]||this[_0x4daca5(0x4cc)])return;const _0x285fa0=_0x283c9a[_0x4daca5(0x22c)]['stateAddJS'];if(_0x285fa0[_0xf5d530])_0x285fa0[_0xb1dc0][_0x4daca5(0x1c7)](this,_0x15a2e3);}else{const _0x1142ef=this['_result'][_0x4daca5(0x2c1)]||0x0;this[_0x4daca5(0x479)](_0x13e7a9),this[_0x4daca5(0x422)][_0x4daca5(0x2c1)]+=_0x1142ef;}}const _0x35efd0=this[_0x4daca5(0x1ca)](_0x384532['id'],_0x4daca5(0x41d))||0x0;_0x35efd0!==0x0&&this[_0x4daca5(0x1d8)](_0x35efd0);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x4aa)]=Game_Actor[_0x5a5150(0x20f)][_0x5a5150(0x267)],Game_Actor[_0x5a5150(0x20f)][_0x5a5150(0x267)]=function(){const _0x307569=_0x5a5150,_0x24c5f3=VisuMZ[_0x307569(0x22c)]['Game_Actor_skillTypes'][_0x307569(0x1c7)](this),_0x2864f5=VisuMZ[_0x307569(0x22c)][_0x307569(0x25b)][_0x307569(0x35a)];let _0x2c382d=_0x2864f5[_0x307569(0x2e3)];return $gameParty[_0x307569(0x488)]()&&(_0x2c382d=_0x2c382d[_0x307569(0x4e0)](_0x2864f5[_0x307569(0x335)])),_0x24c5f3[_0x307569(0x30d)](_0x44c4dc=>!_0x2c382d[_0x307569(0x258)](_0x44c4dc));},Game_Actor['prototype'][_0x5a5150(0x23c)]=function(){const _0x2cf536=_0x5a5150;return this[_0x2cf536(0x40b)]()['filter'](_0x24223f=>this['isSkillUsableForAutoBattle'](_0x24223f));},Game_Actor[_0x5a5150(0x20f)][_0x5a5150(0x28b)]=function(_0xe41573){const _0x444adc=_0x5a5150;if(!this['canUse'](_0xe41573))return![];if(!_0xe41573)return![];if(!this[_0x444adc(0x1d2)](_0xe41573))return![];if(this[_0x444adc(0x1e0)](_0xe41573))return![];return!![];},Game_Actor[_0x5a5150(0x20f)][_0x5a5150(0x1d2)]=function(_0x3b12ca){const _0x467f21=_0x5a5150,_0x3f4454=this[_0x467f21(0x267)](),_0x33a8a0=DataManager['getSkillTypes'](_0x3b12ca),_0x132c9d=_0x3f4454[_0x467f21(0x30d)](_0x296841=>_0x33a8a0['includes'](_0x296841));return _0x132c9d[_0x467f21(0x2ba)]>0x0;},Game_Actor['prototype'][_0x5a5150(0x1e0)]=function(_0x401c81){const _0x99c256=_0x5a5150;if(!VisuMZ['SkillsStatesCore'][_0x99c256(0x1ff)](this,_0x401c81))return!![];if(!VisuMZ[_0x99c256(0x22c)][_0x99c256(0x3c7)](this,_0x401c81))return!![];if(!VisuMZ[_0x99c256(0x22c)][_0x99c256(0x1db)](this,_0x401c81))return!![];return![];},Game_Actor[_0x5a5150(0x20f)]['passiveStateObjects']=function(){const _0x3f1df6=_0x5a5150;let _0x50836d=[this[_0x3f1df6(0x36b)](),this[_0x3f1df6(0x3f2)]()];_0x50836d=_0x50836d[_0x3f1df6(0x4e0)](this[_0x3f1df6(0x4b5)]()[_0x3f1df6(0x30d)](_0x389c81=>_0x389c81));for(const _0xb414d of this[_0x3f1df6(0x405)]){const _0x3d4eaf=$dataSkills[_0xb414d];if(_0x3d4eaf)_0x50836d[_0x3f1df6(0x4a4)](_0x3d4eaf);}return _0x50836d;},Game_Actor[_0x5a5150(0x20f)][_0x5a5150(0x25d)]=function(){const _0x571876=_0x5a5150;Game_Battler[_0x571876(0x20f)]['addPassiveStatesByPluginParameters'][_0x571876(0x1c7)](this);const _0x29ae07=VisuMZ[_0x571876(0x22c)][_0x571876(0x25b)][_0x571876(0x268)][_0x571876(0x4c8)];this[_0x571876(0x4fb)][_0x571876(0x3ef)]=this[_0x571876(0x4fb)][_0x571876(0x3ef)]['concat'](_0x29ae07);},VisuMZ[_0x5a5150(0x22c)]['Game_Actor_learnSkill']=Game_Actor[_0x5a5150(0x20f)][_0x5a5150(0x4bd)],Game_Actor['prototype'][_0x5a5150(0x4bd)]=function(_0x108b1a){const _0xeda1a5=_0x5a5150;VisuMZ[_0xeda1a5(0x22c)]['Game_Actor_learnSkill'][_0xeda1a5(0x1c7)](this,_0x108b1a),this[_0xeda1a5(0x4fb)]={};},VisuMZ[_0x5a5150(0x22c)]['Game_Actor_forgetSkill']=Game_Actor[_0x5a5150(0x20f)][_0x5a5150(0x3ba)],Game_Actor[_0x5a5150(0x20f)][_0x5a5150(0x3ba)]=function(_0x2bc092){const _0x4c3739=_0x5a5150;VisuMZ[_0x4c3739(0x22c)][_0x4c3739(0x48f)][_0x4c3739(0x1c7)](this,_0x2bc092),this['_cache']={};},Game_Actor['prototype'][_0x5a5150(0x48d)]=function(){const _0x5e16e3=_0x5a5150;return VisuMZ[_0x5e16e3(0x22c)][_0x5e16e3(0x25b)][_0x5e16e3(0x4e8)][_0x5e16e3(0x413)]??0x14;},Game_Enemy[_0x5a5150(0x20f)][_0x5a5150(0x421)]=function(){const _0x176831=_0x5a5150;let _0x49ccfc=[this[_0x176831(0x3b5)]()];return _0x49ccfc[_0x176831(0x4e0)](this[_0x176831(0x40b)]());},Game_Enemy[_0x5a5150(0x20f)][_0x5a5150(0x25d)]=function(){const _0x4647e3=_0x5a5150;Game_Battler[_0x4647e3(0x20f)][_0x4647e3(0x25d)][_0x4647e3(0x1c7)](this);const _0x4e7889=VisuMZ[_0x4647e3(0x22c)][_0x4647e3(0x25b)][_0x4647e3(0x268)][_0x4647e3(0x2cf)];this[_0x4647e3(0x4fb)]['passiveStates']=this['_cache']['passiveStates'][_0x4647e3(0x4e0)](_0x4e7889);},Game_Enemy[_0x5a5150(0x20f)][_0x5a5150(0x40b)]=function(){const _0x8477ed=_0x5a5150,_0x558191=[];for(const _0x2662a9 of this[_0x8477ed(0x3b5)]()[_0x8477ed(0x2e0)]){if('AAPoz'!==_0x8477ed(0x2d0)){const _0x50f6b7=_0x4b102f[_0x8477ed(0x22c)]['Settings'][_0x8477ed(0x4e8)];if(!_0x50f6b7)return;if(_0x50f6b7[_0x8477ed(0x3f3)]===![])return;if(!this[_0x8477ed(0x3a1)])return;this['_subject'][_0x8477ed(0x2fa)]();}else{const _0x5c67bf=$dataSkills[_0x2662a9[_0x8477ed(0x273)]];if(_0x5c67bf&&!_0x558191[_0x8477ed(0x258)](_0x5c67bf))_0x558191[_0x8477ed(0x4a4)](_0x5c67bf);}}return _0x558191;},Game_Enemy[_0x5a5150(0x20f)]['meetsStateCondition']=function(_0x49dfa6){const _0x31b4ca=_0x5a5150;return this[_0x31b4ca(0x322)]($dataStates[_0x49dfa6]);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x4e1)]=Game_Unit['prototype']['isAllDead'],Game_Unit[_0x5a5150(0x20f)][_0x5a5150(0x3da)]=function(){const _0x45bb08=_0x5a5150;if(this[_0x45bb08(0x201)]())return!![];return VisuMZ['SkillsStatesCore'][_0x45bb08(0x4e1)]['call'](this);},Game_Unit[_0x5a5150(0x20f)][_0x5a5150(0x201)]=function(){const _0x21551b=_0x5a5150,_0x4c3c01=this[_0x21551b(0x4c2)]();for(const _0x5f0600 of _0x4c3c01){if(!_0x5f0600['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ['SkillsStatesCore'][_0x5a5150(0x4e9)]=Game_Troop['prototype']['setup'],Game_Troop[_0x5a5150(0x20f)][_0x5a5150(0x21b)]=function(_0x4521b9){const _0x5beb8b=_0x5a5150;VisuMZ['SkillsStatesCore'][_0x5beb8b(0x4e9)][_0x5beb8b(0x1c7)](this,_0x4521b9),this[_0x5beb8b(0x281)]();},Game_Troop[_0x5a5150(0x20f)][_0x5a5150(0x281)]=function(){const _0x10c227=_0x5a5150;this[_0x10c227(0x29b)]=Graphics[_0x10c227(0x1ec)];},Game_Troop[_0x5a5150(0x20f)][_0x5a5150(0x290)]=function(){const _0x29feed=_0x5a5150;return this['_currentTroopUniqueID']=this[_0x29feed(0x29b)]||Graphics[_0x29feed(0x1ec)],this['_currentTroopUniqueID'];},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x297)]=function(){const _0x577a8c=_0x5a5150;if(ConfigManager[_0x577a8c(0x428)]&&ConfigManager[_0x577a8c(0x257)]!==undefined)return ConfigManager[_0x577a8c(0x257)];else{if(this[_0x577a8c(0x43f)]()){if('PfSrj'===_0x577a8c(0x3ca)){if(_0x56ed48[_0x577a8c(0x235)](_0x38ee7e))return!![];}else return this[_0x577a8c(0x307)]()[_0x577a8c(0x3eb)](/LOWER/i);}else{if('iNGXN'==='iNGXN')Scene_ItemBase[_0x577a8c(0x20f)]['isRightInputMode'][_0x577a8c(0x1c7)](this);else return _0x1d7626[_0x577a8c(0x36d)]['call'](this,_0x1e257f);}}},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x3fb)]=function(){const _0x594ebd=_0x5a5150;if(ConfigManager[_0x594ebd(0x428)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x594ebd(0x292)];else{if(this[_0x594ebd(0x43f)]()){if('xjtFN'==='xjtFN')return this[_0x594ebd(0x307)]()[_0x594ebd(0x3eb)](/RIGHT/i);else this[_0x594ebd(0x37d)]=!![],this['updateVisibility']();}else return Scene_ItemBase[_0x594ebd(0x20f)][_0x594ebd(0x3fb)][_0x594ebd(0x1c7)](this);}},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x307)]=function(){const _0x3751d6=_0x5a5150;return VisuMZ[_0x3751d6(0x22c)][_0x3751d6(0x25b)]['Skills'][_0x3751d6(0x260)];},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x431)]=function(){const _0x498248=_0x5a5150;return this[_0x498248(0x41b)]&&this['_categoryWindow']['isUseModernControls']();},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x43f)]=function(){const _0x162f5c=_0x5a5150;return VisuMZ[_0x162f5c(0x22c)][_0x162f5c(0x25b)][_0x162f5c(0x35a)][_0x162f5c(0x3d0)];},VisuMZ[_0x5a5150(0x22c)]['Scene_Skill_helpWindowRect']=Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x2b0)],Scene_Skill[_0x5a5150(0x20f)]['helpWindowRect']=function(){const _0x57a9e9=_0x5a5150;if(this[_0x57a9e9(0x43f)]()){if(_0x57a9e9(0x274)!==_0x57a9e9(0x274)){const _0x1a3aee=_0x57a9e9(0x1cd);this[_0x57a9e9(0x480)]=this[_0x57a9e9(0x480)]||{};if(this[_0x57a9e9(0x480)][_0x1a3aee])return this[_0x57a9e9(0x480)][_0x1a3aee];const _0x43b01e=_0x14ff83[_0x57a9e9(0x22c)][_0x57a9e9(0x25b)][_0x57a9e9(0x32f)][_0x57a9e9(0x22d)];return this[_0x57a9e9(0x2d7)](_0x1a3aee,_0x43b01e);}else return this[_0x57a9e9(0x2f0)]();}else return VisuMZ[_0x57a9e9(0x22c)]['Scene_Skill_helpWindowRect'][_0x57a9e9(0x1c7)](this);},Scene_Skill[_0x5a5150(0x20f)]['helpWindowRectSkillsStatesCore']=function(){const _0x215894=_0x5a5150,_0x16be14=0x0,_0x17dbaf=this['helpAreaTop'](),_0x4144eb=Graphics[_0x215894(0x385)],_0x2c69ba=this[_0x215894(0x1fe)]();return new Rectangle(_0x16be14,_0x17dbaf,_0x4144eb,_0x2c69ba);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x3fa)]=Scene_Skill['prototype'][_0x5a5150(0x2a3)],Scene_Skill['prototype'][_0x5a5150(0x2a3)]=function(){const _0x5cbf6b=_0x5a5150;if(this[_0x5cbf6b(0x43f)]()){if(_0x5cbf6b(0x30f)!=='fQOun')return this[_0x5cbf6b(0x337)]();else{const _0x3933a4=this[_0x5cbf6b(0x422)][_0x5cbf6b(0x449)]||0x0;this[_0x5cbf6b(0x387)](_0x47e68d),this['_result'][_0x5cbf6b(0x449)]+=_0x3933a4;}}else{if(_0x5cbf6b(0x1ee)!==_0x5cbf6b(0x1ee))this[_0x5cbf6b(0x1d8)](_0x5e4bf0);else return VisuMZ[_0x5cbf6b(0x22c)][_0x5cbf6b(0x3fa)][_0x5cbf6b(0x1c7)](this);}},Scene_Skill['prototype']['mainCommandWidth']=function(){const _0x46d27c=_0x5a5150;return VisuMZ['SkillsStatesCore']['Settings'][_0x46d27c(0x35a)]['CmdWidth']??Scene_MenuBase[_0x46d27c(0x20f)][_0x46d27c(0x38d)][_0x46d27c(0x1c7)](this);},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x337)]=function(){const _0x431014=_0x5a5150,_0x2e8c01=this[_0x431014(0x38d)](),_0x37b9e5=this[_0x431014(0x2e8)](0x3,!![]),_0x321342=this['isRightInputMode']()?Graphics[_0x431014(0x385)]-_0x2e8c01:0x0,_0x4e5965=this[_0x431014(0x2b9)]();return new Rectangle(_0x321342,_0x4e5965,_0x2e8c01,_0x37b9e5);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x32e)]=Scene_Skill['prototype'][_0x5a5150(0x220)],Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x220)]=function(){const _0x520d2c=_0x5a5150;if(this[_0x520d2c(0x43f)]())return this['statusWindowRectSkillsStatesCore']();else{if('ogDfL'===_0x520d2c(0x3cb))return VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect'][_0x520d2c(0x1c7)](this);else{const _0xd77ebc=_0x10966f[_0x520d2c(0x20f)][_0x520d2c(0x35c)]();this['_turnDisplaySprite']=new _0x15596f(),this[_0x520d2c(0x391)]['bitmap']=new _0x48898c(_0x32ee88['iconWidth'],_0xd77ebc),this['_turnDisplaySprite'][_0x520d2c(0x1d0)]['x']=this['anchor']['x'],this[_0x520d2c(0x391)][_0x520d2c(0x1d0)]['y']=this[_0x520d2c(0x1d0)]['y'],this['addChild'](this['_turnDisplaySprite']),this[_0x520d2c(0x3e0)]=this[_0x520d2c(0x391)][_0x520d2c(0x1f8)];}}},Scene_Skill['prototype'][_0x5a5150(0x20a)]=function(){const _0x4f89c6=_0x5a5150,_0x11aa05=Graphics[_0x4f89c6(0x385)]-this[_0x4f89c6(0x38d)](),_0x5b9c37=this[_0x4f89c6(0x4d4)][_0x4f89c6(0x410)],_0x2ade89=this[_0x4f89c6(0x3fb)]()?0x0:Graphics[_0x4f89c6(0x385)]-_0x11aa05,_0x25755b=this[_0x4f89c6(0x2b9)]();return new Rectangle(_0x2ade89,_0x25755b,_0x11aa05,_0x5b9c37);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x380)]=Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x1c5)],Scene_Skill[_0x5a5150(0x20f)]['createItemWindow']=function(){const _0x3ffc95=_0x5a5150;VisuMZ[_0x3ffc95(0x22c)]['Scene_Skill_createItemWindow'][_0x3ffc95(0x1c7)](this),this[_0x3ffc95(0x1d7)]()&&(_0x3ffc95(0x4ad)!==_0x3ffc95(0x456)?this[_0x3ffc95(0x236)]():_0x4e0fcc[_0x3ffc95(0x374)]['push'](_0x3ffc95(0x4db)));},VisuMZ['SkillsStatesCore'][_0x5a5150(0x355)]=Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x31b)],Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x31b)]=function(){const _0x5984ba=_0x5a5150;if(this[_0x5984ba(0x43f)]())return this[_0x5984ba(0x3e8)]();else{const _0x2ff21e=VisuMZ[_0x5984ba(0x22c)]['Scene_Skill_itemWindowRect']['call'](this);return this[_0x5984ba(0x1d7)]()&&this[_0x5984ba(0x426)]()&&(_0x2ff21e[_0x5984ba(0x367)]-=this[_0x5984ba(0x372)]()),_0x2ff21e;}},Scene_Skill[_0x5a5150(0x20f)]['itemWindowRectSkillsStatesCore']=function(){const _0xbbb024=_0x5a5150,_0x3b0783=Graphics[_0xbbb024(0x385)]-this[_0xbbb024(0x372)](),_0x139156=this[_0xbbb024(0x28f)]()-this[_0xbbb024(0x2ee)][_0xbbb024(0x410)],_0x3cdd91=this[_0xbbb024(0x3fb)]()?Graphics[_0xbbb024(0x385)]-_0x3b0783:0x0,_0x2b2211=this['_statusWindow']['y']+this[_0xbbb024(0x2ee)][_0xbbb024(0x410)];return new Rectangle(_0x3cdd91,_0x2b2211,_0x3b0783,_0x139156);},Scene_Skill['prototype']['allowCreateShopStatusWindow']=function(){const _0x31ff70=_0x5a5150;if(!Imported[_0x31ff70(0x2c2)])return![];else{if(this[_0x31ff70(0x43f)]())return!![];else{if(_0x31ff70(0x1c3)!==_0x31ff70(0x1c3))for(const _0x243afd of _0x52f225[_0x31ff70(0x3b4)]()){if(_0x243afd)_0x243afd[_0x31ff70(0x463)]();}else return VisuMZ[_0x31ff70(0x22c)][_0x31ff70(0x25b)]['Skills'][_0x31ff70(0x24a)];}}},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x426)]=function(){const _0x35934a=_0x5a5150;return VisuMZ['SkillsStatesCore']['Settings'][_0x35934a(0x35a)]['SkillSceneAdjustSkillList'];},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x236)]=function(){const _0x275ce2=_0x5a5150,_0x20a9d0=this[_0x275ce2(0x432)]();this[_0x275ce2(0x300)]=new Window_ShopStatus(_0x20a9d0),this['addWindow'](this[_0x275ce2(0x300)]),this['_itemWindow'][_0x275ce2(0x4cf)](this[_0x275ce2(0x300)]);const _0x49bb69=VisuMZ['SkillsStatesCore'][_0x275ce2(0x25b)][_0x275ce2(0x35a)]['SkillSceneStatusBgType'];this[_0x275ce2(0x300)]['setBackgroundType'](_0x49bb69||0x0);},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x432)]=function(){const _0x27d265=_0x5a5150;if(this[_0x27d265(0x43f)]()){if('vCVpG'===_0x27d265(0x4c9))return this[_0x27d265(0x20e)]();else{if(!this[_0x27d265(0x45b)])this[_0x27d265(0x463)]();this['createPassiveStatesCache']();}}else{if(_0x27d265(0x3ce)!==_0x27d265(0x3ce))this[_0x27d265(0x2ee)]['setItem'](this['item']());else return VisuMZ[_0x27d265(0x22c)][_0x27d265(0x25b)][_0x27d265(0x35a)][_0x27d265(0x4d8)][_0x27d265(0x1c7)](this);}},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x20e)]=function(){const _0x482605=_0x5a5150,_0x3a6194=this[_0x482605(0x372)](),_0x149a6b=this[_0x482605(0x1e5)][_0x482605(0x410)],_0xf05b71=this[_0x482605(0x3fb)]()?0x0:Graphics[_0x482605(0x385)]-this[_0x482605(0x372)](),_0x24e1a4=this[_0x482605(0x1e5)]['y'];return new Rectangle(_0xf05b71,_0x24e1a4,_0x3a6194,_0x149a6b);},Scene_Skill['prototype'][_0x5a5150(0x372)]=function(){const _0x26918b=_0x5a5150;return Imported[_0x26918b(0x2c2)]?Scene_Shop[_0x26918b(0x20f)]['statusWidth']():0x0;},Scene_Skill[_0x5a5150(0x20f)][_0x5a5150(0x43a)]=function(){const _0x1578b4=_0x5a5150;return this[_0x1578b4(0x4d4)]&&this[_0x1578b4(0x4d4)][_0x1578b4(0x40a)]?_0x1578b4(0x2c8)!==_0x1578b4(0x2c8)?_0x4b7977:TextManager[_0x1578b4(0x21d)]:'';},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x3d4)]=Sprite_Gauge['prototype'][_0x5a5150(0x26c)],Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x26c)]=function(){const _0x101ebf=_0x5a5150;VisuMZ['SkillsStatesCore'][_0x101ebf(0x3d4)]['call'](this),this[_0x101ebf(0x3aa)]=null;},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x444)]=Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x21b)],Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x21b)]=function(_0x2dc5ad,_0x2616d2){const _0x1d54f7=_0x5a5150;this[_0x1d54f7(0x35d)](_0x2dc5ad,_0x2616d2),_0x2616d2=_0x2616d2[_0x1d54f7(0x36a)](),VisuMZ['SkillsStatesCore'][_0x1d54f7(0x444)]['call'](this,_0x2dc5ad,_0x2616d2);},Sprite_Gauge['prototype'][_0x5a5150(0x35d)]=function(_0x4e4901,_0x5d6b6f){const _0x56765d=_0x5a5150,_0x348e18=VisuMZ[_0x56765d(0x22c)][_0x56765d(0x25b)]['Costs']['filter'](_0x1fbb6b=>_0x1fbb6b[_0x56765d(0x37f)][_0x56765d(0x409)]()===_0x5d6b6f['toUpperCase']());if(_0x348e18[_0x56765d(0x2ba)]>=0x1)this[_0x56765d(0x3aa)]=_0x348e18[0x0];else{if('qzyzG'===_0x56765d(0x255))this[_0x56765d(0x3aa)]=null;else{this[_0x56765d(0x1fb)](_0x33f6b3)[_0x56765d(0x3eb)](/\\I\[(\d+)\]/i);const _0x4eb581=_0x1e2177(_0x4754b1['$1'])||0x0,_0x3fe8bf=this[_0x56765d(0x37e)](_0x111fc5),_0x58c251=_0x3fe8bf['x']+_0x698def[_0x56765d(0x340)]((_0x3fe8bf[_0x56765d(0x367)]-_0x4000d0[_0x56765d(0x42e)])/0x2),_0x521c23=_0x3fe8bf['y']+(_0x3fe8bf[_0x56765d(0x410)]-_0x2c651c[_0x56765d(0x490)])/0x2;this[_0x56765d(0x4a3)](_0x4eb581,_0x58c251,_0x521c23);}}},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x3c9)]=Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x239)],Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x239)]=function(){const _0x3bfb6f=_0x5a5150;if(this[_0x3bfb6f(0x22e)]&&this[_0x3bfb6f(0x3aa)]){if(_0x3bfb6f(0x228)!=='BQgmE')return this[_0x3bfb6f(0x4d7)]();else{const _0x1dcf8a=_0x553300[_0x3bfb6f(0x1f5)]('['+_0x2c9c6b['$1'][_0x3bfb6f(0x3eb)](/\d+/g)+']');for(const _0x5e6a26 of _0x1dcf8a){if(_0x15164e[_0x3bfb6f(0x482)](_0x5e6a26))return!![];}return![];}}else return VisuMZ[_0x3bfb6f(0x22c)][_0x3bfb6f(0x3c9)]['call'](this);},Sprite_Gauge['prototype']['currentValueSkillsStatesCore']=function(){const _0x231f40=_0x5a5150;return this[_0x231f40(0x3aa)]['GaugeCurrentJS']['call'](this['_battler']);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x1cf)]=Sprite_Gauge['prototype'][_0x5a5150(0x492)],Sprite_Gauge['prototype'][_0x5a5150(0x492)]=function(){const _0x15f43b=_0x5a5150;return this['_battler']&&this[_0x15f43b(0x3aa)]?this[_0x15f43b(0x1e1)]():VisuMZ[_0x15f43b(0x22c)][_0x15f43b(0x1cf)]['call'](this);},Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x1e1)]=function(){const _0x3cbcdc=_0x5a5150;return this['_costSettings'][_0x3cbcdc(0x308)]['call'](this['_battler']);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x42c)]=Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x4e6)],Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x4e6)]=function(){const _0x1a8366=_0x5a5150,_0x1700c1=VisuMZ[_0x1a8366(0x22c)][_0x1a8366(0x42c)][_0x1a8366(0x1c7)](this);return _0x1700c1['clamp'](0x0,0x1);},VisuMZ['SkillsStatesCore']['Sprite_Gauge_redraw']=Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x34e)],Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x34e)]=function(){const _0xc8750=_0x5a5150;if(this['_battler']&&this[_0xc8750(0x3aa)])this[_0xc8750(0x1f8)][_0xc8750(0x280)](),this['redrawSkillsStatesCore']();else{if('kDkhW'!==_0xc8750(0x4ac))VisuMZ['SkillsStatesCore'][_0xc8750(0x41a)][_0xc8750(0x1c7)](this);else{_0x5c81b7[_0xc8750(0x3eb)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x187a00=_0xb02428[_0xc8750(0x462)](_0x9ef529(_0x3c01bc['$1'])[_0xc8750(0x409)]()),_0x3fe17e=_0x471b1f(_0x59a82b['$2']);_0x187a00>=0x0&&(_0x44ee27['addBuffTurns'](_0x187a00,_0x3fe17e),this[_0xc8750(0x3dc)](_0x239221));}}},Sprite_Gauge['prototype'][_0x5a5150(0x447)]=function(){const _0x3cee8a=_0x5a5150;let _0x53b3f9=this['currentValue']();return Imported[_0x3cee8a(0x222)]&&this['useDigitGrouping']()&&(_0x53b3f9=VisuMZ[_0x3cee8a(0x2e7)](_0x53b3f9)),_0x53b3f9;},Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x2d5)]=function(){const _0x38892d=_0x5a5150;this['bitmap'][_0x38892d(0x280)](),this[_0x38892d(0x3aa)][_0x38892d(0x243)][_0x38892d(0x1c7)](this);},Sprite_Gauge['prototype'][_0x5a5150(0x32d)]=function(_0x3ebe39,_0x3dd0d7,_0x4480e7,_0x1b4dc5,_0x2ee1c4,_0x31673c){const _0x5aff83=_0x5a5150,_0x55d5b5=this['gaugeRate'](),_0x3f2f17=Math['floor']((_0x2ee1c4-0x2)*_0x55d5b5),_0x15daa9=_0x31673c-0x2,_0x2a7be1=this[_0x5aff83(0x3c1)]();this[_0x5aff83(0x1f8)][_0x5aff83(0x483)](_0x4480e7,_0x1b4dc5,_0x2ee1c4,_0x31673c,_0x2a7be1),this[_0x5aff83(0x1f8)][_0x5aff83(0x459)](_0x4480e7+0x1,_0x1b4dc5+0x1,_0x3f2f17,_0x15daa9,_0x3ebe39,_0x3dd0d7);},Sprite_Gauge['prototype'][_0x5a5150(0x2a6)]=function(){const _0x4552c5=_0x5a5150,_0x22c7e9=VisuMZ['SkillsStatesCore'][_0x4552c5(0x25b)][_0x4552c5(0x305)];return _0x22c7e9[_0x4552c5(0x249)]===_0x4552c5(0x47b)?$gameSystem[_0x4552c5(0x334)]():$gameSystem[_0x4552c5(0x318)]();},Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x2ef)]=function(){const _0x76dada=_0x5a5150,_0x408ac3=VisuMZ[_0x76dada(0x22c)][_0x76dada(0x25b)]['Gauge'];return _0x408ac3[_0x76dada(0x249)]==='number'?'RnJSc'===_0x76dada(0x375)?$gameSystem['mainFontSize']()-0x6:(this[_0x76dada(0x4fb)]=this[_0x76dada(0x4fb)]||{},this['_cache'][_0x5c4797]!==_0x55ebd1):$gameSystem[_0x76dada(0x2cd)]()-0x2;},Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x3c2)]=function(){const _0x229598=_0x5a5150,_0x5cdb4e=VisuMZ[_0x229598(0x22c)][_0x229598(0x25b)][_0x229598(0x305)];if(_0x5cdb4e[_0x229598(0x4eb)]===_0x229598(0x47b)){if('uIWDu'===_0x229598(0x465)){if(!_0x1721ba[_0x229598(0x2c2)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:_0x1e7675[_0x229598(0x22c)][_0x229598(0x25b)]['Skills'][_0x229598(0x24a)];}else return $gameSystem[_0x229598(0x334)]();}else return $gameSystem[_0x229598(0x318)]();},Sprite_Gauge[_0x5a5150(0x20f)]['valueFontSize']=function(){const _0x58f426=_0x5a5150,_0xb37619=VisuMZ['SkillsStatesCore'][_0x58f426(0x25b)][_0x58f426(0x305)];if(_0xb37619['ValueFontMainType']===_0x58f426(0x47b)){if(_0x58f426(0x49d)!==_0x58f426(0x49d))_0x4522d9[_0x58f426(0x22c)][_0x58f426(0x25b)][_0x58f426(0x4e8)][_0x58f426(0x4d1)]['call'](this,_0x402930);else return $gameSystem['mainFontSize']()-0x6;}else return $gameSystem[_0x58f426(0x2cd)]()-0x2;},Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x3ec)]=function(){const _0x5299de=_0x5a5150,_0x29f864=VisuMZ[_0x5299de(0x22c)]['Settings'][_0x5299de(0x305)];if(_0x29f864[_0x5299de(0x3a6)]){if(_0x5299de(0x40d)===_0x5299de(0x40d)){if(_0x29f864[_0x5299de(0x4e7)]===0x1)return this[_0x5299de(0x320)]();else{if(_0x29f864[_0x5299de(0x4e7)]===0x2)return this['gaugeColor2']();}}else this['onAddBuff'](_0x6a0859,_0x40fb61);}const _0x17a696=_0x29f864[_0x5299de(0x489)];return ColorManager[_0x5299de(0x4f0)](_0x17a696);},Sprite_Gauge['prototype']['labelOutlineColor']=function(){const _0x5f0830=_0x5a5150,_0x24ca87=VisuMZ[_0x5f0830(0x22c)][_0x5f0830(0x25b)][_0x5f0830(0x305)];if(this[_0x5f0830(0x44a)]()<=0x0)return _0x5f0830(0x314);else return _0x24ca87[_0x5f0830(0x310)]?'rgba(0,\x200,\x200,\x201)':_0x5f0830(0x207)===_0x5f0830(0x207)?ColorManager['outlineColor']():_0x3a9ede-_0x4ff34d;},Sprite_Gauge['prototype'][_0x5a5150(0x44a)]=function(){const _0x51a919=_0x5a5150;return VisuMZ[_0x51a919(0x22c)][_0x51a919(0x25b)]['Gauge'][_0x51a919(0x33a)]||0x0;},Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x3bc)]=function(){const _0x2edaf2=_0x5a5150,_0x468bf2=VisuMZ['SkillsStatesCore']['Settings'][_0x2edaf2(0x305)];if(this[_0x2edaf2(0x250)]()<=0x0){if('HswFv'!==_0x2edaf2(0x402))this[_0x2edaf2(0x35d)](_0x2a514a,_0x290dd2),_0x15635e=_0xffc101['toLowerCase'](),_0x16277d[_0x2edaf2(0x22c)][_0x2edaf2(0x444)][_0x2edaf2(0x1c7)](this,_0x5517d4,_0x3c1820);else return'rgba(0,\x200,\x200,\x200)';}else{if(_0x468bf2['ValueOutlineSolid']){if(_0x2edaf2(0x2c6)===_0x2edaf2(0x43b)){const _0x16acc3=_0x334ddc(_0x11572f['$1']),_0x14567d=_0x2edaf2(0x4b0)['format'](_0x16acc3);_0x54974e[_0x2edaf2(0x22c)][_0x2edaf2(0x1fa)][_0x215b49['id']]=new _0x5d64d8(_0x2edaf2(0x211),_0x14567d);}else return'rgba(0,\x200,\x200,\x201)';}else return ColorManager['outlineColor']();}},Sprite_Gauge[_0x5a5150(0x20f)][_0x5a5150(0x250)]=function(){const _0x5084=_0x5a5150;return VisuMZ['SkillsStatesCore'][_0x5084(0x25b)]['Gauge'][_0x5084(0x2b8)]||0x0;},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x326)]=Sprite_StateIcon['prototype'][_0x5a5150(0x1f4)],Sprite_StateIcon[_0x5a5150(0x20f)][_0x5a5150(0x1f4)]=function(){const _0x1e24a5=_0x5a5150;VisuMZ[_0x1e24a5(0x22c)]['Sprite_StateIcon_loadBitmap'][_0x1e24a5(0x1c7)](this),this[_0x1e24a5(0x3b7)]();},Sprite_StateIcon[_0x5a5150(0x20f)][_0x5a5150(0x3b7)]=function(){const _0x44f48a=_0x5a5150,_0x2dd024=Window_Base['prototype'][_0x44f48a(0x35c)]();this[_0x44f48a(0x391)]=new Sprite(),this[_0x44f48a(0x391)][_0x44f48a(0x1f8)]=new Bitmap(ImageManager[_0x44f48a(0x42e)],_0x2dd024),this['_turnDisplaySprite'][_0x44f48a(0x1d0)]['x']=this[_0x44f48a(0x1d0)]['x'],this[_0x44f48a(0x391)]['anchor']['y']=this[_0x44f48a(0x1d0)]['y'],this[_0x44f48a(0x3f1)](this[_0x44f48a(0x391)]),this[_0x44f48a(0x3e0)]=this[_0x44f48a(0x391)][_0x44f48a(0x1f8)];},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x4af)]=Sprite_StateIcon[_0x5a5150(0x20f)]['updateFrame'],Sprite_StateIcon['prototype'][_0x5a5150(0x404)]=function(){const _0x54b9ad=_0x5a5150;VisuMZ['SkillsStatesCore'][_0x54b9ad(0x4af)][_0x54b9ad(0x1c7)](this),this['updateTurnDisplaySprite']();},Sprite_StateIcon['prototype']['drawText']=function(_0x507ebe,_0x5f5752,_0x2ff04b,_0x2f2237,_0x2228b6){const _0x52f86a=_0x5a5150;this[_0x52f86a(0x3e0)][_0x52f86a(0x381)](_0x507ebe,_0x5f5752,_0x2ff04b,_0x2f2237,this['contents']['height'],_0x2228b6);},Sprite_StateIcon[_0x5a5150(0x20f)][_0x5a5150(0x48b)]=function(){const _0x4fe013=_0x5a5150;this[_0x4fe013(0x23b)](),this[_0x4fe013(0x3e0)][_0x4fe013(0x280)]();const _0x40898b=this['_battler'];if(!_0x40898b)return;const _0x31df57=_0x40898b[_0x4fe013(0x4ba)]()['filter'](_0x52ef0d=>_0x52ef0d[_0x4fe013(0x45a)]>0x0),_0x2d9e50=[...Array(0x8)[_0x4fe013(0x41f)]()][_0x4fe013(0x30d)](_0x15d4f1=>_0x40898b[_0x4fe013(0x309)](_0x15d4f1)!==0x0),_0x29ec62=this[_0x4fe013(0x25c)],_0x2468a2=_0x31df57[_0x29ec62];if(_0x2468a2)Window_Base[_0x4fe013(0x20f)]['drawActorStateTurns']['call'](this,_0x40898b,_0x2468a2,0x0,0x0),Window_Base[_0x4fe013(0x20f)][_0x4fe013(0x4dc)][_0x4fe013(0x1c7)](this,_0x40898b,_0x2468a2,0x0,0x0);else{if(_0x4fe013(0x41c)===_0x4fe013(0x474)){const _0x48df98=_0x4c9f31['x']+_0x295be5[_0x4fe013(0x340)]((_0x262e5e[_0x4fe013(0x367)]-_0x2fa154)/0x2);this['drawTextEx'](_0x588fdb,_0x48df98,_0x2759b2['y'],_0x5cffcb);}else{const _0x17a0fd=_0x2d9e50[_0x29ec62-_0x31df57[_0x4fe013(0x2ba)]];if(_0x17a0fd===undefined)return;Window_Base['prototype'][_0x4fe013(0x30e)][_0x4fe013(0x1c7)](this,_0x40898b,_0x17a0fd,0x0,0x0),Window_Base['prototype'][_0x4fe013(0x33e)][_0x4fe013(0x1c7)](this,_0x40898b,_0x17a0fd,0x0,0x0);}}},Sprite_StateIcon[_0x5a5150(0x20f)]['resetFontSettings']=function(){const _0x489e12=_0x5a5150;this['contents'][_0x489e12(0x452)]=$gameSystem[_0x489e12(0x318)](),this[_0x489e12(0x3e0)][_0x489e12(0x2cc)]=$gameSystem[_0x489e12(0x2cd)](),this[_0x489e12(0x471)]();},Sprite_StateIcon[_0x5a5150(0x20f)][_0x5a5150(0x471)]=function(){const _0x2dd70d=_0x5a5150;this[_0x2dd70d(0x2ac)](ColorManager['normalColor']()),this[_0x2dd70d(0x347)](ColorManager[_0x2dd70d(0x4a2)]());},Sprite_StateIcon['prototype'][_0x5a5150(0x2ac)]=function(_0x13a79b){const _0x22ea83=_0x5a5150;this[_0x22ea83(0x3e0)]['textColor']=_0x13a79b;},Sprite_StateIcon[_0x5a5150(0x20f)]['changeOutlineColor']=function(_0x1efc17){const _0x2b4b08=_0x5a5150;this['contents'][_0x2b4b08(0x4a2)]=_0x1efc17;},Sprite_StateIcon['prototype'][_0x5a5150(0x3df)]=function(){const _0x34c7a3=_0x5a5150;this['_hidden']=!![],this[_0x34c7a3(0x48e)]();},Window_Base[_0x5a5150(0x20f)][_0x5a5150(0x2a5)]=function(_0x5144f5,_0x3dbcc1,_0x3c0aa9,_0x271f55,_0x239d2e){const _0x581d82=_0x5a5150,_0x1877b5=this[_0x581d82(0x1c6)](_0x5144f5,_0x3dbcc1),_0x4d6e59=this[_0x581d82(0x25a)](_0x1877b5,_0x3c0aa9,_0x271f55,_0x239d2e),_0x56b54b=_0x3c0aa9+_0x239d2e-_0x4d6e59['width'];this[_0x581d82(0x376)](_0x1877b5,_0x56b54b,_0x271f55,_0x239d2e),this[_0x581d82(0x23b)]();},Window_Base[_0x5a5150(0x20f)]['createAllSkillCostText']=function(_0xa56c07,_0x37fcd6){const _0x4a469f=_0x5a5150;let _0x132fb3='';for(settings of VisuMZ[_0x4a469f(0x22c)][_0x4a469f(0x25b)][_0x4a469f(0x248)]){if(_0x4a469f(0x2a8)===_0x4a469f(0x451)){if(_0xa3f1c3['value'](_0x23682e))return!![];}else{if(!this[_0x4a469f(0x1fc)](_0xa56c07,_0x37fcd6,settings))continue;if(_0x132fb3['length']>0x0)_0x132fb3+=this[_0x4a469f(0x3e1)]();_0x132fb3+=this[_0x4a469f(0x441)](_0xa56c07,_0x37fcd6,settings);}}_0x132fb3=this[_0x4a469f(0x496)](_0xa56c07,_0x37fcd6,_0x132fb3);if(_0x37fcd6[_0x4a469f(0x24c)][_0x4a469f(0x3eb)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x4a469f(0x4ae)!==_0x4a469f(0x256)){if(_0x132fb3[_0x4a469f(0x2ba)]>0x0)_0x132fb3+=this[_0x4a469f(0x3e1)]();_0x132fb3+=String(RegExp['$1']);}else{if(typeof _0x26ab1e!==_0x4a469f(0x47b))_0x3ec758=_0x23435d['id'];this[_0x4a469f(0x3a4)]=this['_stateData']||{},this['_stateData'][_0x24b988]={};}}return _0x132fb3;},Window_Base[_0x5a5150(0x20f)][_0x5a5150(0x496)]=function(_0x24890f,_0x522bcc,_0x1dc14f){return _0x1dc14f;},Window_Base[_0x5a5150(0x20f)][_0x5a5150(0x1fc)]=function(_0x227f57,_0x18ff18,_0x495cc4){const _0x9f944f=_0x5a5150,_0x482776=_0x495cc4[_0x9f944f(0x36d)][_0x9f944f(0x1c7)](_0x227f57,_0x18ff18);return _0x495cc4[_0x9f944f(0x43e)][_0x9f944f(0x1c7)](_0x227f57,_0x18ff18,_0x482776,_0x495cc4);},Window_Base[_0x5a5150(0x20f)]['createSkillCostText']=function(_0x549a92,_0x17b11f,_0x47b304){const _0x3e7f0b=_0x5a5150,_0x4e7c01=_0x47b304[_0x3e7f0b(0x36d)]['call'](_0x549a92,_0x17b11f);return _0x47b304[_0x3e7f0b(0x37b)][_0x3e7f0b(0x1c7)](_0x549a92,_0x17b11f,_0x4e7c01,_0x47b304);},Window_Base['prototype'][_0x5a5150(0x3e1)]=function(){return'\x20';},Window_Base['prototype']['drawActorIcons']=function(_0x1c027d,_0x33525e,_0x5aa119,_0x4cc9ba){const _0x5e4650=_0x5a5150;if(!_0x1c027d)return;VisuMZ[_0x5e4650(0x22c)][_0x5e4650(0x44b)][_0x5e4650(0x1c7)](this,_0x1c027d,_0x33525e,_0x5aa119,_0x4cc9ba),this['drawActorIconsAllTurnCounters'](_0x1c027d,_0x33525e,_0x5aa119,_0x4cc9ba);},Window_Base[_0x5a5150(0x20f)]['drawActorIconsAllTurnCounters']=function(_0x243797,_0x4fa20a,_0x993afe,_0x2d7232){const _0x36ac65=_0x5a5150;_0x2d7232=_0x2d7232||0x90;const _0x506236=ImageManager[_0x36ac65(0x42e)],_0x18868a=_0x243797[_0x36ac65(0x1df)]()[_0x36ac65(0x2df)](0x0,Math[_0x36ac65(0x340)](_0x2d7232/_0x506236)),_0x178e10=_0x243797[_0x36ac65(0x4ba)]()['filter'](_0x5827a9=>_0x5827a9['iconIndex']>0x0),_0x87af2d=[...Array(0x8)['keys']()][_0x36ac65(0x30d)](_0x270b99=>_0x243797[_0x36ac65(0x309)](_0x270b99)!==0x0),_0x1f890e=[];let _0x525b0e=_0x4fa20a;for(let _0x3defc1=0x0;_0x3defc1<_0x18868a[_0x36ac65(0x2ba)];_0x3defc1++){this[_0x36ac65(0x23b)]();const _0x3081c0=_0x178e10[_0x3defc1];if(_0x3081c0)!_0x1f890e['includes'](_0x3081c0)&&this['drawActorStateTurns'](_0x243797,_0x3081c0,_0x525b0e,_0x993afe),this['drawActorStateData'](_0x243797,_0x3081c0,_0x525b0e,_0x993afe),_0x1f890e[_0x36ac65(0x4a4)](_0x3081c0);else{const _0x2d7e62=_0x87af2d[_0x3defc1-_0x178e10[_0x36ac65(0x2ba)]];this[_0x36ac65(0x30e)](_0x243797,_0x2d7e62,_0x525b0e,_0x993afe),this[_0x36ac65(0x33e)](_0x243797,_0x2d7e62,_0x525b0e,_0x993afe);}_0x525b0e+=_0x506236;}},Window_Base[_0x5a5150(0x20f)]['drawActorStateTurns']=function(_0x49cfe4,_0x330b27,_0x391577,_0x3d0631){const _0x2f55b9=_0x5a5150;if(!VisuMZ[_0x2f55b9(0x22c)]['Settings'][_0x2f55b9(0x4e8)][_0x2f55b9(0x217)])return;if(!_0x49cfe4[_0x2f55b9(0x458)](_0x330b27['id']))return;if(_0x330b27['autoRemovalTiming']===0x0)return;if(_0x330b27[_0x2f55b9(0x24c)][_0x2f55b9(0x3eb)](/<HIDE STATE TURNS>/i))return;const _0x14c0d9=_0x49cfe4[_0x2f55b9(0x47f)](_0x330b27['id']),_0x56df6f=ImageManager['iconWidth'],_0x4b84a7=ColorManager[_0x2f55b9(0x4d5)](_0x330b27);this[_0x2f55b9(0x2ac)](_0x4b84a7),this[_0x2f55b9(0x347)](_0x2f55b9(0x29f)),this[_0x2f55b9(0x3e0)]['fontBold']=!![],this[_0x2f55b9(0x3e0)][_0x2f55b9(0x2cc)]=VisuMZ[_0x2f55b9(0x22c)]['Settings'][_0x2f55b9(0x4e8)][_0x2f55b9(0x3d9)],_0x391577+=VisuMZ[_0x2f55b9(0x22c)][_0x2f55b9(0x25b)]['States'][_0x2f55b9(0x3ee)],_0x3d0631+=VisuMZ[_0x2f55b9(0x22c)][_0x2f55b9(0x25b)]['States'][_0x2f55b9(0x22f)],this['drawText'](_0x14c0d9,_0x391577,_0x3d0631,_0x56df6f,'right'),this[_0x2f55b9(0x3e0)][_0x2f55b9(0x37c)]=![],this['resetFontSettings']();},Window_Base[_0x5a5150(0x20f)][_0x5a5150(0x4dc)]=function(_0x183461,_0x14f166,_0x2d4fd7,_0x38f7e6){const _0xed1079=_0x5a5150;if(!VisuMZ[_0xed1079(0x22c)][_0xed1079(0x25b)]['States']['ShowData'])return;const _0x51f366=ImageManager[_0xed1079(0x42e)],_0x1ab0eb=ImageManager[_0xed1079(0x490)]/0x2,_0x1516e5=ColorManager[_0xed1079(0x450)]();this[_0xed1079(0x2ac)](_0x1516e5),this[_0xed1079(0x347)](_0xed1079(0x29f)),this['contents'][_0xed1079(0x37c)]=!![],this[_0xed1079(0x3e0)][_0xed1079(0x2cc)]=VisuMZ[_0xed1079(0x22c)]['Settings'][_0xed1079(0x4e8)]['DataFontSize'],_0x2d4fd7+=VisuMZ['SkillsStatesCore'][_0xed1079(0x25b)][_0xed1079(0x4e8)][_0xed1079(0x33b)],_0x38f7e6+=VisuMZ['SkillsStatesCore'][_0xed1079(0x25b)][_0xed1079(0x4e8)][_0xed1079(0x4f9)];const _0xa378=String(_0x183461[_0xed1079(0x4f3)](_0x14f166['id']));this['drawText'](_0xa378,_0x2d4fd7,_0x38f7e6,_0x51f366,'center'),this[_0xed1079(0x3e0)][_0xed1079(0x37c)]=![],this[_0xed1079(0x23b)]();},Window_Base['prototype']['drawActorBuffTurns']=function(_0x3f072b,_0x4a65e2,_0x5f06a8,_0x1a1c3e){const _0x558a90=_0x5a5150;if(!VisuMZ[_0x558a90(0x22c)][_0x558a90(0x25b)][_0x558a90(0x32f)][_0x558a90(0x217)])return;const _0x31c2d6=_0x3f072b[_0x558a90(0x309)](_0x4a65e2);if(_0x31c2d6===0x0)return;const _0x130a4d=_0x3f072b[_0x558a90(0x408)](_0x4a65e2),_0x3cb61b=ImageManager[_0x558a90(0x42e)],_0x2093a1=_0x31c2d6>0x0?ColorManager[_0x558a90(0x275)]():ColorManager[_0x558a90(0x487)]();this['changeTextColor'](_0x2093a1),this[_0x558a90(0x347)](_0x558a90(0x29f)),this[_0x558a90(0x3e0)][_0x558a90(0x37c)]=!![],this['contents'][_0x558a90(0x2cc)]=VisuMZ[_0x558a90(0x22c)][_0x558a90(0x25b)][_0x558a90(0x32f)][_0x558a90(0x3d9)],_0x5f06a8+=VisuMZ[_0x558a90(0x22c)]['Settings'][_0x558a90(0x32f)]['TurnOffsetX'],_0x1a1c3e+=VisuMZ[_0x558a90(0x22c)][_0x558a90(0x25b)][_0x558a90(0x32f)]['TurnOffsetY'],this[_0x558a90(0x381)](_0x130a4d,_0x5f06a8,_0x1a1c3e,_0x3cb61b,_0x558a90(0x470)),this[_0x558a90(0x3e0)][_0x558a90(0x37c)]=![],this[_0x558a90(0x23b)]();},Window_Base[_0x5a5150(0x20f)][_0x5a5150(0x33e)]=function(_0x497686,_0x40856d,_0x2f69bd,_0x20fa3c){const _0x14c1c1=_0x5a5150;if(!VisuMZ[_0x14c1c1(0x22c)][_0x14c1c1(0x25b)][_0x14c1c1(0x32f)]['ShowData'])return;const _0x429ca9=_0x497686['paramBuffRate'](_0x40856d),_0x52fc4d=_0x497686[_0x14c1c1(0x309)](_0x40856d),_0x21078c=ImageManager['iconWidth'],_0xa06d1b=ImageManager['iconHeight']/0x2,_0x763d04=_0x52fc4d>0x0?ColorManager['buffColor']():ColorManager[_0x14c1c1(0x487)]();this['changeTextColor'](_0x763d04),this[_0x14c1c1(0x347)](_0x14c1c1(0x29f)),this[_0x14c1c1(0x3e0)]['fontBold']=!![],this[_0x14c1c1(0x3e0)][_0x14c1c1(0x2cc)]=VisuMZ[_0x14c1c1(0x22c)][_0x14c1c1(0x25b)]['Buffs']['DataFontSize'],_0x2f69bd+=VisuMZ['SkillsStatesCore'][_0x14c1c1(0x25b)]['Buffs'][_0x14c1c1(0x33b)],_0x20fa3c+=VisuMZ[_0x14c1c1(0x22c)]['Settings'][_0x14c1c1(0x32f)][_0x14c1c1(0x4f9)];const _0x96544a=_0x14c1c1(0x325)['format'](Math[_0x14c1c1(0x437)](_0x429ca9*0x64));this[_0x14c1c1(0x381)](_0x96544a,_0x2f69bd,_0x20fa3c,_0x21078c,_0x14c1c1(0x371)),this[_0x14c1c1(0x3e0)][_0x14c1c1(0x37c)]=![],this['resetFontSettings']();},VisuMZ['SkillsStatesCore'][_0x5a5150(0x1cb)]=Window_StatusBase[_0x5a5150(0x20f)][_0x5a5150(0x29c)],Window_StatusBase[_0x5a5150(0x20f)][_0x5a5150(0x29c)]=function(_0x3baf6,_0x247839,_0x563720,_0x1a10a8){const _0x4585e4=_0x5a5150;if(_0x3baf6['isActor']())_0x247839=this[_0x4585e4(0x262)](_0x3baf6,_0x247839);this['placeExactGauge'](_0x3baf6,_0x247839,_0x563720,_0x1a10a8);},Window_StatusBase[_0x5a5150(0x20f)][_0x5a5150(0x498)]=function(_0x50a7e2,_0x5d0962,_0x469ff6,_0x1887b8){const _0x2fc8bf=_0x5a5150;if([_0x2fc8bf(0x3e5),_0x2fc8bf(0x31a)][_0x2fc8bf(0x258)](_0x5d0962[_0x2fc8bf(0x36a)]()))return;VisuMZ[_0x2fc8bf(0x22c)]['Window_StatusBase_placeGauge'][_0x2fc8bf(0x1c7)](this,_0x50a7e2,_0x5d0962,_0x469ff6,_0x1887b8);},Window_StatusBase['prototype'][_0x5a5150(0x262)]=function(_0x23ec66,_0x3a54b5){const _0x3052a4=_0x5a5150,_0x18a48e=_0x23ec66[_0x3052a4(0x3f2)]()[_0x3052a4(0x24c)];if(_0x3a54b5==='hp'&&_0x18a48e[_0x3052a4(0x3eb)](/<REPLACE HP GAUGE:[ ](.*)>/i)){if(_0x3052a4(0x49c)===_0x3052a4(0x23a))this[_0x3052a4(0x2a1)](_0x26f2ac['id']),this[_0x3052a4(0x3fe)](_0x17b1ec['id']),this[_0x3052a4(0x45c)](_0x1944af['id']);else return String(RegExp['$1']);}else{if(_0x3a54b5==='mp'&&_0x18a48e['match'](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x3a54b5==='tp'&&_0x18a48e['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x3a54b5;}},VisuMZ['SkillsStatesCore'][_0x5a5150(0x44b)]=Window_StatusBase[_0x5a5150(0x20f)][_0x5a5150(0x351)],Window_StatusBase[_0x5a5150(0x20f)]['drawActorIcons']=function(_0x4545ce,_0x4a4ac1,_0x443d2e,_0x37d5d8){const _0x1a7593=_0x5a5150;if(!_0x4545ce)return;Window_Base[_0x1a7593(0x20f)][_0x1a7593(0x351)][_0x1a7593(0x1c7)](this,_0x4545ce,_0x4a4ac1,_0x443d2e,_0x37d5d8);},VisuMZ['SkillsStatesCore'][_0x5a5150(0x315)]=Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x2f5)],Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x2f5)]=function(_0x2a359b){const _0x3e1d4d=_0x5a5150;VisuMZ[_0x3e1d4d(0x22c)][_0x3e1d4d(0x315)][_0x3e1d4d(0x1c7)](this,_0x2a359b),this['createCommandNameWindow'](_0x2a359b);},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x386)]=function(_0x278748){const _0x243239=_0x5a5150,_0x521f68=new Rectangle(0x0,0x0,_0x278748[_0x243239(0x367)],_0x278748[_0x243239(0x410)]);this[_0x243239(0x46f)]=new Window_Base(_0x521f68),this['_commandNameWindow'][_0x243239(0x4ab)]=0x0,this[_0x243239(0x3f1)](this['_commandNameWindow']),this[_0x243239(0x4c7)]();},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x21f)]=function(){const _0x2963cc=_0x5a5150;Window_Command[_0x2963cc(0x20f)][_0x2963cc(0x21f)][_0x2963cc(0x1c7)](this);if(this[_0x2963cc(0x46f)])this['updateCommandNameWindow']();},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x4c7)]=function(){const _0xd4822f=_0x5a5150,_0x470a8c=this['_commandNameWindow'];_0x470a8c[_0xd4822f(0x3e0)]['clear']();const _0x2ebd0e=this[_0xd4822f(0x276)](this[_0xd4822f(0x47e)]());if(_0x2ebd0e===_0xd4822f(0x338)&&this[_0xd4822f(0x3dd)]()>0x0){if('Ryuka'!=='tYJPh'){const _0x596af2=this[_0xd4822f(0x37e)](this[_0xd4822f(0x47e)]());let _0x4141e9=this[_0xd4822f(0x1fb)](this[_0xd4822f(0x47e)]());_0x4141e9=_0x4141e9['replace'](/\\I\[(\d+)\]/gi,''),_0x470a8c[_0xd4822f(0x23b)](),this[_0xd4822f(0x2e5)](_0x4141e9,_0x596af2),this['commandNameWindowDrawText'](_0x4141e9,_0x596af2),this['commandNameWindowCenter'](_0x4141e9,_0x596af2);}else return _0xede3a4[_0xd4822f(0x22c)][_0xd4822f(0x25b)][_0xd4822f(0x305)]['LabelOutlineWidth']||0x0;}},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x2e5)]=function(_0x2d67e2,_0x3b0019){},Window_SkillType[_0x5a5150(0x20f)]['commandNameWindowDrawText']=function(_0x37010d,_0x521513){const _0x45284f=_0x5a5150,_0x54bbe9=this[_0x45284f(0x46f)];_0x54bbe9[_0x45284f(0x381)](_0x37010d,0x0,_0x521513['y'],_0x54bbe9['innerWidth'],_0x45284f(0x371));},Window_SkillType['prototype']['commandNameWindowCenter']=function(_0x39f078,_0x461c1b){const _0x38b14f=_0x5a5150,_0x2d2541=this[_0x38b14f(0x46f)],_0x4ae503=$gameSystem[_0x38b14f(0x461)](),_0x334bbb=_0x461c1b['x']+Math[_0x38b14f(0x340)](_0x461c1b['width']/0x2)+_0x4ae503;_0x2d2541['x']=_0x2d2541[_0x38b14f(0x367)]/-0x2+_0x334bbb,_0x2d2541['y']=Math[_0x38b14f(0x340)](_0x461c1b[_0x38b14f(0x410)]/0x2);},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x431)]=function(){const _0x24f7dc=_0x5a5150;return Imported[_0x24f7dc(0x222)]&&Window_Command['prototype'][_0x24f7dc(0x431)][_0x24f7dc(0x1c7)](this);},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x395)]=function(){const _0x32ec74=_0x5a5150;if(!this[_0x32ec74(0x379)])return;const _0x565470=this[_0x32ec74(0x379)][_0x32ec74(0x267)]();for(const _0x38f831 of _0x565470){const _0x41af20=this[_0x32ec74(0x457)](_0x38f831);this[_0x32ec74(0x4ec)](_0x41af20,_0x32ec74(0x211),!![],_0x38f831);}},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x457)]=function(_0x4a2307){const _0x219a05=_0x5a5150;let _0x259109=$dataSystem[_0x219a05(0x267)][_0x4a2307];if(_0x259109[_0x219a05(0x3eb)](/\\I\[(\d+)\]/i))return _0x259109;if(this[_0x219a05(0x2ca)]()===_0x219a05(0x3af))return _0x259109;const _0x1a4dee=VisuMZ[_0x219a05(0x22c)]['Settings'][_0x219a05(0x35a)],_0x1f48d7=$dataSystem[_0x219a05(0x4c5)][_0x219a05(0x258)](_0x4a2307),_0x2b1814=_0x1f48d7?_0x1a4dee[_0x219a05(0x1f7)]:_0x1a4dee['IconStypeNorm'];return'\x5cI[%1]%2'['format'](_0x2b1814,_0x259109);},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x2c9)]=function(){const _0x3c0711=_0x5a5150;return VisuMZ[_0x3c0711(0x22c)]['Settings'][_0x3c0711(0x35a)]['CmdTextAlign'];},Window_SkillType[_0x5a5150(0x20f)]['drawItem']=function(_0x413f22){const _0x5499c5=_0x5a5150,_0xeb7a85=this[_0x5499c5(0x276)](_0x413f22);if(_0xeb7a85==='iconText'){if(_0x5499c5(0x4f7)==='jQPJc')this['drawItemStyleIconText'](_0x413f22);else{_0x42e1a8[_0x5499c5(0x3eb)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x53eb64=_0xec15d8(_0x2d5065['$1'])[_0x5499c5(0x409)]()['trim']()[_0x5499c5(0x4e2)](',');for(const _0x408e7a of _0x53eb64){_0x3bbd8c['categories'][_0x5499c5(0x4a4)](_0x408e7a[_0x5499c5(0x2dc)]());}}}else{if(_0xeb7a85===_0x5499c5(0x338)){if(_0x5499c5(0x353)!=='ZMmvk'){const _0x56cdb3=_0xd22202[_0x5499c5(0x1f5)]('['+_0x2ec9eb['$1'][_0x5499c5(0x3eb)](/\d+/g)+']');this[_0x5499c5(0x302)][_0x167e4d['id']]=this[_0x5499c5(0x302)][_0x2b3023['id']][_0x5499c5(0x4e0)](_0x56cdb3);}else this[_0x5499c5(0x289)](_0x413f22);}else Window_Command[_0x5499c5(0x20f)][_0x5499c5(0x200)][_0x5499c5(0x1c7)](this,_0x413f22);}},Window_SkillType['prototype'][_0x5a5150(0x2ca)]=function(){const _0x2b65a9=_0x5a5150;return VisuMZ['SkillsStatesCore'][_0x2b65a9(0x25b)][_0x2b65a9(0x35a)]['CmdStyle'];},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x276)]=function(_0x4fb0c2){const _0x3e0df1=_0x5a5150;if(_0x4fb0c2<0x0)return'text';const _0x4566ac=this[_0x3e0df1(0x2ca)]();if(_0x4566ac!==_0x3e0df1(0x254))return _0x4566ac;else{if(this['maxItems']()>0x0){if(_0x3e0df1(0x319)===_0x3e0df1(0x319)){const _0x388f02=this['commandName'](_0x4fb0c2);if(_0x388f02[_0x3e0df1(0x3eb)](/\\I\[(\d+)\]/i)){if(_0x3e0df1(0x1f6)!==_0x3e0df1(0x1f6))this[_0x3e0df1(0x2ec)][_0x4e0b84]--;else{const _0x5239c5=this[_0x3e0df1(0x37e)](_0x4fb0c2),_0x990aff=this[_0x3e0df1(0x25a)](_0x388f02)[_0x3e0df1(0x367)];if(_0x990aff<=_0x5239c5[_0x3e0df1(0x367)]){if(_0x3e0df1(0x4d9)!==_0x3e0df1(0x4d9)){if(this[_0x3e0df1(0x25e)]||this[_0x3e0df1(0x4cc)])return;const _0x3d9d08=_0x34236e['SkillsStatesCore']['stateEraseJS'];if(_0x3d9d08[_0x9d21])_0x3d9d08[_0x5df80d][_0x3e0df1(0x1c7)](this,_0x4105d9);}else return _0x3e0df1(0x39e);}else return _0x3e0df1(0x338);}}}else{const _0x58bb99=_0x48d98c['parse']('['+_0x253a30['$1'][_0x3e0df1(0x3eb)](/\d+/g)+']');for(const _0x382dde of _0x58bb99){if(!_0x5537a4[_0x3e0df1(0x3bd)](_0x382dde))return![];}return!![];}}}return _0x3e0df1(0x3af);},Window_SkillType['prototype']['drawItemStyleIconText']=function(_0x245512){const _0x92e694=_0x5a5150,_0x5c6e31=this[_0x92e694(0x37e)](_0x245512),_0x3a68bf=this[_0x92e694(0x1fb)](_0x245512),_0x4fcc61=this[_0x92e694(0x25a)](_0x3a68bf)[_0x92e694(0x367)];this['changePaintOpacity'](this[_0x92e694(0x1ef)](_0x245512));const _0x2a3842=this[_0x92e694(0x2c9)]();if(_0x2a3842===_0x92e694(0x470))this[_0x92e694(0x376)](_0x3a68bf,_0x5c6e31['x']+_0x5c6e31[_0x92e694(0x367)]-_0x4fcc61,_0x5c6e31['y'],_0x4fcc61);else{if(_0x2a3842===_0x92e694(0x371)){const _0x2d42af=_0x5c6e31['x']+Math['floor']((_0x5c6e31[_0x92e694(0x367)]-_0x4fcc61)/0x2);this['drawTextEx'](_0x3a68bf,_0x2d42af,_0x5c6e31['y'],_0x4fcc61);}else{if(_0x92e694(0x41e)===_0x92e694(0x41e))this['drawTextEx'](_0x3a68bf,_0x5c6e31['x'],_0x5c6e31['y'],_0x4fcc61);else{const _0x23682b=this[_0x92e694(0x46f)],_0x2cae5f=_0x3e26a1[_0x92e694(0x461)](),_0x92f309=_0x56ccf2['x']+_0x98c63b['floor'](_0x3464b6[_0x92e694(0x367)]/0x2)+_0x2cae5f;_0x23682b['x']=_0x23682b[_0x92e694(0x367)]/-0x2+_0x92f309,_0x23682b['y']=_0x130a04[_0x92e694(0x340)](_0x5a33d4[_0x92e694(0x410)]/0x2);}}}},Window_SkillType[_0x5a5150(0x20f)][_0x5a5150(0x289)]=function(_0x21f4d4){const _0x142c1b=_0x5a5150;this[_0x142c1b(0x1fb)](_0x21f4d4)['match'](/\\I\[(\d+)\]/i);const _0x4482dd=Number(RegExp['$1'])||0x0,_0x4b642c=this[_0x142c1b(0x37e)](_0x21f4d4),_0x4ca4f0=_0x4b642c['x']+Math[_0x142c1b(0x340)]((_0x4b642c[_0x142c1b(0x367)]-ImageManager[_0x142c1b(0x42e)])/0x2),_0x1ae435=_0x4b642c['y']+(_0x4b642c[_0x142c1b(0x410)]-ImageManager[_0x142c1b(0x490)])/0x2;this[_0x142c1b(0x4a3)](_0x4482dd,_0x4ca4f0,_0x1ae435);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x323)]=Window_SkillStatus['prototype'][_0x5a5150(0x463)],Window_SkillStatus[_0x5a5150(0x20f)][_0x5a5150(0x463)]=function(){const _0x4e780e=_0x5a5150;VisuMZ['SkillsStatesCore'][_0x4e780e(0x323)][_0x4e780e(0x1c7)](this);if(this[_0x4e780e(0x379)])this[_0x4e780e(0x466)]();},Window_SkillStatus[_0x5a5150(0x20f)][_0x5a5150(0x466)]=function(){const _0x3a858f=_0x5a5150;if(!Imported[_0x3a858f(0x222)])return;if(!Imported[_0x3a858f(0x306)])return;const _0x157a5c=this['gaugeLineHeight']();let _0x271a04=this[_0x3a858f(0x420)]()/0x2+0xb4+0xb4+0xb4,_0x285af7=this[_0x3a858f(0x1de)]-_0x271a04-0x2;if(_0x285af7>=0x12c){const _0x597f7f=VisuMZ[_0x3a858f(0x358)][_0x3a858f(0x25b)]['Param'][_0x3a858f(0x429)],_0x584ec9=Math[_0x3a858f(0x340)](_0x285af7/0x2)-0x18;let _0x20b5ea=_0x271a04,_0x1efa47=Math[_0x3a858f(0x340)]((this['innerHeight']-Math['ceil'](_0x597f7f[_0x3a858f(0x2ba)]/0x2)*_0x157a5c)/0x2),_0x284599=0x0;for(const _0x6634f9 of _0x597f7f){if(_0x3a858f(0x42f)===_0x3a858f(0x42f)){this[_0x3a858f(0x468)](_0x20b5ea,_0x1efa47,_0x584ec9,_0x6634f9),_0x284599++;if(_0x284599%0x2===0x0){if(_0x3a858f(0x1ea)==='DmtQQ')_0x20b5ea=_0x271a04,_0x1efa47+=_0x157a5c;else return![];}else{if('dutOm'!==_0x3a858f(0x23f)){if(typeof _0x155ebb!==_0x3a858f(0x47b))_0x2fcae5=_0x9cd451['id'];if(this[_0x3a858f(0x458)](_0xe92c48)){const _0x404cc8=_0x1f664e[_0x3a858f(0x2e2)](_0x2a50a3);this['_stateTurns'][_0x28e6de]=_0x35117a[_0x3a858f(0x1e3)](0x0,_0x404cc8);if(this[_0x3a858f(0x2ec)][_0x32fb19]<=0x0)this[_0x3a858f(0x2a1)](_0x598252);}}else _0x20b5ea+=_0x584ec9+0x18;}}else _0x3b2b72=_0x12667e[_0x3a858f(0x364)](_0xe7ffb1,_0x510924);}}this['resetFontSettings']();},Window_SkillStatus[_0x5a5150(0x20f)]['drawExtendedParameter']=function(_0x5b717c,_0xd09b8b,_0xbba4df,_0x5d044a){const _0x19db07=_0x5a5150,_0x597061=this[_0x19db07(0x214)]();this['resetFontSettings'](),this[_0x19db07(0x389)](_0x5b717c,_0xd09b8b,_0xbba4df,_0x5d044a,!![]),this['resetTextColor'](),this['contents']['fontSize']-=0x8;const _0x23c96c=this[_0x19db07(0x379)][_0x19db07(0x4ee)](_0x5d044a,!![]);this[_0x19db07(0x3e0)][_0x19db07(0x381)](_0x23c96c,_0x5b717c,_0xd09b8b,_0xbba4df,_0x597061,_0x19db07(0x470));},VisuMZ[_0x5a5150(0x22c)]['Window_SkillList_includes']=Window_SkillList['prototype'][_0x5a5150(0x258)],Window_SkillList[_0x5a5150(0x20f)][_0x5a5150(0x258)]=function(_0x469b2f){const _0x2c6de7=_0x5a5150;return this[_0x2c6de7(0x3b9)](_0x469b2f);},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x486)]=Window_SkillList[_0x5a5150(0x20f)]['maxCols'],Window_SkillList[_0x5a5150(0x20f)][_0x5a5150(0x3cf)]=function(){const _0x59e675=_0x5a5150;return SceneManager[_0x59e675(0x244)][_0x59e675(0x393)]===Scene_Battle?VisuMZ[_0x59e675(0x22c)]['Window_SkillList_maxCols']['call'](this):VisuMZ[_0x59e675(0x22c)]['Settings'][_0x59e675(0x35a)][_0x59e675(0x39f)];},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x33f)]=Window_SkillList[_0x5a5150(0x20f)][_0x5a5150(0x21c)],Window_SkillList[_0x5a5150(0x20f)]['setActor']=function(_0x35fe05){const _0x3861ce=_0x5a5150,_0x1dd956=this[_0x3861ce(0x379)]!==_0x35fe05;VisuMZ['SkillsStatesCore']['Window_SkillList_setActor']['call'](this,_0x35fe05);if(_0x1dd956){if(this[_0x3861ce(0x2ee)]&&this[_0x3861ce(0x2ee)]['constructor']===Window_ShopStatus){if(_0x3861ce(0x31e)!=='wtFYE'){this[_0x3861ce(0x23b)](),this[_0x3861ce(0x3e0)][_0x3861ce(0x280)]();const _0x1abe73=this[_0x3861ce(0x22e)];if(!_0x1abe73)return;const _0x510f7d=_0x1abe73[_0x3861ce(0x4ba)]()[_0x3861ce(0x30d)](_0x99a758=>_0x99a758['iconIndex']>0x0),_0x522fac=[..._0xc3ea64(0x8)['keys']()][_0x3861ce(0x30d)](_0x3a8540=>_0x1abe73[_0x3861ce(0x309)](_0x3a8540)!==0x0),_0x480b3f=this[_0x3861ce(0x25c)],_0x508139=_0x510f7d[_0x480b3f];if(_0x508139)_0x208bb4[_0x3861ce(0x20f)][_0x3861ce(0x2f6)][_0x3861ce(0x1c7)](this,_0x1abe73,_0x508139,0x0,0x0),_0x5a3b90[_0x3861ce(0x20f)][_0x3861ce(0x4dc)][_0x3861ce(0x1c7)](this,_0x1abe73,_0x508139,0x0,0x0);else{const _0x5caa02=_0x522fac[_0x480b3f-_0x510f7d['length']];if(_0x5caa02===_0x4b7215)return;_0x459548['prototype'][_0x3861ce(0x30e)][_0x3861ce(0x1c7)](this,_0x1abe73,_0x5caa02,0x0,0x0),_0x438ef9[_0x3861ce(0x20f)][_0x3861ce(0x33e)][_0x3861ce(0x1c7)](this,_0x1abe73,_0x5caa02,0x0,0x0);}}else this['_statusWindow']['setItem'](this[_0x3861ce(0x234)](0x0));}}},Window_SkillList[_0x5a5150(0x20f)][_0x5a5150(0x3d2)]=function(_0x3f1d2a){const _0x4eed3a=_0x5a5150;if(this['_stypeId']===_0x3f1d2a)return;this[_0x4eed3a(0x378)]=_0x3f1d2a,this[_0x4eed3a(0x463)](),this[_0x4eed3a(0x484)](0x0,0x0);if(this[_0x4eed3a(0x2ee)]&&this[_0x4eed3a(0x2ee)][_0x4eed3a(0x393)]===Window_ShopStatus){if(_0x4eed3a(0x47a)!==_0x4eed3a(0x4c0))this['_statusWindow'][_0x4eed3a(0x388)](this['itemAt'](0x0));else return _0x2a864e[_0x4eed3a(0x22c)][_0x4eed3a(0x25b)][_0x4eed3a(0x35a)][_0x4eed3a(0x30b)];}},Window_SkillList[_0x5a5150(0x20f)]['includesSkillsStatesCore']=function(_0x2cbe8f){const _0x2eb55c=_0x5a5150;if(!_0x2cbe8f)return VisuMZ[_0x2eb55c(0x22c)][_0x2eb55c(0x435)][_0x2eb55c(0x1c7)](this,_0x2cbe8f);if(!this[_0x2eb55c(0x21a)](_0x2cbe8f))return![];if(!this[_0x2eb55c(0x208)](_0x2cbe8f))return![];if(!this[_0x2eb55c(0x40f)](_0x2cbe8f))return![];return!![];},Window_SkillList['prototype'][_0x5a5150(0x21a)]=function(_0x61a31b){const _0x4b0b93=_0x5a5150;return DataManager['getSkillTypes'](_0x61a31b)[_0x4b0b93(0x258)](this['_stypeId']);},Window_SkillList['prototype']['checkShowHideNotetags']=function(_0x49829f){const _0x2efd6e=_0x5a5150;if(!VisuMZ[_0x2efd6e(0x22c)]['CheckVisibleBattleNotetags'](this[_0x2efd6e(0x379)],_0x49829f))return![];if(!VisuMZ['SkillsStatesCore']['CheckVisibleSwitchNotetags'](this[_0x2efd6e(0x379)],_0x49829f))return![];if(!VisuMZ[_0x2efd6e(0x22c)][_0x2efd6e(0x1db)](this[_0x2efd6e(0x379)],_0x49829f))return![];return!![];},VisuMZ[_0x5a5150(0x22c)]['CheckVisibleBattleNotetags']=function(_0x55c0ad,_0x316cc9){const _0x1d54b9=_0x5a5150,_0xcf768b=_0x316cc9[_0x1d54b9(0x24c)];if(_0xcf768b[_0x1d54b9(0x3eb)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x1d54b9(0x488)]())return![];else return _0xcf768b[_0x1d54b9(0x3eb)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?_0x1d54b9(0x361)!==_0x1d54b9(0x361)?_0x4a435a['SkillsStatesCore'][_0x1d54b9(0x25b)]['Skills'][_0x1d54b9(0x439)][_0x1d54b9(0x1c7)](this,_0x45158c):![]:_0x1d54b9(0x336)===_0x1d54b9(0x336)?!![]:this[_0x1d54b9(0x22e)]&&this[_0x1d54b9(0x3aa)]?this[_0x1d54b9(0x4d7)]():_0x3f1f8f[_0x1d54b9(0x22c)][_0x1d54b9(0x3c9)][_0x1d54b9(0x1c7)](this);},VisuMZ[_0x5a5150(0x22c)]['CheckVisibleSwitchNotetags']=function(_0x5106b2,_0x2e3e00){const _0x4623ef=_0x5a5150,_0x41de48=_0x2e3e00['note'];if(_0x41de48[_0x4623ef(0x3eb)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4623ef(0x272)===_0x4623ef(0x272)){const _0x1e2e2e=JSON[_0x4623ef(0x1f5)]('['+RegExp['$1'][_0x4623ef(0x3eb)](/\d+/g)+']');for(const _0x50dac3 of _0x1e2e2e){if(!$gameSwitches['value'](_0x50dac3))return![];}return!![];}else{_0x437349[_0x4623ef(0x3eb)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x252f2b=_0x2dda3d[_0x4623ef(0x462)](_0xad6792(_0x2f74f0['$1'])['toUpperCase']()),_0x67fe1=_0x160e7d(_0xc1860e['$2']);_0x252f2b>=0x0&&(_0x1ee28c[_0x4623ef(0x264)](_0x252f2b,_0x67fe1),this[_0x4623ef(0x3dc)](_0x3c4842));}}if(_0x41de48['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23b3a0=JSON[_0x4623ef(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3fbd89 of _0x23b3a0){if(_0x4623ef(0x4a7)!==_0x4623ef(0x497)){if(!$gameSwitches[_0x4623ef(0x3bd)](_0x3fbd89))return![];}else{const _0xb5aa66=_0x2c6945[_0x4623ef(0x2e2)](_0x5590dd);this[_0x4623ef(0x2ec)][_0x328472]=_0x2849fd[_0x4623ef(0x1e3)](0x0,_0xb5aa66);if(this[_0x4623ef(0x2ec)][_0x2dff2a]<=0x0)this[_0x4623ef(0x2a1)](_0x5cd8f5);}}return!![];}if(_0x41de48[_0x4623ef(0x3eb)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24efe1=JSON[_0x4623ef(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5de97f of _0x24efe1){if($gameSwitches[_0x4623ef(0x3bd)](_0x5de97f))return!![];}return![];}if(_0x41de48[_0x4623ef(0x3eb)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d202d=JSON[_0x4623ef(0x1f5)]('['+RegExp['$1'][_0x4623ef(0x3eb)](/\d+/g)+']');for(const _0x17fefe of _0x2d202d){if(!$gameSwitches['value'](_0x17fefe))return!![];}return![];}if(_0x41de48[_0x4623ef(0x3eb)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4623ef(0x34a)===_0x4623ef(0x1f2)){const _0x2c5fc4=_0x41385e(_0x1a3d69['$1']),_0x3161a7=_0x565e33[_0x4623ef(0x1e6)](_0x2c5fc4);_0x3d083b[_0x4623ef(0x22c)][_0x4623ef(0x493)][_0x43ff82['id']]=new _0x3209b9(_0x4623ef(0x403),_0x3161a7);}else{const _0x490c9c=JSON['parse']('['+RegExp['$1'][_0x4623ef(0x3eb)](/\d+/g)+']');for(const _0x3f0be9 of _0x490c9c){if(_0x4623ef(0x362)!==_0x4623ef(0x237)){if(!$gameSwitches[_0x4623ef(0x3bd)](_0x3f0be9))return!![];}else return _0x4bf268[_0x4623ef(0x21d)];}return![];}}if(_0x41de48[_0x4623ef(0x3eb)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x467a79=JSON['parse']('['+RegExp['$1'][_0x4623ef(0x3eb)](/\d+/g)+']');for(const _0x29b1cc of _0x467a79){if($gameSwitches[_0x4623ef(0x3bd)](_0x29b1cc))return![];}return!![];}return!![];},VisuMZ[_0x5a5150(0x22c)][_0x5a5150(0x1db)]=function(_0x5eb604,_0x127b38){const _0x21768f=_0x5a5150,_0x3507f2=_0x127b38[_0x21768f(0x24c)];if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x21768f(0x27b)!=='lqzaI'){const _0x30bde0=_0x6d39[_0x21768f(0x24c)];if(_0x30bde0[_0x21768f(0x3eb)](/<HIDE IN BATTLE>/i)&&_0x1a0f13[_0x21768f(0x488)]())return![];else return _0x30bde0[_0x21768f(0x3eb)](/<HIDE OUTSIDE BATTLE>/i)&&!_0x52decd[_0x21768f(0x488)]()?![]:!![];}else{const _0x37fbd1=JSON[_0x21768f(0x1f5)]('['+RegExp['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x449040 of _0x37fbd1){if(_0x21768f(0x38b)!==_0x21768f(0x383)){if(!_0x5eb604[_0x21768f(0x482)](_0x449040))return![];}else return _0x1b6a58[_0x21768f(0x22c)][_0x21768f(0x25b)][_0x21768f(0x35a)][_0x21768f(0x3d0)];}return!![];}}else{if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x46831f=RegExp['$1']['split'](',');for(const _0x6e710 of _0x46831f){const _0x329a13=DataManager[_0x21768f(0x23e)](_0x6e710);if(!_0x329a13)continue;if(!_0x5eb604[_0x21768f(0x482)](_0x329a13))return![];}return!![];}}if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d5617=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5193b6 of _0x1d5617){if(!_0x5eb604['isLearnedSkill'](_0x5193b6))return![];}return!![];}else{if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x21768f(0x339)==='safDj'){const _0x42af7d=_0x52d2e3[_0x21768f(0x22c)][_0x21768f(0x25b)][_0x21768f(0x248)]['filter'](_0x377e67=>_0x377e67[_0x21768f(0x37f)][_0x21768f(0x409)]()===_0x275989[_0x21768f(0x409)]());_0x42af7d['length']>=0x1?this[_0x21768f(0x3aa)]=_0x42af7d[0x0]:this['_costSettings']=null;}else{const _0x7cbc93=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x22dff6 of _0x7cbc93){const _0x2310e2=DataManager[_0x21768f(0x23e)](_0x22dff6);if(!_0x2310e2)continue;if(!_0x5eb604[_0x21768f(0x482)](_0x2310e2))return![];}return!![];}}}if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x48d666=JSON[_0x21768f(0x1f5)]('['+RegExp['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x242b10 of _0x48d666){if(_0x5eb604[_0x21768f(0x482)](_0x242b10))return!![];}return![];}else{if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x281780=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x266d95 of _0x281780){if('mvWcN'!==_0x21768f(0x3f8))this[_0x21768f(0x4f2)][_0x4ae570]='';else{const _0x534586=DataManager[_0x21768f(0x23e)](_0x266d95);if(!_0x534586)continue;if(_0x5eb604[_0x21768f(0x482)](_0x534586))return!![];}}return![];}}if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x6b1852=JSON[_0x21768f(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x229a45 of _0x6b1852){if(!_0x5eb604[_0x21768f(0x482)](_0x229a45))return!![];}return![];}else{if(_0x3507f2['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x21768f(0x238)===_0x21768f(0x238)){const _0x4c9d8d=RegExp['$1']['split'](',');for(const _0x3e5b77 of _0x4c9d8d){if(_0x21768f(0x2fd)==='BKQxm')this[_0x21768f(0x368)][_0x595a4c]=_0x337087(_0x2b04e8['$1']);else{const _0x556b8f=DataManager['getSkillIdWithName'](_0x3e5b77);if(!_0x556b8f)continue;if(!_0x5eb604[_0x21768f(0x482)](_0x556b8f))return!![];}}return![];}else{if(_0x3e67e9[_0x21768f(0x3bd)](_0x549222))return!![];}}}if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x21768f(0x2c7)!==_0x21768f(0x2c7))this[_0x21768f(0x270)]();else{const _0xbdeac6=JSON[_0x21768f(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3e8d67 of _0xbdeac6){if(_0x21768f(0x3e4)!==_0x21768f(0x3e4))this[_0x21768f(0x3a8)](_0xe7b57a);else{if(!_0x5eb604[_0x21768f(0x482)](_0x3e8d67))return!![];}}return![];}}else{if(_0x3507f2['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x966464=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x3ebaeb of _0x966464){const _0x5296ec=DataManager['getSkillIdWithName'](_0x3ebaeb);if(!_0x5296ec)continue;if(!_0x5eb604[_0x21768f(0x482)](_0x5296ec))return!![];}return![];}}if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ab5a4=JSON[_0x21768f(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x59f5b9 of _0x3ab5a4){if(_0x5eb604[_0x21768f(0x482)](_0x59f5b9))return![];}return!![];}else{if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x137ec6=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x2af8be of _0x137ec6){if('qwtkB'!==_0x21768f(0x1ed)){const _0x5549dc=DataManager[_0x21768f(0x23e)](_0x2af8be);if(!_0x5549dc)continue;if(_0x5eb604[_0x21768f(0x482)](_0x5549dc))return![];}else return _0x2a542e[_0x5108c6['id']][_0x21768f(0x1c7)](this,_0x40cbac);}return!![];}}if(_0x3507f2['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c6810=JSON[_0x21768f(0x1f5)]('['+RegExp['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x22bebb of _0x5c6810){if('WoEvz'==='WoEvz'){if(!_0x5eb604[_0x21768f(0x235)](_0x22bebb))return![];}else return _0x5f33e5=_0x52f7ac(_0x2418e8),this['_colorCache']=this[_0x21768f(0x480)]||{},_0x2739f1[_0x21768f(0x3eb)](/#(.*)/i)?this[_0x21768f(0x480)][_0x1e9d5a]=_0x21768f(0x4a6)[_0x21768f(0x1e6)](_0xa5a0d4(_0x2535f3['$1'])):this[_0x21768f(0x480)][_0x2cc6c8]=this[_0x21768f(0x4a1)](_0x24e58a(_0xec1d29)),this[_0x21768f(0x480)][_0x2b863d];}return!![];}else{if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3e667b=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x390020 of _0x3e667b){const _0x262119=DataManager[_0x21768f(0x23e)](_0x390020);if(!_0x262119)continue;if(!_0x5eb604['hasSkill'](_0x262119))return![];}return!![];}}if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x21768f(0x4e5)!=='hWkFD'){const _0x53efc9=JSON['parse']('['+RegExp['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x439fa6 of _0x53efc9){if(!_0x5eb604[_0x21768f(0x235)](_0x439fa6))return![];}return!![];}else{let _0x1de8f2=0x0,_0x407b51=0x0;if(_0x90cce5[_0x21768f(0x3eb)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x1de8f2=_0x4efdfb(_0x4de89d['$1']),_0x407b51=_0x49b0a0(_0x3cccc8['$2']);else _0x76329a[_0x21768f(0x3eb)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x1de8f2=_0x111cdd[_0x21768f(0x26d)](_0x304b48['$1']),_0x407b51=_0x4be92f(_0x33f42f['$2']));_0x1222d3[_0x21768f(0x4ed)](_0x1de8f2,_0x407b51),this[_0x21768f(0x3dc)](_0x1b057f);}}else{if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x435b45=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x260853 of _0x435b45){const _0x268a1e=DataManager[_0x21768f(0x23e)](_0x260853);if(!_0x268a1e)continue;if(!_0x5eb604[_0x21768f(0x235)](_0x268a1e))return![];}return!![];}}if(_0x3507f2['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x21768f(0x2c3)!=='mjxKU'){const _0x3dd102=JSON[_0x21768f(0x1f5)]('['+RegExp['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x182614 of _0x3dd102){if(_0x21768f(0x4b4)===_0x21768f(0x2f2))this[_0x21768f(0x2a1)](_0x14dbfd[_0x21768f(0x1ce)]());else{if(_0x5eb604[_0x21768f(0x235)](_0x182614))return!![];}}return![];}else{if(!_0x294bc5)return;_0x5f00de[_0x21768f(0x22c)][_0x21768f(0x44b)][_0x21768f(0x1c7)](this,_0x2d5ffa,_0x327cef,_0x252d7a,_0x16a787),this[_0x21768f(0x4b7)](_0x216c23,_0x311e6c,_0x59f430,_0x5e9f6b);}}else{if(_0x3507f2[_0x21768f(0x3eb)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x42588d=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x53617c of _0x42588d){if(_0x21768f(0x2ea)!==_0x21768f(0x2ea)){const _0x267fe8=this[_0x21768f(0x37e)](_0x67cbb8),_0x5b78fb=this[_0x21768f(0x1fb)](_0x317c51),_0x4c443b=this['textSizeEx'](_0x5b78fb)[_0x21768f(0x367)];this[_0x21768f(0x3c8)](this['isCommandEnabled'](_0x9b0799));const _0x1d6a73=this['itemTextAlign']();if(_0x1d6a73===_0x21768f(0x470))this[_0x21768f(0x376)](_0x5b78fb,_0x267fe8['x']+_0x267fe8[_0x21768f(0x367)]-_0x4c443b,_0x267fe8['y'],_0x4c443b);else{if(_0x1d6a73===_0x21768f(0x371)){const _0x3b6a22=_0x267fe8['x']+_0x24dbc5['floor']((_0x267fe8[_0x21768f(0x367)]-_0x4c443b)/0x2);this[_0x21768f(0x376)](_0x5b78fb,_0x3b6a22,_0x267fe8['y'],_0x4c443b);}else this[_0x21768f(0x376)](_0x5b78fb,_0x267fe8['x'],_0x267fe8['y'],_0x4c443b);}}else{const _0x2bd4b6=DataManager['getSkillIdWithName'](_0x53617c);if(!_0x2bd4b6)continue;if(_0x5eb604[_0x21768f(0x235)](_0x2bd4b6))return!![];}}return![];}}if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36ad13=JSON[_0x21768f(0x1f5)]('['+RegExp['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x4923b8 of _0x36ad13){if(!_0x5eb604['hasSkill'](_0x4923b8))return!![];}return![];}else{if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x31e19d=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x473a5f of _0x31e19d){if(_0x21768f(0x1d4)===_0x21768f(0x1d4)){const _0x3d8831=DataManager[_0x21768f(0x23e)](_0x473a5f);if(!_0x3d8831)continue;if(!_0x5eb604['hasSkill'](_0x3d8831))return!![];}else return this[_0x21768f(0x460)][_0xca0d5c]||0x0;}return![];}}if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x21768f(0x29e)===_0x21768f(0x38f))_0x51a244['SkillsStatesCore'][_0x21768f(0x25b)][_0x21768f(0x32f)]['onExpireBuffJS'][_0x21768f(0x1c7)](this,_0x428fe4);else{const _0x2789b3=JSON[_0x21768f(0x1f5)]('['+RegExp['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x4d10e3 of _0x2789b3){if(!_0x5eb604[_0x21768f(0x235)](_0x4d10e3))return!![];}return![];}}else{if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1b9dd1=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x1efbf7 of _0x1b9dd1){if(_0x21768f(0x313)==='CFvVO'){const _0x2beb81=DataManager[_0x21768f(0x23e)](_0x1efbf7);if(!_0x2beb81)continue;if(!_0x5eb604[_0x21768f(0x235)](_0x2beb81))return!![];}else{const _0x2ce9e2=this[_0x21768f(0x1fb)](_0x332b89);if(_0x2ce9e2[_0x21768f(0x3eb)](/\\I\[(\d+)\]/i)){const _0x174f89=this['itemLineRect'](_0x56ed87),_0x4b6cba=this[_0x21768f(0x25a)](_0x2ce9e2)[_0x21768f(0x367)];return _0x4b6cba<=_0x174f89[_0x21768f(0x367)]?_0x21768f(0x39e):_0x21768f(0x338);}}}return![];}}if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('kesHK'!==_0x21768f(0x288)){const _0x316280=JSON[_0x21768f(0x1f5)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3eec82 of _0x316280){if(_0x5eb604[_0x21768f(0x235)](_0x3eec82))return![];}return!![];}else this[_0x21768f(0x3c5)](_0x755bd0);}else{if(_0x3507f2[_0x21768f(0x3eb)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('LeYkO'!==_0x21768f(0x46b)){const _0x2430c7=_0x2e2304['parse']('['+_0x3ba108['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x11887b of _0x2430c7){if(_0x3b9d27['isLearnedSkill'](_0x11887b))return![];}return!![];}else{const _0x3b4ca9=RegExp['$1'][_0x21768f(0x4e2)](',');for(const _0x29efea of _0x3b4ca9){if(_0x21768f(0x35f)===_0x21768f(0x245)){const _0x14587d=_0x17257a[_0x21768f(0x1f5)]('['+_0x27f6f0['$1'][_0x21768f(0x3eb)](/\d+/g)+']');for(const _0x2af3d3 of _0x14587d){if(_0x5f3e3a[_0x21768f(0x3bd)](_0x2af3d3))return!![];}return![];}else{const _0x4bcf0c=DataManager[_0x21768f(0x23e)](_0x29efea);if(!_0x4bcf0c)continue;if(_0x5eb604['hasSkill'](_0x4bcf0c))return![];}}return!![];}}}return!![];},Window_SkillList[_0x5a5150(0x20f)][_0x5a5150(0x40f)]=function(_0x271ce2){const _0x4688ba=_0x5a5150,_0xe906ec=_0x271ce2[_0x4688ba(0x24c)],_0x56b6ba=VisuMZ[_0x4688ba(0x22c)][_0x4688ba(0x1fa)];if(_0x56b6ba[_0x271ce2['id']]){if(_0x4688ba(0x31d)!==_0x4688ba(0x31d)){const _0x5dec90=_0x290c61['$1'][_0x4688ba(0x4e2)](',');for(const _0x35e9f8 of _0x5dec90){const _0x56261a=_0x4a8297[_0x4688ba(0x4bc)](_0x35e9f8);if(_0x56261a)this[_0x4688ba(0x302)][_0x1e707c['id']][_0x4688ba(0x4a4)](_0x56261a);}}else return _0x56b6ba[_0x271ce2['id']][_0x4688ba(0x1c7)](this,_0x271ce2);}else{if('HxwJt'===_0x4688ba(0x22a))this['isDebuffAffected'](_0x48ea65)&&(_0x3d9779+=this[_0x4688ba(0x408)](_0x203b2e),this[_0x4688ba(0x440)](_0x2db5b8,_0x55ec42));else return!![];}},VisuMZ[_0x5a5150(0x22c)]['Window_SkillList_drawItem']=Window_SkillList[_0x5a5150(0x20f)][_0x5a5150(0x200)],Window_SkillList[_0x5a5150(0x20f)][_0x5a5150(0x200)]=function(_0x48e02c){const _0x33a919=_0x5a5150,_0x1d31ac=this['itemAt'](_0x48e02c),_0x46928a=_0x1d31ac?_0x1d31ac[_0x33a919(0x398)]:'';if(_0x1d31ac)this[_0x33a919(0x2e6)](_0x1d31ac);VisuMZ[_0x33a919(0x22c)][_0x33a919(0x2f4)][_0x33a919(0x1c7)](this,_0x48e02c);if(_0x1d31ac)_0x1d31ac[_0x33a919(0x398)]=_0x46928a;},Window_SkillList[_0x5a5150(0x20f)][_0x5a5150(0x2e6)]=function(_0x515395){const _0x50f117=_0x5a5150;if(_0x515395&&_0x515395[_0x50f117(0x24c)][_0x50f117(0x3eb)](/<LIST NAME:[ ](.*)>/i)){_0x515395['name']=String(RegExp['$1'])[_0x50f117(0x2dc)]();for(;;){if(_0x515395[_0x50f117(0x398)]['match'](/\\V\[(\d+)\]/gi)){if(_0x50f117(0x397)==='UUgOn')return _0x50f117(0x4a6)['format'](_0x1b4fc9(_0xc69dbf['$1']));else _0x515395[_0x50f117(0x398)]=_0x515395['name'][_0x50f117(0x401)](/\\V\[(\d+)\]/gi,(_0x1fdd07,_0x228a01)=>$gameVariables['value'](parseInt(_0x228a01)));}else{if('Zzomz'!==_0x50f117(0x2da))_0x4461e4+=this[_0x50f117(0x408)](_0x5ad963),this[_0x50f117(0x440)](_0x546375,_0x1f7000);else break;}}}},Window_SkillList['prototype'][_0x5a5150(0x2a5)]=function(_0x4e9d9f,_0x2bfe95,_0x33a8fb,_0x4941d1){const _0x43fff1=_0x5a5150;Window_Base['prototype']['drawSkillCost'][_0x43fff1(0x1c7)](this,this[_0x43fff1(0x379)],_0x4e9d9f,_0x2bfe95,_0x33a8fb,_0x4941d1);},Window_SkillList['prototype'][_0x5a5150(0x4cf)]=function(_0x4c0fc9){const _0x27c0c8=_0x5a5150;this[_0x27c0c8(0x2ee)]=_0x4c0fc9,this[_0x27c0c8(0x21f)]();},VisuMZ[_0x5a5150(0x22c)]['Window_SkillList_updateHelp']=Window_SkillList[_0x5a5150(0x20f)]['updateHelp'],Window_SkillList[_0x5a5150(0x20f)]['updateHelp']=function(){const _0x3e5190=_0x5a5150;VisuMZ['SkillsStatesCore'][_0x3e5190(0x4cd)][_0x3e5190(0x1c7)](this),this[_0x3e5190(0x2ee)]&&this[_0x3e5190(0x2ee)]['constructor']===Window_ShopStatus&&(_0x3e5190(0x434)!=='TsAYg'?(_0x530383[_0x3e5190(0x20f)][_0x3e5190(0x3f7)][_0x3e5190(0x1c7)](this,_0xd101fd),this['onEraseDebuffGlobalJS'](_0x19b178)):this[_0x3e5190(0x2ee)][_0x3e5190(0x388)](this['item']()));};function _0xc21d(){const _0x188a06=['isStateCategoryAffected','redraw','onAddDebuffJS','ARRAYSTR','drawActorIcons','xlyWm','ZMmvk','item','Scene_Skill_itemWindowRect','isStateCategoryResisted','Scene_Boot_onDatabaseLoaded','CoreEngine','greater','Skills','overwriteBuffTurns','lineHeight','setupSkillsStatesCore','Game_BattlerBase_buffIconIndex','LecUg','yZUFd','FBxWJ','FBRBu','onExpireDebuff','max','buffLength','totalStateCategory','width','_stateMaxTurns','meetsPassiveStateConditions','toLowerCase','actor','Parse_Notetags_State_PassiveJS','CalcJS','increaseBuff','dnqOW','Parse_Notetags_Skill_JS','center','shopStatusWidth','applyStateCategoryRemovalEffects','categories','RnJSc','drawTextEx','removeStatesAuto','_stypeId','_actor','log','TextJS','fontBold','_hidden','itemLineRect','Name','Scene_Skill_createItemWindow','drawText','removeStatesByCategoryAll','vtwth','setPassiveStateSlipDamageJS','boxWidth','createCommandNameWindow','gainHp','setItem','drawParamText','skillMpCost','fcHiZ','POSITIVE','mainCommandWidth','Game_BattlerBase_refresh','LCoHl','xbBbM','_turnDisplaySprite','AdDmA','constructor','isBuffOrDebuffAffected','makeCommandList','IcFEH','ZsUZI','name','clearStates','ABqNr','isGroupDefeatStateAffected','stateEraseJS','RefreshCacheVar','iconText','ListWindowCols','aQNvQ','_subject','groupDefeat','onExpireStateJS','_stateData','death','MatchLabelColor','rRMev','onExpireStateCustomJS','ZanIz','_costSettings','VisuMZ_2_ClassChangeSystem','onAddState','damage','bgaai','text','CanPayJS','Game_Battler_addDebuff','Global','iOfAS','allBattleMembers','enemy','isStateRemoved','createTurnDisplaySprite','ALL','includesSkillsStatesCore','forgetSkill','rCzNc','valueOutlineColor','value','clearStateRetainType','xgaWF','test','gaugeBackColor','valueFontFace','Game_Battler_isStateAddable','stateHpSlipHealJS','onExpireDebuffGlobalJS','recoverAll','CheckVisibleSwitchNotetags','changePaintOpacity','Sprite_Gauge_currentValue','XVtzy','ogDfL','Parse_Notetags_State_SlipEffectJS','CheckIncompatibleStates','rjxxG','maxCols','EnableLayout','ColorPositive','setStypeId','aKyVZ','Sprite_Gauge_initMembers','VisuMZ_1_ElementStatusCore','applyDebuffTurnManipulationEffects','<actor-%1>','setStateDisplay','TurnFontSize','isAllDead','getCurrentStateOriginKey','makeSuccess','maxItems','onChange','hide','contents','skillCostSeparator','iiAHD','13005guaukC','nPCUS','none','description','ARRAYEVAL','itemWindowRectSkillsStatesCore','buffIconIndex','_currentActor','match','labelColor','LfmsY','TurnOffsetX','passiveStates','version','addChild','currentClass','ActionEndUpdate','initMembersSkillsStatesCore','getClassIdWithName','checkCacheKey','onEraseDebuff','mvWcN','744695hHPBQt','Scene_Skill_skillTypeWindowRect','isRightInputMode','EVAL','add','onExpireState','applyStateTurnManipulationEffects','meetsSkillConditionsGlobalJS','replace','HswFv','stateId','updateFrame','_skills','1092330pXMASA','PTcfX','buffTurns','toUpperCase','active','skills','Game_BattlerBase_meetsSkillConditions','GhALQ','mpCost','checkShowHideJS','height','onEraseBuffGlobalJS','removeBuff','TurnEndOnMap','xjVXo','STR','Game_BattlerBase_traitsSet','_buffs','commandNameWindowCenter','HHkCB','Sprite_Gauge_redraw','_categoryWindow','HrdBT','slipTp','hwRuB','keys','colSpacing','passiveStateObjects','_result','eraseBuff','Game_Battler_addBuff','OOvjM','adjustItemWidthByShopStatus','updateStateTurns','uiMenuStyle','DisplayedParams','onAddStateGlobalJS','remove','Sprite_Gauge_gaugeRate','wfZUJ','iconWidth','Ahtae','Game_BattlerBase_increaseBuff','isUseModernControls','shopStatusWindowRect','setStateOrigin','TsAYg','Window_SkillList_includes','isAlive','round','convertTargetToStateOriginKey','SkillConditionJS','buttonAssistText1','bsKaa','addPassiveStatesTraitSets','MDF','ShowJS','isUseSkillsStatesCoreUpdatedLayout','setStateTurns','createSkillCostText','jvhuw','isSceneBattle','Sprite_Gauge_setup','XzLNV','recover\x20all','currentDisplayedValue','eRmgQ','hpDamage','labelOutlineWidth','Window_StatusBase_drawActorIcons','stateMpSlipHealJS','8052ocMAqT','hDJtv','SkillSceneAdjustSkillList','normalColor','zPhmI','fontFace','testApply','mpOIT','isStateResist','KuidI','makeCommandName','isStateAffected','gradientFillRect','iconIndex','_checkingTraitsSetSkillsStatesCore','onExpireStateGlobalJS','Game_BattlerBase_eraseState','meetsPassiveStateConditionSwitches','gsoMC','_buffTurns','windowPadding','indexOf','refresh','RrTaL','aDKoP','drawExtendedSkillsStatesCoreStatus','isBuffPrevented','drawExtendedParameter','DqjBu','RMuHm','LeYkO','addPassiveStatesByNotetag','statesByCategory','ParseAllNotetags','_commandNameWindow','right','resetTextColor','stateMpSlipDamageJS','menuActor','nmMep','isStateAddable','reset','<troop-%1>','isStateRestrict','gainMp','fGROX','number','tZQYs','OYeBJ','index','stateTurns','_colorCache','onAddBuff','isLearnedSkill','fillRect','scrollTo','stateCategoriesResisted','Window_SkillList_maxCols','debuffColor','inBattle','PresetLabelGaugeColor','IoElR','updateTurnDisplaySprite','Ljkgt','stepsForTurn','updateVisibility','Game_Actor_forgetSkill','iconHeight','ColorNeutral','currentMaxValue','stateExpireJS','NDvKu','ebOKS','makeAdditionalSkillCostText','Jtxdq','placeExactGauge','Game_BattlerBase_resetStateCounts','_states','addState','ZmzEu','fZMaT','_lastStatesActionEndFrameCount','eraseState','LUK','textColor','outlineColor','drawIcon','push','onEraseDebuffGlobalJS','#%1','PfwlZ','MultiplierJS','fCbnh','Game_Actor_skillTypes','opacity','tgptZ','toRwm','Atuts','Sprite_StateIcon_updateFrame','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_BattlerBase_recoverAll','meetsPassiveStateGlobalConditionJS','uwGVs','MqTzN','equips','onAddStateJS','drawActorIconsAllTurnCounters','xjqTL','gNlqR','states','YdOBR','getStypeIdWithName','learnSkill','yWfqJ','onAddDebuff','DmiCk','ARRAYNUM','aliveMembers','2201352wUvBjI','applySkillsStatesCoreEffects','magicSkills','EOcLz','updateCommandNameWindow','Actor','vCVpG','onAddBuffGlobalJS','action','_tempBattler','Window_SkillList_updateHelp','DEF','setStatusWindow','addDebuff','onEraseStateJS','canClearState','_stored_state-%1-color','_skillTypeWindow','stateColor','convertPassiveStates','currentValueSkillsStatesCore','SkillMenuStatusRect','HYomw','Game_BattlerBase_isStateResist','NEGATIVE','drawActorStateData','status','cXCqG','562bvDUMA','concat','Game_Unit_isAllDead','split','<enemy-%1>','_stateIDs','LJnDg','gaugeRate','MatchLabelGaugeColor','States','Game_Troop_setup','meetsSkillConditions','ValueFontMainType','addCommand','addStateTurns','paramValueByName','Parse_Notetags_State_ApplyRemoveLeaveJS','getColor','yxpaQ','_stateDisplay','getStateDisplay','testSkillStatesCoreNotetags','Game_Unit_deadMembers','_phase','jQPJc','_stateSteps','DataOffsetY','process_VisuMZ_SkillsStatesCore_Notetags','_cache','meetsSkillConditionsEnableJS','kedMC','ATK','wHlNC','_skillIDs','createItemWindow','createAllSkillCostText','call','VWlRy','OkaCh','getStateData','Window_StatusBase_placeGauge','heaES','_stored_buffColor','shift','Sprite_Gauge_currentMaxValue','anchor','statePassiveConditionJS','isSkillTypeMatchForUse','setStateData','jIqnG','Game_Action_applyItemUserEffect','Game_BattlerBase_eraseBuff','allowCreateShopStatusWindow','gainSilentTp','RefreshCacheSwitch','getStateOrigin','CheckVisibleSkillNotetags','getStateOriginByKey','clearStateOrigin','innerWidth','allIcons','isSkillHidden','currentMaxValueSkillsStatesCore','VibLi','clamp','vBRTc','_itemWindow','format','onAddBuffJS','isPassiveStateStackable','LIHnn','DmtQQ','AGI','frameCount','UqfoF','fvDQv','isCommandEnabled','QzQFl','iwEWR','oVrXB','onEraseBuff','loadBitmap','parse','ZVONF','IconStypeMagic','bitmap','STRUCT','skillVisibleJS','commandName','isSkillCostShown','onRemoveState','helpAreaHeight','CheckVisibleBattleNotetags','drawItem','isPartyAllAffectedByGroupDefeatStates','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_BattlerBase_clearStates','ikRLv','checkSkillConditionsNotetags','state','upPXe','checkShowHideNotetags','buSdV','statusWindowRectSkillsStatesCore','recalculateSlipDamageJS','MaxTurns','eeLoR','shopStatusWindowRectSkillsStatesCore','prototype','PWYpv','skill','GJpQj','removeStatesByCategory','gaugeLineHeight','applyItemUserEffect','ColorDebuff','ShowTurns','gLXsw','onEraseStateGlobalJS','checkSkillTypeMatch','setup','setActor','buttonAssistSwitch','<member-%1>','callUpdateHelp','statusWindowRect','MAT','VisuMZ_0_CoreEngine','createPassiveStatesCache','eAxDv','onRegenerateCustomStateDamageOverTime','isStateExpired','_stateRetainType','RqhYx','getStateRetainType','nUizY','addPassiveStatesFromOtherPlugins','SkillsStatesCore','ColorBuff','_battler','TurnOffsetY','endAction','applyBuffTurnManipulationEffects','18OfzxCv','StackBuffMax','itemAt','hasSkill','createShopStatusWindow','voAGP','pwprz','currentValue','kNOKb','resetFontSettings','usableSkills','stateTpSlipHealJS','getSkillIdWithName','dutOm','skillTpCost','ReapplyRules','maxSlipDamage','GaugeDrawJS','_scene','pqihu','_stored_debuffColor','kUKLS','Costs','LabelFontMainType','ShowShopStatus','autoRemovalTiming','note','getCurrentStateActiveUser','Game_BattlerBase_skillMpCost','kTnlf','valueOutlineWidth','ILndN','Game_BattlerBase_skillTpCost','onEraseBuffJS','auto','qzyzG','ORkfr','uiHelpPosition','includes','OYOMc','textSizeEx','Settings','_animationIndex','addPassiveStatesByPluginParameters','_tempActor','debuffTurns','LayoutStyle','JhkWc','convertGaugeTypeSkillsStatesCore','HEdNX','addDebuffTurns','paySkillCost','ParseClassIDs','skillTypes','PassiveStates','Game_Battler_regenerateAll','process_VisuMZ_SkillsStatesCore_State_Notetags','QDxnE','initMembers','getStateIdWithName','Game_Action_testApply','Parse_Notetags_Skill_Cost','clearStatesWithStateRetain','GTSee','KmZJw','skillId','Uwjib','buffColor','commandStyleCheck','addBuff','clearStateDisplay','stateData','stateHpSlipDamageJS','lqzaI','alsWn','slipHp','tpCost','removeOtherStatesOfSameCategory','clear','makeCurrentTroopUniqueID','map','_checkingVisuMzPassiveStateObjects','SakYg','Game_BattlerBase_states','GlhaF','ColorNegative','UmEgo','drawItemStyleIcon','51swdLek','isSkillUsableForAutoBattle','tGJsP','commandNameWindowDrawText','OWXQF','mainAreaHeight','getCurrentTroopUniqueID','onAddStateMakeCustomSlipValues','uiInputPosition','resetStateCounts','tAeAW','addBuffTurns','Game_BattlerBase_overwriteBuffTurns','isBottomHelpMode','MAXHP','yLgqN','addPassiveStates','_currentTroopUniqueID','placeGauge','epElL','mSboN','rgba(0,\x200,\x200,\x201)','restriction','removeState','stateAddJS','skillTypeWindowRect','ConvertParams','drawSkillCost','labelFontFace','NYXBp','WJCZP','regenerateAll','skillEnableJS','737ossRaU','changeTextColor','totalStateCategoryAffected','aaOaI','Parse_Notetags_State_Category','helpWindowRect','Game_Battler_addState','Game_BattlerBase_decreaseBuff','isBuffExpired','user','onExpireDebuffJS','priority','_stateOrigin','ValueOutlineWidth','mainAreaTop','length','NzSdN','slipMp','onExpireBuffGlobalJS','BattleManager_endAction','fadQh','meetsPassiveStateConditionJS','mpDamage','VisuMZ_1_ItemsEquipsCore','MuYXF','FUNC','Game_Switches_onChange','nleco','DfyrB','wvFfE','itemTextAlign','commandStyle','traitObjects','fontSize','mainFontSize','isBuffAffected','Enemy','AAPoz','members','process_VisuMZ_SkillsStatesCore_Skill_Notetags','PassiveConditionJS','exit','redrawSkillsStatesCore','enemyId','getColorDataFromPluginParameters','regenerateAllSkillsStatesCore','canPaySkillCost','Zzomz','getStateReapplyRulings','trim','traitsSet','setStateRetainType','slice','actions','IepXl','stateMaximumTurns','HiddenSkillTypes','ANY','commandNameWindowDrawBackground','alterSkillName','GroupDigits','calcWindowHeight','iCQfc','dtlFs','decreaseBuff','_stateTurns','Mmaar','_statusWindow','labelFontSize','helpWindowRectSkillsStatesCore','onDatabaseLoaded','fEzgj','yPHeH','Window_SkillList_drawItem','initialize','drawActorStateTurns','_checkingPassiveStates','PayJS','oNjWJ','updateStatesActionEnd','makeResistedStateCategories','BGrmr','ZPMKH','stateTpSlipDamageJS','ParseSkillNotetags','_shopStatusWindow','_endingBattle','_stypeIDs','_passiveStateResults','yOQNx','Gauge','VisuMZ_1_MainMenuCore','updatedLayoutStyle','GaugeMaxJS','buff','setBuffTurns','CmdStyle','3171120oieoQN','filter','drawActorBuffTurns','StusL','LabelOutlineSolid','isPlaytest','RBUCM','CFvVO','rgba(0,\x200,\x200,\x200)','Window_SkillType_initialize','die','statusWidth','mainFontFace','TnMfK','untitled','itemWindowRect','Game_BattlerBase_die','WAIal','wtFYE','UsOac','gaugeColor1','isDebuffAffected','hasState','Window_SkillStatus_refresh','nLHfz','%1%','Sprite_StateIcon_loadBitmap','setDebuffTurns','onAddStateCustomJS','Game_Variables_onChange','lrojs','deadMembers','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','drawFullGauge','Scene_Skill_statusWindowRect','Buffs','_classIDs','meetsPassiveStateConditionClasses','NEFxO','vFsUQ','numberFontFace','BattleHiddenSkillTypes','XqZWC','skillTypeWindowRectSkillsStatesCore','icon','zJtWh','LabelOutlineWidth','DataOffsetX','multiclasses','checkSkillConditionsSwitchNotetags','drawActorBuffRates','Window_SkillList_setActor','floor','ignore','onEraseStateCustomJS','wVDyn','heal','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','onExpireBuffJS','changeOutlineColor','hasStateCategory','dmntA','bFZVw','MAXMP','JSON'];_0xc21d=function(){return _0x188a06;};return _0xc21d();}