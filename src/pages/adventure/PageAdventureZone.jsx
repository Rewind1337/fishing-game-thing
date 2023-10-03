import { useContext } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';

function PageAdventureZone() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Adventure Zone" gridId="grid-adventure" contentClasses={'adventure'}>
      <GridCell gridPosition='top-left'></GridCell>
      <GridCell gridPosition='top-middle'></GridCell>
      <GridCell gridPosition='top-right'></GridCell>
      <GridCell gridPosition='center-left'></GridCell>
      <GridCell gridPosition='center-right'></GridCell>
      <GridCell gridPosition='bottom-row'></GridCell>
    </PageCore>
  )
}

export default PageAdventureZone;
