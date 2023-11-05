import ENUMS from "./Enums.js";
import DB_FISH from "./DB_FISH.js";
import DB_PETS from "./DB_PETS.js";
import DB_FISHING from "./DB_FISHING.js";
import DB_GATHERING from "./DB_GATHERING.js";
import DB_ADVENTURE from "./DB_ADVENTURE.js";
import { DB_RODS, DB_BAIT, DB_HOOKS, DB_LURES } from "./DB_ITEMS.js"; // Fishing Equipment

const GLOBALS = {
    DB: {
        FISH: DB_FISH,
        PETS: DB_PETS,
        FISHING: DB_FISHING,
        GATHERING: DB_GATHERING,
        ADVENTURE: DB_ADVENTURE,
        ROD: DB_RODS,
        BAIT: DB_BAIT,
        HOOK: DB_HOOKS,
        LURE: DB_LURES,
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

    ENUMS: {...ENUMS}
}

export default GLOBALS;