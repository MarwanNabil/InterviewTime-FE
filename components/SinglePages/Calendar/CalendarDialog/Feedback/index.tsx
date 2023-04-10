import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';


//Formik
import * as Yup from 'yup'
import { useFormik } from 'formik'

//Store
import { useDispatch } from 'react-redux'
import { feedbackActions, userActions } from 'redux/index';

//Helpers
import { IInterviewData } from "@helpers/Interview";
import FeedbackRatingControl from './RatingControl';

type FeedbackEntryProps = {
    interview: IInterviewData,
};

const FeedbackEntry = ({ interview }: FeedbackEntryProps) => {

    const dispatch = useDispatch()

    //formik
    const formik = useFormik({
        initialValues: {
            summary: '',
            details: '',
        },
        validationSchema: FeedbackSchema,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true)
            // try {
            //     await dispatch(authActions.login(values))
            // } catch (e) {
            //     const error = e as any
            //     console.log(error)
            //     if (error.response.data.message) {
            //         actions.setFieldError('email', error.response.data.message)
            //         actions.setFieldError('password', error.response.data.message)
            //         return
            //     }

            // }
            // await dispatch(userActions.loadIntial())
            actions.setSubmitting(false)
        },
    })

    const [activeRate, setActiveRateHandler] = React.useState<number>(4);

    return (<div>
        <form style={{ display: 'flex', flexDirection: 'column', rowGap: 20, alignItems: 'center' }}
            onSubmit={formik.handleSubmit}>

            <FormControl style={{ width: 500 }} error={formik.errors.summary ? true : false} variant='outlined' >
                <InputLabel>Summary</InputLabel>
                <OutlinedInput
                    id="summary"
                    name='summary'
                    type='text'
                    placeholder='Enter the summary'
                    value={formik.values.summary}
                    onChange={formik.handleChange}
                    label='Summary'
                />
                <FormHelperText>{formik.errors.details ?? ''}</FormHelperText>
            </FormControl>
            <FormControl style={{ width: 500 }} error={formik.errors.details ? true : false} variant='outlined' >
                <InputLabel >Details</InputLabel>
                <OutlinedInput
                    id="details"
                    name='details'
                    type='text'
                    placeholder='Enter the details'
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    label='Details'
                    multiline
                    rows={5}
                />
                <FormHelperText>{formik.errors.details ?? ''}</FormHelperText>
            </FormControl>
            <FeedbackRatingControl activeRate={activeRate ?? 5} setActiveRateHandler={setActiveRateHandler} />
            <div style={{ flex: 1, display: 'flex', alignItems: 'end' }}>
                <Button type='submit' variant="contained" disabled={formik.isSubmitting} color="warning" style={{ width: 150, marginInline: 5 }} >Empty</Button>
                <Button type='submit' variant="contained" disabled={formik.isSubmitting} style={{ width: 150, marginInline: 5 }} >Send</Button>
            </div>
        </form>
    </div>);
}

export default FeedbackEntry;

const FeedbackSchema = Yup.object().shape({
    summary: Yup.string().email('invalid summary.').required('Required'),
    details: Yup.string()
        .min(10, 'too short.')
        .max(100, 'too long.')
        .required('Required'),
})
