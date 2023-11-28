import PropTypes from 'prop-types';

import LANG_DE from '../../context/lang/de';
import LANG_US from '../../context/lang/us';
import LANG_NL from '../../context/lang/nl';
import FlagDE from '../../assets/flag-de';
import FlagNL from '../../assets/flag-nl';
import FlagUS from '../../assets/flag-us';
import IconButton from '@mui/material/IconButton';

// MUI 
import Grid from '@mui/material/Unstable_Grid2';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Paper, Stack } from '@mui/material';
import Switch from '@mui/material/Switch';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ActionButton from '../ActionButton';
import Accordion from '../Accordion';

import './modal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlexList from '../flexlist/FlexList';
import { useState } from 'react';
import GLOBALS from '../../globals/Globals';

const langButtonActive = {filter: 'blur(0)', outline: '1px solid rgba(255, 255, 255, 0.6)', outlineOffset: '-8px'};
const langButtonInactive = {filter: 'blur(1px'}

function OptionsModal({ onClose, open, selectLanguage, selectedLanguage, setDarkmodeSetting, darkmodeSetting, setGraphicsSetting, graphicsSetting }) {

  const [_darkmodeSetting, _setDarkmodeSetting] = useState(darkmodeSetting)
  const [_graphicsSetting, _setGraphicsSetting] = useState(graphicsSetting)

  const languagePicker = (
    <Stack direction={'row'} sx={{ gap: '12px' }}>
      <IconButton style={(selectedLanguage == 'DE' ? langButtonActive : langButtonInactive)} onClick={(e) => { selectLanguage(LANG_DE); e.stopPropagation(); } }>
        <FlagDE />
      </IconButton>
      <IconButton style={(selectedLanguage == 'NL' ? langButtonActive : langButtonInactive)} onClick={(e) => { selectLanguage(LANG_NL); e.stopPropagation(); } }>
        <FlagNL />
      </IconButton>
      <IconButton style={(selectedLanguage == 'US' ? langButtonActive : langButtonInactive)} onClick={(e) => { selectLanguage(LANG_US); e.stopPropagation(); } }>
        <FlagUS />
      </IconButton>
    </Stack>
  );

  const handleDarkmodeChange = () => {
    _setDarkmodeSetting(!_darkmodeSetting);
    setDarkmodeSetting(!_darkmodeSetting);
  }

  const handleGraphicsChange = (setting) => {
    _setGraphicsSetting(setting);
    setGraphicsSetting(setting);
  }
  
  const optionsContent = (
    <Grid id="options-content" container>
      <FlexList noHeader mode="list">
        <Accordion headerText='Game Language'>
          {languagePicker}
        </Accordion>
        <Accordion headerText='Graphics & Performance'>
          <FlexList noHeader mode="flex">
            {_graphicsSetting}
            <ActionButton text="Best Graphics" func={() => {handleGraphicsChange(GLOBALS.ENUMS.SETTINGS.GRAPHICS.BEST)}} />
            <ActionButton text="Normal" func={() => {handleGraphicsChange(GLOBALS.ENUMS.SETTINGS.GRAPHICS.DEFAULT)}} />
            <ActionButton text="Best Performance" func={() => {handleGraphicsChange(GLOBALS.ENUMS.SETTINGS.GRAPHICS.WORST)}} />
          </FlexList>
        </Accordion>
        <Accordion headerText='Interface Settings'>
          <FlexList noHeader mode="list">
            <div>
              <label htmlFor="darkmode-switch" onClick={(e) => {e.stopPropagation();}}> Theme</label>
              <Switch id="darkmode-switch" className='switch' checked={_darkmodeSetting} onChange={() => {handleDarkmodeChange();}} onClick={(e) => {e.stopPropagation();}}/>
              <label htmlFor="darkmode-switch" onClick={(e) => {e.stopPropagation();}}>{(_darkmodeSetting ? "Darkmode" : "Lightmode")}</label>
            </div>
          </FlexList>
        </Accordion>
        <Accordion headerText='Encounters, Notifications and Pop-Ups'>
          <FlexList noHeader mode="list">
            <div>nothing yet</div>
          </FlexList>
        </Accordion>
      </FlexList>
    </Grid>
  )

  const handleClose = (event, reason) => {
    onClose(event, reason);
  };

  const handleListItemClick = (value, amount) => {
    onClose({value: value, amount: amount});
  };

  return (
    <Dialog className='options-dialog dialog' onClose={handleClose} open={open}>
      <DialogTitle style={{textAlign: 'center', width: 'min-content', margin: '0 auto'}}>
        <div style={{scale: '3'}}><FontAwesomeIcon icon="fa-solid fa-gears" /></div>
      </DialogTitle>
      <DialogTitle style={{textAlign: 'center', padding: '6px'}}>
        Options
      </DialogTitle>
      <Paper className='dialog-content'>
        {optionsContent}
      </Paper>
      <div className='dialog-buttons'>
        <ActionButton color='gathering' variant='contained' func={() => {handleListItemClick("close")}} text={"Close"}/>
      </div>
    </Dialog>
  );
}

OptionsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  setDarkmodeSetting: PropTypes.func.isRequired,
  darkmodeSetting: PropTypes.bool.isRequired,
  setGraphicsSetting: PropTypes.func.isRequired,
  graphicsSetting: PropTypes.number.isRequired,
};

export default OptionsModal