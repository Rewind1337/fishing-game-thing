import ENUMS from "./Enums";

const DB_PETS = {
    GATHERING: [
        {
            id: ENUMS.PETS.EARTHWORM_JIM,
            name: "Earthworm Jim",
            enablesAuto: true,
            autoFor: ENUMS.AUTOMATION.WORMS,
            autoSpeed: 1/4
        },
        {
            id: ENUMS.PETS.FLOPPY,
            name: "Floppy",
            enablesAuto: true,
            autoFor: ENUMS.AUTOMATION.ARTIFACTS,
            autoSpeed: 1/6
        },
        {
            id: ENUMS.PETS.LIL_GEODE,
            name: "Lil' Geode",
            enablesAuto: true,
            autoFor: ENUMS.AUTOMATION.MINING,
            autoSpeed: 1/10
        },
    ],
    FISHING: [
        {
            id: ENUMS.PETS.SHRIMPY,
            name: "Shrimpy",
            enablesAuto: true,
            autoFor: ENUMS.AUTOMATION.FISHING.SHRIMPY,
        },
        {
            id: ENUMS.PETS.CARD_SHARK,
            name: "Card Shark",
            enablesAuto: true,
            autoFor: ENUMS.AUTOMATION.FISHING.CARD_SHARK,
            autoSpeed: "no idea"
        },
    ],
    ADVENTURE: [],
}

export default DB_PETS;