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
      <ActionButton startIcon={<DeleteIcon />} color="mindaro" variant="contained" text='test'></ActionButton>
      <ActionButton color="mindaro" variant="outlined" text='test'></ActionButton>
      <ActionButton color="mindaro" variant="text" text='test'></ActionButton>
      <ActionButton color="mindaro" disabled text='test'></ActionButton>
      <br/>
      <ActionButton endIcon={<DeleteIcon />} color="lime" variant="contained" text='test'></ActionButton>
      <ActionButton color="lime" variant="outlined" text='test'></ActionButton>
      <ActionButton color="lime" variant="text" text='test'></ActionButton>
      <ActionButton color="lime" disabled text='test'></ActionButton>
      <br/>
      <ActionButton color="keppel" variant="contained" text='test'></ActionButton>
      <ActionButton color="keppel" variant="outlined" text='test'></ActionButton>
      <ActionButton color="keppel" variant="text" text='test'></ActionButton>
      <ActionButton color="keppel" disabled text='test'></ActionButton>
      <br/>
      <ActionButton color="bondi" variant="contained" text='test'></ActionButton>
      <ActionButton color="bondi" variant="outlined" text='test'></ActionButton>
      <ActionButton color="bondi" variant="text" text='test'></ActionButton>
      <ActionButton color="bondi" disabled text='test'></ActionButton>
      <br/>
      <ActionButton color="indigo" variant="contained" text='test'></ActionButton>
      <ActionButton color="indigo" variant="outlined" text='test'></ActionButton>
      <ActionButton color="indigo" variant="text" text='test'></ActionButton>
      <ActionButton color="indigo" disabled text='test'></ActionButton>
      <br/>
      <ActionButton color="violet" variant="contained" text='test'></ActionButton>
      <ActionButton color="violet" variant="outlined" text='test'></ActionButton>
      <ActionButton color="violet" variant="text" text='test'></ActionButton>
      <ActionButton color="violet" disabled text='test'></ActionButton>
      <br/>
      <ActionButton color="blood" variant="contained" text='test'></ActionButton>
      <ActionButton color="blood" variant="outlined" text='test'></ActionButton>
      <ActionButton color="blood" variant="text" text='test'></ActionButton>
      <ActionButton color="blood" disabled text='test'></ActionButton>
    </div>
    <div className="grid-right-side">right-side</div>
    <div className="grid-bottom-left">bottom-left</div>
    <div className="grid-bottom-center">bottom-center</div>
    </PageCore>
  )
}

export default PageDebugStyles;
