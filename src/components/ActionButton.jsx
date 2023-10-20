import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import useTranslation from '../context/useTranslation'

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import './ActionButton.scss'

ActionButton.propTypes = {
    sx: PropTypes.object,
    dontTranslate: PropTypes.bool,
    link: PropTypes.string,
    langpath: PropTypes.string,
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

function ActionButton({ sx = {}, dontTranslate = false, link, langpath = "buttons", disabled = false, id, startIcon, endIcon, onlyIcon = false, color = 'primary', variant = 'contained', icon,  text = color, func = () => {}}) {
    text = useTranslation(langpath, text, dontTranslate);

    const handleClick = () => {func()}

    const classes = 'actionbutton '

    if (variant == "contained") {
        sx.border = "1px solid white";
    }

    if (onlyIcon) {
        return (<IconButton color={color} disabled={disabled} id={id} variant={variant} onClick={handleClick}>{icon}</IconButton>)
    }

    if (link) {
        return (
            <Link to={link}>
                <Button sx={sx} color={color} startIcon={startIcon} endIcon={endIcon} disabled={disabled} id={id} variant={variant} className={classes} onClick={handleClick}>{text}</Button>
            </Link>
        )
    }
    
    return (
        <>
            <Button sx={sx} color={color} startIcon={startIcon} endIcon={endIcon} disabled={disabled} id={id} variant={variant} className={classes} onClick={handleClick}>{text}</Button>
        </>
    )
    
}
    
export default ActionButton;