import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';

const Navbar = () => {

    return (<div style={{ height: '10vh', display: 'flex', flex: 1, paddingInline: 20 }}>
        <div style={{ flex: 5, }}>
            {/* NavBar top left part */}
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
                                    borderColor: '#ebbb3b', textShadow: '0px 0px 8px black'
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
    </div>);
};

export default Navbar;