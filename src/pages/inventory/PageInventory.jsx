// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';

// MUI
import Grid from '@mui/material/Unstable_Grid2';

// JS Utility
import { format } from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Inventory.scss'
import { Paper } from '@mui/material';
import FishCollection from '../../components/resources/FishCollection';
import BaitCollection from '../../components/resources/BaitCollection';

// Route: "/inventory"
function PageInventory() {

  const _context = useContext(SaveContext);  // eslint-disable-line no-unused-vars

  const [resources, ] = useState(resourceHook(_context));

  const inventory = _context.save.inventory;
  const character = _context.save.character;

  const [mainTabIndex, setMainTabIndex] = useState(0)

  const mainTabHeaders = ['Equipment', 'B', 'C'];
  const handleMainTabChange = (main) => {
    setMainTabIndex(main);
  }

  const [otherTabIndex, setOtherTabIndex] = useState(0)

  const otherTabHeaders = ['Resources', 'Fish', 'F'];
  const handleOtherTabChange = (other) => {
    setOtherTabIndex(other);
  }

  const equippedRod = (
      <Paper elevation={1} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} key={GLOBALS.DB.ROD[character.equipment.rod].id} className='inventory-card rod'>
        <div className='inventory-card-buttons'>
          <ActionButton text={"Equip"} />
        </div>
        <div className='inventory-card-name'>{GLOBALS.DB.ROD[character.equipment.rod].name}</div>
      </Paper>
  )

  const listOwnedRods = (inventory.equipment.rods.length > 0 && 
    <FlexList collapsible mode='list' headerText="Rods">
      {inventory.equipment.rods.map((_r) => {
        let r = GLOBALS.DB.ROD[_r]
        return (
          <Paper elevation={1} key={r.id} className='inventory-card rod'>
            <div className='inventory-card-buttons'>
              <ActionButton text={(_r == character.equipment.rod ? 'Equipped' : 'Equip')} />
            </div>
            <div className='inventory-card-name'>{r.name}</div>
          </Paper>
        );
      })}
    </FlexList>
  );

  const listOwnedHooks = (inventory.equipment.hooks.length > 0 && 
    <FlexList collapsible mode='list' headerText='Hooks'>
      {inventory.equipment.hooks.map((_h) => {
        let h = GLOBALS.DB.HOOK[_h];
        return (
          <Paper elevation={1} key={h.id} className='inventory-card hook'>
            <div className='inventory-card-buttons'>
              <ActionButton text={(_h == character.equipment.hook ? 'Equipped' : 'Equip')} />
            </div>
            <div className='inventory-card-name'>{h.name}</div>
          </Paper>
        );
      })}
    </FlexList>
  );

  const listOwnedBait = (inventory.equipment.bait.length > 0 && 
    <FlexList collapsible mode='list' headerText='Bait'>
      {inventory.equipment.bait.map((_b) => {
        let b = GLOBALS.DB.HOOK[_b];
        return (
          <Paper elevation={1} key={b.id} className='inventory-card bait'>
            <div className='inventory-card-buttons'>
              <ActionButton text={(_b == character.equipment.bait ? 'Equipped' : 'Equip')} />
            </div>
            <div className='inventory-card-name'>{b.name}</div>
          </Paper>
        );
      })}
    </FlexList>
  );

  const listOwnedLures = (inventory.equipment.lures.length > 0 && 
    <FlexList collapsible mode='list' headerText='Lures'>
      {inventory.equipment.lures.map((_l) => {
        let l = GLOBALS.DB.LURE[_l];
        return (
          <Paper key={l.id} elevation={1} className='inventory-card lure'>
            <div className='inventory-card-buttons'>
              <ActionButton text={(_l == character.equipment.lure ? 'Equipped' : 'Equip')} />
            </div>
            <div className='inventory-card-name'>{l.name}</div>
          </Paper>
        );
      })}
    </FlexList>
  );

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.INVENTORY} title="Inventory" gridId="grid-inventory" contentClasses={'inventory'}>

      <Grid container mobile={12} flexGrow={1}spacing={0.5}>
        <Grid mobile={6} tablet={4} widescreen={3} maxHeight={800} overflow={"auto"}>
          <Paper elevation={1} className='flexlist-tabs'>
            <ActionButton color='inventory' text={mainTabHeaders[0]} func={() => {handleMainTabChange(0)}}/>
            <ActionButton color='inventory' text={mainTabHeaders[1]} func={() => {handleMainTabChange(1)}}/>
            <ActionButton color='inventory' text={mainTabHeaders[2]} func={() => {handleMainTabChange(2)}}/>
          </Paper>

          <FlexList mode='list' headerText={mainTabHeaders[mainTabIndex]}>
            {mainTabIndex == 0 && <>
              {listOwnedRods}
              {listOwnedHooks}
              {listOwnedBait}
              {listOwnedLures}
            </>}
            {mainTabIndex == 1 && <>This is {mainTabHeaders[1]} Stuff</>}
            {mainTabIndex == 2 && <>This is {mainTabHeaders[2]} Stuff</>}
          </FlexList>
        </Grid>
        <Grid className="show-tablet-up hide-mobile" tablet={4} widescreen={6} maxHeight={800} overflow={"auto"}>
          
        </Grid>
        <Grid mobile={6} tablet={4} widescreen={3} maxHeight={800} overflow={"auto"}>
          <Paper elevation={1} className='flexlist-tabs'>
            <ActionButton color='inventory' text={otherTabHeaders[0]} func={() => {handleOtherTabChange(0)}}/>
            <ActionButton color='inventory' text={otherTabHeaders[1]} func={() => {handleOtherTabChange(1)}}/>
            <ActionButton color='inventory' text={otherTabHeaders[2]} func={() => {handleOtherTabChange(2)}}/>
          </Paper>

          <FlexList mode='list' headerText={otherTabHeaders[otherTabIndex]}>
            {otherTabIndex == 0 && <>
              <BaitCollection resources={resources}/>
            </>}
            {otherTabIndex == 1 && <>
              <FishCollection resources={resources}/>
            </>}
            {otherTabIndex == 2 && <>This is {otherTabHeaders[2]} Stuff</>}
          </FlexList>
        </Grid>
      </Grid>
    </PageCore>
  )
}

export default PageInventory;
