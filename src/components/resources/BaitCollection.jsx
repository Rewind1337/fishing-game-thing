import GLOBALS from '../../globals/Globals';
import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWorm } from '@fortawesome/free-solid-svg-icons';
import ResourceCollectionCard from './ResourceCollectionCard';

BaitCollection.propTypes = {
  resources: PropTypes.object.isRequired
};

function BaitCollection({resources}) {

  let collection = getBaitCollection(resources);

  return (
    <ResourceCollectionCard collection={collection} name={'Bait-ish'} icon={<FontAwesomeIcon icon={faWorm} />} iconcolor={"hsl(235deg, 100%, 90%)"} />
  )
}

let getBaitCollection = function (resources) {
  let collection = [];

  for (let ID in GLOBALS.DB.BAIT) {
    let bait = GLOBALS.DB.BAIT[ID];
    if (bait.id != 0) {
      if (resources.bait[bait.id] >= 0) {
        collection.push({
          icon: <FontAwesomeIcon icon={faWorm} />,
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