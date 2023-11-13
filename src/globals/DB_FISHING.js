import ENUMS from "./Enums";

const DB_FISHING = {
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
            type: ENUMS.ENCOUNTERTYPES.FISHING.FLUFF,
            chance: 0.05,
            header: "",
            text: "",
        },
        {
            id: 1,
            type: ENUMS.ENCOUNTERTYPES.FISHING.FIND_PET,
            chance: 0.02,
            reward: ENUMS.PETS.SHRIMPY,
            header: "What is this?",
            text: "Shrimpy has joined you in your efforts, just make sure to keep him away from flamingos!",
        },
        {
            id: 2,
            type: ENUMS.ENCOUNTERTYPES.FISHING.FIND_PET,
            chance: 0.002,
            reward: ENUMS.PETS.CARD_SHARK,
            header: "What is this?",
            text: "Card Shark has joined you in your efforts, seems like he knows these waters very well.",
        },
        {
            id: 3,
            type: ENUMS.ENCOUNTERTYPES.FISHING.FIND_SPECIAL,
            chance: 0.01,
            header: "",
            text: "",
        },
    ]
}

export default DB_FISHING;