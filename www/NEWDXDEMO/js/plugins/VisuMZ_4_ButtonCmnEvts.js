//=============================================================================
// VisuStella MZ - Button Common Events
// VisuMZ_4_ButtonCmnEvts.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ButtonCmnEvts = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ButtonCommonEvents = VisuMZ.ButtonCommonEvents || {};
VisuMZ.ButtonCommonEvents.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [ButtonCommonEvents]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Button_Common_Events_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, there's only a few keys on your keyboard that perform any kind
 * of action when pressed on the map screen. This plugin allows you to bind
 * Common Events to various other keys to expand the keyboard's functionality.
 * Plugin Commands can be used during the middle of a playthrough to change up
 * which Common Events are bound to each key as well, allowing you, the game
 * dev, to have full control over which keys can be used during the map screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to bind Common Events to the number keys, alphabet keys,
 *   symbols, numpad, and more.
 * * Change which Common Events run during a playthrough.
 * * Clear Common Events from keys to remove any bindings.
 * * Show visible buttons on the screen to indicate which buttons can be
 *   pressed on the keyboard (or with the mouse on the screen).
 * * Apply icons to the visible buttons and change them over time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Compatibility Issues
 * ============================================================================
 *
 * This plugin will most likely have compatibility issues with anything that
 * alters keystrokes or makes use of them through a different manner. If you
 * are using another plugin that does something with keystrokes on the map
 * screen, the likelihood of clashing can occur if these plugins utilize the
 * same keystrokes and we will not be held accountable for that as it is
 * something within your power to change by simply picking different keys.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * In the Plugin Parameters, you will see a list of all the keys that you can
 * bind to a Common Event. If that number is something other than 0, then the
 * number associated with it will be the Common Event that will run. If you
 * assign it to a Common Event ID that does not exist, you will get an error so
 * please be wary of that.
 *
 * You may also notice that some of the keys have in parenthesis a word like
 * (OK) or (Cancel) next to them. What this means is that those keys already
 * have a function assigned to them by the game. If you assign a Common Event
 * to these keys and the 'Forbid Default Bound Keys?' Plugin Parameter is set
 * to 'false', then the native function of the key will be removed in favor of
 * the Common Event you've assigned.
 *
 * Here is a list of the keys that already have a command assigned:
 *
 * Key - What they're assigned to
 *   - Q         - Assigned to PageUp
 *   - W         - Assigned to PageDown
 *   - Shift     - Assigned to Dash
 *   - Z         - Assigned to OK
 *   - X         - Assigned to Cancel
 *   - Space     - Assigned to OK
 *   - Left      - Assigned to moving left
 *   - Up        - Assigned to moving up
 *   - Right     - Assigned to moving right
 *   - Down      - Assigned to moving down
 *   - Insert    - Assigned to Cancel
 *   - Page Up   - Assigned to PageUp
 *   - Page Down - Assigned to PageDown
 *   - Numpad 0  - Assigned to Cancel
 *   - Numpad 2  - Assigned to moving down
 *   - Numpad 4  - Assigned to moving left
 *   - Numpad 6  - Assigned to moving right
 *   - Numpad 8  - Assigned to moving up
 *
 * Once again, if you assign Common Events to these keys, the Common Event will
 * removing the binding the key had natively. However, this will only apply
 * while the player is in the field map and if the 'Forbid Default Bound Keys?'
 * Plugin Parameter is set to 'false'. Being inside of a menu or battle system
 * will restore the previously native functions.
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
 * === Assign Button-Related Notetags ===
 * 
 * ---
 *
 * <Assign Button Common Event: id>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Makes this object selectable in the Item scene or Skill scene and have it
 *   become assignable to a button slot.
 * - If the object is originally usable (ie a Healing Potion or Healing Spell),
 *   the button assignment process will take priority and override it.
 * - Replace 'id' with a number representing the ID of the Common Event you
 *   wish to assign to a button.
 * - This needs to be used together with the <Assign Button Slots: x, x, x>
 *   notetag in order to have any effect.
 *
 * ---
 *
 * <Assign Button Slot: x>
 * <Assign Button Slot: x, x, x>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Lists the keyboard keys that can be assigned a Common Event when pressed.
 * - If the object is originally usable (ie a Healing Potion or Healing Spell),
 *   the button assignment process will take priority and override it.
 * - Replace 'x' with a number or letter representing the button you wish to
 *   assign a Common Event to.
 * - This needs to be used together with the <Assign Button Common Event: id>
 *   notetag in order to have any effect.
 * - The choices that become available will be listed in the order found in
 *   this notetag.
 * - Forbidden, non-existent, and non-valid keys will be filtered out of this
 *   list and cannot be assigned a Common Event.
 * 
 *   Example:
 * 
 *   <Assign Button Slot: A, S, D, F>
 *   <Assign Button Slot: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0>
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Change Button Common Event
 * - Change the Common Event bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to change.
 *
 *   Common Event ID:
 *   - Change the Common Event bound to specific key(s).
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 *
 * ---
 * 
 * System: Change Visibility
 * - Determines whether or not buttons are shown on screen.
 * 
 *   Visible?
 *   - Show or hide the visible Button Common Events on the screen?
 * 
 * ---
 *
 * System: Clear All Button Common Events
 * - Clears Common Events from all keys.
 *
 * ---
 *
 * System: Clear Button Common Event
 * - Clears any Common Events bound to specific key(s).
 *
 *   Keys:
 *   - Select which key(s) to clear.
 *
 * ---
 *
 * System: Clear Common Event ID(s)
 * - Clears any keys with the marked Common Event ID(s).
 * 
 *   Common Event ID(s):
 *   - Clears any keys with the marked Common Event ID(s).
 *
 * ---
 * 
 * System: Run Stored Button Common Event
 * - Run the Common Event stored on a specific key.
 * 
 *   Target Key:
 *   - Run the Common Event stored in this key.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the Plugin Parameters for this plugin. They manage all the key
 * bindings and which Common Events are linked by default to which keys. These
 * links are not permanent as they can be changed/cleared with Plugin Commands.
 *
 * ---
 *
 * Restriction
 * 
 *   Forbid Default Bound Keys?:
 *   - Forbid already bound input keys?
 *   - Allowing them may cause clashes.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show On Screen?:
 *   - Show buttons on screen by default?
 * 
 *   Change Tone on Hover?:
 *   - Change the tone of the button on hover?
 * 
 *   Hover Tone:
 *   - Tone settings upon hovering.
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Button Width:
 *   - The width of the visible button on screen.
 * 
 *   Button Height:
 *   - The height of the visible button on screen.
 * 
 *   Picture Filename:
 *   - Picture used as a button background.
 *   - If left empty, ignore drawing a picture.
 * 
 *   Undeclared Icons:
 *   - If a Button Common Event doesn't have an assigned icon,
 *     use one of these instead.
 * 
 *   JS: Draw Data:
 *   - JavaScript code that determines how to draw the visible button.
 *
 * ---
 * 
 * Button Positions
 * 
 *   JS: Bottom Point:
 *   JS: Above Point:
 *   JS: Left Point:
 *   JS: Right Point:
 *   - The X and Y coordinates for where the specific side buttons start.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Assignment Settings
 * ============================================================================
 *
 * The Assignment Settings Plugin Parameters apply to whenever you use the
 * Assign Button-Related Notetags in-game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Instructions:
 *   - The instruction text that appears when assigning a Common Event to
 *     a button.
 *
 * ---
 *
 * Window
 * 
 *   Key Align:
 *   - Text alignment for the button assignment window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the button assignment window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Key Settings
 * ============================================================================
 *
 * The Key Settings allow you to adjust the Common Event you want to bind to
 * each keyboard key along with whether or not you want the said key to appear
 * visibly on the screen.
 *
 * ---
 *
 * Key Settings
 * 
 *   Common Event ID:
 *   - The default common event tied to this key.
 *   - Leave it at 0 for no common event.
 *
 * ---
 *
 * Visible Buttons
 * 
 *   Show Button?:
 *   - Show the button visibly on the screen?
 * 
 *   Requires Bind?:
 *   - If the button is shown, does it require a Common Event to be shown?
 * 
 *   Button Label:
 *   - What text do you want to display as the button label?
 * 
 *   Button Icon:
 *   - What icon do you want to show on this button?
 * 
 *   JS: Position:
 *   - The X and Y coordinates for where this button is positioned.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: September 1, 2022
 * * Bug Fixes!
 * ** System: Run Stored Button Common Event plugin command should now be
 *    working properly. Fix made by Irina.
 * 
 * Version 1.04: January 20, 2022
 * * Feature Update!
 * ** Button Common Event key presses on top of below priority touch events
 *    will only be forbidden in the context of a common event assigned to the
 *    usual OK buttons instead. Update made by Arisu.
 * 
 * Version 1.03: February 12, 2021
 * * Bug Fixes!
 * ** Pressing a Button Common Event key while stepping onto a below priority
 *    touch event will no longer give priority to the Button Common Event. Fix
 *    made by Arisu.
 * 
 * Version 1.02: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When pressing Button Common Events with the keyboard, any visible buttons
 *    on the screen will also flash their color tone briefly to show that they
 *    are being pressed. This is only if the Hover Tone Plugin Parameter is
 *    enabled. Update made by Yanfly.
 * * New Features!
 * ** New Notetags Added by Yanfly!
 * *** <Assign Button Common Event: id>
 * *** <Assign Button Slot: x, x, x>
 * ** New Plugin Command added by Yanfly!
 * *** System: Clear Common Event ID(s)
 * **** Clears any keys with the marked Common Event ID(s).
 * *** System: Run Stored Button Common Event
 * **** Run the Common Event stored on a specific key.
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Assignment Settings
 * 
 * Version 1.01: December 4, 2020
 * * Feature Update!
 * ** Plugin Command "System: Change Button Common Event" can now use code for
 *    icons. You can insert $gameVariables.value(50) in it and it will use
 *    whichever number is stored inside it as an icon. Update made by Irina.
 *
 * Version 1.00: August 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeButtonCommonEvent
 * @text System: Change Button Common Event
 * @desc Change the Common Event bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to change.
 * @default []
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Change the Common Event bound to specific key(s).
 * @default 0
 *
 * @arg Icon:eval
 * @text Button Icon
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ButtonCommonEventsVisibility
 * @text System: Change Visibility
 * @desc Determines whether or not buttons are shown on screen.
 *
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the visible Button Common Events on the screen?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearAllButtonCommonEvents
 * @text System: Clear All Button Common Events
 * @desc Clears Common Events from all keys.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEvent
 * @text System: Clear Button Common Event
 * @desc Clears any Common Events bound to specific key(s).
 *
 * @arg Keys:arraystr
 * @text Keys
 * @type combo[]
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Select which key(s) to clear.
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClearButtonCommonEventID
 * @text System: Clear Common Event ID(s)
 * @desc Clears any keys with the marked Common Event ID(s).
 *
 * @arg CommonEventID:arraynum
 * @text Common Event ID(s)
 * @type common_event[]
 * @desc Clears any keys with the marked Common Event ID(s).
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RunButtonCommonEvent
 * @text System: Run Stored Button Common Event
 * @desc Run the Common Event stored on a specific key.
 *
 * @arg Key:str
 * @text Target Key
 * @type combo
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option 
 * @option BACK_QUOTE (' ~)
 * @option MINUS (- _)
 * @option EQUALS (= +)
 * @option OPEN_BRACKET ([ {)
 * @option CLOSE_BRACKET (] })
 * @option BACK_SLASH (\ |)
 * @option SEMICOLON (; :)
 * @option QUOTE (' ")
 * @option COMMA (, <)
 * @option PERIOD (. >)
 * @option SLASH (/ ?)
 * @option 
 * @option SPACE
 * @option LEFT
 * @option UP
 * @option RIGHT
 * @option DOWN
 * @option INSERT
 * @option DELETE
 * @option HOME
 * @option END
 * @option PGUP
 * @option PGDN
 * @option 
 * @option NUMPAD0
 * @option NUMPAD1
 * @option NUMPAD2
 * @option NUMPAD3
 * @option NUMPAD4
 * @option NUMPAD5
 * @option NUMPAD6
 * @option NUMPAD7
 * @option NUMPAD8
 * @option NUMPAD9
 * @option
 * @option DECIMAL
 * @option ADD
 * @option SUBTRACT
 * @option MULTIPLY
 * @option DIVIDE
 * @desc Run the Common Event stored in this key.
 * @default 1
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
 * @param ButtonCommonEvents
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Adjust the general settings for this plugin.
 * @default {"ForbidInputKeys:eval":"true","Buttons":"","ShowButtonsOnScreen:eval":"true","ChangeTone:eval":"true","HoverTone:eval":"[128, 128, 128, 0]","ButtonWidth:num":"60","ButtonHeight:num":"60","ButtonFilename:str":"","IconsUsed:arraynum":"[\"160\",\"161\",\"162\",\"163\",\"164\",\"165\"]","DrawJS:func":"\"// Declare Constants\\nconst w = this.width;\\nconst h = this.height;\\n\\n// Draw Background\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\\n\\n// Draw Picture\\nif (this.pictureBitmap()) {\\n    const picBitmap = this.pictureBitmap();\\n    const pw = picBitmap.width;\\n    const ph = picBitmap.height;\\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\\n}\\n\\n// Draw Icon\\nconst iconIndex = this.buttonIcon();\\nconst iconBitmap = ImageManager.loadSystem(\\\"IconSet\\\");\\nconst iw = ImageManager.iconWidth;\\nconst ih = ImageManager.iconHeight;\\nconst ix = (iconIndex % 16) * iw;\\nconst iy = Math.floor(iconIndex / 16) * ih;\\nconst jw = Math.floor(this.width / iw) * iw;\\nconst jh = Math.floor(this.height / ih) * ih;\\nconst jx = Math.floor((this.width - jw) / 2);\\nconst jy = Math.floor((this.height - jh) / 2);\\nthis.bitmap._context.imageSmoothingEnabled = false;\\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\\nthis.bitmap._context.imageSmoothingEnabled = true;\\n\\n// Draw Button Label\\nconst text = this.buttonLabel();\\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');\"","Positions":"","BottomPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\\nlet y = container.height - buttonHeight;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","AbovePointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\\nlet y = container.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","LeftPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\"","RightPointJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\n// Calculate Coordinates\\nlet x = container.width;\\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param Assign:struct
 * @text Assignment Settings
 * @type struct<Assign>
 * @desc Adjust the assignment settings for this plugin.
 * @default {"Vocab":"","Instruction:str":"Assign to which button slot?","Window":"","AssignWindow_KeyAlign:str":"center","AssignWindow_RectJS:func":"\"// Declare Constants\\nconst slots = arguments[0];\\nconst cellSize = (Window_Base.prototype.lineHeight() * 2) + 8;\\n\\n// Calculate X, Y, W, H\\nlet ww = ($gameSystem.windowPadding() * 2) + (slots.length * cellSize);\\nww = ww.clamp(Graphics.boxWidth / 3, Graphics.boxWidth);\\nlet wh = this.calcWindowHeight(3, true);\\nlet wx = Math.round((Graphics.boxWidth - ww) / 2);\\nlet wy = Math.round((Graphics.boxHeight - wh) / 2);\\n\\n// Create Window Rectangle\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param NumberKeys
 * @text Number Keys
 *
 * @param KeyCode49:struct
 * @text Key: 1
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 0;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode50:struct
 * @text Key: 2
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode51:struct
 * @text Key: 3
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 2;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode52:struct
 * @text Key: 4
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 3;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode53:struct
 * @text Key: 5
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 4;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode54:struct
 * @text Key: 6
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 5;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode55:struct
 * @text Key: 7
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 6;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode56:struct
 * @text Key: 8
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 7;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode57:struct
 * @text Key: 9
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 8;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode48:struct
 * @text Key: 0
 * @parent NumberKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"true","ShowOnlyIfCePresent:eval":"false","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 9;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param LetterKeys
 * @text Letter Keys
 *
 * @param KeyCode65:struct
 * @text Key: A
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"A","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode66:struct
 * @text Key: B
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"B","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode67:struct
 * @text Key: C
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"C","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode68:struct
 * @text Key: D
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"D","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode69:struct
 * @text Key: E
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"E","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 2;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode70:struct
 * @text Key: F
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"F","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode71:struct
 * @text Key: G
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"G","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode72:struct
 * @text Key: H
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"H","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode73:struct
 * @text Key: I
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"I","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode74:struct
 * @text Key: J
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"J","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode75:struct
 * @text Key: K
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"K","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode76:struct
 * @text Key: L
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"L","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode77:struct
 * @text Key: M
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"M","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode78:struct
 * @text Key: N
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"N","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode79:struct
 * @text Key: O
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"O","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode80:struct
 * @text Key: P
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"P","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode81:struct
 * @text Key: Q (PgUp)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Q","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode82:struct
 * @text Key: R
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"R","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode83:struct
 * @text Key: S
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"S","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode84:struct
 * @text Key: T
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"T","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 4;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode85:struct
 * @text Key: U
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"U","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 6;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode86:struct
 * @text Key: V
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"V","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 3;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode87:struct
 * @text Key: W (PgDn)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"W","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode88:struct
 * @text Key: X (Cancel)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"X","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 1;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode89:struct
 * @text Key: Y
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Y","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 5;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode90:struct
 * @text Key: Z (OK)
 * @parent LetterKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Z","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 0;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param SymbolKeys
 * @text Symbol Keys
 *
 * @param KeyCode192:struct
 * @text Key: ` ~
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"~","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x - buttonWidth * 1;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode189:struct
 * @text Key: - _
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 10;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode187:struct
 * @text Key: = +
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = bottomPoint.x + buttonWidth * 11;\\nlet y = bottomPoint.y;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode219:struct
 * @text Key: [ {
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"[","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode221:struct
 * @text Key: ] }
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"]","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 11;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode220:struct
 * @text Key: \ |
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\\","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 12;\\nlet y = leftPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode186:struct
 * @text Key: ; :
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":";","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode222:struct
 * @text Key: ' "
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"\"","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 10;\\nlet y = leftPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode188:struct
 * @text Key: , <
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 7;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode190:struct
 * @text Key: . >
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 8;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode191:struct
 * @text Key: / ?
 * @parent SymbolKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"?","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = leftPoint.x + buttonWidth  * 9;\\nlet y = leftPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param MiscKeys
 * @text Misc Keys
 *
 * @param KeyCode32:struct
 * @text Key: Space (OK)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Space","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.x;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode37:struct
 * @text Key: Left (Left)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"<<","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 3;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode38:struct
 * @text Key: Up (Up)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"^","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode39:struct
 * @text Key: Right (Right)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":">>","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 1;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode40:struct
 * @text Key: Down (Down)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"v","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = container.width - buttonWidth   * 2;\\nlet y = container.height - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode45:struct
 * @text Key: Insert
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Ins","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode46:struct
 * @text Key: Delete
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Del","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 0;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode36:struct
 * @text Key: Home
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"Home","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode35:struct
 * @text Key: End
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"End","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 1;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode33:struct
 * @text Key: Page Up (PgUp)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgUp","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode34:struct
 * @text Key: Page Down (PgDn)
 * @parent MiscKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"PgDn","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = abovePoint.x + buttonWidth  * 2;\\nlet y = abovePoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param NumPadKeys
 * @text NumPad Keys
 *
 * @param KeyCode96:struct
 * @text Key: NumPad 0 (Cancel)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"0","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode97:struct
 * @text Key: NumPad 1
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"1","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode98:struct
 * @text Key: NumPad 2 (Down)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"2","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode99:struct
 * @text Key: NumPad 3
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"3","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 2;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode100:struct
 * @text Key: NumPad 4 (Left)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"4","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode101:struct
 * @text Key: NumPad 5
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"5","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode102:struct
 * @text Key: NumPad 6 (Right)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"6","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode103:struct
 * @text Key: NumPad 7
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"7","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode104:struct
 * @text Key: NumPad 8 (Up)
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"8","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode105:struct
 * @text Key: NumPad 9
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"9","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 0;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode110:struct
 * @text Key: NumPad .
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":".","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode107:struct
 * @text Key: NumPad +
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"+","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y + buttonHeight * 3;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode109:struct
 * @text Key: NumPad -
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"-","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 1;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode106:struct
 * @text Key: NumPad *
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"*","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 2;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
 *
 * @param KeyCode111:struct
 * @text Key: NumPad /
 * @parent NumPadKeys
 * @type struct<KeySettings>
 * @desc Setup the Common Event settings for this key.
 * @default {"CommonEventID:num":"0","Buttons":"","ShowButton:eval":"false","ShowOnlyIfCePresent:eval":"true","ButtonText:str":"/","ButtonIcon:num":"0","PositionJS:func":"\"// Declare Constants\\nconst container = this;\\nconst buttonWidth = this.buttonWidth();\\nconst buttonHeight = this.buttonHeight();\\n\\nconst bottomPoint = this.bottomPoint();\\nconst abovePoint = this.abovePoint();\\nconst leftPoint = this.leftPoint();\\nconst rightPoint = this.rightPoint();\\n\\n// Calculate Coordinates\\nlet x = rightPoint.x - buttonWidth  * 3;\\nlet y = rightPoint.y - buttonHeight * 1;\\n\\n// Return Coordinates\\nreturn new Point(x, y);\""}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param ForbidInputKeys:eval
 * @text Forbid Default Keys?
 * @parent Forbidden
 * @type boolean
 * @on Forbid
 * @off Allow
 * @desc Forbid already bound input keys?
 * Allowing them may cause clashes.
 * @default true
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButtonsOnScreen:eval
 * @text Show On Screen?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show buttons on screen by default?
 * @default true
 *
 * @param ChangeTone:eval
 * @text Change Tone on Hover?
 * @parent Buttons
 * @type boolean
 * @on Change Tone
 * @off Don't Change
 * @desc Change the tone of the button on hover?
 * @default true
 *
 * @param HoverTone:eval
 * @text Hover Tone
 * @parent ChangeTone:eval
 * @desc Tone settings upon hovering.
 * Format: [Red, Green, Blue, Gray]
 * @default [128, 128, 128, 0]
 *
 * @param ButtonWidth:num
 * @text Button Width
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The width of the visible button on screen.
 * @default 80
 *
 * @param ButtonHeight:num
 * @text Button Height
 * @parent Buttons
 * @type number
 * @min 1
 * @desc The height of the visible button on screen.
 * @default 80
 *
 * @param ButtonFilename:str
 * @text Picture Filename
 * @parent Buttons
 * @type file
 * @dir img/pictures/
 * @desc Picture used as a button background.
 * If left empty, ignore drawing a picture.
 * @default 
 *
 * @param IconsUsed:arraynum
 * @text Undeclared Icons
 * @parent Buttons
 * @type string[]
 * @desc If a Button Common Event doesn't have an assigned icon, use one of these instead.
 * @default ["160","161","162","163","164","165"]
 *
 * @param DrawJS:func
 * @text JS: Draw Data
 * @parent Buttons
 * @type note
 * @desc JavaScript code that determines how to draw the visible button.
 * @default "// Declare Constants\nconst w = this.width;\nconst h = this.height;\n\n// Draw Background\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nthis.bitmap.gradientFillRect(1, 1, w-2, h-2, c1, c2, true);\nthis.bitmap.strokeRect(1, 1, w-2, h-2, '#000000');\n\n// Draw Picture\nif (this.pictureBitmap()) {\n    const picBitmap = this.pictureBitmap();\n    const pw = picBitmap.width;\n    const ph = picBitmap.height;\n    this.bitmap.blt(picBitmap, 0, 0, pw, ph, 0, 0, w, h);\n}\n\n// Draw Icon\nconst iconIndex = this.buttonIcon();\nconst iconBitmap = ImageManager.loadSystem(\"IconSet\");\nconst iw = ImageManager.iconWidth;\nconst ih = ImageManager.iconHeight;\nconst ix = (iconIndex % 16) * iw;\nconst iy = Math.floor(iconIndex / 16) * ih;\nconst jw = Math.floor(this.width / iw) * iw;\nconst jh = Math.floor(this.height / ih) * ih;\nconst jx = Math.floor((this.width - jw) / 2);\nconst jy = Math.floor((this.height - jh) / 2);\nthis.bitmap._context.imageSmoothingEnabled = false;\nthis.bitmap.blt(iconBitmap, ix, iy, iw, ih, jx, jy, jw, jh);\nthis.bitmap._context.imageSmoothingEnabled = true;\n\n// Draw Button Label\nconst text = this.buttonLabel();\nthis.bitmap.fontFace = $gameSystem.numberFontFace();\nthis.bitmap.fontSize = $gameSystem.mainFontSize();\nthis.bitmap.drawText(text, 0, 0, w, this.bitmap.fontSize + 4, 'center');"
 * 
 * @param Positions
 * @text Button Positions
 *
 * @param BottomPointJS:func
 * @text JS: Bottom Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the bottom buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - buttonWidth * 5;\nlet y = container.height - buttonHeight;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param AbovePointJS:func
 * @text JS: Above Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the uppoer buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = Math.floor(container.width / 2) - Math.floor(buttonWidth * 1.5);\nlet y = container.y;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param LeftPointJS:func
 * @text JS: Left Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the left-side buttons start.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.x;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 * @param RightPointJS:func
 * @text JS: Right Point
 * @parent Positions
 * @type note
 * @desc The X and Y coordinates for where the right-side buttons end.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\n// Calculate Coordinates\nlet x = container.width;\nlet y = Math.floor(container.height / 2) - Math.floor(buttonHeight * 1.5);\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Assign Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Assign:
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param Instruction:str
 * @text Instructions
 * @parent Vocab
 * @desc The instruction text that appears when assigning a Common Event to a button.
 * @default Assign to which button slot?
 * 
 * @param Window
 *
 * @param AssignWindow_KeyAlign:str
 * @text Key Align
 * @parent Window
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the button assignment window?
 * @default center
 *
 * @param AssignWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window
 * @type note
 * @desc Code used to determine the dimensions for the button assignment window.
 * @default {"Vocab":"","Instruction:str":"Assign to which button slot?","Window":"","AssignWindow_KeyAlign:str":"center","AssignWindow_RectJS:func":"\"// Declare Constants\\nconst slots = arguments[0];\\nconst cellSize = (Window_Base.prototype.lineHeight() * 2) + 8;\\n\\n// Calculate X, Y, W, H\\nlet ww = ($gameSystem.windowPadding() * 2) + (slots.length * cellSize);\\nww = ww.clamp(Graphics.boxWidth / 3, Graphics.boxWidth);\\nlet wh = this.calcWindowHeight(3, true);\\nlet wx = Math.round((Graphics.boxWidth - ww) / 2);\\nlet wy = Math.round((Graphics.boxHeight - wh) / 2);\\n\\n// Create Window Rectangle\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Key Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeySettings:
 *
 * @param CommonEventID:num
 * @text Common Event ID
 * @parent NeededData
 * @type common_event
 * @desc The default common event tied to this key.
 * Leave it at 0 for no common event.
 * @default 0
 * 
 * @param Buttons
 * @text Visible Buttons
 *
 * @param ShowButton:eval
 * @text Show Button?
 * @parent Buttons
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the button visibly on the screen?
 * @default false
 *
 * @param ShowOnlyIfCePresent:eval
 * @text Requires Bind?
 * @parent ShowButton:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If the button is shown, does it require a Common Event to be shown?
 * @default true
 *
 * @param ButtonText:str
 * @text Button Label
 * @parent Buttons
 * @desc What text do you want to display as the button label?
 * @default Untitled
 *
 * @param ButtonIcon:num
 * @text Button Icon
 * @parent Buttons
 * @desc What icon do you want to show on this button?
 * @default 0
 *
 * @param PositionJS:func
 * @text JS: Position
 * @parent Buttons
 * @type note
 * @desc The X and Y coordinates for where this button is positioned.
 * @default "// Declare Constants\nconst container = this;\nconst buttonWidth = this.buttonWidth();\nconst buttonHeight = this.buttonHeight();\n\nconst bottomPoint = this.bottomPoint();\nconst abovePoint = this.abovePoint();\nconst leftPoint = this.leftPoint();\nconst rightPoint = this.rightPoint();\n\n// Calculate Coordinates\nlet x = 0;\nlet y = 0;\n\n// Return Coordinates\nreturn new Point(x, y);"
 *
 */
//=============================================================================

const _0x251032=_0x2336;(function(_0x5c4910,_0x3fb44f){const _0x553c44=_0x2336,_0x45916f=_0x5c4910();while(!![]){try{const _0x2ce21e=-parseInt(_0x553c44(0x118))/0x1+parseInt(_0x553c44(0x168))/0x2+-parseInt(_0x553c44(0x145))/0x3+parseInt(_0x553c44(0x1cf))/0x4+-parseInt(_0x553c44(0x1da))/0x5+-parseInt(_0x553c44(0x1c2))/0x6*(parseInt(_0x553c44(0x1d2))/0x7)+parseInt(_0x553c44(0x1e8))/0x8;if(_0x2ce21e===_0x3fb44f)break;else _0x45916f['push'](_0x45916f['shift']());}catch(_0x5de133){_0x45916f['push'](_0x45916f['shift']());}}}(_0x5f42,0x6f496));var label=_0x251032(0x18f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x251032(0x179)](function(_0x30c63b){const _0x105642=_0x251032;return _0x30c63b['status']&&_0x30c63b[_0x105642(0xbc)][_0x105642(0x1a6)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x251032(0x147)]||{},VisuMZ['ConvertParams']=function(_0x37dfbd,_0x4ad4b7){const _0x162362=_0x251032;for(const _0x584a83 in _0x4ad4b7){if(_0x162362(0xaf)!==_0x162362(0x194)){if(_0x584a83[_0x162362(0x1f1)](/(.*):(.*)/i)){if('KzFvF'===_0x162362(0xd7)){_0x88512b['ConvertParams'](_0x513ab0,_0x18a015);const _0xb0b71=_0x112fc1[_0x162362(0xfe)],_0x49031b=_0x200e6e[_0x162362(0x1e3)],_0x303112=_0x4572b9[_0x162362(0xba)];for(let _0x348b48 of _0xb0b71){_0x348b48=_0x348b48[_0x162362(0x19e)](/\s*\(.*?\)\s*/g,'')['toUpperCase']()[_0x162362(0x154)]();const _0x362909=_0x33e55a[_0x162362(0x1c4)]['indexOf'](_0x348b48);_0x362909>0x0&&(_0x27bfd3[_0x162362(0x13e)](_0x362909,_0x49031b),_0x49f52e[_0x162362(0x18d)](_0x362909,_0x303112));}}else{const _0x595f46=String(RegExp['$1']),_0x322503=String(RegExp['$2'])['toUpperCase']()[_0x162362(0x154)]();let _0x162392,_0x4ca279,_0x246021;switch(_0x322503){case _0x162362(0x174):_0x162392=_0x4ad4b7[_0x584a83]!==''?Number(_0x4ad4b7[_0x584a83]):0x0;break;case _0x162362(0x181):_0x4ca279=_0x4ad4b7[_0x584a83]!==''?JSON[_0x162362(0x1c9)](_0x4ad4b7[_0x584a83]):[],_0x162392=_0x4ca279['map'](_0x23b15f=>Number(_0x23b15f));break;case _0x162362(0x1e1):_0x162392=_0x4ad4b7[_0x584a83]!==''?eval(_0x4ad4b7[_0x584a83]):null;break;case'ARRAYEVAL':_0x4ca279=_0x4ad4b7[_0x584a83]!==''?JSON[_0x162362(0x1c9)](_0x4ad4b7[_0x584a83]):[],_0x162392=_0x4ca279[_0x162362(0x1cc)](_0x267fdc=>eval(_0x267fdc));break;case _0x162362(0xb1):_0x162392=_0x4ad4b7[_0x584a83]!==''?JSON[_0x162362(0x1c9)](_0x4ad4b7[_0x584a83]):'';break;case _0x162362(0x1ab):_0x4ca279=_0x4ad4b7[_0x584a83]!==''?JSON[_0x162362(0x1c9)](_0x4ad4b7[_0x584a83]):[],_0x162392=_0x4ca279[_0x162362(0x1cc)](_0x160d34=>JSON[_0x162362(0x1c9)](_0x160d34));break;case _0x162362(0xbd):_0x162392=_0x4ad4b7[_0x584a83]!==''?new Function(JSON['parse'](_0x4ad4b7[_0x584a83])):new Function(_0x162362(0xc3));break;case _0x162362(0x117):_0x4ca279=_0x4ad4b7[_0x584a83]!==''?JSON[_0x162362(0x1c9)](_0x4ad4b7[_0x584a83]):[],_0x162392=_0x4ca279['map'](_0x4554e8=>new Function(JSON[_0x162362(0x1c9)](_0x4554e8)));break;case'STR':_0x162392=_0x4ad4b7[_0x584a83]!==''?String(_0x4ad4b7[_0x584a83]):'';break;case _0x162362(0x90):_0x4ca279=_0x4ad4b7[_0x584a83]!==''?JSON[_0x162362(0x1c9)](_0x4ad4b7[_0x584a83]):[],_0x162392=_0x4ca279[_0x162362(0x1cc)](_0x4b1836=>String(_0x4b1836));break;case'STRUCT':_0x246021=_0x4ad4b7[_0x584a83]!==''?JSON[_0x162362(0x1c9)](_0x4ad4b7[_0x584a83]):{},_0x162392=VisuMZ[_0x162362(0xd3)]({},_0x246021);break;case _0x162362(0x12a):_0x4ca279=_0x4ad4b7[_0x584a83]!==''?JSON[_0x162362(0x1c9)](_0x4ad4b7[_0x584a83]):[],_0x162392=_0x4ca279[_0x162362(0x1cc)](_0x2696c4=>VisuMZ[_0x162362(0xd3)]({},JSON[_0x162362(0x1c9)](_0x2696c4)));break;default:continue;}_0x37dfbd[_0x595f46]=_0x162392;}}}else this['initialize'](...arguments);}return _0x37dfbd;},(_0x55fcab=>{const _0x5a0b43=_0x251032,_0x55862b=_0x55fcab['name'];for(const _0x5c69b3 of dependencies){if(_0x5a0b43(0x128)==='OQAdC'){if(!Imported[_0x5c69b3]){if('pRALc'===_0x5a0b43(0xe2)){if(!this[_0x5a0b43(0xe7)]())return![];if(this[_0x5a0b43(0x108)]()<=0x0)return![];return!![];}else{alert(_0x5a0b43(0xcc)['format'](_0x55862b,_0x5c69b3)),SceneManager[_0x5a0b43(0x180)]();break;}}}else{_0x125452=_0x4babcb[_0x5a0b43(0x19e)](/\s*\(.*?\)\s*/g,'')[_0x5a0b43(0xdc)]()[_0x5a0b43(0x154)]();const _0x4f47b5=_0x21fd9e['stringKeyMap'][_0x5a0b43(0xac)](_0x552b3f);_0x4f47b5>0x0&&(_0x5789f4['setButtonCommonEvent'](_0x4f47b5,_0x1cd35a),_0x4bc695[_0x5a0b43(0x18d)](_0x4f47b5,_0x4a9769));}}const _0x5454a4=_0x55fcab[_0x5a0b43(0xbc)];if(_0x5454a4[_0x5a0b43(0x1f1)](/\[Version[ ](.*?)\]/i)){const _0x159ad1=Number(RegExp['$1']);_0x159ad1!==VisuMZ[label]['version']&&(alert(_0x5a0b43(0x14e)[_0x5a0b43(0x17a)](_0x55862b,_0x159ad1)),SceneManager[_0x5a0b43(0x180)]());}if(_0x5454a4[_0x5a0b43(0x1f1)](/\[Tier[ ](\d+)\]/i)){const _0x311f2a=Number(RegExp['$1']);if(_0x311f2a<tier)alert(_0x5a0b43(0x15c)['format'](_0x55862b,_0x311f2a,tier)),SceneManager[_0x5a0b43(0x180)]();else{if(_0x5a0b43(0x15a)===_0x5a0b43(0xf8)){_0x3237b7[_0x5a0b43(0xd3)](_0x386b21,_0x5c86ad);let _0x8ca9e6=_0x293ee6[_0x5a0b43(0xf7)]['toUpperCase']()[_0x5a0b43(0x154)]();_0x8ca9e6=_0x8ca9e6[_0x5a0b43(0x19e)](/\s*\(.*?\)\s*/g,'')[_0x5a0b43(0xdc)]()[_0x5a0b43(0x154)]();const _0x4782fc=_0x579166[_0x5a0b43(0x1c4)][_0x5a0b43(0xac)](_0x8ca9e6),_0x53612f=_0x2e4c4e[_0x5a0b43(0x1f4)](_0x4782fc);_0x53612f>0x0&&_0x3e467e[_0x5a0b43(0x1df)](_0x53612f);}else tier=Math[_0x5a0b43(0x1dc)](_0x311f2a,tier);}}VisuMZ[_0x5a0b43(0xd3)](VisuMZ[label]['Settings'],_0x55fcab[_0x5a0b43(0xc5)]);})(pluginData),PluginManager[_0x251032(0xf3)](pluginData[_0x251032(0x197)],'ChangeButtonCommonEvent',_0x5a8e1e=>{const _0x5f4b89=_0x251032;VisuMZ[_0x5f4b89(0xd3)](_0x5a8e1e,_0x5a8e1e);const _0x57f8d1=_0x5a8e1e[_0x5f4b89(0xfe)],_0x1661c6=_0x5a8e1e['CommonEventID'],_0x41f7e7=_0x5a8e1e[_0x5f4b89(0xba)];for(let _0x3f3904 of _0x57f8d1){_0x3f3904=_0x3f3904['replace'](/\s*\(.*?\)\s*/g,'')['toUpperCase']()[_0x5f4b89(0x154)]();const _0x37a77d=TextManager[_0x5f4b89(0x1c4)][_0x5f4b89(0xac)](_0x3f3904);if(_0x37a77d>0x0){if(_0x5f4b89(0x1be)===_0x5f4b89(0x1be))$gameSystem[_0x5f4b89(0x13e)](_0x37a77d,_0x1661c6),$gameSystem[_0x5f4b89(0x18d)](_0x37a77d,_0x41f7e7);else{if(!this[_0x5f4b89(0x1c0)]())return![];if(_0x219794[_0x5f4b89(0xa8)]())return![];if(_0x273d7a['isSceneChanging']())return![];if(_0x79aafe[_0x5f4b89(0xa2)][_0x1a1120]==='ok'){if(_0x3d9f45['checkEventTriggerTouchInForwardLocation']())return![];}return!![];}}}}),PluginManager[_0x251032(0xf3)](pluginData[_0x251032(0x197)],_0x251032(0xbb),_0x9b3839=>{const _0x49106e=_0x251032;VisuMZ[_0x49106e(0xd3)](_0x9b3839,_0x9b3839);const _0x71b374=_0x9b3839['Visible'];$gameSystem['setShowButtonCommonEventButtons'](_0x71b374);}),PluginManager[_0x251032(0xf3)](pluginData['name'],'ClearButtonCommonEvent',_0x468d29=>{const _0x238c19=_0x251032;VisuMZ[_0x238c19(0xd3)](_0x468d29,_0x468d29);const _0x3cf32a=_0x468d29[_0x238c19(0xfe)];for(let _0x365201 of _0x3cf32a){if(_0x238c19(0x1a2)===_0x238c19(0x186)){if(this[_0x238c19(0xf5)]<0xff)return![];return this[_0x238c19(0x162)]()>0x0;}else{_0x365201=_0x365201[_0x238c19(0x19e)](/\s*\(.*?\)\s*/g,'')[_0x238c19(0xdc)]()[_0x238c19(0x154)]();const _0x4d4a57=TextManager[_0x238c19(0x1c4)][_0x238c19(0xac)](_0x365201);if(_0x4d4a57>0x0)$gameSystem[_0x238c19(0x13e)](_0x4d4a57,0x0);}}}),PluginManager[_0x251032(0xf3)](pluginData['name'],_0x251032(0x195),_0x1b2e54=>{const _0x29ab2f=_0x251032;$gameSystem[_0x29ab2f(0x9c)]={};}),PluginManager[_0x251032(0xf3)](pluginData[_0x251032(0x197)],_0x251032(0xc6),_0x17ed16=>{const _0x295b8f=_0x251032;VisuMZ[_0x295b8f(0xd3)](_0x17ed16,_0x17ed16);const _0x1982ec=_0x17ed16['CommonEventID'];for(const _0x4a357e of _0x1982ec){$gameSystem[_0x295b8f(0x1b3)](_0x4a357e);}}),PluginManager[_0x251032(0xf3)](pluginData[_0x251032(0x197)],'RunButtonCommonEvent',_0xdde5c2=>{const _0x1758af=_0x251032;VisuMZ[_0x1758af(0xd3)](_0xdde5c2,_0xdde5c2);let _0x51e517=_0xdde5c2[_0x1758af(0xf7)]['toUpperCase']()['trim']();_0x51e517=_0x51e517['replace'](/\s*\(.*?\)\s*/g,'')[_0x1758af(0xdc)]()['trim']();const _0x35d0e4=TextManager[_0x1758af(0x1c4)][_0x1758af(0xac)](_0x51e517),_0x114c40=$gameSystem[_0x1758af(0x1f4)](_0x35d0e4);_0x114c40>0x0&&$gameTemp[_0x1758af(0x1df)](_0x114c40);}),VisuMZ[_0x251032(0x18f)][_0x251032(0x114)]={'AssignCommonEvent':/<ASSIGN BUTTON COMMON EVENT:[ ](.*)>/i,'AssignButtonSlots':/<ASSIGN BUTTON (?:SLOT|SLOTS):[ ](.*)>/i},VisuMZ[_0x251032(0x18f)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x251032(0x158)]['onDatabaseLoaded'],Scene_Boot[_0x251032(0x158)]['onDatabaseLoaded']=function(){const _0x30bfa1=_0x251032;VisuMZ[_0x30bfa1(0x18f)]['Scene_Boot_onDatabaseLoaded'][_0x30bfa1(0xcd)](this),this[_0x30bfa1(0xd5)](),ImageManager[_0x30bfa1(0x172)]();},Scene_Boot[_0x251032(0x158)][_0x251032(0xd5)]=function(){const _0x21d739=_0x251032,_0x25a066=[];for(let _0x3b4a0f=0x30;_0x3b4a0f<=0x39;_0x3b4a0f++){if(_0x21d739(0xda)!=='eyJDe')_0x25a066[_0x21d739(0xf2)](_0x3b4a0f);else{const _0x410eeb=_0x4e8cb7[_0x21d739(0x1c4)][_0x21d739(0xac)](_0xb0a95b);_0x414910[_0x21d739(0x1f4)](_0x410eeb)===this['_commonEventID']&&(_0x157c5a=this[_0x21d739(0xeb)][_0x21d739(0xac)](_0x1d9825));}}for(let _0x33b6ff=0x41;_0x33b6ff<=0x5a;_0x33b6ff++){_0x25a066[_0x21d739(0xf2)](_0x33b6ff);}for(let _0x2644b5=0xba;_0x2644b5<=0xc0;_0x2644b5++){_0x25a066[_0x21d739(0xf2)](_0x2644b5);}for(let _0x254cc3=0xdb;_0x254cc3<=0xde;_0x254cc3++){_0x21d739(0x192)===_0x21d739(0xe8)?(this[_0x21d739(0x13e)](_0x1388e6,_0x35e4fa[_0x1afd0a]['CommonEventID']),this[_0x21d739(0x18d)](_0x749f0f,_0x35bd79[_0x346aab][_0x21d739(0x176)])):_0x25a066[_0x21d739(0xf2)](_0x254cc3);}for(let _0x324d46=0x20;_0x324d46<=0x28;_0x324d46++){_0x25a066[_0x21d739(0xf2)](_0x324d46);}for(let _0x182f66=0x2d;_0x182f66<=0x2e;_0x182f66++){_0x25a066[_0x21d739(0xf2)](_0x182f66);}for(let _0xd16141=0x60;_0xd16141<=0x6f;_0xd16141++){'KNPnr'===_0x21d739(0x12e)?(this[_0x21d739(0xaa)](_0x2bb76d),this[_0x21d739(0x140)](_0x230e89)):_0x25a066[_0x21d739(0xf2)](_0xd16141);}VisuMZ[_0x21d739(0x18f)][_0x21d739(0x9b)]=_0x25a066;},Input[_0x251032(0x1fc)]=function(_0x3929ca){const _0x1e24e8=_0x251032;if(!VisuMZ[_0x1e24e8(0x18f)][_0x1e24e8(0x147)][_0x1e24e8(0x17e)][_0x1e24e8(0x112)])return![];return!!Input['keyMapper'][_0x3929ca];},ImageManager['loadButtomCommonEventImage']=function(){const _0x538991=_0x251032,_0xaff99c=VisuMZ['ButtonCommonEvents'][_0x538991(0x147)][_0x538991(0x17e)][_0x538991(0xf6)];this[_0x538991(0xd2)]=_0xaff99c?ImageManager[_0x538991(0x11f)](_0xaff99c):new Bitmap(0x1,0x1);},TextManager[_0x251032(0x1c4)]=['','','',_0x251032(0x17f),'','',_0x251032(0x17d),'',_0x251032(0xe3),_0x251032(0x1b6),'','',_0x251032(0x136),_0x251032(0x146),_0x251032(0xab),'',_0x251032(0x189),_0x251032(0xd6),_0x251032(0xc8),_0x251032(0x123),_0x251032(0x119),_0x251032(0xe6),_0x251032(0x1ba),_0x251032(0x16d),_0x251032(0xd9),'HANJA','',_0x251032(0x153),_0x251032(0xdb),_0x251032(0x13c),'ACCEPT','MODECHANGE',_0x251032(0xce),'PGUP','PGDN',_0x251032(0x91),_0x251032(0xf1),_0x251032(0xee),'UP',_0x251032(0x130),_0x251032(0x1c7),_0x251032(0x1f3),_0x251032(0xfb),_0x251032(0x165),'PRINTSCREEN',_0x251032(0xa6),_0x251032(0x1ef),'','0','1','2','3','4','5','6','7','8','9',_0x251032(0x1b7),_0x251032(0x1ca),_0x251032(0x14d),_0x251032(0x15e),_0x251032(0x1b4),_0x251032(0x110),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x251032(0x1fb),'',_0x251032(0xa1),'','SLEEP','NUMPAD0',_0x251032(0xa9),_0x251032(0x11a),_0x251032(0xc9),_0x251032(0x18b),_0x251032(0x187),_0x251032(0xb4),_0x251032(0x141),_0x251032(0x8e),'NUMPAD9',_0x251032(0x96),_0x251032(0xb9),'SEPARATOR','SUBTRACT','DECIMAL',_0x251032(0x1bc),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x251032(0x9a),'F11',_0x251032(0x106),_0x251032(0x1c6),_0x251032(0x113),_0x251032(0x126),_0x251032(0x1a0),_0x251032(0x1b5),'F18','F19',_0x251032(0x125),_0x251032(0xb2),_0x251032(0x132),_0x251032(0x16c),_0x251032(0x1e2),'','','','','','','','',_0x251032(0x17c),'SCROLL_LOCK',_0x251032(0x1a5),'WIN_OEM_FJ_MASSHOU','WIN_OEM_FJ_TOUROKU',_0x251032(0x9f),'WIN_OEM_FJ_ROYA','','','','','','','','','',_0x251032(0x14f),'EXCLAMATION',_0x251032(0x104),_0x251032(0xbf),_0x251032(0x1cb),_0x251032(0x1f8),'AMPERSAND',_0x251032(0x191),_0x251032(0xa4),'CLOSE_PAREN',_0x251032(0x161),_0x251032(0x1c8),_0x251032(0x17b),_0x251032(0x19c),_0x251032(0x133),'CLOSE_CURLY_BRACKET','TILDE','','','','','VOLUME_MUTE',_0x251032(0x19b),_0x251032(0x166),'','',_0x251032(0x1ca),_0x251032(0x15e),'COMMA','MINUS',_0x251032(0x157),'SLASH',_0x251032(0x122),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x251032(0xb6),_0x251032(0x1ea),'CLOSE_BRACKET',_0x251032(0x14c),'','META','ALTGR','','WIN_ICO_HELP',_0x251032(0x160),'',_0x251032(0x16b),'','',_0x251032(0xe0),_0x251032(0x163),_0x251032(0x159),_0x251032(0x131),_0x251032(0xbe),_0x251032(0xe5),'WIN_OEM_CUSEL',_0x251032(0xef),_0x251032(0x1e5),_0x251032(0x1b9),'WIN_OEM_AUTO',_0x251032(0x116),_0x251032(0x121),'ATTN',_0x251032(0x1d6),'EXSEL','EREOF',_0x251032(0x1e0),_0x251032(0x138),'','PA1',_0x251032(0x10b),''],VisuMZ[_0x251032(0x18f)][_0x251032(0x11c)]=SceneManager[_0x251032(0xc1)],SceneManager['onKeyDown']=function(_0x218bc0){const _0x16a35c=_0x251032;this[_0x16a35c(0x12c)]()&&this['isKeyButtonCommonEventValid'](_0x218bc0)&&this[_0x16a35c(0xfa)][_0x16a35c(0x9e)](_0x218bc0['keyCode']),VisuMZ[_0x16a35c(0x18f)][_0x16a35c(0x11c)]['call'](this,_0x218bc0);},SceneManager[_0x251032(0x12c)]=function(){const _0x97d7fe=_0x251032;return this[_0x97d7fe(0xfa)]&&this['_scene'][_0x97d7fe(0x99)]===Scene_Map;},SceneManager[_0x251032(0x134)]=function(_0x15ff16){const _0x277ce3=_0x251032;return!Input[_0x277ce3(0x1fc)](_0x15ff16[_0x277ce3(0x199)]);},VisuMZ[_0x251032(0x18f)][_0x251032(0x1b8)]=Game_System[_0x251032(0x158)][_0x251032(0x164)],Game_System[_0x251032(0x158)]['initialize']=function(){const _0x256d48=_0x251032;VisuMZ[_0x256d48(0x18f)][_0x256d48(0x1b8)][_0x256d48(0xcd)](this),this[_0x256d48(0x184)]();},Game_System[_0x251032(0x158)][_0x251032(0x184)]=function(){const _0x306586=_0x251032;this[_0x306586(0x9c)]={},this[_0x306586(0x10f)]={},this['_buttonCommonEventShowButtons']=VisuMZ['ButtonCommonEvents'][_0x306586(0x147)][_0x306586(0x17e)][_0x306586(0x95)],this[_0x306586(0x13a)]();},Game_System[_0x251032(0x158)][_0x251032(0x13a)]=function(){const _0x539946=_0x251032,_0x4b5b86=VisuMZ['ButtonCommonEvents'][_0x539946(0x147)],_0x38441a=_0x539946(0x1aa);for(const _0x56f345 of VisuMZ[_0x539946(0x18f)][_0x539946(0x9b)]){const _0x281f35=_0x38441a[_0x539946(0x17a)](_0x56f345);if(!!_0x4b5b86[_0x281f35]){if(_0x539946(0xc7)!==_0x539946(0xc7))return _0x30fc4d[_0x539946(0x18f)][_0x539946(0x169)](_0x2ad57b)?!![]:_0x4dd4ea['ButtonCommonEvents'][_0x539946(0x107)][_0x539946(0xcd)](this,_0x2d7bec);else this[_0x539946(0x13e)](_0x56f345,_0x4b5b86[_0x281f35][_0x539946(0x1e3)]),this[_0x539946(0x18d)](_0x56f345,_0x4b5b86[_0x281f35]['ButtonIcon']);}}},Game_System[_0x251032(0x158)][_0x251032(0x1f4)]=function(_0x3f1b23){const _0xb49a68=_0x251032;if(this[_0xb49a68(0x9c)]===undefined)this['initButtonCommonEvents']();return this[_0xb49a68(0x9c)][_0x3f1b23]||0x0;},Game_System[_0x251032(0x158)]['setButtonCommonEvent']=function(_0x1d4b92,_0x144d1f){const _0x50cf33=_0x251032;if(this[_0x50cf33(0x9c)]===undefined)this['initButtonCommonEvents']();if($gameTemp[_0x50cf33(0x1b0)]()&&Input['isButtonCommonEventForbidden'](_0x1d4b92)&&_0x144d1f!==0x0){const _0x2ddadb='!!\x20ERROR\x20VisuMZ_4_ButtonCmnEvts\x20ERROR\x20!!\x0aKey\x20%1\x20cannot\x20be\x20bound!\x0aIt\x20is\x20a\x20forbidden\x20keybased\x20on\x0ayour\x20Plugin\x20Parameter\x20settings!'['format'](TextManager['stringKeyMap'][_0x1d4b92]);alert(_0x2ddadb);return;}this['_buttonCommonEventKeyCodes'][_0x1d4b92]=_0x144d1f;},Game_System[_0x251032(0x158)][_0x251032(0xaa)]=function(_0x16b834){const _0x343eb1=_0x251032;if(this[_0x343eb1(0x9c)]===undefined)this[_0x343eb1(0x184)]();delete this[_0x343eb1(0x9c)][_0x16b834];},Game_System['prototype'][_0x251032(0x1af)]=function(_0x3def1e){const _0x3b3edb=_0x251032;if(this[_0x3b3edb(0x10f)]===undefined)this['initButtonCommonEvents']();return this[_0x3b3edb(0x10f)][_0x3def1e]||0x0;},Game_System[_0x251032(0x158)]['setButtonCommonEventIcon']=function(_0x1d6349,_0x1364fd){const _0x3576ca=_0x251032;if(this[_0x3576ca(0x10f)]===undefined)this[_0x3576ca(0x184)]();this[_0x3576ca(0x10f)][_0x1d6349]=_0x1364fd;},Game_System[_0x251032(0x158)][_0x251032(0x140)]=function(_0x15fca4){const _0x330aa6=_0x251032;if(this['_buttonCommonEventIcons']===undefined)this['initButtonCommonEvents']();delete this[_0x330aa6(0x10f)][_0x15fca4];},Game_System['prototype'][_0x251032(0x111)]=function(){const _0x3a139b=_0x251032;if(this[_0x3a139b(0x13d)]===undefined)this['initButtonCommonEvents']();return this[_0x3a139b(0x13d)];},Game_System['prototype'][_0x251032(0x183)]=function(_0x37a0cf){const _0x124dc2=_0x251032;if(this[_0x124dc2(0x13d)]===undefined)this[_0x124dc2(0x184)]();this[_0x124dc2(0x13d)]=_0x37a0cf;},Game_System['prototype'][_0x251032(0x1b3)]=function(_0x33095b){const _0x5c98fc=_0x251032;for(const _0x3c98d2 of VisuMZ['ButtonCommonEvents']['KeysArray']){if(_0x5c98fc(0x175)!==_0x5c98fc(0x1fa)){if(this[_0x5c98fc(0x1f4)](_0x3c98d2)===_0x33095b){if(_0x5c98fc(0x170)===_0x5c98fc(0x11e)){const _0x22df35=_0x55fb08['ButtonCommonEvents'][_0x5c98fc(0x147)],_0x574304='KeyCode%1';for(const _0x226e3b of _0x498063['ButtonCommonEvents']['KeysArray']){const _0x486abf=_0x574304[_0x5c98fc(0x17a)](_0x226e3b);!!_0x22df35[_0x486abf]&&(this[_0x5c98fc(0x13e)](_0x226e3b,_0x22df35[_0x486abf]['CommonEventID']),this[_0x5c98fc(0x18d)](_0x226e3b,_0x22df35[_0x486abf][_0x5c98fc(0x176)]));}}else this[_0x5c98fc(0xaa)](_0x3c98d2),this['clearButtonCommonEventIcon'](_0x3c98d2);}}else{if(this[_0x5c98fc(0x13d)]===_0x117a05)this[_0x5c98fc(0x184)]();return this['_buttonCommonEventShowButtons'];}}},VisuMZ[_0x251032(0x18f)]['Scene_Map_createSpriteset']=Scene_Map[_0x251032(0x158)][_0x251032(0x1f5)],Scene_Map[_0x251032(0x158)][_0x251032(0x1f5)]=function(){const _0x490dd6=_0x251032;VisuMZ[_0x490dd6(0x18f)][_0x490dd6(0x97)][_0x490dd6(0xcd)](this),this[_0x490dd6(0x15d)]();},Scene_Map['prototype'][_0x251032(0x15d)]=function(){const _0x13d9d4=_0x251032;if(this[_0x13d9d4(0x99)]!==Scene_Map)return;this[_0x13d9d4(0x11b)]=new Sprite_ButtonCommonEventsContainer(),this['addChild'](this[_0x13d9d4(0x11b)]);},Scene_Map['prototype'][_0x251032(0x9e)]=function(_0x3cb5f2){const _0x5c5acb=_0x251032;if(!this[_0x5c5acb(0xed)](_0x3cb5f2))return;if($gameMap&&$gameMap['isEventRunning']())return;const _0x5e5811=$gameSystem[_0x5c5acb(0x1f4)](_0x3cb5f2)||0x0;_0x5e5811>0x0&&$dataCommonEvents[_0x5e5811]&&($gameTemp[_0x5c5acb(0x1df)](_0x5e5811),this[_0x5c5acb(0x11b)][_0x5c5acb(0x156)](_0x3cb5f2));},Scene_Map[_0x251032(0x158)]['isButtonCommonEventOk']=function(_0x3be664){const _0x27c6cd=_0x251032;if(!this[_0x27c6cd(0x1c0)]())return![];if($gameMessage[_0x27c6cd(0xa8)]())return![];if(SceneManager[_0x27c6cd(0x124)]())return![];if(Input[_0x27c6cd(0xa2)][_0x3be664]==='ok'){if($gamePlayer['checkEventTriggerTouchInForwardLocation']())return![];}return!![];},VisuMZ[_0x251032(0x18f)][_0x251032(0x102)]=Scene_Map[_0x251032(0x158)][_0x251032(0xe1)],Scene_Map[_0x251032(0x158)]['isAnyButtonPressed']=function(){const _0x1024ed=_0x251032;return VisuMZ[_0x1024ed(0x18f)][_0x1024ed(0x102)][_0x1024ed(0xcd)](this)||this[_0x1024ed(0x11b)]?.[_0x1024ed(0xe1)]();},Game_Player[_0x251032(0x158)][_0x251032(0xd4)]=function(){const _0x661a28=_0x251032;let _0x419eb2=this['x'],_0xc90e6d=this['y'];for(const _0x2438fd of $gameMap[_0x661a28(0x198)](_0x419eb2,_0xc90e6d)){if(!_0x2438fd)continue;if(_0x2438fd[_0x661a28(0x150)]([0x1,0x2]))return!![];}return![];};function Sprite_ButtonCommonEventsContainer(){this['initialize'](...arguments);}Sprite_ButtonCommonEventsContainer[_0x251032(0x158)]=Object[_0x251032(0x144)](Sprite[_0x251032(0x158)]),Sprite_ButtonCommonEventsContainer[_0x251032(0x158)][_0x251032(0x99)]=Sprite_ButtonCommonEventsContainer,Sprite_ButtonCommonEventsContainer['prototype']['initialize']=function(){const _0x3e84b4=_0x251032;Sprite['prototype'][_0x3e84b4(0x164)][_0x3e84b4(0xcd)](this),this[_0x3e84b4(0x1d1)](),this[_0x3e84b4(0x142)]();},Sprite_ButtonCommonEventsContainer[_0x251032(0x158)][_0x251032(0x1d1)]=function(){const _0x42a490=_0x251032;this['width']=Graphics[_0x42a490(0x1eb)],this[_0x42a490(0x196)]=Graphics[_0x42a490(0x196)];},Sprite_ButtonCommonEventsContainer[_0x251032(0x158)]['buttonWidth']=function(){const _0x5804be=_0x251032;return VisuMZ['ButtonCommonEvents']['Settings'][_0x5804be(0x17e)][_0x5804be(0x93)];},Sprite_ButtonCommonEventsContainer[_0x251032(0x158)][_0x251032(0x10a)]=function(){const _0x105172=_0x251032;return VisuMZ[_0x105172(0x18f)][_0x105172(0x147)][_0x105172(0x17e)][_0x105172(0x1d8)];},Sprite_ButtonCommonEventsContainer[_0x251032(0x158)][_0x251032(0x1c3)]=function(){const _0xdc771=_0x251032;try{if('BStEs'!==_0xdc771(0xde))_0x12dede[_0xdc771(0xf2)](_0x503926);else return VisuMZ[_0xdc771(0x18f)][_0xdc771(0x147)]['General'][_0xdc771(0x1b1)][_0xdc771(0xcd)](this);}catch(_0x104040){if($gameTemp[_0xdc771(0x1b0)]())console['log'](_0x104040);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x251032(0x158)][_0x251032(0xdf)]=function(){const _0x4a0a70=_0x251032;try{return VisuMZ[_0x4a0a70(0x18f)][_0x4a0a70(0x147)][_0x4a0a70(0x17e)][_0x4a0a70(0x151)]['call'](this);}catch(_0x599eda){if($gameTemp[_0x4a0a70(0x1b0)]())console[_0x4a0a70(0xd0)](_0x599eda);return new Point(0x0,0x0);}},Sprite_ButtonCommonEventsContainer[_0x251032(0x158)]['rightPoint']=function(){const _0x595425=_0x251032;try{return VisuMZ[_0x595425(0x18f)][_0x595425(0x147)][_0x595425(0x17e)][_0x595425(0x171)][_0x595425(0xcd)](this);}catch(_0x4004e2){if(_0x595425(0xd8)==='gdAvr'){if($gameTemp[_0x595425(0x1b0)]())console['log'](_0x4004e2);return new Point(0x0,0x0);}else{if(this['_buttonCommonEventKeyCodes']===_0x3ecc94)this['initButtonCommonEvents']();delete this[_0x595425(0x9c)][_0x5b0cf2];}}},Sprite_ButtonCommonEventsContainer['prototype'][_0x251032(0xb3)]=function(){const _0xd27c3b=_0x251032;try{return VisuMZ[_0xd27c3b(0x18f)]['Settings']['General'][_0xd27c3b(0xb0)][_0xd27c3b(0xcd)](this);}catch(_0x58bb94){if('MtDbp'!==_0xd27c3b(0x137)){if($gameTemp[_0xd27c3b(0x1b0)]())console[_0xd27c3b(0xd0)](_0x58bb94);return new Point(0x0,0x0);}else this['_key']=_0x495772,_0x68ed58[_0xd27c3b(0x158)]['initialize'][_0xd27c3b(0xcd)](this),this[_0xd27c3b(0x152)](),this['opacity']=this[_0xd27c3b(0xb5)]();}},Sprite_ButtonCommonEventsContainer[_0x251032(0x158)][_0x251032(0x142)]=function(){const _0x22d794=_0x251032,_0x5d39bf=VisuMZ[_0x22d794(0x18f)][_0x22d794(0x147)],_0x34f63b=_0x22d794(0x1aa);for(const _0x2433ac of VisuMZ[_0x22d794(0x18f)]['KeysArray']){if('OyfXK'!==_0x22d794(0x1f7))try{return _0x75e322[_0x22d794(0x18f)][_0x22d794(0x147)][_0x22d794(0x17e)][_0x22d794(0x171)][_0x22d794(0xcd)](this);}catch(_0x59dd76){if(_0x538bf1['isPlaytest']())_0x1653f5[_0x22d794(0xd0)](_0x59dd76);return new _0x3b4406(0x0,0x0);}else{const _0x1d9112=_0x34f63b[_0x22d794(0x17a)](_0x2433ac);if(!_0x5d39bf[_0x1d9112])continue;if(!_0x5d39bf[_0x1d9112][_0x22d794(0x9d)])continue;const _0x2b169d=new Sprite_ButtonCommonEvent(_0x2433ac);this[_0x22d794(0x167)](_0x2b169d);const _0x538342=_0x2b169d['settings']()['PositionJS']['call'](this)||new Point(0x0,0x0);_0x2b169d['x']=_0x538342['x'],_0x2b169d['y']=_0x538342['y'];}}},Sprite_ButtonCommonEventsContainer[_0x251032(0x158)][_0x251032(0xe1)]=function(){const _0x67ab5a=_0x251032;return this[_0x67ab5a(0x1a3)][_0x67ab5a(0xa3)](_0x322344=>_0x322344[_0x67ab5a(0x148)]());},Sprite_ButtonCommonEventsContainer['prototype'][_0x251032(0x156)]=function(_0x1f9a62){const _0x3d9502=_0x251032,_0x13fe33=this['children']['filter'](_0x257769=>_0x257769&&_0x257769[_0x3d9502(0x1a8)]===_0x1f9a62);for(const _0x29de98 of _0x13fe33){if(!_0x29de98)continue;_0x29de98['flashColorTone']();}};function _0x2336(_0x27e5d2,_0x5c887b){const _0x5f422f=_0x5f42();return _0x2336=function(_0x233635,_0x452307){_0x233635=_0x233635-0x8e;let _0x29d5c0=_0x5f422f[_0x233635];return _0x29d5c0;},_0x2336(_0x27e5d2,_0x5c887b);}function Sprite_ButtonCommonEvent(){this['initialize'](...arguments);}Sprite_ButtonCommonEvent[_0x251032(0x158)]=Object[_0x251032(0x144)](Sprite_Clickable[_0x251032(0x158)]),Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x99)]=Sprite_ButtonCommonEvent,Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x164)]=function(_0x2a4003){const _0x1dc932=_0x251032;this[_0x1dc932(0x1a8)]=_0x2a4003,Sprite_Clickable['prototype'][_0x1dc932(0x164)]['call'](this),this[_0x1dc932(0x152)](),this[_0x1dc932(0xf5)]=this[_0x1dc932(0xb5)]();},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x92)]=function(){const _0x17e140=_0x251032,_0x37ebec=_0x17e140(0x1aa)[_0x17e140(0x17a)](this[_0x17e140(0x1a8)]);return VisuMZ[_0x17e140(0x18f)][_0x17e140(0x147)][_0x37ebec]||{};},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x152)]=function(){const _0x4b06f8=_0x251032,_0x1577a9=VisuMZ[_0x4b06f8(0x18f)][_0x4b06f8(0x147)][_0x4b06f8(0x17e)];this[_0x4b06f8(0x1e4)]=new Bitmap(_0x1577a9[_0x4b06f8(0x93)],_0x1577a9[_0x4b06f8(0x1d8)]),this[_0x4b06f8(0x19f)]=this['buttonIcon'](),this[_0x4b06f8(0x190)]();},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x109)]=function(){const _0x2d49b0=_0x251032;return ImageManager[_0x2d49b0(0xd2)];},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x162)]=function(){const _0x2f0a95=_0x251032;return $gameSystem['getButtonCommonEvent'](this[_0x2f0a95(0x1a8)]);},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x1f0)]=function(){const _0x30ac07=_0x251032;if(!this[_0x30ac07(0x92)]())return'';return this[_0x30ac07(0x92)]()[_0x30ac07(0x177)];},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x1ec)]=function(){const _0x5af5c1=_0x251032;if(!this[_0x5af5c1(0x162)]())return 0x0;const _0x1b21d1=$gameSystem[_0x5af5c1(0x1af)](this['_key']);if(_0x1b21d1!==0x0)return _0x1b21d1;const _0x44dc2f=VisuMZ['ButtonCommonEvents']['Settings'][_0x5af5c1(0x17e)],_0x283d1f=_0x44dc2f[_0x5af5c1(0x18a)],_0x7efeff=Math[_0x5af5c1(0x1dc)](_0x283d1f[_0x5af5c1(0x143)],0x1);let _0x2de3f0=_0x283d1f[this[_0x5af5c1(0x1a8)]%_0x7efeff]||0x0;return _0x2de3f0;},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x190)]=function(){const _0x33cce9=_0x251032;this[_0x33cce9(0x1e4)]['clear']();const _0x12427d=VisuMZ[_0x33cce9(0x18f)][_0x33cce9(0x147)][_0x33cce9(0x17e)];_0x12427d['DrawJS'][_0x33cce9(0xcd)](this);},Sprite_ButtonCommonEvent['prototype']['isClickEnabled']=function(){const _0x139b48=_0x251032;if(this[_0x139b48(0xf5)]<0xff)return![];return this[_0x139b48(0x162)]()>0x0;},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0xd1)]=function(){const _0x349d20=_0x251032;Sprite_Clickable['prototype'][_0x349d20(0xd1)][_0x349d20(0xcd)](this),this[_0x349d20(0xf0)]();},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0xf4)]=function(){const _0x4b7585=_0x251032;Sprite_Clickable['prototype']['onMouseExit'][_0x4b7585(0xcd)](this),this[_0x4b7585(0x1c1)]();},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x1bb)]=function(){const _0x4694c7=_0x251032;Sprite_Clickable['prototype'][_0x4694c7(0x1bb)][_0x4694c7(0xcd)](this),this['callCommonEvent'](),this['onMouseExit']();},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0xf0)]=function(){const _0x2eb1be=_0x251032,_0x5977e7=VisuMZ['ButtonCommonEvents'][_0x2eb1be(0x147)]['General'];_0x5977e7[_0x2eb1be(0x101)]&&this[_0x2eb1be(0x1d7)](_0x5977e7[_0x2eb1be(0x94)]);},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0x1c1)]=function(){this['setColorTone']([0x0,0x0,0x0,0x0]);},Sprite_ButtonCommonEvent[_0x251032(0x158)]['flashColorTone']=function(){const _0x215c33=_0x251032;this[_0x215c33(0xf0)](),setTimeout(this[_0x215c33(0x1c1)]['bind'](this),0x64);},Sprite_ButtonCommonEvent[_0x251032(0x158)]['callCommonEvent']=function(){const _0x231efa=_0x251032;if(!SceneManager[_0x231efa(0xfa)]['isButtonCommonEventOk']())return;if($gameMap&&$gameMap[_0x231efa(0x188)]())return;const _0x342180=this[_0x231efa(0x162)]();$gameTemp[_0x231efa(0x1df)](_0x342180),this[_0x231efa(0xf4)](),this[_0x231efa(0x193)]();},Sprite_ButtonCommonEvent[_0x251032(0x158)]['isCommonEventPressed']=function(){const _0x479c6e=_0x251032;if(!this['isPressed']())return![];if(this[_0x479c6e(0x108)]()<=0x0)return![];return!![];},Sprite_ButtonCommonEvent[_0x251032(0x158)][_0x251032(0xcf)]=function(){const _0x50d326=_0x251032;Sprite_Clickable['prototype'][_0x50d326(0xcf)]['call'](this),this['updateOpacity'](),this[_0x50d326(0xa7)]();},Sprite_ButtonCommonEvent[_0x251032(0x158)]['updateOpacity']=function(){const _0x255c47=_0x251032,_0x5a3ec2=this[_0x255c47(0xb5)]();if(this[_0x255c47(0xf5)]>_0x5a3ec2)this[_0x255c47(0xf5)]-=0x10;else this['opacity']<_0x5a3ec2&&(this[_0x255c47(0xf5)]+=0x10);},Sprite_ButtonCommonEvent['prototype'][_0x251032(0xb5)]=function(){const _0x45f8a6=_0x251032;if($gameMessage&&$gameMessage[_0x45f8a6(0xa8)]())return 0x0;if(!$gameSystem[_0x45f8a6(0x111)]())return 0x0;if(this[_0x45f8a6(0x92)]()[_0x45f8a6(0x1bd)]){if('BsEBf'===_0x45f8a6(0xae)){const _0x227296=this[_0x45f8a6(0x162)]();if(!$dataCommonEvents[_0x227296])return 0x0;}else return!![];}return 0xff;},Sprite_ButtonCommonEvent['prototype'][_0x251032(0xa7)]=function(){const _0x2a1f9a=_0x251032;if(this['_icon']===this[_0x2a1f9a(0x1ec)]())return;this[_0x2a1f9a(0x19f)]=this[_0x2a1f9a(0x1ec)](),this[_0x2a1f9a(0x190)]();},VisuMZ[_0x251032(0x18f)][_0x251032(0xfd)]=function(){const _0x312336=_0x251032,_0x375765=this[_0x312336(0x1eb)],_0x4b8cfb=this[_0x312336(0x196)],_0x27c7ed=ColorManager[_0x312336(0x1ad)](),_0x80273d=ColorManager['itemBackColor2']();this[_0x312336(0x1e4)][_0x312336(0x1ae)](0x1,0x1,_0x375765-0x2,_0x4b8cfb-0x2,_0x27c7ed,_0x80273d,!![]),this[_0x312336(0x1e4)][_0x312336(0x1b2)](0x1,0x1,_0x375765-0x2,_0x4b8cfb-0x2,_0x27c7ed);if(this[_0x312336(0x109)]()){const _0xc9a9c1=this[_0x312336(0x109)](),_0x3627f7=_0xc9a9c1[_0x312336(0x1eb)],_0x10841f=_0xc9a9c1['height'];this[_0x312336(0x1e4)]['blt'](_0xc9a9c1,0x0,0x0,_0x3627f7,_0x10841f,0x0,0x0,_0x375765,_0x4b8cfb);}const _0x11acde=this['buttonIcon'](),_0x5e7de1=ImageManager[_0x312336(0xe4)](_0x312336(0xc4)),_0x2bfa0f=ImageManager[_0x312336(0xdd)],_0x17217c=ImageManager[_0x312336(0x1ee)],_0x47aa7d=_0x11acde%0x10*_0x2bfa0f,_0x5fcf27=Math[_0x312336(0x139)](_0x11acde/0x10)*_0x17217c,_0x33272b=Math[_0x312336(0x139)](this[_0x312336(0x1eb)]/_0x2bfa0f)*_0x2bfa0f,_0x3d5c6d=Math['floor'](this[_0x312336(0x196)]/_0x17217c)*_0x17217c,_0x5f1813=Math[_0x312336(0x139)]((this['width']-_0x33272b)/0x2),_0x1bfaae=Math['floor']((this['height']-_0x3d5c6d)/0x2);this[_0x312336(0x1e4)]['_context'][_0x312336(0x182)]=![],this['bitmap'][_0x312336(0x1bf)](_0x5e7de1,_0x47aa7d,_0x5fcf27,_0x2bfa0f,_0x17217c,_0x5f1813,_0x1bfaae,_0x33272b,_0x3d5c6d),this['bitmap'][_0x312336(0x1c5)][_0x312336(0x182)]=!![];const _0x151af6=this[_0x312336(0x1f0)]();this['bitmap'][_0x312336(0x10d)]=$gameSystem[_0x312336(0x1a1)](),this['bitmap'][_0x312336(0x12b)]=$gameSystem['mainFontSize'](),this[_0x312336(0x1e4)][_0x312336(0x155)](_0x151af6,0x0,0x0,_0x375765,this[_0x312336(0x1e4)]['fontSize']+0x4,'center');},VisuMZ[_0x251032(0x18f)]['CanAssignButtonCommonEvent']=function(_0x5e6273){const _0x3cd12e=_0x251032;if(!_0x5e6273)return![];if(![_0x3cd12e(0x1ac),_0x3cd12e(0x149)][_0x3cd12e(0x1a6)](SceneManager[_0x3cd12e(0xfa)][_0x3cd12e(0x99)][_0x3cd12e(0x197)]))return![];const _0x5ead95=VisuMZ[_0x3cd12e(0x18f)][_0x3cd12e(0x114)],_0x2cc08e=_0x5e6273[_0x3cd12e(0x14a)];return _0x2cc08e['match'](_0x5ead95[_0x3cd12e(0xea)])&&_0x2cc08e['match'](_0x5ead95['AssignButtonSlots']);},TextManager['assignButtonCommonEventWindowTitle']=VisuMZ['ButtonCommonEvents'][_0x251032(0x147)][_0x251032(0x1d9)][_0x251032(0x15f)],Scene_ItemBase[_0x251032(0x158)][_0x251032(0x16f)]=function(){const _0x1c0dd7=_0x251032,_0xf2c5b0=VisuMZ[_0x1c0dd7(0x18f)][_0x1c0dd7(0x114)],_0x5a4167=this['item']()[_0x1c0dd7(0x14a)];_0x5a4167['match'](_0xf2c5b0[_0x1c0dd7(0x13b)]);const _0x5b5c93=String(RegExp['$1'])[_0x1c0dd7(0x18e)](',')[_0x1c0dd7(0x1cc)](_0x3b8d8c=>String(_0x3b8d8c)['toUpperCase']()[_0x1c0dd7(0x154)]())[_0x1c0dd7(0x179)](_0x34f902=>TextManager[_0x1c0dd7(0x1c4)][_0x1c0dd7(0x1a6)](_0x34f902))[_0x1c0dd7(0x179)](_0x327ad1=>VisuMZ[_0x1c0dd7(0x18f)][_0x1c0dd7(0x9b)][_0x1c0dd7(0x1a6)](TextManager[_0x1c0dd7(0x1c4)]['indexOf'](_0x327ad1)))['filter'](_0xd4de82=>!Input[_0x1c0dd7(0x1fc)](TextManager[_0x1c0dd7(0x1c4)]['indexOf'](_0xd4de82)));_0x5a4167[_0x1c0dd7(0x1f1)](_0xf2c5b0['AssignCommonEvent']);const _0x4b2e6e=eval(RegExp['$1']),_0x11a1a1=this[_0x1c0dd7(0x14b)](_0x5b5c93),_0x118998=new Window_AssignButtonCommonEvent(_0x11a1a1);_0x118998[_0x1c0dd7(0x19a)](_0x4b2e6e,_0x5b5c93),this[_0x1c0dd7(0x167)](_0x118998),this['_assignButtonCommonEventsWindow']=_0x118998,_0x118998[_0x1c0dd7(0xe9)](_0x1c0dd7(0xb7),this[_0x1c0dd7(0x1d5)]['bind'](this)),_0x118998['setHandler'](_0x1c0dd7(0xc0),this[_0x1c0dd7(0x178)][_0x1c0dd7(0x1e7)](this));},Scene_ItemBase[_0x251032(0x158)][_0x251032(0x14b)]=function(_0x12d181){const _0x42f016=_0x251032,_0x2b9c1c=VisuMZ['ButtonCommonEvents'][_0x42f016(0x147)]['Assign'];if(_0x2b9c1c&&_0x2b9c1c[_0x42f016(0xec)]){if(_0x42f016(0x1db)!==_0x42f016(0x1db)){if(this[_0x42f016(0x9c)]===_0x1148c1)this[_0x42f016(0x184)]();if(_0x56e8cd[_0x42f016(0x1b0)]()&&_0x48a3f3['isButtonCommonEventForbidden'](_0x29fb8f)&&_0xad13f2!==0x0){const _0x460628=_0x42f016(0x120)[_0x42f016(0x17a)](_0x3c942e[_0x42f016(0x1c4)][_0x4e7e84]);_0x43839b(_0x460628);return;}this[_0x42f016(0x9c)][_0x1ea0e6]=_0x175ebd;}else return _0x2b9c1c[_0x42f016(0xec)][_0x42f016(0xcd)](this,_0x12d181);}const _0x5769e1=Window_Base[_0x42f016(0x158)][_0x42f016(0xf9)]()*0x2+0x8;let _0x3098af=$gameSystem[_0x42f016(0x1f9)]()*0x2+_0x12d181[_0x42f016(0x143)]*_0x5769e1;_0x3098af=_0x3098af[_0x42f016(0x185)](Graphics[_0x42f016(0x1d3)]/0x3,Graphics[_0x42f016(0x1d3)]);let _0x1241b2=this[_0x42f016(0x1f6)](0x3,!![]),_0x139c86=Math[_0x42f016(0xa5)]((Graphics[_0x42f016(0x1d3)]-_0x3098af)/0x2),_0x1998c0=Math['round']((Graphics[_0x42f016(0xca)]-_0x1241b2)/0x2);return new Rectangle(_0x139c86,_0x1998c0,_0x3098af,_0x1241b2);},Scene_ItemBase['prototype'][_0x251032(0x1d5)]=function(){const _0x26d3e2=_0x251032,_0x132b02=this[_0x26d3e2(0x1cd)][_0x26d3e2(0xb8)](),_0x42a0fa=this[_0x26d3e2(0x1cd)][_0x26d3e2(0x103)],_0x1eb304=this[_0x26d3e2(0x1e9)]()[_0x26d3e2(0x10c)];$gameSystem['clearButtonCommonEventID'](_0x42a0fa),$gameSystem[_0x26d3e2(0x13e)](_0x132b02,_0x42a0fa),$gameSystem[_0x26d3e2(0x18d)](_0x132b02,_0x1eb304),this[_0x26d3e2(0x1cd)][_0x26d3e2(0x190)](),setTimeout(this[_0x26d3e2(0x178)][_0x26d3e2(0x1e7)](this),0x1f4);},Scene_ItemBase[_0x251032(0x158)][_0x251032(0x178)]=function(){const _0x1a3552=_0x251032;this[_0x1a3552(0x1ce)][_0x1a3552(0x8f)](this[_0x1a3552(0x1cd)]),this[_0x1a3552(0x1cd)][_0x1a3552(0x10e)](),this['_assignButtonCommonEventsWindow']=undefined,this[_0x1a3552(0x105)]['activate'](),this['_itemWindow']['callUpdateHelp']();},VisuMZ[_0x251032(0x18f)][_0x251032(0x1ed)]=Scene_Item[_0x251032(0x158)][_0x251032(0xa0)],Scene_Item[_0x251032(0x158)][_0x251032(0xa0)]=function(){const _0x3ef339=_0x251032;VisuMZ[_0x3ef339(0x18f)][_0x3ef339(0x169)](this[_0x3ef339(0x1e9)]())?this[_0x3ef339(0x16f)]():VisuMZ['ButtonCommonEvents'][_0x3ef339(0x1ed)]['call'](this);},VisuMZ['ButtonCommonEvents']['Scene_Skill_onItemOk']=Scene_Skill['prototype'][_0x251032(0xa0)],Scene_Skill['prototype']['onItemOk']=function(){const _0x26c197=_0x251032;if(VisuMZ['ButtonCommonEvents'][_0x26c197(0x169)](this['item']()))this[_0x26c197(0x16f)]();else{if(_0x26c197(0x19d)===_0x26c197(0x19d))VisuMZ[_0x26c197(0x18f)][_0x26c197(0x100)][_0x26c197(0xcd)](this);else{_0x315472=_0x3a0ed4[_0x26c197(0x19e)](/\s*\(.*?\)\s*/g,'')[_0x26c197(0xdc)]()[_0x26c197(0x154)]();const _0x2a8df5=_0x2157db[_0x26c197(0x1c4)]['indexOf'](_0x5a1188);if(_0x2a8df5>0x0)_0x3ef0fd['setButtonCommonEvent'](_0x2a8df5,0x0);}}},VisuMZ[_0x251032(0x18f)]['Window_ItemList_isEnabled']=Window_ItemList[_0x251032(0x158)][_0x251032(0x173)],Window_ItemList[_0x251032(0x158)][_0x251032(0x173)]=function(_0x4a1209){const _0x4c16fe=_0x251032;return VisuMZ[_0x4c16fe(0x18f)][_0x4c16fe(0x169)](_0x4a1209)?!![]:VisuMZ[_0x4c16fe(0x18f)][_0x4c16fe(0x107)][_0x4c16fe(0xcd)](this,_0x4a1209);},VisuMZ[_0x251032(0x18f)][_0x251032(0x1e6)]=Window_SkillList[_0x251032(0x158)][_0x251032(0x173)],Window_SkillList['prototype'][_0x251032(0x173)]=function(_0x560164){const _0xe2b7b6=_0x251032;if(VisuMZ[_0xe2b7b6(0x18f)][_0xe2b7b6(0x169)](_0x560164))return!![];else{if(_0xe2b7b6(0x16a)===_0xe2b7b6(0x127)){if(this[_0xe2b7b6(0x10f)]===_0x31d886)this[_0xe2b7b6(0x184)]();return this['_buttonCommonEventIcons'][_0x5593da]||0x0;}else return VisuMZ['ButtonCommonEvents'][_0xe2b7b6(0x1e6)][_0xe2b7b6(0xcd)](this,_0x560164);}};function Window_AssignButtonCommonEvent(){const _0xa4c4f1=_0x251032;this[_0xa4c4f1(0x164)](...arguments);}Window_AssignButtonCommonEvent[_0x251032(0x158)]=Object[_0x251032(0x144)](Window_HorzCommand[_0x251032(0x158)]),Window_AssignButtonCommonEvent[_0x251032(0x158)][_0x251032(0x99)]=Window_AssignButtonCommonEvent,Window_AssignButtonCommonEvent['BUTTON_LABEL_ALIGN']=VisuMZ['ButtonCommonEvents']['Settings'][_0x251032(0x1d9)][_0x251032(0x1a4)],Window_AssignButtonCommonEvent[_0x251032(0x158)][_0x251032(0x164)]=function(_0x52b3de){const _0xf11006=_0x251032;this[_0xf11006(0x103)]=0x0,this[_0xf11006(0xeb)]=[],Window_HorzCommand[_0xf11006(0x158)]['initialize'][_0xf11006(0xcd)](this,_0x52b3de);},Window_AssignButtonCommonEvent[_0x251032(0x158)][_0x251032(0x13f)]=function(){const _0x5ce95f=_0x251032;return this[_0x5ce95f(0xeb)][_0x5ce95f(0x143)]||0x1;},Window_AssignButtonCommonEvent['prototype'][_0x251032(0x129)]=function(){return 0x0;},Window_AssignButtonCommonEvent[_0x251032(0x158)][_0x251032(0x1d4)]=function(){const _0x1f4d7c=_0x251032;return Window_Scrollable['prototype']['itemHeight'][_0x1f4d7c(0xcd)](this)*0x2+0x8;},Window_AssignButtonCommonEvent[_0x251032(0x158)][_0x251032(0x19a)]=function(_0x2915c1,_0x2fc865){const _0x2255e6=_0x251032;this[_0x2255e6(0x103)]=_0x2915c1,this['_slots']=_0x2fc865,this[_0x2255e6(0x190)]();let _0x282c17=0x0;for(const _0x4109e0 of this[_0x2255e6(0xeb)]){if(_0x2255e6(0x135)===_0x2255e6(0x135)){const _0xb1a5c6=TextManager[_0x2255e6(0x1c4)][_0x2255e6(0xac)](_0x4109e0);$gameSystem[_0x2255e6(0x1f4)](_0xb1a5c6)===this[_0x2255e6(0x103)]&&(_0x282c17=this[_0x2255e6(0xeb)]['indexOf'](_0x4109e0));}else this[_0x2255e6(0xf5)]+=0x10;}this[_0x2255e6(0x1dd)](_0x282c17),this['refreshCursor']();},Window_AssignButtonCommonEvent[_0x251032(0x158)]['makeCommandList']=function(){const _0x379953=_0x251032;if(!this[_0x379953(0xeb)])return;for(const _0x4cb274 of this['_slots']){const _0xa51516=TextManager[_0x379953(0x1c4)][_0x379953(0xac)](_0x4cb274),_0x306cec=VisuMZ[_0x379953(0x18f)]['Settings'][_0x379953(0x1aa)[_0x379953(0x17a)](_0xa51516)],_0x5e5e44=_0x306cec['ButtonText'];this[_0x379953(0x1f2)](_0x5e5e44,_0x379953(0xb7),!![],_0xa51516);}},Window_AssignButtonCommonEvent['prototype']['itemRect']=function(_0x3954e2){const _0x580d84=_0x251032,_0x357716=Window_HorzCommand[_0x580d84(0x158)][_0x580d84(0x16e)][_0x580d84(0xcd)](this,_0x3954e2);return _0x357716['y']+=this[_0x580d84(0xf9)]()+0x8-this['rowSpacing']()/0x2-this[_0x580d84(0xc2)](),_0x357716;},Window_AssignButtonCommonEvent[_0x251032(0x158)][_0x251032(0x190)]=function(){const _0xdec36d=_0x251032;Window_HorzCommand[_0xdec36d(0x158)][_0xdec36d(0x190)]['call'](this);if(!this[_0xdec36d(0xeb)])return;this[_0xdec36d(0xad)]();},Window_AssignButtonCommonEvent[_0x251032(0x158)][_0x251032(0xad)]=function(){const _0x14651b=_0x251032;this[_0x14651b(0x98)](),this[_0x14651b(0xff)](!![]);const _0x3de049=TextManager[_0x14651b(0x1a7)];this[_0x14651b(0x155)](_0x3de049,0x0,0x0,this['innerWidth'],_0x14651b(0x12d));},Window_AssignButtonCommonEvent['prototype'][_0x251032(0x1d0)]=function(_0x2c50c0){const _0x73d289=_0x251032,_0x1f55d6=this[_0x73d289(0x15b)](_0x2c50c0),_0x8eb2f9=this[_0x73d289(0x1de)][_0x2c50c0][_0x73d289(0x115)],_0x2dc270=$gameSystem[_0x73d289(0x1af)](_0x8eb2f9),_0x500344=_0x1f55d6['x']+Math[_0x73d289(0xa5)]((_0x1f55d6[_0x73d289(0x1eb)]-ImageManager[_0x73d289(0xdd)])/0x2),_0x2fcda6=_0x1f55d6['y']+Math['round']((_0x1f55d6['height']-ImageManager[_0x73d289(0x1ee)]/0x2)/0x2);this[_0x73d289(0xfc)](_0x2dc270,_0x500344,_0x2fcda6),this[_0x73d289(0x98)](),this[_0x73d289(0x11d)][_0x73d289(0x10d)]=$gameSystem[_0x73d289(0x1a1)](),this[_0x73d289(0x11d)]['fontSize']=$gameSystem[_0x73d289(0x12f)](),this[_0x73d289(0xff)](this[_0x73d289(0x18c)](_0x2c50c0));const _0x42689e=Window_AssignButtonCommonEvent[_0x73d289(0xcb)];this[_0x73d289(0x155)](this['commandName'](_0x2c50c0),_0x1f55d6['x'],_0x1f55d6['y'],_0x1f55d6[_0x73d289(0x1eb)],_0x42689e);},Window_AssignButtonCommonEvent[_0x251032(0x158)]['playOkSound']=function(){const _0x216d2f=_0x251032;SoundManager[_0x216d2f(0x1a9)]();};function _0x5f42(){const _0x43dc3d=['nJwXD','flashColorTone','cdAHn','ClearAllButtonCommonEvents','height','name','eventsXy','keyCode','setData','VOLUME_DOWN','HYPHEN_MINUS','cOPei','replace','_icon','F16','numberFontFace','ayQDi','children','AssignWindow_KeyAlign','WIN_OEM_FJ_JISHO','includes','assignButtonCommonEventWindowTitle','_key','playEquip','KeyCode%1','ARRAYJSON','Scene_Item','itemBackColor1','gradientFillRect','getButtonCommonEventIcon','isPlaytest','BottomPointJS','strokeRect','clearButtonCommonEventID','GREATER_THAN','F17','TAB','COLON','Game_System_initialize','WIN_OEM_COPY','EISU','onClick','DIVIDE','ShowOnlyIfCePresent','JgyOm','blt','isActive','clearColorTone','42coOCir','bottomPoint','stringKeyMap','_context','F13','DOWN','PLUS','parse','SEMICOLON','DOLLAR','map','_assignButtonCommonEventsWindow','_windowLayer','99084xLeQzv','drawItem','initMembers','898345BTxFMO','boxWidth','itemHeight','onButtonAssistAssign','CRSEL','setColorTone','ButtonHeight','Assign','323000kBrcfW','lcaVZ','max','forceSelect','_list','reserveCommonEvent','PLAY','EVAL','F24','CommonEventID','bitmap','WIN_OEM_FINISH','Window_SkillList_isEnabled','bind','19182992VzwUob','item','BACK_SLASH','width','buttonIcon','Scene_Item_onItemOk','iconHeight','DELETE','buttonLabel','match','addCommand','SELECT','getButtonCommonEvent','createSpriteset','calcWindowHeight','OyfXK','PERCENT','windowPadding','zvTAF','OS_KEY','isButtonCommonEventForbidden','NUMPAD8','removeChild','ARRAYSTR','END','settings','ButtonWidth','HoverTone','ShowButtonsOnScreen','MULTIPLY','Scene_Map_createSpriteset','resetFontSettings','constructor','F10','KeysArray','_buttonCommonEventKeyCodes','ShowButton','processButtonCommonEvent','WIN_OEM_FJ_LOYA','onItemOk','CONTEXT_MENU','keyMapper','some','OPEN_PAREN','round','INSERT','updateIcon','isBusy','NUMPAD1','clearButtonCommonEvent','ENTER_SPECIAL','indexOf','drawTitle','BsEBf','XOXFA','AbovePointJS','JSON','F21','abovePoint','NUMPAD6','targetOpacity','OPEN_BRACKET','assign','currentExt','ADD','Icon','ButtonCommonEventsVisibility','description','FUNC','WIN_OEM_PA3','HASH','cancel','onKeyDown','scrollBaseY','return\x200','IconSet','parameters','ClearButtonCommonEventID','rzcdW','ALT','NUMPAD3','boxHeight','BUTTON_LABEL_ALIGN','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','call','SPACE','update','log','onMouseEnter','_buttomCommonEventImage','ConvertParams','checkEventTriggerTouchInForwardLocation','process_VisuMZ_ButtonCommonEvents_Parameters','CTRL','YxEOn','gdAvr','FINAL','UobcC','CONVERT','toUpperCase','iconWidth','BStEs','leftPoint','WIN_OEM_RESET','isAnyButtonPressed','PITAX','BACKSPACE','loadSystem','WIN_OEM_WSCTRL','KANA','isPressed','jACmg','setHandler','AssignCommonEvent','_slots','AssignWindow_RectJS','isButtonCommonEventOk','LEFT','WIN_OEM_ATTN','onColorTone','HOME','push','registerCommand','onMouseExit','opacity','ButtonFilename','Key','VVvEf','lineHeight','_scene','PRINT','drawIcon','drawData','Keys','changePaintOpacity','Scene_Skill_onItemOk','ChangeTone','Scene_Map_isAnyButtonPressed','_commonEventID','DOUBLE_QUOTE','_itemWindow','F12','Window_ItemList_isEnabled','callCommonEvent','pictureBitmap','buttonHeight','WIN_OEM_CLEAR','iconIndex','fontFace','destroy','_buttonCommonEventIcons','QUESTION_MARK','isShowButtonCommonEventButtons','ForbidInputKeys','F14','RegExp','ext','WIN_OEM_ENLW','ARRAYFUNC','818925gXuJXF','CAPSLOCK','NUMPAD2','_buttonCommonEventsSpriteContainer','SceneManager_onKeyDown','contents','omQWM','loadPicture','!!\x20ERROR\x20VisuMZ_4_ButtonCmnEvts\x20ERROR\x20!!\x0aKey\x20%1\x20cannot\x20be\x20bound!\x0aIt\x20is\x20a\x20forbidden\x20keybased\x20on\x0ayour\x20Plugin\x20Parameter\x20settings!','WIN_OEM_BACKTAB','BACK_QUOTE','PAUSE','isSceneChanging','F20','F15','epJUK','OQAdC','colSpacing','ARRAYSTRUCT','fontSize','isSceneMap','center','DLVJc','mainFontSize','RIGHT','WIN_OEM_PA2','F22','OPEN_CURLY_BRACKET','isKeyButtonCommonEventValid','vVVXI','CLEAR','uonFG','ZOOM','floor','makeDefaultButtonCommonEvents','AssignButtonSlots','NONCONVERT','_buttonCommonEventShowButtons','setButtonCommonEvent','maxCols','clearButtonCommonEventIcon','NUMPAD7','createButtonSprites','length','create','1701552nsPXVs','ENTER','Settings','isCommonEventPressed','Scene_Skill','note','assignButtonCommonEventsWindowRect','QUOTE','LESS_THAN','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','CIRCUMFLEX','isTriggerIn','LeftPointJS','createBitmap','ESC','trim','drawText','flashButtonPress','PERIOD','prototype','WIN_OEM_PA1','afVLx','itemRectWithPadding','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','createButtonCommonEventsSpriteContainer','EQUALS','Instruction','WIN_ICO_00','ASTERISK','commonEventID','WIN_OEM_JUMP','initialize','EXECUTE','VOLUME_UP','addChild','764478aBvAIi','CanAssignButtonCommonEvent','iGmmj','WIN_ICO_CLEAR','F23','JUNJA','itemRect','createAssignButtonCommonEventsWindow','kfBHC','RightPointJS','loadButtomCommonEventImage','isEnabled','NUM','Gkhzo','ButtonIcon','ButtonText','onButtonAssistCancel','filter','format','PIPE','NUM_LOCK','HELP','General','CANCEL','exit','ARRAYNUM','imageSmoothingEnabled','setShowButtonCommonEventButtons','initButtonCommonEvents','clamp','kebDK','NUMPAD5','isEventRunning','SHIFT','IconsUsed','NUMPAD4','isCommandEnabled','setButtonCommonEventIcon','split','ButtonCommonEvents','refresh','UNDERSCORE'];_0x5f42=function(){return _0x43dc3d;};return _0x5f42();}