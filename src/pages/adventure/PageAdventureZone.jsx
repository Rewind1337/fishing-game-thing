import { useContext } from 'react';

import SaveContext from '../../components/SaveContext';
import PageCore from '../PageCore';

function PageAdventureZone() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Adventure Zone" gridId="grid-adventure">
      <div className="grid-top-left">top-left</div>
      <div className="grid-top-middle">top-middle</div>
      <div className="grid-top-right">top-right</div>
      <div className="grid-center-left">center-left</div>
      <div className="grid-center-right">center-right</div>
      <div className="grid-bottom-row">bottom-row</div>
    </PageCore>
  )
}

export default PageAdventureZone;
