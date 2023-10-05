import { useContext, useState } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';
import ActionButton from '../../components/ActionButton';

function PageHome() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  const [canExplore, setExplore] = useState(true);
  const [unlockedGathering, unlockGathering] = useState(_context.save.sidebar.unlocks[4] || false);

  const rollExploreLocation = () => {
    if (!unlockedGathering) {
      unlockGathering(true);
      _context.save.sidebar.unlocks[4] = true;
      _context.refs.sidebar['unlocker'](4, true);
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
