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
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';
import DateRangeIcon from '@mui/icons-material/DateRange';

//Calendar
import { DateTime } from "luxon";
import { Calendar, luxonLocalizer, momentLocalizer, Event, DateHeaderProps, DateCellWrapperProps } from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToolbarProps, HeaderProps, EventProps, CalendarProps } from 'react-big-calendar';
const localizer = momentLocalizer(moment)


//Helpers
import { InterviewTypesArray, NA, dummyInterviewsTimes } from '@helpers/index';
import { BorderLeftRounded } from '@mui/icons-material';
import Container from '@mui/material/Container';

//to make the diaglog draggable
function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}


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
    const defaultNoneForInterviewCode = NA.code;
    const [interviewTypeCode, setInterviewTypeCode] = React.useState(NA.code);

    const InterviewTypeChangeHandler = (event: SelectChangeEvent) => {
        setInterviewTypeCode(event.target.value);
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


    //Calendar Related.
    const localizer = luxonLocalizer(DateTime);

    const eventCalendarShape = (title: string, startDate: Date) => {
        let brdColor = "#F02525";
        let bgColor = "#FFB7B7";
        if (title === "OOP") {
            brdColor = '#F02525';
            bgColor = '#FFB7B7';
        } else if (title === 'PS') {
            brdColor = '#F0B925'
            bgColor = '#FFDD80';
        } else if (title === 'DB') {
            brdColor = '#50F025'
            bgColor = '#B9FFA6';
        }

        return (
            <div style={{
                display: 'flex', flexDirection: "row", alignItems: 'end', columnGap: 5,
                borderLeftWidth: 4, borderLeft: 'solid', justifyContent: 'space-between', paddingInline: 4,
                borderRadius: 2, backgroundColor: bgColor, borderLeftColor: brdColor,
            }
            }>
                <div style={{ fontWeight: 'normal', fontFamily: 'monospace', fontSize: 13 }}> {title}</div >
                <div style={{ color: '#A1A1A1', fontSize: 12 }}>{`${(startDate.getHours().toString().length === 1 ? '0' : '') + startDate.getHours()}:${(startDate.getMinutes().toString().length === 1 ? '0' : '') + startDate.getMinutes()} AM`}</div>
            </div >
        );
    };

    const myEventsList: Event[] = [
        {
            title: eventCalendarShape("PS", new Date("2023-04-08T10:00")),
            start: new Date("2023-04-08T10:00"),
            end: new Date("2023-04-08T17:00"),

        },
        {
            title: eventCalendarShape("OOP", new Date("2023-04-08T23:00")),
            start: new Date("2023-04-08T23:00"),
            end: new Date("2023-04-08T23:39")
        },
        {
            title: eventCalendarShape("DB", new Date("2023-04-10T23:00")),
            start: new Date("2023-04-10T23:00"),
            end: new Date("2023-04-10T23:39")
        },
    ];
    const toolbarHandler = (props: ToolbarProps<Event, object>) => {
        let navigateActions = {
            PREVIOUS: 'PREV',
            NEXT: 'NEXT',
            TODAY: 'TODAY',
            DATE: 'DATE',
        }
        const navigateHandler = (action: any) => {
            props.onNavigate(action);
        }
        let viewActions = {
            DAY: 'day',
            WEEK: 'week',
            MONTH: 'month',
            AGENDA: 'agenda'
        }
        const viewHandler = (action: any) => {
            props.onView(action);
        }
        const monthLabel = props.label.split(' ')[0].slice(0, 3);
        const yearLabel = props.label.split(' ')[1];

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 150 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', columnGap: 2 }}>
                        <span style={{ fontSize: 25, fontWeight: 700 }}>{monthLabel}</span>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{yearLabel}</span>
                    </div>
                    <div>
                        <IconButton onClick={navigateHandler.bind(null, navigateActions.PREVIOUS)}>
                            < NavigateBeforeIcon style={{ color: '#9fa3ac', fontSize: 15 }} />
                        </IconButton>
                        <IconButton onClick={navigateHandler.bind(null, navigateActions.NEXT)}>
                            < NavigateNextIcon style={{ color: '#9fa3ac', fontSize: 15 }} />
                        </IconButton>
                    </div>
                </div>
                <div style={{ display: 'flex', columnGap: 15, alignItems: 'center' }}>
                    <Button variant='contained' size='small' color='info'
                        style={{
                            fontFamily: 'urbanist', fontSize: 14, fontWeight: 300,
                            textTransform: 'capitalize'
                        }}
                        startIcon={<DateRangeIcon style={{ fontSize: 15 }} />}>Agenda</Button>
                    <Button variant="contained" size='small'
                        style={{
                            fontFamily: 'urbanist', fontSize: 14, fontWeight: 300,
                            backgroundColor: '#4382fe', textTransform: 'capitalize'
                        }}
                        startIcon={<AddIcon style={{ fontSize: 15 }} />}>Interview</Button>
                </div>
            </div >
        )
    }

    return (
        // <div style={{ padding: 80, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
        //     <div style={{
        //         display: 'flex', flexDirection: 'row', justifyItems: 'end'
        //     }}>
        //         <Button variant="contained" size="medium" onClick={scheduleOpen}>
        //             Schedule
        //         </Button>
        //         <Dialog open={openSchedule} onClose={scheduleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title" >
        //             <DialogTitle>Schedule an Interview</DialogTitle>
        //             <DialogContent style={{ display: "flex", flexDirection: 'column', rowGap: 20 }}>
        //                 <DialogContentText>
        //                     To schedule an interview, you should now your interview's type and its appointment.
        //                 </DialogContentText>

        //                 <FormControl sx={{ rowGap: 0.5, maxWidth: 600 }} size="small">
        //                     <FormLabel id="demo-select-small">Interview Type</FormLabel>
        //                     <Select
        //                         labelId="demo-select-small"
        //                         id="demo-select-small"
        //                         value={interviewTypeCode}
        //                         onChange={InterviewTypeChangeHandler}
        //                     >
        //                         {InterviewTypesArray.map(item => <MenuItem value={item.code}>{item.name + ` (${item.code})`}</MenuItem>)}
        //                     </Select>
        //                     <br />
        //                     <FormLabel id="demo-row-radio-buttons-group-label">Interview Date (DD:MM)</FormLabel>
        //                     <RadioGroup
        //                         row
        //                         aria-labelledby="demo-row-radio-buttons-group-label"
        //                         name="row-radio-buttons-group"
        //                         value={interviewDateValue}
        //                         onChange={interviewDateHandler}>
        //                         <FormControlLabel value="5/3" control={<Radio />} label="5/3" disabled={interviewTypeCode === defaultNoneForInterviewCode || true} />
        //                         <FormControlLabel value="6/3" control={<Radio />} label="6/3" disabled={interviewTypeCode === defaultNoneForInterviewCode || true} />
        //                         <FormControlLabel value="7/3" control={<Radio />} label="7/3" disabled={interviewTypeCode === defaultNoneForInterviewCode} />
        //                         <FormControlLabel value="8/3" control={<Radio />} label="8/3" disabled={interviewTypeCode === defaultNoneForInterviewCode} />
        //                         <FormControlLabel value="9/3" control={<Radio />} label="9/3" disabled={interviewTypeCode === defaultNoneForInterviewCode} />
        //                     </RadioGroup>
        //                     <br />
        //                     <FormLabel id="time-suggest">Time Suggestions</FormLabel>
        //                     <Stack direction="row" flexWrap="wrap" rowGap={0.5} columnGap={1} >
        //                         {dummyInterviewsTimes.map((appointment, i) => (
        //                             <Button color={appointment.status} variant={i == timeIndex ? 'contained' : 'outlined'} onClick={(event) => onTimeClickHandler(event, i)} disabled={interviewTypeCode === defaultNoneForInterviewCode}>
        //                                 {appointment.time}
        //                             </Button>
        //                         ))}
        //                     </Stack>
        //                     <DialogContentText fontSize={10}>
        //                         Green buttons is awaiting one person to get started, so it's recommended to be taken.
        //                     </DialogContentText>
        //                     <Box sx={{ width: '100%' }}>
        //                         <LinearProgress />
        //                     </Box>
        //                 </FormControl>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Button onClick={scheduleClose} >Cancel</Button>
        //                 <Button onClick={scheduleClose} disabled>Schedule</Button>
        //             </DialogActions>
        //         </Dialog>
        //     </div >
        //     {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23EAEAEE&ctz=Africa%2FCairo&showTz=1&showCalendars=0&showPrint=0&showTitle=0&src=NjhmODVhOGY3Mjg0MmY4ZDIyMmMzMmYxNjllN2YyYjE1N2Q3YmI0MDg3YTg0NzA4NGUwM2FmNTg3ZjU1MjE1MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23AD1457" width="800" height="600"></iframe> */}


        // </div >
        <Container style={{ padding: 20 }} >

            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: "80vh",
                    // textTransform: 'uppercase',
                    fontFamily: 'Urbanist',
                    fontStyle: 'initial'
                }}
                onShowMore={(events, date) => {
                    //display all events on that day.
                }}
                defaultView='month'
                components={{
                    toolbar: toolbarHandler,
                    dateCellWrapper: (props: DateCellWrapperProps) => {
                        //this is for cell wrapper styling
                        return (<div style={{
                            backgroundColor: '#fafcfe', flex: 1, borderRight: 'solid',
                            borderWidth: 'thin', borderRightColor: '#dddddd'
                        }}></div>
                        )
                    },
                    month: {

                        //for month view
                        dateHeader: (props: DateHeaderProps) => {
                            const currentDate = new Date();
                            const label = props.label[0] === '0' ? props.label[1] : props.label;
                            const isToday = props.date.toDateString() === currentDate.toDateString();
                            let bordeStyle: React.CSSProperties = { marginTop: 3 };
                            if (isToday) {
                                bordeStyle = {
                                    color: 'white', backgroundColor: '#1A75D2',
                                    width: 22, height: 22, borderRadius: 11,
                                    borderColor: '#1A75D2', alignItems: 'center',
                                    display: 'flex'
                                };
                            }
                            return (
                                <div style={{ paddingBlock: 3, display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 500, fontSize: 15, ...bordeStyle }}>
                                        <div style={{ textAlign: 'center' }}>
                                            {label}
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                        header: (props: HeaderProps) => {
                            //for week days MON,SUN ...
                            return (<div style={{ paddingBlock: 15, textTransform: 'uppercase', fontWeight: 700 }}>{props.label}</div>);
                        },

                    },
                }}
                eventPropGetter={(event, start, end, isSelected) => {
                    //to trigger a specific event when it's being selected..
                    let newStyle: React.CSSProperties = {
                        backgroundColor: "transparent",
                        color: 'black',
                        borderRadius: 3,
                        borderInline: 0
                    };
                    if (isSelected) {
                        newStyle = {
                            ...newStyle,
                            borderColor: "white",
                            paddingBlock: 1,
                            paddingInline: 1
                        }
                    }

                    return {
                        className: "",
                        style: newStyle
                    };
                }}

            />
        </Container >
    );
}
