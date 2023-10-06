import PropTypes from 'prop-types';
import './FlexList.css'

FlexList.propTypes = {
  headerText: PropTypes.string,
  mode: PropTypes.string.isRequired,
  maxHeight: PropTypes.number,
  children: PropTypes.array,
};
  
function FlexList({headerText = 'header', mode, maxHeight, children}) {
  return (
  <div className={"flexlist flexlist-" + mode} style={{maxHeight: maxHeight}}>
    <h5 style={{textAlign: 'left', textIndent: '8px'}}>{headerText}</h5>
    {children}
  </div>
  );
}

export default FlexList