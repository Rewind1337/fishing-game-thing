import PropTypes from 'prop-types';
import './FlexList.css'

FlexList.propTypes = {
  headerText: PropTypes.string,
  mode: PropTypes.string.isRequired,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  gap: PropTypes.number,
  children: PropTypes.array,
};
  
function FlexList({headerText = 'header', mode, minHeight, maxHeight, gap = 0, children}) {
  return (
    <div className={"flex-list-wrapper " + mode}>
      <h5 className={"flexlist-header"} style={{marginTop: gap + "px"}}>{headerText}</h5>
      <div className={"flexlist flexlist-" + mode} style={{minHeight: minHeight, maxHeight: maxHeight}}>
        {children}
      </div>
    </div>
  );
}

export default FlexList