/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import { getAllUserRoleExceptAdminAPI, verifyUserAPI } from '../../../helpers/backend_helper';
import { useEffect, useState } from 'react';

const Hero = ({ siteData }) => {
    const image = siteData?.hero_section_images?.[0];
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
            className="relative h-[550px] lg:h-[880px] -top-28  bg-cover overflow-hidden"
            style={{ backgroundImage: `url('/v3/hero/Bg.png')` }}
        >
            <div className='max-w-[1320px] mx-auto flex items-center px-4 md:px-16 h-full'>
                {/* Left side text */}
                <div className="w-full md:w-1/2 text-left">
                    <p className='agency max-w-[180px] md:max-w-[280px] mt-28 text-[12px] sm:text-[16px]  md:text-lg font-medium pl-3 mb-7 rounded-[2px] py-1 text-white'>
                        We're 100% Trusted Agency
                    </p>

                    <h4 className="w-[280px]  md:w-[550px] lg:w-[440px] font-[Urbanist] capitalize lg:text-[64px] md:text-5xl sm:text-3xl text-2xl font-semibold text-white mb-8 leading-[122%]">
                        {title}
                    </h4>

                    <p className="text-[16px] md:text-lg text-white mb-12 md:whitespace-pre ">
                        {subtitle}
                    </p>

                    <div>
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
                </div>

                <div className="hidden relative lg:block w-full  md:w-1/2 justify-center mt-28">
                    <div className='relative z-10 xl:ml-16 h-[589px] w-[685px]'>
                        <Image
                            src={image}
                            alt="Hero Image"
                            width={685}
                            height={589}
                            className=" h-[589px]  rounded-xl"
                        />
                    </div>


                    <div className='hidden xl:flex absolute left-[-18%] xl:left-[-5%] bottom-[30%] xl:bottom-[-10%] z-0 max-w-[198px] max-h-[198px]'>
                        <Image
                            src="/v3/hero/circle.png"
                            alt="Circle Image"
                            width={198}
                            height={198}
                            className="object-cover max-w-[198px] max-h-[198px] rounded"
                        />
                    </div>

                    <div className='hidden xl:flex absolute top-[20%] xl:top-[20%] right-[-10%] xl:right-[-30%]  max-w-[350px] max-h-[350px]'>
                        <Image
                            src="/v3/hero/ellipse.png"
                            alt="Ellipse Image"
                            width={400}
                            height={400}
                            className="object-cover rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
