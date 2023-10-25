// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';
import PropTypes from 'prop-types';

// Components
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import ResourceCard from '../../components/resources/ResourceCard';
import ResourceCollectionCard from '../../components/resources/ResourceCollectionCard';
import GatheringModule from './GatheringModule';
import BasicModal from '../../components/modal/BasicModal';
import Unicode from '../../components/Unicode'

// MUI 
import Grid from '@mui/material/Unstable_Grid2';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoreHole, faFish, faFloppyDisk, faWorm } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';

// CSS Styles
import './Gathering.scss'
import { Paper } from '@mui/material';

// Route: "/gathering"
function PageGatheringZone() {

  const _context = useContext(SaveContext)
  let _allTimeStamps = useRef(_context.save.pageTimestamps)

  const [resources, setResources] = useState(resourceHook(_context))

  const [isDiggingWorms, setDiggingWorms] = useState(_context.save.gathering.isDiggingWorms || false)
  const [wormProgress, setWormProgress] = useState(_context.save.gathering.wormProgress || 0)
  const [canCollectWorms, setCanCollectWorms] = useState(false);
  let wormProgressPerTick = GLOBALS.GATHERING.WORMDIG.SPEED // 1 per tick
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

    _context.refs.sidebar['addBadgeTimer'](4, GLOBALS.GATHERING.WORMDIG.TIME, 500);
  }

  const collectWorms = () => {
    if (wormProgress >= wormProgressMax - 1) {
      let randomGain = 1 + ~~(Math.random() * 3);
      setResources(r => ({ ...r, worms: r.worms + randomGain }));
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
        let modifiedUnlocks = _context.save.sidebar.unlocks;
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
    if (isDiggingWorms == true) {
      setWormProgress((old) => (old >= (wormProgressMax - 1) ? wormProgressMax : old + wormProgressPerTick));
      if (wormProgress >= wormProgressMax - 1) {
        setCanCollectWorms(true)
      }
    }

    if (isDiggingArtifacts == true) {
      setArtifactProgress((old) => (old >= (artifactProgressMax - 1) ? artifactProgressMax : old + artifactProgressPerTick));
      if (artifactProgress >= artifactProgressMax - 1) {
        setCanCollectArtifacts(true)
      }
    }

    if (isMining == true) {
      setMiningProgress((old) => (old >= (miningProgressMax - 1) ? miningProgressMax : old + miningProgressPerTick));
      if (miningProgress >= miningProgressMax - 1) {
        setCanCollectMining(true)
      }
    }
  }

  // Tick Interval for page loop
  useEffect(() => {
    _context.refs.sidebar['clearBadgeDataFor'](4);
    const timer = setInterval(pageTick, 500);
    return () => {
      clearInterval(timer);
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

    for (let i = 0; i < cappedToMaxTicks; i++) {
      if (isDiggingWorms || isDiggingArtifacts || isMining) {
        pageTick();
      }
    }

    contextSave();
    _context.refs.sidebar['clearBadgeDataFor'](4);
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


  function SeedCard({ c }) {
    return (
      <Paper title={c} className='seed-card' elevation={1} sx={{ border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '4px', display: 'grid', alignItems: 'center' }}>
        <Unicode c={c} color="pink"></Unicode>
      </Paper>);
  }

  SeedCard.propTypes = {
    c: PropTypes.string
  }

  function FarmCell({row, col}) {
    return (<div className='farm-cell'>
      {row} : {col}
    </div>);
  }
  
  FarmCell.propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
  }

  function FarmGrid({width, height}) {
    let grid = [];
    let n = 0;

    for (let i = 0; i < height; i++) {
      grid.push([])
      for (let j = 0; j < width; j++, n++) {
        grid[i].push(n)
      }
    }

    console.log(grid);

    return (
      <Grid container mobile={12}>

        {grid.map((el, row) => {
          return (
            <Grid container key={row} mobile={12} height={250 / height}>
              {grid[row].map((el, col) => {
                return (
                  <Grid container key={col} mobile={"auto"} flexGrow={1} justifyContent={"center"}>
                    <FarmCell row={row} col={col}/>
                  </Grid>
              )})}
            </Grid>
        )})}
      </Grid>
    );
  }

  FarmGrid.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }


  const farm = (<>
    <Grid mobile={12} width={"100%"} paddingLeft={0} marginTop={1}>
      <Paper elevation={1} sx={{ width: "100%", border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px' }}>
        <FlexList mode='compact' collapsible headerText='Seeds'>
          <SeedCard c="A" />
          <SeedCard c="B" />
          <SeedCard c="C" />
          <SeedCard c="D" />
        </FlexList>
      </Paper>
    </Grid>

    <Grid mobile={12} width={"100%"} paddingLeft={0}>
      <Paper elevation={1} sx={{ border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
        <FarmGrid width={2} height={2}></FarmGrid>
      </Paper>
    </Grid>
  </>)

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.GATHERING} title="Gathering Zone" gridId="grid-gathering" contentClasses={'gathering'}>

      <BasicModal header={modalHeader} icon={modalIcon} text={modalText} open={modalOpen} onClose={handleModalClose} />

      <Grid mobile={12} tablet={6} desktop={4} maxHeight={{ mobile: 600, tablet: 800 }} overflow={"auto"}>
        <FlexList collapsible headerText={"All Resources"} mode="list">
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={resources.worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCollectionCard collection={fishCollection} name={'All Fish'} icon={<FontAwesomeIcon icon={faFish} />} iconcolor={"hsl(235deg, 100%, 90%)"} />
          {isArtifactsUnlocked && (<ResourceCard icon={<FontAwesomeIcon icon={faFloppyDisk} />} iconcolor="hsl(60deg, 100%, 90%)" name="Artifacts" value={resources.artifacts} cap={0} perSec={0}></ResourceCard>)}
        </FlexList>

        <Grid className="hide-mobile show-tablet-up" container mobile={12} tablet={6} desktop={6} maxHeight={{ mobile: 200, tablet: 400 }} overflow={"auto"}>
          {farm}
        </Grid>

      </Grid>

      <Grid container mobile={"auto"} tablet={6} desktop={8} maxHeight={{ mobile: 400, tablet: 600 }} overflow={"auto"} sx={{ flexGrow: '1' }} spacing={0.5}>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule autoSegments={3} autoSpeed={1} isUnlocked={true} header="Worms" iconColor='#ffccff' progressColor='pets' icon={<FontAwesomeIcon icon={faWorm} />} isActive={isDiggingWorms} progress={wormProgress} progressMax={wormProgressMax} canCollect={canCollectWorms} autoUnlocked={autoDiggingWormsUnlocked} start={startDiggingWorms} collect={collectWorms} />
        </Grid>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule isUnlocked={isArtifactsUnlocked} header="Artifacts" iconColor='hsl(60deg, 100%, 90%)' progressColor='archaeology' icon={<FontAwesomeIcon icon={faFloppyDisk} />} isActive={isDiggingArtifacts} progress={artifactProgress} progressMax={artifactProgressMax} canCollect={canCollectArtifacts} autoUnlocked={autoDiggingArtifactsUnlocked} start={startDiggingArtifacts} collect={collectArtifacts} />
        </Grid>
        <Grid mobile={6} tablet={12} desktop={6} widescreen={4} sx={{ flexGrow: '1' }}>
          <GatheringModule isUnlocked={isMiningUnlocked} header="Mining" iconColor='#8770ce' progressColor='mining' icon={<FontAwesomeIcon icon={faBoreHole} />} isActive={isMining} progress={miningProgress} progressMax={miningProgressMax} canCollect={canCollectMining} autoUnlocked={autoMiningUnlocked} start={startMining} collect={collectMining} />
        </Grid>
      </Grid>

    </PageCore>
  )
}

export default PageGatheringZone;
