// Boiler (kinda)
import PropTypes from 'prop-types';
import { useContext } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import Accordion from '../../components/Accordion';

// MUI
import Grid from '@mui/material/Unstable_Grid2';

// JS Utility
import { format } from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Help.scss'
import FlexList from '../../components/flexlist/FlexList';

// Route: "/help"
function PageHelp() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars

  Topic.propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.object,
    ]),
};

  function Topic({header, children}) {
    return (
      <>
        <div className='sub-header'>{header}</div>
        {children}
      </>
    )
  }

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.HELP} title="Help / Tutorial" contentClasses={'help'}>
      <Grid container mobile={6} sx={{alignItems: "center", overflow: "auto"}} maxHeight={600}>
        <FlexList headerText='Topics' mode="list">
          <Accordion headerText="Gathering">
            <Topic header="Gaining more Worms">
              <div className='text'>from regular worm gathering etc</div>
            </Topic>
            <Topic header="Finding other Bait">
              <div className='text'>from encounters etc</div>
            </Topic>
            <Topic header="Reducing the time it takes for things to complete">
              <div className='text'>sacrificing caught fish for certain aspects at the shrine</div>
              <div className='text'>gaining pets for boosts</div>
            </Topic>
          </Accordion>
        </FlexList>
      </Grid>
    </PageCore>
  )
}

export default PageHelp;
