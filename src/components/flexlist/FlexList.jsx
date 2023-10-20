import PropTypes from 'prop-types';
import './FlexList.scss'

import useTranslation from '../../context/useTranslation'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

FlexList.propTypes = {
  id: PropTypes.string,
  langpath: PropTypes.string,
  dontTranslate: PropTypes.bool,
  collapsible: PropTypes.bool,
  noHeader: PropTypes.bool,
  headerText: PropTypes.element,
  mode: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  gap: PropTypes.number,
  children: PropTypes.array,
};
  
function FlexList({id, langpath = "flexlist", dontTranslate = false, collapsible = false, noHeader = false, headerText = "did you forget noHeader?", mode, minHeight = "auto", maxHeight = "100%", gap = 0, children}) {
  headerText = useTranslation(langpath, headerText, dontTranslate);

  const [collapsed, setCollapsed] = useState(false)

  if (collapsible && noHeader) {
    return (<>You need a header if you want the FlexList to be collapsible</>)
  }

  if (collapsible) {
    if (collapsed) {
      return (
        <div id={id} className={"flexlist-wrapper " + mode + (collapsed ? ' collapsed' : ' expanded')}>
          <div onClick={() => {setCollapsed(!collapsed)}} className={"flexlist-header"} style={{marginTop: gap + "px", cursor: 'pointer'}}>
            <KeyboardArrowRightIcon/><h4>{headerText}</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div id={id} className={"flexlist-wrapper " + mode + (collapsed ? ' collapsed' : ' expanded')}>
          <div onClick={() => {setCollapsed(!collapsed)}} className={"flexlist-header"} style={{marginTop: gap + "px", cursor: 'pointer'}}>
            <KeyboardArrowDownIcon/><h4>{headerText}</h4>
          </div>
          <div className={"flexlist flexlist-" + mode} style={{minHeight: minHeight, maxHeight: maxHeight}}>
            {children}
          </div>
        </div>
      );
    }
  }

  return (
    <div id={id} className={"flexlist-wrapper " + mode}>
      {!noHeader && <div className={"flexlist-header"} style={{marginTop: gap + "px"}}><h4>{headerText}</h4></div>}
      <div className={"flexlist flexlist-" + mode} style={{minHeight: minHeight, maxHeight: maxHeight}}>
        {children}
      </div>
    </div>
  );
}

export default FlexList