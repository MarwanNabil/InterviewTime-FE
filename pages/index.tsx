import * as React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

//Logo
import Logo from "@public/images/logos-v4/logo-no-background.png"

//UI
import Image from 'next/image'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from 'react-pro-sidebar';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



//Single Pages
import LoginPage from '@components/SinglePages/Login';
import CalendarPage from '@components/SinglePages/Calendar';
import Profile from '@components/SinglePages/Profile';

import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function LandingPage() {

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
        <div style={{ display: 'flex', height: '100vh' }}>
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
            <main style={{ flex: 1 }}>
                <div style={{ height: '10vh', display: 'flex', flex: 1, paddingInline: 20 }}>
                    <div style={{ flex: 5, }}>

                    </div>

                    <div style={{
                        flex: 1, display: "flex", flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                        <div style={{ flex: 1 }}>
                            <Stack direction="row" spacing={2}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    badgeContent={
                                        <div style={{
                                            fontFamily: 'urbistan', color: 'white', fontWeight: 600,
                                            backgroundColor: 'orange', padding: 3, borderRadius: 5,
                                            border: 'solid', borderWidth: 'thin',
                                            borderColor: '#ebbb3b', textShadow: '0px 0px 1px black'
                                        }}></div>
                                    }
                                >
                                    <NotificationsIcon style={{ color: '#5b595a' }} />
                                </Badge>
                            </Stack>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }} >
                            <div style={{ height: 30, backgroundColor: 'gray', width: 1 }} />
                        </div>
                        <div style={{
                            flex: 2, display: "flex", flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center',
                            columnGap: 15,
                        }}>
                            <IconButton>
                                <Stack direction="row" spacing={2}>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <div style={{
                                                fontFamily: 'urbistan', color: 'white', fontWeight: 600,
                                                backgroundColor: '#fbdb81', paddingBlock: 4, paddingInline: 6,
                                                borderRadius: 10, border: 'solid', borderWidth: 'thin',
                                                borderColor: '#ebbb3b', textShadow: '0px 0px 1px black'
                                            }}>3</div>
                                        }
                                    >
                                        <Avatar alt="Travis Howard" style={{ backgroundColor: '#5b595a' }} src="/static/images/avatar/2.jpg" />
                                    </Badge>
                                </Stack>
                            </IconButton>
                            <div style={{ display: 'flex', rowGap: 2, flexDirection: 'column' }}>
                                <span style={{ fontFamily: 'Urbanist', fontWeight: 600, color: 'black' }}>
                                    Marwan Nabil
                                </span>
                                <span style={{ color: 'gray', fontFamily: 'Urbanist', fontSize: 12 }}>
                                    marwan.nabil.eldeep@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/calendar' element={<CalendarPage />} />
                </Routes>
            </main >
        </div >
    )
}
