//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.22] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x50ca=['Game_Interpreter_updateWaitMode','Game_CharacterBase_screenX','characterName','timer','right','setStopFollowerChasing','pattern','updatePeriodicRefresh','checkActivationProximity','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','GCYeK','_visiblePlayerY','follower','meetActivationRegionConditions','sTnHu','needsUpdate','nyypa','createIconSprite','Game_CharacterBase_characterIndex','NUM','_eventLabelOffsetY','isNormalPriority','updateScale','makeDeepCopy','Movement','Jxwgz','Ship','splice','setNumberInput','onExpire','removeChild','ibDSn','cZIMU','executeMove','processMoveRouteStepToCharacter','_labelWindow','owWch','_EventIcons','Game_Map_setupEvents','split','OFF','backX','Enable','setFrame','Scene_Boot_onDatabaseLoaded','zYTcC','executeMoveDir8','_eventCopyData','zcpuD','isEventTest','Region','ngBGE','value','MUSIC\x20NOTE','_needsPeriodicRefresh','nNdvG','YiGPT','_eventScreenX','_eventSpawnData','setCommonEvent','isDashDisabled','Rope','TRUE','STR','meetsSwitchCondition','Game_CharacterBase_hasStepAnime','updateRoutineMove','player','PosX','TargetSwitchId','AbKKW','EventTimerResume','reverse\x20mimic','isDiagonalDirection','fBLWl','nYLDq','IaQtU','Allow','constructor','checkEventTriggerHere','characterIndex','Game_Event_updateSelfMovement','processMoveSynchMirrorVert','gBoUq','create','checkEventTriggerAuto','_callEventMap','onOk','characterIndexVS8','IconSet','XYiCN','ipzTZ','rYskL','getPosingCharacterIndex','mirror\x20vertical','SwitchGetSelfSwitchID','switch1Valid','FastForwardKey','PlayerMovementDiagonal','moveSynchType','SPIN\x20CCW','NmMUI','SpawnEventDespawnAtXY','log','SelfSwitchID','XlogW','vpRaW','MapId','HEART','61YejZNl','processMoveRouteTeleportTo','_randomHomeY','OffsetX','TiltLeft','Game_Variables_value','YJKam','_advancedSwitchVariable','_text','distance','command108','map','PreSpawnJS','regionList','SelfSwitchABCD','isPressed','_alwaysUpdateMove','ajJOV','autoEventIconBuffer','createContents','getLastPluginCommandInterpreter','PlayerAllow','initEventsMoveCoreSettings','USER-DEFINED\x205','abs','turnAwayFromPoint','EventLocationCreate','pluginCommandCallEvent','GJJbi','AutoBuffer','xyaDs','DiagonalSpeedMultiplier','pos','_tilemap','bufferX','setValue','pageIndex','advancedFunc','bDjED','PostCopyJS','FALSE','switches','defaultFontSize','euMTw','ynfeO','shadowFilename','LOWER\x20LEFT','_cpc','RtsuJ','_moveRouteIndex','isAdvancedVariable','Spriteset_Map_createLowerLayer','Name','_selfTargetItemChoice','BoatSpeed','eventId','contentsOpacity','pause','Scene_Load_onLoadSuccess','labelWindowText','EventID','okYdb','_needsRefresh','checkRegionEventTrigger','AmdNR','VehicleForbid','prepareSpawnedEventAtTerrainTag','Game_Timer_start','_commonEventId','_patternLocked','_eventOverload','erase','ADDITIVE','_data','event','refreshIfNeeded','yWDxH','isSelfSwitch','SelfVariables','HNuNi','FALdW','square','setTileBitmap','nFHbh','random','isAllowCharacterTilt','createCharacterShadow','Game_Timer_initialize','Visible','roundYWithDirection','iconWidth','BalloonOffsetX','activationProximityDistance','_MapSpawnedEventData','SCREEN','trigger','_selfTargetNumberInput','height','_moveSynch','Game_Event_event','Game_Troop_meetsConditionsCPC','RIGHT','mapId','SwitchGetSelfSwitchABCD','tcJOF','eroip','Operation','Game_SelfSwitches_setValue','_event','isAutoBufferIcon','fontFace','startMessage','removeMorph','ANGER','pageId','Game_Character_setMoveRoute','reserveCommonEvent','VisibleEventLabels','determineCommonEventsWithCPC','isEventOverloaded','updateShadow','Umaqp','canPass','_paused','setupSpawn','_selfEvent','ShowShadows','clearSpriteOffsets','jenPZ','QmsIe','isStopFollowerChasing','wSGwq','registerCommand','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_target','apply','CustomPageConditions','ESRyb','DashEnableToggle','moveSynchTarget','processMoveRouteSelfVariable','createShadow','QlenP','GMaUc','SmNlJ','DefaultShadow','addChild','MorphEventTo','isSmartEventCollisionOn','fittingHeight','code','EXCLAMATION','page','FavorHorz','_screenZoomScale','EventTimerSpeed','eventLabelsVisible','SPIN\x20ANTICLOCKWISE','clearStepPattern','_spawnPreserved','QEcPo','Sprite_Balloon_updatePosition','createShadows','MLPwu','deleteSavedEventLocationKey','hasDragonbones','frontY','setupCopyEvent','dOatn','Self\x20Variable\x20%1','UquNf','spriteId','checkEventTriggerEventsMoveCore','_scene','PlayerForbid','moveAwayFromCharacter','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','ROUTE_SCRIPT','Sprite_Character_setTileBitmap','_waitMode','qkKDp','registerSelfTarget','processMoveRouteMoveRepeat','findTargetSprite','_PlayerDiagonalSetting','Step2EventId','toUpperCase','parse','EkrhP','_pose','FollowerSetGlobalChase','_inputTime','loadDataFile','Game_Follower_initialize','reverseDir','createLabelWindows','yCxyJ','turnTowardPoint','TemplateName','setupEventsMoveCoreCommentTags','MapID','EventAllow','checkEventsMoveCoreStringTags','Game_Map_unlockEvent','MessageCore','Game_Map_refresh','isBattleTest','processMoveRouteFadeIn','isSelfVariable','trim','opacity','_eventPageIndex','getPosingCharacterDirection','Step1MapId','_encounterEffectDuration','setupEventsMoveCoreNotetags','MorphEventRemove','fsmYQ','_moveOnlyRegions','_activationProximityAutoTriggerBypass','MjhyD','Game_Event_locate','dashSpeedModifier','_moveRoute','posNt','MoveAllSynchTargets','remove','drawing','saveEventLocation','joppM','eKSvk','requestAnimation','setDirection','setupChild','_type','TerrainTags','UPPER\x20RIGHT','Window_EventItem_onCancel','XjEOS','horizontal\x20mirror','Window_ScrollText_startMessage','vpUBD','IconBlendMode','ZFYQp','dir8','zinmB','Preserve','bind','setLastPluginCommandInterpreter','setEventIconData','left','isAirship','TRENN','Map%1.json','initEventsMoveCoreEffects','mkTXZ','floor','processMoveRoutePatternLock','_shadowSprite','prepareSpawnedEventAtXY','vaiYS','JDkeU','setupDiagonalSupport','724ytEQdL','note','Frames','DashingEnable','eUVPE','isRegionAllowPass','requestBalloon','checkSmartEventCollision','Game_Map_event','front','radius','EventTimerPause','updateMoveSynch','COLLAPSE','WeXWO','clearPageSettings','_labelWindows','add','registerSelfEvent','updateWaitMode','RTIal','JWMVs','_periodicRefreshTimer','IconBufferY','IXuWx','_eventIconSprite','qEaPg','CPCsMet','processMoveSynchAway','SPIN\x20ACW','LOWER\x20RIGHT','_speed','SPIN\x20CW','Game_Event_moveTypeRandom','clearPose','KNEEL','%1DockRegionOnly','Player','EkLCg','yAGRQ','SwitchId','resizeWindow','Game_Character_forceMoveRoute','nEepa','iconHeight','processMoveRouteHugWall','smooth','YTrsS','NXJdd','concat','Window_Message_startMessage','shiftY','status','loadSystem','_stopCount','morphIntoTemplate','getPlayerDiagonalSetting','JZPbq','direction','Passability','onClickTrigger','getSelfTarget','max','text','isPassableByAnyDirection','urGbZ','processMoveRouteFadeOut','Game_CharacterBase_updatePattern','waMWN','_shadowGraphic','updateVS8BalloonOffsets','Game_Variables_setValue','toLowerCase','isPlayerControlDisabled','lineHeight','VICTORY','processMoveRouteJumpToCharacter','target','deletePreservedMorphEventDataKey','unlockEvent','Sprite_Character_characterPatternY','deleteEventLocation','HXLvR','setDashingEnabled','deltaY','_frames','Button','isActive','isJumping','VehicleDock','_filename','isEventRunning','roundX','boxWidth','isTargetEventValidForLabelWindow','$callEventMap','regionId','round','Game_Switches_value','chaseCharacter','Step1EventId','Game_Map_isDashDisabled','MlOZK','kvAOW','VariableId','BufferY','qqdXK','_spriteset','updateOpacity','HMPH','processMoveSynch','BalloonOffsetY','FUNC','VS8','getPose','hasStepAnime','turnRight90','canMove','RHFzs','moveDiagonally','Region%1','Game_Event_findProperPageIndex','firstSpawnedEvent','moveTowardPoint','includes','Eoiph','LIGHT-BULB','getEventIconData','processMoveRouteJumpForward','Game_Event_initialize','spawnEventId','StrictCollision','_poseDuration','despawnEventId','convertVariableValuesInScriptCall','_CPCs','Label','clearCarrying','deltaXFrom','traNX','isPosing','_pageIndex','processMoveRouteTeleportToCharacter','_moveSpeed','return\x20%1','HURT','scale','Walk','Letter','PageId','iconIndex','nbyWJ','inBattle','OpacitySpeed','offsetX','clear','_addedHitbox','isSpriteVS8dir','Template','meetActivationProximityConditions','LOVE','_opacity','resetFontSettings','yPonD','FollowerReset','updateBitmapSmoothing','setDiagonalDirection','getSavedEventLocation','LIGHTBULB','processMoveRouteMoveUntilStop','setPlayerDiagonalSetting','SpawnEventAtRegion','kTYvK','msgtY','Game_Player_executeMove','onCancel','getEventIconIndex','gywco','startMapCommonEventOnOK','RwwSQ','QIdOT','Self\x20Switch\x20%1','pages','tSspK','screenX','setSelfValue','createSpawnedEvent','initFollowerController','replace','Value','qdpuw','randomInt','Map%1-Event%2','ghKIS','setItemChoice','ITEM','Game_Event_start','processMoveRouteBalloon','TmrLi','airship','getControlledFollowerID','Minutes','Game_SelfSwitches_value','Collision','Game_Map_events','VxbLk','EnableDashTilt','unlock','isPreventSelfMovement','Game_CharacterBase_update','setMoveRoute','Game_Event_setupPageSettings','Setting','cCoYc','_characterName','ZmUzc','createLabelWindowForTarget','turnAwayFromCharacter','isTile','isShadowShrink','processMoveRouteAnimation','_spriteOffsetY','Game_Interpreter_PluginCommand','string','Game_CharacterBase_direction','length','Game_CharacterBase_isDashing','Sprite_Character_update','rzkOE','iconSize','_shadowOpacity','correctFacingDirection','HXDtx','Game_CharacterBase_setDirection','TiltRight','drawIcon','isInVehicle','blt','RegionTouch','ship','eQkQn','vert\x20mirror','delay','JSON','resume','_eventCache','Game_Vehicle_initMoveSpeed','initialize','JtULH','19iXSvFv','clearDestination','rAQrl','width','SPIN\x20CLOCKWISE','EventIconDelete','FollowerSetControl','isSupportDiagonalMovement','IconSize','_pattern','conditions','firstSpawnedEventID','outlineColor','deleteSavedEventLocation','LIGHT\x20BULB','2654FhMTQf','PreCopyJS','vehicle','increaseSteps','forceCarrying','AdvancedVariables','Game_Message_setNumberInput','enable','_comments','KhRSC','PlayerMovementChange','list','QHwHs','checkAdvancedSwitchVariablePresent','onDatabaseLoaded','filename','forceDashing','executeCommand','prototype','_EventsMoveCoreSettings','processMoveCommandEventsMoveCore','directionOnLadderSpriteVS8dir','offsetY','initMembersEventsMoveCore','backY','savePreservedMorphEventDataKey','_interpreter','setEventIconDataKey','dwCUr','PreMorphJS','refresh','_regionRules','_expireCommonEvent','ARRAYSTR','_DisablePlayerControl','format','determineEventOverload','clearSelfTarget','ARRAYSTRUCT','isRegionDockable','processMoveSynchRandom','nqlJY','Game_Troop_meetsConditions','deltaYFrom','uzgOy','Game_Follower_chaseCharacter','IconIndex','isMoving','QUESTION','startMapCommonEventOnOKTarget','isMoveOnlyRegionPassable','jAsFB','WBEkQ','createBitmap','xqEKB','isAdvancedSwitch','_saveEventLocation','STRUCT','GetMoveSynchTarget','posEventsMoveCore','438670tsKoYr','Game_Interpreter_executeCommand','eventsXyNt','VisuMZ_Setup_Preload_Map','jumpHeight','setupSpawnTest','WYDSi','USER-DEFINED\x202','_eventOverloadThreshold','Sprite_Balloon_setup','Qzcni','_eventId','rotation','visibleRange','down','ARRAYNUM','Game_Event_meetsConditionsCPC','Hours','getMapSpawnedEventData','some','PeoWU','_followerControlID','bRwHb','Game_CharacterBase_moveDiagonally','SWmMG','getDirectionFromPoint','metCPC','LjuuS','_lastMovedDirection','isSaveEventLocation','_randomMoveWeight','edIIK','isSpawnedEvent','processMoveCommand','clearEventCache','EnableDir8','_cacheVisibility','Tzoov','isDestinationValid','destinationY','character','frontX','copy','VisibleRange','BufferX','shadowY','roundY','181YCsnkH','QbUOj','isPlaytest','_cacheSystemVisible','ltbGb','rbnxc','mvvWQ','processOk','min','MFVeU','isTriggerIn','JVuFe','EnableTurnInPlace','isValid','addLoadListener','processMoveSynchApproach','Game_Player_isMapPassable','VariableGetSelfVariableID','EventLocationDelete','none','createLowerLayer','TargetVariableId','isShadowVisible','createSaveEventLocationData','windowPadding','gainFrames','changeSpeed','setupRegionRestrictions','IqCYp','autosaveEventLocation','Game_Timer_onExpire','onLoadSuccess','EuoDc','Seconds','SuccessSwitchId','approach','Game_Timer_stop','getInputDirection','FRUSTRATION','VfhED','parameters','Window_EventItem_onOk','_eventMorphData','restoreSavedEventPosition','setMoveSpeed','PreloadMaps','isDashingAndMoving','Game_CharacterBase_canPass','Game_Temp_setDestination','canStartLocalEvents','_seconds','_selfTarget','%1Dock','Game_Player_isDashing','IconBufferX','push','slice','bufferY','RandomMoveWeight','getPosingCharacterPattern','Game_Event_clearPageSettings','Game_Vehicle_isMapPassable','isNearTheScreen','Game_Player_checkEventTriggerHere','_characterSprites','checkValidEventerMap','SLEEP','CommonEventID','visible','setPattern','Window_NumberInput_start','_spriteOffsetX','Game_Event_updateParallel','charAt','_counter','stop','Game_CharacterBase_screenY','deltaX','processMoveRouteMoveTo','nOOfD','disable','requestRefresh','activationRegionList','Event','QdbmN','kCvVa','sYLEn','canPassDiagonally','turnTowardCharacter','FollowerID','CVUFp','ShipSpeed','ConvertParams','default','RnSdb','findProperPageIndex','RIGHT\x20TO\x20LEFT','%1Allow','PostSpawnJS','clearDashing','initMoveSpeed','EventAutoMovement','setChaseOff','isOnLadder','isRunning','isEventClickTriggered','indexOf','Game_CharacterBase_pattern','aLmGB','UNTITLED','_eventLabelOffsetX','CsTce','moveForward','moveBackToRandomHome','Game_Player_getInputDirection','ECHYc','characterPatternY','reverse\x20copy','despawnAtXY','region','command357','Toggle','isBusy','_forceCarrying','isDashing','CQOdB','setBalloonPose','_mapId','isMovementSucceeded','rvJEi','_working','initEventsMoveCore','hideShadows','moveStraight','processMoveSynchMimic','VehicleAllow','mirror\x20vert','Sprite_Character_setCharacterBitmap','clamp','REJlf','realMoveSpeed','update','ARRAYEVAL','_commonEvents','Game_Character_processMoveCommand','koeqC','parallelCommonEvents','findDirectionTo','despawnTerrainTags','mDeSG','Game_Event_checkEventTriggerAuto','BULB','SelfSwitches','activationProximityType','updateSelfMovement','oxPYc','parent','setPose','fontSize','terrainTag','mdpIM','bitmap','setupEventsMoveCoreEffects','turnLeft90','version','processMoveRouteJumpTo','updateEventIconSprite','ARRAYFUNC','deleteIconsOnEventsData','_duration','tyOiA','isMapPassable','description','oAoLE','NxvnW','NXoHC','processMoveSynchReverseMimic','contents','meetsConditions','hasMoveOnlyRegions','setWaitMode','isRegionForbidPass','EventLabelVisible','isAnyEventStarting','Game_System_initialize','process_VisuMZ_EventsMoveCore_Switches_Variables','kyJEN','lastSpawnedEventID','column','isWorking','AirshipSpeed','_activationProximity','jPtxl','match','adjustDir8MovementSpeed','updatePatternEventsMoveCore','timerText','UPPER\x20LEFT','hasEventIcon','StopAutoMoveMessages','name','mirror\x20horz','COBWEB','Game_Player_increaseSteps','aGmGD','zoomScale','fBlNx','_PreservedEventMorphData','CjqeT','VFdco','2031wkWsjY','ZGlpt','CGgRL','MUSICNOTE','textSizeEx','switch2Valid','VisuMZ_1_MessageCore','processMoveSynchCustom','gCfsc','getPreservedMorphEventData','dGqwe','Game_Event_meetsConditions','General','xbsYd','SpawnEventDespawnEverything','Game_CharacterBase_increaseSteps','Window_NumberInput_processOk','followers','_eventScreenY','prepareSpawnedEventAtRegion','AllForbid','Game_Message_setItemChoice','lastMovedDirection','setFrames','vertical\x20mirror','_lastPluginCommandInterpreter','getInputDir8','plpZc','drawTextEx','removeTemporaryMapSpawnedEvents','processMoveSynchMirrorHorz','BitmapSmoothing','Scene_Map_startEncounterEffect','template','_diagonalSupport','start','setPlayerControlDisable','updatePosition','ilHdO','BlendMode','tFsoQ','DIJeo','initMembers','despawnRegions','setDestination','Speed','Boat','EventsMoveCore','isAllowEventAutoMovement','AutoMoveEvents','createSpawnedEventWithData','_erased','moveAwayFromPoint','switch1Id','advancedValue','setOpacity','SWEAT','convertSelfVariableValuesInScriptCall','WalkAllow','processMoveRouteSetIndex','setupEvents','isPassable','type','away','locate','UwWzh','SlowerSpeed','moveRouteIndex','Spriteset_Map_createShadow','updateMove','IhiBg','MUSIC','CarryPose','wbGQD','processMoveRouteStepToPlayer','OperateValues','horz\x20mirror','Settings','frameCount','642966isQVSh','checkExistingEntitiesAt','LEFT','setEventLabelsVisible','isSpawnHitboxCollisionOk','anchor','Game_Switches_setValue','hasClickTrigger','Game_Message_add','Game_Map_setup','GNQcQ','isTurnInPlace','isAirshipPassable','shadowX','StopAutoMoveEvents','_chaseOff','searchLimit','ZKYMS','selfValue','_forceDashing','variableValid','cyxyl','xCBnt','EventTemplates','_callEventData','YQvxx','VksRk','%1Forbid','HeIST','moveTypeRandom','%1%2','processMoveRouteSelfSwitch','jump','isLabelVisible','isCollidedWithEvents','List','EventTimerExpireClear','isBigCharacter','SPIN\x20COUNTERCLOCKWISE','_saveEventLocations','setupPageSettings','ZZZ','uncPH','KRHfy','processMoveRouteStepTo','labelWindowRange','LjeCa','_vehicleType','fNzfV','setupMorphEvent','keuZd','694RWpQAc','NORMAL','processMoveRouteMoveToCharacter','atXYP','switchId','_SavedEventLocations','Sprite_Character_initMembers','Icon','RegionOk','deleteIconsOnEventsDataKey','CPC','WalkForbid','jzMuG','roundXWithDirection','updateEventsMoveCoreTagChanges','guevH','PosY','_spawnData','filter','_visibleEventX','ALcMQ','DashModifier','checkEventTriggerThere','_eventIcon','setAllowEventAutoMovement','QSASW','_eventErased','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','despawnEverything','Visibility','setup','AdvancedSwitches','Game_Enemy_meetsSwitchCondition','Step2MapId','call','setupSpawnedEvents','isSaveEventLocations','characterPatternYVS8','Game_Interpreter_character','processMoveRouteStepFrom','padZero','events','VisuMZ_0_CoreEngine','ZtBUa','_followerChaseOff','morphInto','PreloadedMaps','loadCPC','onChange','mimic','2225200crgPkB','WlJiU','updateTilt','isShip','Game_CommonEvent_isActive','startMapCommonEventOnTouch','absDistance','_spawnedEvents','hasAdvancedSwitchVariable','hasCPCs','All','isLandOk','SelfVariableID','MBTYl','blendMode','_randomHomeX','startCallEvent','updateParallel','setupSaveEventLocations','eventsXy','_hidden','Chase','AutoBalloon','_clickTrigger','setControlledFollowerID','Game_CharacterBase_initMembers','ANNOYED','setCharacterBitmap','exit','opacitySpeed','isDashingEnabled','_character','DOWN','GRuHO','variableId','3958tEsDjR','dOwFS','_characterIndex','Vehicle','TiltVert','Game_CharacterBase_moveStraight','Dock','_visiblePlayerX','CallEvent','sFfFd','dRoTL','EventId','TurnInPlaceDelay','variables','MUSIC-NOTE','Game_CharacterBase_realMoveSpeed','turn180','screenY','setImage','NMtWT','findDiagonalDirectionTo','updateShadowChanges','execute','_visibleEventY','Hidden','mirror\x20horizontal','lastSpawnedEvent','HbMaW','MoveRouteIndex','startEncounterEffect'];const _0x5075f1=_0x38a5;(function(_0x4c496f,_0x4c8806){const _0x45aee5=_0x38a5;while(!![]){try{const _0x10e92d=-parseInt(_0x45aee5(0x19d))+parseInt(_0x45aee5(0x375))*-parseInt(_0x45aee5(0x152))+-parseInt(_0x45aee5(0x1cc))*parseInt(_0x45aee5(0x29e))+-parseInt(_0x45aee5(0x400))*-parseInt(_0x45aee5(0x161))+-parseInt(_0x45aee5(0x507))*parseInt(_0x45aee5(0x320))+-parseInt(_0x45aee5(0x2ed))+parseInt(_0x45aee5(0x352));if(_0x10e92d===_0x4c8806)break;else _0x4c496f['push'](_0x4c496f['shift']());}catch(_0x1152bf){_0x4c496f['push'](_0x4c496f['shift']());}}}(_0x50ca,0x57efd));var label=_0x5075f1(0x2cd),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5075f1(0x332)](function(_0x255bd3){const _0x3a698b=_0x5075f1;return _0x255bd3[_0x3a698b(0x8d)]&&_0x255bd3[_0x3a698b(0x278)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5075f1(0x2eb)]||{},VisuMZ['ConvertParams']=function(_0x2d8f39,_0xcddda6){const _0x25cf65=_0x5075f1;for(const _0x27a0c1 in _0xcddda6){if(_0x25cf65(0x44f)!==_0x25cf65(0x3a3)){if(_0x27a0c1[_0x25cf65(0x28d)](/(.*):(.*)/i)){const _0x2b0b81=String(RegExp['$1']),_0x3cde55=String(RegExp['$2'])[_0x25cf65(0x4ba)]()[_0x25cf65(0x4d1)]();let _0xdae0e9,_0x209f24,_0x197007;switch(_0x3cde55){case _0x25cf65(0x3a6):_0xdae0e9=_0xcddda6[_0x27a0c1]!==''?Number(_0xcddda6[_0x27a0c1]):0x0;break;case _0x25cf65(0x1ac):_0x209f24=_0xcddda6[_0x27a0c1]!==''?JSON['parse'](_0xcddda6[_0x27a0c1]):[],_0xdae0e9=_0x209f24['map'](_0x162196=>Number(_0x162196));break;case'EVAL':_0xdae0e9=_0xcddda6[_0x27a0c1]!==''?eval(_0xcddda6[_0x27a0c1]):null;break;case _0x25cf65(0x25a):_0x209f24=_0xcddda6[_0x27a0c1]!==''?JSON[_0x25cf65(0x4bb)](_0xcddda6[_0x27a0c1]):[],_0xdae0e9=_0x209f24[_0x25cf65(0x40b)](_0x2fd4e2=>eval(_0x2fd4e2));break;case _0x25cf65(0x14c):_0xdae0e9=_0xcddda6[_0x27a0c1]!==''?JSON[_0x25cf65(0x4bb)](_0xcddda6[_0x27a0c1]):'';break;case'ARRAYJSON':_0x209f24=_0xcddda6[_0x27a0c1]!==''?JSON[_0x25cf65(0x4bb)](_0xcddda6[_0x27a0c1]):[],_0xdae0e9=_0x209f24[_0x25cf65(0x40b)](_0xe91b30=>JSON[_0x25cf65(0x4bb)](_0xe91b30));break;case _0x25cf65(0xc9):_0xdae0e9=_0xcddda6[_0x27a0c1]!==''?new Function(JSON['parse'](_0xcddda6[_0x27a0c1])):new Function('return\x200');break;case _0x25cf65(0x273):_0x209f24=_0xcddda6[_0x27a0c1]!==''?JSON[_0x25cf65(0x4bb)](_0xcddda6[_0x27a0c1]):[],_0xdae0e9=_0x209f24[_0x25cf65(0x40b)](_0x54ad33=>new Function(JSON[_0x25cf65(0x4bb)](_0x54ad33)));break;case _0x25cf65(0x3d2):_0xdae0e9=_0xcddda6[_0x27a0c1]!==''?String(_0xcddda6[_0x27a0c1]):'';break;case _0x25cf65(0x182):_0x209f24=_0xcddda6[_0x27a0c1]!==''?JSON[_0x25cf65(0x4bb)](_0xcddda6[_0x27a0c1]):[],_0xdae0e9=_0x209f24[_0x25cf65(0x40b)](_0x2548c0=>String(_0x2548c0));break;case _0x25cf65(0x19a):_0x197007=_0xcddda6[_0x27a0c1]!==''?JSON['parse'](_0xcddda6[_0x27a0c1]):{},_0x2d8f39[_0x2b0b81]={},VisuMZ[_0x25cf65(0x228)](_0x2d8f39[_0x2b0b81],_0x197007);continue;case _0x25cf65(0x187):_0x209f24=_0xcddda6[_0x27a0c1]!==''?JSON[_0x25cf65(0x4bb)](_0xcddda6[_0x27a0c1]):[],_0xdae0e9=_0x209f24['map'](_0x3f1fd2=>VisuMZ[_0x25cf65(0x228)]({},JSON[_0x25cf65(0x4bb)](_0x3f1fd2)));break;default:continue;}_0x2d8f39[_0x2b0b81]=_0xdae0e9;}}else{function _0x194781(){return!![];}}}return _0x2d8f39;},(_0x137cc0=>{const _0x3d4ce3=_0x5075f1,_0x4b8d2f=_0x137cc0[_0x3d4ce3(0x294)];for(const _0x50cae4 of dependencies){if(!Imported[_0x50cae4]){if(_0x3d4ce3(0x80)===_0x3d4ce3(0x80)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x4b8d2f,_0x50cae4)),SceneManager[_0x3d4ce3(0x36e)]();break;}else{function _0x4e96d6(){const _0x5ea9dd=_0x3d4ce3;_0xa7ac91[_0x5ea9dd(0x28d)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x1281b0=_0x1cac56(_0x413edc['$1'])['toLowerCase']()[_0x5ea9dd(0x4d1)](),_0xea7520=_0x450600(_0x233aae['$2'])[_0x5ea9dd(0xa1)]()[_0x5ea9dd(0x4d1)]();const _0x53f462=_0x2c06e[_0x5ea9dd(0x4bb)]('['+_0xa4b813['$3']['match'](/\d+/g)+']');_0x1281b0=_0x1281b0[_0x5ea9dd(0x215)](0x0)[_0x5ea9dd(0x4ba)]()+_0x1281b0[_0x5ea9dd(0x204)](0x1),_0xea7520=_0xea7520[_0x5ea9dd(0x215)](0x0)[_0x5ea9dd(0x4ba)]()+_0xea7520[_0x5ea9dd(0x204)](0x1);const _0x38037a=_0x5ea9dd(0x30b)[_0x5ea9dd(0x184)](_0x1281b0,_0xea7520);if(_0x37684e[_0x38037a])_0x409d52[_0x38037a]=_0x10b152[_0x38037a][_0x5ea9dd(0x8a)](_0x53f462);}}}}const _0x59d9ed=_0x137cc0['description'];if(_0x59d9ed[_0x3d4ce3(0x28d)](/\[Version[ ](.*?)\]/i)){if('zcpuD'===_0x3d4ce3(0x3c3)){const _0x24ea88=Number(RegExp['$1']);_0x24ea88!==VisuMZ[label][_0x3d4ce3(0x270)]&&(alert(_0x3d4ce3(0x33b)[_0x3d4ce3(0x184)](_0x4b8d2f,_0x24ea88)),SceneManager[_0x3d4ce3(0x36e)]());}else{function _0x3cda9a(){const _0x2bd853=_0x3d4ce3,_0x172d39=_0x3bee7c[_0x2bd853(0x44a)](_0x1bf5f9(_0x15adb8['$1']));return this['moveAwayFromCharacter'](_0x172d39);}}}if(_0x59d9ed[_0x3d4ce3(0x28d)](/\[Tier[ ](\d+)\]/i)){const _0x2c9a99=Number(RegExp['$1']);if(_0x2c9a99<tier){if(_0x3d4ce3(0x4ee)===_0x3d4ce3(0x4ee))alert(_0x3d4ce3(0x39c)[_0x3d4ce3(0x184)](_0x4b8d2f,_0x2c9a99,tier)),SceneManager['exit']();else{function _0x9a866e(){const _0x137b57=_0x3d4ce3;return this[_0x137b57(0xe5)]()?this['getPosingCharacterPattern']():_0x3c1edb[_0x137b57(0x2cd)]['Game_CharacterBase_pattern'][_0x137b57(0x342)](this);}}}else tier=Math[_0x3d4ce3(0x97)](_0x2c9a99,tier);}VisuMZ[_0x3d4ce3(0x228)](VisuMZ[label][_0x3d4ce3(0x2eb)],_0x137cc0[_0x3d4ce3(0x1f4)]);})(pluginData),VisuMZ[_0x5075f1(0x2e9)]=function(_0x51ae6f,_0x235601,_0x209fe2){switch(_0x209fe2){case'=':return _0x235601;break;case'+':return _0x51ae6f+_0x235601;break;case'-':return _0x51ae6f-_0x235601;break;case'*':return _0x51ae6f*_0x235601;break;case'/':return _0x51ae6f/_0x235601;break;case'%':return _0x51ae6f%_0x235601;break;}return _0x51ae6f;},PluginManager[_0x5075f1(0x484)](pluginData['name'],_0x5075f1(0x2cf),_0x3a87e6=>{const _0x1bea5e=_0x5075f1;VisuMZ['ConvertParams'](_0x3a87e6,_0x3a87e6);switch(_0x3a87e6[_0x1bea5e(0x116)]){case _0x1bea5e(0x3e0):$gameSystem[_0x1bea5e(0x338)](!![]);break;case'Stop':$gameSystem[_0x1bea5e(0x338)](![]);break;case _0x1bea5e(0x245):$gameSystem[_0x1bea5e(0x338)](!$gameSystem[_0x1bea5e(0x2ce)]());break;}}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'CallEvent',_0x12f3ac=>{const _0x1bb96a=_0x5075f1;VisuMZ['ConvertParams'](_0x12f3ac,_0x12f3ac);const _0x363c7c=$gameTemp[_0x1bb96a(0x414)](),_0x5d4a82={'mapId':_0x12f3ac['MapId'],'eventId':_0x12f3ac[_0x1bb96a(0x380)]||_0x363c7c[_0x1bb96a(0x437)](),'pageId':_0x12f3ac[_0x1bb96a(0xee)]};if(_0x5d4a82[_0x1bb96a(0x466)]<=0x0)_0x5d4a82[_0x1bb96a(0x466)]=$gameMap?$gameMap[_0x1bb96a(0x466)]():0x1;$gameTemp[_0x1bb96a(0x414)]()['pluginCommandCallEvent'](_0x5d4a82);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x48a),_0x30de49=>{const _0x1a21d8=_0x5075f1;VisuMZ[_0x1a21d8(0x228)](_0x30de49,_0x30de49);switch(_0x30de49[_0x1a21d8(0x116)]){case _0x1a21d8(0x3bd):$gameSystem['setDashingEnabled'](!![]);break;case'Disable':$gameSystem[_0x1a21d8(0xac)](![]);break;case'Toggle':$gameSystem[_0x1a21d8(0xac)](!$gameSystem[_0x1a21d8(0x370)]());break;}}),PluginManager[_0x5075f1(0x484)](pluginData['name'],'EventIconChange',_0x35562a=>{const _0x33b3d9=_0x5075f1;VisuMZ[_0x33b3d9(0x228)](_0x35562a,_0x35562a);const _0x9761de=$gameTemp['getLastPluginCommandInterpreter']();_0x35562a[_0x33b3d9(0x3fe)]=_0x35562a[_0x33b3d9(0x3fe)]||$gameMap[_0x33b3d9(0x466)](),$gameSystem['setEventIconDataKey'](_0x35562a[_0x33b3d9(0x3fe)],_0x35562a[_0x33b3d9(0x380)]||_0x9761de[_0x33b3d9(0x437)](),_0x35562a[_0x33b3d9(0x18f)],_0x35562a['IconBufferX'],_0x35562a['IconBufferY'],_0x35562a[_0x33b3d9(0x4f2)]);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x157),_0x188dfc=>{const _0x7008d9=_0x5075f1;VisuMZ[_0x7008d9(0x228)](_0x188dfc,_0x188dfc);const _0x3dbc22=$gameTemp[_0x7008d9(0x414)]();_0x188dfc['MapId']=_0x188dfc['MapId']||$gameMap[_0x7008d9(0x466)](),$gameSystem[_0x7008d9(0x329)](_0x188dfc[_0x7008d9(0x3fe)],_0x188dfc[_0x7008d9(0x380)]||_0x3dbc22[_0x7008d9(0x437)]());}),PluginManager['registerCommand'](pluginData['name'],'EventLabelRefresh',_0x4572f0=>{const _0x2367f0=_0x5075f1;if($gameMap)for(const _0x1e29cd of $gameMap['events']()){_0x1e29cd[_0x2367f0(0x17f)]();}}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x282),_0x4de3b0=>{const _0x67fc86=_0x5075f1;VisuMZ[_0x67fc86(0x228)](_0x4de3b0,_0x4de3b0);switch(_0x4de3b0[_0x67fc86(0x33d)]){case _0x67fc86(0x458):$gameSystem[_0x67fc86(0x2f0)](!![]);break;case _0x67fc86(0x38d):$gameSystem[_0x67fc86(0x2f0)](![]);break;case _0x67fc86(0x245):$gameSystem[_0x67fc86(0x2f0)](!$gameSystem[_0x67fc86(0x49c)]());break;}}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'EventLocationSave',_0x400244=>{const _0x3c72dc=_0x5075f1;VisuMZ['ConvertParams'](_0x400244,_0x400244);const _0x50471f=$gameTemp[_0x3c72dc(0x414)]();if(!$gameMap)return;const _0xf487a4=$gameMap['event'](_0x400244[_0x3c72dc(0x380)]||_0x50471f[_0x3c72dc(0x437)]());if(_0xf487a4)_0xf487a4[_0x3c72dc(0x4e4)]();}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x41a),_0x1e2e72=>{const _0x638f71=_0x5075f1;VisuMZ[_0x638f71(0x228)](_0x1e2e72,_0x1e2e72);const _0x46c0c1=$gameTemp[_0x638f71(0x414)](),_0x29f631=_0x1e2e72[_0x638f71(0x3fe)]||$gameMap[_0x638f71(0x466)](),_0x5310a3=_0x1e2e72[_0x638f71(0x380)]||_0x46c0c1[_0x638f71(0x437)](),_0x2fe163=_0x1e2e72[_0x638f71(0x3d7)]||0x0,_0x455745=_0x1e2e72['PosY']||0x0,_0x18e253=_0x1e2e72['Direction']||0x2,_0x30dd7b=((_0x1e2e72[_0x638f71(0xee)]||0x1)-0x1)[_0x638f71(0x256)](0x0,0x13),_0x12202b=_0x1e2e72[_0x638f71(0x391)]||0x0;$gameSystem[_0x638f71(0x1e3)](_0x29f631,_0x5310a3,_0x2fe163,_0x455745,_0x18e253,_0x30dd7b,_0x12202b);}),PluginManager[_0x5075f1(0x484)](pluginData['name'],_0x5075f1(0x1de),_0x3544ea=>{const _0x1463fd=_0x5075f1;VisuMZ[_0x1463fd(0x228)](_0x3544ea,_0x3544ea);const _0x4470f7=$gameTemp[_0x1463fd(0x414)](),_0x198866=_0x3544ea[_0x1463fd(0x3fe)]||$gameMap[_0x1463fd(0x466)](),_0x1ef75b=_0x3544ea[_0x1463fd(0x380)]||_0x4470f7[_0x1463fd(0x437)]();$gameSystem['deleteSavedEventLocationKey'](_0x198866,_0x1ef75b);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'EventTimerExpireEvent',_0x134613=>{const _0x27bf2a=_0x5075f1;VisuMZ['ConvertParams'](_0x134613,_0x134613);const _0x37856a=_0x134613[_0x27bf2a(0x20f)];$gameTimer[_0x27bf2a(0x3ce)](_0x37856a);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x311),_0xf06256=>{const _0x5b5d8c=_0x5075f1;$gameTimer[_0x5b5d8c(0x3ce)](0x0);}),PluginManager['registerCommand'](pluginData[_0x5075f1(0x294)],'EventTimerFramesGain',_0x234751=>{const _0x1b515f=_0x5075f1;if(!$gameTimer[_0x1b515f(0x289)]())return;VisuMZ[_0x1b515f(0x228)](_0x234751,_0x234751);let _0x2c783d=0x0;_0x2c783d+=_0x234751[_0x1b515f(0x509)],_0x2c783d+=_0x234751['Seconds']*0x3c,_0x2c783d+=_0x234751[_0x1b515f(0x122)]*0x3c*0x3c,_0x2c783d+=_0x234751[_0x1b515f(0x1ae)]*0x3c*0x3c*0x3c,$gameTimer[_0x1b515f(0x1e5)](_0x2c783d);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'EventTimerFramesSet',_0x357ef6=>{const _0x5e0b56=_0x5075f1;if(!$gameTimer[_0x5e0b56(0x289)]())return;VisuMZ[_0x5e0b56(0x228)](_0x357ef6,_0x357ef6);let _0x3e297c=0x0;_0x3e297c+=_0x357ef6[_0x5e0b56(0x509)],_0x3e297c+=_0x357ef6[_0x5e0b56(0x1ed)]*0x3c,_0x3e297c+=_0x357ef6[_0x5e0b56(0x122)]*0x3c*0x3c,_0x3e297c+=_0x357ef6[_0x5e0b56(0x1ae)]*0x3c*0x3c*0x3c,$gameTimer['setFrames'](_0x3e297c);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x512),_0x571fbe=>{const _0x51c2e1=_0x5075f1;if(!$gameTimer['isWorking']())return;$gameTimer[_0x51c2e1(0x439)]();}),PluginManager['registerCommand'](pluginData['name'],_0x5075f1(0x3da),_0x25a6f3=>{const _0x51f877=_0x5075f1;if(!$gameTimer['isWorking']())return;$gameTimer[_0x51f877(0x14d)]();}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x49b),_0x16c5d2=>{const _0x383f95=_0x5075f1;VisuMZ[_0x383f95(0x228)](_0x16c5d2,_0x16c5d2);const _0xf90658=_0x16c5d2[_0x383f95(0x2cb)]||0x0;$gameTimer[_0x383f95(0x1e6)](_0xf90658);}),PluginManager[_0x5075f1(0x484)](pluginData['name'],_0x5075f1(0x4be),_0x227e70=>{const _0xc28d52=_0x5075f1;VisuMZ['ConvertParams'](_0x227e70,_0x227e70);const _0x150d7d=!_0x227e70['Chase'];$gameSystem[_0xc28d52(0x398)](_0x150d7d);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'FollowerSetTargetChase',_0x562d8b=>{const _0x54b269=_0x5075f1;VisuMZ[_0x54b269(0x228)](_0x562d8b,_0x562d8b);const _0x55c479=(_0x562d8b[_0x54b269(0x225)]||0x0)-0x1,_0x24fe17=!_0x562d8b[_0x54b269(0x367)],_0x3af788=$gamePlayer['followers']()['follower'](_0x55c479);if(_0x3af788)_0x3af788['setChaseOff'](_0x24fe17);}),PluginManager['registerCommand'](pluginData[_0x5075f1(0x294)],_0x5075f1(0x158),_0x2b78bd=>{const _0x575616=_0x5075f1;VisuMZ[_0x575616(0x228)](_0x2b78bd,_0x2b78bd);const _0x1975df=_0x2b78bd[_0x575616(0x225)];$gameSystem[_0x575616(0x36a)](_0x1975df);}),PluginManager['registerCommand'](pluginData[_0x5075f1(0x294)],_0x5075f1(0xfd),_0x2afd5f=>{const _0x160fec=_0x5075f1;VisuMZ[_0x160fec(0x228)](_0x2afd5f,_0x2afd5f),$gameSystem['setControlledFollowerID'](0x0),$gameSystem[_0x160fec(0x398)](![]);for(const _0x1a7435 of $gamePlayer['followers']()['_data']){if(_0x1a7435)_0x1a7435[_0x160fec(0x232)](![]);}}),PluginManager[_0x5075f1(0x484)](pluginData['name'],_0x5075f1(0x467),_0x6f5aea=>{const _0x3fc830=_0x5075f1;VisuMZ['ConvertParams'](_0x6f5aea,_0x6f5aea);const _0xbe1779=$gameTemp[_0x3fc830(0x414)]();_0x6f5aea[_0x3fc830(0x3fe)]=_0x6f5aea['MapId']||$gameMap['mapId']();const _0x5ceeb2=[_0x6f5aea[_0x3fc830(0x3fe)],_0x6f5aea[_0x3fc830(0x380)]||_0xbe1779[_0x3fc830(0x437)](),_0x6f5aea['Letter']],_0x9b78f1=_0x6f5aea[_0x3fc830(0x3d8)],_0x250aae=$gameSelfSwitches['value'](_0x5ceeb2)||![];$gameSwitches[_0x3fc830(0x423)](_0x9b78f1,_0x250aae);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x3f2),_0x38f29e=>{const _0xe9fc35=_0x5075f1;VisuMZ[_0xe9fc35(0x228)](_0x38f29e,_0x38f29e);const _0xb6bb6d=$gameTemp[_0xe9fc35(0x414)]();_0x38f29e[_0xe9fc35(0x3fe)]=_0x38f29e['MapId']||$gameMap[_0xe9fc35(0x466)]();const _0x3e0b11=[_0x38f29e[_0xe9fc35(0x3fe)],_0x38f29e['EventId']||_0xb6bb6d['eventId'](),_0xe9fc35(0x10e)[_0xe9fc35(0x184)](_0x38f29e[_0xe9fc35(0x81)])],_0x290133=_0x38f29e[_0xe9fc35(0x3d8)],_0x15bb3d=$gameSelfSwitches['value'](_0x3e0b11)||![];$gameSwitches[_0xe9fc35(0x423)](_0x290133,_0x15bb3d);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x1dd),_0x2a39cb=>{const _0x398476=_0x5075f1;VisuMZ[_0x398476(0x228)](_0x2a39cb,_0x2a39cb);const _0x177b51=$gameTemp['getLastPluginCommandInterpreter']();_0x2a39cb[_0x398476(0x3fe)]=_0x2a39cb[_0x398476(0x3fe)]||$gameMap[_0x398476(0x466)]();const _0x2b5db3=[_0x2a39cb[_0x398476(0x3fe)],_0x2a39cb[_0x398476(0x380)]||_0x177b51['eventId'](),_0x398476(0x4a9)[_0x398476(0x184)](_0x2a39cb['VariableId'])],_0x296ed5=_0x2a39cb['TargetVariableId'],_0x1680f6=$gameSelfSwitches[_0x398476(0x3c7)](_0x2b5db3)||![];$gameVariables['setValue'](_0x296ed5,_0x1680f6);}),PluginManager['registerCommand'](pluginData[_0x5075f1(0x294)],_0x5075f1(0x493),_0x15d602=>{const _0x369af3=_0x5075f1;VisuMZ[_0x369af3(0x228)](_0x15d602,_0x15d602);if(!$gameMap)return;const _0x262f58=$gameTemp[_0x369af3(0x414)](),_0x1dd48f=_0x15d602['Step2Preserve'];_0x15d602[_0x369af3(0x4d5)]=_0x15d602[_0x369af3(0x4d5)]||$gameMap[_0x369af3(0x466)](),_0x15d602[_0x369af3(0x341)]=_0x15d602[_0x369af3(0x341)]||$gameMap['mapId'](),_0x15d602[_0x369af3(0x4c6)]=_0x15d602[_0x369af3(0x4c6)][_0x369af3(0x4ba)]()[_0x369af3(0x4d1)]();if(!_0x1dd48f&&_0x15d602['Step1MapId']!==$gameMap[_0x369af3(0x466)]())return;if($gameMap['mapId']()===_0x15d602[_0x369af3(0x4d5)]){if('VkWBJ'===_0x369af3(0x4a0)){function _0x2ea165(){const _0x4f652a=_0x369af3,_0x339f54=this['_eventSpawnData'][_0x4f652a(0x466)],_0x50f74c=this[_0x4f652a(0x3cd)][_0x4f652a(0x437)];return _0x978635[_0x4f652a(0x34e)][_0x339f54][_0x4f652a(0x349)][_0x50f74c];}}else{const _0x2618de=$gameMap['event'](_0x15d602[_0x369af3(0xbd)]||_0x262f58['eventId']());if(!_0x2618de)return;if(_0x15d602['TemplateName']!==_0x369af3(0x239)){if(_0x369af3(0x48e)==='Ozomq'){function _0x515932(){const _0x5b4a8e=_0x369af3;return''[_0x5b4a8e(0x4ba)]()[_0x5b4a8e(0x4d1)]();}}else _0x2618de[_0x369af3(0x90)](_0x15d602[_0x369af3(0x4c6)]);}else _0x2618de[_0x369af3(0x34d)](_0x15d602[_0x369af3(0x341)],_0x15d602[_0x369af3(0x4b9)]||_0x262f58[_0x369af3(0x437)]());}}_0x1dd48f&&$gameSystem[_0x369af3(0x17a)](_0x15d602[_0x369af3(0x4d5)],_0x15d602['Step1EventId'],_0x15d602[_0x369af3(0x4c6)],_0x15d602['Step2MapId'],_0x15d602[_0x369af3(0x4b9)]);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x4d8),_0x30e3a4=>{const _0x17972b=_0x5075f1;VisuMZ[_0x17972b(0x228)](_0x30e3a4,_0x30e3a4);if(!$gameMap)return;const _0x2037dd=$gameTemp['getLastPluginCommandInterpreter']();_0x30e3a4[_0x17972b(0x3fe)]=_0x30e3a4[_0x17972b(0x3fe)]||$gameMap[_0x17972b(0x466)]();if($gameMap[_0x17972b(0x466)]()===_0x30e3a4[_0x17972b(0x3fe)]){const _0x120b4f=$gameMap[_0x17972b(0x44a)](_0x30e3a4[_0x17972b(0x380)]||_0x2037dd[_0x17972b(0x437)]());_0x120b4f[_0x17972b(0x470)]();}_0x30e3a4['RemovePreserve']&&$gameSystem[_0x17972b(0xa7)](_0x30e3a4['MapId'],_0x30e3a4['EventId']||_0x2037dd[_0x17972b(0x437)]());}),PluginManager[_0x5075f1(0x484)](pluginData['name'],_0x5075f1(0x16b),_0x3941eb=>{const _0x1bb1b2=_0x5075f1;VisuMZ[_0x1bb1b2(0x228)](_0x3941eb,_0x3941eb),$gameSystem[_0x1bb1b2(0x2c2)](!_0x3941eb[_0x1bb1b2(0x3bd)]);}),PluginManager['registerCommand'](pluginData[_0x5075f1(0x294)],_0x5075f1(0x3f5),_0x1efba2=>{const _0x24c2be=_0x5075f1;VisuMZ[_0x24c2be(0x228)](_0x1efba2,_0x1efba2),$gameSystem[_0x24c2be(0x103)](_0x1efba2[_0x24c2be(0x12d)]);}),PluginManager[_0x5075f1(0x484)](pluginData['name'],'PlayerIconChange',_0x3291fe=>{const _0x119a37=_0x5075f1;VisuMZ['ConvertParams'](_0x3291fe,_0x3291fe),$gameSystem[_0x119a37(0x4f9)]($gamePlayer,_0x3291fe['IconIndex'],_0x3291fe[_0x119a37(0x202)],_0x3291fe[_0x119a37(0x51e)],_0x3291fe[_0x119a37(0x4f2)]);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'PlayerIconDelete',_0x5d7476=>{const _0x52abcf=_0x5075f1;VisuMZ[_0x52abcf(0x228)](_0x5d7476,_0x5d7476),$gameSystem[_0x52abcf(0x274)]($gamePlayer);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x40e),_0x36bfc7=>{const _0x563651=_0x5075f1;VisuMZ[_0x563651(0x228)](_0x36bfc7,_0x36bfc7);const _0x1df0fb=$gameTemp[_0x563651(0x414)]();_0x36bfc7[_0x563651(0x3fe)]=_0x36bfc7[_0x563651(0x3fe)]||$gameMap[_0x563651(0x466)]();const _0x4e7654=[_0x36bfc7[_0x563651(0x3fe)],_0x36bfc7['EventId']||_0x1df0fb[_0x563651(0x437)](),_0x36bfc7[_0x563651(0xed)]];switch(_0x36bfc7[_0x563651(0x116)]){case'ON':$gameSelfSwitches[_0x563651(0x423)](_0x4e7654,!![]);break;case _0x563651(0x3bb):$gameSelfSwitches['setValue'](_0x4e7654,![]);break;case _0x563651(0x245):$gameSelfSwitches[_0x563651(0x423)](_0x4e7654,!$gameSelfSwitches[_0x563651(0x3c7)](_0x4e7654));break;}}),PluginManager[_0x5075f1(0x484)](pluginData['name'],_0x5075f1(0x3fb),_0x1863a4=>{const _0x48b85c=_0x5075f1;VisuMZ[_0x48b85c(0x228)](_0x1863a4,_0x1863a4);const _0x473818=$gameTemp[_0x48b85c(0x414)]();_0x1863a4[_0x48b85c(0x3fe)]=_0x1863a4['MapId']||$gameMap[_0x48b85c(0x466)]();const _0x1b1dfb=[_0x1863a4[_0x48b85c(0x3fe)],_0x1863a4['EventId']||_0x473818[_0x48b85c(0x437)](),_0x48b85c(0x10e)[_0x48b85c(0x184)](_0x1863a4[_0x48b85c(0x81)])];switch(_0x1863a4[_0x48b85c(0x116)]){case'ON':$gameSelfSwitches[_0x48b85c(0x423)](_0x1b1dfb,!![]);break;case _0x48b85c(0x3bb):$gameSelfSwitches[_0x48b85c(0x423)](_0x1b1dfb,![]);break;case _0x48b85c(0x245):$gameSelfSwitches[_0x48b85c(0x423)](_0x1b1dfb,!$gameSelfSwitches[_0x48b85c(0x3c7)](_0x1b1dfb));break;}}),PluginManager['registerCommand'](pluginData[_0x5075f1(0x294)],_0x5075f1(0x35e),_0x55ef0b=>{const _0x254509=_0x5075f1;VisuMZ['ConvertParams'](_0x55ef0b,_0x55ef0b);const _0x1fa0cb=$gameTemp[_0x254509(0x414)]();_0x55ef0b[_0x254509(0x3fe)]=_0x55ef0b[_0x254509(0x3fe)]||$gameMap['mapId']();const _0x1ca0b3=[_0x55ef0b['MapId'],_0x55ef0b['EventId']||_0x1fa0cb[_0x254509(0x437)](),'Self\x20Variable\x20%1'[_0x254509(0x184)](_0x55ef0b[_0x254509(0xc1)])],_0x27f9b1=VisuMZ['OperateValues']($gameSelfSwitches[_0x254509(0x3c7)](_0x1ca0b3),_0x55ef0b[_0x254509(0x116)],_0x55ef0b[_0x254509(0x46a)]);$gameSelfSwitches[_0x254509(0x423)](_0x1ca0b3,_0x27f9b1);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'SpawnEventAtXY',_0x4afbca=>{const _0x39e009=_0x5075f1;VisuMZ[_0x39e009(0x228)](_0x4afbca,_0x4afbca);const _0x50abde=$gameTemp[_0x39e009(0x414)](),_0x456a82={'template':_0x4afbca[_0x39e009(0x4c6)],'mapId':_0x4afbca[_0x39e009(0x3fe)]||$gameMap[_0x39e009(0x466)](),'eventId':_0x4afbca[_0x39e009(0x380)]||_0x50abde['eventId'](),'x':_0x4afbca['PosX'],'y':_0x4afbca[_0x39e009(0x330)],'spawnPreserved':_0x4afbca[_0x39e009(0x4f6)],'spawnEventId':$gameMap[_0x39e009(0x359)]['length']+0x3e8},_0xfe063f=_0x4afbca[_0x39e009(0x1ee)]||0x0,_0x2e164f=$gameMap[_0x39e009(0x503)](_0x456a82,_0x4afbca[_0x39e009(0x124)],_0x4afbca[_0x39e009(0x94)]);_0xfe063f&&$gameSwitches[_0x39e009(0x423)](_0xfe063f,!!_0x2e164f);}),PluginManager['registerCommand'](pluginData[_0x5075f1(0x294)],_0x5075f1(0x104),_0x375957=>{const _0x338388=_0x5075f1;VisuMZ['ConvertParams'](_0x375957,_0x375957);const _0x144299=$gameTemp[_0x338388(0x414)](),_0x4b1918={'template':_0x375957['TemplateName'],'mapId':_0x375957[_0x338388(0x3fe)]||$gameMap[_0x338388(0x466)](),'eventId':_0x375957['EventId']||_0x144299[_0x338388(0x437)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x375957[_0x338388(0x4f6)],'spawnEventId':$gameMap[_0x338388(0x359)][_0x338388(0x13a)]+0x3e8},_0x523ce3=_0x375957[_0x338388(0x1ee)]||0x0,_0x8ec4f7=$gameMap['prepareSpawnedEventAtRegion'](_0x4b1918,_0x375957[_0x338388(0x3c5)],_0x375957['Collision'],_0x375957[_0x338388(0x94)]);_0x523ce3&&$gameSwitches[_0x338388(0x423)](_0x523ce3,!!_0x8ec4f7);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'SpawnEventAtTerrainTag',_0xa1ca43=>{const _0x2d33cc=_0x5075f1;VisuMZ[_0x2d33cc(0x228)](_0xa1ca43,_0xa1ca43);const _0xcc595d=$gameTemp['getLastPluginCommandInterpreter'](),_0x3f4ee0={'template':_0xa1ca43[_0x2d33cc(0x4c6)],'mapId':_0xa1ca43[_0x2d33cc(0x3fe)]||$gameMap['mapId'](),'eventId':_0xa1ca43[_0x2d33cc(0x380)]||_0xcc595d[_0x2d33cc(0x437)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0xa1ca43[_0x2d33cc(0x4f6)],'spawnEventId':$gameMap[_0x2d33cc(0x359)][_0x2d33cc(0x13a)]+0x3e8},_0x1640da=_0xa1ca43['SuccessSwitchId']||0x0,_0x462d81=$gameMap[_0x2d33cc(0x442)](_0x3f4ee0,_0xa1ca43['TerrainTags'],_0xa1ca43[_0x2d33cc(0x124)],_0xa1ca43[_0x2d33cc(0x94)]);_0x1640da&&$gameSwitches['setValue'](_0x1640da,!!_0x462d81);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'SpawnEventDespawnEventID',_0x11ade2=>{const _0x44a62f=_0x5075f1;VisuMZ[_0x44a62f(0x228)](_0x11ade2,_0x11ade2);const _0x4be4cc=$gameTemp[_0x44a62f(0x414)]();$gameMap['despawnEventId'](_0x11ade2[_0x44a62f(0x43c)]||_0x4be4cc['eventId']());}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x3f9),_0x5330c8=>{const _0x1d2881=_0x5075f1;VisuMZ['ConvertParams'](_0x5330c8,_0x5330c8);const _0x1a94a8=_0x5330c8[_0x1d2881(0x3d7)],_0xa12aa=_0x5330c8[_0x1d2881(0x330)];$gameMap[_0x1d2881(0x242)](_0x1a94a8,_0xa12aa);}),PluginManager[_0x5075f1(0x484)](pluginData['name'],'SpawnEventDespawnRegions',_0x1804a4=>{const _0xd048b4=_0x5075f1;VisuMZ[_0xd048b4(0x228)](_0x1804a4,_0x1804a4),$gameMap[_0xd048b4(0x2c9)](_0x1804a4[_0xd048b4(0x3c5)]);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],'SpawnEventDespawnTerrainTags',_0x43934e=>{const _0x50bf60=_0x5075f1;VisuMZ[_0x50bf60(0x228)](_0x43934e,_0x43934e),$gameMap[_0x50bf60(0x260)](_0x43934e[_0x50bf60(0x4eb)]);}),PluginManager[_0x5075f1(0x484)](pluginData[_0x5075f1(0x294)],_0x5075f1(0x2ac),_0x1b0f78=>{const _0x5d6709=_0x5075f1;VisuMZ[_0x5d6709(0x228)](_0x1b0f78,_0x1b0f78),$gameMap['despawnEverything']();}),VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x3bf)]=Scene_Boot['prototype'][_0x5075f1(0x16f)],Scene_Boot[_0x5075f1(0x173)][_0x5075f1(0x16f)]=function(){const _0x1eb0d7=_0x5075f1;VisuMZ[_0x1eb0d7(0x2cd)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x1eb0d7(0x485)](),this[_0x1eb0d7(0x285)]();if(VisuMZ['EventsMoveCore'][_0x1eb0d7(0x488)])VisuMZ[_0x1eb0d7(0x2cd)][_0x1eb0d7(0x488)][_0x1eb0d7(0x150)]();},VisuMZ[_0x5075f1(0x34e)]=[],VisuMZ[_0x5075f1(0x304)]={},Scene_Boot['prototype'][_0x5075f1(0x485)]=function(){const _0x46f7e9=_0x5075f1;if(DataManager[_0x46f7e9(0x4ce)]()||DataManager[_0x46f7e9(0x3c4)]())return;const _0x153ab6=VisuMZ[_0x46f7e9(0x2cd)]['Settings'][_0x46f7e9(0xf7)],_0x186f93=_0x153ab6[_0x46f7e9(0x1f9)][_0x46f7e9(0x204)](0x0);for(const _0xf41a02 of _0x153ab6[_0x46f7e9(0x310)]){if(_0x46f7e9(0x373)!==_0x46f7e9(0x373)){function _0x1d4a5a(){const _0x1f3370=_0x46f7e9;if([0x6c,0x198][_0x1f3370(0xd5)](_0x56bafa[_0x1f3370(0x496)])){if(_0x2cd10b!=='')_0x55152f+='\x0a';_0xd08f98+=_0x5910d1['parameters'][0x0];}}}else{_0xf41a02[_0x46f7e9(0x434)]=_0xf41a02[_0x46f7e9(0x434)][_0x46f7e9(0x4ba)]()[_0x46f7e9(0x4d1)](),VisuMZ[_0x46f7e9(0x304)][_0xf41a02['Name']]=_0xf41a02;if(!_0x186f93[_0x46f7e9(0xd5)](_0xf41a02[_0x46f7e9(0x4c8)]))_0x186f93[_0x46f7e9(0x203)](_0xf41a02[_0x46f7e9(0x4c8)]);}}for(const _0x1e00d6 of _0x186f93){if(VisuMZ[_0x46f7e9(0x34e)][_0x1e00d6])continue;const _0x56604c=_0x46f7e9(0x4fd)[_0x46f7e9(0x184)](_0x1e00d6['padZero'](0x3)),_0x2fb155='$preloadedMap_%1'[_0x46f7e9(0x184)](_0x1e00d6);DataManager[_0x46f7e9(0x4c0)](_0x2fb155,_0x56604c),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x46f7e9(0x4f7)](this,_0x1e00d6,_0x2fb155),0x64);}},Scene_Boot[_0x5075f1(0x173)][_0x5075f1(0x1a0)]=function(_0x596689,_0x5da8c8){const _0x17a768=_0x5075f1;if(window[_0x5da8c8]){if(_0x17a768(0x23f)!==_0x17a768(0x23f)){function _0x4bc23f(){const _0x380029=_0x17a768;this[_0x380029(0x438)]=0x0;}}else VisuMZ[_0x17a768(0x34e)][_0x596689]=window[_0x5da8c8],window[_0x5da8c8]=undefined;}else{if(_0x17a768(0x1b5)!==_0x17a768(0x1b5)){function _0x3b8601(){const _0x22ed06=_0x17a768,_0x36a696=_0x23e432['event'](_0x453c5b[_0x22ed06(0xbd)]||_0x9aae23[_0x22ed06(0x437)]());if(!_0x36a696)return;_0x110536[_0x22ed06(0x4c6)]!==_0x22ed06(0x239)?_0x36a696[_0x22ed06(0x90)](_0x5a107[_0x22ed06(0x4c6)]):_0x36a696[_0x22ed06(0x34d)](_0x551e9f[_0x22ed06(0x341)],_0x34ad14['Step2EventId']||_0x325ad9[_0x22ed06(0x437)]());}}else setTimeout(this[_0x17a768(0x1a0)][_0x17a768(0x4f7)](this,_0x596689,_0x5da8c8),0x64);}},VisuMZ[_0x5075f1(0x33f)]=[],VisuMZ[_0x5075f1(0x264)]=[],VisuMZ[_0x5075f1(0x166)]=[],VisuMZ['SelfVariables']=[],Scene_Boot[_0x5075f1(0x173)][_0x5075f1(0x285)]=function(){const _0x1ad119=_0x5075f1;for(let _0x2b2d40=0x1;_0x2b2d40<$dataSystem[_0x1ad119(0x429)][_0x1ad119(0x13a)];_0x2b2d40++){if($dataSystem['switches'][_0x2b2d40][_0x1ad119(0x28d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches']['push'](_0x2b2d40);if($dataSystem['switches'][_0x2b2d40][_0x1ad119(0x28d)](/<SELF>/i))VisuMZ[_0x1ad119(0x264)][_0x1ad119(0x203)](_0x2b2d40);}for(let _0x4b1f55=0x1;_0x4b1f55<$dataSystem[_0x1ad119(0x382)][_0x1ad119(0x13a)];_0x4b1f55++){if(_0x1ad119(0x2c4)===_0x1ad119(0x2c4)){if($dataSystem[_0x1ad119(0x382)][_0x4b1f55][_0x1ad119(0x28d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x1ad119(0x166)][_0x1ad119(0x203)](_0x4b1f55);if($dataSystem[_0x1ad119(0x382)][_0x4b1f55]['match'](/<SELF>/i))VisuMZ[_0x1ad119(0x44e)][_0x1ad119(0x203)](_0x4b1f55);}else{function _0x4301c3(){const _0x197b45=_0x1ad119,_0x33e8f0=_0x29f4e1[_0x197b45(0x4bb)]('['+_0x205c2b['$1'][_0x197b45(0x28d)](/\d+/g)+']');this[_0x197b45(0x4da)]=this[_0x197b45(0x4da)][_0x197b45(0x8a)](_0x33e8f0),this[_0x197b45(0x4da)]['remove'](0x0);}}}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x488)]={},VisuMZ[_0x5075f1(0x2cd)]['CustomPageConditions'][_0x5075f1(0x150)]=function(){const _0x19c764=_0x5075f1;this['_interpreter']=new Game_CPCInterpreter(),this[_0x19c764(0x476)]();},VisuMZ['EventsMoveCore'][_0x5075f1(0x488)][_0x5075f1(0x476)]=function(){const _0x3f5396=_0x5075f1;this[_0x3f5396(0x25b)]=[];for(const _0x133619 of $dataCommonEvents){if(!_0x133619)continue;VisuMZ[_0x3f5396(0x2cd)][_0x3f5396(0x488)][_0x3f5396(0x34f)](_0x133619);if(_0x133619[_0x3f5396(0x32a)]['length']>0x0)this[_0x3f5396(0x25b)]['push'](_0x133619['id']);}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x488)][_0x5075f1(0x1b7)]=function(_0x2094d4,_0x419874){const _0x16191d=_0x5075f1;return this[_0x16191d(0x17b)]['setup'](_0x2094d4,_0x419874),this[_0x16191d(0x17b)]['execute'](),this[_0x16191d(0x17b)][_0x16191d(0x42f)];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x488)]['loadCPC']=function(_0x4621ca){const _0x32e0a3=_0x5075f1;let _0x11917a=![];_0x4621ca['CPC']=[];for(const _0x575798 of _0x4621ca['list']){if(_0x32e0a3(0x3a1)!==_0x32e0a3(0x3a1)){function _0x10d143(){const _0x51243f=_0x32e0a3,_0x21b630=_0x22e605(_0x585f02['$1'])[_0x51243f(0x4ba)]()[_0x51243f(0x4d1)](),_0x25d458=[_0x51243f(0x321),_0x51243f(0x448),'MULTIPLY',_0x51243f(0x45e)];this[_0x51243f(0x337)]['blendMode']=_0x25d458[_0x51243f(0x236)](_0x21b630)[_0x51243f(0x256)](0x0,0x3);}}else{if([0x6c,0x198][_0x32e0a3(0xd5)](_0x575798['code'])){if('LxdjD'!=='lyFPK'){const _0x5eca1d=_0x575798[_0x32e0a3(0x1f4)][0x0];if(_0x5eca1d[_0x32e0a3(0x28d)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x11917a=!![];else{if(_0x5eca1d['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x32e0a3(0x1cd)!==_0x32e0a3(0x1cd)){function _0xc22729(){const _0x28850d=_0x32e0a3;this[_0x28850d(0x16e)](_0x43af6b),_0x2fae0d[_0x28850d(0x4b5)](this);const _0x307ae2=_0x25285c[_0x28850d(0x2cd)][_0x28850d(0x2a9)][_0x28850d(0x342)](this,_0x4af667);return _0x3e68e5[_0x28850d(0x186)](),_0x307ae2;}}else _0x11917a=![];}}}else{function _0x30f969(){const _0x1241bf=_0x32e0a3;return _0x1950d3[_0x1241bf(0x173)][_0x1241bf(0x40a)][_0x1241bf(0x342)](this,_0x1e4f25),this[_0x1241bf(0x169)][_0x1241bf(0x1b0)](_0x336cfb=>_0x336cfb[_0x1241bf(0x28d)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];}}}if(_0x11917a){if(_0x32e0a3(0x4fc)!=='TRENN'){function _0x46f5cb(){const _0x509b4b=_0x32e0a3;return this[_0x509b4b(0x4b6)](0x4,_0x12fd17(_0x510b51['$1']));}}else _0x4621ca['CPC'][_0x32e0a3(0x203)](_0x575798);}}}},getSelfSwitchValue=function(_0x6b149f,_0x390412,_0x4b5646){const _0x29ed06=_0x5075f1;let _0x4d8804=[_0x6b149f,_0x390412,'Self\x20Switch\x20%1'['format'](_0x4b5646)];if(typeof _0x4b5646==='string'){if('pNWta'!==_0x29ed06(0x51b))_0x4d8804=[_0x6b149f,_0x390412,_0x4b5646['toUpperCase']()[_0x29ed06(0x4d1)]()];else{function _0x25f3b7(){const _0x444c49=_0x29ed06;return this[_0x444c49(0x132)](_0x1213ee);}}}return $gameSelfSwitches[_0x29ed06(0x3c7)](_0x4d8804);},getSelfVariableValue=function(_0x4766d8,_0x457814,_0x5d9535){const _0x6f3f8b=_0x5075f1,_0x410765=[_0x4766d8,_0x457814,'Self\x20Variable\x20%1'[_0x6f3f8b(0x184)](_0x5d9535)];return $gameSelfSwitches[_0x6f3f8b(0x3c7)](_0x410765);},setSelfSwitchValue=function(_0x11328f,_0x1e6042,_0xb79b43,_0x557ea1){const _0x3c1155=_0x5075f1;let _0x5f1a97=[_0x11328f,_0x1e6042,_0x3c1155(0x10e)[_0x3c1155(0x184)](_0xb79b43)];typeof _0xb79b43===_0x3c1155(0x138)&&(_0x5f1a97=[_0x11328f,_0x1e6042,_0xb79b43[_0x3c1155(0x4ba)]()[_0x3c1155(0x4d1)]()]);},setSelfVariableValue=function(_0xaa8075,_0x200a5d,_0xcc4f9f,_0x3bced8){const _0x30ae62=[_0xaa8075,_0x200a5d,'Self\x20Variable\x20%1'['format'](_0xcc4f9f)];},DataManager[_0x5075f1(0x198)]=function(_0x4141d6){const _0x5bd261=_0x5075f1;if(SceneManager[_0x5bd261(0x4ad)][_0x5bd261(0x3e1)]===Scene_Debug)return![];return VisuMZ['AdvancedSwitches']['includes'](_0x4141d6);},DataManager[_0x5075f1(0x432)]=function(_0x2d0e88){const _0x331279=_0x5075f1;if(SceneManager[_0x331279(0x4ad)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x331279(0x166)]['includes'](_0x2d0e88);},DataManager['isSelfSwitch']=function(_0x2d51cc){const _0x2711a9=_0x5075f1;if(SceneManager['_scene'][_0x2711a9(0x3e1)]===Scene_Debug)return![];return VisuMZ[_0x2711a9(0x264)]['includes'](_0x2d51cc);},DataManager[_0x5075f1(0x4d0)]=function(_0x155d30){const _0x2b380a=_0x5075f1;if(SceneManager[_0x2b380a(0x4ad)][_0x2b380a(0x3e1)]===Scene_Debug)return![];return VisuMZ[_0x2b380a(0x44e)][_0x2b380a(0xd5)](_0x155d30);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x1fc)]=Game_Temp['prototype'][_0x5075f1(0x2ca)],Game_Temp[_0x5075f1(0x173)][_0x5075f1(0x2ca)]=function(_0x51b617,_0xdea3d1){const _0x2a1a19=_0x5075f1;if(this[_0x2a1a19(0x235)](_0x51b617,_0xdea3d1))return;VisuMZ[_0x2a1a19(0x2cd)][_0x2a1a19(0x1fc)][_0x2a1a19(0x342)](this,_0x51b617,_0xdea3d1);},Game_Temp[_0x5075f1(0x173)][_0x5075f1(0x235)]=function(_0x37c1ba,_0x3db7b8){const _0x113ade=_0x5075f1,_0x385608=$gameMap[_0x113ade(0x365)](_0x37c1ba,_0x3db7b8);for(const _0x2b4b82 of _0x385608){if(_0x113ade(0x307)===_0x113ade(0x307)){if(_0x2b4b82&&_0x2b4b82[_0x113ade(0x2f4)]())return _0x2b4b82[_0x113ade(0x95)](),!![];}else{function _0x1ff4f6(){const _0x201480=_0x113ade,_0x3b144d=this['event']()[_0x201480(0x508)];if(_0x3b144d==='')return;if(_0x5d6831[_0x201480(0x4ce)]()||_0x27dceb[_0x201480(0x3c4)]())return;const _0x36dc47=_0x3060cb[_0x201480(0x2cd)][_0x201480(0x2eb)][_0x201480(0xf7)];let _0x25d586=null,_0x151404=0x0,_0x3bb79d=0x0;if(_0x3b144d[_0x201480(0x28d)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x151404=_0xaf3181(_0x335f66['$1']),_0x3bb79d=_0x1d6b27(_0x5f0b80['$2']);else{if(_0x3b144d[_0x201480(0x28d)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x151404=_0x5f169d(_0x33d3be['$1']),_0x3bb79d=_0x138732(_0x320ab3['$2']);else{if(_0x3b144d[_0x201480(0x28d)](/<COPY EVENT:[ ](.*?)>/i)){const _0x38fded=_0x7291a9(_0x9ccaa7['$1'])[_0x201480(0x4ba)]()[_0x201480(0x4d1)]();_0x25d586=_0xa90784['EventTemplates'][_0x38fded];if(!_0x25d586)return;_0x151404=_0x25d586[_0x201480(0x4c8)],_0x3bb79d=_0x25d586['EventID'];}}}if(!this[_0x201480(0x20d)](_0x151404,_0x3bb79d))return;_0x36dc47[_0x201480(0x162)]['call'](this,_0x151404,_0x3bb79d,this);if(_0x25d586)_0x25d586[_0x201480(0x162)][_0x201480(0x342)](this,_0x151404,_0x3bb79d,this);this[_0x201480(0x3c2)]={'mapId':_0x151404,'eventId':_0x3bb79d},this[_0x201480(0xe6)]=-0x2,this[_0x201480(0x17f)](),_0x36dc47['PostCopyJS']['call'](this,_0x151404,_0x3bb79d,this);if(_0x25d586)_0x25d586['PostCopyJS'][_0x201480(0x342)](this,_0x151404,_0x3bb79d,this);_0xd55df1[_0x201480(0x1bf)]();}}}return![];},Game_Temp[_0x5075f1(0x173)][_0x5075f1(0x4f8)]=function(_0x1f71ab){const _0x1986ac=_0x5075f1;this[_0x1986ac(0x2b7)]=_0x1f71ab;},Game_Temp[_0x5075f1(0x173)][_0x5075f1(0x414)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x5075f1(0x173)]['registerSelfTarget']=function(_0x22ad39){const _0x40402a=_0x5075f1;this[_0x40402a(0x1ff)]=_0x22ad39;},Game_Temp[_0x5075f1(0x173)][_0x5075f1(0x186)]=function(){const _0x5eef6b=_0x5075f1;this[_0x5eef6b(0x1ff)]=undefined;},Game_Temp[_0x5075f1(0x173)][_0x5075f1(0x96)]=function(){const _0x223f32=_0x5075f1;return this[_0x223f32(0x1ff)];},VisuMZ[_0x5075f1(0x2cd)]['Game_System_initialize']=Game_System[_0x5075f1(0x173)]['initialize'],Game_System[_0x5075f1(0x173)]['initialize']=function(){const _0x16fc38=_0x5075f1;VisuMZ[_0x16fc38(0x2cd)][_0x16fc38(0x284)]['call'](this),this[_0x16fc38(0x24f)](),this[_0x16fc38(0x114)]();},Game_System[_0x5075f1(0x173)][_0x5075f1(0x24f)]=function(){const _0xd9b665=_0x5075f1;this[_0xd9b665(0x174)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0xd9b665(0x3b8)]={},this[_0xd9b665(0x45d)]=[],this['_PreservedEventMorphData']={},this[_0xd9b665(0x325)]={},this['_DisablePlayerControl']=![],this['_PlayerDiagonalSetting']=_0xd9b665(0x229);},Game_System[_0x5075f1(0x173)][_0x5075f1(0x370)]=function(){const _0x442024=_0x5075f1;if(this[_0x442024(0x174)]===undefined)this['initEventsMoveCore']();if(this[_0x442024(0x174)][_0x442024(0x50a)]===undefined)this[_0x442024(0x24f)]();return this[_0x442024(0x174)]['DashingEnable'];},Game_System[_0x5075f1(0x173)][_0x5075f1(0xac)]=function(_0x14d125){const _0x236df3=_0x5075f1;if(this[_0x236df3(0x174)]===undefined)this[_0x236df3(0x24f)]();if(this['_EventsMoveCoreSettings'][_0x236df3(0x50a)]===undefined)this['initEventsMoveCore']();this[_0x236df3(0x174)][_0x236df3(0x50a)]=_0x14d125;},Game_System['prototype'][_0x5075f1(0x2ce)]=function(){const _0x3cbcf9=_0x5075f1;if(this[_0x3cbcf9(0x174)]===undefined)this[_0x3cbcf9(0x24f)]();if(this[_0x3cbcf9(0x174)][_0x3cbcf9(0x231)]===undefined)this[_0x3cbcf9(0x24f)]();return this[_0x3cbcf9(0x174)][_0x3cbcf9(0x231)];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x338)]=function(_0x5f4836){const _0x796470=_0x5075f1;if(this[_0x796470(0x174)]===undefined)this[_0x796470(0x24f)]();if(this[_0x796470(0x174)][_0x796470(0x231)]===undefined)this[_0x796470(0x24f)]();this[_0x796470(0x174)][_0x796470(0x231)]=_0x5f4836;},Game_System[_0x5075f1(0x173)][_0x5075f1(0x49c)]=function(){const _0x62c30=_0x5075f1;if(this['_EventsMoveCoreSettings']===undefined)this[_0x62c30(0x24f)]();if(this[_0x62c30(0x174)][_0x62c30(0x475)]===undefined)this[_0x62c30(0x24f)]();return this[_0x62c30(0x174)]['VisibleEventLabels'];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x2f0)]=function(_0x30b66b){const _0x5ca638=_0x5075f1;if(this[_0x5ca638(0x174)]===undefined)this[_0x5ca638(0x24f)]();if(this[_0x5ca638(0x174)]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();this[_0x5ca638(0x174)][_0x5ca638(0x475)]=_0x30b66b;},Game_System[_0x5075f1(0x173)][_0x5075f1(0xa2)]=function(){const _0x55629a=_0x5075f1;if(this[_0x55629a(0x183)]===undefined){if(_0x55629a(0x1c2)===_0x55629a(0x1c2))this['_DisablePlayerControl']=![];else{function _0x5484d7(){const _0x2c6abb=_0x55629a,_0x42314a=_0x33f578(_0x2f72d6['$1']),_0xeb8e71=_0x49405d(_0x97c3da['$2']);return this[_0x2c6abb(0x21a)](_0x42314a,_0xeb8e71);}}}return this[_0x55629a(0x183)];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x2c2)]=function(_0x4d6121){const _0x172c95=_0x5075f1;this[_0x172c95(0x183)]=_0x4d6121;},Game_System['prototype'][_0x5075f1(0x91)]=function(){const _0x32ee81=_0x5075f1;return this[_0x32ee81(0x4b8)];},Game_System['prototype']['setPlayerDiagonalSetting']=function(_0x486075){const _0x2cde1e=_0x5075f1;this['_PlayerDiagonalSetting']=String(_0x486075)[_0x2cde1e(0xa1)]()['trim']();},Game_System[_0x5075f1(0x173)]['getEventIconData']=function(_0x27310c){const _0x5c9fcf=_0x5075f1;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();if(!_0x27310c)return null;if(_0x27310c===$gamePlayer)return this['_EventIcons']['Player'];else{if(_0x5c9fcf(0x50b)===_0x5c9fcf(0x28c)){function _0x4c0b7d(){const _0x353f94=_0x5c9fcf;this[_0x353f94(0x26e)]();}}else{const _0x24e9b2=VisuMZ[_0x5c9fcf(0x2cd)]['Settings'],_0xeb7df0=_0x5c9fcf(0x119)[_0x5c9fcf(0x184)](_0x27310c[_0x5c9fcf(0x24b)],_0x27310c[_0x5c9fcf(0x1a8)]);return this[_0x5c9fcf(0x3b8)][_0xeb7df0]=this['_EventIcons'][_0xeb7df0]||{'iconIndex':0x0,'bufferX':_0x24e9b2[_0x5c9fcf(0x327)][_0x5c9fcf(0x1c9)],'bufferY':_0x24e9b2[_0x5c9fcf(0x327)][_0x5c9fcf(0xc2)],'blendMode':_0x24e9b2[_0x5c9fcf(0x327)][_0x5c9fcf(0x2c5)]},this[_0x5c9fcf(0x3b8)][_0xeb7df0];}}},Game_System[_0x5075f1(0x173)][_0x5075f1(0x4f9)]=function(_0x4bc8ee,_0xd4fac6,_0x4965d1,_0x4163bb,_0x2afe9e){const _0x4db973=_0x5075f1;if(this[_0x4db973(0x3b8)]===undefined)this[_0x4db973(0x24f)]();const _0x254a7e=_0x4bc8ee===$gamePlayer?_0x4db973(0x7e):'Map%1-Event%2'[_0x4db973(0x184)](_0x4bc8ee[_0x4db973(0x24b)],_0x4bc8ee[_0x4db973(0x1a8)]);this[_0x4db973(0x3b8)][_0x254a7e]={'iconIndex':_0xd4fac6,'bufferX':_0x4965d1,'bufferY':_0x4163bb,'blendMode':_0x2afe9e};},Game_System[_0x5075f1(0x173)][_0x5075f1(0x17c)]=function(_0x12afed,_0xc69288,_0x4497e0,_0xbd3acd,_0x1ab918,_0x334c10){const _0x29c1de=_0x5075f1;if(this[_0x29c1de(0x3b8)]===undefined)this[_0x29c1de(0x24f)]();const _0x552dc5='Map%1-Event%2'[_0x29c1de(0x184)](_0x12afed,_0xc69288);this[_0x29c1de(0x3b8)][_0x552dc5]={'iconIndex':_0x4497e0,'bufferX':_0xbd3acd,'bufferY':_0x1ab918,'blendMode':_0x334c10};},Game_System['prototype'][_0x5075f1(0x274)]=function(_0x34b961){const _0x4c689e=_0x5075f1;if(this[_0x4c689e(0x3b8)]===undefined)this[_0x4c689e(0x24f)]();if(!_0x34b961)return null;_0x34b961===$gamePlayer?delete this[_0x4c689e(0x3b8)][_0x4c689e(0x7e)]:this[_0x4c689e(0x329)](_0x34b961[_0x4c689e(0x24b)],_0x34b961['_eventId']);},Game_System[_0x5075f1(0x173)]['deleteIconsOnEventsDataKey']=function(_0x1e17cf,_0x48cdac){const _0x2a38b9=_0x5075f1;if(this[_0x2a38b9(0x3b8)]===undefined)this['initEventsMoveCore']();const _0xd09568=_0x2a38b9(0x119)[_0x2a38b9(0x184)](_0x1e17cf,_0x48cdac);delete this[_0x2a38b9(0x3b8)][_0xd09568];},Game_System[_0x5075f1(0x173)]['getSavedEventLocation']=function(_0x49a4c7){const _0x4f4973=_0x5075f1;if(this['_SavedEventLocations']===undefined)this[_0x4f4973(0x24f)]();if(!_0x49a4c7)return null;const _0x593b1e='Map%1-Event%2'[_0x4f4973(0x184)](_0x49a4c7[_0x4f4973(0x24b)],_0x49a4c7[_0x4f4973(0x1a8)]);return this[_0x4f4973(0x325)][_0x593b1e];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x4e4)]=function(_0xd589d3){const _0x3d9524=_0x5075f1;if(this[_0x3d9524(0x325)]===undefined)this[_0x3d9524(0x24f)]();if(!_0xd589d3)return;const _0x269de8='Map%1-Event%2'[_0x3d9524(0x184)](_0xd589d3['_mapId'],_0xd589d3[_0x3d9524(0x1a8)]);this['_SavedEventLocations'][_0x269de8]={'direction':_0xd589d3[_0x3d9524(0x93)](),'x':Math[_0x3d9524(0xba)](_0xd589d3['x']),'y':Math['round'](_0xd589d3['y']),'pageIndex':_0xd589d3[_0x3d9524(0xe6)],'moveRouteIndex':_0xd589d3[_0x3d9524(0x431)]};},Game_System[_0x5075f1(0x173)][_0x5075f1(0x15f)]=function(_0x96187c){const _0x59eed9=_0x5075f1;if(this[_0x59eed9(0x325)]===undefined)this['initEventsMoveCore']();if(!_0x96187c)return;this[_0x59eed9(0x4a4)](_0x96187c['_mapId'],_0x96187c[_0x59eed9(0x1a8)]);},Game_System[_0x5075f1(0x173)]['deleteSavedEventLocationKey']=function(_0x1d3744,_0x5cdb49){const _0x1484c9=_0x5075f1;if(this[_0x1484c9(0x325)]===undefined)this['initEventsMoveCore']();const _0x5554ba=_0x1484c9(0x119)[_0x1484c9(0x184)](_0x1d3744,_0x5cdb49);delete this[_0x1484c9(0x325)][_0x5554ba];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x1e3)]=function(_0x3f1dd4,_0xe70d03,_0x111f78,_0x46d68e,_0x22586b,_0x3edc6c,_0x14d7f7){const _0xef132c=_0x5075f1;if(this['_SavedEventLocations']===undefined)this[_0xef132c(0x24f)]();const _0x598662=_0xef132c(0x119)['format'](_0x3f1dd4,_0xe70d03);this[_0xef132c(0x325)][_0x598662]={'direction':_0x22586b,'x':Math['round'](_0x111f78),'y':Math['round'](_0x46d68e),'pageIndex':_0x3edc6c,'moveRouteIndex':_0x14d7f7};},Game_System[_0x5075f1(0x173)][_0x5075f1(0x2a7)]=function(_0x17254d){const _0x593666=_0x5075f1;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();if(!_0x17254d)return;const _0x245810=_0x593666(0x119)[_0x593666(0x184)](_0x17254d[_0x593666(0x24b)],_0x17254d[_0x593666(0x1a8)]);return this[_0x593666(0x29b)][_0x245810];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x17a)]=function(_0x46445b,_0x32a1a1,_0x5a720b,_0x13736d,_0x2a1fb8){const _0x4ef933=_0x5075f1;if(this[_0x4ef933(0x29b)]===undefined)this[_0x4ef933(0x24f)]();const _0x4631cb='Map%1-Event%2'[_0x4ef933(0x184)](_0x46445b,_0x32a1a1);this[_0x4ef933(0x29b)][_0x4631cb]={'template':_0x5a720b,'mapId':_0x13736d,'eventId':_0x2a1fb8};},Game_System['prototype']['deletePreservedMorphEventDataKey']=function(_0x181df3,_0xed4987){const _0x28ff2c=_0x5075f1;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0x643072=_0x28ff2c(0x119)['format'](_0x181df3,_0xed4987);delete this['_PreservedEventMorphData'][_0x643072];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x1af)]=function(_0x17c80b){const _0x1ade47=_0x5075f1;if(this[_0x1ade47(0x45d)]===undefined)this['initEventsMoveCore']();return this[_0x1ade47(0x45d)][_0x17c80b]=this[_0x1ade47(0x45d)][_0x17c80b]||[],this[_0x1ade47(0x45d)][_0x17c80b];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x2bb)]=function(_0x1aec0f){const _0x44a5fb=_0x5075f1,_0x48a883=this['getMapSpawnedEventData'](_0x1aec0f);for(const _0x248117 of _0x48a883){if(!_0x248117)continue;if(_0x248117[_0x44a5fb(0x49f)])continue;const _0x153587=_0x48a883['indexOf'](_0x248117);_0x48a883[_0x153587]=null;}},Game_System['prototype'][_0x5075f1(0x114)]=function(){const _0xfc4252=_0x5075f1;this[_0xfc4252(0x1b2)]=0x0,this[_0xfc4252(0x34c)]=![];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x121)]=function(){const _0x2b5a31=_0x5075f1;if(this[_0x2b5a31(0x1b2)]===undefined)this['initFollowerController']();return this[_0x2b5a31(0x1b2)];},Game_System[_0x5075f1(0x173)][_0x5075f1(0x36a)]=function(_0x3a233d){const _0x267a0a=_0x5075f1;if(this[_0x267a0a(0x1b2)]===undefined)this['initFollowerController']();this[_0x267a0a(0x1b2)]=_0x3a233d;;},VisuMZ[_0x5075f1(0x2cd)]['Game_Interpreter_character']=Game_Interpreter[_0x5075f1(0x173)][_0x5075f1(0x1c5)],Game_Interpreter[_0x5075f1(0x173)][_0x5075f1(0x1c5)]=function(_0x3ee5a3){const _0xa6b713=_0x5075f1;if(!$gameParty[_0xa6b713(0xf1)]()&&_0x3ee5a3<0x0){if('RQleV'!=='RQleV'){function _0x1b1dde(){const _0x31733b=_0xa6b713;if(!this[_0x31733b(0x46c)])return![];if(!this[_0x31733b(0x46c)][_0x31733b(0x3b6)])return![];if(this[_0x31733b(0x4d3)]!==this[_0x31733b(0x46c)][_0x31733b(0xe6)])return!![];if(this['_event'][_0x31733b(0x2d1)]&&!this[_0x31733b(0x33a)])return!![];if(this[_0x31733b(0x46c)]['_labelWindow'][_0x31733b(0x98)]==='')return![];if(this[_0x31733b(0x49a)]!==_0x455466[_0x31733b(0x299)]())return!![];if(this['_eventScreenX']!==this['_event'][_0x31733b(0x111)]())return!![];if(this[_0x31733b(0x2b0)]!==this[_0x31733b(0x46c)][_0x31733b(0x386)]())return!![];if(this['_eventLabelOffsetX']!==this[_0x31733b(0x46c)][_0x31733b(0x3b6)]['offsetX'])return!![];if(this[_0x31733b(0x3a7)]!==this[_0x31733b(0x46c)]['_labelWindow'][_0x31733b(0x177)])return!![];if(this[_0x31733b(0x37c)]!==_0x6350f8['x'])return!![];if(this['_visiblePlayerY']!==_0x2287ee['y'])return!![];if(this['_visibleEventX']!==this[_0x31733b(0x46c)]['x'])return!![];if(this['_visibleEventY']!==this['_event']['y'])return!![];if(this[_0x31733b(0x1cf)]!==_0x3938eb[_0x31733b(0x49c)]())return!![];if(this[_0x31733b(0x1c1)]&&this[_0x31733b(0x438)]<0xff)return!![];if(!this[_0x31733b(0x1c1)]&&this[_0x31733b(0x438)]>0x0)return!![];if(_0x28c3f4[_0x31733b(0x4ad)][_0x31733b(0x4d6)]>0x0)return!![];return![];}}else{let _0x4245c6=$gameSystem[_0xa6b713(0x121)]();if(_0x4245c6>0x0)return $gamePlayer[_0xa6b713(0x2af)]()['follower'](_0x4245c6-0x1);}}return VisuMZ[_0xa6b713(0x2cd)][_0xa6b713(0x346)][_0xa6b713(0x342)](this,_0x3ee5a3);},Game_System[_0x5075f1(0x173)][_0x5075f1(0x482)]=function(){const _0x337686=_0x5075f1;if(this['_followerChaseOff']===undefined)this[_0x337686(0x114)]();return this[_0x337686(0x34c)];},Game_System[_0x5075f1(0x173)]['setStopFollowerChasing']=function(_0x5cbeaa){const _0x58e4c0=_0x5075f1;if(this[_0x58e4c0(0x34c)]===undefined)this['initFollowerController']();this[_0x58e4c0(0x34c)]=_0x5cbeaa;;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x457)]=Game_Timer[_0x5075f1(0x173)]['initialize'],Game_Timer[_0x5075f1(0x173)][_0x5075f1(0x150)]=function(){const _0x4d9b42=_0x5075f1;VisuMZ[_0x4d9b42(0x2cd)][_0x4d9b42(0x457)][_0x4d9b42(0x342)](this),this[_0x4d9b42(0x24f)]();},Game_Timer['prototype'][_0x5075f1(0x24f)]=function(){const _0x2c42d5=_0x5075f1;this[_0x2c42d5(0x47b)]=![],this[_0x2c42d5(0x78)]=-0x1,this['_expireCommonEvent']=0x0;},Game_Timer[_0x5075f1(0x173)]['update']=function(_0x3fb085){const _0x3e8cba=_0x5075f1;if(!_0x3fb085)return;if(!this['_working'])return;if(this[_0x3e8cba(0x47b)])return;if(this[_0x3e8cba(0xae)]<=0x0)return;if(this[_0x3e8cba(0x78)]===undefined)this['initEventsMoveCore']();this[_0x3e8cba(0xae)]+=this[_0x3e8cba(0x78)],this[_0x3e8cba(0xae)]<=0x0&&this[_0x3e8cba(0x3b0)]();},VisuMZ[_0x5075f1(0x2cd)]['Game_Timer_start']=Game_Timer['prototype']['start'],Game_Timer[_0x5075f1(0x173)][_0x5075f1(0x2c1)]=function(_0x351447){const _0x191193=_0x5075f1;VisuMZ[_0x191193(0x2cd)][_0x191193(0x443)][_0x191193(0x342)](this,_0x351447);if(this[_0x191193(0x47b)]===undefined)this['initEventsMoveCore']();this[_0x191193(0x47b)]=![];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x1f0)]=Game_Timer[_0x5075f1(0x173)]['stop'],Game_Timer[_0x5075f1(0x173)][_0x5075f1(0x217)]=function(){const _0x7f9893=_0x5075f1;VisuMZ[_0x7f9893(0x2cd)]['Game_Timer_stop'][_0x7f9893(0x342)](this);if(this[_0x7f9893(0x47b)]===undefined)this['initEventsMoveCore']();this[_0x7f9893(0x47b)]=![];},Game_Timer[_0x5075f1(0x173)][_0x5075f1(0x439)]=function(){const _0xbf04c6=_0x5075f1;if(this[_0xbf04c6(0xae)]<=0x0)return;this['_paused']=!![],this[_0xbf04c6(0x24e)]=!![];},Game_Timer[_0x5075f1(0x173)][_0x5075f1(0x14d)]=function(){const _0x29e7b6=_0x5075f1;if(this[_0x29e7b6(0xae)]<=0x0)return;this[_0x29e7b6(0x47b)]=![],this['_working']=!![];},Game_Timer['prototype'][_0x5075f1(0x1e5)]=function(_0x4706e3){const _0x5cb163=_0x5075f1;this[_0x5cb163(0xae)]=this[_0x5cb163(0xae)]||0x0,this[_0x5cb163(0xae)]+=_0x4706e3,this[_0x5cb163(0x24e)]=!![],this[_0x5cb163(0xae)]=Math[_0x5cb163(0x97)](0x1,this['_frames']);},Game_Timer['prototype'][_0x5075f1(0x2b5)]=function(_0x7cab85){const _0x3a3e5e=_0x5075f1;this['_frames']=this['_frames']||0x0,this[_0x3a3e5e(0xae)]=_0x7cab85,this[_0x3a3e5e(0x24e)]=!![],this[_0x3a3e5e(0xae)]=Math['max'](0x1,this[_0x3a3e5e(0xae)]);},Game_Timer[_0x5075f1(0x173)]['changeSpeed']=function(_0x178a32){const _0x1c017e=_0x5075f1;this[_0x1c017e(0x78)]=_0x178a32,this[_0x1c017e(0x24e)]=!![];if(_0x178a32>0x0){if(_0x1c017e(0xbf)===_0x1c017e(0x84)){function _0x376799(){const _0x14d64d=_0x1c017e;this[_0x14d64d(0x3c1)](_0xe13f96);}}else this['_frames']=Math[_0x1c017e(0x97)](this[_0x1c017e(0xae)],0x1);}},Game_Timer[_0x5075f1(0x173)][_0x5075f1(0x3ce)]=function(_0x44b464){const _0x5b6196=_0x5075f1;if(this[_0x5b6196(0x181)]===undefined)this[_0x5b6196(0x24f)]();this[_0x5b6196(0x181)]=_0x44b464;},VisuMZ['EventsMoveCore'][_0x5075f1(0x1ea)]=Game_Timer['prototype'][_0x5075f1(0x3b0)],Game_Timer[_0x5075f1(0x173)][_0x5075f1(0x3b0)]=function(){const _0x3e7a0d=_0x5075f1;if(this[_0x3e7a0d(0x181)]===undefined)this[_0x3e7a0d(0x24f)]();if(this['_expireCommonEvent'])$gameTemp[_0x3e7a0d(0x474)](this['_expireCommonEvent']);else{if(_0x3e7a0d(0x469)!==_0x3e7a0d(0x3b3))VisuMZ[_0x3e7a0d(0x2cd)]['Game_Timer_onExpire'][_0x3e7a0d(0x342)](this);else{function _0x32ce20(){const _0xed03ec=_0x3e7a0d;this[_0xed03ec(0x4db)]=!![],_0x1aa4e6[_0xed03ec(0x2cd)][_0xed03ec(0x12c)]['call'](this),this['setupEventsMoveCoreEffects'](),this['_activationProximityAutoTriggerBypass']=![];}}}},VisuMZ[_0x5075f1(0x2cd)]['Game_Message_add']=Game_Message['prototype'][_0x5075f1(0x518)],Game_Message[_0x5075f1(0x173)][_0x5075f1(0x518)]=function(_0x53842a){const _0x58a4de=_0x5075f1;VisuMZ[_0x58a4de(0x2cd)][_0x58a4de(0x2f5)][_0x58a4de(0x342)](this,_0x53842a),this[_0x58a4de(0x47d)]=$gameTemp[_0x58a4de(0x96)]();},Game_Message['prototype'][_0x5075f1(0x519)]=function(){const _0x550cb0=_0x5075f1;$gameTemp[_0x550cb0(0x4b5)](this['_selfEvent']);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0xbb)]=Game_Switches[_0x5075f1(0x173)][_0x5075f1(0x3c7)],Game_Switches['prototype'][_0x5075f1(0x3c7)]=function(_0x9ce929){const _0x54d967=_0x5075f1;if(DataManager[_0x54d967(0x198)](_0x9ce929))return!!this[_0x54d967(0x2d4)](_0x9ce929);else{if(DataManager['isSelfSwitch'](_0x9ce929))return!!this['selfValue'](_0x9ce929);else{if(_0x54d967(0x3dd)===_0x54d967(0x3dd))return VisuMZ[_0x54d967(0x2cd)][_0x54d967(0xbb)][_0x54d967(0x342)](this,_0x9ce929);else{function _0x2114e2(){const _0x174e71=_0x54d967;return this[_0x174e71(0x2b7)];}}}}},Game_Switches[_0x5075f1(0x425)]={},Game_Switches[_0x5075f1(0x173)]['advancedValue']=function(_0x45494e){const _0x50ee56=_0x5075f1;if(!Game_Switches[_0x50ee56(0x425)][_0x45494e]){$dataSystem[_0x50ee56(0x429)][_0x45494e][_0x50ee56(0x28d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x513a90=_0x50ee56(0xe9)['format'](String(RegExp['$1']));Game_Switches[_0x50ee56(0x425)][_0x45494e]=new Function('switchId',_0x513a90);}const _0x1c4c8f=$gameTemp[_0x50ee56(0x96)]()||this;return Game_Switches['advancedFunc'][_0x45494e]['call'](_0x1c4c8f,_0x45494e);},Game_Switches[_0x5075f1(0x173)][_0x5075f1(0x2ff)]=function(_0x10ffe3){const _0x11c3da=_0x5075f1,_0x523a54=$gameTemp['getSelfTarget']()||this;if(_0x523a54[_0x11c3da(0x3e1)]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x11c3da(0xbb)][_0x11c3da(0x342)](this,_0x10ffe3);else{const _0x583c00=[_0x523a54[_0x11c3da(0x24b)],_0x523a54[_0x11c3da(0x1a8)],_0x11c3da(0x10e)['format'](_0x10ffe3)];return $gameSelfSwitches['value'](_0x583c00);}},VisuMZ['EventsMoveCore']['Game_Switches_setValue']=Game_Switches[_0x5075f1(0x173)][_0x5075f1(0x423)],Game_Switches[_0x5075f1(0x173)][_0x5075f1(0x423)]=function(_0x4738b1,_0xbe2f5f){const _0x37217e=_0x5075f1;if(DataManager[_0x37217e(0x44d)](_0x4738b1)){if(_0x37217e(0x257)==='ntTAo'){function _0x5f3142(){const _0x24a1a1=_0x37217e;return _0xfb0622[_0x24a1a1(0x2cd)][_0x24a1a1(0x488)][_0x24a1a1(0x1b7)](this[_0x24a1a1(0x44a)]()[_0x24a1a1(0x32a)],this['_commonEventId']);}}else this[_0x37217e(0x112)](_0x4738b1,_0xbe2f5f);}else{if('kWLhy'!==_0x37217e(0x2df))VisuMZ[_0x37217e(0x2cd)][_0x37217e(0x2f3)]['call'](this,_0x4738b1,_0xbe2f5f);else{function _0x47fb04(){const _0x2616c3=_0x37217e;this[_0x2616c3(0x3b6)]['offsetY']=_0x479fe3(_0x402df7['$1']);}}}},Game_Switches[_0x5075f1(0x173)][_0x5075f1(0x112)]=function(_0x5f0e56,_0x5b3175){const _0x2a0d15=_0x5075f1,_0x4345e0=$gameTemp[_0x2a0d15(0x96)]()||this;if(_0x4345e0[_0x2a0d15(0x3e1)]!==Game_Event)VisuMZ['EventsMoveCore']['Game_Switches_setValue'][_0x2a0d15(0x342)](this,_0x5f0e56,_0x5b3175);else{if(_0x2a0d15(0x440)!==_0x2a0d15(0x2a6)){const _0x5e075d=[_0x4345e0[_0x2a0d15(0x24b)],_0x4345e0[_0x2a0d15(0x1a8)],'Self\x20Switch\x20%1'[_0x2a0d15(0x184)](_0x5f0e56)];$gameSelfSwitches['setValue'](_0x5e075d,_0x5b3175);}else{function _0x3922dc(){const _0xf0b3a1=_0x2a0d15;_0x5f1aa5['EventsMoveCore']['Sprite_Character_initMembers'][_0xf0b3a1(0x342)](this),this[_0xf0b3a1(0x178)](),this['createIconSprite']();}}}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x405)]=Game_Variables[_0x5075f1(0x173)][_0x5075f1(0x3c7)],Game_Variables[_0x5075f1(0x173)][_0x5075f1(0x3c7)]=function(_0x5ec4f5){const _0x12c18b=_0x5075f1;if(DataManager[_0x12c18b(0x432)](_0x5ec4f5)){if(_0x12c18b(0x11a)==='ghKIS')return this[_0x12c18b(0x2d4)](_0x5ec4f5);else{function _0x121464(){this['_randomMoveWeight']=_0x36cb5f(_0x4433d0['$1'])||0x0;}}}else{if(DataManager[_0x12c18b(0x4d0)](_0x5ec4f5)){if(_0x12c18b(0x1e8)!=='IqCYp'){function _0x24f091(){const _0x4868f4=_0x12c18b;_0x2d1ab6['x']=_0x5901ef?_0x1a21d9['bufferX']:0x0,_0x199beb['y']=_0x1b2cf6?-this['height']+_0x572fee[_0x4868f4(0x205)]:0x0;}}else return this[_0x12c18b(0x2ff)](_0x5ec4f5);}else return VisuMZ[_0x12c18b(0x2cd)][_0x12c18b(0x405)][_0x12c18b(0x342)](this,_0x5ec4f5);}},Game_Variables[_0x5075f1(0x425)]={},Game_Variables[_0x5075f1(0x173)][_0x5075f1(0x2d4)]=function(_0x142edd){const _0x551ae0=_0x5075f1;if(!Game_Variables['advancedFunc'][_0x142edd]){$dataSystem['variables'][_0x142edd][_0x551ae0(0x28d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x389960=_0x551ae0(0xe9)[_0x551ae0(0x184)](String(RegExp['$1']));Game_Variables[_0x551ae0(0x425)][_0x142edd]=new Function(_0x551ae0(0x374),_0x389960);}const _0x5f489a=$gameTemp['getSelfTarget']()||this;return Game_Variables[_0x551ae0(0x425)][_0x142edd][_0x551ae0(0x342)](_0x5f489a,_0x142edd);},Game_Variables[_0x5075f1(0x173)]['selfValue']=function(_0x402443){const _0x7a41c5=_0x5075f1,_0x2624af=$gameTemp['getSelfTarget']()||this;if(_0x2624af[_0x7a41c5(0x3e1)]!==Game_Event){if(_0x7a41c5(0x1b3)===_0x7a41c5(0x48f)){function _0x1ef6b6(){const _0x3579e7=_0x7a41c5;_0x4e76e9[_0x3579e7(0x474)](_0x4369b9[_0x16ca4e]);}}else return VisuMZ['EventsMoveCore'][_0x7a41c5(0x405)]['call'](this,_0x402443);}else{const _0x1dacb6=[_0x2624af[_0x7a41c5(0x24b)],_0x2624af[_0x7a41c5(0x1a8)],_0x7a41c5(0x4a9)[_0x7a41c5(0x184)](_0x402443)];return $gameSelfSwitches[_0x7a41c5(0x3c7)](_0x1dacb6);}},VisuMZ[_0x5075f1(0x2cd)]['Game_Variables_setValue']=Game_Variables[_0x5075f1(0x173)]['setValue'],Game_Variables[_0x5075f1(0x173)][_0x5075f1(0x423)]=function(_0x36fda0,_0x31b0f5){const _0x552f9e=_0x5075f1;if(DataManager['isSelfVariable'](_0x36fda0)){if(_0x552f9e(0x515)!==_0x552f9e(0x88))this[_0x552f9e(0x112)](_0x36fda0,_0x31b0f5);else{function _0x4c29de(){const _0x5770c5=_0x552f9e;if(this[_0x5770c5(0x3b8)]===_0x3282f3)this[_0x5770c5(0x24f)]();if(!_0x6cd4bf)return null;_0x48e986===_0x264e2f?delete this[_0x5770c5(0x3b8)][_0x5770c5(0x7e)]:this['deleteIconsOnEventsDataKey'](_0x290e4d[_0x5770c5(0x24b)],_0x2e0220[_0x5770c5(0x1a8)]);}}}else VisuMZ['EventsMoveCore'][_0x552f9e(0xa0)]['call'](this,_0x36fda0,_0x31b0f5);},Game_Variables['prototype'][_0x5075f1(0x112)]=function(_0x34b322,_0x4c565f){const _0x13b7f0=_0x5075f1,_0x27eaab=$gameTemp[_0x13b7f0(0x96)]()||this;if(_0x27eaab[_0x13b7f0(0x3e1)]!==Game_Event)VisuMZ[_0x13b7f0(0x2cd)][_0x13b7f0(0xa0)][_0x13b7f0(0x342)](this,_0x34b322,_0x4c565f);else{if(_0x13b7f0(0x130)===_0x13b7f0(0x238)){function _0x2d4f91(){const _0x32c9f3=_0x13b7f0,_0x1c7c81=_0x32c9f3(0x30b)[_0x32c9f3(0x184)](_0x95a518,_0x4473e0);_0x235d7e[_0x1c7c81]&&(_0x5f338c[_0x1c7c81]=_0x4f3ec4[_0x1c7c81][_0x32c9f3(0x204)](0x0));}}else{const _0xc6bda7=[_0x27eaab[_0x13b7f0(0x24b)],_0x27eaab[_0x13b7f0(0x1a8)],_0x13b7f0(0x4a9)[_0x13b7f0(0x184)](_0x34b322)];$gameSelfSwitches[_0x13b7f0(0x423)](_0xc6bda7,_0x4c565f);}}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x123)]=Game_SelfSwitches[_0x5075f1(0x173)]['value'],Game_SelfSwitches[_0x5075f1(0x173)][_0x5075f1(0x3c7)]=function(_0xd17b7a){const _0x3cd06a=_0x5075f1;if(_0xd17b7a[0x2]['match'](/SELF/i)){if('vpUBD'===_0x3cd06a(0x4f1))return this[_0x3cd06a(0x2ff)](_0xd17b7a);else{function _0x37e9f8(){const _0x42eadd=_0x3cd06a,_0x50602c=this[_0x42eadd(0xd3)]();return _0x50602c?_0x50602c[_0x42eadd(0x1a8)]:0x0;}}}else{return VisuMZ['EventsMoveCore'][_0x3cd06a(0x123)][_0x3cd06a(0x342)](this,_0xd17b7a);;}},Game_SelfSwitches[_0x5075f1(0x173)][_0x5075f1(0x2ff)]=function(_0x2943bb){const _0x5e9ec6=_0x5075f1;return _0x2943bb[0x2]['match'](/VAR/i)?this[_0x5e9ec6(0x449)][_0x2943bb]||0x0:!!this[_0x5e9ec6(0x449)][_0x2943bb];},VisuMZ[_0x5075f1(0x2cd)]['Game_SelfSwitches_setValue']=Game_SelfSwitches['prototype'][_0x5075f1(0x423)],Game_SelfSwitches[_0x5075f1(0x173)]['setValue']=function(_0x224b5e,_0x4b10db){const _0x57b486=_0x5075f1;_0x224b5e[0x2][_0x57b486(0x28d)](/SELF/i)?this[_0x57b486(0x112)](_0x224b5e,_0x4b10db):VisuMZ[_0x57b486(0x2cd)][_0x57b486(0x46b)]['call'](this,_0x224b5e,_0x4b10db);},Game_SelfSwitches['prototype']['setSelfValue']=function(_0xf37c82,_0x22ab82){const _0x37575d=_0x5075f1;this[_0x37575d(0x449)][_0xf37c82]=_0xf37c82[0x2][_0x37575d(0x28d)](/VAR/i)?_0x22ab82:!!_0x22ab82,this[_0x37575d(0x350)]();},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x340)]=Game_Enemy[_0x5075f1(0x173)][_0x5075f1(0x3d3)],Game_Enemy['prototype'][_0x5075f1(0x3d3)]=function(_0x11ecff){const _0xecfbfb=_0x5075f1;$gameTemp[_0xecfbfb(0x4b5)](this);const _0x1b8fd2=VisuMZ['EventsMoveCore'][_0xecfbfb(0x340)][_0xecfbfb(0x342)](this,_0x11ecff);return $gameTemp[_0xecfbfb(0x186)](),_0x1b8fd2;},VisuMZ['EventsMoveCore'][_0x5075f1(0x18b)]=Game_Troop[_0x5075f1(0x173)][_0x5075f1(0x27e)],Game_Troop[_0x5075f1(0x173)]['meetsConditions']=function(_0x5f7ce8){const _0x18d360=_0x5075f1;$gameTemp[_0x18d360(0x4b5)](this);const _0x4869a2=VisuMZ[_0x18d360(0x2cd)][_0x18d360(0x18b)][_0x18d360(0x342)](this,_0x5f7ce8);return $gameTemp[_0x18d360(0x186)](),_0x4869a2;},VisuMZ[_0x5075f1(0x2cd)]['Game_Map_setup']=Game_Map['prototype'][_0x5075f1(0x33e)],Game_Map[_0x5075f1(0x173)][_0x5075f1(0x33e)]=function(_0x563879){const _0x2a0c38=_0x5075f1;this[_0x2a0c38(0x2bb)](_0x563879),this['clearEventCache'](),VisuMZ['EventsMoveCore'][_0x2a0c38(0x2f6)][_0x2a0c38(0x342)](this,_0x563879),this[_0x2a0c38(0x1bf)](),this[_0x2a0c38(0x506)](),this[_0x2a0c38(0x1e7)](),this[_0x2a0c38(0x364)](),this[_0x2a0c38(0x343)](),this[_0x2a0c38(0x1bf)]();},VisuMZ['EventsMoveCore'][_0x5075f1(0x3b9)]=Game_Map[_0x5075f1(0x173)][_0x5075f1(0x2da)],Game_Map[_0x5075f1(0x173)][_0x5075f1(0x2da)]=function(){const _0x537969=_0x5075f1;VisuMZ['EventsMoveCore'][_0x537969(0x3b9)][_0x537969(0x342)](this),this[_0x537969(0x44b)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x5075f1(0x173)][_0x5075f1(0x185)]=function(){const _0x22da5d=_0x5075f1,_0x2741ec=Game_Map[_0x22da5d(0x1a5)];this[_0x22da5d(0x446)]=this[_0x22da5d(0x349)]()[_0x22da5d(0x13a)]>_0x2741ec;if(this[_0x22da5d(0x446)]&&$gameTemp['isPlaytest']()){}},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x477)]=function(){return this['_eventOverload'];},Game_Map['prototype']['clearEventCache']=function(){this['_eventCache']=undefined;},Game_Map['prototype']['setupDiagonalSupport']=function(){const _0x5cc6fd=_0x5075f1;this[_0x5cc6fd(0x2c0)]=VisuMZ['EventsMoveCore'][_0x5cc6fd(0x2eb)][_0x5cc6fd(0x3ab)][_0x5cc6fd(0x1c0)];const _0x2b2316=$dataMap[_0x5cc6fd(0x508)]||'';if(_0x2b2316[_0x5cc6fd(0x28d)](/<DIAGONAL MOVEMENT: ON>/i)){if('yPonD'===_0x5cc6fd(0xfc))this[_0x5cc6fd(0x2c0)]=!![];else{function _0x569f77(){const _0x399be6=_0x5cc6fd;this[_0x399be6(0x385)]();}}}else _0x2b2316[_0x5cc6fd(0x28d)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x5cc6fd(0x2c0)]=![]);},Game_Map[_0x5075f1(0x173)]['isSupportDiagonalMovement']=function(){const _0xe47548=_0x5075f1,_0x5a4945=$gameSystem[_0xe47548(0x91)]();if(_0x5a4945===_0xe47548(0x168))return!![];if(_0x5a4945===_0xe47548(0x21c))return![];if(this[_0xe47548(0x2c0)]===undefined)this[_0xe47548(0x506)]();return this[_0xe47548(0x2c0)];},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x32d)]=function(_0x3339aa,_0xa31bf8){const _0x14282f=_0x5075f1;if([0x1,0x4,0x7][_0x14282f(0xd5)](_0xa31bf8))_0x3339aa-=0x1;if([0x3,0x6,0x9][_0x14282f(0xd5)](_0xa31bf8))_0x3339aa+=0x1;return this[_0x14282f(0xb5)](_0x3339aa);},Game_Map['prototype'][_0x5075f1(0x459)]=function(_0x1e4915,_0xcedefd){const _0x513572=_0x5075f1;if([0x1,0x2,0x3][_0x513572(0xd5)](_0xcedefd))_0x1e4915+=0x1;if([0x7,0x8,0x9][_0x513572(0xd5)](_0xcedefd))_0x1e4915-=0x1;return this[_0x513572(0x1cb)](_0x1e4915);},Game_Map[_0x5075f1(0x173)]['absDistance']=function(_0x1796ee,_0x20fef5,_0xaa5959,_0xc12929){const _0x2ffe4a=_0x5075f1;return Math[_0x2ffe4a(0x97)](Math[_0x2ffe4a(0x418)](this[_0x2ffe4a(0x219)](_0x1796ee,_0xaa5959)),Math[_0x2ffe4a(0x418)](this[_0x2ffe4a(0xad)](_0x20fef5,_0xc12929)));},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x1e7)]=function(){const _0x13bc00=_0x5075f1,_0xf9674f=VisuMZ[_0x13bc00(0x2cd)]['Settings'][_0x13bc00(0x3c5)],_0x10877c={},_0x388c84=[_0x13bc00(0x3e0),'Forbid',_0x13bc00(0x37b)],_0x3c9615=[_0x13bc00(0x35c),_0x13bc00(0xec),'Player',_0x13bc00(0x21f),_0x13bc00(0x378),_0x13bc00(0x2cc),_0x13bc00(0x3ad),'Airship'];for(const _0x45fb6f of _0x388c84){for(const _0x2a2176 of _0x3c9615){const _0x14358a='%1%2'[_0x13bc00(0x184)](_0x2a2176,_0x45fb6f);_0xf9674f[_0x14358a]&&(_0x10877c[_0x14358a]=_0xf9674f[_0x14358a][_0x13bc00(0x204)](0x0));}}const _0x42d52f=$dataMap[_0x13bc00(0x508)]||'',_0x47bc80=_0x42d52f['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x47bc80){if('PwTWe'!==_0x13bc00(0x504))for(const _0x46a44b of _0x47bc80){if(_0x13bc00(0x2c6)!=='tFsoQ'){function _0x2900f2(){const _0x1aba99=_0x13bc00;if(_0x5508d3[_0x1aba99(0x4ad)][_0x1aba99(0x3e1)]===_0x25608f)return![];return _0x1c2c7a['AdvancedSwitches'][_0x1aba99(0xd5)](_0x57e4b2);}}else{_0x46a44b[_0x13bc00(0x28d)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0xc85541=String(RegExp['$1'])[_0x13bc00(0xa1)]()['trim'](),_0xb305b9=String(RegExp['$2'])['toLowerCase']()[_0x13bc00(0x4d1)]();const _0x284cff=JSON[_0x13bc00(0x4bb)]('['+RegExp['$3']['match'](/\d+/g)+']');_0xc85541=_0xc85541[_0x13bc00(0x215)](0x0)['toUpperCase']()+_0xc85541[_0x13bc00(0x204)](0x1),_0xb305b9=_0xb305b9[_0x13bc00(0x215)](0x0)[_0x13bc00(0x4ba)]()+_0xb305b9[_0x13bc00(0x204)](0x1);const _0xe394e9='%1%2'['format'](_0xc85541,_0xb305b9);if(_0x10877c[_0xe394e9])_0x10877c[_0xe394e9]=_0x10877c[_0xe394e9][_0x13bc00(0x8a)](_0x284cff);}}else{function _0x2bf813(){const _0x13d175=_0x13bc00;return this[_0x13d175(0xf6)]()&&_0x427cea[_0x13d175(0x2cd)][_0x13d175(0x2eb)][_0x13d175(0xca)][_0x13d175(0x41d)];}}}this['_regionRules']=_0x10877c;},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x50c)]=function(_0x2b6ebc,_0xeba39b,_0x4dca02,_0x1937a7){const _0x21e30a=_0x5075f1,_0x4ba5f1=this[_0x21e30a(0x32d)](_0x2b6ebc,_0x4dca02),_0x3d341a=this['roundYWithDirection'](_0xeba39b,_0x4dca02),_0x2c48a2=this[_0x21e30a(0xb9)](_0x4ba5f1,_0x3d341a),_0x2de949=this[_0x21e30a(0x180)];if(_0x2de949['AllAllow'][_0x21e30a(0xd5)](_0x2c48a2))return!![];else{if(_0x1937a7===_0x21e30a(0x3d6))return _0x2de949[_0x21e30a(0x415)][_0x21e30a(0xd5)](_0x2c48a2)||_0x2de949[_0x21e30a(0x2d8)][_0x21e30a(0xd5)](_0x2c48a2);else{if(_0x1937a7===_0x21e30a(0x44a))return _0x2de949[_0x21e30a(0x4c9)][_0x21e30a(0xd5)](_0x2c48a2)||_0x2de949[_0x21e30a(0x2d8)][_0x21e30a(0xd5)](_0x2c48a2);else{if(_0x2de949[_0x21e30a(0x253)]['includes'](_0x2c48a2)){if(_0x21e30a(0x149)==='eQkQn')return!![];else{function _0x435311(){const _0x2f1b0c=_0x21e30a;_0x4acb8f[_0x2f1b0c(0x2cd)][_0x2f1b0c(0x11d)]['call'](this),_0x52688c[_0x2f1b0c(0x2a4)]&&_0x5be7d5[_0x2f1b0c(0x40f)](_0x26e252[_0x2f1b0c(0x4cc)][_0x2f1b0c(0x2eb)]['General'][_0x2f1b0c(0x3f4)])&&_0x41f701['clear']();}}}else{if('DcKMX'===_0x21e30a(0x29a)){function _0xd305d0(){const _0x256616=_0x21e30a;return this[_0x256616(0x224)](_0x22a726);}}else{const _0x1cf7d5=_0x21e30a(0x22d)[_0x21e30a(0x184)](_0x1937a7[_0x21e30a(0x215)](0x0)['toUpperCase']()+_0x1937a7[_0x21e30a(0x204)](0x1));if(_0x2de949[_0x1cf7d5])return _0x2de949[_0x1cf7d5][_0x21e30a(0xd5)](_0x2c48a2);}}}}}return![];},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x281)]=function(_0x2b502b,_0x3ca2e1,_0x2017e6,_0x258c43){const _0x4f4d47=_0x5075f1,_0x4c8042=this[_0x4f4d47(0x32d)](_0x2b502b,_0x2017e6),_0x4b9839=this['roundYWithDirection'](_0x3ca2e1,_0x2017e6),_0x358644=this[_0x4f4d47(0xb9)](_0x4c8042,_0x4b9839),_0x2efd97=this[_0x4f4d47(0x180)];if(_0x2efd97[_0x4f4d47(0x2b2)][_0x4f4d47(0xd5)](_0x358644)){if(_0x4f4d47(0x4dc)!=='Gphvq')return!![];else{function _0x243274(){const _0x2bf9f2=_0x4f4d47;if(!this[_0x2bf9f2(0xb7)](_0x224835))return;const _0x4e8e0c=new _0x3cc976(_0x5ae8ae);_0x4e8e0c['z']=0x8,_0x4e8e0c[_0x2bf9f2(0x4ab)]=_0x12b4c9[_0x2bf9f2(0x216)]++,this['_tilemap'][_0x2bf9f2(0x492)](_0x4e8e0c),this[_0x2bf9f2(0x517)][_0x2bf9f2(0x203)](_0x4e8e0c);}}}else{if(_0x258c43===_0x4f4d47(0x3d6)){if(_0x4f4d47(0xf0)!==_0x4f4d47(0x43d))return _0x2efd97[_0x4f4d47(0x4ae)][_0x4f4d47(0xd5)](_0x358644)||_0x2efd97[_0x4f4d47(0x32b)]['includes'](_0x358644);else{function _0x16f03f(){const _0x2b4eda=_0x4f4d47;if(_0x1a56f8)for(const _0x5636d2 of _0x6f88a8[_0x2b4eda(0x349)]()){_0x5636d2['refresh']();}}}}else{if(_0x258c43===_0x4f4d47(0x44a))return _0x2efd97['EventForbid']['includes'](_0x358644)||_0x2efd97['WalkForbid'][_0x4f4d47(0xd5)](_0x358644);else{if(_0x2efd97[_0x4f4d47(0x441)][_0x4f4d47(0xd5)](_0x358644))return!![];else{if(_0x4f4d47(0x11f)===_0x4f4d47(0x11f)){const _0x238e60=_0x4f4d47(0x308)[_0x4f4d47(0x184)](_0x258c43[_0x4f4d47(0x215)](0x0)[_0x4f4d47(0x4ba)]()+_0x258c43[_0x4f4d47(0x204)](0x1));if(_0x2efd97[_0x238e60])return _0x2efd97[_0x238e60][_0x4f4d47(0xd5)](_0x358644);}else{function _0xc0199b(){const _0x12490c=_0x4f4d47;_0x58795a[_0x12490c(0x2cd)][_0x12490c(0x1b4)][_0x12490c(0x342)](this,_0x59b2a9,_0x1f1cbe);if(this['isSpriteVS8dir']())this[_0x12490c(0xff)](_0x56db08,_0xa573b0);}}}}}}return![];},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x188)]=function(_0x5b2831,_0x3744d4,_0xb496d4,_0x4b78b9){const _0x52212c=_0x5075f1;_0xb496d4=_0x4b78b9===_0x52212c(0x120)?0x5:_0xb496d4;const _0x238568=this[_0x52212c(0x32d)](_0x5b2831,_0xb496d4),_0x5aa38b=this[_0x52212c(0x459)](_0x3744d4,_0xb496d4),_0x3a6ce5=this[_0x52212c(0xb9)](_0x238568,_0x5aa38b),_0x19be68=this[_0x52212c(0x180)];if(_0x19be68[_0x52212c(0xb2)][_0x52212c(0xd5)](_0x3a6ce5)){if(_0x52212c(0x3b7)!==_0x52212c(0x3b7)){function _0x5052d3(){const _0x16278e=_0x52212c;_0x4aece5['ConvertParams'](_0x57d854,_0x21407f);const _0xe8e5e3=_0x1ff82e[_0x16278e(0x414)]();_0x4bc2a9[_0x16278e(0x3fe)]=_0x555471[_0x16278e(0x3fe)]||_0x111473['mapId'](),_0x546f1d[_0x16278e(0x329)](_0x461696['MapId'],_0x43397a[_0x16278e(0x380)]||_0xe8e5e3['eventId']());}}else return!![];}else{if('XDZhJ'!=='XDZhJ'){function _0x4c8c94(){const _0x33e7e8=_0x52212c;return _0x266da7[_0x33e7e8(0x8d)]&&_0x54161a[_0x33e7e8(0x278)][_0x33e7e8(0xd5)]('['+_0x549ec1+']');}}else{const _0x4b43c9=_0x52212c(0x200)[_0x52212c(0x184)](_0x4b78b9[_0x52212c(0x215)](0x0)[_0x52212c(0x4ba)]()+_0x4b78b9[_0x52212c(0x204)](0x1));if(_0x19be68[_0x4b43c9])return _0x19be68[_0x4b43c9][_0x52212c(0xd5)](_0x3a6ce5);}}return![];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x4cd)]=Game_Map[_0x5075f1(0x173)][_0x5075f1(0x17f)],Game_Map[_0x5075f1(0x173)][_0x5075f1(0x17f)]=function(){const _0x17f230=_0x5075f1;VisuMZ[_0x17f230(0x2cd)]['Game_Map_refresh']['call'](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0x5075f1(0x173)]['checkNeedForPeriodicRefresh']=function(){const _0x214582=_0x5075f1;this[_0x214582(0x3c9)]=![];if(this[_0x214582(0x349)]()[_0x214582(0x1b0)](_0x4eb636=>_0x4eb636[_0x214582(0x35a)]())){this[_0x214582(0x3c9)]=!![];return;}if(this[_0x214582(0x349)]()[_0x214582(0x1b0)](_0x37d931=>_0x37d931[_0x214582(0x35b)]())){if(_0x214582(0x3ef)!==_0x214582(0x3ef)){function _0x67fd15(){this['startCallEvent']();}}else{this['_needsPeriodicRefresh']=!![];return;}}if(this[_0x214582(0x25b)][_0x214582(0x1b0)](_0x342a19=>_0x342a19[_0x214582(0x35a)]())){if(_0x214582(0x3cb)===_0x214582(0x4ff)){function _0x3090ba(){const _0x420507=_0x214582;_0x38edd7[_0x420507(0x2cd)][_0x420507(0x1f0)][_0x420507(0x342)](this);if(this[_0x420507(0x47b)]===_0x16346e)this[_0x420507(0x24f)]();this['_paused']=![];}}else{this[_0x214582(0x3c9)]=!![];return;}}if(this[_0x214582(0x25b)][_0x214582(0x1b0)](_0x1e5950=>_0x1e5950[_0x214582(0x35b)]())){if(_0x214582(0x4d9)===_0x214582(0x3f8)){function _0x3d7a98(){_0x3dad05=_0x38f208;}}else{this[_0x214582(0x3c9)]=!![];return;}}},VisuMZ['EventsMoveCore']['Game_Map_update']=Game_Map[_0x5075f1(0x173)]['update'],Game_Map[_0x5075f1(0x173)]['update']=function(_0x4e0a77){const _0x896c0b=_0x5075f1;this[_0x896c0b(0x39a)](),VisuMZ[_0x896c0b(0x2cd)]['Game_Map_update'][_0x896c0b(0x342)](this,_0x4e0a77);},Game_Map['prototype'][_0x5075f1(0x39a)]=function(){const _0x139c9e=_0x5075f1;if(!this[_0x139c9e(0x3c9)])return;this[_0x139c9e(0x51d)]=this[_0x139c9e(0x51d)]||0x3c,this['_periodicRefreshTimer']--,this[_0x139c9e(0x51d)]<=0x0&&(this[_0x139c9e(0x21d)](),this[_0x139c9e(0x51d)]=0x3c);},VisuMZ['EventsMoveCore'][_0x5075f1(0xbe)]=Game_Map[_0x5075f1(0x173)][_0x5075f1(0x3cf)],Game_Map[_0x5075f1(0x173)]['isDashDisabled']=function(){const _0x31008e=_0x5075f1;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ[_0x31008e(0x2cd)][_0x31008e(0xbe)]['call'](this);},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x364)]=function(){const _0x4fd1f8=_0x5075f1;this[_0x4fd1f8(0x314)]=![];const _0x5848e4=$dataMap[_0x4fd1f8(0x508)]||'';_0x5848e4[_0x4fd1f8(0x28d)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x4fd1f8(0x314)]=!![]);},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x344)]=function(){const _0x5d3f53=_0x5075f1;if(this[_0x5d3f53(0x314)]===undefined)this[_0x5d3f53(0x364)]();return this[_0x5d3f53(0x314)];},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x2bb)]=function(_0x4a4168){const _0x2ae752=_0x5075f1;if(_0x4a4168!==this[_0x2ae752(0x466)]()&&$gamePlayer){if(_0x2ae752(0x376)===_0x2ae752(0x22a)){function _0x43d80f(){const _0x2cd5f6=_0x2ae752,_0x21a8f1=this[_0x2cd5f6(0x359)][_0x2cd5f6(0x204)](0x0)['reverse']();for(const _0x38fc86 of _0x21a8f1){if(_0x38fc86)return _0x38fc86;}return null;}}else $gameSystem[_0x2ae752(0x2bb)](this[_0x2ae752(0x466)]());}},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x343)]=function(){const _0xd603e3=_0x5075f1;this['_spawnedEvents']=$gameSystem[_0xd603e3(0x1af)](this[_0xd603e3(0x466)]()),this[_0xd603e3(0x43e)]=!![];},VisuMZ[_0x5075f1(0x2cd)]['Game_Map_events']=Game_Map[_0x5075f1(0x173)]['events'],Game_Map[_0x5075f1(0x173)][_0x5075f1(0x349)]=function(){const _0x54748b=_0x5075f1;if(this['_eventCache'])return this[_0x54748b(0x14e)];const _0x14218d=VisuMZ[_0x54748b(0x2cd)][_0x54748b(0x125)][_0x54748b(0x342)](this),_0x4a9e6c=_0x14218d['concat'](this[_0x54748b(0x359)]||[]);return this[_0x54748b(0x14e)]=_0x4a9e6c['filter'](_0x153f90=>!!_0x153f90),this[_0x54748b(0x14e)];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x50f)]=Game_Map[_0x5075f1(0x173)][_0x5075f1(0x44a)],Game_Map[_0x5075f1(0x173)]['event']=function(_0x15c614){const _0x11e895=_0x5075f1;if(_0x15c614>=0x3e8){if(_0x11e895(0x151)==='JtULH')return _0x15c614-=0x3e8,this[_0x11e895(0x359)][_0x15c614];else{function _0x43e33c(){return _0x16aa8d>0x0?0x8:0x2;}}}else return VisuMZ[_0x11e895(0x2cd)][_0x11e895(0x50f)][_0x11e895(0x342)](this,_0x15c614);},Game_Map[_0x5075f1(0x173)]['eraseEvent']=function(_0x3c44bc){const _0x5e2bc0=_0x5075f1,_0x5c2473=this[_0x5e2bc0(0x44a)](_0x3c44bc);if(_0x5c2473)_0x5c2473['erase']();},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x1a2)]=function(){const _0xaedda=_0x5075f1,_0x248189={'template':_0xaedda(0xaf),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0xaedda(0x359)]['length']+0x3e8};this['createSpawnedEventWithData'](_0x248189);},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x2ee)]=function(_0x1c89ab,_0x4d646e){const _0x2798de=_0x5075f1;if(this[_0x2798de(0x365)](_0x1c89ab,_0x4d646e)[_0x2798de(0x13a)]>0x0)return!![];if($gamePlayer['x']===_0x1c89ab&&$gamePlayer['y']===_0x4d646e)return!![];if(this['boat']()['posNt'](_0x1c89ab,_0x4d646e))return!![];if(this[_0x2798de(0x148)]()[_0x2798de(0x4e0)](_0x1c89ab,_0x4d646e))return!![];return![];},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x2f1)]=function(_0x2a6d30,_0x5f5d3d,_0x4b469b){const _0x1d2d82=_0x5075f1;$gameTemp[_0x1d2d82(0x331)]=_0x2a6d30;const _0x2c8e10=new Game_Event(_0x2a6d30[_0x1d2d82(0x466)],_0x2a6d30[_0x1d2d82(0x437)]);$gameTemp[_0x1d2d82(0x331)]=undefined,_0x2c8e10[_0x1d2d82(0x17f)]();let _0x56c909=_0x5f5d3d-_0x2c8e10['_addedHitbox'][_0x1d2d82(0x4fa)],_0x56583c=_0x5f5d3d+_0x2c8e10[_0x1d2d82(0xf5)][_0x1d2d82(0x4fa)],_0x825684=_0x4b469b-_0x2c8e10[_0x1d2d82(0xf5)]['up'],_0x2ece99=_0x4b469b+_0x2c8e10[_0x1d2d82(0xf5)]['down'];for(let _0x2d29f3=_0x56c909;_0x2d29f3<=_0x56583c;_0x2d29f3++){if(_0x1d2d82(0x286)===_0x1d2d82(0x27a)){function _0x199a0c(){const _0x17c16a=_0x1d2d82;_0x4325ab=_0x18fa39[_0x17c16a(0x115)](_0x317277,(_0x2f4689,_0x2bf793)=>_0x1e31c6[_0x17c16a(0x3c7)](_0x15e15c(_0x2bf793)));}}else for(let _0x4683a5=_0x825684;_0x4683a5<=_0x2ece99;_0x4683a5++){if(this[_0x1d2d82(0x2ee)](_0x2d29f3,_0x4683a5))return![];}}return!![];},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x2d0)]=function(_0x10d25c){const _0x231aaa=_0x5075f1;$gameTemp['_spawnData']=_0x10d25c;const _0x32912b=new Game_Event(_0x10d25c[_0x231aaa(0x466)],_0x10d25c[_0x231aaa(0x437)]);$gameTemp[_0x231aaa(0x331)]=undefined,this[_0x231aaa(0x359)][_0x231aaa(0x203)](_0x32912b),_0x32912b[_0x231aaa(0x47c)](_0x10d25c),this[_0x231aaa(0x1bf)]();},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x503)]=function(_0x1204f1,_0x5711f5,_0x1d9c06){const _0x4a0c47=_0x5075f1,_0x3d41ab=_0x1204f1['x'],_0x21c165=_0x1204f1['y'];if(!this[_0x4a0c47(0x1d9)](_0x3d41ab,_0x21c165))return![];if(_0x5711f5){if(this['checkExistingEntitiesAt'](_0x3d41ab,_0x21c165))return![];if(!this[_0x4a0c47(0x2f1)](_0x1204f1,_0x3d41ab,_0x21c165))return![];}if(_0x1d9c06){if(!this[_0x4a0c47(0x99)](_0x3d41ab,_0x21c165))return![];}return this['createSpawnedEventWithData'](_0x1204f1),!![];},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x2b1)]=function(_0x1a46e2,_0x4ae806,_0x18e5de,_0x2eb378){const _0x40f882=_0x5075f1,_0x5dc422=[],_0xa3e5ae=this[_0x40f882(0x155)](),_0x406de5=this[_0x40f882(0x461)]();for(let _0x3f928e=0x0;_0x3f928e<_0xa3e5ae;_0x3f928e++){for(let _0x42338c=0x0;_0x42338c<_0x406de5;_0x42338c++){if(!_0x4ae806[_0x40f882(0xd5)](this[_0x40f882(0xb9)](_0x3f928e,_0x42338c)))continue;if(!this[_0x40f882(0x1d9)](_0x3f928e,_0x42338c))continue;if(_0x18e5de){if(this[_0x40f882(0x2ee)](_0x3f928e,_0x42338c))continue;if(!this[_0x40f882(0x2f1)](_0x1a46e2,_0x3f928e,_0x42338c))continue;}if(_0x2eb378){if(!this[_0x40f882(0x99)](_0x3f928e,_0x42338c))continue;}_0x5dc422['push']([_0x3f928e,_0x42338c]);}}if(_0x5dc422[_0x40f882(0x13a)]>0x0){if(_0x40f882(0x35f)!=='MBTYl'){function _0xac83e(){const _0x4c51c3=_0x40f882;if(this[_0x4c51c3(0x181)]===_0x874456)this[_0x4c51c3(0x24f)]();this['_expireCommonEvent']=_0x68c7b6;}}else{const _0x15962d=_0x5dc422[Math['randomInt'](_0x5dc422[_0x40f882(0x13a)])];return _0x1a46e2['x']=_0x15962d[0x0],_0x1a46e2['y']=_0x15962d[0x1],this[_0x40f882(0x2d0)](_0x1a46e2),!![];}}return![];},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x442)]=function(_0x78ca1c,_0x1e0b36,_0x4e2221,_0x548d0c){const _0x59dd10=_0x5075f1,_0x2e3357=[],_0x30b5d7=this[_0x59dd10(0x155)](),_0x4c060c=this['height']();for(let _0x34f3c2=0x0;_0x34f3c2<_0x30b5d7;_0x34f3c2++){for(let _0x226403=0x0;_0x226403<_0x4c060c;_0x226403++){if(!_0x1e0b36[_0x59dd10(0xd5)](this['terrainTag'](_0x34f3c2,_0x226403)))continue;if(!this['isValid'](_0x34f3c2,_0x226403))continue;if(_0x4e2221){if(this['checkExistingEntitiesAt'](_0x34f3c2,_0x226403))continue;if(!this[_0x59dd10(0x2f1)](_0x78ca1c,_0x34f3c2,_0x226403))continue;}if(_0x548d0c){if(!this['isPassableByAnyDirection'](_0x34f3c2,_0x226403))continue;}_0x2e3357[_0x59dd10(0x203)]([_0x34f3c2,_0x226403]);}}if(_0x2e3357[_0x59dd10(0x13a)]>0x0){if(_0x59dd10(0xab)!==_0x59dd10(0xab)){function _0x223f42(){const _0x3f3c35=_0x59dd10,_0x1c603f=_0x4b8474[_0x3f3c35(0x19f)](_0x5a6eb0,_0x39b23d)[_0x3f3c35(0x332)](_0x2870b5=>_0x2870b5!==this);return _0x1c603f[_0x3f3c35(0x13a)]>0x0;}}else{const _0x33f769=_0x2e3357[Math[_0x59dd10(0x118)](_0x2e3357[_0x59dd10(0x13a)])];return _0x78ca1c['x']=_0x33f769[0x0],_0x78ca1c['y']=_0x33f769[0x1],this[_0x59dd10(0x2d0)](_0x78ca1c),!![];}}return![];},Game_Map[_0x5075f1(0x173)]['isPassableByAnyDirection']=function(_0x1c69c3,_0x5d1ee0){const _0x20616b=_0x5075f1;if(this[_0x20616b(0x2db)](_0x1c69c3,_0x5d1ee0,0x2))return!![];if(this[_0x20616b(0x2db)](_0x1c69c3,_0x5d1ee0,0x4))return!![];if(this[_0x20616b(0x2db)](_0x1c69c3,_0x5d1ee0,0x6))return!![];if(this['isPassable'](_0x1c69c3,_0x5d1ee0,0x8))return!![];return![];},Game_Map[_0x5075f1(0x173)]['despawnEventId']=function(_0x28a7cb){const _0x44cb1e=_0x5075f1;if(_0x28a7cb<0x3e8)return;if(!this[_0x44cb1e(0x359)])return;const _0x42b10f=this[_0x44cb1e(0x44a)](_0x28a7cb);_0x42b10f[_0x44cb1e(0x2de)](-0x1,-0x1),_0x42b10f[_0x44cb1e(0x447)](),this[_0x44cb1e(0x359)][_0x28a7cb-0x3e8]=null,this[_0x44cb1e(0x1bf)]();},Game_Map['prototype']['firstSpawnedEvent']=function(){const _0x312b89=_0x5075f1;for(const _0x4b042f of this[_0x312b89(0x359)]){if(_0x4b042f)return _0x4b042f;}return null;},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x15d)]=function(){const _0x4ae20d=_0x5075f1,_0xe95b69=this[_0x4ae20d(0xd3)]();return _0xe95b69?_0xe95b69[_0x4ae20d(0x1a8)]:0x0;},Game_Map['prototype'][_0x5075f1(0x38f)]=function(){const _0x2b72d6=_0x5075f1,_0x2f42e3=this[_0x2b72d6(0x359)][_0x2b72d6(0x204)](0x0)['reverse']();for(const _0x560714 of _0x2f42e3){if(_0x560714)return _0x560714;}return null;},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x287)]=function(){const _0x1d32f5=_0x5075f1,_0x599610=this[_0x1d32f5(0x38f)]();return _0x599610?_0x599610[_0x1d32f5(0x1a8)]:0x0;},Game_Map[_0x5075f1(0x173)]['despawnAtXY']=function(_0x41c2c5,_0x4ac305){const _0x54fce2=_0x5075f1,_0x9a46df=this[_0x54fce2(0x365)](_0x41c2c5,_0x4ac305);for(const _0x411532 of _0x9a46df){if(_0x54fce2(0x4a3)!==_0x54fce2(0x4a3)){function _0x1e0014(){const _0x1924a4=_0x54fce2;if(this[_0x1924a4(0x14e)])return this[_0x1924a4(0x14e)];const _0x5ed710=_0x299e37[_0x1924a4(0x2cd)][_0x1924a4(0x125)][_0x1924a4(0x342)](this),_0xcf9452=_0x5ed710[_0x1924a4(0x8a)](this[_0x1924a4(0x359)]||[]);return this[_0x1924a4(0x14e)]=_0xcf9452['filter'](_0x2ca7be=>!!_0x2ca7be),this[_0x1924a4(0x14e)];}}else{if(!_0x411532)continue;if(_0x411532[_0x54fce2(0x1bd)]())this[_0x54fce2(0xde)](_0x411532['_eventId']);}}},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x2c9)]=function(_0x22c9c3){const _0x2078fc=_0x5075f1;for(const _0x2528e8 of this[_0x2078fc(0x359)]){if('krdzP'==='QRqKe'){function _0x5f3844(){const _0x2fa210=_0x2078fc;this[_0x2fa210(0x23c)]();}}else{if(!_0x2528e8)continue;_0x22c9c3[_0x2078fc(0xd5)](_0x2528e8[_0x2078fc(0xb9)]())&&this['despawnEventId'](_0x2528e8['_eventId']);}}},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x260)]=function(_0x5ba9f5){const _0x2f2a7b=_0x5075f1;for(const _0x24da6c of this[_0x2f2a7b(0x359)]){if(!_0x24da6c)continue;_0x5ba9f5['includes'](_0x24da6c[_0x2f2a7b(0x26b)]())&&this['despawnEventId'](_0x24da6c[_0x2f2a7b(0x1a8)]);}},Game_Map[_0x5075f1(0x173)][_0x5075f1(0x33c)]=function(){const _0x24e1cd=_0x5075f1;for(const _0x521461 of this[_0x24e1cd(0x359)]){if('gBoUq'!==_0x24e1cd(0x3e6)){function _0x1a3d95(){const _0x4c0150=_0x24e1cd;_0x24a774[_0x4c0150(0x228)](_0x5ad71c,_0x5a3571),_0x384a07[_0x4c0150(0x4f9)](_0x3e05a5,_0x35083d['IconIndex'],_0x149d48[_0x4c0150(0x202)],_0x1280eb[_0x4c0150(0x51e)],_0x1ac55f[_0x4c0150(0x4f2)]);}}else{if(!_0x521461)continue;this[_0x24e1cd(0xde)](_0x521461[_0x24e1cd(0x1a8)]);}}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x4cb)]=Game_Map[_0x5075f1(0x173)][_0x5075f1(0xa8)],Game_Map[_0x5075f1(0x173)][_0x5075f1(0xa8)]=function(_0xfc4af5){const _0x51d407=_0x5075f1;VisuMZ['EventsMoveCore']['Game_Map_unlockEvent'][_0x51d407(0x342)](this,_0xfc4af5);if(_0xfc4af5>=0x3e8){const _0x2c76cf=this['event'](_0xfc4af5);if(_0x2c76cf)_0x2c76cf[_0x51d407(0x128)]();}},Game_CommonEvent[_0x5075f1(0x173)]['hasAdvancedSwitchVariable']=function(){const _0x3ee257=_0x5075f1,_0x482d34=this['event']();return this[_0x3ee257(0xb0)]()&&_0x482d34[_0x3ee257(0x45f)]>=0x1&&DataManager[_0x3ee257(0x198)](_0x482d34['switchId']);},Game_CommonEvent['prototype'][_0x5075f1(0x35b)]=function(){const _0x5b5c15=_0x5075f1;return VisuMZ[_0x5b5c15(0x2cd)][_0x5b5c15(0x488)][_0x5b5c15(0x25b)]['includes'](this[_0x5b5c15(0x444)]);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x356)]=Game_CommonEvent[_0x5075f1(0x173)][_0x5075f1(0xb0)],Game_CommonEvent[_0x5075f1(0x173)]['isActive']=function(){const _0x55aac5=_0x5075f1;return VisuMZ[_0x55aac5(0x2cd)][_0x55aac5(0x356)][_0x55aac5(0x342)](this)?!![]:VisuMZ[_0x55aac5(0x2cd)][_0x55aac5(0x488)][_0x55aac5(0x1b7)](this[_0x55aac5(0x44a)]()[_0x55aac5(0x32a)],this[_0x55aac5(0x444)]);},VisuMZ['EventsMoveCore']['Game_Map_parallelCommonEvents']=Game_Map[_0x5075f1(0x173)]['parallelCommonEvents'],Game_Map['prototype'][_0x5075f1(0x25e)]=function(){const _0x18c47d=_0x5075f1,_0x2f5419=VisuMZ[_0x18c47d(0x2cd)]['Game_Map_parallelCommonEvents'][_0x18c47d(0x342)](this),_0x52ad0b=VisuMZ[_0x18c47d(0x2cd)][_0x18c47d(0x488)][_0x18c47d(0x25b)][_0x18c47d(0x40b)](_0xbfbf0a=>$dataCommonEvents[_0xbfbf0a]);return _0x2f5419['concat'](_0x52ad0b)[_0x18c47d(0x332)]((_0x35d2fc,_0x239236,_0x5d6cd5)=>_0x5d6cd5[_0x18c47d(0x236)](_0x35d2fc)===_0x239236);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x36b)]=Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x2c8)],Game_CharacterBase[_0x5075f1(0x173)]['initMembers']=function(){const _0x5aefc6=_0x5075f1;VisuMZ[_0x5aefc6(0x2cd)][_0x5aefc6(0x36b)][_0x5aefc6(0x342)](this),this[_0x5aefc6(0x416)]();},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x416)]=function(){const _0x2d2957=_0x5075f1;this[_0x2d2957(0x445)]=![],this['clearPose'](),this[_0x2d2957(0x22f)](),this[_0x2d2957(0x47f)](),this[_0x2d2957(0x49e)]();},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0xf6)]=function(){const _0x269ffd=_0x5075f1;if(this['constructor']===Game_Player&&this['isInVehicle']())return this['vehicle']()['characterName']()[_0x269ffd(0x28d)](/\[VS8\]/i);else{if(Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x269ffd(0x4a5)]()){if('ipzTZ'===_0x269ffd(0x3ee))return!![];else{function _0x5cb30c(){const _0x2e5afd=_0x269ffd;this[_0x2e5afd(0x1ff)]=_0x538aeb;}}}else return this[_0x269ffd(0x395)]()[_0x269ffd(0x28d)](/\[VS8\]/i);}},VisuMZ['EventsMoveCore'][_0x5075f1(0x139)]=Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x93)],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x93)]=function(){const _0x464ef8=_0x5075f1;if(this[_0x464ef8(0x233)]()&&!this[_0x464ef8(0xb1)]()&&this['isSpriteVS8dir']())return this[_0x464ef8(0x176)]();else{if(this[_0x464ef8(0x233)]()&&!this[_0x464ef8(0xb1)]()){if(_0x464ef8(0x195)===_0x464ef8(0x195))return 0x8;else{function _0x3bd05d(){const _0x39d4cd=_0x464ef8;_0x4c985d[_0x39d4cd(0x2cd)]['Game_Event_locate']['call'](this,_0x38f0cb,_0x37147f),this[_0x39d4cd(0x361)]=_0x3d3641,this[_0x39d4cd(0x402)]=_0x94ff0f;}}}else{if(this['isPosing']()&&this[_0x464ef8(0xf6)]()){if('NXJdd'===_0x464ef8(0x89))return this[_0x464ef8(0x4d4)]();else{function _0x17d752(){return!![];}}}else return VisuMZ['EventsMoveCore']['Game_CharacterBase_direction'][_0x464ef8(0x342)](this);}}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x142)]=Game_CharacterBase['prototype'][_0x5075f1(0x4e8)],Game_CharacterBase[_0x5075f1(0x173)]['setDirection']=function(_0x256ecc){const _0x5b9d14=_0x5075f1;if(!this[_0x5b9d14(0xf6)]())_0x256ecc=this[_0x5b9d14(0x140)](_0x256ecc);VisuMZ['EventsMoveCore']['Game_CharacterBase_setDirection']['call'](this,_0x256ecc);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x140)]=function(_0x498fb9){const _0x5da715=_0x5075f1;if(_0x498fb9===0x1)return this[_0x5da715(0x47a)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x498fb9===0x3)return this[_0x5da715(0x47a)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x498fb9===0x7)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x498fb9===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x498fb9;},Game_CharacterBase[_0x5075f1(0x173)]['isDiagonalDirection']=function(_0x1e377e){const _0x2e97e5=_0x5075f1;return[0x1,0x3,0x5,0x7,0x9][_0x2e97e5(0xd5)](_0x1e377e);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x2b4)]=function(){const _0x33b9ef=_0x5075f1;return this[_0x33b9ef(0x1b9)]||0x0;},VisuMZ[_0x5075f1(0x2cd)]['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x5075f1(0x173)]['moveStraight'],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x251)]=function(_0x299fba){const _0x49baaf=_0x5075f1;this['_lastMovedDirection']=_0x299fba,VisuMZ[_0x49baaf(0x2cd)][_0x49baaf(0x37a)][_0x49baaf(0x342)](this,_0x299fba);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x3c1)]=function(_0x50036c){const _0x50f199=_0x5075f1;if(!this[_0x50f199(0x3dc)](_0x50036c))return this[_0x50f199(0x251)](_0x50036c);let _0x17ece1=0x0,_0x1a2a59=0x0;switch(_0x50036c){case 0x1:_0x17ece1=0x4,_0x1a2a59=0x2;break;case 0x3:_0x17ece1=0x6,_0x1a2a59=0x2;break;case 0x7:_0x17ece1=0x4,_0x1a2a59=0x8;break;case 0x9:_0x17ece1=0x6,_0x1a2a59=0x8;break;}if(VisuMZ[_0x50f199(0x2cd)][_0x50f199(0x2eb)][_0x50f199(0x3ab)][_0x50f199(0xdc)]){if(!this['canPass'](this['_x'],this['_y'],_0x17ece1))return this['moveStraight'](_0x1a2a59);if(!this[_0x50f199(0x47a)](this['_x'],this['_y'],_0x1a2a59)){if('HZSBG'!==_0x50f199(0x2ab))return this[_0x50f199(0x251)](_0x17ece1);else{function _0xa000ba(){const _0x470279=_0x50f199;this[_0x470279(0x319)](_0x5bf591,_0x291fb9);if(this['x']!==_0x1da2ee||this['y']!==_0x5ba0b8)this['_moveRouteIndex']--;}}}if(!this[_0x50f199(0x223)](this['_x'],this['_y'],_0x17ece1,_0x1a2a59)){let _0x4d390f=VisuMZ[_0x50f199(0x2cd)]['Settings']['Movement'][_0x50f199(0x499)]?_0x17ece1:_0x1a2a59;return this[_0x50f199(0x251)](_0x4d390f);}}this['_lastMovedDirection']=_0x50036c,this[_0x50f199(0xd0)](_0x17ece1,_0x1a2a59);},VisuMZ[_0x5075f1(0x2cd)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x5075f1(0x173)]['realMoveSpeed'],Game_CharacterBase['prototype']['realMoveSpeed']=function(){const _0x2072ee=_0x5075f1;let _0x1f08a0=this[_0x2072ee(0xe8)];return this[_0x2072ee(0x248)]()&&(_0x1f08a0+=this['dashSpeedModifier']()),this[_0x2072ee(0x28e)](_0x1f08a0);},Game_CharacterBase['prototype'][_0x5075f1(0x4de)]=function(){const _0x3676b0=_0x5075f1,_0x2d630b=VisuMZ[_0x3676b0(0x2cd)][_0x3676b0(0x2eb)][_0x3676b0(0x3ab)];if(_0x2d630b[_0x3676b0(0x335)]!==undefined)return _0x2d630b[_0x3676b0(0x335)];else{if(_0x3676b0(0x249)!==_0x3676b0(0x249)){function _0x20f181(){return _0x4de9cd>0x0?0x6:0x4;}}else return VisuMZ[_0x3676b0(0x2cd)][_0x3676b0(0x384)][_0x3676b0(0x342)](this)-this[_0x3676b0(0xe8)];}},Game_CharacterBase['prototype'][_0x5075f1(0x28e)]=function(_0x2bb0de){const _0x49c2c3=_0x5075f1,_0x2af8a2=VisuMZ[_0x49c2c3(0x2cd)][_0x49c2c3(0x2eb)]['Movement'];if(!_0x2af8a2[_0x49c2c3(0x2e0)])return _0x2bb0de;return[0x1,0x3,0x7,0x9][_0x49c2c3(0xd5)](this[_0x49c2c3(0x1b9)])&&(_0x2bb0de*=_0x2af8a2['DiagonalSpeedMultiplier']||0.01),_0x2bb0de;},VisuMZ['EventsMoveCore'][_0x5075f1(0x13b)]=Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x248)],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x248)]=function(){const _0x3faaf2=_0x5075f1;if(this[_0x3faaf2(0x300)])return!![];return VisuMZ[_0x3faaf2(0x2cd)][_0x3faaf2(0x13b)][_0x3faaf2(0x342)](this);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x1fa)]=function(){const _0x5a0254=_0x5075f1;return this[_0x5a0254(0x248)]();},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x237)]=Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x399)],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x399)]=function(){const _0x3ec5e6=_0x5075f1;return this[_0x3ec5e6(0xe5)]()?this[_0x3ec5e6(0x207)]():VisuMZ[_0x3ec5e6(0x2cd)][_0x3ec5e6(0x237)][_0x3ec5e6(0x342)](this);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x2ad)]=Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x164)],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x164)]=function(){const _0x4b8611=_0x5075f1;VisuMZ['EventsMoveCore'][_0x4b8611(0x2ad)][_0x4b8611(0x342)](this),this[_0x4b8611(0x7b)]();},VisuMZ[_0x5075f1(0x2cd)]['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x3e3)],Game_CharacterBase['prototype']['characterIndex']=function(){const _0x246bcf=_0x5075f1;if(this[_0x246bcf(0xf6)]())return this[_0x246bcf(0x3eb)]();return VisuMZ[_0x246bcf(0x2cd)][_0x246bcf(0x3a5)][_0x246bcf(0x342)](this);},Game_CharacterBase[_0x5075f1(0x173)]['characterIndexVS8']=function(){const _0x47d3d6=_0x5075f1,_0x36ff16=this[_0x47d3d6(0x93)]();if(this[_0x47d3d6(0xb1)]()){if(_0x47d3d6(0x29f)===_0x47d3d6(0x29f)){if([0x2,0x4,0x6,0x8][_0x47d3d6(0xd5)](_0x36ff16))return 0x4;if([0x1,0x3,0x7,0x9][_0x47d3d6(0xd5)](_0x36ff16))return 0x5;}else{function _0x2a2fc9(){const _0x3f7c53=_0x47d3d6;let _0x4a6db9=_0x3ca1b7[_0x3f7c53(0x1f4)][0x0];_0x4a6db9=this[_0x3f7c53(0xdf)](_0x4a6db9),_0x4a6db9=this['convertSelfVariableValuesInScriptCall'](_0x4a6db9),this[_0x3f7c53(0x175)](_0x1d15e3,_0x4a6db9);}}}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x47d3d6(0xe5)]())return this[_0x47d3d6(0x3f0)]();else{if(this[_0x47d3d6(0x247)]){if([0x2,0x4,0x6,0x8][_0x47d3d6(0xd5)](_0x36ff16))return 0x4;if([0x1,0x3,0x7,0x9][_0x47d3d6(0xd5)](_0x36ff16))return 0x5;}else{if(this[_0x47d3d6(0x292)]()&&this['useCarryPoseForIcons']()){if([0x2,0x4,0x6,0x8][_0x47d3d6(0xd5)](_0x36ff16))return 0x4;if([0x1,0x3,0x7,0x9][_0x47d3d6(0xd5)](_0x36ff16))return 0x5;}else{if(this['isDashingAndMoving']()){if('DAUso'==='NrjaD'){function _0x2059bc(){const _0x5eb276=_0x47d3d6;this[_0x5eb276(0x337)][_0x5eb276(0xef)]=_0x4d01c8(_0x3f267f['$1']);}}else{if([0x2,0x4,0x6,0x8]['includes'](_0x36ff16))return 0x2;if([0x1,0x3,0x7,0x9][_0x47d3d6(0xd5)](_0x36ff16))return 0x3;}}else{if([0x2,0x4,0x6,0x8][_0x47d3d6(0xd5)](_0x36ff16))return 0x0;if([0x1,0x3,0x7,0x9][_0x47d3d6(0xd5)](_0x36ff16))return 0x1;}}}}}}},Game_CharacterBase[_0x5075f1(0x173)]['useCarryPoseForIcons']=function(){const _0x25d83b=_0x5075f1;return VisuMZ[_0x25d83b(0x2cd)][_0x25d83b(0x2eb)][_0x25d83b(0xca)][_0x25d83b(0x2e6)];},Game_CharacterBase[_0x5075f1(0x173)]['isOnRope']=function(){const _0x3674ed=_0x5075f1;return this['isOnLadder']()&&this['terrainTag']()===VisuMZ[_0x3674ed(0x2cd)]['Settings']['TerrainTag'][_0x3674ed(0x3d0)];},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x176)]=function(){const _0x7ac1d1=_0x5075f1;if(this['isOnRope']())return 0x4;else{if(_0x7ac1d1(0x42c)===_0x7ac1d1(0x42c))return 0x2;else{function _0x189a29(){const _0x19fdea=_0x7ac1d1;this[_0x19fdea(0x1f6)]=_0x7709cf,this['_pageIndex']=-0x2,this['refresh']();}}}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x12a)]=Game_CharacterBase[_0x5075f1(0x173)]['update'],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x259)]=function(){const _0x1198ff=_0x5075f1;VisuMZ[_0x1198ff(0x2cd)]['Game_CharacterBase_update'][_0x1198ff(0x342)](this),this['updatePose']();},Game_CharacterBase[_0x5075f1(0x173)]['updatePose']=function(){const _0x23b504=_0x5075f1;this[_0x23b504(0xdd)]=this[_0x23b504(0xdd)]||0x0;if(this[_0x23b504(0xdd)]>0x0){this['_poseDuration']--;if(this[_0x23b504(0xdd)]<=0x0&&this[_0x23b504(0x4bd)]!==_0x23b504(0x316))this[_0x23b504(0x7b)]();}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x1b4)]=Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0xd0)],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0xd0)]=function(_0x52b959,_0x1274d6){const _0x383031=_0x5075f1;VisuMZ['EventsMoveCore']['Game_CharacterBase_moveDiagonally'][_0x383031(0x342)](this,_0x52b959,_0x1274d6);if(this[_0x383031(0xf6)]())this[_0x383031(0xff)](_0x52b959,_0x1274d6);},Game_CharacterBase['prototype']['setDiagonalDirection']=function(_0x27c142,_0x13c2ea){const _0x3fd293=_0x5075f1;if(_0x27c142===0x4&&_0x13c2ea===0x2)this[_0x3fd293(0x4e8)](0x1);if(_0x27c142===0x6&&_0x13c2ea===0x2)this[_0x3fd293(0x4e8)](0x3);if(_0x27c142===0x4&&_0x13c2ea===0x8)this['setDirection'](0x7);if(_0x27c142===0x6&&_0x13c2ea===0x8)this[_0x3fd293(0x4e8)](0x9);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x3d4)]=Game_CharacterBase[_0x5075f1(0x173)]['hasStepAnime'],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0xcc)]=function(){const _0x503616=_0x5075f1;if(this[_0x503616(0xe5)]()&&this[_0x503616(0xcb)]()===_0x503616(0x316))return!![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_hasStepAnime'][_0x503616(0x342)](this);},Game_CharacterBase['prototype']['setPose']=function(_0x4c179a,_0x3cc1d2){const _0x573223=_0x5075f1;if(_0x4c179a['match'](/Z/i))_0x4c179a='ZZZ';if(_0x4c179a[_0x573223(0x28d)](/SLEEP/i))_0x4c179a=_0x573223(0x316);this[_0x573223(0xf6)]()&&(this[_0x573223(0x4bd)]=_0x4c179a[_0x573223(0x4ba)]()[_0x573223(0x4d1)](),this[_0x573223(0xdd)]=_0x3cc1d2||Infinity);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0xcb)]=function(){const _0x48a10b=_0x5075f1;return this[_0x48a10b(0xf6)]()?(this[_0x48a10b(0x4bd)]||'')[_0x48a10b(0x4ba)]()[_0x48a10b(0x4d1)]():''[_0x48a10b(0x4ba)]()[_0x48a10b(0x4d1)]();},Game_CharacterBase['prototype'][_0x5075f1(0x24a)]=function(_0x1ac023,_0x5583a6){const _0x33b880=_0x5075f1;if(this[_0x33b880(0xf6)]()){if('KRHfy'!==_0x33b880(0x318)){function _0x279b9d(){const _0x5967d8=_0x33b880;if(_0x462fef['_scene']['constructor']===_0x48d8f9)return![];return _0x1a6c59[_0x5967d8(0x264)][_0x5967d8(0xd5)](_0x26c9ad);}}else{const _0x9d6460=['',_0x33b880(0x497),_0x33b880(0x191),_0x33b880(0x3c8),_0x33b880(0x3ff),_0x33b880(0x471),_0x33b880(0x2d6),'COBWEB','SILENCE',_0x33b880(0x160),'ZZZ','','','','',''][_0x1ac023];this[_0x33b880(0x269)](_0x9d6460,_0x5583a6);}}},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x7b)]=function(){const _0x42f444=_0x5075f1;this[_0x42f444(0x4bd)]='',this['_poseDuration']=0x0;},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0xe5)]=function(){const _0x41d049=_0x5075f1;return this[_0x41d049(0xf6)]()&&!!this[_0x41d049(0x4bd)];},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x3f0)]=function(){const _0xc069ac=_0x5075f1,_0x4089e9=this[_0xc069ac(0x4bd)][_0xc069ac(0x4ba)]();switch(this[_0xc069ac(0x4bd)]['toUpperCase']()[_0xc069ac(0x4d1)]()){case'ITEM':case _0xc069ac(0xc6):case'VICTORY':case _0xc069ac(0xea):case _0xc069ac(0x7c):case _0xc069ac(0x514):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x5075f1(0x173)]['getPosingCharacterDirection']=function(){const _0x265b30=_0x5075f1;switch(this[_0x265b30(0x4bd)][_0x265b30(0x4ba)]()){case _0x265b30(0x497):case'QUESTION':case _0x265b30(0x3c8):case'!':case'?':return 0x2;break;case _0x265b30(0x3ff):case _0x265b30(0x471):case _0x265b30(0x2d6):return 0x4;break;case _0x265b30(0x11c):case _0x265b30(0xc6):case'VICTORY':case'COBWEB':case'SILENCE':case'LIGHT\x20BULB':return 0x6;break;case'HURT':case _0x265b30(0x7c):case _0x265b30(0x514):case'ZZZ':case _0x265b30(0x20e):return 0x8;break;default:return VisuMZ[_0x265b30(0x2cd)]['Game_CharacterBase_setDirection'][_0x265b30(0x342)](this);break;}},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x207)]=function(){const _0x602be5=_0x5075f1;switch(this[_0x602be5(0x4bd)][_0x602be5(0x4ba)]()){case _0x602be5(0x11c):case'HURT':case _0x602be5(0x497):case'!':case _0x602be5(0x3ff):case _0x602be5(0x296):return 0x0;break;case'HMPH':case _0x602be5(0x7c):case'QUESTION':case'?':case'ANGER':case'SILENCE':return 0x1;break;case _0x602be5(0xa4):case'COLLAPSE':case _0x602be5(0x3c8):case _0x602be5(0x2d6):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x602be5(0x2cd)][_0x602be5(0x237)][_0x602be5(0x342)](this);break;}},Game_CharacterBase['prototype']['forceCarrying']=function(){const _0x9f2ac7=_0x5075f1;this[_0x9f2ac7(0x247)]=!![];},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0xe2)]=function(){const _0x2692f1=_0x5075f1;this[_0x2692f1(0x247)]=![];},Game_CharacterBase['prototype']['forceDashing']=function(){this['_forceDashing']=!![];},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x22f)]=function(){const _0x241767=_0x5075f1;this[_0x241767(0x300)]=![];},Game_CharacterBase['prototype']['isShadowVisible']=function(){const _0x559715=_0x5075f1;if(this[_0x559715(0x133)]())return![];if(this['_isObjectCharacter'])return![];if(this['_transparent'])return![];if(this[_0x559715(0x12f)]==='')return![];if(this[_0x559715(0x3e1)]===Game_Vehicle)return![];return!![];},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x134)]=function(){const _0x11be1a=_0x5075f1;if(this['isOnLadder']())return!![];if(this[_0x11be1a(0x3e1)]===Game_Player&&this[_0x11be1a(0x145)]())return!![];return![];},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x42d)]=function(){const _0x57a00f=_0x5075f1;return VisuMZ[_0x57a00f(0x2cd)][_0x57a00f(0x2eb)]['Movement'][_0x57a00f(0x491)];},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x2fa)]=function(){return this['screenX']();},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x1ca)]=function(){const _0x3f58c2=_0x5075f1;return this[_0x3f58c2(0x386)]()+this[_0x3f58c2(0x8c)]()+this[_0x3f58c2(0x1a1)]();},Game_Character['prototype'][_0x5075f1(0x389)]=function(_0x1a1c76,_0x4265f5){const _0x1306aa=_0x5075f1,_0x4dbb09=this[_0x1306aa(0x2fd)](),_0x3fe730=$gameMap[_0x1306aa(0x155)](),_0x42b022=[],_0x23dc16=[],_0x34a1b3=[],_0xe9b5d5={};let _0x1400f4=_0xe9b5d5;if(this['x']===_0x1a1c76&&this['y']===_0x4265f5){if('xqEKB'===_0x1306aa(0x197))return 0x0;else{function _0x2e1942(){const _0x4f4443=_0x1306aa;this[_0x4f4443(0x9e)][_0x4f4443(0x210)]=![];}}}_0xe9b5d5['parent']=null,_0xe9b5d5['x']=this['x'],_0xe9b5d5['y']=this['y'],_0xe9b5d5['g']=0x0,_0xe9b5d5['f']=$gameMap[_0x1306aa(0x409)](_0xe9b5d5['x'],_0xe9b5d5['y'],_0x1a1c76,_0x4265f5),_0x42b022[_0x1306aa(0x203)](_0xe9b5d5),_0x23dc16[_0x1306aa(0x203)](_0xe9b5d5['y']*_0x3fe730+_0xe9b5d5['x']);while(_0x42b022[_0x1306aa(0x13a)]>0x0){if(_0x1306aa(0x489)===_0x1306aa(0x489)){let _0x4b27ea=0x0;for(let _0x153655=0x0;_0x153655<_0x42b022[_0x1306aa(0x13a)];_0x153655++){if(_0x1306aa(0x309)===_0x1306aa(0x309))_0x42b022[_0x153655]['f']<_0x42b022[_0x4b27ea]['f']&&(_0x4b27ea=_0x153655);else{function _0x21009d(){const _0x3d2eb8=_0x1306aa;return _0x1c4f44[_0x3d2eb8(0xd8)](this)?_0x3fb131[_0x3d2eb8(0x173)][_0x3d2eb8(0xd8)][_0x3d2eb8(0x342)](this):{'iconIndex':0x0,'bufferX':_0x92d640[_0x3d2eb8(0x327)][_0x3d2eb8(0x1c9)],'bufferY':_0x33eec6[_0x3d2eb8(0x327)]['BufferY'],'blendMode':_0x43d1fc['Icon']['BlendMode']};}}}const _0x259a47=_0x42b022[_0x4b27ea],_0x4c4426=_0x259a47['x'],_0x4910f8=_0x259a47['y'],_0x4ce378=_0x4910f8*_0x3fe730+_0x4c4426,_0x16695d=_0x259a47['g'];_0x42b022[_0x1306aa(0x3ae)](_0x4b27ea,0x1),_0x23dc16[_0x1306aa(0x3ae)](_0x23dc16[_0x1306aa(0x236)](_0x4ce378),0x1),_0x34a1b3[_0x1306aa(0x203)](_0x4ce378);if(_0x259a47['x']===_0x1a1c76&&_0x259a47['y']===_0x4265f5){if(_0x1306aa(0x279)===_0x1306aa(0x279)){_0x1400f4=_0x259a47;break;}else{function _0x402af1(){return this['processMoveRouteFadeIn'](_0x555c6e(_0xda207d['$1']));}}}if(_0x16695d>=_0x4dbb09)continue;const _0x338006=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x2f914a=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x4d40a5=0x1;_0x4d40a5<0xa;_0x4d40a5++){if(_0x4d40a5===0x5)continue;const _0x4d868d=_0x4d40a5,_0xf62cb5=_0x338006[_0x4d40a5],_0x4105fd=_0x2f914a[_0x4d40a5],_0x5f11d4=$gameMap['roundXWithDirection'](_0x4c4426,_0x4d868d),_0x1c3c35=$gameMap[_0x1306aa(0x459)](_0x4910f8,_0x4d868d),_0x5cf3f3=_0x1c3c35*_0x3fe730+_0x5f11d4;if(_0x34a1b3[_0x1306aa(0xd5)](_0x5cf3f3)){if(_0x1306aa(0x298)===_0x1306aa(0x1bc)){function _0x19de5b(){const _0x52dc79=_0x1306aa,_0x43d376=_0x3de931[_0x52dc79(0x100)](this);if(!_0x43d376)return;this[_0x52dc79(0x2de)](_0x43d376['x'],_0x43d376['y']),this[_0x52dc79(0x4e8)](_0x43d376[_0x52dc79(0x93)]),this[_0x52dc79(0xe6)]===_0x43d376[_0x52dc79(0x424)]&&(this['_moveRouteIndex']=_0x43d376[_0x52dc79(0x2e1)]);}}else continue;}if(this[_0x1306aa(0x3e1)]===Game_Player&&VisuMZ[_0x1306aa(0x2cd)][_0x1306aa(0x2eb)][_0x1306aa(0x3ab)]['StrictCollision']){if(!this[_0x1306aa(0x47a)](_0x4c4426,_0x4910f8,_0xf62cb5))continue;if(!this[_0x1306aa(0x47a)](_0x4c4426,_0x4910f8,_0x4105fd))continue;}if(!this[_0x1306aa(0x223)](_0x4c4426,_0x4910f8,_0xf62cb5,_0x4105fd))continue;const _0x25958e=_0x16695d+0x1,_0x19e261=_0x23dc16['indexOf'](_0x5cf3f3);if(_0x19e261<0x0||_0x25958e<_0x42b022[_0x19e261]['g']){let _0x12be65={};if(_0x19e261>=0x0)_0x12be65=_0x42b022[_0x19e261];else{if(_0x1306aa(0x9a)!==_0x1306aa(0x1d0))_0x42b022[_0x1306aa(0x203)](_0x12be65),_0x23dc16['push'](_0x5cf3f3);else{function _0x1db735(){const _0x24c8bc=_0x1306aa;return _0x23537b[_0x24c8bc(0x44a)](this['_eventId'])&&_0x36e76a[_0x24c8bc(0x2cd)]['CustomPageConditions'][_0x24c8bc(0x1b7)](_0x254ff6[_0x24c8bc(0x32a)],this[_0x24c8bc(0x1a8)]);}}}_0x12be65[_0x1306aa(0x268)]=_0x259a47,_0x12be65['x']=_0x5f11d4,_0x12be65['y']=_0x1c3c35,_0x12be65['g']=_0x25958e,_0x12be65['f']=_0x25958e+$gameMap[_0x1306aa(0x409)](_0x5f11d4,_0x1c3c35,_0x1a1c76,_0x4265f5);if(!_0x1400f4||_0x12be65['f']-_0x12be65['g']<_0x1400f4['f']-_0x1400f4['g']){if(_0x1306aa(0x1a7)!=='Qzcni'){function _0x376ec1(){const _0x9fa446=_0x1306aa;if(_0x182512[_0x9fa446(0x436)])this[_0x9fa446(0x1f8)](_0x4f0cfe[_0x9fa446(0x436)]);}}else _0x1400f4=_0x12be65;}}}}else{function _0x24071c(){const _0x4aa737=_0x1306aa;this[_0x4aa737(0x34d)](_0x377fc9[_0x4aa737(0x466)],_0x248253[_0x4aa737(0x437)],!![]);}}}let _0x4163ba=_0x1400f4;while(_0x4163ba[_0x1306aa(0x268)]&&_0x4163ba[_0x1306aa(0x268)]!==_0xe9b5d5){_0x4163ba=_0x4163ba[_0x1306aa(0x268)];}const _0x8cc6f4=$gameMap[_0x1306aa(0x219)](_0x4163ba['x'],_0xe9b5d5['x']),_0x2cb13d=$gameMap[_0x1306aa(0xad)](_0x4163ba['y'],_0xe9b5d5['y']);if(_0x8cc6f4<0x0&&_0x2cb13d>0x0)return 0x1;if(_0x8cc6f4>0x0&&_0x2cb13d>0x0)return 0x3;if(_0x8cc6f4<0x0&&_0x2cb13d<0x0)return 0x7;if(_0x8cc6f4>0x0&&_0x2cb13d<0x0)return 0x9;if(_0x2cb13d>0x0)return 0x2;if(_0x8cc6f4<0x0)return 0x4;if(_0x8cc6f4>0x0)return 0x6;if(_0x2cb13d<0x0)return 0x8;const _0x3a7845=this['deltaXFrom'](_0x1a1c76),_0x4e8fe6=this[_0x1306aa(0x18c)](_0x4265f5);if(Math['abs'](_0x3a7845)>Math[_0x1306aa(0x418)](_0x4e8fe6)){if(_0x1306aa(0x2a8)===_0x1306aa(0x2a8))return _0x3a7845>0x0?0x4:0x6;else{function _0xb7bd39(){return this['setDirection'](0x3);}}}else{if(_0x4e8fe6!==0x0)return _0x4e8fe6>0x0?0x8:0x2;}return 0x0;},VisuMZ['EventsMoveCore'][_0x5075f1(0x1fb)]=Game_CharacterBase[_0x5075f1(0x173)]['canPass'],Game_CharacterBase[_0x5075f1(0x173)]['canPass']=function(_0x13d1ac,_0x48b53b,_0x3007d8){const _0x50017d=_0x5075f1;return this[_0x50017d(0x31c)]===_0x50017d(0x120)?this[_0x50017d(0x163)]()[_0x50017d(0x2f9)](_0x13d1ac,_0x48b53b,_0x3007d8):VisuMZ[_0x50017d(0x2cd)][_0x50017d(0x1fb)][_0x50017d(0x342)](this,_0x13d1ac,_0x48b53b,_0x3007d8);},Game_CharacterBase[_0x5075f1(0x173)]['clearSpriteOffsets']=function(){const _0x2d9644=_0x5075f1;this[_0x2d9644(0x213)]=0x0,this[_0x2d9644(0x136)]=0x0;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x394)]=Game_CharacterBase[_0x5075f1(0x173)]['screenX'],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x111)]=function(){const _0x2c8a77=_0x5075f1;return VisuMZ[_0x2c8a77(0x2cd)]['Game_CharacterBase_screenX']['call'](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x5075f1(0x2cd)]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x386)],Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x386)]=function(){const _0x6cbd40=_0x5075f1;return VisuMZ['EventsMoveCore'][_0x6cbd40(0x218)]['call'](this)+(this[_0x6cbd40(0x136)]||0x0);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x49e)]=function(){this['_stepPattern']='';},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x9c)]=Game_CharacterBase[_0x5075f1(0x173)]['updatePattern'],Game_CharacterBase[_0x5075f1(0x173)]['updatePattern']=function(){const _0x3234d6=_0x5075f1;if(this[_0x3234d6(0x445)])return;if(this['updatePatternEventsMoveCore']())return;VisuMZ[_0x3234d6(0x2cd)]['Game_CharacterBase_updatePattern'][_0x3234d6(0x342)](this);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x28f)]=function(){const _0x22e926=_0x5075f1;if(!this[_0x22e926(0xcc)]()&&this[_0x22e926(0x8f)]>0x0)return![];switch(String(this['_stepPattern'])[_0x22e926(0x4ba)]()[_0x22e926(0x4d1)]()){case'LEFT\x20TO\x20RIGHT':this[_0x22e926(0x15b)]+=0x1;if(this[_0x22e926(0x15b)]>0x2)this[_0x22e926(0x211)](0x0);break;case _0x22e926(0x22c):this[_0x22e926(0x15b)]-=0x1;if(this['_pattern']<0x0)this[_0x22e926(0x211)](0x2);break;case _0x22e926(0x156):case _0x22e926(0x79):this[_0x22e926(0xcd)]();break;case _0x22e926(0x313):case _0x22e926(0x3f7):case _0x22e926(0x49d):case _0x22e926(0x76):this[_0x22e926(0x26f)]();break;default:return![];}return!![];},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0xd8)]=function(){const _0x36e3db=_0x5075f1;return $gameSystem[_0x36e3db(0xd8)](this);},Game_CharacterBase[_0x5075f1(0x173)]['hasEventIcon']=function(){const _0x32c7ea=_0x5075f1,_0x5c9d10=this[_0x32c7ea(0xd8)]();if(!_0x5c9d10)return![];return _0x5c9d10['iconIndex']>0x0;},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x1c6)]=function(){const _0x1af9df=_0x5075f1,_0x515949=this[_0x1af9df(0x93)]();return $gameMap[_0x1af9df(0x32d)](this['x'],_0x515949);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x4a6)]=function(){const _0x2522cb=_0x5075f1,_0x30a855=this[_0x2522cb(0x93)]();return $gameMap['roundYWithDirection'](this['y'],_0x30a855);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x3bc)]=function(){const _0xc48f0e=_0x5075f1,_0x402950=this[_0xc48f0e(0x4c2)](this[_0xc48f0e(0x93)]());return $gameMap[_0xc48f0e(0x32d)](this['x'],_0x402950);},Game_CharacterBase[_0x5075f1(0x173)][_0x5075f1(0x179)]=function(){const _0x274d64=_0x5075f1,_0x57322e=this[_0x274d64(0x4c2)](this[_0x274d64(0x93)]());return $gameMap[_0x274d64(0x459)](this['y'],_0x57322e);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x473)]=Game_Character['prototype']['setMoveRoute'],Game_Character['prototype'][_0x5075f1(0x12b)]=function(_0x1ebbd4){const _0x260dc5=_0x5075f1;route=JsonEx[_0x260dc5(0x3aa)](_0x1ebbd4),VisuMZ[_0x260dc5(0x2cd)]['Game_Character_setMoveRoute'][_0x260dc5(0x342)](this,route);},VisuMZ[_0x5075f1(0x2cd)]['Game_Character_forceMoveRoute']=Game_Character[_0x5075f1(0x173)]['forceMoveRoute'],Game_Character[_0x5075f1(0x173)]['forceMoveRoute']=function(_0x12b43c){const _0x1110df=_0x5075f1;route=JsonEx[_0x1110df(0x3aa)](_0x12b43c),VisuMZ[_0x1110df(0x2cd)][_0x1110df(0x83)][_0x1110df(0x342)](this,route);},VisuMZ[_0x5075f1(0x2cd)]['Game_Character_processMoveCommand']=Game_Character['prototype'][_0x5075f1(0x1be)],Game_Character['prototype'][_0x5075f1(0x1be)]=function(_0x5bdd20){const _0x67f74e=_0x5075f1,_0x363b03=Game_Character,_0x5277c4=_0x5bdd20[_0x67f74e(0x1f4)];if(_0x5bdd20[_0x67f74e(0x496)]===_0x363b03[_0x67f74e(0x4b1)]){let _0x1d3f93=_0x5bdd20[_0x67f74e(0x1f4)][0x0];_0x1d3f93=this[_0x67f74e(0xdf)](_0x1d3f93),_0x1d3f93=this[_0x67f74e(0x2d7)](_0x1d3f93),this[_0x67f74e(0x175)](_0x5bdd20,_0x1d3f93);}else VisuMZ[_0x67f74e(0x2cd)]['Game_Character_processMoveCommand'][_0x67f74e(0x342)](this,_0x5bdd20);},Game_Character['prototype']['convertVariableValuesInScriptCall']=function(_0x96c69e){const _0x5f358b=_0x5075f1,_0x393c2f=/\$gameVariables\.value\((\d+)\)/gi,_0xdb37c=/\\V\[(\d+)\]/gi;while(_0x96c69e[_0x5f358b(0x28d)](_0x393c2f)){_0x96c69e=_0x96c69e[_0x5f358b(0x115)](_0x393c2f,(_0x300705,_0x5db3d5)=>$gameVariables['value'](parseInt(_0x5db3d5)));}while(_0x96c69e['match'](_0xdb37c)){if('uNHtU'===_0x5f358b(0x126)){function _0x3ec279(){const _0x4d9bd7=_0x5f358b;return _0x377995['EventsMoveCore'][_0x4d9bd7(0x2eb)]['Label'][_0x4d9bd7(0x15a)];}}else _0x96c69e=_0x96c69e[_0x5f358b(0x115)](_0xdb37c,(_0x13e315,_0x327f60)=>$gameVariables[_0x5f358b(0x3c7)](parseInt(_0x327f60)));}return _0x96c69e;},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x2d7)]=function(_0x31905e){const _0x2d9301=_0x5075f1,_0x442045=/\\SELFVAR\[(\d+)\]/gi;while(_0x31905e[_0x2d9301(0x28d)](_0x442045)){_0x31905e=_0x31905e[_0x2d9301(0x115)](_0x442045,(_0x151ebc,_0x372982)=>getSelfVariableValue(this[_0x2d9301(0x24b)],this['_eventId'],parseInt(_0x372982)));}return _0x31905e;},Game_Character['prototype'][_0x5075f1(0x175)]=function(_0x388aa8,_0x2678ec){const _0x2c86a3=_0x5075f1;if(_0x2678ec[_0x2c86a3(0x28d)](/ANIMATION:[ ](\d+)/i)){if(_0x2c86a3(0x226)!==_0x2c86a3(0x226)){function _0xff30a0(){this['executeMove'](_0x187d94);}}else return this['processMoveRouteAnimation'](Number(RegExp['$1']));}if(_0x2678ec[_0x2c86a3(0x28d)](/BALLOON:[ ](.*)/i)){if('pjKDQ'==='Zteie'){function _0x3bda8b(){const _0x219562=_0x2c86a3;_0x41c9ae==='left'?this[_0x219562(0x26f)]():this[_0x219562(0xcd)]();}}else return this['processMoveRouteBalloon'](String(RegExp['$1']));}if(_0x2678ec[_0x2c86a3(0x28d)](/FADE IN:[ ](\d+)/i)){if(_0x2c86a3(0x4bc)===_0x2c86a3(0x4bc))return this[_0x2c86a3(0x4cf)](Number(RegExp['$1']));else{function _0x49df6a(){const _0xb63df8=_0x2c86a3;if(this[_0xb63df8(0x2ee)](_0x136d62,_0x350009))return![];if(!this['isSpawnHitboxCollisionOk'](_0x5d261c,_0x5b589b,_0x5d52dc))return![];}}}if(_0x2678ec['match'](/FADE OUT:[ ](\d+)/i))return this[_0x2c86a3(0x9b)](Number(RegExp['$1']));if(_0x2678ec['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x2c86a3(0x165)]();if(_0x2678ec[_0x2c86a3(0x28d)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x2c86a3(0xe2)]();if(_0x2678ec[_0x2c86a3(0x28d)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x2c86a3(0x171)]();if(_0x2678ec[_0x2c86a3(0x28d)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x2c86a3(0x22f)]();if(_0x2678ec[_0x2c86a3(0x28d)](/HUG:[ ]LEFT/i)){if(_0x2c86a3(0x106)===_0x2c86a3(0x334)){function _0x74a6f6(){const _0x120f42=_0x2c86a3;_0x1dc82f[_0x120f42(0x3fa)](_0x120f42(0x4b0)[_0x120f42(0x184)](_0x401304));}}else return this[_0x2c86a3(0x86)]('left');}if(_0x2678ec[_0x2c86a3(0x28d)](/HUG:[ ]RIGHT/i)){if(_0x2c86a3(0x10c)===_0x2c86a3(0x10c))return this[_0x2c86a3(0x86)]('right');else{function _0x25fe5b(){const _0x585274=_0x2c86a3;_0x536043[_0x585274(0x228)](_0x4f728f,_0x57c013);const _0x15ed40=_0x3b58a7[_0x585274(0x414)]();_0x439684[_0x585274(0x3fe)]=_0x5ea386[_0x585274(0x3fe)]||_0xe2433a['mapId']();const _0x3f8334=[_0x24d3ab[_0x585274(0x3fe)],_0x2b14f6[_0x585274(0x380)]||_0x15ed40[_0x585274(0x437)](),_0x585274(0x4a9)[_0x585274(0x184)](_0x4a029c['VariableId'])],_0x5dec68=_0x48d243[_0x585274(0x1e1)],_0x1730bd=_0x2c9b3f[_0x585274(0x3c7)](_0x3f8334)||![];_0x2a6335[_0x585274(0x423)](_0x5dec68,_0x1730bd);}}}if(_0x2678ec['match'](/INDEX:[ ](\d+)/i)){if(_0x2c86a3(0x1d5)===_0x2c86a3(0x1d5))return this[_0x2c86a3(0x2d9)](Number(RegExp['$1']));else{function _0x20910e(){const _0x25147e=_0x2c86a3;return this[_0x25147e(0x22f)]();}}}if(_0x2678ec['match'](/INDEX:[ ]([\+\-]\d+)/i)){if('HXDtx'===_0x2c86a3(0x141)){const _0x345496=this[_0x2c86a3(0x377)]+Number(RegExp['$1']);return this[_0x2c86a3(0x2d9)](_0x345496);}else{function _0x8cbef0(){return _0x22f8af>0x0?0x4:0x6;}}}if(_0x2678ec[_0x2c86a3(0x28d)](/JUMP FORWARD:[ ](\d+)/i)){if(_0x2c86a3(0x51c)===_0x2c86a3(0x51c))return this[_0x2c86a3(0xd9)](Number(RegExp['$1']));else{function _0x3dee9a(){const _0x2429c2=_0x2c86a3;this[_0x2429c2(0x300)]=![];}}}if(_0x2678ec[_0x2c86a3(0x28d)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x2c86a3(0x426)===_0x2c86a3(0x302)){function _0x61b3c0(){const _0x4a747c=_0x2c86a3;this[_0x4a747c(0x329)](_0xa25d8d['_mapId'],_0x38e834['_eventId']);}}else return this[_0x2c86a3(0x271)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x2678ec[_0x2c86a3(0x28d)](/JUMP TO EVENT:[ ](\d+)/i)){if(_0x2c86a3(0x1d2)!=='zWCYs'){const _0x460833=$gameMap[_0x2c86a3(0x44a)](Number(RegExp['$1']));return this[_0x2c86a3(0xa5)](_0x460833);}else{function _0x1633fe(){const _0x189a01=_0x2c86a3;_0xa2df15[_0x189a01(0x4b5)](_0x4f9931[_0x189a01(0x435)]),_0x412225[_0x189a01(0x2cd)][_0x189a01(0x1f5)]['call'](this),_0x33ea40[_0x189a01(0x186)](),_0x471c47[_0x189a01(0x435)]=_0x134eb3;}}}if(_0x2678ec['match'](/JUMP TO PLAYER/i))return this['processMoveRouteJumpToCharacter']($gamePlayer);if(_0x2678ec['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x3940f5=String(RegExp['$1']);return this[_0x2c86a3(0x102)](_0x3940f5);}if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x28d7d9=Number(RegExp['$1']),_0x64db55=Number(RegExp['$2']);return this['processMoveRouteMoveTo'](_0x28d7d9,_0x64db55);}if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x5816b5=$gameMap[_0x2c86a3(0x44a)](Number(RegExp['$1']));return this['processMoveRouteMoveToCharacter'](_0x5816b5);}if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE TO PLAYER/i))return this[_0x2c86a3(0x322)]($gamePlayer);if(_0x2678ec['match'](/MOVE LOWER LEFT:[ ](\d+)/i)){if(_0x2c86a3(0x2fe)==='YnZKo'){function _0x1097dc(){const _0x393f67=_0x2c86a3,_0x3bf399=_0x5ce6ed[_0x393f67(0x304)][_0x4ec7ca];if(!_0x3bf399)return;_0x5c945a=_0x3bf399[_0x393f67(0x4c8)],_0x1fa846=_0x3bf399[_0x393f67(0x43c)];}}else return this['processMoveRouteMoveRepeat'](0x1,Number(RegExp['$1']));}if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE DOWN:[ ](\d+)/i)){if(_0x2c86a3(0x117)!==_0x2c86a3(0x480))return this[_0x2c86a3(0x4b6)](0x2,Number(RegExp['$1']));else{function _0x319a14(){const _0x213961=_0x2c86a3;this[_0x213961(0x502)][_0x213961(0xeb)]['x']=_0x370c39[_0x213961(0x97)](0x0,this['_shadowSprite'][_0x213961(0xeb)]['x']-0.1),this[_0x213961(0x502)][_0x213961(0xeb)]['y']=_0x214ea9[_0x213961(0x97)](0x0,this['_shadowSprite'][_0x213961(0xeb)]['y']-0.1);}}}if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x2c86a3(0x4b6)](0x3,Number(RegExp['$1']));if(_0x2678ec['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x2c86a3(0x4b6)](0x4,Number(RegExp['$1']));if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x2c86a3(0x4b6)](0x6,Number(RegExp['$1']));if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x2c86a3(0x4b6)](0x7,Number(RegExp['$1']));if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE UP:[ ](\d+)/i)){if(_0x2c86a3(0x27b)===_0x2c86a3(0x27b))return this[_0x2c86a3(0x4b6)](0x8,Number(RegExp['$1']));else{function _0x3cc205(){const _0xd84f7f=_0x2c86a3;this[_0xd84f7f(0x2c0)]=![];}}}if(_0x2678ec[_0x2c86a3(0x28d)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x2c86a3(0x4b6)](0x9,Number(RegExp['$1']));if(_0x2678ec[_0x2c86a3(0x28d)](/OPACITY:[ ](\d+)([%％])/i)){if(_0x2c86a3(0x17d)===_0x2c86a3(0x71)){function _0x2bac20(){const _0x525f66=_0x2c86a3;return this[_0x525f66(0x4af)](_0x517d0d);}}else{const _0x112b31=Math[_0x2c86a3(0xba)](Number(RegExp['$1'])/0x64*0xff);return this[_0x2c86a3(0x2d5)](_0x112b31['clamp'](0x0,0xff));}}if(_0x2678ec['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x40d48d=this[_0x2c86a3(0xfa)]+Math[_0x2c86a3(0xba)](Number(RegExp['$1'])/0x64*0xff);return this[_0x2c86a3(0x2d5)](_0x40d48d[_0x2c86a3(0x256)](0x0,0xff));}if(_0x2678ec[_0x2c86a3(0x28d)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x421538=this[_0x2c86a3(0xfa)]+Number(RegExp['$1']);return this[_0x2c86a3(0x2d5)](_0x421538['clamp'](0x0,0xff));}if(_0x2678ec[_0x2c86a3(0x28d)](/PATTERN LOCK:[ ](\d+)/i)){if(_0x2c86a3(0x31d)!==_0x2c86a3(0x31d)){function _0x6d4921(){const _0x28e4b9=_0x2c86a3;this[_0x28e4b9(0x1a9)]=0x0;if(this[_0x28e4b9(0x455)]()){const _0x5d3964=_0x3dfa58[_0x28e4b9(0x2cd)][_0x28e4b9(0x2eb)]['Movement'],_0x288524=this[_0x28e4b9(0x371)][_0x28e4b9(0x93)]();let _0x255d1d=0x0;if([0x1,0x4,0x7][_0x28e4b9(0xd5)](_0x288524))_0x255d1d=_0x5d3964[_0x28e4b9(0x404)];if([0x3,0x6,0x9][_0x28e4b9(0xd5)](_0x288524))_0x255d1d=_0x5d3964[_0x28e4b9(0x143)];[0x2,0x8][_0x28e4b9(0xd5)](_0x288524)&&(_0x255d1d=[-_0x5d3964['TiltVert'],0x0,_0x5d3964['TiltVert']][this[_0x28e4b9(0x371)]['pattern']()]);if(this['_reflection'])_0x255d1d*=-0x1;this[_0x28e4b9(0x1a9)]=_0x255d1d;}}}else return this[_0x2c86a3(0x501)](Number(RegExp['$1']));}if(_0x2678ec[_0x2c86a3(0x28d)](/PATTERN UNLOCK/i))return this[_0x2c86a3(0x445)]=![];if(_0x2678ec[_0x2c86a3(0x28d)](/POSE:[ ](.*)/i)){const _0x8ee6ce=String(RegExp['$1'])[_0x2c86a3(0x4ba)]()[_0x2c86a3(0x4d1)]();return this[_0x2c86a3(0x269)](_0x8ee6ce);}if(_0x2678ec[_0x2c86a3(0x28d)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x419d4e=Number(RegExp['$1']),_0x2b7862=Number(RegExp['$2']);return this[_0x2c86a3(0x319)](_0x419d4e,_0x2b7862);}if(_0x2678ec[_0x2c86a3(0x28d)](/STEP TOWARD EVENT:[ ](\d+)/i)){if(_0x2c86a3(0x453)===_0x2c86a3(0x25d)){function _0xbaec3(){const _0x224ad2=_0x2c86a3;return _0x53e742[_0x224ad2(0x2cd)]['Game_Player_getInputDirection']['call'](this);}}else{const _0x2993f4=$gameMap[_0x2c86a3(0x44a)](Number(RegExp['$1']));return this[_0x2c86a3(0x3b5)](_0x2993f4);}}if(_0x2678ec[_0x2c86a3(0x28d)](/STEP TOWARD PLAYER/i)){if(_0x2c86a3(0x24d)===_0x2c86a3(0xc0)){function _0x1bdf0d(){const _0x28d780=_0x2c86a3;this[_0x28d780(0x435)]=_0x4e8ba6[_0x28d780(0x96)](),_0x5d2697[_0x28d780(0x2cd)][_0x28d780(0x2b3)][_0x28d780(0x342)](this,_0x35b6ca,_0x403982);}}else return this[_0x2c86a3(0x2e8)]($gamePlayer);}if(_0x2678ec[_0x2c86a3(0x28d)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2c86a3(0x2d2)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2678ec['match'](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if(_0x2c86a3(0x110)==='tSspK'){const _0xd68398=$gameMap['event'](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0xd68398);}else{function _0xf0003f(){const _0x4d9806=_0x2c86a3;if(_0xc07239[_0x4d9806(0x28d)](/Z/i))_0x539dd1=_0x4d9806(0x316);if(_0xe50b24[_0x4d9806(0x28d)](/SLEEP/i))_0x3f7f08=_0x4d9806(0x316);this['isSpriteVS8dir']()&&(this[_0x4d9806(0x4bd)]=_0xc84808[_0x4d9806(0x4ba)]()['trim'](),this[_0x4d9806(0xdd)]=_0x2fd461||_0x124c98);}}}if(_0x2678ec['match'](/STEP AWAY FROM PLAYER/i))return this['moveAwayFromCharacter']($gamePlayer);if(_0x2678ec[_0x2c86a3(0x28d)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('SZipW'==='SZipW')return this[_0x2c86a3(0xd4)](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x3283ad(){const _0x44063b=_0x2c86a3;this[_0x44063b(0x3c9)]=!![];return;}}}if(_0x2678ec[_0x2c86a3(0x28d)](/TURN TO EVENT:[ ](\d+)/i)){if('uYUDO'===_0x2c86a3(0x16d)){function _0x17530b(){const _0x410794=_0x2c86a3,_0x1eeeea=_0x52cf2a['round'](_0xb480a4-this['x']),_0x2614c0=_0x2c3aff[_0x410794(0xba)](_0x2b1017-this['y']);this['jump'](_0x1eeeea,_0x2614c0);}}else{const _0x14bbf=$gameMap['event'](Number(RegExp['$1']));return this['turnTowardCharacter'](_0x14bbf);}}if(_0x2678ec['match'](/TURN TO PLAYER/i)){if(_0x2c86a3(0x105)===_0x2c86a3(0x105))return this[_0x2c86a3(0x224)]($gamePlayer);else{function _0x1a2602(){const _0x127874=_0x2c86a3,_0x5d9d56=this[_0x127874(0x305)],_0x272d47=_0x4160a0[this[_0x127874(0x3e9)]],_0x11e0fc=_0x272d47[_0x127874(0x349)][_0x5d9d56['eventId']];if(_0x11e0fc&&_0x11e0fc[_0x127874(0x10f)][_0x5d9d56[_0x127874(0x472)]-0x1]){const _0x1947e0=_0x11e0fc['pages'][_0x5d9d56[_0x127874(0x472)]-0x1][_0x127874(0x16c)];this['setupChild'](_0x1947e0,this[_0x127874(0x437)]());}_0x11060d[this[_0x127874(0x3e9)]]=_0x1b9a9e,this['_callEventMap']=_0x5f4623,this[_0x127874(0x305)]=_0x2fa819;}}}if(_0x2678ec[_0x2c86a3(0x28d)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2678ec[_0x2c86a3(0x28d)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if('QIdOT'!==_0x2c86a3(0x10d)){function _0x24bcfe(){const _0x26aa37=_0x2c86a3;_0x4a850c===_0x26aa37(0x4fa)?this[_0x26aa37(0xcd)]():this['turnLeft90']();}}else{const _0xa882f5=$gameMap[_0x2c86a3(0x44a)](Number(RegExp['$1']));return this[_0x2c86a3(0x132)](_0xa882f5);}}if(_0x2678ec[_0x2c86a3(0x28d)](/TURN AWAY FROM PLAYER/i))return this[_0x2c86a3(0x132)]($gamePlayer);if(_0x2678ec['match'](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x2678ec['match'](/TURN LOWER RIGHT/i)){if('kCvVa'===_0x2c86a3(0x221))return this[_0x2c86a3(0x4e8)](0x3);else{function _0x12fa7f(){const _0xf567a6=_0x2c86a3;_0x2045e9[_0xf567a6(0x429)][_0xcb5e05][_0xf567a6(0x28d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x11d53e=_0xf567a6(0xe9)['format'](_0x1d5c19(_0x1f7147['$1']));_0x1ed635[_0xf567a6(0x425)][_0x649180]=new _0x1d12b5(_0xf567a6(0x324),_0x11d53e);}}}if(_0x2678ec[_0x2c86a3(0x28d)](/TURN UPPER LEFT/i))return this[_0x2c86a3(0x4e8)](0x7);if(_0x2678ec[_0x2c86a3(0x28d)](/TURN UPPER RIGHT/i)){if(_0x2c86a3(0x267)!==_0x2c86a3(0x44c))return this[_0x2c86a3(0x4e8)](0x9);else{function _0x17a6f7(){const _0x1521ee=_0x2c86a3;_0x2cd34e[_0x1521ee(0x4d0)](_0x1efd28)?this['setSelfValue'](_0x14f740,_0x37974e):_0x16f68d[_0x1521ee(0x2cd)][_0x1521ee(0xa0)][_0x1521ee(0x342)](this,_0x13542b,_0x568a39);}}}if(_0x2678ec[_0x2c86a3(0x28d)](/Self Switch[ ](.*):[ ](.*)/i)){if('zNNHP'===_0x2c86a3(0x29c)){function _0x3e3838(){const _0x4135f1=_0x2c86a3,_0x2235cc=_0x16aa8c[_0x4135f1(0x4b7)](this);_0x2235cc&&_0x2235cc[_0x4135f1(0x502)]&&_0x2235cc['_shadowSprite'][_0x4135f1(0xb3)]!==this[_0x4135f1(0x42d)]()&&(_0x2235cc[_0x4135f1(0x502)][_0x4135f1(0xb3)]=this[_0x4135f1(0x42d)](),_0x2235cc['_shadowSprite'][_0x4135f1(0x26d)]=_0x963617[_0x4135f1(0x8e)](_0x2235cc[_0x4135f1(0x502)][_0x4135f1(0xb3)]));}}else return this[_0x2c86a3(0x30c)](RegExp['$1'],RegExp['$2']);}if(_0x2678ec[_0x2c86a3(0x28d)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x2c86a3(0x48c)](RegExp['$1'],RegExp['$2']);if(_0x2678ec[_0x2c86a3(0x28d)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2c86a3(0x401)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2678ec[_0x2c86a3(0x28d)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0xbb250=$gameMap[_0x2c86a3(0x44a)](Number(RegExp['$1']));return this[_0x2c86a3(0xe7)](_0xbb250);}if(_0x2678ec[_0x2c86a3(0x28d)](/TELEPORT TO PLAYER/i))return this[_0x2c86a3(0xe7)]($gamePlayer);try{if(_0x2c86a3(0x1b8)!==_0x2c86a3(0x4f5))VisuMZ[_0x2c86a3(0x2cd)][_0x2c86a3(0x25c)]['call'](this,_0x388aa8);else{function _0x51b4d3(){if(_0x2f7ca2>0x0&&_0x5dc5c3<0x0)return 0x1;if(_0x428e04<0x0&&_0x91d069<0x0)return 0x3;if(_0x1e5661>0x0&&_0x5439d6>0x0)return 0x7;if(_0x126d4d<0x0&&_0x6384c2>0x0)return 0x9;}}}catch(_0x2d2e9b){if($gameTemp[_0x2c86a3(0x1ce)]())console[_0x2c86a3(0x3fa)](_0x2d2e9b);}},Game_Character['prototype']['processMoveRouteAnimation']=function(_0x2d674e){const _0x1dc290=_0x5075f1;$gameTemp[_0x1dc290(0x4e7)]([this],_0x2d674e);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x11e)]=function(_0x1f9c4f){const _0x19a78b=_0x5075f1;let _0x33e645=0x0;switch(_0x1f9c4f[_0x19a78b(0x4ba)]()[_0x19a78b(0x4d1)]()){case'!':case'EXCLAMATION':_0x33e645=0x1;break;case'?':case _0x19a78b(0x191):_0x33e645=0x2;break;case _0x19a78b(0x2e5):case'NOTE':case _0x19a78b(0x3c8):case _0x19a78b(0x383):case _0x19a78b(0x2a1):_0x33e645=0x3;break;case _0x19a78b(0x3ff):case _0x19a78b(0xf9):_0x33e645=0x4;break;case _0x19a78b(0x471):_0x33e645=0x5;break;case'SWEAT':_0x33e645=0x6;break;case _0x19a78b(0x296):case _0x19a78b(0x36c):case _0x19a78b(0x1f2):_0x33e645=0x7;break;case'SILENCE':case'...':_0x33e645=0x8;break;case'LIGHT':case _0x19a78b(0x263):case _0x19a78b(0x160):case _0x19a78b(0xd7):case _0x19a78b(0x101):_0x33e645=0x9;break;case'Z':case'ZZ':case _0x19a78b(0x316):case _0x19a78b(0x20e):_0x33e645=0xa;break;case'USER-DEFINED\x201':_0x33e645=0xb;break;case _0x19a78b(0x1a4):_0x33e645=0xc;break;case'USER-DEFINED\x203':_0x33e645=0xd;break;case'USER-DEFINED\x204':_0x33e645=0xe;break;case _0x19a78b(0x417):_0x33e645=0xf;break;}$gameTemp[_0x19a78b(0x50d)](this,_0x33e645);},Game_Character['prototype'][_0x5075f1(0x4cf)]=function(_0xff1870){const _0x183721=_0x5075f1;_0xff1870+=this[_0x183721(0xfa)],this[_0x183721(0x2d5)](_0xff1870[_0x183721(0x256)](0x0,0xff));if(this[_0x183721(0xfa)]<0xff)this[_0x183721(0x431)]--;},Game_Character['prototype'][_0x5075f1(0x9b)]=function(_0x29e5cf){const _0x151db0=_0x5075f1;_0x29e5cf=this[_0x151db0(0xfa)]-_0x29e5cf,this[_0x151db0(0x2d5)](_0x29e5cf[_0x151db0(0x256)](0x0,0xff));if(this['_opacity']>0x0)this[_0x151db0(0x431)]--;},Game_Character[_0x5075f1(0x173)]['processMoveRouteHugWall']=function(_0x4cc8c6){const _0x5497a8=_0x5075f1,_0x168fee=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x392dff=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x41a1b5=this['direction'](),_0x4c09fe=(_0x4cc8c6==='left'?_0x168fee:_0x392dff)[_0x41a1b5],_0x4d9ce7=(_0x4cc8c6===_0x5497a8(0x4fa)?_0x392dff:_0x168fee)[_0x41a1b5];if(this['canPass'](this['x'],this['y'],_0x4c09fe)){if(_0x4cc8c6==='left'){if(_0x5497a8(0x42b)===_0x5497a8(0x1ec)){function _0x92448e(){const _0x12462c=_0x5497a8;_0x165f62[_0x12462c(0x2cd)][_0x12462c(0x2f3)]['call'](this,_0x5371a4,_0x352aa4);}}else this['turnLeft90']();}else{if('UOlzH'!==_0x5497a8(0x1d7))this[_0x5497a8(0xcd)]();else{function _0x27e9bf(){const _0x1a721d=_0x5497a8;_0x486edd[_0x1a721d(0x228)](_0x2462db,_0x27e18f);const _0x1f1fd6=(_0x2eaf28[_0x1a721d(0x225)]||0x0)-0x1,_0x2bf005=!_0x18d65e['Chase'],_0x4b0878=_0x256f76[_0x1a721d(0x2af)]()[_0x1a721d(0x39f)](_0x1f1fd6);if(_0x4b0878)_0x4b0878[_0x1a721d(0x232)](_0x2bf005);}}}}else{if(!this[_0x5497a8(0x47a)](this['x'],this['y'],this[_0x5497a8(0x93)]())){if('GVmNW'!=='GVmNW'){function _0x27f78b(){const _0x1e5dee=_0x5497a8;this[_0x1e5dee(0x314)]=![];const _0x80d652=_0x5eaf3a[_0x1e5dee(0x508)]||'';_0x80d652[_0x1e5dee(0x28d)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x1e5dee(0x314)]=!![]);}}else{if(this[_0x5497a8(0x47a)](this['x'],this['y'],_0x4d9ce7)){if(_0x4cc8c6==='left'){if('zyIIs'==='feWjC'){function _0x1449b8(){const _0x1702ad=_0x5497a8,_0x50bcef=_0x2aa78a[_0x1702ad(0x32d)](_0x37f79d,_0x27212a),_0x5657f6=_0x8a68be[_0x1702ad(0x459)](_0x214785,_0x29d4ee),_0x285bf5=_0x35e1cd[_0x1702ad(0xb9)](_0x50bcef,_0x5657f6);return this[_0x1702ad(0x4da)][_0x1702ad(0xd5)](_0x285bf5);}}else this['turnRight90']();}else this[_0x5497a8(0x26f)]();}else{if('yEGwm'!==_0x5497a8(0x26c))this['turn180']();else{function _0x1aa658(){const _0x69e103=_0x5497a8;if(!this[_0x69e103(0x99)](_0x269d25,_0x4580ae))return![];}}}}}}this[_0x5497a8(0x47a)](this['x'],this['y'],this['direction']())&&this[_0x5497a8(0x23c)]();},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x2d9)]=function(_0x4a0904){const _0x4e9aac=_0x5075f1;if(ImageManager[_0x4e9aac(0x312)](this[_0x4e9aac(0x12f)]))return;_0x4a0904=_0x4a0904[_0x4e9aac(0x256)](0x0,0x7),this[_0x4e9aac(0x387)](this[_0x4e9aac(0x12f)],_0x4a0904);},Game_Character[_0x5075f1(0x173)]['processMoveRouteJumpForward']=function(_0x2451e5){const _0x48eeec=_0x5075f1;switch(this[_0x48eeec(0x93)]()){case 0x1:this[_0x48eeec(0x30d)](-_0x2451e5,_0x2451e5);break;case 0x2:this[_0x48eeec(0x30d)](0x0,_0x2451e5);break;case 0x3:this[_0x48eeec(0x30d)](_0x2451e5,_0x2451e5);break;case 0x4:this[_0x48eeec(0x30d)](-_0x2451e5,0x0);break;case 0x6:this['jump'](_0x2451e5,0x0);break;case 0x7:this[_0x48eeec(0x30d)](-_0x2451e5,-_0x2451e5);break;case 0x8:this[_0x48eeec(0x30d)](0x0,-_0x2451e5);break;case 0x9:this[_0x48eeec(0x30d)](_0x2451e5,-_0x2451e5);break;}},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x271)]=function(_0x27ebdb,_0x98c69c){const _0x110eb6=_0x5075f1,_0x5b3567=Math[_0x110eb6(0xba)](_0x27ebdb-this['x']),_0x477047=Math[_0x110eb6(0xba)](_0x98c69c-this['y']);this['jump'](_0x5b3567,_0x477047);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0xa5)]=function(_0x557f8e){const _0x445f26=_0x5075f1;if(_0x557f8e)this[_0x445f26(0x271)](_0x557f8e['x'],_0x557f8e['y']);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x319)]=function(_0x5c58c5,_0x290438){const _0xc5413b=_0x5075f1;let _0x592c14=0x0;if($gameMap['isSupportDiagonalMovement']()){if(_0xc5413b(0x37e)===_0xc5413b(0x390)){function _0x17965b(){const _0x4abf94=_0xc5413b,_0x54e4b7=_0x56dea9[_0x4abf94(0x2cd)][_0x4abf94(0x2eb)],_0x2e75d7=_0x4abf94(0x119)[_0x4abf94(0x184)](_0x128f2e[_0x4abf94(0x24b)],_0x4f479e[_0x4abf94(0x1a8)]);return this[_0x4abf94(0x3b8)][_0x2e75d7]=this[_0x4abf94(0x3b8)][_0x2e75d7]||{'iconIndex':0x0,'bufferX':_0x54e4b7[_0x4abf94(0x327)][_0x4abf94(0x1c9)],'bufferY':_0x54e4b7['Icon'][_0x4abf94(0xc2)],'blendMode':_0x54e4b7['Icon'][_0x4abf94(0x2c5)]},this[_0x4abf94(0x3b8)][_0x2e75d7];}}else _0x592c14=this[_0xc5413b(0x389)](_0x5c58c5,_0x290438);}else{if('FkGlD'==='odfbN'){function _0x52a4b4(){const _0x3d6e1f=_0xc5413b;if(_0x1adc2e&&_0x5f5d18[_0x3d6e1f(0x2f4)]())return _0x43781c[_0x3d6e1f(0x95)](),!![];}}else _0x592c14=this[_0xc5413b(0x25f)](_0x5c58c5,_0x290438);}this[_0xc5413b(0x3c1)](_0x592c14),this['setMovementSuccess'](!![]);},Game_Character['prototype'][_0x5075f1(0x3b5)]=function(_0x365370){const _0x2abc01=_0x5075f1;if(_0x365370)this[_0x2abc01(0x319)](_0x365370['x'],_0x365370['y']);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x347)]=function(_0x1905f1,_0x327b64){const _0x4501a9=_0x5075f1,_0x51654f=this[_0x4501a9(0xe3)](_0x1905f1),_0x35b29f=this[_0x4501a9(0x18c)](_0x327b64);},Game_Character['prototype'][_0x5075f1(0x102)]=function(_0x56f3db){const _0x100c72=_0x5075f1,_0x10bd9a=['',_0x100c72(0x42e),_0x100c72(0x372),_0x100c72(0x77),_0x100c72(0x2ef),'',_0x100c72(0x465),_0x100c72(0x291),'UP',_0x100c72(0x4ec)],_0x16a629=_0x10bd9a[_0x100c72(0x236)](_0x56f3db[_0x100c72(0x4ba)]()[_0x100c72(0x4d1)]());if(_0x16a629<=0x0)return;if(this[_0x100c72(0x47a)](this['x'],this['y'],_0x16a629)){if(_0x100c72(0x2c7)!==_0x100c72(0x2e7))this['executeMoveDir8'](_0x16a629),this[_0x100c72(0x431)]-=0x1;else{function _0x2b1ab5(){const _0x20f434=_0x100c72;if(this[_0x20f434(0x174)]===_0x1b5d27)this[_0x20f434(0x24f)]();if(this['_EventsMoveCoreSettings'][_0x20f434(0x231)]===_0x544c7d)this[_0x20f434(0x24f)]();this[_0x20f434(0x174)][_0x20f434(0x231)]=_0x5a953e;}}}},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x21a)]=function(_0x266f62,_0x596e5e){const _0x50f6d4=_0x5075f1;this[_0x50f6d4(0x319)](_0x266f62,_0x596e5e);if(this['x']!==_0x266f62||this['y']!==_0x596e5e)this['_moveRouteIndex']--;},Game_Character[_0x5075f1(0x173)]['processMoveRouteMoveToCharacter']=function(_0x22a94a){const _0x1ec6f6=_0x5075f1;if(_0x22a94a)this[_0x1ec6f6(0x21a)](_0x22a94a['x'],_0x22a94a['y']);},Game_Character[_0x5075f1(0x173)]['processMoveRouteMoveRepeat']=function(_0xbbe9bb,_0x214375){const _0x5e6644=_0x5075f1;_0x214375=_0x214375||0x0;const _0x4849fe={'code':0x1,'indent':null,'parameters':[]};_0x4849fe['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0xbbe9bb],this[_0x5e6644(0x4df)]['list'][this['_moveRouteIndex']]['parameters'][0x0]='';while(_0x214375--){this['_moveRoute']['list'][_0x5e6644(0x3ae)](this[_0x5e6644(0x431)]+0x1,0x0,_0x4849fe);}},Game_Character['prototype'][_0x5075f1(0x501)]=function(_0x39d52c){this['_patternLocked']=!![],this['setPattern'](_0x39d52c);},Game_Character['prototype'][_0x5075f1(0x30c)]=function(_0x192fd9,_0x381807){const _0x41112d=_0x5075f1;if(this===$gamePlayer)return;const _0x20ccd7=[this[_0x41112d(0x24b)],this['_eventId'],'A'];_0x192fd9['match'](/\b[ABCD]\b/i)?_0x20ccd7[0x2]=String(_0x192fd9)[_0x41112d(0x215)](0x0)[_0x41112d(0x4ba)]()[_0x41112d(0x4d1)]():_0x20ccd7[0x2]=_0x41112d(0x10e)[_0x41112d(0x184)](_0x192fd9);switch(_0x381807[_0x41112d(0x4ba)]()[_0x41112d(0x4d1)]()){case'ON':case _0x41112d(0x3d1):$gameSelfSwitches[_0x41112d(0x423)](_0x20ccd7,!![]);break;case'OFF':case _0x41112d(0x428):$gameSelfSwitches[_0x41112d(0x423)](_0x20ccd7,![]);break;case _0x41112d(0x245):$gameSelfSwitches['setValue'](_0x20ccd7,!$gameSelfSwitches[_0x41112d(0x3c7)](_0x20ccd7));break;}},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x48c)]=function(_0x1fe2c8,_0x47ae18){const _0x58dc4b=_0x5075f1;if(this===$gamePlayer)return;const _0xcb35d2=[this[_0x58dc4b(0x24b)],this['_eventId'],_0x58dc4b(0x4a9)[_0x58dc4b(0x184)](switchId)];$gameSelfSwitches['setValue'](_0xcb35d2,Number(_0x47ae18));},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x401)]=function(_0x320dce,_0x18b5f1){const _0x4ff57d=_0x5075f1;this[_0x4ff57d(0x2de)](_0x320dce,_0x18b5f1);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0xe7)]=function(_0x551cd7){const _0x45a6eb=_0x5075f1;if(_0x551cd7)this[_0x45a6eb(0x401)](_0x551cd7['x'],_0x551cd7['y']);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0xcd)]=function(){const _0x253354=_0x5075f1;switch(this[_0x253354(0x93)]()){case 0x1:this[_0x253354(0x4e8)](0x7);break;case 0x2:this[_0x253354(0x4e8)](0x4);break;case 0x3:this[_0x253354(0x4e8)](0x1);break;case 0x4:this['setDirection'](0x8);break;case 0x6:this[_0x253354(0x4e8)](0x2);break;case 0x7:this[_0x253354(0x4e8)](0x9);break;case 0x8:this[_0x253354(0x4e8)](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x26f)]=function(){const _0x1b4261=_0x5075f1;switch(this[_0x1b4261(0x93)]()){case 0x1:this['setDirection'](0x3);break;case 0x2:this[_0x1b4261(0x4e8)](0x6);break;case 0x3:this[_0x1b4261(0x4e8)](0x9);break;case 0x4:this[_0x1b4261(0x4e8)](0x2);break;case 0x6:this[_0x1b4261(0x4e8)](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character[_0x5075f1(0x173)]['getDirectionToPoint']=function(_0x58f185,_0x2e5638,_0x1c7da4){const _0x3adb9a=_0x5075f1,_0x4b76b2=this[_0x3adb9a(0xe3)](_0x58f185),_0x1577b5=this['deltaYFrom'](_0x2e5638);if($gameMap[_0x3adb9a(0x159)]()){if('llqty'!==_0x3adb9a(0x323)){if(_0x1c7da4||this[_0x3adb9a(0xf6)]()){if(_0x3adb9a(0xcf)===_0x3adb9a(0xcf)){if(_0x4b76b2>0x0&&_0x1577b5<0x0)return 0x1;if(_0x4b76b2<0x0&&_0x1577b5<0x0)return 0x3;if(_0x4b76b2>0x0&&_0x1577b5>0x0)return 0x7;if(_0x4b76b2<0x0&&_0x1577b5>0x0)return 0x9;}else{function _0x55be95(){const _0x15f76e=_0x3adb9a,_0x36ca29=_0x21319c['_scene'][_0x15f76e(0xc4)];if(_0x36ca29){const _0x120459=_0x36ca29[_0x15f76e(0x4b7)](this);_0x120459&&_0x120459[_0x15f76e(0x502)]&&_0x120459['_shadowSprite'][_0x15f76e(0xb3)]!==this[_0x15f76e(0x42d)]()&&(_0x120459[_0x15f76e(0x502)][_0x15f76e(0xb3)]=this['shadowFilename'](),_0x120459[_0x15f76e(0x502)]['bitmap']=_0x36be0d[_0x15f76e(0x8e)](_0x120459[_0x15f76e(0x502)][_0x15f76e(0xb3)]));}}}}}else{function _0x27f16c(){const _0x553081=_0x3adb9a;for(const _0xe08ffb of _0x5b57fa){const _0x835251=_0x553081(0x30b)[_0x553081(0x184)](_0xe08ffb,_0x4cb9a9);_0x4e499d[_0x835251]&&(_0x2f976d[_0x835251]=_0x1e2c42[_0x835251][_0x553081(0x204)](0x0));}}}}if(Math[_0x3adb9a(0x418)](_0x4b76b2)>Math[_0x3adb9a(0x418)](_0x1577b5))return _0x4b76b2>0x0?0x4:0x6;else{if(_0x1577b5!==0x0){if(_0x3adb9a(0x18a)!==_0x3adb9a(0x18a)){function _0x1bcc34(){const _0x2ec1a6=_0x3adb9a;this[_0x2ec1a6(0x337)][_0x2ec1a6(0x205)]=_0xdaf373(_0x5aa1a2['$1']);}}else return _0x1577b5>0x0?0x8:0x2;}}return 0x0;},Game_Character['prototype'][_0x5075f1(0x1b6)]=function(_0x84210c,_0x5a9eca,_0x4bfbc0){const _0x151ae3=_0x5075f1,_0x14e85d=this[_0x151ae3(0xe3)](_0x84210c),_0x171570=this[_0x151ae3(0x18c)](_0x5a9eca);if($gameMap['isSupportDiagonalMovement']()){if(_0x151ae3(0x1d1)!=='rbnxc'){function _0x248a4d(){const _0x494884=_0x151ae3;if(!_0x5e5862[_0x494884(0x2cd)]['Settings'][_0x494884(0x3ab)][_0x494884(0x47e)])return;for(const _0x150e54 of this[_0x494884(0x20c)]){this[_0x494884(0x456)](_0x150e54);}}}else{if(_0x4bfbc0||this['isSpriteVS8dir']()){if(_0x14e85d>0x0&&_0x171570<0x0)return 0x9;if(_0x14e85d<0x0&&_0x171570<0x0)return 0x7;if(_0x14e85d>0x0&&_0x171570>0x0)return 0x3;if(_0x14e85d<0x0&&_0x171570>0x0)return 0x1;}}}if(Math['abs'](_0x14e85d)>Math[_0x151ae3(0x418)](_0x171570)){if(_0x151ae3(0x306)===_0x151ae3(0x479)){function _0x29fa9a(){const _0x275d55=_0x151ae3;if(!this[_0x275d55(0x3a8)]())return![];else{const _0x6fb33d=_0xe8c70e[_0x275d55(0x19f)](_0x33ad25,_0x372e83)[_0x275d55(0x332)](_0x579556=>_0x579556!==this&&_0x579556[_0x275d55(0x3a8)]());return _0x6fb33d[_0x275d55(0x13a)]>0x0;}}}else return _0x14e85d>0x0?0x6:0x4;}else{if(_0x171570!==0x0)return _0x171570>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x5075f1(0x173)][_0x5075f1(0xd4)]=function(_0xa38627,_0x4cc335){const _0x161d99=_0x5075f1,_0x6fd25c=this['getDirectionToPoint'](_0xa38627,_0x4cc335,!![]);if(_0x6fd25c)this[_0x161d99(0x3c1)](_0x6fd25c);},Game_Character[_0x5075f1(0x173)]['moveAwayFromPoint']=function(_0x276629,_0x47a96d){const _0x1e3e1e=_0x5075f1,_0x2c9cce=this[_0x1e3e1e(0x1b6)](_0x276629,_0x47a96d,!![]);if(_0x2c9cce)this['executeMoveDir8'](_0x2c9cce);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x4c5)]=function(_0x2cf514,_0x4178b1){const _0x120931=this['getDirectionToPoint'](_0x2cf514,_0x4178b1,![]);if(_0x120931)this['setDirection'](_0x120931);},Game_Character[_0x5075f1(0x173)]['turnAwayFromPoint']=function(_0x1e9149,_0x9e71cd){const _0x292b0e=_0x5075f1,_0x1c09b9=this[_0x292b0e(0x1b6)](_0x1e9149,_0x9e71cd,![]);if(_0x1c09b9)this['setDirection'](_0x1c09b9);},Game_Character['prototype']['moveTowardCharacter']=function(_0x53ac74){if(_0x53ac74)this['moveTowardPoint'](_0x53ac74['x'],_0x53ac74['y']);},Game_Character[_0x5075f1(0x173)]['moveAwayFromCharacter']=function(_0x1410a7){if(_0x1410a7)this['moveAwayFromPoint'](_0x1410a7['x'],_0x1410a7['y']);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x224)]=function(_0x55a7db){const _0x2061d9=_0x5075f1;if(_0x55a7db)this[_0x2061d9(0x4c5)](_0x55a7db['x'],_0x55a7db['y']);},Game_Character[_0x5075f1(0x173)][_0x5075f1(0x132)]=function(_0x24b2bc){const _0x17d1c9=_0x5075f1;if(_0x24b2bc)this[_0x17d1c9(0x419)](_0x24b2bc['x'],_0x24b2bc['y']);},VisuMZ['EventsMoveCore'][_0x5075f1(0x201)]=Game_Player['prototype'][_0x5075f1(0x248)],Game_Player['prototype'][_0x5075f1(0x248)]=function(){const _0x5cacf0=_0x5075f1;if(this[_0x5cacf0(0x300)])return!![];return VisuMZ[_0x5cacf0(0x2cd)]['Game_Player_isDashing'][_0x5cacf0(0x342)](this);},Game_Player[_0x5075f1(0x173)][_0x5075f1(0x1fa)]=function(){const _0x20fe43=_0x5075f1;return this[_0x20fe43(0x248)]()&&(this[_0x20fe43(0x190)]()||this[_0x20fe43(0x1f1)]()!==0x0&&this[_0x20fe43(0x47a)](this['_x'],this['_y'],this[_0x20fe43(0x1f1)]())||$gameTemp['isDestinationValid']());},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x23e)]=Game_Player[_0x5075f1(0x173)][_0x5075f1(0x1f1)],Game_Player[_0x5075f1(0x173)][_0x5075f1(0x1f1)]=function(){const _0x557c8b=_0x5075f1;return $gameMap['isSupportDiagonalMovement']()?this['getInputDir8']():VisuMZ[_0x557c8b(0x2cd)][_0x557c8b(0x23e)]['call'](this);},Game_Player[_0x5075f1(0x173)][_0x5075f1(0x2b8)]=function(){const _0x376a17=_0x5075f1;return Input[_0x376a17(0x4f4)];},Game_Player[_0x5075f1(0x173)]['moveByInput']=function(){const _0x5d57a6=_0x5075f1;if($gameSystem[_0x5d57a6(0xa2)]())return 0x0;if(!this[_0x5d57a6(0x190)]()&&this[_0x5d57a6(0xce)]()){if('rAQrl'!==_0x5d57a6(0x154)){function _0x54f32f(){const _0x24e5bc=_0x5d57a6;this['despawnEventId'](_0x17b2a2[_0x24e5bc(0x1a8)]);}}else{let _0x378eec=this['getInputDirection']();if(_0x378eec>0x0)$gameTemp[_0x5d57a6(0x153)]();else{if($gameTemp[_0x5d57a6(0x1c3)]()){const _0x181d3d=$gameTemp['destinationX'](),_0x3d3507=$gameTemp[_0x5d57a6(0x1c4)](),_0x2874da=$gameMap[_0x5d57a6(0x159)](),_0x1a5a46=$gameMap[_0x5d57a6(0x99)](_0x181d3d,_0x3d3507),_0x29ed1b=$gameMap['eventsXyNt'](_0x181d3d,_0x3d3507)[_0x5d57a6(0x13a)]<=0x0;_0x2874da&&_0x1a5a46&&_0x29ed1b?_0x378eec=this[_0x5d57a6(0x389)](_0x181d3d,_0x3d3507):_0x378eec=this['findDirectionTo'](_0x181d3d,_0x3d3507);}}if(_0x378eec>0x0)this[_0x5d57a6(0x4bf)]=this[_0x5d57a6(0x4bf)]||0x0,this[_0x5d57a6(0x2f8)]()?this[_0x5d57a6(0x4e8)](_0x378eec):this[_0x5d57a6(0x3b4)](_0x378eec),this[_0x5d57a6(0x4bf)]++;else{if(_0x5d57a6(0x339)===_0x5d57a6(0x339))this[_0x5d57a6(0x4bf)]=0x0;else{function _0x45904a(){const _0x16d476=_0x5d57a6;if(this['_PreservedEventMorphData']===_0x518f3f)this[_0x16d476(0x24f)]();const _0x4e4788='Map%1-Event%2'[_0x16d476(0x184)](_0x4b429f,_0xeb174c);this[_0x16d476(0x29b)][_0x4e4788]={'template':_0x175170,'mapId':_0x5b58eb,'eventId':_0x300ac7};}}}}}},Game_Player[_0x5075f1(0x173)][_0x5075f1(0x2f8)]=function(){const _0x13ee03=_0x5075f1,_0x355efa=VisuMZ[_0x13ee03(0x2cd)][_0x13ee03(0x2eb)][_0x13ee03(0x3ab)];if(!_0x355efa[_0x13ee03(0x1d8)])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x13ee03(0x248)]()||this['isMoving']()||this[_0x13ee03(0x233)]())return![];return this[_0x13ee03(0x4bf)]<_0x355efa[_0x13ee03(0x381)];},VisuMZ[_0x5075f1(0x2cd)]['Game_Player_executeMove']=Game_Player[_0x5075f1(0x173)][_0x5075f1(0x3b4)],Game_Player[_0x5075f1(0x173)][_0x5075f1(0x3b4)]=function(_0x2b633f){const _0x9eb25=_0x5075f1;$gameMap[_0x9eb25(0x159)]()?this[_0x9eb25(0x3c1)](_0x2b633f):VisuMZ['EventsMoveCore'][_0x9eb25(0x107)][_0x9eb25(0x342)](this,_0x2b633f);},VisuMZ[_0x5075f1(0x2cd)]['Game_Player_isMapPassable']=Game_Player[_0x5075f1(0x173)][_0x5075f1(0x277)],Game_Player[_0x5075f1(0x173)]['isMapPassable']=function(_0x4aae9c,_0x3569da,_0x27d44f){const _0x3adc95=_0x5075f1;if($gameMap['isRegionAllowPass'](_0x4aae9c,_0x3569da,_0x27d44f,_0x3adc95(0x3d6))){if(this['isInVehicle']()&&this[_0x3adc95(0x163)]()){if('KKten'===_0x3adc95(0x2b9)){function _0x3c2877(){const _0x4cb874=_0x3adc95,_0x377feb={'template':_0x4cb874(0xaf),'mapId':0x1,'eventId':0xc,'x':_0x522a42['x']+0x1,'y':_0x86c20a['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents'][_0x4cb874(0x13a)]+0x3e8};this['createSpawnedEventWithData'](_0x377feb);}}else return this[_0x3adc95(0x163)]()[_0x3adc95(0x277)](_0x4aae9c,_0x3569da,_0x27d44f);}else{if(_0x3adc95(0x1f3)===_0x3adc95(0x4aa)){function _0x183ce0(){const _0x42f0bf=_0x3adc95;let _0x416ca7=_0x4e39fc[_0x42f0bf(0x121)]();if(_0x416ca7>0x0)return _0x5dc875['followers']()['follower'](_0x416ca7-0x1);}}else return!![];}}if($gameMap[_0x3adc95(0x281)](_0x4aae9c,_0x3569da,_0x27d44f,_0x3adc95(0x3d6)))return![];return VisuMZ[_0x3adc95(0x2cd)][_0x3adc95(0x1dc)]['call'](this,_0x4aae9c,_0x3569da,_0x27d44f);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x20b)]=Game_Player[_0x5075f1(0x173)]['checkEventTriggerHere'],Game_Player[_0x5075f1(0x173)][_0x5075f1(0x3e2)]=function(_0x6641b4){const _0x51ba0a=_0x5075f1;VisuMZ['EventsMoveCore'][_0x51ba0a(0x20b)][_0x51ba0a(0x342)](this,_0x6641b4);if(this[_0x51ba0a(0x1fd)]()){if('RRyfu'!=='hKqCI'){this[_0x51ba0a(0x4ac)](_0x6641b4);if(_0x6641b4[_0x51ba0a(0xd5)](0x0)&&this[_0x51ba0a(0x192)]()==='standing')this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x6641b4['includes'](0x1)||_0x6641b4['includes'](0x2))&&this[_0x51ba0a(0x357)]();}else{function _0x302356(){const _0x337a87=_0x51ba0a;_0xd718af[0x2]=_0x5608d0(_0x1c5fda)[_0x337a87(0x215)](0x0)[_0x337a87(0x4ba)]()[_0x337a87(0x4d1)]();}}}},VisuMZ[_0x5075f1(0x2cd)]['Game_Player_checkEventTriggerThere']=Game_Player['prototype'][_0x5075f1(0x336)],Game_Player[_0x5075f1(0x173)]['checkEventTriggerThere']=function(_0x574001){const _0x2707e5=_0x5075f1;VisuMZ[_0x2707e5(0x2cd)]['Game_Player_checkEventTriggerThere'][_0x2707e5(0x342)](this,_0x574001);if(this[_0x2707e5(0x1fd)]()&&_0x574001[_0x2707e5(0xd5)](0x0)&&this[_0x2707e5(0x192)]()===_0x2707e5(0x510)){const _0x137708=this[_0x2707e5(0x93)](),_0x33b424=$gameMap['roundXWithDirection'](this['x'],_0x137708),_0x25872f=$gameMap[_0x2707e5(0x459)](this['y'],_0x137708);this[_0x2707e5(0x10b)](_0x33b424,_0x25872f);}},Game_Player[_0x5075f1(0x173)]['checkEventTriggerEventsMoveCore']=function(_0x84ff72){const _0x34bed5=_0x5075f1;if($gameMap[_0x34bed5(0xb4)]())return;if($gameMap[_0x34bed5(0x283)]())return;const _0x39c30e=$gameMap['events']();for(const _0x3499b8 of _0x39c30e){if(!_0x3499b8)continue;if(!_0x3499b8[_0x34bed5(0x1d6)](_0x84ff72))continue;if(this[_0x34bed5(0x3a0)](_0x3499b8))return _0x3499b8[_0x34bed5(0x2c1)]();if(this[_0x34bed5(0xf8)](_0x3499b8))return _0x3499b8['start']();}},Game_Player[_0x5075f1(0x173)][_0x5075f1(0x3a0)]=function(_0x1e6eec){const _0x4afcc9=_0x5075f1;if($gameMap[_0x4afcc9(0xb4)]())return![];if($gameMap[_0x4afcc9(0x283)]())return![];return _0x1e6eec[_0x4afcc9(0x21e)]()[_0x4afcc9(0xd5)](this['regionId']());},Game_Player[_0x5075f1(0x173)][_0x5075f1(0xf8)]=function(_0x43a2e7){const _0x3a87b7=_0x5075f1;if($gameMap[_0x3a87b7(0xb4)]())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x3a87b7(0x1df),_0x3a87b7(0x243)][_0x3a87b7(0xd5)](_0x43a2e7[_0x3a87b7(0x265)]()))return![];const _0x1e9c6c=_0x43a2e7[_0x3a87b7(0x265)](),_0x3d7b7c=_0x43a2e7[_0x3a87b7(0x45c)]();switch(_0x1e9c6c){case _0x3a87b7(0x511):const _0x239efe=$gameMap[_0x3a87b7(0x409)](this['x'],this['y'],_0x43a2e7['x'],_0x43a2e7['y']);return _0x43a2e7[_0x3a87b7(0x45c)]()>=_0x239efe;break;case _0x3a87b7(0x451):return _0x3d7b7c>=Math['abs'](_0x43a2e7[_0x3a87b7(0xe3)](this['x']))&&_0x3d7b7c>=Math['abs'](_0x43a2e7['deltaYFrom'](this['y']));break;case'row':return _0x3d7b7c>=Math[_0x3a87b7(0x418)](_0x43a2e7[_0x3a87b7(0x18c)](this['y']));break;case _0x3a87b7(0x288):return _0x3d7b7c>=Math[_0x3a87b7(0x418)](_0x43a2e7[_0x3a87b7(0xe3)](this['x']));break;case _0x3a87b7(0x229):return![];break;}},Game_Player[_0x5075f1(0x173)]['startMapCommonEventOnOK']=function(_0x1ddbcb,_0x4519d0){const _0x407352=_0x5075f1;if($gameMap[_0x407352(0xb4)]())return;if($gameMap[_0x407352(0x283)]())return;let _0x3b7861=VisuMZ[_0x407352(0x2cd)]['Settings'][_0x407352(0x328)],_0x1ca831=$gameMap[_0x407352(0xb9)](_0x1ddbcb,_0x4519d0);const _0x7164a5=_0x407352(0xd1)['format'](_0x1ca831);_0x3b7861[_0x7164a5]&&$gameTemp[_0x407352(0x474)](_0x3b7861[_0x7164a5]);},Game_Player[_0x5075f1(0x173)][_0x5075f1(0x192)]=function(){const _0x5188f1=_0x5075f1;return VisuMZ[_0x5188f1(0x2cd)][_0x5188f1(0x2eb)]['RegionOkTarget'];},Game_Player[_0x5075f1(0x173)]['startMapCommonEventOnTouch']=function(){const _0x339d01=_0x5075f1;if($gameMap[_0x339d01(0xb4)]())return;if($gameMap['isAnyEventStarting']())return;let _0x323525=VisuMZ['EventsMoveCore'][_0x339d01(0x2eb)][_0x339d01(0x147)];const _0x816b62='Region%1'['format'](this[_0x339d01(0xb9)]());if(_0x323525[_0x816b62]){if('GJJbi'===_0x339d01(0x41c))$gameTemp[_0x339d01(0x474)](_0x323525[_0x816b62]);else{function _0x5ca2ce(){const _0x58c664=_0x339d01;if(_0x2f7ae5['_scene'][_0x58c664(0x3e1)]===_0x493aa3)return![];return _0x165f43[_0x58c664(0x166)][_0x58c664(0xd5)](_0x421e68);}}}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x297)]=Game_Player[_0x5075f1(0x173)][_0x5075f1(0x164)],Game_Player['prototype'][_0x5075f1(0x164)]=function(){const _0x851244=_0x5075f1;VisuMZ[_0x851244(0x2cd)]['Game_Player_increaseSteps'][_0x851244(0x342)](this),VisuMZ[_0x851244(0x4e1)](0x0);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x4c1)]=Game_Follower[_0x5075f1(0x173)][_0x5075f1(0x150)],Game_Follower[_0x5075f1(0x173)][_0x5075f1(0x150)]=function(_0x14dbd0){const _0x151895=_0x5075f1;VisuMZ['EventsMoveCore'][_0x151895(0x4c1)][_0x151895(0x342)](this,_0x14dbd0),this[_0x151895(0x2fc)]=![];},Game_Follower[_0x5075f1(0x173)][_0x5075f1(0x248)]=function(){const _0xec062f=_0x5075f1;return $gamePlayer[_0xec062f(0x248)]();},Game_Follower[_0x5075f1(0x173)][_0x5075f1(0x1fa)]=function(){return $gamePlayer['isDashingAndMoving']();},Game_Follower[_0x5075f1(0x173)][_0x5075f1(0x258)]=function(){const _0x4cc1fe=_0x5075f1;return $gamePlayer[_0x4cc1fe(0x258)]();},Game_Follower[_0x5075f1(0x173)][_0x5075f1(0x232)]=function(_0x178d2c){this['_chaseOff']=_0x178d2c;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x18e)]=Game_Follower[_0x5075f1(0x173)][_0x5075f1(0xbc)],Game_Follower[_0x5075f1(0x173)][_0x5075f1(0xbc)]=function(_0x28cd09){const _0x90de7d=_0x5075f1;if(this[_0x90de7d(0x2fc)])return;if($gameSystem[_0x90de7d(0x482)]())return;VisuMZ[_0x90de7d(0x2cd)][_0x90de7d(0x18e)][_0x90de7d(0x342)](this,_0x28cd09);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x209)]=Game_Vehicle[_0x5075f1(0x173)]['isMapPassable'],Game_Vehicle['prototype']['isMapPassable']=function(_0x1015cd,_0xf64012,_0x48ab56){const _0x30cbda=_0x5075f1;if($gameMap['isRegionAllowPass'](_0x1015cd,_0xf64012,_0x48ab56,this['_type']))return!![];if($gameMap[_0x30cbda(0x281)](_0x1015cd,_0xf64012,_0x48ab56,this['_type']))return![];return VisuMZ[_0x30cbda(0x2cd)][_0x30cbda(0x209)]['call'](this,_0x1015cd,_0xf64012,_0x48ab56);},Game_Vehicle[_0x5075f1(0x173)][_0x5075f1(0x2f9)]=function(_0x20d800,_0x3efd54,_0x5996cb){const _0x396f6b=_0x5075f1;if($gameMap[_0x396f6b(0x50c)](_0x20d800,_0x3efd54,_0x5996cb,this[_0x396f6b(0x4ea)]))return!![];if($gameMap[_0x396f6b(0x281)](_0x20d800,_0x3efd54,_0x5996cb,this[_0x396f6b(0x4ea)]))return![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass']['call']($gamePlayer,_0x20d800,_0x3efd54,_0x5996cb);},VisuMZ[_0x5075f1(0x2cd)]['Game_Vehicle_isLandOk']=Game_Vehicle[_0x5075f1(0x173)][_0x5075f1(0x35d)],Game_Vehicle[_0x5075f1(0x173)][_0x5075f1(0x35d)]=function(_0x42830b,_0x44804f,_0x379fae){const _0x386bee=_0x5075f1;if($gameMap[_0x386bee(0x188)](_0x42830b,_0x44804f,_0x379fae,this['_type']))return!![];const _0x4c6803=this[_0x386bee(0x4ea)]['charAt'](0x0)[_0x386bee(0x4ba)]()+this['_type'][_0x386bee(0x204)](0x1),_0x2c0e28=_0x386bee(0x7d)[_0x386bee(0x184)](_0x4c6803);return VisuMZ[_0x386bee(0x2cd)]['Settings'][_0x386bee(0x3c5)][_0x2c0e28]?![]:VisuMZ[_0x386bee(0x2cd)]['Game_Vehicle_isLandOk'][_0x386bee(0x342)](this,_0x42830b,_0x44804f,_0x379fae);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x14f)]=Game_Vehicle[_0x5075f1(0x173)]['initMoveSpeed'],Game_Vehicle['prototype'][_0x5075f1(0x230)]=function(){const _0x3ffb77=_0x5075f1;VisuMZ[_0x3ffb77(0x2cd)][_0x3ffb77(0x14f)][_0x3ffb77(0x342)](this);const _0xfb3920=VisuMZ[_0x3ffb77(0x2cd)][_0x3ffb77(0x2eb)][_0x3ffb77(0x3ab)];if(this['isBoat']()){if(_0xfb3920[_0x3ffb77(0x436)])this['setMoveSpeed'](_0xfb3920[_0x3ffb77(0x436)]);}else{if(this[_0x3ffb77(0x355)]()){if(_0xfb3920[_0x3ffb77(0x227)])this[_0x3ffb77(0x1f8)](_0xfb3920[_0x3ffb77(0x227)]);}else{if(this[_0x3ffb77(0x4fb)]()){if(_0xfb3920[_0x3ffb77(0x28a)])this['setMoveSpeed'](_0xfb3920[_0x3ffb77(0x28a)]);}}}},VisuMZ['EventsMoveCore'][_0x5075f1(0xda)]=Game_Event['prototype']['initialize'],Game_Event[_0x5075f1(0x173)]['initialize']=function(_0x52fa05,_0x1ce2fc){const _0x54c346=_0x5075f1;VisuMZ[_0x54c346(0x2cd)][_0x54c346(0xda)]['call'](this,_0x52fa05,_0x1ce2fc),this[_0x54c346(0x4a7)](),this[_0x54c346(0x31e)](),this[_0x54c346(0x1f7)]();},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x463)]=Game_Event['prototype']['event'],Game_Event[_0x5075f1(0x173)]['event']=function(){const _0x34454b=_0x5075f1;if(this[_0x34454b(0x1f6)]!==undefined){const _0x5818c5=this['_eventMorphData']['mapId'],_0x17f71b=this['_eventMorphData']['eventId'];return VisuMZ[_0x34454b(0x34e)][_0x5818c5][_0x34454b(0x349)][_0x17f71b];}if(this[_0x34454b(0x3c2)]!==undefined){const _0xa6eb92=this[_0x34454b(0x3c2)][_0x34454b(0x466)],_0xcb9b30=this[_0x34454b(0x3c2)][_0x34454b(0x437)];return VisuMZ[_0x34454b(0x34e)][_0xa6eb92][_0x34454b(0x349)][_0xcb9b30];}if(this[_0x34454b(0x3cd)]!==undefined){const _0x4b69bd=this[_0x34454b(0x3cd)][_0x34454b(0x466)],_0x492477=this['_eventSpawnData'][_0x34454b(0x437)];return VisuMZ[_0x34454b(0x34e)][_0x4b69bd][_0x34454b(0x349)][_0x492477];}if($gameTemp[_0x34454b(0x331)]!==undefined){if(_0x34454b(0x430)!=='pMqQZ'){const _0x1be7de=$gameTemp['_spawnData'][_0x34454b(0x466)],_0x1bdb30=$gameTemp[_0x34454b(0x331)][_0x34454b(0x437)];return VisuMZ[_0x34454b(0x34e)][_0x1be7de][_0x34454b(0x349)][_0x1bdb30];}else{function _0x59f57b(){const _0x43735a=_0x34454b;return(this[_0x43735a(0x4bd)]||'')[_0x43735a(0x4ba)]()[_0x43735a(0x4d1)]();}}}return VisuMZ['EventsMoveCore'][_0x34454b(0x463)][_0x34454b(0x342)](this);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x20d)]=function(_0x54f4d2,_0x449450){const _0x4dde9a=_0x5075f1;if(_0x54f4d2===0x0||_0x449450===0x0)return![];if(!VisuMZ[_0x4dde9a(0x34e)][_0x54f4d2]){if(_0x4dde9a(0xe4)===_0x4dde9a(0x41e)){function _0x22ad28(){const _0x13d1fe=_0x4dde9a;this[_0x13d1fe(0x4bd)]='',this[_0x13d1fe(0xdd)]=0x0;}}else{if($gameTemp[_0x4dde9a(0x1ce)]()){if('ajJOV'===_0x4dde9a(0x411))console[_0x4dde9a(0x3fa)](_0x4dde9a(0x4b0)[_0x4dde9a(0x184)](_0x54f4d2));else{function _0x3447e6(){const _0x5ab3c5=_0x4dde9a;return this['_moveSynch'][_0x5ab3c5(0xa6)];}}}return![];}}return!![];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x11d)]=Game_Event[_0x5075f1(0x173)][_0x5075f1(0x2c1)],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x2c1)]=function(){const _0x56f269=_0x5075f1;VisuMZ[_0x56f269(0x2cd)][_0x56f269(0x11d)][_0x56f269(0x342)](this),Imported[_0x56f269(0x2a4)]&&Input['isPressed'](VisuMZ[_0x56f269(0x4cc)]['Settings'][_0x56f269(0x2aa)]['FastForwardKey'])&&Input[_0x56f269(0xf4)]();},Game_Event['prototype'][_0x5075f1(0x4a7)]=function(){const _0x5f567f=_0x5075f1,_0x3e9898=this['event']()['note'];if(_0x3e9898==='')return;if(DataManager[_0x5f567f(0x4ce)]()||DataManager['isEventTest']())return;const _0x574d9e=VisuMZ[_0x5f567f(0x2cd)]['Settings'][_0x5f567f(0xf7)];let _0x167e90=null,_0x4e105a=0x0,_0x35a0c=0x0;if(_0x3e9898[_0x5f567f(0x28d)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){if(_0x5f567f(0x7f)==='EkLCg')_0x4e105a=Number(RegExp['$1']),_0x35a0c=Number(RegExp['$2']);else{function _0x806a95(){const _0x55ecda=_0x5f567f;this[_0x55ecda(0x3b6)][_0x55ecda(0x98)]=_0x5ad08d(_0x919a66['$1'])[_0x55ecda(0x4d1)]();}}}else{if(_0x3e9898[_0x5f567f(0x28d)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x5f567f(0x303)===_0x5f567f(0x3c0)){function _0x1c108a(){const _0xb0c177=_0x5f567f;this['_data'][_0x3a3c2d]=_0x5b8139[0x2][_0xb0c177(0x28d)](/VAR/i)?_0x4a2ff7:!!_0x54dd3c,this['onChange']();}}else _0x4e105a=Number(RegExp['$1']),_0x35a0c=Number(RegExp['$2']);}else{if(_0x3e9898[_0x5f567f(0x28d)](/<COPY EVENT:[ ](.*?)>/i)){if(_0x5f567f(0x32c)!==_0x5f567f(0x32c)){function _0x3d4f65(){const _0x4cc600=_0x5f567f;this[_0x4cc600(0xdd)]--;if(this[_0x4cc600(0xdd)]<=0x0&&this[_0x4cc600(0x4bd)]!==_0x4cc600(0x316))this[_0x4cc600(0x7b)]();}}else{const _0x4e25c1=String(RegExp['$1'])[_0x5f567f(0x4ba)]()[_0x5f567f(0x4d1)]();_0x167e90=VisuMZ[_0x5f567f(0x304)][_0x4e25c1];if(!_0x167e90)return;_0x4e105a=_0x167e90[_0x5f567f(0x4c8)],_0x35a0c=_0x167e90['EventID'];}}}}if(!this['checkValidEventerMap'](_0x4e105a,_0x35a0c))return;_0x574d9e['PreCopyJS'][_0x5f567f(0x342)](this,_0x4e105a,_0x35a0c,this);if(_0x167e90)_0x167e90[_0x5f567f(0x162)]['call'](this,_0x4e105a,_0x35a0c,this);this[_0x5f567f(0x3c2)]={'mapId':_0x4e105a,'eventId':_0x35a0c},this[_0x5f567f(0xe6)]=-0x2,this[_0x5f567f(0x17f)](),_0x574d9e[_0x5f567f(0x427)][_0x5f567f(0x342)](this,_0x4e105a,_0x35a0c,this);if(_0x167e90)_0x167e90[_0x5f567f(0x427)][_0x5f567f(0x342)](this,_0x4e105a,_0x35a0c,this);$gameMap[_0x5f567f(0x1bf)]();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x31e)]=function(){const _0x473f25=_0x5075f1,_0x3a486c=$gameSystem[_0x473f25(0x2a7)](this);if(!_0x3a486c)return;const _0x1c42ab=_0x3a486c[_0x473f25(0x2bf)]['toUpperCase']()[_0x473f25(0x4d1)]();_0x1c42ab!==_0x473f25(0x239)?this[_0x473f25(0x90)](_0x1c42ab,!![]):this[_0x473f25(0x34d)](_0x3a486c['mapId'],_0x3a486c[_0x473f25(0x437)],!![]);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x34d)]=function(_0x546705,_0x340b03,_0x33a379){const _0x121836=_0x5075f1;if(!this[_0x121836(0x20d)](_0x546705,_0x340b03))return;const _0x3c3f51=VisuMZ['EventsMoveCore'][_0x121836(0x2eb)][_0x121836(0xf7)];if(!_0x33a379)_0x3c3f51[_0x121836(0x17e)][_0x121836(0x342)](this,_0x546705,_0x340b03,this);this[_0x121836(0x1f6)]={'mapId':_0x546705,'eventId':_0x340b03},this[_0x121836(0xe6)]=-0x2,this[_0x121836(0x17f)]();if(!_0x33a379)_0x3c3f51['PostMorphJS'][_0x121836(0x342)](this,_0x546705,_0x340b03,this);$gameMap[_0x121836(0x1bf)]();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x90)]=function(_0xb46ace,_0x5d6ab6){const _0xd4410a=_0x5075f1;_0xb46ace=_0xb46ace[_0xd4410a(0x4ba)]()[_0xd4410a(0x4d1)]();const _0x3e9c15=VisuMZ[_0xd4410a(0x304)][_0xb46ace];if(!_0x3e9c15)return;const _0x4a9aab=_0x3e9c15[_0xd4410a(0x4c8)],_0x5dd78b=_0x3e9c15[_0xd4410a(0x43c)];if(!this[_0xd4410a(0x20d)](_0x4a9aab,_0x5dd78b))return;if(!_0x5d6ab6)_0x3e9c15['PreMorphJS'][_0xd4410a(0x342)](this,_0x4a9aab,_0x5dd78b,this);this[_0xd4410a(0x34d)](_0x4a9aab,_0x5dd78b,_0x5d6ab6);if(!_0x5d6ab6)_0x3e9c15['PostMorphJS'][_0xd4410a(0x342)](this,_0x4a9aab,_0x5dd78b,this);this['clearEventCache']();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x470)]=function(){const _0x338e28=_0x5075f1;this[_0x338e28(0x1f6)]=undefined,this[_0x338e28(0xe6)]=-0x2,this['refresh']();},Game_Event[_0x5075f1(0x173)]['setupSpawn']=function(_0x1608dc){const _0x55f0ae=_0x5075f1,_0x3772e2=VisuMZ[_0x55f0ae(0x2cd)][_0x55f0ae(0x2eb)][_0x55f0ae(0xf7)],_0x3eb108=_0x1608dc[_0x55f0ae(0x2bf)]['toUpperCase']()[_0x55f0ae(0x4d1)](),_0xe5928f=!['',_0x55f0ae(0x239)][_0x55f0ae(0xd5)](_0x3eb108);let _0x3cff08=0x0,_0x3fbe57=0x0;if(_0xe5928f){if(_0x55f0ae(0x388)!==_0x55f0ae(0x73)){const _0x1f4551=VisuMZ[_0x55f0ae(0x304)][_0x3eb108];if(!_0x1f4551)return;_0x3cff08=_0x1f4551['MapID'],_0x3fbe57=_0x1f4551[_0x55f0ae(0x43c)];}else{function _0x47bb81(){const _0x478e20=_0x55f0ae;this[_0x478e20(0x47b)]=![],this[_0x478e20(0x78)]=-0x1,this['_expireCommonEvent']=0x0;}}}else _0x3cff08=_0x1608dc[_0x55f0ae(0x466)],_0x3fbe57=_0x1608dc[_0x55f0ae(0x437)];if(!this[_0x55f0ae(0x20d)](_0x3cff08,_0x3fbe57))return;if(_0xe5928f){const _0x33f665=VisuMZ[_0x55f0ae(0x304)][_0x3eb108];_0x33f665[_0x55f0ae(0x40c)][_0x55f0ae(0x342)](this,_0x3cff08,_0x3fbe57,this);}_0x3772e2[_0x55f0ae(0x40c)][_0x55f0ae(0x342)](this,_0x3cff08,_0x3fbe57,this),this[_0x55f0ae(0x3cd)]=_0x1608dc,this[_0x55f0ae(0xe6)]=-0x2,this[_0x55f0ae(0x24b)]=$gameMap['mapId'](),this[_0x55f0ae(0x1a8)]=_0x1608dc[_0x55f0ae(0xdb)],this[_0x55f0ae(0x49f)]=_0x1608dc['spawnPreserved'],this[_0x55f0ae(0x2de)](_0x1608dc['x'],_0x1608dc['y']),this[_0x55f0ae(0x4e8)](_0x1608dc[_0x55f0ae(0x93)]),this['refresh']();if(_0xe5928f){if('ibDSn'!==_0x55f0ae(0x3b2)){function _0x37dfe9(){const _0x1716ed=_0x55f0ae;_0x1f8790[_0x1716ed(0x2bb)](this['mapId']());}}else{const _0x431541=VisuMZ[_0x55f0ae(0x304)][_0x3eb108];if(!_0x431541)return;_0x431541[_0x55f0ae(0x22e)][_0x55f0ae(0x342)](this,_0x3cff08,_0x3fbe57,this);}}_0x3772e2[_0x55f0ae(0x22e)]['call'](this,_0x3cff08,_0x3fbe57,this);const _0x5f2a75=SceneManager[_0x55f0ae(0x4ad)];if(_0x5f2a75&&_0x5f2a75[_0x55f0ae(0xc4)])_0x5f2a75[_0x55f0ae(0xc4)][_0x55f0ae(0x113)](this);},Game_Event[_0x5075f1(0x173)]['isSpawnedEvent']=function(){const _0x37b54c=_0x5075f1;return!!this[_0x37b54c(0x3cd)];},VisuMZ[_0x5075f1(0x2cd)]['Game_Event_refresh']=Game_Event[_0x5075f1(0x173)][_0x5075f1(0x17f)],Game_Event['prototype'][_0x5075f1(0x17f)]=function(){const _0xf268d6=_0x5075f1,_0x107921=this['_pageIndex'];VisuMZ['EventsMoveCore']['Game_Event_refresh'][_0xf268d6(0x342)](this),_0x107921!==this[_0xf268d6(0xe6)]&&this[_0xf268d6(0x26e)]();},VisuMZ['EventsMoveCore'][_0x5075f1(0x208)]=Game_Event[_0x5075f1(0x173)][_0x5075f1(0x516)],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x516)]=function(){const _0x32e980=_0x5075f1;VisuMZ['EventsMoveCore'][_0x32e980(0x208)][_0x32e980(0x342)](this),this[_0x32e980(0x4fe)]();},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x12c)]=Game_Event['prototype']['setupPageSettings'],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x315)]=function(){const _0xceb7dd=_0x5075f1;this[_0xceb7dd(0x4db)]=!![],VisuMZ[_0xceb7dd(0x2cd)]['Game_Event_setupPageSettings'][_0xceb7dd(0x342)](this),this[_0xceb7dd(0x26e)](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event['prototype']['setupEventsMoveCoreEffects']=function(){const _0x4033ba=_0x5075f1;if(!this[_0x4033ba(0x44a)]())return;this[_0x4033ba(0x4fe)](),this[_0x4033ba(0x4d7)](),this[_0x4033ba(0x4c7)](),this['updateEventsMoveCoreTagChanges']();},Game_Event['prototype'][_0x5075f1(0x4d7)]=function(){const _0x1ecac7=_0x5075f1,_0x40e205=this[_0x1ecac7(0x44a)]()[_0x1ecac7(0x508)];if(_0x40e205==='')return;this[_0x1ecac7(0x4ca)](_0x40e205);},Game_Event['prototype'][_0x5075f1(0x4c7)]=function(){const _0x3bab18=_0x5075f1;if(!this[_0x3bab18(0x498)]())return;const _0x27c30a=this[_0x3bab18(0x16c)]();let _0x42bca9='';for(const _0x1fc435 of _0x27c30a){if([0x6c,0x198]['includes'](_0x1fc435[_0x3bab18(0x496)])){if(_0x3bab18(0x481)!==_0x3bab18(0x261)){if(_0x42bca9!=='')_0x42bca9+='\x0a';_0x42bca9+=_0x1fc435['parameters'][0x0];}else{function _0xaa23cc(){const _0x1e0c98=_0x3bab18;return _0x1002d1[_0x1e0c98(0x97)](_0x4df6be[_0x1e0c98(0x418)](this[_0x1e0c98(0x219)](_0x26b07b,_0x10b9fc)),_0xdccefa[_0x1e0c98(0x418)](this[_0x1e0c98(0xad)](_0x1cb9e9,_0x4a4114)));}}}}this['checkEventsMoveCoreStringTags'](_0x42bca9);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x4fe)]=function(){const _0x1fa736=_0x5075f1,_0x55c5e4=VisuMZ['EventsMoveCore'][_0x1fa736(0x2eb)];this['_activationProximity']={'type':_0x1fa736(0x1df),'distance':0x0,'regionList':[]},this[_0x1fa736(0x410)]=![],this[_0x1fa736(0x369)]=![],this[_0x1fa736(0xf5)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_eventIcon']=$gameSystem[_0x1fa736(0xd8)](this),this['_labelWindow']={'text':'','visibleRange':_0x55c5e4['Label'][_0x1fa736(0x1c8)],'offsetX':_0x55c5e4['Label'][_0x1fa736(0x403)],'offsetY':_0x55c5e4['Label']['OffsetY']},this[_0x1fa736(0x4da)]=[],this[_0x1fa736(0x462)]={'target':-0x1,'type':_0x1fa736(0x454),'delay':0x1},this[_0x1fa736(0x1bb)]=_0x55c5e4[_0x1fa736(0x3ab)][_0x1fa736(0x206)]??0x0,this[_0x1fa736(0x199)]=![],this[_0x1fa736(0x9e)]={'visible':!![],'filename':_0x55c5e4[_0x1fa736(0x3ab)][_0x1fa736(0x491)]},this[_0x1fa736(0x47f)](),this['clearStepPattern']();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x4ca)]=function(_0xf2a51a){const _0x192e08=_0x5075f1;if(_0xf2a51a[_0x192e08(0x28d)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x192e08(0x2f7)!==_0x192e08(0x3d9))this[_0x192e08(0x28b)][_0x192e08(0x40d)]=JSON['parse']('['+RegExp['$1'][_0x192e08(0x28d)](/\d+/g)+']'),this['_activationProximity'][_0x192e08(0x2dc)]=_0x192e08(0x243);else{function _0x77ceae(){return!![];}}}else _0xf2a51a[_0x192e08(0x28d)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x192e08(0xa1)]()[_0x192e08(0x4d1)](),this[_0x192e08(0x28b)][_0x192e08(0x2dc)]=type,this[_0x192e08(0x28b)][_0x192e08(0x409)]=Number(RegExp['$2']));if(_0xf2a51a['match'](/<ALWAYS UPDATE MOVEMENT>/i)){if(_0x192e08(0x3de)!==_0x192e08(0x3de)){function _0x7caab8(){const _0x20cf54=_0x192e08;return this[_0x20cf54(0x19c)](_0x4d173f,_0x2c0904);}}else this['_alwaysUpdateMove']=!![];}_0xf2a51a[_0x192e08(0x28d)](/<CLICK TRIGGER>/i)&&(this[_0x192e08(0x369)]=!![]);const _0x356205=_0xf2a51a[_0x192e08(0x28d)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x356205){if(_0x192e08(0x37f)===_0x192e08(0x31f)){function _0x54b058(){_0x20fd5a=this['findDirectionTo'](_0x3ca083,_0x14d010);}}else for(const _0x1c8927 of _0x356205){if(_0x1c8927[_0x192e08(0x28d)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0xa39231=String(RegExp['$1'])[_0x192e08(0xa1)]()[_0x192e08(0x4d1)](),_0x23bedb=Number(RegExp['$2']);this['_addedHitbox'][_0xa39231]=_0x23bedb;}}}_0xf2a51a[_0x192e08(0x28d)](/<ICON:[ ](\d+)>/i)&&(this['_eventIcon'][_0x192e08(0xef)]=Number(RegExp['$1']));if(_0xf2a51a[_0x192e08(0x28d)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x192e08(0x39d)===_0x192e08(0x39d))this[_0x192e08(0x337)][_0x192e08(0x422)]=Number(RegExp['$1']);else{function _0x54a48f(){const _0x2ccab2=_0x192e08;return _0x5819be[_0x2ccab2(0x2cd)][_0x2ccab2(0x1fb)][_0x2ccab2(0x342)](this,_0x209178,_0x5f19c9,_0x3db1a2);}}}_0xf2a51a['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x192e08(0x337)]['bufferY']=Number(RegExp['$1']));_0xf2a51a[_0x192e08(0x28d)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x192e08(0x337)][_0x192e08(0x422)]=Number(RegExp['$1']),this['_eventIcon'][_0x192e08(0x205)]=Number(RegExp['$2']));if(_0xf2a51a[_0x192e08(0x28d)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x5edfdc=String(RegExp['$1'])[_0x192e08(0x4ba)]()[_0x192e08(0x4d1)](),_0x57b593=[_0x192e08(0x321),_0x192e08(0x448),'MULTIPLY',_0x192e08(0x45e)];this[_0x192e08(0x337)][_0x192e08(0x360)]=_0x57b593[_0x192e08(0x236)](_0x5edfdc)['clamp'](0x0,0x3);}_0xf2a51a[_0x192e08(0x28d)](/<LABEL:[ ](.*?)>/i)&&(this[_0x192e08(0x3b6)][_0x192e08(0x98)]=String(RegExp['$1'])[_0x192e08(0x4d1)]());if(_0xf2a51a[_0x192e08(0x28d)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x192e08(0x194)!==_0x192e08(0x194)){function _0x4768ef(){const _0x4d3c6b=_0x192e08;if(this[_0x4d3c6b(0x48b)]()>=0x0){const _0x21fb2b=_0x2b1b22[_0x4d3c6b(0x19b)](this[_0x4d3c6b(0x48b)]());if(_0x21fb2b)return _0x21fb2b[_0x4d3c6b(0x258)]();}return _0x23bc32[_0x4d3c6b(0x173)][_0x4d3c6b(0x258)][_0x4d3c6b(0x342)](this);}}else this[_0x192e08(0x3b6)][_0x192e08(0x98)]=String(RegExp['$1'])[_0x192e08(0x4d1)]();}_0xf2a51a[_0x192e08(0x28d)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x192e08(0x3b6)][_0x192e08(0xf3)]=Number(RegExp['$1']));_0xf2a51a[_0x192e08(0x28d)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x192e08(0x3b6)][_0x192e08(0x177)]=Number(RegExp['$1']));if(_0xf2a51a[_0x192e08(0x28d)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x192e08(0x4f3)!==_0x192e08(0x21b))this[_0x192e08(0x3b6)][_0x192e08(0xf3)]=Number(RegExp['$1']),this[_0x192e08(0x3b6)][_0x192e08(0x177)]=Number(RegExp['$2']);else{function _0xaf319d(){const _0x404d8b=_0x192e08,_0x44a14d=_0x54352e['event'](_0x7846e6(_0x35e272['$1']));return this[_0x404d8b(0x322)](_0x44a14d);}}}$gameTemp[_0x192e08(0x4b5)](this);for(;;){if(this[_0x192e08(0x3b6)][_0x192e08(0x98)][_0x192e08(0x28d)](/\\V\[(\d+)\]/gi)){if(_0x192e08(0x3c6)===_0x192e08(0x3c6))this[_0x192e08(0x3b6)][_0x192e08(0x98)]=this['_labelWindow'][_0x192e08(0x98)]['replace'](/\\V\[(\d+)\]/gi,(_0x251f2e,_0x4c82a9)=>$gameVariables['value'](parseInt(_0x4c82a9)));else{function _0x38cd47(){const _0x3475a3=_0x192e08;if(this[_0x3475a3(0x29b)]===_0x4e7ad5)this[_0x3475a3(0x24f)]();if(!_0x3e2cd6)return;const _0x65940=_0x3475a3(0x119)[_0x3475a3(0x184)](_0x557aa7[_0x3475a3(0x24b)],_0x12900a[_0x3475a3(0x1a8)]);return this[_0x3475a3(0x29b)][_0x65940];}}}else break;}$gameTemp['clearSelfTarget']();_0xf2a51a['match'](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x192e08(0x3b6)][_0x192e08(0x1aa)]=Number(RegExp['$1']));if(_0xf2a51a[_0x192e08(0x28d)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0xc3f5b4=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x192e08(0x4da)]=this[_0x192e08(0x4da)][_0x192e08(0x8a)](_0xc3f5b4),this['_moveOnlyRegions'][_0x192e08(0x4e2)](0x0);}if(_0xf2a51a[_0x192e08(0x28d)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0xf16f95=String(RegExp['$1']);if(_0xf16f95[_0x192e08(0x28d)](/PLAYER/i))this[_0x192e08(0x462)][_0x192e08(0xa6)]=0x0;else{if(_0xf16f95[_0x192e08(0x28d)](/EVENT[ ](\d+)/i)){if(_0x192e08(0x4e6)!==_0x192e08(0x4e6)){function _0x554211(){const _0x1c54ca=_0x192e08;if(_0x1b8fca[_0x1c54ca(0x50c)](_0x3fbedf,_0x425938,_0x281a4d,this[_0x1c54ca(0x4ea)]))return!![];if(_0x3f3064['isRegionForbidPass'](_0x27bddf,_0x8c0529,_0x2bcc0a,this['_type']))return![];return _0x981993[_0x1c54ca(0x2cd)][_0x1c54ca(0x209)][_0x1c54ca(0x342)](this,_0x3c5d93,_0x20ea53,_0x57253f);}}else this['_moveSynch'][_0x192e08(0xa6)]=Number(RegExp['$1']);}}}if(_0xf2a51a[_0x192e08(0x28d)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if(_0x192e08(0x490)!==_0x192e08(0x1b1))this[_0x192e08(0x462)][_0x192e08(0x2dc)]=String(RegExp['$1'])[_0x192e08(0xa1)]()[_0x192e08(0x4d1)]();else{function _0x3af7c7(){return this['processMoveRouteJumpToCharacter'](_0x5cf6bf);}}}_0xf2a51a[_0x192e08(0x28d)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x192e08(0x462)]['delay']=Number(RegExp['$1']));if(_0xf2a51a[_0x192e08(0x28d)](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else{if(_0xf2a51a[_0x192e08(0x28d)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)){if(_0x192e08(0x483)!==_0x192e08(0x12e))this[_0x192e08(0x1bb)]=Number(RegExp['$1'])||0x0;else{function _0x120a70(){const _0x653348=_0x192e08,_0x50da8a=_0x4993fe[_0x653348(0x2cd)][_0x653348(0x2eb)]['Movement'];if(!_0x50da8a[_0x653348(0x2e0)])return _0x329749;return[0x1,0x3,0x7,0x9][_0x653348(0xd5)](this[_0x653348(0x1b9)])&&(_0x214354*=_0x50da8a[_0x653348(0x41f)]||0.01),_0x280ca3;}}}}_0xf2a51a[_0x192e08(0x28d)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x192e08(0x199)]=!![]);_0xf2a51a['match'](/<HIDE SHADOW>/i)&&(this[_0x192e08(0x9e)][_0x192e08(0x210)]=![]);if(_0xf2a51a['match'](/<SHADOW FILENAME:[ ](.*?)>/i)){if(_0x192e08(0x18d)!==_0x192e08(0x18d)){function _0x424057(){return!![];}}else this['_shadowGraphic']['filename']=String(RegExp['$1']);}_0xf2a51a['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1'])),_0xf2a51a[_0x192e08(0x28d)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x192e08(0x136)]=Number(RegExp['$1'])),_0xf2a51a[_0x192e08(0x28d)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x192e08(0x213)]=Number(RegExp['$1']),this[_0x192e08(0x136)]=Number(RegExp['$2'])),_0xf2a51a['match'](/<STEP PATTERN:[ ](.*)>/i)&&(this['_stepPattern']=String(RegExp['$1'])['toUpperCase']()['trim']());},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x32e)]=function(){const _0xfdf152=_0x5075f1;this[_0xfdf152(0x38a)]();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x20a)]=function(){const _0x4de2d3=_0x5075f1;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0x4de2d3(0x173)][_0x4de2d3(0x20a)]['call'](this);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x3e4)]=Game_Event['prototype'][_0x5075f1(0x266)],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x266)]=function(){const _0x456473=_0x5075f1;if(this[_0x456473(0x129)]())return;VisuMZ[_0x456473(0x2cd)]['Game_Event_updateSelfMovement'][_0x456473(0x342)](this);if(this['isMoving']()){if('EwNKa'===_0x456473(0x34b)){function _0x5bf1db(){const _0x4659ad=_0x456473;let _0x18099b=[_0x17e10d,_0x3f9513,_0x4659ad(0x10e)[_0x4659ad(0x184)](_0xb5210f)];return typeof _0x37bf2a==='string'&&(_0x18099b=[_0x2712f5,_0x4f38e5,_0x396803['toUpperCase']()[_0x4659ad(0x4d1)]()]),_0x2ad0cd[_0x4659ad(0x3c7)](_0x18099b);}}else VisuMZ[_0x456473(0x4e1)](this[_0x456473(0x1a8)]);}},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x129)]=function(){const _0x49ba57=_0x5075f1,_0x5ca664=VisuMZ[_0x49ba57(0x2cd)]['Settings'][_0x49ba57(0x3ab)];if($gameMap['isEventRunning']()&&_0x5ca664[_0x49ba57(0x2fb)])return!![];if($gameMessage[_0x49ba57(0x246)]()&&_0x5ca664[_0x49ba57(0x293)])return!![];if(!$gameSystem['isAllowEventAutoMovement']())return!![];if(this['moveSynchTarget']()>=0x0)return!![];return![];},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x38a)]=function(){const _0x4db9ca=_0x5075f1,_0x41f406=SceneManager[_0x4db9ca(0x4ad)][_0x4db9ca(0xc4)];if(_0x41f406){if(_0x4db9ca(0x4c4)===_0x4db9ca(0x4c4)){const _0xe0b142=_0x41f406[_0x4db9ca(0x4b7)](this);_0xe0b142&&_0xe0b142['_shadowSprite']&&_0xe0b142['_shadowSprite'][_0x4db9ca(0xb3)]!==this[_0x4db9ca(0x42d)]()&&(_0xe0b142[_0x4db9ca(0x502)]['_filename']=this[_0x4db9ca(0x42d)](),_0xe0b142['_shadowSprite'][_0x4db9ca(0x26d)]=ImageManager[_0x4db9ca(0x8e)](_0xe0b142[_0x4db9ca(0x502)][_0x4db9ca(0xb3)]));}else{function _0x142eb3(){const _0x209903=_0x4db9ca;_0x5ced2c(_0x209903(0x39c)[_0x209903(0x184)](_0x110647,_0x5b30eb,_0x1a85db)),_0x2c9eca[_0x209903(0x36e)]();}}}},Game_Event['prototype'][_0x5075f1(0x42d)]=function(){const _0x557383=_0x5075f1;return this['_shadowGraphic'][_0x557383(0x170)];},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x1e2)]=function(){const _0x399ad1=_0x5075f1;if(!this['_shadowGraphic']['visible'])return![];return Game_CharacterBase[_0x399ad1(0x173)][_0x399ad1(0x1e2)][_0x399ad1(0x342)](this);},Game_Event['prototype'][_0x5075f1(0x43b)]=function(){const _0x228d0d=_0x5075f1;return this[_0x228d0d(0x3b6)]['text'];},Game_Event[_0x5075f1(0x173)]['labelWindowRange']=function(){const _0x504bf6=_0x5075f1;return this[_0x504bf6(0x3b6)]['visibleRange'];},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x277)]=function(_0x41198f,_0x2ed9cd,_0x5850cd){const _0x54760c=_0x5075f1;if(this[_0x54760c(0x27f)]())return this['isMoveOnlyRegionPassable'](_0x41198f,_0x2ed9cd,_0x5850cd);if($gameMap[_0x54760c(0x50c)](_0x41198f,_0x2ed9cd,_0x5850cd,'event'))return!![];if($gameMap[_0x54760c(0x281)](_0x41198f,_0x2ed9cd,_0x5850cd,'event'))return![];return Game_Character[_0x54760c(0x173)][_0x54760c(0x277)][_0x54760c(0x342)](this,_0x41198f,_0x2ed9cd,_0x5850cd);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x27f)]=function(){const _0x577d51=_0x5075f1;if(this[_0x577d51(0x4da)]===undefined)this[_0x577d51(0x4fe)]();return this['_moveOnlyRegions'][_0x577d51(0x13a)]>0x0;},Game_Event['prototype'][_0x5075f1(0x193)]=function(_0x5a9914,_0x17017d,_0x4aa17e){const _0x5c138f=_0x5075f1,_0xda6e59=$gameMap[_0x5c138f(0x32d)](_0x5a9914,_0x4aa17e),_0x17ee8a=$gameMap[_0x5c138f(0x459)](_0x17017d,_0x4aa17e),_0x19ab96=$gameMap[_0x5c138f(0xb9)](_0xda6e59,_0x17ee8a);return this[_0x5c138f(0x4da)]['includes'](_0x19ab96);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0xd2)]=Game_Event['prototype'][_0x5075f1(0x22b)],Game_Event[_0x5075f1(0x173)]['findProperPageIndex']=function(){const _0x2c49ad=_0x5075f1;return this[_0x2c49ad(0x407)]=![],this[_0x2c49ad(0xe0)]=![],this[_0x2c49ad(0x44a)]()?VisuMZ[_0x2c49ad(0x2cd)][_0x2c49ad(0xd2)][_0x2c49ad(0x342)](this):-0x1;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x2a9)]=Game_Event[_0x5075f1(0x173)][_0x5075f1(0x27e)],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x27e)]=function(_0x547c70){const _0x1af650=_0x5075f1;this[_0x1af650(0x16e)](_0x547c70),$gameTemp[_0x1af650(0x4b5)](this);const _0x40b122=VisuMZ[_0x1af650(0x2cd)]['Game_Event_meetsConditions'][_0x1af650(0x342)](this,_0x547c70);return $gameTemp[_0x1af650(0x186)](),_0x40b122;},Game_Event['prototype']['hasAdvancedSwitchVariable']=function(){const _0x16ecf0=_0x5075f1;return this[_0x16ecf0(0x407)];},Game_Event['prototype'][_0x5075f1(0x16e)]=function(_0x5f016a){const _0x204e36=_0x5075f1,_0x1e37eb=_0x5f016a[_0x204e36(0x15c)];if(_0x1e37eb[_0x204e36(0x3f3)]&&DataManager[_0x204e36(0x198)](_0x1e37eb[_0x204e36(0x2d3)])){if(_0x204e36(0x9d)!==_0x204e36(0x9d)){function _0xe00e56(){const _0x3a1098=_0x204e36;return _0x235b30[_0x3a1098(0x2cd)][_0x3a1098(0xbb)][_0x3a1098(0x342)](this,_0x48d974);}}else this[_0x204e36(0x407)]=!![];}else{if(_0x1e37eb[_0x204e36(0x2a3)]&&DataManager[_0x204e36(0x198)](_0x1e37eb['switch2Id']))this[_0x204e36(0x407)]=!![];else{if(_0x1e37eb[_0x204e36(0x301)]&&DataManager['isAdvancedVariable'](_0x1e37eb[_0x204e36(0x374)])){if(_0x204e36(0xc3)!==_0x204e36(0xc3)){function _0x4d593f(){const _0xf84d83=_0x204e36;return this[_0xf84d83(0xe0)];}}else this['_advancedSwitchVariable']=!![];}}}},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x2f4)]=function(){if(this['_erased'])return![];return this['_clickTrigger'];},Game_Event[_0x5075f1(0x173)]['onClickTrigger']=function(){const _0x17cc28=_0x5075f1;$gameTemp[_0x17cc28(0x153)](),this[_0x17cc28(0x2c1)]();},Game_Event[_0x5075f1(0x173)]['pos']=function(_0x169932,_0x39670e){const _0x149b3e=_0x5075f1;return this[_0x149b3e(0xf5)]?this['posEventsMoveCore'](_0x169932,_0x39670e):Game_Character[_0x149b3e(0x173)][_0x149b3e(0x420)][_0x149b3e(0x342)](this,_0x169932,_0x39670e);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x19c)]=function(_0x10495c,_0x815442){const _0x2f2f4a=_0x5075f1;var _0xa56c07=this['x']-this[_0x2f2f4a(0xf5)]['left'],_0x2f1ed2=this['x']+this[_0x2f2f4a(0xf5)][_0x2f2f4a(0x397)],_0x354be7=this['y']-this[_0x2f2f4a(0xf5)]['up'],_0x302ba4=this['y']+this[_0x2f2f4a(0xf5)]['down'];return _0xa56c07<=_0x10495c&&_0x10495c<=_0x2f1ed2&&_0x354be7<=_0x815442&&_0x815442<=_0x302ba4;},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x47a)]=function(_0x140ab1,_0x2ad43d,_0x4c6b51){const _0x24b33f=_0x5075f1;for(let _0x5ec4b6=-this[_0x24b33f(0xf5)][_0x24b33f(0x4fa)];_0x5ec4b6<=this[_0x24b33f(0xf5)][_0x24b33f(0x397)];_0x5ec4b6++){for(let _0x2652ff=-this[_0x24b33f(0xf5)]['up'];_0x2652ff<=this[_0x24b33f(0xf5)][_0x24b33f(0x1ab)];_0x2652ff++){if(_0x24b33f(0x2a0)===_0x24b33f(0x3fd)){function _0x173b08(){const _0x27f665=_0x24b33f;_0x1828fe[_0x27f665(0x4b5)](_0x3195c6[_0x27f665(0x460)]),_0x221acf[_0x27f665(0x2cd)][_0x27f665(0x212)][_0x27f665(0x342)](this),_0x481650[_0x27f665(0x186)]();}}else{if(!Game_Character[_0x24b33f(0x173)]['canPass']['call'](this,_0x140ab1+_0x5ec4b6,_0x2ad43d+_0x2652ff,_0x4c6b51)){if(_0x24b33f(0x4a8)!==_0x24b33f(0x4a8)){function _0x346e24(){const _0x1566c8=_0x24b33f;if(_0x209997[_0x1566c8(0x1ce)]())_0x2011b9[_0x1566c8(0x3fa)](_0x683610);}}else return![];}}}}return!![];},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x30f)]=function(_0x1fa103,_0x17d6e1){const _0x50fb54=_0x5075f1;if(Imported[_0x50fb54(0x34a)]&&this[_0x50fb54(0x494)]())return this[_0x50fb54(0x50e)](_0x1fa103,_0x17d6e1);else{const _0x290c70=$gameMap[_0x50fb54(0x19f)](_0x1fa103,_0x17d6e1)[_0x50fb54(0x332)](_0x257c5f=>_0x257c5f!==this);return _0x290c70[_0x50fb54(0x13a)]>0x0;}},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x50e)]=function(_0x49edf,_0x2e6fcd){const _0x718862=_0x5075f1;if(!this[_0x718862(0x3a8)]()){if(_0x718862(0x10a)!=='gywco'){function _0x2acf41(){const _0x342717=_0x718862;this[_0x342717(0x478)]();}}else return![];}else{const _0x190307=$gameMap[_0x718862(0x19f)](_0x49edf,_0x2e6fcd)[_0x718862(0x332)](_0x523c69=>_0x523c69!==this&&_0x523c69[_0x718862(0x3a8)]());return _0x190307['length']>0x0;}},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x265)]=function(){const _0x3b8271=_0x5075f1;return this[_0x3b8271(0x28b)][_0x3b8271(0x2dc)]||'none';},Game_Event['prototype'][_0x5075f1(0x45c)]=function(){const _0xdcbb01=_0x5075f1;return this[_0xdcbb01(0x28b)][_0xdcbb01(0x409)]||0x0;},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x21e)]=function(){const _0xa237ab=_0x5075f1;return this[_0xa237ab(0x28b)][_0xa237ab(0x40d)]||[];},Game_Event[_0x5075f1(0x173)]['increaseSteps']=function(){const _0xb84827=_0x5075f1;Game_Character[_0xb84827(0x173)][_0xb84827(0x164)][_0xb84827(0x342)](this);if([_0xb84827(0x1df),'region']['includes'](this[_0xb84827(0x265)]()))return;$gamePlayer[_0xb84827(0x4ac)]([0x2]);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x262)]=Game_Event['prototype'][_0x5075f1(0x3e8)],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x3e8)]=function(){const _0x1b5d72=_0x5075f1;if(this['_trigger']!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x1b5d72(0x43f)](![]))return;if(!this[_0x1b5d72(0x39b)](![]))return;VisuMZ[_0x1b5d72(0x2cd)][_0x1b5d72(0x262)][_0x1b5d72(0x342)](this);},VisuMZ['EventsMoveCore']['Game_Event_updateParallel']=Game_Event[_0x5075f1(0x173)]['updateParallel'],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x363)]=function(){const _0x163480=_0x5075f1;if(!this[_0x163480(0x17b)])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this[_0x163480(0x39b)](!![]))return;VisuMZ[_0x163480(0x2cd)][_0x163480(0x214)][_0x163480(0x342)](this);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x43f)]=function(_0x23932b){const _0x444981=_0x5075f1;if(!_0x23932b&&$gameMap[_0x444981(0xb4)]())return![];if(!_0x23932b&&$gameMap[_0x444981(0x283)]())return![];if(this[_0x444981(0x21e)]()<=0x0)return!![];return $gamePlayer[_0x444981(0x3a0)](this);},Game_Event['prototype'][_0x5075f1(0x39b)]=function(_0x5e7b4d){const _0x5382e8=_0x5075f1;if(!_0x5e7b4d&&$gameMap['isEventRunning']())return![];if(!_0x5e7b4d&&$gameMap[_0x5382e8(0x283)]())return![];if([_0x5382e8(0x1df),_0x5382e8(0x243)]['includes'](this[_0x5382e8(0x265)]()))return!![];return $gamePlayer[_0x5382e8(0xf8)](this);},VisuMZ[_0x5075f1(0x4e1)]=function(_0x54dec8){const _0x98beff=_0x5075f1;for(const _0x567325 of $gameMap[_0x98beff(0x349)]()){if('iCtal'!==_0x98beff(0x3ac)){if(!_0x567325)continue;_0x567325[_0x98beff(0x48b)]()===_0x54dec8&&_0x567325['updateMoveSynch']();}else{function _0x123033(){const _0x16d9d8=_0x98beff;_0x8cbdf3[_0x16d9d8(0x3ce)](0x0);}}}},VisuMZ[_0x5075f1(0x19b)]=function(_0xf191e1){const _0x16ad4a=_0x5075f1;if(_0xf191e1===0x0)return $gamePlayer;return $gameMap[_0x16ad4a(0x44a)](_0xf191e1);},Game_Event[_0x5075f1(0x173)]['moveSynchTarget']=function(){const _0x5e98ca=_0x5075f1;return this['_moveSynch'][_0x5e98ca(0xa6)];},Game_Event['prototype']['moveSynchType']=function(){const _0x166287=_0x5075f1;return this[_0x166287(0x462)][_0x166287(0x2dc)];},Game_Event[_0x5075f1(0x173)]['realMoveSpeed']=function(){const _0xd58d9e=_0x5075f1;if(this[_0xd58d9e(0x48b)]()>=0x0){const _0x1963ee=VisuMZ[_0xd58d9e(0x19b)](this['moveSynchTarget']());if(_0x1963ee)return _0x1963ee[_0xd58d9e(0x258)]();}return Game_Character[_0xd58d9e(0x173)][_0xd58d9e(0x258)]['call'](this);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x513)]=function(){const _0x48b43d=_0x5075f1;this[_0x48b43d(0x462)][_0x48b43d(0x396)]=this[_0x48b43d(0x462)]['timer']||0x0,this[_0x48b43d(0x462)]['timer']--;if(this['_moveSynch'][_0x48b43d(0x396)]>0x0)return;this[_0x48b43d(0x462)][_0x48b43d(0x396)]=this[_0x48b43d(0x462)][_0x48b43d(0x14b)],this[_0x48b43d(0xc7)]();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0xc7)]=function(){const _0x8c77c3=_0x5075f1;switch(this[_0x8c77c3(0x3f6)]()){case'random':this[_0x8c77c3(0x189)]();break;case _0x8c77c3(0x1ef):this['processMoveSynchApproach']();break;case _0x8c77c3(0x2dd):this['processMoveSynchAway']();break;case'custom':this[_0x8c77c3(0x2a5)]();break;case _0x8c77c3(0x351):case _0x8c77c3(0x1c7):this[_0x8c77c3(0x252)]();break;case _0x8c77c3(0x3db):case _0x8c77c3(0x241):this[_0x8c77c3(0x27c)]();break;case _0x8c77c3(0x38e):case _0x8c77c3(0x4ef):case _0x8c77c3(0x295):case _0x8c77c3(0x2ea):this[_0x8c77c3(0x2bc)]();break;case _0x8c77c3(0x3f1):case _0x8c77c3(0x2b6):case _0x8c77c3(0x254):case _0x8c77c3(0x14a):this[_0x8c77c3(0x3e5)]();break;default:this[_0x8c77c3(0x189)]();break;}this[_0x8c77c3(0x259)]();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x189)]=function(){const _0x28d0c4=_0x5075f1,_0x531939=[0x2,0x4,0x6,0x8];if($gameMap[_0x28d0c4(0x159)]()){if(_0x28d0c4(0x13d)===_0x28d0c4(0x13d))_0x531939[_0x28d0c4(0x203)](0x1,0x3,0x7,0x9);else{function _0x305001(){const _0x2da181=_0x28d0c4;return!!this[_0x2da181(0x2ff)](_0x3c670f);}}}const _0x1857c4=[];for(const _0x214ff2 of _0x531939){if(this['canPass'](this['x'],this['y'],_0x214ff2))_0x1857c4[_0x28d0c4(0x203)](_0x214ff2);}if(_0x1857c4[_0x28d0c4(0x13a)]>0x0){const _0x5529e8=_0x1857c4[Math[_0x28d0c4(0x118)](_0x1857c4[_0x28d0c4(0x13a)])];this[_0x28d0c4(0x3c1)](_0x5529e8);}},Game_Event['prototype'][_0x5075f1(0x1db)]=function(){const _0x12d2f9=_0x5075f1,_0x495728=VisuMZ[_0x12d2f9(0x19b)](this['moveSynchTarget']());this['moveTowardCharacter'](_0x495728);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x75)]=function(){const _0x49eee1=_0x5075f1,_0x209816=VisuMZ[_0x49eee1(0x19b)](this[_0x49eee1(0x48b)]());this['moveAwayFromCharacter'](_0x209816);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x2a5)]=function(){const _0x2ad6ba=_0x5075f1;this[_0x2ad6ba(0x3d5)]();},Game_Event['prototype'][_0x5075f1(0x252)]=function(){const _0x47f071=_0x5075f1,_0x57eb61=VisuMZ[_0x47f071(0x19b)](this[_0x47f071(0x48b)]());this[_0x47f071(0x3c1)](_0x57eb61[_0x47f071(0x2b4)]());},Game_Event[_0x5075f1(0x173)]['processMoveSynchReverseMimic']=function(){const _0x49f0ae=_0x5075f1,_0x8c7693=VisuMZ['GetMoveSynchTarget'](this[_0x49f0ae(0x48b)]()),_0x4b127e=this[_0x49f0ae(0x4c2)](_0x8c7693[_0x49f0ae(0x2b4)]());this['executeMoveDir8'](this[_0x49f0ae(0x4c2)](_0x8c7693['direction']()));},Game_Event[_0x5075f1(0x173)]['processMoveSynchMirrorHorz']=function(){const _0x3d9e1e=_0x5075f1,_0x54c977=VisuMZ[_0x3d9e1e(0x19b)](this['moveSynchTarget']()),_0x32dde7=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x54c977[_0x3d9e1e(0x2b4)]()];this[_0x3d9e1e(0x3c1)](_0x32dde7);},Game_Event['prototype'][_0x5075f1(0x3e5)]=function(){const _0x288b85=_0x5075f1,_0x4bc311=VisuMZ[_0x288b85(0x19b)](this[_0x288b85(0x48b)]()),_0x167222=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x4bc311[_0x288b85(0x2b4)]()];this[_0x288b85(0x3c1)](_0x167222);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x1f7)]=function(){const _0x1f89df=_0x5075f1,_0x37c76b=$gameSystem[_0x1f89df(0x100)](this);if(!_0x37c76b)return;this[_0x1f89df(0x2de)](_0x37c76b['x'],_0x37c76b['y']),this[_0x1f89df(0x4e8)](_0x37c76b[_0x1f89df(0x93)]),this[_0x1f89df(0xe6)]===_0x37c76b[_0x1f89df(0x424)]&&(this[_0x1f89df(0x431)]=_0x37c76b[_0x1f89df(0x2e1)]);},Game_Event[_0x5075f1(0x173)]['updateMove']=function(){const _0x7a1207=_0x5075f1;Game_Character[_0x7a1207(0x173)][_0x7a1207(0x2e3)][_0x7a1207(0x342)](this),this[_0x7a1207(0x1e9)]();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x1ba)]=function(){const _0x4d4dce=_0x5075f1;if($gameMap[_0x4d4dce(0x344)]())return!![];return this[_0x4d4dce(0x199)];},Game_Event['prototype']['autosaveEventLocation']=function(){const _0x46b4b7=_0x5075f1;if(!this[_0x46b4b7(0x1ba)]())return;this['saveEventLocation']();},Game_Event[_0x5075f1(0x173)][_0x5075f1(0x4e4)]=function(){const _0x24ef4e=_0x5075f1;$gameSystem[_0x24ef4e(0x4e4)](this);},Game_Event[_0x5075f1(0x173)][_0x5075f1(0xaa)]=function(){$gameSystem['deleteSavedEventLocation'](this);},Game_Event['prototype'][_0x5075f1(0xd8)]=function(){const _0x2746fc=_0x5075f1;return $gameSystem[_0x2746fc(0xd8)](this)?Game_Character['prototype'][_0x2746fc(0xd8)][_0x2746fc(0x342)](this):{'iconIndex':0x0,'bufferX':settings[_0x2746fc(0x327)][_0x2746fc(0x1c9)],'bufferY':settings[_0x2746fc(0x327)]['BufferY'],'blendMode':settings[_0x2746fc(0x327)]['BlendMode']};},Game_Event['prototype'][_0x5075f1(0x35b)]=function(){const _0x5a31d3=_0x5075f1;return this[_0x5a31d3(0xe0)];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x1ad)]=Game_Event['prototype']['meetsConditions'],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x27e)]=function(_0x23b09e){const _0x380aa7=_0x5075f1,_0x542c04=VisuMZ[_0x380aa7(0x2cd)][_0x380aa7(0x1ad)][_0x380aa7(0x342)](this,_0x23b09e);if(!_0x542c04)return![];return this['meetsCPC'](_0x23b09e);},Game_Event[_0x5075f1(0x173)]['meetsCPC']=function(_0x1a01a3){const _0x442528=_0x5075f1;VisuMZ[_0x442528(0x2cd)][_0x442528(0x488)]['loadCPC'](_0x1a01a3),this[_0x442528(0xe0)]=_0x1a01a3['CPC'][_0x442528(0x13a)]>0x0;if(_0x1a01a3[_0x442528(0x32a)]===undefined){if('nDcpL'===_0x442528(0x31b)){function _0x21b2e4(){const _0x98538b=_0x442528;return this[_0x98538b(0x135)](_0x333bbd(_0x53bd5a['$1']));}}else VisuMZ['EventsMoveCore'][_0x442528(0x488)][_0x442528(0x34f)](_0x1a01a3);}if(_0x1a01a3[_0x442528(0x32a)][_0x442528(0x13a)]>0x0)return $gameMap[_0x442528(0x44a)](this[_0x442528(0x1a8)])&&VisuMZ[_0x442528(0x2cd)]['CustomPageConditions'][_0x442528(0x1b7)](_0x1a01a3[_0x442528(0x32a)],this['_eventId']);return!![];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x464)]=Game_Troop[_0x5075f1(0x173)][_0x5075f1(0x27e)],Game_Troop[_0x5075f1(0x173)][_0x5075f1(0x27e)]=function(_0x4e008c){const _0x5c2c38=_0x5075f1;var _0x27a12c=VisuMZ[_0x5c2c38(0x2cd)]['Game_Troop_meetsConditionsCPC']['call'](this,_0x4e008c);return _0x27a12c&&this[_0x5c2c38(0x74)](_0x4e008c);},Game_Troop[_0x5075f1(0x173)][_0x5075f1(0x74)]=function(_0x2a11c3){const _0x32084c=_0x5075f1;if(_0x2a11c3['CPC']===undefined){if(_0x32084c(0x3ca)===_0x32084c(0x505)){function _0x5c2adb(){const _0x5a1d4d=_0x32084c;this['_selfTargetNumberInput']=_0xc3df9b[_0x5a1d4d(0x96)](),_0x17ecfe[_0x5a1d4d(0x2cd)]['Game_Message_setNumberInput'][_0x5a1d4d(0x342)](this,_0x540e0d,_0x723a5);}}else VisuMZ[_0x32084c(0x2cd)]['CustomPageConditions'][_0x32084c(0x34f)](_0x2a11c3);}if(_0x2a11c3[_0x32084c(0x32a)]['length']>0x0)return VisuMZ['EventsMoveCore'][_0x32084c(0x488)]['metCPC'](_0x2a11c3[_0x32084c(0x32a)],0x0);return!![];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x4dd)]=Game_Event['prototype'][_0x5075f1(0x2de)],Game_Event['prototype']['locate']=function(_0x1d6a57,_0x5715bf){const _0x2a2219=_0x5075f1;VisuMZ[_0x2a2219(0x2cd)][_0x2a2219(0x4dd)][_0x2a2219(0x342)](this,_0x1d6a57,_0x5715bf),this[_0x2a2219(0x361)]=_0x1d6a57,this[_0x2a2219(0x402)]=_0x5715bf;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x7a)]=Game_Event['prototype'][_0x5075f1(0x30a)],Game_Event[_0x5075f1(0x173)][_0x5075f1(0x30a)]=function(){const _0x32e7c1=_0x5075f1,_0x5c9ff1=$gameMap[_0x32e7c1(0x409)](this['x'],this['y'],this['_randomHomeX'],this[_0x32e7c1(0x402)]),_0x81d05b=_0x5c9ff1*(this[_0x32e7c1(0x1bb)]||0x0);if(Math[_0x32e7c1(0x454)]()>=_0x81d05b)VisuMZ[_0x32e7c1(0x2cd)][_0x32e7c1(0x7a)]['call'](this);else{if(_0x32e7c1(0x353)!==_0x32e7c1(0x317))this[_0x32e7c1(0x23d)]();else{function _0x366660(){const _0x575855=_0x32e7c1;this[_0x575855(0x172)]();}}}},Game_Event['prototype'][_0x5075f1(0x23d)]=function(){const _0x131ddd=_0x5075f1,_0x460942=this['deltaXFrom'](this[_0x131ddd(0x361)]),_0x41f961=this[_0x131ddd(0x18c)](this['_randomHomeY']);if(Math['abs'](_0x460942)>Math[_0x131ddd(0x418)](_0x41f961)){if('guevH'!==_0x131ddd(0x32f)){function _0x34d196(){const _0xcf0130=_0x131ddd;if(_0x550490)this[_0xcf0130(0x4c5)](_0x27810c['x'],_0x19f458['y']);}}else this[_0x131ddd(0x251)](_0x460942>0x0?0x4:0x6),!this[_0x131ddd(0x24c)]()&&_0x41f961!==0x0&&this[_0x131ddd(0x251)](_0x41f961>0x0?0x8:0x2);}else{if(_0x41f961!==0x0){if(_0x131ddd(0x23b)===_0x131ddd(0x23b)){this['moveStraight'](_0x41f961>0x0?0x8:0x2);if(!this[_0x131ddd(0x24c)]()&&_0x460942!==0x0){if(_0x131ddd(0xd6)===_0x131ddd(0x3fc)){function _0x2a55bb(){const _0x476b5e=_0x131ddd;this[_0x476b5e(0x183)]=_0x5a78a7;}}else this[_0x131ddd(0x251)](_0x460942>0x0?0x4:0x6);}}else{function _0x26498b(){const _0x2834b8=_0x131ddd;return this[_0x2834b8(0x28b)][_0x2834b8(0x40d)]||[];}}}}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x393)]=Game_Interpreter[_0x5075f1(0x173)][_0x5075f1(0x51a)],Game_Interpreter[_0x5075f1(0x173)][_0x5075f1(0x51a)]=function(){const _0x23fbe0=_0x5075f1;if(this[_0x23fbe0(0x4b3)]===_0x23fbe0(0x37d)){if(_0x23fbe0(0x468)===_0x23fbe0(0x468)){if(window[this['_callEventMap']])this['_waitMode']='',this[_0x23fbe0(0x362)]();else return!![];}else{function _0x1a765a(){const _0xd1d86=_0x23fbe0;this[_0xd1d86(0x337)][_0xd1d86(0x422)]=_0x205e50(_0x25e4a8['$1']);}}}else{if(_0x23fbe0(0x4e5)===_0x23fbe0(0x406)){function _0x760850(){const _0x4bef37=_0x23fbe0;return _0x5813ef['EventsMoveCore'][_0x4bef37(0x2eb)][_0x4bef37(0xca)]['CarryPose'];}}else return VisuMZ[_0x23fbe0(0x2cd)]['Game_Interpreter_updateWaitMode'][_0x23fbe0(0x342)](this);}},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x19e)]=Game_Interpreter['prototype'][_0x5075f1(0x172)],Game_Interpreter[_0x5075f1(0x173)]['executeCommand']=function(){const _0x54164c=_0x5075f1,_0x3e48a9=$gameMap&&this['_eventId']?$gameMap['event'](this[_0x54164c(0x1a8)]):null;$gameTemp[_0x54164c(0x4b5)](_0x3e48a9);const _0x293bd8=VisuMZ[_0x54164c(0x2cd)][_0x54164c(0x19e)][_0x54164c(0x342)](this);return $gameTemp[_0x54164c(0x186)](),_0x293bd8;},VisuMZ[_0x5075f1(0x2cd)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x5075f1(0x173)][_0x5075f1(0x244)],Game_Interpreter[_0x5075f1(0x173)]['command357']=function(_0x12c301){const _0x46e268=_0x5075f1;return $gameTemp[_0x46e268(0x4f8)](this),VisuMZ[_0x46e268(0x2cd)][_0x46e268(0x137)][_0x46e268(0x342)](this,_0x12c301);},Game_Interpreter[_0x5075f1(0x173)][_0x5075f1(0x41b)]=function(_0x4c62a5){const _0x5675c7=_0x5075f1;this['_callEventData']=_0x4c62a5;const _0x574d26=_0x5675c7(0x4fd)[_0x5675c7(0x184)](_0x4c62a5[_0x5675c7(0x466)][_0x5675c7(0x348)](0x3));this['_callEventMap']=_0x5675c7(0xb8)+Graphics[_0x5675c7(0x2ec)]+'_'+this[_0x5675c7(0x437)](),DataManager[_0x5675c7(0x4c0)](this[_0x5675c7(0x3e9)],_0x574d26),window[this['_callEventMap']]?this[_0x5675c7(0x362)]():this[_0x5675c7(0x280)](_0x5675c7(0x37d));},Game_Interpreter[_0x5075f1(0x173)]['startCallEvent']=function(){const _0x23343e=_0x5075f1,_0x143959=this[_0x23343e(0x305)],_0x286b2b=window[this[_0x23343e(0x3e9)]],_0x13971d=_0x286b2b[_0x23343e(0x349)][_0x143959[_0x23343e(0x437)]];if(_0x13971d&&_0x13971d['pages'][_0x143959[_0x23343e(0x472)]-0x1]){if(_0x23343e(0x3df)!==_0x23343e(0x3df)){function _0x3905a5(){return![];}}else{const _0x6c6fd5=_0x13971d['pages'][_0x143959[_0x23343e(0x472)]-0x1]['list'];this[_0x23343e(0x4e9)](_0x6c6fd5,this[_0x23343e(0x437)]());}}window[this[_0x23343e(0x3e9)]]=undefined,this[_0x23343e(0x3e9)]=undefined,this[_0x23343e(0x305)]=undefined;};function Game_CPCInterpreter(){const _0x228b18=_0x5075f1;this[_0x228b18(0x150)][_0x228b18(0x487)](this,arguments);};Game_CPCInterpreter[_0x5075f1(0x173)]=Object[_0x5075f1(0x3e7)](Game_Interpreter[_0x5075f1(0x173)]),Game_CPCInterpreter[_0x5075f1(0x173)][_0x5075f1(0x3e1)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x5075f1(0xf4)]=function(){const _0x1d9e57=_0x5075f1;Game_Interpreter[_0x1d9e57(0x173)]['clear'][_0x1d9e57(0x342)](this),this[_0x1d9e57(0x42f)]=![];},Game_CPCInterpreter['prototype'][_0x5075f1(0x38b)]=function(){const _0x59a291=_0x5075f1;while(this[_0x59a291(0x234)]()){this[_0x59a291(0x172)]();}},Game_CPCInterpreter['prototype'][_0x5075f1(0x40a)]=function(_0x3df9c7){const _0x19ac4a=_0x5075f1;return Game_Interpreter[_0x19ac4a(0x173)][_0x19ac4a(0x40a)][_0x19ac4a(0x342)](this,_0x3df9c7),this[_0x19ac4a(0x169)][_0x19ac4a(0x1b0)](_0x509e5f=>_0x509e5f[_0x19ac4a(0x28d)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x19ac4a(0x42f)]=!![]),!![];},VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect']=Scene_Map[_0x5075f1(0x173)][_0x5075f1(0x392)],Scene_Map[_0x5075f1(0x173)]['startEncounterEffect']=function(){const _0x154377=_0x5075f1;VisuMZ['EventsMoveCore'][_0x154377(0x2be)]['call'](this),this[_0x154377(0xc4)][_0x154377(0x250)]();},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x43a)]=Scene_Load[_0x5075f1(0x173)]['onLoadSuccess'],Scene_Load[_0x5075f1(0x173)][_0x5075f1(0x1eb)]=function(){const _0x10d8c5=_0x5075f1;if($gameMap)$gameMap['clearEventCache']();VisuMZ[_0x10d8c5(0x2cd)][_0x10d8c5(0x43a)][_0x10d8c5(0x342)](this);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x326)]=Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x2c8)],Sprite_Character['prototype'][_0x5075f1(0x2c8)]=function(){const _0x3831ca=_0x5075f1;VisuMZ[_0x3831ca(0x2cd)][_0x3831ca(0x326)][_0x3831ca(0x342)](this),this[_0x3831ca(0x178)](),this[_0x3831ca(0x3a4)]();},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x178)]=function(){const _0x16a109=_0x5075f1;this[_0x16a109(0x13f)]=0xff;},Sprite_Character[_0x5075f1(0x173)]['createIconSprite']=function(){const _0x528ad1=_0x5075f1;this[_0x528ad1(0x72)]=new Sprite(),this[_0x528ad1(0x72)][_0x528ad1(0x26d)]=ImageManager[_0x528ad1(0x8e)](_0x528ad1(0x3ec)),this['_eventIconSprite']['bitmap'][_0x528ad1(0x87)]=![],this[_0x528ad1(0x72)][_0x528ad1(0x3be)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x528ad1(0x2f2)]['x']=0.5,this['_eventIconSprite'][_0x528ad1(0x2f2)]['y']=0x1,this['addChild'](this[_0x528ad1(0x72)]);},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0xf6)]=function(){const _0x192f6d=_0x5075f1;return this[_0x192f6d(0x12f)]&&this[_0x192f6d(0x12f)]['match'](/\[VS8\]/i);},Sprite_Character['prototype'][_0x5075f1(0x46d)]=function(){const _0x233634=_0x5075f1;return this[_0x233634(0xf6)]()&&VisuMZ[_0x233634(0x2cd)][_0x233634(0x2eb)][_0x233634(0xca)]['AutoBuffer'];},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x13c)]=Sprite_Character['prototype'][_0x5075f1(0x259)],Sprite_Character[_0x5075f1(0x173)]['update']=function(){const _0x252562=_0x5075f1;VisuMZ[_0x252562(0x2cd)][_0x252562(0x13c)]['call'](this);VisuMZ[_0x252562(0x2cd)][_0x252562(0x2eb)]['Movement'][_0x252562(0x127)]&&this[_0x252562(0x354)]();if(this[_0x252562(0x502)]){if(_0x252562(0x450)!==_0x252562(0x450)){function _0x5e19a0(){_0x11a8b2+=_0x576a6c['parameters'][0x0];}}else this[_0x252562(0x478)]();}this['_eventIconSprite']&&this['updateEventIconSprite']();},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x4b2)]=Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x452)],Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x452)]=function(){const _0x526edb=_0x5075f1;VisuMZ[_0x526edb(0x2cd)]['Sprite_Character_setTileBitmap'][_0x526edb(0x342)](this),this[_0x526edb(0x26d)][_0x526edb(0x1da)](this[_0x526edb(0xfe)][_0x526edb(0x4f7)](this));},VisuMZ[_0x5075f1(0x2cd)]['Sprite_Character_setCharacterBitmap']=Sprite_Character[_0x5075f1(0x173)]['setCharacterBitmap'],Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x36d)]=function(){const _0xe7bb02=_0x5075f1;VisuMZ['EventsMoveCore'][_0xe7bb02(0x255)][_0xe7bb02(0x342)](this),this[_0xe7bb02(0x26d)][_0xe7bb02(0x1da)](this[_0xe7bb02(0xfe)]['bind'](this));},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0xfe)]=function(){const _0x14803b=_0x5075f1;if(!this[_0x14803b(0x26d)])return;this[_0x14803b(0x26d)][_0x14803b(0x87)]=!!VisuMZ[_0x14803b(0x2cd)][_0x14803b(0x2eb)][_0x14803b(0x3ab)][_0x14803b(0x2bd)];},VisuMZ['EventsMoveCore'][_0x5075f1(0xa9)]=Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x240)],Sprite_Character['prototype']['characterPatternY']=function(){const _0x517d11=_0x5075f1;if(this[_0x517d11(0xf6)]()){if(_0x517d11(0x3ed)===_0x517d11(0x3ed))return this[_0x517d11(0x345)]();else{function _0x2e18b9(){const _0x1c1913=_0x517d11;this[_0x1c1913(0x502)][_0x1c1913(0xeb)]['x']=_0x11364a['min'](0x1,this[_0x1c1913(0x502)][_0x1c1913(0xeb)]['x']+0.1),this[_0x1c1913(0x502)][_0x1c1913(0xeb)]['y']=_0x36d444[_0x1c1913(0x1d4)](0x1,this[_0x1c1913(0x502)][_0x1c1913(0xeb)]['y']+0.1);}}}else return VisuMZ[_0x517d11(0x2cd)][_0x517d11(0xa9)][_0x517d11(0x342)](this);},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x345)]=function(){const _0x4ebf99=_0x5075f1,_0x2d624f=this['_character'][_0x4ebf99(0x93)](),_0x2b795b=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x2b795b[_0x2d624f]-0x2)/0x2;},Sprite_Character['prototype'][_0x5075f1(0x354)]=function(){const _0x1359d5=_0x5075f1;this[_0x1359d5(0x1a9)]=0x0;if(this[_0x1359d5(0x455)]()){const _0x461fda=VisuMZ[_0x1359d5(0x2cd)][_0x1359d5(0x2eb)][_0x1359d5(0x3ab)],_0x2fc862=this[_0x1359d5(0x371)][_0x1359d5(0x93)]();let _0x27d4b8=0x0;if([0x1,0x4,0x7][_0x1359d5(0xd5)](_0x2fc862))_0x27d4b8=_0x461fda[_0x1359d5(0x404)];if([0x3,0x6,0x9]['includes'](_0x2fc862))_0x27d4b8=_0x461fda['TiltRight'];[0x2,0x8][_0x1359d5(0xd5)](_0x2fc862)&&(_0x27d4b8=[-_0x461fda[_0x1359d5(0x379)],0x0,_0x461fda[_0x1359d5(0x379)]][this[_0x1359d5(0x371)][_0x1359d5(0x399)]()]);if(this['_reflection'])_0x27d4b8*=-0x1;this[_0x1359d5(0x1a9)]=_0x27d4b8;}},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x455)]=function(){const _0x15ba55=_0x5075f1;if(this['_dragonbones'])return![];return this['_character'][_0x15ba55(0x1fa)]()&&!this[_0x15ba55(0x371)][_0x15ba55(0x233)]()&&!this[_0x15ba55(0x371)]['isPosing']()&&this[_0x15ba55(0x109)]()===0x0;},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x478)]=function(){const _0xfbb50c=_0x5075f1;this[_0xfbb50c(0x502)]['x']=this['_character']['shadowX'](),this[_0xfbb50c(0x502)]['y']=this[_0xfbb50c(0x371)][_0xfbb50c(0x1ca)](),this[_0xfbb50c(0x502)]['opacity']=this[_0xfbb50c(0x4d2)],this[_0xfbb50c(0x502)][_0xfbb50c(0x210)]=this['_character'][_0xfbb50c(0x1e2)](),this[_0xfbb50c(0x502)]['_hidden']=this[_0xfbb50c(0x366)];if(!this[_0xfbb50c(0x371)][_0xfbb50c(0x134)]()){if('Bzuys'===_0xfbb50c(0x16a)){function _0xdf31e2(){const _0x344838=_0xfbb50c;_0x36be01=_0x3ccb56[_0x344838(0x97)](_0xa0d8b7,_0x2e9149);}}else this[_0xfbb50c(0x502)][_0xfbb50c(0xeb)]['x']=Math['min'](0x1,this[_0xfbb50c(0x502)][_0xfbb50c(0xeb)]['x']+0.1),this['_shadowSprite'][_0xfbb50c(0xeb)]['y']=Math[_0xfbb50c(0x1d4)](0x1,this[_0xfbb50c(0x502)][_0xfbb50c(0xeb)]['y']+0.1);}else this['_shadowSprite']['scale']['x']=Math[_0xfbb50c(0x97)](0x0,this[_0xfbb50c(0x502)][_0xfbb50c(0xeb)]['x']-0.1),this[_0xfbb50c(0x502)][_0xfbb50c(0xeb)]['y']=Math['max'](0x0,this['_shadowSprite'][_0xfbb50c(0xeb)]['y']-0.1);},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x272)]=function(){const _0x1bb0af=_0x5075f1,_0x5b6e3d=this['_eventIconSprite'],_0x143943=this[_0x1bb0af(0x109)]();if(_0x143943<=0x0)return _0x5b6e3d[_0x1bb0af(0x3be)](0x0,0x0,0x0,0x0);else{const _0x2794fc=ImageManager[_0x1bb0af(0x45a)],_0x53ed7f=ImageManager[_0x1bb0af(0x85)],_0x3deff9=_0x143943%0x10*_0x2794fc,_0x2c724d=Math[_0x1bb0af(0x500)](_0x143943/0x10)*_0x53ed7f;_0x5b6e3d[_0x1bb0af(0x3be)](_0x3deff9,_0x2c724d,_0x2794fc,_0x53ed7f),this['visible']=!![];}const _0x5a701e=this['_character']['getEventIconData']();if(this[_0x1bb0af(0x46d)]()){if(_0x1bb0af(0x4b4)==='qkKDp')this[_0x1bb0af(0x412)](_0x5b6e3d);else{function _0x4972fc(){const _0x2ecb37=_0x1bb0af,_0x52303b=_0x11e11b(_0x2f4e32['$1']);_0x52303b<_0x17982f?(_0x37c40f(_0x2ecb37(0x39c)[_0x2ecb37(0x184)](_0x1837f6,_0x52303b,_0x296940)),_0x4bca24[_0x2ecb37(0x36e)]()):_0x216c80=_0x5aa6e8['max'](_0x52303b,_0x182646);}}}else{if(_0x1bb0af(0x276)!==_0x1bb0af(0x276)){function _0x4ebfe7(){const _0x53e344=_0x1bb0af;this[_0x53e344(0x42f)]=!![];}}else _0x5b6e3d['x']=_0x5a701e?_0x5a701e[_0x1bb0af(0x422)]:0x0,_0x5b6e3d['y']=_0x5a701e?-this[_0x1bb0af(0x461)]+_0x5a701e[_0x1bb0af(0x205)]:0x0;}_0x5b6e3d[_0x1bb0af(0x360)]=_0x5a701e?_0x5a701e[_0x1bb0af(0x360)]:0x0,this[_0x1bb0af(0x3b1)](_0x5b6e3d),this[_0x1bb0af(0x492)](_0x5b6e3d),_0x5b6e3d[_0x1bb0af(0x1a9)]=-this['rotation'];},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x412)]=function(_0x14695f){const _0x23231e=_0x5075f1;_0x14695f['x']=0x0,_0x14695f['y']=-this[_0x23231e(0x461)]+this[_0x23231e(0x461)]*0x2/0x5,this[_0x23231e(0x371)][_0x23231e(0x399)]()!==0x1&&(_0x14695f['y']+=0x1);},Sprite_Character[_0x5075f1(0x173)][_0x5075f1(0x109)]=function(){const _0x38ee32=_0x5075f1;if(!this['_character'])return 0x0;if(this[_0x38ee32(0x371)]['_erased'])return 0x0;const _0x1d6f78=this[_0x38ee32(0x371)]['getEventIconData']();return _0x1d6f78?_0x1d6f78[_0x38ee32(0xef)]||0x0:0x0;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x1a6)]=Sprite_Balloon[_0x5075f1(0x173)][_0x5075f1(0x33e)],Sprite_Balloon[_0x5075f1(0x173)][_0x5075f1(0x33e)]=function(_0x454e98,_0x245db6){const _0x4e7a09=_0x5075f1;VisuMZ[_0x4e7a09(0x2cd)][_0x4e7a09(0x1a6)][_0x4e7a09(0x342)](this,_0x454e98,_0x245db6);if(VisuMZ[_0x4e7a09(0x2cd)][_0x4e7a09(0x2eb)]['VS8'][_0x4e7a09(0x368)]){if(_0x4e7a09(0x92)===_0x4e7a09(0x1a3)){function _0x1d9582(){const _0x19df9d=_0x4e7a09;if(!_0x3c1014['eventLabelsVisible']())return![];if(this[_0x19df9d(0x46c)]?.[_0x19df9d(0x2d1)])return![];if(_0xd65fd1['_scene']['_encounterEffectDuration']>0x0)return![];const _0x4248db=_0x3f0534['x'],_0x485070=_0x155196['y'],_0x155673=this[_0x19df9d(0x46c)]['x'],_0x1d487a=this[_0x19df9d(0x46c)]['y'];if(this[_0x19df9d(0x37c)]===_0x4248db&&this['_visiblePlayerY']===_0x485070&&this[_0x19df9d(0x333)]===_0x155673&&this[_0x19df9d(0x38c)]===_0x1d487a)return this[_0x19df9d(0x1c1)];this[_0x19df9d(0x37c)]=_0x15bbde['x'],this['_visiblePlayerY']=_0x1511eb['y'],this[_0x19df9d(0x333)]=this[_0x19df9d(0x46c)]['x'],this[_0x19df9d(0x38c)]=this[_0x19df9d(0x46c)]['y'];if(_0x5eb2b0['absDistance'](_0x4248db,_0x485070,_0x155673,_0x1d487a)>this['_event'][_0x19df9d(0x31a)]())return this['_cacheVisibility']=![],![];return this['_cacheVisibility']=!![],!![];}}else this[_0x4e7a09(0x486)]['_character'][_0x4e7a09(0x24a)](_0x245db6,this[_0x4e7a09(0x275)]);}},VisuMZ[_0x5075f1(0x2cd)]['Sprite_Balloon_updatePosition']=Sprite_Balloon['prototype'][_0x5075f1(0x2c3)],Sprite_Balloon['prototype'][_0x5075f1(0x2c3)]=function(){const _0x4573a7=_0x5075f1;VisuMZ[_0x4573a7(0x2cd)][_0x4573a7(0x4a1)][_0x4573a7(0x342)](this),this[_0x4573a7(0x9f)]();},Sprite_Balloon[_0x5075f1(0x173)]['updateVS8BalloonOffsets']=function(){const _0x2ff6a9=_0x5075f1;this[_0x2ff6a9(0x486)][_0x2ff6a9(0x371)][_0x2ff6a9(0xf6)]()&&(this['x']+=VisuMZ[_0x2ff6a9(0x2cd)][_0x2ff6a9(0x2eb)][_0x2ff6a9(0xca)][_0x2ff6a9(0x45b)],this['y']+=VisuMZ[_0x2ff6a9(0x2cd)][_0x2ff6a9(0x2eb)][_0x2ff6a9(0xca)][_0x2ff6a9(0xc8)]);},Sprite_Timer[_0x5075f1(0x173)][_0x5075f1(0x196)]=function(){const _0x552171=_0x5075f1;this['bitmap']=new Bitmap(Math[_0x552171(0xba)](Graphics[_0x552171(0xb6)]/0x2),0x30),this[_0x552171(0x26d)][_0x552171(0x46e)]=this['fontFace'](),this['bitmap'][_0x552171(0x26a)]=this[_0x552171(0x26a)](),this[_0x552171(0x26d)][_0x552171(0x15e)]=ColorManager[_0x552171(0x15e)]();},Sprite_Timer[_0x5075f1(0x173)][_0x5075f1(0x290)]=function(){const _0x104746=_0x5075f1,_0x5929e6=Math[_0x104746(0x500)](this[_0x104746(0x1fe)]/0x3c/0x3c),_0x1c58a6=Math['floor'](this[_0x104746(0x1fe)]/0x3c)%0x3c,_0x41d785=this[_0x104746(0x1fe)]%0x3c;let _0x5057f6=_0x1c58a6['padZero'](0x2)+':'+_0x41d785['padZero'](0x2);if(_0x5929e6>0x0)_0x5057f6='%1:%2'[_0x104746(0x184)](_0x5929e6,_0x5057f6);return _0x5057f6;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x433)]=Spriteset_Map[_0x5075f1(0x173)][_0x5075f1(0x1e0)],Spriteset_Map[_0x5075f1(0x173)]['createLowerLayer']=function(){const _0x50a2be=_0x5075f1;VisuMZ[_0x50a2be(0x2cd)]['Spriteset_Map_createLowerLayer'][_0x50a2be(0x342)](this),this[_0x50a2be(0x4c3)]();},VisuMZ[_0x5075f1(0x2cd)]['Spriteset_Map_createShadow']=Spriteset_Map[_0x5075f1(0x173)][_0x5075f1(0x48d)],Spriteset_Map[_0x5075f1(0x173)][_0x5075f1(0x48d)]=function(){const _0x5eec5e=_0x5075f1;VisuMZ['EventsMoveCore'][_0x5eec5e(0x2e2)][_0x5eec5e(0x342)](this),this['createShadows']();},Spriteset_Map[_0x5075f1(0x173)][_0x5075f1(0x4a2)]=function(){const _0x4821bc=_0x5075f1;if(!VisuMZ[_0x4821bc(0x2cd)][_0x4821bc(0x2eb)][_0x4821bc(0x3ab)][_0x4821bc(0x47e)])return;for(const _0x39e44d of this[_0x4821bc(0x20c)]){this[_0x4821bc(0x456)](_0x39e44d);}},Spriteset_Map[_0x5075f1(0x173)][_0x5075f1(0x456)]=function(_0x4226ad){const _0x53ae2e=_0x5075f1;_0x4226ad[_0x53ae2e(0x502)]=new Sprite(),_0x4226ad['_shadowSprite']['_filename']=_0x4226ad[_0x53ae2e(0x371)]['shadowFilename'](),_0x4226ad[_0x53ae2e(0x502)][_0x53ae2e(0x26d)]=ImageManager[_0x53ae2e(0x8e)](_0x4226ad[_0x53ae2e(0x502)][_0x53ae2e(0xb3)]),_0x4226ad['_shadowSprite']['anchor']['x']=0.5,_0x4226ad[_0x53ae2e(0x502)][_0x53ae2e(0x2f2)]['y']=0x1,_0x4226ad[_0x53ae2e(0x502)]['z']=0x0,this[_0x53ae2e(0x421)][_0x53ae2e(0x492)](_0x4226ad[_0x53ae2e(0x502)]);},Spriteset_Map[_0x5075f1(0x173)][_0x5075f1(0x250)]=function(){const _0x251cc4=_0x5075f1;if(!VisuMZ[_0x251cc4(0x2cd)][_0x251cc4(0x2eb)][_0x251cc4(0x3ab)][_0x251cc4(0x47e)])return;for(const _0x675b75 of this[_0x251cc4(0x20c)]){this[_0x251cc4(0x421)][_0x251cc4(0x3b1)](_0x675b75[_0x251cc4(0x502)]);}},Spriteset_Map['prototype']['createLabelWindows']=function(){const _0x31c084=_0x5075f1;this[_0x31c084(0x517)]=[];for(const _0x389f1a of $gameMap[_0x31c084(0x349)]()){this['createLabelWindowForTarget'](_0x389f1a);}},Spriteset_Map[_0x5075f1(0x173)][_0x5075f1(0x131)]=function(_0x5126e4){const _0x5bcf0b=_0x5075f1;if(!this[_0x5bcf0b(0xb7)](_0x5126e4))return;const _0x390b4b=new Window_EventLabel(_0x5126e4);_0x390b4b['z']=0x8,_0x390b4b[_0x5bcf0b(0x4ab)]=Sprite[_0x5bcf0b(0x216)]++,this['_tilemap'][_0x5bcf0b(0x492)](_0x390b4b),this['_labelWindows'][_0x5bcf0b(0x203)](_0x390b4b);},Spriteset_Map['prototype'][_0x5075f1(0xb7)]=function(_0x426a68){const _0x35969c=_0x5075f1,_0x4b2c1e=_0x426a68[_0x35969c(0x44a)]();if(_0x4b2c1e[_0x35969c(0x508)]['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x4b2c1e[_0x35969c(0x508)][_0x35969c(0x28d)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x32eeb3 of _0x4b2c1e['pages']){let _0x53a8e1='';for(const _0x106381 of _0x32eeb3[_0x35969c(0x16c)]){[0x6c,0x198][_0x35969c(0xd5)](_0x106381[_0x35969c(0x496)])&&(_0x53a8e1+=_0x106381['parameters'][0x0]);}if(_0x53a8e1[_0x35969c(0x28d)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x53a8e1[_0x35969c(0x28d)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x35969c(0x29d)===_0x35969c(0x29d))return!![];else{function _0x510a52(){const _0x31f11f=_0x35969c;_0x325865['EventsMoveCore'][_0x31f11f(0x488)][_0x31f11f(0x34f)](_0x1083bf),this[_0x31f11f(0xe0)]=_0x1c4979[_0x31f11f(0x32a)][_0x31f11f(0x13a)]>0x0;_0x5c9041[_0x31f11f(0x32a)]===_0x1215ee&&_0x361c77[_0x31f11f(0x2cd)][_0x31f11f(0x488)][_0x31f11f(0x34f)](_0x147309);if(_0x457fab[_0x31f11f(0x32a)][_0x31f11f(0x13a)]>0x0)return _0xc86af8[_0x31f11f(0x44a)](this[_0x31f11f(0x1a8)])&&_0xe31e19[_0x31f11f(0x2cd)][_0x31f11f(0x488)][_0x31f11f(0x1b7)](_0x18ab27['CPC'],this[_0x31f11f(0x1a8)]);return!![];}}}}return![];},Spriteset_Map['prototype'][_0x5075f1(0x113)]=function(_0x432126){const _0x595790=_0x5075f1;this[_0x595790(0x20c)]=this[_0x595790(0x20c)]||[];const _0x2e16d9=new Sprite_Character(_0x432126);this[_0x595790(0x20c)][_0x595790(0x203)](_0x2e16d9),this[_0x595790(0x421)]['addChild'](_0x2e16d9),this[_0x595790(0x456)](_0x2e16d9),this['createLabelWindowForTarget'](_0x432126),_0x2e16d9[_0x595790(0x259)]();},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x167)]=Game_Message['prototype'][_0x5075f1(0x3af)],Game_Message[_0x5075f1(0x173)][_0x5075f1(0x3af)]=function(_0x31b9ea,_0x5089d9){const _0xe2b6a2=_0x5075f1;this['_selfTargetNumberInput']=$gameTemp[_0xe2b6a2(0x96)](),VisuMZ[_0xe2b6a2(0x2cd)][_0xe2b6a2(0x167)]['call'](this,_0x31b9ea,_0x5089d9);},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x212)]=Window_NumberInput[_0x5075f1(0x173)]['start'],Window_NumberInput[_0x5075f1(0x173)][_0x5075f1(0x2c1)]=function(){const _0x3eb5b2=_0x5075f1;$gameTemp['registerSelfTarget']($gameMessage[_0x3eb5b2(0x460)]),VisuMZ['EventsMoveCore'][_0x3eb5b2(0x212)][_0x3eb5b2(0x342)](this),$gameTemp[_0x3eb5b2(0x186)]();},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x2ae)]=Window_NumberInput[_0x5075f1(0x173)]['processOk'],Window_NumberInput[_0x5075f1(0x173)][_0x5075f1(0x1d3)]=function(){const _0x14896f=_0x5075f1;$gameTemp[_0x14896f(0x4b5)]($gameMessage[_0x14896f(0x460)]),VisuMZ[_0x14896f(0x2cd)][_0x14896f(0x2ae)][_0x14896f(0x342)](this),$gameTemp[_0x14896f(0x186)](),$gameMessage[_0x14896f(0x460)]=undefined;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x2b3)]=Game_Message[_0x5075f1(0x173)][_0x5075f1(0x11b)],Game_Message[_0x5075f1(0x173)][_0x5075f1(0x11b)]=function(_0x3fd2d6,_0x4c7494){const _0x8867ec=_0x5075f1;this[_0x8867ec(0x435)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x8867ec(0x2cd)][_0x8867ec(0x2b3)][_0x8867ec(0x342)](this,_0x3fd2d6,_0x4c7494);},VisuMZ[_0x5075f1(0x2cd)]['Window_EventItem_onOk']=Window_EventItem['prototype'][_0x5075f1(0x3ea)],Window_EventItem['prototype'][_0x5075f1(0x3ea)]=function(){const _0x359bf6=_0x5075f1;$gameTemp[_0x359bf6(0x4b5)]($gameMessage[_0x359bf6(0x435)]),VisuMZ[_0x359bf6(0x2cd)]['Window_EventItem_onOk'][_0x359bf6(0x342)](this),$gameTemp[_0x359bf6(0x186)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x5075f1(0x2cd)][_0x5075f1(0x4ed)]=Window_EventItem['prototype'][_0x5075f1(0x108)],Window_EventItem[_0x5075f1(0x173)][_0x5075f1(0x108)]=function(){const _0x341066=_0x5075f1;$gameTemp['registerSelfTarget']($gameMessage[_0x341066(0x435)]),VisuMZ[_0x341066(0x2cd)][_0x341066(0x4ed)][_0x341066(0x342)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x341066(0x435)]=undefined;},VisuMZ['EventsMoveCore']['Window_Message_startMessage']=Window_Message[_0x5075f1(0x173)][_0x5075f1(0x46f)],Window_Message[_0x5075f1(0x173)][_0x5075f1(0x46f)]=function(){const _0x41ac3d=_0x5075f1;$gameMessage[_0x41ac3d(0x519)](),VisuMZ['EventsMoveCore'][_0x41ac3d(0x8b)]['call'](this),$gameTemp['clearSelfTarget']();},VisuMZ['EventsMoveCore'][_0x5075f1(0x4f0)]=Window_ScrollText[_0x5075f1(0x173)]['startMessage'],Window_ScrollText[_0x5075f1(0x173)]['startMessage']=function(){const _0x4ca724=_0x5075f1;$gameMessage[_0x4ca724(0x519)](),VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage'][_0x4ca724(0x342)](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0x195e46=_0x5075f1;this[_0x195e46(0x150)](...arguments);}function _0x38a5(_0x5d48d4,_0x560536){_0x5d48d4=_0x5d48d4-0x71;let _0x50ca57=_0x50ca[_0x5d48d4];return _0x50ca57;}Window_EventLabel[_0x5075f1(0x173)]=Object[_0x5075f1(0x3e7)](Window_Base[_0x5075f1(0x173)]),Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x3e1)]=Window_EventLabel,Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x150)]=function(_0x3a9c05){const _0xddde4f=_0x5075f1;this[_0xddde4f(0x46c)]=_0x3a9c05;const _0x52037b=new Rectangle(0x0,0x0,Graphics[_0xddde4f(0xb6)]/0x4,this[_0xddde4f(0x495)](0x1));this[_0xddde4f(0x2c8)](),Window_Base[_0xddde4f(0x173)][_0xddde4f(0x150)][_0xddde4f(0x342)](this,_0x52037b),this['contentsOpacity']=0x0,this['setBackgroundType'](0x2),this['_text']='';},Window_EventLabel[_0x5075f1(0x173)]['initMembers']=function(){const _0x41afae=_0x5075f1;this['_eventErased']=![],this[_0x41afae(0x49a)]=$gameScreen[_0x41afae(0x299)](),this[_0x41afae(0x3cc)]=this[_0x41afae(0x46c)]['screenX'](),this[_0x41afae(0x2b0)]=this[_0x41afae(0x46c)]['screenY'](),this['_eventLabelOffsetX']=this[_0x41afae(0x46c)]['_labelWindow'][_0x41afae(0xf3)],this[_0x41afae(0x3a7)]=this['_event'][_0x41afae(0x3b6)][_0x41afae(0x177)],this['_eventPageIndex']=this['_event'][_0x41afae(0xe6)],this[_0x41afae(0x1c1)]=this[_0x41afae(0x30e)](),this[_0x41afae(0x1cf)]=$gameSystem['eventLabelsVisible'](),this[_0x41afae(0x37c)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x41afae(0x333)]=this[_0x41afae(0x46c)]['x'],this['_visibleEventY']=this[_0x41afae(0x46c)]['y'];},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x259)]=function(){const _0x3dc21e=_0x5075f1;Window_Base['prototype'][_0x3dc21e(0x259)][_0x3dc21e(0x342)](this);if(!this['needsUpdate']())return;this['updateText'](),this[_0x3dc21e(0x3a9)](),this['updatePosition'](),this[_0x3dc21e(0xc5)]();},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x3a2)]=function(){const _0x258f37=_0x5075f1;if(!this[_0x258f37(0x46c)])return![];if(!this[_0x258f37(0x46c)][_0x258f37(0x3b6)])return![];if(this[_0x258f37(0x4d3)]!==this['_event']['_pageIndex'])return!![];if(this[_0x258f37(0x46c)][_0x258f37(0x2d1)]&&!this[_0x258f37(0x33a)])return!![];if(this[_0x258f37(0x46c)][_0x258f37(0x3b6)]['text']==='')return![];if(this[_0x258f37(0x49a)]!==$gameScreen[_0x258f37(0x299)]())return!![];if(this['_eventScreenX']!==this['_event'][_0x258f37(0x111)]())return!![];if(this['_eventScreenY']!==this[_0x258f37(0x46c)][_0x258f37(0x386)]())return!![];if(this[_0x258f37(0x23a)]!==this[_0x258f37(0x46c)][_0x258f37(0x3b6)][_0x258f37(0xf3)])return!![];if(this[_0x258f37(0x3a7)]!==this['_event'][_0x258f37(0x3b6)][_0x258f37(0x177)])return!![];if(this[_0x258f37(0x37c)]!==$gamePlayer['x'])return!![];if(this[_0x258f37(0x39e)]!==$gamePlayer['y'])return!![];if(this[_0x258f37(0x333)]!==this['_event']['x'])return!![];if(this[_0x258f37(0x38c)]!==this[_0x258f37(0x46c)]['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0x258f37(0x49c)]())return!![];if(this[_0x258f37(0x1c1)]&&this[_0x258f37(0x438)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x258f37(0x438)]>0x0)return!![];if(SceneManager[_0x258f37(0x4ad)][_0x258f37(0x4d6)]>0x0)return!![];return![];},Window_EventLabel[_0x5075f1(0x173)]['updateText']=function(){const _0xa33adf=_0x5075f1;this[_0xa33adf(0x46c)]['labelWindowText']()!==this['_text']&&(this[_0xa33adf(0x408)]=this[_0xa33adf(0x46c)][_0xa33adf(0x43b)](),this[_0xa33adf(0x17f)]());},Window_EventLabel['prototype'][_0x5075f1(0x3a9)]=function(){const _0x15e1cd=_0x5075f1;this['scale']['x']=0x1/$gameScreen['zoomScale'](),this[_0x15e1cd(0xeb)]['y']=0x1/$gameScreen[_0x15e1cd(0x299)](),this['_screenZoomScale']=$gameScreen[_0x15e1cd(0x299)]();},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x2c3)]=function(){const _0x419f15=_0x5075f1;if(!SceneManager[_0x419f15(0x4ad)])return;if(!SceneManager[_0x419f15(0x4ad)][_0x419f15(0xc4)])return;const _0x13f6f4=SceneManager[_0x419f15(0x4ad)]['_spriteset'][_0x419f15(0x4b7)](this[_0x419f15(0x46c)]);if(!_0x13f6f4)return;this['x']=Math[_0x419f15(0xba)](this[_0x419f15(0x46c)][_0x419f15(0x111)]()-Math[_0x419f15(0x500)](this[_0x419f15(0x155)]*this[_0x419f15(0xeb)]['x']/0x2)),this['x']+=this[_0x419f15(0x46c)][_0x419f15(0x3b6)][_0x419f15(0xf3)],this['y']=this[_0x419f15(0x46c)]['screenY']()-_0x13f6f4['height'],this['y']+=Math['round']($gameSystem['windowPadding']()*0.5),this['y']-=Math[_0x419f15(0xba)](this['height']*this['scale']['y']),this['y']+=this[_0x419f15(0x46c)]['_labelWindow']['offsetY'],this[_0x419f15(0x33a)]=this['_event'][_0x419f15(0x2d1)],this[_0x419f15(0x3cc)]=this['_event'][_0x419f15(0x111)](),this[_0x419f15(0x2b0)]=this[_0x419f15(0x46c)]['screenY'](),this[_0x419f15(0x23a)]=this[_0x419f15(0x46c)][_0x419f15(0x3b6)][_0x419f15(0xf3)],this[_0x419f15(0x3a7)]=this[_0x419f15(0x46c)][_0x419f15(0x3b6)]['offsetY'],this[_0x419f15(0x4d3)]=this[_0x419f15(0x46c)]['_pageIndex'],this[_0x419f15(0x33a)]&&(this[_0x419f15(0x438)]=0x0);},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0xc5)]=function(){const _0xdbbcf0=_0x5075f1;if(this[_0xdbbcf0(0x30e)]()){if('bmyLV'!==_0xdbbcf0(0x2e4))this[_0xdbbcf0(0x438)]+=this[_0xdbbcf0(0x36f)]();else{function _0x3b8499(){const _0x532b37=_0xdbbcf0;_0x4d0402[_0x532b37(0x2cd)][_0x532b37(0x1ea)][_0x532b37(0x342)](this);}}}else{if(SceneManager[_0xdbbcf0(0x4ad)][_0xdbbcf0(0x4d6)]>0x0){if('lepgX'==='lepgX')this[_0xdbbcf0(0x438)]=0x0;else{function _0x2404b4(){const _0x200ff9=_0xdbbcf0,_0x2c0094=_0x200ff9(0x308)[_0x200ff9(0x184)](_0xfe9828[_0x200ff9(0x215)](0x0)['toUpperCase']()+_0x2db6dd[_0x200ff9(0x204)](0x1));if(_0xb66377[_0x2c0094])return _0x39646c[_0x2c0094][_0x200ff9(0xd5)](_0x580831);}}}else this['contentsOpacity']-=this[_0xdbbcf0(0x36f)]();}},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x30e)]=function(){const _0x4901fe=_0x5075f1;if(!$gameSystem[_0x4901fe(0x49c)]())return![];if(this[_0x4901fe(0x46c)]?.['_erased'])return![];if(SceneManager[_0x4901fe(0x4ad)][_0x4901fe(0x4d6)]>0x0)return![];const _0x16aac1=$gamePlayer['x'],_0x273701=$gamePlayer['y'],_0x118492=this[_0x4901fe(0x46c)]['x'],_0x131dd5=this[_0x4901fe(0x46c)]['y'];if(this[_0x4901fe(0x37c)]===_0x16aac1&&this[_0x4901fe(0x39e)]===_0x273701&&this['_visibleEventX']===_0x118492&&this['_visibleEventY']===_0x131dd5)return this[_0x4901fe(0x1c1)];this[_0x4901fe(0x37c)]=$gamePlayer['x'],this[_0x4901fe(0x39e)]=$gamePlayer['y'],this[_0x4901fe(0x333)]=this[_0x4901fe(0x46c)]['x'],this[_0x4901fe(0x38c)]=this['_event']['y'];if($gameMap[_0x4901fe(0x358)](_0x16aac1,_0x273701,_0x118492,_0x131dd5)>this[_0x4901fe(0x46c)][_0x4901fe(0x31a)]()){if(_0x4901fe(0x220)==='ENcxi'){function _0x55e97a(){return this['getPosingCharacterPattern']();}}else return this[_0x4901fe(0x1c1)]=![],![];}return this[_0x4901fe(0x1c1)]=!![],!![];},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x36f)]=function(){const _0x7bc473=_0x5075f1;return VisuMZ[_0x7bc473(0x2cd)][_0x7bc473(0x2eb)][_0x7bc473(0xe1)][_0x7bc473(0xf2)];},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x82)]=function(){const _0x1ad80b=_0x5075f1,_0x587c5d=this[_0x1ad80b(0x2a2)](this['_text']);this[_0x1ad80b(0x155)]=_0x587c5d[_0x1ad80b(0x155)]+($gameSystem[_0x1ad80b(0x1e4)]()+this['itemPadding']())*0x2,this[_0x1ad80b(0x461)]=Math[_0x1ad80b(0x97)](this[_0x1ad80b(0xa3)](),_0x587c5d[_0x1ad80b(0x461)])+$gameSystem[_0x1ad80b(0x1e4)]()*0x2,this[_0x1ad80b(0x413)]();},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0xa3)]=function(){const _0x31fb94=_0x5075f1;return VisuMZ[_0x31fb94(0x2cd)][_0x31fb94(0x2eb)][_0x31fb94(0xe1)]['LineHeight'];},Window_EventLabel['prototype'][_0x5075f1(0xfb)]=function(){const _0xec3b=_0x5075f1;Window_Base[_0xec3b(0x173)]['resetFontSettings'][_0xec3b(0x342)](this),this[_0xec3b(0x27d)][_0xec3b(0x26a)]=this['defaultFontSize']();},Window_EventLabel['prototype'][_0x5075f1(0x42a)]=function(){const _0x37db1a=_0x5075f1;return VisuMZ[_0x37db1a(0x2cd)]['Settings']['Label']['FontSize'];},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x17f)]=function(){const _0x48e629=_0x5075f1;this['resizeWindow'](),this[_0x48e629(0x27d)]['clear']();const _0x1d219a=this[_0x48e629(0x408)][_0x48e629(0x3ba)](/[\r\n]+/);let _0x4dbc08=0x0;for(const _0x3d2201 of _0x1d219a){if(_0x48e629(0x222)!=='sYLEn'){function _0x14e97d(){const _0x3a6938=_0x48e629;_0x4080b7['prototype']['resetFontSettings'][_0x3a6938(0x342)](this),this[_0x3a6938(0x27d)][_0x3a6938(0x26a)]=this[_0x3a6938(0x42a)]();}}else{const _0x365d8e=this[_0x48e629(0x2a2)](_0x3d2201),_0x18bbd3=Math[_0x48e629(0x500)]((this['innerWidth']-_0x365d8e['width'])/0x2);this[_0x48e629(0x2ba)](_0x3d2201,_0x18bbd3,_0x4dbc08),_0x4dbc08+=_0x365d8e['height'];}}},Window_EventLabel[_0x5075f1(0x173)]['processDrawIcon']=function(_0x451d14,_0x493f3e){const _0x39f064=_0x5075f1;_0x493f3e[_0x39f064(0x4e3)]&&this[_0x39f064(0x144)](_0x451d14,_0x493f3e['x']+0x2,_0x493f3e['y']),_0x493f3e['x']+=Math[_0x39f064(0x1d4)](this[_0x39f064(0x13e)](),ImageManager['iconWidth'])+0x4;},Window_EventLabel['prototype'][_0x5075f1(0x144)]=function(_0x3e8a38,_0x4a159c,_0x1f8d51){const _0x320cff=_0x5075f1,_0x592e45=ImageManager[_0x320cff(0x8e)]('IconSet'),_0x4b3172=ImageManager[_0x320cff(0x45a)],_0x297010=ImageManager[_0x320cff(0x85)],_0x2d074a=_0x3e8a38%0x10*_0x4b3172,_0xe8cbd0=Math[_0x320cff(0x500)](_0x3e8a38/0x10)*_0x297010,_0x13f540=Math['min'](this[_0x320cff(0x13e)]()),_0x3dd979=Math[_0x320cff(0x1d4)](this[_0x320cff(0x13e)]());this[_0x320cff(0x27d)][_0x320cff(0x146)](_0x592e45,_0x2d074a,_0xe8cbd0,_0x4b3172,_0x297010,_0x4a159c,_0x1f8d51,_0x13f540,_0x3dd979);},Window_EventLabel[_0x5075f1(0x173)][_0x5075f1(0x13e)]=function(){const _0x3d56ff=_0x5075f1;return VisuMZ['EventsMoveCore'][_0x3d56ff(0x2eb)][_0x3d56ff(0xe1)][_0x3d56ff(0x15a)];};