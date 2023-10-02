import { useState, useContext } from 'react'
import SaveContext from './SaveContext';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import HomeIcon from '@mui/icons-material/Home';
import PhishingIcon from '@mui/icons-material/Phishing';
import HikingIcon from '@mui/icons-material/Hiking';
import PetsIcon from '@mui/icons-material/Pets';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AdbIcon from '@mui/icons-material/Adb';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Sidebar() {
  const _context = useContext(SaveContext);

  const [mouseOver, setMouseOver] = useState(true);
  const sidebarClasses = 'sidebar' + (mouseOver ? ' expanded' : '');
  const sidebarHeaderText = (mouseOver ? 'Game • Thing' : 'G • T');

  const savedFolderStates = _context.save.sidebar.states;
  const [folderStates, setFolderStates] = useState(savedFolderStates);

  const setSave = _context.setSave;

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
      setSave({sidebar: {states: newState}});
    }
    

    if (canToggle) {
      return (
        <>
          <div className={'sidebar-folder' + (flex ? " flex-grow" : "")} style={{height: height + "px"}}>
            <div onClick={() => {handleChange(id)}} className='sidebar-folder-toggle' style={{cursor: "pointer"}}>{(visible ? <VisibilityIcon className='sidebar-folder-eye'/> : <VisibilityOffIcon className='sidebar-folder-eye'/>)} <div>{text}</div></div>
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
    bigText: PropTypes.string.isRequired,
    smallText: PropTypes.string.isRequired,
    icon: PropTypes.element,
    hoverColor: PropTypes.string,
    link: PropTypes.string.isRequired,
  };

  function SidebarItem({ bigText, smallText, icon, hoverColor, link}) {
    const [mouseOverItem, setMouseOverItem] = useState(false);

    let classes = 'sidebar-item' + (mouseOver ? ' expanded' : '')
    let text = (mouseOver ? bigText : smallText)
    let iconColor = (mouseOverItem ? {color: hoverColor} : {color: "white"});
    return (
      <Link to={link} className={'sidebar-item-link' + (mouseOverItem ? ' hover' : '')}>
        <div className={classes} onMouseEnter={(event) => {event.stopPropagation(); setMouseOverItem(true)}} onMouseLeave={(event) => {event.stopPropagation(); setMouseOverItem(false)}}>
          <div className='sidebar-item--image' style={iconColor}>{icon ? icon : ""}</div>
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
            <SidebarItem bigText='Home' smallText='H' icon={<HomeIcon/>} hoverColor="white" link='/home'/>
          </SidebarFolder>
          <SidebarFolder id={1} isToggled={folderStates[1]} canToggle height={50} text="Zones">
            <SidebarItem bigText='Fishing Zone' smallText='F' icon={<PhishingIcon/>} hoverColor="hsl(220deg, 100%, 90%)" link='/fishing'/>
            <SidebarItem bigText='Gathering Zone' smallText='G' icon={<PetsIcon/>} hoverColor="hsl(120deg, 100%, 90%)" link='/gathering'/>
            <SidebarItem bigText='Adventure Zone' smallText='A' icon={<HikingIcon/>} hoverColor="hsl(30deg, 100%, 90%)" link='/adventure'/>
          </SidebarFolder>
          <SidebarFolder id={2} isToggled={folderStates[2]} canToggle height={50} text="Special">
            <SidebarItem bigText='Queen of Worms' smallText='Q' icon={<StackedLineChartIcon/>} hoverColor="hsl(0deg, 100%, 90%)" link='/queen'/>
          </SidebarFolder>
          <SidebarFolder id={3} flex height={50} text="Other">
            <SidebarItem bigText='Help / Tutorial' smallText='?' icon={<AdbIcon/>} hoverColor="hsl(270deg, 100%, 90%)" link='/help'/>
          </SidebarFolder>
          <div className='sidebar-footer'>&copy;&nbsp;dudes</div>
        </div>
      </div>
    )
  }
  
  export default Sidebar;
  