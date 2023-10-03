import { useContext, useState, useEffect } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';
import ActionButton from '../../components/ActionButton';

import CircularProgress from '@mui/material/CircularProgress';

function PageGatheringZone() {

  const _context = useContext(SaveContext);

  const [worms, setWorms] = useState(_context.save.resources.worms || 0);
  const [isDigging, setDigging] = useState(_context.save.gathering.isDigging || false);

  const [wormProgress, setWormProgress] = useState(_context.save.gathering.wormProgress || false);
  let wormProgressPerTick = 1;
  let wormProgressMax = 10;

  const pageTick = () => {
    if (isDigging == true) {
      if (wormProgress >= wormProgressMax-1) {
        setWorms(worms + 1)
        setDigging(false)
      }
      setWormProgress((old) => (old >= (wormProgressMax-1) ? 0 : old + wormProgressPerTick));
    }
  }

  useEffect(() => {
    const timer = setInterval(pageTick, 800);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wormProgress, worms, isDigging]);

  useEffect(() => {
    _context.setSave({resources: {worms: worms}, gathering: {isDigging: isDigging, wormProgress: wormProgress}})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTick])

  return (
    <PageCore title="Gathering Zone" gridId="grid-gathering" contentClasses={'gathering'}>
      <GridCell gridPosition='top-left'>
        <span>worms: {worms} percentage: {wormProgress / wormProgressMax * 100}</span><br/>
        <CircularProgress color="gathering" thickness={8} variant="determinate" value={wormProgress / wormProgressMax * 100} /><br/>
        <ActionButton disabled={(isDigging ? true : false)} color="gathering" variant="contained" text='Look for Worms' func={() => {setDigging(true)}}></ActionButton>
      </GridCell>
      <GridCell gridPosition='top-right'></GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageGatheringZone;
