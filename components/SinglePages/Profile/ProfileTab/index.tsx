import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

//Store
import { useSelector } from 'react-redux';

const avatarSize = 140

export default function ProfileTab() {

    const user = useSelector((state: any) => state.user);

    return (
        <Stack flexDirection='row' >
            <Stack flexDirection='row' columnGap={4}>
                <img width={avatarSize} height={avatarSize} style={{ borderRadius: avatarSize / 2 }} src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg" />
                <Stack flexDirection='column' rowGap={1}>
                    <Stack flexDirection="row" alignItems="center" columnGap={2}>
                        <h3>{`${user.firstName} ${user.lastName}`}</h3>
                        <Rating size='small' name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                    </Stack>
                    <span>{`${user.timeZone}`}</span>
                    <span>Fullstack Engineer</span>
                </Stack>
            </Stack>
        </Stack >
    );
}