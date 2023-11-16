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

const generatePickerOptions = () => {
  let options = [];
  for (let f in GLOBALS.DB.FISH) {
    let fish = GLOBALS.DB.FISH[f];
    options.push({
      icon: <FontAwesomeIcon icon={"fa-solid fa-fish-fins"}/>,
      itemID: fish.id,
      itemName: fish.name,
      aspects: fish.aspects || undefined,
    })
  }
  return options;
}

// Route: "/queen"
function PageQueen() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  const milestoneTiers = [25, 125, 500];

  const milestone = _context.save.milestone;

  const [milestoneProgress, setMilestoneProgress] = useState(milestone.progress || 0)
  const [currentMilestoneTier, setCurrentMilestoneTier] = useState(milestone.currentMilestoneTier || 0)
  const [milestoneProgressMax, setMilestoneProgressMax] = useState(milestoneTiers[currentMilestoneTier])

  const [resources, setResources] = useState(resourceHook(_context));
  const [aspects, setAspects] = useState(aspectHook(_context));

  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const pickerOptions = generatePickerOptions();

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
    gainBonus(input);
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

      // milestone stuff
      let msRarity = (rarityTable[fishData.rarity] * 0.1 * amount);
      setMilestoneProgress((old) => (old >= (milestoneProgressMax) ? milestoneProgressMax : old + msRarity))
      if (milestoneProgress >= milestoneProgressMax - msRarity) {
        let nextMilestoneTier = currentMilestoneTier + 1;
        setMilestoneProgress(0);
        setCurrentMilestoneTier(nextMilestoneTier);
        setMilestoneProgressMax(milestoneTiers[nextMilestoneTier]);
      }

      _context.refs.toastmanager['fireToast']("success", "Yum!");
    }
  };

  useEffect(() => {
    _context.setSave({
      resources: {...resources}, 
      aspects: {...aspects}, 
      milestone: {progress: milestoneProgress, currentMilestoneTier: currentMilestoneTier},
    });
  }, [resources, aspects, milestoneProgress, currentMilestoneTier]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasAny = (fishes) => {
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

  const milestoneProgressTracker = (
    <Paper className='milestone-tracker'>
      <h2>Milestone Progress</h2>
      <h5>Current Tier: {currentMilestoneTier}</h5>
      <CircularProgressWithLabel textsize='33px' icon={<FontAwesomeIcon icon={"fa-solid fa-hurricane"} />} iconOffsetTop={"-10%"} textOffsetTop={"45%"} iconSize={"60px"} iconcolor="hsl(0deg, 100%, 85%)" sx={{ padding: "5px" }} color="queen" size={200} thickness={8} variant="determinate" value={(milestoneProgress / milestoneProgressMax) * 100} />
      <div className='action-button-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <ActionButton disabled={(hasAny(resources.fishes) ? false : true)} color="queen" variant="contained" text={(hasAny(resources.fishes) ? "Sacrifice a Fish" : "Disappointing")} func={handlePickerOpen}></ActionButton>
      </div>
    </Paper>
  );

  const aspectList = (
    <FlexList headerText="Aspects" mode='list' collapsible>
      {aspectsToList(GLOBALS.DB.ASPECTS).map(asp => <AspectCard key={asp.name} c={asp.aspect.c} name={asp.aspect.name} color={asp.aspect.color} amount={format(aspects[asp.name] || 0, '.', asp.aspect.precision || 1)} iconscale={asp.aspect.iconscale} effect={asp.aspect.effect} />)}
    </FlexList>
  );

  const resourceList = (
    <FlexList collapsible switchable headerText={"All Resources"} mode="list">
      <BaitCollection resources={resources}/>
      <FishCollection resources={resources}/>
    </FlexList>
  );

  const milestoneList = (<>
    <FlexList headerText="Completed Milestones" collapsible collapsed mode='list'>
      {milestoneTiers.map((t, i) => {if (i < currentMilestoneTier) return <MilestoneCard key={t} id={i} completed sacrificeRequired={t} bonus='' />})}
    </FlexList>
    <FlexList headerText="Remaining Milestones" collapsible mode='list'>
      {milestoneTiers.map((t, i) => {if (i >= currentMilestoneTier) return <MilestoneCard key={t} id={i} sacrificeRequired={t} bonus='' />})}
    </FlexList>
  </>);
  
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
          {milestoneProgressTracker}
        </Grid>
        <Grid mobile={6} desktop={6} maxHeight={{mobile: 300, desktop: 325}} flexGrow={1} overflow={"auto"}>
          {milestoneList}
        </Grid>
        <Grid className="hide-tablet-down show-desktop-up" desktop={6} widescreen={6} maxHeight={{mobile: 300, desktop: 375}} flexGrow={1} spacing={0.5}>
          {milestoneProgressTracker}
        </Grid>
      </Grid>

    </PageCore>
  )
}

export default PageQueen;
