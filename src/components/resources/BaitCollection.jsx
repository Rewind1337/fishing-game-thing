import GLOBALS from '../../globals/Globals';
import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResourceCollectionCard from './ResourceCollectionCard';

BaitCollection.propTypes = {
  resources: PropTypes.object.isRequired
};

function BaitCollection({resources}) {

  let collection = getBaitCollection(resources);

  if (collection.length == 0) {return}

  return (
    <ResourceCollectionCard collection={collection} name={'Bait-ish'} icon={<FontAwesomeIcon icon={"fa-solid fa-worm"} />} iconcolor={"hsl(235deg, 100%, 90%)"} />
  )
}

let getBaitCollection = function (resources) {
  let collection = [];

  for (let ID in GLOBALS.DB.BAIT) {
    let bait = GLOBALS.DB.BAIT[ID];
    if (bait.id != 0) {
      if (resources.bait[bait.id] >= 0) {
        collection.push({
          icon: <FontAwesomeIcon icon={"fa-solid fa-worm"} />,
          iconcolor: 'hsl(' + ((360/resources.bait.length) * bait.id) + 'deg, 100%, 90%)',
          name: bait.name,
          value: resources.bait[bait.id] || 0,
          cap: 0,
          perSec: 0,
        });
      }
    }
  }
  
  return collection;
};

export default BaitCollection;