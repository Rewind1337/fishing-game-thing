// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Help.scss'

// Route: "/help"
function PageHelp() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.HELP} title="Help / Tutorial" contentClasses={'help'}>
      
    </PageCore>
  )
}

export default PageHelp;
