//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.41;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.41] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x4e69ba=_0x434d;(function(_0x10fb8c,_0x2e43d7){const _0x23db71=_0x434d,_0x15d43d=_0x10fb8c();while(!![]){try{const _0x17af6c=-parseInt(_0x23db71(0xc8))/0x1*(-parseInt(_0x23db71(0x225))/0x2)+parseInt(_0x23db71(0x292))/0x3+-parseInt(_0x23db71(0x15c))/0x4+-parseInt(_0x23db71(0x2d5))/0x5*(-parseInt(_0x23db71(0x19d))/0x6)+parseInt(_0x23db71(0x288))/0x7+-parseInt(_0x23db71(0x1e9))/0x8*(-parseInt(_0x23db71(0x112))/0x9)+-parseInt(_0x23db71(0x13b))/0xa;if(_0x17af6c===_0x2e43d7)break;else _0x15d43d['push'](_0x15d43d['shift']());}catch(_0x4f73c3){_0x15d43d['push'](_0x15d43d['shift']());}}}(_0x2f4f,0x437a7));var label=_0x4e69ba(0x133),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4e69ba(0x219)](function(_0x2e112b){const _0x171c80=_0x4e69ba;return _0x2e112b[_0x171c80(0x125)]&&_0x2e112b[_0x171c80(0xfc)]['includes']('['+label+']');})[0x0];function _0x434d(_0x4d6e76,_0x3d142a){const _0x2f4f92=_0x2f4f();return _0x434d=function(_0x434d0e,_0x4ecb3a){_0x434d0e=_0x434d0e-0xb4;let _0x974074=_0x2f4f92[_0x434d0e];return _0x974074;},_0x434d(_0x4d6e76,_0x3d142a);}function _0x2f4f(){const _0x3ab1a4=['innerWidth','powerDownColor','CreateAutoColorFor','victory','setChoiceListMaxRows','BBVTG','add','format','powerUpColor','process_VisuMZ_MessageCore_TextMacros','isTriggered','defaultColor','_messageOffsetX','CommonEvent','processColorLock','SaNdB','</LEFT>','newPage','itemHeight','text','updateDimensions','visible','exit','convertHardcodedEscapeReplacements','_pictures','RArTF','helpWordWrap','changeValue','getPreservedFontSettings','</B>','cwTas','processFontChangeBold','maxChoiceWidth','process_VisuMZ_MessageCore_TextCodes_Action','fontBold','updateForcedPlacement','shift','SGkNs','setMessageWindowRows','ParseSkillNotetags','DISABLE','round','resetTextColor','Window_Base_processAllText','addMessageCommonEvent','brown','windowPadding','_resetRect','setWordWrap','substr','item','version','Rows','mSNFD','WRtsc','length','parameters','_textColorStack','actorName','choiceRows','makeData','drawItem','dbYns','makeFontSmaller','processWrapBreak','updateOverlappingY','processStoredAutoColorChanges','adjustShowChoiceCancel','PictureTextChange','purple','#fbaf5d','red','convertBackslashCharacters','isBreakShowTextCommands','ChoiceWindowMaxRows','OoIzg','hasPictureText','setBackground','crisisColor','weIZy','rwWvQ','#ffffff','processPreviousColor','uIGJx','isRunning','PictureTextRefresh','prepareShowTextFollowups','choice','ChoiceWindowTextAlign','obtainItem','_dimmerSprite','_pictureTextSprite','AutoColorBypassList','emerge','convertNewPageTextStateMacros','\x1bTEXTALIGNMENT[0]','Undefined','Window_NameBox_updatePlacement','waJoe','textWidth','FvTMC','_messageCommonEvents','GNwYP','YyEjm','TextColor','black','messageCoreWindowX','processDrawPicture','_relativePosition','processAutoPosition','jrTuS','osRIQ','messageCoreTextSpeed','isSceneBattle','ParseAllNotetags','MessageWindowXyOffsets','erasePictureTextBuffer','_pictureTextBuffer','textSpeedStatusText','convertTextAlignmentEscapeCharacters','tncqA','States','replace','gFRCk','contentsBack','maxCols','JSON','updateNameBoxMove','stlUf','commandSymbol','followers','prepareShowTextCommand','getChoiceListMaxRows','QrWyA','CXFKO','prototype','updatePlacement','processDrawCenteredPicture','messageWordWrap','_autoPositionTarget','_cancelButton','Skills','strokeRect','_textAlignment','setSpeakerName','EMISd','Window_Base_processEscapeCharacter','SWITCHES','<COLORLOCK>','bbfPF','<%1>','blue','General','push','ParseArmorNotetags','StretchDimmedBg','TightWrap','isSceneMap','map\x20event','easeInOut','#707070','Window_Options_changeVolume','convertMessageCoreEscapeReplacements','VisuMZ_1_EventsMoveCore','floor','HwGEn','ANY','parseChoiceText','map\x20party','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_texts','textCodeCheck','\x1bTEXTALIGNMENT[2]','launchMessageCommonEvent','indexOf','Scene_Options_maxCommands','_pictureTextWidth','processNewLine','synchronizeNameBox','Window_Options_addGeneralOptions','SUHkz','gainItem','right','IWKFY','processAutoColorWords','PictureIDs','battle\x20actor','_centerMessageWindow','refreshDimmerBitmap','getChoiceListLineHeight','rPnaH','autoPositionOffsetX','ybzdO','getPictureTextData','obtainExp','initMessageCore','FYJkd','isItem','battle\x20party','ZjgRF','clear','orange','Actors','COLORLOCK','hxFAi','_targets','_autoSizeRegexp','7441bnsIxC','innerHeight','open','drawTextEx','getTextAlignment','MVKBz','gwSAo','VisuMZ_0_CoreEngine','oEqAV','_list','paintOpacity','ConfigManager_applyData','Window_Message_needsNewPage','WORD_WRAP_PADDING','ChoiceWindowProperties','_scene','system','obtainGold','kTyYo','postConvertEscapeCharacters','colSpacing','isChoiceVisible','ZRfeU','\x1bCOLORLOCK[1]','normalColor','MaxRows','onChoice','_forcedPosition','getStartingChoiceWidth','convertButtonAssistEscapeCharacters','Settings','kPJpY','\x5c%1','HYmIL','updateTransform','createTextState','onNewPageMessageCore','SuIwB','_positionType','getConfigValue','ogTOV','startWait','addChildAt','PREVCOLOR','</WORDWRAP>','ARRAYNUM','obtainEscapeString','placeCancelButton','Window_Message_terminateMessage','min','registerSelfEvent','name','description','#ffc8e0','drawCustomBackgroundColor','addExtraShowChoices','_autoPosRegExp','_moveEasingType','Game_Map_setupEvents','ZCWzb','maxCommands','postFlushTextState','registerCommand','UUeCK','setTextDelay','map\x20actor','<LEFT>','convertFontSettingsEscapeCharacters','ChoiceWindowLineHeight','_moveTargetHeight','setupChoices','_pictureTextWindow','drawPictureTextZone','width','3357HYAfoo','[0]','TEXTALIGNMENT','_pictureTextCache','\x1bBOLD[1]','applyMoveEasing','AddAutoColor','members','<B>','default','messageRows','textSizeExRaw','GXwdo','updatePictureText','fontSize','#7cc576','map','itemBackColor1','DefaultOutlineWidth','status','getMessageWindowRows','_messageOffsetY','getColor','ParseClassNotetags','ARRAYFUNC','pageup','code','getPictureTextBuffer','addedHeight','_indent','Items','Sprite_Picture_update','refresh','MessageCore','test','processTextAlignmentX','CbNOP','TextSpeed','NUM','_subject','resetPositionX','9785600ITbzMo','_action','choices','_target','clearPictures','ParseEnemyNotetags','hRTSI','ParseItemNotetags','applyData','setPictureText','HIDE','Scene_Boot_onDatabaseLoaded','changeVolume','setChoiceListLineHeight','outlineColor','clearCommandList','currentCommand','obtainEscapeParam','isChoiceWindow','LineBreakSpace','grey','addCommand','index','getMessageWindowWidth','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','flushTextState','messagePositionReset','down','PictureTextErase','toUpperCase','needsPictureTextRefresh','iconIndex','_pictureText','493436pSvPhF','FTrGg','Window_Message_clearFlags','_index','statusText','crisis','updateBitmap','ZmUOx','zLzaB','eraseAllPictureTexts','FontChangeValue','zAbsN','databaseObjectName','needsNewPage','TgTEo','processCustomWait','processFontChangeItalic','type','Window_Base_update','convertShowChoiceEscapeCodes','returnPreservedFontSettings','getChoiceIndent','ParseAddedText','TextJS','_wordWrap','_lastGainedItemData','MaxCols','setChoiceListMaxColumns','Width','calcWindowHeight','windowX','Window_Message_synchronizeNameBox','OffsetY','XpuEJ','Name','changeTextSpeed','Game_Screen_erasePicture','updateEvents','systemColor','setChoiceListTextAlign','drawBackCenteredPicture','Window_Message_processEscapeCharacter','updateMove','setRelativePosition','\x1bITALIC[0]','Window_MessageLog','nextEventCode','MsgWindowOffsetX','\x1bC[%1]%2\x1bPREVCOLOR[0]','mainFontFace','FontSmallerCap','_macroBypassWordWrap','boxHeight','FontBiggerCap','Window_Base_processNewLine','rtl','muCzE','TextCodeReplace','fFFto','fontFace','\x1bCOLORLOCK[0]','<LINE\x20BREAK>','resizePictureText','ConvertParams','aoGtz','546054pmXEOq','OffsetX','process_VisuMZ_MessageCore_TextCodes_Replace','pNCSn','moveBy','<I>','setTextAlignment','WordWrap','\x1bTEXTALIGNMENT[1]','setFaceImage','updateMessageCommonEvents','initialize','_textMacroFound','qXeyP','textSizeEx','_autoSizeCheck','Window_ChoiceList_windowX','ancsQ','_spriteset','left','pKWXy','changeChoiceBackgroundColor','_refreshPauseSign','stretchDimmerSprite','contents','Window_Message_newPage','boxWidth','commandName','addContinuousShowChoices','match','Default','choiceLineHeight','applyDatabaseAutoColor','Window_Base_textSizeEx','Game_Party_initialize','#6dcff6','WAIT','startX','outLineColor','clearRect','SHOW','levelUp','_nameBoxWindow','changeOutlineColor','convertBaseEscapeCharacters','TextAlign','partyMemberName','itemRect','hlAFK','cancel','isHelpWindowWordWrap','prepareWordWrapEscapeCharacters','convertButtonAssistText','LNTFi','updateBackground','lastGainedObjectName','createContents','TextColor%1','TextStr','_moveTargetY','actor','clampPlacementPosition','MDJul','makeDeepCopy','green','Window_Message_updatePlacement','Game_Screen_clearPictures','_textDelay','value','SagrQ','move','getMessageWindowXyOffsets','\x1bI[%1]','qWZLQ','processFsTextCode','AddOption','8104QoUfbP','call','exec','isVolumeSymbol','substring','processPxTextCode','setPictureTextBuffer','list','start','preConvertEscapeCharacters','onDatabaseLoaded','EVAL','WRAPBREAK','pink','Game_Map_updateEvents','Window_Message_isTriggered','TextCodeActions','AutoColor','isColorLocked','LDKhl','\x1bTEXTALIGNMENT','MessageTextDelay','YpddO','_MessageCoreSettings','Game_Map_initialize','erasePicture','wntJa','Game_Map_refresh','max','ARRAYJSON','gray','adjustShowChoiceDefault','upperleft','XNkty','ALL','ActionJS','setup','(((','_pictureId','sort','aIwpE','itemPadding','</I>','CreateAutoColorRegExpListEntries','#f26c4f','blt','windowWidth','XPMsp','filter','inBattle','CreateAutoColorRegExpLists','convertLockColorsEscapeCharacters','choicePositionType','indent','updateAutoSizePosition','choiceCols','JoUpX','convertTextMacros','drawing','ConfigManager_makeData','28snveRe','LqnqW','resetWordWrap','NEwSz','setMessageWindowXyOffsets','processEscapeCharacter','getRandomTextFromPool','Window_ChoiceList_updatePlacement','loadPicture','BkUUu','parse','resetRect','_interpreter','none','processAllText','padding','isMessageWindowWordWrap','Padding','false','convertChoiceMacros','randomInt','FastForwardKey','Game_Interpreter_setupChoices','upperright','QhLVr','drawPictureText','Window_Base_changeTextColor','preemptive','</CENTER>','height','contentsHeight','return\x200','violet','ParseStateNotetags','AdjustRect','prepareForcedPositionEscapeCharacters','_eventId','isPressed','_moveTargetWidth','_messageWindow','setupEvents','initTextAlignement','constructor','lastGainedObjectQuantity','CENTERPICTURE','remove','convertVariableEscapeCharacters','center','setWaitMode','oAFvb','TuaJG','moveTo','textColor','setMessageWindowWordWrap','battle\x20enemy','Match','#a186be','rIAFs',')))','_autoColorActorNames','pzkdx','updateAutoPosition','findTargetSprite','quantity','getChoiceListMaxColumns','selectDefault','anyPictureTextChanges','textCodeResult','SWITCH','Game_Party_gainItem','clearFlags','processCharacter','lineHeight','toLowerCase','SaBCU','<BR>','getPictureText','anchorPictureText','white','XSQZy','yes','setMessageWindowWidth','vLwpb','_moveTargetX','Classes','updateRelativePosition','scale','makeFontBigger','joJIG','\x1bTEXTALIGNMENT[3]','pcJVa','trim','startY','BHQvP','_messagePositionReset','calcMoveEasing','addLoadListener','COMMONEVENT','EMrCj','2984023mVDryv','SortObjectByKeyLength','clearAllPictureTexts','messageWidth','realPictureId','isContinuePrepareShowTextCommands','canMove','currencyUnit','isChoiceEnabled','Window_NameBox_refresh','1136967AGuCDC','clearActorNameAutoColor','processMessageCoreEscapeActions','BkTer','_colorLock','BMcyt','slice','Armors','addMessageCoreTextSpeedCommand','SLBpO','PICTURE','\x1bWrapBreak[0]','Game_System_initialize','clearPictureTextRefresh','itemRectWithPadding','NameBoxWindowOffsetY','_textDelayCount','_currentAutoSize','outputHeight','bind','isCommandEnabled','faceName','messageWindowRect','preFlushTextState','registerActorNameAutoColorChanges','IRNlw','gradientFillRect','attachPictureText','AutoColorRegExp','_pictureTextRefresh','requestPictureTextRefreshAll','<WORDWRAP>','Window_Base_initialize','EeBwi','isArmor','addedWidth','_moveDuration','mainFontSize','message','vAKPv','faceWidth','choiceTextAlign','POZCq','Weapons','processAutoSize','\x1bi[%1]%2','LineHeight','setLastGainedItemData','isRTL','ConvertTextAutoColorRegExpFriendly','true','some','rnIsx','Instant','getChoiceListTextAlign','Type','setupNumInput','lowerright','includes','COztG','makeCommandList','maxLines','autoPositionOffsetY','textSpeed','escapeStart','process_VisuMZ_MessageCore_AutoColor','</RIGHT>','5lVvxCL','setPositionType','registerResetRect','event','outlineWidth','instantTextSpeed','convertMessageCoreEscapeActions','clamp','rUyBl','addGeneralOptions','Window_Options_statusText','addMessageCoreCommands','Window_Options_isVolumeSymbol','currentExt','getLastGainedItemData','setColorLock','lowerleft','Sprite_Picture_updateBitmap','addWrapBreakAfterPunctuation','TextManager_message','requestPictureTextRefresh','BOLD','drawBackPicture','isInputting','isWordWrapEnabled','SsECE','inputtingAction','_wholeMoveDuration','isAutoColorAffected','map\x20player','Enemies','outputWidth','XHFot','_pictureTextHeight','onProcessCharacter','battleActionName','update','setupItemChoice','getInputButtonString','prepareAutoSizeEscapeCharacters','bdKcO','cJGMA','TextMacros','changePaintOpacity','MsgWindowOffsetY','processCommonEvent','fontItalic','anchor','Window_ChoiceList','bwORm','resetFontSettings','split','kwnMm','STRUCT','processActorNameAutoColorChanges','return\x20\x27','changeTextColor','RelativePXPY','terminateMessage','ParseWeaponNotetags','pMsIU','jRWVS','itemBackColor2','ceil','updateOffsetPosition','addContinuousShowTextCommands'];_0x2f4f=function(){return _0x3ab1a4;};return _0x2f4f();}VisuMZ[label][_0x4e69ba(0xe6)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x4e69ba(0x19b)]=function(_0x5cccdc,_0x45f472){const _0xe282c3=_0x4e69ba;for(const _0x5ed212 in _0x45f472){if(_0x5ed212[_0xe282c3(0x1ba)](/(.*):(.*)/i)){const _0x2f59fa=String(RegExp['$1']),_0x1ff642=String(RegExp['$2'])[_0xe282c3(0x158)]()['trim']();let _0x539684,_0x579cff,_0x5c783c;switch(_0x1ff642){case _0xe282c3(0x138):_0x539684=_0x45f472[_0x5ed212]!==''?Number(_0x45f472[_0x5ed212]):0x0;break;case _0xe282c3(0xf5):_0x579cff=_0x45f472[_0x5ed212]!==''?JSON[_0xe282c3(0x22f)](_0x45f472[_0x5ed212]):[],_0x539684=_0x579cff[_0xe282c3(0x122)](_0x3f45f8=>Number(_0x3f45f8));break;case _0xe282c3(0x1f4):_0x539684=_0x45f472[_0x5ed212]!==''?eval(_0x45f472[_0x5ed212]):null;break;case'ARRAYEVAL':_0x579cff=_0x45f472[_0x5ed212]!==''?JSON[_0xe282c3(0x22f)](_0x45f472[_0x5ed212]):[],_0x539684=_0x579cff[_0xe282c3(0x122)](_0x5d9fa3=>eval(_0x5d9fa3));break;case _0xe282c3(0x395):_0x539684=_0x45f472[_0x5ed212]!==''?JSON[_0xe282c3(0x22f)](_0x45f472[_0x5ed212]):'';break;case _0xe282c3(0x206):_0x579cff=_0x45f472[_0x5ed212]!==''?JSON['parse'](_0x45f472[_0x5ed212]):[],_0x539684=_0x579cff[_0xe282c3(0x122)](_0xc54bf6=>JSON[_0xe282c3(0x22f)](_0xc54bf6));break;case'FUNC':_0x539684=_0x45f472[_0x5ed212]!==''?new Function(JSON[_0xe282c3(0x22f)](_0x45f472[_0x5ed212])):new Function(_0xe282c3(0x244));break;case _0xe282c3(0x12a):_0x579cff=_0x45f472[_0x5ed212]!==''?JSON[_0xe282c3(0x22f)](_0x45f472[_0x5ed212]):[],_0x539684=_0x579cff[_0xe282c3(0x122)](_0x7aadff=>new Function(JSON[_0xe282c3(0x22f)](_0x7aadff)));break;case'STR':_0x539684=_0x45f472[_0x5ed212]!==''?String(_0x45f472[_0x5ed212]):'';break;case'ARRAYSTR':_0x579cff=_0x45f472[_0x5ed212]!==''?JSON[_0xe282c3(0x22f)](_0x45f472[_0x5ed212]):[],_0x539684=_0x579cff[_0xe282c3(0x122)](_0x4502a6=>String(_0x4502a6));break;case _0xe282c3(0x30a):_0x5c783c=_0x45f472[_0x5ed212]!==''?JSON[_0xe282c3(0x22f)](_0x45f472[_0x5ed212]):{},_0x5cccdc[_0x2f59fa]={},VisuMZ[_0xe282c3(0x19b)](_0x5cccdc[_0x2f59fa],_0x5c783c);continue;case'ARRAYSTRUCT':_0x579cff=_0x45f472[_0x5ed212]!==''?JSON[_0xe282c3(0x22f)](_0x45f472[_0x5ed212]):[],_0x539684=_0x579cff['map'](_0x4b5a37=>VisuMZ[_0xe282c3(0x19b)]({},JSON['parse'](_0x4b5a37)));break;default:continue;}_0x5cccdc[_0x2f59fa]=_0x539684;}}return _0x5cccdc;},(_0x4790f6=>{const _0x28e86d=_0x4e69ba,_0x344c03=_0x4790f6[_0x28e86d(0xfb)];for(const _0x43f5eb of dependencies){if(!Imported[_0x43f5eb]){alert(_0x28e86d(0x3c0)[_0x28e86d(0x31e)](_0x344c03,_0x43f5eb)),SceneManager['exit']();break;}}const _0x127717=_0x4790f6[_0x28e86d(0xfc)];if(_0x127717['match'](/\[Version[ ](.*?)\]/i)){if(_0x28e86d(0x107)!=='UUeCK')_0x590c6b[_0x28e86d(0x2b0)]();else{const _0x158598=Number(RegExp['$1']);if(_0x158598!==VisuMZ[label][_0x28e86d(0x34a)]){if(_0x28e86d(0x27d)!==_0x28e86d(0x27d))return![];else alert(_0x28e86d(0x153)[_0x28e86d(0x31e)](_0x344c03,_0x158598)),SceneManager[_0x28e86d(0x32d)]();}}}if(_0x127717[_0x28e86d(0x1ba)](/\[Tier[ ](\d+)\]/i)){if(_0x28e86d(0x33c)!=='SGkNs')this[_0x28e86d(0x3c4)](_0x40102e);else{const _0x2eed48=Number(RegExp['$1']);_0x2eed48<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x28e86d(0x31e)](_0x344c03,_0x2eed48,tier)),SceneManager[_0x28e86d(0x32d)]()):tier=Math[_0x28e86d(0x205)](_0x2eed48,tier);}}VisuMZ[_0x28e86d(0x19b)](VisuMZ[label][_0x28e86d(0xe6)],_0x4790f6[_0x28e86d(0x34f)]);})(pluginData),PluginManager[_0x4e69ba(0x106)](pluginData[_0x4e69ba(0xfb)],_0x4e69ba(0xd6),_0xcd2d25=>{const _0x4cb136=_0x4e69ba;VisuMZ['ConvertParams'](_0xcd2d25,_0xcd2d25);const _0x522b49=_0xcd2d25[_0x4cb136(0x2c0)]||$gameSystem[_0x4cb136(0xb6)]()||0x1,_0x17b939=_0xcd2d25[_0x4cb136(0xe1)]||$gameSystem[_0x4cb136(0x39b)]()||0x1,_0x2007a7=_0xcd2d25[_0x4cb136(0x176)]||$gameSystem[_0x4cb136(0x265)]()||0x1,_0x8757ce=_0xcd2d25[_0x4cb136(0x1ca)][_0x4cb136(0x26e)]()||_0x4cb136(0x11b);$gameSystem['setChoiceListLineHeight'](_0x522b49),$gameSystem[_0x4cb136(0x31b)](_0x17b939),$gameSystem[_0x4cb136(0x177)](_0x2007a7),$gameSystem[_0x4cb136(0x183)](_0x8757ce);}),PluginManager[_0x4e69ba(0x106)](pluginData['name'],'MessageWindowProperties',_0x480370=>{const _0x2bd8b2=_0x4e69ba;VisuMZ[_0x2bd8b2(0x19b)](_0x480370,_0x480370);const _0xa9075=_0x480370[_0x2bd8b2(0x34b)]||$gameSystem[_0x2bd8b2(0x126)]()||0x1,_0x3dc4f9=_0x480370[_0x2bd8b2(0x178)]||$gameSystem[_0x2bd8b2(0x152)]()||0x1;$gameTemp[_0x2bd8b2(0xb4)]=!![];const _0x3e2396=_0x480370[_0x2bd8b2(0x1a4)]['toLowerCase']();$gameSystem['setMessageWindowRows'](_0xa9075),$gameSystem['setMessageWindowWidth'](_0x3dc4f9);if([_0x2bd8b2(0x2c4),_0x2bd8b2(0x237)][_0x2bd8b2(0x2cc)](_0x3e2396)){if(_0x2bd8b2(0x277)===_0x2bd8b2(0x203)){if(this[_0x2bd8b2(0x200)]===_0x18415e)this[_0x2bd8b2(0xbc)]();if(this[_0x2bd8b2(0x200)][_0x2bd8b2(0x11c)]===_0x513b29)this[_0x2bd8b2(0xbc)]();this[_0x2bd8b2(0x200)][_0x2bd8b2(0x11c)]=_0x225d41||0x1;}else $gameSystem[_0x2bd8b2(0x25a)](eval(_0x3e2396));}const _0xd7aec4=SceneManager[_0x2bd8b2(0xd7)]['_messageWindow'];if(_0xd7aec4){if('CuEGq'!=='CuEGq'){const _0x1030db=this[_0x2bd8b2(0xf6)](_0x30acb4)['split'](',');if(!_0x2d9ab8[_0x2bd8b2(0x223)])return;const _0x3d735e=_0x1030db[0x0][_0x2bd8b2(0x280)](),_0x466d98=_0x1030db[0x1]||0x0,_0x4c6008=_0x1030db[0x2]||0x0,_0x19a36e=_0x54925e[_0x2bd8b2(0x22d)](_0x3d735e),_0x530b5a=this[_0x2bd8b2(0x1b5)][_0x2bd8b2(0xd2)];_0x19a36e[_0x2bd8b2(0x285)](this['drawBackPicture']['bind'](this,_0x19a36e,_0x278d84['x'],_0x41acc4['y'],_0x466d98,_0x4c6008,_0x530b5a));}else _0xd7aec4[_0x2bd8b2(0x227)](),_0xd7aec4[_0x2bd8b2(0x32b)](),_0xd7aec4[_0x2bd8b2(0x1d5)]();}}),PluginManager[_0x4e69ba(0x106)](pluginData[_0x4e69ba(0xfb)],_0x4e69ba(0x38a),_0x1fdec4=>{const _0x5697a6=_0x4e69ba;VisuMZ['ConvertParams'](_0x1fdec4,_0x1fdec4),$gameSystem[_0x5697a6(0x229)](_0x1fdec4[_0x5697a6(0x19e)],_0x1fdec4[_0x5697a6(0x17c)]);const _0x4b18d4=SceneManager[_0x5697a6(0xd7)]['_messageWindow'];_0x4b18d4&&(_0x4b18d4['resetWordWrap'](),_0x4b18d4[_0x5697a6(0x32b)](),_0x4b18d4['createContents']());}),PluginManager['registerCommand'](pluginData[_0x4e69ba(0xfb)],_0x4e69ba(0x35b),_0x3ef5b3=>{const _0x1b4c35=_0x4e69ba;VisuMZ[_0x1b4c35(0x19b)](_0x3ef5b3,_0x3ef5b3);const _0x470db3=_0x3ef5b3[_0x1b4c35(0x3d0)]||[],_0x107ace=_0x3ef5b3[_0x1b4c35(0x236)]||0x0,_0x22930e=['upperleft','up',_0x1b4c35(0x23c),_0x1b4c35(0x1b0),_0x1b4c35(0x254),_0x1b4c35(0x3cd),_0x1b4c35(0x2e5),'down','lowerright'];for(const _0x58bb3c of _0x470db3){$gameScreen['setPictureTextBuffer'](_0x58bb3c,_0x107ace);for(const _0x2927d5 of _0x22930e){if(_0x3ef5b3[_0x2927d5]===undefined)continue;$gameScreen[_0x1b4c35(0x144)](_0x58bb3c,_0x3ef5b3[_0x2927d5],_0x2927d5);}}}),PluginManager['registerCommand'](pluginData[_0x4e69ba(0xfb)],_0x4e69ba(0x157),_0x26cc58=>{const _0x48aa37=_0x4e69ba;VisuMZ[_0x48aa37(0x19b)](_0x26cc58,_0x26cc58);const _0x5071bf=_0x26cc58[_0x48aa37(0x3d0)]||[];for(const _0x265e78 of _0x5071bf){if('pYLaK'===_0x48aa37(0x196)){if(_0x4ea583[_0x48aa37(0x34f)][0x1]>=0x0){var _0x11267a=_0x50d159[_0x48aa37(0x34f)][0x1]+_0x4bc70b;this[_0x48aa37(0xd1)][_0x4d6a09][_0x48aa37(0x34f)][0x1]=_0x11267a;}else _0xa91032['parameters'][0x1]===-0x2&&(this['_list'][_0x1c6ffa][_0x48aa37(0x34f)][0x1]=_0xa062a8[_0x48aa37(0x34f)][0x1]);}else $gameScreen[_0x48aa37(0x165)](_0x265e78),$gameScreen[_0x48aa37(0x38b)](_0x265e78);}}),PluginManager['registerCommand'](pluginData['name'],_0x4e69ba(0x36c),_0x36c575=>{const _0x50824a=_0x4e69ba;$gameScreen[_0x50824a(0x2b0)]();}),VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x146)]=Scene_Boot['prototype'][_0x4e69ba(0x1f3)],Scene_Boot[_0x4e69ba(0x39e)][_0x4e69ba(0x1f3)]=function(){const _0x4f60fe=_0x4e69ba;VisuMZ[_0x4f60fe(0x133)][_0x4f60fe(0x146)][_0x4f60fe(0x1ea)](this),this[_0x4f60fe(0x338)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x4f60fe(0x2d3)]();},VisuMZ['MessageCore'][_0x4e69ba(0x289)]=function(_0x3cf12f){const _0x493414=_0x4e69ba,_0x471d90=VisuMZ['MessageCore']['Settings'][_0x3cf12f];_0x471d90[_0x493414(0x210)]((_0x9f6be,_0x23e9a6)=>{const _0x186b5b=_0x493414;if(!_0x9f6be||!_0x23e9a6)return-0x1;return _0x23e9a6['Match']['length']-_0x9f6be[_0x186b5b(0x25c)]['length'];});},Scene_Boot[_0x4e69ba(0x39e)][_0x4e69ba(0x338)]=function(){const _0x37349d=_0x4e69ba;VisuMZ[_0x37349d(0x133)][_0x37349d(0x289)]('TextCodeActions');for(const _0x2a4259 of VisuMZ[_0x37349d(0x133)][_0x37349d(0xe6)][_0x37349d(0x1f9)]){_0x2a4259[_0x37349d(0x25c)]=_0x2a4259[_0x37349d(0x25c)][_0x37349d(0x158)](),_0x2a4259['textCodeCheck']=new RegExp('\x1b'+_0x2a4259[_0x37349d(0x25c)],'gi'),_0x2a4259[_0x37349d(0x268)]='\x1b'+_0x2a4259[_0x37349d(0x25c)];if(_0x2a4259['Type']==='')_0x2a4259[_0x37349d(0x268)]+=_0x37349d(0x113);}},Scene_Boot['prototype'][_0x4e69ba(0x19f)]=function(){const _0x4dacfc=_0x4e69ba;VisuMZ[_0x4dacfc(0x133)][_0x4dacfc(0x289)](_0x4dacfc(0x195));for(const _0x35ccf9 of VisuMZ[_0x4dacfc(0x133)][_0x4dacfc(0xe6)][_0x4dacfc(0x195)]){if(_0x4dacfc(0xed)!==_0x4dacfc(0xed)){const _0xea795c=(_0x588e06[_0x4dacfc(0x193)]?-0x1:0x1)*this[_0x4dacfc(0x37a)]('\x20');_0x9a5f56['x']+=_0xea795c;if(this[_0x4dacfc(0x14c)](_0xad2215)>0x0)_0x4d0ede['x']+=_0xea795c;if(_0x3bd8d2[_0x4dacfc(0x193)])return;let _0x55acc4=_0x248692[_0x4dacfc(0x32a)][_0x4dacfc(0x3c5)](_0x4dacfc(0x29d),_0x1bc8bb['index']+0x1),_0x2a364c=_0x1c021f['text'][_0x4dacfc(0x3c5)]('\x0a',_0x2d7ad2[_0x4dacfc(0x151)]+0x1);if(_0x55acc4<0x0)_0x55acc4=_0x1b04a5[_0x4dacfc(0x32a)]['length']+0x1;if(_0x2a364c>0x0)_0x55acc4=_0x50a7c5[_0x4dacfc(0xf9)](_0x55acc4,_0x2a364c);const _0x56f41e=_0x32d0a8['text'][_0x4dacfc(0x1ed)](_0x1b8968['index'],_0x55acc4),_0x5c78db=this['textSizeExWordWrap'](_0x56f41e)[_0x4dacfc(0x111)];let _0x23848b=_0x5a5835[_0x4dacfc(0x111)]||this[_0x4dacfc(0x317)];_0x23848b-=_0x17713f['WORD_WRAP_PADDING'];if(this[_0x4dacfc(0x24f)]===_0x385e27){const _0x16651b=_0x53acb8[_0x4dacfc(0x2a7)]()===''?0x0:_0x3f66bb[_0x4dacfc(0x2ba)]+0x14;_0x23848b-=_0x16651b,_0x416b0e[_0x4dacfc(0x133)][_0x4dacfc(0xe6)]['WordWrap'][_0x4dacfc(0x3b3)]&&(_0x23848b-=_0x16651b);}let _0x542fce=![];if(_0x13e19d['x']+_0x5c78db>_0x56ff48['startX']+_0x23848b)_0x542fce=!![];if(_0x5c78db===0x0)_0x542fce=!![];_0x542fce&&(_0x2c4765['text']=_0x254325[_0x4dacfc(0x32a)][_0x4dacfc(0x298)](0x0,_0x213cd4['index'])+'\x0a'+_0xac2c9a['text']['substr'](_0x153605[_0x4dacfc(0x151)]));}else{_0x35ccf9[_0x4dacfc(0x3c2)]=new RegExp('\x1b'+_0x35ccf9['Match']+_0x35ccf9['Type'],'gi');if(_0x35ccf9[_0x4dacfc(0x1d7)]!==''&&_0x35ccf9[_0x4dacfc(0x1d7)]!=='Undefined'){if('BMoac'!==_0x4dacfc(0x1ff))_0x35ccf9[_0x4dacfc(0x268)]=new Function(_0x4dacfc(0x30c)+_0x35ccf9[_0x4dacfc(0x1d7)][_0x4dacfc(0x391)](/\\/g,'\x1b')+'\x27');else{const _0x3bcc32=_0x1f4eaa['split'](',')[_0x4dacfc(0x122)](_0xd9d948=>_0xe194(_0xd9d948)||0x0);if(_0x3bcc32[0x0]!==_0x47488e)this[_0x4dacfc(0xe3)]['x']=_0x329933(_0x3bcc32[0x0]);if(_0x3bcc32[0x1]!==_0x4d114c)this[_0x4dacfc(0xe3)]['y']=_0x590399(_0x3bcc32[0x1]);if(_0x3bcc32[0x2]!==_0xac48b0)this[_0x4dacfc(0xe3)][_0x4dacfc(0x111)]=_0xba7633(_0x3bcc32[0x2]);if(_0x3bcc32[0x3]!==_0x113fe8)this['_forcedPosition']['height']=_0x11472c(_0x3bcc32[0x3]);return'';}}else _0x4dacfc(0xbd)!==_0x4dacfc(0xbd)?_0x2c0cb0[_0x4dacfc(0x268)]=new _0x6c704e('return\x20\x27'+_0x302a08[_0x4dacfc(0x1d7)][_0x4dacfc(0x391)](/\\/g,'\x1b')+'\x27'):_0x35ccf9['textCodeResult']=_0x35ccf9[_0x4dacfc(0x173)];}}},Scene_Boot['prototype'][_0x4e69ba(0x320)]=function(){const _0x1cc430=_0x4e69ba;for(const _0x512efd of VisuMZ[_0x1cc430(0x133)]['Settings'][_0x1cc430(0x2ff)]){_0x512efd[_0x1cc430(0x3c2)]=new RegExp('\x5c['+_0x512efd[_0x1cc430(0x25c)]+'\x5c]','gi');if(_0x512efd[_0x1cc430(0x1d7)]!==''&&_0x512efd[_0x1cc430(0x1d7)]!==_0x1cc430(0x377)){if(_0x1cc430(0x167)!=='hRWaV'){let _0x33cc5b=_0x512efd[_0x1cc430(0x1d7)];_0x33cc5b=_0x33cc5b[_0x1cc430(0x391)](/\\/g,'\x1b'),_0x33cc5b=_0x33cc5b[_0x1cc430(0x391)]('\x27','\x5c\x27'),_0x33cc5b=_0x33cc5b[_0x1cc430(0x391)]('\x22','\x5c\x22'),_0x512efd[_0x1cc430(0x268)]=new Function(_0x1cc430(0x30c)+_0x33cc5b+'\x27');}else{if(_0x43d9c5[_0x1cc430(0x1e1)](_0x475764))return![];}}else _0x512efd[_0x1cc430(0x268)]=_0x512efd[_0x1cc430(0x173)];}},Scene_Boot['prototype'][_0x4e69ba(0x2d3)]=function(){const _0x4653d9=_0x4e69ba,_0x2ba7db=VisuMZ[_0x4653d9(0x133)][_0x4653d9(0xe6)]['AutoColor'];!VisuMZ[_0x4653d9(0x389)]&&(VisuMZ[_0x4653d9(0x133)][_0x4653d9(0x118)]($dataClasses,_0x2ba7db[_0x4653d9(0x279)]),VisuMZ['MessageCore'][_0x4653d9(0x118)]($dataSkills,_0x2ba7db[_0x4653d9(0x3a4)]),VisuMZ[_0x4653d9(0x133)]['AddAutoColor']($dataItems,_0x2ba7db[_0x4653d9(0x130)]),VisuMZ[_0x4653d9(0x133)][_0x4653d9(0x118)]($dataWeapons,_0x2ba7db[_0x4653d9(0x2bd)]),VisuMZ[_0x4653d9(0x133)][_0x4653d9(0x118)]($dataArmors,_0x2ba7db[_0x4653d9(0x299)]),VisuMZ[_0x4653d9(0x133)][_0x4653d9(0x118)]($dataEnemies,_0x2ba7db[_0x4653d9(0x2f3)]),VisuMZ[_0x4653d9(0x133)]['AddAutoColor']($dataStates,_0x2ba7db[_0x4653d9(0x390)])),VisuMZ[_0x4653d9(0x133)][_0x4653d9(0x21b)]();},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x373)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x4e69ba(0x11a),_0x4e69ba(0x334),_0x4e69ba(0x1a2),_0x4e69ba(0x213),_0x4e69ba(0x10a),_0x4e69ba(0x327),'<CENTER>',_0x4e69ba(0x241),'<RIGHT>',_0x4e69ba(0x2d4),_0x4e69ba(0x3ab),'</COLORLOCK>',_0x4e69ba(0x20e),_0x4e69ba(0x25f),_0x4e69ba(0x2b1),_0x4e69ba(0xf4),_0x4e69ba(0x270),_0x4e69ba(0x199),_0x4e69ba(0x29c),_0x4e69ba(0x251),'COMMONEVENT',_0x4e69ba(0x1c1),_0x4e69ba(0x1c5),_0x4e69ba(0x145),'ENABLE',_0x4e69ba(0x33f),_0x4e69ba(0x269),_0x4e69ba(0x3aa),_0x4e69ba(0x20b),_0x4e69ba(0x3bd)],VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x118)]=function(_0xf0e63a,_0x2119cb){const _0xe64028=_0x4e69ba;if(_0x2119cb<=0x0)return;const _0x1d59d1=_0xf0e63a;for(const _0x408f41 of _0x1d59d1){if(_0xe64028(0x3ac)===_0xe64028(0xf0))return this[_0xe64028(0xd7)]&&this[_0xe64028(0xd7)][_0xe64028(0x24f)]===_0x1ed7a7;else{if(!_0x408f41)continue;VisuMZ[_0xe64028(0x133)][_0xe64028(0x319)](_0x408f41,_0x2119cb);}}},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x21b)]=function(){const _0x3e406b=_0x4e69ba;VisuMZ[_0x3e406b(0x133)][_0x3e406b(0x2ae)]=[];for(let _0x507c7e=0x1;_0x507c7e<=0x1f;_0x507c7e++){const _0x173529=_0x3e406b(0x1d6)[_0x3e406b(0x31e)](_0x507c7e),_0x5cc0c8=VisuMZ[_0x3e406b(0x133)][_0x3e406b(0xe6)][_0x3e406b(0x1fa)][_0x173529];_0x5cc0c8['sort']((_0x3d7e69,_0x3ddc09)=>{const _0x5afb41=_0x3e406b;if(!_0x3d7e69||!_0x3ddc09)return-0x1;return _0x3ddc09['length']-_0x3d7e69[_0x5afb41(0x34e)];}),this['CreateAutoColorRegExpListEntries'](_0x5cc0c8,_0x507c7e);}},VisuMZ[_0x4e69ba(0x133)]['CreateAutoColorRegExpListEntries']=function(_0x3a2b38,_0xc371e1){const _0xa84977=_0x4e69ba;for(const _0x360931 of _0x3a2b38){if(_0x360931[_0xa84977(0x34e)]<=0x0)continue;if(/^\d+$/['test'](_0x360931))continue;let _0x38d6fb=VisuMZ[_0xa84977(0x133)][_0xa84977(0x2c3)](_0x360931);if(_0x360931[_0xa84977(0x1ba)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x38a27a=new RegExp(_0x38d6fb,'i');else{if(_0xa84977(0x1aa)!=='qXeyP'){if(this[_0xa84977(0x200)]===_0x5a68ad)this[_0xa84977(0xbc)]();if(this[_0xa84977(0x200)][_0xa84977(0x331)]===_0x544930)this['initMessageCore']();this[_0xa84977(0x200)]['helpWordWrap']=_0x545345;}else var _0x38a27a=new RegExp('\x5cb'+_0x38d6fb+'\x5cb','g');}VisuMZ[_0xa84977(0x133)][_0xa84977(0x2ae)]['push']([_0x38a27a,_0xa84977(0x18c)[_0xa84977(0x31e)](_0xc371e1,_0x360931)]);}},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x2c3)]=function(_0x4ffa55){const _0x15ed91=_0x4e69ba;return _0x4ffa55=_0x4ffa55[_0x15ed91(0x391)](/(\W)/gi,(_0x514b04,_0x1820e0)=>_0x15ed91(0xe8)[_0x15ed91(0x31e)](_0x1820e0)),_0x4ffa55;},VisuMZ[_0x4e69ba(0x133)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ[_0x4e69ba(0x129)]=function(_0x35f2c7){const _0x507b57=_0x4e69ba;VisuMZ[_0x507b57(0x133)][_0x507b57(0x129)]['call'](this,_0x35f2c7);const _0x2dcc4c=VisuMZ[_0x507b57(0x133)][_0x507b57(0xe6)][_0x507b57(0x1fa)];VisuMZ['MessageCore'][_0x507b57(0x319)](_0x35f2c7,_0x2dcc4c['Classes']);},VisuMZ['MessageCore']['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x4e69ba(0x33e)]=function(_0x571af7){const _0x5c4e6b=_0x4e69ba;VisuMZ[_0x5c4e6b(0x133)]['ParseSkillNotetags']['call'](this,_0x571af7);const _0x211381=VisuMZ['MessageCore'][_0x5c4e6b(0xe6)][_0x5c4e6b(0x1fa)];VisuMZ[_0x5c4e6b(0x133)][_0x5c4e6b(0x319)](_0x571af7,_0x211381[_0x5c4e6b(0x3a4)]);},0x7,VisuMZ['MessageCore']['ParseItemNotetags']=VisuMZ[_0x4e69ba(0x142)],VisuMZ[_0x4e69ba(0x142)]=function(_0x5b9b23){const _0x242615=_0x4e69ba;VisuMZ[_0x242615(0x133)][_0x242615(0x142)][_0x242615(0x1ea)](this,_0x5b9b23);const _0x8f8d2a=VisuMZ[_0x242615(0x133)][_0x242615(0xe6)][_0x242615(0x1fa)];VisuMZ[_0x242615(0x133)][_0x242615(0x319)](_0x5b9b23,_0x8f8d2a['Items']);},VisuMZ[_0x4e69ba(0x133)]['ParseWeaponNotetags']=VisuMZ[_0x4e69ba(0x310)],VisuMZ[_0x4e69ba(0x310)]=function(_0x43a5f5){const _0x482a99=_0x4e69ba;VisuMZ[_0x482a99(0x133)][_0x482a99(0x310)][_0x482a99(0x1ea)](this,_0x43a5f5);const _0x209bd7=VisuMZ[_0x482a99(0x133)][_0x482a99(0xe6)][_0x482a99(0x1fa)];VisuMZ[_0x482a99(0x133)][_0x482a99(0x319)](_0x43a5f5,_0x209bd7[_0x482a99(0x2bd)]);},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x3b1)]=VisuMZ[_0x4e69ba(0x3b1)],VisuMZ[_0x4e69ba(0x3b1)]=function(_0x3d8ae6){const _0xfacfdb=_0x4e69ba;VisuMZ[_0xfacfdb(0x133)][_0xfacfdb(0x3b1)][_0xfacfdb(0x1ea)](this,_0x3d8ae6);const _0x52f923=VisuMZ[_0xfacfdb(0x133)][_0xfacfdb(0xe6)]['AutoColor'];VisuMZ[_0xfacfdb(0x133)][_0xfacfdb(0x319)](_0x3d8ae6,_0x52f923[_0xfacfdb(0x299)]);},VisuMZ['MessageCore'][_0x4e69ba(0x140)]=VisuMZ[_0x4e69ba(0x140)],VisuMZ['ParseEnemyNotetags']=function(_0x5aa2e2){const _0x26890a=_0x4e69ba;VisuMZ[_0x26890a(0x133)][_0x26890a(0x140)]['call'](this,_0x5aa2e2);const _0x28ab40=VisuMZ[_0x26890a(0x133)][_0x26890a(0xe6)][_0x26890a(0x1fa)];VisuMZ[_0x26890a(0x133)]['CreateAutoColorFor'](_0x5aa2e2,_0x28ab40[_0x26890a(0x2f3)]);},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x246)]=VisuMZ[_0x4e69ba(0x246)],VisuMZ[_0x4e69ba(0x246)]=function(_0x3f7269){const _0x627087=_0x4e69ba;VisuMZ['MessageCore']['ParseStateNotetags'][_0x627087(0x1ea)](this,_0x3f7269);const _0x169c9f=VisuMZ[_0x627087(0x133)][_0x627087(0xe6)][_0x627087(0x1fa)];VisuMZ[_0x627087(0x133)][_0x627087(0x319)](_0x3f7269,_0x169c9f[_0x627087(0x390)]);},VisuMZ[_0x4e69ba(0x133)]['CreateAutoColorFor']=function(_0x2ed90b,_0x32259c){const _0xf04951=_0x4e69ba;if(_0x32259c<=0x0)return;const _0x23ed91=VisuMZ[_0xf04951(0x133)][_0xf04951(0xe6)][_0xf04951(0x1fa)][_0xf04951(0x37f)+_0x32259c];let _0x23e1c6=_0x2ed90b['name'][_0xf04951(0x280)]();if(/^\d+$/[_0xf04951(0x134)](_0x23e1c6))return;if(VisuMZ[_0xf04951(0x133)][_0xf04951(0x373)][_0xf04951(0x2cc)](_0x23e1c6['toUpperCase']()))return;_0x23e1c6=_0x23e1c6[_0xf04951(0x391)](/\\I\[(\d+)\]/gi,''),_0x23e1c6=_0x23e1c6[_0xf04951(0x391)](/\x1bI\[(\d+)\]/gi,'');if(_0x23e1c6['length']<=0x0)return;if(_0x23e1c6[_0xf04951(0x1ba)](/-----/i))return;_0x23ed91[_0xf04951(0x3b0)](_0x23e1c6);},SceneManager[_0x4e69ba(0x388)]=function(){return this['_scene']&&this['_scene']['constructor']===Scene_Battle;},SceneManager[_0x4e69ba(0x3b4)]=function(){const _0xaacf7f=_0x4e69ba;return this[_0xaacf7f(0xd7)]&&this['_scene'][_0xaacf7f(0x24f)]===Scene_Map;},VisuMZ['MessageCore'][_0x4e69ba(0x2e8)]=TextManager['message'],TextManager[_0x4e69ba(0x2b8)]=function(_0x41eafa){const _0x24c8cc=_0x4e69ba,_0x4ae964=['levelUp',_0x24c8cc(0x374),_0x24c8cc(0x240),'surprise',_0x24c8cc(0x31a),'defeat','escapeStart',_0x24c8cc(0xbb),_0x24c8cc(0xd9),'obtainItem'];let _0x213a9d=VisuMZ[_0x24c8cc(0x133)][_0x24c8cc(0x2e8)][_0x24c8cc(0x1ea)](this,_0x41eafa);return _0x4ae964['includes'](_0x41eafa)&&(_0x213a9d=_0x24c8cc(0xf4)+_0x213a9d),_0x213a9d;},ConfigManager[_0x4e69ba(0x2d1)]=VisuMZ[_0x4e69ba(0x133)]['Settings'][_0x4e69ba(0x137)][_0x4e69ba(0x1bb)],VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x224)]=ConfigManager[_0x4e69ba(0x353)],ConfigManager[_0x4e69ba(0x353)]=function(){const _0x4a2ffb=_0x4e69ba,_0x265673=VisuMZ[_0x4a2ffb(0x133)]['ConfigManager_makeData'][_0x4a2ffb(0x1ea)](this);return _0x265673[_0x4a2ffb(0x2d1)]=this[_0x4a2ffb(0x2d1)],_0x265673;},VisuMZ['MessageCore'][_0x4e69ba(0xd3)]=ConfigManager[_0x4e69ba(0x143)],ConfigManager[_0x4e69ba(0x143)]=function(_0x1d27d9){const _0x2f30da=_0x4e69ba;VisuMZ[_0x2f30da(0x133)][_0x2f30da(0xd3)][_0x2f30da(0x1ea)](this,_0x1d27d9);if('textSpeed'in _0x1d27d9)_0x2f30da(0x103)===_0x2f30da(0x103)?this[_0x2f30da(0x2d1)]=Number(_0x1d27d9[_0x2f30da(0x2d1)])[_0x2f30da(0x2dc)](0x1,0xb):(_0x57ce0d['MessageCore'][_0x2f30da(0x15e)]['call'](this),this[_0x2f30da(0x293)](),this[_0x2f30da(0x227)](),this[_0x2f30da(0x2e4)](![]),this[_0x2f30da(0x1a3)]('default'),this['setTextDelay'](_0x144704[_0x2f30da(0x133)]['Settings'][_0x2f30da(0x3af)][_0x2f30da(0x1fe)]));else{if('dbYns'!==_0x2f30da(0x355))return this[_0x2f30da(0x14c)](_0xf05130);else this['textSpeed']=VisuMZ[_0x2f30da(0x133)][_0x2f30da(0xe6)][_0x2f30da(0x137)][_0x2f30da(0x1bb)];}},TextManager['messageCoreTextSpeed']=VisuMZ['MessageCore'][_0x4e69ba(0xe6)][_0x4e69ba(0x137)][_0x4e69ba(0x17e)],TextManager['instantTextSpeed']=VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0xe6)]['TextSpeed'][_0x4e69ba(0x2c7)],VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x29e)]=Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x1a8)],Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x1a8)]=function(){const _0x1b2664=_0x4e69ba;VisuMZ['MessageCore']['Game_System_initialize'][_0x1b2664(0x1ea)](this),this[_0x1b2664(0xbc)]();},Game_System[_0x4e69ba(0x39e)]['initMessageCore']=function(){const _0x2d7bff=_0x4e69ba,_0x585a7a=VisuMZ['MessageCore'][_0x2d7bff(0xe6)]['General'],_0x19af43=VisuMZ['MessageCore'][_0x2d7bff(0xe6)][_0x2d7bff(0x1a4)];this['_MessageCoreSettings']={'messageRows':_0x585a7a['MessageRows'],'messageWidth':_0x585a7a['MessageWidth'],'messageWordWrap':_0x19af43['MessageWindow'],'helpWordWrap':_0x19af43['HelpWindow'],'choiceLineHeight':_0x585a7a[_0x2d7bff(0x10c)],'choiceRows':_0x585a7a[_0x2d7bff(0x361)],'choiceCols':_0x585a7a['ChoiceWindowMaxCols'],'choiceTextAlign':_0x585a7a[_0x2d7bff(0x36f)]},this['_messageOffsetX']===undefined&&(_0x2d7bff(0x25e)!==_0x2d7bff(0x25e)?this['makeFontBigger']():(this[_0x2d7bff(0x323)]=_0x585a7a[_0x2d7bff(0x18b)],this[_0x2d7bff(0x127)]=_0x585a7a[_0x2d7bff(0x301)]));},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x126)]=function(){const _0x3e8d43=_0x4e69ba;if(this[_0x3e8d43(0x200)]===undefined)this[_0x3e8d43(0xbc)]();if(this[_0x3e8d43(0x200)][_0x3e8d43(0x11c)]===undefined)this[_0x3e8d43(0xbc)]();return this[_0x3e8d43(0x200)]['messageRows'];},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x33d)]=function(_0x3d008c){const _0x1fad29=_0x4e69ba;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x1fad29(0x200)][_0x1fad29(0x11c)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x1fad29(0x11c)]=_0x3d008c||0x1;},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x152)]=function(){const _0x87ec8e=_0x4e69ba;if(this[_0x87ec8e(0x200)]===undefined)this['initMessageCore']();if(this[_0x87ec8e(0x200)]['messageWidth']===undefined)this[_0x87ec8e(0xbc)]();return this[_0x87ec8e(0x200)][_0x87ec8e(0x28b)];},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x276)]=function(_0x165d58){const _0x83639e=_0x4e69ba;if(this[_0x83639e(0x200)]===undefined)this[_0x83639e(0xbc)]();if(this[_0x83639e(0x200)]['messageWidth']===undefined)this['initMessageCore']();_0x165d58=Math[_0x83639e(0x314)](_0x165d58);if(_0x165d58%0x2!==0x0)_0x165d58+=0x1;this['_MessageCoreSettings']['messageWidth']=_0x165d58||0x2;},Game_System[_0x4e69ba(0x39e)]['isMessageWindowWordWrap']=function(){const _0x28a1c4=_0x4e69ba;if(this[_0x28a1c4(0x200)]===undefined)this[_0x28a1c4(0xbc)]();if(this[_0x28a1c4(0x200)][_0x28a1c4(0x3a1)]===undefined)this[_0x28a1c4(0xbc)]();return this[_0x28a1c4(0x200)][_0x28a1c4(0x3a1)];},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x25a)]=function(_0xb64358){const _0xfe90a1=_0x4e69ba;if(this[_0xfe90a1(0x200)]===undefined)this[_0xfe90a1(0xbc)]();if(this['_MessageCoreSettings'][_0xfe90a1(0x3a1)]===undefined)this['initMessageCore']();this[_0xfe90a1(0x200)][_0xfe90a1(0x3a1)]=_0xb64358;},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x1e4)]=function(){const _0x48a1e6=_0x4e69ba;if(this[_0x48a1e6(0x323)]===undefined){const _0x310784=VisuMZ[_0x48a1e6(0x133)][_0x48a1e6(0xe6)]['General'];this[_0x48a1e6(0x323)]=_0x310784[_0x48a1e6(0x18b)],this[_0x48a1e6(0x127)]=_0x310784[_0x48a1e6(0x301)];}return{'x':this['_messageOffsetX']||0x0,'y':this[_0x48a1e6(0x127)]||0x0};},Game_System['prototype']['setMessageWindowXyOffsets']=function(_0x3f0c47,_0x50cbdd){const _0x462444=_0x4e69ba;if(this['_MessageCoreSettings']===undefined)this[_0x462444(0xbc)]();this[_0x462444(0x323)]=_0x3f0c47,this[_0x462444(0x127)]=_0x50cbdd;},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x1cf)]=function(){const _0xa48bad=_0x4e69ba;if(this[_0xa48bad(0x200)]===undefined)this['initMessageCore']();if(this[_0xa48bad(0x200)][_0xa48bad(0x331)]===undefined)this[_0xa48bad(0xbc)]();return this[_0xa48bad(0x200)]['helpWordWrap'];},Game_System[_0x4e69ba(0x39e)]['setHelpWindowWordWrap']=function(_0x3f0dc4){const _0x5a2f2b=_0x4e69ba;if(this['_MessageCoreSettings']===undefined)this[_0x5a2f2b(0xbc)]();if(this['_MessageCoreSettings'][_0x5a2f2b(0x331)]===undefined)this[_0x5a2f2b(0xbc)]();this['_MessageCoreSettings']['helpWordWrap']=_0x3f0dc4;},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0xb6)]=function(){const _0x1c458e=_0x4e69ba;if(this[_0x1c458e(0x200)]===undefined)this[_0x1c458e(0xbc)]();if(this['_MessageCoreSettings'][_0x1c458e(0x1bc)]===undefined)this[_0x1c458e(0xbc)]();return this['_MessageCoreSettings']['choiceLineHeight'];},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x148)]=function(_0x36fbe8){const _0x1ffebd=_0x4e69ba;if(this[_0x1ffebd(0x200)]===undefined)this['initMessageCore']();if(this[_0x1ffebd(0x200)][_0x1ffebd(0x1bc)]===undefined)this[_0x1ffebd(0xbc)]();this[_0x1ffebd(0x200)][_0x1ffebd(0x1bc)]=_0x36fbe8||0x1;},Game_System['prototype'][_0x4e69ba(0x39b)]=function(){const _0x1371c8=_0x4e69ba;if(this[_0x1371c8(0x200)]===undefined)this[_0x1371c8(0xbc)]();if(this['_MessageCoreSettings'][_0x1371c8(0x352)]===undefined)this[_0x1371c8(0xbc)]();return this[_0x1371c8(0x200)][_0x1371c8(0x352)];},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x31b)]=function(_0x45474c){const _0x12b21b=_0x4e69ba;if(this[_0x12b21b(0x200)]===undefined)this[_0x12b21b(0xbc)]();if(this['_MessageCoreSettings']['choiceRows']===undefined)this[_0x12b21b(0xbc)]();this[_0x12b21b(0x200)]['choiceRows']=_0x45474c||0x1;},Game_System['prototype'][_0x4e69ba(0x265)]=function(){const _0x307421=_0x4e69ba;if(this[_0x307421(0x200)]===undefined)this[_0x307421(0xbc)]();if(this['_MessageCoreSettings'][_0x307421(0x220)]===undefined)this[_0x307421(0xbc)]();return this[_0x307421(0x200)][_0x307421(0x220)];},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x177)]=function(_0x2974de){const _0x4e4159=_0x4e69ba;if(this['_MessageCoreSettings']===undefined)this[_0x4e4159(0xbc)]();if(this[_0x4e4159(0x200)]['choiceCols']===undefined)this['initMessageCore']();this['_MessageCoreSettings']['choiceCols']=_0x2974de||0x1;},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x2c8)]=function(){const _0x45b53b=_0x4e69ba;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x45b53b(0x200)][_0x45b53b(0x2bb)]===undefined)this[_0x45b53b(0xbc)]();return this[_0x45b53b(0x200)]['choiceTextAlign'];},Game_System[_0x4e69ba(0x39e)][_0x4e69ba(0x183)]=function(_0x127e24){const _0x1040bb=_0x4e69ba;if(this['_MessageCoreSettings']===undefined)this[_0x1040bb(0xbc)]();if(this[_0x1040bb(0x200)]['choiceTextAlign']===undefined)this[_0x1040bb(0xbc)]();this[_0x1040bb(0x200)][_0x1040bb(0x2bb)]=_0x127e24[_0x1040bb(0x26e)]();},VisuMZ['MessageCore'][_0x4e69ba(0x1df)]=Game_Screen[_0x4e69ba(0x39e)][_0x4e69ba(0x13f)],Game_Screen[_0x4e69ba(0x39e)][_0x4e69ba(0x13f)]=function(){const _0x5960cd=_0x4e69ba;VisuMZ[_0x5960cd(0x133)][_0x5960cd(0x1df)][_0x5960cd(0x1ea)](this),this[_0x5960cd(0x28a)]();},Game_Screen[_0x4e69ba(0x39e)][_0x4e69ba(0x28a)]=function(){const _0x5b0ce7=_0x4e69ba;this['_pictureText']=[],this[_0x5b0ce7(0x38c)]=[],this['_pictureTextRefresh']=[];},Game_Screen[_0x4e69ba(0x39e)][_0x4e69ba(0xba)]=function(_0x1b34ca){const _0x50168e=_0x4e69ba;if(this[_0x50168e(0x15b)]===undefined)this['clearAllPictureTexts']();const _0x409a40=this['realPictureId'](_0x1b34ca);return this[_0x50168e(0x15b)][_0x409a40]=this[_0x50168e(0x15b)][_0x409a40]||{},this[_0x50168e(0x15b)][_0x409a40];},Game_Screen['prototype']['getPictureText']=function(_0x4e9775,_0x583249){const _0x2f7443=_0x4e69ba;return _0x583249=_0x583249['toLowerCase']()[_0x2f7443(0x280)](),this[_0x2f7443(0xba)](_0x4e9775)[_0x583249]||'';},Game_Screen[_0x4e69ba(0x39e)]['setPictureText']=function(_0x3ae88d,_0x9bdc46,_0x5028fd){const _0x5d6339=_0x4e69ba;_0x5028fd=_0x5028fd[_0x5d6339(0x26e)]()[_0x5d6339(0x280)](),this[_0x5d6339(0xba)](_0x3ae88d)[_0x5028fd]=_0x9bdc46||'',this[_0x5d6339(0x2e9)](_0x3ae88d,!![]);},Game_Screen[_0x4e69ba(0x39e)]['eraseAllPictureTexts']=function(_0x5f0e7b){const _0x299cbd=_0x4e69ba;if(this[_0x299cbd(0x15b)]===undefined)this[_0x299cbd(0x28a)]();const _0x5654b6=this[_0x299cbd(0x28c)](_0x5f0e7b);this[_0x299cbd(0x15b)][_0x5654b6]=null,this[_0x299cbd(0x2e9)](_0x5f0e7b,!![]);},Game_Screen[_0x4e69ba(0x39e)]['getPictureTextBuffer']=function(_0xa5c0f3){const _0x4cd2d0=_0x4e69ba;if(this['_pictureText']===undefined)this[_0x4cd2d0(0x28a)]();const _0x59a76c=this[_0x4cd2d0(0x28c)](_0xa5c0f3);return this[_0x4cd2d0(0x38c)][_0x59a76c]||0x0;},Game_Screen[_0x4e69ba(0x39e)][_0x4e69ba(0x1ef)]=function(_0x8ac711,_0x381407){const _0x4a5553=_0x4e69ba;if(this[_0x4a5553(0x15b)]===undefined)this[_0x4a5553(0x28a)]();const _0x58b2d4=this[_0x4a5553(0x28c)](_0x8ac711);this[_0x4a5553(0x38c)][_0x58b2d4]=Math[_0x4a5553(0x205)](0x0,_0x381407);},Game_Screen['prototype']['erasePictureTextBuffer']=function(_0x106b1c){const _0x3f0989=_0x4e69ba;if(this[_0x3f0989(0x15b)]===undefined)this[_0x3f0989(0x28a)]();const _0x5ec68d=this['realPictureId'](_0x106b1c);this[_0x3f0989(0x38c)][_0x5ec68d]=undefined;},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x180)]=Game_Screen[_0x4e69ba(0x39e)][_0x4e69ba(0x202)],Game_Screen[_0x4e69ba(0x39e)][_0x4e69ba(0x202)]=function(_0x4fa128){const _0x5d9d05=_0x4e69ba;VisuMZ[_0x5d9d05(0x133)]['Game_Screen_erasePicture']['call'](this,_0x4fa128),this[_0x5d9d05(0x165)](_0x4fa128),this['erasePictureTextBuffer'](_0x4fa128),this[_0x5d9d05(0x2e9)](_0x4fa128,!![]);},Game_Screen['prototype'][_0x4e69ba(0x2b0)]=function(){const _0x571733=_0x4e69ba;for(const _0x340854 of this[_0x571733(0x32f)]){if(_0x340854){let _0x45b902=this[_0x571733(0x32f)][_0x571733(0x3c5)](_0x340854);this[_0x571733(0x2e9)](_0x45b902);}}},Game_Screen[_0x4e69ba(0x39e)]['requestPictureTextRefresh']=function(_0x4589ac,_0x1314ff){const _0x3e3d0f=_0x4e69ba;this[_0x3e3d0f(0x2af)]=this[_0x3e3d0f(0x2af)]||[],(this[_0x3e3d0f(0x363)](_0x4589ac)||_0x1314ff)&&('AWYMa'!=='AWYMa'?this[_0x3e3d0f(0x347)](![]):this[_0x3e3d0f(0x2af)]['push'](_0x4589ac));},Game_Screen[_0x4e69ba(0x39e)]['needsPictureTextRefresh']=function(_0xe93684){const _0x543ceb=_0x4e69ba;return this[_0x543ceb(0x2af)]=this[_0x543ceb(0x2af)]||[],this[_0x543ceb(0x2af)][_0x543ceb(0x2cc)](_0xe93684);},Game_Screen['prototype'][_0x4e69ba(0x29f)]=function(_0x42e5f3){const _0x4d316b=_0x4e69ba;this[_0x4d316b(0x2af)]=this[_0x4d316b(0x2af)]||[],this[_0x4d316b(0x2af)][_0x4d316b(0x252)](_0x42e5f3);},Game_Screen[_0x4e69ba(0x39e)]['hasPictureText']=function(_0x3cf2fa){const _0x4b7167=_0x4e69ba,_0x44ede6=[_0x4b7167(0x209),'up',_0x4b7167(0x23c),_0x4b7167(0x1b0),_0x4b7167(0x254),_0x4b7167(0x3cd),'lowerleft','down',_0x4b7167(0x2cb)];return _0x44ede6[_0x4b7167(0x2c5)](_0xeb2615=>this[_0x4b7167(0x271)](_0x3cf2fa,_0xeb2615)!=='');},VisuMZ[_0x4e69ba(0x133)]['Game_Party_initialize']=Game_Party['prototype'][_0x4e69ba(0x1a8)],Game_Party[_0x4e69ba(0x39e)]['initialize']=function(){const _0x4daa43=_0x4e69ba;VisuMZ[_0x4daa43(0x133)][_0x4daa43(0x1bf)][_0x4daa43(0x1ea)](this),this['initMessageCore']();},Game_Party[_0x4e69ba(0x39e)][_0x4e69ba(0xbc)]=function(){const _0x5d6f17=_0x4e69ba;this[_0x5d6f17(0x175)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x4e69ba(0x39e)][_0x4e69ba(0x2e3)]=function(){const _0x5814c8=_0x4e69ba;if(this[_0x5814c8(0x175)]===undefined)this[_0x5814c8(0xbc)]();return this[_0x5814c8(0x175)];},Game_Party[_0x4e69ba(0x39e)][_0x4e69ba(0x2c1)]=function(_0x65a85f,_0x5bf3db){const _0x59c444=_0x4e69ba;if(this['_lastGainedItemData']===undefined)this[_0x59c444(0xbc)]();if(!_0x65a85f)return;if(DataManager[_0x59c444(0xbe)](_0x65a85f))this[_0x59c444(0x175)][_0x59c444(0x16d)]=0x0;else{if(DataManager['isWeapon'](_0x65a85f)){if(_0x59c444(0x312)===_0x59c444(0x1ae))return this[_0x59c444(0x2be)](_0x3b2bb9,!![],![]),this[_0x59c444(0x384)](_0x59c444(0x232)),'';else this['_lastGainedItemData'][_0x59c444(0x16d)]=0x1;}else DataManager[_0x59c444(0x2b4)](_0x65a85f)&&(this['_lastGainedItemData'][_0x59c444(0x16d)]=0x2);}this['_lastGainedItemData']['id']=_0x65a85f['id'],this[_0x59c444(0x175)][_0x59c444(0x264)]=_0x5bf3db;},VisuMZ[_0x4e69ba(0x133)]['Game_Party_gainItem']=Game_Party['prototype'][_0x4e69ba(0x3cc)],Game_Party[_0x4e69ba(0x39e)][_0x4e69ba(0x3cc)]=function(_0xafdf24,_0x3b91f6,_0x5c6653){const _0x28aafb=_0x4e69ba;VisuMZ['MessageCore']['Game_Party_gainItem'][_0x28aafb(0x1ea)](this,_0xafdf24,_0x3b91f6,_0x5c6653),_0x3b91f6>0x0&&this[_0x28aafb(0x2c1)](_0xafdf24,_0x3b91f6);},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x201)]=Game_Map[_0x4e69ba(0x39e)]['initialize'],Game_Map[_0x4e69ba(0x39e)][_0x4e69ba(0x1a8)]=function(){const _0x488d95=_0x4e69ba;VisuMZ[_0x488d95(0x133)][_0x488d95(0x201)][_0x488d95(0x1ea)](this),this[_0x488d95(0x37c)]=[];},VisuMZ[_0x4e69ba(0x133)]['Game_Map_setupEvents']=Game_Map[_0x4e69ba(0x39e)]['setupEvents'],Game_Map['prototype'][_0x4e69ba(0x24d)]=function(){const _0x264467=_0x4e69ba;VisuMZ['MessageCore'][_0x264467(0x102)][_0x264467(0x1ea)](this),this[_0x264467(0x37c)]=[];},VisuMZ['MessageCore'][_0x4e69ba(0x1f7)]=Game_Map[_0x4e69ba(0x39e)][_0x4e69ba(0x181)],Game_Map[_0x4e69ba(0x39e)][_0x4e69ba(0x181)]=function(){const _0x15b007=_0x4e69ba;VisuMZ[_0x15b007(0x133)][_0x15b007(0x1f7)][_0x15b007(0x1ea)](this),this[_0x15b007(0x1a7)]();},Game_Map[_0x4e69ba(0x39e)]['addMessageCommonEvent']=function(_0x48f2e6){const _0x6fed7d=_0x4e69ba;if(!$dataCommonEvents[_0x48f2e6])return;this[_0x6fed7d(0x37c)]=this[_0x6fed7d(0x37c)]||[];const _0x4e441a=this['_interpreter'][_0x6fed7d(0x249)],_0x42caed=new Game_MessageCommonEvent(_0x48f2e6,_0x4e441a);this['_messageCommonEvents']['push'](_0x42caed);},Game_Map['prototype'][_0x4e69ba(0x1a7)]=function(){const _0x75bfbb=_0x4e69ba;this[_0x75bfbb(0x37c)]=this['_messageCommonEvents']||[];for(const _0xc9edca of this[_0x75bfbb(0x37c)]){if(!_0xc9edca[_0x75bfbb(0x231)]){if(_0x75bfbb(0x2dd)===_0x75bfbb(0x2dd))this[_0x75bfbb(0x37c)][_0x75bfbb(0x252)](_0xc9edca);else{if(!_0xe499e3[_0xfa2b61])return;this['_messageCommonEvents']=this[_0x75bfbb(0x37c)]||[];const _0xa5c86b=this['_interpreter'][_0x75bfbb(0x249)],_0x38a870=new _0x76d5a6(_0x286fe2,_0xa5c86b);this[_0x75bfbb(0x37c)][_0x75bfbb(0x3b0)](_0x38a870);}}else _0xc9edca[_0x75bfbb(0x2f9)]();}},VisuMZ['MessageCore'][_0x4e69ba(0x204)]=Game_Map[_0x4e69ba(0x39e)][_0x4e69ba(0x132)],Game_Map[_0x4e69ba(0x39e)][_0x4e69ba(0x132)]=function(){const _0x3a5b69=_0x4e69ba;VisuMZ[_0x3a5b69(0x133)][_0x3a5b69(0x204)][_0x3a5b69(0x1ea)](this),$gameScreen[_0x3a5b69(0x2b0)]();},Game_Interpreter[_0x4e69ba(0x39e)]['command101']=function(_0x4ff49d){const _0x2011d4=_0x4e69ba;if($gameMessage['isBusy']())return![];return this[_0x2011d4(0x39a)](_0x4ff49d),this['addContinuousShowTextCommands'](_0x4ff49d),this[_0x2011d4(0x36d)](_0x4ff49d),this[_0x2011d4(0x255)](_0x2011d4(0x2b8)),!![];},Game_Interpreter[_0x4e69ba(0x39e)][_0x4e69ba(0x39a)]=function(_0x15a687){const _0x35481f=_0x4e69ba;$gameMessage[_0x35481f(0x1a6)](_0x15a687[0x0],_0x15a687[0x1]),$gameMessage[_0x35481f(0x364)](_0x15a687[0x2]),$gameMessage[_0x35481f(0x2d6)](_0x15a687[0x3]),$gameMessage[_0x35481f(0x3a7)](_0x15a687[0x4]);},Game_Interpreter['prototype'][_0x4e69ba(0x316)]=function(_0x181764){const _0x53e2e7=_0x4e69ba;while(this[_0x53e2e7(0x28d)]()){if(_0x53e2e7(0x2c6)===_0x53e2e7(0x3cb))_0xc12efd[_0x53e2e7(0x133)][_0x53e2e7(0x131)][_0x53e2e7(0x1ea)](this),this[_0x53e2e7(0x11f)]();else{this[_0x53e2e7(0x15f)]++;if(this[_0x53e2e7(0x14b)]()[_0x53e2e7(0x12c)]===0x191){let _0xf43329=this[_0x53e2e7(0x14b)]()[_0x53e2e7(0x34f)][0x0];_0xf43329=VisuMZ[_0x53e2e7(0x133)][_0x53e2e7(0x172)](_0xf43329),$gameMessage[_0x53e2e7(0x31d)](_0xf43329);}if(this[_0x53e2e7(0x360)]())break;}}},Game_Interpreter[_0x4e69ba(0x39e)][_0x4e69ba(0x28d)]=function(){const _0x24caef=_0x4e69ba;if(this['nextEventCode']()===0x65&&$gameSystem[_0x24caef(0x126)]()>0x4){if(_0x24caef(0x228)===_0x24caef(0x228))return!![];else this[_0x24caef(0x175)]={'type':0x0,'id':0x0,'quantity':0x0};}else return this[_0x24caef(0x18a)]()===0x191;},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x172)]=function(_0x2e4713){const _0x13606a=_0x4e69ba;return _0x2e4713=_0x2e4713[_0x13606a(0x391)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x2e4713=_0x2e4713[_0x13606a(0x391)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x39f1bc,_0x39bc5b)=>this[_0x13606a(0x22b)](_0x39bc5b)),_0x2e4713;},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x22b)]=function(_0x495ece){const _0x20a1b1=_0x4e69ba,_0x35b494=_0x495ece['split']('|')['map'](_0x49349f=>_0x49349f[_0x20a1b1(0x280)]())[_0x20a1b1(0x252)]('')['remove'](null);return _0x35b494[Math['randomInt'](_0x35b494['length'])];},Game_Interpreter[_0x4e69ba(0x39e)][_0x4e69ba(0x360)]=function(){const _0x54ea25=_0x4e69ba;if(this[_0x54ea25(0x14b)]()&&this[_0x54ea25(0x14b)]()[_0x54ea25(0x34f)][0x0][_0x54ea25(0x1ba)](/<(?:NEXT PAGE|NEXTPAGE)>/gi)){if(_0x54ea25(0xc5)===_0x54ea25(0x16a)){const _0xc02b10=_0x4d8545['split']('|')[_0x54ea25(0x122)](_0x4d4623=>_0x4d4623['trim']())['remove']('')[_0x54ea25(0x252)](null);return _0xc02b10[_0x4e8621[_0x54ea25(0x239)](_0xc02b10[_0x54ea25(0x34e)])];}else return!![];}return $gameMessage[_0x54ea25(0x3c1)]['length']>=$gameSystem[_0x54ea25(0x126)]()&&this[_0x54ea25(0x18a)]()!==0x191;},Game_Interpreter[_0x4e69ba(0x39e)][_0x4e69ba(0x36d)]=function(_0x244a54){const _0x1ba5e2=_0x4e69ba;switch(this[_0x1ba5e2(0x18a)]()){case 0x66:this[_0x1ba5e2(0x15f)]++,this['setupChoices'](this[_0x1ba5e2(0x14b)]()[_0x1ba5e2(0x34f)]);break;case 0x67:this['_index']++,this[_0x1ba5e2(0x2ca)](this[_0x1ba5e2(0x14b)]()['parameters']);break;case 0x68:this[_0x1ba5e2(0x15f)]++,this[_0x1ba5e2(0x2fa)](this['currentCommand']()[_0x1ba5e2(0x34f)]);break;}},VisuMZ[_0x4e69ba(0x133)]['Game_Interpreter_setupChoices']=Game_Interpreter[_0x4e69ba(0x39e)][_0x4e69ba(0x10e)],Game_Interpreter['prototype'][_0x4e69ba(0x10e)]=function(_0x5d588d){const _0x4e93b6=_0x4e69ba;_0x5d588d=this[_0x4e93b6(0x1b9)](),VisuMZ[_0x4e93b6(0x133)][_0x4e93b6(0x23b)][_0x4e93b6(0x1ea)](this,_0x5d588d);},Game_Interpreter['prototype'][_0x4e69ba(0x1b9)]=function(){const _0x153beb=_0x4e69ba,_0x4f1dd0=this['_index'],_0xea8211=[];let _0x9559fb=0x0;this[_0x153beb(0x15f)]++;while(this['_index']<this[_0x153beb(0xd1)][_0x153beb(0x34e)]){if(_0x153beb(0x39d)!==_0x153beb(0x1e2)){if(this[_0x153beb(0x14b)]()[_0x153beb(0x21e)]===this[_0x153beb(0x12f)]){if(this[_0x153beb(0x14b)]()['code']===0x194&&this[_0x153beb(0x18a)]()!==0x66)break;else{if(this['currentCommand']()['code']===0x66)this['adjustShowChoiceExtension'](_0x9559fb,this['currentCommand'](),_0x4f1dd0),this['_index']-=0x2;else{if(this[_0x153beb(0x14b)]()[_0x153beb(0x12c)]===0x192){if(_0x153beb(0x19c)!==_0x153beb(0x19c)){const _0x2d65ca=_0x572dc6[_0x153beb(0x133)]['Settings'][_0x153beb(0x3af)];this[_0x153beb(0x323)]=_0x2d65ca[_0x153beb(0x18b)],this[_0x153beb(0x127)]=_0x2d65ca[_0x153beb(0x301)];}else this[_0x153beb(0x14b)]()[_0x153beb(0x34f)][0x0]=_0x9559fb,_0x9559fb++;}}}}this['_index']++;}else{const _0x5f3f0a=['fontFace',_0x153beb(0x120),_0x153beb(0x339),_0x153beb(0x303),_0x153beb(0x259),_0x153beb(0x1c3),_0x153beb(0x2d9),_0x153beb(0xd2)];let _0x5252a9={};for(const _0xad691c of _0x5f3f0a){_0x5252a9[_0xad691c]=this[_0x153beb(0x1b5)][_0xad691c];}return _0x5252a9;}}return this[_0x153beb(0x15f)]=_0x4f1dd0,this[_0x153beb(0x14b)]()[_0x153beb(0x34f)];},Game_Interpreter[_0x4e69ba(0x39e)]['adjustShowChoiceExtension']=function(_0x1bbe57,_0x497253,_0x1d4eb7){const _0x5c5ed6=_0x4e69ba;this[_0x5c5ed6(0x208)](_0x1bbe57,_0x497253,_0x1d4eb7),this['adjustShowChoiceCancel'](_0x1bbe57,_0x497253,_0x1d4eb7),this[_0x5c5ed6(0xff)](_0x497253,_0x1d4eb7);},Game_Interpreter['prototype']['adjustShowChoiceDefault']=function(_0x54be96,_0x444f52,_0x3fc747){const _0x3a66b4=_0x4e69ba;if(_0x444f52[_0x3a66b4(0x34f)][0x2]<0x0)return;const _0x746978=_0x444f52[_0x3a66b4(0x34f)][0x2]+_0x54be96;this[_0x3a66b4(0xd1)][_0x3fc747]['parameters'][0x2]=_0x746978;},Game_Interpreter[_0x4e69ba(0x39e)][_0x4e69ba(0x35a)]=function(_0x39de9d,_0x4ff2bb,_0x2bf688){const _0x177b40=_0x4e69ba;if(_0x4ff2bb[_0x177b40(0x34f)][0x1]>=0x0){if(_0x177b40(0x326)!==_0x177b40(0x326))_0x429fd4=_0x467b3c[_0x177b40(0x26e)]()[_0x177b40(0x280)](),this['getPictureTextData'](_0x10ab89)[_0x32020d]=_0x15df10||'',this['requestPictureTextRefresh'](_0xdfccd5,!![]);else{var _0x82c643=_0x4ff2bb[_0x177b40(0x34f)][0x1]+_0x39de9d;this['_list'][_0x2bf688][_0x177b40(0x34f)][0x1]=_0x82c643;}}else _0x4ff2bb['parameters'][0x1]===-0x2&&(this[_0x177b40(0xd1)][_0x2bf688][_0x177b40(0x34f)][0x1]=_0x4ff2bb['parameters'][0x1]);},Game_Interpreter[_0x4e69ba(0x39e)][_0x4e69ba(0xff)]=function(_0x2565ac,_0x57437d){const _0x265fc5=_0x4e69ba;for(const _0xf613ce of _0x2565ac[_0x265fc5(0x34f)][0x0]){'AIfgO'!==_0x265fc5(0x164)?this['_list'][_0x57437d][_0x265fc5(0x34f)][0x0][_0x265fc5(0x3b0)](_0xf613ce):(this[_0x265fc5(0x371)]['x']=_0x46391c[_0x265fc5(0x340)](this[_0x265fc5(0x111)]/0x2),this['_dimmerSprite'][_0x265fc5(0x304)]['x']=0.5,this[_0x265fc5(0x371)][_0x265fc5(0x27b)]['x']=_0x385cfa[_0x265fc5(0x111)]);}this['_list']['splice'](this['_index']-0x1,0x2);};function Game_MessageCommonEvent(){const _0x19a3d2=_0x4e69ba;this[_0x19a3d2(0x1a8)](...arguments);}Game_MessageCommonEvent[_0x4e69ba(0x39e)][_0x4e69ba(0x1a8)]=function(_0x251ef8,_0x1800c2){const _0x554a9d=_0x4e69ba;this['_commonEventId']=_0x251ef8,this[_0x554a9d(0x249)]=_0x1800c2||0x0,this[_0x554a9d(0x132)]();},Game_MessageCommonEvent[_0x4e69ba(0x39e)]['event']=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x4e69ba(0x39e)][_0x4e69ba(0x1f0)]=function(){const _0x173bda=_0x4e69ba;return this['event']()[_0x173bda(0x1f0)];},Game_MessageCommonEvent[_0x4e69ba(0x39e)][_0x4e69ba(0x132)]=function(){const _0x5856a0=_0x4e69ba;this['_interpreter']=new Game_Interpreter(),this['_interpreter'][_0x5856a0(0x20d)](this[_0x5856a0(0x1f0)](),this[_0x5856a0(0x249)]);},Game_MessageCommonEvent[_0x4e69ba(0x39e)][_0x4e69ba(0x2f9)]=function(){const _0x26b9d0=_0x4e69ba;if(this['_interpreter']){if('oQySK'===_0x26b9d0(0x37b))return this['processAutoSize'](_0x188d7b,!![],!![]),this[_0x26b9d0(0x384)](_0x26b9d0(0x3bf),_0x227b1c(_0x12ab93)||0x0),'';else this[_0x26b9d0(0x231)][_0x26b9d0(0x36b)]()?this[_0x26b9d0(0x231)]['update']():this[_0x26b9d0(0xc1)]();}},Game_MessageCommonEvent['prototype'][_0x4e69ba(0xc1)]=function(){const _0x29dec2=_0x4e69ba;this[_0x29dec2(0x231)]=null;},Scene_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x2a8)]=function(){const _0x3a0a75=_0x4e69ba,_0x36446b=Math[_0x3a0a75(0xf9)](Graphics[_0x3a0a75(0x111)],$gameSystem[_0x3a0a75(0x152)]()),_0x4a1834=$gameSystem[_0x3a0a75(0x126)](),_0x1415e2=this['calcWindowHeight'](_0x4a1834,![]),_0x204aff=(Graphics[_0x3a0a75(0x1b7)]-_0x36446b)/0x2,_0xb40415=0x0;return new Rectangle(_0x204aff,_0xb40415,_0x36446b,_0x1415e2);},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x3c6)]=Scene_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x104)],Scene_Options['prototype']['maxCommands']=function(){const _0x260b43=_0x4e69ba;let _0x4cfb1f=VisuMZ[_0x260b43(0x133)][_0x260b43(0x3c6)][_0x260b43(0x1ea)](this);const _0x415c76=VisuMZ['MessageCore'][_0x260b43(0xe6)];if(_0x415c76[_0x260b43(0x137)][_0x260b43(0x1e8)]&&_0x415c76[_0x260b43(0x137)][_0x260b43(0x247)])_0x4cfb1f++;return _0x4cfb1f;},VisuMZ[_0x4e69ba(0x133)]['Sprite_Picture_updateBitmap']=Sprite_Picture[_0x4e69ba(0x39e)][_0x4e69ba(0x162)],Sprite_Picture[_0x4e69ba(0x39e)][_0x4e69ba(0x162)]=function(){const _0x48d39c=_0x4e69ba;VisuMZ[_0x48d39c(0x133)][_0x48d39c(0x2e6)][_0x48d39c(0x1ea)](this),this['createPictureText']();},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x131)]=Sprite_Picture['prototype'][_0x4e69ba(0x2f9)],Sprite_Picture[_0x4e69ba(0x39e)][_0x4e69ba(0x2f9)]=function(){const _0x17b883=_0x4e69ba;VisuMZ[_0x17b883(0x133)][_0x17b883(0x131)][_0x17b883(0x1ea)](this),this[_0x17b883(0x11f)]();},Sprite_Picture[_0x4e69ba(0x39e)][_0x4e69ba(0x11f)]=function(){const _0xac45a7=_0x4e69ba;if(!this[_0xac45a7(0x32c)])return;this['resizePictureText'](),this[_0xac45a7(0x272)](),this[_0xac45a7(0x23e)](),this[_0xac45a7(0x2ad)]();},Sprite_Picture['prototype']['createPictureText']=function(){const _0x561d37=_0x4e69ba;if(this[_0x561d37(0x10f)])return;if(this[_0x561d37(0x372)])return;const _0x38adfb=new Rectangle(0x0,0x0,0x0,0x0);this[_0x561d37(0x10f)]=new Window_Base(_0x38adfb),this[_0x561d37(0x10f)][_0x561d37(0x234)]=0x0,this[_0x561d37(0x372)]=new Sprite(),this[_0x561d37(0xf2)](this['_pictureTextSprite'],0x0),this[_0x561d37(0x3c7)]=0x0,this['_pictureTextHeight']=0x0,this['_pictureTextCache']={};},Sprite_Picture[_0x4e69ba(0x39e)][_0x4e69ba(0x19a)]=function(){const _0x5a05af=_0x4e69ba;if(!this['_pictureTextWindow'])return;if(this[_0x5a05af(0x3c7)]===this[_0x5a05af(0x111)]&&this[_0x5a05af(0x2f6)]===this[_0x5a05af(0x242)])return;this[_0x5a05af(0x3c7)]=this['width'],this['_pictureTextHeight']=this[_0x5a05af(0x242)],this[_0x5a05af(0x115)]={},this[_0x5a05af(0x10f)][_0x5a05af(0x1e3)](0x0,0x0,this[_0x5a05af(0x111)],this['height']);},Sprite_Picture['prototype'][_0x4e69ba(0x272)]=function(){const _0x3659db=_0x4e69ba;if(!this[_0x3659db(0x372)])return;this[_0x3659db(0x372)][_0x3659db(0x304)]['x']=this[_0x3659db(0x304)]['x'],this['_pictureTextSprite'][_0x3659db(0x304)]['y']=this[_0x3659db(0x304)]['y'];},Sprite_Picture[_0x4e69ba(0x39e)][_0x4e69ba(0x23e)]=function(){const _0x26626e=_0x4e69ba;if(!this['_pictureTextWindow'])return;if(!this[_0x26626e(0x267)]())return;const _0x3a2e53=[_0x26626e(0x209),'up','upperright',_0x26626e(0x1b0),_0x26626e(0x254),_0x26626e(0x3cd),_0x26626e(0x2e5),_0x26626e(0x156),'lowerright'];this['_pictureTextWindow']['createContents']();for(const _0x3a8784 of _0x3a2e53){_0x26626e(0x23d)!==_0x26626e(0x282)?this[_0x26626e(0x110)](_0x3a8784):_0x58f01b=_0x159789[_0x26626e(0x3bb)]((this[_0x26626e(0x242)]-_0x3fc804['height'])/0x2);}},Sprite_Picture[_0x4e69ba(0x39e)][_0x4e69ba(0x267)]=function(){const _0x40a9c2=_0x4e69ba;if($gameScreen[_0x40a9c2(0x159)](this[_0x40a9c2(0x20f)]))return!![];const _0x1ec4ed=[_0x40a9c2(0x209),'up',_0x40a9c2(0x23c),_0x40a9c2(0x1b0),_0x40a9c2(0x254),_0x40a9c2(0x3cd),_0x40a9c2(0x2e5),_0x40a9c2(0x156),_0x40a9c2(0x2cb)];for(const _0xfc40e3 of _0x1ec4ed){const _0x349956=$gameScreen[_0x40a9c2(0x271)](this['_pictureId'],_0xfc40e3);if(this[_0x40a9c2(0x115)][_0xfc40e3]===_0x349956)continue;return!![];}return![];},Sprite_Picture['prototype'][_0x4e69ba(0x110)]=function(_0x3ccb7c){const _0x341c81=_0x4e69ba;$gameScreen['clearPictureTextRefresh'](this[_0x341c81(0x20f)]);const _0x2ec325=$gameScreen[_0x341c81(0x271)](this[_0x341c81(0x20f)],_0x3ccb7c);this[_0x341c81(0x115)][_0x3ccb7c]=_0x2ec325;const _0x1e437c=this[_0x341c81(0x10f)][_0x341c81(0x1ab)](_0x2ec325);let _0x540b22=$gameScreen[_0x341c81(0x12d)](this[_0x341c81(0x20f)]),_0x1ff9a4=_0x540b22,_0x3d5b62=_0x540b22;if(['up',_0x341c81(0x254),'down'][_0x341c81(0x2cc)](_0x3ccb7c)){if(_0x341c81(0xd0)===_0x341c81(0x335)){const _0x52cf64=[_0x341c81(0x1c6),'emerge',_0x341c81(0x240),'surprise','victory','defeat',_0x341c81(0x2d2),_0x341c81(0xbb),_0x341c81(0xd9),_0x341c81(0x370)];let _0x27d7b9=_0x2a0b3a[_0x341c81(0x133)][_0x341c81(0x2e8)]['call'](this,_0x104c74);return _0x52cf64['includes'](_0x6a8799)&&(_0x27d7b9=_0x341c81(0xf4)+_0x27d7b9),_0x27d7b9;}else _0x1ff9a4=Math['floor']((this[_0x341c81(0x111)]-_0x1e437c[_0x341c81(0x111)])/0x2);}else[_0x341c81(0x23c),_0x341c81(0x3cd),_0x341c81(0x2cb)][_0x341c81(0x2cc)](_0x3ccb7c)&&(_0x1ff9a4=Math[_0x341c81(0x3bb)](this[_0x341c81(0x111)]-_0x1e437c['width']-_0x540b22));if([_0x341c81(0x1b0),_0x341c81(0x254),_0x341c81(0x3cd)][_0x341c81(0x2cc)](_0x3ccb7c))_0x3d5b62=Math[_0x341c81(0x3bb)]((this['height']-_0x1e437c['height'])/0x2);else['lowerleft',_0x341c81(0x156),_0x341c81(0x2cb)][_0x341c81(0x2cc)](_0x3ccb7c)&&(_0x3d5b62=Math[_0x341c81(0x3bb)](this[_0x341c81(0x242)]-_0x1e437c[_0x341c81(0x242)]-_0x540b22));this[_0x341c81(0x10f)][_0x341c81(0xcb)](_0x2ec325,_0x1ff9a4,_0x3d5b62);},Sprite_Picture[_0x4e69ba(0x39e)][_0x4e69ba(0x2ad)]=function(){const _0xc05e13=_0x4e69ba;if(!this[_0xc05e13(0x10f)])return;if(!this[_0xc05e13(0x372)])return;this[_0xc05e13(0x372)]['bitmap']=this['_pictureTextWindow']['contents'];},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x2b2)]=Window_Base['prototype'][_0x4e69ba(0x1a8)],Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1a8)]=function(_0x1f4839){const _0x1c3ce7=_0x4e69ba;this[_0x1c3ce7(0xbc)](_0x1f4839),VisuMZ[_0x1c3ce7(0x133)]['Window_Base_initialize'][_0x1c3ce7(0x1ea)](this,_0x1f4839);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0xbc)]=function(_0x439cdd){const _0x4516a1=_0x4e69ba;this[_0x4516a1(0x24e)](),this['resetWordWrap'](),this[_0x4516a1(0x2d7)](_0x439cdd);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x24e)]=function(){const _0x1d0a58=_0x4e69ba;this[_0x1d0a58(0x1a3)](_0x1d0a58(0x11b));},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1a3)]=function(_0x244921){const _0x4abfec=_0x4e69ba;this[_0x4abfec(0x3a6)]=_0x244921;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0xcc)]=function(){return this['_textAlignment'];},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x1be)]=Window_Base['prototype'][_0x4e69ba(0x1ab)],Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1ab)]=function(_0x2d9ea0){const _0x2211b8=_0x4e69ba;return this[_0x2211b8(0x227)](),VisuMZ[_0x2211b8(0x133)]['Window_Base_textSizeEx'][_0x2211b8(0x1ea)](this,_0x2d9ea0);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x11d)]=function(_0x52ea07){const _0x13a8b5=_0x4e69ba;return VisuMZ['MessageCore'][_0x13a8b5(0x1be)]['call'](this,_0x52ea07);},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x342)]=Window_Base[_0x4e69ba(0x39e)]['processAllText'],Window_Base['prototype'][_0x4e69ba(0x233)]=function(_0x476c21){const _0x2f443b=_0x4e69ba;VisuMZ['MessageCore'][_0x2f443b(0x342)][_0x2f443b(0x1ea)](this,_0x476c21);if(_0x476c21['drawing'])this[_0x2f443b(0x1a3)](_0x2f443b(0x11b));},Window_Base[_0x4e69ba(0x39e)]['resetWordWrap']=function(){const _0x1424eb=_0x4e69ba;this[_0x1424eb(0x347)](![]);},Window_Base['prototype']['isWordWrapEnabled']=function(){const _0x3b633d=_0x4e69ba;return this[_0x3b633d(0x174)];},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x347)]=function(_0x389b8c){const _0x5deff5=_0x4e69ba;return this[_0x5deff5(0x174)]=_0x389b8c,'';},Window_Base['prototype'][_0x4e69ba(0x2d7)]=function(_0x4bb372){const _0x1c4450=_0x4e69ba;this['_resetRect']=JsonEx[_0x1c4450(0x1dc)](_0x4bb372);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x307)]=function(){const _0xc63b28=_0x4e69ba;this[_0xc63b28(0x1b5)][_0xc63b28(0x197)]=$gameSystem[_0xc63b28(0x18d)](),this[_0xc63b28(0x1b5)][_0xc63b28(0x120)]=$gameSystem[_0xc63b28(0x2b7)](),this[_0xc63b28(0x1b5)][_0xc63b28(0x339)]=![],this[_0xc63b28(0x1b5)][_0xc63b28(0x303)]=![],this[_0xc63b28(0x341)]();},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x341)]=function(){const _0x2b82ad=_0x4e69ba;this[_0x2b82ad(0x30d)](ColorManager['normalColor']()),this[_0x2b82ad(0x1c8)](ColorManager[_0x2b82ad(0x149)]());const _0x5a0fc7=VisuMZ[_0x2b82ad(0x133)][_0x2b82ad(0xe6)]['General'];_0x5a0fc7['DefaultOutlineWidth']===undefined&&(_0x5a0fc7[_0x2b82ad(0x124)]=0x3),this['contents']['outlineWidth']=_0x5a0fc7[_0x2b82ad(0x124)],this['setColorLock'](![]);},Window_Base[_0x4e69ba(0x39e)]['setColorLock']=function(_0x1ac6cd){const _0x15b066=_0x4e69ba;this[_0x15b066(0x296)]=_0x1ac6cd;},Window_Base[_0x4e69ba(0x39e)]['isColorLocked']=function(){const _0x3907ca=_0x4e69ba;return this[_0x3907ca(0x296)];},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x2f1)]=function(){return![];},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x333)]=function(){const _0x5261a1=_0x4e69ba,_0x19ad4f=['fontFace','fontSize',_0x5261a1(0x339),_0x5261a1(0x303),_0x5261a1(0x259),_0x5261a1(0x1c3),'outlineWidth',_0x5261a1(0xd2)];let _0x135689={};for(const _0x23212b of _0x19ad4f){_0x135689[_0x23212b]=this['contents'][_0x23212b];}return _0x135689;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x170)]=function(_0x4277cc){const _0x406309=_0x4e69ba;for(const _0x5474a4 in _0x4277cc){this[_0x406309(0x1b5)][_0x5474a4]=_0x4277cc[_0x5474a4];}},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x16e)]=Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x2f9)],Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x2f9)]=function(){const _0x4681e4=_0x4e69ba;VisuMZ[_0x4681e4(0x133)][_0x4681e4(0x16e)][_0x4681e4(0x1ea)](this),this['updateMove']();},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x28e)]=function(){return![];},Window_Base[_0x4e69ba(0x39e)]['updateMove']=function(){const _0x4ea71e=_0x4e69ba;this[_0x4ea71e(0x2b6)]>0x0&&(_0x4ea71e(0x2f5)===_0x4ea71e(0xb9)?(_0x1342e3[_0x4ea71e(0x133)][_0x4ea71e(0x3ca)]['call'](this),this[_0x4ea71e(0x2e0)]()):(this[_0x4ea71e(0x28e)]()&&('BkUUu'!==_0x4ea71e(0x22e)?_0x4d9112=_0x5c1b66['name']:(this['x']=this['applyMoveEasing'](this['x'],this[_0x4ea71e(0x278)]),this['y']=this[_0x4ea71e(0x117)](this['y'],this[_0x4ea71e(0x1d8)]),this[_0x4ea71e(0x111)]=this[_0x4ea71e(0x117)](this[_0x4ea71e(0x111)],this['_moveTargetWidth']),this[_0x4ea71e(0x242)]=this[_0x4ea71e(0x117)](this[_0x4ea71e(0x242)],this[_0x4ea71e(0x10d)]),this['clampPlacementPosition']())),this[_0x4ea71e(0x2b6)]--));},Window_Base[_0x4e69ba(0x39e)]['clampPlacementPosition']=function(_0x932427,_0x1f641c){const _0x569285=_0x4e69ba;!_0x932427&&(_0x569285(0x37e)===_0x569285(0x37e)?(this[_0x569285(0x111)]=Math[_0x569285(0xf9)](this[_0x569285(0x111)],Graphics['width']),this[_0x569285(0x242)]=Math[_0x569285(0xf9)](this[_0x569285(0x242)],Graphics[_0x569285(0x242)])):this[_0x569285(0x347)](![]));if(!_0x1f641c){if(_0x569285(0xe9)!==_0x569285(0xe9))this[_0x569285(0x346)]=_0x4280ba[_0x569285(0x1dc)](_0x543240);else{const _0x511a03=-(Math[_0x569285(0x3bb)](Graphics['width']-Graphics[_0x569285(0x1b7)])/0x2),_0x1e3aa7=_0x511a03+Graphics[_0x569285(0x111)]-this[_0x569285(0x111)],_0x433f9a=-(Math['floor'](Graphics[_0x569285(0x242)]-Graphics['boxHeight'])/0x2),_0x26a90d=_0x433f9a+Graphics[_0x569285(0x242)]-this[_0x569285(0x242)];this['x']=this['x']['clamp'](_0x511a03,_0x1e3aa7),this['y']=this['y'][_0x569285(0x2dc)](_0x433f9a,_0x26a90d);}}},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x117)]=function(_0x49ffaf,_0x4505ed){const _0x57e1fe=_0x4e69ba,_0x437acf=this['_moveDuration'],_0x527524=this[_0x57e1fe(0x2f0)],_0x1ef49e=this[_0x57e1fe(0x284)]((_0x527524-_0x437acf)/_0x527524),_0x7c5107=this[_0x57e1fe(0x284)]((_0x527524-_0x437acf+0x1)/_0x527524),_0x369db2=(_0x49ffaf-_0x4505ed*_0x1ef49e)/(0x1-_0x1ef49e);return _0x369db2+(_0x4505ed-_0x369db2)*_0x7c5107;},Window_Base['prototype'][_0x4e69ba(0x284)]=function(_0xc5bdf5){const _0x33b227=_0x4e69ba,_0x29289d=0x2;switch(this['_moveEasingType']){case 0x0:return _0xc5bdf5;case 0x1:return this['easeIn'](_0xc5bdf5,_0x29289d);case 0x2:return this['easeOut'](_0xc5bdf5,_0x29289d);case 0x3:return this[_0x33b227(0x3b6)](_0xc5bdf5,_0x29289d);default:if(Imported[_0x33b227(0xcf)]){if(_0x33b227(0x1b1)!=='pKWXy'){if(this[_0x33b227(0x200)]===_0x17a069)this[_0x33b227(0xbc)]();if(this[_0x33b227(0x200)][_0x33b227(0x352)]===_0x50777c)this[_0x33b227(0xbc)]();this[_0x33b227(0x200)][_0x33b227(0x352)]=_0x20607c||0x1;}else return VisuMZ[_0x33b227(0x117)](_0xc5bdf5,this[_0x33b227(0x101)]);}else return _0xc5bdf5;}},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x258)]=function(_0x3e58dd,_0x52e773,_0x3927be,_0x432c67,_0xac474e,_0x4d5a74){const _0x23fa9f=_0x4e69ba;this[_0x23fa9f(0x278)]=_0x3e58dd,this[_0x23fa9f(0x1d8)]=_0x52e773,this[_0x23fa9f(0x24b)]=_0x3927be||this[_0x23fa9f(0x111)],this[_0x23fa9f(0x10d)]=_0x432c67||this[_0x23fa9f(0x242)],this['_moveDuration']=_0xac474e||0x1;if(this[_0x23fa9f(0x2b6)]<=0x0)this[_0x23fa9f(0x2b6)]=0x1;this[_0x23fa9f(0x2f0)]=this[_0x23fa9f(0x2b6)],this[_0x23fa9f(0x101)]=_0x4d5a74||0x0;if(_0xac474e<=0x0)this[_0x23fa9f(0x186)]();},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1a1)]=function(_0x4c9744,_0x3b399e,_0x5804f1,_0x1427cc,_0x1652aa,_0x5f59e9){const _0x439fe2=_0x4e69ba;this[_0x439fe2(0x278)]=this['x']+_0x4c9744,this[_0x439fe2(0x1d8)]=this['y']+_0x3b399e,this['_moveTargetWidth']=this[_0x439fe2(0x111)]+(_0x5804f1||0x0),this[_0x439fe2(0x10d)]=this[_0x439fe2(0x242)]+(_0x1427cc||0x0),this['_moveDuration']=_0x1652aa||0x1;if(this[_0x439fe2(0x2b6)]<=0x0)this[_0x439fe2(0x2b6)]=0x1;this['_wholeMoveDuration']=this['_moveDuration'],this[_0x439fe2(0x101)]=_0x5f59e9||0x0;if(_0x1652aa<=0x0)this[_0x439fe2(0x186)]();},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x230)]=function(_0x1e5bb0,_0x22998f){const _0x349a76=_0x4e69ba;this[_0x349a76(0x258)](this[_0x349a76(0x346)]['x'],this[_0x349a76(0x346)]['y'],this[_0x349a76(0x346)][_0x349a76(0x111)],this[_0x349a76(0x346)][_0x349a76(0x242)],_0x1e5bb0,_0x22998f);},VisuMZ[_0x4e69ba(0x133)]['Window_Base_changeTextColor']=Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x30d)],Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x30d)]=function(_0x4a42c0){const _0x23b0c9=_0x4e69ba;if(this[_0x23b0c9(0x1fb)]())return;_0x4a42c0=_0x4a42c0[_0x23b0c9(0x391)](/\,/g,''),this[_0x23b0c9(0x350)]=this[_0x23b0c9(0x350)]||[],this['_textColorStack']['unshift'](this[_0x23b0c9(0x1b5)][_0x23b0c9(0x259)]),VisuMZ[_0x23b0c9(0x133)][_0x23b0c9(0x23f)][_0x23b0c9(0x1ea)](this,_0x4a42c0);},Window_Base[_0x4e69ba(0x39e)]['processPreviousColor']=function(_0x5b49e9){const _0x1d18c5=_0x4e69ba;this[_0x1d18c5(0x14c)](_0x5b49e9);if(this['isColorLocked']())return;_0x5b49e9['drawing']&&(this[_0x1d18c5(0x350)]=this[_0x1d18c5(0x350)]||[],this[_0x1d18c5(0x1b5)][_0x1d18c5(0x259)]=this['_textColorStack'][_0x1d18c5(0x33b)]()||ColorManager[_0x1d18c5(0xe0)]());},Window_Base['prototype']['convertEscapeCharacters']=function(_0x419bc1){const _0x4188da=_0x4e69ba;return _0x419bc1=this[_0x4188da(0x222)](_0x419bc1),_0x419bc1=this['convertBackslashCharacters'](_0x419bc1),_0x419bc1=this[_0x4188da(0x253)](_0x419bc1),_0x419bc1=this[_0x4188da(0xe5)](_0x419bc1),_0x419bc1=this[_0x4188da(0x1f2)](_0x419bc1),_0x419bc1=this[_0x4188da(0x16f)](_0x419bc1),_0x419bc1=this['convertFontSettingsEscapeCharacters'](_0x419bc1),_0x419bc1=this[_0x4188da(0x38e)](_0x419bc1),_0x419bc1=this[_0x4188da(0x21c)](_0x419bc1),_0x419bc1=this['convertBaseEscapeCharacters'](_0x419bc1),_0x419bc1=this[_0x4188da(0x32e)](_0x419bc1),_0x419bc1=this[_0x4188da(0x2db)](_0x419bc1),_0x419bc1=this[_0x4188da(0x3b9)](_0x419bc1),_0x419bc1=this[_0x4188da(0xdb)](_0x419bc1),_0x419bc1=this[_0x4188da(0x253)](_0x419bc1),_0x419bc1=this[_0x4188da(0x3cf)](_0x419bc1),_0x419bc1=this['prepareWordWrapEscapeCharacters'](_0x419bc1),_0x419bc1;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x222)]=function(_0x5db15b){const _0x4e49d4=_0x4e69ba;this['_textMacroFound']=![];for(const _0x58db58 of VisuMZ[_0x4e49d4(0x133)][_0x4e49d4(0xe6)][_0x4e49d4(0x2ff)]){if(_0x4e49d4(0x29b)!==_0x4e49d4(0x1db)){if(_0x5db15b[_0x4e49d4(0x1ba)](_0x58db58['textCodeCheck'])){if('GNwYP'!==_0x4e49d4(0x37d))return _0x4d11bd[this['_commonEventId']];else this[_0x4e49d4(0x1a9)]=!![],_0x5db15b=_0x5db15b[_0x4e49d4(0x391)](_0x58db58[_0x4e49d4(0x3c2)],_0x58db58['textCodeResult'][_0x4e49d4(0x2a5)](this));}}else{const _0x3551b4=_0x501a85[_0x4e49d4(0x2e3)]();if(_0x3551b4['id']<0x0)return'';let _0x2b291c=null;if(_0x3551b4[_0x4e49d4(0x16d)]===0x0)_0x2b291c=_0x49c892[_0x3551b4['id']];if(_0x3551b4[_0x4e49d4(0x16d)]===0x1)_0x2b291c=_0x19ddc6[_0x3551b4['id']];if(_0x3551b4[_0x4e49d4(0x16d)]===0x2)_0x2b291c=_0x2824a7[_0x3551b4['id']];if(!_0x2b291c)return'';return _0x36c26f?_0x4e49d4(0x2bf)[_0x4e49d4(0x31e)](_0x2b291c['iconIndex'],_0x2b291c[_0x4e49d4(0xfb)]):_0x2b291c['name'];}}return _0x5db15b;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x35f)]=function(_0x108e64){const _0x31972e=_0x4e69ba;return _0x108e64=_0x108e64[_0x31972e(0x391)](/\\/g,'\x1b'),_0x108e64=_0x108e64['replace'](/\x1b\x1b/g,'\x5c'),_0x108e64;},Window_Base[_0x4e69ba(0x39e)]['convertVariableEscapeCharacters']=function(_0x4d4370){const _0x1c6363=_0x4e69ba;for(;;){if(_0x4d4370['match'](/\\V\[(\d+)\]/gi))_0x4d4370=_0x4d4370[_0x1c6363(0x391)](/\\V\[(\d+)\]/gi,(_0xffdb34,_0x566e22)=>this[_0x1c6363(0x35f)](String($gameVariables[_0x1c6363(0x1e1)](parseInt(_0x566e22)))));else{if(_0x4d4370['match'](/\x1bV\[(\d+)\]/gi))_0x4d4370=_0x4d4370[_0x1c6363(0x391)](/\x1bV\[(\d+)\]/gi,(_0x23a0d1,_0x588853)=>this[_0x1c6363(0x35f)](String($gameVariables[_0x1c6363(0x1e1)](parseInt(_0x588853)))));else{if(_0x1c6363(0x34c)!==_0x1c6363(0x34c)){const _0x25cadc=_0x5db394['$1']['split'](',')[_0x1c6363(0x122)](_0x1c31cb=>_0x1b2690(_0x1c31cb)||0x0);for(const _0x171d66 of _0x25cadc){if(!_0x19bb05[_0x1c6363(0x1e1)](_0x171d66))return![];}return!![];}else break;}}}return _0x4d4370;},Window_Base['prototype'][_0x4e69ba(0xe5)]=function(_0x40a440){const _0x4a4013=_0x4e69ba;return Imported[_0x4a4013(0xcf)]&&(_0x40a440=_0x40a440[_0x4a4013(0x391)](/<Up (?:KEY|BUTTON)>/gi,this[_0x4a4013(0x1d1)]('up')),_0x40a440=_0x40a440[_0x4a4013(0x391)](/<Left (?:KEY|BUTTON)>/gi,this[_0x4a4013(0x1d1)](_0x4a4013(0x1b0))),_0x40a440=_0x40a440[_0x4a4013(0x391)](/<Right (?:KEY|BUTTON)>/gi,this[_0x4a4013(0x1d1)]('right')),_0x40a440=_0x40a440[_0x4a4013(0x391)](/<Down (?:KEY|BUTTON)>/gi,this[_0x4a4013(0x1d1)](_0x4a4013(0x156))),_0x40a440=_0x40a440[_0x4a4013(0x391)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x4a4013(0x1d1)]('ok')),_0x40a440=_0x40a440[_0x4a4013(0x391)](/<Cancel (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4a4013(0x1ce))),_0x40a440=_0x40a440['replace'](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('menu')),_0x40a440=_0x40a440[_0x4a4013(0x391)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x4a4013(0x1d1)]('shift')),_0x40a440=_0x40a440[_0x4a4013(0x391)](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x4a4013(0x12b))),_0x40a440=_0x40a440[_0x4a4013(0x391)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x4a4013(0x1d1)]('pagedown'))),_0x40a440;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1d1)]=function(_0x5eb787){const _0x3bd8bf=_0x4e69ba;let _0xf7e0cb=TextManager[_0x3bd8bf(0x2fb)](_0x5eb787)||'';return _0xf7e0cb=this[_0x3bd8bf(0x35f)](_0xf7e0cb),_0xf7e0cb=this[_0x3bd8bf(0x253)](_0xf7e0cb),_0xf7e0cb[_0x3bd8bf(0x280)]();},Window_Base['prototype']['preConvertEscapeCharacters']=function(_0x3d257d){const _0x1c7fb2=_0x4e69ba;return this[_0x1c7fb2(0x2aa)](),_0x3d257d;},Window_Base['prototype']['postConvertEscapeCharacters']=function(_0x537af3){return _0x537af3;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x16f)]=function(_0x5d4629){const _0xad9fe=_0x4e69ba;if(this['isChoiceWindow']()){if('AoxrC'===_0xad9fe(0x211)){if(_0x4b8818[_0xad9fe(0x25c)]===_0x262cc9){if(_0x4bf2d3[_0xad9fe(0x2c9)]==='')this[_0xad9fe(0x14c)](_0x207f11);_0x2d46c8['ActionJS'][_0xad9fe(0x1ea)](this,_0x24a686);if(this['constructor']===_0x3f03f6){const _0x558bd6=_0x2717aa[_0xad9fe(0x324)]||0x0;if(_0x558bd6>0x0)this[_0xad9fe(0x3c4)](_0x558bd6);}}}else _0x5d4629=_0x5d4629['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x5d4629=_0x5d4629[_0xad9fe(0x391)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x5d4629=_0x5d4629['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x5d4629=_0x5d4629['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x5d4629=_0x5d4629[_0xad9fe(0x391)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x5d4629=_0x5d4629[_0xad9fe(0x391)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,'');}return _0x5d4629;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x14d)]=function(){const _0x5172ce=_0x4e69ba,_0x412372=[_0x5172ce(0x305),_0x5172ce(0x189)];return _0x412372['includes'](this['constructor'][_0x5172ce(0xfb)]);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x10b)]=function(_0x7c8ac3){const _0x1f4f2a=_0x4e69ba;return _0x7c8ac3=_0x7c8ac3[_0x1f4f2a(0x391)](/<B>/gi,_0x1f4f2a(0x116)),_0x7c8ac3=_0x7c8ac3[_0x1f4f2a(0x391)](/<\/B>/gi,'\x1bBOLD[0]'),_0x7c8ac3=_0x7c8ac3['replace'](/<I>/gi,'\x1bITALIC[1]'),_0x7c8ac3=_0x7c8ac3['replace'](/<\/I>/gi,_0x1f4f2a(0x188)),_0x7c8ac3;},Window_Base['prototype'][_0x4e69ba(0x38e)]=function(_0x1aab90){const _0x1a796b=_0x4e69ba;return _0x1aab90=_0x1aab90['replace'](/<LEFT>/gi,_0x1a796b(0x1a5)),_0x1aab90=_0x1aab90[_0x1a796b(0x391)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x1aab90=_0x1aab90[_0x1a796b(0x391)](/<CENTER>/gi,_0x1a796b(0x3c3)),_0x1aab90=_0x1aab90['replace'](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x1aab90=_0x1aab90[_0x1a796b(0x391)](/<RIGHT>/gi,_0x1a796b(0x27e)),_0x1aab90=_0x1aab90[_0x1a796b(0x391)](/<\/RIGHT>/gi,_0x1a796b(0x376)),_0x1aab90;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x21c)]=function(_0x3ee34a){const _0x7e4c7d=_0x4e69ba;return _0x3ee34a=_0x3ee34a['replace'](/<COLORLOCK>/gi,_0x7e4c7d(0xdf)),_0x3ee34a=_0x3ee34a['replace'](/<\/COLORLOCK>/gi,_0x7e4c7d(0x198)),_0x3ee34a=_0x3ee34a['replace'](/\(\(\(/gi,_0x7e4c7d(0xdf)),_0x3ee34a=_0x3ee34a['replace'](/\)\)\)/gi,_0x7e4c7d(0x198)),_0x3ee34a;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1c9)]=function(_0x831a0){const _0x17a606=_0x4e69ba;return _0x831a0=_0x831a0[_0x17a606(0x391)](/\x1bN\[(\d+)\]/gi,(_0x14e398,_0x24c681)=>this[_0x17a606(0x351)](parseInt(_0x24c681))),_0x831a0=_0x831a0['replace'](/\x1bP\[(\d+)\]/gi,(_0x21b9b0,_0x463e3d)=>this[_0x17a606(0x1cb)](parseInt(_0x463e3d))),_0x831a0=_0x831a0[_0x17a606(0x391)](/\x1bG/gi,TextManager['currencyUnit']),_0x831a0;},Window_Base['prototype'][_0x4e69ba(0x32e)]=function(_0xe80218){const _0x18850b=_0x4e69ba;return _0xe80218=_0xe80218[_0x18850b(0x391)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0xe80218=_0xe80218['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0xe80218=_0xe80218[_0x18850b(0x391)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x18850b(0x2f8)](!![])),_0xe80218=_0xe80218[_0x18850b(0x391)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x18850b(0x2f8)](![])),_0xe80218;},Window_Base['prototype']['battleTargetName']=function(){const _0x7bbc67=_0x4e69ba;if(!SceneManager[_0x7bbc67(0x388)]())return'';if(BattleManager[_0x7bbc67(0x13e)])return BattleManager[_0x7bbc67(0x13e)][_0x7bbc67(0xfb)]();if(BattleManager[_0x7bbc67(0xc6)][0x0])return BattleManager[_0x7bbc67(0xc6)][0x0][_0x7bbc67(0xfb)]();return'';},Window_Base['prototype']['battleUserName']=function(){const _0x45fb89=_0x4e69ba;if(!SceneManager[_0x45fb89(0x388)]())return'';let _0x2e2557=null;return _0x2e2557=BattleManager[_0x45fb89(0x139)],!_0x2e2557&&BattleManager[_0x45fb89(0x2ec)]()&&(_0x45fb89(0x379)===_0x45fb89(0x136)?_0x4d9caf['DefaultOutlineWidth']=0x3:_0x2e2557=BattleManager[_0x45fb89(0x1d9)]()),_0x2e2557?_0x2e2557[_0x45fb89(0xfb)]():'';},Window_Base['prototype'][_0x4e69ba(0x2f8)]=function(_0x3b390a){const _0x2443df=_0x4e69ba;if(!SceneManager[_0x2443df(0x388)]())return'';let _0x624747=BattleManager[_0x2443df(0x13c)]||null;!_0x624747&&BattleManager[_0x2443df(0x2ec)]()&&(_0x624747=BattleManager[_0x2443df(0x2ef)]());if(_0x624747&&_0x624747[_0x2443df(0x349)]()){let _0x282803='';if(_0x3b390a)_0x282803+='\x1bI[%1]'[_0x2443df(0x31e)](_0x624747[_0x2443df(0x349)]()[_0x2443df(0x15a)]);return _0x282803+=_0x624747[_0x2443df(0x349)]()[_0x2443df(0xfb)],_0x282803;}return'';},Window_Base[_0x4e69ba(0x39e)]['convertMessageCoreEscapeActions']=function(_0x566f7d){const _0x3c6706=_0x4e69ba;for(const _0x2476c9 of VisuMZ['MessageCore'][_0x3c6706(0xe6)][_0x3c6706(0x1f9)]){if(_0x3c6706(0x26f)==='SaBCU')_0x566f7d[_0x3c6706(0x1ba)](_0x2476c9['textCodeCheck'])&&(_0x566f7d=_0x566f7d['replace'](_0x2476c9[_0x3c6706(0x3c2)],_0x2476c9['textCodeResult']),_0x566f7d=this[_0x3c6706(0x253)](_0x566f7d));else{let _0x254861='';if(_0x1a72a7)_0x254861+=_0x3c6706(0x1e5)['format'](_0x5384ea[_0x3c6706(0x349)]()[_0x3c6706(0x15a)]);return _0x254861+=_0x4f52ba[_0x3c6706(0x349)]()[_0x3c6706(0xfb)],_0x254861;}}return _0x566f7d;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x3b9)]=function(_0x2773f3){const _0x3586f0=_0x4e69ba;for(const _0x143482 of VisuMZ[_0x3586f0(0x133)][_0x3586f0(0xe6)][_0x3586f0(0x195)]){_0x2773f3[_0x3586f0(0x1ba)](_0x143482[_0x3586f0(0x3c2)])&&(_0x3586f0(0x295)!==_0x3586f0(0xce)?(_0x2773f3=_0x2773f3[_0x3586f0(0x391)](_0x143482[_0x3586f0(0x3c2)],_0x143482[_0x3586f0(0x268)][_0x3586f0(0x2a5)](this)),_0x2773f3=this[_0x3586f0(0x253)](_0x2773f3)):_0x5be10e['x']-=_0x33b65b[_0x3586f0(0x1c2)]);}return _0x2773f3;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x351)]=function(_0x2dadf6){const _0x188a4f=_0x4e69ba,_0x33fe80=_0x2dadf6>=0x1?$gameActors[_0x188a4f(0x1d9)](_0x2dadf6):null,_0x1696a4=_0x33fe80?_0x33fe80[_0x188a4f(0xfb)]():'',_0x4719e1=Number(VisuMZ['MessageCore']['Settings'][_0x188a4f(0x1fa)][_0x188a4f(0xc3)]);if(this[_0x188a4f(0x2f1)]()&&_0x4719e1!==0x0)return _0x188a4f(0x18c)[_0x188a4f(0x31e)](_0x4719e1,_0x1696a4);else{if(_0x188a4f(0x287)!==_0x188a4f(0x256))return _0x1696a4;else{const _0x49738c=this[_0x188a4f(0x2a0)](_0x2ea980),_0x4731eb=_0xd7997a[_0x188a4f(0x2c8)]()!==_0x188a4f(0x11b)?_0x188a4f(0x3ad)[_0x188a4f(0x31e)](_0x3ff659['getChoiceListTextAlign']()):'',_0x578612=_0x4731eb+this['commandName'](_0x6c60d4);this[_0x188a4f(0x300)](this[_0x188a4f(0x2a6)](_0x45981b));const _0x432f01=this[_0x188a4f(0x1ab)](_0x578612)[_0x188a4f(0x242)],_0x5d1ba0=_0x49738c['x']+this[_0x188a4f(0x171)](_0x578612),_0x395b55=_0x1063c5['max'](_0x49738c['y'],_0x49738c['y']+_0x3bbdc2['round']((_0x49738c[_0x188a4f(0x242)]-_0x432f01)/0x2));this[_0x188a4f(0xcb)](_0x578612,_0x5d1ba0,_0x395b55,_0x49738c[_0x188a4f(0x111)]),this[_0x188a4f(0x1b2)](_0x3208ef);}}},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1cb)]=function(_0x108b50){const _0x2df4db=_0x4e69ba,_0x3e23ea=_0x108b50>=0x1?$gameParty[_0x2df4db(0x119)]()[_0x108b50-0x1]:null,_0x16ead5=_0x3e23ea?_0x3e23ea[_0x2df4db(0xfb)]():'',_0x407051=Number(VisuMZ[_0x2df4db(0x133)][_0x2df4db(0xe6)]['AutoColor'][_0x2df4db(0xc3)]);return this['isAutoColorAffected']()&&_0x407051!==0x0?_0x2df4db(0x18c)[_0x2df4db(0x31e)](_0x407051,_0x16ead5):_0x16ead5;},Window_Base[_0x4e69ba(0x39e)]['processAutoColorWords']=function(_0x3bde75){const _0x1fe58c=_0x4e69ba;return this['isAutoColorAffected']()&&(_0x3bde75=this[_0x1fe58c(0x359)](_0x3bde75),_0x3bde75=this[_0x1fe58c(0x30b)](_0x3bde75)),_0x3bde75;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x359)]=function(_0x398bc1){const _0x1828bf=_0x4e69ba;for(autoColor of VisuMZ[_0x1828bf(0x133)][_0x1828bf(0x2ae)]){_0x398bc1=_0x398bc1[_0x1828bf(0x391)](autoColor[0x0],autoColor[0x1]);}return _0x398bc1;},Window_Base[_0x4e69ba(0x39e)]['clearActorNameAutoColor']=function(){const _0x3cc1a3=_0x4e69ba;this[_0x3cc1a3(0x260)]=[];},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x2aa)]=function(){const _0x3c2220=_0x4e69ba;this[_0x3c2220(0x293)]();const _0x16f464=VisuMZ[_0x3c2220(0x133)][_0x3c2220(0xe6)]['AutoColor'],_0x5435d7=_0x16f464[_0x3c2220(0xc3)];if(_0x5435d7<=0x0)return;for(const _0x55ad59 of $gameActors['_data']){if(_0x3c2220(0x367)===_0x3c2220(0x27f)){const _0x3ec1cd=_0x5b6163['split'](',')[_0x3c2220(0x122)](_0xb2dbac=>_0x2683dc(_0xb2dbac)||0x0);if(_0x3ec1cd[0x0]!==_0x3762d7)this['_forcedPosition'][_0x3c2220(0x111)]=_0x227ff1(_0x3ec1cd[0x2]);if(_0x3ec1cd[0x1]!==_0x3a69bc)this[_0x3c2220(0xe3)]['height']=_0x49c6c6(_0x3ec1cd[0x3]);return'';}else{if(!_0x55ad59)continue;const _0xf56215=_0x55ad59[_0x3c2220(0xfb)]();if(_0xf56215[_0x3c2220(0x280)]()['length']<=0x0)continue;if(/^\d+$/[_0x3c2220(0x134)](_0xf56215))continue;if(_0xf56215[_0x3c2220(0x1ba)](/-----/i))continue;let _0x2e082b=VisuMZ[_0x3c2220(0x133)][_0x3c2220(0x2c3)](_0xf56215);const _0x23a886=new RegExp('\x5cb'+_0x2e082b+'\x5cb','g'),_0x2411ca='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x3c2220(0x31e)](_0x5435d7,_0xf56215);this[_0x3c2220(0x260)][_0x3c2220(0x3b0)]([_0x23a886,_0x2411ca]);}}},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x30b)]=function(_0x4fd488){const _0x37313c=_0x4e69ba;if(this['_autoColorActorNames']===undefined){if(_0x37313c(0x39c)==='kiMLp'){const _0x2f6aeb=_0x127dea['$1'][_0x37313c(0x308)](',')[_0x37313c(0x122)](_0x22e4b3=>_0x3031e9(_0x22e4b3)||0x0);for(const _0x362b75 of _0x2f6aeb){if(_0x3130ce[_0x37313c(0x1e1)](_0x362b75))return!![];}return![];}else this['registerActorNameAutoColorChanges']();}for(autoColor of this[_0x37313c(0x260)]){_0x4fd488=_0x4fd488[_0x37313c(0x391)](autoColor[0x0],autoColor[0x1]);}return _0x4fd488;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x168)]=function(_0x53e25c,_0x16761b,_0x4e221c){const _0x462737=_0x4e69ba;if(!_0x53e25c)return'';const _0x24115c=_0x53e25c[_0x16761b];let _0x27f738='';if(_0x24115c&&_0x4e221c&&_0x24115c[_0x462737(0x15a)]){const _0x1b6bfc=_0x462737(0x2bf);_0x27f738=_0x1b6bfc[_0x462737(0x31e)](_0x24115c[_0x462737(0x15a)],_0x24115c['name']);}else _0x24115c?_0x27f738=_0x24115c[_0x462737(0xfb)]:_0x27f738='';if(this['isAutoColorAffected']()){if('rPnaH'===_0x462737(0xb7))_0x27f738=this[_0x462737(0x1bd)](_0x27f738,_0x53e25c);else{const _0x53659b=this[_0x462737(0x398)](_0x2c38ba);if(_0x53659b===_0x462737(0x2d1))return this[_0x462737(0x38d)]();return _0x535370[_0x462737(0x133)]['Window_Options_statusText'][_0x462737(0x1ea)](this,_0x4c6f42);}}return _0x27f738;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1d4)]=function(_0x30d9cc){const _0xf9a1fb=_0x4e69ba,_0x45ef6b=$gameParty[_0xf9a1fb(0x2e3)]();if(_0x45ef6b['id']<0x0)return'';let _0x36015d=null;if(_0x45ef6b['type']===0x0)_0x36015d=$dataItems[_0x45ef6b['id']];if(_0x45ef6b[_0xf9a1fb(0x16d)]===0x1)_0x36015d=$dataWeapons[_0x45ef6b['id']];if(_0x45ef6b[_0xf9a1fb(0x16d)]===0x2)_0x36015d=$dataArmors[_0x45ef6b['id']];if(!_0x36015d)return'';return _0x30d9cc?_0xf9a1fb(0x2bf)[_0xf9a1fb(0x31e)](_0x36015d[_0xf9a1fb(0x15a)],_0x36015d[_0xf9a1fb(0xfb)]):_0x36015d[_0xf9a1fb(0xfb)];},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x250)]=function(){const _0x4f729b=_0x4e69ba,_0x11c1b4=$gameParty[_0x4f729b(0x2e3)]();if(_0x11c1b4['id']<=0x0)return'';return _0x11c1b4[_0x4f729b(0x264)];},Window_Base[_0x4e69ba(0x39e)]['applyDatabaseAutoColor']=function(_0x2fd4a9,_0x1e5b72){const _0x51f935=_0x4e69ba,_0xdea3dd=VisuMZ[_0x51f935(0x133)][_0x51f935(0xe6)][_0x51f935(0x1fa)];let _0x1e6da5=0x0;if(_0x1e5b72===$dataActors)_0x1e6da5=_0xdea3dd[_0x51f935(0xc3)];if(_0x1e5b72===$dataClasses)_0x1e6da5=_0xdea3dd[_0x51f935(0x279)];if(_0x1e5b72===$dataSkills)_0x1e6da5=_0xdea3dd['Skills'];if(_0x1e5b72===$dataItems)_0x1e6da5=_0xdea3dd[_0x51f935(0x130)];if(_0x1e5b72===$dataWeapons)_0x1e6da5=_0xdea3dd[_0x51f935(0x2bd)];if(_0x1e5b72===$dataArmors)_0x1e6da5=_0xdea3dd[_0x51f935(0x299)];if(_0x1e5b72===$dataEnemies)_0x1e6da5=_0xdea3dd[_0x51f935(0x2f3)];if(_0x1e5b72===$dataStates)_0x1e6da5=_0xdea3dd['States'];return _0x1e6da5>0x0&&(_0x2fd4a9=_0x51f935(0x18c)['format'](_0x1e6da5,_0x2fd4a9)),_0x2fd4a9;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1d0)]=function(_0x195e72){const _0x110101=_0x4e69ba;_0x195e72=_0x195e72[_0x110101(0x391)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x1a3a02,_0x50228e)=>this[_0x110101(0x347)](!![])),_0x195e72=_0x195e72['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0xebdc45,_0xdccc2e)=>this[_0x110101(0x347)](![])),_0x195e72=_0x195e72[_0x110101(0x391)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x5d56fa,_0x1335f0)=>this[_0x110101(0x347)](![]));if(_0x195e72[_0x110101(0x1ba)](Window_Message[_0x110101(0xc7)])){if(_0x110101(0x386)!==_0x110101(0xde))this[_0x110101(0x347)](![]);else return this[_0x110101(0x2f1)]()&&(_0x2ec3ea=this[_0x110101(0x359)](_0x49ef0d),_0x4dca09=this[_0x110101(0x30b)](_0x151990)),_0x32ef62;}else _0x195e72[_0x110101(0x1ba)](Window_Message[_0x110101(0x100)])&&this[_0x110101(0x347)](![]);if(!this[_0x110101(0x2ed)]())return _0x195e72;if(_0x195e72['length']<=0x0)return _0x195e72;return VisuMZ[_0x110101(0x133)][_0x110101(0xe6)][_0x110101(0x1a4)][_0x110101(0x14e)]?(_0x195e72=_0x195e72[_0x110101(0x391)](/[\n\r]+/g,'\x20'),_0x195e72=_0x195e72[_0x110101(0x391)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x195e72=_0x195e72[_0x110101(0x391)](/[\n\r]+/g,''),_0x195e72=_0x195e72[_0x110101(0x391)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x195e72=this[_0x110101(0x2e7)](_0x195e72),_0x195e72=_0x195e72['split']('\x20')['join'](_0x110101(0x29d)),_0x195e72=_0x195e72[_0x110101(0x391)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x195e72=_0x195e72[_0x110101(0x391)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x195e72;},Window_Base['prototype'][_0x4e69ba(0x2e7)]=function(_0x1ca272){return _0x1ca272;},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x192)]=Window_Base['prototype'][_0x4e69ba(0x3c8)],Window_Base['prototype'][_0x4e69ba(0x3c8)]=function(_0x248418){const _0xc29dc6=_0x4e69ba;VisuMZ['MessageCore'][_0xc29dc6(0x192)][_0xc29dc6(0x1ea)](this,_0x248418),this['processTextAlignmentX'](_0x248418);},VisuMZ[_0x4e69ba(0x133)]['Window_Base_processControlCharacter']=Window_Base[_0x4e69ba(0x39e)]['processControlCharacter'],Window_Base[_0x4e69ba(0x39e)]['processControlCharacter']=function(_0xfa4273,_0x7b53a4){const _0x383165=_0x4e69ba;VisuMZ[_0x383165(0x133)]['Window_Base_processControlCharacter']['call'](this,_0xfa4273,_0x7b53a4),_0x7b53a4===_0x383165(0x29d)&&(_0x383165(0x3a8)!=='iqFLU'?this[_0x383165(0x357)](_0xfa4273):this[_0x383165(0x175)][_0x383165(0x16d)]=0x1);},Window_Base[_0x4e69ba(0x39e)]['obtainEscapeString']=function(_0x231bd7){const _0x5a882b=_0x4e69ba;var _0x2162c6=/^\<(.*?)\>/[_0x5a882b(0x1eb)](_0x231bd7[_0x5a882b(0x32a)][_0x5a882b(0x298)](_0x231bd7['index']));return _0x2162c6?(_0x231bd7[_0x5a882b(0x151)]+=_0x2162c6[0x0]['length'],String(_0x2162c6[0x0][_0x5a882b(0x298)](0x1,_0x2162c6[0x0][_0x5a882b(0x34e)]-0x1))):'';},VisuMZ[_0x4e69ba(0x133)]['Window_Base_processEscapeCharacter']=Window_Base[_0x4e69ba(0x39e)]['processEscapeCharacter'],Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x22a)]=function(_0x1c4162,_0x1a6ede){const _0x4bf866=_0x4e69ba;switch(_0x1c4162){case'C':if(_0x1a6ede[_0x4bf866(0x223)]){if(_0x4bf866(0x11e)===_0x4bf866(0x11e))VisuMZ[_0x4bf866(0x133)][_0x4bf866(0x3a9)][_0x4bf866(0x1ea)](this,_0x1c4162,_0x1a6ede);else{const _0x2cdb9c=_0x44c3b1(_0x235699['$1']);_0x2cdb9c<_0x40ad57?(_0x5d82d3('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x440d83,_0x2cdb9c,_0x2ca0f3)),_0x42da87[_0x4bf866(0x32d)]()):_0x44c2fd=_0x3328ad[_0x4bf866(0x205)](_0x2cdb9c,_0x1f03f9);}}else{if(_0x4bf866(0xc0)===_0x4bf866(0x385))return!![];else this['obtainEscapeParam'](_0x1a6ede);}break;case'I':case'{':case'}':VisuMZ[_0x4bf866(0x133)][_0x4bf866(0x3a9)]['call'](this,_0x1c4162,_0x1a6ede);break;case'FS':this[_0x4bf866(0x1e7)](_0x1a6ede);break;case'PX':this[_0x4bf866(0x1ee)](_0x1a6ede);break;case'PY':this['processPyTextCode'](_0x1a6ede);break;case _0x4bf866(0x2ea):this[_0x4bf866(0x336)](this[_0x4bf866(0x14c)](_0x1a6ede));break;case'CENTERPICTURE':this[_0x4bf866(0x3a0)](_0x1a6ede);break;case _0x4bf866(0xc4):this['processColorLock'](_0x1a6ede);break;case _0x4bf866(0x286):this['processCommonEvent'](_0x1a6ede);break;case'ITALIC':this[_0x4bf866(0x16c)](this[_0x4bf866(0x14c)](_0x1a6ede));break;case'PICTURE':this[_0x4bf866(0x382)](_0x1a6ede);break;case _0x4bf866(0xf3):this[_0x4bf866(0x369)](_0x1a6ede);break;case _0x4bf866(0x114):this['processTextAlignmentChange'](_0x1a6ede);break;case'WAIT':this[_0x4bf866(0x16b)](_0x1a6ede);break;case _0x4bf866(0x1f5):this['processWrapBreak'](_0x1a6ede);break;default:this[_0x4bf866(0x294)](_0x1c4162,_0x1a6ede);}},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x294)]=function(_0x34ecb1,_0x310b54){const _0x56db8b=_0x4e69ba;for(const _0x47c77c of VisuMZ[_0x56db8b(0x133)][_0x56db8b(0xe6)]['TextCodeActions']){if('Zybzz'===_0x56db8b(0x226))return this[_0x56db8b(0x18a)]()===0x191;else{if(_0x47c77c[_0x56db8b(0x25c)]===_0x34ecb1){if('gEVQR'!=='gEVQR')_0x477205[_0x56db8b(0x133)][_0x56db8b(0x1f7)][_0x56db8b(0x1ea)](this),this[_0x56db8b(0x1a7)]();else{if(_0x47c77c[_0x56db8b(0x2c9)]==='')this[_0x56db8b(0x14c)](_0x310b54);_0x47c77c[_0x56db8b(0x20c)][_0x56db8b(0x1ea)](this,_0x310b54);if(this[_0x56db8b(0x24f)]===Window_Message){if(_0x56db8b(0x2ab)===_0x56db8b(0x2ab)){const _0xbb802b=_0x47c77c[_0x56db8b(0x324)]||0x0;if(_0xbb802b>0x0)this[_0x56db8b(0x3c4)](_0xbb802b);}else _0x4a9aa2['update']();}}}}}},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x27c)]=function(){const _0x506bf1=_0x4e69ba;this[_0x506bf1(0x1b5)][_0x506bf1(0x120)]+=VisuMZ[_0x506bf1(0x133)][_0x506bf1(0xe6)]['General'][_0x506bf1(0x166)],this['contents'][_0x506bf1(0x120)]=Math['min'](this[_0x506bf1(0x1b5)][_0x506bf1(0x120)],VisuMZ['MessageCore']['Settings'][_0x506bf1(0x3af)][_0x506bf1(0x191)]);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x356)]=function(){const _0x348401=_0x4e69ba;this[_0x348401(0x1b5)][_0x348401(0x120)]-=VisuMZ[_0x348401(0x133)][_0x348401(0xe6)][_0x348401(0x3af)]['FontChangeValue'],this[_0x348401(0x1b5)][_0x348401(0x120)]=Math[_0x348401(0x205)](this[_0x348401(0x1b5)][_0x348401(0x120)],VisuMZ['MessageCore']['Settings'][_0x348401(0x3af)][_0x348401(0x18e)]);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x1e7)]=function(_0x24711e){const _0xfecb05=_0x4e69ba,_0x146826=this[_0xfecb05(0x14c)](_0x24711e);this[_0xfecb05(0x1b5)][_0xfecb05(0x120)]=_0x146826[_0xfecb05(0x2dc)](VisuMZ[_0xfecb05(0x133)][_0xfecb05(0xe6)][_0xfecb05(0x3af)][_0xfecb05(0x18e)],VisuMZ[_0xfecb05(0x133)][_0xfecb05(0xe6)][_0xfecb05(0x3af)]['FontBiggerCap']);},Window_Base[_0x4e69ba(0x39e)]['maxFontSizeInLine']=function(_0x52ac67){const _0x5783a3=_0x4e69ba;let _0x414d4a=this[_0x5783a3(0x1b5)][_0x5783a3(0x120)];const _0x4e4f39=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if(_0x5783a3(0x274)!=='XSQZy')return _0x4041d2[_0x5783a3(0x39b)]();else{const _0x519707=_0x4e4f39[_0x5783a3(0x1eb)](_0x52ac67);if(!_0x519707)break;const _0x40f814=String(_0x519707[0x1])[_0x5783a3(0x158)]();if(_0x40f814==='{')'vAKPv'===_0x5783a3(0x2b9)?this[_0x5783a3(0x27c)]():(_0x2413f2=_0x4756a8['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x157946,_0x2fd720)=>{const _0x5a3825=_0x5783a3;return this[_0x5a3825(0x2be)](_0x2b146e,!![],!![]),this[_0x5a3825(0x384)]('battle\x20actor',_0x2b161a(_0x2fd720)||0x1),'';}),_0x4bd65e=_0x10acbc[_0x5783a3(0x391)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x1b30d8,_0xe7d88f)=>{const _0x3d7a31=_0x5783a3;return this[_0x3d7a31(0x2be)](_0x3879cd,!![],!![]),this[_0x3d7a31(0x384)](_0x3d7a31(0xbf),_0x2d713a(_0xe7d88f)||0x0),'';}),_0x182d47=_0x20d99d['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x5d1bdc,_0x3eb39b)=>{const _0x1aab5f=_0x5783a3;return this[_0x1aab5f(0x2be)](_0xcc70a2,!![],!![]),this[_0x1aab5f(0x384)](_0x1aab5f(0x25b),_0x164fcc(_0x3eb39b)||0x0),'';}));else{if(_0x40f814==='}')this[_0x5783a3(0x356)]();else{if(_0x40f814==='FS'){if(_0x5783a3(0x392)!==_0x5783a3(0x392))return _0x3fc147['prototype'][_0x5783a3(0x222)][_0x5783a3(0x1ea)](this,_0x550950);else this[_0x5783a3(0x1b5)][_0x5783a3(0x120)]=parseInt(_0x519707[0x3])[_0x5783a3(0x2dc)](VisuMZ[_0x5783a3(0x133)][_0x5783a3(0xe6)][_0x5783a3(0x3af)]['FontSmallerCap'],VisuMZ[_0x5783a3(0x133)][_0x5783a3(0xe6)][_0x5783a3(0x3af)][_0x5783a3(0x191)]);}}}if(this['contents']['fontSize']>_0x414d4a){if(_0x5783a3(0x15d)!==_0x5783a3(0x366))_0x414d4a=this[_0x5783a3(0x1b5)][_0x5783a3(0x120)];else{_0x32bc16['textCodeCheck']=new _0x339335('\x5c['+_0x28b9ff[_0x5783a3(0x25c)]+'\x5c]','gi');if(_0x599b4a[_0x5783a3(0x1d7)]!==''&&_0x210322['TextStr']!==_0x5783a3(0x377)){let _0x3b00a6=_0x370b9c[_0x5783a3(0x1d7)];_0x3b00a6=_0x3b00a6[_0x5783a3(0x391)](/\\/g,'\x1b'),_0x3b00a6=_0x3b00a6['replace']('\x27','\x5c\x27'),_0x3b00a6=_0x3b00a6[_0x5783a3(0x391)]('\x22','\x5c\x22'),_0x309123[_0x5783a3(0x268)]=new _0x593526(_0x5783a3(0x30c)+_0x3b00a6+'\x27');}else _0x56370f[_0x5783a3(0x268)]=_0x512f65[_0x5783a3(0x173)];}}}}return _0x414d4a;},Window_Base[_0x4e69ba(0x39e)]['processPxTextCode']=function(_0x2173e3){const _0x2babf7=_0x4e69ba;_0x2173e3['x']=this[_0x2babf7(0x14c)](_0x2173e3),VisuMZ['MessageCore'][_0x2babf7(0xe6)]['General'][_0x2babf7(0x30e)]&&(_0x2173e3['x']+=_0x2173e3[_0x2babf7(0x1c2)]);},Window_Base[_0x4e69ba(0x39e)]['processPyTextCode']=function(_0x3ab8e5){const _0xc7e3a0=_0x4e69ba;_0x3ab8e5['y']=this['obtainEscapeParam'](_0x3ab8e5),VisuMZ[_0xc7e3a0(0x133)][_0xc7e3a0(0xe6)][_0xc7e3a0(0x3af)][_0xc7e3a0(0x30e)]&&(_0x3ab8e5['y']+=_0x3ab8e5['startY']);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x336)]=function(_0x2608e7){const _0x1f2eaa=_0x4e69ba;this[_0x1f2eaa(0x1b5)][_0x1f2eaa(0x339)]=!!_0x2608e7;},Window_Base['prototype'][_0x4e69ba(0x16c)]=function(_0x5c788a){const _0x2862e9=_0x4e69ba;this[_0x2862e9(0x1b5)][_0x2862e9(0x303)]=!!_0x5c788a;},Window_Base['prototype']['processTextAlignmentChange']=function(_0x2856b6){const _0x2a095e=_0x4e69ba,_0x169136=this['obtainEscapeParam'](_0x2856b6);if(!_0x2856b6[_0x2a095e(0x223)])return;switch(_0x169136){case 0x0:this[_0x2a095e(0x1a3)]('default');return;case 0x1:this['setTextAlignment'](_0x2a095e(0x1b0));break;case 0x2:this[_0x2a095e(0x1a3)](_0x2a095e(0x254));break;case 0x3:this[_0x2a095e(0x1a3)]('right');break;}this['processTextAlignmentX'](_0x2856b6);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x135)]=function(_0x33ff81){const _0x203a7d=_0x4e69ba;if(!_0x33ff81[_0x203a7d(0x223)])return;if(_0x33ff81[_0x203a7d(0x193)])return;if(this['getTextAlignment']()===_0x203a7d(0x11b))return;let _0x442015=_0x33ff81[_0x203a7d(0x32a)][_0x203a7d(0x3c5)](_0x203a7d(0x1fd),_0x33ff81[_0x203a7d(0x151)]+0x1),_0x3dd788=_0x33ff81[_0x203a7d(0x32a)][_0x203a7d(0x3c5)]('\x0a',_0x33ff81[_0x203a7d(0x151)]+0x1);if(_0x442015<0x0)_0x442015=_0x33ff81[_0x203a7d(0x32a)][_0x203a7d(0x34e)]+0x1;if(_0x3dd788>0x0)_0x442015=Math['min'](_0x442015,_0x3dd788);const _0x5c78dd=_0x33ff81[_0x203a7d(0x32a)][_0x203a7d(0x1ed)](_0x33ff81[_0x203a7d(0x151)],_0x442015),_0x18305b=this['textSizeExTextAlignment'](_0x5c78dd)['width'],_0x39144a=_0x33ff81[_0x203a7d(0x111)]||this[_0x203a7d(0x317)]-0x8,_0x24b619=this[_0x203a7d(0x24f)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this[_0x203a7d(0xcc)]()){case _0x203a7d(0x1b0):_0x33ff81['x']=_0x33ff81[_0x203a7d(0x1c2)];break;case _0x203a7d(0x254):_0x33ff81['x']=_0x33ff81[_0x203a7d(0x1c2)],_0x33ff81['x']+=Math[_0x203a7d(0x3bb)]((_0x39144a-_0x18305b)/0x2);_0x24b619&&('kPJpY'!==_0x203a7d(0xe7)?_0x5a8c60[_0x203a7d(0x133)][_0x203a7d(0x3a9)][_0x203a7d(0x1ea)](this,_0x39bf3f,_0x787120):_0x33ff81['x']-=_0x33ff81[_0x203a7d(0x1c2)]/0x2);break;case'right':_0x33ff81['x']=_0x39144a-_0x18305b+_0x33ff81[_0x203a7d(0x1c2)];_0x24b619&&(_0x33ff81['x']-=_0x33ff81['startX']);break;}},Window_Base[_0x4e69ba(0x39e)]['textSizeExTextAlignment']=function(_0x28f932){const _0x411fbb=_0x4e69ba;_0x28f932=_0x28f932[_0x411fbb(0x391)](/\x1b!/g,''),_0x28f932=_0x28f932[_0x411fbb(0x391)](/\x1b\|/g,''),_0x28f932=_0x28f932[_0x411fbb(0x391)](/\x1b\./g,'');const _0x163a33=this[_0x411fbb(0xeb)](_0x28f932,0x0,0x0,0x0),_0x434f9e=this[_0x411fbb(0x333)]();return _0x163a33[_0x411fbb(0x223)]=![],this[_0x411fbb(0x233)](_0x163a33),this[_0x411fbb(0x170)](_0x434f9e),{'width':_0x163a33['outputWidth'],'height':_0x163a33[_0x411fbb(0x2a4)]};},Window_Base[_0x4e69ba(0xd5)]=VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0xe6)][_0x4e69ba(0x1a4)]['EndPadding']||0x0,Window_Base['prototype']['processWrapBreak']=function(_0xdf7d36){const _0x40c396=_0x4e69ba,_0x8c8bf5=(_0xdf7d36[_0x40c396(0x193)]?-0x1:0x1)*this[_0x40c396(0x37a)]('\x20');_0xdf7d36['x']+=_0x8c8bf5;if(this[_0x40c396(0x14c)](_0xdf7d36)>0x0)_0xdf7d36['x']+=_0x8c8bf5;if(_0xdf7d36[_0x40c396(0x193)])return;let _0x54e6e1=_0xdf7d36[_0x40c396(0x32a)][_0x40c396(0x3c5)](_0x40c396(0x29d),_0xdf7d36[_0x40c396(0x151)]+0x1),_0x382309=_0xdf7d36[_0x40c396(0x32a)][_0x40c396(0x3c5)]('\x0a',_0xdf7d36[_0x40c396(0x151)]+0x1);if(_0x54e6e1<0x0)_0x54e6e1=_0xdf7d36['text']['length']+0x1;if(_0x382309>0x0)_0x54e6e1=Math[_0x40c396(0xf9)](_0x54e6e1,_0x382309);const _0x3fb0e9=_0xdf7d36[_0x40c396(0x32a)][_0x40c396(0x1ed)](_0xdf7d36[_0x40c396(0x151)],_0x54e6e1),_0x3429c9=this['textSizeExWordWrap'](_0x3fb0e9)[_0x40c396(0x111)];let _0x332152=_0xdf7d36[_0x40c396(0x111)]||this[_0x40c396(0x317)];_0x332152-=Window_Base[_0x40c396(0xd5)];if(this[_0x40c396(0x24f)]===Window_Message){const _0x2f5513=$gameMessage[_0x40c396(0x2a7)]()===''?0x0:ImageManager[_0x40c396(0x2ba)]+0x14;_0x332152-=_0x2f5513,VisuMZ['MessageCore'][_0x40c396(0xe6)][_0x40c396(0x1a4)][_0x40c396(0x3b3)]&&(_0x332152-=_0x2f5513);}let _0x2ce199=![];if(_0xdf7d36['x']+_0x3429c9>_0xdf7d36[_0x40c396(0x1c2)]+_0x332152)_0x2ce199=!![];if(_0x3429c9===0x0)_0x2ce199=!![];_0x2ce199&&(_0xdf7d36[_0x40c396(0x32a)]=_0xdf7d36[_0x40c396(0x32a)][_0x40c396(0x298)](0x0,_0xdf7d36[_0x40c396(0x151)])+'\x0a'+_0xdf7d36[_0x40c396(0x32a)][_0x40c396(0x348)](_0xdf7d36[_0x40c396(0x151)]));},Window_Base[_0x4e69ba(0x39e)]['textSizeExWordWrap']=function(_0x309715){const _0x2fa4e5=_0x4e69ba,_0x550b5a=this['createTextState'](_0x309715,0x0,0x0,0x0),_0x36d98d=this['getPreservedFontSettings']();return _0x550b5a['drawing']=![],this['setWordWrap'](![]),this['processAllText'](_0x550b5a),this[_0x2fa4e5(0x347)](!![]),this[_0x2fa4e5(0x170)](_0x36d98d),{'width':_0x550b5a[_0x2fa4e5(0x2f4)],'height':_0x550b5a['outputHeight']};},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x302)]=function(_0x4f5bff){return this['obtainEscapeParam'](_0x4f5bff);},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x382)]=function(_0x483ee4){const _0x4d5bfd=_0x4e69ba,_0x17da9f=this[_0x4d5bfd(0xf6)](_0x483ee4)[_0x4d5bfd(0x308)](',');if(!_0x483ee4[_0x4d5bfd(0x223)])return;const _0x381851=_0x17da9f[0x0][_0x4d5bfd(0x280)](),_0x5d548a=_0x17da9f[0x1]||0x0,_0xd9e96=_0x17da9f[0x2]||0x0,_0x44c607=ImageManager[_0x4d5bfd(0x22d)](_0x381851),_0x2720eb=this[_0x4d5bfd(0x1b5)][_0x4d5bfd(0xd2)];_0x44c607[_0x4d5bfd(0x285)](this[_0x4d5bfd(0x2eb)]['bind'](this,_0x44c607,_0x483ee4['x'],_0x483ee4['y'],_0x5d548a,_0xd9e96,_0x2720eb));},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x2eb)]=function(_0x139ae7,_0x2c7265,_0x5cb709,_0x37e4a7,_0xf55075,_0x3812b8){const _0x4f7f42=_0x4e69ba;_0x37e4a7=_0x37e4a7||_0x139ae7['width'],_0xf55075=_0xf55075||_0x139ae7['height'],this[_0x4f7f42(0x393)][_0x4f7f42(0xd2)]=_0x3812b8,this['contentsBack'][_0x4f7f42(0x216)](_0x139ae7,0x0,0x0,_0x139ae7['width'],_0x139ae7['height'],_0x2c7265,_0x5cb709,_0x37e4a7,_0xf55075),this[_0x4f7f42(0x393)][_0x4f7f42(0xd2)]=0xff;},Window_Base[_0x4e69ba(0x39e)]['processDrawCenteredPicture']=function(_0xd5c115){const _0x37519f=_0x4e69ba,_0x59db9c=this[_0x37519f(0xf6)](_0xd5c115)['split'](',');if(!_0xd5c115[_0x37519f(0x223)])return;const _0x3eee94=_0x59db9c[0x0][_0x37519f(0x280)](),_0x53d76b=ImageManager[_0x37519f(0x22d)](_0x3eee94),_0x5e6be7=JsonEx[_0x37519f(0x1dc)](_0xd5c115),_0x32bbb3=this['contents'][_0x37519f(0xd2)];_0x53d76b[_0x37519f(0x285)](this[_0x37519f(0x184)][_0x37519f(0x2a5)](this,_0x53d76b,_0x5e6be7,_0x32bbb3));},Window_Base['prototype'][_0x4e69ba(0x184)]=function(_0x20bc81,_0x3a9389,_0x379d3e){const _0x521135=_0x4e69ba,_0x32dd3b=_0x3a9389['width']||this[_0x521135(0x317)],_0x33111f=this[_0x521135(0x15f)]!==undefined?this[_0x521135(0x329)]():this[_0x521135(0xc9)],_0x1a37fd=_0x32dd3b/_0x20bc81[_0x521135(0x111)],_0x14400b=_0x33111f/_0x20bc81[_0x521135(0x242)],_0x3932ee=Math[_0x521135(0xf9)](_0x1a37fd,_0x14400b,0x1),_0x2d9f7a=this[_0x521135(0x15f)]!==undefined?(this[_0x521135(0x2a0)](0x0)[_0x521135(0x242)]-this['lineHeight']())/0x2:0x0,_0x35ea6a=_0x20bc81[_0x521135(0x111)]*_0x3932ee,_0xe57d92=_0x20bc81[_0x521135(0x242)]*_0x3932ee,_0x591092=Math[_0x521135(0x3bb)]((_0x32dd3b-_0x35ea6a)/0x2)+_0x3a9389[_0x521135(0x1c2)],_0x4327b4=Math[_0x521135(0x3bb)]((_0x33111f-_0xe57d92)/0x2)+_0x3a9389[_0x521135(0x281)]-_0x2d9f7a*0x2;this[_0x521135(0x393)][_0x521135(0xd2)]=_0x379d3e,this[_0x521135(0x393)][_0x521135(0x216)](_0x20bc81,0x0,0x0,_0x20bc81[_0x521135(0x111)],_0x20bc81['height'],_0x591092,_0x4327b4,_0x35ea6a,_0xe57d92),this[_0x521135(0x393)]['paintOpacity']=0xff;},Window_Base[_0x4e69ba(0x39e)][_0x4e69ba(0x325)]=function(_0x2402da){const _0x9e09c6=_0x4e69ba,_0x5a586b=this[_0x9e09c6(0x14c)](_0x2402da);if(_0x2402da[_0x9e09c6(0x223)])this[_0x9e09c6(0x2e4)](_0x5a586b>0x0);},Window_Base['prototype']['processCustomWait']=function(_0xa53882){const _0x3c55b6=_0x4e69ba,_0x566449=this[_0x3c55b6(0x14c)](_0xa53882);this[_0x3c55b6(0x24f)]===Window_Message&&_0xa53882[_0x3c55b6(0x223)]&&this[_0x3c55b6(0xf1)](_0x566449);},Window_Help['prototype'][_0x4e69ba(0x227)]=function(){const _0x49aedb=_0x4e69ba;this[_0x49aedb(0x347)]($gameSystem[_0x49aedb(0x1cf)]());},Window_Help[_0x4e69ba(0x39e)][_0x4e69ba(0x2f1)]=function(){return!![];},VisuMZ[_0x4e69ba(0x133)]['Window_Help_refresh']=Window_Help[_0x4e69ba(0x39e)][_0x4e69ba(0x132)],Window_Help['prototype'][_0x4e69ba(0x132)]=function(){const _0x5595f3=_0x4e69ba;this[_0x5595f3(0x293)](),VisuMZ[_0x5595f3(0x133)]['Window_Help_refresh'][_0x5595f3(0x1ea)](this),this[_0x5595f3(0x227)]();},VisuMZ['MessageCore'][_0x4e69ba(0x3ca)]=Window_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x2de)],Window_Options['prototype'][_0x4e69ba(0x2de)]=function(){const _0x2946bb=_0x4e69ba;VisuMZ[_0x2946bb(0x133)][_0x2946bb(0x3ca)][_0x2946bb(0x1ea)](this),this[_0x2946bb(0x2e0)]();},Window_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x2e0)]=function(){const _0x8e7608=_0x4e69ba;VisuMZ['MessageCore'][_0x8e7608(0xe6)][_0x8e7608(0x137)][_0x8e7608(0x1e8)]&&this[_0x8e7608(0x29a)]();},Window_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x29a)]=function(){const _0x54d635=_0x4e69ba,_0x4dac4a=TextManager[_0x54d635(0x387)],_0x4d9da7=_0x54d635(0x2d1);this[_0x54d635(0x150)](_0x4dac4a,_0x4d9da7);},VisuMZ['MessageCore'][_0x4e69ba(0x2df)]=Window_Options['prototype'][_0x4e69ba(0x160)],Window_Options[_0x4e69ba(0x39e)]['statusText']=function(_0x1bcd27){const _0x2b8efa=_0x4e69ba,_0x10e264=this[_0x2b8efa(0x398)](_0x1bcd27);if(_0x10e264==='textSpeed')return this['textSpeedStatusText']();return VisuMZ[_0x2b8efa(0x133)][_0x2b8efa(0x2df)][_0x2b8efa(0x1ea)](this,_0x1bcd27);},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x2e1)]=Window_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x1ec)],Window_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x1ec)]=function(_0x71374e){const _0x38e824=_0x4e69ba;if(_0x71374e===_0x38e824(0x2d1))return!![];return VisuMZ['MessageCore']['Window_Options_isVolumeSymbol'][_0x38e824(0x1ea)](this,_0x71374e);},Window_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x38d)]=function(){const _0x8e0c89=_0x4e69ba,_0x4a3c6c=this['getConfigValue'](_0x8e0c89(0x2d1));if(_0x4a3c6c>0xa){if('EUzRP'!==_0x8e0c89(0x2ee))return TextManager[_0x8e0c89(0x2da)];else this['y']=_0x483701['y']+_0x11b1e5[_0x8e0c89(0x242)];}else return _0x4a3c6c;},VisuMZ['MessageCore'][_0x4e69ba(0x3b8)]=Window_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x147)],Window_Options['prototype']['changeVolume']=function(_0x472750,_0x5e1f90,_0xaf6787){const _0x4be878=_0x4e69ba;if(_0x472750===_0x4be878(0x2d1))return this[_0x4be878(0x17f)](_0x472750,_0x5e1f90,_0xaf6787);VisuMZ[_0x4be878(0x133)]['Window_Options_changeVolume'][_0x4be878(0x1ea)](this,_0x472750,_0x5e1f90,_0xaf6787);},Window_Options[_0x4e69ba(0x39e)][_0x4e69ba(0x17f)]=function(_0x1904bb,_0x508ec7,_0x3a8708){const _0x1370ae=_0x4e69ba,_0x4ca34c=this[_0x1370ae(0xef)](_0x1904bb),_0x138504=0x1,_0x1d00ed=_0x4ca34c+(_0x508ec7?_0x138504:-_0x138504);if(_0x1d00ed>0xb&&_0x3a8708){if(_0x1370ae(0x1cd)===_0x1370ae(0x1cd))this[_0x1370ae(0x332)](_0x1904bb,0x1);else{if(this[_0x1370ae(0x200)]===_0x1c375e)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x1370ae(0x352)]===_0x151d0b)this[_0x1370ae(0xbc)]();return this[_0x1370ae(0x200)][_0x1370ae(0x352)];}}else this['changeValue'](_0x1904bb,_0x1d00ed[_0x1370ae(0x2dc)](0x1,0xb));},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x243)]=function(){const _0x1438a6=_0x4e69ba;let _0xcd98aa=Window_Base[_0x1438a6(0x39e)][_0x1438a6(0x243)][_0x1438a6(0x1ea)](this);return _0xcd98aa-=this[_0x1438a6(0x12e)](),_0xcd98aa;},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0xb5)]=function(){const _0x292a2b=_0x4e69ba;Window_Base[_0x292a2b(0x39e)][_0x292a2b(0xb5)][_0x292a2b(0x1ea)](this),VisuMZ[_0x292a2b(0x133)][_0x292a2b(0xe6)][_0x292a2b(0x3af)][_0x292a2b(0x3b2)]&&(_0x292a2b(0x31c)!==_0x292a2b(0x31c)?_0x5c4872=_0x44658c['replace'](/\\V\[(\d+)\]/gi,(_0x42d9f4,_0x3869a4)=>this['convertBackslashCharacters'](_0x47bd3e(_0x4be1e2[_0x292a2b(0x1e1)](_0x2a33cf(_0x3869a4))))):this[_0x292a2b(0x1b4)]());},Window_Message['prototype'][_0x4e69ba(0x1b4)]=function(){const _0x4575c2=_0x4e69ba;this['_dimmerSprite']['x']=Math['round'](this[_0x4575c2(0x111)]/0x2),this[_0x4575c2(0x371)][_0x4575c2(0x304)]['x']=0.5,this[_0x4575c2(0x371)][_0x4575c2(0x27b)]['x']=Graphics['width'];},VisuMZ['MessageCore'][_0x4e69ba(0x15e)]=Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x26b)],Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x26b)]=function(){const _0x1bff0b=_0x4e69ba;VisuMZ['MessageCore'][_0x1bff0b(0x15e)][_0x1bff0b(0x1ea)](this),this['clearActorNameAutoColor'](),this['resetWordWrap'](),this['setColorLock'](![]),this[_0x1bff0b(0x1a3)](_0x1bff0b(0x11b)),this[_0x1bff0b(0x108)](VisuMZ[_0x1bff0b(0x133)][_0x1bff0b(0xe6)][_0x1bff0b(0x3af)]['MessageTextDelay']);},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x227)]=function(){const _0x5b88fe=_0x4e69ba;this[_0x5b88fe(0x347)]($gameSystem[_0x5b88fe(0x235)]());},Window_Message['prototype']['isAutoColorAffected']=function(){return!![];},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x108)]=function(_0x4a8b08){const _0x3835ec=_0x4e69ba,_0x266425=0xb-ConfigManager['textSpeed'];_0x4a8b08=Math[_0x3835ec(0x340)](_0x4a8b08*_0x266425),this[_0x3835ec(0x2a2)]=_0x4a8b08,this[_0x3835ec(0x1e0)]=_0x4a8b08;},VisuMZ[_0x4e69ba(0x133)]['Window_Message_isTriggered']=Window_Message[_0x4e69ba(0x39e)]['isTriggered'],Window_Message['prototype'][_0x4e69ba(0x321)]=function(){const _0x31fce6=_0x4e69ba;return VisuMZ[_0x31fce6(0x133)][_0x31fce6(0x1f8)]['call'](this)||Input[_0x31fce6(0x24a)](VisuMZ[_0x31fce6(0x133)][_0x31fce6(0xe6)][_0x31fce6(0x3af)][_0x31fce6(0x23a)]);},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x1de)]=Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x39f)],Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x39f)]=function(){const _0x3c9b26=_0x4e69ba;let _0x2136eb=this['y'];this['x']=Math[_0x3c9b26(0x340)]((Graphics[_0x3c9b26(0x1b7)]-this[_0x3c9b26(0x111)])/0x2),VisuMZ[_0x3c9b26(0x133)][_0x3c9b26(0x1de)]['call'](this);if(this[_0x3c9b26(0x3a2)])this['y']=_0x2136eb;this['updateXyOffsets'](),this[_0x3c9b26(0x33a)](),this['clampPlacementPosition']();},VisuMZ[_0x4e69ba(0x133)]['Window_Message_newPage']=Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x328)],Window_Message[_0x4e69ba(0x39e)]['newPage']=function(_0x5e8514){const _0x276044=_0x4e69ba;this[_0x276044(0x375)](_0x5e8514),this[_0x276044(0xec)](_0x5e8514),VisuMZ[_0x276044(0x133)][_0x276044(0x1b6)][_0x276044(0x1ea)](this,_0x5e8514),this[_0x276044(0x1d5)]();},Window_Message[_0x4e69ba(0x39e)]['convertNewPageTextStateMacros']=function(_0x32c985){const _0x4824e2=_0x4e69ba;if(!_0x32c985)return;this['_macroBypassWordWrap']=![],_0x32c985[_0x4824e2(0x32a)]=this['convertTextMacros'](_0x32c985[_0x4824e2(0x32a)]),this[_0x4824e2(0x1a9)]&&(_0x32c985[_0x4824e2(0x32a)]=this[_0x4824e2(0x1d0)](_0x32c985[_0x4824e2(0x32a)]),this[_0x4824e2(0x18f)]=!![]);},Window_Message[_0x4e69ba(0x39e)]['prepareWordWrapEscapeCharacters']=function(_0x16c06f){const _0x56abc5=_0x4e69ba;if(this['_macroBypassWordWrap'])return _0x16c06f;return Window_Base[_0x56abc5(0x39e)]['prepareWordWrapEscapeCharacters'][_0x56abc5(0x1ea)](this,_0x16c06f);},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0xec)]=function(_0x4fd2b3){const _0x39b890=_0x4e69ba;this[_0x39b890(0x248)](_0x4fd2b3),this[_0x39b890(0x2fc)](_0x4fd2b3),this[_0x39b890(0x32b)]();},VisuMZ['MessageCore'][_0x4e69ba(0xf8)]=Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x30f)],Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x30f)]=function(){const _0x367ab1=_0x4e69ba;VisuMZ[_0x367ab1(0x133)][_0x367ab1(0xf8)][_0x367ab1(0x1ea)](this),this['clearFlags']();if(this['_messagePositionReset'])this[_0x367ab1(0x155)]();},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x32b)]=function(){const _0x610e09=_0x4e69ba;this['width']=$gameSystem[_0x610e09(0x152)]()+this[_0x610e09(0x2b5)]();;this[_0x610e09(0x111)]=Math[_0x610e09(0xf9)](Graphics[_0x610e09(0x111)],this[_0x610e09(0x111)]);const _0x3f732c=$gameSystem[_0x610e09(0x126)]();this[_0x610e09(0x242)]=SceneManager[_0x610e09(0xd7)][_0x610e09(0x179)](_0x3f732c,![])+this[_0x610e09(0x12e)](),this[_0x610e09(0x242)]=Math['min'](Graphics[_0x610e09(0x242)],this[_0x610e09(0x242)]);if($gameTemp[_0x610e09(0xb4)])this['resetPositionX']();},Window_Message['prototype'][_0x4e69ba(0x2b5)]=function(){return 0x0;},Window_Message[_0x4e69ba(0x39e)]['addedHeight']=function(){return 0x0;},Window_Message['prototype'][_0x4e69ba(0x13a)]=function(){const _0xca5859=_0x4e69ba;this['x']=(Graphics[_0xca5859(0x1b7)]-this['width'])/0x2,$gameTemp['_centerMessageWindow']=undefined,this['clampPlacementPosition']();},Window_Message['prototype'][_0x4e69ba(0x186)]=function(){const _0x5e6b0b=_0x4e69ba,_0x2a5e8e={'x':this['x'],'y':this['y']};Window_Base[_0x5e6b0b(0x39e)][_0x5e6b0b(0x186)][_0x5e6b0b(0x1ea)](this),this[_0x5e6b0b(0x396)](_0x2a5e8e);},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x28e)]=function(){return!![];},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x396)]=function(_0x55e19a){const _0x742ddd=_0x4e69ba;this[_0x742ddd(0x1c7)]&&(this[_0x742ddd(0x1c7)]['x']+=this['x']-_0x55e19a['x'],this['_nameBoxWindow']['y']+=this['y']-_0x55e19a['y']);},Window_Message['prototype'][_0x4e69ba(0x230)]=function(_0x2548b5,_0xa827d3){const _0x354d44=_0x4e69ba;this['moveTo'](this[_0x354d44(0x346)]['x'],this[_0x354d44(0xee)]*(Graphics[_0x354d44(0x190)]-this[_0x354d44(0x242)])/0x2,this[_0x354d44(0x346)][_0x354d44(0x111)],this['_resetRect'][_0x354d44(0x242)],_0x2548b5,_0xa827d3);},Window_Message[_0x4e69ba(0x39e)]['processCommonEvent']=function(_0x510ea8){const _0x2aa06a=_0x4e69ba,_0x5e393f=Window_Base[_0x2aa06a(0x39e)][_0x2aa06a(0x302)][_0x2aa06a(0x1ea)](this,_0x510ea8);_0x510ea8[_0x2aa06a(0x223)]&&this[_0x2aa06a(0x3c4)](_0x5e393f);},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x3c4)]=function(_0x4e63e5){const _0x10d266=_0x4e69ba;if($gameParty[_0x10d266(0x21a)]()){}else $gameMap[_0x10d266(0x343)](_0x4e63e5);},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x26c)]=function(_0x1c0277){const _0x1f4b08=_0x4e69ba;this[_0x1f4b08(0x2a2)]--,this[_0x1f4b08(0x2a2)]<=0x0&&(this[_0x1f4b08(0x2f7)](_0x1c0277),Window_Base['prototype'][_0x1f4b08(0x26c)][_0x1f4b08(0x1ea)](this,_0x1c0277));},Window_Message[_0x4e69ba(0x39e)]['onProcessCharacter']=function(_0x109416){const _0x19ec3c=_0x4e69ba;this[_0x19ec3c(0x2a2)]=this[_0x19ec3c(0x1e0)];if(this[_0x19ec3c(0x1e0)]<=0x0)this['_showFast']=!![];},VisuMZ['MessageCore'][_0x4e69ba(0x185)]=Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x22a)],Window_Message[_0x4e69ba(0x39e)]['processEscapeCharacter']=function(_0x89a628,_0x3f8c4d){const _0x59cbcf=_0x4e69ba;if(!_0x3f8c4d[_0x59cbcf(0x223)])Window_Base[_0x59cbcf(0x39e)]['processEscapeCharacter'][_0x59cbcf(0x1ea)](this,_0x89a628,_0x3f8c4d);else{if(_0x59cbcf(0x257)!==_0x59cbcf(0x257)){_0xa61c11[_0x59cbcf(0x19b)](_0x27291e,_0x224a14);const _0x7d4ec7=_0x388fbb[_0x59cbcf(0x3d0)]||[];for(const _0x43fb0c of _0x7d4ec7){_0x200382[_0x59cbcf(0x165)](_0x43fb0c),_0x454ef5[_0x59cbcf(0x38b)](_0x43fb0c);}}else VisuMZ[_0x59cbcf(0x133)][_0x59cbcf(0x185)]['call'](this,_0x89a628,_0x3f8c4d);}},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0xd4)]=Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x169)],Window_Message['prototype'][_0x4e69ba(0x169)]=function(_0x4bdef0){const _0x139738=_0x4e69ba;if(this[_0x139738(0x2a3)])return'RArTF'===_0x139738(0x330)?![]:(_0x2de224=_0x43c053['replace'](/\x1bN\[(\d+)\]/gi,(_0x3dab04,_0x55fcfd)=>this['actorName'](_0x9a9d12(_0x55fcfd))),_0x3a861c=_0x2d6e24[_0x139738(0x391)](/\x1bP\[(\d+)\]/gi,(_0x349620,_0xd46251)=>this['partyMemberName'](_0x328d5a(_0xd46251))),_0x2e69ac=_0x3d4acf[_0x139738(0x391)](/\x1bG/gi,_0x156591[_0x139738(0x28f)]),_0x2593a2);return VisuMZ[_0x139738(0x133)]['Window_Message_needsNewPage'][_0x139738(0x1ea)](this,_0x4bdef0);},Window_Message[_0x4e69ba(0x39e)]['prepareForcedPositionEscapeCharacters']=function(_0x252fd8){const _0x195749=_0x4e69ba;let _0x2b1109=_0x252fd8[_0x195749(0x32a)];this[_0x195749(0xe3)]={};if(this[_0x195749(0x2ed)]())return _0x2b1109;_0x2b1109=_0x2b1109[_0x195749(0x391)](/<POSITION:[ ]*(.*)>/gi,(_0xf267db,_0x2d87e9)=>{const _0x78ca8f=_0x195749;if(_0x78ca8f(0x194)!=='muCzE')return![];else{const _0x12c9a6=_0x2d87e9[_0x78ca8f(0x308)](',')['map'](_0x5db5ba=>Number(_0x5db5ba)||0x0);if(_0x12c9a6[0x0]!==undefined)this[_0x78ca8f(0xe3)]['x']=Number(_0x12c9a6[0x0]);if(_0x12c9a6[0x1]!==undefined)this[_0x78ca8f(0xe3)]['y']=Number(_0x12c9a6[0x1]);if(_0x12c9a6[0x2]!==undefined)this['_forcedPosition'][_0x78ca8f(0x111)]=Number(_0x12c9a6[0x2]);if(_0x12c9a6[0x3]!==undefined)this[_0x78ca8f(0xe3)][_0x78ca8f(0x242)]=Number(_0x12c9a6[0x3]);return'';}}),_0x2b1109=_0x2b1109['replace'](/<COORDINATES:[ ]*(.*)>/gi,(_0x7d3059,_0x2b9637)=>{const _0x1a6061=_0x195749,_0x5c8c44=_0x2b9637[_0x1a6061(0x308)](',')[_0x1a6061(0x122)](_0xe27fbb=>Number(_0xe27fbb)||0x0);if(_0x5c8c44[0x0]!==undefined)this[_0x1a6061(0xe3)]['x']=Number(_0x5c8c44[0x0]);if(_0x5c8c44[0x1]!==undefined)this[_0x1a6061(0xe3)]['y']=Number(_0x5c8c44[0x1]);return'';}),_0x2b1109=_0x2b1109['replace'](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x44b5d3,_0x783786)=>{const _0x33931e=_0x195749,_0xa0f1b2=_0x783786[_0x33931e(0x308)](',')[_0x33931e(0x122)](_0x3086c8=>Number(_0x3086c8)||0x0);if(_0xa0f1b2[0x0]!==undefined)this['_forcedPosition']['width']=Number(_0xa0f1b2[0x2]);if(_0xa0f1b2[0x1]!==undefined)this['_forcedPosition'][_0x33931e(0x242)]=Number(_0xa0f1b2[0x3]);return'';}),_0x2b1109=_0x2b1109[_0x195749(0x391)](/<OFFSET:[ ]*(.*)>/gi,(_0x178f2d,_0x94f453)=>{const _0x10bc65=_0x195749,_0x3181ad=_0x94f453[_0x10bc65(0x308)](',')[_0x10bc65(0x122)](_0x3038bb=>Number(_0x3038bb)||0x0);let _0x26f1a1=_0x3181ad[0x0]||0x0,_0x58ac47=_0x3181ad[0x1]||0x0;return $gameSystem[_0x10bc65(0x229)](_0x26f1a1,_0x58ac47),'';}),_0x252fd8[_0x195749(0x32a)]=_0x2b1109;},Window_Message[_0x4e69ba(0x39e)]['updateXyOffsets']=function(){const _0x32701e=_0x4e69ba,_0x3d8ef1=$gameSystem[_0x32701e(0x1e4)]();this['x']+=_0x3d8ef1['x'],this['y']+=_0x3d8ef1['y'];},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x33a)]=function(){const _0x9d10b8=_0x4e69ba;this['_forcedPosition']=this[_0x9d10b8(0xe3)]||{};const _0x5a755c=['x','y',_0x9d10b8(0x111),_0x9d10b8(0x242)];for(const _0x527f8f of _0x5a755c){this[_0x9d10b8(0xe3)][_0x527f8f]!==undefined&&(_0x9d10b8(0xcd)!==_0x9d10b8(0x2cd)?this[_0x527f8f]=Number(this[_0x9d10b8(0xe3)][_0x527f8f]):_0x1ad304[_0x9d10b8(0x39e)][_0x9d10b8(0x22a)][_0x9d10b8(0x1ea)](this,_0x150959,_0x4c96b2));}},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x2fc)]=function(_0x352642){const _0x273cf0=_0x4e69ba;this[_0x273cf0(0x2a3)]=![];let _0x57c1ab=_0x352642[_0x273cf0(0x32a)];_0x57c1ab=_0x57c1ab['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0xd407c7=_0x273cf0;if(_0xd407c7(0x3ce)===_0xd407c7(0x2fe))_0x86d78b[_0xd407c7(0x133)][_0xd407c7(0x185)][_0xd407c7(0x1ea)](this,_0xf0c5ae,_0xd06b6f);else return this[_0xd407c7(0x2be)](_0x57c1ab,!![],!![]),this['processAutoPosition'](_0xd407c7(0x232)),'';}),_0x57c1ab=_0x57c1ab['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x5ea770=_0x273cf0;return this[_0x5ea770(0x2be)](_0x57c1ab,!![],![]),this['processAutoPosition'](_0x5ea770(0x232)),'';}),_0x57c1ab=_0x57c1ab['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x240182=_0x273cf0;if('GReDJ'!==_0x240182(0x2fd))return this[_0x240182(0x2be)](_0x57c1ab,![],!![]),this[_0x240182(0x384)](_0x240182(0x232)),'';else{if(!_0x51d400[_0x240182(0x1e1)](_0x3385f3))return!![];}});if(SceneManager[_0x273cf0(0x388)]())_0x57c1ab=_0x57c1ab[_0x273cf0(0x391)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x44079e,_0x136454)=>{const _0x4df6a8=_0x273cf0;return this[_0x4df6a8(0x2be)](_0x57c1ab,!![],!![]),this[_0x4df6a8(0x384)](_0x4df6a8(0x3d1),Number(_0x136454)||0x1),'';}),_0x57c1ab=_0x57c1ab[_0x273cf0(0x391)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4611f5,_0x56e655)=>{const _0x3f3ec8=_0x273cf0;return this[_0x3f3ec8(0x2be)](_0x57c1ab,!![],!![]),this['processAutoPosition']('battle\x20party',Number(_0x56e655)||0x0),'';}),_0x57c1ab=_0x57c1ab[_0x273cf0(0x391)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x3ccf1f,_0x5e3f37)=>{const _0x1b4b8f=_0x273cf0;return this['processAutoSize'](_0x57c1ab,!![],!![]),this[_0x1b4b8f(0x384)](_0x1b4b8f(0x25b),Number(_0x5e3f37)||0x0),'';});else SceneManager['isSceneMap']()&&(_0x57c1ab=_0x57c1ab['replace'](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x47519d,_0x48b7c1)=>{const _0x37ee16=_0x273cf0;return this[_0x37ee16(0x2be)](_0x57c1ab,!![],!![]),this['processAutoPosition'](_0x37ee16(0x2f2),0x0),'';}),_0x57c1ab=_0x57c1ab[_0x273cf0(0x391)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x3e2272,_0x5d8bf7)=>{const _0x4acbfa=_0x273cf0;if(_0x4acbfa(0x221)==='JoUpX')return this[_0x4acbfa(0x2be)](_0x57c1ab,!![],!![]),this[_0x4acbfa(0x384)]('map\x20actor',Number(_0x5d8bf7)||0x1),'';else _0x3b9d3a[_0x4acbfa(0x268)]=_0x564723[_0x4acbfa(0x173)];}),_0x57c1ab=_0x57c1ab[_0x273cf0(0x391)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4a63bb,_0x2f8949)=>{const _0x9159cf=_0x273cf0;return this[_0x9159cf(0x2be)](_0x57c1ab,!![],!![]),this[_0x9159cf(0x384)](_0x9159cf(0x3bf),Number(_0x2f8949)||0x0),'';}),_0x57c1ab=_0x57c1ab['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x4197c4,_0xd72730)=>{const _0x3227ff=_0x273cf0;return this[_0x3227ff(0x2be)](_0x57c1ab,!![],!![]),this['processAutoPosition']('map\x20event',Number(_0xd72730)||0x0),'';}));_0x352642['text']=_0x57c1ab;},Window_Message[_0x4e69ba(0xc7)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message['_autoPosRegExp']=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x2be)]=function(_0x22a7fc,_0x37e5e7,_0x1ce22e){const _0x3a079c=_0x4e69ba;_0x22a7fc=_0x22a7fc[_0x3a079c(0x391)](Window_Message[_0x3a079c(0xc7)],''),_0x22a7fc=_0x22a7fc[_0x3a079c(0x391)](Window_Message[_0x3a079c(0x100)],''),this[_0x3a079c(0x1ac)]=!![],this[_0x3a079c(0x2a3)]=!![],this['setWordWrap'](![]);const _0x342066=this[_0x3a079c(0x11d)](_0x22a7fc);if(_0x37e5e7){if(_0x3a079c(0x218)!==_0x3a079c(0x218)){for(_0x2c0af6 of _0x3589b0[_0x3a079c(0x133)][_0x3a079c(0x2ae)]){_0xfe1a2c=_0x6c8676[_0x3a079c(0x391)](_0x4fb04c[0x0],_0x5a91e6[0x1]);}return _0x354595;}else{let _0x480f12=_0x342066[_0x3a079c(0x111)]+$gameSystem[_0x3a079c(0x345)]()*0x2+0x6;const _0x21b839=$gameMessage['faceName']()!=='',_0x1e5834=ImageManager[_0x3a079c(0x2ba)],_0x45dfe6=0x14;_0x480f12+=_0x21b839?_0x1e5834+_0x45dfe6:0x4;if(_0x480f12%0x2!==0x0)_0x480f12+=0x1;$gameSystem[_0x3a079c(0x276)](_0x480f12);}}if(_0x1ce22e){if(_0x3a079c(0x362)==='OoIzg'){let _0x51fe74=Math['ceil'](_0x342066[_0x3a079c(0x242)]/this[_0x3a079c(0x26d)]());$gameSystem[_0x3a079c(0x33d)](_0x51fe74);}else _0x150097['y']=this['obtainEscapeParam'](_0x45b4dc),_0x2aa0d5[_0x3a079c(0x133)]['Settings']['General']['RelativePXPY']&&(_0x145f0c['y']+=_0x5ea12f['startY']);}this[_0x3a079c(0x21f)](),this[_0x3a079c(0x1b3)](),this[_0x3a079c(0x1ac)]=![],this[_0x3a079c(0x283)]=!![];},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x21f)]=function(){const _0x107f22=_0x4e69ba;this['updateDimensions'](),this[_0x107f22(0x39f)](),this[_0x107f22(0x13a)](),this[_0x107f22(0xea)](),this[_0x107f22(0x1b5)]['clear'](),this['createContents']();},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x384)]=function(_0x2b1a56,_0x2bf55e){const _0x2c90e8=_0x4e69ba;switch(_0x2b1a56[_0x2c90e8(0x26e)]()['trim']()){case _0x2c90e8(0x3d1):this[_0x2c90e8(0x3a2)]=$gameActors[_0x2c90e8(0x1d9)](_0x2bf55e);break;case _0x2c90e8(0xbf):this[_0x2c90e8(0x3a2)]=$gameParty[_0x2c90e8(0x119)]()[_0x2bf55e-0x1];break;case'battle\x20enemy':this[_0x2c90e8(0x3a2)]=$gameTroop['members']()[_0x2bf55e-0x1];break;case _0x2c90e8(0x2f2):this[_0x2c90e8(0x3a2)]=$gamePlayer;break;case _0x2c90e8(0x109):const _0x49aa8a=$gameActors[_0x2c90e8(0x1d9)](_0x2bf55e)[_0x2c90e8(0x151)]();_0x49aa8a===0x0?this['_autoPositionTarget']=$gamePlayer:this[_0x2c90e8(0x3a2)]=$gamePlayer[_0x2c90e8(0x399)]()['follower'](_0x49aa8a-0x1);break;case _0x2c90e8(0x3bf):_0x2bf55e===0x1?this[_0x2c90e8(0x3a2)]=$gamePlayer:this[_0x2c90e8(0x3a2)]=$gamePlayer['followers']()['follower'](_0x2bf55e-0x2);break;case _0x2c90e8(0x3b5):this[_0x2c90e8(0x3a2)]=$gameMap[_0x2c90e8(0x2d8)](_0x2bf55e);break;}this['_autoPositionTarget']&&this[_0x2c90e8(0x262)]();},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x17b)]=Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x3c9)],Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x3c9)]=function(){const _0x2f7cf9=_0x4e69ba;this[_0x2f7cf9(0x262)](),VisuMZ[_0x2f7cf9(0x133)][_0x2f7cf9(0x17b)][_0x2f7cf9(0x1ea)](this);},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x262)]=function(){const _0x1a644f=_0x4e69ba;if(!this[_0x1a644f(0x3a2)])return;const _0x2e5651=SceneManager[_0x1a644f(0xd7)];if(!_0x2e5651)return;if(!_0x2e5651['_spriteset'])return;const _0x19d518=_0x2e5651[_0x1a644f(0x1af)][_0x1a644f(0x263)](this['_autoPositionTarget']);if(!_0x19d518)return;let _0xa95e23=_0x19d518['x'];_0xa95e23-=this[_0x1a644f(0x111)]/0x2,_0xa95e23-=(Graphics[_0x1a644f(0x111)]-Graphics[_0x1a644f(0x1b7)])/0x2,_0xa95e23+=this[_0x1a644f(0xb8)]();let _0x3b4695=_0x19d518['y'];_0x3b4695-=this[_0x1a644f(0x242)],_0x3b4695-=(Graphics['height']-Graphics['boxHeight'])/0x2,_0x3b4695+=this[_0x1a644f(0x2d0)](),_0x3b4695-=_0x19d518['height']+0x8;const _0x1e8ee6=$gameSystem[_0x1a644f(0x1e4)]();_0xa95e23+=_0x1e8ee6['x'],_0x3b4695+=_0x1e8ee6['y'],this['x']=Math[_0x1a644f(0x340)](_0xa95e23),this['y']=Math['round'](_0x3b4695),this[_0x1a644f(0x1da)](!![],![]),this[_0x1a644f(0xe3)]=this[_0x1a644f(0xe3)]||{},this['_forcedPosition']['x']=this['x'],this[_0x1a644f(0xe3)]['y']=this['y'],this[_0x1a644f(0xe3)][_0x1a644f(0x111)]=this[_0x1a644f(0x111)],this[_0x1a644f(0xe3)][_0x1a644f(0x242)]=this[_0x1a644f(0x242)],this[_0x1a644f(0x1c7)][_0x1a644f(0x39f)]();},Window_Message[_0x4e69ba(0x39e)]['autoPositionOffsetX']=function(){return 0x0;},Window_Message[_0x4e69ba(0x39e)]['autoPositionOffsetY']=function(){return 0x0;},Window_Message[_0x4e69ba(0x39e)]['messagePositionReset']=function(){const _0x269538=_0x4e69ba;this['_messagePositionReset']=![],this[_0x269538(0x3a2)]=undefined,$gameSystem[_0x269538(0xbc)](),this[_0x269538(0x21f)](),this['openness']=0x0;},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x1f2)]=function(_0x48d067){const _0x2258a4=_0x4e69ba;return Window_Base[_0x2258a4(0x39e)][_0x2258a4(0x1f2)][_0x2258a4(0x1ea)](this,_0x48d067);},Window_Message[_0x4e69ba(0x39e)]['postConvertEscapeCharacters']=function(_0x19c703){const _0x16dadc=_0x4e69ba;return Window_Base[_0x16dadc(0x39e)]['postConvertEscapeCharacters'][_0x16dadc(0x1ea)](this,_0x19c703);},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x154)]=function(_0x49c8ef){const _0x1ed318=_0x4e69ba;this[_0x1ed318(0x2a9)](_0x49c8ef),Window_Base[_0x1ed318(0x39e)][_0x1ed318(0x154)][_0x1ed318(0x1ea)](this,_0x49c8ef),this[_0x1ed318(0x105)](_0x49c8ef);},Window_Message[_0x4e69ba(0x39e)]['preFlushTextState']=function(_0x2ae937){},Window_Message[_0x4e69ba(0x39e)][_0x4e69ba(0x105)]=function(_0x3e0f06){},Window_NameBox[_0x4e69ba(0x39e)][_0x4e69ba(0x2f1)]=function(){return![];},Window_NameBox[_0x4e69ba(0x39e)]['resetTextColor']=function(){const _0x28c284=_0x4e69ba;Window_Base[_0x28c284(0x39e)][_0x28c284(0x341)][_0x28c284(0x1ea)](this),this['changeTextColor'](this[_0x28c284(0x322)]());},Window_NameBox[_0x4e69ba(0x39e)][_0x4e69ba(0x322)]=function(){const _0x5445a7=_0x4e69ba,_0x201e02=VisuMZ[_0x5445a7(0x133)][_0x5445a7(0xe6)][_0x5445a7(0x3af)]['NameBoxWindowDefaultColor'];return ColorManager[_0x5445a7(0x259)](_0x201e02);},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x378)]=Window_NameBox[_0x4e69ba(0x39e)][_0x4e69ba(0x39f)],Window_NameBox[_0x4e69ba(0x39e)]['updatePlacement']=function(){const _0x6ca5a1=_0x4e69ba;VisuMZ['MessageCore'][_0x6ca5a1(0x378)][_0x6ca5a1(0x1ea)](this),this[_0x6ca5a1(0x27a)](),this[_0x6ca5a1(0x315)](),this['clampPlacementPosition'](),this[_0x6ca5a1(0x358)]();},Window_NameBox[_0x4e69ba(0x39e)][_0x4e69ba(0x1f2)]=function(_0x45a395){const _0x262e34=_0x4e69ba;return _0x45a395=_0x45a395[_0x262e34(0x391)](/<LEFT>/gi,this[_0x262e34(0x187)][_0x262e34(0x2a5)](this,0x0)),_0x45a395=_0x45a395[_0x262e34(0x391)](/<CENTER>/gi,this[_0x262e34(0x187)][_0x262e34(0x2a5)](this,0x5)),_0x45a395=_0x45a395[_0x262e34(0x391)](/<RIGHT>/gi,this['setRelativePosition']['bind'](this,0xa)),_0x45a395=_0x45a395[_0x262e34(0x391)](/<POSITION:[ ](\d+)>/gi,(_0x233c9f,_0x494a25)=>this['setRelativePosition'](parseInt(_0x494a25))),_0x45a395=_0x45a395[_0x262e34(0x391)](/<\/LEFT>/gi,''),_0x45a395=_0x45a395['replace'](/<\/CENTER>/gi,''),_0x45a395=_0x45a395[_0x262e34(0x391)](/<\/RIGHT>/gi,''),Window_Base[_0x262e34(0x39e)][_0x262e34(0x1f2)][_0x262e34(0x1ea)](this,_0x45a395);},Window_NameBox[_0x4e69ba(0x39e)][_0x4e69ba(0x187)]=function(_0x59ce03){const _0x106296=_0x4e69ba;return this[_0x106296(0x383)]=_0x59ce03,'';},Window_NameBox[_0x4e69ba(0x39e)][_0x4e69ba(0x27a)]=function(){const _0x2e83be=_0x4e69ba;if($gameMessage[_0x2e83be(0x2c2)]())return;this[_0x2e83be(0x383)]=this['_relativePosition']||0x0;const _0x1f5e10=this['_messageWindow'],_0x172fe6=Math[_0x2e83be(0x3bb)](_0x1f5e10[_0x2e83be(0x111)]*this[_0x2e83be(0x383)]/0xa);this['x']=_0x1f5e10['x']+_0x172fe6-Math[_0x2e83be(0x3bb)](this['width']/0x2),this['x']=this['x']['clamp'](_0x1f5e10['x'],_0x1f5e10['x']+_0x1f5e10[_0x2e83be(0x111)]-this[_0x2e83be(0x111)]);},Window_NameBox['prototype'][_0x4e69ba(0x315)]=function(){const _0xab916c=_0x4e69ba;if($gameMessage[_0xab916c(0x2c2)]())return;this['_relativePosition']=this[_0xab916c(0x383)]||0x0;const _0x91de0a=VisuMZ['MessageCore']['Settings']['General']['NameBoxWindowOffsetX'],_0x1e9256=VisuMZ[_0xab916c(0x133)]['Settings']['General'][_0xab916c(0x2a1)],_0x14421d=(0x5-this[_0xab916c(0x383)])/0x5;this['x']+=Math['floor'](_0x91de0a*_0x14421d),this['y']+=_0x1e9256;},Window_NameBox[_0x4e69ba(0x39e)][_0x4e69ba(0x358)]=function(){const _0x5f5240=_0x4e69ba,_0x51aff7=this[_0x5f5240(0x24c)],_0x40cffa=_0x51aff7['y'],_0x5809a0=VisuMZ['MessageCore'][_0x5f5240(0xe6)]['General'][_0x5f5240(0x2a1)];if(_0x40cffa>this['y']&&_0x40cffa<this['y']+this[_0x5f5240(0x242)]-_0x5809a0){if(_0x5f5240(0x261)!==_0x5f5240(0x261))return this[_0x5f5240(0x2be)](_0x30be89,!![],!![]),this['processAutoPosition'](_0x5f5240(0x232)),'';else this['y']=_0x51aff7['y']+_0x51aff7[_0x5f5240(0x242)];}},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x291)]=Window_NameBox[_0x4e69ba(0x39e)][_0x4e69ba(0x132)],Window_NameBox['prototype'][_0x4e69ba(0x132)]=function(){const _0x5b1079=_0x4e69ba;this[_0x5b1079(0x383)]=0x0,VisuMZ['MessageCore'][_0x5b1079(0x291)][_0x5b1079(0x1ea)](this);},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x2ed)]=function(){return![];},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x2f1)]=function(){return!![];},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x329)]=function(){const _0x1df589=_0x4e69ba;return $gameSystem[_0x1df589(0xb6)]()+0x8;},Window_ChoiceList[_0x4e69ba(0x39e)]['maxCols']=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x1f1)]=function(){const _0x3af170=_0x4e69ba;this[_0x3af170(0x132)](),this[_0x3af170(0x266)](),this[_0x3af170(0xca)](),this['activate']();},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x132)]=function(){const _0x5b90e0=_0x4e69ba;this[_0x5b90e0(0x14a)](),this['makeCommandList'](),this['_messageWindow']&&(this[_0x5b90e0(0x39f)](),this['placeCancelButton']()),this['createContents'](),this[_0x5b90e0(0x1d3)](),this[_0x5b90e0(0xb5)](),Window_Selectable[_0x5b90e0(0x39e)][_0x5b90e0(0x132)][_0x5b90e0(0x1ea)](this);},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x2ce)]=function(){const _0x26c1a0=_0x4e69ba,_0x1bb341=$gameMessage[_0x26c1a0(0x13d)]();let _0x4e0eb6=0x0;for(let _0x4a196c of _0x1bb341){_0x4a196c=this[_0x26c1a0(0x238)](_0x4a196c);if(this[_0x26c1a0(0xdd)](_0x4a196c)){if(_0x26c1a0(0x309)===_0x26c1a0(0x297))_0x2b5cd2[_0x26c1a0(0x227)](),_0x574d9d['updateDimensions'](),_0x134e5d['createContents']();else{const _0x2bd375=this[_0x26c1a0(0x3be)](_0x4a196c),_0xa4c39=this[_0x26c1a0(0x290)](_0x4a196c);this[_0x26c1a0(0x150)](_0x2bd375,_0x26c1a0(0x36e),_0xa4c39,_0x4e0eb6);}}_0x4e0eb6++;}},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x238)]=function(_0x143f71){const _0x4b9e80=_0x4e69ba;return Window_Base[_0x4b9e80(0x39e)][_0x4b9e80(0x222)][_0x4b9e80(0x1ea)](this,_0x143f71);},Window_ChoiceList['prototype']['isChoiceVisible']=function(_0x33bc43){const _0x38e1dd=_0x4e69ba;if(Imported[_0x38e1dd(0x3ba)])$gameMessage['registerSelfEvent']();if(_0x33bc43[_0x38e1dd(0x1ba)](/<HIDE>/i))return![];if(_0x33bc43[_0x38e1dd(0x1ba)](/<SHOW>/i))return!![];if(_0x33bc43['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x38e1dd(0x1fc)===_0x38e1dd(0x163)){const _0x2c4549=_0x3ef7d5['$1'][_0x38e1dd(0x308)](',')[_0x38e1dd(0x122)](_0x4be98d=>_0x4a9ea1(_0x4be98d)||0x0);for(const _0x5a8a2f of _0x2c4549){if(!_0x3511ab[_0x38e1dd(0x1e1)](_0x5a8a2f))return!![];}return![];}else{const _0x468083=RegExp['$1'][_0x38e1dd(0x308)](',')[_0x38e1dd(0x122)](_0x9d4cca=>Number(_0x9d4cca)||0x0);for(const _0x5e6fa1 of _0x468083){if(!$gameSwitches[_0x38e1dd(0x1e1)](_0x5e6fa1))return![];}return!![];}}if(_0x33bc43[_0x38e1dd(0x1ba)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x19840c=RegExp['$1']['split'](',')[_0x38e1dd(0x122)](_0x22539d=>Number(_0x22539d)||0x0);for(const _0x1746a0 of _0x19840c){if(!$gameSwitches[_0x38e1dd(0x1e1)](_0x1746a0))return![];}return!![];}if(_0x33bc43[_0x38e1dd(0x1ba)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2654d8=RegExp['$1']['split'](',')[_0x38e1dd(0x122)](_0x40c3c5=>Number(_0x40c3c5)||0x0);for(const _0xec6009 of _0x2654d8){if(_0x38e1dd(0x20a)===_0x38e1dd(0x20a)){if($gameSwitches[_0x38e1dd(0x1e1)](_0xec6009))return!![];}else this[_0x38e1dd(0x393)]['gradientFillRect'](_0xdc248,_0x4427c8,_0x405c66,_0x45a32b,_0x1e5e53,_0x271bc0,!![]);}return![];}if(_0x33bc43[_0x38e1dd(0x1ba)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4b3c40=RegExp['$1']['split'](',')[_0x38e1dd(0x122)](_0x539d44=>Number(_0x539d44)||0x0);for(const _0x40ab13 of _0x4b3c40){if(_0x38e1dd(0x306)===_0x38e1dd(0x2b3))return _0x52db03=_0x140800[_0x38e1dd(0x391)](/<LEFT>/gi,this[_0x38e1dd(0x187)][_0x38e1dd(0x2a5)](this,0x0)),_0x3bf108=_0x1df809['replace'](/<CENTER>/gi,this[_0x38e1dd(0x187)]['bind'](this,0x5)),_0x57e4b1=_0x3144fe[_0x38e1dd(0x391)](/<RIGHT>/gi,this[_0x38e1dd(0x187)][_0x38e1dd(0x2a5)](this,0xa)),_0x277407=_0x5fea18[_0x38e1dd(0x391)](/<POSITION:[ ](\d+)>/gi,(_0x20ee29,_0x1bf609)=>this['setRelativePosition'](_0x4914a0(_0x1bf609))),_0x11e8a7=_0x34dfe7[_0x38e1dd(0x391)](/<\/LEFT>/gi,''),_0x3735b5=_0x43906a[_0x38e1dd(0x391)](/<\/CENTER>/gi,''),_0x19594e=_0x59994c[_0x38e1dd(0x391)](/<\/RIGHT>/gi,''),_0x1fc2f1[_0x38e1dd(0x39e)]['preConvertEscapeCharacters'][_0x38e1dd(0x1ea)](this,_0x207e0e);else{if(!$gameSwitches[_0x38e1dd(0x1e1)](_0x40ab13))return!![];}}return![];}if(_0x33bc43[_0x38e1dd(0x1ba)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x402633=RegExp['$1'][_0x38e1dd(0x308)](',')['map'](_0x85e25d=>Number(_0x85e25d)||0x0);for(const _0x528ad7 of _0x402633){if(!$gameSwitches[_0x38e1dd(0x1e1)](_0x528ad7))return!![];}return![];}if(_0x33bc43[_0x38e1dd(0x1ba)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x38e1dd(0x311)!=='pMsIU'){if(!_0x33e6c8[_0x38e1dd(0x1e1)](_0xef8b9e))return![];}else{const _0x154b8b=RegExp['$1'][_0x38e1dd(0x308)](',')[_0x38e1dd(0x122)](_0x5159b8=>Number(_0x5159b8)||0x0);for(const _0x2f3221 of _0x154b8b){if(_0x38e1dd(0x36a)!==_0x38e1dd(0xda)){if($gameSwitches[_0x38e1dd(0x1e1)](_0x2f3221))return![];}else return 0x0;}return!![];}}return!![];},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x3be)]=function(_0x352982){const _0x1bfee7=_0x4e69ba;let _0x36a74d=_0x352982;return _0x36a74d=_0x36a74d[_0x1bfee7(0x391)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x36a74d=_0x36a74d[_0x1bfee7(0x391)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x36a74d;},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x290)]=function(_0x5e260f){const _0x2e661f=_0x4e69ba;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0x2e661f(0xfa)]();if(_0x5e260f[_0x2e661f(0x1ba)](/<DISABLE>/i))return![];if(_0x5e260f[_0x2e661f(0x1ba)](/<ENABLE>/i))return!![];if(_0x5e260f['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2b6881=RegExp['$1'][_0x2e661f(0x308)](',')[_0x2e661f(0x122)](_0x4e0bca=>Number(_0x4e0bca)||0x0);for(const _0x3f4e05 of _0x2b6881){if(_0x2e661f(0x397)!==_0x2e661f(0x397)){if(!this['_autoPositionTarget'])return;const _0x18da74=_0x19a306[_0x2e661f(0xd7)];if(!_0x18da74)return;if(!_0x18da74[_0x2e661f(0x1af)])return;const _0x4a12b1=_0x18da74[_0x2e661f(0x1af)][_0x2e661f(0x263)](this[_0x2e661f(0x3a2)]);if(!_0x4a12b1)return;let _0x33bc7a=_0x4a12b1['x'];_0x33bc7a-=this['width']/0x2,_0x33bc7a-=(_0x3e6412[_0x2e661f(0x111)]-_0x22f6a3['boxWidth'])/0x2,_0x33bc7a+=this[_0x2e661f(0xb8)]();let _0x21f981=_0x4a12b1['y'];_0x21f981-=this[_0x2e661f(0x242)],_0x21f981-=(_0x2867d6['height']-_0x1d6af8['boxHeight'])/0x2,_0x21f981+=this[_0x2e661f(0x2d0)](),_0x21f981-=_0x4a12b1['height']+0x8;const _0x40206e=_0x35582e[_0x2e661f(0x1e4)]();_0x33bc7a+=_0x40206e['x'],_0x21f981+=_0x40206e['y'],this['x']=_0x5d87ab[_0x2e661f(0x340)](_0x33bc7a),this['y']=_0x1b9822[_0x2e661f(0x340)](_0x21f981),this[_0x2e661f(0x1da)](!![],![]),this['_forcedPosition']=this[_0x2e661f(0xe3)]||{},this[_0x2e661f(0xe3)]['x']=this['x'],this[_0x2e661f(0xe3)]['y']=this['y'],this[_0x2e661f(0xe3)][_0x2e661f(0x111)]=this[_0x2e661f(0x111)],this[_0x2e661f(0xe3)][_0x2e661f(0x242)]=this[_0x2e661f(0x242)],this[_0x2e661f(0x1c7)][_0x2e661f(0x39f)]();}else{if(!$gameSwitches[_0x2e661f(0x1e1)](_0x3f4e05))return![];}}return!![];}if(_0x5e260f['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x400f95=RegExp['$1']['split'](',')['map'](_0x803007=>Number(_0x803007)||0x0);for(const _0x3290a9 of _0x400f95){if('qWZLQ'!==_0x2e661f(0x1e6)){let _0x1d79f6=this['y'];this['x']=_0x255f8e['round']((_0x80b9cf[_0x2e661f(0x1b7)]-this[_0x2e661f(0x111)])/0x2),_0x2bebaa[_0x2e661f(0x133)][_0x2e661f(0x1de)][_0x2e661f(0x1ea)](this);if(this[_0x2e661f(0x3a2)])this['y']=_0x1d79f6;this['updateXyOffsets'](),this[_0x2e661f(0x33a)](),this[_0x2e661f(0x1da)]();}else{if(!$gameSwitches[_0x2e661f(0x1e1)](_0x3290a9))return![];}}return!![];}if(_0x5e260f[_0x2e661f(0x1ba)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2ea981=RegExp['$1'][_0x2e661f(0x308)](',')[_0x2e661f(0x122)](_0x219e8e=>Number(_0x219e8e)||0x0);for(const _0x33ebae of _0x2ea981){if($gameSwitches[_0x2e661f(0x1e1)](_0x33ebae))return!![];}return![];}if(_0x5e260f[_0x2e661f(0x1ba)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x2e661f(0x2bc)!=='sYWgI'){const _0x53fbed=RegExp['$1']['split'](',')['map'](_0x5d0dc6=>Number(_0x5d0dc6)||0x0);for(const _0x5248f1 of _0x53fbed){if(_0x2e661f(0x3bc)!==_0x2e661f(0x3bc))this[_0x2e661f(0x231)][_0x2e661f(0x2f9)]();else{if(!$gameSwitches['value'](_0x5248f1))return!![];}}return![];}else{if(!_0x34dfda[_0x2e661f(0x1e1)](_0x10ddb9))return!![];}}if(_0x5e260f[_0x2e661f(0x1ba)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x55ad24=RegExp['$1']['split'](',')['map'](_0x121385=>Number(_0x121385)||0x0);for(const _0x5728e6 of _0x55ad24){if('pNCSn'===_0x2e661f(0x1a0)){if(!$gameSwitches[_0x2e661f(0x1e1)](_0x5728e6))return!![];}else _0x13dfd5[_0x2e661f(0x133)][_0x2e661f(0xd3)][_0x2e661f(0x1ea)](this,_0x27862b),_0x2e661f(0x2d1)in _0x1bc516?this[_0x2e661f(0x2d1)]=_0x3e352c(_0x49be4b['textSpeed'])[_0x2e661f(0x2dc)](0x1,0xb):this[_0x2e661f(0x2d1)]=_0x4105ee['MessageCore'][_0x2e661f(0xe6)]['TextSpeed'][_0x2e661f(0x1bb)];}return![];}if(_0x5e260f['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3cbef0=RegExp['$1'][_0x2e661f(0x308)](',')[_0x2e661f(0x122)](_0x3010f3=>Number(_0x3010f3)||0x0);for(const _0x52a2d9 of _0x3cbef0){if(_0x2e661f(0x38f)==='jzYks')_0x294133[_0x2e661f(0x133)][_0x2e661f(0x26a)][_0x2e661f(0x1ea)](this,_0x5d6c12,_0x5259fd,_0x2a3692),_0x16282e>0x0&&this[_0x2e661f(0x2c1)](_0x2f5efe,_0x1d5ed9);else{if($gameSwitches[_0x2e661f(0x1e1)](_0x52a2d9))return![];}}return!![];}return!![];},VisuMZ[_0x4e69ba(0x133)][_0x4e69ba(0x22c)]=Window_ChoiceList['prototype'][_0x4e69ba(0x39f)],Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x39f)]=function(){const _0x2d42e9=_0x4e69ba;VisuMZ[_0x2d42e9(0x133)]['Window_ChoiceList_updatePlacement'][_0x2d42e9(0x1ea)](this),this[_0x2d42e9(0x1da)]();},Window_ChoiceList['prototype'][_0x4e69ba(0xf7)]=function(){const _0xc9450e=_0x4e69ba;if(!this[_0xc9450e(0x3a3)])return;const _0x55b9fc=0x8,_0x57bb8a=this[_0xc9450e(0x3a3)],_0x29328e=this['x']+this[_0xc9450e(0x111)],_0x51fc84=Math[_0xc9450e(0x3bb)]((Graphics[_0xc9450e(0x111)]-Graphics[_0xc9450e(0x1b7)])/0x2);_0x29328e>=Graphics[_0xc9450e(0x1b7)]+_0x51fc84-_0x57bb8a[_0xc9450e(0x111)]+_0x55b9fc?_0x57bb8a['x']=-_0x57bb8a[_0xc9450e(0x111)]-_0x55b9fc:_0x57bb8a['x']=this['width']+_0x55b9fc,_0x57bb8a['y']=this[_0xc9450e(0x242)]/0x2-_0x57bb8a[_0xc9450e(0x242)]/0x2;},VisuMZ[_0x4e69ba(0x133)]['Window_ChoiceList_windowX']=Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x17a)],Window_ChoiceList[_0x4e69ba(0x39e)]['windowX']=function(){const _0x2b7fc0=_0x4e69ba;return this[_0x2b7fc0(0x24c)]?this[_0x2b7fc0(0x381)]():VisuMZ['MessageCore'][_0x2b7fc0(0x1ad)]['call'](this);},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x381)]=function(){const _0x4fec2d=_0x4e69ba,_0x5ad840=$gameMessage[_0x4fec2d(0x21d)]();if(_0x5ad840===0x1)return(Graphics['boxWidth']-this[_0x4fec2d(0x217)]())/0x2;else return _0x5ad840===0x2?this[_0x4fec2d(0x24c)]['x']+this[_0x4fec2d(0x24c)][_0x4fec2d(0x111)]-this[_0x4fec2d(0x217)]():this['_messageWindow']['x'];},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x217)]=function(){const _0xe4a2a9=_0x4e69ba,_0x3b3cba=(this[_0xe4a2a9(0x337)]()+this[_0xe4a2a9(0xdc)]())*this[_0xe4a2a9(0x394)]()+this[_0xe4a2a9(0x234)]*0x2;return Math[_0xe4a2a9(0xf9)](_0x3b3cba,Graphics[_0xe4a2a9(0x111)]);},Window_ChoiceList[_0x4e69ba(0x39e)]['numVisibleRows']=function(){const _0x3068cb=_0x4e69ba,_0x1ab858=$gameMessage[_0x3068cb(0x13d)]()[_0x3068cb(0x122)](_0x1c89d8=>this[_0x3068cb(0x238)](_0x1c89d8))[_0x3068cb(0x219)](_0x26a858=>this[_0x3068cb(0xdd)](_0x26a858)),_0x25e176=Math[_0x3068cb(0x314)](_0x1ab858['length']/this[_0x3068cb(0x394)]());return Math['max'](0x1,Math[_0x3068cb(0xf9)](_0x25e176,this['maxLines']()));},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x2cf)]=function(){const _0x397dbb=_0x4e69ba,_0x2ed860=this[_0x397dbb(0x24c)],_0x2353f3=_0x2ed860?_0x2ed860['y']:0x0,_0x29e5de=_0x2ed860?_0x2ed860['height']:0x0,_0x35b310=Graphics['boxHeight']/0x2;if(_0x2353f3<_0x35b310&&_0x2353f3+_0x29e5de>_0x35b310)return 0x4;else{if(_0x397dbb(0x17d)!==_0x397dbb(0x17d)){_0xa01c75[_0x397dbb(0x133)][_0x397dbb(0x2ae)]=[];for(let _0xd389b3=0x1;_0xd389b3<=0x1f;_0xd389b3++){const _0x2972a2=_0x397dbb(0x1d6)[_0x397dbb(0x31e)](_0xd389b3),_0x5c4397=_0x3ad24d[_0x397dbb(0x133)][_0x397dbb(0xe6)][_0x397dbb(0x1fa)][_0x2972a2];_0x5c4397[_0x397dbb(0x210)]((_0x127d51,_0x31e9cc)=>{const _0x3fce61=_0x397dbb;if(!_0x127d51||!_0x31e9cc)return-0x1;return _0x31e9cc[_0x3fce61(0x34e)]-_0x127d51[_0x3fce61(0x34e)];}),this[_0x397dbb(0x214)](_0x5c4397,_0xd389b3);}}else return $gameSystem[_0x397dbb(0x39b)]();}},Window_ChoiceList['prototype'][_0x4e69ba(0x337)]=function(){const _0xba3ffe=_0x4e69ba;let _0x46f4bf=this[_0xba3ffe(0xe4)]();for(const _0xd84c57 of this[_0xba3ffe(0xd1)]){if(_0xba3ffe(0x141)===_0xba3ffe(0x34d)){const _0x22b0f7=0xb-_0x23515f[_0xba3ffe(0x2d1)];_0xb5c730=_0x4e3561['round'](_0xe42462*_0x22b0f7),this['_textDelayCount']=_0x29689a,this[_0xba3ffe(0x1e0)]=_0x1b6c62;}else{const _0x10711d=_0xd84c57['name'],_0x3c15d0=this['getChoiceIndent'](_0x10711d),_0x17d3fe=this[_0xba3ffe(0x1ab)](_0x10711d)['width']+_0x3c15d0,_0x5e3e66=Math['ceil'](_0x17d3fe)+this[_0xba3ffe(0x212)]()*0x2;_0x46f4bf=Math[_0xba3ffe(0x205)](_0x46f4bf,_0x5e3e66);}}return _0x46f4bf;},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0xe4)]=function(){const _0x22052e=_0x4e69ba;let _0x2ad4b2=0x60;const _0x14ed8f=$gameMessage[_0x22052e(0x13d)]();for(const _0x15554d of _0x14ed8f){_0x15554d[_0x22052e(0x1ba)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x2ad4b2=Math[_0x22052e(0x205)](_0x2ad4b2,Number(RegExp['$1'])));}return _0x2ad4b2;},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x354)]=function(_0x2bda2a){const _0x2b58cc=_0x4e69ba,_0x515f5b=this[_0x2b58cc(0x2a0)](_0x2bda2a),_0x503f8f=$gameSystem['getChoiceListTextAlign']()!=='default'?_0x2b58cc(0x3ad)['format']($gameSystem[_0x2b58cc(0x2c8)]()):'',_0x4e8501=_0x503f8f+this['commandName'](_0x2bda2a);this['changePaintOpacity'](this['isCommandEnabled'](_0x2bda2a));const _0x30f62a=this[_0x2b58cc(0x1ab)](_0x4e8501)[_0x2b58cc(0x242)],_0x2b3cd1=_0x515f5b['x']+this[_0x2b58cc(0x171)](_0x4e8501),_0x2eeb5f=Math[_0x2b58cc(0x205)](_0x515f5b['y'],_0x515f5b['y']+Math[_0x2b58cc(0x340)]((_0x515f5b[_0x2b58cc(0x242)]-_0x30f62a)/0x2));this[_0x2b58cc(0xcb)](_0x4e8501,_0x2b3cd1,_0x2eeb5f,_0x515f5b['width']),this[_0x2b58cc(0x1b2)](_0x2bda2a);},Window_ChoiceList[_0x4e69ba(0x39e)][_0x4e69ba(0x171)]=function(_0xae6d51){let _0x42f756=0x0;return _0xae6d51['match'](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x42f756=Number(RegExp['$1'])),_0x42f756;},Window_ChoiceList[_0x4e69ba(0x39e)]['changeChoiceBackgroundColor']=function(_0x31e999){const _0x3cb7a0=_0x4e69ba;if(!Imported[_0x3cb7a0(0xcf)])return;const _0xcfccb1=this[_0x3cb7a0(0x1b8)](_0x31e999);let _0x495c50=![],_0x5acc89=![],_0x44a492=ColorManager[_0x3cb7a0(0x123)](),_0x24d1f6=ColorManager[_0x3cb7a0(0x313)]();if(_0xcfccb1[_0x3cb7a0(0x1ba)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x44a492=ColorManager[_0x3cb7a0(0x128)](RegExp['$1'])[_0x3cb7a0(0x280)](),_0x24d1f6=ColorManager['getColor'](RegExp['$2'])[_0x3cb7a0(0x280)](),_0x495c50=!![];else{if(_0xcfccb1[_0x3cb7a0(0x1ba)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x4f686d=String(RegExp['$1'])[_0x3cb7a0(0x26e)]()['trim']();switch(_0x4f686d){case _0x3cb7a0(0x35e):_0x44a492=_0x24d1f6=_0x3cb7a0(0x215),_0x5acc89=!![];break;case _0x3cb7a0(0xc2):_0x44a492=_0x24d1f6=_0x3cb7a0(0x35d),_0x5acc89=!![];break;case'yellow':_0x44a492=_0x24d1f6='#fff799',_0x5acc89=!![];break;case _0x3cb7a0(0x1dd):_0x44a492=_0x24d1f6=_0x3cb7a0(0x121),_0x5acc89=!![];break;case _0x3cb7a0(0x3ae):_0x44a492=_0x24d1f6=_0x3cb7a0(0x1c0),_0x5acc89=!![];break;case _0x3cb7a0(0x35c):case _0x3cb7a0(0x245):_0x44a492=_0x24d1f6=_0x3cb7a0(0x25d),_0x5acc89=!![];break;case _0x3cb7a0(0x344):_0x44a492=_0x24d1f6='#c69c6d',_0x5acc89=!![];break;case _0x3cb7a0(0x1f6):_0x44a492=_0x24d1f6=_0x3cb7a0(0xfd),_0x5acc89=!![];break;case _0x3cb7a0(0x273):_0x44a492=_0x24d1f6=_0x3cb7a0(0x368),_0x5acc89=!![];break;case _0x3cb7a0(0x207):case _0x3cb7a0(0x14f):_0x44a492=_0x24d1f6='#acacac',_0x5acc89=!![];break;case _0x3cb7a0(0x380):_0x44a492=_0x24d1f6=_0x3cb7a0(0x3b7),_0x5acc89=!![];break;case _0x3cb7a0(0x275):_0x44a492=_0x24d1f6=ColorManager[_0x3cb7a0(0x31f)](),_0x5acc89=!![];break;case'no':_0x44a492=_0x24d1f6=ColorManager[_0x3cb7a0(0x318)](),_0x5acc89=!![];break;case _0x3cb7a0(0xd8):_0x44a492=_0x24d1f6=ColorManager[_0x3cb7a0(0x182)](),_0x5acc89=!![];break;case _0x3cb7a0(0x161):_0x44a492=_0x24d1f6=ColorManager[_0x3cb7a0(0x365)](),_0x5acc89=!![];break;default:_0x44a492=_0x24d1f6=ColorManager[_0x3cb7a0(0x128)](_0x4f686d),_0x5acc89=!![];break;}_0x495c50=!![];}}if(!_0x495c50)return;const _0x464420=this[_0x3cb7a0(0x1cc)](_0x31e999);this['contentsBack'][_0x3cb7a0(0x1c4)](_0x464420['x'],_0x464420['y'],_0x464420[_0x3cb7a0(0x111)],_0x464420[_0x3cb7a0(0x242)]),this[_0x3cb7a0(0xfe)](_0x464420,_0x44a492,_0x24d1f6,_0x5acc89);},Window_ChoiceList[_0x4e69ba(0x39e)]['drawCustomBackgroundColor']=function(_0x34ea0d,_0x13e95f,_0x537d4a,_0x3e4b15){const _0x89bfb1=_0x4e69ba,_0x213a11=ColorManager[_0x89bfb1(0x123)](),_0x4b0373=ColorManager['dimColor2'](),_0x5259e0=_0x13e95f??ColorManager[_0x89bfb1(0x123)](),_0x178537=_0x537d4a??_0x13e95f,_0x301127=_0x34ea0d['x'],_0x289f29=_0x34ea0d['y'],_0x58d74a=_0x34ea0d[_0x89bfb1(0x111)],_0x2ffb43=_0x34ea0d['height'];this[_0x89bfb1(0x393)][_0x89bfb1(0x2ac)](_0x301127,_0x289f29,_0x58d74a,_0x2ffb43,_0x5259e0,_0x178537,!![]),_0x3e4b15&&(_0x89bfb1(0x1d2)===_0x89bfb1(0x1d2)?this[_0x89bfb1(0x393)][_0x89bfb1(0x2ac)](_0x301127,_0x289f29,_0x58d74a,_0x2ffb43,_0x213a11,_0x178537,!![]):_0x3d19b0=_0x3cc8c0[_0x89bfb1(0x391)](_0x307897[0x0],_0x2497ed[0x1])),this[_0x89bfb1(0x393)][_0x89bfb1(0x3a5)](_0x301127,_0x289f29,_0x58d74a,_0x2ffb43,_0x213a11);},Window_ChoiceList['prototype']['callOkHandler']=function(){const _0x592c08=_0x4e69ba;$gameMessage[_0x592c08(0xe2)](this[_0x592c08(0x2e2)]()),this[_0x592c08(0x24c)][_0x592c08(0x30f)](),this['close']();};