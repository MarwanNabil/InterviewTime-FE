import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

//UI
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';

//Icons
import DateRangeIcon from '@mui/icons-material/DateRange';
import CircleIcon from '@mui/icons-material/Circle';
import CategoryIcon from '@mui/icons-material/Category';
import CallIcon from '@mui/icons-material/Call';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InfoIcon from '@mui/icons-material/Info';

//Helpers
import { IInterviewData, interviewUIArray } from '@helpers/Interview';


type InfoPropsType = {
    interview: IInterviewData
}

const Info = ({ interview }: InfoPropsType) => {
    //Css Styles
    const useStyles = makeStyles((theme) => ({
        grid: {
            display: 'grid',
            gridTemplateColumns: '1fr 4fr', /* two equal columns */
            gridTemplateRows: 'repeat(4, 1fr) 4fr', /* four equal rows and one row with double height */
            rowGap: 4,
            alignItems: 'center',
            overflowY: 'auto',
            height: 450
        },
        cell: {
            // display: 'flex',
            // alignItems: 'start',
            // justifyContent: 'start',
            // // backgroundColor: theme.palette.grey[400],
            // height: '100%',
        },
        iconCell: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconStyle: {
            color: '#60656A',
            fontSize: 16,
        },
        interviewKind: {
            color: interviewUIArray[interview.interviewType].color.solid
        },
        people: {
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            flexWrap: 'wrap'
        },
        textStyle: {
            color: 'black',
            fontSize: 15,
            display: 'flex',
            flexWrap: 'wrap'
        }
    }));
    const classes = useStyles();

    const interviewDateUTCFormat = new Date(interview.startTime.toString());
    const finalDate = interviewDateUTCFormat.getFullYear() + '-' +
        (interviewDateUTCFormat.getMonth() + 1) + '-' +
        (interviewDateUTCFormat.getDate()) + ' at ' +
        interviewDateUTCFormat.getHours() + ":00"
        ;

    //Routing
    const router = useRouter();


    return (
        <Grid container className={classes.grid}>
            <Grid item xs={6}>
                <div className={classes.iconCell}>
                    <CategoryIcon className={`${classes.iconStyle} `} />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={`${classes.cell} ${classes.textStyle}`}>
                    <div style={{ fontWeight: 600, fontSize: "inherit" }}>
                        {`${interviewUIArray[interview.interviewType].name} Interview`}
                    </div>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.iconCell}>
                    <DateRangeIcon className={`${classes.iconStyle} `} />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={`${classes.cell} ${classes.textStyle}`}>
                    {finalDate}
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.iconCell}>
                    <CallIcon className={classes.iconStyle} />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.cell}>
                    <Link href={interview.hangoutLink.toString()}>
                        <a target="_blank" style={{ textDecoration: 'none' }}>
                            <Button variant='contained' size='small'>
                                Meet
                            </Button>
                        </a>
                    </Link>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.iconCell}>
                    <PeopleAltIcon className={classes.iconStyle} />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={`${classes.cell} ${classes.people}`}>{
                    interview.attendees.map(person => <div style={{
                        paddingBlock: 2, paddingInline: 10,
                        backgroundColor: "#0085EE", color: 'white',
                        borderRadius: 15, fontWeight: 600
                    }}>{person.email}</div>)
                }</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.iconCell}>
                    <InfoIcon className={classes.iconStyle} />
                </div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.cell}>
                    Start by introducing yourselfs, keep it short to focus on our purpose,
                    pick a question related to the interview type and do not forget to
                    enter the feedback before closing the interview.
                </div>
            </Grid>
        </Grid>);

};

export default Info;