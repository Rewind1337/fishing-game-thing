import { Paper } from "@mui/material";

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { format } from '../../utility/utility';  // eslint-disable-line no-unused-vars

MilestoneCard.propTypes = {
  completed: PropTypes.bool,
  id: PropTypes.number.isRequired,
  sacrificeRequired: PropTypes.number.isRequired,
  bonus: PropTypes.string,
};

function MilestoneCard({id, completed = false, sacrificeRequired, bonus = "bonus goes here"}) {

  return (
    <Paper className={"milestone-card" + (completed ? " completed" : "")}>
      <div className="milestone-card-number">
        <FontAwesomeIcon icon={"fa-solid fa-hurricane"}/>
        {id + 1}
      </div>
      <div className="milestone-card-sacrifice">
        <FontAwesomeIcon icon="fa-solid fa-fish-fins" />
        {format(sacrificeRequired)}
      </div>
      <div className="milestone-card-bonus">
        {completed && (<><s>{bonus}</s> <FontAwesomeIcon icon={"fa-solid fa-check"} /></>)}
        {!completed && bonus}
      </div>
    </Paper>
  )
}

export default MilestoneCard;
