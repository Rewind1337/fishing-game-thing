import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';

import Sidebar from '../../components/sidebar/Sidebar'
import Theme from '../../styles/Theme.jsx';

Layout.propTypes = {
    children: PropTypes.object,
};

function Layout({children}) {
    return (
        <>
        <ThemeProvider theme={Theme}>
            <Sidebar/>
            {children}
        </ThemeProvider>
        </>
    )
}

export default Layout;  