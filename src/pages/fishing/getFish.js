import GLOBALS from '../../globals/Globals';

let getHomeFish = function (modifiers) {
  return GLOBALS.DB.FISHING.LOCATIONS[0];
}

let getFailMitigation = function (modifiers) {
  let lure = modifiers['lure'] || 0;
  lure = lure * (lure > 0 ? 1 : 0);
  
  let mitigationTable = [0, 1];

  return mitigationTable[lure];
}

let getWeight = function (fish) {
  let rarityTable = [
    100,
    25,
    10,
    4,
    1
  ];

  return rarityTable[fish.rarity];
};

let canCatch = function (fish, bait, time) {
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

let getFish = function (location, time, modifiers) {

  // Null and Error results
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
    flavor: "poggers! you caught nil",
  };

  let bait = modifiers['bait'] || 0;

  // Valid Location and Sublocation checks
  if (location[0] < -1 || location[0] > GLOBALS.DB.FISHING.LOCATIONS.length) {
    console.warn("Warning, player escaped the confines of the game! Invalid location ["+location[0]+","+location[1],"]!");
    return errorFish;
  }

  let locationDat = {};
  if (location == -1) {
    locationDat = getHomeFish(modifiers);
  } else {
    locationDat = GLOBALS.DB.FISHING.LOCATIONS[location[0]];
  }

  if (!(location[1] in locationDat.sublocations)) {
    console.warn("Warning, player escaped the confines of the game! Invalid sublocation ["+location[0]+","+location[1],"]!");
    return errorFish;
  }

  let sublocationDat = GLOBALS.DB.FISHING.SUBLOCATIONS[location[1]];

  if (sublocationDat.fish.length == 0) {
    return errorFish;
  }

  // Generate the fishing list with weight per item
  let fishList = [];
  let totalWeight = 0;
  for (let fishId of sublocationDat.fish) {
    let fish = GLOBALS.DB.FISH[fishId];
    if (canCatch(fish, bait, time)) {
      totalWeight += getWeight(fish);
      fishList.push({ 'fish': fish, 'cumWeight': totalWeight });
    }
  }

  totalWeight += getWeight(justANibble);
  fishList.push({ 'fish': justANibble, 'cumWeight': totalWeight });

  // Bias at 1 reduces fail chance to 0
  let noFailBias = getFailMitigation(modifiers);

  // Choose a random fish from the weighted list of fish
  let randomRoll = (Math.random() - noFailBias * (totalWeight - getWeight(justANibble))) * totalWeight;
  for (let result of fishList) {
    if (randomRoll < result.cumWeight) {
      return result['fish'];
    }
  }

  // Fallback
  return justANibble;
};

export default getFish;