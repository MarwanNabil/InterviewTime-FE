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

//Calendar
import { DateTime } from "luxon";
import { Calendar, luxonLocalizer, momentLocalizer, Event, DateHeaderProps } from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToolbarProps, HeaderProps, EventProps, CalendarProps } from 'react-big-calendar';
const localizer = momentLocalizer(moment)


//Helpers
import { InterviewTypesArray, NA, dummyInterviewsTimes } from '@helpers/index';
import { BorderLeftRounded } from '@mui/icons-material';

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
        let bgColor = "#FFB7B7"
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
                backgroundColor: bgColor, borderLeftColor: brdColor, borderLeftWidth: 4,
                borderLeft: 'solid', justifyContent: 'space-between', paddingInline: 4,
                borderRadius: 2
            }
            }>
                <div style={{ fontWeight: 'normal', fontFamily: 'monospace', fontSize: 13 }}> {title}</div >
                <div style={{ color: '#A1A1A1', fontSize: 12 }}>{`${(startDate.getHours().toString().length === 1 ? '0' : '') + startDate.getHours()}:${(startDate.getMinutes().toString().length === 1 ? '0' : '') + startDate.getMinutes()} AM`}</div>
            </div >
        );
    };

    const myEventsList: Event[] = [
        {
            title: eventCalendarShape("PS", new Date()),
            start: new Date("2023-04-08T10:00"),
            end: new Date("2023-04-08T17:00"),

        },
        {
            title: eventCalendarShape("OOP", new Date()),
            start: new Date("2023-04-08T23:00"),
            end: new Date("2023-04-08T23:39")
        },
        {
            title: eventCalendarShape("DB", new Date()),
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
        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={viewHandler.bind(null, viewActions.DAY)}>Day</button>
                    <button type="button" onClick={viewHandler.bind(null, viewActions.WEEK)}>Week</button>
                    <button type="button" onClick={viewHandler.bind(null, viewActions.MONTH)}>Month</button>
                </span>
                <span className="rbc-toolbar-label">{props.label}</span>
                <span className="rbc-btn-group">
                    <button type="button" onClick={viewHandler.bind(null, viewActions.AGENDA)}>Agenda</button>
                    <button type="button" onClick={navigateHandler.bind(null, navigateActions.NEXT)}>Schedule</button>
                </span>
            </div>
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
        <div style={{ padding: 20 }}>

            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: "80vh",
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                    fontSize: 18,
                }}
                onShowMore={(events, date) => {
                    //display all events on that day.
                }}
                defaultView='month'
                components={{
                    toolbar: toolbarHandler,
                    month: {
                        //for month view
                        dateHeader: (props: DateHeaderProps) => {
                            const currentDate = new Date();
                            const label = props.label[0] === '0' ? props.label[1] : props.label
                            return (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    paddingTop: 4
                                }}>
                                    {props.date.toDateString() === currentDate.toDateString() &&
                                        <div style={{ backgroundColor: '#1892F3', padding: 4, color: 'white', borderRadius: 20 }}>
                                            {label}
                                        </div>
                                    }
                                    {props.date.toDateString() !== currentDate.toDateString() &&
                                        <div>
                                            {label}
                                        </div>
                                    }
                                </div >
                            )
                        },
                        // header: (props: CalendarProps) => {
                        //     return (<div></div>);
                        // },                     
                        // event: (props: CalendarProps) => {
                        //     return (<div>
                        //         {props.components}
                        //     </div>);
                        // }
                    },
                    day: {
                        header: (props: CalendarProps<Event, object> | Readonly<CalendarProps<Event, object>>) => {
                            return (<div>{props.date?.toString()}</div>)
                        }
                    }
                }}
                eventPropGetter={(event, start, end, isSelected) => {
                    let newStyle = {
                        backgroundColor: "transparent",
                        color: 'black',
                        borderRadius: "5px",
                        // border: 'groove'
                    };

                    // event.title =
                    //     (<div style={{ flex: "row", alignItems: "center" }}>
                    //         <div style={{ width: 10, borderRadius: 10, backgroundColor: '#FF5733' }}> </div>
                    //         <div>{event.title + '-'} </div>
                    //     </div>);

                    // // if (isSelected) {
                    // //     newStyle.backgroundColor = "red"
                    // // }

                    return {
                        className: "",
                        style: newStyle
                    };
                }}
            />
        </div >
    );
}
