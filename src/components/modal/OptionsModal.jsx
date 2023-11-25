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

import ActionButton from '../ActionButton';
import Accordion from '../Accordion';

import './modal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlexList from '../flexlist/FlexList';
import { useState } from 'react';

const langButtonActive = {filter: 'blur(0)', outline: '1px solid rgba(255, 255, 255, 0.6)', outlineOffset: '-8px'};
const langButtonInactive = {filter: 'blur(1px'}

function OptionsModal({ onClose, open, selectLanguage, selectedLanguage, setDarkmode, darkmode }) {

  const [_darkmode, _setDarkmode] = useState(darkmode)

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

  const handleChange = () => {
    _setDarkmode(!_darkmode);
    setDarkmode(!_darkmode);
  }
  
  const optionsContent = (
    <Grid id="options-content" container>
      <FlexList noHeader mode="list">
        <Accordion headerText='Language Selection' open={true}>
          {languagePicker}
        </Accordion>
        <Accordion headerText='Interface Options' open={true}>
          <Switch
            id="darkmode-switch"
            className='switch'
            checked={_darkmode}
            onChange={() => {handleChange();}}
            onClick={(e) => {e.stopPropagation();}}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <label htmlFor="darkmode-switch" onClick={(e) => {e.stopPropagation();}}>{(_darkmode ? "Darkmode" : "Lightmode")}</label>
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
  setDarkmode: PropTypes.func.isRequired,
  darkmode: PropTypes.bool.isRequired,
};

export default OptionsModal