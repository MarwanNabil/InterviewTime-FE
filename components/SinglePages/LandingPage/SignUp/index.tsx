
//UI
import { Container } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useDispatch } from 'react-redux';
import { authActions } from 'redux/index';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(0),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

type SignUpProps = {
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
};


const SignUp = ({ openDialog, setOpenDialog }: SignUpProps) => {
    const handleClose = () => {
        setOpenDialog(false);
    };

    //Formik
    const dispatch = useDispatch()

    //formik
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            passwordAgain: ''
        },
        validationSchema: SignUpSchema,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true)
            if (values.password !== values.passwordAgain) {
                actions.setFieldError('passwordAgain', "two passwords must match.")
            }
            try {
                await dispatch(authActions.signup({ ...values }))
            } catch (e) {
                const error = e as any
                console.log(error)
                if (error.response.data.message) {
                    const errs = error.response.data.data;
                    for (let i = 0; i < errs.length; i++) {
                        actions.setFieldError(errs[i].param, errs[i].msg)
                    }
                }
            }
            actions.setSubmitting(false)
        },

    })

    return (
        <div>
            <BootstrapDialog
                onClose={() => handleClose()}
                aria-labelledby="customized-dialog-title"
                fullWidth={true}
                maxWidth="sm"
                open={openDialog}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleClose()}>
                    {`Create New Account`}
                </BootstrapDialogTitle>
                <DialogContent dividers style={{ padding: 20 }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }} onSubmit={formik.handleSubmit}>
                        <FormControl error={formik.errors.firstName ? true : false} variant='outlined' >
                            <InputLabel required>First Name</InputLabel>
                            <OutlinedInput
                                id="firstName"
                                name='firstName'
                                type='text'
                                placeholder='Enter your first name'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                label='First Name'
                                required
                            />
                            <FormHelperText>{formik.errors.firstName ?? ''}</FormHelperText>
                        </FormControl>
                        <FormControl error={formik.errors.lastName ? true : false} variant='outlined' >
                            <InputLabel required>Last Name</InputLabel>
                            <OutlinedInput
                                id="lastName"
                                name='lastName'
                                type='text'
                                placeholder='Enter your last name'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                label='Last Name'
                                required
                            />
                            <FormHelperText>{formik.errors.lastName ?? ''}</FormHelperText>
                        </FormControl>
                        <FormControl error={formik.errors.email ? true : false} variant='outlined' >
                            <InputLabel required>Email</InputLabel>
                            <OutlinedInput
                                id="email"
                                name='email'
                                type='email'
                                placeholder='Enter your email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                label='Email'
                                required
                            />
                            <FormHelperText>{formik.errors.email ?? ''}</FormHelperText>
                        </FormControl>
                        <FormControl error={formik.errors.username ? true : false} variant='outlined' >
                            <InputLabel required>Username</InputLabel>
                            <OutlinedInput
                                id="username"
                                name='username'
                                type='text'
                                placeholder='Enter your username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                label='Username'
                                required
                            />
                            <FormHelperText>{formik.errors.username ?? ''}</FormHelperText>
                        </FormControl>
                        <FormControl error={formik.errors.password ? true : false} variant='outlined' >
                            <InputLabel required>Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                name='password'
                                type='password'
                                placeholder='Enter your password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                label='Password'
                                required
                            />
                            <FormHelperText>{formik.errors.password ?? ''}</FormHelperText>
                        </FormControl>
                        <FormControl error={formik.errors.passwordAgain ? true : false} variant='outlined' >
                            <InputLabel required >Password Again</InputLabel>
                            <OutlinedInput
                                id="passwordAgain"
                                name='passwordAgain'
                                type='password'
                                placeholder='Enter your password again'
                                value={formik.values.passwordAgain}
                                onChange={formik.handleChange}
                                label='Password Again'
                                required
                            />
                            <FormHelperText>{formik.errors.passwordAgain ?? ''}</FormHelperText>
                        </FormControl>
                        <Button type='submit' size='large' variant='contained' disabled={formik.isSubmitting} >Register</Button>
                    </form>
                </DialogContent>
            </BootstrapDialog>
        </div >

    );
};

export default SignUp;

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().min(3).max(10).required('Required'),
    lastName: Yup.string().min(3).max(30).required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('invalid email.').required('Required'),
    password: Yup.string()
        .min(8, 'too short.')
        .max(50, 'too long.')
        .required('Required'),
    passwordAgain: Yup.string()
        .min(8, 'too short.')
        .max(50, 'too long.')
        .required('Required'),
})

