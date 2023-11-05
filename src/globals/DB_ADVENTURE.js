import ENUMS from "./Enums"

const DB_ADVENTURE = {
    NODETYPES: [
        {id: ENUMS.NODETYPES.RANDOM, type: 'random'},
        {id: ENUMS.NODETYPES.EVENT, type: 'event'},
        {id: ENUMS.NODETYPES.BATTLE, type: 'battle'},
        {id: ENUMS.NODETYPES.MINIBOSS, type: 'miniboss'},
        {id: ENUMS.NODETYPES.RESOURCES, type: 'resources'},
        {id: ENUMS.NODETYPES.BOSS, type: 'boss'},
        {id: ENUMS.NODETYPES.START, type: 'start'},
        {id: ENUMS.NODETYPES.END, type: 'end'},
    ],
    ENCOUNTERS: [
        {
            type: ENUMS.ENCOUNTERTYPES.ADVENTURE.FLUFF,
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
}

export default DB_ADVENTURE;