import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { FiPhoneCall, FiUser, FiFacebook } from 'react-icons/fi';
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { ImLinkedin2 } from 'react-icons/im'
import { getAllFrontPageAPI, getAllUserRoleExceptAdminAPI, getOneSiteSettingAPI, getSiteSettingInformationAPI, verifyUserAPI } from '../../../helpers/backend_helper';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();
    const [show, setShow] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [frontPage, setFrontPage] = useState([]);
    const [siteData, setSiteData] = useState();
    const [getSiteSettingData, setSiteSettingData] = useState({});

    const [user, setUser] = useState({});
    useEffect(() => {
        verifyUserAPI().then((userData) => {
            if (userData?.status === true) {
                setUser(userData?.data)
            }
        })
    }, [])


    useEffect(() => {
        getSiteSettingInformationAPI().then(res => {
            if (res?.status === true) {
                setSiteSettingData(res?.data)

            }
        })
    }, [])

    //get one  site data
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    const [userRole, setUserRoles] = useState([]);
    const [beneficiaryRoles, setBeneficiaryRoles] = useState([]);
    // fetch all user roles
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(res => {
            if (res?.status === true) {
                setBeneficiaryRoles(res?.data)
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

    // handle router change for front page
    const handleDashboard = () => {

        if (user?.role === "admin" || user?.role === "employee") {
            router.push(`/admin/`);

        } else if (user?.role === "accountant") {
            router.push(`/accountant/`);

        } else if (userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) {
            router.push(`/user/`);
        }
    }

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("taxstickToken");
        window.location.reload();
    }

    // filter menu pages
    const menuData = frontPage?.filter(data => data?.type === "menu");

    const handlePage = async (_id) => {
        await router.push(`/v2/page?_id=${_id}`)
    }

    const handleRouteChange = async (_id) => {
        await router.push(`/v2/front-end?_id=${_id}`)
    }

    return (
        <div className="h-full w-full z-10">
            {/* Code block starts */}
            <nav className="xl:block hidden">
                <div className="py-[8px] xl:py-[0px]">
                    <div className="flex items-center justify-between">

                        <div className="flex min-[1720px]:mx-64 min-[1536px]:mx-42 xl:mx-32 pt-[30px] w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                            <div className="flex items-center cursor-pointer">
                                <Link href="/">
                                    <div className='w-[235px] h-[120px] object-fill lg:pt-[20px]'>
                                        <img src={getSiteSettingData?.logo || ""} alt="logo" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col">

                            <div className="flex items-center flex-row py-6">
                                <div className="flex-1 w-32">
                                    <div className='flex items-center space-x-3 text-white justify-center'>
                                        <FiPhoneCall className='p-[4px]' size={32} />
                                        <Link href='#' >
                                            <div className='hover:text-hover text-base'>
                                                {getSiteSettingData?.contact_number}
                                            </div>
                                        </Link>

                                        <FiUser className='p-[4px]' size={32} />

                                        <div className="group">
                                            {
                                                user.role ?
                                                    <div className='hover:text-hover text-base cursor-pointer'>
                                                        {user?.role ?? ""}
                                                    </div>
                                                    :
                                                    <div className='hover:text-hover text-base cursor-pointer' onClick={()=>router.push("/login")}>
                                                        Login / Register
                                                    </div>
                                            }
                                            <ul className="absolute hidden font-semibold text-white group-hover:block bg-hover rounded-md" onClick={()=>router.push("/login")}>
                                                {
                                                    user.role ?
                                                        <div className="">
                                                            <li className="">
                                                                <span onClick={handleLogout} className="cursor-pointer py-[4px] pr-[24px] block whitespace-no-wrap hover:underline">
                                                                    Logout
                                                                </span>
                                                            </li>
                                                            <span className='border-b-2 block mr-[24px]'></span>
                                                            <li className="">
                                                                <span onClick={handleDashboard} className="cursor-pointer py-[4px] pr-[24px] block whitespace-no-wrap hover:underline">
                                                                    Dashboard
                                                                </span>
                                                            </li>
                                                        </div>
                                                        :
                                                        <Link href="/login">
                                                            <li className="">
                                                                <span className="cursor-pointer hover:underline py-[5px] pr-[22px] block whitespace-no-wrap">
                                                                    Login
                                                                </span>
                                                            </li>
                                                        </Link>
                                                }
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex-1 w-64">

                                    <div className='flex space-x-3 text-white justify-center' >
                                        <a href={getSiteSettingData?.facebook} target="_blank" rel="noreferrer" className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                            <FiFacebook className='p-2' size={32} />
                                        </a>
                                        <a href={getSiteSettingData?.twitter} target="_blank" rel="noreferrer" className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                            <FaTwitter className='p-2' size={32} />
                                        </a>
                                        <a href={getSiteSettingData?.instagram} target="_blank" rel="noreferrer" className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                            <FaInstagram className='p-2' size={32} />
                                        </a>
                                        <a href={getSiteSettingData?.linkedIn} target="_blank" rel="noreferrer" className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                            <ImLinkedin2 className='p-2' size={32} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex bg-slate-50 xl:pr-[235px] min-[1848px]:pr-[600px] min-[1536px]:pr-[400px] rounded-l-lg h-[80px]">
                                <div className="hidden xl:flex lg:flex py-7">
                                    <Link href="/" >
                                        <div className="cursor-pointer flex px-[20px] items-center paragraph text-black">
                                            <span className='font-semibold transition duration-150 ease-in-out  hover:text-hover'>Home</span>
                                        </div>
                                    </Link>

                                    <Link href="/v2/about" >
                                        <div className="cursor-pointer flex px-[20px] items-center paragraph text-black">
                                            <span className='font-semibold transition duration-150 ease-in-out  hover:text-hover'>About</span>
                                        </div>
                                    </Link>
                                    <div className="group -mt-[4px]">
                                        <div className="cursor-pointer flex px-[20px] items-center paragraph text-black">
                                            <span className='font-semibold transition duration-150 ease-in-out  hover:text-hover'>Tax Beneficiary</span>
                                        </div>
                                        <ul className="absolute hidden text-gray-700 group-hover:block bg-white pt-[20px] ">
                                            {
                                                beneficiaryRoles?.map((item, i) => {
                                                    return (
                                                        <li className="" key={i + 1}>
                                                            <span onClick={() => handlePage(item?._id)} className="cursor-pointer rounded-t py-[8px] pr-[20px] block whitespace-no-wrap hover:text-hover">
                                                                {item.display_name}
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="group -mt-[4px]">
                                        <div className="cursor-pointer flex px-[20px] items-center paragraph text-black">
                                            <span className='font-semibold transition duration-150 ease-in-out  hover:text-hover'>More</span>
                                        </div>
                                        <ul className="absolute hidden text-gray-700 group-hover:block bg-white pt-[20px] w-auto">
                                            {
                                                menuData?.map((item) => {
                                                    return (
                                                        <li className="" key={item?._id}>
                                                            <span onClick={() => handleRouteChange(item?._id)} className="cursor-pointer rounded-t py-[8px] pr-[20px] block whitespace-no-wrap hover:text-hover">
                                                                {item.name}
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                            }
                                            <li className="">
                                                <Link href="/v2/pricing">
                                                    <div className="cursor-pointer rounded-t  py-[8px] pr-[20px] block whitespace-no-wrap hover:text-hover">
                                                        Pricing
                                                    </div>
                                                </Link>
                                            </li>

                                            <li className="">

                                                <Link href="/v2/faq" >
                                                    <div className="cursor-pointer rounded-t py-[8px] pr-[20px] block whitespace-no-wrap hover:text-hover">
                                                        FAQ&apos;s
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <Link href="/v2/contact">
                                        <div className="cursor-pointer flex px-[20px] items-center paragraph text-black">
                                            <span className='font-semibold transition duration-150 ease-in-out  hover:text-hover'>Contact</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <nav>
                <div className="py-4 px-4 w-full flex xl:hidden justify-between items-center top-0 z-40 bg-[#272727]">
                    <div className="w-20">
                        <img src={getSiteSettingData?.logo || '/img/logo.png'} alt="logo" width={120} height={120} />

                    </div>
                    <div className="flex items-center">

                        <div id="menu" className="text-white" onClick={() => setShow(!show)}>
                            {show ? (
                                ""
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1={4} y1={6} x2={20} y2={6} />
                                    <line x1={4} y1={12} x2={20} y2={12} />
                                    <line x1={4} y1={18} x2={20} y2={18} />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>

                {/*Mobile responsive sidebar*/}
                <div className={show ? "w-full xl:hidden h-full absolute z-40  bg-[#272727] transform translate-x-0 " : "w-full xl:hidden h-full absolute z-40  transform -translate-x-full bg-[#272727]"}>
                    <div className="bg-gray-800 opacity-50 w-full h-full" onClick={() => setShow(!show)} />
                    <div className="w-64 z-40 fixed overflow-y-auto top-0 shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                        <div className="px-6">
                            <div className="flex flex-col justify-between w-full">
                                <div>
                                    <div className="mt-6 flex w-full items-center justify-between">
                                        <div className="flex items-center justify-between w-full">

                                            <div id="cross" className="text-white" onClick={() => setShow(!show)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <line x1={18} y1={6} x2={6} y2={18} />
                                                    <line x1={6} y1={6} x2={18} y2={18} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>


                                    <ul className="f-m-m">

                                        <Link href="/" >
                                            <div className="cursor-pointer flex px-[20px] items-center text-sm leading-5 transition duration-150 ease-in-out">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <p className="text-white hover:text-hover xl:text-base md:text-xl text-base ml-[12px]"> Home</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </div>
                                        </Link>

                                        <Link href="/v2/about" >
                                            <div className="cursor-pointer flex px-[20px] items-center text-sm leading-5 transition duration-150 ease-in-out">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <p className="text-white hover:text-hover xl:text-base md:text-xl text-base ml-[12px]"> About </p>
                                                        </div>

                                                    </div>
                                                </li>
                                            </div>
                                        </Link>

                                        <div className="flex px-[20px] items-center text-sm leading-[20px] transition duration-150 ease-in-out">
                                            <li className="text-white pt-8 group">
                                                <div className="flex items-center justify-between ">
                                                    <div className="flex items-center">
                                                        <p className="text-white hover:text-hover xl:text-base md:text-xl text-base ml-[12px]"> Tax Beneficiary </p>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </div>

                                                    <ul className="absolute hidden text-white group-hover:block bg-black pt-[20px] w-auto">
                                                        {
                                                            beneficiaryRoles?.map((item) => {
                                                                return (
                                                                    <li className="" key={item?._id}>
                                                                        {/* <Link href="#!" className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                                                                            {item.display_name}
                                                                        </Link> */}
                                                                        <span onClick={() => handlePage(item?._id)} className="cursor-pointer rounded-t py-[8px] px-[16px] block whitespace-no-wrap hover:text-hover">
                                                                            {item.display_name}
                                                                        </span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>

                                                </div>
                                            </li>
                                        </div>


                                        <div className="flex px-[20px] items-center text-sm leading-[20px] transition duration-150 ease-in-out">
                                            <li className="text-white pt-8 group">
                                                <div className="flex items-center justify-between ">
                                                    <div className="flex items-center">
                                                        <p className="text-white hover:text-hover xl:text-base md:text-xl text-base ml-[12px]">More</p>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </div>

                                                    <ul className="absolute hidden text-white group-hover:block bg-black pt-[20px] w-auto">
                                                        {
                                                            menuData?.map((item) => {
                                                                return (
                                                                    <li className="" key={item?._id}>
                                                                        {/* <Link href="#!" className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                                                                            {item.display_name}
                                                                        </Link> */}
                                                                        <span onClick={() => handlePage(item?._id)} className="cursor-pointer rounded-t py-[8px] px-[16px] block whitespace-no-wrap hover:text-hover">
                                                                            {item.name}
                                                                        </span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                        <li className="">
                                                            <Link href="/v2/pricing">
                                                                <span className="cursor-pointer rounded-t py-[8px] px-[16px] block whitespace-no-wrap hover:text-hover">
                                                                    Pricing
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li className="">
                                                            <Link href="/v2/faq">
                                                                <span className="cursor-pointer rounded-t py-[8px] px-[16px] block whitespace-no-wrap hover:text-hover">
                                                                    FAQ&apos;s
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </div>

                                        <Link href="/v2/contact" >
                                            <div className="cursor-pointer flex px-[20px] items-center text-sm leading-5 transition duration-150 ease-in-out">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <p className="text-white hover:text-hover xl:text-base md:text-xl text-base ml-[12px]">Contact </p>
                                                        </div>

                                                    </div>
                                                </li>
                                            </div>
                                        </Link>

                                    </ul>
                                </div>
                                <div className="w-full mt-20">
                                    <div className="flex-col text-white">
                                        <div className="flex space-x-3 py-2">
                                            <FiPhoneCall className='p-1' size={32} />
                                            <Link href='#'>
                                                <div className='cursor-pointer hover:text-hover'>{getSiteSettingData?.contact_number}</div>
                                            </Link>
                                        </div>
                                        <div className="flex space-x-3 py-2">
                                            <FiUser className='p-1' size={32} />

                                            {
                                                user.role ?
                                                    <div className="flex flex-col">
                                                        <Link href='#'>
                                                            <div className='cursor-pointer hover:text-hover' onClick={handleDashboard}>  {user?.role ?? ""} / Dashboard </div>
                                                        </Link>
                                                        <div className="mt-[16px]">
                                                            <div className='cursor-pointer hover:text-hover' onClick={handleLogout}> Logout </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <Link href='/login'>
                                                        <div className='cursor-pointer hover:text-hover'>Logging / Register</div>
                                                    </Link>
                                            }

                                        </div>
                                    </div>
                                    <div className="border-t border-gray-300 py-3">
                                        <div className="w-full flex items-center justify-between pt-1">

                                            <div className="flex w-64">

                                                {
                                                    siteData?.facebook ?
                                                        <div className='flex space-x-3 text-white pr-4'>
                                                            <Link href={`${siteData?.facebook ?? ""}`} >
                                                                <div className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                                                    <FiFacebook className='p-2' size={32} />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        : <span></span>
                                                }


                                                {
                                                    siteData?.twitter ?
                                                        <div className='flex space-x-3 text-white pr-4'>
                                                            <Link href={`${siteData?.twitter ?? ""}`} >
                                                                <div className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                                                    <FaTwitter className='p-2' size={32} />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        : <span></span>
                                                }

                                                {
                                                    siteData?.linkedIn ?
                                                        <div className='flex space-x-3 text-white pr-4'>
                                                            <Link href={`${siteData?.linkedIn ?? ""}`} >
                                                                <div className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                                                    <ImLinkedin2 className='p-2' size={32} />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        : <span></span>
                                                }

                                                {
                                                    siteData?.instagram ?
                                                        <div className='flex space-x-3 text-white pr-4'>
                                                            <Link href={`${siteData?.instagram ?? ""}`} >
                                                                <div className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                                                    <FaInstagram className='p-2' size={32} />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        : <span></span>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* mobile menu  */}


            </nav>
            {/* Code block ends */}
        </div>
    )
}

export default Header
