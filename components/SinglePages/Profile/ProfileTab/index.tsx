import * as React from 'react';

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

//Store
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'redux/index';

const avatarSize = 140

export default function ProfileTab() {

    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user);
    const feedback = useSelector((state: any) => state.feedback);

    const [overallScoreOfProfile, setOverallScoreOfProfile] = React.useState(0);


    React.useEffect(() => {
        dispatch(authActions.setOnLoadingScreen());

        let calc = 0;
        feedback.feedbacks.forEach((feedback: any) => {
            calc += (feedback.overallScore + 1);
        });

        setOverallScoreOfProfile(calc === 0 ? 0 : calc / feedback.feedbacksCount);

        dispatch(authActions.setOffLoadingScreen())

    }, [dispatch, feedback]);

    return (
        <Stack flexDirection='row' >
            <Stack flexDirection='row' columnGap={4}>
                {/* <img width={avatarSize} height={avatarSize} style={{ borderRadius: avatarSize / 2 }} src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg" /> */}
                <Avatar alt={`${user.firstName} ${user.lastName}`} style={{ backgroundColor: '#5b595a', width: 100, height: 100 }} src="/static/images/avatar/2.jpg" />
                <Stack flexDirection='column' rowGap={1}>
                    <Stack flexDirection="row" alignItems="center" columnGap={2}>
                        <h3>{`${user.firstName} ${user.lastName}`}</h3>
                        {(overallScoreOfProfile) ?
                            <Rating size='small' name="half-rating-read" defaultValue={overallScoreOfProfile} precision={0.5} readOnly /> :
                            null}
                    </Stack>
                    <span>{`${user.timeZone}`}</span>
                </Stack>
            </Stack>
        </Stack >
    );
}