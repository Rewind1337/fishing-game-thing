import { useContext, useState } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';
import ActionButton from '../../components/ActionButton';

function PageHome() {

  const _context = useContext(SaveContext);

  const [canExplore, ] = useState(true);
  const [unlockedGathering, unlockGathering] = useState(_context.save.sidebar.unlocks[4] || false);
  const [unlockedQueen, unlockQueen] = useState(_context.save.sidebar.unlocks[6] || false);

  const rollExploreLocation = () => {
    if (!unlockedGathering) {
      unlockGathering(true);
      let modifiedUnlocks = _context.save.sidebar.unlocks;
      modifiedUnlocks[4] = true;
      _context.refs.sidebar['setSidebarUnlocks'](modifiedUnlocks);
      return;
    }
    
    if (!unlockedQueen && _context.save.resources.fish > 0) {
      unlockQueen(true);
      let modifiedUnlocks = _context.save.sidebar.unlocks;
      modifiedUnlocks[6] = true;
      _context.refs.sidebar['setSidebarUnlocks'](modifiedUnlocks);
      return;
    }
  }

  return (
    <PageCore title="Home" contentClasses={'home'}>
      <GridCell gridPosition='top-left'></GridCell>
      <GridCell gridPosition='right-side'></GridCell>
      <GridCell gridPosition='bottom-left'>
        <ActionButton disabled={(!canExplore ? true : false)} color="queen" variant="contained" text='Explore' func={rollExploreLocation}></ActionButton>
      </GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageHome;
