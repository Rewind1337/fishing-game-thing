import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

import useTranslation from '../../context/useTranslation'

import './resource.scss';

ResourceCard.propTypes = {
  icon: PropTypes.object.isRequired,
  langpath: PropTypes.string,
  dontTranslate: PropTypes.bool,
  iconcolor: PropTypes.string,
  height: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.number,
  cap: PropTypes.number,
  perSec: PropTypes.number,
  paperBorder: PropTypes.bool,
};
  
function ResourceCard({icon, dontTranslate = false, langpath = "resources", iconcolor, height, name, value, cap, perSec, paperBorder}) {
  name = useTranslation(langpath, name, dontTranslate);
  
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