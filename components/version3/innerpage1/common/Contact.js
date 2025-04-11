import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from 'react-icons/io5';
import { getOneSiteSettingAPI } from '../../../../helpers/backend_helper';
import Link from 'next/link';
import HomePageContactForm from '../../../frontend/form/contactForm/homeForm ';

const Contact = ({textColor = 'text-[#5D666F]', bgImage = "", bg = "#1C2539" }) => {

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
            className="mx-auto max-w-[1320px] h-auto bg-cover rounded-[40px] "
        >
            <div className="  ">
                <div className='flex flex-col md:flex-row gap-20 lg:gap-32 px-8 '>
                    <div className='mt-20 md:mt-[100px] '>
                        <h1 className={`header leading-[55px] !text-[#1C2539] mt-6 md:mt-8 lg:mt-10`}>{`Let's discuss`} <br /> <span className='whitespace-pre'>on something cool </span> together</h1>
                        <div className={`mt-16  space-y-3 md:space-y-4 lg:space-y-6 bg-[${bg}] rounded-[20px] py-2`}>
                            <div className='p-4 rounded-[20px] flex gap-3 text-[#fff] hover:text-[#10B981] lg:gap-4 hover:bg-[#fff]'>
                                <MdOutlineMailOutline className={`text-2xl mt-[13px] text-[${textColor}]`} />

                                <p className='  text-[16px]  md:text-[18px] lg:text-xl relative top-2' >{contactContent?.contact_email ?? ""}</p>
                            </div>
                            <div className='p-4 rounded-[20px] flex gap-3 text-[#fff] hover:text-[#10B981] lg:gap-4 hover:bg-[#fff]'>
                                <FaPhoneAlt className={`text-2xl mt-[13px] text-[${textColor}]`} />
                                <p className='  text-[16px] md:text-[18px] lg:text-xl relative top-2'>{contactContent?.contact_number ?? ""}</p>
                            </div>
                            <div className='p-4 rounded-[20px] flex gap-3 text-[#fff] hover:text-[#10B981] lg:gap-4 hover:bg-[#fff]'>
                                <IoLocationOutline className={`text-2xl mt-[13px] text-[${textColor}]`} />
                                <p className='  text-[16px] md:text-[18px] lg:text-xl relative top-2'> {contactContent?.office_address ?? ""}</p>
                            </div>
                        </div>
                        <div className='py-12 flex items-center gap-2 !p-2'>

                            <div className='relative left-4 p-3  hover:bg-[#10B981] hover:text-[#fff] rounded-full'>

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

                            <div className='relative left-4 p-3 hover:bg-[#10B981] hover:text-[#fff] rounded-full'>
                                {/* <FaInstagram className='h-6 w-6' /> */}
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

                            <div className='relative left-4 p-3 hover:bg-[#10B981] hover:text-[#fff] rounded-full'>
                                {/* <FaTwitter className='h-6 w-6' /> */}
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
                    <div className='bg-no-repeat bg-cover w-full lg:w-[740px] h-[590px] lg:h-[620px] xl:h-[760px] rounded-[40px] bg-center md:mt-32' style={{ backgroundImage: `url(${bgImage})` }}>
                       <div className={`form-styles px-10 pt-10 lg:pt-20 xl:py-32`}>
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