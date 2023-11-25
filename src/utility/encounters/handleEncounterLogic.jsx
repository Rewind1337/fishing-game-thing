import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GLOBALS from "../../globals/Globals";

const generateModalContent = (page, encounter, _context) => {
    
    if (encounter == undefined) return false;

    let pageNameMap = ["home","inventory","pets","fishing","gathering","adventure","queen","tutorial"].map(e => e.toUpperCase())

    let thePage = pageNameMap[page];
    let theType = GLOBALS.ENUMS.ENCOUNTERNAMES[thePage][[encounter.type]];

    const addPet = (index) => {
        let DB_PET = GLOBALS.DB.PETS[index]
        let thePet = {id: DB_PET.id, autoFor: DB_PET.autoFor,  name: DB_PET.name, hunger: 0, level: 1}
        let pets = [..._context.save.pets];
        pets.push(thePet)
        _context.save.pets = pets;
    }

    _context.refs.modal['setModalIcon'](<FontAwesomeIcon icon={GLOBALS.ENUMS.ENCOUNTERICONS[thePage][theType]}/>);
    _context.refs.modal['setModalHeader'](encounter.header);
    _context.refs.modal['setModalText'](encounter.text);

    switch (page) {
      
        case GLOBALS.ENUMS.PAGES.FISHING:{

            switch (encounter.type) {

                case GLOBALS.ENUMS.ENCOUNTERTYPES.FISHING.FIND_PET:{
                    addPet(encounter.reward)
                break;}


                
                case GLOBALS.ENUMS.ENCOUNTERTYPES.FISHING.FIND_RESOURCES:{

                break;}


            
                case GLOBALS.ENUMS.ENCOUNTERTYPES.FISHING.FLUFF:{
            
                break;}


            
                default:{return false;}
            }

        break;}





        case GLOBALS.ENUMS.PAGES.GATHERING:{
            
            switch (encounter.type) {

                case GLOBALS.ENUMS.ENCOUNTERTYPES.GATHERING.FIND_PET:{
                    addPet(encounter.reward)
                break;}


                
                case GLOBALS.ENUMS.ENCOUNTERTYPES.GATHERING.FIND_RESOURCES:{
                    let randomResources = 5 + ~~(Math.random() * 15 * (1 + _context.save.aspects.wormPower))

                    let newBait = _context.save.resources.bait;
                    newBait[GLOBALS.ENUMS.BAIT.WORMS] = newBait[GLOBALS.ENUMS.BAIT.WORMS] + randomResources || randomResources;
                    _context.save.resources.bait = newBait;
                    _context.refs.modal['setModalText'](parse(encounter.text, "$r", randomResources));
                break;}


                
                case GLOBALS.ENUMS.ENCOUNTERTYPES.GATHERING.FIND_SPECIAL:{
                    let baitNameMap = ["Insects", "Glow Worms"];
                    let specialBaitPool = [GLOBALS.ENUMS.BAIT.INSECTS, GLOBALS.ENUMS.BAIT.GLOWWORMS];
                    let baitIndex = ~~(Math.random() * specialBaitPool.length)
                    let theBaitId = specialBaitPool[baitIndex];
                    let baitName = baitNameMap[baitIndex];
                    
                    let randomResources = 3 + ~~(Math.random() * 10 * (1 + _context.save.aspects.wormPower/5))

                    let newBait = _context.save.resources.bait;
                    newBait[theBaitId] = newBait[theBaitId] + randomResources || randomResources;
                    _context.save.resources.bait = newBait;
                    _context.refs.modal['setModalHeader'](parse(encounter.header, "$n", baitName));
                    _context.refs.modal['setModalText'](parse(encounter.text, ["$r", "$n"], [randomResources, baitName]));
                break;}


            
                case GLOBALS.ENUMS.ENCOUNTERTYPES.GATHERING.FLUFF:{
            
                break;}


            
                default:{return false;}
            }

        break;}




        
        case GLOBALS.ENUMS.PAGES.ADVENTURE:{
            
            switch (encounter.type) {
        
                case GLOBALS.ENUMS.ENCOUNTERTYPES.ADVENTURE.FLUFF:{
            
                break;}


            
                default:{return false;}
            }

        break;}
        
        default:{return false;}
    }

    return true;
}

export default generateModalContent;



const parse = (orig, find, replaceValue) => {
    let returnString = "";

    if (Array.isArray(find) && Array.isArray(replaceValue)) {
        for (let i = 0; i < find.length; i++) {
            returnString = "";
            
            let startsAt = orig.indexOf(find[i]);

            returnString += orig.substring(0, startsAt);
            returnString += replaceValue[i];
            returnString += orig.substring(startsAt + find[i].length);

            orig = returnString;
        }

        return returnString;
    }

    if (Array.isArray(find) && !Array.isArray(replaceValue)
    || (!Array.isArray(find) && Array.isArray(replaceValue))) {
        console.warn("mismatch of inputtypes")
        return orig;
    }

    let startsAt = orig.indexOf(find);

    returnString += orig.substring(0, startsAt);
    returnString += replaceValue;
    returnString += orig.substring(startsAt + find.length);

    return returnString;
}