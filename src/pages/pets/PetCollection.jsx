import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars

// Icons / SVG
import PetCard from './PetCard';
import FlexList from '../../components/flexlist/FlexList';

PetCollection.propTypes = {
  pets: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function PetCollection({pets, onSelect}) {

  if (pets && pets.length == 0) {return}

  const automationMap = ["Automates Worms", "Automates Artifacts", "Automates Mining", "Home Fishing", "Special Fishing"]

  return (
    <FlexList headerText="Owned Pets" mode="list">
      {pets.map(p => 
        <PetCard 
          key={p.id} 
          id={p.id}
          srcImg='./src/assets/bg-pets.png' 
          name={p.name} 
          hunger={p.hunger} 
          experience={0} 
          effect1={automationMap[p.autoFor]}
          onSelect={onSelect}
        />)}
    </FlexList>
  )
}

export default PetCollection;