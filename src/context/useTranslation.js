import { useContext } from "react";
import LanguageContext from "./LanguageContext";

export default function useTranslation(langpath, text, dontTranslate) {
    const context = useContext(LanguageContext);

    if (dontTranslate) return text;
    
    let splitPath = langpath.split("/");
    let _current = context.languageFile

    if (_current[splitPath[0]] == undefined) return text;

    for (let i = 0; i < splitPath.length; i++) {
        _current = _current[splitPath[i]]
    }

    if (_current[text.toLowerCase()] != undefined) {
        return _current[text.toLowerCase()];
    }

    return text;
}