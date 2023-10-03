import { useContext } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';

function PageHelp() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Help / Tutorial" contentClasses={'help'}>
      <GridCell gridPosition='top-left'></GridCell>
      <GridCell gridPosition='right-side'></GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageHelp;
