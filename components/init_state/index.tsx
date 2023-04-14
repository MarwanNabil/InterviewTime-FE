import * as React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//redux actions
import { authActions, interviewActions, userActions } from 'redux/index'

//hooks
import useLocalStorage from '@helpers/hooks/use-local-storage'

//MUI
import CircularProgress from '@mui/material/CircularProgress';

export default function InitState({ children }: { children: JSX.Element }) {
    const dispatch = useDispatch()

    //loadingScreen & Auth Guard
    const auth = useSelector((state: any) => state.auth);

    const authStorage = useLocalStorage('auth')
    const userStorage = useLocalStorage('user');
    const feedbackStorage = useLocalStorage('feedback');
    const interviewStorage = useLocalStorage('interview')

    //loading data for auth state
    useEffect(() => {
        dispatch(authActions.setOnLoadingScreen());

        if (authStorage.loading && interviewStorage.loading && userStorage.loading && feedbackStorage.loading) return


        dispatch(
            authActions.loadInitialAuthState(authStorage.values.get('auth') ?? {
                token: "",
                isAuthenticated: false,
            })
        )

        dispatch(userActions.load(userStorage.values.get('user') ?? {
            email: "",
            firstName: "",
            lastName: "",
            timeZone: "",
            username: ""
        }))

        dispatch(
            interviewActions.load(userStorage.values.get('interview') ?? {
                interviews: [],
                interviewsCount: 0,
                interviewsLoadedDate: 0
            })
        )


        dispatch(authActions.setOffLoadingScreen());

    }, [authStorage.loading, interviewStorage.loading, userStorage.loading, feedbackStorage.loading, dispatch])

    return (auth.isLoadingData ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>)
        : (
            children
        ))
}
