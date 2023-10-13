const RARITY = {
    COMMON: 0,
    UNCOMMON: 1,
    RARE: 2,
    MYTH: 3,
    LEGEND: 4,
}

const BAIT = {
    WORMS: 0,
    FISH: 1,
    INSECTS: 2,
    GLOWWORMS: 3,
}

const TIME = {
    DAY_FULL: 0,
    NIGHT_FULL: 1,
    DAY_FIRST_HALF: 2,
    DAY_SECOND_HALF: 3,
    NIGHT_FIRST_HALF: 4,
    NIGHT_SECOND_HALF: 5,
    AROUND_MIDNIGHT: 6,
    AROUND_NOON: 7,
}

const GLOBALS = {
    DB: {

        // FISH

        FISH: [
            {
                id: 0,
                name: "Muddy Munchie",
                rarity: RARITY.COMMON,
                baitNeeded: BAIT.WORMS,
                timeOfDay: TIME.DAY_FULL,
                flavor: "The Muddy Munchie is a common fish found in murky pools of water. It feeds on small creatures like worms and insects, which it can easily find in the muddy bottom.",
            },
            {
                id: 1, 
                name: "Whiskered Wailer", 
                rarity: RARITY.COMMON, 
                baitNeeded: BAIT.WORMS, 
                timeOfDay: TIME.NIGHT_FULL, 
                flavor: "The Whiskered Wailer is a nocturnal fish with long whiskers that help it navigate in the dark. It looks sad."
            },
            {
                id: 2,
                name: "Silver Streak",
                rarity: RARITY.COMMON,
                baitNeeded: BAIT.WORMS,
                timeOfDay: TIME.DAY_FULL,
                flavor: "The Silver Streak is a fast and agile fish that can be found in many waters. Its silver scales reflect sunlight, making it a beautiful sight to behold.",
            },
            {
                id: 3,
                name: "Crimson Carp",
                rarity: RARITY.COMMON,
                baitNeeded: BAIT.WORMS,
                timeOfDay: TIME.NIGHT_FULL,
                flavor: "The Crimson Carp is a nocturnal fish that can be found in rivers and streams. Its vibrant red coloration makes it stand out from other fish.",
            },
            {
                id: 4,
                name: "Golden Grouper",
                rarity: RARITY.UNCOMMON,
                baitNeeded: BAIT.WORMS,
                timeOfDay: TIME.DAY_FULL,
                flavor: "The Golden Grouper is a prized catch among fishermen. Its golden scales and delicious taste make it a favorite for seafood enthusiasts.",
            },
            {
                id: 5,
                name: "Jade Jellyfish",
                rarity: RARITY.UNCOMMON,
                baitNeeded: BAIT.WORMS,
                timeOfDay: TIME.NIGHT_FULL,
                flavor: "The Jade Jellyfish is a mythical creature that glows in the dark. It is said to bring good luck to those who catch it.",
            },
            {
                id: 6,
                name: "Creeping Eel",
                rarity: RARITY.UNCOMMON,
                baitNeeded: BAIT.FISH,
                timeOfDay: TIME.DAY_FULL,
                flavor: "This fish is a unique species that lives in shallow water and burrows under the sand. It looks like an eel, but is actually a fish.",
            },
            {
                id: 6,
                name: "Night Noodler",
                rarity: RARITY.UNCOMMON,
                baitNeeded: BAIT.FISH,
                timeOfDay: TIME.NIGHT_FULL,
                flavor: "The Night Noodler is a rare fish that can only be found in the darkest hours of the night. It is a predator of other fish and uses its sense of smell to hunt its prey.",
            },
            {
                id: 8, 
                name: "Glimmering Guppy", 
                rarity: RARITY.RARE, 
                baitNeeded: BAIT.WORMS, 
                timeOfDay: TIME.DAY_FULL, 
                flavor: "The Glimmering Guppy is a rare fish known for its vibrant colors and shimmering scales. They're sometimes called a Roygbiv because of it."
            },
            {
                id: 9, 
                name: "Spectral Skate", 
                rarity: RARITY.RARE, 
                baitNeeded: BAIT.FISH, 
                timeOfDay: TIME.NIGHT_FULL, 
                flavor: "The Spectral Skate is a rare elusive 'fish' that only appears during the new moon nights. It is attracted to glow worms and is said to possess mystical powers."
            },
            {
                id: 10,
                name: "Diamond Darter",
                rarity: RARITY.MYTH,
                baitNeeded: BAIT.FISH,
                timeOfDay: TIME.AROUND_NOON,
                flavor: "The Diamond Darter is one of the more valuable fish. Its sparkling diamond scales make it a true treasure for any angler.",
            },
            {
                id: 11,
                name: "Amber Angler",
                rarity: RARITY.MYTH,
                baitNeeded: BAIT.FISH,
                timeOfDay: TIME.AROUND_MIDNIGHT,
                flavor: "The Amber Angler is a mythical fish that emits a warm amber glow. If you believe the Myth, this Fish will vanish if enough light hits him.",
            },
        ],

        // RODS

        ROD: [
            {
                id: 0,
                name: "Old Rod",
                coolness: 1,
            },
            {
                id: 1,
                name: "Supreme Rod of the Greek Fishing Gods",
                coolness: 1.3,
            },
        ],

        // BAITS

        BAIT: [
            {
                id: BAIT.WORMS,
                name: "Worms",
            },
            {
                id: BAIT.FISH,
                name: "Fish",
            },
            {
                id: BAIT.INSECTS,
                name: "Insects",
            },
            {
                id: BAIT.GLOWWORMS,
                name: "Glow Worms",
            },
        ],

        // HOOKS

        HOOK: [
            {
                id: 0,
                name: "Rusty Hook",
            },
        ],

        // LURES

        LURE: [
            {
                id: 0,
                name: "Wiggly Lure",
            },
            {
                id: 1,
                name: "Meaty Lure",
            },
        ],
    },

    // FISHING PAGE GLOBALS

    FISHING: {
        TIME: 60,
    },

    // GATHERING PAGE GLOBALS

    GATHERING: {
        WORMDIG: {
            TIME: 30,
            SPEED: 1,
        },
        ARTIFACTDIG: {
            TIME: 180,
            SPEED: 1,
        },
        MINING: {
            TIME: 1440,
            SPEED: 1,
        }
    },

    // QUEEN PAGE GLOBALS

    QUEEN: {},

    // COMPONENT GLOBALS

    COMPONENTS: {
        CLOCK: {
            SPEED: 6,
        }
    },

    ENUMS: {
        RARITY,
        BAIT,
        TIME
    }
}

export default GLOBALS;