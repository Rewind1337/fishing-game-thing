// Boiler (kinda)
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';
import { redirect } from "react-router-dom";

// Components
import ActionButton from '../../components/ActionButton';

// MUI
import Grid from '@mui/material/Unstable_Grid2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// JS Utility
import { format } from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Splash.scss'

// Route: "/home"
function PageSplash() {

  const _context = useContext(SaveContext);

  const [infoLocalSave, setInfoLocalSave] = useState({})
  const [saveExists, setSaveExists] = useState(false);

  const hasExistingSave = () => {
    if (localStorage.getItem("game-save") != null) {
      let _temp = JSON.parse(localStorage.getItem("game-save"));
      if (_temp.version == -1000) {
        return _temp;
      }
    }
    return false;
  }

  useEffect(() => {
    let save = hasExistingSave();
    if (save != false) {
      setSaveExists(true);
      setInfoLocalSave({save});
    }
  }, [])
  

  const loadExistingSave = () => {
    let save = hasExistingSave();
    if (save != false) {
      _context.setSave(save);
      advanceToHomePage();
    }
  }

  const startFresh = () => {advanceToHomePage();}

  const advanceToHomePage = () => {location = "/home"}

  const iconsPrefix = (<>
    <FontAwesomeIcon icon='fa-solid fa-fish'/>
    <FontAwesomeIcon icon='fa-solid fa-ghost'/>
    <FontAwesomeIcon icon='fa-solid fa-shrimp'/>
    <FontAwesomeIcon icon='fa-solid fa-worm'/>
    <FontAwesomeIcon icon='fa-solid fa-bore-hole'/>
    <FontAwesomeIcon icon='fa-solid fa-seedling'/>
    <FontAwesomeIcon icon='fa-solid fa-cloud'/>
    <FontAwesomeIcon icon='fa-solid fa-sun'/>
  </>);

  const iconsSuffix = (<>
    <FontAwesomeIcon icon='fa-solid fa-fish-fins'/>
    <FontAwesomeIcon icon='fa-solid fa-locust'/>
    <FontAwesomeIcon icon='fa-solid fa-water'/>
    <FontAwesomeIcon icon='fa-solid fa-floppy-disk'/>
    <FontAwesomeIcon icon='fa-solid fa-hurricane'/>
    <FontAwesomeIcon icon='fa-solid fa-snowflake'/>
    <FontAwesomeIcon icon='fa-solid fa-gear'/>
    <FontAwesomeIcon icon='fa-solid fa-heart'/>
  </>);

  return (
    <div id='splash-wrapper'>
      <div id='splash-content'>
        <div className='splash-header'>
          <div className='splash-colored-text'>{iconsPrefix} Fishing Game Thing {iconsSuffix}</div>
        </div>
        <div className='flex-row'>

          {saveExists == true && <div id='splash-use-local-save'>
            <div className='splash-subheader'>
              <div className='splash-colored-text'>Load from LS&nbsp;<small> (Localstorage)</small></div>
            </div>
            <div className='info-local-save'>
              <p>Save Version: {infoLocalSave.version}</p>
            </div>
            <div className='splash-action'>
              <ActionButton variant='contained' color='home' text={"Load"} func={() => {loadExistingSave()}}/>
            </div>
          </div>}

          <div id='splash-new-save'>
            <div className='splash-subheader'>
              <div className='splash-colored-text'>Start a new Save</div>
            </div>
            <div className='splash-action'>
              <ActionButton variant='contained' color='home' text={"Start Fresh"} func={() => {startFresh()}}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PageSplash;
