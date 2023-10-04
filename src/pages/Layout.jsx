import PropTypes from 'prop-types';

import Sidebar from '../components/Sidebar'

Layout.propTypes = {
    children: PropTypes.array,
};

function Layout({children}) {
    return (
        <>
            <Sidebar/>
            {children}
        </>
    )
}

export default Layout;  