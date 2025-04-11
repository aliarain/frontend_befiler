import '../styles/globals.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import {Router} from "next/router";
import {UserContextProvider} from '../contexts/userContext';
import EnvContext from '../contexts/envContext';
import {environmentPubliclyAccessible, environmentVariablesInfo} from '../helpers/backend_helper';
import {useFetch} from '../helpers/hooks';
import {Fragment} from "react";

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
    let Layout = Component.layout || Fragment
    const [environmentVariable] = useFetch(environmentVariablesInfo);
    const [envPubliclyAccessible] = useFetch(environmentPubliclyAccessible);
    return (
        <EnvContext.Provider value={[environmentVariable, envPubliclyAccessible]}>
            <UserContextProvider>
                <Layout>
                    <Component {...pageProps}/>
                </Layout>
            </UserContextProvider>
        </EnvContext.Provider>
    )
}

export default MyApp
