import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../styles/Theme.jsx';

import '../components/UI.css'
import '../components/Grids.css'

import Sidebar from '../components/Sidebar'

PageCore.propTypes = {
    title: PropTypes.string.isRequired,
    contentClasses: PropTypes.string,
    gridId: PropTypes.string,
    children: PropTypes.array,
};

function PageCore({title, gridId = 'grid-default', contentClasses, children}) {

    return (
      <ThemeProvider theme={Theme}>
        <div id="wrapper">
          <Sidebar></Sidebar>
          <div id="content" className={contentClasses}>
            <div id="content-top">
              <h1 className='title-blur'>{title}</h1>
            </div>
            <div id="content-main">
              <div id={gridId} className="content-grid">
                {children}
              </div>
            </div>
            <div id="content-bottom">
              <div className='title-blur'>core bottom</div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
}

export default PageCore;  