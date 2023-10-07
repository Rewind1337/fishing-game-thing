import { useContext, useState, useEffect, useRef } from 'react';

import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';

import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';

import CircularProgress from '@mui/material/CircularProgress';  // eslint-disable-line no-unused-vars
import CircularProgressWithLabel from '../../components/progress/CircularProgressbarWithLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faFloppyDisk, faWorm } from '@fortawesome/free-solid-svg-icons';
import { Paper } from '@mui/material';
import ResourceCard from '../../components/ResourceCard';

function PageGatheringZone() {

  const _context = useContext(SaveContext)
  let _currentTimestamp = useRef(_context.save.pageTimestamps.gathering || Date.now())

  const [fish, setFish] = useState(_context.save.resources.fish || 0)  // eslint-disable-line no-unused-vars
  const [worms, setWorms] = useState(_context.save.resources.worms || 0)
  const [artifacts, setArtifacts] = useState(_context.save.resources.artifacts || 0)

  const [isDiggingWorms, setDiggingWorms] = useState(_context.save.gathering.isDiggingWorms || false)
  const [wormProgress, setWormProgress] = useState(_context.save.gathering.wormProgress || 0)
  const [canCollectWorms, setCanCollectWorms] = useState(false);
  let wormProgressPerTick = GLOBALS.GATHERING.WORMDIGGING.SPEED // 1 per tick
  let wormProgressMax = GLOBALS.GATHERING.WORMDIGGING.TIME; // 15s
  
  const [isArtifactsUnlocked, setArtifactsUnlocked] = useState(_context.save.gathering.isArtifactsUnlocked || false)
  const [isDiggingArtifacts, setDiggingArtifacts] = useState(_context.save.gathering.isDiggingArtifacts || false)
  const [artifactProgress, setArtifactProgress] = useState(_context.save.gathering.artifactProgress || 0)
  const [canCollectArtifacts, setCanCollectArtifacts] = useState(false)
  let artifactProgressPerTick = GLOBALS.GATHERING.ARTIFACTDIGGING.SPEED // 1 per tick
  let artifactProgressMax = GLOBALS.GATHERING.ARTIFACTDIGGING.TIME; // 100s

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
  }

  useEffect(() => {
    pageTick()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // Tick Interval for page loop
  useEffect(() => {
    const timer = setInterval(pageTick, 500);

    return () => {
      clearInterval(timer);
    };

  }, [wormProgress, artifactProgress, worms, artifacts, isDiggingWorms, isDiggingArtifacts]);  // eslint-disable-line react-hooks/exhaustive-deps

  // Save Variables to LS after tick
  useEffect(() => {
    _context.setSave(
      {
        pageTimestamps: {gathering: _currentTimestamp.current}, 
        resources: {worms: worms, fish: fish, artifacts: artifacts}, 
        gathering: {isDiggingWorms: isDiggingWorms, wormProgress: wormProgress, isArtifactsUnlocked: isArtifactsUnlocked, isDiggingArtifacts: isDiggingArtifacts, artifactProgress: artifactProgress}
      })

    _currentTimestamp.current = Date.now();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  // Catch up the Ticks
  useEffect(() => {
    let _lastTimestamp = _context.save.pageTimestamps.gathering;
    let deltaTimeInMs = _currentTimestamp.current - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs/1000);

    for (let i = 0; i < flooredToSec; i++) {
      if (isDiggingWorms || isDiggingArtifacts) {
        pageTick();
      }
    }
  })

  return (
    <PageCore title="Gathering Zone" gridId="grid-gathering" contentClasses={'gathering'}>
      <GridCell gridPosition='top-left'>

        <FlexList headerText="Resources" mode="list" minHeight={128} maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconColor="hsl(300deg, 100%, 90%)" name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCard icon={<FontAwesomeIcon icon={faFish} />} iconColor="hsl(235deg, 100%, 90%)" name="Fish" value={fish} cap={0} perSec={0}></ResourceCard>
          {isArtifactsUnlocked && (<ResourceCard icon={<FontAwesomeIcon icon={faFloppyDisk} />} iconColor="hsl(60deg, 100%, 90%)" name="Artifacts" value={artifacts} cap={0} perSec={0}></ResourceCard>)}
        </FlexList>

        <FlexList headerText="Actions" mode="flex" minHeight={178} maxHeight={309} gap={8}>
          
          <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}>
            <h5>Worms</h5>
            <CircularProgressWithLabel icon={<FontAwesomeIcon icon={faWorm} />} iconColor="hsl(300deg, 100%, 90%)" sx={{padding: "5px", color: 'hsl(300deg, 100%, 80%)'}} color="gathering" size={100} thickness={4} variant="determinate" value={wormProgress / wormProgressMax * 100} />
            <div className='action-button-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
              <ActionButton disabled={(isDiggingWorms ? true : false)} color="gathering" variant="contained" text='Start Digging' func={startDiggingWorms}></ActionButton>
              <ActionButton disabled={(!canCollectWorms ? true : false)} color="gathering" variant="contained" text='Collect' func={collectWorms}></ActionButton>
            </div>
          </Paper>
          
          {isArtifactsUnlocked && (<Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}>
            <h5>Artifacts</h5>
            <CircularProgressWithLabel icon={<FontAwesomeIcon icon={faFloppyDisk} />} iconColor="hsl(60deg, 100%, 90%)" sx={{padding: "5px", color: 'hsl(60deg, 100%, 80%)'}} color="archaeology" size={100} thickness={4} variant="determinate" value={artifactProgress / artifactProgressMax * 100} />
            <div className='action-button-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
              <ActionButton disabled={(isDiggingArtifacts ? true : false)} color="archaeology" variant="contained" text='Start Digging' func={startDiggingArtifacts}></ActionButton>
              <ActionButton disabled={(!canCollectArtifacts ? true : false)} color="archaeology" variant="contained" text='Collect' func={collectArtifacts}></ActionButton>
            </div>
          </Paper>)}{!isArtifactsUnlocked && (<Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}></Paper>)}
        
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
