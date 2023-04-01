import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react';

//UI
import { ProSidebarProvider } from 'react-pro-sidebar';

function MyApp({ Component, pageProps }: AppProps) {
    const [render, setRender] = useState(false);
    useEffect(() => setRender(true), []);
    return (
        render ?
            <BrowserRouter>
                <ProSidebarProvider>
                    <Component {...pageProps} />
                </ProSidebarProvider>
            </BrowserRouter>
            : null
    )
}

export default MyApp
