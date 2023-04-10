import * as React from 'react';

//UI
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



//Helpers
import { IInterviewData, interviewUIArray } from '@helpers/Interview';
import Info from './Info';
import FeedbackEntry from './Feedback';


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
                    <Typography>{children}</Typography>
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(0),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}


type CalendarDialogProps = {
    interview: IInterviewData,
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
};

const CalendarDialog = ({ interview, openDialog, setOpenDialog }: CalendarDialogProps) => {

    const handleClose = () => {
        setOpenDialog((prev) => !prev);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                fullWidth={true}
                maxWidth="sm"
                open={openDialog}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {`Interview Details`}
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Info" {...a11yProps(0)} />
                        <Tab label="Feedback" {...a11yProps(1)} />
                    </Tabs>
                    <Container maxWidth="sm">
                        <TabPanel value={value} index={0}>
                            <Info interview={interview} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <FeedbackEntry interview={interview} />
                        </TabPanel>
                    </Container>
                </DialogContent>
                {/* <DialogActions>
                    <Button color='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    {/* Show Send Button With Feedback tab which has index 1 */}
                {/* {value === 1 &&
                        <Button color='error' onClick={handleClose}>
                            Send
                        </Button>
                    }
                </DialogActions>  */}
            </BootstrapDialog>
        </div>
    );
};

export default CalendarDialog;