import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';

import Sidebar from '../../components/sidebar/Sidebar'
import Theme from '../../styles/Theme.jsx';

Layout.propTypes = {
    sidebar: PropTypes.bool,
    children: PropTypes.object,
};

function Layout({sidebar = true, children}) {
    return (
        <>
        <ThemeProvider theme={Theme}>
            {sidebar && <Sidebar/>}
            {children}
        </ThemeProvider>
        </>
    )
}

export default Layout;  