import { useContext } from 'react';

import SaveContext from '../../components/SaveContext';
import PageCore from '../PageCore';

function PageQueen() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Queen of Worms" gridId="grid-queen">
    <div className="grid-top-row">top-row</div>
    <div className="grid-center">center</div>
    <div className="grid-bottom-left">bottom-left</div>
    <div className="grid-bottom-right">bottom-right</div>
    </PageCore>
  )
}

export default PageQueen;
