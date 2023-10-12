import PropTypes from 'prop-types';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Paper } from '@mui/material';

import FlexList from '../flexlist/FlexList';
import ActionButton from '../ActionButton';


function SacrificeModal(props) {
  const { options, header, onClose, open } = props;

  const handleClose = (event, reason) => {
    onClose(event, reason);
  };

  const handleListItemClick = (value, amount) => {
    onClose({value: value, amount: amount});
  };

  return (
    <Dialog className='picker-dialog' onClose={handleClose} open={open}>
      <DialogTitle style={{textAlign: 'center', padding: '6px'}}>{header}</DialogTitle>
      <FlexList noHeader mode='flex'>
        {options.map((opt) => (
          <Paper key={opt.itemID} style={{display: 'flex', flexDirection: 'row', alignContent: 'center', marginBottom: '2px', width: 'calc(calc(100% - 4px) / 2)'}}>
            <div style={{flexGrow: 1, alignSelf: 'center'}}>{opt.icon} {opt.itemID}</div>
            <ActionButton color='queen' variant='text' func={() => {handleListItemClick(opt.itemID, 1)}} text={"1"}/>
            <ActionButton color='queen' variant='text' func={() => {handleListItemClick(opt.itemID, 10)}} text={"10"}/>
            <ActionButton color='queen' variant='text' func={() => {handleListItemClick(opt.itemID, 100)}} text={"100"}/>
          </Paper>
        ))}
      </FlexList>
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