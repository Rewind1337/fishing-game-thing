// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import FlexList from '../../components/flexlist/FlexList';
import GridCell from '../../components/grid/GridCell';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import PetCard from './PetCard';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Pets.scss'

// Route: "/pets"
function PagePets() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars
  
  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.PETS} title="Pets" contentClasses={'pets'}>
      <GridCell gridPosition='top-left'>
        This is where like a big view would go
      </GridCell>
      <GridCell gridPosition='right-side'>
        <FlexList headerElement={<h4>{"Owned Pets"}</h4>} mode="list" maxHeight={800} minHeight={400}>
          <PetCard srcImg='./src/assets/bg-pets.png' name='Sister'/>
          <PetCard srcImg='./src/assets/bg-pets.png' name='Brother'/>
        </FlexList>
      </GridCell>
      <GridCell gridPosition='bottom-left'>
        actions?
      </GridCell>
      <GridCell gridPosition='bottom-right'>
        send out / dispatch / whatever
      </GridCell>
    </PageCore>
  )
}

export default PagePets;
