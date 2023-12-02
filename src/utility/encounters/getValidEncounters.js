import GLOBALS from "../../globals/Globals";

const getValidEncounters = (page, source, _context) => {
    let pageNameMap = ["home","inventory","pets","fishing","gathering","adventure","queen","tutorial"].map(e => e.toUpperCase())
    let pageName = pageNameMap[page];
    let validEncounters = [];
    for (let i in GLOBALS.DB[pageName].ENCOUNTERS) {
        let encounter = GLOBALS.DB[pageName].ENCOUNTERS[i];
        if (encounter.source == source || encounter.source == GLOBALS.ENUMS.GATHERINGTYPES.ALL) {
            if (encounter.type == GLOBALS.ENUMS.ENCOUNTERTYPES[pageName].FIND_PET) {
                let hasPetAlready = false;
                for (let pet in _context.save.pets) {
                    if (_context.save.pets[pet].id == encounter.reward) {hasPetAlready = true; break;}
                }
                if (!hasPetAlready) {validEncounters.push(encounter)}
            } else {
                validEncounters.push(encounter)
            }
        }
    }
    return validEncounters;
}

export default getValidEncounters;