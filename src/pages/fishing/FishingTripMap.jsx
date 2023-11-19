import PropTypes from 'prop-types';
import GLOBALS from '../../globals/Globals';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// test visualisation
function FishingTripMap({ locationID, subLocationID, tripStatus, moveFunction }) {

  const location = GLOBALS.DB.FISHING.LOCATIONS[locationID];
  const subLocation = GLOBALS.DB.FISHING.SUBLOCATIONS[locationID][subLocationID];

  const emptyLocation = {id:-2, name:'X'};
  const exitLocation = {id:-1, name: 'Exit'};
  const negativeLocations = [emptyLocation, exitLocation, emptyLocation, {id:-3, name:'~'}];

  let locationMap = {
    'NW':emptyLocation,
    'N':emptyLocation,
    'NE':emptyLocation,
    'W':emptyLocation,
    'C':subLocation,
    'E':emptyLocation,
    'SW':emptyLocation,
    'S':emptyLocation,
    'SE':emptyLocation,
  };

  for (let key in subLocation.connections) {
    let id = subLocation.connections[key];
    if (id == -1) {
      locationMap[key] = exitLocation;
    } else {
      if (id >= 0) {
        locationMap[key] = GLOBALS.DB.FISHING.SUBLOCATIONS[locationID][id];
      } else {
        locationMap[key] = negativeLocations[-id];
      }
    }
  }

  const mouseClick = (e, key) => {
    moveFunction(locationID, locationMap[key].id);
  }

  if (tripStatus == GLOBALS.ENUMS.TRIPSTATUS.IDLE) {
    return <div className='fishing-map'>Not on a Trip</div>
  }

  if (tripStatus == GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP) {
    return <div className='fishing-map'>Preparing Trip</div>
  }

  const negativeColor = ['white', 'crimson', 'darkslategray', 'cornflowerblue'];
  const negativeName = ['nolocation', 'exit', 'nolocation', 'water']

  if (tripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE) {
    return (
      <Paper className='fishing-map'>
        <div className='fishing-map-location'>{location.name}</div>
        <Grid container className='fishing-map-grid'>
          {Object.keys(locationMap).map((objID) => {
            let realObj = locationMap[objID];
            return <Paper key={objID} onClick={(e) => {mouseClick(e, objID)}} className={'fishing-map-' + (realObj.id < 0 ? negativeName[-realObj.id] : 'sublocation') + " " + (realObj.hidden ? "hidden" : "")}>
              <div style={{color:(realObj.id < 0 ? negativeColor[-realObj.id] : 'white')}}>{realObj.name}</div>
            </Paper>
          })}
        </Grid>
      </Paper>
    )
  }
}

FishingTripMap.propTypes = {
  locationID: PropTypes.number.isRequired,
  subLocationID: PropTypes.number.isRequired,
  tripStatus: PropTypes.number.isRequired,
  moveFunction: PropTypes.func.isRequired,
};

export default FishingTripMap;