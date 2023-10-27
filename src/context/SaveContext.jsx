import { createContext } from 'react';

const updateDict = (oldDict, newDict, hardSave = false) => {
    if (typeof newDict !== 'object') {
        if (typeof oldDict === 'object' && !hardSave) {
            console.warn("You're not saving right.");
            return oldDict;
        }
        return newDict;
    }
  
    for (let key in newDict) {
        if (key in oldDict) {
            oldDict[key] = updateDict(oldDict[key], newDict[key], hardSave);
        } else {
            oldDict[key] = newDict[key];
        }
    }
  
    return oldDict;
  };

let data = {
    save: {
        pageTimestamps: {},
        resources: {},
        fishing: {},
        gathering: {},
        inventory: {},
        character: {},
        pets: {},
        sidebar: {
            states: [true, true, true],
            unlocks: [true, false, false, false, true, false, false, true],
            sidebarBadgeData: [0, 0, 0, 0, 0, 0, 0, 0],
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
    data.setSave(_temp);
}

const SaveContext = createContext(data);

export default SaveContext;
