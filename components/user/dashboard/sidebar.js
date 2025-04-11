import MetisMenu from '@metismenu/react';
import '@metismenu/react/dist/@metismenu/react.css';
import Link from 'next/link'
import { Fragment, useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import swalAlert from '../../common/swalAlert';
import { useRouter } from 'next/router'
import { getOneSiteSettingAPI } from '../../../helpers/backend_helper';
import {useUserContext} from "../../../contexts/user";


// sidebar controlling using metis-menu and custom design
const Sidebar = ({ menu }) => {
    const router = useRouter();
    const user = useUserContext()

    const { pathname } = useRouter()
    const isActive = (item) => {
        if (item?.href === pathname || item?.childHrefs?.includes(pathname)) {
            return true
        }
        let find = item?.child?.find(child => child.href === pathname || child?.childHrefs?.includes(pathname))
        return !!find
    }

    //get one  site data
    const [siteBarData, setSiteBarData] = useState();
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteBarData(data?.data);
        })
    }, [])

    const [update, setUpdate] = useState()
    useEffect(() => {
        setUpdate(!update)
        document.querySelectorAll('.metismenu .sub-menu')?.forEach(menu => {
            menu?.childNodes?.forEach(child => {
                let item = child.childNodes[0]
                if (item.href === window.location.href) {
                    if (!menu.classList.contains('mm-show')) {
                        menu.classList.add('mm-show')
                    }
                }
            })
        })
    }, [pathname])

    // sidebar menu control, responsive
    const removeMenu = () => {
        try {
            if (window.innerWidth < 1024) {
                document.querySelector('.dashboard')?.classList.remove('mini')
                document.querySelector('.dashboard')?.classList.remove('mobile')
            }
        } catch (e) {

        }
    }

    // handle logout
    const handleLogout = async () => {
        let { isConfirmed } = await swalAlert.confirm(
            "Are you want to leave?",
            "Yes, Leave"
        );
        if (isConfirmed) {
            localStorage.removeItem('taxstickToken');
            router.push('/login/');
        }
    }


    return (
        <>
            <div className="sidebar-bg" onClick={removeMenu} />
            <nav className="sidebar">
                <div className='sidebarBg pb-10' style={{ backgroundColor: '#2a3042' }}>
                    <div className="h-16 py-3 flex justify-center c_logo items-center text-gray-300">
                        <Link href="/user/">
                            {
                                siteBarData?.logo ?
                                    <img src={siteBarData?.logo && `${siteBarData?.logo}`} alt="logo"
                                         className="inline-block h-[24px] hover:cursor-pointer"/>
                                    :
                                    <a className={'font-semibold text-white text-[16px]'}>Logo</a>
                            }
                        </Link>
                    </div>

                    <div className='h-20 border-t border-b border-gray-500 flex items-center justify-center site-title'>
                        <img src={user?.profile_img ? `${user?.profile_img}` : '/images/admin_avatar.png'} alt="image-profile"
                            className="inline-block rounded-full h-12 w-12" style={{ objectFit: 'cover', objectPosition: '50% 0%' }} />
                        <span className='inline-block ml-3 text-gray-300 font-semibold capitalize whitespace-pre'>
                            Welcome {
                                (!!user?.display_name) ?
                                    (user?.display_name?.split('_').join(" "))
                                    :
                                    (user?.username?.split('_').join(" "))
                            }
                            {
                                (!!user?.description) && <span className='block text-gray-300 capitalize whitespace-pre'>{user?.description}</span>
                            }
                        </span>
                    </div>

                    <MetisMenu>
                        {menu?.map((item, index) => {
                            let Icon = item.icon || Fragment
                            return (
                                <li className={`${isActive(item) ? 'mm-active active' : ''}`} key={index}>
                                    {item?.child ? (
                                        <>
                                            <a className={`nav-item1 has-arrow ${isActive(item) ? item?.child?.length > 0 ? 'p-active' : 'active' : ''}`}>
                                                <Icon className="inline-block" />
                                                <span>{item.label}</span>
                                            </a>
                                            <ul className="sub-menu">
                                                <li className="label">{item.label}</li>
                                                {item?.child?.map((child, index) => {
                                                    let Icon = child.icon || Fragment
                                                    return (
                                                        <li key={index}>
                                                            <Link href={child.href || '#!'}>
                                                                <a onClick={removeMenu}
                                                                    className={`nav-item1 ${isActive(child) ? 'active' : ''}`}>
                                                                    <Icon className="inline-block mb-0.5" />
                                                                    <span> {child.label}</span>
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link href={item.href || '#!'}>
                                            <a className={`nav-item1 ${isActive(item) ? 'active' : ''}`} onClick={() => {
                                                document.querySelectorAll('.metismenu .sub-menu')?.forEach(menu => {
                                                    menu.classList.remove('mm-show')
                                                })
                                                removeMenu()
                                            }}>
                                                <Icon className="inline-block mb-0.5" />
                                                <span className="c-tooltip">{item.label}</span>
                                            </a>
                                        </Link>
                                    )}

                                </li>
                            )
                        })}
                    </MetisMenu>

                    {/* logout */}
                    <Link href="">
                        <a className="pl-10 ml-1 text-[15px] inline-block c_logout text-gray-300 hover:text-gray-50"
                            onClick={handleLogout}>
                            <FaSignOutAlt className="inline-block mr-1 text-[20px] logout_icon" />
                            <span
                                className="inline-block ml-1"
                            >
                                <span className='logout_text'>Logout</span>
                            </span>
                        </a>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Sidebar