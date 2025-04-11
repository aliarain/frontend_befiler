import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllUserRoleExceptAdminAPI, verifyUserAPI } from '../../../helpers/backend_helper';

const Hero3 = ({siteData}) => {
    const image1 = siteData?.hero_section_images?.[0];
    const title = siteData?.header_title;
    const subtitle = siteData?.header_Sub_title_;
    const [user, setUser] = useState({});
    const [userRole, setUserRoles] = useState([]);

    useEffect(() => {
        verifyUserAPI().then((userData) => {
            if (userData?.status === true) {
                setUser(userData?.data)
            }
        })
    }, [])

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

    return (
        <section
            className="bg-cover bg-center h-full"
            style={{ backgroundImage: `url('/v3/hero3/bg.svg')`}}
        >

            <div className="max-w-[1320px] mx-auto px-8 2xl:mb-12 lg:px-0  pt-20">
                <div className='flex flex-col items-center md:flex-row md:gap-14 lg:gap-20 xl:gap-24'>
                    <div className='w-full md:w-1/2'>
                        <h1 className='hero3-heading'>Exceptional guidance your <br className='hidden xl:flex' /> tax <span className='gradient'>success.</span> </h1>
                        <p className='tax-description !text-[#C6CED1] mt-5 md:mt-6 lg:mt-8 xl:mt-10'>There are many variations of passages available but the majority have suffered alteration in some form, by injected humour, or randomised words which donnot look even slightly believable.</p>
                        <div className='mb-10'>
                        {

                            (userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                <Link href="/user/">
                                    <button className="button  hover:!text-white  px-10 py-[22px] rounded">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                                :
                                <Link href="/login">
                                    <button className="button  hover:!text-white  px-10 py-[22px] rounded">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                        }
                    </div>
                        <div className='w-full lg:w-[900px] flex flex-col lg:flex-row lg:gap-5 xl:gap-12 mt-4 md:mt-7 lg:mt-20 xl:mt-[90px]'>
                            <div className='flex  items-center md:gap-3 lg:gap-5 xl:gap-6 '>
                                <Image className='w-[20px] xl:w-[40px]' src='/v3/hero3/support.svg' width={40} height={40} alt='supportIcon' />
                                <h4 className='text-white font-bold mt-2 text-[14px] xl:text-[18px]'>24/7 Support</h4>
                            </div>
                            <div className='flex flex-row  md:gap-3 lg:gap-5 xl:gap-6 mt-2 md:mt-0'>
                                <Image className='w-[20px] xl:w-[40px]' src='/v3/hero3/customer.svg' width={40} height={40} alt='supportIcon' />
                                <h4 className='text-white font-bold mt-2 text-[14px] xl:text-[18px]'>100% customer satisfaction</h4>
                              
                            </div>
                            <div className='flex items-center md:gap-3 lg:gap-5 xl:gap-6 mt-2 md:mt-0'>
                                <Image className='w-[20px] xl:w-[40px]' src='/v3/hero3/advice.svg' width={40} height={40} alt='supportIcon' />
                                <h4 className='text-white font-bold mt-2 text-[14px] xl:text-[18px] capitalize'>unlimited tax advice</h4>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-end relative xl:left-24 mt-10 md:mt-0'>
                        <Image className='relative w-full h-full'  src={image1} width={554} height={766} alt='Hero Image' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero3;

