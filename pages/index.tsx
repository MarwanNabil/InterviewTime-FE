import * as React from 'react';

//Helpers
import pageI from "@helpers/Interfaces/Page"

//UI
import NavBar from '@components/ui/NavBar'

//Single Pages
import Calendar from '@components/SinglePages/Calendar';

export default function LandingPage() {
    const tabs: Array<pageI> = [
        {
            label: "Calendar",
            component: <Calendar />
        },
        {
            label: "Interviews",
            component: <></>
        },
        {
            label: "Blog",
            component: <></>
        }
    ];

    const settings: Array<pageI> = [
        {
            label: "Settings",
            component: <></>
        },
        {
            label: "Logout",
            component: <></>
        },
    ]


    //activePageIndex from [0 to tabs.length-1] is in tabs , from 
    //[tabs.length , tabs.length + settings.length] is in settings
    const [activePageValue, setActivePageValue] = React.useState(0);

    const activePageHandler = (event: React.SyntheticEvent | React.MouseEvent | undefined, newValue: number) => {
        setActivePageValue(newValue);
    };

    const activePageHook = {
        activePageValue: activePageValue,
        activePageHandler: activePageHandler
    }

    let pageToBeRendered;
    if (activePageValue < tabs.length) {
        pageToBeRendered = tabs[activePageValue].component;
    } else {
        let equivalentIndexInSettings = activePageValue - tabs.length;
        pageToBeRendered = settings[equivalentIndexInSettings].component
    }

    return (
        <div style={{ margin: -8 }}>
            <NavBar tabs={tabs} settings={settings} activePageHook={activePageHook} />
            {pageToBeRendered}
        </div>
    )
}