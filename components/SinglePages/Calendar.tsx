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
import { InterviewsTypesData, dummyInterviewsTimes } from '@helpers/constants';

export default function CalendarPage() {

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
        <div style={{ padding: 80, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
            <div style={{
                display: 'flex', flexDirection: 'row', justifyItems: 'end'
            }}>
                <Button variant="contained" size="medium" onClick={scheduleOpen}>
                    Schedule
                </Button>


                <Dialog open={openSchedule} onClose={scheduleClose}>
                    <DialogTitle>Schedule an Interview</DialogTitle>
                    <DialogContent style={{ display: "flex", flexDirection: 'column', rowGap: 20 }}>
                        <DialogContentText>
                            To schedule an interview, you should now your interview's type and its appointment.
                        </DialogContentText>

                        <FormControl sx={{ rowGap: 0.5, maxWidth: 600 }} size="small">
                            <FormLabel id="demo-select-small">Interview Type</FormLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={interviewTypeIndex + ""}
                                onChange={InterviewTypeChangeHandler}
                            >
                                {InterviewsTypesData.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                            </Select>
                            <br />
                            <FormLabel id="demo-row-radio-buttons-group-label">Interview Date (DD:MM)</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={interviewDateValue}
                                onChange={interviewDateHandler}>
                                <FormControlLabel value="5/3" control={<Radio />} label="5/3" disabled={interviewTypeIndex === '0' || true} />
                                <FormControlLabel value="6/3" control={<Radio />} label="6/3" disabled={interviewTypeIndex === '0' || true} />
                                <FormControlLabel value="7/3" control={<Radio />} label="7/3" disabled={interviewTypeIndex === '0'} />
                                <FormControlLabel value="8/3" control={<Radio />} label="8/3" disabled={interviewTypeIndex === '0'} />
                                <FormControlLabel value="9/3" control={<Radio />} label="9/3" disabled={interviewTypeIndex === '0'} />
                            </RadioGroup>
                            <br />
                            <FormLabel id="time-suggest">Time Suggestions</FormLabel>
                            <Stack direction="row" flexWrap="wrap" rowGap={0.5} columnGap={1} >
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
                </Dialog>
            </div >
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23EAEAEE&ctz=Africa%2FCairo&showTz=1&showCalendars=0&showPrint=0&showTitle=0&src=NjhmODVhOGY3Mjg0MmY4ZDIyMmMzMmYxNjllN2YyYjE1N2Q3YmI0MDg3YTg0NzA4NGUwM2FmNTg3ZjU1MjE1MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23AD1457" width="800" height="600"></iframe>
        </div >
    );
}
