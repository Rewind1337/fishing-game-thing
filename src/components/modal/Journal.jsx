import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

// MUI 
import Grid from '@mui/material/Unstable_Grid2';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Paper } from '@mui/material';

import SaveContext from '../../context/SaveContext';
import ActionButton from '../ActionButton';

import './modal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlexList from '../flexlist/FlexList';
import GLOBALS from '../../globals/Globals';

const makeFishFancy = (val, index) => {
  let DB_FISH = GLOBALS.DB.FISH[index];

  return (
  <Paper key={index} elevation={1} className='fish-card'>
    <div className='fish-card-image'></div>
    <div className='fish-card-data'>
      <div className='fish-card-data-name'>{DB_FISH.name}&nbsp;{val}</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
        <div className='fish-card-data-rarity'>rarity: {DB_FISH.rarity}</div>
        <div className='fish-card-data-baitneeded'>bait: {DB_FISH.baitNeeded}</div>
      </div>
      <div className='fish-card-data-flavor'>{DB_FISH.flavor}</div>
    </div>
  </Paper>
  )
}

function Journal({ onClose, open }) {
  const _context = useContext(SaveContext);
  console.log(_context.save);

  const topics = ["Resources", "Fish", "Aspects", "Pets", "Equipment", "Fishing Locations", "Dungeons"]

  const [topic, setTopic] = useState(topics[0])

  const journalFish = (<>
    <FlexList mode="list" noHeader>
      {_context.save.resources.fishes.map((val, index) => {
        if (val > 0) {return makeFishFancy(val, index)}
      })}
    </FlexList>
  </>)

  const journalAspects = (<>
    <FlexList mode="list" noHeader>
      {Object.keys(_context.save.aspects).map((aspect, index) => {
        return <div style={{display: 'flex', borderRadius: "4px", border: "1px solid rgba(255, 255, 255, 0.5)"}} key={index}>
          <div>
            {aspect}
          </div>
          <div>
            {_context.save.aspects[aspect]}
          </div>
        </div>
      })}
    </FlexList>
  </>)
  
  const journalContent = (
    <Grid id="journal-content" container>
      <Grid mobile={3}>
        <ActionButton text={topics[0]} color='gathering' func={() => {setTopic(topics[0])}}/>
        <ActionButton text={topics[1]} color='fishing' func={() => {setTopic(topics[1])}}/>
        <ActionButton text={topics[2]} color='queen' func={() => {setTopic(topics[2])}}/>
        <ActionButton text={topics[3]} color='pets' func={() => {setTopic(topics[3])}}/>
        <ActionButton text={topics[4]} color='inventory' func={() => {setTopic(topics[4])}}/>
        <ActionButton text={topics[5]} color='fishing' func={() => {setTopic(topics[5])}}/>
        <ActionButton text={topics[6]} color='adventure' func={() => {setTopic(topics[6])}}/>
      </Grid>
      <Grid mobile={9}>
        {topic == topics[0] && <></>}
        {topic == topics[1] && journalFish}
        {topic == topics[2] && journalAspects}
        {topic == topics[3] && <></>}
        {topic == topics[4] && <></>}
        {topic == topics[5] && <></>}
        {topic == topics[6] && <></>}
        
        
      </Grid>
    </Grid>
  )

  const handleClose = (event, reason) => {
    onClose(event, reason);
  };

  const handleListItemClick = (value, amount) => {
    onClose({value: value, amount: amount});
  };

  return (
    <Dialog className='journal-dialog' onClose={handleClose} open={open}>
      <DialogTitle style={{textAlign: 'center', width: 'min-content', margin: '0 auto'}}>
        <div style={{scale: '3'}}><FontAwesomeIcon icon="fa-solid fa-book" /></div>
      </DialogTitle>
      <DialogTitle style={{textAlign: 'center', padding: '6px'}}>
        Journal
      </DialogTitle>
      <Paper className='dialog-content'>
        {journalContent}
      </Paper>
      <div className='dialog-buttons'>
        <ActionButton color='gathering' variant='contained' func={() => {handleListItemClick("close")}} text={"Close"}/>
      </div>
    </Dialog>
  );
}

Journal.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string,
  icon: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Journal