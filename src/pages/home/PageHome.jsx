import { useContext } from 'react';

import SaveContext from '../../components/SaveContext';
import PageCore from '../PageCore';

function PageHome() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Home">

    </PageCore>
  )
}

export default PageHome;
