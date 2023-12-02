import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Paper } from '@mui/material';

import FlexList from '../flexlist/FlexList';
import ActionButton from '../ActionButton';

import './modal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {format} from '../../utility/utility';  // eslint-disable-line no-unused-vars

function PreparationModal ({ options, header, onClose, open }) {

  const handleClose = (event, reason) => {
    event['modalType'] = options[0].type;
    onClose(event, reason);
  };

  const handleListItemClick = (type, value, amount) => {
    onClose({modalType: type, value: value, amount: amount});
  };

  const getTextColor = (selected, have) => {
    let p = selected / have;
    return (p < 0.75 ? 'white' : (p < 0.9 ? 'yellow' : 'red'));
  };

  const numberFormat = (selected, have, key) => {
    let output = "";

    const decimals = options[0].type == 'bait' && key == 0 ? 1 : 0;
    const divider = options[0].type == 'bait' && key == 0 ? 10 : 1;

    output += format(selected / divider, '.', decimals);
    output += "/";
    output += format(have / divider, '.', decimals)
    return output;
  };

  return (
    <Dialog className='picker-dialog' onClose={handleClose} open={open}>
    <DialogTitle style={{textAlign: 'center', width: 'min-content', margin: '0 auto'}}>
      <div style={{scale: '3'}}><FontAwesomeIcon icon="fa-solid fa-fish"/></div>
    </DialogTitle>
      <DialogTitle style={{textAlign: 'center', padding: '6px'}}>{header}</DialogTitle>
      <Paper className='dialog-content'>
        <div className='dialog-text'>{options[0].type == 'fish' ? "What Fish are you preparing as Bait?" : "What will you be bringing to the Fishing Trip?"}</div>
          <FlexList noHeader mode='list'>
            {options.map((opt) => (
              <Paper className="fishing-item" key={opt.key}>
                <div className="fishing-item-icon">{opt.icon}</div>
                <div className="fishing-item-name">{opt.itemName}</div>
                <div className="fishing-item-buttons">
                  <ActionButton color='queen' variant='text' disabled={opt.key == 0} func={() => {handleListItemClick(opt.type, opt.itemID, -10)}} text={opt.key == 0 ? "X" : "-10"}/>
                  <ActionButton color='queen' variant='text' disabled={opt.key == 0} func={() => {handleListItemClick(opt.type, opt.itemID, -1)}} text={opt.key == 0 ? "X" : "-1"}/>
                </div>
                <Paper title={name} className='selector-card' elevation={1}>
                  <div className="fishing-item-amount" style={{color:getTextColor(opt.amountSelected, opt.amountHave)}}>{numberFormat(opt.amountSelected, opt.amountHave, opt.key)}</div>
                </Paper>
                <div className="fishing-item-buttons">
                  <ActionButton color='gathering' variant='text' disabled={opt.key == 0} func={() => {handleListItemClick(opt.type, opt.itemID, +1)}} text={opt.key == 0 ? "X" : "+1"}/>
                  <ActionButton color='gathering' variant='text' disabled={opt.key == 0} func={() => {handleListItemClick(opt.type, opt.itemID, +10)}} text={opt.key == 0 ? "X" : "+10"}/>
                </div>
              </Paper>
            ))}
          </FlexList>
        </Paper>
        <div className='dialog-buttons'>
          <ActionButton color='queen' variant='outlined' func={() => {handleListItemClick(options[0].type, "close")}} text={"Back"}/>
          <ActionButton color='gathering' variant='outlined' func={() => {handleListItemClick(options[0].type, "confirm")}} text={"Submit"}/>
        </div>
    </Dialog>
  );
}

PreparationModal.propTypes = {
  options: PropTypes.array.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PreparationModal