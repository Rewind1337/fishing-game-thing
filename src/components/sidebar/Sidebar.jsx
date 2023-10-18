import { useState, useContext, useEffect } from 'react'
import SaveContext from '../../context/SaveContext';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import HomeIcon from '@mui/icons-material/Home';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PetsIcon from '@mui/icons-material/Pets';

import PhishingIcon from '@mui/icons-material/Phishing';
import HikingIcon from '@mui/icons-material/Hiking';
import GrassIcon from '@mui/icons-material/Grass';

import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AdbIcon from '@mui/icons-material/Adb';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import '../UI.scss'
import './Sidebar.scss'
import Theme from '../../styles/Theme';

import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';

function Sidebar() {
  const _context = useContext(SaveContext);

  const [loaded, setLoaded] = useState(false)

  const [mouseOver, setMouseOver] = useState(true);
  const sidebarClasses = 'sidebar ' + (mouseOver ? 'expanded ' : '') + (loaded ? 'fade-in ' : 'fade-out ');
  const sidebarHeaderText = (mouseOver ? 'Game • Thing' : 'G • T');

  const savedFolderStates = _context.save.sidebar.states;
  const [folderStates, setFolderStates] = useState(savedFolderStates);

  const savedSidebarUnlocks = _context.save.sidebar.unlocks;
  const [sidebarUnlocks, setSidebarUnlocks] = useState(savedSidebarUnlocks);

  const savedSidebarBadgeData = _context.save.sidebar.sidebarBadgeData;
  const [sidebarBadgeData, setSidebarBadgeData] = useState(savedSidebarBadgeData);

  const addBadgeTimer = (page, duration, pageTickSpeed = 500) => {
    clearBadgeDataFor(page);
    
    let nameMap = ["home","inventory","pets","fishing","gathering","adventure","queen","tutorial"]
    
    let rightnow = Date.now();
    let whenItFinishes = rightnow + (duration * pageTickSpeed)

    if (localStorage.getItem("badge-data") == undefined) {
      localStorage.setItem("badge-data", JSON.stringify({[nameMap[page]]: [whenItFinishes]}))
    } else {
      let allBadgeData = JSON.parse(localStorage.getItem("badge-data"));
      allBadgeData[nameMap[page]].push(whenItFinishes);
      localStorage.setItem("badge-data", JSON.stringify(allBadgeData))
    }
  }

  const clearBadgeDataFor = (page) => {
    if (localStorage.getItem("badge-data") != undefined) {
      let allBadgeData = JSON.parse(localStorage.getItem("badge-data"));
      let changedBadgeData = allBadgeData
      for (let t in allBadgeData.gathering) {
        if (allBadgeData.gathering[t] < Date.now()) {
          changedBadgeData.gathering.splice(t, 1);
        }
      }
      localStorage.setItem("badge-data", JSON.stringify(changedBadgeData));
      let changedSidebarData = sidebarBadgeData;
      changedSidebarData[page] = changedBadgeData.length;
      setSidebarBadgeData(changedSidebarData);
    }
  }

  const checkForBadgeData = (page) => {
    if (localStorage.getItem("badge-data") != undefined) {
      let allBadgeData = JSON.parse(localStorage.getItem("badge-data"));
      let n = 0;
      for (let t in allBadgeData.gathering) {
        if (allBadgeData.gathering[t] < Date.now()) {
          console.log("gathering", t, true)
          n++;
        }
      }
  
      let newData = sidebarBadgeData
      newData[page] = n;
      setSidebarBadgeData(newData);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {checkForBadgeData(4)}, 1000);

    return () => {
      clearInterval(timer);
    };

  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const setRefs = _context.setRefs;

  useEffect(() => {
    setRefs({sidebar: {
      'setSidebarUnlocks' : setSidebarUnlocks, 
      'clearBadgeDataFor' : clearBadgeDataFor,
      'addBadgeTimer' : addBadgeTimer}});
    setMouseOver(false);
    setLoaded(true);
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps
  
  const setSave = _context.setSave;

  useEffect(() => {
    return () => {
      setSave({sidebar: {states: folderStates, unlocks: sidebarUnlocks, sidebarBadgeData: sidebarBadgeData}});
    }
  }, [sidebarUnlocks, setSidebarUnlocks, folderStates, setFolderStates, sidebarBadgeData, setSidebarBadgeData, setSave])

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
    badgeData: PropTypes.number,
    bigText: PropTypes.string.isRequired,
    smallText: PropTypes.string.isRequired,
    icon: PropTypes.element,
    hoverColor: PropTypes.string,
    link: PropTypes.string.isRequired,
  };

  function SidebarItem({ isUnlocked, badgeData = 0, bigText, smallText, icon, hoverColor, link}) {
    const [mouseOverItem, setMouseOverItem] = useState(false);

    let classes = 'sidebar-item' + (mouseOver ? ' expanded' : '') + (isUnlocked ? '' : ' disabled')
    let text = (mouseOver ? bigText : smallText)
    let iconColor = (isUnlocked ? (mouseOverItem ? {color: hoverColor} : {color: "white"}) : {color: 'gray'});

    const StyledBadge = styled(Badge)(() => ({
      '& .MuiBadge-badge': {
        right: (mouseOver ? -16 : -4),
        top: (mouseOver ? 12 : 5),
        backgroundColor: (mouseOver ? 'transparent' : hoverColor),
        border: `3px solid ${hoverColor}`,
        color: (mouseOverItem ? hoverColor : 'white'),
      },
    }));
    
    return (
      <Link to={(isUnlocked ? link : '')} className={'sidebar-item-link' + (mouseOverItem ? ' hover' : '')} style={(isUnlocked ? {cursor: 'pointer'} : {cursor: 'default'})}>
        <div className={classes} onMouseEnter={(event) => {event.stopPropagation(); setMouseOverItem(true)}} onMouseLeave={(event) => {event.stopPropagation(); setMouseOverItem(false)}}>
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
      <div id="sidebar" className={sidebarClasses} onPointerEnter={(event) => {event.stopPropagation(); setMouseOver(true)}} onPointerLeave={(event) => {event.stopPropagation(); setMouseOver(false)}}>
        <div className="sidebar-header">{sidebarHeaderText}</div>
        <div className="sidebar-items-container">
          <div className="sidebar-items-top">
            <SidebarFolder id={0} isToggled={folderStates[0]} canToggle height={25} text="Home">
              <SidebarItem isUnlocked={sidebarUnlocks[0]} badgeData={sidebarBadgeData[0]} bigText='Home Base' smallText='H' icon={<HomeIcon/>} hoverColor={Theme.palette.home.sidebarHover} link='/home'/>
              <SidebarItem isUnlocked={sidebarUnlocks[1]} badgeData={sidebarBadgeData[1]} bigText='Inventory' smallText='I' icon={<HomeRepairServiceIcon/>} hoverColor={Theme.palette.inventory.sidebarHover} link='/inventory'/>
              <SidebarItem isUnlocked={sidebarUnlocks[2]} badgeData={sidebarBadgeData[2]} bigText='Pets' smallText='P' icon={<PetsIcon/>} hoverColor={Theme.palette.pets.sidebarHover} link='/pets'/>
            </SidebarFolder>
          </div>
          <div className="sidebar-items-center">
            <SidebarFolder id={1} isToggled={folderStates[1]} canToggle height={50} text="Zones">
              <SidebarItem isUnlocked={sidebarUnlocks[3]} badgeData={sidebarBadgeData[3]} bigText='Fishing Zone' smallText='F' icon={<PhishingIcon/>} hoverColor={Theme.palette.fishing.sidebarHover} link='/fishing'/>
              <SidebarItem isUnlocked={sidebarUnlocks[4]} badgeData={sidebarBadgeData[4]} bigText='Gathering Zone' smallText='G' icon={<GrassIcon/>} hoverColor={Theme.palette.gathering.sidebarHover} link='/gathering'/>
              <SidebarItem isUnlocked={sidebarUnlocks[5]} badgeData={sidebarBadgeData[5]} bigText='Adventure Zone' smallText='A' icon={<HikingIcon/>} hoverColor={Theme.palette.adventure.sidebarHover} link='/adventure'/>
            </SidebarFolder>
            <SidebarFolder id={2} isToggled={folderStates[2]} canToggle height={50} text="Special">
              <SidebarItem isUnlocked={sidebarUnlocks[6]} badgeData={sidebarBadgeData[6]} bigText='Queen of Worms' smallText='Q' icon={<StackedLineChartIcon/>} hoverColor={Theme.palette.queen.sidebarHover} link='/queen'/>
            </SidebarFolder>
          </div>
          <div className="sidebar-items-bottom">
            <SidebarFolder id={3} flex height={50} text="Other">
              <SidebarItem isUnlocked={sidebarUnlocks[7]} badgeData={sidebarBadgeData[7]} bigText='Help / Tutorial' smallText='?' icon={<AdbIcon/>} hoverColor={Theme.palette.tutorial.sidebarHover} link='/help'/>
            </SidebarFolder>
            <div className='sidebar-footer'>&copy;&nbsp;dudes</div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Sidebar;
  