import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import LanguageContext from '../../context/LanguageContext';
import { useContext } from 'react';

ResourceCard.propTypes = {
  icon: PropTypes.object.isRequired,
  iconcolor: PropTypes.string,
  height: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.number,
  cap: PropTypes.number,
  perSec: PropTypes.number,
  dontTranslate: PropTypes.bool,
  paperBorder: PropTypes.bool,
};
  
function ResourceCard({icon, iconcolor, height, name, value, cap, perSec, dontTranslate = false, paperBorder}) {
  const _lang = useContext(LanguageContext);

  if (_lang.languageFile.resources[name.toLowerCase()] != undefined) {
    if (!dontTranslate) {
      name = _lang.languageFile.resources[name.toLowerCase()];
    }
  }

  const paperSX = {
    backgroundColor: 'rgba(0, 0, 0, 0.0)', 
    height: height,
    borderLeft: (paperBorder ? '1px solid rgba(255, 255, 255, 0.3)': '')
  }

  return (
  <Paper title={name} elevation={1} sx={paperSX} className="resource-card">
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