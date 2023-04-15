//UI
import * as React from 'react';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Container from '@mui/material/Container';

//Icons
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//Calendar
import { DateTime } from "luxon";
import { Calendar, luxonLocalizer, momentLocalizer, Event, DateHeaderProps, DateCellWrapperProps, View } from "react-big-calendar";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToolbarProps, HeaderProps, EventProps } from 'react-big-calendar';
const localizer = momentLocalizer(moment)


//Helpers
import { interviewUIArray } from '@helpers/index';
import { IInterviewData, IInterviewUI, interviewStatusE } from '@helpers/Interview/index';

//Store
import { useEffect } from 'react';
import { interviewActions } from 'redux/index';
import { useDispatch, useSelector } from 'react-redux'




type CalendarProps = {
    interviews: IInterviewData[],
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenInterview: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentSelectedInterviewIndex: React.Dispatch<React.SetStateAction<number>>,
}

export default function CalendarTool({ interviews, setCurrentSelectedInterviewIndex: setCurrentSelectedIntervieIndex, setOpenDialog, setOpenInterview }: CalendarProps) {
    //Calendar Related.
    const localizer = luxonLocalizer(DateTime);

    //Today Button
    const [todayWorldButtonActive, setTodayWorldButtonActive] = React.useState<boolean>(false);

    //Redux
    const dispatch = useDispatch();
    const worldTodayInterviews = useSelector((state: any) => state.interview.worldInterviews)[0];
    const [myCalendarEvents, setMyCalendarEvents] = React.useState<Event[]>();

    useEffect(() => {
        const eventsBuffer: Event[] = changeInterviewsToEvents(interviews);
        setMyCalendarEvents(eventsBuffer);
    }, [interviews])

    useEffect(() => {
        const getTodayWorldInterviews = async () => {
            await dispatch(interviewActions.requestTodayWorldInterviews());
        }
        if (todayWorldButtonActive) {
            getTodayWorldInterviews();
        } else {
            const eventsBuffer: Event[] = changeInterviewsToEvents(interviews);
            setMyCalendarEvents(eventsBuffer);
        }
    }, [todayWorldButtonActive]);

    useEffect(() => {
        if (todayWorldButtonActive &&
            worldTodayInterviews &&
            worldTodayInterviews.length > 0) {
            const eventsBuffer: Event[] = changeInterviewsToEvents(worldTodayInterviews);
            setMyCalendarEvents(eventsBuffer);
        }
    }, [worldTodayInterviews]);

    const eventCalendarShape = (interviewId: string, title: string, startDate: Date, bgColor: string, brdColor: string, interviewStatus: interviewStatusE, interviewIndex: number) => {
        return (
            <div key={interviewId} style={{
                display: 'flex', flexDirection: "row", alignItems: 'end', columnGap: 5,
                borderLeftWidth: 4, borderLeft: 'solid', justifyContent: 'space-between', paddingInline: 4,
                borderRadius: 2, backgroundColor: bgColor, borderLeftColor: brdColor
                , opacity: interviewStatus === interviewStatusE.waiting ? '0.5' : '1',
                maxWidth: 300
            }
            }
                onClick={() => {
                    if (todayWorldButtonActive) {
                    } else {
                        setOpenDialog(() => {
                            setCurrentSelectedIntervieIndex(interviewIndex);
                            return true;
                        });
                    }
                }}
            >
                <div key={interviewId} style={{
                    fontWeight: 600, fontSize: 13
                }}> {title}</div >
                < div style={{ fontSize: 12 }}>
                    {`${(startDate.getHours().toString().length === 1 ? '0' : '') + startDate.getHours()}:${(startDate.getMinutes().toString().length === 1 ? '0' : '') + startDate.getMinutes()}`}
                </div>
            </div >
        );
    };



    const changeInterviewsToEvents = (interviews: IInterviewData[]) => {
        const myEventsBuffer: Event[] = [];
        interviews.forEach((interview, interviewIndex) => {

            const interviewTypeMetaData = interviewUIArray[interview.interviewType];

            //Date Liberary auto transform from UTC to your current time zone, which is great!!!
            const eventStartDateInYourTimeZone = new Date(interview.startTime.toString());

            const eventStartHoursStartDateInYourTimeZone = eventStartDateInYourTimeZone.getHours();
            const eventEndHoursStartDateInYourTimeZone = eventStartHoursStartDateInYourTimeZone + 2;

            const eventEndDateInYourTimeZone = new Date(eventStartDateInYourTimeZone.getTime());
            eventEndDateInYourTimeZone.setHours(eventEndHoursStartDateInYourTimeZone, 0, 0, 0);

            myEventsBuffer.push({
                title: eventCalendarShape(
                    interview.eventId.toString(),
                    interviewTypeMetaData.code, eventStartDateInYourTimeZone,
                    interviewTypeMetaData.color.weak,
                    interviewTypeMetaData.color.solid,
                    interview.interviewStatus,
                    interviewIndex),
                start: eventStartDateInYourTimeZone,
                end: eventEndDateInYourTimeZone,
                resource: interviewIndex
            });
        });

        return myEventsBuffer;
    }

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
        type viewActions = {
            DAY: 'day',
            WEEK: 'week',
            MONTH: 'month',
            AGENDA: 'agenda'
        }
        const viewHandler = (action: View) => {
            props.onView(action);
        }

        let monthLabel = props.label.split(' ')[0].slice(0, 3);
        let yearLabel = props.label.split(' ')[1];

        if (props.view === 'agenda') {
            monthLabel = props.label;
            yearLabel = "";
        }

        const toolbarButtonStyle: React.CSSProperties = {
            fontSize: 14, fontWeight: 300, textTransform: 'capitalize'
        }

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
                    <Button variant='contained' size='small' color='warning'
                        style={toolbarButtonStyle}
                        startIcon={todayWorldButtonActive ? <AccountCircleIcon /> : <LanguageIcon />}
                        onClick={() => {
                            setTodayWorldButtonActive((prev) => {
                                if (prev === true) {
                                    //current is false
                                    //my interviews
                                    viewHandler('month')
                                    return false;
                                } else {
                                    //today world interviews
                                    viewHandler('day')
                                    return true;
                                }
                            })
                        }}
                    >{todayWorldButtonActive ? 'Me' : 'Today'}</Button>
                    <Button disabled={todayWorldButtonActive} variant='contained' size='small' color='info'
                        style={toolbarButtonStyle}
                        startIcon={<DateRangeIcon style={{ fontSize: 15 }} />}
                        onClick={() => viewHandler((props.view === 'agenda') ? 'month' : 'agenda')}
                    >{props.view === 'agenda' ? 'Month' : 'Agenda'}</Button>
                    <Button variant="contained" size='small'
                        style={toolbarButtonStyle}
                        startIcon={<AddIcon style={{ fontSize: 15 }} />}
                        onClick={() => setOpenInterview(true)}
                    >Interview</Button>
                </div>
            </div >
        )
    }

    return (
        < Container maxWidth='xl' style={{ padding: 20 }} >

            <Calendar
                localizer={localizer}
                events={myCalendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: "80vh",
                    fontStyle: 'initial'
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
