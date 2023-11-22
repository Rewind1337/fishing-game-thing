import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

import './AutomationCard.scss'
import ActionButton from '../../components/ActionButton';

AutomationCard.propTypes = {
    icon: PropTypes.object,
    type: PropTypes.string,
    value: PropTypes.string,
    color: PropTypes.string,
};

function AutomationCard({icon, type, value, color}) {
    return (<Paper elevation={1} className={"automation-card"} sx={{border: '1px solid rgba(255, 255, 255, 0.5)', backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        <div className="automation-card-icon">
            {icon}
        </div>
        <div className="automation-card-name">
            {type}
        </div>
        <div className="automation-card-value">
            {value}
        </div>
        {type == "Guaranteed Encounter" && 
        <div className="automation-card-button">
            <ActionButton disabled text="0 / 30" variant='contained' color={color}/>
        </div>
        }
    </Paper>);
}

export default AutomationCard;