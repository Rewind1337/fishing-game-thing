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
    ADVENTURE: {
        300: "FLUFF",
    },
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
    ADVENTURE: {
        FLUFF: "fa-solid fa-ghost",
    },
}

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
    GATHERINGTYPES: GATHERINGTYPES,
    AUTOMATION: AUTOMATION,
    PAGES: PAGES,
    SETTINGS
}

export default ENUMS;