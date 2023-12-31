import PropTypes from 'prop-types';
import { Box, CircularProgress, Paper } from "@mui/material";
import CircularProgressWithLabel from "../../components/progress/CircularProgressbarWithLabel";
import ActionButton from "../../components/ActionButton";
import FlexList from '../../components/flexlist/FlexList';
import AutomationCard from './AutomationCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

GatheringModule.propTypes = {
  isUnlocked: PropTypes.bool,
  icon: PropTypes.element.isRequired,
  iconColor: PropTypes.string.isRequired,
  progressColor: PropTypes.string.isRequired,
  header: PropTypes.string,
  progress: PropTypes.number,
  bigSize: PropTypes.number,
  smallSize: PropTypes.number,
  progressMax: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  canCollect: PropTypes.bool.isRequired,
  start: PropTypes.func.isRequired,
  collect: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  minGain: PropTypes.number.isRequired,
  maxGain: PropTypes.number.isRequired,
  autoUnlocked: PropTypes.bool,
  autoSpeed: PropTypes.number,
  autoSegments: PropTypes.number,
};

function GatheringModule({ isUnlocked = false, icon, iconColor, progressColor, header, bigSize = 120, smallSize = 66, progress, progressMax, autoUnlocked = false, autoSpeed = 1, autoSegments = 1, isActive, canCollect, start, collect, time, minGain, maxGain }) {

  if (!isUnlocked) {
    return (<Paper elevation={1} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', height: 'min-content' }}>more ??</Paper>)
  }

  return (<Paper className='gathering-module'>
    <h5 style={{ borderRadius: "4px", backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>{header}</h5>
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

      <Box sx={{ zIndex: 101 }}>
        <CircularProgressWithLabel fontSize='15px' iconoffsettop={"-15%"} textoffsettop={"40%"} iconsize={"30px"} icon={icon} iconcolor={iconColor} sx={{ padding: "5px", color: progressColor }} color={progressColor} size={bigSize} thickness={4} variant="determinate" value={Math.min(100, progress / progressMax * 100)} />
      </Box>

      {autoUnlocked &&
        <Box sx={{ position: 'relative', top: '50%' }}>
          <CircularProgress className={"anim-speed-" + autoSpeed + " anim-segments-" + autoSegments} sx={{ padding: '4px' }} variant="indeterminate" color={progressColor} size={smallSize} thickness={6} />
        </Box>
      }

    </Box>
    
    <FlexList noHeader mode="list">
      <AutomationCard icon={<FontAwesomeIcon icon="fa-solid fa-gears"/>} type="Gain" value={minGain.toFixed(1) + "-" + maxGain.toFixed(1) + " " + header}/>
      <AutomationCard icon={<FontAwesomeIcon icon="fa-solid fa-circle-notch"/>} type="Speed" value={time.toFixed(2) + " Seconds"}/>
      <AutomationCard icon={<FontAwesomeIcon icon="fa-solid fa-question"/>} type="Guaranteed Encounter" value={""} color={progressColor}/>
    </FlexList>
    
    <div className='action-button-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {(isActive
        ? <ActionButton disabled={!canCollect ? true : false} color={progressColor} variant="contained" text='Collect' func={collect}></ActionButton>
        : <ActionButton disabled={isActive ? true : false} color={progressColor} variant="contained" text='Start Digging' func={start}></ActionButton>
      )}
    </div>

    {autoUnlocked &&
      <div className='automation-container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <FlexList headerText='Automation' collapsible collapsed mode="list">
          <AutomationCard icon={<FontAwesomeIcon icon="fa-solid fa-gears"/>} type="Gain" value={"1 " + header}/>
          <AutomationCard icon={<FontAwesomeIcon icon="fa-solid fa-circle-notch"/>} type="Speed" value={"30 Seconds"}/>
        </FlexList>
      </div>
    }
  </Paper>);
}

export default GatheringModule;