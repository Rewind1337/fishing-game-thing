// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';

// Components
import GridCell from '../../components/grid/GridCell';
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import ResourceCard from '../../components/resources/ResourceCard';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoreHole, faFish, faFloppyDisk, faWorm } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Gathering.css'
import ResourceCollectionCard from '../../components/resources/ResourceCollectionCard';
import GatheringModule from './GatheringModule';

// Route: "/gathering"
function PageGatheringZone() {

  const _context = useContext(SaveContext)
  let _allTimeStamps = useRef(_context.save.pageTimestamps)
  console.log(_context.save.pageTimestamps)

  const [fish, setFish] = useState(_context.save.resources.fish || 0)  // eslint-disable-line no-unused-vars
  const [worms, setWorms] = useState(_context.save.resources.worms || 0)
  const [artifacts, setArtifacts] = useState(_context.save.resources.artifacts || 0)

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

  const contextSave = () => {
    _allTimeStamps.current.gathering = Date.now();

    _context.setSave(
      {
        pageTimestamps: _allTimeStamps.current,
        resources: { worms: worms, fish: fish, artifacts: artifacts },
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
  }

  const collectWorms = () => {
    if (wormProgress >= wormProgressMax - 1) {
      setWorms(worms + 1 + ~~(Math.random() * 3))
      setDiggingWorms(false)
      setCanCollectWorms(false)
      setWormProgress(0)
    }
  }

  const startDiggingArtifacts = () => {
    setDiggingArtifacts(true)
  }

  const collectArtifacts = () => {
    if (artifactProgress >= artifactProgressMax - 1) {
      setArtifacts(artifacts + 1 + ~~(Math.random() * 2))
      setDiggingArtifacts(false)
      setCanCollectArtifacts(false)
      setArtifactProgress(0)
    }
  }

  const startMining = () => {
    setMining(true)
  }

  const collectMining = () => {
    if (miningProgress >= miningProgressMax - 1) {
      setMining(false)
      setCanCollectMining(false)
      setMiningProgress(0)
    }
  }

  const pageTick = () => {
    if (worms >= 15) { setArtifactsUnlocked(true) }

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
    const timer = setInterval(pageTick, 500);

    return () => {
      clearInterval(timer);
    };

  }, [wormProgress, artifactProgress, miningProgress, worms, artifacts, isDiggingWorms, isDiggingArtifacts, isMining]);  // eslint-disable-line react-hooks/exhaustive-deps

  // unmount | make sure its saved
  useEffect(() => () => {
    contextSave();
  }, []);

  // Save Variables to LS after tick
  useEffect(() => {
    contextSave();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  // mount | Catch up the Ticks
  useEffect(() => {
    let _lastTimestamp = _allTimeStamps.current.gathering;
    let deltaTimeInMs = Date.now() - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs / 1000);
    console.log("last ts:", _lastTimestamp, "|current ts:", _allTimeStamps.current.gathering, "|delta:", deltaTimeInMs, "|ticks:", flooredToSec)

    for (let i = 0; i < flooredToSec; i++) {
      if (isDiggingWorms || isDiggingArtifacts || isMining) {
        pageTick();
      }
    }
  }, [])

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
    <PageCore title="Gathering Zone" gridId="grid-gathering" contentClasses={'gathering'}>
      <GridCell gridPosition='left'>

        <FlexList collapsible headerElement={<h4>{"All Resources"}</h4>} mode="list" minHeight={128} maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCollectionCard collection={fishCollection} name={'Fishy Stuff'} icon={<FontAwesomeIcon icon={faFish} />} iconcolor={"hsl(235deg, 100%, 90%)"} />
          {isArtifactsUnlocked && (<ResourceCard icon={<FontAwesomeIcon icon={faFloppyDisk} />} iconcolor="hsl(60deg, 100%, 90%)" name="Artifacts" value={artifacts} cap={0} perSec={0}></ResourceCard>)}
        </FlexList>

        <FlexList headerElement={<h4>{"Actions"}</h4>} mode="flex" gap={8}>

          <GatheringModule isUnlocked={true} header="Worms" iconColor='#ffccff' progressColor='pets' icon={<FontAwesomeIcon icon={faWorm}/>} isActive={isDiggingWorms} progress={wormProgress} progressMax={wormProgressMax} canCollect={canCollectWorms} autoUnlocked={autoDiggingWormsUnlocked} start={startDiggingWorms} collect={collectWorms}/>
          
          <GatheringModule isUnlocked={isArtifactsUnlocked}  header="Artifacts" iconColor='hsl(60deg, 100%, 90%)' progressColor='archaeology' icon={<FontAwesomeIcon icon={faFloppyDisk}/>} isActive={isDiggingArtifacts} progress={artifactProgress} progressMax={artifactProgressMax} canCollect={canCollectArtifacts} autoUnlocked={autoDiggingArtifactsUnlocked} start={startDiggingArtifacts} collect={collectArtifacts}/>
          
          <GatheringModule isUnlocked={isMiningUnlocked}  header="Mining" iconColor='#8770ce' progressColor='mining' icon={<FontAwesomeIcon icon={faBoreHole}/>} isActive={isMining} progress={miningProgress} progressMax={miningProgressMax} canCollect={canCollectMining} autoUnlocked={autoMiningUnlocked} start={startMining} collect={collectMining}/>
          
        </FlexList>
      </GridCell>
      <GridCell gridPosition='center'></GridCell>
      <GridCell gridPosition='right'></GridCell>
    </PageCore>
  )
}

export default PageGatheringZone;
