import ENUMS from "./Enums";

const DB_FISHING = {
    SUBLOCATIONS: [
        [
            {id: 0, name: 'Backup/Home', fish: [0], connections:{'NE':-1, 'N':-1, 'NW':-1, 'W':-1, 'E':-1, 'SE':-1, 'S':-1, 'SW':-1}},
        ],
        [
            {id: 0, name: 'By the Shallows', fish: [0, 1, 6], connections:{'N':-1, 'SE':1, 'SW':4, 'S':-3}},
            {id: 1, name: 'By the Eastern Reeds', fish: [0, 1, 6, 7], connections:{'NW':0, 'E':2, 'W':-3}},
            {id: 2, name: 'By the Trees', fish: [], connections:{'W':1, 'E':3}},
            {id: 3, name: 'Worm Queen Shrine', hidden: true, fish: [], connections:{'W':2}},
            {id: 4, name: 'By the Western Reeds', fish: [0, 1, 6, 7], connections:{'NE':0, 'E':-3}},
        ],
    ],
    LOCATIONS: [
        {id: 0, name: 'Backup Location', sublocations: [0], fish: []},
        {id: 1, name: 'Local Waterhole', sublocations: [0, 1, 2, 3, 4], fish: [0, 1, 6, 7]},
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