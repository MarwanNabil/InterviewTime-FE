import * as React from 'react';

//Redux
import { useDispatch } from 'react-redux';
import { interviewActions } from 'redux/index';

//UI
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
import { interviewUIArray, dummyInterviewsTimes } from '@helpers/index';

interface dateUI {
    actualDate: Date;
    daySMonth: String
}

const Interview = () => {

    //Diaglog Related
    const [interviewTypeIndex, setInterviewTypeIndex] = React.useState(0);

    const InterviewTypeChangeHandler = (event: SelectChangeEvent) => {
        setInterviewTypeIndex(Number(event.target.value));
    };

    //Interviews Dates
    const currentDate = new Date();
    const dayToMilliseconds = 86400000;
    const suggestDates: dateUI[] = [];
    for (let i = -1; i <= 3; i++) {
        const targetDate = new Date(currentDate.getTime() + dayToMilliseconds * i);
        const dayNumber = targetDate.getDate();
        const monthNumber = targetDate.getMonth();
        suggestDates.push({
            daySMonth: dayNumber + '/' + monthNumber,
            actualDate: targetDate
        })
    }

    const [interviewDateValue, setInterviewDateValue] = React.useState(1);

    const interviewDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInterviewDateValue(Number((event.target as HTMLInputElement).value));
    };


    //Time Suggestions
    const [timeIndex, setTimeIndex] = React.useState(-1);

    const onTimeClickHandler = (event: React.MouseEvent, key: number) => {
        setTimeIndex(key)
    }


    //Schedule Request
    const [isLoadingRequest, setIsLoadingRequest] = React.useState<boolean>(false);
    const dispatch = useDispatch()

    const scheduleButtonHandler = async () => {
        setIsLoadingRequest(true);
        try {
            await dispatch(interviewActions.post({
                startDate: suggestDates[interviewDateValue].actualDate,
                interviewType: interviewTypeIndex
            }));
        } catch (e) {
            console.log(e);
        }
        setIsLoadingRequest(false);

    }
    return (
        <div style={{ height: 400, overflowY: 'auto' }}>
            <DialogContent style={{ display: "flex", flexDirection: 'column', rowGap: 3 }}>
                <FormControl sx={{ rowGap: 2, maxWidth: 600 }} size="small">
                    <Stack direction="column" rowGap={1.2}>
                        <FormLabel id="demo-select-small">Interview Type</FormLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={interviewTypeIndex + ""}
                            onChange={InterviewTypeChangeHandler}
                        >
                            {interviewUIArray.map(
                                (item, index) =>
                                    <MenuItem value={index}>
                                        {item.name}
                                    </MenuItem>
                            )}
                        </Select>
                    </Stack>
                    <Stack direction="column" rowGap={1.2}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Interview Date (DD:MM)</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={interviewDateValue}
                            onChange={interviewDateHandler}
                        >
                            {
                                suggestDates.map((item, index) => (
                                    <FormControlLabel value={index} control={<Radio />} label={item.daySMonth} disabled={currentDate > item.actualDate || interviewTypeIndex === 0} />
                                ))
                            }
                        </RadioGroup>
                    </Stack>
                    <Stack direction="column" rowGap={1.2}>
                        <FormLabel id="time-suggest">Time Suggestions</FormLabel>
                        <Stack direction="row" flexWrap="wrap" gap={1.2} style={{ overflowX: 'auto' }} >
                            {dummyInterviewsTimes.map((appointment, i) => (
                                <Button color={appointment.status} style={{ width: 60 }}
                                    variant={i == timeIndex ? 'contained' : 'outlined'}
                                    onClick={(event) => onTimeClickHandler(event, i)}
                                    disabled={interviewTypeIndex === 0}>
                                    {appointment.time}
                                </Button>
                            ))}
                        </Stack>
                        <DialogContentText fontSize={11}>
                            Green buttons is awaiting one person to get started, so it's recommended to be taken.
                        </DialogContentText>
                    </Stack>
                    {isLoadingRequest && <LinearProgress />}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button disabled={!(interviewTypeIndex !== 0 && interviewDateValue !== 0 && timeIndex !== -1)}
                    onClick={scheduleButtonHandler}>Schedule</Button>
            </DialogActions>
        </div >
    );
}


export default Interview;