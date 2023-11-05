import { faGhost, faHeart, faLocust, faMagnifyingGlass, faShrimp, faTriangleExclamation, faWater, faWorm } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RARITY = {
    COMMON: 0,
    UNCOMMON: 1,
    RARE: 2,
    LEGEND: 3,
    MYTH: 4,
}

const BAIT = {
    NOTHING: 0,
    WORMS: 1,
    FISH: 2,
    INSECTS: 3,
    GLOWWORMS: 4,
}

const TIME = {
    ALWAYS: 0,
    DAY_FULL: 1,
    NIGHT_FULL: 2,
    DAY_FIRST_HALF: 3,
    DAY_SECOND_HALF: 4,
    NIGHT_FIRST_HALF: 5,
    NIGHT_SECOND_HALF: 6,
    AROUND_MIDNIGHT: 7,
    AROUND_NOON: 8,
}

const NODETYPES = {
    RANDOM: 0,
    EVENT: 1,
    BATTLE: 2,
    MINIBOSS: 3,
    RESOURCES: 4,
    BOSS: 5,
    START: 6,
    END: 7,
}

const TRIPSTATUS = {
    IDLE: 0,
    PREPARING_TRIP: 1,
    TRIP_ACTIVE: 2,
}

const PETS = {
    EARTHWORM_JIM: 0,
    FLOPPY: 1,
    LIL_GEODE: 2,
    SHRIMPY: 3,
    CARD_SHARK: 4,
}

const ENCOUNTERTYPES = {
    GATHERING: {
        FLUFF: 100,
        FIND_PET: 101,
        FIND_SPECIAL: 102,
        FIND_RESOURCES: 103,
    },
    FISHING: {
        FLUFF: 200,
        FIND_PET: 201,
        FIND_SPECIAL: 202,
    },
    ADVENTURE: {
        FLUFF: 300,
    },
}

const ENCOUNTERNAMES = {
    GATHERING: {
        100: "FLUFF",
        101: "FIND_PET",
        102: "FIND_SPECIAL",
        103: "FIND_RESOURCES",
    },
    FISHING: {
        FLUFF: 200,
        FIND_PET: 201,
        FIND_SPECIAL: 202,
    },
    ADVENTURE: {
        FLUFF: 300,
    },
}


const ENCOUNTERICONS = {
    DEFAULT: <FontAwesomeIcon icon={faTriangleExclamation}/>,
    GATHERING: {
        FLUFF: <FontAwesomeIcon icon={faMagnifyingGlass}/>,
        FIND_PET: <FontAwesomeIcon icon={faHeart}/>,
        FIND_SPECIAL: <FontAwesomeIcon icon={faLocust}/>,
        FIND_RESOURCES: <FontAwesomeIcon icon={faWorm}/>,
    },
    FISHING: {
        FLUFF: <FontAwesomeIcon icon={faWater}/>,
        FIND_PET: <FontAwesomeIcon icon={faHeart}/>,
        FIND_SPECIAL: <FontAwesomeIcon icon={faShrimp}/>,
    },
    ADVENTURE: {
        FLUFF: <FontAwesomeIcon icon={faGhost}/>,
    },
}


const GATHERINGTYPES = {
    ALL: 0,
    WORMS: 1,
    ARTIFACTS: 2,
    MINING: 3
}

const AUTOMATION = {
    WORMS: 0,
    ARTIFACTS: 1,
    MINING: 2,
    FISHING: {
        SHRIMPY: 3,
        CARD_SHARK: 4,
    }
}

const PAGES = {
    HOME: 0,
    INVENTORY: 1,
    PETS: 2,
    FISHING: 3,
    GATHERING: 4,
    ADVENTURE: 5,
    QUEEN: 6,
    HELP: 7,
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
                timeOfDay: TIME.ALWAYS,
                flavor: "The Muddy Munchie is a common fish found in murky pools of water. It feeds on small creatures like worms and insects, which it can easily find in the muddy bottom.",
                aspects: {'wormPower': 0.1},
                moreWorms: 2,
            },
            {
                id: 1, 
                name: "Whiskered Wailer", 
                rarity: RARITY.COMMON, 
                baitNeeded: BAIT.WORMS, 
                timeOfDay: TIME.NIGHT_FULL, 
                flavor: "The Whiskered Wailer is a nocturnal fish with long whiskers that help it navigate in the dark. It looks sad.",
                aspects: {'tearPower': 0.1},
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
                aspects: {'earthPower': 0.1},
            },
            {
                id: 7,
                name: "Night Noodler",
                rarity: RARITY.UNCOMMON,
                baitNeeded: BAIT.FISH,
                timeOfDay: TIME.NIGHT_FULL,
                flavor: "The Night Noodler is a rare fish that can only be found in the darkest hours of the night. It is a predator of other fish and uses its sense of smell to hunt its prey.",
                aspects: {'fiercePower': 0.1},
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
                rarity: RARITY.LEGEND,
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

        // PETS

        PETS: {
            GATHERING: [
                {
                    id: PETS.EARTHWORM_JIM,
                    name: "Earthworm Jim",
                    enablesAuto: true,
                    autoFor: AUTOMATION.WORMS,
                    autoSpeed: 1/4
                },
                {
                    id: PETS.FLOPPY,
                    name: "Floppy",
                    enablesAuto: true,
                    autoFor: AUTOMATION.ARTIFACTS,
                    autoSpeed: 1/6
                },
                {
                    id: PETS.LIL_GEODE,
                    name: "Lil' Geode",
                    enablesAuto: true,
                    autoFor: AUTOMATION.MINING,
                    autoSpeed: 1/10
                },
            ],
            FISHING: [
                {
                    id: PETS.SHRIMPY,
                    name: "Shrimpy",
                    enablesAuto: true,
                    autoFor: AUTOMATION.FISHING.SHRIMPY,
                },
                {
                    id: PETS.CARD_SHARK,
                    name: "Card Shark",
                    enablesAuto: true,
                    autoFor: AUTOMATION.FISHING.CARD_SHARK,
                    autoSpeed: "no idea"
                },
            ],
            ADVENTURE: [],
        },

        // ADVENTURE STUFF

        ADVENTURE: {
            NODETYPES: [
                {id: NODETYPES.RANDOM, type: 'random'},
                {id: NODETYPES.EVENT, type: 'event'},
                {id: NODETYPES.BATTLE, type: 'battle'},
                {id: NODETYPES.MINIBOSS, type: 'miniboss'},
                {id: NODETYPES.RESOURCES, type: 'resources'},
                {id: NODETYPES.BOSS, type: 'boss'},
                {id: NODETYPES.START, type: 'start'},
                {id: NODETYPES.END, type: 'end'},
            ],
            ENCOUNTERS: [
                {
                    type: ENCOUNTERTYPES.ADVENTURE.FLUFF,
                },
            ],
            ENEMIES: [
                {
                    id: 0,
                    name: 'Rat',
                    stats: {},
                    drops: {},
                }
            ]
        },

        // FISHING STUFF

        FISHING: {
            SUBLOCATIONS: [
                {id: 0, name: 'By the Shallows', fish: [0, 1, 6]},
                {id: 1, name: 'By the Reeds', fish: [0, 1, 6, 7]},
                {id: 2, name: 'By the Trees', fish: []},
                {id: 3, name: 'Worm Queen Shrine', hidden: true, fish: []},
            ],
            LOCATIONS: [
                {id: 0, name: 'Local Waterhole', sublocations: [0, 1, 2, 3], fish: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
            ],
            ENCOUNTERS: [
                {
                    id: 0,
                    type: ENCOUNTERTYPES.FISHING.FLUFF,
                    chance: 0.05,
                    header: "",
                    text: "",
                },
                {
                    id: 1,
                    type: ENCOUNTERTYPES.FISHING.FIND_PET,
                    chance: 0.02,
                    reward: PETS.SHRIMPY,
                    header: "What is this?",
                    text: "Shrimpy has joined you in your efforts, just make sure to keep him away from flamingos!",
                },
                {
                    id: 2,
                    type: ENCOUNTERTYPES.FISHING.FIND_PET,
                    chance: 0.002,
                    reward: PETS.CARD_SHARK,
                    header: "What is this?",
                    text: "Card Shark has joined you in your efforts, seems like he knows these waters very well.",
                },
                {
                    id: 3,
                    type: ENCOUNTERTYPES.FISHING.FIND_SPECIAL,
                    chance: 0.01,
                    header: "",
                    text: "",
                },
            ]
        },

        // GATHERING STUFF

        GATHERING: {
            ENCOUNTERS: [
                {
                    id: 0,
                    type: ENCOUNTERTYPES.GATHERING.FLUFF,
                    source: GATHERINGTYPES.ALL,
                    chance: 0.05,
                    header: "You see a small Spider smoke Weed",
                    text: "Not sure what you should do with this, but you decide to enjoy it while it lasts",
                },
                {
                    id: 1,
                    type: ENCOUNTERTYPES.GATHERING.FIND_PET,
                    source: GATHERINGTYPES.WORMS,
                    chance: 0.03,
                    reward: PETS.EARTHWORM_JIM,
                    header: "What is this?",
                    text: "Earthworm Jim has joined you in your efforts, dont mistake him for one of the other ones.",
                },
                {
                    id: 2,
                    type: ENCOUNTERTYPES.GATHERING.FIND_PET,
                    source: GATHERINGTYPES.ARTIFACTS,
                    chance: 0.02,
                    reward: PETS.FLOPPY,
                    header: "What is this?",
                    text: "Floppy has joined you in your efforts, seems to be some kind of ancient sentient storage device.",
                },
                {
                    id: 3,
                    type: ENCOUNTERTYPES.GATHERING.FIND_PET,
                    source: GATHERINGTYPES.MINING,
                    chance: 0.01,
                    reward: PETS.LIL_GEODE,
                    header: "What is this?",
                    text: "Lil' Geode has joined you in your efforts, very sturdy and very witty.",
                },
                {
                    id: 4,
                    type: ENCOUNTERTYPES.GATHERING.FIND_RESOURCES,
                    source: GATHERINGTYPES.ALL,
                    chance: 0.08,
                    header: "You found additional Worms!",
                    text: "$r Worms were attending a Party and you grab them with a bucket",
                },
                {
                    id: 5,
                    type: ENCOUNTERTYPES.GATHERING.FIND_SPECIAL,
                    source: GATHERINGTYPES.ALL,
                    chance: 0.005,
                    header: "This is not implemented yet",
                    text: "So good luck doing anything with this",
                },
            ]
        },

        // ITEMS
        // CHECK itemtypes.md

        // RODS

        ROD: [
            {
                id: 0,
                name: "Old Rod",
                catchWindow: 20,
                baseSpeed: 1,
            },
            {
                id: 1,
                name: "New Rod",
                catchWindow: 30,
                baseSpeed: 1,
            },
        ],

        // BAITS

        BAIT: [
            {
                id: BAIT.NOTHING,
                name: "Nothing",
                fishingLuck: 1,
                multiFish: 0,
                breakChance: 0,
            },
            {
                id: BAIT.WORMS,
                name: "Worms",
                fishingLuck: 1.1,
                multiFish: 0,
                breakChance: 80,
            },
            {
                id: BAIT.FISH,
                name: "Fish",
                fishingLuck: 1.15,
                multiFish: 0.05,
                breakChance: 95,
            },
            {
                id: BAIT.INSECTS,
                name: "Insects",
                fishingLuck: 1.2,
                multiFish: 0,
                breakChance: 100,
            },
            {
                id: BAIT.GLOWWORMS,
                name: "Glow Worms",
                fishingLuck: 1.6,
                multiFish: 0.1,
                breakChance: 90,
            },
        ],

        // HOOKS

        HOOK: [
            {
                id: 0,
                name: "Rusty Hook",
                multiCatch: 0,
                catchMultiplierChance: 0,
                catchMultiplierAmount: 0,
                breakChance: 0,
            },
            {
                id: 1,
                name: "New Hook",
                multiCatch: 0,
                catchMultiplierChance: 0.1,
                catchMultiplierAmount: 2,
                breakChance: 5,
            },
        ],

        // LURES

        LURE: [
            {
                id: 0,
                name: "Wiggly Lure",
                fishingLuck: 1.25,
                fishingSpeed: 50, // 10% of 500
                duration: 10,
                attracts: [RARITY.COMMON, RARITY.UNCOMMON],
            },
            {
                id: 1,
                name: "Meaty Lure",
                fishingLuck: 1.4,
                fishingSpeed: 75, // 10% of 500
                duration: 6,
                attracts: [RARITY.UNCOMMON, RARITY.RARE],
            },
        ],
    },

    // FISHING PAGE GLOBALS

    FISHING: {
        TIME: 60,
        SPEED: 1,
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
        RARITY, BAIT, TIME, 
        NODETYPES, GATHERINGTYPES, ENCOUNTERTYPES, ENCOUNTERICONS, ENCOUNTERNAMES, TRIPSTATUS,
        PAGES, AUTOMATION, PETS
    }
}

export default GLOBALS;