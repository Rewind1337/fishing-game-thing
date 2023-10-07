import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

ResourceCard.propTypes = {
  icon: PropTypes.object.isRequired,
  iconColor: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  cap: PropTypes.number,
  perSec: PropTypes.number,
};
  
function ResourceCard({icon, iconColor, name, value, cap, perSec}) {
  return (
  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}} className="resource-card">
    <div className="resource-card-icon" style={{color: iconColor}}>{icon}</div>
    <div className="resource-card-name">{name}</div>
    <div className="resource-card-value">{value}{(cap ? ' / ' + cap : '')}</div>
    {
      (perSec ? <div className="resource-card-persec">{"+ " + perSec + "/s"}</div> : <></>) 
    }
  </Paper>
  );
}

export default ResourceCard