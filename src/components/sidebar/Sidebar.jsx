import { useState, useRef, useContext, useEffect } from 'react'
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import HomeIcon from '@mui/icons-material/Home';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PetsIcon from '@mui/icons-material/Pets';

import PhishingIcon from '@mui/icons-material/Phishing';
import HikingIcon from '@mui/icons-material/Hiking';
import GrassIcon from '@mui/icons-material/Grass';

import StoreIcon from '@mui/icons-material/Store';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AdbIcon from '@mui/icons-material/Adb';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './Sidebar.scss'
import '../../mq.scss'
import Theme from '../../styles/Theme';

import { styled } from '@mui/material/styles';
import { Badge, useMediaQuery } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionButton from '../ActionButton';

function Sidebar() {
  const _context = useContext(SaveContext);

  const mqMobile = useMediaQuery(Theme.breakpoints.down('tablet'));

  const [loaded, setLoaded] = useState(false)

  const [mouseOver, setMouseOver] = useState(true);
  
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState((mqMobile ? false : true))

  const mobileSidebarButton = (
    <div className='mobile-sidebar-button' onClick={() => {setMobileSidebarVisible(!mobileSidebarVisible)}}>
      <FontAwesomeIcon icon={"fa-solid fa-bars"} />
    </div>
  )
  
  const sidebarClasses = 'sidebar ' + 
                        ((mouseOver && !mqMobile) ? 'expanded ' : '') + 
                        (loaded ? 'fade-in ' : 'fade-out ') + 
                        (mqMobile ? 'mobile ' : '') + 
                        (mobileSidebarVisible ? 'visible ' : '')

  const sidebarHeaderText = (mqMobile ? 'Game • Thing' : (mouseOver ? 'Game • Thing' : 'G • T'));

  const [folderStates, setFolderStates] = useState(_context.save.sidebar.states);
  const [sidebarUnlocks, setSidebarUnlocks] = useState(_context.save.sidebar.unlocks);
  const [fishingTripLocks, setTripLocks] = useState(_context.save.sidebar.tripLocks);
  const [highlights, setHighlights] = useState(_context.save.sidebar.highlights);

  const currentPage = useRef(_context.save.sidebar.currentPage);

  const modifySidebarUnlocks = (index, bool) => {
    let modifiedUnlocks = [...sidebarUnlocks];
    modifiedUnlocks[index] = bool;
    setSidebarUnlocks(modifiedUnlocks);
  }

  const [sidebarBadgeData, setSidebarBadgeData] = useState(_context.save.sidebar.sidebarBadgeData);

  let pageNameMap = ["home","inventory","pets","fishing","gathering","adventure","queen","tutorial"]

  const addBadgeTimer = (page, duration, pageTickSpeed = 500) => {    
    let thePage = pageNameMap[page];
    
    let rightnow = Date.now();
    let whenItFinishes = rightnow + (duration * pageTickSpeed);

    if (localStorage.getItem("badge-data") == undefined) {
      localStorage.setItem("badge-data", JSON.stringify({[thePage]: [whenItFinishes]}))
    } else {
      let allBadgeData = JSON.parse(localStorage.getItem("badge-data"));
      if (allBadgeData[thePage] == undefined) {
        allBadgeData[thePage] = [whenItFinishes];
      } else {
        allBadgeData[thePage].push(whenItFinishes);
      }
      localStorage.setItem("badge-data", JSON.stringify(allBadgeData))
    }
  }

  const clearBadgeDataFor = (page = -1) => {
    let singlePage = (page !== -1);

    let didChange = false;

    if (localStorage.getItem("badge-data") != undefined) {
      let allBadgeData = JSON.parse(localStorage.getItem("badge-data"));
      let changedSidebarBadgeData = sidebarBadgeData;

      let changedBadgeData = allBadgeData;

      if (singlePage) {
        currentPage.current = page;
        
        let pageData = allBadgeData[pageNameMap[page]]
        for (let d in pageData) {
          if (pageData[d] < Date.now()) {changedBadgeData[pageNameMap[page]].splice(d, 1); didChange = true;}
        }
        if (didChange) {
          changedSidebarBadgeData = changedSidebarBadgeData.slice();
          changedSidebarBadgeData[page] = changedBadgeData[pageNameMap[page]].length;
        }
      } else {
        for (let key in allBadgeData) {
          let pageData = allBadgeData[key]
          for (let d in pageData) {
            if (pageData[d] < Date.now()) {changedBadgeData[key].splice(d, 1); didChange = true;}
          }
          if (didChange) {
            changedSidebarBadgeData = changedSidebarBadgeData.slice();
            changedSidebarBadgeData[page] = changedBadgeData[key].length;
          }
        }
      }
      
      if (didChange) {
        localStorage.setItem("badge-data", JSON.stringify(changedBadgeData));
        setSidebarBadgeData(changedSidebarBadgeData);
      }
    }
  }

  const checkForBadgeData = (page = -1) => {
    let singlePage = (page !== -1);

    let newData = sidebarBadgeData;

    if (localStorage.getItem("badge-data") != undefined) {
      let allBadgeData = JSON.parse(localStorage.getItem("badge-data"));
      
      if (singlePage) {
        if (page == currentPage.current) {
          return;
        }

        let n = 0;
        let thePage = pageNameMap[page];
        let pageTimers = allBadgeData[thePage];
        for (let t in pageTimers) {
          if (pageTimers[t] < Date.now()) {
            n++;
          }
        }

        if (n != newData[page]) {
          newData = newData.slice();
          newData[page] = n;
          setSidebarBadgeData(newData);
        }

      } else {
        for (let thePage in allBadgeData) {
          let pageIndex = pageNameMap.indexOf(thePage);
          if (pageIndex == currentPage.current) {
            continue;
          }

          let n = 0;
          let pageTimers = allBadgeData[thePage];
          for (let t in pageTimers) {
            if (pageTimers[t] < Date.now()) {
              n++;
            }
          }

          if (n != newData[pageIndex]) {
            newData = newData.slice();
            newData[pageIndex] = n;
          }
        }
        setSidebarBadgeData(newData);
      }
    }
  }

  /*
  // Checks ALL pages
  useEffect(() => {
    const timer = setInterval(() => {checkForBadgeData()}, 1000);

    return () => {
      clearInterval(timer);
    };

  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  */

  const setRefs = _context.setRefs;

  useEffect(() => {
    setRefs({sidebar: {
      'setMobileSidebarVisible' : setMobileSidebarVisible,
      'modifySidebarUnlocks' : modifySidebarUnlocks,
      'setSidebarUnlocks': setSidebarUnlocks, 
      'clearBadgeDataFor' : clearBadgeDataFor,
      'checkForBadgeData' : checkForBadgeData,
      'addBadgeTimer' : addBadgeTimer}}, true);
    setMouseOver(false);
    setLoaded(true);
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps
  
  const setSave = _context.setSave;

  useEffect(() => {
    setSave({sidebar: {states: folderStates, unlocks: sidebarUnlocks, tripLocks: fishingTripLocks, highlights: highlights, sidebarBadgeData: sidebarBadgeData, currentPage: currentPage.current}});
  }, [sidebarUnlocks, setSidebarUnlocks, fishingTripLocks, setTripLocks, highlights, setHighlights, folderStates, setFolderStates, sidebarBadgeData, setSidebarBadgeData, setSave])

  SidebarFolder.propTypes = {
    id: PropTypes.number.isRequired,
    isToggled: PropTypes.bool,
    height: PropTypes.number,
    text: PropTypes.string.isRequired,
    flex: PropTypes.bool,
    canToggle: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  function unlockSidebar(id, unlocked) {
    let unlocks = _context.save.sidebar.unlocks.slice();
    unlocks[id] = unlocked;

    let newSidebar = {..._context.save.sidebar};
    newSidebar['unlocks'] = unlocks;
    setSave({sidebar : newSidebar});
    setSidebarUnlocks(unlocks);
  }

  function tripSideBarManager(status, location, sublocation) {
    _context.save.fishingTrip.status = status;

    if (status != GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE) {

      let newSidebar = {..._context.save.sidebar};
      newSidebar.tripLocks = new Array(newSidebar.length).fill(false);
      newSidebar.highlights = new Array(newSidebar.length).fill(false);

      setSave({sidebar : newSidebar});
      setTripLocks(newSidebar.tripLocks);
      setHighlights(newSidebar.highlights);

    } else {

      let newSidebar = {..._context.save.sidebar};
      newSidebar.tripLocks = new Array(newSidebar.length).fill(true);

      newSidebar.tripLocks[1] = false; // Inventory
      newSidebar.tripLocks[3] = false; // Fishing
      newSidebar.tripLocks[8] = false; // Settings

      newSidebar.highlights[3] = true;

      console.log(GLOBALS.DB.FISHING.SUBLOCATIONS[location][sublocation]);

      if (GLOBALS.DB.FISHING.SUBLOCATIONS[location][sublocation].resources.length > 0) {
        newSidebar.tripLocks[4] = false;
        newSidebar.highlights[4] = true;
      }

      if (GLOBALS.DB.FISHING.SUBLOCATIONS[location][sublocation].canSacrifice) {
        newSidebar.tripLocks[6] = false;
        newSidebar.highlights[6] = true;
        unlockSidebar(6, true);
      }

      setSave({sidebar : newSidebar});
      setTripLocks(newSidebar.tripLocks);
      setHighlights(newSidebar.highlights);

    }
  }
  function unlockedCheck(sidebarID) {
    if (_context.save.fishingTrip.status == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE) {
      return sidebarUnlocks[sidebarID] && !fishingTripLocks[sidebarID];
    } else {
      return sidebarUnlocks[sidebarID];
    }
  }

  useEffect(() => {
    setRefs({sidebar : {'unlocker' : unlockSidebar, 'fishingTripChecker' : tripSideBarManager}});
    return () => {}
  }, [])
  

  function SidebarFolder({ id, isToggled, height = 0, text, flex, canToggle, children }) {
    const [visible, setVisible] = useState(isToggled);

    const handleChange = (id) => {
      let oldState = folderStates;
      oldState[id] = !visible;
      let newState = oldState
      setVisible(!visible); 
      setFolderStates(newState);
    }
    
    if (canToggle) {
      return (
        <>
          <div className={'sidebar-folder' + (flex ? " flex-grow" : "")} style={{height: height + "px"}}>
            <div onClick={() => {handleChange(id)}} className='sidebar-folder-toggle' style={{cursor: "pointer"}}>{(visible ? <KeyboardArrowDownIcon className='sidebar-folder-icon'/> : <KeyboardArrowRightIcon className='sidebar-folder-icon'/>)} <div>{text}</div></div>
          </div>
          {visible && children}
        </>
      );
    } else {
      return (
        <>
          <div className={'sidebar-folder' + (flex ? " flex-grow" : "")} style={{height: height + "px"}}><div className='sidebar-folder-toggle'>{text}</div></div>
          {children}
        </>
      );
    }    
  }

  SidebarItem.propTypes = {
    isUnlocked: PropTypes.bool.isRequired,
    highlight: PropTypes.bool,
    badgeData: PropTypes.number,
    bigText: PropTypes.string.isRequired,
    smallText: PropTypes.string.isRequired,
    icon: PropTypes.element,
    hoverColor: PropTypes.string,
    link: PropTypes.string.isRequired,
  };

  function SidebarItem({ isUnlocked, highlight, badgeData = 0, bigText, smallText, icon, hoverColor, link}) {
    const [mouseOverItem, setMouseOverItem] = useState(false);

    let classes = 'sidebar-item' + (mouseOver ? ' expanded' : '') + (isUnlocked ? '' : ' disabled')
    let text = (mqMobile ? bigText : (mouseOver ? bigText : smallText))
    let iconColor = (isUnlocked ? (mouseOverItem || highlight ? {color: hoverColor} : {color: "gainsboro"}) : {color: 'gray'});

    const StyledBadge = styled(Badge)(() => ({
      '& .MuiBadge-badge': {
        right: (mouseOver ? -16 : -4),
        top: (mouseOver ? 12 : 5),
        backgroundColor: (mouseOver ? 'transparent' : hoverColor),
        border: `3px solid ${hoverColor}`,
        color: (mouseOverItem || highlight ? hoverColor : 'white'),
      },
    }));
    
    return (
      <Link to={(isUnlocked ? link : '')} className={'sidebar-item-link' + (mouseOverItem ? ' hover' : '')} style={(isUnlocked ? {cursor: 'pointer'} : {cursor: 'default'})}>
        <div className={classes} onMouseEnter={(event) => {event.stopPropagation(); setMouseOverItem(true);}} onMouseLeave={(event) => {event.stopPropagation(); setMouseOverItem(false);}}>
          <div className='sidebar-item-image' style={iconColor}>
            {(isUnlocked ? (mouseOver ? 
              <StyledBadge badgeContent={badgeData}>{icon ? icon : ''}</StyledBadge> : 
              (badgeData != 0 ? 
                <StyledBadge variant='dot' showZero>{icon ? icon : ''}</StyledBadge> : 
                <StyledBadge>{icon ? icon : ''}</StyledBadge>
              )) : ''
            )}
            </div>
          <div className='sidebar-item-text' style={iconColor}>{text}</div>
        </div>
      </Link>
    );
  }

    return (
      <>
      {mqMobile && mobileSidebarButton}
      <div id="sidebar" style={(loaded ? {position: "relative", left: "0px"} : {position: "absolute", left: "-1000px"})} className={sidebarClasses} onPointerEnter={(event) => {event.stopPropagation(); setMouseOver(true)}} onPointerLeave={(event) => {event.stopPropagation(); setMouseOver(false)}}>
        <div className="sidebar-header">{sidebarHeaderText}</div>
        <div className="sidebar-items-container">
          <div className="sidebar-items-top">
            <SidebarFolder id={0} isToggled={folderStates[0]} canToggle height={25} text="Home">
              <SidebarItem isUnlocked={unlockedCheck(0)} highlight={highlights[0]} badgeData={sidebarBadgeData[0]} bigText='Home Base' smallText='H' icon={<HomeIcon/>} hoverColor={Theme.palette.home.sidebarHover} link='/home'/>
              <SidebarItem isUnlocked={unlockedCheck(1)} highlight={highlights[1]} badgeData={sidebarBadgeData[1]} bigText='Inventory' smallText='I' icon={<HomeRepairServiceIcon/>} hoverColor={Theme.palette.inventory.sidebarHover} link='/inventory'/>
              <SidebarItem isUnlocked={unlockedCheck(2)} highlight={highlights[2]} badgeData={sidebarBadgeData[2]} bigText='Pets' smallText='P' icon={<PetsIcon/>} hoverColor={Theme.palette.pets.sidebarHover} link='/pets'/>
            </SidebarFolder>
          </div>
          <div className="sidebar-items-center">
            <SidebarFolder id={1} isToggled={folderStates[1]} canToggle height={50} text="Zones">
              <SidebarItem isUnlocked={unlockedCheck(3)} highlight={highlights[3]} badgeData={sidebarBadgeData[3]} bigText='Fishing Zone' smallText='F' icon={<PhishingIcon/>} hoverColor={Theme.palette.fishing.sidebarHover} link='/fishing'/>
              <SidebarItem isUnlocked={unlockedCheck(4)} highlight={highlights[4]} badgeData={sidebarBadgeData[4]} bigText='Gathering Zone' smallText='G' icon={<GrassIcon/>} hoverColor={Theme.palette.gathering.sidebarHover} link='/gathering'/>
              <SidebarItem isUnlocked={unlockedCheck(5)} highlight={highlights[5]} badgeData={sidebarBadgeData[5]} bigText='Adventure Zone' smallText='A' icon={<HikingIcon/>} hoverColor={Theme.palette.adventure.sidebarHover} link='/adventure'/>
            </SidebarFolder>
            <SidebarFolder id={2} isToggled={folderStates[2]} canToggle height={50} text="Special">
              <SidebarItem isUnlocked={unlockedCheck(6)} highlight={highlights[6]} badgeData={sidebarBadgeData[6]} bigText='Queen of Worms' smallText='Q' icon={<StackedLineChartIcon/>} hoverColor={Theme.palette.queen.sidebarHover} link='/queen'/>
              <SidebarItem isUnlocked={unlockedCheck(7)} highlight={highlights[7]} badgeData={sidebarBadgeData[7]} bigText='Traders' smallText='T' icon={<StoreIcon/>} hoverColor={Theme.palette.traders.sidebarHover} link='/traders'/>
            </SidebarFolder>
          </div>
          <div className="sidebar-items-bottom">
            <SidebarFolder id={3} flex height={50} text="Other">
              <SidebarItem isUnlocked={unlockedCheck(8)} highlight={highlights[8]} badgeData={sidebarBadgeData[8]} bigText='Help / Tutorial' smallText='?' icon={<AdbIcon/>} hoverColor={Theme.palette.tutorial.sidebarHover} link='/help'/>
            </SidebarFolder>
            <div className='sidebar-footer'>
              <Link to="/">
                Manage&nbsp;Save
              </Link>
              </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  
  export default Sidebar;
  