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

// MUI
import LinearProgress from '@mui/material/LinearProgress';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faWorm } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Fishing.scss'
import ResourceCollectionCard from '../../components/resources/ResourceCollectionCard';

// Route: "/fishing"
function PageFishingZone() {

  const _context = useContext(SaveContext)
  let _allTimeStamps = useRef(_context.save.pageTimestamps)
  
  const [fish, setFish] = useState(_context.save.resources.fish || 0)
  const [worms, setWorms] = useState(_context.save.resources.worms || 0)
  const [artifacts, setArtifacts] = useState(_context.save.resources.artifacts || 0)  // eslint-disable-line no-unused-vars

  const [isFishing, setFishing] = useState(_context.save.fishing.isFishing || false)
  const [fishProgress, setFishProgress] = useState(_context.save.fishing.fishProgress || false)
  const [tickRange, setTickRange] = useState(_context.save.fishing.tickRange || {min: -1, max: -1})
  let fishProgressMax = GLOBALS.FISHING.TIME

  const [fishingTripStatus, setFishingTripStatus] = useState(0)

  const contextSave = () => {
    _allTimeStamps.current.fishing = Date.now();

    _context.setSave(
      {
        pageTimestamps: _allTimeStamps.current,
        resources: {worms: worms, fish: fish, artifacts: artifacts}, 
        fishing: {isFishing: isFishing, fishProgress: fishProgress, tickRange: tickRange}
      }
    )
  }

  const startFishing = () => {
    if (worms == 0) return;
    setFishing(true)
    setWorms(worms - 1);
    let tickMiddle = 10 + Math.round(Math.random() * 40);
    setTickRange({min: tickMiddle - 10, max: tickMiddle + 10})
  }

  const attemptCatch = () => {
    if (fishProgress >= tickRange.min && fishProgress <= tickRange.max) {
      alert("ayy");
      setFish(fish + 1);
      stopFishing();
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

  }, [worms, fish, isFishing, fishProgress, tickRange]);  // eslint-disable-line react-hooks/exhaustive-deps
 
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
      value: fish,
      cap: 0,
      perSec: 0,
    },
  ]

  return (
    <PageCore title="Fishing Zone" gridId="grid-fishing" contentClasses={'fishing'}>

      <GridCell gridPosition='top-left'>
      <FlexList collapsible headerElement={<h4>{"All Resources"}</h4>} mode="list" minHeight={128} maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCollectionCard collection={fishCollection} name={'Fishy Stuff'} icon={<FontAwesomeIcon icon={faFish} />} iconcolor={"hsl(235deg, 100%, 90%)"} />
        </FlexList>
      </GridCell>

      <GridCell gridPosition='top-middle' noFlexOverride>
        <LinearProgress variant="determinate" color={fishProgress >= tickRange.min && fishProgress <= tickRange.max ? 'gathering' : 'fishing'} sx={{height: "100%", margin: "0 auto"}} value={(fishProgress / fishProgressMax) * 100} />
      </GridCell>

      <GridCell gridPosition='top-right'>
        <>Current effects?</>
      </GridCell>

      <GridCell gridPosition='center'>
        {fishingTripStatus == 0 && <> {/* Just Fishing */}
          <ActionButton disabled={(isFishing ? true : false)} color="fishing" variant="contained" text='Throw out your Fishing Rod BOI' func={startFishing}/><br/>
          <ActionButton disabled={(!isFishing ? true : false)} color="fishing" variant="contained" text='Attempt to reel it in' func={() => {attemptCatch()}}/>
          <ActionButton color="gathering" variant="contained" text='Start Trip' func={() => {setTripTo(1)}}/><br/>
        </>
        }
        {fishingTripStatus == 1 && <> {/* Fishing Trip */}
          <ActionButton disabled={(isFishing ? true : false)} color="fishing" variant="contained" text='Throw out your Fishing Rod BOI' func={startFishing}/><br/>
          <ActionButton disabled={(!isFishing ? true : false)} color="fishing" variant="contained" text='Attempt to reel it in' func={() => {attemptCatch()}}/>
          <ActionButton color="queen" variant="contained" text='Finish Trip' func={() => {setTripTo(0)}}/><br/>
        </>
        }
      </GridCell>

      <GridCell gridPosition='bottom-left'>
        <>Changing Lures, Rods etc</>
      </GridCell>

      <GridCell gridPosition='bottom-middle'>
        <>?</>
      </GridCell>

      <GridCell gridPosition='bottom-right'>
        <>Loot?</>
      </GridCell>

    </PageCore>
  )
}

export default PageFishingZone;
