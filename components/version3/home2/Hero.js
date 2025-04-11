/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllUserRoleExceptAdminAPI, verifyUserAPI } from '../../../helpers/backend_helper';

const Hero = ({ siteData }) => {
    const image1 = siteData?.hero_section_images?.[0];
    const image2 = siteData?.hero_section_images?.[1];
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
        <div
            className="relative h-[980px] lg:h-[880px] -top-28 bg-cover overflow-hidden "
            style={{ backgroundImage: `url('/v3/hero2/bg.svg')` }}
        >
            <div className='max-w-[1320px] mx-auto grid xl:mt-16 lg:mt-16 grid-cols-1 md:grid-cols-3 items-center space-x-0 md:space-x-10  lg:space-x-20 h-full px-6 xl:px-0'>
                {/* Left side text */}
                <div className="w-full md:col-span-1 mt-32 xl:-mt-20 text-left">
                    <p className='agency max-w-[180px] md:max-w-[280px]  text-[12px] sm:text-[16px]  md:text-lg font-medium pl-3 mb-7 rounded-[2px] py-1 text-white'>
                        We're 100% Trusted Agency
                    </p>
                    <div className='hidden md:flex max-h-[529px] max-w-[380px] '>
                        <Image
                            src={image1}
                            alt="Hero Image"
                            width={380}
                            height={529}
                            className=" max-h-[529px] max-w-[380px]  rounded-xl"
                        />
                    </div>
                </div>

                <div className='w-full md:col-span-2  '>
                    <div className=' max-w-[300px] md:max-w-[650px] '>
                        <p className="font-[Urbanist] capitalize lg:text-[64px] md:text-5xl sm:text-3xl text-2xl font-bold text-white mb-8 leading-[120%]">
                            {title}
                        </p>
                        <p className="text-[16px] leading-[187%] text-[#C6CED1] mb-12  ">
                            There are many variations of passages available but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                        </p>
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
                        <p className="text-[16px] lg:text-[14px] xl:text-lg font-medium text-white mb-12  ">
                           {subtitle}
                        </p>
                    </div>
                    <div className=" relative left-0 lg:left-[300px] xl:left-[430px] top-0  lg:-mt-56  xl:-top-48">
                        <div className='max-w-[300px] xl:w-[367px] h-[136px] rounded-full '>
                            <Image
                                src={image2}
                                alt="Ellipse Image"
                                width={367}
                                height={136}
                                className=" rounded-full"
                            />

                        </div>
                        <div className='flex space-x-2  mt-4'>
                            <div className='w-[54px] h-[40px]'>
                                <Image
                                    src="/v3/hero2/koma.svg"
                                    alt="Ellipse Image"
                                    width={54}
                                    height={40}
                                    className=""
                                />

                            </div>
                            <p className='text-white max-w-[300px] lg:w-[200px] xl:w-[300px] text-[16px]'>There are many variations of passages available but the majority have</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
