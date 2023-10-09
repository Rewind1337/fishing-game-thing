import PropTypes from 'prop-types';
import { useState } from 'react';

GridCell.propTypes = {
  gridPosition: PropTypes.string.isRequired,
  noFlexOverride: PropTypes.bool,
  flexDirection: PropTypes.string,
  justifyContent: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};
  
function GridCell({gridPosition, noFlexOverride = false, flexDirection = 'column', justifyContent = 'flex-start', children}) {
  
  const [scrolled, setScrolled] = useState(false)
  const checkForScroll = (event) => {
    setTimeout(() => {
      if (event.target.scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }, 33)
  }

  return (<div className={"grid-cell grid-" + gridPosition + (scrolled ? ' grid-scrolled' : '')}>
    <div className={"grid-cell-content" + (noFlexOverride ? ' no-flex' : '')} 
    style={{flexDirection: flexDirection, justifyContent: justifyContent}}
    onScroll={(event) => {checkForScroll(event)}}>
      {children}
    </div>
  </div>);
}

export default GridCell;