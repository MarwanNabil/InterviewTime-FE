import { defaultConfig } from "next/dist/server/config-shared";

export default function Calendar() {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 90 }}>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23EAEAEE&ctz=Africa%2FCairo&showTz=1&showCalendars=0&showPrint=0&showTitle=0&src=NjhmODVhOGY3Mjg0MmY4ZDIyMmMzMmYxNjllN2YyYjE1N2Q3YmI0MDg3YTg0NzA4NGUwM2FmNTg3ZjU1MjE1MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23AD1457" width="800" height="600"></iframe>
            </div>
        </>
    );
}