# Doc to keep track of what to do
----------
# Home (?) Page
----------






----------
# Fishing Page
----------
#### Actions
- Change Location
- Start Fishing Trip
    - Fish
    - Use Item
    - Change Sub-Location
    - Abandon Trip / Finish Trip

#### Fishing Mechanics
- Throw out your hook with (a) unit(s) of bait.
- (UNIMPLEMENTED): Roll for the type of fish.
- Catch window is determined between <0,60> ticks (Middle: <10,40>, Window: <Middle - 10, Middle + 10>)
	- Note, currently, catch window is never later than 50 ticks.

- Possible Variation (for other fish / locations):
	- Tick Speed (Should be special, only speeds up how fast the game plays / can get too fast?)
	- "Fishing Time" (Catch Bar Max Length)
	- Width of the "Catch Window"
	- Various Levels of Fluctuating Speed of the "Catch Bar" 

#### The Fish Table
- You roll on a table, tied to a location, what kind of fish you can get.
- Fish have probabilities for a location, may have inherent rarities.
- Bait WILL alter these probabilities DRASTICALLY.
	- Some fish require certain bait to be able to be caught.
- Lures MAY alter these probabilities.
- The effect of weather (which is random) should not be too large.
	- It is alright if a few fish show up at specific weathers, but frustration is easy.
	- These fish should not be too important and, ideally, might show up in special locations regardless of weather.
	- It might still be nice to have the option to enable fishery workers to focus on weather-specific fish if the occasion arises.
- Unsure if there should be a chance for nothing.

- Possible Modifiers
	- Luck (influences base rarities)
		- May not be ideal if you want common fish, but that's what fishery workers are for.
	- 

#### Progression and Modifiers
- Possible Modifiers (from a progression perspective):
	- Tick speed reduction (up to a cap)
	- Multihook / possibility for multiple fish (requires more bait)
	- Decrease in randomness of the catch window (towards earlier times, better lure)
	- Widening of the catch window (stickier hooks)
	- Upgradeable automation of fishing

- Possible Modifiers (from a fishing trip perspective):
	- Multihook / possibility for multiple fish (requires more bait)
	- Decrease in randomness of the catch window (towards earlier times, better lure)
	- Widening of the catch window (stickier hooks)

- Possible non-fishing-action modifiers:
	- 

#### Encounters
- Battle
- Fishing Frenzy
- Events (Temporary Stat Changes)
----------






----------
# Gathering Page
----------
#### Actions
- Dig for Worms
- Archaeology (Digging for Artifacts)
- Mining (Digging for Resources)

###### General rundown of how these work:
- Start the Timer, wait a bit
- Timer completes
- Collect n to n+x of the thing
- Chance for Encounter

#### Encounters
- Finding Stuff (Special Resources, Bait, maybe some Equipment)
- Finding Pets (see "Progression")
----------






----------
# Adventure Page
----------
#### Actions
- Change Area
- Start Adventure
    - Use Item
    - Next Node (Pick out of X, random tree)
    - Abandon Adventure / Finish Adventure

#### Adventure Nodes
- Resource Zones
    - Fishing - Related
    - Mining - Related
    - Archaeology - Related
- Battles (Regular, Miniboss, Boss at the end)
- Loot (Resources, Items)
- Events (Temporary Stat Changes)
----------






----------
# Queen / Sacrifice Page
----------
#### Actions
- Sacrifice a Fish for Different Aspects and Resources as well as Progress toward the next Milestone

#### Milestones
- One Time Unlocks of varying importance
	- Unlocking Offline-Time
	- Unlocking Automation Stuff
	- Opening Zones (Sidebar) / Sub-Zones (for Fishing/Adventure)
	- One of the many Aspect-Bonuses, but big amounts

#### Aspects
- Increasing Offline-Time (linear)
- Tick Speed increases on a per-page/per-theme basis (linear)
- Increasing Fish Luck / Multicatch (chance?) / Catch Window (less than linear? has other sources)
- Increasing Worm related things
- Increasing Archaeology related things
- Increasing Mining related things
- Increase Combat Stats (hp, dmg, recovery?, ...), some combined into one aspect, some split)
- Multiplying all other Aspects (super rare and slow / linear)
- Increasing Aspects gained from Fish (rare, slow-ish linear) 
----------






----------
# Inventory Page
----------
#### Item Types
- Currently held Fish
- Currently owned Equipment
	- Various Rods
	- ^ Hooks
	- ^ Lures
	- ^ Baits

#### Actions
- Mainly an overview of all the Thingies and Baubles and Gadgets you own
- Crafting Equipment ?
- Upgrading Equipment ?
----------






----------
# Pets Page
----------
#### Actions
- Check Pet Status (Click Pet in a List of all Pets)
	- Fed Status
	- Passive
	- Mood ? could also affect the Passive efficiency
		- Better when not hungry for a while
		- Worse if you dont feed, etc
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
----------






----------
# Help / Tutorial Page
----------
#### What can you do?
- Read How to play?
- Check Tips?
----------






----------
=============
----------
# Progression Notes
```
──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
                                                                                                              │
                                                                                                              │
                                                       ┌Having some Worms stockpiled                          │
                                                       │                                                      │
Start of Game ────► Digging Worms ────► Fishing Fish ──┴─► Starting a Trip, Choosing a Location               │
                        │ ▲      Fish Loop    │                            │                                  │
                        │ └─┬─────────────────┘                            ▼                                  │
                        │   │                              Pick until no Worms left or stop Trip              │
                 Finding some Pets                         │         │            │           │               │
                                                           ▼         ▼            ▼           ▼               │
                                                    Fishing Fish  Use Item  Change Gear Change SubLoc         │
                                                           │     Bait, Lure  Rod, Hook        │               │
                                                           └───────────────┬──────────────────┘               │
                                                                           ▼                                  │
                                                  Just Fluff ◄─┬─Chance for Encounter                         │
                                                    (nothing)  │                                              │
                                                               │                                              │
                                                               │                                              │
                                                               │                                              │
                       Blessed | Blessed by the Fishing Gods ◄─┤                                              │
                                       (multiplies the catch)  │                                              │
                                                               │                                              │
                                                               │                                              │
                                                               │                                              │
                          Spooked | Posessed Fish attack you ◄─┼─► Battle | Insomniac / Excited               │
                                                     (battle)  │                                              │
                                                               │                                              │
                                                               │                                              │
                                                               │                                              │
             Leering Eyes | Hinting at the Worm Queen Shrine ◄─┤ (First Location only)                        │
                                       (happens a few times?)  │                                              │
                   Greet: 2/3 Fight, 1/3 Hint, 1/3 Trader      │                                              │
                   Run: Change Sublocation                     │                                              │
                                                               │                                              │
                                         Call to your Heart  ◄─┤ (First Location only)                        │
                  Follow It: Chance to go to Worm Queen Shrine │                                              │
                                                               │                                              │
                                                               │                                              │
                                                               │                                              │
                               Finding the Worm Queen Shrine ◄─┤ (First Location only)                        │
                    (Enables you to sacrifice your fish here)  │ (Will become permanent at Milestone 1)       │
                                                               │                                              │
                                                               │                                              │
                                                               │                                              │
                                                             ◄─┘                                              │
                                                                                                              │
                                                                                                              │
                                                                                                              │
                                                                                                              │
                                                                                                              │
                                                                                                              │
                                                                                                              │


```




----------
=============
----------
## Cheesy's core design notes:

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
=============
----------

# Cheesy's fish notes:
- Locations and Fish Tables

## Location: Local Watering Hole
### Area: The path.
- Location Exit
- Nothing here, connects to the shallows.

### Area: By the shallows.
#### Fishing:
- Common: Muddy Munchie		Bait: Worm		Gives: (Worms x3, Gathering Power (worm) x0.01)	"The Muddy Munchie is a common fish found in murky pools of water. It feeds on small creatures like worms and insects, which it can easily find in the muddy bottom."
- Uncommon: Creeping Eel	Bait: Worm		Gives: (Worm x1, Gathering Power (earth) x0.03)	"One interesting fish you might find is the "Creeping Eel". This fish is a unique species that lives in shallow water and burrows under the sand. It looks like an eel, but is actually a fish."

#### Encounter:
- Commotion in the reeds (Part 1)
- You slip and fall (low chance during fishing, just fluff)

### Area: By the reeds
- Linked to shallows and trees
#### Gathering:
- Worms in the Dirt (uses Gathering Power (earth/worm))

#### Fishing:
- Common: Muddy Munchie		Bait: Worm		Gives: (Worms x3, Gathering Power (worm) x0.01)	"The Muddy Munchie is a common fish found in murky pools of water. It feeds on small creatures like worms and insects, which it can easily find in the muddy bottom."
- Uncommon: Creeping Eel	Bait: Worm		Gives: (Worm x1, Gathering Power (earth) x0.03)	"One interesting fish you might find is the "Creeping Eel". This fish is a unique species that lives in shallow water and burrows under the sand. It looks like an eel, but is actually a fish."
- Uncommon: Night Noodler	Bait: Fish		Gives: (Attack Up x0.1)							"The Night Noodler is a rare fish that can only be found in the darkest hours of the night. It is a predator of other fish and uses its sense of smell to hunt its prey."

#### Encounter:
- Commotion in the reeds (Part 2, followup)
	- 45% Fight an insomniac Night Noodler (if day)
		- If beaten: obtain 1 Night Noodler
	- 45% Fight an excited Night Noodler (if night)
		- If beaten: obtain 1 Night Noodler
	- 10% Fight ???
- Spooked from behind! (low chance during fishing)
	- Fight ???

### Area: By the trees
- Linked to reeds and (!Worm Queen Shrine!)
#### Gathering:
- Fallen branches (uses Gathering Power (nature))

#### Archeology:
- ??? remains (uses Gathering Power (earth/beast))
- lesser worm artifacts (uses Gathering Power (earth/worm))

#### Encounter:
- Leering eyes. (low chance)
	- Greet them
		- 2/3 Fight ???.
		- 1/6 Friendly ???, dispense HINT.
			- May unlock path to Worm Queen Shrine
		- 1/6 Friendly ???, trader.
	- Run away
		- Forces you back to the shallows.

- A call to your heart. (medium chance, goes up over time?)
	- Follow it
		- Unlocks path to Worm Queen Shrine.
	- Reject it
		- There's a worm on your leg. (+1)

### Area: Worm Queen Shrine
- linked to trees

#### Unique Action:
- Sacrifice Caught Fish
	- Only accesses current inventory.
	- Same as normal sacrifice otherwise.

#### Unique Encounter:
- Gives access to Fish Sacrifice

#### Encounter:
- A single worm (+1) (medium chance)
- Hallucination: a shrill laugh (low chance, would be fun if we got an audio file to play)
