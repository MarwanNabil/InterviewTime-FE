import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

//redux actions
import { authActions } from 'redux/slices/auth'

//hooks
import useLocalStorage from '@helpers/hooks/use-local-storage'

export default function InitState({ children }: { children: JSX.Element }) {
    const dispatch = useDispatch()
    const auth_storage = useLocalStorage('tokens', 'is_authenticated')

    //loading data for auth state
    useEffect(() => {
        if (auth_storage.loading) return
        dispatch(
            authActions.loadInitialAuthState({
                tokens: auth_storage.values.get('tokens') ?? {
                    refresh: '',
                    access: '',
                },
                is_authenticated: auth_storage.values.get('is_authenticated') ?? false,
            })
        )
    }, [auth_storage.loading, auth_storage.values, dispatch])

    return auth_storage.loading ? <></> : children
}
