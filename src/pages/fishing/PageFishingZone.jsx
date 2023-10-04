import { useContext, useState, useEffect } from 'react';

import SaveContext from '../../context/SaveContext';
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
  
  const [fish, setFish] = useState(_context.save.resources.fish || 0)
  const [worms, setWorms] = useState(_context.save.resources.worms || 0)
  const [isFishing, setFishing] = useState(_context.save.fishing.isFishing || false)
  
  const [fishProgress, setFishProgress] = useState(_context.save.fishing.fishProgress || false)
  const [tickRange, setTickRange] = useState(_context.save.fishing.tickRange || {min: -1, max: -1})
  let fishProgressPerTick = 1
  let fishProgressMax = 60

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
      setFishProgress((old) => (old >= (fishProgressMax-1) ? 0 : old + fishProgressPerTick));
    }
  }

  useEffect(() => {
    const timer = setInterval(pageTick, 800);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worms, fish, isFishing, fishProgress, tickRange]);

  useEffect(() => {
    _context.setSave({resources: {worms: worms, fish: fish}, fishing: {isFishing: isFishing, fishProgress: fishProgress, tickRange: tickRange}})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTick])

  return (
    <PageCore title="Fishing Zone" gridId="grid-fishing" contentClasses={'fishing'}>
      <GridCell gridPosition='top-left'>
        <FlexList mode="list" maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCard icon={<FontAwesomeIcon icon={faFish} />} name="Fish" value={fish} cap={0} perSec={0}></ResourceCard>
        </FlexList>
      </GridCell>
      <GridCell gridPosition='top-middle'>
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
