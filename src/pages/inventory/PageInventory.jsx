// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import FlexList from '../../components/flexlist/FlexList';
import GridCell from '../../components/grid/GridCell';
import ActionButton from '../../components/ActionButton';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Inventory.css'

// Route: "/inventory"
function PageInventory() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars

  const [mainTabIndex, setMainTabIndex] = useState(0)

  const mainTabHeaders = ['Equipment', 'Bait', 'Items'];
  const handleMainTabChange = (main) => {
    setMainTabIndex(main);
  }

  const [otherTabIndex, setOtherTabIndex] = useState(0)

  const otherTabHeaders = ['Resources', 'Fish', 'Other'];
  const handleOtherTabChange = (other) => {
    setOtherTabIndex(other);
  }

  return (
    <PageCore title="Inventory" gridId="grid-inventory" contentClasses={'inventory'}>
      <GridCell gridPosition='top-left'>

        <div className='flexlist-tabs'>
          <ActionButton color='inventory' text={otherTabHeaders[0]} func={() => {handleOtherTabChange(0)}}/>
          <ActionButton color='inventory' text={otherTabHeaders[1]} func={() => {handleOtherTabChange(1)}}/>
          <ActionButton color='inventory' text={otherTabHeaders[2]} func={() => {handleOtherTabChange(2)}}/>
        </div>

        <FlexList headerElement={<h3>{otherTabHeaders[otherTabIndex]}</h3>}>
          {otherTabIndex == 0 && <>
            This is {otherTabHeaders[0]} Stuff
          </>}
          {otherTabIndex == 1 && <>
            This is {otherTabHeaders[1]} Stuff
          </>}
          {otherTabIndex == 2 && <>
            This is {otherTabHeaders[2]} Stuff
          </>}
        </FlexList>

      </GridCell>
      <GridCell gridPosition='top-right'>
        <div className='flexlist-tabs'>
          <ActionButton color='inventory' text={mainTabHeaders[0]} func={() => {handleMainTabChange(0)}}/>
          <ActionButton color='inventory' text={mainTabHeaders[1]} func={() => {handleMainTabChange(1)}}/>
          <ActionButton color='inventory' text={mainTabHeaders[2]} func={() => {handleMainTabChange(2)}}/>
        </div>

        <FlexList headerElement={<h3>{mainTabHeaders[mainTabIndex]}</h3>}>
          {mainTabIndex == 0 && <>
            This is {mainTabHeaders[0]} Stuff
          </>}
          {mainTabIndex == 1 && <>
            This is {mainTabHeaders[1]} Stuff
          </>}
          {mainTabIndex == 2 && <>
            This is {mainTabHeaders[2]} Stuff
          </>}
        </FlexList>
      </GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageInventory;
