import { useContext, useState, useEffect } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';

import CircularProgress from '@mui/material/CircularProgress';
import ResourceCard from '../../components/ResourceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWorm } from '@fortawesome/free-solid-svg-icons';

function PageGatheringZone() {

  const _context = useContext(SaveContext);

  // eslint-disable-next-line no-unused-vars
  const [fish, setFish] = useState(_context.save.resources.fish || 0);
  const [worms, setWorms] = useState(_context.save.resources.worms || 0);
  const [isDigging, setDigging] = useState(_context.save.gathering.isDigging || false);

  const [wormProgress, setWormProgress] = useState(_context.save.gathering.wormProgress || false);
  const [canCollectWorms, setCanCollectWorms] = useState(false);
  let wormProgressPerTick = 1;
  let wormProgressMax = 30;

  const startDigging = () => {
    setDigging(true)
  }

  const collectWorms = () => {
    if (wormProgress >= wormProgressMax-1) {
      setWorms(worms + 1)
      setDigging(false)
      setCanCollectWorms(false)
      setWormProgress(0)
    }
  }

  const pageTick = () => {
    if (isDigging == true) {
      setWormProgress((old) => (old >= (wormProgressMax-1) ? wormProgressMax : old + wormProgressPerTick));
      if (wormProgress >= wormProgressMax-1) {
        setCanCollectWorms(true)
      }
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
    _context.setSave({resources: {worms: worms, fish: fish}, gathering: {isDigging: isDigging, wormProgress: wormProgress}})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTick])

  return (
    <PageCore title="Gathering Zone" gridId="grid-gathering" contentClasses={'gathering'}>
      <GridCell gridPosition='top-left'>
        <FlexList mode="list" maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
        </FlexList>
        <CircularProgress sx={{marginTop: "15px"}} color="gathering" size={100} thickness={8} variant="determinate" value={wormProgress / wormProgressMax * 100} /><br/>
        <ActionButton disabled={(isDigging ? true : false)} color="gathering" variant="contained" text='Dig for Worms' func={startDigging}></ActionButton><br/>
        <ActionButton disabled={(!canCollectWorms ? true : false)} color="gathering" variant="contained" text='Collect' func={collectWorms}></ActionButton>
      </GridCell>
      <GridCell gridPosition='top-right'></GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageGatheringZone;
