// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import PetCollection from './PetCollection';

// MUI
import Grid from '@mui/material/Unstable_Grid2';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Pets.scss'

// Route: "/pets"
function PagePets() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars
  const pets = _context.save.pets;
  
  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.PETS} title="Pets" contentClasses={'pets'}>
      <Grid container mobile={12} flexGrow={1}spacing={0.5}>
        <Grid mobile={8}>
          
        </Grid>
        <Grid mobile={4} maxHeight={600}>
          <PetCollection pets={pets}/>
        </Grid>
      </Grid>
    </PageCore>
  )
}

export default PagePets;
