import PropTypes from 'prop-types';
import './FlexList.css'

FlexList.propTypes = {
  mode: PropTypes.string.isRequired,
  maxHeight: PropTypes.number,
  children: PropTypes.array,
};
  
function FlexList({mode, maxHeight, children}) {
  return (
  <div className={"flexlist flexlist-" + mode} style={{maxHeight: maxHeight}}>
    {children}
  </div>
  );
}

export default FlexList