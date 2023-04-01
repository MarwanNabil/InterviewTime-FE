import * as React from 'react';

import CircleIcon from '@mui/icons-material/Circle';

//Components
import CalendarTool from "./calendar";
import ControlCalendar from './Control';

export default function CalendarPage() {


    return (
        <div style={{ display: 'flex', height: '90vh', borderTop: 'solid', borderTopWidth: 'thin', borderTopColor: '#efefef' }}>
            <div style={{ flex: 3, borderRight: 'solid', borderRightWidth: 'thin', borderRightColor: '#efefef' }}>
                <ControlCalendar />
            </div>
            <div style={{ flex: 12 }}>
                < CalendarTool />
            </div>
        </div >
    );
}
