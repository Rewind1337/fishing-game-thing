import { Paper } from "@mui/material";

import PropTypes from 'prop-types';

PetCard.propTypes = {
  srcImg: PropTypes.string,
  name: PropTypes.string,
};

function PetCard({srcImg, name}) {

  return (
    <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}} className="pet-card">
      <div className="pet-card-image"><img src={srcImg}/></div>
      <div className="pet-card-grid">
        <div>{name}</div>
        <div>level progress</div>
        <div>effect</div>
        <div>effect aswell ?</div>
      </div>
    </Paper>
  )
}

export default PetCard;
