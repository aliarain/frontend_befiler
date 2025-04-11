import {
    MdDashboard,
    MdOutlineCenterFocusStrong, MdAccountCircle, MdAnnouncement
} from "react-icons/md";
import {RiPagesFill} from "react-icons/ri";
import Sidebar from "../components/user/dashboard/sidebar.js";
import Header from "../components/user/dashboard/header.js";
import {useEffect, useState} from "react";
import I18nContext, {initI18n} from "../contexts/i18n";
import {verifyUserAPI} from "../helpers/backend_helper";
import UserContext from "../contexts/user";
import {BsClipboardData}  from "react-icons/bs";
import {IoTicketOutline}  from "react-icons/io5";
import {Skeleton} from "antd";



const UserLayout = ({children}) => {
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
                    <div className="main-content bg-gray-200">
                        <div className="w-full z-30" style={{minHeight: 400}}>
                            {children}
                        </div>
                    </div>
                </div>
            </UserContext.Provider>
        </I18nContext.Provider>
    )
}

export default UserLayout;


const menu = [
    {
        label: 'Dashboard',
        icon: MdDashboard,
        href: '/user',
        permission: 'dashboard'
    },
    {
        label: 'Live Site',
        icon: MdOutlineCenterFocusStrong,
        href: '/',
    },
    {
        label: 'My Tax Files',
        icon: MdAccountCircle,
        href: '/user/submitted-tax-file',
    },
    {
        label: 'Support Ticket',
        icon: IoTicketOutline,
        href: '/user/support-ticket',
        permission: 'any',
        child: [
            {
                label: 'Tickets',
                icon: BsClipboardData,
                href: '/user/support-ticket/create',
                childHrefs: [],
                permission: 'any',
            },
        ]
    },
    {
        label: 'File from A/C',
        icon: RiPagesFill,
        href: '/user/accountant-file',
    },
    {
        label: 'Feedback',
        icon: MdAnnouncement,
        href: '/user/feedback',
    },
]


const getMenu = () => {
    return menu;
}
