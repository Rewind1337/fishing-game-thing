import { useContext } from 'react';

import SaveContext from '../components/SaveContext';
import PageCore from './PageCore';

function PageFishingZone() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Fishing Zone" gridId="grid-fishing">
      <div className="grid-top-left">top-left</div>
      <div className="grid-top-middle">top-middle</div>
      <div className="grid-top-right">top-right</div>
      <div className="grid-center">center</div>
      <div className="grid-bottom-left">bottom-left</div>
      <div className="grid-bottom-middle">bottom-middle</div>
      <div className="grid-bottom-right">bottom-right</div>
    </PageCore>
  )
}

export default PageFishingZone;
