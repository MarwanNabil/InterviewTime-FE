import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import wrapper from 'redux/index'

//UI
import InitState from '@components/init_state';
import { ProSidebarProvider } from 'react-pro-sidebar';

function MyApp({ Component, pageProps, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest)
    const [render, setRender] = useState(false);
    useEffect(() => setRender(true), []);
    return (
        render ?
            <Provider store={store}>
                <InitState>
                    <BrowserRouter>
                        <ProSidebarProvider>
                            <Component {...pageProps} />
                        </ProSidebarProvider>
                    </BrowserRouter>
                </InitState>
            </Provider>
            : null
    )
}

export default MyApp
