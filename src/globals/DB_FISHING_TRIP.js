import ENUMS from "./Enums";

const BackupEncounter = {
    id: 0,
    type: ENUMS.ENCOUNTERTYPES.FISHING.FLUFF,
    chance: 0.05,
    header: "",
    text: "",
};

const DB_FISHING_TRIP = {
    TRAVEL_ENCOUNTERS: [
        // Backup/Home
        [
            BackupEncounter,
        ],
        // Local Waterhole
        [
            {
                id: 0,
                internal_name: "boss_catfish_preview",
                type: ENUMS.ENCOUNTERTYPES.COMBAT.DANGER_WATER,
                trigger: [ENUMS.ENCOUNTER_TRIGGER.TRIP_MOVE, ENUMS.ENCOUNTER_TRIGGER.POST_FISHING, ENUMS.ENCOUNTER_TRIGGER.IDLE],
                trigger_location: [0],
                has_condition: true,
                condition: {bossCleared: false},
                chance: 1/20,
                header: "What's That in the Water?",
                text: "No seriously, you can see a rather large shadow somewhere deeper in muddy water.",
            },
            {
                id: 1,
                internal_name: "fluff_slip1",
                type: ENUMS.ENCOUNTERTYPES.COMBAT.DANGER_WATER,
                trigger: [ENUMS.ENCOUNTER_TRIGGER.POST_FISHING],
                trigger_location: [0],
                has_condition: true,
                condition: {currentFish: -1},
                chance: 1/3,
                header: "You Slipped and Fell.",
                text: "You caught nothing, and you can sure tell. When you put your foot forward to reel in 'a big one' that isn't there, you slip through the mud and you topple over backwards. Thankfully, the shallows are pretty soft and the only damage you'll suffer is to your ego.",
            },
            {
                id: 2,
                internal_name: "chain_reeds1e",
                type: ENUMS.ENCOUNTERTYPES.COMBAT.DANGER_FOLIAGE,
                trigger: [ENUMS.ENCOUNTER_TRIGGER.POST_FISHING],
                trigger_location: [0],
                has_followup: {type:"random", options:["chain_reeds2a", "chain_reeds2b", "chain_reeds2c"]},
                chance: 1/25,
                // can_repeat: true,
                modifier: {risingChance: 0.5},
                header: "Commotion in The Reeds (East).",
                text: "As you reel in, you see some movement along the eastern bank, near the reeds. Maybe be careful? Or you could just go check it out.",
            },
            {
                id: 3,
                internal_name: "chain_reeds1w",
                type: ENUMS.ENCOUNTERTYPES.COMBAT.DANGER_FOLIAGE,
                trigger: [ENUMS.ENCOUNTER_TRIGGER.POST_FISHING],
                trigger_location: [0],
                has_followup: {type:"random", options:["chain_reeds2a", "chain_reeds2b", "chain_reeds2c"]},
                chance: 1/15,
                modifier: {risingChance: 0.5},
                header: "Commotion in The Reeds (West).",
                text: "As you reel in, you see some movement along the western bank, near the reeds. Maybe be careful? Or you could just go check it out.",
            },
            {
                id: 4,
                internal_name: "chain_reeds2a",
                type: ENUMS.ENCOUNTERTYPES.COMBAT.DANGER_WATER,
                trigger: [ENUMS.ENCOUNTER_TRIGGER.EVENT_TRIGGER],
                trigger_location: [1,4],
                has_condition: true,
                condition: {time:ENUMS.TIME.DAY_FULL},
                initiate_fight: "night_noodler_day",
                chance: 1,
                header: "Commotion in The Reeds: Night Noodler (Insomniac).",
                text: "The reeds reveal a fish out of water, and an insomniac at that. It's a little too bright for it right now, though. It is agitated and attacks with a mighty leap.",
            },
            {
                id: 5,
                internal_name: "chain_reeds2b",
                type: ENUMS.ENCOUNTERTYPES.COMBAT.DANGER_WATER,
                trigger: [ENUMS.ENCOUNTER_TRIGGER.EVENT_TRIGGER],
                trigger_location: [1,4],
                has_condition: true,
                condition: {time:ENUMS.TIME.NIGHT_FULL},
                initiate_fight: "night_noodler_night",
                chance: 1,
                header: "Commotion in The Reeds: Night Noodler (Excited)",
                text: "A fish swims through the water, excited to be up so late. It sees you and leaps out of the water to greet you. Perhaps it noticed the lingering smell of fish on you, it seems to wanna brawl.",
            },
            {
                id: 6,
                internal_name: "chain_reeds2c",
                type: ENUMS.ENCOUNTERTYPES.COMBAT.DANGER_BOSS,
                trigger: [ENUMS.ENCOUNTER_TRIGGER.EVENT_TRIGGER],
                trigger_location: [1,4],
                has_condition: true,
                condition: {bossUnlocked: true},
                initiate_fight: "boss_catfish",
                chance: 1,
                can_repeat: true,
                header: "Commotion in The Reeds: Giant Catfish (Boss)",
                text: "Without warning, a giant catfish breaks through the surface of the water, its mouth agape with razor sharp teeth. This seems to be the monarch of the pond, ready to rumble.",
            },
        ],
    ]
}

export default DB_FISHING_TRIP;