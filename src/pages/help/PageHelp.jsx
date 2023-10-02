import { useContext } from 'react';

import SaveContext from '../../components/SaveContext';
import PageCore from '../PageCore';

function PageHelp() {

  const _context = useContext(SaveContext);
  _context; // to prevent the no-unused-vars, remove if actually used somewhere else

  return (
    <PageCore title="Help / Tutorial">

    </PageCore>
  )
}

export default PageHelp;
