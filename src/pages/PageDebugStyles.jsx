// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../context/SaveContext';
import GLOBALS from '../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from './core/PageCore';

// Components
import FlexList from '../components/flexlist/FlexList';
import GridCell from '../components/grid/GridCell';
import ActionButton from '../components/ActionButton';  // eslint-disable-line no-unused-vars

// Route: "/debugstyles"
function PageDebugStyles() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Debug Stuff">
      <GridCell gridPosition='top-left'>
        <FlexList noHeader mode='flex'>
          <ActionButton color="fishing" variant="contained"></ActionButton>
          <ActionButton color="gathering" variant="contained"></ActionButton>
          <ActionButton color="adventure" variant="contained"></ActionButton>
          <ActionButton color="queen" variant="contained"></ActionButton>
          <ActionButton color="home" variant="contained"></ActionButton>
          <ActionButton color="tutorial" variant="contained"></ActionButton>
          <ActionButton color="archaeology" variant="contained"></ActionButton>
          <ActionButton color="pets" variant="contained"></ActionButton>
          <ActionButton color="inventory" variant="contained"></ActionButton>
        </FlexList>
      </GridCell>
      <GridCell gridPosition='right-side'></GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageDebugStyles;
