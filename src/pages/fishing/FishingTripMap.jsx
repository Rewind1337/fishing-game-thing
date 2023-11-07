import PropTypes from 'prop-types';
import GLOBALS from '../../globals/Globals';
import { Paper } from '@mui/material';

// test visualisation
function FishingTripMap({ location, tripStatus }) {

  const mouseClick = (e) => {
    console.log(e);
  }

  if (tripStatus == GLOBALS.ENUMS.TRIPSTATUS.IDLE) {
    return <div className='fishing-map'>Not on a Trip</div>
  }

  if (tripStatus == GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP) {
    return <div className='fishing-map'>Preparing Trip</div>
  }

  if (tripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE) {
    return (
      <Paper className='fishing-map' onClick={mouseClick}>
        <div className='fishing-map-location'>{location.name}</div>
        <div className='fishing-map-grid'>
          {location.sublocations.map((objID) => {
            let realObj = GLOBALS.DB.FISHING.SUBLOCATIONS[objID]
            return <div key={realObj.id} className={'fishing-map-sublocation ' + (realObj.hidden ? "hidden" : "")}>{realObj.name}</div>
          })}
        </div>
      </Paper>
    )
  }
}

FishingTripMap.propTypes = {
  location: PropTypes.object,
  tripStatus: PropTypes.number.isRequired,
};

export default FishingTripMap;