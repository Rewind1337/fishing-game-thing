import { useContext, useState, useEffect, useRef } from 'react';

import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';

import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';
import ResourceCard from '../../components/ResourceCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faWorm } from '@fortawesome/free-solid-svg-icons';

import LinearProgress from '@mui/material/LinearProgress';

function PageFishingZone() {

  const _context = useContext(SaveContext)
  let _currentTimestamp = useRef(_context.save.pageTimestamps.gathering || Date.now())
  
  const [fish, setFish] = useState(_context.save.resources.fish || 0)
  const [worms, setWorms] = useState(_context.save.resources.worms || 0)
  const [artifacts, setArtifacts] = useState(_context.save.resources.artifacts || 0)  // eslint-disable-line no-unused-vars

  const [isFishing, setFishing] = useState(_context.save.fishing.isFishing || false)
  const [fishProgress, setFishProgress] = useState(_context.save.fishing.fishProgress || false)
  const [tickRange, setTickRange] = useState(_context.save.fishing.tickRange || {min: -1, max: -1})
  let fishProgressMax = GLOBALS.FISHING.TIME

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
    pageTick()
  }, [])

  useEffect(() => {
    const timer = setInterval(pageTick, 500);

    return () => {
      clearInterval(timer);
    };

  }, [worms, fish, isFishing, fishProgress, tickRange]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    _context.setSave({pageTimestamps: {fishing: _currentTimestamp.current},resources: {worms: worms, fish: fish, artifacts: artifacts}, fishing: {isFishing: isFishing, fishProgress: fishProgress, tickRange: tickRange}})
    _currentTimestamp.current = Date.now();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  // Catch up the Ticks
  useEffect(() => {
    let _lastTimestamp = _context.save.pageTimestamps.fishing;
    let deltaTimeInMs = _currentTimestamp.current - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs/1000);

    for (let i = 0; i < flooredToSec; i++) {
      if (isFishing) {
        pageTick();
      }
    }
  })

  return (
    <PageCore title="Fishing Zone" gridId="grid-fishing" contentClasses={'fishing'}>
      <GridCell gridPosition='top-left'>
        <FlexList headerText="Resources" mode="list" maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconColor="hsl(300deg, 100%, 90%)" name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCard icon={<FontAwesomeIcon icon={faFish} />} iconColor="hsl(235deg, 100%, 90%)" name="Fish" value={fish} cap={0} perSec={0}></ResourceCard>
        </FlexList>
      </GridCell>
      <GridCell gridPosition='top-middle' noFlexOverride>
        <LinearProgress variant="determinate" color={fishProgress >= tickRange.min && fishProgress <= tickRange.max ? 'gathering' : 'fishing'} sx={{height: "100%", margin: "0 auto"}} value={(fishProgress / fishProgressMax) * 100} />
      </GridCell>
      <GridCell gridPosition='top-right'></GridCell>
      <GridCell gridPosition='center'>
        <ActionButton disabled={(isFishing ? true : false)} color="fishing" variant="contained" text='Throw out your Fishing Rod BOI' func={startFishing}/><br/>
        <ActionButton disabled={(!isFishing ? true : false)} color="fishing" variant="contained" text='Attempt to reel it in' func={() => {attemptCatch()}}/>
      </GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-middle'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageFishingZone;
