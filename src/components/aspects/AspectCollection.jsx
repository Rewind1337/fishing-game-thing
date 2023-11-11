import PropTypes from 'prop-types';
import AspectIcon from './AspectIcon';

AspectCollectionCard.propTypes = {
  collection: PropTypes.array.isRequired,
};
  
function AspectCollectionCard({collection = []}) {

    return (
        <>
        {collection.map(aspect => <AspectIcon key={aspect.name} amount={aspect.amount} name={aspect.name.replace('Power','').toUpperCase()} aspectKey={aspect.name} scale={aspect.scale}/>)}
        </>
    )
}

export default AspectCollectionCard