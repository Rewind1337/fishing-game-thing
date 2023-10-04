import PropTypes from 'prop-types';

import '../components/UI.css'
import '../components/grid/Grid.css'
import ActionButton from '../components/ActionButton';

import { Paper, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FlagDE from '../assets/flag-de';
import FlagNL from '../assets/flag-nl';
import FlagUS from '../assets/flag-us';

PaperItem.propTypes = {
  elevation: PropTypes.number,
  classNames: PropTypes.string,
  children: PropTypes.array,
};

function PaperItem({elevation, classNames, children}) {

  const paperClassNames = 'content-row-item title-blur ' + classNames

  return (
    <Paper elevation={elevation} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}} className={paperClassNames}>{children}</Paper>
  )
}

PageCore.propTypes = {
    title: PropTypes.string.isRequired,
    contentClasses: PropTypes.string,
    gridId: PropTypes.string,
    children: PropTypes.array,
};

function PageCore({title, gridId = 'grid-default', contentClasses, children}) {

    return (
        <div id="wrapper">
          <div id="content" className={contentClasses}>
            <div id="content-top">
              <div id="content-top-left">
                <PaperItem elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}></PaperItem>
              </div>
              <div id="content-top-center">
                <PaperItem elevation={3} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}><h1>{title}</h1></PaperItem>
              </div>
              <div id="content-top-right">
                <PaperItem elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                  <ActionButton color="queen" variant="contained" text='Reset LocalStorage' sx={{height: "80%"}} func={() => {
                    localStorage.clear();
                    location.reload();
                  }}/>
                </PaperItem>
              </div>
            </div>
            <div id="content-main">
              <div id={gridId} className="content-grid">
                {children}
              </div>
            </div>
            <div id="content-bottom">
              <div id="content-bottom-left">
                <PaperItem elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}></PaperItem>
              </div>
              <div id="content-bottom-center">
                <PaperItem elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}></PaperItem>
              </div>
              <div id="content-bottom-right">
                <PaperItem elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                  <Stack direction={'row'}>
                    <IconButton color="secondary" aria-label="add an alarm">
                      <FlagDE />
                    </IconButton>
                    <IconButton color="secondary" aria-label="add an alarm">
                      <FlagNL />
                    </IconButton>
                    <IconButton color="secondary" aria-label="add an alarm">
                      <FlagUS />
                    </IconButton>
                  </Stack>
                </PaperItem>
              </div>
            </div>
          </div>
        </div>
    )
}

export default PageCore;  