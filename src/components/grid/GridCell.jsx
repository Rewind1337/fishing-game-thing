import PropTypes from 'prop-types';

GridCell.propTypes = {
  gridPosition: PropTypes.string.isRequired,
  children: PropTypes.array,
};
  
function GridCell({gridPosition, children}) {
  return (<div className={"grid-cell grid-" + gridPosition}>
    <div className="grid-cell-content">
      {children}
    </div>
  </div>);
}

export default GridCell;