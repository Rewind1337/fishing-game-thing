import getValidEncounters from "./getValidEncounters";

const checkForEncounters = (page, source, _context, callback) => {
    let validEncounters = getValidEncounters(page, source, _context);
    let possibleEncounters = [];
    for (let i = 0; i < validEncounters.length; i++) {
        let r = ~~(Math.random() * 100)
        if (r > validEncounters[i].chance) {
            possibleEncounters.push(validEncounters[i])
        }
    }

    let r = ~~(Math.random() * possibleEncounters.length)
    let resultEncounter = possibleEncounters[r];

    let returnResult = {
        valid: validEncounters, 
        possible: possibleEncounters, 
        result: resultEncounter
    }

    console.log(validEncounters, possibleEncounters, resultEncounter)

    if (resultEncounter != undefined) {callback(resultEncounter)}

    return returnResult;
}

  export default checkForEncounters;