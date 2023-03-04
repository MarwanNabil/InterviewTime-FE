import * as React from 'react';

//UI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//Helpers
import pageI from '@helpers/Interfaces/Page';
import { Numbers } from '@mui/icons-material';

interface NavBarProps {
    tabs?: Array<pageI>,
    settings?: Array<pageI>,
    activePageHook?: {
        activePageValue: number,
        activePageHandler: (event: React.SyntheticEvent, newValue: number) => void
    },
}

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar(props: NavBarProps) {
    const tabs = props.tabs;
    const settings = props.settings;

    const activePageValue = props.activePageHook!.activePageValue;
    const activePageHandler = props.activePageHook!.activePageHandler;

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settingsOnChangeHandler = (event: React.SyntheticEvent | React.MouseEvent, settingId: number) => {
        activePageHandler(event, settingId);
        console.log(settingId)
    }

    let settingsStartIndex = 0;
    if (tabs && tabs.length) {
        settingsStartIndex = tabs.length
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 20,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            fontSize: 30,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        Interview Time
                    </Typography>
                    <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
                        <Tabs value={activePageValue} onChange={activePageHandler} indicatorColor="secondary" textColor='inherit'>
                            {tabs && tabs.map(item =>
                                <Tab label={item.label} sx={{ color: 'white', display: 'block', my: 2, fontWeight: 700, }} />
                            )}
                        </Tabs>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings && settings.map((setting, index) => (
                                <MenuItem key={(settingsStartIndex + index).toString()} onClick={(event) => settingsOnChangeHandler(event, (settingsStartIndex + index))} selected={activePageValue == (settingsStartIndex + index)}>
                                    <Typography textAlign="center" >{setting.label}</Typography>
                                </MenuItem>
                            ))
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;