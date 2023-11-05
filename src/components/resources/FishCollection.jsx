import GLOBALS from '../../globals/Globals';
import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResourceCollectionCard from './ResourceCollectionCard';

FishCollection.propTypes = {
  resources: PropTypes.object.isRequired
};

function FishCollection({resources}) {

  let collection = getFishCollection(resources);

  return (
    <ResourceCollectionCard collection={collection} name={'All Fish'} icon={<FontAwesomeIcon icon={"fa-solid fa-fish"} />} iconcolor={"hsl(235deg, 100%, 90%)"} />
  )
}

let getFishCollection = function (resources) {
  let collection = [];

  for (let ID in GLOBALS.DB.FISH) {
    let fish = GLOBALS.DB.FISH[ID];

    if (resources.fishes[ID] >= 0) {
      collection.push({
        icon: <FontAwesomeIcon icon={"fa-solid fa-fish"} />,
        iconcolor: 'hsl(' + ((360/resources.fishes.length) * ID) + 'deg, 100%, 90%)',
        name: fish.name,
        value: resources.fishes[ID] || 0,
        cap: 0,
        perSec: 0,
      });
    }
  }
  
  return collection;
};

export default FishCollection;