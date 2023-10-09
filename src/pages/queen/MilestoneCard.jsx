import { Paper } from "@mui/material";

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHurricane, faWorm } from '@fortawesome/free-solid-svg-icons';

MilestoneCard.propTypes = {
  completed: PropTypes.bool,
  id: PropTypes.number.isRequired,
  wormsRequired: PropTypes.number.isRequired,
  bonus: PropTypes.string,
};

function MilestoneCard({id, completed = false, wormsRequired, bonus = "bonus goes here"}) {

  return (
    <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}} className="milestone-card">
      <div className="milestone-card-number">
        <FontAwesomeIcon icon={faHurricane}/>
        {id + 1}
      </div>
      <div className="milestone-card-worms">
        <FontAwesomeIcon icon={faWorm}/>
        {wormsRequired}
      </div>
      <div className="milestone-card-bonus">
        {completed && (<><s>{bonus}</s> <FontAwesomeIcon icon={faCheck} /></>)}
        {!completed && bonus}
      </div>
    </Paper>
  )
}

export default MilestoneCard;
