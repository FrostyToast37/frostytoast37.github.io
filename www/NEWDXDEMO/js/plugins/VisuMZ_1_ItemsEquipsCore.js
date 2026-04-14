//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.41;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.41] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
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
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
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
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
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
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"true","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
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
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
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
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
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
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

function _0x5ada(_0x4354c9,_0x4adc41){const _0xd849fd=_0xd849();return _0x5ada=function(_0x5ada11,_0x336588){_0x5ada11=_0x5ada11-0x7e;let _0x2c4023=_0xd849fd[_0x5ada11];return _0x2c4023;},_0x5ada(_0x4354c9,_0x4adc41);}const _0xc574cd=_0x5ada;function _0xd849(){const _0x36ba27=['ShopScene','buttonAssistKey3','LabelRemove','uFIHJ','removeBuff','eiFJY','FontFace','TLzZc','?????','loadPicture','bXjdT','itemEnableJS','_newLabelOpacity','ayBqT','spTFN','nonOptimizeEtypes','floor','YyAjh','slotWindowRectItemsEquipsCore','createItemWindow','currentExt','isShiftShortcutKeyForRemove','isUseItemsEquipsCoreUpdatedLayout','+%1%','_itemData','wWRwx','Window_ItemCategory_initialize','setHelpWindow','isPlaytest','kFPxd','Scene_Equip_onSlotOk','armor-%1','category','includes','POJXD','ItemsEquipsCore','JehkP','New','Scene_Shop_goldWindowRect','NSDex','onSellOk','aKgue','cLhTn','FUNC','addItemCategories','refresh','xdkgu','_sellWindow','GTQQw','dlxEz','repeats','drawPossession','icon','Scene_Shop_onSellCancel','height','Parse_Notetags_Category','getMenuImage','trim','PIVPJ','cursorLeft','CAFHp','setHandler','drawItemData','CVGFH','nqvYF','JHgji','playBuzzerSound','mjnir','ytyNZ','clear','LAREf','refreshCursor','HmJUk','MaxItems','cIVQh','updateHelp','TP\x20DAMAGE','uiHelpPosition','removeBattleTestArtifacts','Tqzwv','split','getItemEffectsTpDamageLabel','text','drawItemEffectsTpRecovery','33sFoOuA','show','createSlotWindow','actor','buy','cYTbI','PHsrO','getMatchingInitEquip','CmdIconEquip','isBottomHelpMode','traitObjects','_doubleTouch','Scene_Shop_categoryWindowRect','drawParamText','call','keyItem','HdrTt','QCZeE','CmdTextAlign','_bypassReleaseUnequippableItemsItemsEquipsCore','log','Window_ShopBuy_item','JZhdq','Jmfkz','ZsWna','drawItemDamageElement','updatedLayoutStyle','ElementNone','PacIK','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Game_Actor_equips_artifacts','Scene_Shop_onSellOk','iixPj','RDxdq','discardEquip','NyhRF','canEquip','_shopStatusMenuAlly','DAMAGE\x20MULTIPLIER','MaxMP','getItemEffectsRemovedStatesBuffsLabel','itemPadding','prototype','HrLyJ','GnWXF','Game_BattlerBase_canEquip_artifact','isGoodShown','background','drawItemEquipType','cCfkK','DKflr','ScopeRandomEnemies','gainItem','object','_itemIDs','activate','Step3Start','left','KeyItems','processCursorHomeEndTrigger','_money','addEquipCommand','itemDataFontSize','MDF','isSkill','isEnabled','fillRect','\x5cI[%1]','item-%1','_purchaseOnly','zECKy','yfwGU','down','FadeSpeed','nwlrI','placeItemNewLabel','money','helpWindowRect','Scene_Shop_prepare','process_VisuMZ_ItemsEquipsCore_RegExp','value1','pageup','ParseWeaponNotetags','ElementWeapon','status','Slots','equipAdjustHpMp','IncludeShopItem','Scene_Equip_createSlotWindow','round','Step2Start','cursorPageup','process_VisuMZ_ItemsEquipsCore_EquipSlots','changeEquipById','_categoryWindow','iKdxP','KKFsw','changePaintOpacity','getItemRepeatsLabel','nhkzy','commandEquip','goldWindowRect','processCursorMove','PoOWg','jEmJc','CommandAddOptimize','onSellCancel','getEmptyEquipSlotOfSameEtype','effects','Scene_Equip_itemWindowRect','setupItemDamageTempActors','currentSymbol','textWidth','RWwMs','Game_Actor_forceChangeEquip','Param','4390897rGiDae','VKloP','IconSet','powerUpColor','fnSud','KWPVS','buttonAssistRemove','blt','getItemEffectsRemovedStatesBuffsText','kSpew','ParseArmorNotetags','AllArmors','ItemScene','onTouchSelectModernControls','Scene_Item_itemWindowRect','_commandWindow','sellingPrice','ActorResetEquipSlots','commandNameWindowCenter','BuyPriceJS','drawUpdatedParamValueDiff','addItemCategory','canUse','numberWindowRect','isArmor','Game_Actor_tradeItemWithParty','HP\x20RECOVERY','_buttonAssistWindow','prepare','mainFontSize','CmdIconClear','WZrRG','pvtbQ','hideAdditionalSprites','cXdqg','Parse_Notetags_EnableJS','Scene_Shop_onCategoryCancel','setObject','Categories','ItemMenuStatusRect','Window_ShopBuy_price','drawUpdatedParamName','cvVHR','gwMLs','ILtaU','paramJS','prepareItemCustomData','LHFsr','AWNZE','calcWindowHeight','EFFECT_ADD_BUFF','systemColor','weaponTypes','colSpacing','atk','drawCurrencyValue','isWeapon','ParseItemNotetags','EFFECT_ADD_STATE','aBEiw','NKgyt','isMainMenuCoreMenuImageOptionAvailable','QeZTG','processShiftRemoveShortcut','6449890vGYbtB','defaultItemMax','getInputMultiButtonStrings','_buyWindow','kJbFZ','drawItemHitType','FontSize','isClicked','processCursorMoveModernControls','drawText','splice','LabelDamageTP','hDBFx','Scene_Item_categoryWindowRect','acgwh','buttonAssistCategory','Scene_Shop_commandBuy','_equips','Speed0','drawIcon','determineBaseSellingPrice','SkvLM','Scene_Shop_buyWindowRect','NeverUsable','getItemOccasionText','drawItemEffectsHpRecovery','addSellCommand','ceil','drawNewLabelText','OlDLc','HRjUL','checkShiftRemoveShortcut','Width','Consumable','drawItemEffectsHpDamage','_bypassNewLabel','categoryNameWindowCenter','refreshActorEquipSlotsIfUpdated','tqhIZ','_tempActorA','isOptimizeCommandAdded','proxyItem','ESpvN','Game_Party_gainItem_artifact','RemoveEquipIcon','callUpdateHelp','HCyMB','HmEQx','isOptimizeCommandEnabled','rateMP','getInputButtonString','changeEquip','Scope%1','isEquipChangeOk','getItemEffects','%1-%2','TNFco','vrLLK','Game_Actor_paramPlus','setNewItem','drawItemOccasion','hsVNy','Game_Actor_artifact','cZpJS','Scene_ItemBase_activateItemWindow','Window_EquipCommand_initialize','_scrollDuration','commandBuyItemsEquipsCore','qQcgZ','ScopeAlliesButUser','width','createSellWindow','DrawEquipData','LabelDamageMP','ARRAYSTRUCT','LabelSelfGainTP','Step1End','NonRemoveETypes','aDkwC','playOkSound','getItemRepeatsText','match','Window_ItemList_updateHelp','REMOVED\x20EFFECTS','pop','_statusWindow','DAqvz','Scene_Shop_createCategoryWindow','drawItemConsumable','statusWindowRectItemsEquipsCore','HP\x20DAMAGE','equipTypes','_data','equip','baseSellingPrice','VisuMZ_1_BattleCore','jtCJw','getItemConsumableLabel','wtypeId','zxwlN','Speed2000','VFpwV','getItemDamageAmountText','isCancelled','STRUCT','hideNewLabelSprites','EquipParams','jAFCV','getItemEffectsTpRecoveryLabel','updateChangedSlots','successRate','optimizeEquipments','kTNvW','LuhNJ','59767ykCzpj','helpDesc','setBackgroundType','_newLabelOpacityUpperLimit','MEsbE','drawActorParamDifference','Step2End','sENgU','helpAreaTop','getItemDamageElementText','isTroopArtifact','damageColor','JrwpM','ParseAllNotetags','IiPdV','isTriggered','isSoleWeaponType','RegExp','Step3End','statusWindowRect','StatusWindowWidth','adjustItemWidthByStatus','cursorPagedown','addBuyCommand','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Blacklist','JSON','DrawBackRect','BackRectColor','CommandAddClear','ParamChangeFontSize','UCBiu','OQNOn','updateCategoryNameWindow','crJeR','helpAreaHeight','KSOVL','isShiftRemoveShortcutEnabled','drawItemStyleIconText','NoChangeMarker','getWeaponIdWithName','getDamageStyle','mainCommandWidth','actorParams','Xnmzw','itemAt','sellPriceRate','XolfO','partyArtifacts','MultiplierStandard','mgCFI','Type','Scene_Shop_commandSell','commandNameWindowDrawText','categoryWindowRect','gSaYF','ITEMS_EQUIPS_CORE','hNgNS','drawItemDamageAmount','number','values','onCategoryOk','mpRate','rztQp','sellWindowRect','deactivate','pUFrY','LabelSuccessRate','drawItemEffects','LabelRecoverTP','helpWindowRectItemsEquipsCore','Actors','itypeId','Style','setTopRow','BorderRegExp','ARRAYJSON','Scene_Shop_numberWindowRect','removeState','ZhMju','slotWindowRect','MP\x20DAMAGE','lQiDY','Game_BattlerBase_meetsItemConditions','getItemDamageAmountTextBattleCore','Parse_Notetags_EquipSlots','WVkbJ','bestEquipItem','refreshItemsEquipsCoreNoMenuImage','allowCreateStatusWindow','ShopMenuStatusStandard','getItemHitTypeText','45981MJQzWn','params','_buyWindowLastIndex','onDatabaseLoaded','brRav','REutq','_goodsCount','cFzsT','_bypassProxy','UPSvq','tbCGh','itemWindowRect','nPhvG','registerCommand','updateCommandNameWindow','flatMP','paramValueByName','YfnMm','getItemIdWithName','100%','user','ShiftShortcutKey','_resetFontColor','paramchangeTextColor','onSlotOk','_helpWindow','Game_BattlerBase_paramPlus_artifact','right','drawItemRepeats','isClearCommandEnabled','itemWindowRectItemsEquipsCore','WraXW','EFFECT_ADD_DEBUFF','gmJHM','bFMwS','allowShiftScrolling','Window_Selectable_initialize','_item','Eaara','Scene_Shop_helpWindowRect','LabelRecoverHP','equipSlotIndex','canShiftRemoveEquipment','Window_ShopBuy_refresh','KIDKE','onBuyCancelItemsEquipsCore','RGWcf','ScopeRandomAllies','artifacts','Scene_Shop_buyingPrice','NaxiY','smoothScrollTo','anyEmptyEquipSlotsOfSameEtype','createStatusWindow','NotConsumable','weapon-%1','4851360ftahva','vHKEM','getItemHitTypeLabel','MANUAL','LabelElement','categoryWindowRectItemsEquipsCore','BuKNu','oREje','commandStyleCheck','0000','JMBbv','MaxHP','createCategoryNameWindow','xCoEk','resetShopSwitches','gaugeLineHeight','drawItemDamage','setShopStatusWindowMode','isSceneShop','releaseUnequippableItems','UovwC','Parse_Notetags_Batch','setupBattleTestItems','AzYwu','drawTextEx','OffsetY','mainAreaTop','numberWindowRectItemsEquipsCore','gVMnb','members','onSlotCancel','mainAreaBottom','kKohl','Scene_Shop_createSellWindow','cursorRight','removeDebuff','wCkBD','drawItemEffectsSelfTpGain','pwtrj','initNewItemsList','isHovered','drawCustomShopGraphicLoad','IgXcu','onCategoryCancelItemsEquipsCore','getItemEffectsTpRecoveryText','isArtifact','name','isCursorMovable','getItemEffectsHpDamageLabel','Scene_Item_createItemWindow','Whitelist','itemTextAlign','trIWc','getItemDamageAmountLabelBattleCore','ADDED\x20EFFECTS','Window_ShopStatus_setItem','getItemEffectsHpRecoveryText','EpeuS','_dummyWindow','getItemConsumableText','×%1','gBsfu','USLhu','VvCap','type','elementId','value2','plJNx','ixcMO','active','6oFSqoE','processTouchModernControls','Text','Scene_Boot_onDatabaseLoaded','PVpof','commandNameWindowDrawBackground','_armorIDs','value','commandSell','WKzED','SpeedNeg999','createNewLabelSprite','maxItemAmount','clamp','process_VisuMZ_ItemsEquipsCore_Notetags','getItemScopeText','filter','Parse_Notetags_ParamValues','SetupProxyItemGroups','Game_Party_initialize','CmdIconSell','smoothSelect','mhp','battleMembers','FHiDB','geUpdatedLayoutStatusWidth','oGazX','Scene_Load_reloadMapIfUpdated','getTextColor','isHoverEnabled','windowPadding','yoEcN','_shopStatusMenuMode','paintOpacity','playCursorSound','vmqnu','CmdIconBuy','wWuPo','QUANTITY','Scene_Shop_activateSellWindow','Game_Actor_discardEquip','maxItems','paramPlus','isPartyArtifact','categoryNameWindowDrawBackground','Scene_Equip_helpWindowRect','addStateBuffChanges','gainTP','drawItemEffectsMpDamage','OMiCv','ZwTWr','Scene_Item_helpWindowRect','commandWindowRect','List','isRightInputMode','vpfrq','sdHlz','isOptimizeEquipOk','DMtOm','lQxFb','MaxWeapons','postCreateItemsEquipsCore','boxWidth','_numberWindow','isNewItem','hpRate','getItemSpeedLabel','placeNewLabel','drawItemName','EnableLayout','drawItemEffectsAddedStatesBuffs','cursorUp','CmdStyle','uczNw','getItemEffectsHpDamageText','onBuyOk','Window_ItemCategory_setItemWindow','postCreateSlotWindowItemsEquipsCore','UCRez','fontSizeRatio','onMenuImageLoad','PMAfY','changeTextColor','iconIndex','isItem','postCreateCategoryWindowItemsEquipsCore','doSell','ARRAYSTR','ynRPI','isOpen','isEquipCommandAdded','gARiF','cJyPN','setText','MAT','wnhrl','soUzO','changeBuff','forceChangeEquipSlots','KKGqj','ExtDisplayedParams','rPuZc','HYcyn','W%1','CTToX','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','resetTextColor','_newLabelOpacityChange','activateItemWindow','paramValueFontSize','createCommandWindow','popScene','buyingPrice','Scene_Shop_create','nCkqW','ZaGuh','_scene','setCategory','UeCIP','rateHP','CCHht','MaxIcons','IqBBV','update','drawParamName','postCreateItemWindowModernControls','ZCngW','categories','alterSkillName','cursorDown','kIhCS','onTouchSelectModern','JueWo','CmdHideDisabled','onSlotOkAutoSelect','loseItem','JvdcV','addChild','setValue','getItemEffectsAddedStatesBuffsLabel','drawItemScope','Hnenp','Kgxoy','center','constructor','Nonconsumable','drawRemoveItem','buttonAssistItemListRequirement','jBirU','USER\x20TP\x20GAIN','loadCharacter','Window_ItemList_colSpacing','commandName','HitType%1','powerDownColor','LHtDx','indexOf','lrxOk','isBuyCommandEnabled','ISEzA','Window_EquipItem_isEnabled','+%1','meetsItemConditionsNotetags','createCommandNameWindow','updateNewLabelOpacity','drawNewLabelIcon','equipSlots','buttonAssistKey2','maxCols','onBuyCancel','buttonAssistSlotWindowShift','3841872ELEoFC','addInnerChild','buttonAssistOffset3','pdqPI','opacity','rMWMR','isKeyItem','Window_Selectable_refresh','IEBRe','mWOee','drawItemQuantity','Speed1','getItemEffectsSelfTpGainText','selfTP','vfGOx','dCbCB','Window_EquipStatus_refresh','Scene_Shop_onBuyOk','aqcba','_tempActorB','_forcedSlots','buttonAssistKey1','makeCommandList','drawItemDarkRect','equip2','_calculatingJSParameters','AlwaysUsable','sellWindowRectItemsEquipsCore','removeStateBuffChanges','middle','deselect','wxEAZ','CCvYc','updateMoneyAmount','LabelConsume','addState','clearNewLabelFromItem','_actor','iconText','TPWSX','Pick\x20and\x20choose\x20equipment\x20to\x20change.','addCancelCommand','ItemQuantityFmt','Game_Party_gainItem','getItemDamageAmountLabel','isClearEquipOk','Parse_Notetags_ParamJS','armorTypes','exit','sCKCh','hideDisabledCommands','max','brfEe','consumable','cancel','Scene_Shop_doBuy','QoL','xHafz','KBNOe','OffsetX','getItemSuccessRateText','createBitmap','getItemSuccessRateLabel','Game_Party_setupBattleTestItems_artifact','meetsItemConditionsJS','statusWidth','buttonAssistText2','ListWindowCols','flatHP','getItemColor','isDrawItemNumber','nAJUd','EFFECT_RECOVER_HP','buyWindowRect','NvFhn','Icon','Scene_Equip_createCommandWindow','eogtk','HiddenItemB','_commandNameWindow','SwitchSell','MaxArmors','commandBuy','hswcf','categoryNameWindowDrawText','contents','ItemSceneAdjustItemList','setItemWindow','XPDCG','uomJU','AllWeapons','RemoveEquipText','mainAreaHeight','LUK','haiWE','Game_Party_numItems','textSizeEx','buLrh','_allowArtifactParamBase','Game_Enemy_traitObjects_artifact','iconHeight','initialize','categoryItemTypes','lDWIe','getArmorIdWithName','LayoutStyle','SellPriceJS','TP\x20RECOVERY','GxFbo','_weaponIDs','addLoadListener','isRepeated','BattleUsable','axUMK','Window_Selectable_setHelpWindowItem','Scene_Shop_onBuyCancel','nlrDN','ConvertParams','ARRAYEVAL','addClearCommand','Scene_Shop_statusWindowRect','gaZMZ','doBuy','QvJMo','CONSUMABLE','ELEMENT','makeItemData','onSellOkItemsEquipsCore','toUpperCase','isShowNew','shift','_itemWindow','wcaZb','Settings','paramPlusItemsEquipsCoreCustomJS','OxSoi','\x5cI[%1]%2','isEquipped','ItemMenuStatusBgType','Scene_Equip_statusWindowRect','itemHasEquipLimit','getItemQuantityText','_goods','Game_BattlerBase_param_artifact','Equip\x20the\x20strongest\x20available\x20equipment.','JVfjx','DrHQg','rpwlD','isClearCommandAdded','SHlfg','tnsKV','Scene_Item_createCategoryWindow','zFqcW','drawItemStyleIcon','drawEquipData','isProxyItem','formula','whwYC','Scene_Equip_commandEquip','NbrPy','AlreadyEquipMarker','EZEbl','Scene_Shop_sellingPrice','drawParamsItemsEquipsCore','Scene_Shop_commandWindowRect','hitIndex','meetsItemConditions','EFFECT_RECOVER_MP','Game_BattlerBase_param','min','buttonAssistSmallIncrement','numItems','item','MDOhp','LWhZa','CmdIconOptimize','_newLabelSprites','MBjJS','VhXnu','getItemEffectsMpRecoveryText','tzuXP','versionId','CmdIconCancel','iconWidth','Window_ShopCommand_initialize','Game_Actor_changeEquip','QDqvj','atypeId','occasion','ATK','getItemEffectsMpDamageLabel','Sofnr','NonOptimizeETypes','hide','Game_Item_setObject','drawItemSpeed','SUCCESS\x20RATE','dataId','jUnZE','bitmap','XeWvH','(+%1)','categoryStyleCheck','initNewLabelSprites','isStackableArtifact','isCommandEnabled','drawUpdatedBeforeParamValue','EzjmA','prepareRefreshItemsEquipsCoreLayout','uiMenuStyle','goldWindowRectItemsEquipsCore','kNMnj','Window_EquipItem_includes','Scene_Equip_onSlotCancel','canConsumeItem','getProxyItem','length','sURtg','BhVjk','getItemEffectsTpDamageText','raZHW','getItemEffectsMpDamageText','drawItemCustomEntryLine','commandStyle','VZDUK','ZGsdV','SdYxx','drawCustomShopGraphic','mJGxy','addCommand','DrawParamJS','drawItemEffectsMpRecovery','clearNewItem','Mbvoh','StatusWindow','ConvertNumberToString','adjustHiddenShownGoods','kZHaO','KeyItemProtect','HIT\x20TYPE','tpGain','NNXOs','param','replace','limitedPageUpDownSceneCheck','Window_ItemList_maxCols','processDrawIcon','helpDescriptionText','processHandling','revertGlobalNamespaceVariables','duaez','getItemEffectsAddedStatesBuffsText','optKeyItemsNumber','bind','uiInputPosition','equipCmdDesc','onTouchCancel','equips','HiddenItemA','description','bZkGo','PYJxK','getItemsEquipsCoreBackColor2','grokt','ItemQuantityFontSize','37676jLDRZd','ARRAYNUM','onTouchOk','armor','Scene_Equip_commandWindowRect','forceChangeEquip','YfssM','weapon','Scene_Equip_slotWindowRect','avqDk','parse','DKJtV','CoreEngine','prepareNextScene','prepareNewEquipSlotsOnLoad','test','Rnnpa','categoryStyle','isSoleArmorType','CannotEquipMarker','nonRemovableEtypes','FadeLimit','note','QmktD','xpNcw','modifiedBuyPriceItemsEquipsCore','isEquipCommandEnabled','rbyuY','create','SpeedNeg1999','categoryList','scrollTo','yAWhO','LabelRecoverMP','switchProxyItem','_list','Scene_Item_create','armors','DrawIcons','AKueT','map','activateSellWindow','_slotWindow','_handlers','playEquip','format','lCUMV','AllItems','STSQy','AFUvj','gCYcG','newLabelEnabled','_allowArtifactTraitObjects','hitType','cenRI','XwlWO','checkItemConditionsSwitchNotetags','Window_Selectable_update','gRiEt','buttonAssistText1','VisuMZ_0_CoreEngine','getColor','Window_ItemList_drawItem','SwitchBuy','Translucent','resetFontSettings','contentsBack','isBattleTest','DSjRq','createCategoryWindow','_categoryNameWindow','mtFBQ','optimize','ngMzX','gaugeBackColor','CmdCancelRename','getItemSpeedText','csLrR','getItemDamageElementLabel','_tempActor','drawItem','getItemEffectsSelfTpGainLabel','#%1','HMvwJ','NuYnf','_category','shouldCommandWindowExist','wstKr','nextActor','SetupProxyItemGroup','Window_ShopSell_isEnabled','push','optimizeCmdDesc','OeeXe','commandWindowRectItemsEquipsCore','isHandled','loadFaceImages','isEquipItem','Scene_Equip_create','fTreM','Fkryc','fontSize','select','ssbIe','MxTCF','(%1)','CoHYf','damage','pagedown','Step1Start','Window_ItemList_item','getItemEffectsMpRecoveryLabel','ScopeRandomAny','_resetFontSize','drawItemKeyData','commandSellItemsEquipsCore','FHhAv','isSellCommandEnabled','getItemsEquipsCoreBackColor1','sQkmV','klQHn','currencyUnit','isPressed','_newItemsList','loadSystem','Scene_Equip_onActorChange','price','setItem','oJRwR','makeDeepCopy','vLzlP','MP\x20RECOVERY','itemLineRect','drawUpdatedAfterParamValue','ParseClassNotetags','Remove\x20all\x20available\x20equipment.','NySYx','rEPmd','updateSmoothScroll','isDualWield','index','processCursorSpecialCheckModernControls','innerWidth','fhRTl','buyWindowRectItemsEquipsCore','parameters','PtEUV','sell','Parse_Notetags_Prices','drawItemNumber','Damage\x20Formula\x20Error\x20for\x20%1','etypeId','postCreateSellWindowItemsEquipsCore','allowCommandWindowCursorUp','Scene_Shop_doSell','SVZAb','forceResetEquipSlots','RbvBY','lineHeight','getItemEffectsHpRecoveryLabel','concat','innerHeight','translucentOpacity','A%1','tradeItemWithParty','MvUVN','TayrD','getItemDamageAmountTextOriginal','visible','textColor','%1%','troopArtifacts','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','EquipScene','Scene_Shop_sellWindowRect','isUseModernControls','smallParamFontSize','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','\x5cb%1\x5cb','fill','onTouchSelect','auto','WJUXd','onCategoryCancel','drawItemSuccessRate','addOptimizeCommand','isOpenAndActive','possession','_customItemInfo','gGpVF','convertInitEquipsToItems','drawItemEffectsTpDamage','SpZIy','getItemDamageAmountLabelOriginal'];_0xd849=function(){return _0x36ba27;};return _0xd849();}(function(_0x18394d,_0x36969c){const _0x22422d=_0x5ada,_0x2860f3=_0x18394d();while(!![]){try{const _0x83b678=parseInt(_0x22422d(0x501))/0x1*(parseInt(_0x22422d(0x111))/0x2)+parseInt(_0x22422d(0x3db))/0x3*(-parseInt(_0x22422d(0x2c5))/0x4)+-parseInt(_0x22422d(0x48f))/0x5+parseInt(_0x22422d(0xcb))/0x6+parseInt(_0x22422d(0x44f))/0x7+parseInt(_0x22422d(0x1bc))/0x8+-parseInt(_0x22422d(0x93))/0x9;if(_0x83b678===_0x36969c)break;else _0x2860f3['push'](_0x2860f3['shift']());}catch(_0x14e1fe){_0x2860f3['push'](_0x2860f3['shift']());}}}(_0xd849,0xaa15e));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xc574cd(0x121)](function(_0x282a12){const _0x5be2c3=_0xc574cd;return _0x282a12[_0x5be2c3(0x42f)]&&_0x282a12[_0x5be2c3(0x2bf)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0xc574cd(0x241)]=VisuMZ[label][_0xc574cd(0x241)]||{},VisuMZ[_0xc574cd(0x231)]=function(_0x1030a9,_0x88bd99){const _0x793bf2=_0xc574cd;for(const _0x5cb20d in _0x88bd99){if('gBsfu'===_0x793bf2(0x108)){if(_0x5cb20d[_0x793bf2(0x4e0)](/(.*):(.*)/i)){if(_0x793bf2(0xd2)===_0x793bf2(0xd2)){const _0x43c465=String(RegExp['$1']),_0x29817b=String(RegExp['$2'])[_0x793bf2(0x23c)]()['trim']();let _0x6de233,_0x2e7089,_0x1adf56;switch(_0x29817b){case'NUM':_0x6de233=_0x88bd99[_0x5cb20d]!==''?Number(_0x88bd99[_0x5cb20d]):0x0;break;case _0x793bf2(0x2c6):_0x2e7089=_0x88bd99[_0x5cb20d]!==''?JSON[_0x793bf2(0x2cf)](_0x88bd99[_0x5cb20d]):[],_0x6de233=_0x2e7089[_0x793bf2(0x2ed)](_0x5117fc=>Number(_0x5117fc));break;case'EVAL':_0x6de233=_0x88bd99[_0x5cb20d]!==''?eval(_0x88bd99[_0x5cb20d]):null;break;case _0x793bf2(0x232):_0x2e7089=_0x88bd99[_0x5cb20d]!==''?JSON[_0x793bf2(0x2cf)](_0x88bd99[_0x5cb20d]):[],_0x6de233=_0x2e7089['map'](_0x570186=>eval(_0x570186));break;case _0x793bf2(0x51b):_0x6de233=_0x88bd99[_0x5cb20d]!==''?JSON['parse'](_0x88bd99[_0x5cb20d]):'';break;case _0x793bf2(0x83):_0x2e7089=_0x88bd99[_0x5cb20d]!==''?JSON['parse'](_0x88bd99[_0x5cb20d]):[],_0x6de233=_0x2e7089[_0x793bf2(0x2ed)](_0x12cf87=>JSON[_0x793bf2(0x2cf)](_0x12cf87));break;case _0x793bf2(0x3b2):_0x6de233=_0x88bd99[_0x5cb20d]!==''?new Function(JSON[_0x793bf2(0x2cf)](_0x88bd99[_0x5cb20d])):new Function('return\x200');break;case'ARRAYFUNC':_0x2e7089=_0x88bd99[_0x5cb20d]!==''?JSON[_0x793bf2(0x2cf)](_0x88bd99[_0x5cb20d]):[],_0x6de233=_0x2e7089['map'](_0x11888d=>new Function(JSON[_0x793bf2(0x2cf)](_0x11888d)));break;case'STR':_0x6de233=_0x88bd99[_0x5cb20d]!==''?String(_0x88bd99[_0x5cb20d]):'';break;case _0x793bf2(0x168):_0x2e7089=_0x88bd99[_0x5cb20d]!==''?JSON[_0x793bf2(0x2cf)](_0x88bd99[_0x5cb20d]):[],_0x6de233=_0x2e7089[_0x793bf2(0x2ed)](_0x3f2465=>String(_0x3f2465));break;case _0x793bf2(0x4f7):_0x1adf56=_0x88bd99[_0x5cb20d]!==''?JSON[_0x793bf2(0x2cf)](_0x88bd99[_0x5cb20d]):{},_0x1030a9[_0x43c465]={},VisuMZ[_0x793bf2(0x231)](_0x1030a9[_0x43c465],_0x1adf56);continue;case _0x793bf2(0x4d9):_0x2e7089=_0x88bd99[_0x5cb20d]!==''?JSON[_0x793bf2(0x2cf)](_0x88bd99[_0x5cb20d]):[],_0x6de233=_0x2e7089[_0x793bf2(0x2ed)](_0x4f2236=>VisuMZ[_0x793bf2(0x231)]({},JSON[_0x793bf2(0x2cf)](_0x4f2236)));break;default:continue;}_0x1030a9[_0x43c465]=_0x6de233;}else this[_0x793bf2(0x14e)]();}}else{if(!_0x988a31['value'](_0x231070))return!![];}}return _0x1030a9;},(_0x528287=>{const _0x22073c=_0xc574cd,_0x3c6e12=_0x528287[_0x22073c(0xf9)];for(const _0x2e98f2 of dependencies){if(_0x22073c(0xd8)!==_0x22073c(0x50f)){if(!Imported[_0x2e98f2]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x22073c(0x2f2)](_0x3c6e12,_0x2e98f2)),SceneManager['exit']();break;}}else return this['playCursorSound'](),_0x54933d['clear'](),_0x1954fe['_scene'][_0x22073c(0xe9)](),![];}const _0x2c450b=_0x528287[_0x22073c(0x2bf)];if(_0x2c450b[_0x22073c(0x4e0)](/\[Version[ ](.*?)\]/i)){if(_0x22073c(0x2f5)===_0x22073c(0x422)){const _0x1f5a3b=_0x58810d[_0x22073c(0x2ea)]()['filter'](_0x3a50af=>_0x55d66d['isArtifact'](_0x3a50af));for(const _0x3d3a63 of _0x1f5a3b){const _0x512471=this[_0x22073c(0x267)](_0x3d3a63);if(_0x512471)this[_0x22073c(0x198)](_0x3d3a63,_0x512471);}}else{const _0x1fec2b=Number(RegExp['$1']);_0x1fec2b!==VisuMZ[label]['version']&&(alert(_0x22073c(0x371)[_0x22073c(0x2f2)](_0x3c6e12,_0x1fec2b)),SceneManager[_0x22073c(0x1ec)]());}}if(_0x2c450b[_0x22073c(0x4e0)](/\[Tier[ ](\d+)\]/i)){const _0x35a3b2=Number(RegExp['$1']);_0x35a3b2<tier?(alert(_0x22073c(0x519)['format'](_0x3c6e12,_0x35a3b2,tier)),SceneManager['exit']()):tier=Math[_0x22073c(0x1ef)](_0x35a3b2,tier);}VisuMZ[_0x22073c(0x231)](VisuMZ[label][_0x22073c(0x241)],_0x528287[_0x22073c(0x356)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0xc574cd(0xf9)],'ActorChangeEquipSlots',_0x1174b1=>{const _0x361be5=_0xc574cd;VisuMZ[_0x361be5(0x231)](_0x1174b1,_0x1174b1);const _0x2dd6ae=_0x1174b1['Actors'][_0x361be5(0x2ed)](_0xdd5534=>$gameActors[_0x361be5(0x3de)](_0xdd5534)),_0x8e8f8b=_0x1174b1[_0x361be5(0x430)]['map'](_0x58bf64=>$dataSystem[_0x361be5(0x4ea)][_0x361be5(0x1ad)](_0x58bf64[_0x361be5(0x3c0)]()));for(const _0x3d3ea5 of _0x2dd6ae){if(_0x361be5(0x174)===_0x361be5(0x174)){if(!_0x3d3ea5)continue;_0x3d3ea5[_0x361be5(0x173)](_0x8e8f8b);}else return![];}}),PluginManager[_0xc574cd(0xa0)](pluginData[_0xc574cd(0xf9)],_0xc574cd(0x460),_0x19e3cf=>{const _0x7757c7=_0xc574cd;VisuMZ['ConvertParams'](_0x19e3cf,_0x19e3cf);const _0x2334cb=_0x19e3cf[_0x7757c7(0x7e)][_0x7757c7(0x2ed)](_0x4a5c4e=>$gameActors[_0x7757c7(0x3de)](_0x4a5c4e));for(const _0x11f89a of _0x2334cb){if(!_0x11f89a)continue;_0x11f89a[_0x7757c7(0x361)]();}}),PluginManager['registerCommand'](pluginData[_0xc574cd(0xf9)],'BatchShop',_0x33a647=>{const _0x5f35f0=_0xc574cd;VisuMZ[_0x5f35f0(0x231)](_0x33a647,_0x33a647);const _0x11496b=[],_0x2324fb=_0x33a647[_0x5f35f0(0x51a)][_0x5f35f0(0x2ed)](_0xbede33=>_0xbede33[_0x5f35f0(0x23c)]()[_0x5f35f0(0x3c0)]()),_0x15502c=_0x33a647[_0x5f35f0(0xfd)]['map'](_0x49fd69=>_0x49fd69[_0x5f35f0(0x23c)]()['trim']()),_0x464fdc=_0x33a647[_0x5f35f0(0x4db)]>=_0x33a647[_0x5f35f0(0x332)]?_0x33a647[_0x5f35f0(0x332)]:_0x33a647[_0x5f35f0(0x4db)],_0x4e2db2=_0x33a647[_0x5f35f0(0x4db)]>=_0x33a647[_0x5f35f0(0x332)]?_0x33a647['Step1End']:_0x33a647['Step1Start'],_0xc94d53=Array(_0x4e2db2-_0x464fdc+0x1)['fill']()[_0x5f35f0(0x2ed)]((_0x187b8d,_0xa2532c)=>_0x464fdc+_0xa2532c);for(const _0x5d4871 of _0xc94d53){const _0x2dbcb7=$dataItems[_0x5d4871];if(!_0x2dbcb7)continue;if(!VisuMZ[_0x5f35f0(0x3aa)][_0x5f35f0(0x432)](_0x2dbcb7,_0x2324fb,_0x15502c))continue;_0x11496b['push']([0x0,_0x5d4871,0x0,_0x2dbcb7[_0x5f35f0(0x343)]]);}const _0x55fdf1=_0x33a647[_0x5f35f0(0x507)]>=_0x33a647[_0x5f35f0(0x435)]?_0x33a647[_0x5f35f0(0x435)]:_0x33a647['Step2End'],_0x5942cd=_0x33a647['Step2End']>=_0x33a647['Step2Start']?_0x33a647['Step2End']:_0x33a647[_0x5f35f0(0x435)],_0x333ebb=Array(_0x5942cd-_0x55fdf1+0x1)[_0x5f35f0(0x378)]()['map']((_0x2d99f1,_0x564956)=>_0x55fdf1+_0x564956);for(const _0x5a4160 of _0x333ebb){const _0x447425=$dataWeapons[_0x5a4160];if(!_0x447425)continue;if(!VisuMZ[_0x5f35f0(0x3aa)]['IncludeShopItem'](_0x447425,_0x2324fb,_0x15502c))continue;_0x11496b['push']([0x1,_0x5a4160,0x0,_0x447425[_0x5f35f0(0x343)]]);}const _0x66d953=_0x33a647[_0x5f35f0(0x513)]>=_0x33a647[_0x5f35f0(0x413)]?_0x33a647[_0x5f35f0(0x413)]:_0x33a647[_0x5f35f0(0x513)],_0x49a51b=_0x33a647[_0x5f35f0(0x513)]>=_0x33a647[_0x5f35f0(0x413)]?_0x33a647[_0x5f35f0(0x513)]:_0x33a647['Step3Start'],_0x3596ad=Array(_0x49a51b-_0x66d953+0x1)[_0x5f35f0(0x378)]()[_0x5f35f0(0x2ed)]((_0x251268,_0x26c476)=>_0x66d953+_0x26c476);for(const _0x63f3f8 of _0x3596ad){if(_0x5f35f0(0x3c7)!=='nqvYF'){const _0x4013af=_0x40544a[_0x5f35f0(0x4ea)][_0x5f35f0(0x1ad)](_0x1f3b86(_0x52880d['$1'])[_0x5f35f0(0x3c0)]());return _0x3d0638['isArmor'](_0x8bac54)&&_0x224360[_0x5f35f0(0x35c)]===_0x4013af;}else{const _0x187bae=$dataArmors[_0x63f3f8];if(!_0x187bae)continue;if(!VisuMZ[_0x5f35f0(0x3aa)][_0x5f35f0(0x432)](_0x187bae,_0x2324fb,_0x15502c))continue;_0x11496b[_0x5f35f0(0x320)]([0x2,_0x63f3f8,0x0,_0x187bae[_0x5f35f0(0x343)]]);}}SceneManager[_0x5f35f0(0x320)](Scene_Shop),SceneManager[_0x5f35f0(0x2d2)](_0x11496b,_0x33a647['PurchaseOnly']);}),VisuMZ[_0xc574cd(0x3aa)]['IncludeShopItem']=function(_0x4a0b37,_0x8dad53,_0x3e7b5f){const _0x4d8965=_0xc574cd;if(_0x4a0b37['name'][_0x4d8965(0x3c0)]()==='')return![];if(_0x4a0b37['name']['match'](/-----/i))return![];const _0x36f9e8=_0x4a0b37['categories'];if(_0x8dad53[_0x4d8965(0x294)]>0x0)for(const _0x1e174e of _0x8dad53){if(!_0x1e174e)continue;if(_0x36f9e8['includes'](_0x1e174e))return![];}if(_0x3e7b5f[_0x4d8965(0x294)]>0x0){for(const _0x12e6ba of _0x3e7b5f){if('aKgue'!==_0x4d8965(0x3b0)){const _0xaf20da=this[_0x4d8965(0x52e)](_0x1f5840);if(!_0xaf20da||!this['isShowNew']())return;if(!_0x37e509[_0x4d8965(0x151)](_0xaf20da))return;const _0x24d7e2=this[_0x4d8965(0x349)](_0x5cea95),_0x411ddc=_0x24d7e2['x'],_0x3dbd78=_0x24d7e2['y']+(this[_0x4d8965(0x363)]()-_0x60308d[_0x4d8965(0x220)])/0x2,_0x5cda23=_0x1fa320[_0x4d8965(0x3aa)]['Settings'][_0x4d8965(0x3ac)][_0x4d8965(0x1f7)],_0x56316e=_0x3ee6fe['ItemsEquipsCore'][_0x4d8965(0x241)][_0x4d8965(0x3ac)][_0x4d8965(0xe4)];this['placeNewLabel'](_0xaf20da,_0x411ddc+_0x5cda23,_0x3dbd78+_0x56316e);}else{if(!_0x12e6ba)continue;if(_0x36f9e8[_0x4d8965(0x3a8)](_0x12e6ba))return!![];}}return![];}return!![];},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x114)]=Scene_Boot[_0xc574cd(0x405)][_0xc574cd(0x96)],Scene_Boot[_0xc574cd(0x405)]['onDatabaseLoaded']=function(){const _0xd31f29=_0xc574cd;this[_0xd31f29(0x42a)](),VisuMZ[_0xd31f29(0x3aa)]['Scene_Boot_onDatabaseLoaded'][_0xd31f29(0x3e9)](this),this[_0xd31f29(0x11f)](),VisuMZ[_0xd31f29(0x3aa)][_0xd31f29(0x123)]();},Scene_Boot[_0xc574cd(0x405)][_0xc574cd(0x42a)]=function(){const _0x19f7ac=_0xc574cd;VisuMZ[_0x19f7ac(0x3aa)][_0x19f7ac(0x512)]={},VisuMZ[_0x19f7ac(0x3aa)]['RegExp']['EquipParams']=[],VisuMZ[_0x19f7ac(0x3aa)]['RegExp'][_0x19f7ac(0x82)]=[];const _0x649ad8=[_0x19f7ac(0xd6),_0x19f7ac(0x402),_0x19f7ac(0x279),'DEF',_0x19f7ac(0x16f),_0x19f7ac(0x41a),'AGI',_0x19f7ac(0x219)];for(const _0x75c47f of _0x649ad8){if(_0x19f7ac(0x1f0)===_0x19f7ac(0x143))_0x3d236b=_0xc21740[_0x19f7ac(0x4ea)][_0xa02685(_0x2391bf['$1'])]||'';else{const _0x5f30f9=_0x19f7ac(0x17a)[_0x19f7ac(0x2f2)](_0x75c47f);VisuMZ['ItemsEquipsCore'][_0x19f7ac(0x512)][_0x19f7ac(0x4f9)][_0x19f7ac(0x320)](new RegExp(_0x5f30f9,'i'));const _0x21b1a3=_0x19f7ac(0x377)[_0x19f7ac(0x2f2)](_0x75c47f);VisuMZ[_0x19f7ac(0x3aa)][_0x19f7ac(0x512)]['BorderRegExp'][_0x19f7ac(0x320)](new RegExp(_0x21b1a3,'g'));}}},Scene_Boot[_0xc574cd(0x405)][_0xc574cd(0x11f)]=function(){const _0x31c093=_0xc574cd;if(VisuMZ[_0x31c093(0x50e)])return;this[_0x31c093(0x437)]();const _0x2e68b2=[$dataItems,$dataWeapons,$dataArmors];for(const _0x4d1495 of _0x2e68b2){for(const _0x5b6183 of _0x4d1495){if(!_0x5b6183)continue;VisuMZ[_0x31c093(0x3aa)]['Parse_Notetags_Category'](_0x5b6183,_0x4d1495),VisuMZ[_0x31c093(0x3aa)][_0x31c093(0x359)](_0x5b6183,_0x4d1495),VisuMZ[_0x31c093(0x3aa)][_0x31c093(0x122)](_0x5b6183,_0x4d1495),VisuMZ[_0x31c093(0x3aa)]['Parse_Notetags_ParamJS'](_0x5b6183,_0x4d1495),VisuMZ[_0x31c093(0x3aa)]['Parse_Notetags_EnableJS'](_0x5b6183,_0x4d1495);}}},Scene_Boot[_0xc574cd(0x405)][_0xc574cd(0x437)]=function(){const _0x4a23fb=_0xc574cd;for(const _0x17f7bd of $dataClasses){if(!_0x17f7bd)continue;VisuMZ[_0x4a23fb(0x3aa)][_0x4a23fb(0x8c)](_0x17f7bd);}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x34b)]=VisuMZ[_0xc574cd(0x34b)],VisuMZ[_0xc574cd(0x34b)]=function(_0x1c88e2){const _0x33f78e=_0xc574cd;VisuMZ[_0x33f78e(0x3aa)][_0x33f78e(0x34b)][_0x33f78e(0x3e9)](this,_0x1c88e2),VisuMZ[_0x33f78e(0x3aa)][_0x33f78e(0x8c)](_0x1c88e2);},VisuMZ[_0xc574cd(0x3aa)]['ParseItemNotetags']=VisuMZ[_0xc574cd(0x488)],VisuMZ[_0xc574cd(0x488)]=function(_0x5cde60){const _0x315461=_0xc574cd;VisuMZ[_0x315461(0x3aa)][_0x315461(0x488)][_0x315461(0x3e9)](this,_0x5cde60),VisuMZ[_0x315461(0x3aa)][_0x315461(0xe0)](_0x5cde60,$dataItems);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x42d)]=VisuMZ['ParseWeaponNotetags'],VisuMZ['ParseWeaponNotetags']=function(_0x5b5507){const _0x3865fd=_0xc574cd;VisuMZ[_0x3865fd(0x3aa)][_0x3865fd(0x42d)][_0x3865fd(0x3e9)](this,_0x5b5507),VisuMZ[_0x3865fd(0x3aa)][_0x3865fd(0xe0)](_0x5b5507,$dataWeapons);},VisuMZ[_0xc574cd(0x3aa)]['ParseArmorNotetags']=VisuMZ[_0xc574cd(0x459)],VisuMZ[_0xc574cd(0x459)]=function(_0x3905d1){const _0x52cbef=_0xc574cd;VisuMZ[_0x52cbef(0x3aa)][_0x52cbef(0x459)][_0x52cbef(0x3e9)](this,_0x3905d1),VisuMZ[_0x52cbef(0x3aa)][_0x52cbef(0xe0)](_0x3905d1,$dataArmors);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x8c)]=function(_0x49ba04){const _0x149ae0=_0xc574cd;_0x49ba04[_0x149ae0(0x1b7)]=[];if(!BattleManager['isBattleTest']()&&_0x49ba04[_0x149ae0(0x2db)]['match'](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x15e64d=String(RegExp['$1'])[_0x149ae0(0x3d7)](/[\r\n]+/);for(const _0x8bf56e of _0x15e64d){if(_0x149ae0(0x4f2)!==_0x149ae0(0x3c1)){const _0x41d947=$dataSystem[_0x149ae0(0x4ea)][_0x149ae0(0x1ad)](_0x8bf56e['trim']());if(_0x41d947>0x0)_0x49ba04[_0x149ae0(0x1b7)][_0x149ae0(0x320)](_0x41d947);}else _0x5c7d90[_0x149ae0(0x405)][_0x149ae0(0x315)][_0x149ae0(0x3e9)](this,_0x5d9cd0);}}else{if(_0x149ae0(0x276)!==_0x149ae0(0x276))this['_equips'][_0x5e7031][_0x149ae0(0x474)](null);else for(const _0x57eae6 of $dataSystem[_0x149ae0(0x4ea)]){const _0x26aad5=$dataSystem[_0x149ae0(0x4ea)][_0x149ae0(0x1ad)](_0x57eae6[_0x149ae0(0x3c0)]());if(_0x26aad5>0x0)_0x49ba04['equipSlots'][_0x149ae0(0x320)](_0x26aad5);}}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0xe0)]=function(_0x1e5056,_0x1fcbdd){const _0x3a8806=_0xc574cd;VisuMZ[_0x3a8806(0x3aa)][_0x3a8806(0x3be)](_0x1e5056,_0x1fcbdd),VisuMZ[_0x3a8806(0x3aa)][_0x3a8806(0x359)](_0x1e5056,_0x1fcbdd),VisuMZ['ItemsEquipsCore']['Parse_Notetags_ParamValues'](_0x1e5056,_0x1fcbdd),VisuMZ[_0x3a8806(0x3aa)][_0x3a8806(0x1ea)](_0x1e5056,_0x1fcbdd),VisuMZ['ItemsEquipsCore'][_0x3a8806(0x472)](_0x1e5056,_0x1fcbdd);},VisuMZ['ItemsEquipsCore']['Parse_Notetags_Category']=function(_0x57880c,_0x33c0b0){const _0x3cdac1=_0xc574cd;_0x57880c[_0x3cdac1(0x190)]=[];const _0x4e72a0=_0x57880c['note'],_0x233b8a=_0x4e72a0['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x233b8a)for(const _0x319521 of _0x233b8a){_0x319521[_0x3cdac1(0x4e0)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x42fb2e=String(RegExp['$1'])['toUpperCase']()[_0x3cdac1(0x3c0)]()[_0x3cdac1(0x3d7)](',');for(const _0xe8669 of _0x42fb2e){if(_0x3cdac1(0x4f4)!==_0x3cdac1(0x4f4))return;else _0x57880c[_0x3cdac1(0x190)][_0x3cdac1(0x320)](_0xe8669['trim']());}}if(_0x4e72a0[_0x3cdac1(0x4e0)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x3cdac1(0x3cd)!==_0x3cdac1(0x4ef)){const _0x5633c0=RegExp['$1']['split'](/[\r\n]+/);for(const _0x34da84 of _0x5633c0){'mNTSY'!=='hCYBw'?_0x57880c[_0x3cdac1(0x190)][_0x3cdac1(0x320)](_0x34da84[_0x3cdac1(0x23c)]()['trim']()):this[_0x3cdac1(0x2e4)](0x0,0x0);}}else _0x267b60[_0x3cdac1(0x405)][_0x3cdac1(0x147)][_0x3cdac1(0x3e9)](this);}},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x359)]=function(_0x8b807,_0x22dbbf){const _0x1447bb=_0xc574cd;_0x8b807[_0x1447bb(0x2db)][_0x1447bb(0x4e0)](/<PRICE:[ ](\d+)>/i)&&(_0x8b807[_0x1447bb(0x343)]=Number(RegExp['$1']));},VisuMZ[_0xc574cd(0x3aa)]['Parse_Notetags_ParamValues']=function(_0x5f162e,_0xdcfd33){const _0x13d653=_0xc574cd;if(_0xdcfd33===$dataItems)return;for(let _0x44d361=0x0;_0x44d361<0x8;_0x44d361++){const _0x68adf4=VisuMZ[_0x13d653(0x3aa)][_0x13d653(0x512)][_0x13d653(0x4f9)][_0x44d361];_0x5f162e[_0x13d653(0x2db)]['match'](_0x68adf4)&&(_0x5f162e[_0x13d653(0x94)][_0x44d361]=parseInt(RegExp['$1']));}},VisuMZ[_0xc574cd(0x3aa)]['paramJS']={},VisuMZ[_0xc574cd(0x3aa)]['Parse_Notetags_ParamJS']=function(_0x5839c8,_0x411857){const _0x547cdc=_0xc574cd;if(_0x411857===$dataItems)return;if(_0x5839c8[_0x547cdc(0x2db)][_0x547cdc(0x4e0)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x59f55a=String(RegExp['$1']),_0x2f8a24=(_0x411857===$dataWeapons?_0x547cdc(0x178):'A%1')['format'](_0x5839c8['id']),_0x23a891=_0x547cdc(0x376)[_0x547cdc(0x2f2)](_0x59f55a);for(let _0x1da7f2=0x0;_0x1da7f2<0x8;_0x1da7f2++){if(_0x547cdc(0x47a)==='NEnft'){const _0xb4b5=_0x1b1380[_0x547cdc(0x380)];this[_0x547cdc(0x337)](_0xb4b5,_0x339937,_0x569fea,_0x36d9da,!![]);const _0x311883=this[_0x547cdc(0x249)]();this[_0x547cdc(0x337)](_0x311883,_0x537481,_0x3534b4,_0x4650b2,![],_0x547cdc(0xae));}else{if(_0x59f55a[_0x547cdc(0x4e0)](VisuMZ[_0x547cdc(0x3aa)]['RegExp'][_0x547cdc(0x82)][_0x1da7f2])){if(_0x547cdc(0x40c)===_0x547cdc(0x40c)){const _0x13d12c=_0x547cdc(0x4c6)[_0x547cdc(0x2f2)](_0x2f8a24,_0x1da7f2);VisuMZ[_0x547cdc(0x3aa)][_0x547cdc(0x47c)][_0x13d12c]=new Function('item','paramId',_0x23a891);}else return _0x4ea9ee[_0x547cdc(0x2ba)];}}}}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x392)]={},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x472)]=function(_0x200d5d,_0x2dee8e){const _0x3e362b=_0xc574cd;if(_0x2dee8e!==$dataItems)return;if(_0x200d5d[_0x3e362b(0x2db)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x3e362b(0x40d)!=='JoviF'){const _0x20300f=String(RegExp['$1']),_0x313e1d=_0x3e362b(0x3f8)[_0x3e362b(0x2f2)](_0x20300f);VisuMZ[_0x3e362b(0x3aa)][_0x3e362b(0x392)][_0x200d5d['id']]=new Function(_0x3e362b(0x268),_0x313e1d);}else{_0xbf9b0e[_0x3e362b(0x4e0)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x54ee99=_0x2a5127(_0x16e98d['$1'])[_0x3e362b(0x23c)]()['trim']()[_0x3e362b(0x3d7)](',');for(const _0x2a1bf3 of _0x54ee99){_0x5a4bce[_0x3e362b(0x190)][_0x3e362b(0x320)](_0x2a1bf3['trim']());}}}},DataManager[_0xc574cd(0x1c2)]=function(_0x4bd52c){const _0x49c4d8=_0xc574cd;return this[_0x49c4d8(0x165)](_0x4bd52c)&&_0x4bd52c['itypeId']===0x2;},DataManager[_0xc574cd(0x11d)]=function(_0x1fbff3){const _0x1e86d4=_0xc574cd;if(!_0x1fbff3)return 0x63;else{if(_0x1fbff3[_0x1e86d4(0x2db)][_0x1e86d4(0x4e0)](/<MAX:[ ](\d+)>/i)){if(_0x1e86d4(0x4dd)===_0x1e86d4(0x4dd))return parseInt(RegExp['$1']);else{const _0x775d5b=_0x4721de[_0x1e86d4(0x3aa)][_0x1e86d4(0x241)][_0x1e86d4(0x2a6)][_0x1e86d4(0x49a)];return _0x775d5b['format'](_0x313bf4['tp']);}}else return this[_0x1e86d4(0x490)](_0x1fbff3);}},DataManager[_0xc574cd(0x490)]=function(_0x4e8543){const _0x5bc0cc=_0xc574cd;if(this[_0x5bc0cc(0x165)](_0x4e8543))return VisuMZ[_0x5bc0cc(0x3aa)][_0x5bc0cc(0x241)][_0x5bc0cc(0x45b)][_0x5bc0cc(0x3d0)];else{if(this[_0x5bc0cc(0x487)](_0x4e8543)){if(_0x5bc0cc(0x2a0)!==_0x5bc0cc(0x2a0))_0x71c568===this[_0x5bc0cc(0x351)]()&&(this[_0x5bc0cc(0x3e6)]=!![]),this[_0x5bc0cc(0x412)](),this[_0x5bc0cc(0x32b)](_0x2d4f9e);else return VisuMZ[_0x5bc0cc(0x3aa)][_0x5bc0cc(0x241)][_0x5bc0cc(0x45b)][_0x5bc0cc(0x14d)];}else{if(this[_0x5bc0cc(0x467)](_0x4e8543))return VisuMZ[_0x5bc0cc(0x3aa)][_0x5bc0cc(0x241)][_0x5bc0cc(0x45b)][_0x5bc0cc(0x20d)];}}},DataManager[_0xc574cd(0xa5)]=function(_0x322d68){const _0x1a82d9=_0xc574cd;_0x322d68=_0x322d68[_0x1a82d9(0x23c)]()[_0x1a82d9(0x3c0)](),this[_0x1a82d9(0x411)]=this[_0x1a82d9(0x411)]||{};if(this[_0x1a82d9(0x411)][_0x322d68])return this[_0x1a82d9(0x411)][_0x322d68];for(const _0x23f392 of $dataItems){if(!_0x23f392)continue;this['_itemIDs'][_0x23f392[_0x1a82d9(0xf9)][_0x1a82d9(0x23c)]()[_0x1a82d9(0x3c0)]()]=_0x23f392['id'];}return this[_0x1a82d9(0x411)][_0x322d68]||0x0;},DataManager[_0xc574cd(0x529)]=function(_0x300518){const _0x72ea3c=_0xc574cd;_0x300518=_0x300518[_0x72ea3c(0x23c)]()['trim'](),this[_0x72ea3c(0x229)]=this['_weaponIDs']||{};if(this[_0x72ea3c(0x229)][_0x300518])return this['_weaponIDs'][_0x300518];for(const _0x5f54a3 of $dataWeapons){if(!_0x5f54a3)continue;this['_weaponIDs'][_0x5f54a3[_0x72ea3c(0xf9)][_0x72ea3c(0x23c)]()[_0x72ea3c(0x3c0)]()]=_0x5f54a3['id'];}return this['_weaponIDs'][_0x300518]||0x0;},DataManager[_0xc574cd(0x224)]=function(_0x4808f8){const _0x86e7de=_0xc574cd;_0x4808f8=_0x4808f8['toUpperCase']()[_0x86e7de(0x3c0)](),this[_0x86e7de(0x117)]=this[_0x86e7de(0x117)]||{};if(this['_armorIDs'][_0x4808f8])return this[_0x86e7de(0x117)][_0x4808f8];for(const _0x357a1c of $dataArmors){if(!_0x357a1c)continue;this[_0x86e7de(0x117)][_0x357a1c['name'][_0x86e7de(0x23c)]()['trim']()]=_0x357a1c['id'];}return this[_0x86e7de(0x117)][_0x4808f8]||0x0;},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x123)]=function(){const _0x488cd9=_0xc574cd;VisuMZ[_0x488cd9(0x3aa)]['SetupProxyItemGroup']($dataItems),VisuMZ[_0x488cd9(0x3aa)]['SetupProxyItemGroup']($dataWeapons),VisuMZ['ItemsEquipsCore'][_0x488cd9(0x31e)]($dataArmors);},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x31e)]=function(_0x4f4157){const _0x4e9f73=_0xc574cd;for(const _0x13865a of _0x4f4157){if(_0x4e9f73(0x183)!=='hRFKf'){if(!_0x13865a)continue;if(!DataManager[_0x4e9f73(0x257)](_0x13865a))continue;const _0x416435=DataManager[_0x4e9f73(0x293)](_0x13865a),_0x13a9e5=['name',_0x4e9f73(0x164),_0x4e9f73(0x2bf)];for(const _0x42ba76 of _0x13a9e5){if(_0x4e9f73(0x329)==='MYyfW'){const _0x414ef2=this[_0x4e9f73(0x39f)][_0x4e9f73(0x172)][_0x5d52a8],_0x55126c=_0x481f27['prototype']['buffIconIndex'](_0x414ef2,_0x594bea);if(_0x55126c>0x0){_0x278341+=_0x4e9f73(0x41e)[_0x4e9f73(0x2f2)](_0x55126c),_0x232035++;if(_0xd56c74>=_0x656353)return _0x594d08;}}else _0x13865a[_0x42ba76]=_0x416435[_0x42ba76];}}else return _0x3e1233['ItemsEquipsCore']['Settings'][_0x4e9f73(0x2a6)][_0x4e9f73(0xc9)];}},DataManager[_0xc574cd(0x257)]=function(_0x48d736){const _0x17fc0c=_0xc574cd;if(!_0x48d736)return![];if(!_0x48d736[_0x17fc0c(0x2db)])return![];return _0x48d736&&_0x48d736[_0x17fc0c(0x2db)][_0x17fc0c(0x4e0)](/<PROXY:[ ](.*)>/i);},DataManager['getProxyItem']=function(_0x33cdbf){const _0x3ccc92=_0xc574cd;return this[_0x3ccc92(0x257)](_0x33cdbf)?(_0x33cdbf=this['switchProxyItem'](_0x33cdbf)||_0x33cdbf,this[_0x3ccc92(0x257)](_0x33cdbf)?this[_0x3ccc92(0x293)](_0x33cdbf):_0x33cdbf):_0x3ccc92(0x254)!==_0x3ccc92(0x254)?this['getItemDamageAmountLabelBattleCore']():_0x33cdbf;},DataManager['switchProxyItem']=function(_0x56e747){const _0x38079c=_0xc574cd;_0x56e747['note'][_0x38079c(0x4e0)](/<PROXY:[ ](.*)>/i);const _0x2190b0=RegExp['$1'][_0x38079c(0x3c0)](),_0x172b68=/^\d+$/[_0x38079c(0x2d4)](_0x2190b0);if(this[_0x38079c(0x165)](_0x56e747)){if('OHPUB'===_0x38079c(0x4cc))_0x1de224=_0x544f27[_0x38079c(0x3aa)][_0x38079c(0x241)][_0x38079c(0x475)][_0x41071c];else{const _0x25c6a=_0x172b68?Number(RegExp['$1']):DataManager[_0x38079c(0xa5)](_0x2190b0);return $dataItems[_0x25c6a]||_0x56e747;}}else{if(this['isWeapon'](_0x56e747)){if('LbZKF'==='XqAwp')this[_0x38079c(0x542)](),this[_0x38079c(0x1da)]();else{const _0x564cbf=_0x172b68?Number(RegExp['$1']):DataManager[_0x38079c(0x529)](_0x2190b0);return $dataWeapons[_0x564cbf]||_0x56e747;}}else{if(this[_0x38079c(0x467)](_0x56e747)){const _0x4ae8da=_0x172b68?Number(RegExp['$1']):DataManager[_0x38079c(0x224)](_0x2190b0);return $dataArmors[_0x4ae8da]||_0x56e747;}}}return _0x56e747;},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x333)]=Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x268)],Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x268)]=function(){const _0x455a8f=_0xc574cd;if($gameTemp[_0x455a8f(0x9b)])return VisuMZ[_0x455a8f(0x3aa)][_0x455a8f(0x333)][_0x455a8f(0x3e9)](this);return DataManager[_0x455a8f(0x293)](VisuMZ[_0x455a8f(0x3aa)][_0x455a8f(0x333)][_0x455a8f(0x3e9)](this));},Window_ItemList['prototype'][_0xc574cd(0x4b8)]=function(){const _0x12e586=_0xc574cd;return VisuMZ[_0x12e586(0x3aa)]['Window_ItemList_item'][_0x12e586(0x3e9)](this);},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x3f0)]=Window_ShopBuy[_0xc574cd(0x405)][_0xc574cd(0x268)],Window_ShopBuy[_0xc574cd(0x405)][_0xc574cd(0x268)]=function(){const _0x4e0250=_0xc574cd;if($gameTemp['_bypassProxy'])return VisuMZ[_0x4e0250(0x3aa)][_0x4e0250(0x3f0)]['call'](this);return DataManager[_0x4e0250(0x293)](VisuMZ['ItemsEquipsCore'][_0x4e0250(0x3f0)][_0x4e0250(0x3e9)](this));},Window_ShopBuy['prototype']['proxyItem']=function(){const _0x3c0eec=_0xc574cd;return VisuMZ[_0x3c0eec(0x3aa)][_0x3c0eec(0x3f0)][_0x3c0eec(0x3e9)](this);},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x102)]=Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x344)],Window_ShopStatus[_0xc574cd(0x405)]['setItem']=function(_0x35f1b5){const _0x39d153=_0xc574cd;_0x35f1b5=DataManager['getProxyItem'](_0x35f1b5),VisuMZ[_0x39d153(0x3aa)]['Window_ShopStatus_setItem'][_0x39d153(0x3e9)](this,_0x35f1b5);},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x27e)]=Game_Item[_0xc574cd(0x405)][_0xc574cd(0x474)],Game_Item[_0xc574cd(0x405)][_0xc574cd(0x474)]=function(_0x5d9278){const _0x2e6606=_0xc574cd;if(DataManager[_0x2e6606(0x257)](_0x5d9278))return;VisuMZ['ItemsEquipsCore']['Game_Item_setObject'][_0x2e6606(0x3e9)](this,_0x5d9278);},DataManager[_0xc574cd(0xf8)]=function(_0x1af71a){const _0x228e35=_0xc574cd;if(!this[_0x228e35(0x467)](_0x1af71a))return![];const _0x5cd34a=_0x1af71a[_0x228e35(0x2db)];if(!_0x5cd34a)return![];if(_0x5cd34a[_0x228e35(0x4e0)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5cd34a[_0x228e35(0x4e0)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5cd34a['match'](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5cd34a[_0x228e35(0x4e0)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0xc574cd(0x288)]=function(_0x324db7){const _0x57b9fb=_0xc574cd;if(!this[_0x57b9fb(0xf8)](_0x324db7))return![];const _0x141a88=_0x324db7[_0x57b9fb(0x2db)];if(!_0x141a88)return![];if(_0x141a88[_0x57b9fb(0x4e0)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x141a88['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isPartyArtifact']=function(_0x561a70){const _0x3c8ff0=_0xc574cd;if(!this['isArtifact'](_0x561a70))return![];const _0x267d5d=_0x561a70['note'];if(!_0x267d5d)return![];if(_0x267d5d[_0x3c8ff0(0x4e0)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x267d5d[_0x3c8ff0(0x4e0)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0xc574cd(0x50b)]=function(_0x532a55){const _0x56342a=_0xc574cd;if(!this['isArtifact'](_0x532a55))return![];const _0xf806e1=_0x532a55[_0x56342a(0x2db)];if(!_0xf806e1)return![];if(_0xf806e1[_0x56342a(0x4e0)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xf806e1[_0x56342a(0x4e0)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x408)]=Game_BattlerBase['prototype'][_0xc574cd(0x3ff)],Game_BattlerBase[_0xc574cd(0x405)]['canEquip']=function(_0x4eb474){const _0x2d64be=_0xc574cd;if(DataManager['isArtifact'](_0x4eb474))return![];return VisuMZ[_0x2d64be(0x3aa)][_0x2d64be(0x408)][_0x2d64be(0x3e9)](this,_0x4eb474);},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x24b)]=Game_BattlerBase[_0xc574cd(0x405)][_0xc574cd(0x2ae)],Game_BattlerBase[_0xc574cd(0x405)]['param']=function(_0x366254){const _0x224a20=_0xc574cd;this[_0x224a20(0x21e)]=!![];const _0x35b957=VisuMZ[_0x224a20(0x3aa)][_0x224a20(0x24b)]['call'](this,_0x366254);return this[_0x224a20(0x21e)]=undefined,_0x35b957;},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x4cd)]=Game_Actor[_0xc574cd(0x405)]['traitObjects'],Game_Actor['prototype'][_0xc574cd(0x3e5)]=function(){const _0x75838c=_0xc574cd;this['_allowArtifactTraitObjects']=!![];const _0x732e3d=VisuMZ[_0x75838c(0x3aa)][_0x75838c(0x4cd)][_0x75838c(0x3e9)](this);return this[_0x75838c(0x2f9)]=undefined,_0x732e3d;},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x3f9)]=Game_Actor[_0xc574cd(0x405)]['equips'],Game_Actor[_0xc574cd(0x405)]['equips']=function(){const _0x4b7791=_0xc574cd,_0xb365fb=VisuMZ[_0x4b7791(0x3aa)]['Game_Actor_equips_artifacts']['call'](this);if(this['_allowArtifactTraitObjects']||this[_0x4b7791(0x21e)]){if(_0x4b7791(0x1f6)===_0x4b7791(0x1f6)){const _0x122d00=_0xb365fb['concat']($gameParty['partyArtifacts']());return _0x122d00;}else{if(this[_0x4b7791(0x1a4)]())return this[_0x4b7791(0x23f)][_0x4b7791(0x1b9)]()===0x1?_0x52103a['getInputMultiButtonStrings']('left',_0x4b7791(0xae)):_0x1a6b8['getInputMultiButtonStrings'](_0x4b7791(0x42c),_0x4b7791(0x331));return _0xd0dce1[_0x4b7791(0x405)][_0x4b7791(0x1d1)]['call'](this);}}else{if(_0x4b7791(0x18b)==='IqBBV')return _0xb365fb;else this['_buyWindowLastIndex']=this['_buyWindow'][_0x4b7791(0x351)](),this[_0x4b7791(0x492)][_0x4b7791(0x3dc)](),this[_0x4b7791(0x492)][_0x4b7791(0x1da)](),this['_buyWindow'][_0x4b7791(0xc6)](0x0,0x0),this[_0x4b7791(0x4e4)]['show'](),this[_0x4b7791(0x105)][_0x4b7791(0x27d)]();}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0xad)]=Game_BattlerBase[_0xc574cd(0x405)][_0xc574cd(0x13b)],Game_BattlerBase[_0xc574cd(0x405)][_0xc574cd(0x13b)]=function(_0x1badad){const _0xfeb67b=_0xc574cd;let _0x4c3b14=VisuMZ['ItemsEquipsCore']['Game_BattlerBase_paramPlus_artifact']['call'](this,_0x1badad);if(this[_0xfeb67b(0x1a1)]===Game_Enemy){if('dVPQc'!=='WJjmR')for(const _0x21dfda of $gameParty[_0xfeb67b(0x370)]()){if(_0x21dfda)_0x4c3b14+=_0x21dfda[_0xfeb67b(0x94)][_0x1badad];}else return _0x5cb52e[_0xfeb67b(0x3aa)][_0xfeb67b(0x241)][_0xfeb67b(0x2a6)]['LabelSuccessRate'];}return _0x4c3b14;},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x21f)]=Game_Enemy[_0xc574cd(0x405)][_0xc574cd(0x3e5)],Game_Enemy[_0xc574cd(0x405)][_0xc574cd(0x3e5)]=function(){const _0x234456=_0xc574cd;let _0x1fb151=VisuMZ['ItemsEquipsCore'][_0x234456(0x21f)]['call'](this);return _0x1fb151[_0x234456(0x365)]($gameParty[_0x234456(0x370)]());},VisuMZ['ItemsEquipsCore']['Game_Party_gainItem_artifact']=Game_Party[_0xc574cd(0x405)]['gainItem'],Game_Party[_0xc574cd(0x405)][_0xc574cd(0x40f)]=function(_0x145778,_0x1597eb,_0x5782f7){const _0x991af7=_0xc574cd;VisuMZ['ItemsEquipsCore'][_0x991af7(0x4ba)][_0x991af7(0x3e9)](this,_0x145778,_0x1597eb,_0x5782f7);if(DataManager['isArtifact'](_0x145778)){let _0x424de0=$gameParty['allMembers']();if($gameParty['inBattle']())_0x424de0=_0x424de0[_0x991af7(0x365)]($gameTroop[_0x991af7(0xe8)]());for(const _0x384cdf of $gameTroop['members']()){if(_0x991af7(0xb9)!==_0x991af7(0x1db)){if(!_0x384cdf)continue;_0x384cdf['_cache']={};}else{const _0x5b5e70=_0x162481[_0x991af7(0x3aa)]['Settings'][_0x991af7(0x372)];let _0x4564dd=_0x5b5e70[_0x991af7(0x51d)]!==_0x39f17b?_0x5b5e70[_0x991af7(0x51d)]:0x13;return _0x36ac73['getColor'](_0x4564dd);}}}},Game_Party[_0xc574cd(0x405)][_0xc574cd(0x531)]=function(){const _0x54205c=_0xc574cd;let _0x46ebc5=[];for(const _0x4817f1 of this['armors']()){if(_0x54205c(0x4be)!==_0x54205c(0x4be))return;else{if(!_0x4817f1)continue;if(!DataManager[_0x54205c(0xf8)](_0x4817f1))continue;if(!DataManager[_0x54205c(0x13c)](_0x4817f1))continue;let _0xe5c7a=0x1;if(DataManager[_0x54205c(0x288)](_0x4817f1))_0xe5c7a=this[_0x54205c(0x267)](_0x4817f1);while(_0xe5c7a--)_0x46ebc5['push'](_0x4817f1);}}return _0x46ebc5;},Game_Party[_0xc574cd(0x405)]['troopArtifacts']=function(){const _0x3133b5=_0xc574cd;let _0x3b48a1=[];for(const _0xf5057d of this[_0x3133b5(0x2ea)]()){if(!_0xf5057d)continue;if(!DataManager[_0x3133b5(0xf8)](_0xf5057d))continue;if(!DataManager['isTroopArtifact'](_0xf5057d))continue;let _0x481946=0x1;if(DataManager[_0x3133b5(0x288)](_0xf5057d))_0x481946=this['numItems'](_0xf5057d);while(_0x481946--)_0x3b48a1[_0x3133b5(0x320)](_0xf5057d);}return _0x3b48a1;},Game_Party[_0xc574cd(0x405)][_0xc574cd(0xc3)]=function(){const _0xdf461f=_0xc574cd;return this[_0xdf461f(0x531)]()[_0xdf461f(0x365)](this[_0xdf461f(0x370)]());},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x1fb)]=Game_Party[_0xc574cd(0x405)][_0xc574cd(0xe1)],Game_Party['prototype'][_0xc574cd(0xe1)]=function(){const _0x2f0900=_0xc574cd;VisuMZ[_0x2f0900(0x3aa)][_0x2f0900(0x1fb)][_0x2f0900(0x3e9)](this),this[_0x2f0900(0x3d5)]();},Game_Party[_0xc574cd(0x405)][_0xc574cd(0x3d5)]=function(){const _0x1696db=_0xc574cd,_0x391714=$gameParty[_0x1696db(0x2ea)]()[_0x1696db(0x121)](_0x39de47=>DataManager[_0x1696db(0xf8)](_0x39de47));for(const _0x5b7b09 of _0x391714){const _0x7459d7=this['numItems'](_0x5b7b09);if(_0x7459d7)this[_0x1696db(0x198)](_0x5b7b09,_0x7459d7);}},TextManager[_0xc574cd(0x539)]={'helpDesc':{'equip':VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x241)][_0xc574cd(0x372)][_0xc574cd(0x2bb)]??_0xc574cd(0x1e4),'optimize':VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x241)][_0xc574cd(0x372)][_0xc574cd(0x321)]??_0xc574cd(0x24c),'clear':VisuMZ['ItemsEquipsCore']['Settings'][_0xc574cd(0x372)]['clearCmdDesc']??_0xc574cd(0x34c)}},ColorManager[_0xc574cd(0x201)]=function(_0x7fedad){const _0xca60d6=_0xc574cd;if(!_0x7fedad)return _0xca60d6(0xd1)===_0xca60d6(0xd1)?this['normalColor']():this[_0xca60d6(0x3f5)]()[_0xca60d6(0x4e0)](/LOWER/i);else{if(_0x7fedad['note'][_0xca60d6(0x4e0)](/<COLOR:[ ](\d+)>/i)){if('imNxb'!=='nLtGA')return this['textColor'](Number(RegExp['$1'])[_0xca60d6(0x11e)](0x0,0x1f));else this[_0xca60d6(0x2ef)][_0xca60d6(0x351)]()>=0x0?(_0x1d6383[_0xca60d6(0x3aa)][_0xca60d6(0x3a5)][_0xca60d6(0x3e9)](this),this[_0xca60d6(0x197)]()):(this[_0xca60d6(0x2ef)]['smoothSelect'](0x0),this[_0xca60d6(0x2ef)][_0xca60d6(0x412)]());}else{if(_0x7fedad[_0xca60d6(0x2db)][_0xca60d6(0x4e0)](/<COLOR:[ ]#(.*)>/i))return'#'+String(RegExp['$1']);else{if(_0xca60d6(0x179)===_0xca60d6(0x179))return this['normalColor']();else _0x191e05=_0xca60d6(0x41f)[_0xca60d6(0x2f2)](_0x54665c['id']);}}}},ColorManager['getColor']=function(_0x32dbe2){const _0x33de4a=_0xc574cd;return _0x32dbe2=String(_0x32dbe2),_0x32dbe2[_0x33de4a(0x4e0)](/#(.*)/i)?_0x33de4a(0x317)[_0x33de4a(0x2f2)](String(RegExp['$1'])):this[_0x33de4a(0x36e)](Number(_0x32dbe2));},SceneManager[_0xc574cd(0xdd)]=function(){const _0x26cf89=_0xc574cd;return this['_scene']&&this['_scene'][_0x26cf89(0x1a1)]===Scene_Shop;},Game_Temp[_0xc574cd(0x405)][_0xc574cd(0x2f8)]=function(){const _0x5389f5=_0xc574cd;if(this[_0x5389f5(0x4b2)])return![];return VisuMZ[_0x5389f5(0x3aa)][_0x5389f5(0x241)][_0x5389f5(0x3ac)]['Enable'];},VisuMZ[_0xc574cd(0x91)]=VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x241)][_0xc574cd(0x2a6)][_0xc574cd(0x532)],VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x264)]=Game_BattlerBase[_0xc574cd(0x405)][_0xc574cd(0x2ae)],Game_BattlerBase[_0xc574cd(0x405)]['param']=function(_0x41de4e){const _0x93888a=_0xc574cd;return this[_0x93888a(0x131)]?this[_0x93888a(0x400)]?VisuMZ[_0x93888a(0x91)]:0x1:VisuMZ['ItemsEquipsCore'][_0x93888a(0x264)][_0x93888a(0x3e9)](this,_0x41de4e);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x8a)]=Game_BattlerBase[_0xc574cd(0x405)]['meetsItemConditions'],Game_BattlerBase[_0xc574cd(0x405)][_0xc574cd(0x262)]=function(_0x1dfeb9){const _0xa5d5b3=_0xc574cd;if(!_0x1dfeb9)return![];if(!VisuMZ[_0xa5d5b3(0x3aa)]['Game_BattlerBase_meetsItemConditions'][_0xa5d5b3(0x3e9)](this,_0x1dfeb9))return![];if(!this['meetsItemConditionsNotetags'](_0x1dfeb9))return![];if(!this[_0xa5d5b3(0x1fc)](_0x1dfeb9))return![];return!![];},Game_BattlerBase['prototype'][_0xc574cd(0x1b3)]=function(_0x51774a){const _0xa11366=_0xc574cd;if(!this[_0xa11366(0x2fd)](_0x51774a))return![];return!![];},Game_BattlerBase[_0xc574cd(0x405)][_0xc574cd(0x2fd)]=function(_0x480109){const _0x479854=_0xc574cd,_0x19a0c7=_0x480109[_0x479854(0x2db)];if(_0x19a0c7[_0x479854(0x4e0)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x378416=JSON[_0x479854(0x2cf)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4d2d5c of _0x378416){if(!$gameSwitches[_0x479854(0x118)](_0x4d2d5c))return![];}return!![];}if(_0x19a0c7[_0x479854(0x4e0)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x479854(0x500)==='LuhNJ'){const _0x3bf131=JSON[_0x479854(0x2cf)]('['+RegExp['$1'][_0x479854(0x4e0)](/\d+/g)+']');for(const _0x182230 of _0x3bf131){if(!$gameSwitches[_0x479854(0x118)](_0x182230))return![];}return!![];}else return _0x479854(0x3bb);}if(_0x19a0c7[_0x479854(0x4e0)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x28e36c=JSON[_0x479854(0x2cf)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x525246 of _0x28e36c){if($gameSwitches[_0x479854(0x118)](_0x525246))return!![];}return![];}if(_0x19a0c7[_0x479854(0x4e0)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x479854(0x3fb)===_0x479854(0x3f7))return _0x1b1e7d[_0x479854(0x3aa)][_0x479854(0x241)][_0x479854(0x2a6)][_0x479854(0x4f3)];else{const _0x5802ab=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1b7d2a of _0x5802ab){if(!$gameSwitches['value'](_0x1b7d2a))return!![];}return![];}}if(_0x19a0c7[_0x479854(0x4e0)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x568abc=JSON[_0x479854(0x2cf)]('['+RegExp['$1'][_0x479854(0x4e0)](/\d+/g)+']');for(const _0x5afe83 of _0x568abc){if(!$gameSwitches['value'](_0x5afe83))return!![];}return![];}if(_0x19a0c7[_0x479854(0x4e0)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x479854(0x29c)==='VZDUK'){const _0x469406=JSON[_0x479854(0x2cf)]('['+RegExp['$1'][_0x479854(0x4e0)](/\d+/g)+']');for(const _0x46df7e of _0x469406){if($gameSwitches[_0x479854(0x118)](_0x46df7e))return![];}return!![];}else{if(!_0x34076a)return 0x0;let _0x5eded0=_0x5d30e8[_0x479854(0x3aa)][_0x479854(0x477)][_0x479854(0x3e9)](this,_0x4fa260);return _0x30ea53[_0x479854(0x1ef)](0x0,this[_0x479854(0x2de)](_0x142ce5,_0x5eded0));}}return!![];},Game_BattlerBase[_0xc574cd(0x405)][_0xc574cd(0x1fc)]=function(_0x13d344){const _0x37b845=_0xc574cd,_0x106352=_0x13d344['note'],_0x208365=VisuMZ['ItemsEquipsCore']['itemEnableJS'];if(_0x208365[_0x13d344['id']])return _0x208365[_0x13d344['id']][_0x37b845(0x3e9)](this,_0x13d344);else{if(_0x37b845(0x28b)!==_0x37b845(0x3cb))return!![];else _0x1a450e=this[_0x37b845(0x1e1)][_0x37b845(0x2ae)](_0x4f10b9),_0x2d7287=this['_tempActor'][_0x37b845(0x2ae)](_0x3dfcf4),_0x3f2cab=_0x4433e5%0x1!==0x0||_0x1d994c%0x1!==0x0;}},Game_Actor[_0xc574cd(0x405)]['initEquips']=function(_0x4785cd){const _0x3f8876=_0xc574cd;_0x4785cd=this[_0x3f8876(0x383)](_0x4785cd);const _0x459646=this[_0x3f8876(0x1b7)]();this[_0x3f8876(0x4a0)]=[];for(let _0x2befc1=0x0;_0x2befc1<_0x459646[_0x3f8876(0x294)];_0x2befc1++){this[_0x3f8876(0x4a0)][_0x2befc1]=new Game_Item();}for(let _0xd637ab=0x0;_0xd637ab<_0x459646['length'];_0xd637ab++){const _0x2618d6=_0x459646[_0xd637ab],_0x292c68=this[_0x3f8876(0x3e2)](_0x4785cd,_0x2618d6);if(this[_0x3f8876(0x3ff)](_0x292c68))this[_0x3f8876(0x4a0)][_0xd637ab]['setObject'](_0x292c68);}this[_0x3f8876(0xde)](!![]),this[_0x3f8876(0x3b4)]();},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x383)]=function(_0x238baa){const _0x7ff1a5=_0xc574cd,_0xb8d730=[];for(let _0x226ced=0x0;_0x226ced<_0x238baa[_0x7ff1a5(0x294)];_0x226ced++){if('REutq'!==_0x7ff1a5(0x98)){if(_0x36d499[_0x7ff1a5(0x3a3)]())_0x1127f2[_0x7ff1a5(0x3ef)](_0x1db3a9);}else{const _0x2a6f2e=_0x238baa[_0x226ced];if(_0x2a6f2e<=0x0)continue;const _0x2100e8=$dataSystem[_0x7ff1a5(0x4ea)][_0x226ced+0x1];if(_0x2100e8===$dataSystem[_0x7ff1a5(0x4ea)][0x1]||_0x226ced===0x1&&this[_0x7ff1a5(0x350)]())'vVmQF'!==_0x7ff1a5(0x3b5)?_0xb8d730['push']($dataWeapons[_0x2a6f2e]):_0x11d8ce['gainItem'](_0x498af0[_0x7ff1a5(0x410)](),0x1);else{if(BattleManager[_0x7ff1a5(0x308)]()){if(_0x7ff1a5(0x149)!==_0x7ff1a5(0x149))return _0x4f691e=this[_0x7ff1a5(0x2e7)](_0x5af2ca)||_0x55a771,this['isProxyItem'](_0x7a18b7)?this[_0x7ff1a5(0x293)](_0x26d144):_0x6c496c;else{const _0x594bba=$dataArmors[_0x2a6f2e];_0x594bba&&_0x594bba[_0x7ff1a5(0x35c)]===_0x226ced+0x1&&(_0x7ff1a5(0x142)!==_0x7ff1a5(0x89)?_0xb8d730['push'](_0x594bba):_0x23ac32=_0x7ff1a5(0x3a6)[_0x7ff1a5(0x2f2)](_0x2acf05['id']));}}else{if('esfqp'!==_0x7ff1a5(0x421)){const _0x373041=$dataArmors[_0x2a6f2e];if(_0x373041&&_0x373041[_0x7ff1a5(0x35c)]===_0x226ced+0x1){if(_0x7ff1a5(0x1f5)!=='xHafz'){const _0xc3e542=_0x32cb5e(_0x4fd4dd['$1'])||0x1;if(_0x3cfa8e>=_0xc3e542)return!![];}else _0xb8d730['push'](_0x373041);}}else this[_0x7ff1a5(0x492)][_0x7ff1a5(0x3dc)](),this['_commandWindow'][_0x7ff1a5(0x3dc)]();}}}}return _0xb8d730;},Game_Actor['prototype'][_0xc574cd(0x3e2)]=function(_0x55bb77,_0x3e8527){const _0x3852f0=_0xc574cd;for(const _0x4f7c0e of _0x55bb77){if(!_0x4f7c0e)continue;if(_0x4f7c0e['etypeId']===_0x3e8527){if('CUYew'===_0x3852f0(0x1c5))_0x6f8786['isTriggered'](_0x3852f0(0x331))&&this[_0x3852f0(0x517)](),_0x51377b[_0x3852f0(0x510)](_0x3852f0(0x42c))&&this['cursorPageup']();else return _0x55bb77[_0x3852f0(0x499)](_0x55bb77[_0x3852f0(0x1ad)](_0x4f7c0e),0x1),_0x4f7c0e;}}return null;},Game_Actor['prototype'][_0xc574cd(0x1b7)]=function(){const _0xe7a16c=_0xc574cd,_0xd07860=JsonEx[_0xe7a16c(0x346)](this[_0xe7a16c(0x1d0)]||this['currentClass']()[_0xe7a16c(0x1b7)]);if(_0xd07860[_0xe7a16c(0x294)]>=0x2&&this[_0xe7a16c(0x350)]())_0xd07860[0x1]=0x1;return _0xd07860;},Game_Actor['prototype'][_0xc574cd(0x173)]=function(_0x2d37e7){const _0x1e948f=_0xc574cd;_0x2d37e7['remove'](0x0),_0x2d37e7['remove'](-0x1),this['_forcedSlots']=_0x2d37e7,this['refresh'](),this[_0x1e948f(0x4fc)]();},Game_Actor['prototype'][_0xc574cd(0x361)]=function(){const _0x4f0b9c=_0xc574cd;this[_0x4f0b9c(0x1d0)]=undefined,this[_0x4f0b9c(0x3b4)](),this[_0x4f0b9c(0x4fc)]();},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x4fc)]=function(){const _0x265fad=_0xc574cd;let _0x331b4d=this[_0x265fad(0x1b7)]()['length'];while(this['_equips'][_0x265fad(0x294)]>_0x331b4d){const _0x5c7693=this[_0x265fad(0x4a0)][this[_0x265fad(0x4a0)][_0x265fad(0x294)]-0x1];_0x5c7693&&_0x5c7693[_0x265fad(0x410)]()&&$gameParty[_0x265fad(0x40f)](_0x5c7693['object'](),0x1),this[_0x265fad(0x4a0)][_0x265fad(0x4e3)]();}while(_0x331b4d>this[_0x265fad(0x4a0)][_0x265fad(0x294)]){this[_0x265fad(0x4a0)][_0x265fad(0x320)](new Game_Item());}},Game_Actor[_0xc574cd(0x405)]['prepareNewEquipSlotsOnLoad']=function(){const _0x4cced=_0xc574cd,_0x3c8594=this[_0x4cced(0x1b7)]();for(let _0x11439a=0x0;_0x11439a<_0x3c8594[_0x4cced(0x294)];_0x11439a++){if('pUFrY'===_0x4cced(0x543)){if(!this[_0x4cced(0x4a0)][_0x11439a])this[_0x4cced(0x4a0)][_0x11439a]=new Game_Item();}else this[_0x4cced(0x1b5)](),_0x405a07[_0x4cced(0x3aa)][_0x4cced(0x2fe)][_0x4cced(0x3e9)](this);}this['releaseUnequippableItems'](![]),this[_0x4cced(0x3b4)]();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x275)]=Game_Actor[_0xc574cd(0x405)]['changeEquip'],Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x4c2)]=function(_0x47d817,_0x12510f){const _0x375cc9=_0xc574cd;if(!this[_0x375cc9(0x314)]){if('FCvMs'===_0x375cc9(0x30e))return this[_0x375cc9(0x131)]?this[_0x375cc9(0x400)]?_0x12c0be[_0x375cc9(0x91)]:0x1:_0x4a2e90[_0x375cc9(0x3aa)]['Game_BattlerBase_param']['call'](this,_0x2deda9);else{const _0x53bc2f=JsonEx[_0x375cc9(0x346)](this);_0x53bc2f[_0x375cc9(0x314)]=!![],VisuMZ['ItemsEquipsCore'][_0x375cc9(0x275)]['call'](this,_0x47d817,_0x12510f),this[_0x375cc9(0x431)](_0x53bc2f);}}else{if(_0x375cc9(0x3f1)===_0x375cc9(0x3e1)){const _0xcd1cd3=this['getItemHitTypeLabel']();this['drawItemKeyData'](_0xcd1cd3,_0x354c42,_0x102e72,_0x49f190,!![]);const _0x36cbfe=this['getItemHitTypeText']();return this['drawItemKeyData'](_0x36cbfe,_0x1c3f45,_0x4d98c2,_0x2f3382,![],_0x375cc9(0xae)),this[_0x375cc9(0x1d3)](_0x2ee620,_0x1a01e2,_0x2e82c7),this[_0x375cc9(0x306)](),!![];}else VisuMZ['ItemsEquipsCore'][_0x375cc9(0x275)][_0x375cc9(0x3e9)](this,_0x47d817,_0x12510f);}},VisuMZ['ItemsEquipsCore']['Game_Actor_forceChangeEquip']=Game_Actor[_0xc574cd(0x405)]['forceChangeEquip'],Game_Actor['prototype'][_0xc574cd(0x2ca)]=function(_0x361d31,_0x2fea96){const _0x43c573=_0xc574cd;if(!this['_tempActor']){const _0x2518d4=JsonEx[_0x43c573(0x346)](this);_0x2518d4['_tempActor']=!![],VisuMZ[_0x43c573(0x3aa)][_0x43c573(0x44d)][_0x43c573(0x3e9)](this,_0x361d31,_0x2fea96),this[_0x43c573(0x431)](_0x2518d4);}else'sueMs'!==_0x43c573(0x19f)?VisuMZ[_0x43c573(0x3aa)][_0x43c573(0x44d)][_0x43c573(0x3e9)](this,_0x361d31,_0x2fea96):(_0x207ed4[_0x43c573(0x3aa)]['Scene_Shop_onSellOk'][_0x43c573(0x3e9)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x43c573(0x23b)]());},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x139)]=Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x3fd)],Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x3fd)]=function(_0x1aef2e){const _0x5b70f9=_0xc574cd;if(!this[_0x5b70f9(0x314)]){const _0x4478d1=JsonEx[_0x5b70f9(0x346)](this);_0x4478d1[_0x5b70f9(0x314)]=!![],VisuMZ['ItemsEquipsCore'][_0x5b70f9(0x139)][_0x5b70f9(0x3e9)](this,_0x1aef2e),this[_0x5b70f9(0x431)](_0x4478d1);}else _0x5b70f9(0x3ec)===_0x5b70f9(0x2ff)?_0x46a46d=_0x5b70f9(0x41f)[_0x5b70f9(0x2f2)](_0x2dbc3c['id']):VisuMZ[_0x5b70f9(0x3aa)][_0x5b70f9(0x139)]['call'](this,_0x1aef2e);},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0xde)]=function(_0x362879){const _0x57317c=_0xc574cd;if(this[_0x57317c(0x3ee)])return;for(;;){const _0x10e3bc=this[_0x57317c(0x1b7)](),_0x13718a=this[_0x57317c(0x2bd)](),_0x28d9a1=_0x13718a['length'];let _0x35462f=![];for(let _0x20c888=0x0;_0x20c888<_0x28d9a1;_0x20c888++){const _0x16229c=_0x13718a[_0x20c888];if(_0x16229c&&(!this[_0x57317c(0x3ff)](_0x16229c)||_0x16229c[_0x57317c(0x35c)]!==_0x10e3bc[_0x20c888])){!_0x362879&&this[_0x57317c(0x369)](null,_0x16229c);if(!this[_0x57317c(0x314)]){if(_0x57317c(0x2ad)!==_0x57317c(0x3b1)){const _0xb7b97c=JsonEx[_0x57317c(0x346)](this);_0xb7b97c[_0x57317c(0x314)]=!![],this[_0x57317c(0x4a0)][_0x20c888][_0x57317c(0x474)](null),this[_0x57317c(0x3ee)]=!![],this[_0x57317c(0x431)](_0xb7b97c),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=undefined;}else{const _0x68af99=_0x1418da['x']+_0x38aa3a['floor']((_0x59c454['width']-_0x50e250)/0x2);this[_0x57317c(0xe3)](_0x5ef382,_0x68af99,_0x59e91e['y'],_0x4e878b);}}else{if(_0x57317c(0x46f)!==_0x57317c(0x46f)){if(this[_0x57317c(0x248)](_0xbd7627))return![];if(this['isSoleWeaponType'](_0xd13f6c))return![];if(this[_0x57317c(0x2d7)](_0x3b7b89))return![];}else this[_0x57317c(0x4a0)][_0x20c888][_0x57317c(0x474)](null);}_0x35462f=!![];}}if(!_0x35462f)break;}},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x431)]=function(_0xf3f003){const _0x4b9628=_0xc574cd;if(this[_0x4b9628(0x314)])return;if(!VisuMZ[_0x4b9628(0x3aa)][_0x4b9628(0x241)][_0x4b9628(0x372)]['EquipAdjustHpMp'])return;const _0x4e8d52=Math[_0x4b9628(0x434)](_0xf3f003[_0x4b9628(0x152)]()*this[_0x4b9628(0x127)]),_0x3a47ad=Math[_0x4b9628(0x434)](_0xf3f003[_0x4b9628(0x53f)]()*this['mmp']);if(this['hp']>0x0)this['setHp'](_0x4e8d52);if(this['mp']>0x0)this['setMp'](_0x3a47ad);},Game_Actor['prototype']['clearEquipments']=function(){const _0xa3eb03=_0xc574cd,_0x39c68c=this[_0xa3eb03(0x1b7)]()['length'];for(let _0x418ae0=0x0;_0x418ae0<_0x39c68c;_0x418ae0++){if(this['isClearEquipOk'](_0x418ae0))this['changeEquip'](_0x418ae0,null);}},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x1e9)]=function(_0xba6e7a){const _0x436c04=_0xc574cd;if(this[_0x436c04(0x2d9)]()['includes'](this[_0x436c04(0x1b7)]()[_0xba6e7a])){if(_0x436c04(0x26a)!=='LWhZa'){let _0x57745a=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return _0x22d434[_0x436c04(0x301)]&&(_0x57745a=_0x535a07['CoreEngine']['Settings'][_0x436c04(0x44e)][_0x436c04(0x175)]),_0x57745a=_0x57745a[_0x436c04(0x2ed)](_0x5ab24d=>typeof _0x5ab24d===_0x436c04(0x53c)?_0x5ab24d:_0x5ab24d[_0x436c04(0x23c)]()[_0x436c04(0x3c0)]()),_0x57745a;}else return![];}else return this[_0x436c04(0x4c4)](_0xba6e7a);},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x2d9)]=function(){const _0x1c2945=_0xc574cd;return VisuMZ['ItemsEquipsCore'][_0x1c2945(0x241)][_0x1c2945(0x372)][_0x1c2945(0x4dc)];},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x4fe)]=function(){const _0x46c5c8=_0xc574cd,_0x190c9d=this[_0x46c5c8(0x1b7)]()[_0x46c5c8(0x294)];for(let _0x203bd5=0x0;_0x203bd5<_0x190c9d;_0x203bd5++){if(_0x46c5c8(0x4ac)!=='OlDLc'){const _0x109be4=this[_0x46c5c8(0x1b7)]()[_0x46c5c8(0x294)];for(let _0x4c6f0d=0x0;_0x4c6f0d<_0x109be4;_0x4c6f0d++){if(this[_0x46c5c8(0x1e9)](_0x4c6f0d))this[_0x46c5c8(0x4c2)](_0x4c6f0d,null);}}else{if(this[_0x46c5c8(0x14a)](_0x203bd5))this[_0x46c5c8(0x4c2)](_0x203bd5,null);}}for(let _0x22c991=0x0;_0x22c991<_0x190c9d;_0x22c991++){if(this['isOptimizeEquipOk'](_0x22c991))this[_0x46c5c8(0x4c2)](_0x22c991,this[_0x46c5c8(0x8e)](_0x22c991));}},Game_Actor['prototype']['isOptimizeEquipOk']=function(_0x5bf956){const _0x5461d2=_0xc574cd;if(this[_0x5461d2(0x396)]()[_0x5461d2(0x3a8)](this[_0x5461d2(0x1b7)]()[_0x5bf956])){if(_0x5461d2(0x347)!=='vLzlP'){const _0x5a6d5f=new _0x3b515c(0x0,0x0,_0x585d92[_0x5461d2(0x4d5)],_0x2593be['height']);this[_0x5461d2(0x30b)]=new _0x404e5d(_0x5a6d5f),this[_0x5461d2(0x30b)][_0x5461d2(0x1c0)]=0x0,this[_0x5461d2(0x19a)](this[_0x5461d2(0x30b)]),this[_0x5461d2(0x522)]();}else return![];}else return _0x5461d2(0x46e)!=='WZrRG'?_0x50ca63['ItemsEquipsCore']['Settings'][_0x5461d2(0x372)][_0x5461d2(0x3ed)]:this[_0x5461d2(0x4c4)](_0x5bf956);},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x396)]=function(){const _0x9c54f9=_0xc574cd;return VisuMZ[_0x9c54f9(0x3aa)][_0x9c54f9(0x241)][_0x9c54f9(0x372)][_0x9c54f9(0x27c)];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x468)]=Game_Actor[_0xc574cd(0x405)]['tradeItemWithParty'],Game_Actor['prototype'][_0xc574cd(0x369)]=function(_0x2db456,_0x338c16){const _0x58d703=_0xc574cd;if(this['_tempActor'])return![];$gameTemp[_0x58d703(0x4b2)]=!![];const _0x187e19=VisuMZ[_0x58d703(0x3aa)][_0x58d703(0x468)]['call'](this,_0x2db456,_0x338c16);return $gameTemp[_0x58d703(0x4b2)]=![],_0x187e19;},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x438)]=function(_0x52cb4c,_0xde1d6a){const _0x538cc5=_0xc574cd,_0x1f241f=this['getNextAvailableEtypeId'](_0x52cb4c);if(_0x1f241f<0x0)return;const _0x1b76e1=_0x52cb4c===0x1?$dataWeapons[_0xde1d6a]:$dataArmors[_0xde1d6a];this[_0x538cc5(0x4c2)](_0x1f241f,_0x1b76e1);},Game_Actor[_0xc574cd(0x405)]['getNextAvailableEtypeId']=function(_0x1e5f26){const _0x5f4de8=_0xc574cd;let _0xac3f36=0x0;const _0x4cae6a=this[_0x5f4de8(0x1b7)](),_0x3402e2=this[_0x5f4de8(0x2bd)]();for(let _0x49c2f2=0x0;_0x49c2f2<_0x4cae6a[_0x5f4de8(0x294)];_0x49c2f2++){if(_0x4cae6a[_0x49c2f2]===_0x1e5f26){_0xac3f36=_0x49c2f2;if(!_0x3402e2[_0x49c2f2])return _0xac3f36;}}return _0xac3f36;},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x4c9)]=Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x13b)],Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x13b)]=function(_0x109588){const _0x10f95a=_0xc574cd;let _0x4e7ae6=VisuMZ[_0x10f95a(0x3aa)]['Game_Actor_paramPlus'][_0x10f95a(0x3e9)](this,_0x109588);for(const _0x1e6178 of this[_0x10f95a(0x2bd)]()){if('suBBK'!==_0x10f95a(0x2c0)){if(_0x1e6178)_0x4e7ae6+=this[_0x10f95a(0x242)](_0x1e6178,_0x109588);}else return this['normalColor']();}return _0x4e7ae6;},Game_Actor['prototype']['paramPlusItemsEquipsCoreCustomJS']=function(_0x3866bc,_0x3019eb){const _0x214dc4=_0xc574cd;if(this[_0x214dc4(0x1d5)])return 0x0;const _0x5928f7=(DataManager[_0x214dc4(0x487)](_0x3866bc)?_0x214dc4(0x178):_0x214dc4(0x368))['format'](_0x3866bc['id']),_0x173a05=_0x214dc4(0x4c6)[_0x214dc4(0x2f2)](_0x5928f7,_0x3019eb);if(VisuMZ[_0x214dc4(0x3aa)]['paramJS'][_0x173a05]){this[_0x214dc4(0x1d5)]=!![];const _0x3e7667=VisuMZ[_0x214dc4(0x3aa)][_0x214dc4(0x47c)][_0x173a05]['call'](this,_0x3866bc,_0x3019eb);return this[_0x214dc4(0x1d5)]=![],_0x3e7667;}else return 0x0;},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0xdc)]=function(_0x585a71){const _0x54c2f7=_0xc574cd;this[_0x54c2f7(0x131)]=!![],this[_0x54c2f7(0x400)]=_0x585a71;},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x124)]=Game_Party['prototype'][_0xc574cd(0x221)],Game_Party[_0xc574cd(0x405)]['initialize']=function(){const _0xcf6341=_0xc574cd;VisuMZ['ItemsEquipsCore'][_0xcf6341(0x124)][_0xcf6341(0x3e9)](this),this[_0xcf6341(0xf2)]();},Game_Party[_0xc574cd(0x405)][_0xc574cd(0xf2)]=function(){this['_newItemsList']=[];},Game_Party[_0xc574cd(0x405)][_0xc574cd(0x151)]=function(_0x4efeb5){const _0x22be7f=_0xc574cd;if(!$gameTemp[_0x22be7f(0x2f8)]())return![];if(this[_0x22be7f(0x340)]===undefined)this[_0x22be7f(0xf2)]();let _0x16299a='';if(DataManager['isItem'](_0x4efeb5))_0x22be7f(0xe2)!==_0x22be7f(0x2a5)?_0x16299a='item-%1'['format'](_0x4efeb5['id']):_0x58e33f=this[_0x22be7f(0x353)]-_0x38c3b9;else{if(DataManager[_0x22be7f(0x487)](_0x4efeb5))_0x16299a=_0x22be7f(0xca)[_0x22be7f(0x2f2)](_0x4efeb5['id']);else{if(DataManager[_0x22be7f(0x467)](_0x4efeb5))_0x16299a=_0x22be7f(0x3a6)[_0x22be7f(0x2f2)](_0x4efeb5['id']);else return;}}return this['_newItemsList'][_0x22be7f(0x3a8)](_0x16299a);},Game_Party['prototype'][_0xc574cd(0x4ca)]=function(_0x48cd3b){const _0x335663=_0xc574cd;if(!$gameTemp[_0x335663(0x2f8)]())return;if(this[_0x335663(0x340)]===undefined)this['initNewItemsList']();let _0x45c576='';if(DataManager[_0x335663(0x165)](_0x48cd3b))_0x45c576=_0x335663(0x41f)[_0x335663(0x2f2)](_0x48cd3b['id']);else{if(DataManager['isWeapon'](_0x48cd3b))_0x45c576=_0x335663(0xca)['format'](_0x48cd3b['id']);else{if(DataManager[_0x335663(0x467)](_0x48cd3b))_0x45c576=_0x335663(0x3a6)['format'](_0x48cd3b['id']);else{if(_0x335663(0x2ec)!==_0x335663(0x230))return;else _0x11d65a[_0x335663(0x2ca)](_0x9e91a6,this['_item']);}}}if(!this[_0x335663(0x340)][_0x335663(0x3a8)](_0x45c576))this[_0x335663(0x340)][_0x335663(0x320)](_0x45c576);},Game_Party[_0xc574cd(0x405)][_0xc574cd(0x2a4)]=function(_0x4f3541){const _0x1be566=_0xc574cd;if(!$gameTemp[_0x1be566(0x2f8)]())return;if(this[_0x1be566(0x340)]===undefined)this[_0x1be566(0xf2)]();let _0x4060e7='';if(DataManager['isItem'](_0x4f3541)){if('aFHgR'===_0x1be566(0xa4))return _0x3e53e2[_0x1be566(0x42f)]&&_0x5e7427[_0x1be566(0x2bf)][_0x1be566(0x3a8)]('['+_0x46d3da+']');else _0x4060e7=_0x1be566(0x41f)[_0x1be566(0x2f2)](_0x4f3541['id']);}else{if(DataManager['isWeapon'](_0x4f3541))_0x4060e7='weapon-%1'[_0x1be566(0x2f2)](_0x4f3541['id']);else{if(DataManager[_0x1be566(0x467)](_0x4f3541)){if(_0x1be566(0x44c)===_0x1be566(0x14c)){if(_0x25aee4[_0x1be566(0x257)](_0x1c7039))_0x85ec3=_0x1cacd2[_0x1be566(0x293)](_0x8bb95d);return _0x161ff8['maxItemAmount'](_0x475516);}else _0x4060e7=_0x1be566(0x3a6)[_0x1be566(0x2f2)](_0x4f3541['id']);}else{if('QrwXA'===_0x1be566(0x1b0)){if(_0x340065['id']===_0x1b65c0['id'])_0x4fd1f7+=0x1;}else return;}}}if(this['_newItemsList'][_0x1be566(0x3a8)](_0x4060e7)){if(_0x1be566(0x2cb)!=='YfssM'){const _0x2104de=_0x450b7a[_0x1be566(0x3aa)][_0x1be566(0x3f9)]['call'](this);if(this['_allowArtifactTraitObjects']||this['_allowArtifactParamBase']){const _0x36bb8a=_0x2104de[_0x1be566(0x365)](_0xf1569d[_0x1be566(0x531)]());return _0x36bb8a;}else return _0x2104de;}else this['_newItemsList']['splice'](this[_0x1be566(0x340)]['indexOf'](_0x4060e7),0x1);}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x21b)]=Game_Party[_0xc574cd(0x405)][_0xc574cd(0x267)],Game_Party[_0xc574cd(0x405)]['numItems']=function(_0x7da6af){const _0x211fe9=_0xc574cd;if(DataManager['isProxyItem'](_0x7da6af))_0x7da6af=DataManager[_0x211fe9(0x293)](_0x7da6af);return VisuMZ[_0x211fe9(0x3aa)][_0x211fe9(0x21b)][_0x211fe9(0x3e9)](this,_0x7da6af);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x1e7)]=Game_Party[_0xc574cd(0x405)][_0xc574cd(0x40f)],Game_Party[_0xc574cd(0x405)]['gainItem']=function(_0x2dc2c3,_0x211d7a,_0x4eca6d){const _0x2f7b51=_0xc574cd;if(DataManager[_0x2f7b51(0x257)](_0x2dc2c3))_0x2dc2c3=null;const _0x50df04=this[_0x2f7b51(0x267)](_0x2dc2c3);VisuMZ[_0x2f7b51(0x3aa)][_0x2f7b51(0x1e7)][_0x2f7b51(0x3e9)](this,_0x2dc2c3,_0x211d7a,_0x4eca6d);if(this[_0x2f7b51(0x267)](_0x2dc2c3)>_0x50df04)this[_0x2f7b51(0x4ca)](_0x2dc2c3);},Game_Party[_0xc574cd(0x405)][_0xc574cd(0x13a)]=function(_0x2dbe8f){const _0x250ed4=_0xc574cd;if(DataManager[_0x250ed4(0x257)](_0x2dbe8f))_0x2dbe8f=DataManager['getProxyItem'](_0x2dbe8f);return DataManager[_0x250ed4(0x11d)](_0x2dbe8f);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x4cf)]=Scene_ItemBase[_0xc574cd(0x405)][_0xc574cd(0x17d)],Scene_ItemBase[_0xc574cd(0x405)][_0xc574cd(0x17d)]=function(){const _0x4e0ec7=_0xc574cd;VisuMZ[_0x4e0ec7(0x3aa)][_0x4e0ec7(0x4cf)]['call'](this),this['_itemWindow'][_0x4e0ec7(0x4bc)]();},Scene_Item[_0xc574cd(0x405)]['isBottomHelpMode']=function(){const _0x21ba98=_0xc574cd;if(ConfigManager[_0x21ba98(0x28d)]&&ConfigManager[_0x21ba98(0x3d4)]!==undefined){if('uSuYb'!==_0x21ba98(0x22d))return ConfigManager['uiHelpPosition'];else _0x1d591d=_0x21ba98(0xca)['format'](_0x13a015['id']);}else{if(this[_0x21ba98(0x39d)]()){if(_0x21ba98(0xb2)!=='WraXW')_0x932ddc=_0x21ba98(0x244)[_0x21ba98(0x2f2)](_0x3c697b,_0x52fafd);else return this['updatedLayoutStyle']()['match'](/LOWER/i);}else Scene_ItemBase[_0x21ba98(0x405)][_0x21ba98(0x147)][_0x21ba98(0x3e9)](this);}},Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x147)]=function(){const _0x5c3330=_0xc574cd;if(ConfigManager[_0x5c3330(0x28d)]&&ConfigManager[_0x5c3330(0x2ba)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x5c3330(0x39d)]()){if(_0x5c3330(0x479)!==_0x5c3330(0x525))return this['updatedLayoutStyle']()[_0x5c3330(0x4e0)](/RIGHT/i);else _0x2b3b57=_0x5c3330(0x3a6)[_0x5c3330(0x2f2)](_0x54fad6['id']);}else Scene_ItemBase['prototype']['isRightInputMode'][_0x5c3330(0x3e9)](this);}},Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x3f5)]=function(){const _0x3419ea=_0xc574cd;return VisuMZ['ItemsEquipsCore'][_0x3419ea(0x241)][_0x3419ea(0x45b)]['LayoutStyle'];},Scene_Item[_0xc574cd(0x405)]['isUseModernControls']=function(){const _0x580730=_0xc574cd;return this[_0x580730(0x439)]&&this['_categoryWindow'][_0x580730(0x374)]();},Scene_Item['prototype']['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x430811=_0xc574cd;return VisuMZ[_0x430811(0x3aa)][_0x430811(0x241)][_0x430811(0x45b)][_0x430811(0x156)];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x2e9)]=Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x2e1)],Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x2e1)]=function(){const _0x951552=_0xc574cd;VisuMZ[_0x951552(0x3aa)]['Scene_Item_create'][_0x951552(0x3e9)](this),this[_0x951552(0x374)]()&&this['onCategoryOk']();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x144)]=Scene_Item[_0xc574cd(0x405)]['helpWindowRect'],Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x428)]=function(){const _0xf0888d=_0xc574cd;if(this[_0xf0888d(0x39d)]()){if(_0xf0888d(0x130)==='yoEcN')return this[_0xf0888d(0x547)]();else _0x4b169a=_0xf0888d(0x41f)['format'](_0x49700['id']);}else{if(_0xf0888d(0x104)!==_0xf0888d(0x18f))return VisuMZ[_0xf0888d(0x3aa)]['Scene_Item_helpWindowRect'][_0xf0888d(0x3e9)](this);else{const _0x44072b=0x0,_0x5c6806=this[_0xf0888d(0x509)](),_0x2626a9=_0x2cf24b[_0xf0888d(0x14f)],_0x70862e=this[_0xf0888d(0x524)]();return new _0x2aa5a6(_0x44072b,_0x5c6806,_0x2626a9,_0x70862e);}}},Scene_Item['prototype'][_0xc574cd(0x547)]=function(){const _0x2caef7=_0xc574cd,_0x5a55ca=0x0,_0x3d1303=this[_0x2caef7(0x509)](),_0x5586c3=Graphics[_0x2caef7(0x14f)],_0x2c2e5b=this[_0x2caef7(0x524)]();return new Rectangle(_0x5a55ca,_0x3d1303,_0x5586c3,_0x2c2e5b);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x253)]=Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x30a)],Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x30a)]=function(){const _0x515b77=_0xc574cd;VisuMZ['ItemsEquipsCore']['Scene_Item_createCategoryWindow'][_0x515b77(0x3e9)](this),this['isUseModernControls']()&&(_0x515b77(0x129)!==_0x515b77(0x4ce)?this[_0x515b77(0x166)]():this[_0x515b77(0x28c)]());},Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x166)]=function(){const _0x2da190=_0xc574cd;delete this[_0x2da190(0x439)][_0x2da190(0x2f0)]['ok'],delete this['_categoryWindow'][_0x2da190(0x2f0)][_0x2da190(0x1f2)];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x49c)]=Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x537)],Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x537)]=function(){const _0xbbce7c=_0xc574cd;return this[_0xbbce7c(0x39d)]()?this[_0xbbce7c(0xd0)]():VisuMZ[_0xbbce7c(0x3aa)][_0xbbce7c(0x49c)][_0xbbce7c(0x3e9)](this);},Scene_Item['prototype'][_0xc574cd(0xd0)]=function(){const _0x214d50=_0xc574cd,_0x2c7061=0x0,_0x591a4c=this[_0x214d50(0xe5)](),_0x500716=Graphics[_0x214d50(0x14f)],_0x3c6e1f=this[_0x214d50(0x480)](0x1,!![]);return new Rectangle(_0x2c7061,_0x591a4c,_0x500716,_0x3c6e1f);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0xfc)]=Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x39a)],Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x39a)]=function(){const _0x4fb7c7=_0xc574cd;VisuMZ[_0x4fb7c7(0x3aa)][_0x4fb7c7(0xfc)][_0x4fb7c7(0x3e9)](this);this[_0x4fb7c7(0x374)]()&&('yzzbt'===_0x4fb7c7(0x33d)?(_0x3be67b[_0x4fb7c7(0x3aa)][_0x4fb7c7(0xfc)][_0x4fb7c7(0x3e9)](this),this[_0x4fb7c7(0x374)]()&&this[_0x4fb7c7(0x18e)](),this[_0x4fb7c7(0x90)]()&&this[_0x4fb7c7(0xc8)]()):this[_0x4fb7c7(0x18e)]());if(this['allowCreateStatusWindow']()){if(_0x4fb7c7(0x38a)!==_0x4fb7c7(0x533))this[_0x4fb7c7(0xc8)]();else{_0x1f7af7['isTriggered']()&&this[_0x4fb7c7(0x379)](!![]);if(_0x563c88[_0x4fb7c7(0x496)]())this[_0x4fb7c7(0x2c7)]();else _0x2024dc[_0x4fb7c7(0x4f6)]()&&this[_0x4fb7c7(0x2bc)]();}}},VisuMZ[_0xc574cd(0x3aa)]['Scene_Item_itemWindowRect']=Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x9e)],Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x9e)]=function(){const _0x35f62f=_0xc574cd;if(this[_0x35f62f(0x39d)]())return this[_0x35f62f(0xb1)]();else{if('wykoo'===_0x35f62f(0x37b))return _0x1f58c7;else{const _0x50a748=VisuMZ['ItemsEquipsCore'][_0x35f62f(0x45d)][_0x35f62f(0x3e9)](this);return this[_0x35f62f(0x90)]()&&this[_0x35f62f(0x516)]()&&(_0x50a748['width']-=this['statusWidth']()),_0x50a748;}}},Scene_Item[_0xc574cd(0x405)][_0xc574cd(0xb1)]=function(){const _0x26905d=_0xc574cd,_0x46d6b0=this[_0x26905d(0x147)]()?this['statusWidth']():0x0,_0x5bf560=this['_categoryWindow']['y']+this[_0x26905d(0x439)]['height'],_0x3bed92=Graphics['boxWidth']-this[_0x26905d(0x1fd)](),_0x14f431=this[_0x26905d(0xea)]()-_0x5bf560;return new Rectangle(_0x46d6b0,_0x5bf560,_0x3bed92,_0x14f431);},Scene_Item['prototype']['postCreateItemWindowModernControls']=function(){const _0x3925f0=_0xc574cd;this[_0x3925f0(0x23f)]['setHandler']('cancel',this[_0x3925f0(0x180)]['bind'](this));},Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x90)]=function(){const _0x7378e1=_0xc574cd;return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:VisuMZ['ItemsEquipsCore'][_0x7378e1(0x241)]['ItemScene']['ShowShopStatus'];},Scene_Item[_0xc574cd(0x405)]['adjustItemWidthByStatus']=function(){const _0x1407f0=_0xc574cd;return VisuMZ['ItemsEquipsCore'][_0x1407f0(0x241)][_0x1407f0(0x45b)][_0x1407f0(0x212)];},Scene_Item[_0xc574cd(0x405)]['createStatusWindow']=function(){const _0x40f80b=_0xc574cd,_0x245684=this[_0x40f80b(0x514)]();this[_0x40f80b(0x4e4)]=new Window_ShopStatus(_0x245684),this['addWindow'](this[_0x40f80b(0x4e4)]),this[_0x40f80b(0x23f)]['setStatusWindow'](this[_0x40f80b(0x4e4)]);const _0x4d606f=VisuMZ[_0x40f80b(0x3aa)][_0x40f80b(0x241)][_0x40f80b(0x45b)][_0x40f80b(0x246)];this[_0x40f80b(0x4e4)][_0x40f80b(0x503)](_0x4d606f||0x0);},Scene_Item['prototype'][_0xc574cd(0x514)]=function(){const _0x3b7e0a=_0xc574cd;if(this[_0x3b7e0a(0x39d)]()){if(_0x3b7e0a(0x48d)!=='ktpSb')return this[_0x3b7e0a(0x4e8)]();else{this[_0x3b7e0a(0x1d5)]=!![];const _0x3d504a=_0x436ba9[_0x3b7e0a(0x3aa)]['paramJS'][_0x607b3e][_0x3b7e0a(0x3e9)](this,_0x2bfe78,_0x5bfb10);return this[_0x3b7e0a(0x1d5)]=![],_0x3d504a;}}else return VisuMZ['ItemsEquipsCore'][_0x3b7e0a(0x241)]['ItemScene'][_0x3b7e0a(0x476)][_0x3b7e0a(0x3e9)](this);},Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x4e8)]=function(){const _0x2f8f0a=_0xc574cd,_0x29bec4=this[_0x2f8f0a(0x1fd)](),_0x3e7072=this[_0x2f8f0a(0x23f)]['height'],_0x4a51dd=this[_0x2f8f0a(0x147)]()?0x0:Graphics['boxWidth']-this[_0x2f8f0a(0x1fd)](),_0x474075=this['_itemWindow']['y'];return new Rectangle(_0x4a51dd,_0x474075,_0x29bec4,_0x3e7072);},Scene_Item['prototype']['statusWidth']=function(){const _0xde5a70=_0xc574cd;return Scene_Shop[_0xde5a70(0x405)][_0xde5a70(0x1fd)]();},Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x1a4)]=function(){const _0x15ed47=_0xc574cd;if(!this[_0x15ed47(0x3f5)]())return![];if(!this[_0x15ed47(0x374)]())return![];if(!this[_0x15ed47(0x23f)])return![];if(!this['_itemWindow'][_0x15ed47(0x110)])return![];return this['updatedLayoutStyle']()&&this['isUseModernControls']();},Scene_Item[_0xc574cd(0x405)]['buttonAssistKey1']=function(){const _0x2c598c=_0xc574cd;if(this['buttonAssistItemListRequirement']()){if(this[_0x2c598c(0x23f)][_0x2c598c(0x1b9)]()===0x1){if(_0x2c598c(0x214)===_0x2c598c(0x3b7)){const _0x4bbfa0=_0x317861['loadSystem'](_0x2c598c(0x451)),_0x12dbbd=_0x2667a3[_0x2c598c(0x273)],_0xce9b72=_0x3be10d['iconHeight'],_0x4c5311=_0xf19f0%0x10*_0x12dbbd,_0x15a2df=_0xdbc534['floor'](_0x4441e7/0x10)*_0xce9b72,_0x2fa18d=_0x515460[_0x2c598c(0x4aa)](_0x12dbbd*this[_0x2c598c(0x160)]()),_0x1dba9f=_0x46bede[_0x2c598c(0x4aa)](_0xce9b72*this[_0x2c598c(0x160)]());this[_0x2c598c(0x211)]['blt'](_0x4bbfa0,_0x4c5311,_0x15a2df,_0x12dbbd,_0xce9b72,_0x15e9b1,_0x7cfe29,_0x2fa18d,_0x1dba9f);}else return TextManager[_0x2c598c(0x491)](_0x2c598c(0x414),_0x2c598c(0xae));}else{if('nouJN'!=='gkyGP')return TextManager[_0x2c598c(0x491)](_0x2c598c(0x42c),_0x2c598c(0x331));else _0x58740b=_0x459c15['max'](this[_0x2c598c(0x18d)](_0x30a5d6,_0x571f31+0x4,_0x1e23ec+0x4,_0x2455b7),_0x5e03f8),_0xd23eae+=_0x364b46;}}return Scene_ItemBase[_0x2c598c(0x405)]['buttonAssistKey1'][_0x2c598c(0x3e9)](this);},Scene_Item[_0xc574cd(0x405)][_0xc574cd(0x300)]=function(){const _0x3ca954=_0xc574cd;if(this[_0x3ca954(0x1a4)]())return'HQniG'!=='HQniG'?!![]:VisuMZ['ItemsEquipsCore'][_0x3ca954(0x241)][_0x3ca954(0x45b)]['buttonAssistCategory'];return Scene_ItemBase[_0x3ca954(0x405)][_0x3ca954(0x300)][_0x3ca954(0x3e9)](this);},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x3e4)]=function(){const _0x1e094d=_0xc574cd;if(ConfigManager[_0x1e094d(0x28d)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x1e094d(0x3d4)];else{if(this[_0x1e094d(0x39d)]())return this[_0x1e094d(0x3f5)]()[_0x1e094d(0x4e0)](/LOWER/i);else Scene_MenuBase[_0x1e094d(0x405)]['isRightInputMode']['call'](this);}},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x147)]=function(){const _0x5853da=_0xc574cd;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined){if(_0x5853da(0x109)===_0x5853da(0x540)){_0x6391dc['ItemsEquipsCore']['Scene_Equip_createCommandWindow'][_0x5853da(0x3e9)](this);if(this[_0x5853da(0xac)])this[_0x5853da(0x45e)][_0x5853da(0x3a2)](this['_helpWindow']);}else return ConfigManager['uiInputPosition'];}else{if(this[_0x5853da(0x39d)]())return this[_0x5853da(0x3f5)]()[_0x5853da(0x4e0)](/RIGHT/i);else Scene_MenuBase[_0x5853da(0x405)]['isRightInputMode'][_0x5853da(0x3e9)](this);}},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x3f5)]=function(){const _0xd67640=_0xc574cd;return VisuMZ[_0xd67640(0x3aa)][_0xd67640(0x241)][_0xd67640(0x372)]['LayoutStyle'];},Scene_Equip[_0xc574cd(0x405)]['isUseModernControls']=function(){const _0x55c16c=_0xc574cd;return this['_commandWindow']&&this[_0x55c16c(0x45e)][_0x55c16c(0x374)]();},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x39d)]=function(){const _0x2d2c90=_0xc574cd;return VisuMZ[_0x2d2c90(0x3aa)][_0x2d2c90(0x241)]['EquipScene'][_0x2d2c90(0x156)];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x327)]=Scene_Equip['prototype'][_0xc574cd(0x2e1)],Scene_Equip['prototype'][_0xc574cd(0x2e1)]=function(){const _0x342265=_0xc574cd;VisuMZ[_0x342265(0x3aa)][_0x342265(0x327)][_0x342265(0x3e9)](this),this['isUseModernControls']()&&(_0x342265(0x2e0)!==_0x342265(0x3eb)?this[_0x342265(0x43f)]():(_0x139f39[_0x342265(0x3aa)][_0x342265(0x138)]['call'](this),this[_0x342265(0x39d)]()&&this[_0x342265(0x4e4)][_0x342265(0x3dc)](),this[_0x342265(0x3b6)]['updateHelp']()));},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x13e)]=Scene_Equip['prototype'][_0xc574cd(0x428)],Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x428)]=function(){const _0x80c7e3=_0xc574cd;return this[_0x80c7e3(0x39d)]()?this[_0x80c7e3(0x547)]():_0x80c7e3(0x34d)===_0x80c7e3(0xcc)?_0x44795e[_0x80c7e3(0x3aa)]['Settings']['ShopScene'][_0x80c7e3(0x3ed)]:VisuMZ[_0x80c7e3(0x3aa)]['Scene_Equip_helpWindowRect'][_0x80c7e3(0x3e9)](this);},Scene_Equip['prototype']['helpWindowRectItemsEquipsCore']=function(){const _0x22a3cc=_0xc574cd,_0x1a5dc3=0x0,_0x2698b6=this[_0x22a3cc(0x509)](),_0x4cd645=Graphics[_0x22a3cc(0x14f)],_0x44d4e6=this[_0x22a3cc(0x524)]();return new Rectangle(_0x1a5dc3,_0x2698b6,_0x4cd645,_0x44d4e6);},VisuMZ[_0xc574cd(0x3aa)]['Scene_Equip_statusWindowRect']=Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x514)],Scene_Equip[_0xc574cd(0x405)]['statusWindowRect']=function(){const _0x5f3eb7=_0xc574cd;if(this[_0x5f3eb7(0x39d)]()){if('oRjpO'===_0x5f3eb7(0x38e)){const _0x135db7=this['itemLineRect'](_0xcc33c8),_0x1be524=this[_0x5f3eb7(0x21c)](_0x27f232)[_0x5f3eb7(0x4d5)];return _0x1be524<=_0x135db7[_0x5f3eb7(0x4d5)]?_0x5f3eb7(0x1e2):_0x5f3eb7(0x3bb);}else return this['statusWindowRectItemsEquipsCore']();}else return VisuMZ[_0x5f3eb7(0x3aa)][_0x5f3eb7(0x247)][_0x5f3eb7(0x3e9)](this);},Scene_Equip['prototype'][_0xc574cd(0x4e8)]=function(){const _0x840700=_0xc574cd,_0x40481e=this[_0x840700(0x147)]()?0x0:Graphics[_0x840700(0x14f)]-this[_0x840700(0x1fd)](),_0x2843bc=this[_0x840700(0xe5)](),_0x53a090=this[_0x840700(0x1fd)](),_0x5119e5=this['mainAreaHeight']();return new Rectangle(_0x40481e,_0x2843bc,_0x53a090,_0x5119e5);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x208)]=Scene_Equip['prototype'][_0xc574cd(0x17f)],Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x17f)]=function(){const _0x3b5944=_0xc574cd;VisuMZ[_0x3b5944(0x3aa)]['Scene_Equip_createCommandWindow'][_0x3b5944(0x3e9)](this);if(this['_helpWindow'])this[_0x3b5944(0x45e)][_0x3b5944(0x3a2)](this[_0x3b5944(0xac)]);},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x2c9)]=Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x145)],Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x145)]=function(){const _0x384eef=_0xc574cd;return this[_0x384eef(0x39d)]()?this[_0x384eef(0x323)]():_0x384eef(0x471)!=='cXdqg'?_0x2d031a[_0x384eef(0x491)](_0x384eef(0x42c),_0x384eef(0x331)):VisuMZ[_0x384eef(0x3aa)]['Scene_Equip_commandWindowRect'][_0x384eef(0x3e9)](this);},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x31b)]=function(){const _0x7f4555=_0xc574cd,_0x2b4263=VisuMZ[_0x7f4555(0x3aa)][_0x7f4555(0x241)]['EquipScene'];return _0x2b4263[_0x7f4555(0x444)]||_0x2b4263[_0x7f4555(0x51e)];},Scene_Equip[_0xc574cd(0x405)]['commandWindowRectItemsEquipsCore']=function(){const _0x320287=_0xc574cd,_0x2d4318=this[_0x320287(0x31b)](),_0x3222f7=this[_0x320287(0x147)]()?this[_0x320287(0x1fd)]():0x0,_0x4fbc69=this[_0x320287(0xe5)](),_0x25a898=Graphics[_0x320287(0x14f)]-this[_0x320287(0x1fd)](),_0x1e1840=_0x2d4318?this[_0x320287(0x480)](0x1,!![]):0x0;return new Rectangle(_0x3222f7,_0x4fbc69,_0x25a898,_0x1e1840);},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x433)]=Scene_Equip['prototype'][_0xc574cd(0x3dd)],Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x3dd)]=function(){const _0x498edc=_0xc574cd;VisuMZ['ItemsEquipsCore'][_0x498edc(0x433)][_0x498edc(0x3e9)](this),this['isUseModernControls']()&&('YgpdF'===_0x498edc(0x3fc)?(_0x3663a3[_0x498edc(0x510)](_0x498edc(0x331))&&_0xd0c95f['isPressed'](_0x498edc(0x23e))&&this[_0x498edc(0x517)](),_0xcb4d98[_0x498edc(0x510)](_0x498edc(0x42c))&&_0x5b7440[_0x498edc(0x33f)](_0x498edc(0x23e))&&this[_0x498edc(0x436)]()):this['postCreateSlotWindowItemsEquipsCore']());},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x2cd)]=Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x87)],Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x87)]=function(){const _0x4a9d96=_0xc574cd;return this[_0x4a9d96(0x39d)]()?_0x4a9d96(0x538)!==_0x4a9d96(0x4a4)?this['slotWindowRectItemsEquipsCore']():this['contents'][_0x4a9d96(0x32a)]/_0x45ab45['mainFontSize']():_0x4a9d96(0x2c3)!==_0x4a9d96(0x1ce)?VisuMZ[_0x4a9d96(0x3aa)]['Scene_Equip_slotWindowRect'][_0x4a9d96(0x3e9)](this):this[_0x4a9d96(0x28e)]();},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x399)]=function(){const _0x52d384=_0xc574cd,_0x5adbf0=this[_0x52d384(0x145)](),_0x37d256=this[_0x52d384(0x147)]()?this[_0x52d384(0x1fd)]():0x0,_0x590c97=_0x5adbf0['y']+_0x5adbf0[_0x52d384(0x3bd)],_0x2c8dc6=Graphics['boxWidth']-this[_0x52d384(0x1fd)](),_0x1a2d14=this[_0x52d384(0x218)]()-_0x5adbf0[_0x52d384(0x3bd)];return new Rectangle(_0x37d256,_0x590c97,_0x2c8dc6,_0x1a2d14);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x448)]=Scene_Equip['prototype']['itemWindowRect'],Scene_Equip['prototype']['itemWindowRect']=function(){const _0x1ef205=_0xc574cd;if(this[_0x1ef205(0x39d)]()){if(_0x1ef205(0x170)===_0x1ef205(0x3ca)){const _0x1b0577=_0x1ef205(0x280);if(this[_0x1ef205(0x381)][_0x1b0577])return this['_customItemInfo'][_0x1b0577];if(_0x4657e6['VisuMZ_1_BattleCore']){const _0x1bff46=this[_0x1ef205(0xb8)][_0x1ef205(0x2db)];if(_0x1bff46[_0x1ef205(0x4e0)](/<ALWAYS HIT>/i))return _0x1ef205(0xa6);else{if(_0x1bff46[_0x1ef205(0x4e0)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return'%1%'[_0x1ef205(0x2f2)](_0x3db5b3(_0x9caa74['$1']));}}return _0x1ef205(0x36f)['format'](this[_0x1ef205(0xb8)][_0x1ef205(0x4fd)]);}else return this[_0x1ef205(0x87)]();}else return VisuMZ[_0x1ef205(0x3aa)][_0x1ef205(0x448)]['call'](this);},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x1fd)]=function(){const _0x21d412=_0xc574cd;if(this[_0x21d412(0x39d)]()){if('yuptB'===_0x21d412(0x28f)){_0x446411=_0x4acec3||this['lineHeight'](),this['contents']['paintOpacity']=0xa0;const _0x2fcdcd=_0x19d918['getItemsEquipsCoreBackColor2']();this[_0x21d412(0x211)][_0x21d412(0x41d)](_0x39a550+0x1,_0x43bd9d+0x1,_0x2520f6-0x2,_0x489bdb-0x2,_0x2fcdcd),this['contents'][_0x21d412(0x132)]=0xff;}else return this['geUpdatedLayoutStatusWidth']();}else return VisuMZ[_0x21d412(0x3aa)][_0x21d412(0x241)][_0x21d412(0x372)]['StatusWindowWidth'];},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x12a)]=function(){const _0x3c3939=_0xc574cd;return Math[_0x3c3939(0x397)](Graphics['boxWidth']/0x2);},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x15e)]=function(){const _0x493285=_0xc574cd;this[_0x493285(0x2ef)][_0x493285(0x3c4)](_0x493285(0x1f2),this['popScene']['bind'](this)),this[_0x493285(0x2ef)]['setHandler']('pagedown',this[_0x493285(0x31d)][_0x493285(0x2b9)](this)),this['_slotWindow'][_0x493285(0x3c4)](_0x493285(0x42c),this['previousActor'][_0x493285(0x2b9)](this));},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x25a)]=Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x43f)],Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x43f)]=function(){const _0x297f2d=_0xc574cd;this[_0x297f2d(0x374)]()&&(this[_0x297f2d(0x45e)][_0x297f2d(0x1da)](),this[_0x297f2d(0x45e)][_0x297f2d(0x542)]()),VisuMZ[_0x297f2d(0x3aa)][_0x297f2d(0x25a)][_0x297f2d(0x3e9)](this);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x3a5)]=Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0xab)],Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0xab)]=function(){const _0x5eae23=_0xc574cd;this[_0x5eae23(0x2ef)][_0x5eae23(0x351)]()>=0x0?_0x5eae23(0x259)!==_0x5eae23(0x298)?(VisuMZ[_0x5eae23(0x3aa)]['Scene_Equip_onSlotOk'][_0x5eae23(0x3e9)](this),this[_0x5eae23(0x197)]()):(_0x47d756[_0x5eae23(0x3aa)][_0x5eae23(0x3be)](_0x43df25,_0x58cd37),_0x191b76[_0x5eae23(0x3aa)][_0x5eae23(0x359)](_0x23af1e,_0x1162fb),_0x3b883d['ItemsEquipsCore'][_0x5eae23(0x122)](_0x237e06,_0x1e7f41),_0xe2e30b['ItemsEquipsCore'][_0x5eae23(0x1ea)](_0x2512f1,_0x4210eb),_0x492e65[_0x5eae23(0x3aa)][_0x5eae23(0x472)](_0x5f0844,_0xf2a5e)):(this[_0x5eae23(0x2ef)][_0x5eae23(0x126)](0x0),this[_0x5eae23(0x2ef)][_0x5eae23(0x412)]());},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x197)]=function(){const _0xe78073=_0xc574cd;this['_itemWindow'][_0xe78073(0x3b4)]();const _0x3de5a3=this['_slotWindow']['item'](),_0x2ea4cc=this[_0xe78073(0x23f)][_0xe78073(0x4eb)]['indexOf'](_0x3de5a3),_0x4397c7=Math[_0xe78073(0x397)](this[_0xe78073(0x23f)]['maxVisibleItems']()/0x2)-0x1;this[_0xe78073(0x23f)]['smoothSelect'](_0x2ea4cc>=0x0?_0x2ea4cc:0x0),this[_0xe78073(0x23f)][_0xe78073(0x4d1)]>0x1&&(this[_0xe78073(0x23f)]['_scrollDuration']=0x1,this[_0xe78073(0x23f)][_0xe78073(0x34f)]()),this['_itemWindow']['setTopRow'](this[_0xe78073(0x23f)][_0xe78073(0x351)]()-_0x4397c7);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x291)]=Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0xe9)],Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0xe9)]=function(){const _0x7d853e=_0xc574cd;VisuMZ[_0x7d853e(0x3aa)][_0x7d853e(0x291)][_0x7d853e(0x3e9)](this);if(this[_0x7d853e(0x374)]()){if(_0x7d853e(0x322)!==_0x7d853e(0x26e))this[_0x7d853e(0x45e)]['smoothSelect'](0x0),this[_0x7d853e(0x2ef)][_0x7d853e(0x542)]();else{_0x336b4d['ItemsEquipsCore']['Scene_Shop_doSell']['call'](this,_0x1b6f04);if(_0x56ca10<=0x0)return;const _0x47bafa=_0x442032['ItemsEquipsCore']['Settings'][_0x7d853e(0x387)];_0x47bafa[_0x7d853e(0x304)]&&_0xae58d9[_0x7d853e(0x19b)](_0x47bafa[_0x7d853e(0x20c)],!![]);}}},VisuMZ[_0xc574cd(0x3aa)]['Scene_Equip_onActorChange']=Scene_Equip[_0xc574cd(0x405)]['onActorChange'],Scene_Equip['prototype']['onActorChange']=function(){const _0x341622=_0xc574cd;VisuMZ[_0x341622(0x3aa)][_0x341622(0x342)][_0x341622(0x3e9)](this),this[_0x341622(0x374)]()&&(this[_0x341622(0x45e)][_0x341622(0x542)](),this['_commandWindow'][_0x341622(0x1da)](),this['_slotWindow'][_0x341622(0x126)](0x0),this[_0x341622(0x2ef)][_0x341622(0x412)]());},Scene_Equip[_0xc574cd(0x405)]['buttonAssistSlotWindowShift']=function(){const _0x291a70=_0xc574cd;if(!this[_0x291a70(0x2ef)])return![];if(!this[_0x291a70(0x2ef)][_0x291a70(0x110)])return![];return this[_0x291a70(0x2ef)][_0x291a70(0x526)]();},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x388)]=function(){const _0x5bb283=_0xc574cd;if(this[_0x5bb283(0x1bb)]())return TextManager[_0x5bb283(0x4c1)](_0x5bb283(0x23e));return Scene_MenuBase[_0x5bb283(0x405)][_0x5bb283(0x388)][_0x5bb283(0x3e9)](this);},Scene_Equip[_0xc574cd(0x405)]['buttonAssistText3']=function(){const _0x456dfb=_0xc574cd;if(this[_0x456dfb(0x1bb)]())return VisuMZ[_0x456dfb(0x3aa)][_0x456dfb(0x241)][_0x456dfb(0x372)][_0x456dfb(0x455)];return Scene_MenuBase[_0x456dfb(0x405)]['buttonAssistText3']['call'](this);},Scene_Equip[_0xc574cd(0x405)]['buttonAssistOffset3']=function(){const _0xfc35d2=_0xc574cd;if(this[_0xfc35d2(0x1bb)]())return this[_0xfc35d2(0x46a)]['width']/0x5/-0x3;return Scene_MenuBase[_0xfc35d2(0x405)][_0xfc35d2(0x1be)][_0xfc35d2(0x3e9)](this);},Scene_Equip[_0xc574cd(0x405)][_0xc574cd(0x180)]=function(){SceneManager['pop']();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x12c)]=Scene_Load['prototype']['reloadMapIfUpdated'],Scene_Load[_0xc574cd(0x405)]['reloadMapIfUpdated']=function(){const _0x48419c=_0xc574cd;VisuMZ[_0x48419c(0x3aa)]['Scene_Load_reloadMapIfUpdated'][_0x48419c(0x3e9)](this),this['refreshActorEquipSlotsIfUpdated']();},Scene_Load['prototype'][_0xc574cd(0x4b4)]=function(){const _0xc69a5d=_0xc574cd;if($gameSystem['versionId']()!==$dataSystem[_0xc69a5d(0x271)])for(const _0x3de8e8 of $gameActors['_data']){if(_0xc69a5d(0x2ce)!==_0xc69a5d(0x2ce)){if(_0x504dc8[_0xc69a5d(0x3aa)][_0xc69a5d(0x241)][_0xc69a5d(0x372)][_0xc69a5d(0x51c)]===![])return;_0x1669c4=_0x3e7e17[_0xc69a5d(0x1ef)](_0x2afd53||0x1,0x1);while(_0x2e91a8--){_0x2cd481=_0x2265f1||this['lineHeight'](),this[_0xc69a5d(0x211)][_0xc69a5d(0x132)]=0xa0;const _0x2fd818=_0x4a220b[_0xc69a5d(0x2c2)]();this[_0xc69a5d(0x211)][_0xc69a5d(0x41d)](_0x5365c0+0x1,_0x197522+0x1,_0x20cb02-0x2,_0x8725ac-0x2,_0x2fd818),this['contents'][_0xc69a5d(0x132)]=0xff;}}else{if(_0x3de8e8)_0x3de8e8[_0xc69a5d(0x2d3)]();}}},Scene_Shop[_0xc574cd(0x405)]['isBottomHelpMode']=function(){const _0x857e42=_0xc574cd;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x857e42(0x3d4)]!==undefined){if('pdAIE'!=='pdAIE')this[_0x857e42(0x340)]=[];else return ConfigManager[_0x857e42(0x3d4)];}else{if(this[_0x857e42(0x39d)]())return this[_0x857e42(0x3f5)]()['match'](/LOWER/i);else{if('uczNw'!==_0x857e42(0x15a))return this[_0x857e42(0x39d)]()?this[_0x857e42(0x399)]():_0x58f60b[_0x857e42(0x3aa)][_0x857e42(0x2cd)][_0x857e42(0x3e9)](this);else Scene_MenuBase[_0x857e42(0x405)][_0x857e42(0x147)][_0x857e42(0x3e9)](this);}}},Scene_Shop['prototype'][_0xc574cd(0x147)]=function(){const _0x4c674c=_0xc574cd;if(ConfigManager[_0x4c674c(0x28d)]&&ConfigManager[_0x4c674c(0x2ba)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x4c674c(0x9d)==='NnArd')_0x4411e8[_0x4c674c(0x1c0)]=this[_0x4c674c(0x393)];else return this[_0x4c674c(0x3f5)]()['match'](/RIGHT/i);}else Scene_MenuBase[_0x4c674c(0x405)][_0x4c674c(0x147)]['call'](this);}},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x3f5)]=function(){const _0x16cc13=_0xc574cd;return VisuMZ[_0x16cc13(0x3aa)][_0x16cc13(0x241)][_0x16cc13(0x387)][_0x16cc13(0x225)];},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x374)]=function(){const _0x156441=_0xc574cd;return this[_0x156441(0x439)]&&this[_0x156441(0x439)][_0x156441(0x374)]();},Scene_Shop['prototype'][_0xc574cd(0x39d)]=function(){const _0x460299=_0xc574cd;return VisuMZ[_0x460299(0x3aa)][_0x460299(0x241)][_0x460299(0x387)]['EnableLayout'];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x429)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x46b)],Scene_Shop[_0xc574cd(0x405)]['prepare']=function(_0x547b78,_0x1eeab2){const _0x1d41df=_0xc574cd;_0x547b78=JsonEx[_0x1d41df(0x346)](_0x547b78),VisuMZ[_0x1d41df(0x3aa)]['Scene_Shop_prepare']['call'](this,_0x547b78,_0x1eeab2),this['adjustHiddenShownGoods']();},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x2a8)]=function(){const _0x2c338f=_0xc574cd;this[_0x2c338f(0x99)]=0x0;const _0x434347=[];for(const _0x3ade31 of this[_0x2c338f(0x24a)]){if(_0x2c338f(0x282)!==_0x2c338f(0x282))return _0x41b713['floor'](this[_0x2c338f(0x4ed)]());else{if(this['isGoodShown'](_0x3ade31)){if(_0x2c338f(0x1ed)!=='Xlule')this[_0x2c338f(0x99)]++;else{const _0x7da383=_0x3cd892[_0x2c338f(0x3aa)][_0x2c338f(0x241)][_0x2c338f(0x2a6)][_0x2c338f(0x546)];return _0x7da383[_0x2c338f(0x2f2)](_0x4f220b['tp']);}}else _0x434347['push'](_0x3ade31);}}for(const _0xabc04d of _0x434347){_0x2c338f(0xdf)===_0x2c338f(0x31c)?_0x5a7ca2[_0x2c338f(0x19b)](_0x4dc157[_0x2c338f(0x20c)],![]):this['_goods']['remove'](_0xabc04d);}},Scene_Shop['prototype'][_0xc574cd(0x409)]=function(_0x50aaf3){const _0x1d0255=_0xc574cd;if(_0x50aaf3[0x0]>0x2||_0x50aaf3[0x0]<0x0)return![];const _0x12552d=[$dataItems,$dataWeapons,$dataArmors][_0x50aaf3[0x0]][_0x50aaf3[0x1]];if(!_0x12552d)return![];const _0x85749b=_0x12552d[_0x1d0255(0x2db)]||'';if(_0x85749b[_0x1d0255(0x4e0)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x34e403=JSON[_0x1d0255(0x2cf)]('['+RegExp['$1'][_0x1d0255(0x4e0)](/\d+/g)+']');for(const _0x251b2c of _0x34e403){if(!$gameSwitches[_0x1d0255(0x118)](_0x251b2c))return![];}return!![];}if(_0x85749b[_0x1d0255(0x4e0)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5bd57c=JSON[_0x1d0255(0x2cf)]('['+RegExp['$1'][_0x1d0255(0x4e0)](/\d+/g)+']');for(const _0x39615a of _0x5bd57c){if(!$gameSwitches[_0x1d0255(0x118)](_0x39615a))return![];}return!![];}if(_0x85749b[_0x1d0255(0x4e0)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b88a6=JSON[_0x1d0255(0x2cf)]('['+RegExp['$1'][_0x1d0255(0x4e0)](/\d+/g)+']');for(const _0x32a5aa of _0x5b88a6){if($gameSwitches[_0x1d0255(0x118)](_0x32a5aa))return!![];}return![];}if(_0x85749b[_0x1d0255(0x4e0)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x33d7a8=JSON[_0x1d0255(0x2cf)]('['+RegExp['$1'][_0x1d0255(0x4e0)](/\d+/g)+']');for(const _0x4efdc8 of _0x33d7a8){if('nwlrI'!==_0x1d0255(0x425)){if(!this[_0x1d0255(0x250)]())return;const _0x153b76=this[_0x1d0255(0x29b)](),_0x5cf7d9=_0x147a75[_0x1d0255(0x3aa)][_0x1d0255(0x241)][_0x1d0255(0x372)][_0x1d0255(0x46d)],_0x292760=_0x153b76===_0x1d0255(0x3d9)?_0x3c6973['clear']:_0x1d0255(0x244)['format'](_0x5cf7d9,_0x5db9dd[_0x1d0255(0x3cc)]),_0x2317b1=this['isClearCommandEnabled']();this[_0x1d0255(0x2a1)](_0x292760,_0x1d0255(0x3cc),_0x2317b1);}else{if(!$gameSwitches[_0x1d0255(0x118)](_0x4efdc8))return!![];}}return![];}if(_0x85749b[_0x1d0255(0x4e0)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1efe33=JSON[_0x1d0255(0x2cf)]('['+RegExp['$1'][_0x1d0255(0x4e0)](/\d+/g)+']');for(const _0x1740be of _0x1efe33){if(!$gameSwitches[_0x1d0255(0x118)](_0x1740be))return!![];}return![];}if(_0x85749b[_0x1d0255(0x4e0)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e7b6d=JSON['parse']('['+RegExp['$1'][_0x1d0255(0x4e0)](/\d+/g)+']');for(const _0x1667d7 of _0x4e7b6d){if($gameSwitches['value'](_0x1667d7))return![];}return!![];}return!![];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x182)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x2e1)],Scene_Shop['prototype'][_0xc574cd(0x2e1)]=function(){const _0x4e846b=_0xc574cd;VisuMZ[_0x4e846b(0x3aa)][_0x4e846b(0x182)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&(_0x4e846b(0x148)!==_0x4e846b(0x32f)?this[_0x4e846b(0x14e)]():(_0x2211b6['prototype']['updateHelp'][_0x4e846b(0x3e9)](this),this[_0x4e846b(0xac)]['setText'](this[_0x4e846b(0x2b3)]()))),this[_0x4e846b(0xd9)]();},Scene_Shop[_0xc574cd(0x405)]['postCreateItemsEquipsCore']=function(){const _0x3d5ef4=_0xc574cd;this[_0x3d5ef4(0x105)][_0x3d5ef4(0x27d)](),this['_buyWindow']['show'](),this[_0x3d5ef4(0x492)][_0x3d5ef4(0x1da)](),this[_0x3d5ef4(0x4e4)]['show']();},VisuMZ[_0xc574cd(0x3aa)]['Scene_Shop_helpWindowRect']=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x428)],Scene_Shop[_0xc574cd(0x405)]['helpWindowRect']=function(){const _0x55a76a=_0xc574cd;return this[_0x55a76a(0x39d)]()?this['helpWindowRectItemsEquipsCore']():VisuMZ[_0x55a76a(0x3aa)][_0x55a76a(0xba)][_0x55a76a(0x3e9)](this);},Scene_Shop['prototype'][_0xc574cd(0x547)]=function(){const _0x3b2448=_0xc574cd,_0x3fe416=0x0,_0x298a3f=this['helpAreaTop'](),_0x462747=Graphics[_0x3b2448(0x14f)],_0x3d64aa=this[_0x3b2448(0x524)]();return new Rectangle(_0x3fe416,_0x298a3f,_0x462747,_0x3d64aa);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x3ad)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x440)],Scene_Shop['prototype'][_0xc574cd(0x440)]=function(){const _0x47ace1=_0xc574cd;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('PVpof'===_0x47ace1(0x115))return this[_0x47ace1(0x28e)]();else{const _0xc583ff=_0x559d86[_0x47ace1(0x185)],_0x5a32e5=[_0x53fb96,_0x31556e];return _0x5a32e5[_0x47ace1(0x3a8)](_0xc583ff[_0x47ace1(0x1a1)]);}}else return VisuMZ[_0x47ace1(0x3aa)][_0x47ace1(0x3ad)][_0x47ace1(0x3e9)](this);},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x28e)]=function(){const _0x378d27=_0xc574cd,_0x3c30bf=this[_0x378d27(0x52b)](),_0x7a2255=this[_0x378d27(0x480)](0x1,!![]),_0x189c26=this[_0x378d27(0x147)]()?0x0:Graphics[_0x378d27(0x14f)]-_0x3c30bf,_0x4f9747=this['mainAreaTop']();return new Rectangle(_0x189c26,_0x4f9747,_0x3c30bf,_0x7a2255);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x260)]=Scene_Shop['prototype'][_0xc574cd(0x145)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x145)]=function(){const _0x16f07f=_0xc574cd;if(this[_0x16f07f(0x39d)]()){if(_0x16f07f(0x97)===_0x16f07f(0x97))return this['commandWindowRectItemsEquipsCore']();else{if(!_0x409846['value'](_0x1a5eb2))return![];}}else return VisuMZ[_0x16f07f(0x3aa)]['Scene_Shop_commandWindowRect'][_0x16f07f(0x3e9)](this);},Scene_Shop['prototype'][_0xc574cd(0x323)]=function(){const _0x10b090=_0xc574cd,_0xf975d7=this[_0x10b090(0x147)]()?this[_0x10b090(0x52b)]():0x0,_0x35c633=this['mainAreaTop'](),_0x2a0d12=Graphics['boxWidth']-this[_0x10b090(0x52b)](),_0x35d2cb=this[_0x10b090(0x480)](0x1,!![]);return new Rectangle(_0xf975d7,_0x35c633,_0x2a0d12,_0x35d2cb);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x84)]=Scene_Shop['prototype'][_0xc574cd(0x466)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x466)]=function(){const _0x4eb2fe=_0xc574cd;return this[_0x4eb2fe(0x39d)]()?this[_0x4eb2fe(0xe6)]():VisuMZ[_0x4eb2fe(0x3aa)][_0x4eb2fe(0x84)]['call'](this);},Scene_Shop['prototype'][_0xc574cd(0xe6)]=function(){const _0x1e483c=_0xc574cd,_0x42a36d=this[_0x1e483c(0x45e)]['y']+this['_commandWindow'][_0x1e483c(0x3bd)],_0x354bd4=Graphics[_0x1e483c(0x14f)]-this['statusWidth'](),_0x3d8597=this[_0x1e483c(0x147)]()?Graphics[_0x1e483c(0x14f)]-_0x354bd4:0x0,_0x2433d5=this[_0x1e483c(0x218)]()-this[_0x1e483c(0x45e)][_0x1e483c(0x3bd)];return new Rectangle(_0x3d8597,_0x42a36d,_0x354bd4,_0x2433d5);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x234)]=Scene_Shop['prototype'][_0xc574cd(0x514)],Scene_Shop[_0xc574cd(0x405)]['statusWindowRect']=function(){const _0x1417d0=_0xc574cd;if(this[_0x1417d0(0x39d)]())return this[_0x1417d0(0x4e8)]();else{if('hgYeH'!==_0x1417d0(0x1e3))return VisuMZ[_0x1417d0(0x3aa)][_0x1417d0(0x234)][_0x1417d0(0x3e9)](this);else _0x42fa52[_0x1417d0(0x3aa)]['Game_Actor_changeEquip']['call'](this,_0xca0993,_0x33eff0);}},Scene_Shop['prototype'][_0xc574cd(0x4e8)]=function(){const _0x41cbc1=_0xc574cd,_0x276519=this[_0x41cbc1(0x1fd)](),_0x450c6d=this[_0x41cbc1(0x218)]()-this[_0x41cbc1(0x45e)][_0x41cbc1(0x3bd)],_0x34d7bd=this[_0x41cbc1(0x147)]()?0x0:Graphics['boxWidth']-_0x276519,_0x5953fc=this[_0x41cbc1(0x45e)]['y']+this['_commandWindow'][_0x41cbc1(0x3bd)];return new Rectangle(_0x34d7bd,_0x5953fc,_0x276519,_0x450c6d);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x4a5)]=Scene_Shop['prototype'][_0xc574cd(0x205)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x205)]=function(){const _0x3d2e53=_0xc574cd;if(this[_0x3d2e53(0x39d)]()){if(_0x3d2e53(0x453)!=='fnSud'){if(!_0x5a90fb['isSceneShop']())return;const _0x178483=_0x1f7ba8[_0x3d2e53(0x3aa)][_0x3d2e53(0x241)][_0x3d2e53(0x387)];_0x178483['SwitchBuy']&&_0x56311c['setValue'](_0x178483[_0x3d2e53(0x304)],![]),_0x178483['SwitchSell']&&_0x44522e['setValue'](_0x178483[_0x3d2e53(0x20c)],![]);}else return this[_0x3d2e53(0x355)]();}else{if('UCBiu'!==_0x3d2e53(0x520)){const _0x52d950=this[_0x3d2e53(0x20b)];_0x52d950[_0x3d2e53(0x211)][_0x3d2e53(0x3cc)]();const _0x11281c=this[_0x3d2e53(0xd3)](this['index']());if(_0x11281c==='icon'){const _0x51b451=this['itemLineRect'](this['index']());let _0x3b112f=this[_0x3d2e53(0x1a9)](this[_0x3d2e53(0x351)]());_0x3b112f=_0x3b112f[_0x3d2e53(0x2af)](/\\I\[(\d+)\]/gi,''),_0x52d950[_0x3d2e53(0x306)](),this[_0x3d2e53(0x116)](_0x3b112f,_0x51b451),this[_0x3d2e53(0x536)](_0x3b112f,_0x51b451),this['commandNameWindowCenter'](_0x3b112f,_0x51b451);}}else return VisuMZ[_0x3d2e53(0x3aa)][_0x3d2e53(0x4a5)]['call'](this);}},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x355)]=function(){const _0x511159=_0xc574cd,_0x4b9244=this['_commandWindow']['y']+this['_commandWindow'][_0x511159(0x3bd)],_0x21825c=Graphics[_0x511159(0x14f)]-this[_0x511159(0x1fd)](),_0x6aaf73=this[_0x511159(0x218)]()-this[_0x511159(0x45e)][_0x511159(0x3bd)],_0x22d948=this['isRightInputMode']()?Graphics['boxWidth']-_0x21825c:0x0;return new Rectangle(_0x22d948,_0x4b9244,_0x21825c,_0x6aaf73);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x4e6)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x30a)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x30a)]=function(){const _0x4750e6=_0xc574cd;VisuMZ[_0x4750e6(0x3aa)][_0x4750e6(0x4e6)]['call'](this),this['isUseModernControls']()&&(_0x4750e6(0xc1)!==_0x4750e6(0x318)?this['postCreateCategoryWindowItemsEquipsCore']():(this[_0x4750e6(0x31a)]=_0x3374f9,this[_0x4750e6(0x3b4)](),this[_0x4750e6(0x439)]&&this[_0x4750e6(0x439)][_0x4750e6(0x374)]()?this[_0x4750e6(0x126)](0x0):this['scrollTo'](0x0,0x0)));},VisuMZ[_0xc574cd(0x3aa)]['Scene_Shop_categoryWindowRect']=Scene_Shop['prototype'][_0xc574cd(0x537)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x537)]=function(){const _0x7e1f71=_0xc574cd;if(this[_0x7e1f71(0x39d)]())return _0x7e1f71(0x14b)===_0x7e1f71(0x14b)?this[_0x7e1f71(0xd0)]():_0x5f0523[_0x7e1f71(0x2d1)]&&_0xdcea16[_0x7e1f71(0x2d1)][_0x7e1f71(0x241)]['QoL'][_0x7e1f71(0x2aa)]&&_0x56eb10[_0x7e1f71(0x1c2)](this['_item'])?![]:this[_0x7e1f71(0xb8)][_0x7e1f71(0x1f1)];else{if(_0x7e1f71(0x2f3)===_0x7e1f71(0x2f3))return VisuMZ[_0x7e1f71(0x3aa)][_0x7e1f71(0x3e7)][_0x7e1f71(0x3e9)](this);else{this[_0x7e1f71(0x43c)](this[_0x7e1f71(0x41c)](null));const _0x4fb369=_0x5dd0c4[_0x7e1f71(0x3aa)][_0x7e1f71(0x241)][_0x7e1f71(0x372)],_0x227b20=this['itemLineRect'](_0x125d34),_0x5d7ba3=_0x227b20['y']+(this[_0x7e1f71(0x363)]()-_0x2b9cef['iconHeight'])/0x2,_0x4ede07=_0x47a332[_0x7e1f71(0x273)]+0x4,_0x537177=_0x279a31[_0x7e1f71(0x1ef)](0x0,_0x227b20[_0x7e1f71(0x4d5)]-_0x4ede07);this[_0x7e1f71(0x17b)](),this['drawIcon'](_0x4fb369[_0x7e1f71(0x4bb)],_0x227b20['x'],_0x5d7ba3),this['drawText'](_0x4fb369[_0x7e1f71(0x217)],_0x227b20['x']+_0x4ede07,_0x227b20['y'],_0x537177),this['changePaintOpacity'](!![]);}}},Scene_Shop[_0xc574cd(0x405)]['categoryWindowRectItemsEquipsCore']=function(){const _0x4926a4=_0xc574cd,_0x38a26f=this[_0x4926a4(0x45e)]['y'],_0x1697da=this[_0x4926a4(0x45e)][_0x4926a4(0x4d5)],_0x5a1d27=this[_0x4926a4(0x480)](0x1,!![]),_0x2aa80b=this['isRightInputMode']()?Graphics[_0x4926a4(0x14f)]-_0x1697da:0x0;return new Rectangle(_0x2aa80b,_0x38a26f,_0x1697da,_0x5a1d27);},Scene_Shop['prototype'][_0xc574cd(0x166)]=function(){const _0x21091b=_0xc574cd;delete this['_categoryWindow'][_0x21091b(0x2f0)]['ok'],delete this[_0x21091b(0x439)][_0x21091b(0x2f0)]['cancel'];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0xec)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x4d6)],Scene_Shop[_0xc574cd(0x405)]['createSellWindow']=function(){const _0x301b42=_0xc574cd;VisuMZ[_0x301b42(0x3aa)]['Scene_Shop_createSellWindow'][_0x301b42(0x3e9)](this),this[_0x301b42(0x39d)]()&&this[_0x301b42(0x35d)]();},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x373)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x541)],Scene_Shop['prototype'][_0xc574cd(0x541)]=function(){const _0x4d3f94=_0xc574cd;if(this[_0x4d3f94(0x39d)]())return this[_0x4d3f94(0x1d7)]();else{if(_0x4d3f94(0x34e)!==_0x4d3f94(0x3ab))return VisuMZ[_0x4d3f94(0x3aa)][_0x4d3f94(0x373)]['call'](this);else this[_0x4d3f94(0x255)](_0x540de4);}},Scene_Shop['prototype'][_0xc574cd(0x1d7)]=function(){const _0x2b7eb2=_0xc574cd,_0x41ef6a=this[_0x2b7eb2(0x439)]['y']+this[_0x2b7eb2(0x439)]['height'],_0x24fa3f=Graphics[_0x2b7eb2(0x14f)]-this[_0x2b7eb2(0x1fd)](),_0x1e6604=this['mainAreaHeight']()-this['_categoryWindow']['height'],_0xf2a950=this[_0x2b7eb2(0x147)]()?Graphics[_0x2b7eb2(0x14f)]-_0x24fa3f:0x0;return new Rectangle(_0xf2a950,_0x41ef6a,_0x24fa3f,_0x1e6604);},Scene_Shop['prototype'][_0xc574cd(0x35d)]=function(){const _0x50b666=_0xc574cd;this[_0x50b666(0x3b6)]['setStatusWindow'](this[_0x50b666(0x4e4)]);},Scene_Shop[_0xc574cd(0x405)]['statusWidth']=function(){const _0x39fce4=_0xc574cd;return VisuMZ[_0x39fce4(0x3aa)][_0x39fce4(0x241)][_0x39fce4(0x2a6)][_0x39fce4(0x4af)];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x138)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x2ee)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x2ee)]=function(){const _0x522c77=_0xc574cd;VisuMZ[_0x522c77(0x3aa)][_0x522c77(0x138)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x522c77(0x4e4)][_0x522c77(0x3dc)](),this['_sellWindow'][_0x522c77(0x3d2)]();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x49f)]=Scene_Shop['prototype'][_0xc574cd(0x20e)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x20e)]=function(){const _0x28453b=_0xc574cd;VisuMZ[_0x28453b(0x3aa)][_0x28453b(0x49f)][_0x28453b(0x3e9)](this),this[_0x28453b(0x39d)]()&&this['commandBuyItemsEquipsCore']();},Scene_Shop['prototype'][_0xc574cd(0x4d2)]=function(){const _0x17620e=_0xc574cd;this[_0x17620e(0x95)]=this[_0x17620e(0x95)]||0x0,this[_0x17620e(0x492)]['smoothSelect'](this['_buyWindowLastIndex']);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x535)]=Scene_Shop[_0xc574cd(0x405)]['commandSell'],Scene_Shop['prototype'][_0xc574cd(0x119)]=function(){const _0x40158b=_0xc574cd;VisuMZ[_0x40158b(0x3aa)][_0x40158b(0x535)]['call'](this);this[_0x40158b(0x39d)]()&&(_0x40158b(0x395)!==_0x40158b(0x53a)?this[_0x40158b(0x338)]():this[_0x40158b(0x3c2)](_0xd0e93e[_0x40158b(0x510)](_0x40158b(0x42c))));if(this[_0x40158b(0x374)]()){if(_0x40158b(0x48a)===_0x40158b(0x48a))this[_0x40158b(0x439)][_0x40158b(0x126)](0x0),this[_0x40158b(0x53e)]();else{if(_0x58bf89['uiMenuStyle']&&_0x3c9843[_0x40158b(0x2ba)]!==_0x44eeb1)return _0xd2c965[_0x40158b(0x2ba)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x40158b(0x4e0)](/RIGHT/i);else _0x2fc59c[_0x40158b(0x405)]['isRightInputMode'][_0x40158b(0x3e9)](this);}}}},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x338)]=function(){const _0x5afc0b=_0xc574cd;this[_0x5afc0b(0x492)][_0x5afc0b(0x27d)](),this[_0x5afc0b(0x45e)]['hide']();},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x22f)]=Scene_Shop['prototype'][_0xc574cd(0x1ba)],Scene_Shop['prototype'][_0xc574cd(0x1ba)]=function(){const _0x3d16a7=_0xc574cd;VisuMZ['ItemsEquipsCore'][_0x3d16a7(0x22f)][_0x3d16a7(0x3e9)](this),this[_0x3d16a7(0x39d)]()&&this[_0x3d16a7(0xc0)]();},Scene_Shop['prototype'][_0xc574cd(0xc0)]=function(){const _0x137282=_0xc574cd;this[_0x137282(0x95)]=this['_buyWindow'][_0x137282(0x351)](),this[_0x137282(0x492)][_0x137282(0x3dc)](),this[_0x137282(0x492)]['deselect'](),this[_0x137282(0x492)][_0x137282(0xc6)](0x0,0x0),this[_0x137282(0x4e4)][_0x137282(0x3dc)](),this[_0x137282(0x105)]['hide']();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x473)]=Scene_Shop[_0xc574cd(0x405)]['onCategoryCancel'],Scene_Shop['prototype'][_0xc574cd(0x37c)]=function(){const _0x6be7b0=_0xc574cd;VisuMZ[_0x6be7b0(0x3aa)][_0x6be7b0(0x473)][_0x6be7b0(0x3e9)](this),this[_0x6be7b0(0x39d)]()&&this[_0x6be7b0(0xf6)]();},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0xf6)]=function(){const _0x394a87=_0xc574cd;this[_0x394a87(0x492)][_0x394a87(0x3dc)](),this[_0x394a87(0x45e)]['show']();},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x1cd)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x15c)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x15c)]=function(){const _0xd965e6=_0xc574cd;$gameTemp[_0xd965e6(0x9b)]=!![],VisuMZ['ItemsEquipsCore'][_0xd965e6(0x1cd)][_0xd965e6(0x3e9)](this),$gameTemp['_bypassProxy']=![],this[_0xd965e6(0xb8)]=this[_0xd965e6(0x492)][_0xd965e6(0x268)]();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0xc4)]=Scene_Shop['prototype']['buyingPrice'],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x181)]=function(){const _0x40ea4d=_0xc574cd;$gameTemp[_0x40ea4d(0x9b)]=!![],this[_0x40ea4d(0xb8)]=this[_0x40ea4d(0x492)][_0x40ea4d(0x268)]();const _0x5e0fa9=VisuMZ['ItemsEquipsCore'][_0x40ea4d(0xc4)][_0x40ea4d(0x3e9)](this);return $gameTemp[_0x40ea4d(0x9b)]=![],this[_0x40ea4d(0xb8)]=this[_0x40ea4d(0x492)][_0x40ea4d(0x268)](),_0x5e0fa9;},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x3fa)]=Scene_Shop['prototype'][_0xc574cd(0x3af)],Scene_Shop[_0xc574cd(0x405)]['onSellOk']=function(){const _0x5c0b2c=_0xc574cd;VisuMZ[_0x5c0b2c(0x3aa)][_0x5c0b2c(0x3fa)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5c0b2c(0x23b)]();},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x23b)]=function(){const _0x82bac=_0xc574cd;this[_0x82bac(0x439)][_0x82bac(0x3dc)]();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x3bc)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x445)],Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x445)]=function(){const _0x7b2c16=_0xc574cd;VisuMZ['ItemsEquipsCore'][_0x7b2c16(0x3bc)][_0x7b2c16(0x3e9)](this),this['isUseModernControls']()&&this['onCategoryCancel'](),this[_0x7b2c16(0x39d)]()&&this[_0x7b2c16(0x105)]['hide']();},Scene_Shop[_0xc574cd(0x405)]['sellPriceOfItem']=function(_0x57fd80){const _0xde4ba0=_0xc574cd,_0x49de49=this[_0xde4ba0(0xb8)];this['_item']=_0x57fd80;const _0x1f6a74=this[_0xde4ba0(0x45f)]();return this['_item']=_0x49de49,_0x1f6a74;},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x25e)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x45f)],Scene_Shop['prototype']['sellingPrice']=function(){const _0x2db93a=_0xc574cd;let _0x306a86=this[_0x2db93a(0x4a3)]();const _0x5ec9d2=this[_0x2db93a(0xb8)];return _0x306a86=VisuMZ['ItemsEquipsCore']['Settings'][_0x2db93a(0x387)][_0x2db93a(0x226)][_0x2db93a(0x3e9)](this,_0x5ec9d2,_0x306a86),_0x306a86;},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x4a3)]=function(){const _0x5aa3c7=_0xc574cd;let _0x38caec=this[_0x5aa3c7(0xb8)][_0x5aa3c7(0x343)];if(!this[_0x5aa3c7(0xb8)])return 0x0;else{if(this[_0x5aa3c7(0xb8)][_0x5aa3c7(0x2db)][_0x5aa3c7(0x4e0)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x30dd06=String(RegExp['$1']);let _0x70bd68=this['_item'],_0x515cab=_0x38caec*this[_0x5aa3c7(0x52f)]();try{_0x5aa3c7(0x328)!==_0x5aa3c7(0x362)?eval(_0x30dd06):(this['_statusWindow']=_0x26c84e,this[_0x5aa3c7(0x4bc)]());}catch(_0x2e7c05){if(_0x5aa3c7(0x43a)!=='iKdxP'){if(!this[_0x5aa3c7(0x110)])return![];if(!_0x1b6e76[_0x5aa3c7(0x3aa)][_0x5aa3c7(0x241)][_0x5aa3c7(0x372)][_0x5aa3c7(0xa8)])return![];return!![];}else{if($gameTemp[_0x5aa3c7(0x3a3)]())console[_0x5aa3c7(0x3ef)](_0x2e7c05);}}if(isNaN(_0x515cab))_0x515cab=0x0;return Math[_0x5aa3c7(0x397)](_0x515cab);}else return this[_0x5aa3c7(0xb8)]['note'][_0x5aa3c7(0x4e0)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math['floor'](this[_0x5aa3c7(0x4ed)]());}},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x4ed)]=function(){const _0x50a6a4=_0xc574cd;return this[_0x50a6a4(0xb8)][_0x50a6a4(0x343)]*this[_0x50a6a4(0x52f)]();},Scene_Shop['prototype']['sellPriceRate']=function(){const _0x38417b=_0xc574cd;return VisuMZ[_0x38417b(0x3aa)][_0x38417b(0x241)]['ShopScene']['SellPriceRate'];},Scene_Shop['prototype'][_0xc574cd(0x1a4)]=function(){const _0x42c98a=_0xc574cd;if(!this[_0x42c98a(0x3f5)]())return![];if(!this[_0x42c98a(0x374)]())return![];if(!this['_sellWindow'])return![];if(!this[_0x42c98a(0x3b6)]['active'])return![];return this[_0x42c98a(0x3f5)]()&&this[_0x42c98a(0x374)]();},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x1d1)]=function(){const _0x4094f4=_0xc574cd;if(this[_0x4094f4(0x1a4)]()){if(this[_0x4094f4(0x3b6)]['maxCols']()===0x1)return TextManager[_0x4094f4(0x491)]('left',_0x4094f4(0xae));else{if(_0x4094f4(0x50d)===_0x4094f4(0x50d))return TextManager['getInputMultiButtonStrings']('pageup',_0x4094f4(0x331));else this[_0x4094f4(0x194)](!![]);}}else{if(this[_0x4094f4(0x150)]&&this[_0x4094f4(0x150)][_0x4094f4(0x110)])return _0x4094f4(0x1a5)===_0x4094f4(0x8d)?_0x4094f4(0x1e2):TextManager[_0x4094f4(0x491)](_0x4094f4(0x414),'right');}return Scene_MenuBase['prototype'][_0x4094f4(0x1d1)][_0x4094f4(0x3e9)](this);},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x1b8)]=function(){const _0x311887=_0xc574cd;if(this['_numberWindow']&&this['_numberWindow'][_0x311887(0x110)])return TextManager[_0x311887(0x491)]('up','down');return Scene_MenuBase[_0x311887(0x405)][_0x311887(0x1b8)][_0x311887(0x3e9)](this);},Scene_Shop[_0xc574cd(0x405)]['buttonAssistText1']=function(){const _0x3839a7=_0xc574cd;if(this[_0x3839a7(0x1a4)]())return'QVaVO'===_0x3839a7(0x493)?_0x3839a7(0x38f):VisuMZ['ItemsEquipsCore'][_0x3839a7(0x241)]['ItemScene'][_0x3839a7(0x49e)];else{if(this[_0x3839a7(0x150)]&&this[_0x3839a7(0x150)]['active'])return VisuMZ[_0x3839a7(0x3aa)][_0x3839a7(0x241)]['ShopScene'][_0x3839a7(0x266)];}return Scene_MenuBase[_0x3839a7(0x405)][_0x3839a7(0x300)][_0x3839a7(0x3e9)](this);},Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x1fe)]=function(){const _0x20969e=_0xc574cd;if(this['_numberWindow']&&this[_0x20969e(0x150)]['active'])return VisuMZ[_0x20969e(0x3aa)][_0x20969e(0x241)]['ShopScene']['buttonAssistLargeIncrement'];return Scene_MenuBase[_0x20969e(0x405)]['buttonAssistText2'][_0x20969e(0x3e9)](this);},Scene_Shop[_0xc574cd(0x405)]['resetShopSwitches']=function(){const _0x3ac73d=_0xc574cd;if(!SceneManager[_0x3ac73d(0xdd)]())return;const _0x23342a=VisuMZ[_0x3ac73d(0x3aa)][_0x3ac73d(0x241)]['ShopScene'];_0x23342a[_0x3ac73d(0x304)]&&$gameSwitches['setValue'](_0x23342a[_0x3ac73d(0x304)],![]);if(_0x23342a['SwitchSell']){if(_0x3ac73d(0x21a)!==_0x3ac73d(0x2e5))$gameSwitches[_0x3ac73d(0x19b)](_0x23342a[_0x3ac73d(0x20c)],![]);else{_0x22abd9+=_0x3ac73d(0x41e)[_0x3ac73d(0x2f2)](_0x1b042f[_0x3ac73d(0x164)]),_0x308efb++;if(_0x5dd2dc>=_0x3bffe7)return _0x4aad5a;}}},VisuMZ['ItemsEquipsCore'][_0xc574cd(0x1f3)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x236)],Scene_Shop['prototype'][_0xc574cd(0x236)]=function(_0x4779eb){const _0x3067d2=_0xc574cd;VisuMZ[_0x3067d2(0x3aa)][_0x3067d2(0x1f3)][_0x3067d2(0x3e9)](this,_0x4779eb);if(_0x4779eb<=0x0)return;const _0x4c8a15=VisuMZ['ItemsEquipsCore']['Settings'][_0x3067d2(0x387)];_0x4c8a15[_0x3067d2(0x304)]&&$gameSwitches[_0x3067d2(0x19b)](_0x4c8a15[_0x3067d2(0x304)],!![]);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x35f)]=Scene_Shop[_0xc574cd(0x405)][_0xc574cd(0x167)],Scene_Shop[_0xc574cd(0x405)]['doSell']=function(_0x27ce50){const _0x411612=_0xc574cd;VisuMZ[_0x411612(0x3aa)]['Scene_Shop_doSell']['call'](this,_0x27ce50);if(_0x27ce50<=0x0)return;const _0x2a6401=VisuMZ[_0x411612(0x3aa)][_0x411612(0x241)][_0x411612(0x387)];_0x2a6401[_0x411612(0x304)]&&$gameSwitches['setValue'](_0x2a6401[_0x411612(0x20c)],!![]);};function Sprite_NewLabel(){const _0x557573=_0xc574cd;this[_0x557573(0x221)](...arguments);}Sprite_NewLabel['prototype']=Object['create'](Sprite[_0xc574cd(0x405)]),Sprite_NewLabel[_0xc574cd(0x405)][_0xc574cd(0x1a1)]=Sprite_NewLabel,Sprite_NewLabel['prototype'][_0xc574cd(0x221)]=function(){const _0x4b1334=_0xc574cd;Sprite['prototype'][_0x4b1334(0x221)][_0x4b1334(0x3e9)](this),this[_0x4b1334(0x1f9)]();},Sprite_NewLabel['prototype'][_0xc574cd(0x1f9)]=function(){const _0x4ca1c4=_0xc574cd,_0x21621e=ImageManager[_0x4ca1c4(0x273)],_0xed9558=ImageManager[_0x4ca1c4(0x220)];this[_0x4ca1c4(0x283)]=new Bitmap(_0x21621e,_0xed9558),this[_0x4ca1c4(0x1b6)](),this[_0x4ca1c4(0x4ab)]();},Sprite_NewLabel[_0xc574cd(0x405)][_0xc574cd(0x1b6)]=function(){const _0x5878f0=_0xc574cd,_0x413a5c=VisuMZ['ItemsEquipsCore'][_0x5878f0(0x241)][_0x5878f0(0x3ac)][_0x5878f0(0x207)];if(_0x413a5c<=0x0)return;const _0xac7e16=ImageManager['loadSystem'](_0x5878f0(0x451)),_0x32ecd5=ImageManager[_0x5878f0(0x273)],_0x2f3a20=ImageManager[_0x5878f0(0x220)],_0x382557=_0x413a5c%0x10*_0x32ecd5,_0x2ed537=Math[_0x5878f0(0x397)](_0x413a5c/0x10)*_0x2f3a20;this['bitmap'][_0x5878f0(0x456)](_0xac7e16,_0x382557,_0x2ed537,_0x32ecd5,_0x2f3a20,0x0,0x0);},Sprite_NewLabel['prototype'][_0xc574cd(0x4ab)]=function(){const _0x5c8459=_0xc574cd,_0x215002=VisuMZ['ItemsEquipsCore'][_0x5c8459(0x241)]['New'],_0x337a7c=_0x215002[_0x5c8459(0x113)];if(_0x337a7c==='')return;const _0x4818e7=ImageManager[_0x5c8459(0x273)],_0x3c4c7d=ImageManager['iconHeight'];this[_0x5c8459(0x283)]['fontFace']=_0x215002[_0x5c8459(0x38d)]||$gameSystem['mainFontFace'](),this[_0x5c8459(0x283)][_0x5c8459(0x36e)]=this[_0x5c8459(0x12d)](),this[_0x5c8459(0x283)][_0x5c8459(0x32a)]=_0x215002[_0x5c8459(0x495)],this[_0x5c8459(0x283)]['drawText'](_0x337a7c,0x0,_0x3c4c7d/0x2,_0x4818e7,_0x3c4c7d/0x2,_0x5c8459(0x1a0));},Sprite_NewLabel[_0xc574cd(0x405)][_0xc574cd(0x12d)]=function(){const _0x12f73b=_0xc574cd,_0x2bc693=VisuMZ[_0x12f73b(0x3aa)][_0x12f73b(0x241)][_0x12f73b(0x3ac)]['FontColor'];return _0x2bc693[_0x12f73b(0x4e0)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x12f73b(0x36e)](_0x2bc693);},Window_Base[_0xc574cd(0x405)][_0xc574cd(0x155)]=function(_0x3d1343,_0x4cdb64,_0x59b796,_0x507ba1){const _0x5453b0=_0xc574cd;if(_0x3d1343){if(_0x5453b0(0x32d)!==_0x5453b0(0x2fc)){const _0x222833=_0x59b796+(this[_0x5453b0(0x363)]()-ImageManager[_0x5453b0(0x220)])/0x2,_0x262ff9=ImageManager[_0x5453b0(0x273)]+0x4,_0x593b0d=Math['max'](0x0,_0x507ba1-_0x262ff9);this[_0x5453b0(0x163)](ColorManager['getItemColor'](_0x3d1343)),this['drawIcon'](_0x3d1343['iconIndex'],_0x4cdb64,_0x222833),this[_0x5453b0(0x498)](_0x3d1343['name'],_0x4cdb64+_0x262ff9,_0x59b796,_0x593b0d),this[_0x5453b0(0x17b)]();}else return this[_0x5453b0(0x39d)]()?this[_0x5453b0(0x323)]():_0x39ae8c[_0x5453b0(0x3aa)][_0x5453b0(0x260)]['call'](this);}},Window_Base['prototype'][_0xc574cd(0x35a)]=function(_0xe09d85,_0x4bd0a0,_0x1dc0e,_0x195ea7){const _0x58b462=_0xc574cd;if(this['isDrawItemNumber'](_0xe09d85)){if(_0x58b462(0x136)===_0x58b462(0x4c8))_0x3130f2[_0x58b462(0x190)][_0x58b462(0x320)](_0x2686f4[_0x58b462(0x23c)]()[_0x58b462(0x3c0)]());else{this['resetFontSettings']();const _0x5f03c2=VisuMZ['ItemsEquipsCore'][_0x58b462(0x241)][_0x58b462(0x45b)],_0x363e88=_0x5f03c2[_0x58b462(0x1e6)],_0x374a7a=_0x363e88[_0x58b462(0x2f2)]($gameParty['numItems'](_0xe09d85));this[_0x58b462(0x211)][_0x58b462(0x32a)]=_0x5f03c2[_0x58b462(0x2c4)],this[_0x58b462(0x498)](_0x374a7a,_0x4bd0a0,_0x1dc0e,_0x195ea7,_0x58b462(0xae)),this[_0x58b462(0x306)]();}}},Window_Base[_0xc574cd(0x405)][_0xc574cd(0x202)]=function(_0x4c2e0f){const _0x5de717=_0xc574cd;if(DataManager[_0x5de717(0x1c2)](_0x4c2e0f))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base[_0xc574cd(0x405)][_0xc574cd(0x1d3)]=function(_0xf2bbff,_0x2929c5,_0xba6fcb,_0x1979f7,_0x6ceeeb){const _0x234e9e=_0xc574cd;_0x6ceeeb=Math[_0x234e9e(0x1ef)](_0x6ceeeb||0x1,0x1);while(_0x6ceeeb--){if(_0x234e9e(0x406)==='HrLyJ'){_0x1979f7=_0x1979f7||this[_0x234e9e(0x363)](),this[_0x234e9e(0x307)][_0x234e9e(0x132)]=0xa0;const _0x2b0e74=ColorManager[_0x234e9e(0x30f)]();this[_0x234e9e(0x307)][_0x234e9e(0x41d)](_0xf2bbff+0x1,_0x2929c5+0x1,_0xba6fcb-0x2,_0x1979f7-0x2,_0x2b0e74),this['contentsBack'][_0x234e9e(0x132)]=0xff;}else return this['isUseItemsEquipsCoreUpdatedLayout']()?this['goldWindowRectItemsEquipsCore']():_0x5a476f[_0x234e9e(0x3aa)]['Scene_Shop_goldWindowRect'][_0x234e9e(0x3e9)](this);}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0xb7)]=Window_Selectable['prototype'][_0xc574cd(0x221)],Window_Selectable[_0xc574cd(0x405)]['initialize']=function(_0x7a4c01){this['initNewLabelSprites'](),VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize']['call'](this,_0x7a4c01);},Window_Selectable[_0xc574cd(0x405)][_0xc574cd(0x287)]=function(){const _0x5510f5=_0xc574cd;this[_0x5510f5(0x26c)]={},this[_0x5510f5(0x393)]=0xff,this[_0x5510f5(0x17c)]=VisuMZ[_0x5510f5(0x3aa)]['Settings']['New'][_0x5510f5(0x424)],this[_0x5510f5(0x504)]=VisuMZ['ItemsEquipsCore']['Settings'][_0x5510f5(0x3ac)][_0x5510f5(0x2da)];},Window_Selectable[_0xc574cd(0x405)]['isShowNew']=function(){return![];},VisuMZ['ItemsEquipsCore']['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0xc574cd(0x405)]['setHelpWindowItem'],Window_Selectable[_0xc574cd(0x405)]['setHelpWindowItem']=function(_0xc2f394){const _0x86e4c8=_0xc574cd;VisuMZ[_0x86e4c8(0x3aa)][_0x86e4c8(0x22e)][_0x86e4c8(0x3e9)](this,_0xc2f394);if(this[_0x86e4c8(0x23d)]())this[_0x86e4c8(0x1e0)](_0xc2f394);},Window_Selectable['prototype'][_0xc574cd(0x1e0)]=function(_0x155ba0){const _0x501bc5=_0xc574cd;if(!_0x155ba0)return;$gameParty['clearNewItem'](_0x155ba0);let _0x5707c3='';if(DataManager[_0x501bc5(0x165)](_0x155ba0))_0x5707c3='item-%1'[_0x501bc5(0x2f2)](_0x155ba0['id']);else{if(DataManager['isWeapon'](_0x155ba0))'BwQXo'==='BwQXo'?_0x5707c3='weapon-%1'[_0x501bc5(0x2f2)](_0x155ba0['id']):this[_0x501bc5(0x166)]();else{if(DataManager[_0x501bc5(0x467)](_0x155ba0)){if(_0x501bc5(0x47f)===_0x501bc5(0x3e0))return this[_0x501bc5(0x323)]();else _0x5707c3=_0x501bc5(0x3a6)[_0x501bc5(0x2f2)](_0x155ba0['id']);}else return;}}const _0x2e90fd=this[_0x501bc5(0x26c)][_0x5707c3];if(_0x2e90fd)_0x2e90fd[_0x501bc5(0x27d)]();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x1c3)]=Window_Selectable['prototype'][_0xc574cd(0x3b4)],Window_Selectable[_0xc574cd(0x405)][_0xc574cd(0x3b4)]=function(){const _0x5f4264=_0xc574cd;this[_0x5f4264(0x4f8)](),VisuMZ[_0x5f4264(0x3aa)][_0x5f4264(0x1c3)][_0x5f4264(0x3e9)](this);},Window_Selectable[_0xc574cd(0x405)][_0xc574cd(0x4f8)]=function(){const _0xa0428a=_0xc574cd;for(const _0x472fd2 of Object[_0xa0428a(0x53d)](this['_newLabelSprites'])){_0x472fd2[_0xa0428a(0x27d)]();}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x2fe)]=Window_Selectable[_0xc574cd(0x405)][_0xc574cd(0x18c)],Window_Selectable['prototype'][_0xc574cd(0x18c)]=function(){const _0x389c1b=_0xc574cd;this['updateNewLabelOpacity'](),VisuMZ[_0x389c1b(0x3aa)]['Window_Selectable_update']['call'](this);},Window_Selectable[_0xc574cd(0x405)][_0xc574cd(0x1b5)]=function(){const _0x5cbcff=_0xc574cd;if(!this[_0x5cbcff(0x23d)]())return;const _0x2f318d=this[_0x5cbcff(0x504)];this[_0x5cbcff(0x393)]+=this[_0x5cbcff(0x17c)];(this[_0x5cbcff(0x393)]>=_0x2f318d||this[_0x5cbcff(0x393)]<=0x0)&&(this[_0x5cbcff(0x17c)]*=-0x1);this[_0x5cbcff(0x393)]=this[_0x5cbcff(0x393)][_0x5cbcff(0x11e)](0x0,_0x2f318d);for(const _0x53330f of Object['values'](this[_0x5cbcff(0x26c)])){_0x53330f[_0x5cbcff(0x1c0)]=this[_0x5cbcff(0x393)];}},Window_Selectable[_0xc574cd(0x405)][_0xc574cd(0x11c)]=function(_0x27b9cd){const _0x475839=_0xc574cd,_0xe96453=this[_0x475839(0x26c)];if(_0xe96453[_0x27b9cd])return _0xe96453[_0x27b9cd];else{if(_0x475839(0x1dc)==='DrEcL'){if(_0x4d5d84>=0x0)_0x3e5c5c===this[_0x475839(0x351)]()&&(this['_doubleTouch']=!![]),this[_0x475839(0x412)](),this[_0x475839(0x32b)](_0x3dc988);else _0x43d9d1[_0x475839(0x261)]()>=0x0&&(this[_0x475839(0x542)](),this['deselect']());}else{const _0x197ba4=new Sprite_NewLabel();return _0xe96453[_0x27b9cd]=_0x197ba4,this[_0x475839(0x1bd)](_0x197ba4),_0x197ba4;}}},Window_Selectable[_0xc574cd(0x405)][_0xc574cd(0x154)]=function(_0x396a1b,_0x5aadf7,_0x1b0562){const _0x26c10e=_0xc574cd;let _0x6a49e6='';if(DataManager['isItem'](_0x396a1b))_0x6a49e6='item-%1'[_0x26c10e(0x2f2)](_0x396a1b['id']);else{if(DataManager[_0x26c10e(0x487)](_0x396a1b))_0x6a49e6=_0x26c10e(0xca)[_0x26c10e(0x2f2)](_0x396a1b['id']);else{if(DataManager[_0x26c10e(0x467)](_0x396a1b))_0x6a49e6=_0x26c10e(0x3a6)[_0x26c10e(0x2f2)](_0x396a1b['id']);else{if(_0x26c10e(0x10a)===_0x26c10e(0x32c))this['onTouchOk']();else return;}}}const _0x2bef6a=this['createNewLabelSprite'](_0x6a49e6);_0x2bef6a['move'](_0x5aadf7,_0x1b0562),_0x2bef6a[_0x26c10e(0x3dc)](),_0x2bef6a[_0x26c10e(0x1c0)]=this[_0x26c10e(0x393)];},Window_ItemCategory[_0xc574cd(0x2e3)]=VisuMZ[_0xc574cd(0x3aa)]['Settings']['Categories'][_0xc574cd(0x146)],Window_ItemCategory[_0xc574cd(0x222)]=[_0xc574cd(0x2be),_0xc574cd(0x20a),_0xc574cd(0x1a2),_0xc574cd(0x4b0),_0xc574cd(0x1d6),'BattleUsable','FieldUsable',_0xc574cd(0x4a6)],VisuMZ[_0xc574cd(0x3aa)]['Window_ItemCategory_initialize']=Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x221)],Window_ItemCategory[_0xc574cd(0x405)]['initialize']=function(_0x43e90d){const _0x32d5ac=_0xc574cd;VisuMZ[_0x32d5ac(0x3aa)][_0x32d5ac(0x3a1)][_0x32d5ac(0x3e9)](this,_0x43e90d),this[_0x32d5ac(0xd7)](_0x43e90d);},Window_ItemCategory[_0xc574cd(0x405)]['createCategoryNameWindow']=function(_0x41f4f3){const _0x142e46=_0xc574cd,_0x3412d2=new Rectangle(0x0,0x0,_0x41f4f3[_0x142e46(0x4d5)],_0x41f4f3[_0x142e46(0x3bd)]);this[_0x142e46(0x30b)]=new Window_Base(_0x3412d2),this[_0x142e46(0x30b)][_0x142e46(0x1c0)]=0x0,this[_0x142e46(0x19a)](this[_0x142e46(0x30b)]),this[_0x142e46(0x522)]();},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x374)]=function(){const _0x57f773=_0xc574cd;return Imported[_0x57f773(0x301)]&&Window_HorzCommand[_0x57f773(0x405)][_0x57f773(0x374)][_0x57f773(0x3e9)](this);},Window_ItemCategory['prototype'][_0xc574cd(0x416)]=function(){},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x4de)]=function(){const _0x3d7448=_0xc574cd;if(!this[_0x3d7448(0x374)]())Window_HorzCommand[_0x3d7448(0x405)][_0x3d7448(0x4de)]['call'](this);},Window_ItemCategory[_0xc574cd(0x405)]['maxCols']=function(){return this['_list']?this['maxItems']():0x4;},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x18c)]=function(){const _0x28f989=_0xc574cd;Window_HorzCommand[_0x28f989(0x405)]['update'][_0x28f989(0x3e9)](this),this['_itemWindow']&&this['_itemWindow']['setCategory'](this[_0x28f989(0x39b)]());},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x497)]=function(){const _0x56fb30=_0xc574cd;if(this['isCursorMovable']()){if(_0x56fb30(0x1c1)!=='ZflAC'){const _0x2ec95e=this[_0x56fb30(0x351)]();if(this[_0x56fb30(0x23f)]&&this[_0x56fb30(0x23f)][_0x56fb30(0x1b9)]()<=0x1)_0x56fb30(0x4ff)===_0x56fb30(0x4ff)?(Input['isRepeated']('right')&&this[_0x56fb30(0xed)](Input[_0x56fb30(0x510)](_0x56fb30(0xae))),Input[_0x56fb30(0x22b)]('left')&&this[_0x56fb30(0x3c2)](Input[_0x56fb30(0x510)](_0x56fb30(0x414)))):_0x25023e[_0x56fb30(0x405)][_0x56fb30(0x147)][_0x56fb30(0x3e9)](this);else{if(this[_0x56fb30(0x23f)]&&this[_0x56fb30(0x23f)][_0x56fb30(0x1b9)]()>0x1){if(_0x56fb30(0x195)==='wUSCc')return!![];else Input['isRepeated'](_0x56fb30(0x331))&&!Input[_0x56fb30(0x33f)](_0x56fb30(0x23e))&&(_0x56fb30(0x9a)===_0x56fb30(0x2dd)?(this[_0x56fb30(0x439)][_0x56fb30(0x126)](0x0),this['onCategoryOk']()):this[_0x56fb30(0xed)](Input[_0x56fb30(0x510)](_0x56fb30(0x331)))),Input[_0x56fb30(0x22b)](_0x56fb30(0x42c))&&!Input[_0x56fb30(0x33f)](_0x56fb30(0x23e))&&this[_0x56fb30(0x3c2)](Input[_0x56fb30(0x510)](_0x56fb30(0x42c)));}}this[_0x56fb30(0x351)]()!==_0x2ec95e&&this[_0x56fb30(0x133)]();}else this[_0x56fb30(0x2ef)][_0x56fb30(0x3c4)]('cancel',this[_0x56fb30(0x180)]['bind'](this)),this['_slotWindow'][_0x56fb30(0x3c4)](_0x56fb30(0x331),this['nextActor']['bind'](this)),this['_slotWindow'][_0x56fb30(0x3c4)](_0x56fb30(0x42c),this['previousActor'][_0x56fb30(0x2b9)](this));}},Window_ItemCategory['prototype'][_0xc574cd(0x2b4)]=function(){const _0x1ca09c=_0xc574cd;if(this[_0x1ca09c(0x374)]())return;Window_HorzCommand['prototype'][_0x1ca09c(0x2b4)][_0x1ca09c(0x3e9)](this);},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x12e)]=function(){const _0x184812=_0xc574cd;if(this[_0x184812(0x374)]())return![];else{if(_0x184812(0xb4)!==_0x184812(0x2b6))return Window_HorzCommand[_0x184812(0x405)]['isHoverEnabled']['call'](this);else{if(_0xc65613[_0x184812(0x9b)])return _0x13f421['ItemsEquipsCore'][_0x184812(0x3f0)][_0x184812(0x3e9)](this);return _0x3a4470[_0x184812(0x293)](_0x5c89d4[_0x184812(0x3aa)][_0x184812(0x3f0)][_0x184812(0x3e9)](this));}}},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x112)]=function(){const _0x5e9985=_0xc574cd;if(this[_0x5e9985(0x37f)]()){TouchInput['isTriggered']()&&this[_0x5e9985(0x379)](!![]);if(TouchInput['isClicked']())this[_0x5e9985(0x2c7)]();else TouchInput[_0x5e9985(0x4f6)]()&&this[_0x5e9985(0x2bc)]();}},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x379)]=function(_0x29261b){const _0x4c70be=_0xc574cd;if(this[_0x4c70be(0x374)]()){if(_0x4c70be(0x9f)===_0x4c70be(0x162))return _0x3e009d[_0x4c70be(0x3aa)]['Scene_Item_categoryWindowRect'][_0x4c70be(0x3e9)](this);else this[_0x4c70be(0x194)](!![]);}else Window_HorzCommand[_0x4c70be(0x405)]['onTouchSelect'][_0x4c70be(0x3e9)](this,_0x29261b);},Window_ItemCategory[_0xc574cd(0x405)]['onTouchSelectModern']=function(_0x4fbf4a){const _0x3557a7=_0xc574cd;this[_0x3557a7(0x3e6)]=![];if(this[_0x3557a7(0xfa)]()){const _0x363498=this[_0x3557a7(0x351)](),_0xec8c0c=this[_0x3557a7(0x261)]();_0xec8c0c>=0x0&&_0xec8c0c!==this[_0x3557a7(0x351)]()&&(_0x3557a7(0x296)===_0x3557a7(0x4bd)?(this[_0x3557a7(0x105)][_0x3557a7(0x27d)](),this['_buyWindow'][_0x3557a7(0x3dc)](),this[_0x3557a7(0x492)][_0x3557a7(0x1da)](),this[_0x3557a7(0x4e4)][_0x3557a7(0x3dc)]()):this[_0x3557a7(0x32b)](_0xec8c0c)),_0x4fbf4a&&this['index']()!==_0x363498&&this['playCursorSound']();}},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x1d2)]=function(){const _0x4502cb=_0xc574cd;this[_0x4502cb(0x3b3)](),this[_0x4502cb(0x32b)](this[_0x4502cb(0x351)]());},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x3b3)]=function(){const _0x4be297=_0xc574cd;for(const _0x22d670 of Window_ItemCategory[_0x4be297(0x2e3)]){this[_0x4be297(0x464)](_0x22d670);}},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x464)]=function(_0x1e3394){const _0x1bc360=_0xc574cd,_0x193718=_0x1e3394[_0x1bc360(0x534)],_0x1b9de2=_0x1e3394[_0x1bc360(0x207)],_0x481561=_0x1e3394['SwitchID']||0x0;if(_0x481561>0x0&&!$gameSwitches[_0x1bc360(0x118)](_0x481561))return;let _0x47cc90='',_0x281aba=_0x1bc360(0x3a7),_0x1caef3=_0x193718;if(_0x193718[_0x1bc360(0x4e0)](/Category:(.*)/i))_0x47cc90=String(RegExp['$1'])['trim']();else{if(Window_ItemCategory[_0x1bc360(0x222)][_0x1bc360(0x3a8)](_0x193718))_0x47cc90=VisuMZ[_0x1bc360(0x3aa)]['Settings']['Categories'][_0x193718];else{if([_0x1bc360(0x2f4),'RegularItems'][_0x1bc360(0x3a8)](_0x193718))_0x47cc90=TextManager['item'];else{if(_0x193718===_0x1bc360(0x415))_0x47cc90=TextManager[_0x1bc360(0x3ea)];else{if(_0x193718===_0x1bc360(0x216)){if('GxFbo'===_0x1bc360(0x228))_0x47cc90=TextManager[_0x1bc360(0x2cc)];else return this['updatedLayoutStyle']()[_0x1bc360(0x4e0)](/LOWER/i);}else{if(_0x193718===_0x1bc360(0x45a))_0x47cc90=TextManager[_0x1bc360(0x2c8)];else{if(_0x193718[_0x1bc360(0x4e0)](/WTYPE:(\d+)/i)){if(_0x1bc360(0x2fb)!==_0x1bc360(0x2fb))return _0xd06d8f[_0x1bc360(0x3aa)]['Settings'][_0x1bc360(0x372)][_0x1bc360(0x156)];else _0x47cc90=$dataSystem[_0x1bc360(0x483)][Number(RegExp['$1'])]||'';}else{if(_0x193718['match'](/ATYPE:(\d+)/i))'BqptJ'!==_0x1bc360(0x3c8)?_0x47cc90=$dataSystem[_0x1bc360(0x1eb)][Number(RegExp['$1'])]||'':this['canShiftRemoveEquipment'](this[_0x1bc360(0x351)]())?(this[_0x1bc360(0x48e)](),this[_0x1bc360(0x3d2)]()):this[_0x1bc360(0x3c9)]();else _0x193718[_0x1bc360(0x4e0)](/ETYPE:(\d+)/i)&&(_0x47cc90=$dataSystem[_0x1bc360(0x4ea)][Number(RegExp['$1'])]||'');}}}}}}}_0x1b9de2>0x0&&this['categoryStyle']()!==_0x1bc360(0x3d9)&&(_0x47cc90=_0x1bc360(0x244)[_0x1bc360(0x2f2)](_0x1b9de2,_0x47cc90)),this[_0x1bc360(0x2a1)](_0x47cc90,_0x281aba,!![],_0x1caef3);},Window_ItemCategory['prototype'][_0xc574cd(0xfe)]=function(){const _0x1b5499=_0xc574cd;return VisuMZ[_0x1b5499(0x3aa)][_0x1b5499(0x241)][_0x1b5499(0x475)]['TextAlign'];},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x315)]=function(_0x4b5f70){const _0x490d89=_0xc574cd,_0x5f2f23=this[_0x490d89(0x286)](_0x4b5f70);if(_0x5f2f23===_0x490d89(0x1e2))this[_0x490d89(0x527)](_0x4b5f70);else{if(_0x5f2f23===_0x490d89(0x3bb)){if(_0x490d89(0x36a)!==_0x490d89(0x36a)){const _0x5a6772=this[_0x490d89(0x1a9)](_0x12882a);if(_0x5a6772[_0x490d89(0x4e0)](/\\I\[(\d+)\]/i)){const _0x53da10=this['itemLineRect'](_0x5ccb37),_0x2147d3=this[_0x490d89(0x21c)](_0x5a6772)['width'];return _0x2147d3<=_0x53da10[_0x490d89(0x4d5)]?_0x490d89(0x1e2):_0x490d89(0x3bb);}}else this[_0x490d89(0x255)](_0x4b5f70);}else _0x490d89(0x394)===_0x490d89(0x312)?(_0x37110e[_0x490d89(0x405)][_0x490d89(0x441)][_0x490d89(0x3e9)](this),this[_0x490d89(0x4ae)]()):Window_HorzCommand[_0x490d89(0x405)][_0x490d89(0x315)][_0x490d89(0x3e9)](this,_0x4b5f70);}},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x2d6)]=function(){const _0x401dc5=_0xc574cd;return VisuMZ[_0x401dc5(0x3aa)][_0x401dc5(0x241)]['Categories'][_0x401dc5(0x80)];},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x286)]=function(_0x5bd6e1){const _0x162141=_0xc574cd;if(_0x5bd6e1<0x0)return _0x162141(0x3d9);const _0x52252d=this[_0x162141(0x2d6)]();if(_0x52252d!==_0x162141(0x37a))return _0x52252d;else{const _0x5419fc=this[_0x162141(0x1a9)](_0x5bd6e1);if(_0x5419fc['match'](/\\I\[(\d+)\]/i)){const _0xc3a358=this[_0x162141(0x349)](_0x5bd6e1),_0x1796c7=this[_0x162141(0x21c)](_0x5419fc)[_0x162141(0x4d5)];return _0x1796c7<=_0xc3a358['width']?_0x162141(0x319)==='NuYnf'?_0x162141(0x1e2):this[_0x162141(0x39d)]()?this[_0x162141(0x87)]():_0x3ec35[_0x162141(0x3aa)][_0x162141(0x448)][_0x162141(0x3e9)](this):'icon';}else{if(_0x162141(0x3fe)!=='NyhRF'){_0x3de17c['VisuMZ_0_CoreEngine']?(_0x8bcc10=this[_0x162141(0x1e1)][_0x162141(0xa3)](_0x23f258,![]),_0x4e87b0=this['_tempActor'][_0x162141(0xa3)](_0x4a4318,![]),_0x58efe3=_0x3d6a26(this['_actor'][_0x162141(0xa3)](_0x38e695,!![]))[_0x162141(0x4e0)](/([%％])/i)):(_0x183e51=this[_0x162141(0x1e1)]['param'](_0xa72f9e),_0xad8943=this['_tempActor']['param'](_0x488415),_0x500fa2=_0x509635%0x1!==0x0||_0x3831d5%0x1!==0x0);const _0x2ad7ae=_0xeb4207,_0x5e102e=_0x510507,_0x1fb0b6=_0x5e102e-_0x2ad7ae;let _0x501426=_0x1fb0b6;if(_0x2e0993)_0x501426=_0x19a73a['round'](_0x1fb0b6*0x64)+'%';_0x1fb0b6!==0x0&&(this[_0x162141(0x163)](_0x5e4acb['paramchangeTextColor'](_0x1fb0b6)),_0x501426=(_0x1fb0b6>0x0?_0x162141(0x285):_0x162141(0x32e))[_0x162141(0x2f2)](_0x501426),this[_0x162141(0x498)](_0x501426,_0x27bf3c+_0x231c2d,_0x1a159c,_0x184930,_0x162141(0x414)));}else return _0x162141(0x3d9);}}},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x527)]=function(_0x13496f){const _0x5842a0=_0xc574cd,_0x3d85f9=this[_0x5842a0(0x349)](_0x13496f),_0x4c3e38=this[_0x5842a0(0x1a9)](_0x13496f),_0x57a322=this[_0x5842a0(0x21c)](_0x4c3e38)[_0x5842a0(0x4d5)];this[_0x5842a0(0x43c)](this[_0x5842a0(0x289)](_0x13496f));const _0x51b414=this[_0x5842a0(0xfe)]();if(_0x51b414===_0x5842a0(0xae))this['drawTextEx'](_0x4c3e38,_0x3d85f9['x']+_0x3d85f9[_0x5842a0(0x4d5)]-_0x57a322,_0x3d85f9['y'],_0x57a322);else{if(_0x51b414===_0x5842a0(0x1a0)){if(_0x5842a0(0x25b)===_0x5842a0(0x25b)){const _0x9d896b=_0x3d85f9['x']+Math['floor']((_0x3d85f9[_0x5842a0(0x4d5)]-_0x57a322)/0x2);this[_0x5842a0(0xe3)](_0x4c3e38,_0x9d896b,_0x3d85f9['y'],_0x57a322);}else this['commandSellItemsEquipsCore']();}else this[_0x5842a0(0xe3)](_0x4c3e38,_0x3d85f9['x'],_0x3d85f9['y'],_0x57a322);}},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x255)]=function(_0x464fc1){const _0x3b498f=_0xc574cd,_0x2e3e3f=this[_0x3b498f(0x1a9)](_0x464fc1);if(_0x2e3e3f[_0x3b498f(0x4e0)](/\\I\[(\d+)\]/i)){const _0x3482c2=Number(RegExp['$1'])||0x0,_0x11cd8d=this[_0x3b498f(0x349)](_0x464fc1),_0x47dc27=_0x11cd8d['x']+Math['floor']((_0x11cd8d['width']-ImageManager['iconWidth'])/0x2),_0x4d9e19=_0x11cd8d['y']+(_0x11cd8d[_0x3b498f(0x3bd)]-ImageManager['iconHeight'])/0x2;this[_0x3b498f(0x4a2)](_0x3482c2,_0x47dc27,_0x4d9e19);}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x15d)]=Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x213)],Window_ItemCategory[_0xc574cd(0x405)]['setItemWindow']=function(_0x4b194d){const _0x495598=_0xc574cd;VisuMZ[_0x495598(0x3aa)][_0x495598(0x15d)][_0x495598(0x3e9)](this,_0x4b194d),_0x4b194d['_categoryWindow']=this;},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x4bc)]=function(){const _0x2f712d=_0xc574cd;Window_HorzCommand['prototype'][_0x2f712d(0x4bc)][_0x2f712d(0x3e9)](this);if(this['_categoryNameWindow'])this[_0x2f712d(0x522)]();},Window_ItemCategory[_0xc574cd(0x405)]['updateCategoryNameWindow']=function(){const _0x479e42=_0xc574cd,_0x3a6e27=this[_0x479e42(0x30b)];_0x3a6e27['contents'][_0x479e42(0x3cc)]();const _0x428c15=this['categoryStyleCheck'](this['index']());if(_0x428c15===_0x479e42(0x3bb)){if(_0x479e42(0x251)!==_0x479e42(0x193)){const _0x1ffda0=this[_0x479e42(0x349)](this[_0x479e42(0x351)]());let _0x2ce04d=this[_0x479e42(0x1a9)](this[_0x479e42(0x351)]());_0x2ce04d=_0x2ce04d[_0x479e42(0x2af)](/\\I\[(\d+)\]/gi,''),_0x3a6e27[_0x479e42(0x306)](),this['categoryNameWindowDrawBackground'](_0x2ce04d,_0x1ffda0),this['categoryNameWindowDrawText'](_0x2ce04d,_0x1ffda0),this['categoryNameWindowCenter'](_0x2ce04d,_0x1ffda0);}else _0x546419[_0x479e42(0x3aa)][_0x479e42(0x49f)][_0x479e42(0x3e9)](this),this[_0x479e42(0x39d)]()&&this[_0x479e42(0x4d2)]();}},Window_ItemCategory['prototype'][_0xc574cd(0x13d)]=function(_0x40332d,_0x5cc35c){},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x210)]=function(_0xc0e2c3,_0x40735a){const _0x2ba113=_0xc574cd,_0x4c605b=this[_0x2ba113(0x30b)];_0x4c605b[_0x2ba113(0x498)](_0xc0e2c3,0x0,_0x40735a['y'],_0x4c605b[_0x2ba113(0x353)],_0x2ba113(0x1a0));},Window_ItemCategory[_0xc574cd(0x405)][_0xc574cd(0x4b3)]=function(_0x4c1ffc,_0x1ac02c){const _0x51755c=_0xc574cd,_0x470867=this[_0x51755c(0x30b)],_0x2e8e16=$gameSystem[_0x51755c(0x12f)](),_0x48b2fb=_0x1ac02c['x']+Math[_0x51755c(0x397)](_0x1ac02c[_0x51755c(0x4d5)]/0x2)+_0x2e8e16;_0x470867['x']=_0x470867[_0x51755c(0x4d5)]/-0x2+_0x48b2fb,_0x470867['y']=Math['floor'](_0x1ac02c['height']/0x2);},Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x497)]=function(){const _0x104669=_0xc574cd;if(this['isCursorMovable']()){const _0x3d1249=this[_0x104669(0x351)]();if(this[_0x104669(0x1b9)]()<=0x1){if(_0x104669(0x505)!==_0x104669(0x505)){if(_0x4eab12[_0x24be1c]===_0x40643d){_0x2dc1db=_0x7ddb40;if(!_0xe0aa12[_0x5b1c53])return _0x45d528;}}else!this[_0x104669(0x324)]('pagedown')&&Input[_0x104669(0x510)]('pagedown')&&this['cursorPagedown'](),!this[_0x104669(0x324)]('pageup')&&Input[_0x104669(0x510)]('pageup')&&this['cursorPageup']();}else{if(this[_0x104669(0x1b9)]()>0x1){if(_0x104669(0x382)===_0x104669(0x240)){const _0x2325e3=_0x311fb5['makeDeepCopy'](this);_0x2325e3['_tempActor']=!![],_0x1fb661[_0x104669(0x3aa)][_0x104669(0x139)]['call'](this,_0x3ec8b1),this[_0x104669(0x431)](_0x2325e3);}else{Input[_0x104669(0x22b)](_0x104669(0xae))&&this[_0x104669(0xed)](Input[_0x104669(0x510)](_0x104669(0xae)));Input['isRepeated'](_0x104669(0x414))&&(_0x104669(0x43b)!==_0x104669(0x269)?this[_0x104669(0x3c2)](Input[_0x104669(0x510)](_0x104669(0x414))):this[_0x104669(0xc0)]());if(this[_0x104669(0x2b0)]()){Input[_0x104669(0x510)](_0x104669(0x331))&&Input['isPressed'](_0x104669(0x23e))&&this[_0x104669(0x517)]();if(Input[_0x104669(0x510)](_0x104669(0x42c))&&Input[_0x104669(0x33f)](_0x104669(0x23e))){if(_0x104669(0x49b)===_0x104669(0x49b))this['cursorPageup']();else return _0x1b3f9f['ItemsEquipsCore'][_0x104669(0x290)][_0x104669(0x3e9)](this,_0x4f243c);}}else{if(_0x104669(0x235)===_0x104669(0x206)){const _0x64ead6=_0x504a59[_0x104669(0x3aa)]['Settings'][_0x104669(0x2a6)]['LabelDamageMP'];return _0x64ead6[_0x104669(0x2f2)](_0x3e89af['mp']);}else Input[_0x104669(0x510)](_0x104669(0x331))&&(_0x104669(0x48b)===_0x104669(0x19e)?(this[_0x104669(0x45e)]['smoothSelect'](0x0),this[_0x104669(0x2ef)][_0x104669(0x542)]()):this[_0x104669(0x517)]()),Input[_0x104669(0x510)](_0x104669(0x42c))&&this[_0x104669(0x436)]();}}}}Input[_0x104669(0x22b)]('down')&&(Input[_0x104669(0x33f)](_0x104669(0x23e))&&this[_0x104669(0xb6)]()?this[_0x104669(0x517)]():this[_0x104669(0x192)](Input[_0x104669(0x510)](_0x104669(0x423))));if(Input['isRepeated']('up')){if(_0x104669(0x9c)!==_0x104669(0x24d)){if(Input['isPressed'](_0x104669(0x23e))&&this[_0x104669(0xb6)]())this['cursorPageup']();else{if(_0x104669(0x458)===_0x104669(0x16d)){_0x25ac80=_0x132832;if(!_0x2f2df9[_0x161812])return _0x2986ba;}else this[_0x104669(0x158)](Input['isTriggered']('up'));}}else delete this['_categoryWindow'][_0x104669(0x2f0)]['ok'],delete this['_categoryWindow'][_0x104669(0x2f0)]['cancel'];}if(Imported['VisuMZ_0_CoreEngine']){if(_0x104669(0x3f2)!==_0x104669(0x443))this['processCursorHomeEndTrigger']();else{if(this['buttonAssistItemListRequirement']())return _0x3fd335['ItemsEquipsCore'][_0x104669(0x241)]['ItemScene'][_0x104669(0x49e)];return _0x534fb0[_0x104669(0x405)]['buttonAssistText1'][_0x104669(0x3e9)](this);}}if(this[_0x104669(0x351)]()!==_0x3d1249){if('eHjgO'!==_0x104669(0x345))this['playCursorSound']();else return _0x624791['max'](0x1,_0x598f6e[_0x104669(0x46c)]()-0x4);}}},Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x2b0)]=function(){const _0x2b683a=_0xc574cd,_0x4bd7e3=SceneManager[_0x2b683a(0x185)],_0x1596b4=[Scene_Item,Scene_Shop];return _0x1596b4[_0x2b683a(0x3a8)](_0x4bd7e3[_0x2b683a(0x1a1)]);},Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x412)]=function(){const _0x2ea7ac=_0xc574cd;Window_Selectable['prototype']['activate'][_0x2ea7ac(0x3e9)](this);if(this[_0x2ea7ac(0x439)]&&this[_0x2ea7ac(0x439)][_0x2ea7ac(0x374)]()){if('wknqm'===_0x2ea7ac(0x134)){_0x2fc989[_0x2ea7ac(0x405)][_0x2ea7ac(0x325)][_0x2ea7ac(0x3e9)](this);for(const _0x50d13a of _0x5ddb95[_0x2ea7ac(0xe8)]()){_0x193b9c[_0x2ea7ac(0x1a7)](_0x50d13a['characterName']());}}else this[_0x2ea7ac(0x439)][_0x2ea7ac(0x412)]();}},Window_ItemList[_0xc574cd(0x405)]['deactivate']=function(){const _0x43c2d0=_0xc574cd;Window_Selectable[_0x43c2d0(0x405)]['deactivate'][_0x43c2d0(0x3e9)](this),this['_categoryWindow']&&this['_categoryWindow'][_0x43c2d0(0x374)]()&&this[_0x43c2d0(0x439)][_0x43c2d0(0x542)]();},Window_ItemList['prototype'][_0xc574cd(0x186)]=function(_0x37c9c4){const _0xf707f2=_0xc574cd;if(this[_0xf707f2(0x31a)]!==_0x37c9c4){this[_0xf707f2(0x31a)]=_0x37c9c4,this['refresh']();if(this[_0xf707f2(0x439)]&&this['_categoryWindow'][_0xf707f2(0x374)]()){if(_0xf707f2(0x176)!==_0xf707f2(0x4ad))this[_0xf707f2(0x126)](0x0);else{if(!this[_0xf707f2(0xfa)]())return![];if(_0x321982[_0xf707f2(0x185)][_0xf707f2(0x1a1)]!==_0x31e369)return![];return _0x24007[_0xf707f2(0x510)](_0xf707f2(0x423))&&(this['playCursorSound'](),_0xefb739[_0xf707f2(0x185)][_0xf707f2(0x43f)](),_0x3dce2f[_0xf707f2(0x185)][_0xf707f2(0x2ef)][_0xf707f2(0x126)](-0x1)),![];}}else this[_0xf707f2(0x2e4)](0x0,0x0);}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x2b1)]=Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x1b9)],Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x1b9)]=function(){const _0x45fa09=_0xc574cd;if(SceneManager[_0x45fa09(0x185)][_0x45fa09(0x1a1)]===Scene_Battle)return VisuMZ[_0x45fa09(0x3aa)][_0x45fa09(0x2b1)][_0x45fa09(0x3e9)](this);else{if(SceneManager[_0x45fa09(0x185)][_0x45fa09(0x1a1)]===Scene_Map)return VisuMZ[_0x45fa09(0x3aa)][_0x45fa09(0x2b1)][_0x45fa09(0x3e9)](this);else{if(_0x45fa09(0x2a9)!==_0x45fa09(0x2a9))this[_0x45fa09(0x418)](),this['addOptimizeCommand'](),this[_0x45fa09(0x233)]();else return VisuMZ[_0x45fa09(0x3aa)][_0x45fa09(0x241)]['ItemScene'][_0x45fa09(0x1ff)];}}},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x1a8)]=Window_ItemList['prototype']['colSpacing'],Window_ItemList['prototype'][_0xc574cd(0x484)]=function(){const _0x5bd92f=_0xc574cd;return this[_0x5bd92f(0x1b9)]()<=0x1?Window_Selectable['prototype'][_0x5bd92f(0x484)]['call'](this):VisuMZ['ItemsEquipsCore'][_0x5bd92f(0x1a8)][_0x5bd92f(0x3e9)](this);},Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x3a8)]=function(_0x2283e7){const _0x4766fa=_0xc574cd;switch(this[_0x4766fa(0x31a)]){case _0x4766fa(0x2f4):return DataManager[_0x4766fa(0x165)](_0x2283e7);case'RegularItems':return DataManager[_0x4766fa(0x165)](_0x2283e7)&&_0x2283e7[_0x4766fa(0x7f)]===0x1;case'KeyItems':return DataManager[_0x4766fa(0x165)](_0x2283e7)&&_0x2283e7[_0x4766fa(0x7f)]===0x2;case _0x4766fa(0x2be):return DataManager[_0x4766fa(0x165)](_0x2283e7)&&_0x2283e7[_0x4766fa(0x7f)]===0x3;case'HiddenItemB':return DataManager[_0x4766fa(0x165)](_0x2283e7)&&_0x2283e7[_0x4766fa(0x7f)]===0x4;case'Consumable':return DataManager[_0x4766fa(0x165)](_0x2283e7)&&_0x2283e7['consumable'];case'Nonconsumable':return DataManager['isItem'](_0x2283e7)&&!_0x2283e7[_0x4766fa(0x1f1)];case _0x4766fa(0x1d6):return DataManager[_0x4766fa(0x165)](_0x2283e7)&&[0x0]['includes'](_0x2283e7['occasion']);case _0x4766fa(0x22c):return DataManager[_0x4766fa(0x165)](_0x2283e7)&&[0x0,0x1][_0x4766fa(0x3a8)](_0x2283e7[_0x4766fa(0x278)]);case'FieldUsable':return DataManager[_0x4766fa(0x165)](_0x2283e7)&&[0x0,0x2][_0x4766fa(0x3a8)](_0x2283e7[_0x4766fa(0x278)]);case _0x4766fa(0x4a6):return DataManager[_0x4766fa(0x165)](_0x2283e7)&&[0x3]['includes'](_0x2283e7[_0x4766fa(0x278)]);case _0x4766fa(0x216):return DataManager[_0x4766fa(0x487)](_0x2283e7);case _0x4766fa(0x45a):return DataManager[_0x4766fa(0x467)](_0x2283e7);default:if(this[_0x4766fa(0x31a)][_0x4766fa(0x4e0)](/WTYPE:(\d+)/i))return DataManager['isWeapon'](_0x2283e7)&&_0x2283e7[_0x4766fa(0x4f1)]===Number(RegExp['$1']);else{if(this[_0x4766fa(0x31a)]['match'](/WTYPE:(.*)/i)){const _0x4a228c=$dataSystem[_0x4766fa(0x483)][_0x4766fa(0x1ad)](String(RegExp['$1'])['trim']());return DataManager[_0x4766fa(0x487)](_0x2283e7)&&_0x2283e7[_0x4766fa(0x4f1)]===_0x4a228c;}else{if(this[_0x4766fa(0x31a)][_0x4766fa(0x4e0)](/ATYPE:(\d+)/i))return DataManager[_0x4766fa(0x467)](_0x2283e7)&&_0x2283e7['atypeId']===Number(RegExp['$1']);else{if(this[_0x4766fa(0x31a)][_0x4766fa(0x4e0)](/ATYPE:(.*)/i)){if(_0x4766fa(0xc5)===_0x4766fa(0x43e))this[_0x4766fa(0x163)](_0xee2ff7[_0x4766fa(0x452)]());else{const _0x3b0e32=$dataSystem['armorTypes'][_0x4766fa(0x1ad)](String(RegExp['$1'])['trim']());return DataManager[_0x4766fa(0x467)](_0x2283e7)&&_0x2283e7[_0x4766fa(0x277)]===_0x3b0e32;}}else{if(this[_0x4766fa(0x31a)][_0x4766fa(0x4e0)](/ETYPE:(\d+)/i))return!!_0x2283e7&&_0x2283e7[_0x4766fa(0x35c)]===Number(RegExp['$1']);else{if(this[_0x4766fa(0x31a)][_0x4766fa(0x4e0)](/ETYPE:(.*)/i)){if('cIVQh'===_0x4766fa(0x3d1)){const _0xb7cffd=$dataSystem[_0x4766fa(0x4ea)][_0x4766fa(0x1ad)](String(RegExp['$1'])['trim']());return DataManager['isArmor'](_0x2283e7)&&_0x2283e7[_0x4766fa(0x35c)]===_0xb7cffd;}else this[_0x4766fa(0x133)]();}else{if(this[_0x4766fa(0x31a)][_0x4766fa(0x4e0)](/Category:(.*)/i))return!!_0x2283e7&&_0x2283e7[_0x4766fa(0x190)][_0x4766fa(0x3a8)](String(RegExp['$1'])[_0x4766fa(0x23c)]()[_0x4766fa(0x3c0)]());}}}}}}}return![];},Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x23d)]=function(){return!![];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x303)]=Window_ItemList[_0xc574cd(0x405)]['drawItem'],Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x315)]=function(_0x24168c){const _0x122465=_0xc574cd;VisuMZ[_0x122465(0x3aa)][_0x122465(0x303)]['call'](this,_0x24168c),this[_0x122465(0x426)](_0x24168c);},Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x35a)]=function(_0x591f64,_0x131700,_0x5b95f8,_0x29e8ee){const _0x456cb6=_0xc574cd;Window_Selectable[_0x456cb6(0x405)]['drawItemNumber']['call'](this,_0x591f64,_0x131700,_0x5b95f8,_0x29e8ee);},Window_ItemList[_0xc574cd(0x405)][_0xc574cd(0x426)]=function(_0x125d64){const _0x11d471=_0xc574cd,_0x16f125=this[_0x11d471(0x52e)](_0x125d64);if(!_0x16f125||!this[_0x11d471(0x23d)]())return;if(!$gameParty[_0x11d471(0x151)](_0x16f125))return;const _0x247339=this['itemLineRect'](_0x125d64),_0x4ce966=_0x247339['x'],_0x53617f=_0x247339['y']+(this['lineHeight']()-ImageManager[_0x11d471(0x220)])/0x2,_0x2ce8e5=VisuMZ[_0x11d471(0x3aa)][_0x11d471(0x241)][_0x11d471(0x3ac)][_0x11d471(0x1f7)],_0x4d9ebe=VisuMZ['ItemsEquipsCore']['Settings'][_0x11d471(0x3ac)][_0x11d471(0xe4)];this['placeNewLabel'](_0x16f125,_0x4ce966+_0x2ce8e5,_0x53617f+_0x4d9ebe);},Window_ItemList[_0xc574cd(0x405)]['setStatusWindow']=function(_0x67fab9){const _0x10251a=_0xc574cd;this['_statusWindow']=_0x67fab9,this[_0x10251a(0x4bc)]();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x4e1)]=Window_ItemList['prototype'][_0xc574cd(0x3d2)],Window_ItemList['prototype'][_0xc574cd(0x3d2)]=function(){const _0x4ab4e3=_0xc574cd;VisuMZ[_0x4ab4e3(0x3aa)][_0x4ab4e3(0x4e1)][_0x4ab4e3(0x3e9)](this),this[_0x4ab4e3(0x4e4)]&&this[_0x4ab4e3(0x4e4)][_0x4ab4e3(0x1a1)]===Window_ShopStatus&&this[_0x4ab4e3(0x4e4)]['setItem'](this['item']());},Window_BattleItem[_0xc574cd(0x405)]['isEnabled']=function(_0x5071e4){const _0x2f30fd=_0xc574cd;if(BattleManager[_0x2f30fd(0x3de)]()){if(_0x2f30fd(0x12b)===_0x2f30fd(0xd5))this[_0x2f30fd(0xe3)](_0x18f0ca,_0x472c3a['x']+_0x627a8a[_0x2f30fd(0x4d5)]-_0x2ff13c,_0x176549['y'],_0x41b941);else return BattleManager[_0x2f30fd(0x3de)]()[_0x2f30fd(0x465)](_0x5071e4);}else return Window_ItemList[_0x2f30fd(0x405)][_0x2f30fd(0x41c)][_0x2f30fd(0x3e9)](this,_0x5071e4);},Window_EventItem['prototype']['isShowNew']=function(){return![];},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x39d)]=function(){const _0x20d505=_0xc574cd;return VisuMZ[_0x20d505(0x3aa)][_0x20d505(0x241)][_0x20d505(0x372)][_0x20d505(0x156)];},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x1cc)]=Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x3b4)],Window_EquipStatus['prototype'][_0xc574cd(0x3b4)]=function(){const _0x3f4708=_0xc574cd;this[_0x3f4708(0x470)](),this['resetFontSettings']();if(this['_actor'])this[_0x3f4708(0x1e1)][_0x3f4708(0x3b4)]();if(this[_0x3f4708(0x39d)]())this[_0x3f4708(0x28c)]();else{if(_0x3f4708(0x187)!==_0x3f4708(0x16c))VisuMZ['ItemsEquipsCore'][_0x3f4708(0x1cc)][_0x3f4708(0x3e9)](this);else return _0x385181[_0x3f4708(0xa7)]();}},Window_EquipStatus['prototype'][_0xc574cd(0x28c)]=function(){const _0x58aad3=_0xc574cd;this[_0x58aad3(0x211)]['clear']();if(!this[_0x58aad3(0x1e1)])return;if(this[_0x58aad3(0x48c)]()){if('idHiK'===_0x58aad3(0x27b)){const _0x3500b4=this[_0x58aad3(0xd3)](_0xc74ae0);if(_0x3500b4===_0x58aad3(0x1e2))this['drawItemStyleIconText'](_0x401475);else _0x3500b4===_0x58aad3(0x3bb)?this[_0x58aad3(0x255)](_0xde22dc):_0x2cb436[_0x58aad3(0x405)][_0x58aad3(0x315)]['call'](this,_0xa76659);}else{const _0x1fb836=ImageManager[_0x58aad3(0x390)](this[_0x58aad3(0x1e1)][_0x58aad3(0x3bf)]());_0x1fb836[_0x58aad3(0x22a)](this['onMenuImageLoad'][_0x58aad3(0x2b9)](this));}}else this[_0x58aad3(0x8f)]();},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x48c)]=function(){const _0x19d319=_0xc574cd;return Imported['VisuMZ_1_MainMenuCore']&&this[_0x19d319(0x1e1)][_0x19d319(0x3bf)]()!==''&&VisuMZ[_0x19d319(0x3aa)][_0x19d319(0x241)]['EquipScene']['MenuPortraits'];},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x161)]=function(){const _0x47c1c3=_0xc574cd;VisuMZ[_0x47c1c3(0x3aa)]['Settings'][_0x47c1c3(0x372)]['DrawPortraitJS'][_0x47c1c3(0x3e9)](this),this[_0x47c1c3(0x25f)]();},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x8f)]=function(){const _0x464001=_0xc574cd;VisuMZ['ItemsEquipsCore'][_0x464001(0x241)]['EquipScene']['DrawFaceJS'][_0x464001(0x3e9)](this),this[_0x464001(0x25f)]();},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x25f)]=function(){const _0x22412c=_0xc574cd;this[_0x22412c(0x306)](),VisuMZ[_0x22412c(0x3aa)][_0x22412c(0x241)][_0x22412c(0x372)][_0x22412c(0x2a2)][_0x22412c(0x3e9)](this);},Window_EquipStatus[_0xc574cd(0x405)]['drawItemActorMenuImage']=function(_0x8585b2,_0x5504f7,_0x42981a,_0x269eb0,_0x33994a){const _0x2896b9=_0xc574cd,_0x325336=ImageManager[_0x2896b9(0x390)](_0x8585b2[_0x2896b9(0x3bf)]()),_0x20cc80=this[_0x2896b9(0x353)]-_0x325336[_0x2896b9(0x4d5)];_0x5504f7+=_0x20cc80/0x2;if(_0x20cc80<0x0)_0x269eb0-=_0x20cc80;Window_StatusBase['prototype']['drawItemActorMenuImage'][_0x2896b9(0x3e9)](this,_0x8585b2,_0x5504f7,_0x42981a,_0x269eb0,_0x33994a);},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x52c)]=function(){const _0x579589=_0xc574cd;return Imported[_0x579589(0x301)]?VisuMZ[_0x579589(0x2d1)][_0x579589(0x241)][_0x579589(0x44e)][_0x579589(0x175)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x17e)]=function(){const _0x4a62d2=_0xc574cd;return VisuMZ[_0x4a62d2(0x3aa)][_0x4a62d2(0x241)]['EquipScene']['ParamValueFontSize'];},Window_EquipStatus[_0xc574cd(0x405)]['isUseParamNamesWithIcons']=function(){const _0x438ba1=_0xc574cd;return Imported[_0x438ba1(0x301)]&&VisuMZ[_0x438ba1(0x2d1)][_0x438ba1(0x241)][_0x438ba1(0x44e)][_0x438ba1(0x2eb)];},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x478)]=function(_0x2a0be4,_0x1538a3,_0x571799,_0x513b66){const _0x3b5b4b=_0xc574cd,_0x3733ef=this['itemPadding']();if(Imported[_0x3b5b4b(0x301)])this['drawParamText'](_0x1538a3+_0x3733ef,_0x571799,_0x513b66,_0x2a0be4,![]);else{if(_0x3b5b4b(0x1ae)!=='lrxOk')return;else this[_0x3b5b4b(0x498)](TextManager[_0x3b5b4b(0x2ae)](_0x2a0be4),_0x1538a3+_0x3733ef,_0x571799,_0x513b66);}},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x28a)]=function(_0x5139eb,_0x2582ac,_0xc3f91c,_0x4edc00){const _0x5cceb1=_0xc574cd,_0xf3ddb1=this[_0x5cceb1(0x404)]();let _0x1bf316=0x0;Imported[_0x5cceb1(0x301)]?_0x1bf316=this[_0x5cceb1(0x1e1)][_0x5cceb1(0xa3)](_0x5139eb,!![]):_0x1bf316=this['_actor']['param'](_0x5139eb);const _0x4446de=_0x1bf316;this[_0x5cceb1(0x498)](_0x1bf316,_0x2582ac,_0xc3f91c,_0x4edc00-_0xf3ddb1,_0x5cceb1(0xae));},Window_EquipStatus['prototype'][_0xc574cd(0x34a)]=function(_0x3e0039,_0x52d86a,_0x1bb072,_0x2158e7){const _0x3e7daa=_0xc574cd,_0x45dd01=this[_0x3e7daa(0x404)]();let _0x142b4f=0x0,_0x313807=0x0,_0x53d247='';if(this[_0x3e7daa(0x314)]){if(Imported['VisuMZ_0_CoreEngine'])_0x142b4f=this['_actor']['paramValueByName'](_0x3e0039,![]),_0x313807=this['_tempActor'][_0x3e7daa(0xa3)](_0x3e0039,![]),_0x53d247=this[_0x3e7daa(0x314)][_0x3e7daa(0xa3)](_0x3e0039,!![]);else{if(_0x3e7daa(0xe7)===_0x3e7daa(0x29d)){const _0x1f99d4=_0x24be3a[_0x3e7daa(0x390)](this[_0x3e7daa(0x1e1)]['getMenuImage']());_0x1f99d4[_0x3e7daa(0x22a)](this[_0x3e7daa(0x161)][_0x3e7daa(0x2b9)](this));}else _0x142b4f=this[_0x3e7daa(0x1e1)][_0x3e7daa(0x2ae)](_0x3e0039),_0x313807=this[_0x3e7daa(0x314)][_0x3e7daa(0x2ae)](_0x3e0039),_0x53d247=this[_0x3e7daa(0x314)][_0x3e7daa(0x2ae)](_0x3e0039);}const _0x1d4ace=_0x142b4f,_0x43626d=_0x313807;diffValue=_0x43626d-_0x1d4ace,this[_0x3e7daa(0x163)](ColorManager[_0x3e7daa(0xaa)](diffValue)),this[_0x3e7daa(0x498)](_0x53d247,_0x52d86a,_0x1bb072,_0x2158e7-_0x45dd01,_0x3e7daa(0xae));}},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x463)]=function(_0x55241c,_0x935a08,_0x4f2b66,_0x2593a5){const _0x1dbde1=_0xc574cd,_0x302a96=this['itemPadding']();let _0x59969e=0x0,_0x3ec452=0x0,_0x3256f5=![];if(this[_0x1dbde1(0x314)]){if(Imported[_0x1dbde1(0x301)])_0x59969e=this[_0x1dbde1(0x1e1)]['paramValueByName'](_0x55241c,![]),_0x3ec452=this[_0x1dbde1(0x314)][_0x1dbde1(0xa3)](_0x55241c,![]),_0x3256f5=String(this['_actor'][_0x1dbde1(0xa3)](_0x55241c,!![]))[_0x1dbde1(0x4e0)](/([%％])/i);else{if(_0x1dbde1(0x38c)===_0x1dbde1(0x215)){const _0x2fef11=this[_0x1dbde1(0x20b)];_0x2fef11[_0x1dbde1(0x498)](_0xa3864e,0x0,_0x4ae4fd['y'],_0x2fef11[_0x1dbde1(0x353)],_0x1dbde1(0x1a0));}else _0x59969e=this[_0x1dbde1(0x1e1)]['param'](_0x55241c),_0x3ec452=this['_tempActor'][_0x1dbde1(0x2ae)](_0x55241c),_0x3256f5=_0x59969e%0x1!==0x0||_0x3ec452%0x1!==0x0;}const _0x5566d6=_0x59969e,_0x3b899c=_0x3ec452,_0x5f96bc=_0x3b899c-_0x5566d6;let _0xe98a65=_0x5f96bc;if(_0x3256f5)_0xe98a65=Math[_0x1dbde1(0x434)](_0x5f96bc*0x64)+'%';if(_0x5f96bc!==0x0){if('Iropd'!=='mzpTQ')this[_0x1dbde1(0x163)](ColorManager[_0x1dbde1(0xaa)](_0x5f96bc)),_0xe98a65=(_0x5f96bc>0x0?_0x1dbde1(0x285):'(%1)')[_0x1dbde1(0x2f2)](_0xe98a65),this[_0x1dbde1(0x498)](_0xe98a65,_0x935a08+_0x302a96,_0x4f2b66,_0x2593a5,_0x1dbde1(0x414));else{if(!this[_0x1dbde1(0xf8)](_0x46d360))return![];const _0x39cabf=_0x1ef4c9[_0x1dbde1(0x2db)];if(!_0x39cabf)return![];if(_0x39cabf[_0x1dbde1(0x4e0)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x39cabf[_0x1dbde1(0x4e0)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];}}}},Window_EquipStatus[_0xc574cd(0x405)][_0xc574cd(0x1d3)]=function(_0x4e09a0,_0x3492fc,_0x580ab4,_0x33ef2d,_0x1c75eb){const _0x363ea7=_0xc574cd;if(VisuMZ[_0x363ea7(0x3aa)]['Settings']['EquipScene'][_0x363ea7(0x51c)]===![])return;_0x1c75eb=Math[_0x363ea7(0x1ef)](_0x1c75eb||0x1,0x1);while(_0x1c75eb--){_0x33ef2d=_0x33ef2d||this[_0x363ea7(0x363)](),this[_0x363ea7(0x211)][_0x363ea7(0x132)]=0xa0;const _0x21322c=ColorManager[_0x363ea7(0x2c2)]();this[_0x363ea7(0x211)][_0x363ea7(0x41d)](_0x4e09a0+0x1,_0x3492fc+0x1,_0x580ab4-0x2,_0x33ef2d-0x2,_0x21322c),this[_0x363ea7(0x211)][_0x363ea7(0x132)]=0xff;}},ColorManager[_0xc574cd(0x2c2)]=function(){const _0x4e2407=_0xc574cd,_0x1a6898=VisuMZ['ItemsEquipsCore'][_0x4e2407(0x241)][_0x4e2407(0x372)];let _0x928bde=_0x1a6898['BackRectColor']!==undefined?_0x1a6898['BackRectColor']:0x13;return ColorManager[_0x4e2407(0x302)](_0x928bde);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x4d0)]=Window_EquipCommand[_0xc574cd(0x405)]['initialize'],Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x221)]=function(_0x1345e3){const _0x19d32e=_0xc574cd;VisuMZ[_0x19d32e(0x3aa)]['Window_EquipCommand_initialize'][_0x19d32e(0x3e9)](this,_0x1345e3),this[_0x19d32e(0x1b4)](_0x1345e3);},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x1b4)]=function(_0x18e618){const _0x2c6856=_0xc574cd,_0x418cb3=new Rectangle(0x0,0x0,_0x18e618['width'],_0x18e618[_0x2c6856(0x3bd)]);this[_0x2c6856(0x20b)]=new Window_Base(_0x418cb3),this[_0x2c6856(0x20b)][_0x2c6856(0x1c0)]=0x0,this['addChild'](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x4bc)]=function(){const _0x455d57=_0xc574cd;Window_HorzCommand['prototype'][_0x455d57(0x4bc)][_0x455d57(0x3e9)](this);if(this[_0x455d57(0x20b)])this[_0x455d57(0xa1)]();},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0xa1)]=function(){const _0x46e088=_0xc574cd,_0x49fe43=this['_commandNameWindow'];_0x49fe43['contents'][_0x46e088(0x3cc)]();const _0x2c96d6=this[_0x46e088(0xd3)](this[_0x46e088(0x351)]());if(_0x2c96d6===_0x46e088(0x3bb)){if(_0x46e088(0x36b)==='kexot')this[_0x46e088(0x436)]();else{const _0x338bfd=this[_0x46e088(0x349)](this[_0x46e088(0x351)]());let _0x22d41c=this['commandName'](this[_0x46e088(0x351)]());_0x22d41c=_0x22d41c['replace'](/\\I\[(\d+)\]/gi,''),_0x49fe43[_0x46e088(0x306)](),this[_0x46e088(0x116)](_0x22d41c,_0x338bfd),this[_0x46e088(0x536)](_0x22d41c,_0x338bfd),this[_0x46e088(0x461)](_0x22d41c,_0x338bfd);}}},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x116)]=function(_0x11f367,_0x4db190){},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x536)]=function(_0x1890df,_0xe0fdc6){const _0x4342df=_0xc574cd,_0x203fa0=this[_0x4342df(0x20b)];_0x203fa0['drawText'](_0x1890df,0x0,_0xe0fdc6['y'],_0x203fa0[_0x4342df(0x353)],_0x4342df(0x1a0));},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x461)]=function(_0x14b0ac,_0x510294){const _0x4cd68f=_0xc574cd,_0x1417d8=this[_0x4cd68f(0x20b)],_0x196b70=$gameSystem['windowPadding'](),_0x4ee197=_0x510294['x']+Math[_0x4cd68f(0x397)](_0x510294[_0x4cd68f(0x4d5)]/0x2)+_0x196b70;_0x1417d8['x']=_0x1417d8[_0x4cd68f(0x4d5)]/-0x2+_0x4ee197,_0x1417d8['y']=Math[_0x4cd68f(0x397)](_0x510294[_0x4cd68f(0x3bd)]/0x2);},Window_EquipCommand[_0xc574cd(0x405)]['isUseModernControls']=function(){const _0x39948a=_0xc574cd;return Imported[_0x39948a(0x301)]&&Window_HorzCommand[_0x39948a(0x405)]['isUseModernControls'][_0x39948a(0x3e9)](this);},Window_EquipCommand[_0xc574cd(0x405)]['playOkSound']=function(){const _0x4c671c=_0xc574cd;if(this[_0x4c671c(0x44a)]()===_0x4c671c(0x4ec))Window_HorzCommand['prototype']['playOkSound'][_0x4c671c(0x3e9)](this);},Window_EquipCommand['prototype'][_0xc574cd(0x497)]=function(){const _0x5ecb6c=_0xc574cd;if(!this[_0x5ecb6c(0x352)]()){if('IPyDH'===_0x5ecb6c(0x33c)){_0x15870a+=_0x5ecb6c(0x41e)[_0x5ecb6c(0x2f2)](_0x2f0bb6[_0x5ecb6c(0x164)]),_0xf0846d++;if(_0x3ff9d3>=_0x130114)return _0x1f8659;}else Window_HorzCommand[_0x5ecb6c(0x405)]['processCursorMoveModernControls'][_0x5ecb6c(0x3e9)](this);}},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x352)]=function(){const _0x595f98=_0xc574cd;if(!this[_0x595f98(0xfa)]())return![];if(SceneManager[_0x595f98(0x185)]['constructor']!==Scene_Equip)return![];return Input[_0x595f98(0x510)](_0x595f98(0x423))&&(this['playCursorSound'](),SceneManager[_0x595f98(0x185)][_0x595f98(0x43f)](),SceneManager[_0x595f98(0x185)][_0x595f98(0x2ef)][_0x595f98(0x126)](-0x1)),![];},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x1b9)]=function(){const _0x8bceeb=_0xc574cd;return this[_0x8bceeb(0x2e8)]?this['_list'][_0x8bceeb(0x294)]:0x3;},Window_EquipCommand[_0xc574cd(0x405)]['processTouchModernControls']=function(){const _0xf201f0=_0xc574cd;if(this[_0xf201f0(0x16a)]()&&this[_0xf201f0(0x36d)]&&SceneManager['_scene'][_0xf201f0(0x1a1)]===Scene_Equip){if(this[_0xf201f0(0x12e)]()&&TouchInput[_0xf201f0(0xf3)]()){if(_0xf201f0(0x3ae)!==_0xf201f0(0x3ae))for(const _0x5b289c of _0xa36fa2['_data']){if(_0x5b289c)_0x5b289c['prepareNewEquipSlotsOnLoad']();}else this[_0xf201f0(0x45c)](![]);}else TouchInput[_0xf201f0(0x510)]()&&this[_0xf201f0(0x45c)](!![]);if(TouchInput['isClicked']()){if(_0xf201f0(0x309)!==_0xf201f0(0x309))return this['isUseModernControls']()?![]:_0x4b6a93[_0xf201f0(0x405)][_0xf201f0(0x12e)]['call'](this);else this['onTouchOk']();}}},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x45c)]=function(_0x5e0d29){const _0x2f0bd4=_0xc574cd;this['_doubleTouch']=![];const _0x53789=this[_0x2f0bd4(0x351)](),_0x13731d=this[_0x2f0bd4(0x261)](),_0x3dd66b=SceneManager['_scene'][_0x2f0bd4(0x2ef)];if(_0x3dd66b['isOpen']()&&_0x3dd66b[_0x2f0bd4(0x36d)]){if(_0x13731d>=0x0){if(_0x2f0bd4(0x442)==='GJrXm')return _0x2ff12e[_0x2f0bd4(0x3aa)][_0x2f0bd4(0x241)]['ItemScene'][_0x2f0bd4(0x3d0)];else _0x13731d===this[_0x2f0bd4(0x351)]()&&(_0x2f0bd4(0x10f)!==_0x2f0bd4(0x10f)?(_0x90dbb7[_0x2f0bd4(0x3aa)][_0x2f0bd4(0x4d0)]['call'](this,_0x16a409),this[_0x2f0bd4(0x1b4)](_0x144173)):this[_0x2f0bd4(0x3e6)]=!![]),this[_0x2f0bd4(0x412)](),this[_0x2f0bd4(0x32b)](_0x13731d);}else _0x3dd66b[_0x2f0bd4(0x261)]()>=0x0&&(this[_0x2f0bd4(0x542)](),this[_0x2f0bd4(0x1da)]());}_0x5e0d29&&this['index']()!==_0x53789&&this[_0x2f0bd4(0x133)]();},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x1d2)]=function(){const _0x7aa6f9=_0xc574cd;this[_0x7aa6f9(0x418)](),this[_0x7aa6f9(0x37e)](),this[_0x7aa6f9(0x233)]();},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x3b4)]=function(){const _0x50b15a=_0xc574cd;Window_HorzCommand[_0x50b15a(0x405)]['refresh']['call'](this),this[_0x50b15a(0x3ce)]();},Window_EquipCommand['prototype']['addEquipCommand']=function(){const _0xff33d2=_0xc574cd;if(!this[_0xff33d2(0x16b)]())return;const _0x4043a8=this[_0xff33d2(0x29b)](),_0x1a1195=VisuMZ[_0xff33d2(0x3aa)][_0xff33d2(0x241)][_0xff33d2(0x372)][_0xff33d2(0x3e3)],_0x58fe0d=_0x4043a8===_0xff33d2(0x3d9)?TextManager[_0xff33d2(0x1d4)]:_0xff33d2(0x244)[_0xff33d2(0x2f2)](_0x1a1195,TextManager[_0xff33d2(0x1d4)]),_0x2a4c7e=this['isEquipCommandEnabled']();this[_0xff33d2(0x2a1)](_0x58fe0d,_0xff33d2(0x4ec),_0x2a4c7e);},Window_EquipCommand['prototype'][_0xc574cd(0x16b)]=function(){const _0x46024b=_0xc574cd;return!this[_0x46024b(0x374)]();},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x2df)]=function(){return!![];},Window_EquipCommand[_0xc574cd(0x405)]['addOptimizeCommand']=function(){const _0x3a0052=_0xc574cd;if(!this[_0x3a0052(0x4b7)]())return;const _0x5cf0f6=this[_0x3a0052(0x29b)](),_0x3c556d=VisuMZ[_0x3a0052(0x3aa)]['Settings'][_0x3a0052(0x372)][_0x3a0052(0x26b)],_0x4ce8a7=_0x5cf0f6===_0x3a0052(0x3d9)?TextManager[_0x3a0052(0x30d)]:_0x3a0052(0x244)['format'](_0x3c556d,TextManager[_0x3a0052(0x30d)]),_0x292317=this[_0x3a0052(0x4bf)]();this[_0x3a0052(0x2a1)](_0x4ce8a7,_0x3a0052(0x30d),_0x292317);},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x4b7)]=function(){const _0x321c65=_0xc574cd;return VisuMZ[_0x321c65(0x3aa)]['Settings'][_0x321c65(0x372)][_0x321c65(0x444)];},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x4bf)]=function(){return!![];},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x233)]=function(){const _0x58728d=_0xc574cd;if(!this['isClearCommandAdded']())return;const _0x533414=this[_0x58728d(0x29b)](),_0x3344fb=VisuMZ['ItemsEquipsCore'][_0x58728d(0x241)]['EquipScene'][_0x58728d(0x46d)],_0x3933b7=_0x533414===_0x58728d(0x3d9)?TextManager[_0x58728d(0x3cc)]:_0x58728d(0x244)[_0x58728d(0x2f2)](_0x3344fb,TextManager[_0x58728d(0x3cc)]),_0x11dfed=this[_0x58728d(0xb0)]();this[_0x58728d(0x2a1)](_0x3933b7,'clear',_0x11dfed);},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x250)]=function(){const _0x4e1351=_0xc574cd;return VisuMZ[_0x4e1351(0x3aa)][_0x4e1351(0x241)][_0x4e1351(0x372)][_0x4e1351(0x51e)];},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0xb0)]=function(){return!![];},Window_EquipCommand['prototype'][_0xc574cd(0xfe)]=function(){const _0x204f10=_0xc574cd;return VisuMZ[_0x204f10(0x3aa)][_0x204f10(0x241)][_0x204f10(0x372)]['CmdTextAlign'];},Window_EquipCommand[_0xc574cd(0x405)]['drawItem']=function(_0x418b67){const _0x50aef2=_0xc574cd,_0x45e2e5=this['commandStyleCheck'](_0x418b67);if(_0x45e2e5==='iconText')this[_0x50aef2(0x527)](_0x418b67);else _0x45e2e5===_0x50aef2(0x3bb)?this[_0x50aef2(0x255)](_0x418b67):Window_HorzCommand[_0x50aef2(0x405)][_0x50aef2(0x315)][_0x50aef2(0x3e9)](this,_0x418b67);},Window_EquipCommand[_0xc574cd(0x405)]['commandStyle']=function(){const _0xe9e833=_0xc574cd;return VisuMZ[_0xe9e833(0x3aa)][_0xe9e833(0x241)][_0xe9e833(0x372)]['CmdStyle'];},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0xd3)]=function(_0x752470){const _0x273b51=_0xc574cd;if(_0x752470<0x0)return'text';const _0x506c1f=this[_0x273b51(0x29b)]();if(_0x506c1f!==_0x273b51(0x37a)){if('mtFBQ'!==_0x273b51(0x30c))this[_0x273b51(0x417)]=_0x92fe45[_0x273b51(0x185)][_0x273b51(0x427)]();else return _0x506c1f;}else{if(this[_0x273b51(0x13a)]()>0x0){if('RmPTX'==='UXmZJ')this[_0x273b51(0x15e)]();else{const _0x165801=this['commandName'](_0x752470);if(_0x165801['match'](/\\I\[(\d+)\]/i)){const _0x95d279=this['itemLineRect'](_0x752470),_0x132ce7=this[_0x273b51(0x21c)](_0x165801)[_0x273b51(0x4d5)];if(_0x132ce7<=_0x95d279[_0x273b51(0x4d5)]){if(_0x273b51(0x26d)==='MBjJS')return'iconText';else _0xd0724b[_0x273b51(0x405)][_0x273b51(0x147)][_0x273b51(0x3e9)](this);}else return _0x273b51(0x3bb);}}}}return'text';},Window_EquipCommand['prototype'][_0xc574cd(0x527)]=function(_0x408856){const _0x35df62=_0xc574cd,_0x4ecaa8=this[_0x35df62(0x349)](_0x408856),_0x57499f=this[_0x35df62(0x1a9)](_0x408856),_0x61ecfd=this['textSizeEx'](_0x57499f)[_0x35df62(0x4d5)];this[_0x35df62(0x43c)](this['isCommandEnabled'](_0x408856));const _0x3548b8=this[_0x35df62(0xfe)]();if(_0x3548b8===_0x35df62(0xae))_0x35df62(0x49d)!==_0x35df62(0x49d)?this[_0x35df62(0x4a2)](_0x18b606,_0x5a9af0['x'],_0x50e712['y']+0x2):this['drawTextEx'](_0x57499f,_0x4ecaa8['x']+_0x4ecaa8[_0x35df62(0x4d5)]-_0x61ecfd,_0x4ecaa8['y'],_0x61ecfd);else{if(_0x3548b8===_0x35df62(0x1a0)){const _0x1a24bd=_0x4ecaa8['x']+Math['floor']((_0x4ecaa8[_0x35df62(0x4d5)]-_0x61ecfd)/0x2);this[_0x35df62(0xe3)](_0x57499f,_0x1a24bd,_0x4ecaa8['y'],_0x61ecfd);}else this[_0x35df62(0xe3)](_0x57499f,_0x4ecaa8['x'],_0x4ecaa8['y'],_0x61ecfd);}},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x255)]=function(_0x3a8da6){const _0x53c7aa=_0xc574cd;this[_0x53c7aa(0x1a9)](_0x3a8da6)[_0x53c7aa(0x4e0)](/\\I\[(\d+)\]/i);const _0x3165e6=Number(RegExp['$1'])||0x0,_0x169537=this['itemLineRect'](_0x3a8da6),_0x3f79c9=_0x169537['x']+Math[_0x53c7aa(0x397)]((_0x169537[_0x53c7aa(0x4d5)]-ImageManager['iconWidth'])/0x2),_0xd80ce4=_0x169537['y']+(_0x169537[_0x53c7aa(0x3bd)]-ImageManager[_0x53c7aa(0x220)])/0x2;this[_0x53c7aa(0x4a2)](_0x3165e6,_0x3f79c9,_0xd80ce4);},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x3de)]=function(){const _0x471dbc=_0xc574cd,_0xf15d5=SceneManager['_scene'];if(_0xf15d5&&_0xf15d5[_0x471dbc(0xa7)])return _0xf15d5[_0x471dbc(0xa7)]();return null;},Window_EquipCommand[_0xc574cd(0x405)]['updateHelp']=function(){const _0x4a60d3=_0xc574cd;Window_Command[_0x4a60d3(0x405)]['updateHelp'][_0x4a60d3(0x3e9)](this),this[_0x4a60d3(0xac)][_0x4a60d3(0x16e)](this[_0x4a60d3(0x2b3)]());},Window_EquipCommand[_0xc574cd(0x405)][_0xc574cd(0x2b3)]=function(){const _0x332b8=_0xc574cd,_0x2d65a3=this[_0x332b8(0x44a)]();switch(_0x2d65a3){case'equip':return TextManager['ITEMS_EQUIPS_CORE'][_0x332b8(0x502)][_0x332b8(0x4ec)];case'optimize':return TextManager[_0x332b8(0x539)][_0x332b8(0x502)][_0x332b8(0x30d)];case'clear':return TextManager[_0x332b8(0x539)][_0x332b8(0x502)][_0x332b8(0x3cc)];default:return'';}},Window_EquipSlot['prototype'][_0xc574cd(0x374)]=function(){const _0x2f2f35=_0xc574cd;return Imported[_0x2f2f35(0x301)]&&Window_HorzCommand[_0x2f2f35(0x405)]['isUseModernControls'][_0x2f2f35(0x3e9)](this);},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x412)]=function(){const _0x3bc114=_0xc574cd;Window_StatusBase['prototype'][_0x3bc114(0x412)][_0x3bc114(0x3e9)](this),this[_0x3bc114(0x4bc)]();},Window_EquipSlot['prototype'][_0xc574cd(0x441)]=function(){const _0x216f2a=_0xc574cd;Window_StatusBase[_0x216f2a(0x405)][_0x216f2a(0x441)]['call'](this),this[_0x216f2a(0x4ae)]();},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x4ae)]=function(){const _0x551382=_0xc574cd;if(!this[_0x551382(0x526)]())return;if(Input['isTriggered'](_0x551382(0x23e))&&this[_0x551382(0x268)]()){const _0x100079=SceneManager[_0x551382(0x185)][_0x551382(0x1e1)];if(_0x100079){if(this['canShiftRemoveEquipment'](this[_0x551382(0x351)]())){if('LYwxe'===_0x551382(0x3cf)){if(_0x4f2502['ItemsEquipsCore']['Settings'][_0x551382(0x2a6)][_0x551382(0x51c)]===![])return;_0x24a712=_0x25521e['max'](_0x3ac024||0x1,0x1);while(_0x45d421--){_0x516c8b=_0x2ad822||this[_0x551382(0x363)](),this[_0x551382(0x307)]['paintOpacity']=0xa0;const _0x329139=_0x5ed908['getItemsEquipsCoreBackColor1']();this['contentsBack'][_0x551382(0x41d)](_0x1c6c58+0x1,_0x2c4c42+0x1,_0x4e6fef-0x2,_0x40d722-0x2,_0x329139),this[_0x551382(0x307)][_0x551382(0x132)]=0xff;}}else this[_0x551382(0x48e)](),this[_0x551382(0x3d2)]();}else this[_0x551382(0x3c9)]();}}},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0xbd)]=function(_0x2a2a8e){const _0x144673=_0xc574cd,_0x391eb7=SceneManager[_0x144673(0x185)][_0x144673(0x1e1)];if(!_0x391eb7)return;if(!_0x391eb7['isEquipChangeOk'](this[_0x144673(0x351)]()))return![];const _0x2d94e9=_0x391eb7[_0x144673(0x1b7)]()[this[_0x144673(0x351)]()];if(_0x391eb7[_0x144673(0x2d9)]()['includes'](_0x2d94e9)){if('BYYBJ'!==_0x144673(0x357))return![];else _0xf2c4c9=this[_0x144673(0x1e1)][_0x144673(0xa3)](_0x47536e,!![]);}return!![];;},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x48e)]=function(){const _0x4bdadd=_0xc574cd;SoundManager[_0x4bdadd(0x2f1)]();const _0x509e17=SceneManager[_0x4bdadd(0x185)][_0x4bdadd(0x1e1)];_0x509e17[_0x4bdadd(0x4c2)](this[_0x4bdadd(0x351)](),null),this[_0x4bdadd(0x3b4)](),this['_itemWindow'][_0x4bdadd(0x3b4)](),this[_0x4bdadd(0x4bc)]();const _0x746f04=SceneManager[_0x4bdadd(0x185)]['_statusWindow'];if(_0x746f04)_0x746f04[_0x4bdadd(0x3b4)]();},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x526)]=function(){const _0x2c5da4=_0xc574cd;if(!this['active'])return![];if(!VisuMZ[_0x2c5da4(0x3aa)][_0x2c5da4(0x241)][_0x2c5da4(0x372)][_0x2c5da4(0xa8)])return![];return!![];},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x497)]=function(){const _0x178b08=_0xc574cd;!this['processCursorSpecialCheckModernControls']()&&Window_StatusBase['prototype']['processCursorMoveModernControls'][_0x178b08(0x3e9)](this);},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x352)]=function(){const _0x158cf1=_0xc574cd;if(!this[_0x158cf1(0xfa)]())return![];if(SceneManager[_0x158cf1(0x185)][_0x158cf1(0x1a1)]!==Scene_Equip)return![];if(this[_0x158cf1(0x35e)]())return _0x158cf1(0x530)!==_0x158cf1(0x530)?_0x2fe860['ItemsEquipsCore']['Settings'][_0x158cf1(0x2a6)]['LabelSpeed']:(this[_0x158cf1(0x133)](),Input[_0x158cf1(0x3cc)](),SceneManager['_scene'][_0x158cf1(0xe9)](),![]);else{if(Input[_0x158cf1(0x22b)](_0x158cf1(0x423))){const _0x4e81bd=this[_0x158cf1(0x351)]();Input[_0x158cf1(0x33f)](_0x158cf1(0x23e))?this[_0x158cf1(0x517)]():this['cursorDown'](Input[_0x158cf1(0x510)](_0x158cf1(0x423)));if(this['index']()!==_0x4e81bd){if('kKohl'===_0x158cf1(0xeb))this[_0x158cf1(0x133)]();else{const _0x309d61=_0x158cf1(0x3d3);if(this[_0x158cf1(0x381)][_0x309d61])return this[_0x158cf1(0x381)][_0x309d61];let _0x16f191='';return _0x16f191+='%1'['format'](this[_0x158cf1(0x39f)][_0x158cf1(0x140)]),_0x16f191;}}return!![];}else{if(this[_0x158cf1(0x39c)]()&&Input[_0x158cf1(0x510)](_0x158cf1(0x23e)))return!![];}}return![];},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x35e)]=function(){const _0x2ef5b4=_0xc574cd;if(this['index']()!==0x0)return![];const _0x4b47a3=VisuMZ[_0x2ef5b4(0x3aa)][_0x2ef5b4(0x241)]['EquipScene'];if(!_0x4b47a3['CommandAddOptimize']&&!_0x4b47a3[_0x2ef5b4(0x51e)])return![];return Input[_0x2ef5b4(0x510)]('up');},Window_EquipSlot[_0xc574cd(0x405)]['isShiftShortcutKeyForRemove']=function(){const _0x547071=_0xc574cd;return VisuMZ[_0x547071(0x3aa)]['Settings'][_0x547071(0x372)][_0x547071(0xa8)];},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x112)]=function(){const _0x308e7c=_0xc574cd;if(this['isOpen']()&&this[_0x308e7c(0x36d)]&&SceneManager['_scene'][_0x308e7c(0x1a1)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x308e7c(0xf3)]())this[_0x308e7c(0x45c)](![]);else TouchInput[_0x308e7c(0x510)]()&&this[_0x308e7c(0x45c)](!![]);if(TouchInput[_0x308e7c(0x496)]())'dCbCB'!==_0x308e7c(0x1cb)?(_0x4dc99a['ItemsEquipsCore'][_0x308e7c(0x12c)][_0x308e7c(0x3e9)](this),this[_0x308e7c(0x4b4)]()):this['onTouchOk']();else{if(TouchInput[_0x308e7c(0x4f6)]()){if(_0x308e7c(0x4e5)===_0x308e7c(0x4e5))this['onTouchCancel']();else{if(_0x4dbeaf['isProxyItem'](_0x104db3))return;_0x2e9bb3['ItemsEquipsCore'][_0x308e7c(0x27e)]['call'](this,_0x168328);}}}}},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0x45c)]=function(_0x2f39c6){const _0x24ff1b=_0xc574cd;this[_0x24ff1b(0x3e6)]=![];const _0x628e57=this[_0x24ff1b(0x351)](),_0x10b16c=this[_0x24ff1b(0x261)](),_0x40d7c5=SceneManager[_0x24ff1b(0x185)][_0x24ff1b(0x45e)];if(_0x40d7c5[_0x24ff1b(0x16a)]()&&_0x40d7c5['visible']){if(_0x10b16c>=0x0){if(_0x10b16c===this['index']()){if(_0x24ff1b(0xbf)!==_0x24ff1b(0xbf)){_0x35a8a0[_0x24ff1b(0x3aa)]['Window_Selectable_setHelpWindowItem'][_0x24ff1b(0x3e9)](this,_0x73c74a);if(this['isShowNew']())this[_0x24ff1b(0x1e0)](_0xf6e8bc);}else this[_0x24ff1b(0x3e6)]=!![];}this[_0x24ff1b(0x412)](),this[_0x24ff1b(0x32b)](_0x10b16c);}else _0x40d7c5[_0x24ff1b(0x261)]()>=0x0&&(this[_0x24ff1b(0x542)](),this[_0x24ff1b(0x1da)]());}_0x2f39c6&&this[_0x24ff1b(0x351)]()!==_0x628e57&&(_0x24ff1b(0x203)!==_0x24ff1b(0x203)?(_0x2d35cc[_0x24ff1b(0x405)][_0x24ff1b(0x412)]['call'](this),this[_0x24ff1b(0x4bc)]()):this[_0x24ff1b(0x133)]());},Window_EquipSlot[_0xc574cd(0x405)][_0xc574cd(0xbc)]=function(){const _0x361610=_0xc574cd;return this[_0x361610(0x351)]();},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x290)]=Window_EquipItem[_0xc574cd(0x405)][_0xc574cd(0x3a8)],Window_EquipItem[_0xc574cd(0x405)][_0xc574cd(0x3a8)]=function(_0x451039){const _0x52ab1c=_0xc574cd;return _0x451039===null&&this[_0x52ab1c(0x2d9)]()[_0x52ab1c(0x3a8)](this[_0x52ab1c(0x35c)]())?_0x52ab1c(0x177)!==_0x52ab1c(0x11a)?![]:![]:VisuMZ[_0x52ab1c(0x3aa)][_0x52ab1c(0x290)][_0x52ab1c(0x3e9)](this,_0x451039);},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x1b1)]=Window_EquipItem[_0xc574cd(0x405)][_0xc574cd(0x41c)],Window_EquipItem['prototype']['isEnabled']=function(_0x32cf41){const _0x9965e1=_0xc574cd;if(_0x32cf41&&this['_actor']){if(this[_0x9965e1(0x248)](_0x32cf41))return![];if(this[_0x9965e1(0x511)](_0x32cf41))return![];if(this[_0x9965e1(0x2d7)](_0x32cf41))return![];}if(!_0x32cf41){if('HOMcH'!==_0x9965e1(0x3b8))return!this[_0x9965e1(0x2d9)]()[_0x9965e1(0x3a8)](this[_0x9965e1(0x35c)]());else{const _0x3dfaea=this['_categoryNameWindow'];_0x3dfaea[_0x9965e1(0x498)](_0x1b771f,0x0,_0x3ce571['y'],_0x3dfaea[_0x9965e1(0x353)],'center');}}return VisuMZ[_0x9965e1(0x3aa)]['Window_EquipItem_isEnabled'][_0x9965e1(0x3e9)](this,_0x32cf41);},Window_EquipItem[_0xc574cd(0x405)]['itemHasEquipLimit']=function(_0x3de296){const _0x46915b=_0xc574cd,_0x4f551a=_0x3de296['note'];if(_0x4f551a[_0x46915b(0x4e0)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x47e7bc=Number(RegExp['$1'])||0x1;let _0x14123b=0x0;const _0x126314=this[_0x46915b(0x1e1)][_0x46915b(0x2bd)](),_0x123dbd=SceneManager[_0x46915b(0x185)]['_slotWindow'][_0x46915b(0xbc)]();_0x126314[_0x123dbd]=null;for(const _0x21ac50 of _0x126314){if(!_0x21ac50)continue;if(DataManager[_0x46915b(0x487)](_0x3de296)===DataManager[_0x46915b(0x487)](_0x21ac50)){if(_0x46915b(0x24e)!=='sFKYQ'){if(_0x3de296['id']===_0x21ac50['id'])_0x14123b+=0x1;}else this[_0x46915b(0x133)]();}}return _0x14123b>=_0x47e7bc;}else return![];},Window_EquipItem[_0xc574cd(0x405)][_0xc574cd(0x511)]=function(_0x54c18e){const _0x3bea02=_0xc574cd;if(!DataManager[_0x3bea02(0x487)](_0x54c18e))return![];const _0x4d2ca9=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x329bc9=0x0;const _0x22b921=this[_0x3bea02(0x1e1)][_0x3bea02(0x2bd)](),_0xfa54c5=SceneManager[_0x3bea02(0x185)][_0x3bea02(0x2ef)][_0x3bea02(0xbc)]();_0x22b921[_0xfa54c5]=null;for(const _0x4b038b of _0x22b921){if(!_0x4b038b)continue;if(!DataManager[_0x3bea02(0x487)](_0x4b038b))continue;if(_0x54c18e[_0x3bea02(0x4f1)]===_0x4b038b[_0x3bea02(0x4f1)]){_0x329bc9+=0x1;if(_0x54c18e[_0x3bea02(0x2db)][_0x3bea02(0x4e0)](_0x4d2ca9)){const _0x322b1a=Number(RegExp['$1'])||0x1;if(_0x329bc9>=_0x322b1a)return!![];}if(_0x4b038b[_0x3bea02(0x2db)]['match'](_0x4d2ca9)){const _0x538dc6=Number(RegExp['$1'])||0x1;if(_0x329bc9>=_0x538dc6)return!![];}}}return![];},Window_EquipItem['prototype'][_0xc574cd(0x2d7)]=function(_0x27f737){const _0xae7b99=_0xc574cd;if(!DataManager[_0xae7b99(0x467)](_0x27f737))return![];const _0x3656ac=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x4aad89=0x0;const _0x318d59=this[_0xae7b99(0x1e1)][_0xae7b99(0x2bd)](),_0x381fa6=SceneManager[_0xae7b99(0x185)]['_slotWindow'][_0xae7b99(0xbc)]();_0x318d59[_0x381fa6]=null;for(const _0x2ed9fd of _0x318d59){if(_0xae7b99(0x398)!==_0xae7b99(0x20f)){if(!_0x2ed9fd)continue;if(!DataManager[_0xae7b99(0x467)](_0x2ed9fd))continue;if(_0x27f737[_0xae7b99(0x277)]===_0x2ed9fd[_0xae7b99(0x277)]){_0x4aad89+=0x1;if(_0x27f737[_0xae7b99(0x2db)][_0xae7b99(0x4e0)](_0x3656ac)){if(_0xae7b99(0x169)==='ThLHF'){if(_0x2f1097[_0xae7b99(0x4e0)](/(.*):[ ](.*)/i)){const _0x37e24e=_0x37c2ba(_0x7ddc59['$1'])[_0xae7b99(0x3c0)](),_0x454912=_0x5d0a88(_0x47bec3['$2'])[_0xae7b99(0x3c0)]();this[_0xae7b99(0x29a)](_0x37e24e,_0x454912,_0x3f95cc,_0x6ab276,_0x30041e),_0x54d4ce+=this['lineHeight']();}}else{const _0x46b9e7=Number(RegExp['$1'])||0x1;if(_0x4aad89>=_0x46b9e7)return!![];}}if(_0x2ed9fd[_0xae7b99(0x2db)][_0xae7b99(0x4e0)](_0x3656ac)){if('pAhIN'==='JJIqE'){if(!this[_0xae7b99(0xf8)](_0x5b75e6))return![];const _0x1a470b=_0x52a92e[_0xae7b99(0x2db)];if(!_0x1a470b)return![];if(_0x1a470b[_0xae7b99(0x4e0)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x1a470b[_0xae7b99(0x4e0)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];}else{const _0x4b0d6f=Number(RegExp['$1'])||0x1;if(_0x4aad89>=_0x4b0d6f)return!![];}}}}else _0x1f3c55=_0xae7b99(0x3a6)['format'](_0x19fc5a['id']);}return![];},Window_EquipItem[_0xc574cd(0x405)][_0xc574cd(0x2d9)]=function(){const _0x27a8d3=_0xc574cd;return VisuMZ[_0x27a8d3(0x3aa)][_0x27a8d3(0x241)][_0x27a8d3(0x372)][_0x27a8d3(0x4dc)];},Window_EquipItem[_0xc574cd(0x405)]['drawItem']=function(_0x491e30){const _0x6b5971=_0xc574cd,_0x16807b=this[_0x6b5971(0x52e)](_0x491e30);if(_0x16807b)Window_ItemList[_0x6b5971(0x405)][_0x6b5971(0x315)][_0x6b5971(0x3e9)](this,_0x491e30);else{if(_0x6b5971(0xb5)!==_0x6b5971(0x199))this[_0x6b5971(0x1a3)](_0x491e30);else{const _0xa91b35=this[_0x6b5971(0x20b)],_0x254137=_0x100d65[_0x6b5971(0x12f)](),_0x13377e=_0x144c3a['x']+_0x2a36b6['floor'](_0xb1697f[_0x6b5971(0x4d5)]/0x2)+_0x254137;_0xa91b35['x']=_0xa91b35[_0x6b5971(0x4d5)]/-0x2+_0x13377e,_0xa91b35['y']=_0x4396cc[_0x6b5971(0x397)](_0xf8c913[_0x6b5971(0x3bd)]/0x2);}}},Window_EquipItem[_0xc574cd(0x405)][_0xc574cd(0x1a3)]=function(_0x17abba){const _0x47121f=_0xc574cd;this[_0x47121f(0x43c)](this['isEnabled'](null));const _0x49e2e5=VisuMZ[_0x47121f(0x3aa)]['Settings'][_0x47121f(0x372)],_0x1fca42=this[_0x47121f(0x349)](_0x17abba),_0x9f324d=_0x1fca42['y']+(this[_0x47121f(0x363)]()-ImageManager[_0x47121f(0x220)])/0x2,_0x51fef2=ImageManager[_0x47121f(0x273)]+0x4,_0x8cef8c=Math[_0x47121f(0x1ef)](0x0,_0x1fca42[_0x47121f(0x4d5)]-_0x51fef2);this[_0x47121f(0x17b)](),this['drawIcon'](_0x49e2e5['RemoveEquipIcon'],_0x1fca42['x'],_0x9f324d),this[_0x47121f(0x498)](_0x49e2e5[_0x47121f(0x217)],_0x1fca42['x']+_0x51fef2,_0x1fca42['y'],_0x8cef8c),this[_0x47121f(0x43c)](!![]);},Window_EquipItem['prototype'][_0xc574cd(0x3d2)]=function(){const _0x2b6a71=_0xc574cd;Window_ItemList[_0x2b6a71(0x405)][_0x2b6a71(0x3d2)][_0x2b6a71(0x3e9)](this);if(this['_actor']&&this[_0x2b6a71(0x4e4)]&&this['_slotId']>=0x0){if(_0x2b6a71(0x4b9)==='ESpvN'){const _0xa68183=JsonEx[_0x2b6a71(0x346)](this[_0x2b6a71(0x1e1)]);_0xa68183['_tempActor']=!![],_0xa68183['forceChangeEquip'](this['_slotId'],this[_0x2b6a71(0x268)]()),this[_0x2b6a71(0x4e4)]['setTempActor'](_0xa68183);}else this[_0x2b6a71(0x4e4)][_0x2b6a71(0x344)](this[_0x2b6a71(0x268)]());}},VisuMZ[_0xc574cd(0x3aa)]['Window_ShopCommand_initialize']=Window_ShopCommand[_0xc574cd(0x405)]['initialize'],Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x221)]=function(_0x6bcd9b){const _0x405edd=_0xc574cd;VisuMZ[_0x405edd(0x3aa)][_0x405edd(0x274)][_0x405edd(0x3e9)](this,_0x6bcd9b),this[_0x405edd(0x1b4)](_0x6bcd9b);},Window_ShopCommand[_0xc574cd(0x405)]['createCommandNameWindow']=function(_0x190364){const _0x3ef5e1=_0xc574cd,_0x403444=new Rectangle(0x0,0x0,_0x190364[_0x3ef5e1(0x4d5)],_0x190364[_0x3ef5e1(0x3bd)]);this['_commandNameWindow']=new Window_Base(_0x403444),this[_0x3ef5e1(0x20b)][_0x3ef5e1(0x1c0)]=0x0,this[_0x3ef5e1(0x19a)](this[_0x3ef5e1(0x20b)]),this[_0x3ef5e1(0xa1)]();},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x4bc)]=function(){const _0xab10f9=_0xc574cd;Window_HorzCommand[_0xab10f9(0x405)][_0xab10f9(0x4bc)]['call'](this);if(this[_0xab10f9(0x20b)])this[_0xab10f9(0xa1)]();},Window_ShopCommand['prototype'][_0xc574cd(0xa1)]=function(){const _0x39d7be=_0xc574cd,_0x3080a5=this[_0x39d7be(0x20b)];_0x3080a5[_0x39d7be(0x211)][_0x39d7be(0x3cc)]();const _0x253a77=this[_0x39d7be(0xd3)](this[_0x39d7be(0x351)]());if(_0x253a77===_0x39d7be(0x3bb)){if(_0x39d7be(0xff)!==_0x39d7be(0x29e)){const _0x575bd2=this[_0x39d7be(0x349)](this[_0x39d7be(0x351)]());let _0x4160f2=this[_0x39d7be(0x1a9)](this[_0x39d7be(0x351)]());_0x4160f2=_0x4160f2[_0x39d7be(0x2af)](/\\I\[(\d+)\]/gi,''),_0x3080a5[_0x39d7be(0x306)](),this[_0x39d7be(0x116)](_0x4160f2,_0x575bd2),this[_0x39d7be(0x536)](_0x4160f2,_0x575bd2),this[_0x39d7be(0x461)](_0x4160f2,_0x575bd2);}else this[_0x39d7be(0xe3)](_0x3713b6,_0x1976e0['x']+_0x129ad6[_0x39d7be(0x4d5)]-_0x45aee4,_0x46e8f0['y'],_0x3694db);}},Window_ShopCommand[_0xc574cd(0x405)]['commandNameWindowDrawBackground']=function(_0x3d28ff,_0x9ff289){},Window_ShopCommand['prototype'][_0xc574cd(0x536)]=function(_0xe0c2b4,_0x507f12){const _0xdd338=_0xc574cd,_0x422a22=this['_commandNameWindow'];_0x422a22[_0xdd338(0x498)](_0xe0c2b4,0x0,_0x507f12['y'],_0x422a22[_0xdd338(0x353)],'center');},Window_ShopCommand[_0xc574cd(0x405)]['commandNameWindowCenter']=function(_0x2837ff,_0x580a97){const _0x3549e6=_0xc574cd,_0x192aa1=this['_commandNameWindow'],_0x7264bd=$gameSystem[_0x3549e6(0x12f)](),_0x1e2ecf=_0x580a97['x']+Math[_0x3549e6(0x397)](_0x580a97['width']/0x2)+_0x7264bd;_0x192aa1['x']=_0x192aa1['width']/-0x2+_0x1e2ecf,_0x192aa1['y']=Math[_0x3549e6(0x397)](_0x580a97[_0x3549e6(0x3bd)]/0x2);},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x1b9)]=function(){const _0x57df0e=_0xc574cd;return this[_0x57df0e(0x2e8)]?this[_0x57df0e(0x2e8)][_0x57df0e(0x294)]:0x3;},Window_ShopCommand[_0xc574cd(0x405)]['hideDisabledCommands']=function(){const _0x236261=_0xc574cd;return VisuMZ[_0x236261(0x3aa)]['Settings'][_0x236261(0x387)][_0x236261(0x196)];},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x1d2)]=function(){const _0x38641c=_0xc574cd;this[_0x38641c(0x518)](),this[_0x38641c(0x4a9)](),this[_0x38641c(0x1e5)]();},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x3b4)]=function(){const _0x25275e=_0xc574cd;Window_HorzCommand['prototype']['refresh'][_0x25275e(0x3e9)](this),this[_0x25275e(0x3ce)]();},Window_ShopCommand['prototype']['addBuyCommand']=function(){const _0x4305d9=_0xc574cd,_0x9b4c93=this[_0x4305d9(0x29b)](),_0x2a7e62=VisuMZ['ItemsEquipsCore']['Settings'][_0x4305d9(0x387)][_0x4305d9(0x135)],_0x2bf391=_0x9b4c93==='text'?TextManager['buy']:'\x5cI[%1]%2'[_0x4305d9(0x2f2)](_0x2a7e62,TextManager[_0x4305d9(0x3df)]),_0x520e86=this[_0x4305d9(0x1af)]();if(this[_0x4305d9(0x1ee)]()&&!_0x520e86)return;this[_0x4305d9(0x2a1)](_0x2bf391,_0x4305d9(0x3df),_0x520e86);},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x1af)]=function(){const _0x50e7c7=_0xc574cd;if(SceneManager[_0x50e7c7(0x185)][_0x50e7c7(0x1a1)]===Scene_Shop){if(_0x50e7c7(0xf5)===_0x50e7c7(0x3d6)){const _0xc80a6b=_0x2a5f9f[_0x50e7c7(0x3de)](0x1);this[_0x50e7c7(0x4b6)]=_0x538521[_0x50e7c7(0x346)](_0xc80a6b),this[_0x50e7c7(0x1cf)]=_0x981553['makeDeepCopy'](_0xc80a6b);}else return SceneManager['_scene'][_0x50e7c7(0x99)]>0x0;}else return!![];},Window_ShopCommand['prototype'][_0xc574cd(0x4a9)]=function(){const _0x1047a3=_0xc574cd,_0x39df59=this['commandStyle'](),_0x158da9=VisuMZ[_0x1047a3(0x3aa)][_0x1047a3(0x241)][_0x1047a3(0x387)][_0x1047a3(0x125)],_0x22f9ce=_0x39df59===_0x1047a3(0x3d9)?TextManager[_0x1047a3(0x358)]:_0x1047a3(0x244)[_0x1047a3(0x2f2)](_0x158da9,TextManager['sell']),_0x549b92=this['isSellCommandEnabled']();if(this['hideDisabledCommands']()&&!_0x549b92)return;this[_0x1047a3(0x2a1)](_0x22f9ce,'sell',_0x549b92);},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x33a)]=function(){const _0x11099c=_0xc574cd;return!this[_0x11099c(0x420)];},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x1e5)]=function(){const _0x10c730=_0xc574cd,_0x4806a1=this[_0x10c730(0x29b)](),_0x5b85ee=VisuMZ['ItemsEquipsCore'][_0x10c730(0x241)][_0x10c730(0x387)][_0x10c730(0x272)],_0x209ba8=VisuMZ[_0x10c730(0x3aa)]['Settings'][_0x10c730(0x387)][_0x10c730(0x310)],_0x12a21f=_0x4806a1===_0x10c730(0x3d9)?_0x209ba8:'\x5cI[%1]%2'[_0x10c730(0x2f2)](_0x5b85ee,_0x209ba8);this[_0x10c730(0x2a1)](_0x12a21f,_0x10c730(0x1f2));},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0xfe)]=function(){const _0x48530c=_0xc574cd;return VisuMZ[_0x48530c(0x3aa)][_0x48530c(0x241)][_0x48530c(0x387)][_0x48530c(0x3ed)];},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x315)]=function(_0x116a4b){const _0x52774d=_0xc574cd,_0x3316b2=this[_0x52774d(0xd3)](_0x116a4b);if(_0x3316b2==='iconText'){if('shbJW'==='mJULE')return _0xe16cd4;else this[_0x52774d(0x527)](_0x116a4b);}else _0x3316b2==='icon'?this[_0x52774d(0x255)](_0x116a4b):Window_HorzCommand['prototype']['drawItem'][_0x52774d(0x3e9)](this,_0x116a4b);},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x29b)]=function(){const _0x15770d=_0xc574cd;return VisuMZ['ItemsEquipsCore'][_0x15770d(0x241)][_0x15770d(0x387)][_0x15770d(0x159)];},Window_ShopCommand['prototype'][_0xc574cd(0xd3)]=function(_0x5d5119){const _0x44a948=_0xc574cd;if(_0x5d5119<0x0)return'text';const _0x13c075=this[_0x44a948(0x29b)]();if(_0x13c075!==_0x44a948(0x37a)){if(_0x44a948(0x15f)==='UCRez')return _0x13c075;else this[_0x44a948(0x439)][_0x44a948(0x412)]();}else{if(this[_0x44a948(0x13a)]()>0x0){const _0x5a5316=this[_0x44a948(0x1a9)](_0x5d5119);if(_0x5a5316[_0x44a948(0x4e0)](/\\I\[(\d+)\]/i)){const _0x210458=this['itemLineRect'](_0x5d5119),_0x3ce3cb=this[_0x44a948(0x21c)](_0x5a5316)['width'];if(_0x3ce3cb<=_0x210458[_0x44a948(0x4d5)])return _0x44a948(0x1e2);else{if(_0x44a948(0x243)!==_0x44a948(0x243))_0x2ec020[_0x44a948(0x33f)](_0x44a948(0x23e))&&this[_0x44a948(0xb6)]()?this[_0x44a948(0x517)]():this[_0x44a948(0x192)](_0x138534[_0x44a948(0x510)](_0x44a948(0x423)));else return _0x44a948(0x3bb);}}}}return _0x44a948(0x3d9);},Window_ShopCommand[_0xc574cd(0x405)]['drawItemStyleIconText']=function(_0x24cf5f){const _0x1803ec=_0xc574cd,_0x3e8df9=this['itemLineRect'](_0x24cf5f),_0x181844=this[_0x1803ec(0x1a9)](_0x24cf5f),_0x1c5ef4=this[_0x1803ec(0x21c)](_0x181844)[_0x1803ec(0x4d5)];this[_0x1803ec(0x43c)](this[_0x1803ec(0x289)](_0x24cf5f));const _0x5b643a=this[_0x1803ec(0xfe)]();if(_0x5b643a===_0x1803ec(0xae)){if(_0x1803ec(0x10e)!==_0x1803ec(0x10e)){_0xeb8889=_0x32a76f[_0x1803ec(0x1ef)](_0x29f9e7||0x1,0x1);while(_0x2c6c22--){_0x41da93=_0x6a2316||this[_0x1803ec(0x363)](),this['contentsBack'][_0x1803ec(0x132)]=0xa0;const _0x5b9bc5=_0x23d0d7[_0x1803ec(0x30f)]();this['contentsBack'][_0x1803ec(0x41d)](_0x499d99+0x1,_0x1ffd8a+0x1,_0xbbf7d0-0x2,_0x3d1250-0x2,_0x5b9bc5),this[_0x1803ec(0x307)][_0x1803ec(0x132)]=0xff;}}else this['drawTextEx'](_0x181844,_0x3e8df9['x']+_0x3e8df9['width']-_0x1c5ef4,_0x3e8df9['y'],_0x1c5ef4);}else{if(_0x5b643a===_0x1803ec(0x1a0)){const _0x296a95=_0x3e8df9['x']+Math[_0x1803ec(0x397)]((_0x3e8df9[_0x1803ec(0x4d5)]-_0x1c5ef4)/0x2);this[_0x1803ec(0xe3)](_0x181844,_0x296a95,_0x3e8df9['y'],_0x1c5ef4);}else{if(_0x1803ec(0xf1)!==_0x1803ec(0x4fa))this[_0x1803ec(0xe3)](_0x181844,_0x3e8df9['x'],_0x3e8df9['y'],_0x1c5ef4);else{const _0x3405ac=_0x1803ec(0x348);if(this['_customItemInfo'][_0x3405ac])return this['_customItemInfo'][_0x3405ac];let _0x25a5d9='';if(this[_0x1803ec(0x39f)][_0x1803ec(0x4c0)]>0x0)_0x25a5d9+='+%1%'[_0x1803ec(0x2f2)](_0x1b637f[_0x1803ec(0x397)](this['_itemData'][_0x1803ec(0x4c0)]*0x64));if(this[_0x1803ec(0x39f)]['rateMP']>0x0&&this[_0x1803ec(0x39f)][_0x1803ec(0xa2)]>0x0)_0x25a5d9+='\x20';if(this['_itemData']['flatMP']>0x0)_0x25a5d9+=_0x1803ec(0x1b2)[_0x1803ec(0x2f2)](this[_0x1803ec(0x39f)][_0x1803ec(0xa2)]);return _0x25a5d9;}}}},Window_ShopCommand[_0xc574cd(0x405)][_0xc574cd(0x255)]=function(_0x2d453e){const _0x2f8502=_0xc574cd;this[_0x2f8502(0x1a9)](_0x2d453e)[_0x2f8502(0x4e0)](/\\I\[(\d+)\]/i);const _0x3f686e=Number(RegExp['$1'])||0x0,_0x2aad95=this[_0x2f8502(0x349)](_0x2d453e),_0x455129=_0x2aad95['x']+Math[_0x2f8502(0x397)]((_0x2aad95[_0x2f8502(0x4d5)]-ImageManager[_0x2f8502(0x273)])/0x2),_0x3ce6a4=_0x2aad95['y']+(_0x2aad95[_0x2f8502(0x3bd)]-ImageManager[_0x2f8502(0x220)])/0x2;this[_0x2f8502(0x4a2)](_0x3f686e,_0x455129,_0x3ce6a4);},VisuMZ['ItemsEquipsCore'][_0xc574cd(0xbe)]=Window_ShopBuy[_0xc574cd(0x405)][_0xc574cd(0x3b4)],Window_ShopBuy['prototype'][_0xc574cd(0x3b4)]=function(){const _0x54196e=_0xc574cd;this[_0x54196e(0x1dd)](),VisuMZ[_0x54196e(0x3aa)]['Window_ShopBuy_refresh'][_0x54196e(0x3e9)](this);},Window_ShopBuy['prototype'][_0xc574cd(0x1dd)]=function(){const _0x585fcf=_0xc574cd;SceneManager[_0x585fcf(0x185)]['constructor']===Scene_Shop&&(this[_0x585fcf(0x417)]=SceneManager[_0x585fcf(0x185)]['money']());},VisuMZ[_0xc574cd(0x3aa)][_0xc574cd(0x477)]=Window_ShopBuy['prototype'][_0xc574cd(0x343)],Window_ShopBuy['prototype'][_0xc574cd(0x343)]=function(_0xa0258){const _0x14e633=_0xc574cd;if(!_0xa0258)return 0x0;let _0x5c037a=VisuMZ['ItemsEquipsCore']['Window_ShopBuy_price'][_0x14e633(0x3e9)](this,_0xa0258);return Math[_0x14e633(0x1ef)](0x0,this[_0x14e633(0x2de)](_0xa0258,_0x5c037a));},Window_ShopBuy[_0xc574cd(0x405)][_0xc574cd(0x2de)]=function(_0x393896,_0x28f7d9){const _0x392c81=_0xc574cd,_0x40c749=_0x393896[_0x392c81(0x2db)];if(_0x40c749['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){if('XMDUl'==='XMDUl'){const _0x5cb515=String(RegExp['$1']);try{eval(_0x5cb515);}catch(_0x1e1803){if($gameTemp[_0x392c81(0x3a3)]())console[_0x392c81(0x3ef)](_0x1e1803);}}else return 0x0;}_0x28f7d9=VisuMZ[_0x392c81(0x3aa)][_0x392c81(0x241)][_0x392c81(0x387)][_0x392c81(0x462)][_0x392c81(0x3e9)](this,_0x393896,_0x28f7d9);if(isNaN(_0x28f7d9))_0x28f7d9=0x0;return Math[_0x392c81(0x397)](_0x28f7d9);},Window_ShopBuy[_0xc574cd(0x405)][_0xc574cd(0x315)]=function(_0x31e1b5){const _0x434deb=_0xc574cd;this[_0x434deb(0x306)]();const _0x2d040d=this[_0x434deb(0x52e)](_0x31e1b5),_0x249206=this[_0x434deb(0x349)](_0x31e1b5),_0x406af3=_0x249206[_0x434deb(0x4d5)];this[_0x434deb(0x43c)](this[_0x434deb(0x41c)](_0x2d040d)),this[_0x434deb(0x155)](_0x2d040d,_0x249206['x'],_0x249206['y'],_0x406af3),this['drawItemCost'](_0x2d040d,_0x249206),this[_0x434deb(0x43c)](!![]);},Window_ShopBuy['prototype']['drawItemCost']=function(_0xd460c9,_0x4b615b){const _0xe4e181=_0xc574cd,_0x536cea=this[_0xe4e181(0x343)](_0xd460c9);this[_0xe4e181(0x486)](_0x536cea,TextManager[_0xe4e181(0x33e)],_0x4b615b['x'],_0x4b615b['y'],_0x4b615b['width']);},Window_ShopSell[_0xc574cd(0x405)][_0xc574cd(0x1b9)]=function(){const _0x2f4845=_0xc574cd;return SceneManager[_0x2f4845(0x185)][_0x2f4845(0x39d)]()?0x1:0x2;},VisuMZ[_0xc574cd(0x3aa)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0xc574cd(0x405)][_0xc574cd(0x41c)],Window_ShopSell[_0xc574cd(0x405)][_0xc574cd(0x41c)]=function(_0x29bdcd){const _0x2f8218=_0xc574cd;if(!_0x29bdcd)return![];const _0x277a45=_0x29bdcd['note'];if(_0x277a45['match'](/<CANNOT SELL>/i))return![];if(_0x277a45[_0x2f8218(0x4e0)](/<CAN SELL>/i))return!![];if(_0x277a45[_0x2f8218(0x4e0)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x21c244=JSON[_0x2f8218(0x2cf)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x33bcf6 of _0x21c244){if(!$gameSwitches[_0x2f8218(0x118)](_0x33bcf6))return![];}}if(_0x277a45[_0x2f8218(0x4e0)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2f8218(0x1bf)===_0x2f8218(0x1bf)){const _0x1b5bda=JSON[_0x2f8218(0x2cf)]('['+RegExp['$1'][_0x2f8218(0x4e0)](/\d+/g)+']');for(const _0x47a6f5 of _0x1b5bda){if(!$gameSwitches['value'](_0x47a6f5))return![];}}else this[_0x2f8218(0x166)]();}if(_0x277a45[_0x2f8218(0x4e0)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d1293=JSON[_0x2f8218(0x2cf)]('['+RegExp['$1'][_0x2f8218(0x4e0)](/\d+/g)+']');for(const _0x4c64b4 of _0x5d1293){if($gameSwitches['value'](_0x4c64b4))return![];}}return VisuMZ[_0x2f8218(0x3aa)][_0x2f8218(0x31f)][_0x2f8218(0x3e9)](this,_0x29bdcd);},Window_ShopStatus['prototype']['isPageChangeRequested']=function(){return![];},Window_ShopStatus[_0xc574cd(0x405)]['loadFaceImages']=function(){const _0x593710=_0xc574cd;Window_StatusBase['prototype']['loadFaceImages'][_0x593710(0x3e9)](this);for(const _0x3e5051 of $gameParty[_0x593710(0xe8)]()){ImageManager[_0x593710(0x1a7)](_0x3e5051['characterName']());}},Window_ShopStatus['prototype'][_0xc574cd(0x367)]=function(){const _0x12569d=_0xc574cd;return VisuMZ[_0x12569d(0x3aa)][_0x12569d(0x241)][_0x12569d(0x2a6)][_0x12569d(0x305)];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x3b4)]=function(){const _0x5d146f=_0xc574cd;this[_0x5d146f(0x211)][_0x5d146f(0x3cc)](),this[_0x5d146f(0x307)][_0x5d146f(0x3cc)]();if(this[_0x5d146f(0xb8)]){if(_0x5d146f(0x52d)===_0x5d146f(0x52d)){this['resetFontSettings'](),this['changePaintOpacity'](!![]),this[_0x5d146f(0x47d)]();if(this[_0x5d146f(0x326)]()){if(_0x5d146f(0x2dc)===_0x5d146f(0x2dc))this[_0x5d146f(0x256)]();else return this[_0x5d146f(0x39d)]()?this[_0x5d146f(0x12a)]():_0x132b82[_0x5d146f(0x3aa)]['Settings'][_0x5d146f(0x372)][_0x5d146f(0x515)];}else this['drawItemData']();this[_0x5d146f(0x29f)]();}else _0x378198=this[_0x5d146f(0x1e1)][_0x5d146f(0xa3)](_0x275c97,![]),_0x32074c=this['_tempActor'][_0x5d146f(0xa3)](_0x47babf,![]),_0x52a296=_0x536f7c(this[_0x5d146f(0x1e1)]['paramValueByName'](_0x11609d,!![]))['match'](/([%％])/i);}},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x3ba)]=function(_0x480a64,_0x4e2c46){const _0x804360=_0xc574cd;if(!this[_0x804360(0x326)]()&&!DataManager[_0x804360(0x165)](this[_0x804360(0xb8)]))return;const _0x8d0b44=this[_0x804360(0x353)]-this[_0x804360(0x404)]()-_0x480a64,_0x362d21=this[_0x804360(0x44b)](_0x804360(0xd4));this[_0x804360(0x163)](ColorManager['systemColor']()),this[_0x804360(0x498)](TextManager[_0x804360(0x380)],_0x480a64+this[_0x804360(0x404)](),_0x4e2c46,_0x8d0b44-_0x362d21),this[_0x804360(0x17b)](),this[_0x804360(0x35a)](this[_0x804360(0xb8)],_0x480a64,_0x4e2c46,_0x8d0b44);},Window_ShopStatus[_0xc574cd(0x405)]['drawItemDarkRect']=function(_0x1e7ea9,_0x4dfa5d,_0x42c6df,_0x104e27,_0x4d1039){const _0x25fdbd=_0xc574cd;if(VisuMZ[_0x25fdbd(0x3aa)][_0x25fdbd(0x241)][_0x25fdbd(0x2a6)]['DrawBackRect']===![])return;_0x4d1039=Math['max'](_0x4d1039||0x1,0x1);while(_0x4d1039--){if('wWRwx'!==_0x25fdbd(0x3a0)){if(_0x55886a&&this[_0x25fdbd(0x1e1)]){if(this[_0x25fdbd(0x248)](_0x490075))return![];if(this[_0x25fdbd(0x511)](_0x3d6b00))return![];if(this['isSoleArmorType'](_0x3e764a))return![];}if(!_0x5b8be7)return!this['nonRemovableEtypes']()[_0x25fdbd(0x3a8)](this[_0x25fdbd(0x35c)]());return _0x288225[_0x25fdbd(0x3aa)]['Window_EquipItem_isEnabled'][_0x25fdbd(0x3e9)](this,_0x358d50);}else{_0x104e27=_0x104e27||this[_0x25fdbd(0x363)](),this[_0x25fdbd(0x307)][_0x25fdbd(0x132)]=0xa0;const _0x4876ba=ColorManager[_0x25fdbd(0x33b)]();this[_0x25fdbd(0x307)]['fillRect'](_0x1e7ea9+0x1,_0x4dfa5d+0x1,_0x42c6df-0x2,_0x104e27-0x2,_0x4876ba),this[_0x25fdbd(0x307)]['paintOpacity']=0xff;}}},ColorManager[_0xc574cd(0x33b)]=function(){const _0x257cae=_0xc574cd,_0x1d5080=VisuMZ['ItemsEquipsCore'][_0x257cae(0x241)][_0x257cae(0x2a6)];let _0x371eba=_0x1d5080['BackRectColor']!==undefined?_0x1d5080[_0x257cae(0x51d)]:0x13;return ColorManager[_0x257cae(0x302)](_0x371eba);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x256)]=function(){const _0x5efb5f=_0xc574cd;if(VisuMZ['ItemsEquipsCore'][_0x5efb5f(0x241)][_0x5efb5f(0x2a6)][_0x5efb5f(0x4d7)]){if(_0x5efb5f(0x86)===_0x5efb5f(0x47b)){const _0x337479=this[_0x5efb5f(0x343)](_0x4da0df);this[_0x5efb5f(0x486)](_0x337479,_0x3fcdd3[_0x5efb5f(0x33e)],_0xeeb03e['x'],_0x29acdf['y'],_0x4d47e8[_0x5efb5f(0x4d5)]);}else{VisuMZ[_0x5efb5f(0x3aa)][_0x5efb5f(0x241)][_0x5efb5f(0x2a6)][_0x5efb5f(0x4d7)][_0x5efb5f(0x3e9)](this);return;}}const _0x1bfa6f=this['lineHeight'](),_0x3a1ed9=this[_0x5efb5f(0xda)]()+0x8;let _0x3b552b=0x0,_0x541cd7=0x0,_0x5237b5=this[_0x5efb5f(0x353)],_0x37b703=this[_0x5efb5f(0x366)],_0x5199d5=Math[_0x5efb5f(0x397)](_0x5237b5/0x2),_0x203911=_0x3b552b+_0x5237b5-_0x5199d5;this[_0x5efb5f(0x155)](this[_0x5efb5f(0xb8)],_0x3b552b+this['itemPadding'](),_0x541cd7,_0x5237b5-this[_0x5efb5f(0x404)]()*0x2),this[_0x5efb5f(0x1d3)](_0x3b552b,_0x541cd7,_0x5237b5),_0x541cd7+=_0x1bfa6f;if(this[_0x5efb5f(0x40b)](_0x3b552b,_0x541cd7,_0x5199d5))_0x541cd7+=0x0;if(this['drawItemQuantity'](_0x203911,_0x541cd7,_0x5199d5))_0x541cd7+=_0x1bfa6f;const _0x26a381=this['actorParams'](),_0x4acdea=_0x541cd7;_0x541cd7=_0x37b703-_0x26a381[_0x5efb5f(0x294)]*_0x3a1ed9-0x4;let _0x5a9512=_0x3b552b,_0x4238ee=0x0,_0x264940=_0x541cd7;for(const _0x38f612 of _0x26a381){_0x4238ee=Math[_0x5efb5f(0x1ef)](this[_0x5efb5f(0x18d)](_0x38f612,_0x3b552b+0x4,_0x541cd7+0x4,_0x5237b5),_0x4238ee),_0x541cd7+=_0x3a1ed9;}const _0x5c3e3d=$gameParty['maxBattleMembers'](),_0x24ee07=Math[_0x5efb5f(0x397)]((_0x5237b5-_0x4238ee)/_0x5c3e3d);_0x4238ee=_0x5237b5-_0x24ee07*_0x5c3e3d;for(const _0x1e9132 of $gameParty[_0x5efb5f(0x128)]()){if(_0x5efb5f(0x21d)===_0x5efb5f(0x521))return _0x528e69[_0x5efb5f(0x3a3)]()&&(_0xb469b[_0x5efb5f(0x3ef)](_0x5efb5f(0x35b)[_0x5efb5f(0x2f2)](this[_0x5efb5f(0xb8)]['name'])),_0x5af9bb[_0x5efb5f(0x3ef)](_0x5d0a68)),this['revertGlobalNamespaceVariables'](),_0x5efb5f(0x38f);else{const _0x4f9831=$gameParty['battleMembers']()[_0x5efb5f(0x1ad)](_0x1e9132),_0x56c702=_0x5a9512+_0x4238ee+_0x4f9831*_0x24ee07;this[_0x5efb5f(0x43c)](_0x1e9132[_0x5efb5f(0x3ff)](this[_0x5efb5f(0xb8)])),this['drawActorCharacter'](_0x1e9132,_0x56c702+_0x24ee07/0x2,_0x264940);let _0x5ae18f=_0x264940;for(const _0x122cd1 of _0x26a381){if(_0x5efb5f(0x270)===_0x5efb5f(0x2d0)){const _0xda46e9=_0x5a80ef(_0x48cea3['$1'])[_0x5efb5f(0x3d7)](/[\r\n]+/);for(const _0x54f41d of _0xda46e9){if(_0x54f41d['match'](/(.*):[ ](.*)/i)){const _0x1e62b5=_0x9114c3(_0x3407fc['$1'])[_0x5efb5f(0x23c)]()['trim'](),_0x490730=_0x1ac4aa(_0x53ca57['$2'])[_0x5efb5f(0x3c0)]();this[_0x5efb5f(0x381)][_0x1e62b5]=_0x490730;}}}else{const _0x1f5e65=_0x5ae18f-(_0x1bfa6f-_0x3a1ed9)/0x2;this['drawActorParamDifference'](_0x1e9132,_0x122cd1,_0x56c702,_0x1f5e65,_0x24ee07),_0x5ae18f+=_0x3a1ed9;}}}}this[_0x5efb5f(0x1d3)](_0x5a9512,_0x4acdea,_0x4238ee,_0x264940-_0x4acdea);for(let _0x347749=0x0;_0x347749<_0x5c3e3d;_0x347749++){const _0x2bf2ff=_0x5a9512+_0x4238ee+_0x347749*_0x24ee07;this[_0x5efb5f(0x1d3)](_0x2bf2ff,_0x4acdea,_0x24ee07,_0x264940-_0x4acdea);}for(const _0x38e39e of _0x26a381){if(_0x5efb5f(0x1c4)===_0x5efb5f(0x1c4)){this[_0x5efb5f(0x1d3)](_0x5a9512,_0x264940,_0x4238ee,_0x3a1ed9);for(let _0x16ec58=0x0;_0x16ec58<_0x5c3e3d;_0x16ec58++){const _0x4658ed=_0x5a9512+_0x4238ee+_0x16ec58*_0x24ee07;this[_0x5efb5f(0x1d3)](_0x4658ed,_0x264940,_0x24ee07,_0x3a1ed9);}_0x264940+=_0x3a1ed9;}else return!![];}},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x40b)]=function(_0x52ccfb,_0xb7c43,_0x3a5191){const _0x55fb99=_0xc574cd;if(!this['isEquipItem']())return![];const _0x5390ba=$dataSystem['equipTypes'][this[_0x55fb99(0xb8)][_0x55fb99(0x35c)]];return this[_0x55fb99(0x337)](_0x5390ba,_0x52ccfb,_0xb7c43,_0x3a5191,!![]),this[_0x55fb99(0x1d3)](_0x52ccfb,_0xb7c43,_0x3a5191),this['resetFontSettings'](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x249)]=function(){const _0x278299=_0xc574cd,_0x318821=VisuMZ[_0x278299(0x3aa)]['Settings'][_0x278299(0x45b)][_0x278299(0x1e6)];return _0x318821[_0x278299(0x2f2)]($gameParty['numItems'](this['_item']));},Window_ShopStatus[_0xc574cd(0x405)]['actorParams']=function(){const _0x1e6bb2=_0xc574cd;let _0x18f4c7=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return Imported[_0x1e6bb2(0x301)]&&(_0x18f4c7=VisuMZ[_0x1e6bb2(0x2d1)][_0x1e6bb2(0x241)][_0x1e6bb2(0x44e)][_0x1e6bb2(0x175)]),_0x18f4c7=_0x18f4c7[_0x1e6bb2(0x2ed)](_0x8f13f5=>typeof _0x8f13f5===_0x1e6bb2(0x53c)?_0x8f13f5:_0x8f13f5[_0x1e6bb2(0x23c)]()['trim']()),_0x18f4c7;},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x375)]=function(){const _0x346031=_0xc574cd;return VisuMZ[_0x346031(0x3aa)][_0x346031(0x241)]['StatusWindow'][_0x346031(0x51f)];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x18d)]=function(_0x4d190a,_0x4d4d30,_0x4e4056,_0x1fc1fb){const _0x528f14=_0xc574cd;this[_0x528f14(0x306)](),this[_0x528f14(0x211)]['fontSize']=this[_0x528f14(0x375)]();let _0xeb5cf0=this[_0x528f14(0x44b)](TextManager[_0x528f14(0x2ae)](_0x4d190a))+0x4+_0x4d4d30;return Imported[_0x528f14(0x301)]?(this[_0x528f14(0x3e8)](_0x4d4d30,_0x4e4056,_0x1fc1fb,_0x4d190a,!![]),VisuMZ['CoreEngine']['Settings']['Param'][_0x528f14(0x2eb)]&&(_0xeb5cf0+=ImageManager['iconWidth']+0x4)):(this[_0x528f14(0x163)](ColorManager[_0x528f14(0x482)]()),this[_0x528f14(0x498)](TextManager[_0x528f14(0x2ae)](_0x4d190a),_0x4d4d30,_0x4e4056,_0x1fc1fb)),this[_0x528f14(0x306)](),_0xeb5cf0;},Window_ShopStatus['prototype'][_0xc574cd(0x506)]=function(_0x22fcc6,_0x40ba05,_0x84189d,_0x596cee,_0x57da2d){const _0x410e04=_0xc574cd;_0x84189d+=this[_0x410e04(0x404)](),_0x57da2d-=this['itemPadding']()*0x2;const _0x2f589f=VisuMZ[_0x410e04(0x3aa)][_0x410e04(0x241)][_0x410e04(0x2a6)];this['contents'][_0x410e04(0x32a)]=_0x2f589f['ParamChangeFontSize'],this[_0x410e04(0x43c)](_0x22fcc6['canEquip'](this['_item']));if(_0x22fcc6[_0x410e04(0x245)](this[_0x410e04(0xb8)])&&!_0x22fcc6[_0x410e04(0xc7)](this['_item'])){const _0x3c524d=_0x2f589f[_0x410e04(0x25c)];this[_0x410e04(0x498)](_0x3c524d,_0x84189d,_0x596cee,_0x57da2d,_0x410e04(0x1a0));}else{if(_0x22fcc6[_0x410e04(0x3ff)](this[_0x410e04(0xb8)])){const _0x335193=JsonEx['makeDeepCopy'](_0x22fcc6);_0x335193[_0x410e04(0x314)]=!![];const _0x17d4b4=_0x335193[_0x410e04(0x446)](this[_0x410e04(0xb8)]);_0x17d4b4>=0x0&&_0x335193[_0x410e04(0x2ca)](_0x17d4b4,this['_item']);let _0x37b71c=0x0,_0x1d604e=0x0,_0x17a65f=0x0;if(Imported[_0x410e04(0x301)])_0x37b71c=_0x335193[_0x410e04(0xa3)](_0x40ba05),_0x1d604e=_0x37b71c-_0x22fcc6['paramValueByName'](_0x40ba05),this['changeTextColor'](ColorManager[_0x410e04(0xaa)](_0x1d604e)),_0x17a65f=(_0x1d604e>=0x0?'+':'')+VisuMZ[_0x410e04(0x2a7)](_0x1d604e,0x0,_0x40ba05);else{if(_0x410e04(0x184)!==_0x410e04(0x523))_0x37b71c=_0x335193['param'](_0x40ba05),_0x1d604e=_0x37b71c-_0x22fcc6[_0x410e04(0x2ae)](_0x40ba05),this[_0x410e04(0x163)](ColorManager['paramchangeTextColor'](_0x1d604e)),_0x17a65f=(_0x1d604e>=0x0?'+':'')+_0x1d604e;else{const _0x452936=_0x2033ab[_0x410e04(0x2cf)]('['+_0x3b6e9b['$1'][_0x410e04(0x4e0)](/\d+/g)+']');for(const _0x5ea9bf of _0x452936){if(!_0x2cd296[_0x410e04(0x118)](_0x5ea9bf))return!![];}return![];}}_0x17a65f==='+0'&&(_0x17a65f=_0x2f589f[_0x410e04(0x528)]),this['drawText'](_0x17a65f,_0x84189d,_0x596cee,_0x57da2d,'center');}else{const _0x4b8108=_0x2f589f[_0x410e04(0x2d8)];this[_0x410e04(0x498)](_0x4b8108,_0x84189d,_0x596cee,_0x57da2d,'center');}}this[_0x410e04(0x306)](),this[_0x410e04(0x43c)](!![]);},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0xc7)]=function(_0x37e8da){const _0x590883=_0xc574cd;if(!_0x37e8da)return![];const _0x309ee3=_0x37e8da[_0x590883(0x35c)],_0x4d22b6=this['equipSlots']();for(let _0x4ec610=0x0;_0x4ec610<_0x4d22b6[_0x590883(0x294)];_0x4ec610++){if('gAfUQ'==='gAfUQ'){const _0xa218b4=_0x4d22b6[_0x4ec610];if(_0xa218b4!==_0x309ee3)continue;if(!this['equips']()[_0x4ec610])return!![];}else _0x56d412=_0xc84d71[_0x590883(0x1eb)][_0x296190(_0x125e08['$1'])]||'';}return![];},Game_Actor[_0xc574cd(0x405)][_0xc574cd(0x446)]=function(_0x4063c9){const _0xa0cdac=_0xc574cd;if(!_0x4063c9)return-0x1;const _0x505559=_0x4063c9[_0xa0cdac(0x35c)],_0x5c1321=this[_0xa0cdac(0x1b7)]();let _0x586c3c=-0x1;for(let _0x367d4b=0x0;_0x367d4b<_0x5c1321[_0xa0cdac(0x294)];_0x367d4b++){if(_0xa0cdac(0x284)===_0xa0cdac(0x284)){const _0x59d6b7=_0x5c1321[_0x367d4b];if(_0x59d6b7!==_0x505559)continue;if(!this[_0xa0cdac(0x2bd)]()[_0x367d4b])return _0x367d4b;if(_0x586c3c<0x0)_0x586c3c=_0x367d4b;}else return _0x4be015[_0xa0cdac(0x3aa)][_0xa0cdac(0x241)][_0xa0cdac(0x45b)]['buttonAssistCategory'];}return _0x586c3c;},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x3c5)]=function(){const _0x7119c3=_0xc574cd;VisuMZ[_0x7119c3(0x3aa)][_0x7119c3(0x241)][_0x7119c3(0x2a6)]['DrawItemData']['call'](this);},Window_ShopStatus[_0xc574cd(0x405)]['drawItemName']=function(_0x4c8f36,_0x474df7,_0x280aca,_0x1c6f43){const _0x3b1103=_0xc574cd,_0x11211f=DataManager[_0x3b1103(0x41b)](_0x4c8f36,_0x474df7,_0x280aca,_0x1c6f43)&&Imported['VisuMZ_1_SkillsStatesCore'],_0x13b879=_0x4c8f36?_0x4c8f36['name']:'';if(_0x11211f)Window_SkillList[_0x3b1103(0x405)][_0x3b1103(0x191)]['call'](this,_0x4c8f36);Window_Base['prototype']['drawItemName'][_0x3b1103(0x3e9)](this,_0x4c8f36,_0x474df7,_0x280aca,_0x1c6f43);if(_0x11211f)_0x4c8f36[_0x3b1103(0xf9)]=_0x13b879;},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x47d)]=function(){const _0x2c412c=_0xc574cd;this['_customItemInfo']={};if(!this['_item'])return;const _0x3f3a54=this['_item']['note'];if(_0x3f3a54[_0x2c412c(0x4e0)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x28922a=String(RegExp['$1'])[_0x2c412c(0x3d7)](/[\r\n]+/);for(const _0x105ee8 of _0x28922a){if(_0x105ee8['match'](/(.*):[ ](.*)/i)){if(_0x2c412c(0x3f3)===_0x2c412c(0x1ac)){_0x5990cb+=_0x2c412c(0x41e)['format'](_0x2443a0),_0x18672c++;if(_0x185a33>=_0x21e029)return _0x54029b;}else{const _0x85f4a9=String(RegExp['$1'])['toUpperCase']()[_0x2c412c(0x3c0)](),_0x510534=String(RegExp['$2'])[_0x2c412c(0x3c0)]();this[_0x2c412c(0x381)][_0x85f4a9]=_0x510534;}}}}},Window_ShopStatus['prototype'][_0xc574cd(0x419)]=function(){const _0x197568=_0xc574cd;return Math[_0x197568(0x1ef)](0x1,$gameSystem[_0x197568(0x46c)]()-0x4);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x306)]=function(){const _0x22534a=_0xc574cd;Window_StatusBase[_0x22534a(0x405)][_0x22534a(0x306)][_0x22534a(0x3e9)](this),this[_0x22534a(0x211)][_0x22534a(0x32a)]=this[_0x22534a(0x336)]||this[_0x22534a(0x211)]['fontSize'],this['contents'][_0x22534a(0x36e)]=this[_0x22534a(0xa9)]||this[_0x22534a(0x211)]['textColor'];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x160)]=function(){const _0x5b4fa8=_0xc574cd;return this[_0x5b4fa8(0x211)]['fontSize']/$gameSystem[_0x5b4fa8(0x46c)]();},Window_ShopStatus['prototype'][_0xc574cd(0x4a2)]=function(_0x1df0a5,_0x121ddd,_0x114fa2){const _0x3ddea6=_0xc574cd,_0x50cb19=ImageManager[_0x3ddea6(0x341)](_0x3ddea6(0x451)),_0x2c5061=ImageManager[_0x3ddea6(0x273)],_0x27ccdf=ImageManager[_0x3ddea6(0x220)],_0xc34760=_0x1df0a5%0x10*_0x2c5061,_0xe40104=Math[_0x3ddea6(0x397)](_0x1df0a5/0x10)*_0x27ccdf,_0x3bead2=Math['ceil'](_0x2c5061*this['fontSizeRatio']()),_0x143fb3=Math['ceil'](_0x27ccdf*this[_0x3ddea6(0x160)]());this[_0x3ddea6(0x211)][_0x3ddea6(0x456)](_0x50cb19,_0xc34760,_0xe40104,_0x2c5061,_0x27ccdf,_0x121ddd,_0x114fa2,_0x3bead2,_0x143fb3);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x2b2)]=function(_0x3a9c50,_0x96ccf4){const _0x249393=_0xc574cd;if(_0x96ccf4['drawing']){if(_0x249393(0x450)===_0x249393(0x339)){const _0x5962b2=_0x249393(0x88);if(this['_itemData'][_0x249393(0x4c0)]>=0x0&&this[_0x249393(0x39f)]['flatMP']>=0x0&&!this[_0x249393(0x381)][_0x5962b2])return![];const _0x4aa096=this[_0x249393(0x27a)]();this[_0x249393(0x337)](_0x4aa096,_0x51ad2e,_0x410480,_0x57c5b7,!![]);const _0x2f2f07=this['getItemEffectsMpDamageText']();return this[_0x249393(0x163)](_0x41287f[_0x249393(0x50c)](0x2)),this[_0x249393(0x337)](_0x2f2f07,_0x57bbf3,_0x1c9602,_0x5205ff,![],'right'),this[_0x249393(0x1d3)](_0x1cc13e,_0x493fcb,_0x4863e2),this[_0x249393(0x306)](),!![];}else this['drawIcon'](_0x3a9c50,_0x96ccf4['x'],_0x96ccf4['y']+0x2);}_0x96ccf4['x']+=Math[_0x249393(0x4aa)](ImageManager[_0x249393(0x273)]*this['fontSizeRatio']());if(this['fontSizeRatio']()===0x1)_0x96ccf4['x']+=0x4;},Window_ShopStatus[_0xc574cd(0x405)]['drawItemKeyData']=function(_0x2ae7b5,_0x4b2fd1,_0x137cf6,_0x3baae4,_0x13a8cd,_0x4903d7){const _0x156a63=_0xc574cd;_0x2ae7b5=_0x2ae7b5||'',_0x4903d7=_0x4903d7||_0x156a63(0x414),this[_0x156a63(0x336)]=this[_0x156a63(0x419)](),this[_0x156a63(0xa9)]=_0x13a8cd?ColorManager[_0x156a63(0x482)]():this[_0x156a63(0x211)][_0x156a63(0x36e)],_0x4b2fd1+=this[_0x156a63(0x404)](),_0x3baae4-=this[_0x156a63(0x404)]()*0x2;const _0x436582=this[_0x156a63(0x21c)](_0x2ae7b5);if(_0x4903d7===_0x156a63(0x1a0))_0x4b2fd1=_0x4b2fd1+Math[_0x156a63(0x397)]((_0x3baae4-_0x436582[_0x156a63(0x4d5)])/0x2);else _0x4903d7===_0x156a63(0xae)&&(_0x156a63(0x407)===_0x156a63(0x385)?_0x1d73bb[_0x156a63(0x19b)](_0x2ac3eb['SwitchBuy'],![]):_0x4b2fd1=_0x4b2fd1+_0x3baae4-_0x436582[_0x156a63(0x4d5)]);_0x137cf6+=(this[_0x156a63(0x363)]()-_0x436582[_0x156a63(0x3bd)])/0x2,this[_0x156a63(0xe3)](_0x2ae7b5,_0x4b2fd1,_0x137cf6,_0x3baae4),this[_0x156a63(0x336)]=undefined,this[_0x156a63(0xa9)]=undefined,this[_0x156a63(0x306)]();},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x4e7)]=function(_0x728670,_0x43a1e2,_0x203c3e){const _0x10d97b=_0xc574cd;if(!DataManager[_0x10d97b(0x165)](this['_item']))return![];const _0x357de2=this[_0x10d97b(0x4f0)]();this[_0x10d97b(0x337)](_0x357de2,_0x728670,_0x43a1e2,_0x203c3e,!![]);const _0x63714=this[_0x10d97b(0x106)]();return this[_0x10d97b(0x337)](_0x63714,_0x728670,_0x43a1e2,_0x203c3e,![],_0x10d97b(0xae)),this[_0x10d97b(0x1d3)](_0x728670,_0x43a1e2,_0x203c3e),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0xc574cd(0x4f0)]=function(){const _0x4def61=_0xc574cd;return VisuMZ['ItemsEquipsCore'][_0x4def61(0x241)]['StatusWindow'][_0x4def61(0x1de)];},Window_ShopStatus[_0xc574cd(0x405)]['getItemConsumableText']=function(){const _0x50eb10=_0xc574cd,_0x4d9763=_0x50eb10(0x238);if(this[_0x50eb10(0x381)][_0x4d9763])return this['_customItemInfo'][_0x4d9763];return this['canConsumeItem']()?VisuMZ['ItemsEquipsCore'][_0x50eb10(0x241)][_0x50eb10(0x2a6)][_0x50eb10(0x4b0)]:_0x50eb10(0x354)==='fhRTl'?VisuMZ[_0x50eb10(0x3aa)]['Settings'][_0x50eb10(0x2a6)][_0x50eb10(0xc9)]:_0x3d782e['ItemsEquipsCore'][_0x50eb10(0x241)][_0x50eb10(0x372)][_0x50eb10(0x455)];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x292)]=function(){const _0x286a4a=_0xc574cd;return VisuMZ[_0x286a4a(0x2d1)]&&VisuMZ[_0x286a4a(0x2d1)][_0x286a4a(0x241)][_0x286a4a(0x1f4)][_0x286a4a(0x2aa)]&&DataManager[_0x286a4a(0x1c2)](this[_0x286a4a(0xb8)])?![]:this[_0x286a4a(0xb8)][_0x286a4a(0x1f1)];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x1c6)]=function(_0xfddd23,_0x35757d,_0x357dd9){const _0x54b252=_0xc574cd;if(!this[_0x54b252(0x326)]()&&!DataManager['isItem'](this['_item']))return![];if(DataManager[_0x54b252(0x1c2)](this[_0x54b252(0xb8)])&&!$dataSystem[_0x54b252(0x2b8)]){const _0x5a35f6=TextManager['keyItem'];this[_0x54b252(0x337)](_0x5a35f6,_0xfddd23,_0x35757d,_0x357dd9,!![],_0x54b252(0x1a0));}else{const _0xcadb88=TextManager[_0x54b252(0x380)];this[_0x54b252(0x337)](_0xcadb88,_0xfddd23,_0x35757d,_0x357dd9,!![]);const _0x4464b7=this[_0x54b252(0x249)]();this[_0x54b252(0x337)](_0x4464b7,_0xfddd23,_0x35757d,_0x357dd9,![],_0x54b252(0xae));}return this['drawItemDarkRect'](_0xfddd23,_0x35757d,_0x357dd9),this[_0x54b252(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x249)]=function(){const _0x47a24d=_0xc574cd,_0x2ddca7=_0x47a24d(0x137);if(this['_customItemInfo'][_0x2ddca7])return this[_0x47a24d(0x381)][_0x2ddca7];const _0x3df7f3=VisuMZ[_0x47a24d(0x3aa)][_0x47a24d(0x241)][_0x47a24d(0x45b)]['ItemQuantityFmt'];return _0x3df7f3[_0x47a24d(0x2f2)]($gameParty[_0x47a24d(0x267)](this['_item']));},Window_ShopStatus['prototype'][_0xc574cd(0x4cb)]=function(_0x529b3b,_0x2eef27,_0x3d3e8b){const _0x4f8ef4=_0xc574cd,_0xd9b18d=this[_0x4f8ef4(0x4a7)]();return this[_0x4f8ef4(0x337)](_0xd9b18d,_0x529b3b,_0x2eef27,_0x3d3e8b,![],_0x4f8ef4(0x1a0)),this[_0x4f8ef4(0x1d3)](_0x529b3b,_0x2eef27,_0x3d3e8b),this[_0x4f8ef4(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x4a7)]=function(){const _0x1ea069=_0xc574cd,_0x506851='OCCASION';if(this[_0x1ea069(0x381)][_0x506851])return this[_0x1ea069(0x381)][_0x506851];const _0xb1a549=VisuMZ[_0x1ea069(0x3aa)][_0x1ea069(0x241)]['StatusWindow'],_0x30d5b7='Occasion%1'[_0x1ea069(0x2f2)](this['_item'][_0x1ea069(0x278)]);return _0xb1a549[_0x30d5b7];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x19d)]=function(_0x59c46f,_0x5fe3cc,_0x449ddb){const _0x11242e=_0xc574cd,_0x358f86=this[_0x11242e(0x120)]();return this[_0x11242e(0x337)](_0x358f86,_0x59c46f,_0x5fe3cc,_0x449ddb,![],_0x11242e(0x1a0)),this[_0x11242e(0x1d3)](_0x59c46f,_0x5fe3cc,_0x449ddb),this[_0x11242e(0x306)](),!![];},Window_ShopStatus['prototype'][_0xc574cd(0x120)]=function(){const _0x382260=_0xc574cd,_0x53c646='SCOPE';if(this[_0x382260(0x381)][_0x53c646])return this[_0x382260(0x381)][_0x53c646];const _0x5523ce=VisuMZ[_0x382260(0x3aa)][_0x382260(0x241)][_0x382260(0x2a6)];if(Imported[_0x382260(0x4ee)]){const _0x237bb5=this[_0x382260(0xb8)][_0x382260(0x2db)];if(_0x237bb5[_0x382260(0x4e0)](/<TARGET:[ ](.*)>/i)){const _0x44ce3d=String(RegExp['$1']);if(_0x44ce3d['match'](/(\d+) RANDOM ANY/i))return _0x5523ce[_0x382260(0x335)][_0x382260(0x2f2)](Number(RegExp['$1']));else{if(_0x44ce3d[_0x382260(0x4e0)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x5523ce[_0x382260(0x40e)]['format'](Number(RegExp['$1']));else{if(_0x44ce3d[_0x382260(0x4e0)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x5523ce[_0x382260(0xc2)][_0x382260(0x2f2)](Number(RegExp['$1']));else{if(_0x44ce3d[_0x382260(0x4e0)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x382260(0x4c7)===_0x382260(0x4c7))return _0x5523ce[_0x382260(0x4d4)];else{if(!_0x5eca1d['isItem'](this[_0x382260(0xb8)]))return![];const _0x22d9cd=this['getItemConsumableLabel']();this['drawItemKeyData'](_0x22d9cd,_0x4e1be8,_0x4741e6,_0x4b3768,!![]);const _0x4a11a9=this['getItemConsumableText']();return this['drawItemKeyData'](_0x4a11a9,_0x101b08,_0x3e29c6,_0x51807f,![],_0x382260(0xae)),this[_0x382260(0x1d3)](_0x42d5cf,_0x9dcf22,_0x282e00),this['resetFontSettings'](),!![];}}}}}}}const _0x14913d=_0x382260(0x4c3)['format'](this[_0x382260(0xb8)]['scope']);return _0x5523ce[_0x14913d];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x27f)]=function(_0x36a264,_0x2ec1aa,_0x3b930a){const _0x1e5a99=_0xc574cd,_0x17b367=this[_0x1e5a99(0x153)]();this['drawItemKeyData'](_0x17b367,_0x36a264,_0x2ec1aa,_0x3b930a,!![]);const _0x78d9bd=this[_0x1e5a99(0x311)]();return this['drawItemKeyData'](_0x78d9bd,_0x36a264,_0x2ec1aa,_0x3b930a,![],_0x1e5a99(0xae)),this['drawItemDarkRect'](_0x36a264,_0x2ec1aa,_0x3b930a),this[_0x1e5a99(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x153)]=function(){const _0x28752f=_0xc574cd;return VisuMZ[_0x28752f(0x3aa)][_0x28752f(0x241)][_0x28752f(0x2a6)]['LabelSpeed'];},Window_ShopStatus[_0xc574cd(0x405)]['getItemSpeedText']=function(){const _0x517b89=_0xc574cd,_0x1ef1ba='SPEED';if(this[_0x517b89(0x381)][_0x1ef1ba])return this['_customItemInfo'][_0x1ef1ba];const _0x15b772=this['_item']['speed'];if(_0x15b772>=0x7d0)return VisuMZ[_0x517b89(0x3aa)][_0x517b89(0x241)][_0x517b89(0x2a6)][_0x517b89(0x4f3)];else{if(_0x15b772>=0x3e8)return VisuMZ[_0x517b89(0x3aa)][_0x517b89(0x241)]['StatusWindow']['Speed1000'];else{if(_0x15b772>0x0)return VisuMZ[_0x517b89(0x3aa)][_0x517b89(0x241)][_0x517b89(0x2a6)][_0x517b89(0x1c7)];else{if(_0x15b772===0x0)return VisuMZ[_0x517b89(0x3aa)][_0x517b89(0x241)][_0x517b89(0x2a6)][_0x517b89(0x4a1)];else{if(_0x15b772>-0x3e8)return _0x517b89(0x47e)!==_0x517b89(0x2f7)?VisuMZ[_0x517b89(0x3aa)][_0x517b89(0x241)]['StatusWindow'][_0x517b89(0x11b)]:_0x8d3e10[_0x517b89(0x3aa)][_0x517b89(0x333)][_0x517b89(0x3e9)](this);else{if(_0x15b772>-0x7d0)return VisuMZ[_0x517b89(0x3aa)][_0x517b89(0x241)]['StatusWindow'][_0x517b89(0x2e2)];else return _0x15b772<=-0x7d0?'soUzO'!==_0x517b89(0x171)?_0x425549[_0x517b89(0x3aa)][_0x517b89(0x234)][_0x517b89(0x3e9)](this):VisuMZ[_0x517b89(0x3aa)][_0x517b89(0x241)]['StatusWindow']['SpeedNeg2000']:'?????';}}}}}},Window_ShopStatus['prototype'][_0xc574cd(0x37d)]=function(_0x5dc007,_0x3539cb,_0x22084f){const _0x52b6ae=_0xc574cd,_0x4c940d=this[_0x52b6ae(0x1fa)]();this[_0x52b6ae(0x337)](_0x4c940d,_0x5dc007,_0x3539cb,_0x22084f,!![]);const _0x1d23eb=this[_0x52b6ae(0x1f8)]();return this['drawItemKeyData'](_0x1d23eb,_0x5dc007,_0x3539cb,_0x22084f,![],_0x52b6ae(0xae)),this[_0x52b6ae(0x1d3)](_0x5dc007,_0x3539cb,_0x22084f),this[_0x52b6ae(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)]['getItemSuccessRateLabel']=function(){const _0x32e888=_0xc574cd;return VisuMZ[_0x32e888(0x3aa)]['Settings'][_0x32e888(0x2a6)][_0x32e888(0x544)];},Window_ShopStatus['prototype'][_0xc574cd(0x1f8)]=function(){const _0x398d71=_0xc574cd,_0x5d8f1e=_0x398d71(0x280);if(this['_customItemInfo'][_0x5d8f1e])return this[_0x398d71(0x381)][_0x5d8f1e];if(Imported['VisuMZ_1_BattleCore']){const _0x5afbf8=this[_0x398d71(0xb8)]['note'];if(_0x5afbf8[_0x398d71(0x4e0)](/<ALWAYS HIT>/i))return _0x398d71(0xa6);else{if(_0x5afbf8[_0x398d71(0x4e0)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x398d71(0x36f)[_0x398d71(0x2f2)](Number(RegExp['$1']));}}return _0x398d71(0x36f)[_0x398d71(0x2f2)](this[_0x398d71(0xb8)]['successRate']);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0xaf)]=function(_0x22fbfe,_0x2bb8b5,_0x5e1412){const _0x4d40dd=_0xc574cd,_0x145bb8=this[_0x4d40dd(0x43d)]();this[_0x4d40dd(0x337)](_0x145bb8,_0x22fbfe,_0x2bb8b5,_0x5e1412,!![]);const _0x4b4e36=this[_0x4d40dd(0x4df)]();return this['drawItemKeyData'](_0x4b4e36,_0x22fbfe,_0x2bb8b5,_0x5e1412,![],'right'),this[_0x4d40dd(0x1d3)](_0x22fbfe,_0x2bb8b5,_0x5e1412),this[_0x4d40dd(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)]['getItemRepeatsLabel']=function(){const _0x34a945=_0xc574cd;return VisuMZ['ItemsEquipsCore'][_0x34a945(0x241)][_0x34a945(0x2a6)]['LabelRepeats'];},Window_ShopStatus[_0xc574cd(0x405)]['getItemRepeatsText']=function(){const _0x20cea9=_0xc574cd,_0x8133a7='REPEAT';if(this[_0x20cea9(0x381)][_0x8133a7])return this['_customItemInfo'][_0x8133a7];const _0x1c869d=_0x20cea9(0x107);return _0x1c869d[_0x20cea9(0x2f2)](this[_0x20cea9(0xb8)][_0x20cea9(0x3b9)]);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x494)]=function(_0x16b8f9,_0x506ee9,_0xc2923){const _0x293995=_0xc574cd,_0x5d4079=this[_0x293995(0xcd)]();this[_0x293995(0x337)](_0x5d4079,_0x16b8f9,_0x506ee9,_0xc2923,!![]);const _0x2ca3c9=this[_0x293995(0x92)]();return this[_0x293995(0x337)](_0x2ca3c9,_0x16b8f9,_0x506ee9,_0xc2923,![],'right'),this[_0x293995(0x1d3)](_0x16b8f9,_0x506ee9,_0xc2923),this[_0x293995(0x306)](),!![];},Window_ShopStatus['prototype'][_0xc574cd(0xcd)]=function(){const _0x131c26=_0xc574cd;return VisuMZ[_0x131c26(0x3aa)][_0x131c26(0x241)][_0x131c26(0x2a6)]['LabelHitType'];},Window_ShopStatus['prototype'][_0xc574cd(0x92)]=function(){const _0xf1dbb2=_0xc574cd,_0x1864bc=_0xf1dbb2(0x2ab);if(this[_0xf1dbb2(0x381)][_0x1864bc])return this[_0xf1dbb2(0x381)][_0x1864bc];const _0x19cb41=VisuMZ[_0xf1dbb2(0x3aa)][_0xf1dbb2(0x241)][_0xf1dbb2(0x2a6)],_0x525d7d=_0xf1dbb2(0x1aa)['format'](this['_item'][_0xf1dbb2(0x2fa)]);return _0x19cb41[_0x525d7d];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0xdb)]=function(_0x277086,_0x4ee9da,_0x12f8e2){const _0x289c2c=_0xc574cd;if(this[_0x289c2c(0xb8)][_0x289c2c(0x330)][_0x289c2c(0x10b)]<=0x0)return _0x4ee9da;if(this[_0x289c2c(0x3f4)](_0x277086,_0x4ee9da,_0x12f8e2))_0x4ee9da+=this[_0x289c2c(0x363)]();if(this[_0x289c2c(0x53b)](_0x277086,_0x4ee9da,_0x12f8e2))_0x4ee9da+=this['lineHeight']();return this[_0x289c2c(0x306)](),_0x4ee9da;},Window_ShopStatus['prototype'][_0xc574cd(0x3f4)]=function(_0x436f4a,_0xedc420,_0x40dd35){const _0x2ad9da=_0xc574cd,_0x542251=this[_0x2ad9da(0x313)]();this[_0x2ad9da(0x337)](_0x542251,_0x436f4a,_0xedc420,_0x40dd35,!![]);const _0x4dd41e=this[_0x2ad9da(0x50a)]();return this[_0x2ad9da(0x337)](_0x4dd41e,_0x436f4a,_0xedc420,_0x40dd35,![],_0x2ad9da(0xae)),this[_0x2ad9da(0x1d3)](_0x436f4a,_0xedc420,_0x40dd35),this[_0x2ad9da(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)]['getItemDamageElementLabel']=function(){const _0x568023=_0xc574cd;return VisuMZ[_0x568023(0x3aa)]['Settings'][_0x568023(0x2a6)][_0x568023(0xcf)];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x50a)]=function(){const _0x1853c6=_0xc574cd,_0x489122=_0x1853c6(0x239);if(this[_0x1853c6(0x381)][_0x489122])return this[_0x1853c6(0x381)][_0x489122];if(this[_0x1853c6(0xb8)][_0x1853c6(0x330)]['elementId']<=-0x1)return VisuMZ[_0x1853c6(0x3aa)][_0x1853c6(0x241)][_0x1853c6(0x2a6)][_0x1853c6(0x42e)];else{if(this[_0x1853c6(0xb8)][_0x1853c6(0x330)][_0x1853c6(0x10c)]===0x0)return VisuMZ[_0x1853c6(0x3aa)][_0x1853c6(0x241)][_0x1853c6(0x2a6)][_0x1853c6(0x3f6)];else{if(_0x1853c6(0x454)!==_0x1853c6(0x454))this[_0x1853c6(0x48e)](),this['updateHelp']();else return $dataSystem['elements'][this['_item'][_0x1853c6(0x330)][_0x1853c6(0x10c)]];}}},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x53b)]=function(_0x1a3c0d,_0x362833,_0x4380b1){const _0x60d8c=_0xc574cd,_0x1490b2=this[_0x60d8c(0x1e8)]();this[_0x60d8c(0x337)](_0x1490b2,_0x1a3c0d,_0x362833,_0x4380b1,!![]),this[_0x60d8c(0x449)]();const _0x43c482=this[_0x60d8c(0x4f5)](),_0x429582=ColorManager[_0x60d8c(0x50c)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x60d8c(0xb8)][_0x60d8c(0x330)]['type']]);return this[_0x60d8c(0x163)](_0x429582),this[_0x60d8c(0x337)](_0x43c482,_0x1a3c0d,_0x362833,_0x4380b1,![],_0x60d8c(0xae)),this[_0x60d8c(0x1d3)](_0x1a3c0d,_0x362833,_0x4380b1),this[_0x60d8c(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)]['getItemDamageAmountLabel']=function(){const _0x526ede=_0xc574cd;if(Imported[_0x526ede(0x4ee)]&&DataManager[_0x526ede(0x52a)](this[_0x526ede(0xb8)])!==_0x526ede(0xce))return this[_0x526ede(0x100)]();else{if('wCkBD'===_0x526ede(0xef))return this[_0x526ede(0x386)]();else{const _0x533779=this['mainCommandWidth'](),_0xcd6365=this['calcWindowHeight'](0x1,!![]),_0x42c296=this['isRightInputMode']()?0x0:_0x5eca7d[_0x526ede(0x14f)]-_0x533779,_0xa7c4ea=this[_0x526ede(0xe5)]();return new _0x1a88c6(_0x42c296,_0xa7c4ea,_0x533779,_0xcd6365);}}},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x386)]=function(){const _0x4ee3b4=_0xc574cd,_0x48a608=VisuMZ[_0x4ee3b4(0x3aa)][_0x4ee3b4(0x241)][_0x4ee3b4(0x2a6)],_0x422d3d='DamageType%1'['format'](this[_0x4ee3b4(0xb8)][_0x4ee3b4(0x330)][_0x4ee3b4(0x10b)]),_0x1eb67d=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x4ee3b4(0xb8)]['damage'][_0x4ee3b4(0x10b)]];return _0x48a608[_0x422d3d][_0x4ee3b4(0x2f2)](_0x1eb67d);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x449)]=function(){const _0x4576c8=_0xc574cd,_0x462f94=$gameActors[_0x4576c8(0x3de)](0x1);this[_0x4576c8(0x4b6)]=JsonEx[_0x4576c8(0x346)](_0x462f94),this[_0x4576c8(0x1cf)]=JsonEx['makeDeepCopy'](_0x462f94);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x4f5)]=function(){const _0x19a27b=_0xc574cd,_0x3253a2=_0x19a27b(0x401);if(this[_0x19a27b(0x381)][_0x3253a2])return this[_0x19a27b(0x381)][_0x3253a2];if(Imported[_0x19a27b(0x4ee)]&&DataManager['getDamageStyle'](this[_0x19a27b(0xb8)])!==_0x19a27b(0xce)){if(_0x19a27b(0x2f6)!==_0x19a27b(0x2f6)){this[_0x19a27b(0x23f)][_0x19a27b(0x3b4)]();const _0x458180=this[_0x19a27b(0x2ef)][_0x19a27b(0x268)](),_0x232583=this[_0x19a27b(0x23f)][_0x19a27b(0x4eb)][_0x19a27b(0x1ad)](_0x458180),_0x3c2673=_0xe2650f[_0x19a27b(0x397)](this[_0x19a27b(0x23f)]['maxVisibleItems']()/0x2)-0x1;this[_0x19a27b(0x23f)][_0x19a27b(0x126)](_0x232583>=0x0?_0x232583:0x0),this['_itemWindow'][_0x19a27b(0x4d1)]>0x1&&(this['_itemWindow']['_scrollDuration']=0x1,this['_itemWindow'][_0x19a27b(0x34f)]()),this[_0x19a27b(0x23f)][_0x19a27b(0x81)](this[_0x19a27b(0x23f)]['index']()-_0x3c2673);}else return this[_0x19a27b(0x8b)]();}else return this[_0x19a27b(0x36c)]();},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x36c)]=function(){const _0x57b8a9=_0xc574cd;window['a']=this[_0x57b8a9(0x4b6)],window['b']=this['_tempActorB'],this[_0x57b8a9(0x4b6)]['setShopStatusWindowMode'](!![]),this[_0x57b8a9(0x1cf)]['setShopStatusWindowMode']([0x3,0x4]['includes'](this[_0x57b8a9(0xb8)]['damage'][_0x57b8a9(0x10b)]));let _0x246ea3=this[_0x57b8a9(0xb8)][_0x57b8a9(0x330)][_0x57b8a9(0x258)];try{const _0x50a5dc=Math['max'](eval(_0x246ea3),0x0)/window['a'][_0x57b8a9(0x485)];return this['revertGlobalNamespaceVariables'](),isNaN(_0x50a5dc)?_0x57b8a9(0x38f):'%1%'[_0x57b8a9(0x2f2)](Math['round'](_0x50a5dc*0x64));}catch(_0x51cf14){if($gameTemp[_0x57b8a9(0x3a3)]()){if(_0x57b8a9(0x2d5)===_0x57b8a9(0x2d5))console[_0x57b8a9(0x3ef)](_0x57b8a9(0x35b)[_0x57b8a9(0x2f2)](this[_0x57b8a9(0xb8)][_0x57b8a9(0xf9)])),console[_0x57b8a9(0x3ef)](_0x51cf14);else return _0x396614[_0x57b8a9(0x3aa)][_0x57b8a9(0x241)][_0x57b8a9(0x2a6)]['LabelRemove'];}return this[_0x57b8a9(0x2b5)](),'?????';}},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x2b5)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus['prototype'][_0xc574cd(0x545)]=function(_0xfc870b,_0x449b72,_0x281e5b){const _0x21ded5=_0xc574cd;if(!this['makeItemData']())return _0x449b72;if(this[_0x21ded5(0x4a8)](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this[_0x21ded5(0x363)]();if(this[_0x21ded5(0x2a3)](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this[_0x21ded5(0x363)]();if(this[_0x21ded5(0x3da)](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this[_0x21ded5(0x363)]();if(this['drawItemEffectsHpDamage'](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this['lineHeight']();if(this[_0x21ded5(0x141)](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this[_0x21ded5(0x363)]();if(this[_0x21ded5(0x384)](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this['lineHeight']();if(this[_0x21ded5(0xf0)](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this[_0x21ded5(0x363)]();if(this['drawItemEffectsAddedStatesBuffs'](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this[_0x21ded5(0x363)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0xfc870b,_0x449b72,_0x281e5b))_0x449b72+=this['lineHeight']();return this[_0x21ded5(0x306)](),_0x449b72;},Window_ShopStatus[_0xc574cd(0x405)]['getItemEffects']=function(){const _0x55be3b=_0xc574cd;return this[_0x55be3b(0xb8)][_0x55be3b(0x447)];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x23a)]=function(){const _0x361951=_0xc574cd;let _0x2e75d9=![];this[_0x361951(0x39f)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x4a3c4d=this[_0x361951(0x4c5)]();for(const _0x150cd7 of _0x4a3c4d){switch(_0x150cd7['code']){case Game_Action[_0x361951(0x204)]:this[_0x361951(0x39f)][_0x361951(0x188)]+=_0x150cd7[_0x361951(0x42b)],this['_itemData'][_0x361951(0x200)]+=_0x150cd7[_0x361951(0x10d)],_0x2e75d9=!![];break;case Game_Action[_0x361951(0x263)]:this['_itemData'][_0x361951(0x4c0)]+=_0x150cd7['value1'],this[_0x361951(0x39f)]['flatMP']+=_0x150cd7['value2'],_0x2e75d9=!![];break;case Game_Action['EFFECT_GAIN_TP']:this[_0x361951(0x39f)][_0x361951(0x140)]+=_0x150cd7['value1'],_0x2e75d9=!![];break;case Game_Action[_0x361951(0x489)]:this[_0x361951(0x39f)][_0x361951(0x1df)][_0x361951(0x320)](_0x150cd7['dataId']),_0x2e75d9=!![];break;case Game_Action['EFFECT_REMOVE_STATE']:this[_0x361951(0x39f)][_0x361951(0x85)][_0x361951(0x320)](_0x150cd7[_0x361951(0x281)]),this[_0x361951(0x39f)][_0x361951(0x1d8)]=!![],_0x2e75d9=!![];break;case Game_Action[_0x361951(0x481)]:this[_0x361951(0x39f)]['changeBuff'][_0x150cd7['dataId']]+=0x1,_0x2e75d9=!![];break;case Game_Action[_0x361951(0xb3)]:this[_0x361951(0x39f)][_0x361951(0x172)][_0x150cd7[_0x361951(0x281)]]-=0x1,_0x2e75d9=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x361951(0x39f)]['removeBuff'][_0x361951(0x320)](_0x150cd7[_0x361951(0x281)]),this[_0x361951(0x39f)][_0x361951(0x1d8)]=!![],_0x2e75d9=!![];break;case Game_Action['EFFECT_REMOVE_DEBUFF']:this[_0x361951(0x39f)][_0x361951(0xee)][_0x361951(0x320)](_0x150cd7[_0x361951(0x281)]),this['_itemData'][_0x361951(0x1d8)]=!![],_0x2e75d9=!![];break;}}if(this[_0x361951(0x39f)][_0x361951(0x1df)][_0x361951(0x294)]>0x0)this[_0x361951(0x39f)]['addStateBuffChanges']=!![];for(let _0x70be5c=0x0;_0x70be5c<this[_0x361951(0x39f)][_0x361951(0x172)][_0x361951(0x294)];_0x70be5c++){if(this[_0x361951(0x39f)][_0x361951(0x172)][_0x70be5c]!==0x0)this[_0x361951(0x39f)][_0x361951(0x13f)]=!![];}if(this['_item']['tpGain']!==0x0){if(_0x361951(0x223)===_0x361951(0x508))return _0x38ff39[_0x361951(0x3aa)][_0x361951(0x241)][_0x361951(0x45b)]['EnableLayout'];else this[_0x361951(0x39f)][_0x361951(0x1c9)]=this['_item'][_0x361951(0x2ac)],_0x2e75d9=!![];}const _0x5a4fa1=[_0x361951(0x469),_0x361951(0x348),_0x361951(0x227),'HP\x20DAMAGE',_0x361951(0x88),_0x361951(0x3d3),_0x361951(0x1a6),_0x361951(0x101),_0x361951(0x4e2)];for(const _0x968dcc of _0x5a4fa1){if(this['_customItemInfo'][_0x968dcc]){if(_0x361951(0x1ca)===_0x361951(0x252))_0x58616a[_0x361951(0x405)][_0x361951(0x542)][_0x361951(0x3e9)](this),this['_categoryWindow']&&this[_0x361951(0x439)][_0x361951(0x374)]()&&this[_0x361951(0x439)]['deactivate']();else{_0x2e75d9=!![];break;}}}return _0x2e75d9;},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x4a8)]=function(_0x4cbf5a,_0x5f1718,_0x26398e){const _0x5f12b5=_0xc574cd,_0x19cc75=_0x5f12b5(0x469);if(this[_0x5f12b5(0x39f)][_0x5f12b5(0x188)]<=0x0&&this[_0x5f12b5(0x39f)]['flatHP']<=0x0&&!this['_customItemInfo'][_0x19cc75])return![];const _0x3af218=this['getItemEffectsHpRecoveryLabel']();this[_0x5f12b5(0x337)](_0x3af218,_0x4cbf5a,_0x5f1718,_0x26398e,!![]);const _0x50604c=this[_0x5f12b5(0x103)]();return this[_0x5f12b5(0x163)](ColorManager[_0x5f12b5(0x50c)](0x1)),this[_0x5f12b5(0x337)](_0x50604c,_0x4cbf5a,_0x5f1718,_0x26398e,![],'right'),this[_0x5f12b5(0x1d3)](_0x4cbf5a,_0x5f1718,_0x26398e),this['resetFontSettings'](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x364)]=function(){const _0x2909ce=_0xc574cd,_0x4319cd=VisuMZ[_0x2909ce(0x3aa)][_0x2909ce(0x241)][_0x2909ce(0x2a6)][_0x2909ce(0xbb)];return _0x4319cd[_0x2909ce(0x2f2)](TextManager['hp']);},Window_ShopStatus['prototype'][_0xc574cd(0x103)]=function(){const _0x5c4fb6=_0xc574cd,_0x4d5f4a=_0x5c4fb6(0x469);if(this[_0x5c4fb6(0x381)][_0x4d5f4a])return this[_0x5c4fb6(0x381)][_0x4d5f4a];let _0x5487af='';if(this[_0x5c4fb6(0x39f)][_0x5c4fb6(0x188)]>0x0)_0x5487af+=_0x5c4fb6(0x39e)[_0x5c4fb6(0x2f2)](Math[_0x5c4fb6(0x397)](this[_0x5c4fb6(0x39f)][_0x5c4fb6(0x188)]*0x64));if(this[_0x5c4fb6(0x39f)][_0x5c4fb6(0x188)]>0x0&&this[_0x5c4fb6(0x39f)][_0x5c4fb6(0x200)]>0x0)_0x5487af+='\x20';if(this['_itemData'][_0x5c4fb6(0x200)]>0x0)_0x5487af+=_0x5c4fb6(0x1b2)[_0x5c4fb6(0x2f2)](this[_0x5c4fb6(0x39f)][_0x5c4fb6(0x200)]);return _0x5487af;},Window_ShopStatus['prototype'][_0xc574cd(0x2a3)]=function(_0x508690,_0x10093d,_0x454edc){const _0x1a29d7=_0xc574cd,_0x277e47=_0x1a29d7(0x348);if(this[_0x1a29d7(0x39f)][_0x1a29d7(0x4c0)]<=0x0&&this[_0x1a29d7(0x39f)][_0x1a29d7(0xa2)]<=0x0&&!this[_0x1a29d7(0x381)][_0x277e47])return![];const _0x49f239=this[_0x1a29d7(0x334)]();this[_0x1a29d7(0x337)](_0x49f239,_0x508690,_0x10093d,_0x454edc,!![]);const _0x395a1b=this[_0x1a29d7(0x26f)]();return this[_0x1a29d7(0x163)](ColorManager[_0x1a29d7(0x50c)](0x3)),this['drawItemKeyData'](_0x395a1b,_0x508690,_0x10093d,_0x454edc,![],_0x1a29d7(0xae)),this['drawItemDarkRect'](_0x508690,_0x10093d,_0x454edc),this[_0x1a29d7(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x334)]=function(){const _0xf6cd2b=_0xc574cd,_0x5da9c3=VisuMZ[_0xf6cd2b(0x3aa)][_0xf6cd2b(0x241)][_0xf6cd2b(0x2a6)][_0xf6cd2b(0x2e6)];return _0x5da9c3[_0xf6cd2b(0x2f2)](TextManager['mp']);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x26f)]=function(){const _0x2d651b=_0xc574cd,_0x57e51f=_0x2d651b(0x348);if(this[_0x2d651b(0x381)][_0x57e51f])return this[_0x2d651b(0x381)][_0x57e51f];let _0x18815f='';if(this[_0x2d651b(0x39f)]['rateMP']>0x0)_0x18815f+=_0x2d651b(0x39e)['format'](Math['floor'](this[_0x2d651b(0x39f)][_0x2d651b(0x4c0)]*0x64));if(this[_0x2d651b(0x39f)][_0x2d651b(0x4c0)]>0x0&&this['_itemData'][_0x2d651b(0xa2)]>0x0)_0x18815f+='\x20';if(this['_itemData'][_0x2d651b(0xa2)]>0x0)_0x18815f+=_0x2d651b(0x1b2)['format'](this['_itemData'][_0x2d651b(0xa2)]);return _0x18815f;},Window_ShopStatus[_0xc574cd(0x405)]['drawItemEffectsTpRecovery']=function(_0x1230ed,_0x3789d6,_0x141c62){const _0x5ce46b=_0xc574cd,_0x320e15=_0x5ce46b(0x227);if(this['_itemData']['gainTP']<=0x0&&!this[_0x5ce46b(0x381)][_0x320e15])return![];const _0x5d2fdc=this[_0x5ce46b(0x4fb)]();this[_0x5ce46b(0x337)](_0x5d2fdc,_0x1230ed,_0x3789d6,_0x141c62,!![]);const _0x4b0099=this[_0x5ce46b(0xf7)]();return this[_0x5ce46b(0x163)](ColorManager[_0x5ce46b(0x452)]()),this[_0x5ce46b(0x337)](_0x4b0099,_0x1230ed,_0x3789d6,_0x141c62,![],'right'),this[_0x5ce46b(0x1d3)](_0x1230ed,_0x3789d6,_0x141c62),this[_0x5ce46b(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x4fb)]=function(){const _0x2be131=_0xc574cd,_0x16530f=VisuMZ[_0x2be131(0x3aa)]['Settings'][_0x2be131(0x2a6)]['LabelRecoverTP'];return _0x16530f[_0x2be131(0x2f2)](TextManager['tp']);},Window_ShopStatus['prototype']['getItemEffectsTpRecoveryText']=function(){const _0xb44068=_0xc574cd,_0x411a46=_0xb44068(0x227);if(this['_customItemInfo'][_0x411a46])return this[_0xb44068(0x381)][_0x411a46];let _0x303e90='';return _0x303e90+='+%1'[_0xb44068(0x2f2)](this[_0xb44068(0x39f)][_0xb44068(0x140)]),_0x303e90;},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0xf0)]=function(_0x147447,_0x16e088,_0x2f1cb2){const _0x25a079=_0xc574cd,_0x4d5164=_0x25a079(0x1a6);if(this[_0x25a079(0x39f)][_0x25a079(0x1c9)]===0x0&&!this[_0x25a079(0x381)][_0x4d5164])return![];const _0x58d1f7=this['getItemEffectsSelfTpGainLabel']();this['drawItemKeyData'](_0x58d1f7,_0x147447,_0x16e088,_0x2f1cb2,!![]);const _0x49bcf1=this[_0x25a079(0x1c8)]();return this[_0x25a079(0x39f)][_0x25a079(0x1c9)]>0x0?this[_0x25a079(0x163)](ColorManager[_0x25a079(0x452)]()):this['changeTextColor'](ColorManager[_0x25a079(0x1ab)]()),this['drawItemKeyData'](_0x49bcf1,_0x147447,_0x16e088,_0x2f1cb2,![],_0x25a079(0xae)),this[_0x25a079(0x1d3)](_0x147447,_0x16e088,_0x2f1cb2),this['resetFontSettings'](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x316)]=function(){const _0x1718b1=_0xc574cd,_0x323603=VisuMZ[_0x1718b1(0x3aa)][_0x1718b1(0x241)][_0x1718b1(0x2a6)][_0x1718b1(0x4da)];return _0x323603[_0x1718b1(0x2f2)](TextManager['tp']);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x1c8)]=function(){const _0x1e2752=_0xc574cd,_0x451913=_0x1e2752(0x1a6);if(this['_customItemInfo'][_0x451913])return this[_0x1e2752(0x381)][_0x451913];let _0x4b997f='';return this['_itemData']['selfTP']>0x0?_0x4b997f+='+%1'['format'](this['_itemData']['selfTP']):_0x4b997f+='%1'[_0x1e2752(0x2f2)](this[_0x1e2752(0x39f)][_0x1e2752(0x1c9)]),_0x4b997f;},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x4b1)]=function(_0x3184a9,_0x59980a,_0x2ade3e){const _0xd72d5f=_0xc574cd,_0x5d3a98=_0xd72d5f(0x4e9);if(this[_0xd72d5f(0x39f)][_0xd72d5f(0x188)]>=0x0&&this[_0xd72d5f(0x39f)][_0xd72d5f(0x200)]>=0x0&&!this['_customItemInfo'][_0x5d3a98])return![];const _0x1dbdc9=this[_0xd72d5f(0xfb)]();this['drawItemKeyData'](_0x1dbdc9,_0x3184a9,_0x59980a,_0x2ade3e,!![]);const _0x4b4c0a=this[_0xd72d5f(0x15b)]();return this[_0xd72d5f(0x163)](ColorManager[_0xd72d5f(0x50c)](0x0)),this['drawItemKeyData'](_0x4b4c0a,_0x3184a9,_0x59980a,_0x2ade3e,![],'right'),this[_0xd72d5f(0x1d3)](_0x3184a9,_0x59980a,_0x2ade3e),this[_0xd72d5f(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0xfb)]=function(){const _0x458fec=_0xc574cd,_0x11a64f=VisuMZ['ItemsEquipsCore'][_0x458fec(0x241)][_0x458fec(0x2a6)]['LabelDamageHP'];return _0x11a64f[_0x458fec(0x2f2)](TextManager['hp']);},Window_ShopStatus['prototype'][_0xc574cd(0x15b)]=function(){const _0x5bcb42=_0xc574cd,_0x1c7d5e=_0x5bcb42(0x4e9);if(this['_customItemInfo'][_0x1c7d5e])return this[_0x5bcb42(0x381)][_0x1c7d5e];let _0x4a34d9='';if(this[_0x5bcb42(0x39f)]['rateHP']<0x0)_0x4a34d9+=_0x5bcb42(0x36f)[_0x5bcb42(0x2f2)](Math[_0x5bcb42(0x397)](this[_0x5bcb42(0x39f)][_0x5bcb42(0x188)]*0x64));if(this[_0x5bcb42(0x39f)][_0x5bcb42(0x188)]<0x0&&this['_itemData'][_0x5bcb42(0x200)]<0x0)_0x4a34d9+='\x20';if(this[_0x5bcb42(0x39f)][_0x5bcb42(0x200)]<0x0)_0x4a34d9+='%1'[_0x5bcb42(0x2f2)](this['_itemData'][_0x5bcb42(0x200)]);return _0x4a34d9;},Window_ShopStatus['prototype'][_0xc574cd(0x141)]=function(_0x5fca19,_0x101381,_0x41744d){const _0x5ebb86=_0xc574cd,_0x17781d='MP\x20DAMAGE';if(this[_0x5ebb86(0x39f)]['rateMP']>=0x0&&this[_0x5ebb86(0x39f)][_0x5ebb86(0xa2)]>=0x0&&!this[_0x5ebb86(0x381)][_0x17781d])return![];const _0x29255b=this['getItemEffectsMpDamageLabel']();this[_0x5ebb86(0x337)](_0x29255b,_0x5fca19,_0x101381,_0x41744d,!![]);const _0x4c6a50=this[_0x5ebb86(0x299)]();return this[_0x5ebb86(0x163)](ColorManager[_0x5ebb86(0x50c)](0x2)),this['drawItemKeyData'](_0x4c6a50,_0x5fca19,_0x101381,_0x41744d,![],'right'),this['drawItemDarkRect'](_0x5fca19,_0x101381,_0x41744d),this[_0x5ebb86(0x306)](),!![];},Window_ShopStatus['prototype']['getItemEffectsMpDamageLabel']=function(){const _0x2e92df=_0xc574cd,_0x253e7f=VisuMZ[_0x2e92df(0x3aa)][_0x2e92df(0x241)]['StatusWindow'][_0x2e92df(0x4d8)];return _0x253e7f[_0x2e92df(0x2f2)](TextManager['mp']);},Window_ShopStatus['prototype'][_0xc574cd(0x299)]=function(){const _0x58cc74=_0xc574cd,_0x266ad7=_0x58cc74(0x88);if(this[_0x58cc74(0x381)][_0x266ad7])return this[_0x58cc74(0x381)][_0x266ad7];let _0x451ef9='';if(this[_0x58cc74(0x39f)]['rateMP']<0x0)_0x451ef9+=_0x58cc74(0x36f)[_0x58cc74(0x2f2)](Math[_0x58cc74(0x397)](this[_0x58cc74(0x39f)][_0x58cc74(0x4c0)]*0x64));if(this[_0x58cc74(0x39f)]['rateMP']<0x0&&this[_0x58cc74(0x39f)]['flatMP']<0x0)_0x451ef9+='\x20';if(this['_itemData'][_0x58cc74(0xa2)]<0x0)_0x451ef9+='%1'[_0x58cc74(0x2f2)](this[_0x58cc74(0x39f)][_0x58cc74(0xa2)]);return _0x451ef9;},Window_ShopStatus[_0xc574cd(0x405)]['drawItemEffectsTpDamage']=function(_0x487114,_0x225c9b,_0x11bb85){const _0x503225=_0xc574cd,_0x4d93a1=_0x503225(0x3d3);if(this['_itemData'][_0x503225(0x140)]>=0x0&&!this[_0x503225(0x381)][_0x4d93a1])return![];const _0x4bbe88=this[_0x503225(0x3d8)]();this[_0x503225(0x337)](_0x4bbe88,_0x487114,_0x225c9b,_0x11bb85,!![]);const _0x136bcb=this[_0x503225(0x297)]();return this[_0x503225(0x163)](ColorManager[_0x503225(0x1ab)]()),this[_0x503225(0x337)](_0x136bcb,_0x487114,_0x225c9b,_0x11bb85,![],'right'),this[_0x503225(0x1d3)](_0x487114,_0x225c9b,_0x11bb85),this[_0x503225(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x3d8)]=function(){const _0x316d4b=_0xc574cd,_0x5cdb46=VisuMZ[_0x316d4b(0x3aa)]['Settings'][_0x316d4b(0x2a6)][_0x316d4b(0x49a)];return _0x5cdb46[_0x316d4b(0x2f2)](TextManager['tp']);},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x297)]=function(){const _0x91074f=_0xc574cd,_0x32ee89=_0x91074f(0x3d3);if(this['_customItemInfo'][_0x32ee89])return this[_0x91074f(0x381)][_0x32ee89];let _0x41381a='';return _0x41381a+='%1'[_0x91074f(0x2f2)](this[_0x91074f(0x39f)]['gainTP']),_0x41381a;},Window_ShopStatus['prototype'][_0xc574cd(0x157)]=function(_0x56f31e,_0x5e4959,_0x414cc5){const _0xb43844=_0xc574cd,_0x4fb29f=_0xb43844(0x101);if(!this[_0xb43844(0x39f)][_0xb43844(0x13f)]&&!this[_0xb43844(0x381)][_0x4fb29f])return![];const _0xd5ac24=this[_0xb43844(0x19c)]();this[_0xb43844(0x337)](_0xd5ac24,_0x56f31e,_0x5e4959,_0x414cc5,!![]);const _0x4f325f=this[_0xb43844(0x2b7)]();return this[_0xb43844(0x337)](_0x4f325f,_0x56f31e,_0x5e4959,_0x414cc5,![],_0xb43844(0xae)),this[_0xb43844(0x1d3)](_0x56f31e,_0x5e4959,_0x414cc5),this[_0xb43844(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)]['getItemEffectsAddedStatesBuffsLabel']=function(){const _0x534317=_0xc574cd;return VisuMZ[_0x534317(0x3aa)][_0x534317(0x241)][_0x534317(0x2a6)]['LabelApply'];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x2b7)]=function(){const _0x4e5155=_0xc574cd,_0x341f0b=_0x4e5155(0x101);if(this[_0x4e5155(0x381)][_0x341f0b])return this[_0x4e5155(0x381)][_0x341f0b];let _0x1685da='',_0x26afef=0x0;const _0x418c32=0x8;for(const _0x25a719 of this['_itemData'][_0x4e5155(0x1df)]){const _0xc8c4b6=$dataStates[_0x25a719];if(_0xc8c4b6&&_0xc8c4b6[_0x4e5155(0x164)]>0x0){if(_0x4e5155(0x3a9)===_0x4e5155(0x3a9)){_0x1685da+=_0x4e5155(0x41e)[_0x4e5155(0x2f2)](_0xc8c4b6['iconIndex']),_0x26afef++;if(_0x26afef>=_0x418c32)return _0x1685da;}else return _0x15e9d9[_0x4e5155(0x301)]&&_0x433b38[_0x4e5155(0x2d1)]['Settings'][_0x4e5155(0x44e)][_0x4e5155(0x2eb)];}}for(let _0x51c651=0x0;_0x51c651<this['_itemData'][_0x4e5155(0x172)][_0x4e5155(0x294)];_0x51c651++){if('hVnGo'!==_0x4e5155(0x237)){const _0x5795af=this['_itemData'][_0x4e5155(0x172)][_0x51c651],_0xe1f35c=Game_BattlerBase['prototype']['buffIconIndex'](_0x5795af,_0x51c651);if(_0xe1f35c>0x0){if('eogtk'!==_0x4e5155(0x209))_0x42bea2[_0x4e5155(0x3aa)][_0x4e5155(0x488)][_0x4e5155(0x3e9)](this,_0x59f12f),_0x4ee2c7[_0x4e5155(0x3aa)][_0x4e5155(0xe0)](_0x37034a,_0x4a9e96);else{_0x1685da+=_0x4e5155(0x41e)[_0x4e5155(0x2f2)](_0xe1f35c),_0x26afef++;if(_0x26afef>=_0x418c32)return _0x1685da;}}}else return this[_0x4e5155(0xd0)]();}return _0x1685da;},Window_ShopStatus[_0xc574cd(0x405)]['drawItemEffectsRemovedStatesBuffs']=function(_0x202979,_0x2ee752,_0x33e653){const _0x17853c=_0xc574cd,_0x3b946e=_0x17853c(0x4e2);if(!this['_itemData']['removeStateBuffChanges']&&!this['_customItemInfo'][_0x3b946e])return![];const _0x336f9=this[_0x17853c(0x403)]();this['drawItemKeyData'](_0x336f9,_0x202979,_0x2ee752,_0x33e653,!![]);const _0x56d8d5=this['getItemEffectsRemovedStatesBuffsText']();return this[_0x17853c(0x337)](_0x56d8d5,_0x202979,_0x2ee752,_0x33e653,![],_0x17853c(0xae)),this['drawItemDarkRect'](_0x202979,_0x2ee752,_0x33e653),this[_0x17853c(0x306)](),!![];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x403)]=function(){const _0x57a757=_0xc574cd;return VisuMZ['ItemsEquipsCore']['Settings'][_0x57a757(0x2a6)][_0x57a757(0x389)];},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0x457)]=function(){const _0x265cb5=_0xc574cd,_0x10da56=_0x265cb5(0x4e2);if(this['_customItemInfo'][_0x10da56])return this[_0x265cb5(0x381)][_0x10da56];let _0x4eca77='',_0x686154=0x0;const _0x1f957c=VisuMZ[_0x265cb5(0x3aa)][_0x265cb5(0x241)]['StatusWindow'][_0x265cb5(0x18a)];for(const _0x39b69b of this[_0x265cb5(0x39f)][_0x265cb5(0x85)]){if(_0x265cb5(0x360)==='RmGhH')return _0x4a6f51[_0x265cb5(0x3aa)]['Window_ItemList_maxCols'][_0x265cb5(0x3e9)](this);else{const _0x4de4d9=$dataStates[_0x39b69b];if(_0x4de4d9&&_0x4de4d9['iconIndex']>0x0){_0x4eca77+=_0x265cb5(0x41e)[_0x265cb5(0x2f2)](_0x4de4d9[_0x265cb5(0x164)]),_0x686154++;if(_0x686154>=_0x1f957c)return _0x4eca77;}}}for(let _0x604cb8=0x0;_0x604cb8<this['_itemData'][_0x265cb5(0x38b)][_0x265cb5(0x294)];_0x604cb8++){if(_0x265cb5(0x4b5)===_0x265cb5(0x189)){const _0x55e62a=this['itemLineRect'](_0x26a0c8),_0x19d0e9=this[_0x265cb5(0x21c)](_0x4ba6a6)[_0x265cb5(0x4d5)];return _0x19d0e9<=_0x55e62a[_0x265cb5(0x4d5)]?'iconText':_0x265cb5(0x3bb);}else{const _0x3697c0=Game_BattlerBase[_0x265cb5(0x405)]['buffIconIndex'](0x1,_0x604cb8);if(_0x3697c0>0x0){_0x4eca77+=_0x265cb5(0x41e)[_0x265cb5(0x2f2)](_0x3697c0),_0x686154++;if(_0x686154>=_0x1f957c)return _0x4eca77;}}}for(let _0x417c23=0x0;_0x417c23<this[_0x265cb5(0x39f)]['removeDebuff'][_0x265cb5(0x294)];_0x417c23++){const _0x135c2c=Game_BattlerBase['prototype']['buffIconIndex'](-0x1,_0x417c23);if(_0x135c2c>0x0){_0x4eca77+=_0x265cb5(0x41e)[_0x265cb5(0x2f2)](_0x135c2c),_0x686154++;if(_0x686154>=_0x1f957c)return _0x4eca77;}}return _0x4eca77;},Window_ShopStatus[_0xc574cd(0x405)]['drawItemCustomEntries']=function(_0x4d7bb3,_0x52a6c7,_0x8f7582){const _0x5a31f3=_0xc574cd;if(this[_0x5a31f3(0xb8)][_0x5a31f3(0x2db)][_0x5a31f3(0x4e0)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x2f4f4d=String(RegExp['$1'])[_0x5a31f3(0x3d7)](/[\r\n]+/);for(const _0x3caad5 of _0x2f4f4d){if(_0x3caad5[_0x5a31f3(0x4e0)](/(.*):[ ](.*)/i)){const _0x5346eb=String(RegExp['$1'])['trim'](),_0x2d4e83=String(RegExp['$2'])['trim']();this['drawItemCustomEntryLine'](_0x5346eb,_0x2d4e83,_0x4d7bb3,_0x52a6c7,_0x8f7582),_0x52a6c7+=this[_0x5a31f3(0x363)]();}}}return this[_0x5a31f3(0x306)](),_0x52a6c7;},Window_ShopStatus[_0xc574cd(0x405)]['drawItemCustomEntryLine']=function(_0x36b54a,_0x319ab7,_0x2ef663,_0x3b0b1b,_0x53e1a3){const _0x778c39=_0xc574cd;this[_0x778c39(0x337)](_0x36b54a,_0x2ef663,_0x3b0b1b,_0x53e1a3,!![]),this[_0x778c39(0x337)](_0x319ab7,_0x2ef663,_0x3b0b1b,_0x53e1a3,![],_0x778c39(0xae)),this[_0x778c39(0x1d3)](_0x2ef663,_0x3b0b1b,_0x53e1a3),this[_0x778c39(0x306)]();},Window_ShopStatus[_0xc574cd(0x405)]['drawCustomShopGraphic']=function(){const _0x3e1e11=_0xc574cd;if(!this[_0x3e1e11(0xb8)])return;const _0x35f145=this[_0x3e1e11(0xb8)][_0x3e1e11(0x2db)],_0x59f46d=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x121b55=_0x35f145[_0x3e1e11(0x4e0)](_0x59f46d);if(_0x121b55){if(_0x3e1e11(0x3c3)===_0x3e1e11(0x3c3))for(const _0x3b2d53 of _0x121b55){_0x3b2d53[_0x3e1e11(0x4e0)](_0x59f46d);const _0x43756c=String(RegExp['$1'])[_0x3e1e11(0x3c0)]()||'';if(_0x43756c==='')continue;const _0x400ed2=ImageManager[_0x3e1e11(0x390)](_0x43756c);_0x400ed2[_0x3e1e11(0x22a)](this[_0x3e1e11(0xf4)][_0x3e1e11(0x2b9)](this,_0x400ed2,this[_0x3e1e11(0xb8)]));}else return this[_0x3e1e11(0xb8)][_0x3e1e11(0x1f1)];}},Window_ShopStatus[_0xc574cd(0x405)][_0xc574cd(0xf4)]=function(_0x3408c1,_0x56843c){const _0x446e7e=_0xc574cd;if(this[_0x446e7e(0xb8)]!==_0x56843c)return;if(!_0x3408c1)return;if(_0x3408c1[_0x446e7e(0x4d5)]<=0x0||_0x3408c1['height']<=0x0)return;const _0x37d0b0=_0x56843c[_0x446e7e(0x2db)];let _0x30961d=_0x446e7e(0x40a);_0x37d0b0[_0x446e7e(0x4e0)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x30961d='foreground');const _0x361846=_0x30961d===_0x446e7e(0x40a)?this[_0x446e7e(0x307)]:this[_0x446e7e(0x211)];let _0x1d5029=this[_0x446e7e(0x353)],_0x47cdbe=this[_0x446e7e(0x366)];if(_0x37d0b0[_0x446e7e(0x4e0)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)){if(_0x446e7e(0x295)===_0x446e7e(0x3a4)){_0x466dca[_0x446e7e(0x405)]['callUpdateHelp'][_0x446e7e(0x3e9)](this);if(this[_0x446e7e(0x20b)])this[_0x446e7e(0xa1)]();}else _0x1d5029=Number(RegExp['$1']);}_0x37d0b0['match'](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x446e7e(0x2c1)!=='BaDUA'?_0x47cdbe=Number(RegExp['$1']):(delete this['_categoryWindow'][_0x446e7e(0x2f0)]['ok'],delete this[_0x446e7e(0x439)]['_handlers'][_0x446e7e(0x1f2)]));_0x37d0b0['match'](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x1d5029=Number(RegExp['$1']),_0x47cdbe=Number(RegExp['$2']));const _0x5f2fba=Math[_0x446e7e(0x265)](0x1,_0x1d5029/_0x3408c1[_0x446e7e(0x4d5)],_0x47cdbe/_0x3408c1[_0x446e7e(0x3bd)]);let _0x584d19=0x0,_0x18a82f=0x0,_0xa0dead=Math[_0x446e7e(0x397)](_0x3408c1[_0x446e7e(0x4d5)]*_0x5f2fba),_0x154365=Math[_0x446e7e(0x397)](_0x3408c1['height']*_0x5f2fba),_0x557a00=_0x446e7e(0x1a0);if(_0x37d0b0[_0x446e7e(0x4e0)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)){if('VZXEE'!==_0x446e7e(0x391))_0x557a00=String(RegExp['$1'])['toLowerCase']()[_0x446e7e(0x3c0)]();else{if(_0x246f73===_0x5924e3)return;if(_0x4ad207[_0x446e7e(0x2db)][_0x446e7e(0x4e0)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x359d6b=_0x390e41(_0x2a01a6['$1']),_0x1d3c8f=(_0x3dac92===_0x228737?_0x446e7e(0x178):'A%1')[_0x446e7e(0x2f2)](_0x1f29be['id']),_0xb55b60='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x359d6b);for(let _0x111ecc=0x0;_0x111ecc<0x8;_0x111ecc++){if(_0x359d6b[_0x446e7e(0x4e0)](_0x3586a9[_0x446e7e(0x3aa)][_0x446e7e(0x512)][_0x446e7e(0x82)][_0x111ecc])){const _0xe9dac1='%1-%2'['format'](_0x1d3c8f,_0x111ecc);_0x1e60c1[_0x446e7e(0x3aa)][_0x446e7e(0x47c)][_0xe9dac1]=new _0x3481ac(_0x446e7e(0x268),'paramId',_0xb55b60);}}}}}if(_0x557a00===_0x446e7e(0x414))_0x584d19=0x0;else{if(_0x557a00===_0x446e7e(0x1a0))_0x584d19=Math[_0x446e7e(0x434)]((this['innerWidth']-_0xa0dead)/0x2);else{if(_0x446e7e(0x3c6)==='CVGFH')_0x584d19=this['innerWidth']-_0xa0dead;else return this[_0x446e7e(0x2e8)]?this['_list'][_0x446e7e(0x294)]:0x3;}}let _0x503266=_0x446e7e(0x1d9);_0x37d0b0[_0x446e7e(0x4e0)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x503266=String(RegExp['$1'])['toLowerCase']()[_0x446e7e(0x3c0)]());if(_0x503266==='top')_0x18a82f=0x0;else{if(_0x503266===_0x446e7e(0x1d9)){if(_0x446e7e(0x25d)==='EZEbl')_0x18a82f=Math[_0x446e7e(0x434)]((this[_0x446e7e(0x366)]-_0x154365)/0x2);else return this[_0x446e7e(0x2e8)]?this['_list'][_0x446e7e(0x294)]:0x3;}else _0x446e7e(0x4d3)===_0x446e7e(0x4d3)?_0x18a82f=this[_0x446e7e(0x366)]-_0x154365:(_0x1ebb76=this[_0x446e7e(0x1e1)][_0x446e7e(0x2ae)](_0x23c4e5),_0x2bc7a0=this[_0x446e7e(0x314)]['param'](_0x2bcfd5),_0x40a119=this['_tempActor'][_0x446e7e(0x2ae)](_0x43a6b));}_0x37d0b0[_0x446e7e(0x4e0)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x584d19+=Number(RegExp['$1']));if(_0x37d0b0[_0x446e7e(0x4e0)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x446e7e(0x24f)==='rpwlD')_0x18a82f+=Number(RegExp['$1']);else{const _0x52f87e=this['itemLineRect'](this[_0x446e7e(0x351)]());let _0x2fa9dd=this[_0x446e7e(0x1a9)](this[_0x446e7e(0x351)]());_0x2fa9dd=_0x2fa9dd[_0x446e7e(0x2af)](/\\I\[(\d+)\]/gi,''),_0x3007a7[_0x446e7e(0x306)](),this[_0x446e7e(0x116)](_0x2fa9dd,_0x52f87e),this['commandNameWindowDrawText'](_0x2fa9dd,_0x52f87e),this[_0x446e7e(0x461)](_0x2fa9dd,_0x52f87e);}}_0x37d0b0[_0x446e7e(0x4e0)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&('MZAWm'==='IMhyn'?this[_0x446e7e(0x527)](_0x3b0d8c):(_0x584d19+=Number(RegExp['$1']),_0x18a82f+=Number(RegExp['$2'])));let _0x26195e=0xff;if(_0x37d0b0[_0x446e7e(0x4e0)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x26195e=Number(RegExp['$1']);else _0x37d0b0['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x26195e=Math['round'](Number(RegExp['$1'])*0.01*0xff)[_0x446e7e(0x11e)](0x0,0xff));_0x361846['paintOpacity']=_0x26195e,_0x361846[_0x446e7e(0x456)](_0x3408c1,0x0,0x0,_0x3408c1[_0x446e7e(0x4d5)],_0x3408c1['height'],_0x584d19,_0x18a82f,_0xa0dead,_0x154365),_0x361846[_0x446e7e(0x132)]=0xff;};