import { useContext } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';

function PageGatheringZone() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Gathering Zone" gridId="grid-gathering">
      <div className="grid-top-left">top-left</div>
      <div className="grid-top-right">top-right</div>
      <div className="grid-bottom-left">bottom-left</div>
      <div className="grid-bottom-right">bottom-right</div>
    </PageCore>
  )
}

export default PageGatheringZone;
