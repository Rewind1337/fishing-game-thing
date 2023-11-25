// Boiler (kinda)
import PropTypes from 'prop-types';
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components

// MUI
import Grid from '@mui/material/Unstable_Grid2';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// JS Utility
import { format } from '../../utility/utility';  // eslint-disable-line no-unused-vars



// CSS Styles
import './Help.scss'
import FlexList from '../../components/flexlist/FlexList';

Accordion.propTypes = {
  children: PropTypes.array,
  headerText: PropTypes.string.isRequired,
}

function Accordion({children, headerText}) {
  const [open, setOpen] = useState(false);

  return <div className={'accordion ' + (open ? "open" : "")} onClick={() => {setOpen(!open)}}>
    <div className='accordion-header'>{open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}{headerText}</div>
    {open && <div className='accordion-content'>
      {children}
    </div>}
  </div>
}

// Route: "/help"
function PageHelp() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.HELP} title="Help / Tutorial" contentClasses={'help'}>
      <Grid container mobile={6} sx={{alignItems: "center", overflow: "auto"}} maxHeight={600}>
        <FlexList headerText='Topics' mode="list">
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
          <Accordion headerText="Gathering">
            <div>If you cant figure it out man, good luck LMAO</div>
          </Accordion>
        </FlexList>
      </Grid>
    </PageCore>
  )
}

export default PageHelp;
