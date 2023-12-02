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
        DANGER_ENEMY_LOW: 203,
        DANGER_ENEMY_HIGH: 204,
    },
    TRIP: {
        FLUFF: 300,
    },
    ADVENTURE: {
        FLUFF: 400,
    },
    COMBAT: {
        DANGER_BOSS: 500,
        DANGER_WATER: 501,
        DANGER_FOLIAGE: 502,
        DANGER_ROCK: 503,
    }
}

// i hate this but its needed somehow :X
const ENCOUNTERNAMES = {
    GATHERING: {
        100: "FLUFF",
        101: "FIND_PET",
        102: "FIND_SPECIAL",
        103: "FIND_RESOURCES",
    },
    FISHING: {
        200: "FLUFF",
        201: "FIND_PET",
        202: "FIND_SPECIAL",
    },
    TRIP: {
        300: "FLUFF",
        301: "ENTITY",
    },
    ADVENTURE: {
        400: "FLUFF",
    },
    COMBAT: {
        500: "DANGER_BOSS",
        501: "DANGER_WATER",
        502: "DANGER_FOLIAGE",
        503: "DANGER_ROCK",
    }
}

// kinda like defaults
const ENCOUNTERICONS = {
    DEFAULT: "fa-solid fa-triangle-exclamation",
    GATHERING: {
        FLUFF: "fa-solid fa-magnifying-glass",
        FIND_PET: "fa-solid fa-heart",
        FIND_SPECIAL: "fa-solid fa-locust",
        FIND_RESOURCES: "fa-solid fa-worm",
    },
    FISHING: {
        FLUFF: "fa-solid fa-water",
        FIND_PET: "fa-solid fa-heart",
        FIND_SPECIAL: "fa-solid fa-shrimp",
    },
    TRIP: {
        FLUFF: "fa-solid fa-person-walking",
        ENTITY: "fa-solid fa-comment"
    },
    ADVENTURE: {
        FLUFF: "fa-solid fa-ghost",
    },
    COMBAT: {
        DANGER_BOSS: "fa-solid fa-skull",
        DANGER_WATER: "fa-solid fa-water",
        DANGER_FOLIAGE: "fa-solid fa-leaf",
        DANGER_ROCK: "fa-solid fa-hill-rockslide",
    }
}

const ENCOUNTER_TRIGGER = {
    TRIP_MOVE: 1,
    PRE_GATHERING: 2,
    POST_GATHERING: 3,
    PRE_FISHING: 4,
    POST_FISHING: 5,
    EVENT_TRIGGER: 6,
    IDLE: 7,
};
const ENCOUNTER_TRIGGER_DATA = [
    {name:"ERROR"},
    {name:"TRIP_MOVE"},
    {name:"PRE_GATHERING"},
    {name:"POST_GATHERING"},
    {name:"PRE_FISHING"},
    {name:"POST_FISHING"},
    {name:"EVENT_TRIGGER"},
    {name:"IDLE"},
];

const GATHERINGTYPES = {
    ALL: 0,
    WORMS: 1,
    ARTIFACTS: 2,
    MINING: 3
}

// very much unused atm but might be necessary
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
    TRADERS: 6,
    QUEEN: 7,
    HELP: 8,
}

const SETTINGS = {
    GRAPHICS: {WORST: 0, DEFAULT: 1, BEST: 2}
}

const ENUMS = {
    RARITY: RARITY,
    BAIT: BAIT,
    TIME: TIME,
    NODETYPES: NODETYPES,
    TRIPSTATUS: TRIPSTATUS,
    PETS: PETS,
    ENCOUNTERTYPES: ENCOUNTERTYPES,
    ENCOUNTERNAMES: ENCOUNTERNAMES,
    ENCOUNTERICONS: ENCOUNTERICONS,
    ENCOUNTER_TRIGGER: ENCOUNTER_TRIGGER,
    ENCOUNTER_TRIGGER_DATA: ENCOUNTER_TRIGGER_DATA,
    GATHERINGTYPES: GATHERINGTYPES,
    AUTOMATION: AUTOMATION,
    PAGES: PAGES,
    SETTINGS
}

export default ENUMS;