import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars

// Icons / SVG
import PetCard from './PetCard';
import FlexList from '../../components/flexlist/FlexList';

PetCollection.propTypes = {
  pets: PropTypes.array.isRequired
};

function PetCollection({pets}) {

  if (pets.length == 0) {return}

  const automationMap = ["Automates Worms"]

  return (
    <FlexList headerText="Owned Pets" mode="list">
        {pets.map(p => 
          <PetCard 
            key={p.id} 
            srcImg='./src/assets/bg-pets.png' 
            name={p.name} 
            hunger={p.hunger} 
            experience={0} 
            effect1={automationMap[p.autoFor]}
          />)}
    </FlexList>
  )
}

export default PetCollection;