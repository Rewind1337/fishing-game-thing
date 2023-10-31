# Doc to keep track of what to do

Cool Symbols:

fish: 𓆛 𓆜 𓆝 𓆞 𓆟
insects: 𓆤 𓆣 𓆧 𓆨 𓆢
other stuff: 𓃇 𓆇 𓆰
enemies: 𓂙 𓅷 𓅾 𓅸 𓅹 𓅓 𓅔 𓅕 𓅖 𓅗 𓅱 𓅲 𓅳 𓅴 𓅵 𓅶
ornate stuff: 𓄈 𓄉 𓄊 𓄤 𓄥 𓄾 𓄸 𓇚 𓊥 𓋂 𓋅 𓋏 𓏣 𓋇 𓋈

## Gathering Page

### Actions

- Dig for Worms
- Archaeology (Digging for Artifacts)
- Mining (Digging for Resources)

#### General rundown of how this works

- Start the Timer, wait a bit
- Timer completes
- Collect n to n+x of the thing
- Chance for Encounter

### Encounters

- Finding Stuff (Special Resources, Bait, maybe some Equipment)
- Finding Pets

----------

## Adventure Page

### Adventure Actions

- Change Area
- Start Adventure
  - Use Item
  - Next Node (Pick out of X, random tree)
  - Abandon Adventure / Finish Adventure

### Adventure Nodes

- Resource Zones
  - Fishing - Related
  - Mining - Related
  - Archaeology - Related
- Battles (Regular, Miniboss, Boss at the end)
- Loot (Resources, Items)
- Encounters (Events)

### Encounters / Events

- Finding Stuff (Special Resources, Bait, maybe some Equipment)
- Fight a dude or something (with additional rewards maybe)
- Temporary Stat Increases of various kinds
- Finding Pets

----------

## Queen / Sacrifice Page

### Queen / Sacrifice Actions

- Sacrifice a Fish for Different Aspects and Resources as well as Progress toward the next Milestone

### Milestones

- One Time Unlocks of varying importance
  - Unlocking Offline-Time
  - Unlocking Automation Stuff
  - Opening Zones (Sidebar) / Sub-Zones (for Fishing/Adventure)
  - One of the many Aspect-Bonuses, but big amounts

### Aspects

- One Aspect has one or many of these bonuses:
  - Increasing Offline-Time (linear)
  - Tick Speed increases on a per-page/per-theme basis (linear) (complicated, maybe better suited for milestones)
  - Increasing Fish Luck / Multicatch (chance?) / Catch Window (less than linear? has other sources)
  - Increasing Worm related things
  - Increasing Archaeology related things
  - Increasing Mining related things
  - Increase Combat Stats (hp, dmg, recovery?, ...), some combined into one aspect, some split
  - Multiplying all other Aspects (super rare and slow / linear)
  - Increasing Aspects gained from Fish (rare, slow-ish linear)

----------

## Inventory Page

### Item Types (see itemtypes.md)

- Currently held Fish
- Currently owned Equipment
  - Various Rods
  - ^ Hooks
  - ^ Lures
  - ^ Baits

### Inventory Actions

- Mainly an overview of all the Thingies and Baubles and Gadgets you own
- Crafting Equipment ?
- Upgrading Equipment ?

----------

## Pets Page

### Pets

- Pets sourced from the Gathering Page
  - Earthworm Jim (worms)
    - Auto digs worms, does not collect, (1 / min)
  - Floppy (artifacts)
    - Auto digs artifacts, does not collect (0.1 / min)
  - Lil' Geode (mining)
    - Auto mine, does not collect (0.025 / min)

- Pets sourced from the Fishing Page
  - Shrimpy
    - Home Fishing Automation
  - Card Shark
    - Specialized Fishing Automation

- Pets sourced from the Adventure Page
  - none yet

### Pet Actions

- Check Pet Status (Click Pet in a List of all Pets)
  - Fed Status
  - Passive
  - Mood ? could also affect the Passive efficiency
    - Better when not hungry for a while
    - Worse if you dont feed, etc
  - Buttons

- Pet Passives
  - Automation for some things
  - Stat Bonuses for the Player
  - Help Fight ?
  - Increasing Aspect multiplier (rare)

- Feed Pets
  - Once a real day / ingame day or something for most of the pets
  - Maybe special feeding times for some pets, only midnight, not at night, etc.
  - When fed, Passive efficiency is better, if fed and mood is good, its even better

- Send Pets on Missions or something
  - Timed stuff
  - Chancebased if you get some good stuff, otherwise its just basic resources?
  - Good stuff being like, useful equipment (baits, hooks, lures, etc) and more resources

=============

----------

## Cheesy's core design notes

### Adventures

- Adventures make it so that areas should first be manually explored, THEN be automated.
- If this is a main point of the game, the thing that players engage in, there should be a special zone that is never automated (unless a more interesting mechanic takes its place later).

### Fishing

- Like with adventures, if we ever make a more elaborate fishing activity, you may want to have special encounters where you will HAVE to engage in it.

#### Automation

- Should be something you do yourself UNLESS it is automated for you.
- Automation should be semi-smart, but limited to what you can make it do at first.
- Automation should be unlocked before tedium, but unless we make it truly an idle game, it might take some effort.

----------
