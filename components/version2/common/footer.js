import React, { useState, useEffect } from "react";
import { FiPhoneCall, FiFacebook } from 'react-icons/fi';
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { ImLinkedin2 } from 'react-icons/im'
import {IoEarth} from "react-icons/io5";
import { getAllFrontPageAPI, getOneSiteSettingAPI, getSiteSettingInformationAPI } from "../../../helpers/backend_helper";
import { useRouter } from "next/router";
import Link from "next/link";
import {AiOutlineMail} from "react-icons/ai";


function Footer() {
    const [frontPage, setFrontPage] = useState([]);
    const [siteData, setSiteData] = useState();
    const router = useRouter();

    const [getSiteSettingData, setSiteSettingData] = useState({});
    useEffect(() => {
        getSiteSettingInformationAPI().then(res => {
            if (res?.status === true) {
                setSiteSettingData(res?.data)

            }
        })
    }, [])

    //show all front page data
    useEffect(() => {
        getAllFrontPageAPI().then(data => {
            setFrontPage(data?.data?.docs);
        })
    }, [])

    //get one  site data
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    // filter menu pages
    const footerMenuData = frontPage?.filter(data => data?.type === "footer");

    const handleRouteChange = async (_id) => {
        await router.push(`/v2/front-end?_id=${_id}`)
    }

    return (
        <>

            <div className="bg-[#292828]">
                <div className="container py-6">
                    <div className='grid justify-center md:grid-cols-4 lg:grid-cols-4 lg:gap-[12px] pt-5 pb-20 pl-[20px] md:pl-0'>

                        <div className='md:col-span-1 mt-[38px]'>

                            <div className='flex items-center space-x-3'>

                                <Link href="/">
                                    <img src={getSiteSettingData?.logo || ""} alt="logo" width={235} height={100} />
                                </Link>
                            </div>
                            <p className='my-8 max-w-md paragraph !text-white text-justify'>
                                {siteData?.office_address ?? ''}
                            </p>

                        </div>

                        <div className='md:col-span-1 lg:col-span-1 md:mt-16 col-span-1 md:justify-self-center'>
                            <h3 className='header_5 text-grray'>Services</h3>
                            <div className='paragraph mt-7 flex flex-col text-grray'>
                                {
                                    footerMenuData?.map((val) => {
                                        return (
                                            <span onClick={() => handleRouteChange(val?._id)} className='hover:text-hover !text-white mt-2 paragraph cursor-pointer' key={val._id}>{val.name}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='md:col-span-1 lg:col-span-1 md:mt-14 col-span-1 md:justify-self-center'>
                            <h3 className='header_5 text-grray'>Contact Us</h3>
                            <div className='paragraph mt-8 flex flex-col text-grray'>

                                <div className=" mt-2 ">
                                    <p className='text-hover header_6 block'>Office Address</p>
                                    <p className='hover:text-hover !text-white paragraph block'>{siteData?.office_address}</p>
                                </div>

                                <div className=" mt-2 ">
                                    <p className='text-hover header_6 block'>Working Hours</p>
                                    <p className='hover:text-hover !text-white paragraph block'>{`${siteData?.working_time[0] ?? ""} to ${siteData?.working_time[1] ?? ""}`}</p>
                                    <p className='hover:text-hover !text-white paragraph block'>{`${siteData?.working_day[0]}  to  ${siteData?.working_day[1]}`}</p>

                                </div>

                            </div>
                        </div>
                        <div className='md:col-span-1 lg:col-span-1 mt-[20px] md:mt-14 col-span-1 md:justify-self-center'>
                            <h3 className='header_5 text-grray'>For any kind of support</h3>
                            <div className='mt-8 flex flex-col font-medium text-base text-grray'>
                                {/* all social links */}
                                <div className='flex space-x-3'>
                                    {
                                        siteData?.facebook ?
                                            <div className='flex space-x-3 text-white '>
                                                <Link href={`${siteData?.facebook ?? ""}`} >
                                                    <a className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                                        <FiFacebook className='p-2' size={32} />
                                                    </a>
                                                </Link>
                                            </div>
                                            : <span></span>
                                    }


                                    {
                                        siteData?.twitter ?
                                            <div className='flex space-x-3 text-white '>
                                                <Link href={`${siteData?.twitter ?? ""}`}>
                                                    <a className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                                        <FaTwitter className='p-2' size={32} />
                                                    </a>
                                                </Link>
                                            </div>
                                            : <span></span>
                                    }

                                    {
                                        siteData?.linkedIn ?
                                            <div className='flex space-x-3 text-white '>
                                                <Link href={`${siteData?.linkedIn ?? ""}`} >
                                                    <a className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                                        <ImLinkedin2 className='p-2' size={32} />
                                                    </a>
                                                </Link>
                                            </div>
                                            : <span></span>
                                    }

                                    {
                                        siteData?.instagram ?
                                            <div className='flex space-x-3 text-white '>
                                                <Link href={`${siteData?.instagram ?? ""}`}>
                                                    <a className="border-[1px] w-10 h-10 border-white rounded-full text-white font-bold flex justify-center items-center hover:bg-hover">
                                                    <FaInstagram className='p-2' size={32} />
                                                    </a>
                                                </Link>
                                            </div>
                                            : <span></span>
                                    }
                                </div>
                                {/* phone, website, email  */}
                                <div className='flex flex-col mt-6'>
                                    <div className='flex items-center space-x-3'>
                                        <FiPhoneCall className='text-grray p-2' size={35} />
                                        <p className='hover:text-hover'>{siteData?.contact_number ?? ""}</p>
                                    </div>

                                    <div className='flex items-center space-x-3 text-grray'>
                                        <IoEarth className='text-grray p-2' size={35} />
                                        <Link href={siteData?.website || ''} >
                                        <a className='hover:text-hover text-grray'>{siteData?.website ?? ""}</a>
                                        </Link>
                                    </div>

                                    <div className='flex items-center space-x-3'>
                                        <AiOutlineMail className='text-grray p-2' size={35} />
                                        <Link href={`mailto:${siteData?.contact_email ?? ""}`}>
                                        <a  className='hover:text-hover !text-grray'>{siteData?.contact_email ?? ""}</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-secondary_gray max-w-[1920]'>
                    <div className='container py-1'>
                        <div className='flex justify-center items-center text-[16px]'>
                            <p className='text-grray paragraph mt-2'>© {new Date().getFullYear()} {siteData?.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;