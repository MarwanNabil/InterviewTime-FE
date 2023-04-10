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

    const authStorage = useLocalStorage('tokens', 'is_authenticated')
    const interviewStorage = useLocalStorage('interviewsLoadedDate', 'interviews', 'interviewsCount')
    const userStorage = useLocalStorage('user');



    //loading data for auth state
    useEffect(() => {
        if (authStorage.loading && interviewStorage.loading) return

        dispatch(
            authActions.loadInitialAuthState({
                tokens: authStorage.values.get('tokens') ?? {
                    refresh: '',
                    access: '',
                },
                is_authenticated: authStorage.values.get('is_authenticated') ?? false,
            })
        )

        const loadedDate: Date = new Date(interviewStorage.values.get('interviewsLoadedDate'));

        dispatch(
            interviewActions.load({
                interviews: interviewStorage.values.get('interviews'),
                interviewsCount: interviewStorage.values.get('interviewsCount'),
                interviewsLoadedDate: loadedDate.toString()
            })
        )

        dispatch(userActions.load(userStorage.values.get('user') ?? {
            email: "",
            firstName: "",
            lastName: "",
            timeZone: "",
            username: ""
        }))

        isLoadingHandler(false);

    }, [authStorage.loading, interviewStorage.loading, dispatch])

    return isLoading ?
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
        : children
}
