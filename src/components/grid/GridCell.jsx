import PropTypes from 'prop-types';

GridCell.propTypes = {
  gridPosition: PropTypes.string.isRequired,
  noFlexOverride: PropTypes.bool,
  children: PropTypes.array,
};
  
function GridCell({gridPosition, noFlexOverride = false, children}) {
  return (<div className={"grid-cell grid-" + gridPosition}>
    <div className={"grid-cell-content" + (noFlexOverride ? ' no-flex' : '')}>
      {children}
    </div>
  </div>);
}

export default GridCell;