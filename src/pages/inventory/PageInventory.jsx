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
import './Inventory.scss'
import { Paper } from '@mui/material';

// Route: "/inventory"
function PageInventory() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars

  const [mainTabIndex, setMainTabIndex] = useState(0)

  const mainTabHeaders = ['Equipment', 'Unused', 'Unused'];
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

        <FlexList mode='list' headerElement={<h3>{otherTabHeaders[otherTabIndex]}</h3>}>
          {otherTabIndex == 0 && <>This is {otherTabHeaders[0]} Stuff</>}
          {otherTabIndex == 1 && <>
            {GLOBALS.DB.FISH.map((f) => {
                return (
                  <Paper key={f.id} elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} className='fish-card'>
                    <div className='fish-card-image'></div>
                    <div className='fish-card-data'>
                      <div className='fish-card-data-name'>{f.name}</div>
                      <div style={{display: 'flex', justifyContent: 'center', gap: '32px'}}>
                        <div className='fish-card-data-rarity'>rarity: {f.rarity}</div>
                        <div className='fish-card-data-baitneeded'>bait: {f.baitNeeded}</div>
                      </div>
                      <div className='fish-card-data-flavor'>{f.flavor}</div>
                    </div>
                    <div className='fish-card-buttons'>
                      <ActionButton text={"Test"}/>
                      <ActionButton text={"Test"}/>
                    </div>
                  </Paper>
                )
            })}
          </>}
          {otherTabIndex == 2 && <>This is {otherTabHeaders[2]} Stuff</>}
        </FlexList>

      </GridCell>
      <GridCell gridPosition='top-right'>
        <div className='flexlist-tabs'>
          <ActionButton color='inventory' text={mainTabHeaders[0]} func={() => {handleMainTabChange(0)}}/>
          <ActionButton color='inventory' text={mainTabHeaders[1]} func={() => {handleMainTabChange(1)}}/>
          <ActionButton color='inventory' text={mainTabHeaders[2]} func={() => {handleMainTabChange(2)}}/>
        </div>

        <FlexList mode='list' headerElement={<h3>{mainTabHeaders[mainTabIndex]}</h3>}>
          {mainTabIndex == 0 && <>
            <FlexList collapsible mode='list' headerElement={<h5>Rods</h5>}>
            {GLOBALS.DB.ROD.map((r) => {
                return (
                  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={r.id} className='inventory-card rod'>
                    <div className='inventory-card-buttons'>
                      <ActionButton text={"Equip"}/>
                    </div>
                    <div className='inventory-card-name'>{r.name}</div>
                  </Paper>
                )
            })}
            </FlexList>
            <FlexList collapsible mode='list' headerElement={<h5>Hooks</h5>}>
            {GLOBALS.DB.HOOK.map((h) => {
                return (
                  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={h.id} className='inventory-card hook'>
                    <div className='inventory-card-buttons'>
                      <ActionButton text={"Equip"}/>
                    </div>
                    <div className='inventory-card-name'>{h.name}</div>
                  </Paper>
                )
            })}
            </FlexList>
            <FlexList collapsible mode='list' headerElement={<h5>Bait</h5>}>
            {GLOBALS.DB.BAIT.map((b) => {
                return (
                  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={b.id} className='inventory-card bait'>
                    <div className='inventory-card-buttons'>
                      <ActionButton text={"Equip"}/>
                    </div>
                    <div className='inventory-card-name'>{b.name}</div>
                  </Paper>
                )
            })}
            </FlexList>
            <FlexList collapsible mode='list' headerElement={<h5>Lures</h5>}>
            {GLOBALS.DB.LURE.map((l) => {
                return (
                  <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}} key={l.id} className='inventory-card lure'>
                    <div className='inventory-card-buttons'>
                      <ActionButton text={"Equip"}/>
                    </div>
                    <div className='inventory-card-name'>{l.name}</div>
                  </Paper>
            )})}
            </FlexList>
          </>}
          {mainTabIndex == 1 && <>This is {mainTabHeaders[1]} Stuff</>}
          {mainTabIndex == 2 && <>This is {mainTabHeaders[2]} Stuff</>}
        </FlexList>
      </GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageInventory;
