import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TbGridDots } from 'react-icons/tb';
import { useRouter } from "next/router";
import { AiFillCaretDown } from 'react-icons/ai';
import {
    getAllFrontPageAPI,
    getAllUserRoleExceptAdminAPI,
    getOneSiteSettingAPI,
    verifyUserAPI
} from '../../../../helpers/backend_helper';


const Navbar = ({ handleOpenSidebar, role }) => {
    const [changeNavColor, setChangeNavColor] = useState(false);
    const router = useRouter();
    const [frontPage, setFrontPage] = useState([]);

    const [user, setUser] = useState({});
    useEffect(() => {
        verifyUserAPI().then((userData) => {
            if (userData?.status === true) {
                setUser(userData?.data)
            }
        })
    }, [])

    // fetch all user roles
    const [userRoles, setUserRoles] = useState([]);
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(res => {
            if (res?.status === true) {
                let arrayOfRole = [];
                res?.data?.forEach(el => {
                    arrayOfRole.push(el.name)
                })
                setUserRoles(arrayOfRole)
            }
        })
    }, [user?.role])


    //show all front page data
    useEffect(() => {
        getAllFrontPageAPI().then(data => {
            setFrontPage(data?.data?.docs);
        })
    }, [])

    const [siteBarData, setSiteBarData] = useState();

    //get one  site data
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteBarData(data?.data);
        })
    }, [])

    // filter menu pages
    const menuData = frontPage?.filter(data => data?.type === "menu");

    // handle router change for front page
    const handleRouteChange = (id) => {
        router.push(`/home/front-end-page?id=${id}`)
    }

    // handle router change for front page
    const handleRouteForServiceChange = (id) => {
        router.push(`/home/service?id=${id}`)
    }

    // handle router change for front page
    const handleDashboard = () => {

        if (user?.role === "admin" || user?.role === "employee") {
            router.push(`/admin/`);

        } else if (user?.role === "accountant") {
            router.push(`/accountant/`);

        } else if (userRoles.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) {
            router.push(`/user/`);
        }
    }

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("taxstickToken");
        window.location.reload();
    }

    // handle navbar color change
    const handleNavColorPosition = () => {
        if (window.scrollY >= 100) {
            setChangeNavColor(true);
        }
        else {
            setChangeNavColor(false)
        }
    }
    window.addEventListener('scroll', handleNavColorPosition);


    return (
        <div className={changeNavColor ? "topHeaderPage topHeaderPage-bg relative " : "relative topHeaderPage "}>
            <div className='h-16 flex justify-around items-center large_device_menu '>
                {/* website logo */}
                <div className='h-full w-[150px] overflow-hidden'>
                    <Link href="/">
                        <img className='h-full w-[150px] p-2 md:p-0 overflow-hidden object-contain object-center cursor-pointer' src={siteBarData?.logo ? `${siteBarData?.logo}` : ""} alt="logo" />
                    </Link>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    {/* navigation bar start */}
                    <nav className='hidden lg:block hero_font_family'>
                        <ul>
                            <li className="menu"><Link href="/"><a className={router.pathname === "/" ? " text-[#14AA40]" : "text-black"}>Home</a></Link></li>
                            <li className='menu'><Link href="/home/about"><a className={router.pathname == "/home/about" ? "text-[#14AA40]" : "text-black"}>About</a></Link></li>
                            <li className='menu  '>
                                <a className='relative text-black '>
                                    <span className='inline-block mr-2 text-black'>Tax Beneficiary</span>
                                    <span className='inline-block absolute top-4 arrow'><AiFillCaretDown /></span>
                                </a>
                                <div className='ani-menu situation-width py-4'>
                                    <div className='grid grid-cols-4 gap-2 container h-[300px] scrollbar '>
                                        {
                                            role?.map((d, i) =>
                                                <div key={i + 1} className='menu-list flex justify-center' onClick={() => handleRouteForServiceChange(d?._id)}>
                                                    <a className='capitalize  w-full text-center ' >
                                                        <div className='shadow-md p-2'>
                                                            <img className='h-12 w-12 mx-auto my-2 ' src={d?.logo} style={{ objectFit: 'cover', objectPosition: '50% 0%' }} alt="" />
                                                            <span className='text-[14px] text-black hover:text-[#14AA40]'>{d?.display_name}</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li className='menu'>
                                <a className='relative text-black'>
                                    <span className='inline-block mr-2 text-black'>More </span>
                                    <span className='inline-block absolute top-4 arrow'><AiFillCaretDown /></span>
                                </a>
                                <ul className='ani-menu ani-menu-width'>
                                    <div className=''>
                                        {
                                            menuData?.map((d, i) => <li key={i + 1} className='menu-list border-b-[1px]'><a className='text-black hover:text-[#14AA40]' onClick={() => handleRouteChange(d?._id)}>{d?.name ?? ""}</a></li>)
                                        }

                                        <li className='menu-list border-b-[1px]'><Link href="/home/tax-price"><a className={router.pathname === "/home/tax-price" ? "text-[#14AA40]" : "text-black"}>Pricing</a></Link></li>
                                        <li className='menu-list '><Link href="/home/faq"><a className={router.pathname === "/home/faq" ? "text-[#14AA40]" : "text-black"}>FAQ&apos;s</a></Link></li>
                                    </div>
                                </ul>
                            </li>
                            <li className='menu'><Link href="/home/contact"><a className={router.pathname == "/home/contact" ? "text-[#14AA40]" : "text-black"}>Contact</a></Link></li>
                            <li className='menu'>
                                {
                                    user.role ?
                                        <a className='relative capitalize text-black'>
                                            <span className='inline-block mr-2' >{user?.role ?? "text-black"} </span>
                                            <span className='inline-block absolute top-4 arrow'><AiFillCaretDown /></span>
                                        </a>
                                        :
                                        <a className='relative capitalize text-black'>
                                            <span className='inline-block mr-2 text-black'>Login/Register</span>
                                            <span className='inline-block absolute top-4 arrow'><AiFillCaretDown /></span>
                                        </a>
                                }
                                <ul className='ani-menu ani-menu-width'>
                                    {
                                        user.role ?
                                            <div className=''>
                                                <li className='menu-list border-b-[1px]'><a className='text-black hover:text-[#14AA40]' onClick={handleLogout}>logout</a></li>
                                                <li className='menu-list '><a className="text-black hover:text-[#14AA40]" onClick={handleDashboard}>Dashboard</a></li>
                                            </div>
                                            :
                                            <li className='menu-list '><Link href="/login"><a className={router.pathname == "/login" ? "text-[#14AA40] " : "text-black"}>Login</a></Link></li>
                                    }
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    {/* side bar icon */}
                    <TbGridDots className='text-[#3dde6d] cursor-pointer ' onClick={handleOpenSidebar} size={30} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;