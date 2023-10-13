import PropTypes from 'prop-types';
import './FlexList.css'
import { useState } from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

FlexList.propTypes = {
  collapsible: PropTypes.bool,
  noHeader: PropTypes.bool,
  headerElement: PropTypes.element,
  mode: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  gap: PropTypes.number,
  children: PropTypes.array,
};
  
function FlexList({collapsible = false, noHeader = false, headerElement = (<h4>did you forget noHeader ?</h4>), mode, minHeight = "auto", maxHeight = "100%", gap = 0, children}) {
  
  const [collapsed, setCollapsed] = useState(false)

  if (collapsible && noHeader) {
    return (<>You need a header if you want the FlexList to be collapsible</>)
  }

  if (collapsible) {
    if (collapsed) {
      return (
        <div className={"flex-list-wrapper " + mode + (collapsed ? ' collapsed' : ' expanded')}>
          <div onClick={() => {setCollapsed(!collapsed)}} className={"flexlist-header"} style={{marginTop: gap + "px", cursor: 'pointer'}}>
            <KeyboardArrowRightIcon/>{headerElement}
          </div>
        </div>
      );
    } else {
      return (
        <div className={"flex-list-wrapper " + mode + (collapsed ? ' collapsed' : ' expanded')}>
          <div onClick={() => {setCollapsed(!collapsed)}} className={"flexlist-header"} style={{marginTop: gap + "px", cursor: 'pointer'}}>
            <KeyboardArrowDownIcon/>{headerElement}
          </div>
          <div className={"flexlist flexlist-" + mode} style={{minHeight: minHeight, maxHeight: maxHeight}}>
            {children}
          </div>
        </div>
      );
    }
  }

  return (
    <div className={"flex-list-wrapper " + mode}>
      {!noHeader && <div className={"flexlist-header"} style={{marginTop: gap + "px"}}>{headerElement}</div>}
      <div className={"flexlist flexlist-" + mode} style={{minHeight: minHeight, maxHeight: maxHeight}}>
        {children}
      </div>
    </div>
  );
}

export default FlexList