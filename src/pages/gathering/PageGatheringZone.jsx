// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';

// Components
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import ResourceCard from '../../components/resources/ResourceCard';
import GatheringModule from './GatheringModule';

// MUI 
import Grid from '@mui/material/Unstable_Grid2';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';
import aspectHook from '../../utility/aspectHook';
import FishCollection from '../../components/resources/FishCollection';

// CSS Styles
import './Gathering.scss'
import BaitCollection from '../../components/resources/BaitCollection';
import Farm from './Farm';

import checkForEncounters from '../../utility/encounters/checkForEncounters';
import generateModalContent from '../../utility/encounters/generateModalContent';

// Route: "/gathering"
function PageGatheringZone() {

  const _context = useContext(SaveContext);
  let _allTimeStamps = useRef(_context.save.pageTimestamps);
  let localTimestamp = useRef(Date.now());
  let ticksDone = useRef(0);

  const arrayWithObjectsHasFieldWithValue = (arr, field, value) => {
    for (let obj in arr) {
      if (arr[obj][field] == value) {return true;}
    }
    return false;
  }

  const [resources, setResources] = useState(resourceHook(_context));
  const [aspects, ] = useState(aspectHook(_context));
  const [pets, ] = useState(_context.save.pets || []);

  let getWormSpeed = function() {return (1 + (aspects.wormPower < 2 ? aspects.wormPower : 2)) * (1 + (aspects.earthPower < 1 ? aspects.earthPower : 1))}
  const [isDiggingWorms, setDiggingWorms] = useState(_context.save.gathering.isDiggingWorms || false)
  const [wormProgress, setWormProgress] = useState(_context.save.gathering.wormProgress || 0)
  const [canCollectWorms, setCanCollectWorms] = useState(false);
  const [wormProgressPerTick, setWormProgressPerTick] = useState(GLOBALS.GATHERING.WORMDIG.SPEED * getWormSpeed())
  let wormProgressMax = GLOBALS.GATHERING.WORMDIG.TIME
  const [autoDiggingWormsUnlocked, setAutoDiggingWormsUnlocked] = useState(arrayWithObjectsHasFieldWithValue(pets, "id", GLOBALS.ENUMS.PETS.EARTHWORM_JIM))

  let getArtifactSpeed = function() {return (1 * (1 + (aspects.earthPower/10 < 9 ? aspects.earthPower/10 : 9)))}
  const [isArtifactsUnlocked, setArtifactsUnlocked] = useState(_context.save.gathering.isArtifactsUnlocked || false)
  const [isDiggingArtifacts, setDiggingArtifacts] = useState(_context.save.gathering.isDiggingArtifacts || false)
  const [artifactProgress, setArtifactProgress] = useState(_context.save.gathering.artifactProgress || 0)
  const [canCollectArtifacts, setCanCollectArtifacts] = useState(false)
  const [artifactProgressPerTick, setArtifactProgressPerTick] = useState(GLOBALS.GATHERING.ARTIFACTDIG.SPEED * getArtifactSpeed())
  let artifactProgressMax = GLOBALS.GATHERING.ARTIFACTDIG.TIME
  const [autoDiggingArtifactsUnlocked, setAutoDiggingArtifactsUnlocked] = useState(arrayWithObjectsHasFieldWithValue(pets, "id", GLOBALS.ENUMS.PETS.FLOPPY))

  let getMiningSpeed = function() {return (1)};
  const [isMiningUnlocked,] = useState(_context.save.gathering.isMiningUnlocked || false)
  const [isMining, setMining] = useState(_context.save.gathering.isMining || false)
  const [miningProgress, setMiningProgress] = useState(_context.save.gathering.miningProgress || 0)
  const [canCollectMining, setCanCollectMining] = useState(false)
  const [miningProgressPerTick, setMiningProgressPerTick] = useState(GLOBALS.GATHERING.ARTIFACTDIG.SPEED * getMiningSpeed())
  let miningProgressMax = GLOBALS.GATHERING.MINING.TIME
  const [autoMiningUnlocked, setAutoMiningUnlocked] = useState(arrayWithObjectsHasFieldWithValue(pets, "id", GLOBALS.ENUMS.PETS.LIL_GEODE))

  const handleModalOpen = (encounter) => {
    if (generateModalContent(GLOBALS.ENUMS.PAGES.GATHERING, encounter, _context) == true) {
      _context.refs.modal['setModalOpen'](true);
    }
  };

  const contextSave = () => {
    _allTimeStamps.current.gathering = Date.now();

    _context.setSave(
      {
        pageTimestamps: _allTimeStamps.current,
        resources: { ...resources },
        pets: pets,
        gathering: {
          isDiggingWorms: isDiggingWorms, wormProgress: wormProgress,
          isArtifactsUnlocked: isArtifactsUnlocked, isDiggingArtifacts: isDiggingArtifacts, artifactProgress: artifactProgress,
          isMiningUnlocked: isMiningUnlocked, isMining: isMining, miningProgress: miningProgress
        }
      }
    )
  }

  const startDiggingWorms = () => {
    setDiggingWorms(true)
    setWormProgressPerTick(1 * getWormSpeed());

    _context.refs.sidebar['addBadgeTimer'](4, wormProgressMax / getWormSpeed(), 500);
  }

  const getMinWorms = () => {return 1 + ~~(Math.sqrt(aspects.wormPower))}
  const getMaxWorms = () => {return getMinWorms() + 2 * (1 + Math.sqrt(aspects.wormPower / 10))}

  const collectWorms = () => {
    if (wormProgress >= wormProgressMax - 1) {
      let randomGain = 1 + ~~(Math.sqrt(aspects.wormPower) + Math.random() * 2 * (1 + Math.sqrt(aspects.wormPower / 10)));
      let newBait = resources.bait;
      newBait[GLOBALS.ENUMS.BAIT.WORMS] = newBait[GLOBALS.ENUMS.BAIT.WORMS] + randomGain || randomGain;
      setResources(r => ({...r, bait: newBait}));
      setDiggingWorms(false)
      setCanCollectWorms(false)
      setWormProgress(0)

      checkForEncounters(GLOBALS.ENUMS.PAGES.GATHERING, GLOBALS.ENUMS.GATHERINGTYPES.WORMS, _context, handleModalOpen)
      setAutoDiggingWormsUnlocked(arrayWithObjectsHasFieldWithValue(pets, "id", GLOBALS.ENUMS.PETS.EARTHWORM_JIM))

      _context.refs.toastmanager['fireToast']("info", "You collected " + randomGain + " Worms");

      if (resources.bait[GLOBALS.ENUMS.BAIT.WORMS] >= 15) { setArtifactsUnlocked(true) }

      if (_context.save.sidebar.unlocks[3] == false) {
        _context.refs.sidebar['modifySidebarUnlocks'](3, true);
      }
    }
  }

  const startDiggingArtifacts = () => {
    setDiggingArtifacts(true)
    setArtifactProgressPerTick(1 * getArtifactSpeed());

    _context.refs.sidebar['addBadgeTimer'](4, artifactProgressMax / getArtifactSpeed(), 500);
  }

  const getMinArtifacts = () => {return 1}
  const getMaxArtifacts = () => {return getMinArtifacts() + 2}

  const collectArtifacts = () => {
    if (artifactProgress >= artifactProgressMax - 1) {
      let randomGain = 1 + ~~(Math.random() * 2);
      setResources(r => ({ ...r, artifacts: r.artifacts + randomGain }));
      setDiggingArtifacts(false)
      setCanCollectArtifacts(false)
      setArtifactProgress(0)
      
      checkForEncounters(GLOBALS.ENUMS.PAGES.GATHERING, GLOBALS.ENUMS.GATHERINGTYPES.ARTIFACTS, _context, handleModalOpen)
      setAutoDiggingArtifactsUnlocked(arrayWithObjectsHasFieldWithValue(pets, "id", GLOBALS.ENUMS.PETS.FLOPPY))

      _context.refs.toastmanager['fireToast']("info", "You collected " + randomGain + " Artifacts");
    }
  }

  const startMining = () => {
    setMining(true)
    setMiningProgressPerTick(1 * getMiningSpeed());

    _context.refs.sidebar['addBadgeTimer'](4, GLOBALS.GATHERING.MINING.TIME / getMiningSpeed(), 500);
  }

  const getMinMining = () => {return 1}
  const getMaxMining = () => {return getMinMining()}

  const collectMining = () => {
    if (miningProgress >= miningProgressMax - 1) {
      setMining(false)
      setCanCollectMining(false)
      setMiningProgress(0)
      
      checkForEncounters(GLOBALS.ENUMS.PAGES.GATHERING, GLOBALS.ENUMS.GATHERINGTYPES.MINING, _context, handleModalOpen)
      setAutoMiningUnlocked(arrayWithObjectsHasFieldWithValue(pets, "id", GLOBALS.ENUMS.PETS.LIL_GEODE))

      _context.refs.toastmanager['fireToast']("info", "You collected " + 0 + " of anything, you hacker");
    }
  }

  const pageTick = () => {
    _context.refs.sidebar['clearBadgeDataFor'](4);
    
    let currentTime = Date.now();
    let deltaTime = currentTime - localTimestamp.current;

    if (ticksDone.current.isNaN) {ticksDone = 0;}

    // Fractional Ticks Version
    let ticksToDo = deltaTime / 500;
    localTimestamp.current = localTimestamp.current + deltaTime;
    updateTick(ticksToDo);

    ticksDone.current += ticksToDo;
  }

  const updateTick = (ticks) => {
    if (isDiggingWorms == true) {
      setWormProgress((old) => (old >= (wormProgressMax - 1) ? wormProgressMax : old + wormProgressPerTick * ticks));
      if (wormProgress >= wormProgressMax - 1) {
        setCanCollectWorms(true)
      }
    }

    if (isDiggingArtifacts == true) {
      setArtifactProgress((old) => (old >= (artifactProgressMax - 1) ? artifactProgressMax : old + artifactProgressPerTick * ticks));
      if (artifactProgress >= artifactProgressMax - 1) {
        setCanCollectArtifacts(true)
      }
    }

    if (isMining == true) {
      setMiningProgress((old) => (old >= (miningProgressMax - 1) ? miningProgressMax : old + miningProgressPerTick * ticks));
      if (miningProgress >= miningProgressMax - 1) {
        setCanCollectMining(true)
      }
    }
  }

  // Tick Interval for page loop
  useEffect(() => {
    let tickTimer = setInterval(pageTick, 500);
    
    return () => {
      clearInterval(tickTimer);
    };

  }, [wormProgress, artifactProgress, miningProgress, resources, isDiggingWorms, isDiggingArtifacts, isMining]);  // eslint-disable-line react-hooks/exhaustive-deps

  // unmount
  useEffect(() => () => {
    // contextSave(); // this breaks the save on exit? automation works now lol
  }, []);  

  // mount | Catch up the Ticks
  useEffect(() => {
    let _lastTimestamp = _allTimeStamps.current.gathering;
    let deltaTimeInMs = Date.now() - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs / 500);
    let cappedToMaxTicks = Math.min(7200, flooredToSec) // * aspect stuff * other stuff

    updateTick(cappedToMaxTicks);
    
    contextSave();
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // Save Variables to LS after tick
  useEffect(() => {
    contextSave();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.GATHERING} title="Gathering Zone" gridId="grid-gathering" contentClasses={'gathering'}>

      <ActionButton color="pets" fab sx={{bottom: '1rem', right: '1rem'}} func={() => {if (canCollectWorms) {collectWorms()} else if (!isDiggingWorms) {startDiggingWorms()}}} className={"show-mobile hide-tablet-up"} variant='contained' onlyIcon icon={<FontAwesomeIcon icon={"fa-solid fa-worm"} />}/>
      {isArtifactsUnlocked && <ActionButton color="archaeology" fab sx={{bottom: '1rem', right: 'calc(1rem + 70px) !important'}} func={() => {if (canCollectArtifacts) {collectArtifacts()} else if (!isDiggingArtifacts) {startDiggingArtifacts()}}} className={"show-mobile hide-tablet-up"} variant='contained' onlyIcon icon={<FontAwesomeIcon icon={"fa-solid fa-floppy-disk"} />}/>}

      <Grid mobile={12} tablet={6} desktop={4} maxHeight={{ mobile: 600, tablet: 800 }} overflow={"auto"}>
        <FlexList collapsible switchable headerText={"All Resources"} mode="list">
          <BaitCollection resources={resources}/>
          <FishCollection resources={resources}/>
          {isArtifactsUnlocked && (<ResourceCard icon={<FontAwesomeIcon icon={"fa-solid fa-floppy-disk"} />} iconcolor="hsl(60deg, 100%, 90%)" name="Artifacts" value={resources.artifacts} cap={0} perSec={0}></ResourceCard>)}
        </FlexList>

        <Grid className="hide-mobile show-tablet-up" container mobile={12} tablet={6} desktop={6} maxHeight={{ mobile: 200, tablet: 400 }} overflow={"auto"}>
          <Farm unlocked={true} farmWidth={3} farmHeight={2}/>
        </Grid>

      </Grid>

      <Grid container mobile={"auto"} tablet={6} desktop={8} maxHeight={{ mobile: 400, tablet: 600 }} overflow={"auto"} sx={{ flexGrow: '1' }} spacing={0.5}>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule autoSegments={1} autoSpeed={1} time={(GLOBALS.GATHERING.WORMDIG.TIME * 500) / wormProgressPerTick / 1000} minGain={getMinWorms()} maxGain={getMaxWorms()} isUnlocked={true} header="Worms" iconColor='#ffccff' progressColor='pets' icon={<FontAwesomeIcon icon={"fa-solid fa-worm"} />} isActive={isDiggingWorms} progress={wormProgress} progressMax={wormProgressMax} canCollect={canCollectWorms} autoUnlocked={autoDiggingWormsUnlocked} start={startDiggingWorms} collect={collectWorms} />
        </Grid>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule autoSegments={1} autoSpeed={1} time={(GLOBALS.GATHERING.ARTIFACTDIG.TIME * 500) / getArtifactSpeed() / 1000} minGain={getMinArtifacts()} maxGain={getMaxArtifacts()} isUnlocked={isArtifactsUnlocked} header="Artifacts" iconColor='hsl(60deg, 100%, 90%)' progressColor='archaeology' icon={<FontAwesomeIcon icon={"fa-solid fa-floppy-disk"} />} isActive={isDiggingArtifacts} progress={artifactProgress} progressMax={artifactProgressMax} canCollect={canCollectArtifacts} autoUnlocked={autoDiggingArtifactsUnlocked} start={startDiggingArtifacts} collect={collectArtifacts} />
        </Grid>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule autoSegments={1} autoSpeed={1} time={(GLOBALS.GATHERING.MINING.TIME * 500) / getMiningSpeed() / 1000} minGain={getMinMining()} maxGain={getMaxMining()} isUnlocked={isMiningUnlocked} header="Mining" iconColor='#8770ce' progressColor='mining' icon={<FontAwesomeIcon icon={"fa-solid fa-bore-hole"} />} isActive={isMining} progress={miningProgress} progressMax={miningProgressMax} canCollect={canCollectMining} autoUnlocked={autoMiningUnlocked} start={startMining} collect={collectMining} />
        </Grid>
      </Grid>

    </PageCore>
  )
}

export default PageGatheringZone;
