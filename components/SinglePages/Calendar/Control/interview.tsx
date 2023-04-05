//UI
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

//Helpers
import { InterviewTypesArray, dummyInterviewsTimes } from '@helpers/index';

const Interview = () => {
    //Schedule Hook
    const [openSchedule, setOpenSchedule] = React.useState(false);

    const scheduleOpen = () => {
        setOpenSchedule(true);
    };

    const scheduleClose = () => {
        setOpenSchedule(false);
    };

    //Diaglog Related
    const [interviewTypeIndex, setInterviewTypeIndex] = React.useState("0");

    const InterviewTypeChangeHandler = (event: SelectChangeEvent) => {
        setInterviewTypeIndex(event.target.value);
    };

    //Interviews Dates
    const [interviewDateValue, setInterviewDateValue] = React.useState('7/3');

    const interviewDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInterviewDateValue((event.target as HTMLInputElement).value);
    };


    //Time Suggestions
    const [timeIndex, setTimeIndex] = React.useState(-1);

    const onTimeClickHandler = (event: React.MouseEvent, key: number) => {
        setTimeIndex(key)
    }


    return (
        <div style={{ height: 400, overflowY: 'auto' }}>
            <DialogContent style={{ display: "flex", flexDirection: 'column', rowGap: 3 }}>
                {/* <DialogContentText style={{ fontFamily: 'urbanist' }}>
                    To schedule an interview, you should now your interview's type and its appointment.
                </DialogContentText> */}

                <FormControl sx={{ rowGap: 0.5, maxWidth: 600 }} size="small">
                    <FormLabel id="demo-select-small" style={{ fontFamily: 'urbanist' }}>Interview Type</FormLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={interviewTypeIndex + ""}
                        onChange={InterviewTypeChangeHandler}
                        style={{ fontFamily: 'urbanist' }}
                    >
                        {InterviewTypesArray.map(item => <MenuItem style={{ fontFamily: 'urbanist' }} value={item.code}>{item.name}</MenuItem>)}
                    </Select>
                    <br />
                    <FormLabel style={{ fontFamily: 'urbanist' }} id="demo-row-radio-buttons-group-label">Interview Date (DD:MM)</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={interviewDateValue}
                        onChange={interviewDateHandler}
                    >
                        <FormControlLabel value="5/3" control={<Radio />} label="5/3" disabled={interviewTypeIndex === '0' || true} />
                        <FormControlLabel value="6/3" control={<Radio />} label="6/3" disabled={interviewTypeIndex === '0' || true} />
                        <FormControlLabel value="7/3" control={<Radio />} label="7/3" disabled={interviewTypeIndex === '0'} />
                        <FormControlLabel value="8/3" control={<Radio />} label="8/3" disabled={interviewTypeIndex === '0'} />
                        <FormControlLabel value="9/3" control={<Radio />} label="9/3" disabled={interviewTypeIndex === '0'} />
                    </RadioGroup>
                    <br />
                    <FormLabel id="time-suggest">Time Suggestions</FormLabel>
                    <Stack direction="row" flexWrap="wrap" rowGap={1} columnGap={1} >
                        {dummyInterviewsTimes.map((appointment, i) => (
                            <Button color={appointment.status} variant={i == timeIndex ? 'contained' : 'outlined'} onClick={(event) => onTimeClickHandler(event, i)} disabled={interviewTypeIndex === '0'}>
                                {appointment.time}
                            </Button>
                        ))}
                    </Stack>
                    <DialogContentText fontSize={10}>
                        Green buttons is awaiting one person to get started, so it's recommended to be taken.
                    </DialogContentText>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </FormControl>


            </DialogContent>
            <DialogActions>
                <Button onClick={scheduleClose} >Cancel</Button>
                <Button onClick={scheduleClose} disabled>Schedule</Button>
            </DialogActions>
        </div >
    );
}


export default Interview;