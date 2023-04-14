import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Divider from '@mui/material/Divider';

//Images
import Logo from "@public/images/logos-v4/logo-no-background.png"


//Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

//Store
import { useDispatch } from 'react-redux'
import { authActions, feedbackActions, userActions } from 'redux/index';
import LoginPage from './Login';
import { ST } from 'next/dist/shared/lib/utils';
import SignUp from './SignUp';

export default function LandingPage() {

  const boxStyle: React.CSSProperties = {
    backgroundColor: 'white', display: 'flex', flexDirection: 'column', rowGap: 20, padding: 30, borderRadius: 10,
  };

  //Logo Factor
  const factor = 0.2;
  const width = Logo.width * factor;
  const height = Logo.height * factor;

  //SignUp Dialog
  const [openSignUp, setOpenSignUp] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenSignUp(true);
  };


  return (
    <div style={{ height: '100vh', backgroundColor: '', display: 'flex', justifyContent: 'center' }}>
      <Stack flexDirection="row" alignItems='center' columnGap={3}>
        <Container style={{ flex: 3, ...boxStyle, alignItems: 'center', rowGap: 50 }}>
          <Stack flexDirection="row" alignItems='center' columnGap={5}>
            <Image src={Logo} width={width} height={height} />
            <Divider variant='fullWidth' orientation='vertical' flexItem />
            <h3 style={{ fontWeight: 500 }}>do you wanna ace your next FAANG interview ?</h3>
          </Stack>
          <iframe width="700" height="450" src="https://www.youtube.com/embed/jfpdr9j94_k" />
        </Container>
        <Container style={{ flex: 1, ...boxStyle, boxShadow: '0px 0px 10px rgb(0,0,0 , 0.2)' }}>
          <LoginPage />
          <Divider />
          <Button variant='contained' size='large' color='secondary' onClick={handleClickOpen}>Sign Up</Button>
          <SignUp openDialog={openSignUp} setOpenDialog={setOpenSignUp} />
        </Container>

      </Stack>
    </div>
  );
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('invalid email.').required('Required'),
  password: Yup.string()
    .min(8, 'too short.')
    .max(50, 'too long.')
    .required('Required'),
})

