import * as React from 'react';

import CircleIcon from '@mui/icons-material/Circle';

//Components
import CalendarTool from "./calendar";
import ControlCalendar from './Control';

//Helpers
import { IInterviewData } from '@helpers/Interview/index';

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { interviewActions } from 'redux/index';
import { useEffect } from 'react';

export default function CalendarPage() {

    const [isLoadingFromServer, isLoadingFromServerHandler] = React.useState(false);

    //Categories
    const [activeCategory, setActiveCategory] = React.useState<Number>(0);

    //Interview Details

    const [agendaToggle, agendaToggleHandler] = React.useState(false);
    const [interviewToggle, interviewToggleHandler] = React.useState(false);

    const dispatch = useDispatch()

    const [interviews, setInterviews] = React.useState<IInterviewData[]>([]);
    const [targetedInterviews, setTargetedInverviews] = React.useState<IInterviewData[]>([]);
    const interviewsDumb = useSelector((state: any) => state.interview.interviews)[0];


    useEffect(() => {

        const loadFromDumbAfterLoadingFromServer = async () => {
            await dispatch(interviewActions.list());
            setInterviews(interviewsDumb);
        }

        isLoadingFromServerHandler(true);

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

        isLoadingFromServerHandler(false);

    }, [isLoadingFromServer, interviews, activeCategory]);

    return (
        <div style={{ display: 'flex', height: '90vh', borderTop: 'solid', borderTopWidth: 'thin', borderTopColor: '#efefef' }}>
            <div style={{ flex: 3, borderRight: 'solid', borderRightWidth: 'thin', borderRightColor: '#efefef' }}>
                <ControlCalendar activeCategoryIndex={activeCategory} setActiveCategoryIndexHandler={setActiveCategory} />
            </div>
            <div style={{ flex: 12 }}>
                {!isLoadingFromServer && < CalendarTool interviews={targetedInterviews} />}
            </div>
        </div >
    );
}
