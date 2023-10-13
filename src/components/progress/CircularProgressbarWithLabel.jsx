import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './override.css';

export default function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />

        <Box sx={{top: '-20%',left: 0,bottom: 0,right: 0,
        position: 'absolute',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>

        <div style={{color: props.iconcolor, scale: props.iconScale}}>{props.icon}</div>
        
        </Box>

        <Box sx={{top: '35%',left: 0,bottom: 0,right: 0,fontSize: props.fontSize,
            position: 'absolute',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>

            {Math.round(props.value) + "%"}

        </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  icon: PropTypes.element,
  iconcolor: PropTypes.string,
  iconScale: PropTypes.string,
  fontSize: PropTypes.string,
  textElement: PropTypes.element,
  value: PropTypes.number.isRequired,
};
