// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';

// Components
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';  // eslint-disable-line no-unused-vars
import CircularProgressWithLabel from '../../components/progress/CircularProgressbarWithLabel';
import MilestoneCard from './MilestoneCard';
import AspectCard from './AspectCard';
import SacrificeModal from '../../components/modal/SacrificeModal';

// MUI
import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faHurricane } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';  // eslint-disable-line no-unused-vars
import aspectHook from '../../utility/aspectHook';  // eslint-disable-line no-unused-vars
import FishCollection from '../../components/resources/FishCollection';

// CSS Styles
import './Queen.scss'
import BaitCollection from '../../components/resources/BaitCollection';

// Route: "/queen"
function PageQueen() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  const [resources, setResources] = useState(resourceHook(_context));
  const [aspects, setAspects] = useState(aspectHook(_context));

  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const pickerOptions = [
    {icon: <FontAwesomeIcon icon={faFish}/>, itemID: 0, itemName: "Muddie Munchie"},
    {icon: <FontAwesomeIcon icon={faFish}/>, itemID: 1, itemName: "Whiskered Wailer"},
  ];

  const handlePickerOpen = () => {
    setPickerModalOpen(true);
  };

  const handlePickerClose = (value, reason) => {
    if (reason && reason == "backdropClick" || reason == 'escapeKeyDown' || value.value == 'close') {
      setPickerModalOpen(false);
      return;
    }

    sacrificeToQueen(value);
  };

  const sacrificeToQueen = (input) => {
    switch (input.value) {
      case pickerOptions[0].itemID:
        gainBonus(input);
      break;
      case pickerOptions[1].itemID:
        gainBonus(input);
      break;
      default:
      break;
    }
  }

  const gainBonus = (input) => {
    let amount = input.amount;
    let fishID = input.value;
    if (resources.fishes[fishID] >= amount) {
      let fishData = GLOBALS.DB.FISH[fishID];

      let rarityTable = [1,3,7,15,30];
      let fishWorms = rarityTable[fishData.rarity];
      
      fishWorms += fishData['moreWorms'] || 0;
      fishWorms = ~~(fishWorms * (1 + Math.sqrt(aspects.wormPower)));

      let newAspects = aspects;
      for (let aspectName in fishData['aspects']) {
        newAspects[aspectName] += fishData['aspects'][aspectName] * amount;
      }
      newAspects['fishPower'] += 0.01 * rarityTable[fishData.rarity] * amount;
      setAspects(newAspects);

      // remove fish
      let newFishes = resources.fishes;
      newFishes[fishID] = newFishes[fishID] - (1 * amount);
      // add worms
      let newBait = resources.bait;
      newBait[GLOBALS.ENUMS.BAIT.WORMS] = newBait[GLOBALS.ENUMS.BAIT.WORMS] + (fishWorms * amount);
      setResources(r => ({...r, fishes: r.fishes = newFishes}));

      _context.refs.toastmanager['fireToast']("success", "Yum!");
    }
  };

  useEffect(() => {
    _context.setSave({resources: {...resources}});
    _context.setSave({aspects: {...aspects}});
  }, [resources, aspects]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasAny = (fishes) => {
    for (let key in fishes) {
      if (fishes[key] > 0) {return true;}
    }
    return false;
  }

  const milestoneProgress = (
    <div className='milestone-progress'>
      <Paper elevation={1} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.5)', width: '100%', padding: '4px 16px' }}>
        <h2>Milestone Progress</h2>
        <CircularProgressWithLabel textsize='33px' icon={<FontAwesomeIcon icon={faHurricane} />} iconscale='1.66' iconcolor="hsl(0deg, 100%, 85%)" sx={{ padding: "5px" }} color="queen" size={200} thickness={8} variant="determinate" value={12} />
        <div className='action-button-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <ActionButton disabled={(hasAny(resources.fishes) ? false : true)} color="queen" variant="contained" text={(hasAny(resources.fishes) ? "Sacrifice a Fish" : "Disappointing")} func={handlePickerOpen}></ActionButton>
        </div>
      </Paper>
    </div>
  );

  const aspectList = (
    <FlexList headerText="Aspects" mode='list'>
      <AspectCard c="𓃇" name="Worm" color='hsl(290deg, 100%, 90%)' amount={format(aspects.wormPower, '.', 1)} iconscale={"1.5"} effect={'Boosts Worm Gain'} />
      <AspectCard c="𓆝" name="Fish" color='hsl(240deg, 100%, 90%)' amount={format(aspects.fishPower, '.', 2)} iconscale={"1.75"} effect={'Boosts ???'} />
      <AspectCard c="𓂍" name="Tears" color='hsl(190deg, 100%, 40%)' amount={format(aspects.tearPower, '.', 1)} iconscale={"1.5"} effect={'Boosts Defense'} />
      <AspectCard c="𓆰" name="Fierce" color='hsl(0deg, 100%, 40%)' amount={format(aspects.fiercePower, '.', 1)} iconscale={"1.75"} effect={'Boosts Attack'} />
      <AspectCard c="🜁" name="Air" color='hsl(60deg, 100%, 90%)' amount={999999} effect={'aaa'} />
      <AspectCard c="🜂" name="Fire" color='hsl(0deg, 100%, 85%)' amount={0} effect={'aaa'} />
      <AspectCard c="🜄" name="Earth" color='hsl(30deg, 60%, 66%)' amount={format(aspects.earthPower, '.', 1)} effect={'Boosts Digging Power'} />
      <AspectCard c="🜃" name="Water" color='hsl(240deg, 100%, 90%)' amount={0} effect={'aaa'} />
      <AspectCard c="🜚" name="Gold" color='hsl(45deg, 100%, 66%)' amount={0} iconscale={"1.1"} effect={'aaa'} />
      <AspectCard c="🜛" name="Silver" color='hsl(0deg, 5%, 98%)' amount={0} iconscale={"1.25"} effect={'aaa'} />
      <AspectCard c="🝣" name="Purify" color='hsl(120deg, 100%, 90%)' amount={0} effect={'aaa'} />
      <AspectCard c="🜲" name="Regulus" color='hsl(30deg, 100%, 65%)' amount={0} effect={'aaa'} />
      <AspectCard c="🜳" name="Regulus-2" color='hsl(0deg, 100%, 100%)' amount={0} effect={'aaa'} />
      <AspectCard c="🜏" name="Brimstone" color='hsl(0deg, 100%, 40%)' amount={0} iconscale={"1.25"} effect={'aaa'} />
      <AspectCard c="🝈" name="Tincture" color='hsl(270deg, 100%, 60%)' amount={0} iconscale={"1.15"} effect={'aaa'} />
      <AspectCard c="🝒" name="Starred Trident" color='hsl(190deg, 100%, 40%)' amount={0} effect={'aaa'} />
    </FlexList>
  );

  const resourceList = (
    <FlexList collapsible headerText={"All Resources"} mode="list">
      <BaitCollection resources={resources}/>
      <FishCollection resources={resources}/>
    </FlexList>
  );

  const milestoneList = (
    <FlexList headerText="All Milestones" mode='list'>
      <MilestoneCard completed id={0} wormsRequired={25} bonus='wow you did it' />
      <MilestoneCard id={1} wormsRequired={125} bonus='wow you did it' />
      <MilestoneCard id={2} wormsRequired={500} bonus='wow you did it' />
      <MilestoneCard id={3} wormsRequired={1000} bonus='wow you did it' />
      <MilestoneCard id={4} wormsRequired={2500} bonus='wow you did it' />
      <MilestoneCard id={5} wormsRequired={5000} bonus='wow you did it' />
      <MilestoneCard id={6} wormsRequired={10000} bonus='wow you did it' />
      <MilestoneCard id={7} wormsRequired={22500} bonus='wow you did it' />
      <MilestoneCard id={8} wormsRequired={50000} bonus='wow you did it' />
      <MilestoneCard id={9} wormsRequired={100000} bonus='wow you did it' />
      <MilestoneCard id={10} wormsRequired={250000} bonus='wow you did it' />
      <MilestoneCard id={11} wormsRequired={500000} bonus='wow you did it' />
      <MilestoneCard id={12} wormsRequired={1000000} bonus='wow you did it' />
      <MilestoneCard id={13} wormsRequired={2500000} bonus='wow you did it' />
    </FlexList>
  );
  
  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.QUEEN} title="Queen of Worms" gridId="grid-queen" contentClasses={'queen'}>

      <SacrificeModal options={pickerOptions} header="Sacrifice Fish Picker" open={pickerModalOpen} onClose={handlePickerClose}/>

      <Grid container mobile={12} flexGrow={1} spacing={0.5}>
        <Grid className="hide-tablet-down show-desktop-up" desktop={6} maxHeight={{desktop: 325}} flexGrow={1} overflow={"auto"}>
          {resourceList}
        </Grid>
        <Grid className="show-tablet-down hide-desktop-up" mobile={6} maxHeight={{mobile: 325}} flexGrow={1} overflow={"auto"}>
          {resourceList}
          {aspectList}
        </Grid>
        <Grid className="hide-tablet-down show-desktop-up" desktop={6} maxHeight={{desktop: 325}} flexGrow={1} overflow={"auto"}>
          {aspectList}
        </Grid>
        <Grid className="show-tablet-down hide-desktop-up" mobile={6} maxHeight={{mobile: 325}} flexGrow={1} overflow={"auto"}>
          {milestoneProgress}
        </Grid>
        <Grid mobile={6} desktop={6} maxHeight={{mobile: 300, desktop: 325}} flexGrow={1} overflow={"auto"}>
          {milestoneList}
        </Grid>
        <Grid className="hide-tablet-down show-desktop-up" desktop={6} widescreen={6} maxHeight={{mobile: 300, desktop: 325}} flexGrow={1} spacing={0.5}>
          {milestoneProgress}
        </Grid>
      </Grid>

    </PageCore>
  )
}

export default PageQueen;
