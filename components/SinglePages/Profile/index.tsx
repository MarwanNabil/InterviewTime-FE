//UI
import * as React from 'react';

//Hooks
import { useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';

//Components
import FeedbackTable from "./FeedbackTable"
import ProfileTab from "./ProfileTab"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfilePage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box style={{ backgroundColor: "#f5f5f5", paddingBlock: 50, display: 'flex', flexDirection: "column", rowGap: 30 }}>
            <div style={{ paddingInline: 40 }}>
                <ProfileTab />
            </div>
            <div style={{ backgroundColor: "white" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "white" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Feedback" {...a11yProps(0)} />
                    </Tabs>
                </Box>
                <Container maxWidth="xl" sx={{ height: '70vh' }}>
                    <TabPanel value={value} index={0}>
                        <FeedbackTable />
                    </TabPanel>
                </Container>
            </div>
        </Box >
    );
}
