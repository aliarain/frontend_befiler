import axios from "axios";
import {useEffect, useState} from "react";
import LandingPage from "./home";
import {useRouter} from "next/router";
import Head from "next/head";
import {useEnv} from "../contexts/envContext";
import Version3Home from "./v3";
import HomeLayout from "../layout/home";
import {getSiteSettingInformationAPI} from "../helpers/backend_helper";
import {Skeleton} from "antd";
import Version2Home from "./v2";
import MainLayout from "../layout/home";


const Home = () => {
    const router = useRouter();
    const [_, envPubliclyAccessible] = useEnv();
    const [siteInformationData, setSiteInformation] = useState({})
    // fetch existing data
    useEffect(() => {
        getSiteSettingInformationAPI().then(data => {
            setSiteInformation(data?.data)
        })
    }, [])

    // checking server env file 
    useEffect(() => {
        const checkEnvFile = async () => {
            const {data} = await axios.get(process.env.BACKEND_URL)
            if (data?.status === true && data?.env === false) {
                router.push('/setting/')
            }
        }
        checkEnvFile();
    }, [])

    // tawk to service connection
    useEffect(() => {
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = envPubliclyAccessible?.twak_to_src_url;
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, [envPubliclyAccessible?.twak_to_src_url])    

    if (!!siteInformationData?.update_version?.number) {
        switch (siteInformationData?.update_version?.number) {
            case 'v1':
                return <LandingPage/>
            case 'v2':
                return <HomeLayout>
                    <Version2Home/>
                </HomeLayout>
            case 'v3':
                return <MainLayout>
                    <Version3Home/>
                </MainLayout>
            default:
                return <LandingPage/>
        }
    }

    return (
        <div className={'loader_shadow'}>
            <Head>
                <title>Welcome</title>
            </Head>

            <div className={'md:mx-[10%] space-y-10 md:my-[3%] min-h-screen'}>
                <Skeleton active={true}/>
                <Skeleton active={true}/>
                <Skeleton active={true}/>
            </div>
        </div>
    );
}

export default Home;