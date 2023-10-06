import { createContext } from 'react';

let data = {
    save: {
        resources: {},
        fishing: {},
        gathering: {},
        sidebar: {
            states: [true, true, true],
            unlocks: [true, false, false, true, true, false, false, true],
        }
    },
    setSave : (s) => {
        data.save = Object.assign({}, data.save, s);
        localStorage.setItem("game-save", JSON.stringify(data.save));
    },
    refs: {
        sidebar: {}
    },
    setRefs : (r) => {
        data.refs = Object.assign({}, data.refs, r);
    }
};

if (localStorage.getItem("game-save") != null) {
    let _temp = JSON.parse(localStorage.getItem("game-save"));
    data.setSave(_temp);
}

const SaveContext = createContext(data);

export default SaveContext;
