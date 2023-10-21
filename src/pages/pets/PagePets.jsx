// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import PetCard from './PetCard';

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
  
  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.PETS} title="Pets" contentClasses={'pets'}>
      <Grid container xs={12} flexGrow={1}spacing={0.5}>
        <Grid xs={8}>
          
        </Grid>
        <Grid xs={4} maxHeight={600}>
          <FlexList headerText="Owned Pets" mode="list">
            <PetCard srcImg='./src/assets/bg-pets.png' name='Sister'/>
            <PetCard srcImg='./src/assets/bg-pets.png' name='Brother'/>
          </FlexList>
        </Grid>
      </Grid>
    </PageCore>
  )
}

export default PagePets;
