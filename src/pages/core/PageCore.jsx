import PropTypes from 'prop-types';

import { useContext, useEffect, useState } from 'react';
import SaveContext from '../../context/SaveContext';
import LanguageContext from '../../context/LanguageContext';
import LANG_DE from '../../context/lang/de';
import LANG_US from '../../context/lang/us';
import LANG_NL from '../../context/lang/nl';

import '../../components/UI.scss'
import ActionButton from '../../components/ActionButton';

import { Paper, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FlagDE from '../../assets/flag-de';
import FlagNL from '../../assets/flag-nl';
import FlagUS from '../../assets/flag-us';
import WeatherClock from '../../components/weatherclock/WeatherClock';

import Grid from '@mui/material/Unstable_Grid2';
import BasicModal from '../../components/modal/BasicModal';

import '../../globals/fa-library.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Journal from '../../components/modal/Journal.jsx';

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

  const [loaded, setLoaded] = useState(false)

  const [darkmode, setDarkmode] = useState(false)

  const selectLanguage = (languageFile) => {
    _lang.setLanguageFile(languageFile);
    setSelectedLanguage(languageFile.language)
  }

  const coreTick = () => {
    _context.refs.sidebar['checkForBadgeData'](pageID);
  }
 
  useEffect(() => {
    console.log("mount", title)
    if (_context.save.sidebar.unlocks[pageID] == false) {
      window.location = "/home"
    } else {
      setLoaded(true);
      document.title = title;
    }

    setTimeout(() => {
      _context.refs.sidebar['setMobileSidebarVisible'](false);
    }, 50);
    
  }, [])

  useEffect(() => {
    _context.refs.sidebar['checkForBadgeData'](pageID);
    _context.refs.sidebar['clearBadgeDataFor'](pageID);
  })

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
    <Paper elevation={1} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', alignItems: "center" }}>
      <Stack direction={'row'} sx={{ gap: '12px' }}>
        <ActionButton color="tutorial" variant="contained" text='Journal' sx={{ width: "100%" }} endIcon={<FontAwesomeIcon style={{marginRight: "8px", marginLeft: "-4px"}} icon="fa-solid fa-book" />} func={() => {setJournalOpen(true)}} />
      </Stack>
    </Paper>
  );

  const debugButtons = (
    <Paper elevation={1} sx={{ display: 'flex !important', flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <Grid container spacing={0.5} mobile={"auto"} sx={{flexGrow: '1', alignItems: "center"}} >
        <Grid mobile={4}>
          <ActionButton color="tutorial" variant="contained" text='Sidebar' sx={{ height: "80%", width: "100%" }} func={() => {
          let modifiedUnlocks = [true, true, true, true, true, true, true, true];
          _context.refs.sidebar['setSidebarUnlocks'](modifiedUnlocks);
        }} />
        </Grid>
        <Grid mobile={4}>
          <ActionButton color="queen" variant="contained" text='Reset' sx={{ height: "80%", width: "100%" }} func={() => {
            localStorage.clear();
            location.reload();
          }} />
        </Grid>
        <Grid mobile={4}>
          <ActionButton color="inventory" variant="contained" text='Cheat' sx={{ height: "80%", width: "100%" }} func={() => {
            let oldSave = JSON.parse(localStorage.getItem("game-save"));
            oldSave.resources.bait = [0, 1000];
            oldSave.resources.fishes = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
            oldSave.resources.artifacts = 1000;
            let newSave = JSON.stringify(oldSave);
            localStorage.setItem("game-save", newSave);
            location.reload();
          }} />
        </Grid>
      </Grid>
    </Paper>
  )

  const langButtonActive = {filter: 'blur(0)', outline: '1px solid rgba(255, 255, 255, 0.6)', outlineOffset: '-8px'};
  const langButtonInactive = {filter: 'blur(1px'}
  
  const languagePicker = (
    <Paper elevation={1} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', alignItems: "center" }}>
      <Stack direction={'row'} sx={{ gap: '12px' }}>
        <IconButton style={(selectedLanguage == 'DE' ? langButtonActive : langButtonInactive)} onClick={() => { selectLanguage(LANG_DE); } }>
          <FlagDE />
        </IconButton>
        <IconButton style={(selectedLanguage == 'NL' ? langButtonActive : langButtonInactive)} onClick={() => { selectLanguage(LANG_NL); } }>
          <FlagNL />
        </IconButton>
        <IconButton style={(selectedLanguage == 'US' ? langButtonActive : langButtonInactive)} onClick={() => { selectLanguage(LANG_US); } }>
          <FlagUS />
        </IconButton>
      </Stack>
    </Paper>
  );
  
  const tooltip = (
    <Paper id='tooltip'>
      <div className='tooltip-header'>Tooltip</div>
      <p className='tooltip-text font-tooltips'>This is a test tooltip lmao, please be nice to him</p>
      <p className='tooltip-footer'></p>
    </Paper>
  );

    return (
        <div id="wrapper" className={loaded ? 'fade-in' : 'fade-out'}>

        <BasicModal header={modalHeader} icon={modalIcon} text={modalText} open={modalOpen} onClose={handleModalClose} />

        <Journal open={journalOpen} onClose={handleJournalClose}/>

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
            <Grid id="content-bottom" className="hide-mobile show-tablet-up" container spacing={0}>
              <Grid mobile="auto">
                {miscButtons}
              </Grid>
              <Grid mobile={4}>
                {debugButtons}
              </Grid>
              <Grid mobile="auto">
                {languagePicker}
              </Grid>
            </Grid>
          </div>
        </div>
    )
}

export default PageCore;  