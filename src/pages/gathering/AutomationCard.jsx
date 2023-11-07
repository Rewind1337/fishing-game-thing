import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

import './AutomationCard.scss'

AutomationCard.propTypes = {
    icon: PropTypes.object,
    type: PropTypes.string,
    value: PropTypes.number,
};

function AutomationCard({icon, type, value}) {
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
    </Paper>);
}

export default AutomationCard;