import PropTypes from 'prop-types';
import ToastManager from './components/ToastManager';

RouterWrapper.propTypes = {
  children: PropTypes.array.isRequired
}

function RouterWrapper({children}) {
    return (
        <>
        {children}
        <ToastManager/>
        </>
    );  
}

export default RouterWrapper;