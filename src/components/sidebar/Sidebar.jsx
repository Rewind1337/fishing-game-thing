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

import './Sidebar.css'
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';

function Sidebar() {
  const _context = useContext(SaveContext);

  const [mouseOver, setMouseOver] = useState(true);
  const sidebarClasses = 'sidebar' + (mouseOver ? ' expanded' : '');
  const sidebarHeaderText = (mouseOver ? 'Game • Thing' : 'G • T');

  const savedFolderStates = _context.save.sidebar.states;
  const [folderStates, setFolderStates] = useState(savedFolderStates);

  const savedSidebarUnlocks = _context.save.sidebar.unlocks;
  const [sidebarUnlocks, setSidebarUnlocks] = useState(savedSidebarUnlocks);

  const setRefs = _context.setRefs;

  useEffect(() => {
    setRefs({sidebar: {'setSidebarUnlocks' : setSidebarUnlocks}});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const setSave = _context.setSave;

  useEffect(() => {
    return () => {
      setSave({sidebar: {states: folderStates, unlocks: sidebarUnlocks}});
    }
  }, [sidebarUnlocks, setSidebarUnlocks, folderStates, setFolderStates, setSave])

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
          <div className='sidebar-item--image' style={iconColor}>
            {(isUnlocked ? (mouseOver ? 
              <StyledBadge badgeContent={badgeData}>{icon ? icon : ''}</StyledBadge> : 
              (badgeData != 0 ? 
                <StyledBadge variant='dot' showZero>{icon ? icon : ''}</StyledBadge> : 
                <StyledBadge>{icon ? icon : ''}</StyledBadge>
              )) : ''
            )}
            </div>
          <div className='sidebar-item--text' style={iconColor}>{text}</div>
        </div>
      </Link>
    );
  }

    return (
      <div id="sidebar" className={sidebarClasses} onPointerEnter={(event) => {event.stopPropagation(); setMouseOver(true)}} onPointerLeave={(event) => {event.stopPropagation(); setMouseOver(false)}}>
        <div className="sidebar-header">{sidebarHeaderText}</div>
        <div className="sidebar-items-container">
          <SidebarFolder id={0} isToggled={folderStates[0]} canToggle height={25} text="Home">
            <SidebarItem isUnlocked={sidebarUnlocks[0]} badgeData={0} bigText='Home Base' smallText='H' icon={<HomeIcon/>} hoverColor="white" link='/home'/>
            <SidebarItem isUnlocked={sidebarUnlocks[1]} badgeData={0} bigText='Inventory' smallText='I' icon={<HomeRepairServiceIcon/>} hoverColor="hsl(50deg, 100%, 90%)" link='/storage'/>
            <SidebarItem isUnlocked={sidebarUnlocks[2]} badgeData={0} bigText='Ranch' smallText='R' icon={<PetsIcon/>} hoverColor="hsl(280deg, 100%, 90%)" link='/pets'/>
          </SidebarFolder>
          <SidebarFolder id={1} isToggled={folderStates[1]} canToggle height={50} text="Zones">
            <SidebarItem isUnlocked={sidebarUnlocks[3]} badgeData={0} bigText='Fishing Zone' smallText='F' icon={<PhishingIcon/>} hoverColor="hsl(220deg, 100%, 90%)" link='/fishing'/>
            <SidebarItem isUnlocked={sidebarUnlocks[4]} badgeData={0} bigText='Gathering Zone' smallText='G' icon={<GrassIcon/>} hoverColor="hsl(120deg, 100%, 90%)" link='/gathering'/>
            <SidebarItem isUnlocked={sidebarUnlocks[5]} badgeData={0} bigText='Adventure Zone' smallText='A' icon={<HikingIcon/>} hoverColor="hsl(30deg, 100%, 90%)" link='/adventure'/>
          </SidebarFolder>
          <SidebarFolder id={2} isToggled={folderStates[2]} canToggle height={50} text="Special">
            <SidebarItem isUnlocked={sidebarUnlocks[6]} badgeData={0} bigText='Queen of Worms' smallText='Q' icon={<StackedLineChartIcon/>} hoverColor="hsl(0deg, 100%, 90%)" link='/queen'/>
          </SidebarFolder>
          <SidebarFolder id={3} flex height={50} text="Other">
            <SidebarItem isUnlocked={sidebarUnlocks[7]} badgeData={0} bigText='Help / Tutorial' smallText='?' icon={<AdbIcon/>} hoverColor="hsl(270deg, 100%, 90%)" link='/help'/>
          </SidebarFolder>
          <div className='sidebar-footer'>&copy;&nbsp;dudes</div>
        </div>
      </div>
    )
  }
  
  export default Sidebar;
  