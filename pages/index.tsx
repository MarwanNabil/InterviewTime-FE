import * as React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

//Logo
import Logo from "@public/images/logos-v4/logo-no-background.png"

//UI
import Image from 'next/image'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from 'react-pro-sidebar';
import NavBar from '@components/Navbar/index';

//Single Pages
import LandingPage from '@components/SinglePages/LandingPage';
import CalendarPage from '@components/SinglePages/Calendar';
import Profile from '@components/SinglePages/Profile';

import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function View() {

    //react-pro-sidebar staff
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();

    const factor = 1;
    const logoW = Logo.width * factor;
    const logoH = Logo.height * factor;

    //Hooks
    const location = useLocation();
    const [currentActivePath, setActiveCurrentPath] = React.useState(location.pathname);

    React.useEffect(() => {

        setActiveCurrentPath(location.pathname);

    }, [location.pathname]);


    //Sidebar
    const buttonSideBarStyle: React.CSSProperties = {
        backgroundColor: '#ffffff', border: "1px solid",
        borderRadius: 4, borderColor: '#e2e1e4'
    };

    const notActiveIconButtonSideBarStyle: React.CSSProperties = { fontSize: 18, color: '#d7d7d7' };
    const activeIconButtonSideBarStyle: React.CSSProperties = { fontSize: 18, color: '#447dc0' };


    return (
        <div style={{ display: 'flex', height: '99.8vh' }}>
            <Sidebar backgroundColor='#fafcfe' defaultCollapsed rootStyles={{
                [`.${sidebarClasses.container}`]: { backgroundColor: '#FAFCFE', border: "1px solid", borderRadius: 4, borderColor: '#e2e1e4', },
            }}
            >
                <Menu>
                    <div style={{ padding: 6, marginBlock: 30 }}>
                        <Image src={Logo} width={logoW} height={logoH} />
                    </div>

                    <MenuItem component={<Link to='/' />}>
                        <IconButton style={buttonSideBarStyle}>
                            <HomeIcon style={currentActivePath === '/' ? activeIconButtonSideBarStyle : notActiveIconButtonSideBarStyle} />
                        </IconButton>
                    </MenuItem>

                    <MenuItem component={<Link to='/calendar' />}>
                        <IconButton style={buttonSideBarStyle}>
                            <CalendarMonthIcon style={currentActivePath === '/calendar' ? activeIconButtonSideBarStyle : notActiveIconButtonSideBarStyle} />
                        </IconButton>
                    </MenuItem>

                    <MenuItem component={<Link to='/profile' />}>
                        <IconButton style={buttonSideBarStyle}>
                            <AccountBoxIcon style={currentActivePath === '/profile' ? activeIconButtonSideBarStyle : notActiveIconButtonSideBarStyle} />
                        </IconButton>
                    </MenuItem>

                    <MenuItem component={<Link to='/settings' />}>
                        <IconButton style={buttonSideBarStyle}>
                            <SettingsIcon style={currentActivePath === '/settings' ? activeIconButtonSideBarStyle : notActiveIconButtonSideBarStyle} />
                        </IconButton>
                    </MenuItem>

                    <MenuItem component={<Link to='/logout' />}>
                        <IconButton style={buttonSideBarStyle}>
                            <LogoutIcon style={currentActivePath === '/logout' ? activeIconButtonSideBarStyle : notActiveIconButtonSideBarStyle} />
                        </IconButton>
                    </MenuItem>

                </Menu>
            </Sidebar>
            <main style={{ flex: 1, overflowY: "auto" }}>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/calendar' element={
                        <>
                            <NavBar />
                            <CalendarPage />
                        </>
                    } />
                    <Route path='/profile' element={
                        <>
                            <Profile />
                        </>
                    } />
                </Routes>
            </main >
        </div >
    )
}
