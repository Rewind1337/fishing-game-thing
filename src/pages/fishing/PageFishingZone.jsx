// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';
import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars

// Components
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';
import ResourceCard from '../../components/resources/ResourceCard';
import FishCollection from '../inventory/FishCollection';
import FishingTripMap from './FishingTripMap';

// MUI
import LinearProgress from '@mui/material/LinearProgress';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWorm } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';
import getFish from './getFish';

// CSS Styles
import './Fishing.scss';

// Route: "/fishing"
function PageFishingZone() {

  const _context = useContext(SaveContext)
  let _allTimeStamps = useRef(_context.save.pageTimestamps)
  let localTimestamp = useRef(Date.now());
  let ticksDone = useRef(0);

  const [resources, setResources] = useState(resourceHook(_context))

  const [isFishing, setFishing] = useState(_context.save.fishing.isFishing || false)
  const [fishProgress, setFishProgress] = useState(_context.save.fishing.fishProgress || false)
  const [tickRange, setTickRange] = useState(_context.save.fishing.tickRange || {min: [-1], max: [-1], catch: 0})
  let fishProgressMax = GLOBALS.FISHING.TIME
  let fishProgressPerTick = GLOBALS.FISHING.SPEED

  const [equipment, setEquipment] = useState(_context.save.character);

  const [fishingTripStatus, setFishingTripStatus] = useState(GLOBALS.ENUMS.TRIPSTATUS.IDLE)
  const [fishingTripData, setFishingTripData] = useState({});

  const contextSave = () => {
    _allTimeStamps.current.fishing = Date.now();

    _context.setSave(
      {
        pageTimestamps: _allTimeStamps.current,
        resources: {...resources}, 
        fishing: {isFishing: isFishing, fishProgress: fishProgress, tickRange: tickRange}
      }
    )
  }

  const startFishing = (onTrip) => {
    let hook = GLOBALS.DB.HOOK[equipment.hook];
    let multiCatch = hook.multiCatch;

    if (resources.worms <= 0) {
      _context.refs.toastmanager['fireToast']("error", "You dont have any Worms!");
      return;
    }
    if (resourceHook.worms <= multiCatch) {
      _context.refs.toastmanager['fireToast']("warning", "You dont have enough Worms for this hook!");
      return;
    }

    setResources(r => ({...r, worms: r.worms - (multiCatch + 1)}));
    setFishing(true);

    let tickWidth = 20;
    let tickMiddle = tickWidth/2 + Math.round(Math.random() * 30);
    let newTickRange = {min: [tickMiddle - tickWidth/2], max: [tickMiddle + tickWidth/2], catch: 0};

    for (let i = 1; i <= multiCatch; i++) {
      let timeLeft = 60 - newTickRange.max[i-1];
      tickWidth = Math.min(timeLeft / 2, tickWidth / 2);
      tickMiddle = newTickRange.max[i-1] + tickWidth / 2 + Math.round(Math.random() * (timeLeft - 2 * tickWidth));

      newTickRange.min.push(tickMiddle - tickWidth/2);
      newTickRange.max.push(tickMiddle + tickWidth/2);
    }
    setTickRange(newTickRange);

    if (onTrip) {
      console.log("wow look at you, youre on a trip");
    }
  }

  const attemptCatch = (onTrip) => {
    let hook = GLOBALS.DB.HOOK[equipment.hook];

    if (hook.canCatch(fishProgress, tickRange)) {
      // Only fishes at night right now.
      let toastText = "";

      // home
      let location = [-1, 0];
      
      let dayTime = 0.85;

      let modifiers = {'bait':1};
      modifiers = {'bait':1, 'homeUnlocks':['wailer']};

      let caughtFish = getFish(location, dayTime, modifiers);

      if (caughtFish.id >= 0) {
        let vowelN = (['aeiouy'].includes(caughtFish.name[0].toLowerCase()) ? "n" : "");
        toastText = "Caught a"+vowelN+": " + caughtFish.name;
        setResources(r => ({...r, fish: r.fish + 1}));

        let newFishes = resources.fishes;
        newFishes[caughtFish.id] = newFishes[caughtFish.id] + 1 || 1;
        setResources(r => ({...r, fishes: r.fishes = newFishes}));

        if (hook.multiCatch > 0 && hook.multiCatch > tickRange.catch) {
          toastText += ", but there's another chance!";
        } else { toastText += "!"}

        _context.refs.toastmanager['fireToast']("success", toastText);

      } else if (caughtFish.id == -1) {
        toastText = "Just a nibble";

        if (hook.multiCatch > 0 && hook.multiCatch > tickRange.catch) {
          toastText += ", but there's another chance!";
        } else { toastText += "."}

        _context.refs.toastmanager['fireToast']("info", toastText);
      } else if (caughtFish.id <= -2) {
        toastText = "You broke the game, fish not found!";
        _context.refs.toastmanager['fireToast']("error", toastText);
      }
      
      if (hook.multiCatch > 0 && hook.multiCatch > tickRange.catch) {
        let newTickRange = tickRange;
        newTickRange.catch += 1;
        setTickRange(newTickRange);
      } else {
        stopFishing();
      }

      if (onTrip) {
        console.log("wow look at you, you attempted a catch on a trip");
      }

      return;
    }
    stopFishing();
  }

  const stopFishing = () => {
    setFishing(false);
    setFishProgress(0);
    setTickRange({min: [-1], max: [-1], catch: 0})
  }

  const setTripTo = (n) => {
    stopFishing();
    setFishingTripStatus(n);

    if (n == GLOBALS.ENUMS.TRIPSTATUS.IDLE) {setFishingTripData({})}

    if (n == GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP) {setFishingTripData({
      location: GLOBALS.DB.FISHING.LOCATIONS[0]
    })}
  }
  
  const pageTick = () => {
    let currentTime = Date.now();
    let deltaTime = currentTime - localTimestamp.current;

    if (ticksDone.current.isNaN) {ticksDone = 0;}

    // console.log("Ticks Done", ticksDone.current);
    // console.log("PageTick Drift", deltaTime - 500);

    /*
    // Discreet Version
    let ticksToDo = ~~((deltaTime + 100) / 500);
    localTimestamp.current = localTimestamp.current + ticksToDo * 500;

    updateTick(ticksToDo);
    ticksDone.current += ticksToDo;
    */

    // Fractional Ticks Version
    let ticksToDo = deltaTime / 500;
    localTimestamp.current = localTimestamp.current + deltaTime;
    updateTick(ticksToDo);

    ticksDone.current += ticksToDo;
  }

  const updateTick = (ticks) => {
    if (isFishing == true) {
      if (fishProgress >= fishProgressMax - 1) {
        setFishing(false)
      }
      setFishProgress((old) => (old >= (fishProgressMax - 1) ? 0 : old + fishProgressPerTick * ticks));
    }
  }

  useEffect(() => {
    const timer = setInterval(pageTick, 500);

    return () => {
      clearInterval(timer);
    };

  }, [resources, isFishing, fishProgress, tickRange]);  // eslint-disable-line react-hooks/exhaustive-deps
 
  useEffect(() => () => {}, []); // unmount

  // Catch up the Ticks
  useEffect(() => {
    let _lastTimestamp = _allTimeStamps.current.fishing;
    let deltaTimeInMs = Date.now() - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs / 500);
    let cappedToMaxTicks = Math.min(7200, flooredToSec) // * aspect stuff * other stuff

    updateTick(cappedToMaxTicks);
  }, [])

  // Save Variables to LS after tick
   useEffect(() => {
    contextSave();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  const handleFishingButtonClick = (onTrip) => {
    (isFishing ? attemptCatch(onTrip) : startFishing(onTrip));
  }

  const fishingButton = <ActionButton color="fishing" variant="contained" text={(isFishing ? 'Attempt to reel it in' : 'Throw out your Rod')} func={() => { handleFishingButtonClick(fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE); } } />

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.FISHING} title="Fishing Zone" gridId="grid-fishing" contentClasses={'fishing'}>

    <Grid mobile={12} sx={{flexGrow: '1'}} minHeight={40} spacing={0} height={"auto"}>
      <LinearProgress variant="determinate" color={GLOBALS.DB.HOOK[equipment.hook].fishingBarColor(fishProgress, tickRange)} sx={{height: "100%", margin: "0 auto"}} value={(fishProgress / fishProgressMax) * 100} />
    </Grid>

    <Grid container mobile={12} maxHeight={250} overflow={"auto"} flexGrow={1} spacing={0.5} paddingTop={1}>
      <Grid mobile={6} tablet={6} desktop={4} widescreen={3} maxHeight={240} overflow={"auto"}>
        <FlexList collapsible headerText={"All Resources"} mode="list">
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={resources.worms} cap={0} perSec={0}></ResourceCard>
          <FishCollection resources={resources}/>
        </FlexList>
      </Grid>
      <Grid container mobile={6} desktop={4} widescreen={6} spacing={0.5} height={"min-content"} paddingTop={0}>
        <Grid mobile={12} desktop={6} >
          <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            {fishingTripStatus != GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP && <>
              {fishingButton}
            </>}
          </Paper>
        </Grid>
        <Grid mobile={12} desktop={6}>
          <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            {fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.IDLE && <>
              <ActionButton color="gathering" variant="contained" text='Prepare Fishing Trip' func={() => {setTripTo(GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP)}}/>
            </>}

            {fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP && <>
              <ActionButton color="fishing" variant="contained" text='Start Fishing Trip' func={() => {setTripTo(GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE)}}/>
            </>}

            {fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE && <>
              <ActionButton color="queen" variant="contained" text='Finish Fishing Trip' func={() => {setTripTo(GLOBALS.ENUMS.TRIPSTATUS.IDLE)}}/>
            </>}
          </Paper>
        </Grid>
      </Grid>
      <Grid className="hide-tablet-down show-desktop-up" mobile={6} desktop={4} widescreen={3} maxHeight={250} overflow={"auto"}>
        <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)', width: "100%"}}>
          <FishingTripMap location={fishingTripData.location} tripStatus={fishingTripStatus}/>
        </Paper>
      </Grid>
    </Grid>
    
    <Grid container mobile={12} maxHeight={400} overflow={"auto"} sx={{flexGrow: '1'}} spacing={0.5}>
      <Grid mobile={6} desktop={4} widescreen={3} spacing={0}>
        <FlexList collapsible mode='list' headerText={"Rods"}>
          {GLOBALS.DB.ROD.map((r) => {
            return (
              <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={r.id} className='inventory-card rod'>
                <div className='inventory-card-buttons'>
                  <ActionButton text={"Equip"}/>
                </div>
                <div className='inventory-card-name'>{r.name}</div>
              </Paper>
            )})}
          </FlexList>
          <FlexList collapsible mode='list' headerText={"Hooks"}>
          {GLOBALS.DB.HOOK.map((h) => {
            return (
              <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={h.id} className='inventory-card hook'>
                <div className='inventory-card-buttons'>
                  <ActionButton text={"Equip"}/>
                </div>
                <div className='inventory-card-name'>{h.name}</div>
              </Paper>
            )})}
          </FlexList>
          <FlexList collapsible mode='list' headerText={"Bait"}>
          {GLOBALS.DB.BAIT.map((b) => {
            return (
              <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={b.id} className='inventory-card bait'>
                <div className='inventory-card-buttons'>
                  <ActionButton text={"Equip"}/>
                </div>
                <div className='inventory-card-name'>{b.name}</div>
              </Paper>
          )})}
          </FlexList>
          <FlexList collapsible mode='list' headerText={"Lures"}>
          {GLOBALS.DB.LURE.map((l) => {
            return (
              <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={l.id} className='inventory-card lure'>
                <div className='inventory-card-buttons'>
                  <ActionButton text={"Use"}/>
                </div>
                <div className='inventory-card-name'>{l.name}</div>
              </Paper>
          )})}
        </FlexList>
      </Grid>

      <Grid className="show-tablet-down hide-desktop-up" mobile={6} desktop={8} widescreen={9} maxHeight={400} overflow={"auto"}>
        <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)', width: "100%"}}>
          <FishingTripMap location={fishingTripData.location} tripStatus={fishingTripStatus}/>
        </Paper>
      </Grid>

    </Grid>

    </PageCore>
  )
}

export default PageFishingZone;