import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

import useTranslation from '../../context/useTranslation'

import './resource.scss';

ResourceCard.propTypes = {
  icon: PropTypes.object.isRequired,
  collection: PropTypes.bool,
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
  
function ResourceCard({icon, collection, dontTranslate = false, langpath = "resources", iconcolor, height, name, value, cap, perSec}) {
  name = useTranslation(langpath, name, dontTranslate);

  return (
  <Paper data-title={name} elevation={0} sx={{height: height}} className={("resource-card " + (collection ? 'collection ' : ''))}>
    <div className="resource-card-icon" style={{color: iconcolor}}>{icon}</div>
    <div className="resource-card-name truncate-text">{name}</div>
    <div className="resource-card-value">{value}{(cap ? ' / ' + cap : '')}</div>
    {
      (perSec ? <div className="resource-card-persec">{"+ " + perSec + "/s"}</div> : <></>) 
    }
  </Paper>
  );
}

export default ResourceCard