import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Paper } from '@mui/material';

import FlexList from '../flexlist/FlexList';
import ActionButton from '../ActionButton';

import AspectCollection from '../aspects/AspectCollection';

import './modal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SacrificeModal({ options, header, onClose, open }) {

  const handleClose = (event, reason) => {
    onClose(event, reason);
  };

  const handleListItemClick = (value, amount) => {
    onClose({value: value, amount: amount});
  };

  const aspectsToList = (aspectDict, scale = 1) => {
    let output = [];
    for (let key in aspectDict) {
      output.push({name:key, amount:aspectDict[key], scale:scale});
    }
    return output;
  };

  return (
    <Dialog className='picker-dialog dialog' onClose={handleClose} open={open}>
    <DialogTitle style={{textAlign: 'center', width: 'min-content', margin: '0 auto'}}>
      <div style={{scale: '3'}}><FontAwesomeIcon icon="fa-solid fa-hurricane"/></div>
    </DialogTitle>
      <DialogTitle style={{textAlign: 'center', padding: '6px'}}>{header}</DialogTitle>
      <Paper className='dialog-content'>
        <div className='dialog-text'>Sacrifice your caught Fish to gain powerful Aspects which will boost many things</div>
          <FlexList noHeader mode='list'>
            {options.map((opt) => (
              <Paper className="sacrifice-item" key={opt.itemID}>
                <div className="sacrifice-item-icon">{opt.icon}</div>
                <div className="sacrifice-item-name">{opt.itemName}</div>
                <div className="sacrifice-item-aspects">
                  <AspectCollection collection = {aspectsToList(opt.aspects)}></AspectCollection>
                </div>
                <div className="sacrifice-item-buttons">
                  <ActionButton color='queen' variant='text' func={() => {handleListItemClick(opt.itemID, 1)}} text={"1"}/>
                  <ActionButton color='queen' variant='text' func={() => {handleListItemClick(opt.itemID, 10)}} text={"10"}/>
                  <ActionButton color='queen' variant='text' func={() => {handleListItemClick(opt.itemID, 100)}} text={"100"}/>
                </div>
              </Paper>
            ))}
          </FlexList>
        </Paper>
        <div className='dialog-buttons'>
          <ActionButton color='tutorial' variant='contained' func={() => {handleListItemClick("close")}} text={"Done"}/>
        </div>
    </Dialog>
  );
}

SacrificeModal.propTypes = {
  options: PropTypes.array.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SacrificeModal