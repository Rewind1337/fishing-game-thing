// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import GridCell from '../../components/grid/GridCell';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Help.css'

// Route: "/help"
function PageHelp() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars

  return (
    <PageCore title="Help / Tutorial" contentClasses={'help'}>
      <GridCell gridPosition='top-left'></GridCell>
      <GridCell gridPosition='right-side'></GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageHelp;
