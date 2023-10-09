import PropTypes from 'prop-types';
import './FlexList.css'

FlexList.propTypes = {
  noHeader: PropTypes.bool,
  headerElement: PropTypes.element,
  mode: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  gap: PropTypes.number,
  children: PropTypes.array,
};
  
function FlexList({noHeader = false, headerElement = (<h4>did you forget noHeader ?</h4>), mode, minHeight = "100%", maxHeight = "100%", gap = 0, children}) {
  
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