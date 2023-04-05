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
import CircleIcon from '@mui/icons-material/Circle';
import Interview from './interview';

// https://codesandbox.io/s/ufxciz?file=/demo.tsx:5499-5574

const data = [
    { icon: <CircleIcon style={{ color: 'gray', borderRadius: 12, fontSize: 12 }} />, label: 'All' },
    { icon: <CircleIcon style={{ color: '#FFB7B7', borderRadius: 12, fontSize: 12 }} />, label: 'Problem Solving' },
    { icon: <CircleIcon style={{ color: '#FFDD80', borderRadius: 12, fontSize: 12 }} />, label: 'Database' },
    { icon: <CircleIcon style={{ color: '#B9FFA6', borderRadius: 12, fontSize: 12 }} />, label: 'Object Orinted Programming' },
];

const ControlCalendar = () => {

    const [toggledAgenda, setToggleAgenda] = React.useState(false);
    const [toggledDetails, setToggleDetails] = React.useState(false);
    const [toggledInterview, setToggleInterview] = React.useState(false);
    const [toggledCategories, setToggleCategories] = React.useState(true);

    return (
        <div>
            <Box sx={{
                color: 'black',
                pb: toggledCategories ? 2 : 0,
            }}>

                <ListItemButton
                    alignItems="flex-start"
                    onClick={() => setToggleCategories(!toggledCategories)}
                    sx={{
                        p: 3,
                        '&:hover, &:focus': { '& svg': { opacity: toggledCategories ? 1 : 0 } },
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
                        secondary="Tap for more."
                        secondaryTypographyProps={{
                            noWrap: true,
                            fontSize: 12,
                            lineHeight: '1px',
                            color: toggledCategories ? 'transparent' : 'transparent',
                        }}
                        sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                        sx={{
                            mr: -1,
                            opacity: 0,
                            transform: toggledCategories ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.2s',
                        }}
                    />
                </ListItemButton>
                {toggledCategories &&
                    data.map((item) => (
                        <ListItemButton
                            key={item.label}
                            sx={{ py: 0, minHeight: 32, color: 'black', fontFamily: 'urbanist' }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', fontFamily: 'urbanist' }}
                            />
                        </ListItemButton>
                    ))}
            </Box>
            <Box sx={{
                color: 'black',
                pb: toggledAgenda ? 2 : 0,
            }}>

                <ListItemButton
                    alignItems="flex-start"
                    onClick={() => setToggleAgenda(!toggledAgenda)}
                    sx={{
                        p: 3,
                        '&:hover, &:focus': { '& svg': { opacity: toggledAgenda ? 1 : 0 } },
                    }}
                    disabled
                >
                    <ListItemText
                        primary="Agenda"
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontFamily: 'urbanist',
                            fontWeight: 'medium',
                            lineHeight: '20px',
                            mb: '2px',
                        }}
                        secondary="Tap for more."
                        secondaryTypographyProps={{
                            noWrap: true,
                            fontSize: 12,
                            lineHeight: '1px',
                            color: toggledAgenda ? 'transparent' : 'transparent',
                        }}
                        sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                        sx={{
                            mr: -1,
                            opacity: 0,
                            transform: toggledAgenda ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.2s',
                        }}
                    />
                </ListItemButton>
                {toggledAgenda &&
                    data.map((item) => (
                        <ListItemButton
                            key={item.label}
                            sx={{ py: 0, minHeight: 32, color: 'black', fontFamily: 'urbanist' }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', fontFamily: 'urbanist' }}
                            />
                        </ListItemButton>
                    ))}
            </Box>
            <Box sx={{
                color: 'black',
                pb: toggledInterview ? 2 : 0,
            }}>

                <ListItemButton
                    alignItems="flex-start"
                    onClick={() => setToggleInterview(!toggledInterview)}
                    sx={{
                        p: 3,
                        '&:hover, &:focus': { '& svg': { opacity: toggledInterview ? 1 : 0 } },
                    }}
                >
                    <ListItemText
                        primary="Interview"
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontFamily: 'urbanist',
                            fontWeight: 'medium',
                            lineHeight: '20px',
                            mb: '2px',
                        }}
                        secondary="Tap for more."
                        secondaryTypographyProps={{
                            noWrap: true,
                            fontSize: 12,
                            lineHeight: '1px',
                            color: toggledInterview ? 'transparent' : 'transparent',
                        }}
                        sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                        sx={{
                            mr: -1,
                            opacity: 0,
                            transform: toggledInterview ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.2s',
                        }}
                    />
                </ListItemButton>
                {toggledInterview && <Interview />}
            </Box>
            <Box sx={{
                color: 'black',
                pb: toggledDetails ? 2 : 0,
            }}>

                <ListItemButton
                    alignItems="flex-start"
                    onClick={() => setToggleDetails(!toggledDetails)}
                    sx={{
                        p: 3,
                        '&:hover, &:focus': { '& svg': { opacity: toggledDetails ? 1 : 0 } },
                    }}
                    disabled
                >
                    <ListItemText
                        primary="Details"
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontFamily: 'urbanist',
                            fontWeight: 'medium',
                            lineHeight: '20px',
                            mb: '2px',
                        }}
                        secondary="Tap for more."
                        secondaryTypographyProps={{
                            noWrap: true,
                            fontSize: 12,
                            lineHeight: '1px',
                            color: toggledDetails ? 'transparent' : 'transparent',
                        }}
                        sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                        sx={{
                            mr: -1,
                            opacity: 0,
                            transform: toggledDetails ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.2s',
                        }}
                    />
                </ListItemButton>
                {toggledDetails &&
                    data.map((item) => (
                        <ListItemButton
                            key={item.label}
                            sx={{ py: 0, minHeight: 32, color: 'black', fontFamily: 'urbanist' }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', fontFamily: 'urbanist' }}
                            />
                        </ListItemButton>
                    ))}
            </Box>
        </div>

    );

}

export default ControlCalendar;