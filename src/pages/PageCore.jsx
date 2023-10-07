import PropTypes from 'prop-types';

import { useContext } from 'react';
import SaveContext from '../context/SaveContext';
import '../components/UI.css'
import '../components/grid/Grid.css'
import ActionButton from '../components/ActionButton';

import { Paper, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FlagDE from '../assets/flag-de';
import FlagNL from '../assets/flag-nl';
import FlagUS from '../assets/flag-us';
import WeatherClock from '../components/weatherclock/WeatherClock';

PageCore.propTypes = {
    title: PropTypes.string.isRequired,
    contentClasses: PropTypes.string,
    gridId: PropTypes.string,
    children: PropTypes.array,
};

function PageCore({title, gridId = 'grid-default', contentClasses, children}) {

  const _context = useContext(SaveContext);

    return (
        <div id="wrapper">
          <div id="content" className={contentClasses}>
            <div id="content-top">
              <div id="content-top-left">
                <Paper elevation={0} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                  <WeatherClock/>
                </Paper>
              </div>
              <div id="content-top-center">
                <Paper elevation={3} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}><h1>{title}</h1></Paper>
              </div>
              <div id="content-top-right">
                <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}></Paper>
              </div>
            </div>
            <div id="content-main">
              <div id={gridId} className="content-grid">
                {children}
              </div>
            </div>
            <div id="content-bottom">
              <div id="content-bottom-left">
                <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}></Paper>
              </div>
              <div id="content-bottom-center">
                <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                  <ActionButton color="tutorial" variant="contained" text='Sidebar' sx={{height: "80%"}} func={() => {
                    let modifiedUnlocks = [true, true, true, true, true, true, true, true]
                    _context.refs.sidebar['setSidebarUnlocks'](modifiedUnlocks);
                  }}/>
                  <ActionButton color="queen" variant="contained" text='Reset' sx={{height: "80%"}} func={() => {
                    localStorage.clear();
                    location.reload();
                  }}/>
                </Paper>
              </div>
              <div id="content-bottom-right">
                <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
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
                </Paper>
              </div>
            </div>
          </div>
        </div>
    )
}

export default PageCore;  