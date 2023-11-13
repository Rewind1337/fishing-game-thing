// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';
import PropTypes from 'prop-types';  // eslint-disable-line no-unused-vars

// Components
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';
import FishCollection from '../../components/resources/FishCollection';
import FishingTripMap from './FishingTripMap';
import PreparationModal from '../../components/modal/PreparationModal';

// MUI
import LinearProgress from '@mui/material/LinearProgress';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';
import getFish from './getFish';

// CSS Styles
import './Fishing.scss';
import BaitCollection from '../../components/resources/BaitCollection';

// Route: "/fishing"
function PageFishingZone() {

  const _context = useContext(SaveContext)
  let _allTimeStamps = useRef(_context.save.pageTimestamps)
  let localTimestamp = useRef(Date.now());
  let ticksDone = useRef(0);

  const [resources, setResources] = useState(resourceHook(_context))

  const [isFishing, setFishing] = useState(_context.save.fishing.isFishing || false)
  const [fishProgress, setFishProgress] = useState(_context.save.fishing.fishProgress || false)
  const [tickRange, setTickRange] = useState(_context.save.fishing.tickRange || {min: [-1], max: [-1], catch: 0})
  let fishProgressMax = GLOBALS.FISHING.TIME
  let fishProgressPerTick = GLOBALS.FISHING.SPEED

  const [characterEquipment, setCharEquipment] = useState(_context.save.character.equipment);
  const [inventoryEquipment, setInvEquipment] = useState(_context.save.inventory.equipment);

  const [fishingTripStatus, setFishingTripStatus] = useState(_context.save.fishingTrip.status || GLOBALS.ENUMS.TRIPSTATUS.IDLE);
  const [fishingTripLocation, setFishingTripLocation] = useState(_context.save.fishingTrip.location || 0);

  const [fishPickerModalOpen, setFishPickerModalOpen] = useState(false);
  const [baitPickerModalOpen, setBaitPickerModalOpen] = useState(false);
  const [fishPickerOptions, setFishPickerOptions] = useState([]);
  const [baitPickerOptions, setBaitPickerOptions] = useState([]);

  const handlePickerOpen = (type) => {
    if (type == 'fish') {
      setFishPickerModalOpen(true);
    }
    if (type == 'bait') {
      setBaitPickerModalOpen(true);
    }
  };

  const handlePickerClose = (value, reason) => {

    if ((reason && (reason == "backdropClick" || reason == 'escapeKeyDown')) || value.value == 'close') {
      if (value.modalType == 'fish') {
        setFishPickerModalOpen(false);
        setFishPickerOptions(generatePickerOptions('fish'));
        return;
      }
      if (value.modalType == 'bait') {
        setBaitPickerModalOpen(false);
        setBaitPickerOptions(generatePickerOptions('bait'));

        setFishingTripStatus(GLOBALS.ENUMS.TRIPSTATUS.IDLE);
        return;
      }
    }

    if(value.value == 'confirm') {
      if (value.modalType == 'fish') {
        setFishPickerModalOpen(false);

        let newResources = {...resources};

        for (let id in fishPickerOptions) {
          let opt = fishPickerOptions[id];
          if (id == 0) {
            newResources.bait[2] = newResources.bait[2] || 0;
            newResources.bait[2] += opt.amountSelected;
          } else {
            newResources.fishes[opt.itemID] -= opt.amountSelected;
          }
        }

        setResources(newResources);
        return;
      }

      if (value.modalType == 'bait') {
        setBaitPickerModalOpen(false);
        setFishingTripStatus(GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE);
        return;
      }
    }

    let newOptions = [];
    
    if (value.modalType == 'fish') {
      newOptions = [...fishPickerOptions];
    }
    if (value.modalType == 'bait') {
      newOptions = [...baitPickerOptions];
    }

    for (let id in newOptions) {
      let opt = newOptions[id];

      if (opt.itemID != value.value) {continue;}
    
      let trueDiff = opt.amountSelected;

      let limit = Math.min(opt.amountHave, opt.amountLimit || opt.amountHave);

      opt.amountSelected += value.amount;
      opt.amountSelected = (opt.amountSelected > limit ? limit : opt.amountSelected);
      opt.amountSelected = (opt.amountSelected < 0 ? 0 : opt.amountSelected);

      trueDiff = opt.amountSelected - trueDiff;
      newOptions[0].amountSelected += trueDiff;

      if (value.modalType == 'bait') {
        for (let id2 in newOptions) {
          if (id2 == 0) {continue;}

          let opt2 = newOptions[id2];
          opt2.amountLimit = opt2.amountSelected + newOptions[0].amountHave - newOptions[0].amountSelected;
        }
      }
      break;
    }

    if (value.modalType == 'fish') {
      setFishPickerOptions(newOptions);
    }
    if (value.modalType == 'bait') {
      setBaitPickerOptions(newOptions);
    }
  };

  const generatePickerOptions = (type) => {
    let options = [];

    let key = 0;

    if (type == 'fish') {
      options.push({
        key: key,
        icon: <FontAwesomeIcon icon={"fa-solid fa-briefcase"}/>,
        type: 'fish',
        itemID: -1,
        amountHave: 0,
        amountSelected: 0,
        itemName: "Fish Bait to Make",
      });
      key += 1;

      let tally = 0;

      for (let f in GLOBALS.DB.FISH) {
        let fish = GLOBALS.DB.FISH[f];
  
        if (resources.fishes[fish.id] > 0) {
          options.push({
            key: key,
            icon: <FontAwesomeIcon icon={"fa-solid fa-fish"}/>,
            type: 'fish',
            itemID: fish.id,
            amountHave: resources.fishes[fish.id],
            amountSelected: 0,
            itemName: fish.name,
          });
          key += 1;

          tally += resources.fishes[fish.id];
        }
      }

      options[0].amountHave = tally;
    }

    if (type == 'bait') {
      options.push({
        key: key,
        icon: <FontAwesomeIcon icon={"fa-solid fa-briefcase"}/>,
        type: 'bait',
        itemID: -1,
        amountHave: _context.save.character.baitPackSize,
        amountSelected: 0,
        itemName: "Bait Pack",
      });
      key += 1;

      for (let b in GLOBALS.DB.BAIT) {
        let bait = GLOBALS.DB.BAIT[b];
  
        if (b == 0) {continue;}
  
        if (resources.bait[bait.id] > 0) {
          options.push({
            key: key,
            icon: <FontAwesomeIcon icon={"fa-solid " + bait.iconName}/>,
            type: 'bait',
            itemID: bait.id,
            amountLimit: _context.save.character.baitPackSize,
            amountHave: resources.bait[bait.id],
            amountSelected: 0,
            itemName: bait.name,
          });
          key += 1;
        }
      }
    }

    return options;
  }

  const contextSave = () => {
    _allTimeStamps.current.fishing = Date.now();

    _context.setSave(
      {
        pageTimestamps: _allTimeStamps.current,
        resources: {...resources}, 
        fishing: {isFishing: isFishing, fishProgress: fishProgress, tickRange: tickRange},
        fishingTrip: {status: fishingTripStatus}
      }
    )
  }

  const startFishing = (onTrip) => {
    let hook = GLOBALS.DB.HOOK[characterEquipment.hook];
    let multiCatch = hook.multiCatch;

    if ((resources.bait[GLOBALS.ENUMS.BAIT.WORMS] || 0) <= 0) {
      _context.refs.toastmanager['fireToast']("error", "You dont have any Worms!");
      return;
    }
    if ((resources.bait[GLOBALS.ENUMS.BAIT.WORMS] || 0) <= multiCatch) {
      _context.refs.toastmanager['fireToast']("warning", "You dont have enough Worms for this hook!");
      return;
    }

    let newBait = resources.bait;
    newBait[GLOBALS.ENUMS.BAIT.WORMS] -= multiCatch + 1;
    setResources(r => ({...r, bait: newBait}));
    setFishing(true);

    let tickWidth = 20;
    let tickMiddle = tickWidth/2 + Math.round(Math.random() * 30);
    let newTickRange = {min: [tickMiddle - tickWidth/2], max: [tickMiddle + tickWidth/2], catch: 0};

    for (let i = 1; i <= multiCatch; i++) {
      let timeLeft = 60 - newTickRange.max[i-1];
      tickWidth = Math.min(timeLeft / 2, tickWidth / 2);
      tickMiddle = newTickRange.max[i-1] + tickWidth / 2 + Math.round(Math.random() * (timeLeft - 2 * tickWidth));

      newTickRange.min.push(tickMiddle - tickWidth/2);
      newTickRange.max.push(tickMiddle + tickWidth/2);
    }
    setTickRange(newTickRange);

    if (onTrip) {
      console.log("wow look at you, youre on a trip");
    }
  }

  const attemptCatch = (onTrip) => {
    let hook = GLOBALS.DB.HOOK[characterEquipment.hook];

    if (hook.canCatch(fishProgress, tickRange)) {
      // Only fishes at night right now.
      let toastText = "";

      // home
      let location = [-1, 0];
      
      let dayTime = 0.85;

      let modifiers = {'bait':1};
      modifiers = {'bait':1, 'homeUnlocks':['wailer']};

      let caughtFish = getFish(location, dayTime, modifiers);

      if (caughtFish.id >= 0) {
        let vowelN = (['aeiouy'].includes(caughtFish.name[0].toLowerCase()) ? "n" : "");
        toastText = "Caught a"+vowelN+": " + caughtFish.name;

        let newFishes = resources.fishes;
        newFishes[caughtFish.id] = newFishes[caughtFish.id] + 1 || 1;
        setResources(r => ({...r, fishes: r.fishes = newFishes}));

        if (hook.multiCatch > 0 && hook.multiCatch > tickRange.catch) {
          toastText += ", but there's another chance!";
        } else { toastText += "!"}

        _context.refs.toastmanager['fireToast']("success", toastText);

      } else if (caughtFish.id == -1) {
        toastText = "Just a nibble";

        if (hook.multiCatch > 0 && hook.multiCatch > tickRange.catch) {
          toastText += ", but there's another chance!";
        } else { toastText += "."}

        _context.refs.toastmanager['fireToast']("info", toastText);
      } else if (caughtFish.id <= -2) {
        toastText = "You broke the game, fish not found!";
        _context.refs.toastmanager['fireToast']("error", toastText);
      }
      
      if (hook.multiCatch > 0 && hook.multiCatch > tickRange.catch) {
        let newTickRange = tickRange;
        newTickRange.catch += 1;
        setTickRange(newTickRange);
      } else {
        stopFishing();
      }

      if (onTrip) {
        console.log("wow look at you, you attempted a catch on a trip");
      }

      return;
    }
    stopFishing();
  }

  const stopFishing = () => {
    setFishing(false);
    setFishProgress(0);
    setTickRange({min: [-1], max: [-1], catch: 0})
  }

  const setTripTo = (n) => {
    stopFishing();
    setFishingTripStatus(n);

    if (n == GLOBALS.ENUMS.TRIPSTATUS.IDLE) {setFishingTripLocation(0)}

    if (n == GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP) {
      setFishingTripLocation(1);
      handlePickerOpen('bait');
    }
  }
  
  const pageTick = () => {
    let currentTime = Date.now();
    let deltaTime = currentTime - localTimestamp.current;

    if (ticksDone.current.isNaN) {ticksDone = 0;}

    // console.log("Ticks Done", ticksDone.current);
    // console.log("PageTick Drift", deltaTime - 500);

    /*
    // Discreet Version
    let ticksToDo = ~~((deltaTime + 100) / 500);
    localTimestamp.current = localTimestamp.current + ticksToDo * 500;

    updateTick(ticksToDo);
    ticksDone.current += ticksToDo;
    */

    // Fractional Ticks Version
    let ticksToDo = deltaTime / 500;
    localTimestamp.current = localTimestamp.current + deltaTime;
    updateTick(ticksToDo);

    ticksDone.current += ticksToDo;
  }

  const updateTick = (ticks) => {
    if (isFishing == true) {
      if (fishProgress >= fishProgressMax - 1) {
        setFishing(false)
      }
      setFishProgress((old) => (old >= (fishProgressMax - 1) ? 0 : old + fishProgressPerTick * ticks));
    }
  }

  useEffect(() => {
    const timer = setInterval(pageTick, 500);

    return () => {
      clearInterval(timer);
    };

  }, [resources, isFishing, fishProgress, tickRange]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFishPickerOptions(generatePickerOptions('fish'));
    setBaitPickerOptions(generatePickerOptions('bait'));
  }, [resources]); // eslint-disable-line react-hooks/exhaustive-deps
 
  useEffect(() => () => {}, []); // unmount

  // Catch up the Ticks
  useEffect(() => {
    setFishPickerOptions(generatePickerOptions('fish'));
    setBaitPickerOptions(generatePickerOptions('bait'));

    let _lastTimestamp = _allTimeStamps.current.fishing;
    let deltaTimeInMs = Date.now() - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs / 500);
    let cappedToMaxTicks = Math.min(7200, flooredToSec) // * aspect stuff * other stuff

    updateTick(cappedToMaxTicks);
  }, [])

  // Save Variables to LS after tick
   useEffect(() => {
    contextSave();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  const handleFishingButtonClick = (onTrip) => {
    (isFishing ? attemptCatch(onTrip) : startFishing(onTrip));
  }

  const fishingButton = <ActionButton color="fishing" variant="contained" text={(isFishing ? 'Attempt to reel it in' : 'Throw out your Rod')} func={() => { handleFishingButtonClick(fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE); } } />

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.FISHING} title="Fishing Zone" gridId="grid-fishing" contentClasses={'fishing'}>

    <PreparationModal options={fishPickerOptions} header="Bait Preparation" open={fishPickerModalOpen} onClose={handlePickerClose}/>
    <PreparationModal options={baitPickerOptions} header="Bait Selection" open={baitPickerModalOpen} onClose={handlePickerClose}/>

    <Grid mobile={12} sx={{flexGrow: '1'}} minHeight={40} spacing={0} height={"auto"}>
      <LinearProgress id='fishing-progress' variant="determinate" color={GLOBALS.DB.HOOK[characterEquipment.hook].fishingBarColor(fishProgress, tickRange)} value={(fishProgress / fishProgressMax) * 100} />
    </Grid>

    <Grid container mobile={12} maxHeight={250} overflow={"auto"} flexGrow={1} spacing={0.5}>
      <Grid mobile={6} tablet={6} desktop={4} widescreen={3} maxHeight={240} overflow={"auto"}>
        <FlexList collapsible headerText={"All Resources"} mode="list">
          <BaitCollection resources={resources}/>
          <FishCollection resources={resources}/>
        </FlexList>
      </Grid>
      <Grid container mobile={6} desktop={4} widescreen={6} spacing={0.5} height={"min-content"} paddingTop={0.5}>
        <Grid mobile={12} desktop={4} >
          {fishingTripStatus != GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP && <>
            {fishingButton}
          </>}
        </Grid>
        <Grid mobile={12} desktop={4} >
          {fishingTripStatus != GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP && <>
            <ActionButton color="archaeology" variant="contained" text='Prepare Bait' func={() => {handlePickerOpen('fish')}}/>
          </>}
        </Grid>
        <Grid mobile={12} desktop={4}>
          {fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.IDLE && <>
            <ActionButton color="gathering" variant="contained" text='Prepare Fishing Trip' func={() => {setTripTo(GLOBALS.ENUMS.TRIPSTATUS.PREPARING_TRIP)}}/>
          </>}

          {fishingTripStatus == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE && <>
            <ActionButton color="queen" variant="contained" text='Finish Fishing Trip' func={() => {setTripTo(GLOBALS.ENUMS.TRIPSTATUS.IDLE)}}/>
          </>}
        </Grid>
      </Grid>
      <Grid className="hide-tablet-down show-desktop-up" mobile={6} desktop={4} widescreen={3} maxHeight={250} overflow={"auto"}>
        <FishingTripMap locationID={fishingTripLocation} tripStatus={fishingTripStatus}/>
      </Grid>
    </Grid>
    
    <Grid container mobile={12} maxHeight={400} overflow={"auto"} sx={{flexGrow: '1'}} spacing={0.5}>
      <Grid mobile={6} desktop={4} widescreen={3} spacing={0}>
        <FlexList collapsible mode='list' headerText={"Rods"}>
          {inventoryEquipment.rods.map((rodID) => {
            let r = GLOBALS.DB.ROD[rodID];
            return (
              <Paper elevation={1} key={r.id} className='inventory-card rod'>
                <div className='inventory-card-buttons'>
                  <ActionButton text={"Equip"}/>
                </div>
                <div className='inventory-card-name'>{r.name}</div>
              </Paper>
            )})}
          </FlexList>
          <FlexList collapsible mode='list' headerText={"Hooks"}>
          {inventoryEquipment.hooks.map((hookID) => {
            let h = GLOBALS.DB.HOOK[hookID];
            return (
              <Paper elevation={1} key={h.id} className='inventory-card hook'>
                <div className='inventory-card-buttons'>
                  <ActionButton text={"Equip"}/>
                </div>
                <div className='inventory-card-name'>{h.name}</div>
              </Paper>
            )})}
          </FlexList>
          <FlexList collapsible mode='list' headerText={"Bait"}>
          {inventoryEquipment.bait.map((baitID) => {
            let b = GLOBALS.DB.BAIT[baitID];
            return (
              <Paper elevation={1} key={b.id} className='inventory-card bait'>
                <div className='inventory-card-buttons'>
                  <ActionButton text={"Equip"}/>
                </div>
                <div className='inventory-card-name'>{b.name}</div>
              </Paper>
          )})}
          </FlexList>
          <FlexList collapsible mode='list' headerText={"Lures"}>
          {inventoryEquipment.lures.map((lureID) => {
            let l = GLOBALS.DB.LURE[lureID];
            return (
              <Paper elevation={1} key={l.id} className='inventory-card lure'>
                <div className='inventory-card-buttons'>
                  <ActionButton text={"Use"}/>
                </div>
                <div className='inventory-card-name'>{l.name}</div>
              </Paper>
          )})}
        </FlexList>
      </Grid>

      <Grid className="show-tablet-down hide-desktop-up" mobile={6} desktop={8} widescreen={9} maxHeight={400} overflow={"auto"}>
        <FishingTripMap locationID={fishingTripLocation} tripStatus={fishingTripStatus}/>
      </Grid>

    </Grid>

    </PageCore>
  )
}

export default PageFishingZone;