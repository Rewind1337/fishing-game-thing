import { createContext } from 'react';

import GLOBALS from '../globals/Globals';

const updateDict = (oldDict, newDict, hardSave = false) => {
    if (typeof newDict !== 'object') {
        if (typeof oldDict === 'object' && !hardSave) {
            console.warn("You're not saving right.");
            return oldDict;
        }
        return newDict;
    }
    /*
    if (typeof oldDict !== 'object') {
        return newDict;
    }
    */

    for (let key in newDict) {
        if (key in oldDict) {
            oldDict[key] = updateDict(oldDict[key], newDict[key], hardSave);
        } else {
            oldDict[key] = newDict[key];
        }
    }
  
    return oldDict;
};

const _currentVersion = -1000;

let data = {
    save: {
        version: _currentVersion,
        pageTimestamps: {},
        resources: {
            fishes: [],
            bait: [],
        },
        aspects: {},
        fishing: {},
        fishingTrip: {
            status: 0,
            location: 0,
            subLocation: 0,
        },
        gathering: {},
        farm: {},
        inventory: {
            equipment: { // fishing equipment
                rods: [0],
                bait: [0, 1],
                lures: [0],
                hooks: [0],
            },
            gear: { // adventuring gear

            },
        },
        character: {
            baitPackSize: 40,
            baitPack: [0],
            fishPackSize: 20,
            equipment: { // fishing equipment
                rod: 0,
                bait: 1,
                lure: 0,
                hook: 0,
            },
            gear: { // adventuring gear

            },
        },
        pets: [],
        sidebar: {
            states: [true, true, true],
            unlocks: [true, false, false, false, true, false, false, true],
            tripLocks: [false, false, false, false, false, false, false, false],
            highlights: [false, false, false, false, false, false, false, false],
            sidebarBadgeData: [0, 0, 0, 0, 0, 0, 0, 0],
            currentPage: 0,
        }
    },
    setSave : (s, log = false) => {
        data.save = updateDict(data.save, s);
        localStorage.setItem("game-save", JSON.stringify(data.save));

        if (log) console.log(data.save);
    },
    updateToLocalStorage : () => {
        localStorage.setItem("game-save", JSON.stringify(data.save));
    },
    refs: {},
    setRefs : (r, log = false) => {
        data.refs = updateDict(data.refs, r);

        if (log) console.log(data.refs);
    }
};

if (localStorage.getItem("game-save") != null) {
    let _temp = JSON.parse(localStorage.getItem("game-save"));
    if (_temp.version == _currentVersion) {
        data.setSave(_temp);
    }
}

const SaveContext = createContext(data);

export default SaveContext;
