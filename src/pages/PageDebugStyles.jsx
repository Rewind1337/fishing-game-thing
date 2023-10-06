import { useContext } from 'react';

import SaveContext from '../context/SaveContext';
import PageCore from './PageCore';
import GridCell from '../components/grid/GridCell';
import ActionButton from '../components/ActionButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FlexList from '../components/flexlist/FlexList';

function PageDebugStyles() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Debug Stuff">
      <GridCell gridPosition='top-left'>
        <FlexList mode='flex'>
          <ActionButton startIcon={<DeleteIcon />} color="fishing" variant="contained"></ActionButton>
          <ActionButton endIcon={<DeleteIcon />} color="gathering" variant="contained"></ActionButton>
          <ActionButton color="adventure" variant="contained"></ActionButton>
          <ActionButton color="queen" variant="contained"></ActionButton>
          <ActionButton color="home" variant="contained"></ActionButton>
          <ActionButton color="tutorial" variant="contained"></ActionButton>
          <ActionButton color="archaeology" variant="contained"></ActionButton>
          <ActionButton color="pets" variant="contained"></ActionButton>
          <ActionButton color="inventory" variant="contained"></ActionButton>
        </FlexList>
      </GridCell>
      <GridCell gridPosition='right-side'></GridCell>
      <GridCell gridPosition='bottom-left'></GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageDebugStyles;
