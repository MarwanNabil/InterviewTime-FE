import * as React from 'react';

//Helpers
import { Routes, Route, Link } from 'react-router-dom';

//UI
import Button from '@mui/material/Button';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from 'react-pro-sidebar';


//Single Pages
import CalendarPage from '@components/SinglePages/Calendar';
import Profile from '@components/SinglePages/Profile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import IconButton from '@mui/material/IconButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export default function LandingPage() {

    //react-pro-sidebar staff
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();



    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar backgroundColor='#fafcfe' defaultCollapsed rootStyles={{
                [`.${sidebarClasses.container}`]: {},
            }}
            >
                <Menu>
                    <MenuItem component={<Link to='/calendar' />}>
                        <IconButton style={{
                            backgroundColor: '#ffffff', border: "1px solid", borderRadius: 4, borderColor: '#e2e1e4',
                        }}>
                            <CalendarMonthIcon style={{ color: '#447dc0', fontSize: 18 }} />
                        </IconButton>
                    </MenuItem>
                    <MenuItem component={<Link to='/profile' />}>
                        <IconButton style={{
                            backgroundColor: '#ffffff', border: "1px solid", borderRadius: 4, borderColor: '#e2e1e4',
                        }}>
                            <AccountBoxIcon style={{ fontSize: 18, color: '#d7d7d7' }} />
                        </IconButton>
                    </MenuItem>
                </Menu>
            </Sidebar>
            <main style={{ flex: 1 }}>
                <div style={{ height: '10vh' }}>

                </div>
                <Routes>
                    <Route path='/profile' element={
                        <Profile />
                    } />
                    <Route path='/calendar' element={<CalendarPage />} />
                    {/* <Route path='/profile' element={<Profile />} /> */}
                </Routes>
            </main>
        </div >
    )
}