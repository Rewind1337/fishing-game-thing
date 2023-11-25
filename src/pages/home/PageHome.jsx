// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import ActionButton from '../../components/ActionButton';

// MUI
import Grid from '@mui/material/Unstable_Grid2';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Home.scss'

// Route: "/home"
function PageHome() {

  const _context = useContext(SaveContext);

  const [canExplore, ] = useState(true);
  const [unlockedGathering, unlockGathering] = useState(_context.save.sidebar.unlocks[4] || false);
  const [unlockedQueen, unlockQueen] = useState(_context.save.sidebar.unlocks[6] || false);

  const rollExploreLocation = () => {
    if (!unlockedGathering) {
      unlockGathering(true);
      _context.refs.sidebar['modifySidebarUnlocks'](4, true);
      return;
    }
    
    if (!unlockedQueen && _context.save.resources.fish > 0) {
      unlockQueen(true);
      _context.refs.sidebar['modifySidebarUnlocks'](6, true);
      return;
    }
  }

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.HOME} title="Home" contentClasses={'home'}>
      <Grid container mobile={12} flexGrow={1}spacing={0.5}>
        <Grid mobile={8}>
          
        </Grid>
        <Grid mobile={4}>
          <ActionButton disabled={(!canExplore ? true : false)} color="queen" variant="contained" text='Explore' func={rollExploreLocation}></ActionButton>
        </Grid>
      </Grid>
    </PageCore>
  )
}

export default PageHome;
