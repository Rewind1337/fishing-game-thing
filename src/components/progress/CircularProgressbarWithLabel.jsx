import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './progress.scss';

export default function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />

        <Box sx={{top: props.iconoffsettop, left: 0,bottom: 0,right: 0,
        position: 'absolute',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>

        <div style={{color: props.iconcolor, fontSize: props.iconsize}}>{props.icon}</div>
        
        </Box>

        <Box sx={{top: props.textoffsettop, left: 0,bottom: 0,right: 0,fontSize: props.fontSize,
            position: 'absolute',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>

            {props.value.toFixed(2) + " %"}

        </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  icon: PropTypes.element,
  iconcolor: PropTypes.string,
  iconsize: PropTypes.string,
  fontSize: PropTypes.string,
  iconoffsettop: PropTypes.string,
  textoffsettop: PropTypes.string,
  textElement: PropTypes.element,
  value: PropTypes.number.isRequired,
};
