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
    const [targetedInterviews, setTargetedInverviews] = React.useState<IInterviewData[]>([]);
    const interviewsSelector = useSelector((state: any) => state.interview.interviews)[0];

    //Interview Dialog
    const [openedDialog, setOpenedDialog] = React.useState<boolean>(false);
    const [currentSelectedIntervieIndex, setCurrentSelectedInterviewIndex] = React.useState<number>(-1);

    //Interviews Controls
    //Categories
    const [activeCategory, setActiveCategory] = React.useState<Number>(0);
    const [interviewToggle, setInterviewToggleHandler] = React.useState(false);

    useEffect(() => {
        const loadInterviews = async () => {
            await dispatch(interviewActions.list());
        }

        loadInterviews();

    }, [dispatch]);

    useEffect(() => {
        if (interviewsSelector && interviewsSelector.length >= 0) {
            const interviews: Array<IInterviewData> = interviewsSelector;

            //for filtering out the selected category.
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
        }
    }, [interviewsSelector, activeCategory]);

    return (
        //if loaded from server is fale it does mean we haven't loaded anything. "prerender time."
        !loadedFromServer ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        ) : (
            <div style={{ display: 'flex', height: '90vh', borderTop: 'solid', borderTopWidth: 'thin', borderTopColor: '#efefef' }}>
                {
                    currentSelectedIntervieIndex !== -1 &&
                    openedDialog &&
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
