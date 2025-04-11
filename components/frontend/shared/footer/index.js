import React, { useEffect, useState } from 'react';
import { GoLocation, GoClock } from "react-icons/go";
import { BsTelephone, BsTwitter } from "react-icons/bs";
import { SiWeblate } from "react-icons/si";
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { getAllFrontPageAPI, getOneSiteSettingAPI } from '../../../../helpers/backend_helper';


const Footer = () => {
    const [frontPage, setFrontPage] = useState([]);
    const router = useRouter();
    const [siteData, setSiteData] = useState();

    //get one  site data
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    //show all front page data
    useEffect(() => {
        getAllFrontPageAPI().then(data => {
            setFrontPage(data?.data?.docs);
        })
    }, [])

    // filter menu pages 
    const footerData = frontPage?.filter(data => data?.type === "footer");
    const footerDataSlice = footerData?.slice(0, 5);

    // handle router change for front page
    const handleRouteChange = (id) => {
        router.push(`/home/front-end-page?id=${id}`)
    }


    return (
        <div className='mt-[2%] '>
            <div className='flex items-center justify-center p-[5%] container'>
                <div className='md:grid md:grid-cols-2 lg:grid-cols-4 gap-[1%] '>
                    <div className='p-2 text-gray-600 text-[14px] md:text-[16px]'>

                        {/* company contact information */}
                        <div className='text-base hover:text-gray-600 my-2'>
                            {/* company logo */}
                            <div className='h-16 w-[150px] mb-4'>
                                <Link href="/">
                                    <img className='h-full w-[150px] object-contain object-center cursor-pointer' src={siteData?.logo ? `${siteData?.logo}` : ""} alt="logo" />
                                </Link>
                            </div>
                            <div className='flex gap-4'>

                                <span className=' border-[1px] border-black rounded-full w-8 h-8 flex justify-center items-center'><BsTelephone className='text-gray-600' size={18} /></span>
                                <Link href={siteData?.contact_number || ''}><p className='  mb-0 hover:cursor-pointer  text-[14px] md:text-[16px]'>{siteData?.contact_number ?? ""}</p></Link>
                            </div>
                        </div>
                        <div className='text-base hover:text-gray-600 my-2'>
                            <div className='flex gap-4 hover:cursor-pointer'>
                                <div className='border-[1px] border-black rounded-full w-8 h-8 flex justify-center items-center'>
                                    <SiWeblate className='text-gray-600 w-8 h-8 p-1' size={18} />
                                </div>
                                <Link href={siteData?.website || ''}>
                                    <p className='hover:cursor-pointer mb-0 text-[14px] md:text-[16px]'>{siteData?.website ?? ""}</p>
                                </Link>
                            </div>
                        </div>
                        <div className='text-base hover:text-gray-600 my-2'>
                            <div className='flex gap-4'>
                                <span className=' border-[1px] border-black rounded-full w-8 h-8 flex justify-center items-center'><MdEmail className='text-gray-600' size={18} /></span>
                                <Link href={`mailto:${siteData?.contact_email ?? ""}`}>
                                    <p className='  mb-0 hover:cursor-pointer  text-[14px] md:text-[16px]'>{siteData?.contact_email ?? ""}</p>
                                </Link>
                            </div>
                        </div>

                    </div>
                    {/* footer service link */}
                    <div className='p-2 md:ml-3'>
                        <p className='text-[16px] md:text-[24px]  text-gray-600'>Services Links</p>
                        <div className='text-[14px] md:text-[16px]'>
                            {
                                footerDataSlice?.map((footer, i) => <p key={i + 1} className='mb-0 hover:cursor-pointer hover:underline  text-gray-600 hover:text-red-500' onClick={() => handleRouteChange(footer?._id)} >{footer?.name ?? ""}</p>)
                            }
                        </div>
                    </div>
                    {/* office address and office hours */}
                    <div className='p-2'>
                        <p className='text-[16px] md:text-[24px] text-gray-600  '>Contact Us</p>
                        <div className=' text-gray-600'>
                            <div className='text-[12px] md:text-[14px]'>
                                <div className='flex items-center  gap-[2%]'>
                                    <span className=''><GoLocation className='text-gray-600 mb-2' size={30} /></span>
                                    <div>
                                        <p className='hover:text-gray-600 mb-0 text-gray-600'>Office Address</p>
                                        <p className='hover:text-gray-600'>{siteData?.office_address ?? ""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-[12px] md:text-[14px]'>
                                <div className='flex items-center  gap-[2%]'>
                                    <span className=''><GoClock className='text-gray-600 mb-2' size={35} /></span>
                                    <div>
                                        <p className='hover:text-gray-600 mb-0 text-gray-600'>Working Hours</p>
                                        <p className='hover:text-gray-600'>
                                            <span className='uppercase'>{`${(!!siteData?.working_time) ? siteData?.working_time[0] : ""} to ${(!!siteData?.working_time) ? siteData?.working_time[1] : ""}`}</span>
                                            <span> &#45; </span>
                                            <span className='capitalize'>{`${(!!siteData?.working_time) ? siteData?.working_day[0] : ""}  to  ${(!!siteData?.working_time) ? siteData?.working_day[1] : ""}`}</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* help and support section */}
                    <div className='p-2 flex items-center justify-center'>
                        <div>
                            <p className='text-gray-600 font-semibold text-center text-[14px] md:text-[18px] mb-0'>For any kind of support</p>
                            <div className='flex items-center justify-center'>
                                {
                                    siteData?.facebook ?
                                        <Link href={`${siteData?.facebook ?? ""}`}><a target="_blank" className='anchor-color'><FaFacebookF size={20} className='mx-2 mt-1 hover:cursor-pointer text-gray-600 hover:text-[#1877F2]' /></a></Link>
                                        :
                                        <span></span>
                                }
                                {
                                    siteData?.twitter ?
                                        <Link href={`${siteData?.twitter ?? ""}`}><a target="_blank" className='anchor-color'><BsTwitter size={20} className='mx-2 mt-1 hover:cursor-pointer text-gray-600 hover:text-[#1DA1F2]' /></a></Link>
                                        :
                                        <span></span>
                                }
                                {
                                    siteData?.instagram ?
                                        <Link href={`${siteData?.instagram ?? ""}`}><a target="_blank" className='anchor-color'><AiFillInstagram size={20} className='mx-2 mt-1 hover:cursor-pointer text-gray-600 hover:text-[#BB05DB]' /></a></Link>
                                        :
                                        <span></span>
                                }
                                {
                                    siteData?.whatsapp ?
                                        <Link href={`https://wa.me/${siteData?.whatsapp ?? "#"}`}><a target="_blank" className='anchor-color'><FaWhatsapp size={20} className='mx-2 mt-1 hover:cursor-pointer text-gray-600 hover:text-[#41E75F]' /></a></Link>
                                        :
                                        <span></span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className='bg-[#14AA40] p-2 '>
                <p className='text-center font-[16px] text-[#ffffff] capitalize'>&copy; {siteData?.username ?? ""} {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};

export default Footer;
