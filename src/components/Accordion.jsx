import PropTypes from 'prop-types';
import { useState } from 'react';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './Accordion.scss'

Accordion.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    headerText: PropTypes.string.isRequired,
    open: PropTypes.bool
}
  
function Accordion({children, headerText, open = false}) {
    const [_open, setOpen] = useState(open);

    return <div className={'accordion ' + (_open ? "open" : "")} onClick={(e) => {setOpen(!_open); e.stopPropagation();}}>
        <div className='accordion-header'>{_open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}{headerText}</div>
            {_open && <div className='accordion-content'>
            {children}
        </div>}
    </div>
}

export default Accordion;