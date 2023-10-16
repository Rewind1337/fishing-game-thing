import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Paper } from '@mui/material';

import ActionButton from '../ActionButton';

import './modal.scss'

function BasicModal(props) {
  const { header, text, icon, onClose, open } = props;

  const handleClose = (event, reason) => {
    onClose(event, reason);
  };

  const handleListItemClick = (value, amount) => {
    onClose({value: value, amount: amount});
  };

  return (
    <Dialog className='basic-dialog' onClose={handleClose} open={open}>
      <DialogTitle style={{textAlign: 'center', width: 'min-content', margin: '0 auto'}}><div style={{scale: '3'}}>{icon}</div></DialogTitle>
      <DialogTitle style={{textAlign: 'center', padding: '6px'}}>{header}</DialogTitle>
        <Paper style={{padding: '16px'}}>
          <div className='dialog-text'>{text}</div>
          <div className='dialog-buttons'>
            <ActionButton color='tutorial' variant='outlined' func={() => {handleListItemClick("close")}} text={"Okay"}/>
            <ActionButton color='pets' variant='outlined' func={() => {handleListItemClick("close")}} text={"No U"}/>
          </div>
        </Paper>
    </Dialog>
  );
}

BasicModal.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string,
  icon: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default BasicModal