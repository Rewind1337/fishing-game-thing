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
import BasicModal from '../../components/modal/BasicModal';

// MUI 
import Grid from '@mui/material/Unstable_Grid2';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoreHole, faFloppyDisk, faWorm } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';
import aspectHook from '../../utility/aspectHook';
import FishCollection from '../inventory/FishCollection';

// CSS Styles
import './Gathering.scss'

// Route: "/gathering"
function PageGatheringZone() {

  const _context = useContext(SaveContext);
  let _allTimeStamps = useRef(_context.save.pageTimestamps);
  let localTimestamp = useRef(Date.now());
  let ticksDone = useRef(0);

  const [resources, setResources] = useState(resourceHook(_context));
  const [aspects, ] = useState(aspectHook(_context));

  const [isDiggingWorms, setDiggingWorms] = useState(_context.save.gathering.isDiggingWorms || false)
  const [wormProgress, setWormProgress] = useState(_context.save.gathering.wormProgress || 0)
  const [canCollectWorms, setCanCollectWorms] = useState(false);

  let getWormSpeed = function() {return (1 + aspects.wormPower < 5 ? 1 + aspects.wormPower : 5);};
  
  const [wormProgressPerTick, setWormProgressPerTick] = useState(GLOBALS.GATHERING.WORMDIG.SPEED * getWormSpeed()) // 1 per tick
  let wormProgressMax = GLOBALS.GATHERING.WORMDIG.TIME; // 15s
  const autoDiggingWormsUnlocked = false;

  const [isArtifactsUnlocked, setArtifactsUnlocked] = useState(_context.save.gathering.isArtifactsUnlocked || false)
  const [isDiggingArtifacts, setDiggingArtifacts] = useState(_context.save.gathering.isDiggingArtifacts || false)
  const [artifactProgress, setArtifactProgress] = useState(_context.save.gathering.artifactProgress || 0)
  const [canCollectArtifacts, setCanCollectArtifacts] = useState(false)
  let artifactProgressPerTick = GLOBALS.GATHERING.ARTIFACTDIG.SPEED // 1 per tick
  let artifactProgressMax = GLOBALS.GATHERING.ARTIFACTDIG.TIME; // 1m30s
  const autoDiggingArtifactsUnlocked = false;

  const [isMiningUnlocked,] = useState(_context.save.gathering.isMiningUnlocked || false)
  const [isMining, setMining] = useState(_context.save.gathering.isMining || false)
  const [miningProgress, setMiningProgress] = useState(_context.save.gathering.miningProgress || 0)
  const [canCollectMining, setCanCollectMining] = useState(false)
  let miningProgressPerTick = GLOBALS.GATHERING.MINING.SPEED // 1 per tick
  let miningProgressMax = GLOBALS.GATHERING.MINING.TIME; // 12min
  const autoMiningUnlocked = false;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIcon, setModalIcon] = useState(<FontAwesomeIcon icon={faWorm} />);
  const [modalText, setModalText] = useState("This is the default value, please enjoy this value while it is on screen, as it may not live very long This is the default value, please enjoy this value while it is on screen, as it may not live very long This is the default value, please enjoy this value while it is on screen, as it may not live very long This is the default value, please enjoy this value while it is on screen, as it may not live very long");
  const [modalHeader, setModalHeader] = useState("Cool header hehe");

  const generateModalContent = () => {
    setModalIcon(modalIcon);
    setModalText(modalText);
    setModalHeader(modalHeader);
  }

  const handleModalOpen = () => {
    generateModalContent();
    setModalOpen(true);
  };

  const handleModalClose = (value, reason) => {// eslint-disable-line no-unused-vars
    if (reason && reason == "backdropClick" || reason == 'escapeKeyDown') { return }
    if (value.value == 'close') { setModalOpen(false) }
  };

  const contextSave = () => {
    _allTimeStamps.current.gathering = Date.now();

    _context.setSave(
      {
        pageTimestamps: _allTimeStamps.current,
        resources: { ...resources },
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
    let wormSpeed = getWormSpeed();
    setWormProgressPerTick(1 * wormSpeed);

    _context.refs.sidebar['addBadgeTimer'](4, wormProgressMax / wormSpeed, 500);
  }

  const collectWorms = () => {
    if (wormProgress >= wormProgressMax - 1) {
      let randomGain = 1 + ~~(Math.sqrt(aspects.wormPower) + Math.random() * 2 * (1 + Math.sqrt(aspects.wormPower / 10)));
      setResources(r => ({...r, worms: r.worms + randomGain}));
      setDiggingWorms(false)
      setCanCollectWorms(false)
      setWormProgress(0)

      _context.refs.toastmanager['fireToast']("info", "You collected " + randomGain + " Worms");

      let r = ~~(Math.random() * 100)
      if (r == 0) {
        handleModalOpen();
      }

      if (resources.worms >= 15) { setArtifactsUnlocked(true) }

      if (_context.save.sidebar.unlocks[3] == false) {
        let modifiedUnlocks = _context.save.sidebar.unlocks.slice();
        modifiedUnlocks[3] = true;
        _context.refs.sidebar['setSidebarUnlocks'](modifiedUnlocks);
      }
    }
  }

  const startDiggingArtifacts = () => {
    setDiggingArtifacts(true)

    _context.refs.sidebar['addBadgeTimer'](4, GLOBALS.GATHERING.ARTIFACTDIG.TIME, 500);
  }

  const collectArtifacts = () => {
    if (artifactProgress >= artifactProgressMax - 1) {
      let randomGain = 1 + ~~(Math.random() * 2);
      setResources(r => ({ ...r, artifacts: r.artifacts + randomGain }));
      setDiggingArtifacts(false)
      setCanCollectArtifacts(false)
      setArtifactProgress(0)

      _context.refs.toastmanager['fireToast']("info", "You collected " + randomGain + " Artifacts");
    }
  }

  const startMining = () => {
    setMining(true)

    _context.refs.sidebar['addBadgeTimer'](4, GLOBALS.GATHERING.MINING.TIME, 500);
  }

  const collectMining = () => {
    if (miningProgress >= miningProgressMax - 1) {
      setMining(false)
      setCanCollectMining(false)
      setMiningProgress(0)

      _context.refs.toastmanager['fireToast']("info", "You collected " + 0 + " of anything, you hacker");
    }
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
  }, [])

  // Save Variables to LS after tick
  useEffect(() => {
    contextSave();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.GATHERING} title="Gathering Zone" gridId="grid-gathering" contentClasses={'gathering'}>

      <BasicModal header={modalHeader} icon={modalIcon} text={modalText} open={modalOpen} onClose={handleModalClose} />

      <Grid mobile={12} tablet={6} desktop={4} maxHeight={{ mobile: 600, tablet: 800 }} overflow={"auto"}>
        <FlexList collapsible switchable headerText={"All Resources"} mode="list">
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={resources.worms} cap={0} perSec={0}></ResourceCard>
          <FishCollection resources={resources}/>
          {isArtifactsUnlocked && (<ResourceCard icon={<FontAwesomeIcon icon={faFloppyDisk} />} iconcolor="hsl(60deg, 100%, 90%)" name="Artifacts" value={resources.artifacts} cap={0} perSec={0}></ResourceCard>)}
        </FlexList>

        <Grid className="hide-mobile show-tablet-up" container mobile={12} tablet={6} desktop={6} maxHeight={{ mobile: 200, tablet: 400 }} overflow={"auto"}>
          {/* Farm would go here*/}
        </Grid>

      </Grid>

      <Grid container mobile={"auto"} tablet={6} desktop={8} maxHeight={{ mobile: 400, tablet: 600 }} overflow={"auto"} sx={{ flexGrow: '1' }} spacing={0.5}>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule autoSegments={1} autoSpeed={1} isUnlocked={true} header="Worms" iconColor='#ffccff' progressColor='pets' icon={<FontAwesomeIcon icon={faWorm} />} isActive={isDiggingWorms} progress={wormProgress} progressMax={wormProgressMax} canCollect={canCollectWorms} autoUnlocked={autoDiggingWormsUnlocked} start={startDiggingWorms} collect={collectWorms} />
        </Grid>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule autoSegments={1} autoSpeed={1} isUnlocked={isArtifactsUnlocked} header="Artifacts" iconColor='hsl(60deg, 100%, 90%)' progressColor='archaeology' icon={<FontAwesomeIcon icon={faFloppyDisk} />} isActive={isDiggingArtifacts} progress={artifactProgress} progressMax={artifactProgressMax} canCollect={canCollectArtifacts} autoUnlocked={autoDiggingArtifactsUnlocked} start={startDiggingArtifacts} collect={collectArtifacts} />
        </Grid>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule autoSegments={1} autoSpeed={1} isUnlocked={isMiningUnlocked} header="Mining" iconColor='#8770ce' progressColor='mining' icon={<FontAwesomeIcon icon={faBoreHole} />} isActive={isMining} progress={miningProgress} progressMax={miningProgressMax} canCollect={canCollectMining} autoUnlocked={autoMiningUnlocked} start={startMining} collect={collectMining} />
        </Grid>
      </Grid>

    </PageCore>
  )
}

export default PageGatheringZone;
