import { Paper } from "@mui/material";
import PropTypes from 'prop-types';
import Unicode from '../../components/Unicode'

export default function AspectCard({c, name, iconscale = "1", color = 'white', amount, effect}) {

    return (
      <Paper title={name} className='aspect-card' elevation={1}>
        <Unicode c={c} color={color} iconscale={iconscale}/>
        <div className='aspect-card-name truncate-text'>{name}</div>
        <div className='aspect-card-amount' style={{width: '100px'}}>{amount}</div>
        <div className='aspect-card-effect truncate-text'>{effect}</div>
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