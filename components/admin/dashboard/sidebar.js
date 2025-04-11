import MetisMenu from '@metismenu/react';
import 'metismenujs/dist/metismenujs.css';
import Link from 'next/link'
import {Fragment, useEffect, useState} from "react";
import swalAlert from '../../common/swalAlert';
import {useRouter} from 'next/router'
import {getOneSiteSettingAPI} from '../../../helpers/backend_helper';
import {useUserContext} from "../../../contexts/user";


const Sidebar = ({menu}) => {
    const router = useRouter();
    const user = useUserContext()

    const {pathname} = useRouter()
    const isActive = (item) => {
        if (item?.href === pathname || item?.childHrefs?.includes(pathname)) {
            return true
        }
        let find = item?.child?.find(child => child.href === pathname || child?.childHrefs?.includes(pathname))
        return !!find
    }

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


    //get one  site data
    const [siteBarData, setSiteBarData] = useState();
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteBarData(data?.data);
        })
    }, [])

    // sidebar manu control, responsive
    const removeMenu = () => {
        try {
            if (window.innerWidth < 1024) {
                document.querySelector('.dashboard')?.classList.remove('mini')
                document.querySelector('.dashboard')?.classList.remove('mobile')
            }
        } catch (e) {

        }
    }

    return (
        <>
            <div className="sidebar-bg" onClick={removeMenu}/>
            <nav className="sidebar">
                <div className='sidebarBg pb-10'>
                    <div className="h-16 py-3 flex justify-center c_logo items-center text-gray-300">
                        <Link href="/admin/">
                            {
                                siteBarData?.logo ?
                                    <img src={siteBarData?.logo && `${siteBarData?.logo}`} alt="logo"
                                         className="inline-block h-[24px] hover:cursor-pointer object-scale-down "/>
                                    :
                                    <a className={'font-semibold text-slate-800 text-[16px]'}>Logo</a>
                            }
                        </Link>
                    </div>

                    <div className='h-20 border-t border-b border-gray-200 flex items-center justify-center site-title'>
                        <img src={user?.profile_img ? `${user?.profile_img}` : '/images/admin_avatar.png'}
                             alt="image-profile"
                             className="inline-block rounded-full h-12 w-12"
                             style={{objectFit: 'cover', objectPosition: '50% 0%'}}/>
                        <span className='inline-block ml-3 text-gray-900 font-semibold capitalize whitespace-pre'>
                            Welcome {
                            (!!user?.display_name) ?
                                (user?.display_name?.split('_').join(" "))
                                :
                                (user?.username?.split('_').join(" "))
                        }
                            {
                                (!!user?.description) && <span
                                    className='block text-gray-900 capitalize whitespace-pre'>{user?.description}</span>
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
                                            <a className={`nav-item has-arrow ${isActive(item) ? item?.child?.length > 0 ? 'p-active' : 'active' : ''}`}>
                                                <Icon className="inline-block"/>
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
                                                                   className={`nav-item ${isActive(child) ? 'active' : ''}`}>
                                                                    <Icon className="inline-block mb-0.5"/>
                                                                    <span
                                                                        className={`${index + 500}`}
                                                                    > {child.label}</span>
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link href={item.href || '#!'}>
                                            <a className={`nav-item ${isActive(item) ? 'active' : ''}`} onClick={() => {
                                                document.querySelectorAll('.metismenu .sub-menu')?.forEach(menu => {
                                                    menu.classList.remove('mm-show')
                                                })
                                                removeMenu()
                                            }}>
                                                <Icon className="inline-block mb-0.5"/>
                                                <span className="c-tooltip">{item.label}</span>
                                            </a>
                                        </Link>
                                    )}

                                </li>
                            )
                        })}
                    </MetisMenu>
                </div>
            </nav>
        </>
    )
}

export default Sidebar