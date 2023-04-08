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
import Button from '@mui/material/Button';
import Interview from './interview';

import { interviewUIArray } from "@helpers/index";
import Stack from '@mui/material/Stack';

// https://codesandbox.io/s/ufxciz?file=/demo.tsx:5499-5574

type ControlCalendarProps = {
    activeCategoryIndex: Number,
    setActiveCategoryIndexHandler: any,
}


const ControlCalendar = ({ activeCategoryIndex, setActiveCategoryIndexHandler }: ControlCalendarProps) => {

    //Categories
    const categoryDataUI = [
        { icon: <CircleIcon style={{ color: 'gray', borderRadius: 12, fontSize: 12 }} />, label: 'All' }
    ];

    interviewUIArray.forEach((item, index) => {
        if (item.code !== 'NA')
            categoryDataUI.push({ icon: <CircleIcon style={{ color: item.color.solid, borderRadius: 12, fontSize: 12 }} />, label: item.name })
    })

    const [toggledAgenda, setToggleAgenda] = React.useState(false);
    const [toggledDetails, setToggleDetails] = React.useState(true);
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
                            fontSize: 16,
                            fontWeight: 600,
                            lineHeight: '20px',
                            mb: '2px',
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
                    categoryDataUI.map((item, index) => (
                        <ListItemButton
                            key={item.label}
                            sx={{ py: 0, minHeight: 32, color: 'black' }}
                            onClick={() => setActiveCategoryIndexHandler(index)}
                            selected={index === activeCategoryIndex}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
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
                            fontSize: 16,
                            fontWeight: 600,
                            lineHeight: '20px',
                            mb: '2px',
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
                    categoryDataUI.map((item) => (
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
                            fontSize: 16,
                            fontWeight: 600,
                            lineHeight: '20px',
                            mb: '2px',
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
        </div>

    );

}

export default ControlCalendar;