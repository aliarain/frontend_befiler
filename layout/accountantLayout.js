import Sidebar from "../components/accountant/dashboard/sidebar.js";
import Header from "../components/accountant/dashboard/header.js";
import {MdCompare, MdDashboard, MdOutlineCenterFocusStrong} from "react-icons/md";
import {useEffect, useState} from "react";
import I18nContext, {initI18n} from "../contexts/i18n";
import {verifyUserAPI} from "../helpers/backend_helper";
import UserContext from "../contexts/user";
import {Skeleton} from "antd";


const AccountantLayout = ({children}) => {
    const [user, setUser] = useState()
    const i18n = initI18n()

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = () => {
        verifyUserAPI().then((userData) => {
            if (userData?.status === true) {
                setUser(userData?.data)
            }
        })
    }

    const menu = getMenu();

    if (!user) {
        return (<div className="md:px-[10%] space-y-10 md:mt-[7%]">
            <Skeleton active={true} />
            <Skeleton active={true} />
            <Skeleton active={true} />
        </div>)
    }

    return (
        <I18nContext.Provider value={i18n}>
            <UserContext.Provider value={{...user, getProfile}}>
                <div className="dashboard">
                    <Sidebar menu={menu}/>
                    <Header/>
                    <div className="absolute top-0 h-32 w-full bg-main"/>
                    <div className="main-content">
                        <div className="w-full z-30" style={{minHeight: 400}}>
                            {children}
                        </div>
                    </div>
                </div>
            </UserContext.Provider>
        </I18nContext.Provider>
    )
}

export default AccountantLayout;


const menu = [
    {
        label: 'Dashboard',
        icon: MdDashboard,
        href: '/accountant',
        permission: 'dashboard'
    },
    {
        label: 'Live Site',
        icon: MdOutlineCenterFocusStrong,
        href: '/',
    },
    {
        label: 'Assigned TaxFiles',
        icon: MdCompare,
        href: '/accountant/taxfiles',
    },
]


const getMenu = () => {
    return menu;
}
