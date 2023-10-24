import GLOBALS from '../../globals/Globals';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish } from '@fortawesome/free-solid-svg-icons';

let getFishingCollection = function (resources) {
  
  let collection = [];

  for (let ID in GLOBALS.DB.FISH) {
    let fish = GLOBALS.DB.FISH[ID];

    if (resources.fishes[ID] >= 0) {
      collection.push({
        icon: <FontAwesomeIcon icon={faFish} />,
        iconcolor: 'hsl(235deg, 100%, 90%)',
        name: fish.name,
        value: resources.fishes[ID] || 0,
        cap: 0,
        perSec: 0,
      });
    }
  }
  
  return collection;
};

export default getFishingCollection;