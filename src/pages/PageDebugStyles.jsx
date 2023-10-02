import { useContext } from 'react';

import SaveContext from '../components/SaveContext';
import PageCore from './PageCore';
import ActionButton from '../components/ActionButton';
import DeleteIcon from '@mui/icons-material/Delete';

function PageDebugStyles() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Debug Stuff">
    <div className="grid-top-left">
      <ActionButton startIcon={<DeleteIcon />} color="fishing" variant="contained" text='fishing'></ActionButton>
      <br/>
      <ActionButton endIcon={<DeleteIcon />} color="gathering" variant="contained" text='gathering'></ActionButton>
      <br/>
      <ActionButton color="adventure" variant="contained" text='adventure'></ActionButton>
      <br/>
      <ActionButton color="queen" variant="contained" text='queen'></ActionButton>
      <br/>
      <ActionButton color="home" variant="contained" text='home'></ActionButton>
      <br/>
      <ActionButton color="tutorial" variant="contained" text='tutorial'></ActionButton>
    </div>
    <div className="grid-right-side">right-side</div>
    <div className="grid-bottom-left">bottom-left</div>
    <div className="grid-bottom-center">bottom-center</div>
    </PageCore>
  )
}

export default PageDebugStyles;
