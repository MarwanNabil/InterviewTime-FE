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

//Images
import Logo from "@public/images/logos-v4/logo-no-background.png"


//Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

//Store
import { useDispatch } from 'react-redux'
import { authActions, feedbackActions, userActions } from 'redux/index';
import LoginPage from './Login';

export default function LandingPage() {

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', rowGap: 50, alignItems: 'center', height: '90vh' }}>
      {/* <Image src={Logo} /> */}
      <LoginPage />
    </Container>
  );
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('invalid email.').required('Required'),
  password: Yup.string()
    .min(8, 'too short.')
    .max(50, 'too long.')
    .required('Required'),
})

