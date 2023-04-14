import * as React from 'react';

import { useRouter } from 'next/router';
import { authActions } from 'redux/index';
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);

    React.useEffect(() => {
        const logout = async () => {
            await dispatch(authActions.logout);
            localStorage.removeItem('auth');
            router.push('/').then(() => router.reload());
        }
        logout();
    }, [dispatch]);


    return (null);
}

export default Logout;