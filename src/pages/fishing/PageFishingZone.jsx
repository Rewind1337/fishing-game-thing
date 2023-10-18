// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';

// Components
import GridCell from '../../components/grid/GridCell';
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';
import ResourceCard from '../../components/resources/ResourceCard';
import ResourceCollectionCard from '../../components/resources/ResourceCollectionCard';
import FishingTripMap from './FishingTripMap';

// MUI
import LinearProgress from '@mui/material/LinearProgress';
import { Paper } from '@mui/material';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faWorm } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';
import getFish from './getFish';

// CSS Styles
import './Fishing.scss'

// Route: "/fishing"
function PageFishingZone() {

  const _context = useContext(SaveContext)
  let _allTimeStamps = useRef(_context.save.pageTimestamps)

  const [resources, setResources] = useState(resourceHook(_context))

  const [isFishing, setFishing] = useState(_context.save.fishing.isFishing || false)
  const [fishProgress, setFishProgress] = useState(_context.save.fishing.fishProgress || false)
  const [tickRange, setTickRange] = useState(_context.save.fishing.tickRange || {min: -1, max: -1})
  let fishProgressMax = GLOBALS.FISHING.TIME

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
    if (resources.worms == 0) {
      _context.refs.toastmanager['fireToast']("error", "You dont have any Worms!");
      return;
    }

    setResources(r => ({...r, worms: r.worms - 1}));
    setFishing(true)
    let tickMiddle = 10 + Math.round(Math.random() * 40);
    setTickRange({min: tickMiddle - 10, max: tickMiddle + 10})

    if (onTrip) {
      console.log("wow look at you, youre on a trip");
    }
  }

  const attemptCatch = (onTrip) => {
    if (fishProgress >= tickRange.min && fishProgress <= tickRange.max) {
      // Only fishes at night right now.
      let toastText = "";

      let caughtFish = getFish(0, 0, 1, 0.75);
      if (caughtFish.id >= 0) {
        toastText = "Caught a(n): " + caughtFish.name;
        setResources(r => ({...r, fish: r.fish + 1}));
      } else if (caughtFish.id == -1) {
        toastText = "Just a nibble.";
      } else if (caughtFish.id <= -2) {
        toastText = "You broke the game, fish not found!";
      }
      
      _context.refs.toastmanager['fireToast']("info", toastText);
    
      stopFishing();

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
    setTickRange({min: -1, max: -1})
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
    if (isFishing == true) {
      if (fishProgress >= fishProgressMax-1) {
        setFishing(false)
      }
      setFishProgress((old) => (old >= (fishProgressMax-1) ? 0 : old + 1));
    }
  }

  useEffect(() => {
    const timer = setInterval(pageTick, 500);

    return () => {
      clearInterval(timer);
    };

  }, [resources, isFishing, fishProgress, tickRange]);  // eslint-disable-line react-hooks/exhaustive-deps
 
  // unmount
  useEffect(() => () => {
    // contextSave(); // this breaks the save on exit? automation works now lol
  }, []);

  // Catch up the Ticks
  useEffect(() => {
    let _lastTimestamp = _allTimeStamps.current.fishing;
    let deltaTimeInMs = Date.now() - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs / 500);
    let cappedToMaxTicks = Math.min(7200, flooredToSec) // * aspect stuff * other stuff

    for (let i = 0; i < cappedToMaxTicks; i++) {
      if (isFishing) {
        pageTick();
      }
    }
  }, [])

  // Save Variables to LS after tick
   useEffect(() => {
    contextSave();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  const fishCollection = [
    {
      icon: <FontAwesomeIcon icon={faFish} />,
      iconcolor: 'hsl(235deg, 100%, 90%)',
      name: 'Fish',
      value: resources.fish,
      cap: 0,
      perSec: 0,
    },
  ]

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.FISHING} title="Fishing Zone" gridId="grid-fishing" contentClasses={'fishing'}>

      <GridCell gridPosition='top-left'>
      <FlexList collapsible headerElement={<h4>{"All Resources"}</h4>} mode="list" minHeight={128} maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={resources.worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCollectionCard collection={fishCollection} name={'All Fish'} icon={<FontAwesomeIcon icon={faFish} />} iconcolor={"hsl(235deg, 100%, 90%)"} />
        </FlexList>
      </GridCell>

      <GridCell gridPosition='top-middle' noFlexOverride>
        <LinearProgress variant="determinate" color={fishProgress >= tickRange.min && fishProgress <= tickRange.max ? 'gathering' : 'fishing'} sx={{height: "100%", margin: "0 auto"}} value={(fishProgress / fishProgressMax) * 100} />
      </GridCell>

      <GridCell gridPosition='top-right'>
        <FishingTripMap location={fishingTripData.location} tripStatus={fishingTripStatus}/>
      </GridCell>

      <GridCell gridPosition='center'>

      </GridCell>

      <GridCell gridPosition='bottom-left'>
        <FlexList collapsible mode='list' headerElement={<h5>Rods</h5>}>
            {GLOBALS.DB.ROD.map((r) => {
                return (
                  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={r.id} className='inventory-card rod'>
                    <div className='inventory-card-buttons'>
                      <ActionButton text={"Equip"}/>
                    </div>
                    <div className='inventory-card-name'>{r.name}</div>
                  </Paper>
                )
            })}
            </FlexList>
            <FlexList collapsible mode='list' headerElement={<h5>Hooks</h5>}>
            {GLOBALS.DB.HOOK.map((h) => {
                return (
                  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={h.id} className='inventory-card hook'>
                    <div className='inventory-card-buttons'>
                      <ActionButton text={"Equip"}/>
                    </div>
                    <div className='inventory-card-name'>{h.name}</div>
                  </Paper>
                )
            })}
            </FlexList>
            <FlexList collapsible mode='list' headerElement={<h5>Bait</h5>}>
            {GLOBALS.DB.BAIT.map((b) => {
                return (
                  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={b.id} className='inventory-card bait'>
                    <div className='inventory-card-buttons'>
                      <ActionButton text={"Equip"}/>
                    </div>
                    <div className='inventory-card-name'>{b.name}</div>
                  </Paper>
                )
            })}
            </FlexList>
            <FlexList collapsible mode='list' headerElement={<h5>Lures</h5>}>
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
      </GridCell>

      <GridCell gridPosition='bottom-middle' flexDirection='row' justifyContent='flex-end'>
        <div className='action-buttons'>
          
          {fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.IDLE && <>
            {(isFishing
              ? <ActionButton color="fishing" variant="contained" text='Attempt to reel it in' func={() => {attemptCatch(false)}}/>
              : <ActionButton color="fishing" variant="contained" text='Throw out your Fishing Rod BOI' func={() => {startFishing(false)}}/>
            )}
            <ActionButton color="gathering" variant="contained" text='Prepare Fishing Trip' func={() => {setTripTo(GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP)}}/>
          </>}

          {fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP && <>
            <ActionButton color="fishing" variant="contained" text='Start Fishing Trip' func={() => {setTripTo(GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE)}}/>
          </>}

          {fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE && <>
            {(isFishing
              ? <ActionButton color="fishing" variant="contained" text='Attempt to reel it in' func={() => {attemptCatch(true)}}/>
              : <ActionButton color="fishing" variant="contained" text='Throw out your Fishing Rod BOI' func={() => {startFishing(true)}}/>
            )}
            <ActionButton color="queen" variant="contained" text='Finish Trip' func={() => {setTripTo(GLOBALS.ENUMS.TRIPSTATUS.IDLE)}}/>
          </>}

        </div>
      </GridCell>

      <GridCell gridPosition='bottom-right'>
        <>Loot?</>
      </GridCell>

    </PageCore>
  )
}

export default PageFishingZone;