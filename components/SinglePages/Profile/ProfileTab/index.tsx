import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const avatarSize = 140

export default function ProfileTab() {

    return (
        <Stack flexDirection='row' >
            <Stack flexDirection='row' columnGap={4}>
                <img width={avatarSize} height={avatarSize} style={{ borderRadius: avatarSize / 2 }} src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg" />
                <Stack flexDirection='column'>
                    <Stack flexDirection="row" alignItems="center" columnGap={2}>
                        <h3 >Marwan Nabil</h3>
                        <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                    </Stack>
                    <span>Fullstack Engineer</span>
                </Stack>
            </Stack>
        </Stack >
    );
}