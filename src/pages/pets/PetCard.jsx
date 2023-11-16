import { LinearProgress, Paper } from "@mui/material";

import PropTypes from 'prop-types';
import ActionButton from "../../components/ActionButton";

PetCard.propTypes = {
  srcImg: PropTypes.string,
  name: PropTypes.string,
  hunger: PropTypes.number,
  experience: PropTypes.number,
  effect1: PropTypes.string,
};

function PetCard({srcImg, name, hunger, experience, effect1}) {

  const buttons = (
    <div style={{display: "flex", width: "100%"}}>
      <ActionButton color="pets" variant="contained" text="quick feed"/>
      <ActionButton disabled color="pets" variant="contained" text="mission"/>
    </div>
  )

  const hungerMap = ["success", "warning", "danger"];

  return (
    <Paper className="pet-card">
      <div className="pet-card-image"><img src={srcImg}/></div>
      <div className="pet-card-grid">
        <div>{name}</div>
        <div className="linear-progress-with-label">
          <LinearProgress className="linear-progress pet-progress" color={hungerMap[~~(hunger * 3)]} variant="determinate" value={hunger * 100}/>
          <div className="linear-progress-label">Hunger</div>
        </div>
        <div>{effect1}</div>
        <div className="linear-progress-with-label">
          <LinearProgress className="linear-progress pet-progress" color="info" variant="determinate" value={experience}/>
          <div className="linear-progress-label">Experience</div>
        </div>
        {buttons}
      </div>
    </Paper>
  )
}

export default PetCard;
