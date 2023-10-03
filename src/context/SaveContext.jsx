import { createContext } from 'react';

let data = {
    save: {
        gathering: {
            food: 0
        },
        sidebar: {
            states: []
        }
    },
    setSave : (s) => {
        data.save = Object.assign({}, data.save, s);
        localStorage.setItem("game-save", JSON.stringify(data.save));
    }
};

if (localStorage.getItem("game-save") != null) {
    let _temp = JSON.parse(localStorage.getItem("game-save"));
    data.setSave(_temp);
}

const SaveContext = createContext(data);

export default SaveContext;
