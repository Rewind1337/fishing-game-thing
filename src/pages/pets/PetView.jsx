import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars
import { Paper } from "@mui/material";

// Icons / SVG
import FlexList from '../../components/flexlist/FlexList';

PetView.propTypes = {
  pets: PropTypes.array.isRequired,
  petID: PropTypes.number,
};

function PetView({pets, petID}) {
  let thePet = pets[petID];

  const automationMap = ["Automates Worms", "Automates Artifacts", "Automates Mining", "Home Fishing", "Special Fishing"]

  return (
    <Paper className='pet-view'>
      {thePet.name}
    </Paper>
  )
}

export default PetView;