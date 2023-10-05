import { useContext, useState, useEffect } from 'react';

import SaveContext from '../../context/SaveContext';
import PageCore from '../PageCore';
import GridCell from '../../components/grid/GridCell';
import ActionButton from '../../components/ActionButton';

function PageQueen() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  const [fish, setFish] = useState(_context.save.resources.fish || 0);
  const [worms, setWorms] = useState(_context.save.resources.worms || 0);

  const gainBonus = () => {
    setFish((prevFish) => prevFish - 1);
    setWorms((prevWorms) => prevWorms + 3);
    alert("Yum!");
  };

  useEffect(() => {
    _context.setSave({resources: {worms: worms, fish: fish}});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fish, worms])

  return (
    <PageCore title="Queen of Worms" gridId="grid-queen" contentClasses={'queen'}>
      <GridCell gridPosition='top-row'></GridCell>
      <GridCell gridPosition='center'></GridCell>
      <GridCell gridPosition='bottom-left'>
        <ActionButton disabled={(fish >= 1 ? false : true)} color="queen" variant="contained" text={(fish >= 1 ? "Sacrifice a Fish" : "Disappointing")} func={gainBonus}></ActionButton>
      </GridCell>
      <GridCell gridPosition='bottom-right'></GridCell>
    </PageCore>
  )
}

export default PageQueen;
