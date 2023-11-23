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
  
  const [fishingTripStatus] = useState(_context.save.fishingTrip.status || GLOBALS.ENUMS.TRIPSTATUS.IDLE);
  const [baitPack, setBaitPack] = useState(_context.save.character.baitPack || [0]);
  const [fishPack, setFishPack] = useState(_context.save.character.fishPack || []);

  const [pickerModalOpen, setPickerModalOpen] = useState(false);

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

  const generatePickerOptions = () => {
    let options = [];
    for (let f in GLOBALS.DB.FISH) {
      let fish = GLOBALS.DB.FISH[f];

      let localFish = fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE ? fishPack : resources.fishes;

      if (localFish[fish.id] > 0) {
        options.push({
          icon: <FontAwesomeIcon icon={"fa-solid fa-fish"}/>,
          itemID: fish.id,
          itemName: fish.name,
          aspects: fish.aspects || undefined,
        })
      }
    }
    return options;
  }
  const pickerOptions = generatePickerOptions();

  const sacrificeToQueen = (input) => {
    gainBonus(input);
  }

  const gainBonus = (input) => {
    let amount = input.amount;
    let fishID = input.value;

    let localFish = fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE ? fishPack : resources.fishes;
    let localBait = fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE ? baitPack : resources.bait;

    if (localFish[fishID] >= amount) {
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
      let newFishes = [...localFish];
      newFishes[fishID] = newFishes[fishID] - (1 * amount);

      // add worms
      let newBait = [...localBait];
      newBait[GLOBALS.ENUMS.BAIT.WORMS] = newBait[GLOBALS.ENUMS.BAIT.WORMS] + (fishWorms * amount);

      if (fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE) {
        setFishPack(newFishes);
        setBaitPack(newBait);
      } else {
        setResources(r => ({...r, fishes: r.fishes = newFishes}));
      }

      _context.refs.toastmanager['fireToast']("success", "Yum!");
    }
  };

  useEffect(() => {
    _context.setSave({resources: {...resources}});
    _context.setSave({aspects: {...aspects}});
    _context.setSave({character: {baitPack: baitPack, fishPack: fishPack}});
  }, [resources, aspects, baitPack, fishPack]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasAnyFish = () => {
    let fishes = fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE ? fishPack : resources.fishes;

    for (let key in fishes) {
      if (fishes[key] > 0) {return true;}
    }
    return false;
  }

  const aspectsToList = (aspectDict) => {
    let output = [];
    for (let key in aspectDict) {
      output.push({name:key, aspect:aspectDict[key]});
    }
    return output;
  };

  const milestoneProgress = (
    <Paper elevation={1} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.5)', width: '100%', padding: '4px 16px' }}>
      <h2>Milestone Progress</h2>
      <CircularProgressWithLabel textsize='33px' icon={<FontAwesomeIcon icon={"fa-solid fa-hurricane"} />} iconscale='1.66' iconcolor="hsl(0deg, 100%, 85%)" sx={{ padding: "5px" }} color="queen" size={200} thickness={8} variant="determinate" value={12} />
      <div className='action-button-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <ActionButton disabled={(hasAnyFish() ? false : true)} color="queen" variant="contained" text={(hasAnyFish() ? "Sacrifice a Fish" : "Disappointing")} func={handlePickerOpen}></ActionButton>
      </div>
    </Paper>
  );

  const aspectList = (
    <FlexList headerText="Aspects" mode='list' collapsible>
      {aspectsToList(GLOBALS.DB.ASPECTS).map(asp => <AspectCard key={asp.name} c={asp.aspect.c} name={asp.aspect.name} color={asp.aspect.color} amount={format(aspects[asp.name] || 0, '.', asp.aspect.precision || 1)} iconscale={asp.aspect.iconscale} effect={asp.aspect.effect} />)}
    </FlexList>
  );

  const resourceList = (
    <FlexList collapsible headerText={"All Resources"} mode="list">
      <BaitCollection resources={fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE ? {bait:baitPack, fishes:fishPack} : resources}/>
      <FishCollection resources={fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE ? {bait:baitPack, fishes:fishPack} : resources}/>
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
          <FlexList noHeader mode='list'>
            {resourceList}
            {aspectList}
          </FlexList>
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
