import PropTypes from 'prop-types';
import './FlexList.scss'
import { useState } from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

FlexList.propTypes = {
  id: PropTypes.string,
  collapsible: PropTypes.bool,
  noHeader: PropTypes.bool,
  headerElement: PropTypes.element,
  mode: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  gap: PropTypes.number,
  children: PropTypes.array,
};
  
function FlexList({id, collapsible = false, noHeader = false, headerElement = (<h4>did you forget noHeader ?</h4>), mode, minHeight = "auto", maxHeight = "100%", gap = 0, children}) {
  
  const [collapsed, setCollapsed] = useState(false)

  if (collapsible && noHeader) {
    return (<>You need a header if you want the FlexList to be collapsible</>)
  }

  if (collapsible) {
    if (collapsed) {
      return (
        <div id={id} className={"flexlist-wrapper " + mode + (collapsed ? ' collapsed' : ' expanded')}>
          <div onClick={() => {setCollapsed(!collapsed)}} className={"flexlist-header"} style={{marginTop: gap + "px", cursor: 'pointer'}}>
            <KeyboardArrowRightIcon/>{headerElement}
          </div>
        </div>
      );
    } else {
      return (
        <div id={id} className={"flexlist-wrapper " + mode + (collapsed ? ' collapsed' : ' expanded')}>
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
    <div id={id} className={"flexlist-wrapper " + mode}>
      {!noHeader && <div className={"flexlist-header"} style={{marginTop: gap + "px"}}>{headerElement}</div>}
      <div className={"flexlist flexlist-" + mode} style={{minHeight: minHeight, maxHeight: maxHeight}}>
        {children}
      </div>
    </div>
  );
}

export default FlexList