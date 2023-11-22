import PropTypes from 'prop-types';
import FlexList from '../flexlist/FlexList';
import AspectCard from './AspectCard';
import GLOBALS from '../../globals/Globals';

AspectCollectionCard.propTypes = {
  collection: PropTypes.array.isRequired,
};
  
function AspectCollectionCard({collection = []}) {
  const aspects = GLOBALS.DB.ASPECTS;
  const unicodeFrations = [1, '½', '⅓', '¼', '⅕', '⅙', '⅐', '⅛', '⅑', '⅒'];

  const conditionalAmount = (amount) => {
    return (amount < 1 ? unicodeFrations[~~(1/amount) - 1] : amount || 0)
  }

  const _get = (aspectKey, field) => {
    return aspects[aspectKey][field];
  }

  const buildAspectCard = (aspectData) => {
    return (<AspectCard 
      key={aspectData.name} 
      color={_get(aspectData.name, "color")} 
      iconscale={_get(aspectData.name, "scale")} 
      amount={conditionalAmount(aspectData.amount)} 
      name={aspectData.name.replace('Power','').toUpperCase()} 
      c={_get(aspectData.name, "c")} 
      effect={_get(aspectData.name, "effect")}/>);
  }

    return (
        <FlexList noHeader mode="list">
          {collection.map(aspect => 
            buildAspectCard(aspect)
          )}
        </FlexList>
    )
}

export default AspectCollectionCard