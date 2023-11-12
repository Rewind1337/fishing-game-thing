// current unused file since i changed it to just use the regular aspectCard thing

import GLOBALS from '../../globals/Globals';
import PropTypes from 'prop-types';
import Unicode from '../../components/Unicode'
import FlexList from '../flexlist/FlexList';
import { Paper } from '@mui/material';

export default function AspectIcon({ amount, name, aspectKey, scale = 1 }) {

  const aspects = GLOBALS.DB.ASPECTS;
  const unicodeFrations = [1, '½', '⅓', '¼', '⅕', '⅙', '⅐', '⅛', '⅑', '⅒'];

  const conditionalAmount = (
    <div className='aspect-card-amount'>
      {amount < 1 && <div>{unicodeFrations[~~(1/amount) - 1]}</div>}
      {amount >= 1 && <div>{(amount || "")}</div>}
    </div>
  )

  return (
    <Paper title={name} className='aspect-card'>
      <div className='aspect-card-icon'>
        <Unicode c={aspects[aspectKey].c} color={aspects[aspectKey].color} iconscale={"" + aspects[aspectKey].iconscale * scale}/>
      </div>
      {conditionalAmount}
      <div className='aspect-card-name'>
        <div>{(name || "")}</div>
      </div>
    </Paper>
  );
}

AspectIcon.propTypes = {
  amount: PropTypes.number,
  name: PropTypes.string,
  aspectKey: PropTypes.string.isRequired,
  scale: PropTypes.number,
};