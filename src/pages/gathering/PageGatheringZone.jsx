// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';

// Components
import GridCell from '../../components/grid/GridCell';
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';
import ResourceCard from '../../components/ResourceCard';
import CircularProgressWithLabel from '../../components/progress/CircularProgressbarWithLabel';

// MUI
import { Box, CircularProgress, Paper } from '@mui/material';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoreHole, faFish, faFloppyDisk, faWorm } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Gathering.css'

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
  const autoDiggingWormsUnlocked = true;
  
  const [isArtifactsUnlocked, setArtifactsUnlocked] = useState(_context.save.gathering.isArtifactsUnlocked || false)
  const [isDiggingArtifacts, setDiggingArtifacts] = useState(_context.save.gathering.isDiggingArtifacts || false)
  const [artifactProgress, setArtifactProgress] = useState(_context.save.gathering.artifactProgress || 0)
  const [canCollectArtifacts, setCanCollectArtifacts] = useState(false)
  let artifactProgressPerTick = GLOBALS.GATHERING.ARTIFACTDIG.SPEED // 1 per tick
  let artifactProgressMax = GLOBALS.GATHERING.ARTIFACTDIG.TIME; // 1m30s
  const autoDiggingArtifactsUnlocked = false;
  
  const [isMiningUnlocked, ] = useState(_context.save.gathering.isMiningUnlocked || false)
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
        resources: {worms: worms, fish: fish, artifacts: artifacts}, 
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
    if (wormProgress >= wormProgressMax-1) {
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
    if (artifactProgress >= artifactProgressMax-1) {
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
    if (miningProgress >= miningProgressMax-1) {
      setMining(false)
      setCanCollectMining(false)
      setMiningProgress(0)
    }
  }

  const pageTick = () => {
    if (worms >= 15) {setArtifactsUnlocked(true)}

    if (isDiggingWorms == true) {
      setWormProgress((old) => (old >= (wormProgressMax-1) ? wormProgressMax : old + wormProgressPerTick));
      if (wormProgress >= wormProgressMax-1) {
        setCanCollectWorms(true)
      }
    }
    
    if (isDiggingArtifacts == true) {
      setArtifactProgress((old) => (old >= (artifactProgressMax-1) ? artifactProgressMax : old + artifactProgressPerTick));
      if (artifactProgress >= artifactProgressMax-1) {
        setCanCollectArtifacts(true)
      }
    }
    
    if (isMining == true) {
      setMiningProgress((old) => (old >= (miningProgressMax-1) ? miningProgressMax : old + miningProgressPerTick));
      if (miningProgress >= miningProgressMax-1) {
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
  useEffect( () => () => {
    contextSave();
  }, [] );
  
  // Save Variables to LS after tick
  useEffect(() => {
    contextSave();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  // mount | Catch up the Ticks
  useEffect(() => {
    let _lastTimestamp = _allTimeStamps.current.gathering;
    let deltaTimeInMs = Date.now() - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs/1000);
    console.log("last ts:",_lastTimestamp,"|current ts:",_allTimeStamps.current.gathering,"|delta:",deltaTimeInMs,"|ticks:",flooredToSec)

    for (let i = 0; i < flooredToSec; i++) {
      if (isDiggingWorms || isDiggingArtifacts || isMining) {
        pageTick();
      }
    }
  }, [])

  return (
    <PageCore title="Gathering Zone" gridId="grid-gathering" contentClasses={'gathering'}>
      <GridCell gridPosition='top-left'>

        <FlexList collapsible headerElement={<h4>{"Resources"}</h4>} mode="list" minHeight={128} maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCard icon={<FontAwesomeIcon icon={faFish} />} iconcolor="hsl(235deg, 100%, 90%)" name="Fish" value={fish} cap={0} perSec={0}></ResourceCard>
          {isArtifactsUnlocked && (<ResourceCard icon={<FontAwesomeIcon icon={faFloppyDisk} />} iconcolor="hsl(60deg, 100%, 90%)" name="Artifacts" value={artifacts} cap={0} perSec={0}></ResourceCard>)}
        </FlexList>

        <FlexList headerElement={<h4>{"Actions"}</h4>} mode="flex" minHeight={178} maxHeight={309} gap={8}>
          
          <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}>
            <h5>Worms</h5>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

              <Box sx={{zIndex: 101}}>
                <CircularProgressWithLabel fontSize='15px' icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="#ffccff" sx={{padding: "5px", color: '#ff99ff'}} color="pets" size={100} thickness={4} variant="determinate" value={wormProgress / wormProgressMax * 100} />
              </Box>

              {autoDiggingWormsUnlocked && (
              <Box sx={{zIndex: 100, position: 'absolute'}}>
                <CircularProgress sx={{padding: '0px'}} variant="indeterminate" color="pets" size={110} thickness={2} />
              </Box>
              )}
            </Box>

              <div className='action-button-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                <ActionButton disabled={(isDiggingWorms ? true : false)} color="pets" variant="contained" text='Start Digging' func={startDiggingWorms}></ActionButton>
                <ActionButton disabled={(!canCollectWorms ? true : false)} color="pets" variant="contained" text='Collect' func={collectWorms}></ActionButton>
              </div>
          </Paper>
          
          {isArtifactsUnlocked && (<Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}>
            <h5>Artifacts</h5>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

              <Box>
                <CircularProgressWithLabel fontSize='15px' icon={<FontAwesomeIcon icon={faFloppyDisk} />} iconcolor="hsl(60deg, 100%, 90%)" sx={{padding: "5px", color: 'hsl(60deg, 100%, 80%)'}} color="archaeology" size={100} thickness={4} variant="determinate" value={artifactProgress / artifactProgressMax * 100} />
              </Box>

              {autoDiggingArtifactsUnlocked && (
              <Box sx={{position: 'relative', top: '50%'}}>
                <CircularProgress sx={{padding: '4px'}} variant="indeterminate" color="archaeology" size={45} thickness={6} />
              </Box>
              )}

            </Box>

            <div className='action-button-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
              <ActionButton disabled={(isDiggingArtifacts ? true : false)} color="archaeology" variant="contained" text='Start Searching' func={startDiggingArtifacts}></ActionButton>
              <ActionButton disabled={(!canCollectArtifacts ? true : false)} color="archaeology" variant="contained" text='Collect' func={collectArtifacts}></ActionButton>
            </div>
          </Paper>)}{!isArtifactsUnlocked && (<Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)', minHeight: '107px'}}>teaser</Paper>)}
          
          {isMiningUnlocked && (<Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}>
            <h5>Mining</h5>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

              <Box>
                <CircularProgressWithLabel fontSize='15px' icon={<FontAwesomeIcon icon={faBoreHole} />} iconcolor="#8770ce" sx={{padding: "5px", color: '#5f40be'}} color="mining" size={100} thickness={4} variant="determinate" value={miningProgress / miningProgressMax * 100} />
              </Box>

              {autoMiningUnlocked && (
              <Box sx={{position: 'relative', top: '50%'}}>
                <CircularProgress sx={{padding: '4px'}} variant="indeterminate" color="mining" size={45} thickness={6} />
              </Box>
              )}

            </Box>
            
            <div className='action-button-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
              <ActionButton disabled={(isMining ? true : false)} color="mining" variant="contained" text='Start Mining' func={startMining}></ActionButton>
              <ActionButton disabled={(!canCollectMining ? true : false)} color="mining" variant="contained" text='Collect' func={collectMining}></ActionButton>
            </div>
          </Paper>)}{!isMiningUnlocked && (<Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)', minHeight: '107px'}}>more ??</Paper>)}
        
        </FlexList>
      </GridCell>
      <GridCell gridPosition='top-right'></GridCell>
      <GridCell gridPosition='right-side'></GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageGatheringZone;
