import { useState } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import './ActionButton.css'


ActionButton.propTypes = {
    link: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    startIcon: PropTypes.object,
    endIcon: PropTypes.object,
    onlyIcon: PropTypes.bool,
    icon: PropTypes.object,
    color: PropTypes.string,
    variant: PropTypes.string,
    text: PropTypes.string,
    func: PropTypes.func,
}

function ActionButton({ link, disabled = false, id, startIcon, endIcon, onlyIcon = false, color = 'primary', variant = 'contained', icon,  text = 'placeholder', func = () => {}}) {

    const handleClick = () => {func()}

    const [disabledState, ] = useState(disabled)
    const classes = 'actionbutton '

    if (onlyIcon) {
        return (<IconButton color={color} disabled={disabledState} id={id} variant={variant} onClick={handleClick}>{icon}</IconButton>)
    }

    if (link) {
        return (
            <Link to={link}>
                <Button color={color} startIcon={startIcon} endIcon={endIcon} disabled={disabledState} id={id} variant={variant} className={classes} onClick={handleClick}>{text}</Button>
            </Link>
        )
    }
    
    return (
        <>
            <Button color={color} startIcon={startIcon} endIcon={endIcon} disabled={disabledState} id={id} variant={variant} className={classes} onClick={handleClick}>{text}</Button>
        </>
    )
    
}
    
export default ActionButton;