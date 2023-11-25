import PropTypes from 'prop-types';
import FlexList from '../flexlist/FlexList';
import AspectCard from '../../pages/queen/AspectCard';
import GLOBALS from '../../globals/Globals';

AspectCollectionCard.propTypes = {
  collection: PropTypes.array.isRequired,
};
  
function AspectCollectionCard({collection = []}) {
  const aspects = GLOBALS.DB.ASPECTS;
  const unicodeFrations = [1, '½', '⅓', '¼', '⅕', '⅙', '⅐', '⅛', '⅑', '⅒'];

  const conditionalAmount = (amount) => {
    return (amount < 1 ? unicodeFrations[~~(1/amount) - 1] : amount || 0);
  }

  const getChar = (aspectKey) => {
    return aspects[aspectKey].c
  }

  const getEffect = (aspectKey) => {
    return aspects[aspectKey].effect
  }

  const getScale = (aspectKey) => {
    return aspects[aspectKey].scale
  }

  const getColor = (aspectKey) => {
    return aspects[aspectKey].color
  }

  const buildAspectCard = (aspectData) => {
    return (<AspectCard key={aspectData.name} color={getColor(aspectData.name)} iconscale={getScale(aspectData.name)} amount={conditionalAmount(aspectData.amount)} name={aspectData.name.replace('Power','').toUpperCase()} c={getChar(aspectData.name)} effect={getEffect(aspectData.name)}/>);
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