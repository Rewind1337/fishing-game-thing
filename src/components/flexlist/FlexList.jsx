import PropTypes from 'prop-types';
import './FlexList.scss'

import useTranslation from '../../context/useTranslation'

import ActionButton from '../ActionButton';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsIcon from '@mui/icons-material/Apps';
import { useState } from 'react';

FlexList.propTypes = {
  id: PropTypes.string,
  langpath: PropTypes.string,
  dontTranslate: PropTypes.bool,
  switchable: PropTypes.bool,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  noHeader: PropTypes.bool,
  headerText: PropTypes.string,
  mode: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  gap: PropTypes.number,
  children: PropTypes.array,
};
  
function FlexList({id, langpath = "flexlist", dontTranslate = false, switchable = false, collapsible = false, collapsed = false, noHeader = false, headerText = "did you forget noHeader?", mode, minHeight = "auto", maxHeight = "100%", gap = 0, children}) {
  headerText = useTranslation(langpath, headerText, dontTranslate);

  const [collapsedState, setCollapsedState] = useState(collapsed);

  const [modeState, setModeState] = useState(mode)

  const headerModeButtons = (
    <div className='flexlist-header-buttons' style={{display: "flex", alignItems: "flex-end"}}>
      <ActionButton func={() => {setModeState("list")}} variant='outlined' onlyIcon icon={<TableRowsIcon />} sx={{zIndex: 1000, padding: 16}}></ActionButton>
      <ActionButton func={() => {setModeState("flex")}} variant='outlined' onlyIcon icon={<AppsIcon />} sx={{zIndex: 1000, padding: 16}}></ActionButton>
    </div>
  )

  const headerCollapsed = (
    <div className={"flexlist-header"} style={{ marginTop: gap + "px", cursor: 'pointer' }}>
      <div className='flexlist-header-text' onClick={() => { setCollapsedState(!collapsedState);}}>
        <KeyboardArrowRightIcon />
        <h4>{headerText}</h4>
      </div>
      {switchable && headerModeButtons}
    </div>
  );
  
  const headerNotCollapsed = (
    <div className={"flexlist-header"} style={{ marginTop: gap + "px", cursor: 'pointer' }}>
      <div className='flexlist-header-text' onClick={() => { setCollapsedState(!collapsedState);}}>
        <KeyboardArrowDownIcon />
        <h4>{headerText}</h4>
      </div>
      {switchable && headerModeButtons}
    </div>
  );

  const headerDefault = (
    <div className={"flexlist-header"} style={{marginTop: gap + "px", backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
      <h4>{headerText}</h4>
      {switchable && headerModeButtons}
    </div>
  )

  if (collapsible && noHeader) {
    return (<>You need a header if you want the FlexList to be collapsible</>)
  }

  if (collapsible) {
    if (collapsedState) {
      
      return (
        <div id={id} className={"flexlist-wrapper " + modeState + (collapsed ? ' collapsed' : ' expanded')}>
          {headerCollapsed}
        </div>
      );
    } else {
      return (
        <div id={id} className={"flexlist-wrapper " + modeState + (collapsed ? ' collapsed' : ' expanded')}>
          {headerNotCollapsed}
          <div className={"flexlist flexlist-" + modeState} style={{minHeight: minHeight, maxHeight: maxHeight}}>
            {children}
          </div>
        </div>
      );
    }
  }

  return (
    <div id={id} className={"flexlist-wrapper " + modeState}>
      {!noHeader && headerDefault}
      <div className={"flexlist flexlist-" + modeState} style={{minHeight: minHeight, maxHeight: maxHeight}}>
        {children}
      </div>
    </div>
  );
}

export default FlexList