// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import PageCore from '../core/PageCore';

// Components
import GridCell from '../../components/grid/GridCell';
import FlexList from '../../components/flexlist/FlexList';
import ActionButton from '../../components/ActionButton';
import ResourceCard from '../../components/resources/ResourceCard';

// MUI
import LinearProgress from '@mui/material/LinearProgress';

// Icons / SVG
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faWorm } from '@fortawesome/free-solid-svg-icons';

// JS Utility
import format from '../../utility/utility';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Fishing.scss'
import ResourceCollectionCard from '../../components/resources/ResourceCollectionCard';

let getWeight = function(fish) {
	let rarityTable = [
		100,
		25,
		10,
		4,
		1
	];
	
	return rarityTable[fish.rarity];
}

let canCatch = function(fish, bait, time) {
	if (bait != fish.baitNeeded) {
		return false;
	}
	
	let timeArray = [
		[0.25, 0.75],
		[0.75, 0.25],
		[0.25, 0.5],
		[0.5, 0.75],
		[0.75, 0],
		[0, 0.25],
		[0.9, 0.1],
		[0.4, 0.6],
		[0, 1]
	];

	let time1 = timeArray[fish.timeOfDay][0];
	let time2 = timeArray[fish.timeOfDay][1];

	if (time1 <= time2) {
		return (time >= time1 & time <= time2);
	}
	return (time >= time1 | time <= time2);
};

let getFish = function(location, sublocation, bait, time) {
	let errorFish = {
		id: -2,
		name: "404 fish not found",
		rarity: 4,
		baitNeeded: 0,
		timeOfDay: 8,
		flavor: "You might want to notify the devs, you shouldn't be fishing here.",
	};
	let justANibble = {
		id: -1,
		name: "Guess it's nothing.",
		rarity: 1,
		baitNeeded: 0,
		timeOfDay: 8,
		flavor: "You might want to notify the devs, you shouldn't be fishing here.",
	};
	
	if (location < 0 || location > GLOBALS.DB.FISHING.LOCATIONS.length) {
		console.warn("Warning, player escaped the confines of the game! Invalid location!");
		return errorFish;
	}
	
	let locationDat = GLOBALS.DB.FISHING.LOCATIONS[location];
	
	if (!(sublocation in locationDat.sublocations)) {
		console.warn("Warning, player escaped the confines of the game! Invalid sublocation!");
		return errorFish;
	}
	
	let sublocationDat = GLOBALS.DB.FISHING.SUBLOCATIONS[location];
	
	if (sublocationDat.fish.length == 0) {
		return errorFish;
	}
	
	let fishList = [];
	let totalWeight = 0;
	for (let fishId of sublocationDat.fish) {
    let fish = GLOBALS.DB.FISH[fishId];
		if (canCatch(fish, bait, time)) {
			totalWeight += getWeight(justANibble);
			fishList.push({'fish': fish, 'cumWeight': totalWeight});
		}
	}

	totalWeight += getWeight(justANibble);
	fishList.push({'fish': justANibble, 'cumWeight': totalWeight});
	
	let noFailBias = 0;
	let randomRoll = (Math.random() - noFailBias * (totalWeight - getWeight(justANibble))) * totalWeight;
	for (let result of fishList) {
		if (randomRoll < result.cumWeight) {
			return result['fish'];
		}
	}
	return justANibble;
};

// Route: "/fishing"
function PageFishingZone() {

  const _context = useContext(SaveContext)
  let _allTimeStamps = useRef(_context.save.pageTimestamps)
  
  const [fish, setFish] = useState(_context.save.resources.fish || 0)
  const [worms, setWorms] = useState(_context.save.resources.worms || 0)
  const [artifacts, setArtifacts] = useState(_context.save.resources.artifacts || 0)  // eslint-disable-line no-unused-vars

  const [isFishing, setFishing] = useState(_context.save.fishing.isFishing || false)
  const [fishProgress, setFishProgress] = useState(_context.save.fishing.fishProgress || false)
  const [tickRange, setTickRange] = useState(_context.save.fishing.tickRange || {min: -1, max: -1})
  let fishProgressMax = GLOBALS.FISHING.TIME

  const [fishingTripStatus, setFishingTripStatus] = useState(0)

  const contextSave = () => {
    _allTimeStamps.current.fishing = Date.now();

    _context.setSave(
      {
        pageTimestamps: _allTimeStamps.current,
        resources: {worms: worms, fish: fish, artifacts: artifacts}, 
        fishing: {isFishing: isFishing, fishProgress: fishProgress, tickRange: tickRange}
      }
    )
  }

  const startFishing = () => {
    if (worms == 0) return;
    setFishing(true)
    setWorms(worms - 1);
    let tickMiddle = 10 + Math.round(Math.random() * 40);
    setTickRange({min: tickMiddle - 10, max: tickMiddle + 10})
  }

  const attemptCatch = () => {
    if (fishProgress >= tickRange.min && fishProgress <= tickRange.max) {
      // alert("ayy");
      // Only fishes at night right now.
      let caughtFish = getFish(0, 0, 1, 0.75);
      if (caughtFish.id >= 0) {
        alert("Caught a(n): " + caughtFish.name);
        setFish(fish + 1);
      } else if (caughtFish.id == -1) {
        alert("Just a nibble.");
      } else if (caughtFish.id <= -2) {
        alert("You broke the game, fish not found!");
      }
      stopFishing();
      return;
    }
    stopFishing();
  }

  const stopFishing = () => {
    setFishing(false);
    setFishProgress(0);
    setTickRange({min: -1, max: -1})
  }

  const setTripTo = (n) => {
    stopFishing();
    setFishingTripStatus(n);
  }
  
  const pageTick = () => {
    if (isFishing == true) {
      if (fishProgress >= fishProgressMax-1) {
        setFishing(false)
      }
      setFishProgress((old) => (old >= (fishProgressMax-1) ? 0 : old + 1));
    }
  }

  useEffect(() => {
    const timer = setInterval(pageTick, 500);

    return () => {
      clearInterval(timer);
    };

  }, [worms, fish, isFishing, fishProgress, tickRange]);  // eslint-disable-line react-hooks/exhaustive-deps
 
  // unmount
  useEffect(() => () => {
    // contextSave(); // this breaks the save on exit? automation works now lol
  }, []);

  // Catch up the Ticks
  useEffect(() => {
    let _lastTimestamp = _allTimeStamps.current.fishing;
    let deltaTimeInMs = Date.now() - _lastTimestamp;
    let flooredToSec = ~~(deltaTimeInMs / 500);
    let cappedToMaxTicks = Math.min(7200, flooredToSec) // * aspect stuff * other stuff

    for (let i = 0; i < cappedToMaxTicks; i++) {
      if (isFishing) {
        pageTick();
      }
    }
  }, [])

  // Save Variables to LS after tick
   useEffect(() => {
    contextSave();
  }, [pageTick])  // eslint-disable-line react-hooks/exhaustive-deps

  const fishCollection = [
    {
      icon: <FontAwesomeIcon icon={faFish} />,
      iconcolor: 'hsl(235deg, 100%, 90%)',
      name: 'Fish',
      value: fish,
      cap: 0,
      perSec: 0,
    },
  ]

  return (
    <PageCore title="Fishing Zone" gridId="grid-fishing" contentClasses={'fishing'}>

      <GridCell gridPosition='top-left'>
      <FlexList collapsible headerElement={<h4>{"All Resources"}</h4>} mode="list" minHeight={128} maxHeight={192}>
          <ResourceCard icon={<FontAwesomeIcon icon={faWorm} />} iconcolor="hsl(300deg, 100%, 90%)" name="Worms" value={worms} cap={0} perSec={0}></ResourceCard>
          <ResourceCollectionCard collection={fishCollection} name={'Fishy Stuff'} icon={<FontAwesomeIcon icon={faFish} />} iconcolor={"hsl(235deg, 100%, 90%)"} />
        </FlexList>
      </GridCell>

      <GridCell gridPosition='top-middle' noFlexOverride>
        <LinearProgress variant="determinate" color={fishProgress >= tickRange.min && fishProgress <= tickRange.max ? 'gathering' : 'fishing'} sx={{height: "100%", margin: "0 auto"}} value={(fishProgress / fishProgressMax) * 100} />
      </GridCell>

      <GridCell gridPosition='top-right'>
        <>Current effects?</>
      </GridCell>

      <GridCell gridPosition='center'>
        {fishingTripStatus == 0 && <> {/* Just Fishing */}
          <ActionButton disabled={(isFishing ? true : false)} color="fishing" variant="contained" text='Throw out your Fishing Rod BOI' func={startFishing}/><br/>
          <ActionButton disabled={(!isFishing ? true : false)} color="fishing" variant="contained" text='Attempt to reel it in' func={() => {attemptCatch()}}/>
          <ActionButton color="gathering" variant="contained" text='Start Trip' func={() => {setTripTo(1)}}/><br/>
        </>
        }
        {fishingTripStatus == 1 && <> {/* Fishing Trip */}
          <ActionButton disabled={(isFishing ? true : false)} color="fishing" variant="contained" text='Throw out your Fishing Rod BOI' func={startFishing}/><br/>
          <ActionButton disabled={(!isFishing ? true : false)} color="fishing" variant="contained" text='Attempt to reel it in' func={() => {attemptCatch()}}/>
          <ActionButton color="queen" variant="contained" text='Finish Trip' func={() => {setTripTo(0)}}/><br/>
        </>
        }
      </GridCell>

      <GridCell gridPosition='bottom-left'>
        <>Changing Lures, Rods etc</>
      </GridCell>

      <GridCell gridPosition='bottom-middle'>
        <>?</>
      </GridCell>

      <GridCell gridPosition='bottom-right'>
        <>Loot?</>
      </GridCell>

    </PageCore>
  )
}

export default PageFishingZone;
