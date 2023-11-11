import GLOBALS from '../../globals/Globals';
import PropTypes from 'prop-types';
import Unicode from '../../components/Unicode'
import FlexList from '../flexlist/FlexList';
import { Paper } from '@mui/material';

export default function AspectIcon({ amount, name, aspectKey, scale = 1 }) {

  const aspects = GLOBALS.DB.ASPECTS;
  const unicodeFrations = [1, '½', '⅓', '¼', '⅕', '⅙', '⅐', '⅛', '⅑', '⅒'];

  if (amount < 1) {
    return (
      <FlexList noHeader mode={'flex'}>
        <Paper title={name} className='aspect-card' elevation={0} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '0', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
          <div>{unicodeFrations[~~(1/amount) - 1]}</div>
        </Paper>
        <Paper title={name} className='aspect-card' elevation={0} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '0', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
          <div>{(name || "")}</div>
        </Paper>
        <Paper title={name} className='aspect-card' elevation={0} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '0', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
          <Unicode c={aspects[aspectKey].c} color={aspects[aspectKey].color} iconscale={aspects[aspectKey].iconscale * scale} style={{border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px'}}/>
        </Paper>
      </FlexList>
    );
  } else {
    return (
      <FlexList noHeader>
        <Paper title={name} className='aspect-card' elevation={0} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '0', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
          <div>{(amount || "")}</div>
        </Paper>
        <Paper title={name} className='aspect-card' elevation={0} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '0', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
          <div>{(name || "")}</div>
        </Paper>
        <Paper title={name} className='aspect-card' elevation={0} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '0', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
          <Unicode c={aspects[aspectKey].c} color={aspects[aspectKey].color} iconscale={aspects[aspectKey].iconscale * scale} style={{border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px'}}/>
        </Paper>
      </FlexList>
    );
  }
}

AspectIcon.propTypes = {
  amount: PropTypes.number,
  name: PropTypes.string,
  aspectKey: PropTypes.string.isRequired,
  scale: PropTypes.number,
};