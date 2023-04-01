import * as React from 'react';

//MUI
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';


//Components
import CalendarTool from "./calendar";

const data = [
    { icon: <People />, label: 'All' },
    { icon: <Dns />, label: 'Problem Solving' },
    { icon: <PermMedia />, label: 'Database' },
    { icon: <Public />, label: 'Object Orinted Programming' },
];

export default function CalendarPage() {
    const [open, setOpen] = React.useState(true);

    return (
        <div style={{ display: 'flex', height: '90vh', borderTop: 'solid', borderTopWidth: 'thin', borderTopColor: '#efefef' }}>
            <div style={{ flex: 3, borderRight: 'solid', borderRightWidth: 'thin', borderRightColor: '#efefef' }}>
                <Box sx={{
                    color: 'black',
                    pb: open ? 2 : 0,
                }}>

                    <ListItemButton
                        alignItems="flex-start"
                        onClick={() => setOpen(!open)}
                        sx={{
                            px: 3,
                            pt: 2.5,
                            pb: open ? 0 : 2.5,
                            '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                        }}
                    >
                        <ListItemText
                            primary="Categories"
                            primaryTypographyProps={{
                                fontSize: 15,
                                fontFamily: 'urbanist',
                                fontWeight: 'medium',
                                lineHeight: '20px',
                                mb: '2px',
                            }}
                            secondaryTypographyProps={{
                                noWrap: true,
                                fontSize: 12,
                                lineHeight: '16px',
                                color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                            }}
                            sx={{ my: 0 }}
                        />
                        <KeyboardArrowDown
                            sx={{
                                mr: -1,
                                opacity: 0,
                                transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                                transition: '0.2s',
                            }}
                        />
                    </ListItemButton>
                    {open &&
                        data.map((item) => (
                            <ListItemButton
                                key={item.label}
                                sx={{ py: 0, minHeight: 32, color: 'black', fontFamily: 'urbanist' }}
                            >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', fontFamily: 'urbanist' }}
                                />
                            </ListItemButton>
                        ))}
                </Box>

                {/* <h1 style={{ fontFamily: 'urbanist', fontSize: 18 }}>Categories</h1> */}
            </div>
            <div style={{ flex: 12 }}>
                < CalendarTool />
            </div>
        </div >
    );
}
