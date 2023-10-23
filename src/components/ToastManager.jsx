import { Alert, Slide, Snackbar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import SaveContext from '../context/SaveContext';

function ToastManager() {
    const _context = useContext(SaveContext);

    function SlideTransition(props) {return <Slide {...props} direction="up" />}

    const [state, setState] = useState({open: false, severity: "success", text: "Test Message"});

    const setRefs = _context.setRefs;

    const transition = SlideTransition

    const fireToast = (severity, text) => {
        setState({
            open: true,
            severity: severity,
            text: text,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setState({
            open: false,
            severity: state.severity,
            text: state.text
        });
    };
  
    useEffect(() => {
      setRefs({toastmanager: {'fireToast' : fireToast}});
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
        <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        sx={{ bottom: "52px !important", right: "4px !important" }}
        TransitionComponent={transition}>
            <Alert onClose={handleClose} severity={state.severity}>
                {state.text}
            </Alert>
        </Snackbar>
    );  
}

export default ToastManager;