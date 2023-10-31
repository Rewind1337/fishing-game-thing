# Fishing Page

----------

## Fishing Actions

- Change Location
- Start Fishing Trip
  - Fish
  - Use Item
  - Change Sub-Location
  - Abandon Trip / Finish Trip

### Fishing Mechanics

- Throw out your hook with (a) unit(s) of bait.
- (UNIMPLEMENTED): Roll for the type of fish.
- Catch window is determined between <0,60> ticks (Middle: <10,40>, Window: <Middle - 10, Middle + 10>)
  - Note, currently, catch window is never later than 50 ticks.

- Possible Variation (for other fish / locations):
  - Tick Speed (Should be special, only speeds up how fast the game plays / can get too fast?)
  - "Fishing Time" (Catch Bar Max Length)
  - Width of the "Catch Window"
  - Various Levels of Fluctuating Speed of the "Catch Bar"

### The Fish Table

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
  - other stuff

### Progression and Modifiers

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
  - none yet

### Encounters

- Battle
- Fishing Frenzy
- Events (Temporary Stat Changes)

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

=============

----------

## Cheesy's fish notes

- Locations and Fish Tables

## Location: Local Watering Hole

### Area: The path

- Location Exit
- Nothing here, connects to the shallows.

### Area: By the shallows

#### Fish Notes 1

- Common: Muddy Munchie  Bait: Worm  Gives: (Worms x3, Gathering Power (worm) x0.01) "The Muddy Munchie is a common fish found in murky pools of water. It feeds on small creatures like worms and insects, which it can easily find in the muddy bottom."
- Uncommon: Creeping Eel Bait: Worm  Gives: (Worm x1, Gathering Power (earth) x0.03) "One interesting fish you might find is the "Creeping Eel". This fish is a unique species that lives in shallow water and burrows under the sand. It looks like an eel, but is actually a fish."

#### Encounter Notes 1

- Commotion in the reeds (Part 1)
- You slip and fall (low chance during fishing, just fluff)

### Area: By the reeds

- Linked to shallows and trees

#### Gathering Notes 1

- Worms in the Dirt (uses Gathering Power (earth/worm))

#### Fish Notes 2

- Common: Muddy Munchie  Bait: Worm  Gives: (Worms x3, Gathering Power (worm) x0.01) "The Muddy Munchie is a common fish found in murky pools of water. It feeds on small creatures like worms and insects, which it can easily find in the muddy bottom."
- Uncommon: Creeping Eel Bait: Worm  Gives: (Worm x1, Gathering Power (earth) x0.03) "One interesting fish you might find is the "Creeping Eel". This fish is a unique species that lives in shallow water and burrows under the sand. It looks like an eel, but is actually a fish."
- Uncommon: Night Noodler Bait: Fish  Gives: (Attack Up x0.1)       "The Night Noodler is a rare fish that can only be found in the darkest hours of the night. It is a predator of other fish and uses its sense of smell to hunt its prey."

#### Encounter Notes 2

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

#### Gathering Notes 2

- Fallen branches (uses Gathering Power (nature))

#### Archeology

- ??? remains (uses Gathering Power (earth/beast))
- lesser worm artifacts (uses Gathering Power (earth/worm))

#### Encounter Notes 3

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

#### Unique Action

- Sacrifice Caught Fish
  - Only accesses current inventory.
  - Same as normal sacrifice otherwise.

#### Unique Encounter

- Gives access to Fish Sacrifice

#### Encounter Notes 4

- A single worm (+1) (medium chance)
- Hallucination: a shrill laugh (low chance, would be fun if we got an audio file to play)
