import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />

        <Box sx={{top: '-20%',left: 0,bottom: 0,right: 0,
        position: 'absolute',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>

        <div style={{color: props.iconColor, scale: props.iconScale}}>{props.icon}</div>
        
        </Box>

        <Box sx={{top: '35%',left: 0,bottom: 0,right: 0,fontSize: props.textSize,
            position: 'absolute',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>

            {Math.round(props.value) + "%"}

        </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  icon: PropTypes.element,
  iconColor: PropTypes.string,
  iconScale: PropTypes.string,
  textSize: PropTypes.string,
  value: PropTypes.number.isRequired,
};
