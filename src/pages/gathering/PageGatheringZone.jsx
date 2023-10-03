import { useContext, useState } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';
import ActionButton from '../../components/ActionButton';

function PageGatheringZone() {

  const _context = useContext(SaveContext);

  const [food, setFood] = useState(_context.save.gathering.food);

  return (
    <PageCore title="Gathering Zone" gridId="grid-gathering">
      <div className="grid-top-left">
        <span>food:{food}</span>
        <ActionButton color="gathering" variant="contained" text='food++' func={() => {setFood(food + 1);}}></ActionButton>
      </div>
      <div className="grid-top-right">top-right</div>
      <div className="grid-bottom-left">bottom-left</div>
      <div className="grid-bottom-right">bottom-right</div>
    </PageCore>
  )
}

export default PageGatheringZone;
