import ENUMS from "./Enums"

const DB_GATHERING = {
    ENCOUNTERS: [
        {
            id: 0,
            type: ENUMS.ENCOUNTERTYPES.GATHERING.FLUFF,
            source: ENUMS.GATHERINGTYPES.ALL,
            chance: 0.05,
            header: "You see a small Spider smoke Weed",
            text: "Not sure what you should do with this, but you decide to enjoy it while it lasts",
        },
        {
            id: 1,
            type: ENUMS.ENCOUNTERTYPES.GATHERING.FIND_PET,
            source: ENUMS.GATHERINGTYPES.WORMS,
            chance: 0.03,
            reward: ENUMS.PETS.EARTHWORM_JIM,
            header: "What is this?",
            text: "Earthworm Jim has joined you in your efforts, dont mistake him for one of the other ones.",
        },
        {
            id: 2,
            type: ENUMS.ENCOUNTERTYPES.GATHERING.FIND_PET,
            source: ENUMS.GATHERINGTYPES.ARTIFACTS,
            chance: 0.02,
            reward: ENUMS.PETS.FLOPPY,
            header: "What is this?",
            text: "Floppy has joined you in your efforts, seems to be some kind of ancient sentient storage device.",
        },
        {
            id: 3,
            type: ENUMS.ENCOUNTERTYPES.GATHERING.FIND_PET,
            source: ENUMS.GATHERINGTYPES.MINING,
            chance: 0.01,
            reward: ENUMS.PETS.LIL_GEODE,
            header: "What is this?",
            text: "Lil' Geode has joined you in your efforts, very sturdy and very witty.",
        },
        {
            id: 4,
            type: ENUMS.ENCOUNTERTYPES.GATHERING.FIND_RESOURCES,
            source: ENUMS.GATHERINGTYPES.WORMS,
            chance: 0.08,
            header: "You found additional Worms!",
            text: "$r Worms were attending a Party and you grab them with a bucket",
        },
        {
            id: 5,
            type: ENUMS.ENCOUNTERTYPES.GATHERING.FIND_SPECIAL,
            source: ENUMS.GATHERINGTYPES.WORMS,
            chance: 0.005,
            header: "You found special $n Bait!",
            text: "Have these for now: $r $n",
        },
    ]
}

export default DB_GATHERING;