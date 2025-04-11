import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from 'react-icons/io5';
import { getOneSiteSettingAPI } from '../../../helpers/backend_helper';
import Link from 'next/link';
import HomePageContactForm from '../../frontend/form/contactForm/homeForm ';

const Contact = ({ textColor = 'text-[#5D666F]',  bgImage = "", cardBg = '#fff', cardText = '#10B981' }) => {
    const [contactContent, setContactContent] = useState({});
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {

            if (data?.status === true) {
                setContactContent(data?.data);
            }
        })
    }, [])

    const fromStyle = [{
        bgcolor: 'white',
        textColor: 'black',
    }]

    return (
        <section
            className="mx-auto max-w-[1320px] h-auto bg-cover bg-center rounded-[20px] md:rounded-[40px] "
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="  text-white px-6 md:px-0">
                <div className='flex flex-col md:flex-row gap-6 lg:gap-20 md:pl-10'>
                    <div className='mt-12 md:mt-[50px] '>
                        <h1 className={`header capitalize leading-[55px] ${textColor} mt-6 md:mt-8 lg:mt-10`}>{`Let's discuss`} <br /> <span className='whitespace-pre'>on something <span className='text-[#10B981]'>cool</span>  </span> together</h1>
                        <div className='md:mt-12  space-y-3 md:space-y-4 lg:space-y-4'>
                            <div className={`  p-3 lg:p-4  rounded-xl flex gap-3 lg:gap-4 hover:text-[${cardText}] hover:bg-[${cardBg}]`}>
                                <MdOutlineMailOutline className='w-6 h-6 mt-[13px]' />

                                <p className='  text-[16px]  md:text-[18px] lg:text-xl relative top-2' >{contactContent?.contact_email ?? ""}</p>
                            </div>
                            <div className={` p-3 lg:p-4 rounded-xl flex gap-3 lg:gap-4  hover:text-[${cardText}] hover:bg-[${cardBg}]`}>
                                <FaPhoneAlt className='h-6 w-6 mt-[11px]' />
                                <p className='  text-[16px] md:text-[18px] lg:text-xl relative top-2'>{contactContent?.contact_number ?? ""}</p>
                            </div>
                            <div className={`  p-3 lg:p-4  rounded-xl flex gap-3 lg:gap-4  hover:text-[${cardText}] hover:bg-[${cardBg}]`}>
                                <IoLocationOutline className='h-6 w-6 mt-[11px]' />
                                <p className='  text-[16px] md:text-[18px] lg:text-xl relative top-2'>{contactContent?.office_address ?? ""}</p>
                            </div>
                        </div>
                        <div className='py-12 flex items-center gap-2'>

                            <div className={`relative left-4 p-3 !cursor-pointer hover:bg-[${cardBg}] hover:text-[${cardText}] rounded-full`}>
                                {contactContent?.facebook ? (
                                    <Link href={contactContent.facebook}>
                                        <FaFacebookF className="h-6 w-6" />
                                    </Link>
                                ) : (
                                    <span>
                                        <FaFacebookF className="h-6 w-6" />
                                    </span>
                                )}
                            </div>

                            <div className={`relative left-4 p-3 !cursor-pointer hover:bg-[${cardBg}] hover:text-[${cardText}] rounded-full`}>
                                {contactContent?.instagram ? (
                                    <Link href={contactContent.instagram}>
                                        <FaInstagram className="h-6 w-6" />
                                    </Link>
                                ) : (
                                    <span>
                                        <FaInstagram className="h-6 w-6" />
                                    </span>
                                )}

                            </div>

                            <div className={`relative left-4 p-3 !cursor-pointer hover:bg-[${cardBg}] hover:text-[${cardText}] rounded-full`}>
                                {contactContent?.twitter ? (
                                    <Link href={contactContent.twitter}>
                                        <FaTwitter className="h-6 w-6" />
                                    </Link>
                                ) : (
                                    <span>
                                        <FaTwitter className="h-6 w-6" />
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className=' md:w-[739px] md:h-[758px] md:mt-20 px-6  mb-8 md:mb-4'>
                        <div className={`form-styles px-10 md:py-24 !border-2 !rounded-2xl`}>
                            {
                                fromStyle?.map((d, i) => <HomePageContactForm key={i + 1} color={d ?? ""} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;