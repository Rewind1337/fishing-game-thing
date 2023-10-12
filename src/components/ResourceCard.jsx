import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import LanguageContext from '../context/LanguageContext';
import { useContext } from 'react';

ResourceCard.propTypes = {
  icon: PropTypes.object.isRequired,
  iconcolor: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  cap: PropTypes.number,
  perSec: PropTypes.number,
};
  
function ResourceCard({icon, iconcolor, name, value, cap, perSec}) {
  const _lang = useContext(LanguageContext);
  name = _lang.languageFile.resources[name.toLowerCase()];
  return (
  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}} className="resource-card">
    <div className="resource-card-icon" style={{color: iconcolor}}>{icon}</div>
    <div className="resource-card-name">{name}</div>
    <div className="resource-card-value">{value}{(cap ? ' / ' + cap : '')}</div>
    {
      (perSec ? <div className="resource-card-persec">{"+ " + perSec + "/s"}</div> : <></>) 
    }
  </Paper>
  );
}

export default ResourceCard