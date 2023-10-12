import { createContext } from 'react';
import LANG_DE from './lang/de';
import LANG_NL from './lang/nl';
import LANG_US from './lang/us';

let data = {
    languageFile: {...LANG_US},
    setLanguageFile : (languageFile) => {
        data.languageFile = languageFile
        localStorage.setItem("game-lang", data.languageFile.language);
    },
};

if (localStorage.getItem("game-lang") != null) {
    let _lang = localStorage.getItem("game-lang");
    switch (_lang) {
        case 'DE':
            data.setLanguageFile(LANG_DE);
            break;
        case 'NL':
            data.setLanguageFile(LANG_NL);
            break;
        case 'US':
            data.setLanguageFile(LANG_US);
            break;
        default:
            break;
    }
}

const LanguageContext = createContext(data);

export default LanguageContext;
