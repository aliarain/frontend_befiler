import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from "next/router";
import { AiFillCaretDown } from 'react-icons/ai';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail, MdLocationPin } from 'react-icons/md';;
import { GoClock } from 'react-icons/go';
import { useUser } from '../../../../contexts/userContext';
import { getAllFrontPageAPI, getOneSiteSettingAPI } from '../../../../helpers/backend_helper';


const Sidebar = ({ siteData, handleCloseSideBar, role }) => {
    const router = useRouter();
    const [frontPage, setFrontPage] = useState([]);
    const { user } = useUser();

    //show all front page data
    useEffect(() => {
        getAllFrontPageAPI().then(data => {
            setFrontPage(data?.data?.docs);
        })
    }, [])

    // handle router change for front page
    const handleRouteForServiceChange = (id) => {
        router.push(`/home/service?id=${id}`)
    }

    const [siteBarData, setSiteBarData] = useState();

    //get one  site data
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteBarData(data?.data);
        })
    }, [])

    // filter menu pages
    const menuData = frontPage?.filter(data => data?.type === "menu");

    const handleRouteChange = (id) => {
        router.push(`/home/front-end-page?id=${id}`)
    }
    
    // handle router change for front page
    const handleDashboard = () => {
        if (user?.role === "admin") {
            router.push(`/admin/`);

        } else if (user?.role === "accountant") {
            router.push(`/accountant/`);

        } else {
            router.push(`/user/`);
        }
    }

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("taxstickToken");
        window.location.reload();
    }


    return (
        <div className='side-drawer scrollbar' >
            <div className='relative '>
                <div className='absolute top-4 right-10  '>
                    <span className='block text-white cursor-pointer' onClick={handleCloseSideBar}>
                        <AiOutlineClose size={20} />
                    </span>
                </div>
                <div className='hidden lg:block p-10 text-white '>
                    {/* side bar top */}
                    <div className='hidden lg:block'>
                        <Link href="/"><img className='h-[20px] hover:cursor-pointer' src={siteBarData?.logo ?? "/images/siteDetaultLogo.png"} alt="" /></Link>
                        <p className=' capitalize my-4'>{siteData?.header_title ?? ""}</p>
                        <img className=' h-[200px]' src="/codecayonImage/tax.jpg" alt="" />
                    </div>
                </div>

                {/* small device menu bar */}
                <div className='miniMenuBar text-[18px]'>
                    <nav className='block lg:hidden px-6 py-10'>
                        <ul>
                            <li className="menu"><Link href="/"><a className={router.pathname === "/" ? " text-[#14AA40]" : "text-white"}>Home</a></Link></li>
                            <li className='menu'><Link href="/home/about"><a className={router.pathname == "/home/about" ? "text-[#14AA40]" : "text-white"}>About</a></Link></li>
                            <li className='menu  '>
                                <a className='text-white'>
                                    <span className='inline-block'>Tax Situations </span>
                                    <span className='inline-block absolute right-0 top-4 arrow'><AiFillCaretDown size={15} /></span>
                                </a>
                                <div className='ani-menu'>
                                    {
                                        role?.map((d, i) =>
                                            <div key={i + 1} className='menu-list' onClick={() => handleRouteForServiceChange(d?._id)}>
                                                <a className='capitalize text-center border-b-[1px] border-blue-500' >
                                                    <div className='flex items-center justify-center gap-2'>
                                                        <img className='h-6 w-6 ' src={d.logo} alt="" />
                                                        <span className='text-[18px] text-black'>{d?.display_name}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    }
                                </div>
                            </li>
                            <li className='menu '>
                                <a className='text-white'>
                                    <span className='inline-block'>More </span>
                                    <span className='inline-block absolute right-0 top-4 arrow'><AiFillCaretDown size={15} /></span>
                                </a>
                                <ul className='ani-menu'>
                                    {
                                        menuData?.map((d, i) => <li key={i + 1} className='menu-list border-b-[1px] border-blue-500'><a className='text-black' onClick={() => handleRouteChange(d?._id)}>{d?.name ?? ""}</a></li>)
                                    }

                                    <li className='menu-list border-b-[1px] border-blue-500'><Link href="/home/tax-price"><a className={router.pathname === "/home/tax-price" ? "text-[#14AA40]" : "text-black"}>Pricing</a></Link></li>
                                    <li className='menu-list'><Link href="/home/faq"><a className={router.pathname === "/home/faq" ? "text-[#14AA40]" : "text-black"}>FAQ&apos;s</a></Link></li>
                                </ul>
                            </li>
                            <li className='menu'><Link href="/home/contact"><a className={router.pathname == "/home/contact" ? "text-[#14AA40]" : "text-white"}>Contact</a></Link></li>
                            <li className='menu'>
                                {
                                    user?.role ?
                                        <a className='text-white capitalize' onClick={handleDashboard}>
                                            <span className='inline-block' >{user?.role ?? ""} </span>
                                            <span className='inline-block absolute right-0 top-4 arrow'><AiFillCaretDown size={15} /></span>
                                        </a>
                                        :
                                        <a className='text-white capitalize'>
                                            <span className='inline-block'>Login/Register </span>
                                            <span className='inline-block absolute right-0 top-4'><AiFillCaretDown size={15} /></span>
                                        </a>
                                }
                                <ul className='ani-menu'>
                                    {
                                        user?.role ?
                                            <div>
                                                <li className='menu-list border-b-[1px] border-blue-500'><a className='text-black' onClick={handleLogout}>logout</a></li>
                                                <li className='menu-list'><a className="text-black" onClick={handleDashboard}>Dashboard</a></li>
                                            </div>
                                            :
                                            <Link href="/login"><a className={router.pathname == "/login" ? "text-[#14AA40]" : "text-black"}>Login</a></Link>
                                    }
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                {/* address */}
                <div className='md:mx-10 text-gray-300'>
                    <div className='flex gap-2 pl-1 my-2'>
                        <div className='flex justify-center items-center'><MdLocationPin className=' text-[#14AA40]' size={35} /></div>
                        <div className='text-[14px] font-semibold '>
                            <p className='mb-0'>Office Address</p>
                            <Link href='#'><span className='text-[16px] hover:cursor-pointer'>{siteBarData?.office_address ?? ""}</span></Link></div>
                    </div>
                    <div className='flex gap-2 pl-1 mt-2'>
                        <div className='flex justify-center items-center'><GoClock className='mb-2 text-[#14AA40]' size={35} /></div>
                        <div className='text-[14px] font-semibold '>
                            <p className='mb-0'>Office Time</p>
                            <p className='lg:mr-6 hover:cursor-pointer capitalize mb-0'>{`${siteBarData?.working_day[0]} - ${siteBarData?.working_day[1]}`}</p>
                            <p className='lg:mr-6 hover:cursor-pointer uppercase'>{`${siteBarData?.working_time[0] ?? ""} - ${siteBarData?.working_time[1] ?? ""}`}</p>
                        </div>
                    </div>
                    <div className='flex gap-2 pl-1 '>
                        <div><BsTelephoneFill className='mt-1 ml-[2px] text-[#14AA40]' size={27} /></div>
                        <div className='text-[14px] font-semibold'>
                            <p className='mb-0 ml-[5px]'>Phone</p>
                            <Link href='tel:+1 647 987 4025'><span className='text-[16px] hover:cursor-pointer ml-[5px]'>{siteBarData?.contact_number ?? ""}</span></Link>
                        </div>
                    </div>
                    <div className='flex gap-2 pl-1 my-2'>
                        <div><MdEmail className='mt-1 text-[#14AA40]' size={30} /></div>
                        <div className='text-[14px] font-semibold'>
                            <p className='mb-0 ml-1'>Email</p>
                            <Link href={`mailto:${siteBarData?.contact_email}`}>
                                <span className='text-[16px] hover:cursor-pointer ml-1'>{siteBarData?.contact_email ?? ""}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Sidebar;