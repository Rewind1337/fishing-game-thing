import ENUMS from "./Enums";

export const DB_RODS = [
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
]

export const DB_BAIT = [
    {
        id: ENUMS.BAIT.NOTHING,
        icon: "fa-solid fa-xmark",
        name: "Nothing",
        fishingLuck: 1,
        multiFish: 0,
        breakChance: 0,
    },
    {
        id: ENUMS.BAIT.WORMS,
        icon: "fa-solid fa-worm",
        name: "Worms",
        fishingLuck: 1.1,
        multiFish: 0,
        breakChance: 80,
    },
    {
        id: ENUMS.BAIT.FISH,
        icon: "fa-solid fa-fish",
        name: "Fish",
        fishingLuck: 1.15,
        multiFish: 0.05,
        breakChance: 95,
    },
    {
        id: ENUMS.BAIT.INSECTS,
        icon: "fa-solid fa-locust",
        name: "Insects",
        fishingLuck: 1.2,
        multiFish: 0,
        breakChance: 100,
    },
    {
        id: ENUMS.BAIT.GLOWWORMS,
        icon: "fa-solid fa-worm",
        name: "Glow Worms",
        fishingLuck: 1.6,
        multiFish: 0.1,
        breakChance: 90,
    },
]

export const DB_HOOKS = [
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
]

export const DB_LURES = [
    {
        id: 0,
        name: "Wiggly Lure",
        fishingLuck: 1.25,
        fishingSpeed: 50, // 10% of 500
        duration: 10,
        attracts: [ENUMS.RARITY.COMMON, ENUMS.RARITY.UNCOMMON],
    },
    {
        id: 1,
        name: "Meaty Lure",
        fishingLuck: 1.4,
        fishingSpeed: 75, // 10% of 500
        duration: 6,
        attracts: [ENUMS.RARITY.UNCOMMON, ENUMS.RARITY.RARE],
    },
]