import * as React from 'react';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

//redux actions
import { authActions, interviewActions, userActions } from 'redux/index'

//hooks
import useLocalStorage from '@helpers/hooks/use-local-storage'

//MUI
import CircularProgress from '@mui/material/CircularProgress';

export default function InitState({ children }: { children: JSX.Element }) {
    const dispatch = useDispatch()
    const [isLoading, isLoadingHandler] = React.useState(true);

    const authStorage = useLocalStorage('auth')
    const userStorage = useLocalStorage('user');
    const interviewStorage = useLocalStorage('interview')

    //loading data for auth state
    useEffect(() => {
        if (authStorage.loading && interviewStorage.loading && userStorage.loading) return

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


        isLoadingHandler(false);

    }, [authStorage.loading, interviewStorage.loading, userStorage.loading, dispatch])

    return (isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />

        </div>)
        : (
            children
        ))
}
