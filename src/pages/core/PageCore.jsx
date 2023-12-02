import PropTypes from 'prop-types';

import { useContext, useEffect, useState } from 'react';
import SaveContext from '../../context/SaveContext';
import LanguageContext from '../../context/LanguageContext';

import '../../components/UI.scss'
import ActionButton from '../../components/ActionButton';

import { Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import WeatherClock from '../../components/weatherclock/WeatherClock';

import BasicModal from '../../components/modal/BasicModal';
import JournalModal from '../../components/modal/JournalModal.jsx';
import OptionsModal from '../../components/modal/OptionsModal.jsx';

import '../../globals/fa-library.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GLOBALS from '../../globals/Globals.js';

PageCore.propTypes = {
    pageID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    contentClasses: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.object,
    ]),
};

function PageCore({pageID, title, contentClasses, children}) {
  const _context = useContext(SaveContext);
  
  const _lang = useContext(LanguageContext);

  const [selectedLanguage, setSelectedLanguage] = useState(_lang.languageFile.language);

  const selectLanguage = (languageFile) => {
    _lang.setLanguageFile(languageFile);
    setSelectedLanguage(languageFile.language)
  }

  const [loaded, setLoaded] = useState(false)

  const [darkmode, setDarkmode] = useState(false)
  const [graphicsSetting, setGraphicsSetting] = useState(GLOBALS.ENUMS.SETTINGS.GRAPHICS.BEST)

  const coreTick = () => {
    _context.refs.sidebar['clearBadgeDataFor'](pageID);
    _context.refs.sidebar['checkForBadgeData']();
  }
 
  useEffect(() => {
    console.log("mount", title)
    if (_context.save.sidebar.unlocks[pageID] == false) {
      if (_context.save.fishingTrip.status == GLOBALS.ENUMS.TRIPSTATUS.TRIP_ACTIVE) {
        window.location = "/fishing";
      } else {
        window.location = "/home";
      }
    } else {
      setLoaded(true);
      document.title = title;
    }

    setTimeout(() => {
      _context.refs.sidebar['setMobileSidebarVisible'](false);
    }, 50);
    
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    _context.refs.sidebar['clearBadgeDataFor'](pageID);

    setTimeout(() => {
      _context.refs.sidebar['checkForBadgeData']();
    }, 50);
  }, [])

  const setRefs = _context.setRefs;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIcon, setModalIcon] = useState(<></>);
  const [modalHeader, setModalHeader] = useState("");
  const [modalText, setModalText] = useState("");
  
  const handleModalClose = (value, reason) => {// eslint-disable-line no-unused-vars
    if (reason && reason == "backdropClick" || reason == 'escapeKeyDown') { return }
    if (value.value == 'close') { setModalOpen(false) }
  };
  
  const [journalOpen, setJournalOpen] = useState(false);

  const handleJournalClose = (value, reason) => {// eslint-disable-line no-unused-vars
    if (reason && reason == "backdropClick" || reason == 'escapeKeyDown') { return }
    if (value.value == 'close') { setJournalOpen(false) }
  };
  
  const [optionsOpen, setOptionsOpen] = useState(false);

  const handleOptionsClose = (value, reason) => {// eslint-disable-line no-unused-vars
    if (reason && reason == "backdropClick" || reason == 'escapeKeyDown') { return }
    if (value.value == 'close') { setOptionsOpen(false) }
  };

  useEffect(() => {
    setRefs({modal: {
      'setModalOpen' : setModalOpen,
      'setModalIcon' : setModalIcon, 
      'setModalHeader' : setModalHeader,
      'setModalText' : setModalText,
      'setJournalOpen' : setJournalOpen}});
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    const timer = setInterval(coreTick, 500);
    return () => {
      clearInterval(timer);
    };
  }, [])
  

  useEffect( () => () => {console.log("unmount", title)}, [] );   // eslint-disable-line react-hooks/exhaustive-deps
  
  const miscButtons = (
    <Stack direction={'row'} sx={{ gap: '12px' }}>
      <ActionButton color="tutorial" variant="contained" text='Journal' sx={{ width: "100%" }} endIcon={<FontAwesomeIcon style={{marginRight: "8px", marginLeft: "-4px"}} icon="fa-solid fa-book" />} func={() => {setJournalOpen(true)}} />
    </Stack>
  );

  const debugButtons = (
    <Stack direction={'row'} sx={{ gap: '12px' }}>
      <ActionButton color="tutorial" variant="contained" text='Sidebar' sx={{width: "33%"}} func={() => {
        let modifiedUnlocks = [true, true, true, true, true, true, true, true];
        _context.refs.sidebar['setSidebarUnlocks'](modifiedUnlocks);
      }} />
      <ActionButton color="queen" variant="contained" text='Reset' sx={{width: "33%"}} func={() => {
        localStorage.clear();
        location.reload();
      }} />
      <ActionButton color="inventory" variant="contained" text='Cheat' sx={{width: "33%"}} func={() => {
        let oldSave = JSON.parse(localStorage.getItem("game-save"));
        oldSave.resources.bait = [0, 1000];
        oldSave.resources.fishes = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
        oldSave.resources.artifacts = 1000;
        let newSave = JSON.stringify(oldSave);
        localStorage.setItem("game-save", newSave);
        location.reload();
      }} />
    </Stack>
  )
  
  const tooltip = (
    <Paper id='tooltip'>
      <div className='tooltip-header'>Tooltip</div>
      <p className='tooltip-text font-tooltips'>This is a test tooltip lmao, please be nice to him</p>
      <p className='tooltip-footer'></p>
    </Paper>
  );

    return (
        <div id="wrapper" className={loaded ? 'fade-in' : 'fade-out'}>

        <BasicModal open={modalOpen} onClose={handleModalClose}
          header={modalHeader} icon={modalIcon} text={modalText}
        />

        <JournalModal open={journalOpen} onClose={handleJournalClose}/>

        <OptionsModal open={optionsOpen} onClose={handleOptionsClose} 
          selectLanguage={selectLanguage} selectedLanguage={selectedLanguage} 
          setDarkmodeSetting={setDarkmode} darkmodeSetting={darkmode}
          setGraphicsSetting={setGraphicsSetting} graphicsSetting={graphicsSetting}
        />

        {tooltip}

          <div id="content" className={contentClasses + (darkmode ? ' darkmode' : '')}>
            <Grid id="content-top" container spacing={0}>
              <Grid mobile={"auto"}>
                <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                  <WeatherClock/>
                </Paper>
              </Grid>
              <Grid mobile={2} sx={{flexGrow: 1, margin: "0px 4px", height: "100%"}}>
                <Paper elevation={3} sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                  <h3>{title}</h3>
                </Paper>
              </Grid>
              <Grid mobile={2} sx={{height: "100%"}} justifyContent={"flex-start"}>
                <Paper elevation={1} sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                  some text
                </Paper>
              </Grid>
            </Grid>
            <div id="content-main">
              <Grid container spacing={0.5} className="content-grid">
                {children}
              </Grid>
            </div>
            <Grid id="content-bottom" className="hide-mobile show-tablet-up" container>
              <Grid mobile={2}>
                {miscButtons}
              </Grid>
              <Grid mobile={4}>
                {debugButtons}
              </Grid>
              <Grid mobile={2}>
                <Stack direction={'row'} sx={{ gap: '12px' }}>
                  <ActionButton func={() => {setOptionsOpen(true)}} text="Options" sx={{ width: "100%" }} endIcon={<FontAwesomeIcon icon="fa-solid fa-gears" style={{marginRight: "8px", marginLeft: "-4px"}}/>} variant='contained' color='home'/>
                </Stack>
              </Grid>
            </Grid>
          </div>
        </div>
    )
}

export default PageCore;  