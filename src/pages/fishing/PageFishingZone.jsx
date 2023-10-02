import { useContext } from 'react';
import PropTypes from 'prop-types';

import SaveContext from '../../components/SaveContext';
import PageCore from '../PageCore';


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


function PageFishingZone() {
  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Fishing Zone" gridId="grid-fishing">
      <GridCell gridPosition='top-left'>top-left</GridCell>
      <GridCell gridPosition='top-middle'>top-middle</GridCell>
      <GridCell gridPosition='top-right'>top-right</GridCell>
      <GridCell gridPosition='center'>center</GridCell>
      <GridCell gridPosition='bottom-left'>bottom-left</GridCell>
      <GridCell gridPosition='bottom-middle'>bottom-middle</GridCell>
      <GridCell gridPosition='bottom-right'>bottom-right</GridCell>
    </PageCore>
  )
}

export default PageFishingZone;
