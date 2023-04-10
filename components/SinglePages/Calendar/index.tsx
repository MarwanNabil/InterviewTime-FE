import * as React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//Components
import CalendarTool from "./calendar";
import ControlCalendar from './Control';
import CalendarDialog from './CalendarDialog';

//Helpers
import { IInterviewData } from '@helpers/Interview/index';

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { interviewActions } from 'redux/index';
import { useEffect } from 'react';

export default function CalendarPage() {

    //Loading From Server Hooks
    const dispatch = useDispatch()
    const [loadedFromServer, loadedFromServerHandler] = React.useState(false);
    const [interviews, setInterviews] = React.useState<IInterviewData[]>([]);
    const interviewsDumb = useSelector((state: any) => state.interview.interviews)[0];
    const [targetedInterviews, setTargetedInverviews] = React.useState<IInterviewData[]>([]);

    //Interview Dialog
    const [openedDialog, setOpenedDialog] = React.useState<boolean>(true);
    const [currentSelectedIntervieIndex, setCurrentSelectedInterviewIndex] = React.useState<number>(-1);

    //Interviews Controls
    //Categories
    const [activeCategory, setActiveCategory] = React.useState<Number>(0);
    const [interviewToggle, setInterviewToggleHandler] = React.useState(false);

    useEffect(() => {

        const loadFromDumbAfterLoadingFromServer = async () => {
            await dispatch(interviewActions.list());
            setInterviews(interviewsDumb);
        }

        loadedFromServerHandler(true);

        if (interviews.length === 0) {
            //zero means, we have not done it previously.
            loadFromDumbAfterLoadingFromServer();
        }

        //this is for categories filtering
        const targetedInterviewsBuffer: IInterviewData[] = [];
        interviews.forEach((item, index) => {
            if (activeCategory === 0)
                targetedInterviewsBuffer.push(item);
            else
                if (activeCategory === item.interviewType)
                    targetedInterviewsBuffer.push(item);
        })
        setTargetedInverviews(targetedInterviewsBuffer);

        loadedFromServerHandler(true);

    }, [loadedFromServer, interviews, activeCategory]);


    return (
        //if loaded from server is fale it does mean we haven't loaded anything. "prerender time."
        !loadedFromServer ? (
            <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
        ) : (
            <div style={{ display: 'flex', height: '90vh', borderTop: 'solid', borderTopWidth: 'thin', borderTopColor: '#efefef' }}>
                {
                    currentSelectedIntervieIndex !== -1 &&
                    <CalendarDialog
                        interview={targetedInterviews[currentSelectedIntervieIndex]}
                        openDialog={openedDialog}
                        setOpenDialog={setOpenedDialog} />
                }
                <div style={{ flex: 3, borderRight: 'solid', borderRightWidth: 'thin', borderRightColor: '#efefef' }}>
                    <ControlCalendar activeCategoryIndex={activeCategory} setActiveCategoryIndexHandler={setActiveCategory} openInterview={interviewToggle} setOpenInterview={setInterviewToggleHandler} />
                </div>
                <div style={{ flex: 12 }}>
                    < CalendarTool
                        interviews={targetedInterviews}
                        setOpenDialog={setOpenedDialog}
                        setCurrentSelectedInterviewIndex={setCurrentSelectedInterviewIndex}
                        setOpenInterview={setInterviewToggleHandler}
                    />
                </div>
            </div >
        ));
}
