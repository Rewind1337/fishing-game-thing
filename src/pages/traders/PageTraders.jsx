// Boiler (kinda)
import PropTypes from 'prop-types';
import { useContext, useState, useEffect, useRef } from 'react';  // eslint-disable-line no-unused-vars
import SaveContext from '../../context/SaveContext';
import GLOBALS from '../../globals/Globals';  // eslint-disable-line no-unused-vars
import PageCore from '../core/PageCore';

// Components
import ActionButton from '../../components/ActionButton';

// MUI
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from "@mui/material";

// JS Utility
import { format } from '../../utility/utility';  // eslint-disable-line no-unused-vars
import resourceHook from '../../utility/resourceHook';  // eslint-disable-line no-unused-vars

// CSS Styles
import './Traders.scss'
import FlexList from '../../components/flexlist/FlexList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Route: "/traders"
function PageTraders() {

  TraderCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
  }

  function TraderCard({id, name, color = "traders"}) {
    return (
      <Paper className='trader-card'>
        <div className='trader-card-icon'>
          <FontAwesomeIcon icon="fa-solid fa-frog" />
        </div>
        <div className='trader-card-name'>
          {name}
        </div>
        <div className='trader-card-button'>
          <ActionButton color={color} text={"Visit Shop"} func={() => {setSelectedTrader(id); setSelectedTraderName(name)}} variant='contained'/>
        </div>
        
      </Paper>
    )
  }

  TraderItemCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }

  function TraderItemCard({id, name}) {
    return (
      <Paper className='trader-item-card'>
        <div className='trader-item-card-icon'>
          <FontAwesomeIcon icon="fa-solid fa-frog" />
        </div>
        <div className='trader-item-card-name'>
          {name}
        </div>
        <div className='trader-item-card-amount-price'>
          1 for 17.52 T Worms
        </div>
        <div className='trader-item-card-button'>
          <ActionButton color="traders" text={"Buy"} func={() => {console.log(id)}} variant='contained'/>
        </div>
      </Paper>
    )
  }

  const [selectedTrader, setSelectedTrader] = useState(null)
  const [selectedTraderName, setSelectedTraderName] = useState(null)

  return (
    <PageCore pageID={GLOBALS.ENUMS.PAGES.TRADERS} title="Traders" contentClasses={'home'}>
      <Grid container mobile={12} flexGrow={1}spacing={0.5}>
        <Grid mobile={3}>
          <FlexList mode="list" headerText='List of available Traders'>
            <TraderCard id={1} name={"Frog Guy"}/>
            <TraderCard id={2} name={"Worm Girl"}/>
          </FlexList>
        </Grid>
        <Grid mobile={9} className="trader-grid">
          {selectedTrader != null && <FlexList mode="flex" headerText={selectedTraderName + "'s Shop"}>
            <TraderItemCard id={0} name={"Brand New Hook"}/>
            <TraderItemCard id={1} name={"Brand New Rod"}/>
            <TraderItemCard id={2} name={"Pack of Glow Worms"}/>
          </FlexList>}
        </Grid>
      </Grid>
    </PageCore>
  )
}

export default PageTraders;
