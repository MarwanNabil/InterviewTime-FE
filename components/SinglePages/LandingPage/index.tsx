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
import { Button } from '@mui/material';
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

export default function LandingPage() {
  const dispatch = useDispatch()

  //formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true)
      try {
        await dispatch(authActions.login(values))
      } catch (e) {
        const error = e as any
        console.log(error)
        if (error.response.data.message) {
          actions.setFieldError('email', error.response.data.message)
          actions.setFieldError('password', error.response.data.message)
          return
        }

      }
      await dispatch(userActions.loadIntial())
      actions.setSubmitting(false)
    },
  })



  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', rowGap: 50, alignItems: 'center' }}>
      <Image src={Logo} />
      <form style={{ display: 'flex', flexDirection: 'column', rowGap: 20, alignItems: 'flex-end' }} onSubmit={formik.handleSubmit}>

        <FormControl style={{ width: 500 }} error={formik.errors.email ? true : false} variant='outlined' >
          <InputLabel >Email</InputLabel>
          <OutlinedInput
            id="email"
            name='email'
            type='email'
            placeholder='Enter your email'
            value={formik.values.email}
            onChange={formik.handleChange}
            label='Email'
          />
          <FormHelperText>{formik.errors.email ?? ''}</FormHelperText>
        </FormControl>
        <FormControl style={{ width: 500 }} error={formik.errors.password ? true : false} variant='outlined' >
          <InputLabel >Password</InputLabel>
          <OutlinedInput
            id="password"
            name='password'
            type='password'
            placeholder='Enter your password'
            value={formik.values.password}
            onChange={formik.handleChange}
            label='Password'
          />
          <FormHelperText>{formik.errors.password ?? ''}</FormHelperText>
        </FormControl>
        <Button type='submit' variant="outlined" disabled={formik.isSubmitting} style={{ width: 150, marginInline: 5 }} >Login</Button>
      </form>
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
