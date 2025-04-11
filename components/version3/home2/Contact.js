import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getOneSiteSettingAPI } from '../../../helpers/backend_helper';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6';
import HomePageContactForm from '../../frontend/form/contactForm/homeForm ';

const Contact = ({ bgColor = 'bg-[#fff] ', textColor = 'text-[#5D666F]', inputBg = ' ', bgImage = "/v3/contact2/bg.svg" }) => {
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
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="max-w-[1320px] mx-auto text-white  -mt-16">
                <div className='flex flex-col md:flex-row gap-20 lg:gap-32 px-8 lg:px-0'>
                    <div className='mt-20 md:mt-[100px] '>
                        <h1 className='header leading-[55px] !text-white mt-6 capitalize md:mt-8 lg:mt-10'>{`Let's discuss`} <br /> <span className='whitespace-pre'>on something <span className='text-[#10B981]'>cool</span> </span> together</h1>
                        <div className='mt-16  space-y-3 md:space-y-4 lg:space-y-6'>
                            <div className='contact-card1'>
                                <Image width={24} height={24} src='/v3/contact2/email.svg' alt='email' />
                                <p className='text-white text-[16px] md:text-[18px] lg:text-xl relative top-2' >{contactContent?.contact_email ?? ""}</p>
                            </div>
                            <div className='contact-card1'>
                                <Image width={24} height={24} src='/v3/contact2/phone.svg' alt='phone' />
                                <p className='text-white  text-[16px] md:text-[18px] lg:text-xl relative top-2'>{contactContent?.contact_number ?? ""}</p>
                            </div>
                            <div className='contact-card1'>
                                <Image width={24} height={24} src='/v3/contact2/location.svg' alt='location' />
                                <p className='text-white text-[16px] md:text-[18px] lg:text-xl relative top-2'>{contactContent?.office_address ?? ""}</p>
                            </div>
                        </div>
                        <div className='py-12 flex items-center gap-2'>
                            <div className='contact-icon !cursor-pointer'>
                                <div className='relative top-5  left-5'>
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

                            </div>
                            <div className='contact-icon !cursor-pointer'>
                                <div className='relative top-5  left-5'>
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

                            </div>
                            <div className='contact-icon !cursor-pointer'>
                                <div className='relative top-5 left-5'>
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
                    </div>
                    <div className=' md:w-[739px] h-[500px] md:h-[650px] lg:h-[750px] -mt-14 md:mt-20   mb-10'>
                    <div className={`form-styles px-6 md:px-10 md:py-24 !border-2 !rounded-2xl `}>
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