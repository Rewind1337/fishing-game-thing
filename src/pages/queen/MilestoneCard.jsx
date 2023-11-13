import { Paper } from "@mui/material";

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import format from '../../utility/utility';

MilestoneCard.propTypes = {
  completed: PropTypes.bool,
  id: PropTypes.number.isRequired,
  wormsRequired: PropTypes.number.isRequired,
  bonus: PropTypes.string,
};

function MilestoneCard({id, completed = false, wormsRequired, bonus = "bonus goes here"}) {

  return (
    <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.5)'}} className="milestone-card">
      <div className="milestone-card-number">
        <FontAwesomeIcon icon={"fa-solid fa-hurricane"}/>
        {id + 1}
      </div>
      <div className="milestone-card-worms">
        <FontAwesomeIcon icon={"fa-solid fa-worm"}/>
        {format(wormsRequired)}
      </div>
      <div className="milestone-card-bonus">
        {completed && (<><s>{bonus}</s> <FontAwesomeIcon icon={"fa-solid fa-check"} /></>)}
        {!completed && bonus}
      </div>
    </Paper>
  )
}

export default MilestoneCard;
