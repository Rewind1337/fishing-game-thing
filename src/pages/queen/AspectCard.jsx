import { Paper } from "@mui/material";
import PropTypes from 'prop-types';
import Unicode from '../../components/Unicode'

export default function AspectCard({c, name, iconscale = 1, color = 'white', amount, effect}) {
    return (
      <Paper title={name} className='aspect-card' elevation={1} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', borderLeft: '0', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center'}}>
        <Unicode c={c} color={color} iconscale={iconscale} style={{border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '4px'}}/>
        <div className='aspect-card-amount' style={{width: '100px'}}>{amount}</div>
        <div className='aspect-card-effect' style={{width: 'auto', borderLeft: '1px solid rgba(255, 255, 255, 0.5)', flexGrow: '1'}}>{effect}</div>
      </Paper>
    )
  }

  AspectCard.propTypes = {
    c: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconscale: PropTypes.string,
    color: PropTypes.string,
    amount: PropTypes.number.isRequired,
    effect: PropTypes.string.isRequired,
  };