import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '../../../../contexts/userContext';
import { getAllUserRoleExceptAdminAPI } from '../../../../helpers/backend_helper';
import Menu from '../../menu/menu';


const SecondHeader = ({ siteData, singleRole, situationPage }) => {
    const { user } = useUser();
    const router = useRouter();

    // fetch all user roles
    const [userRoles, setUserRoles] = useState([]);
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
        <div>
            <div className='hero_font_family'>
                <div className='lg:h-16'>
                    {/* main menu with sidebar */}
                    <Menu siteData={siteData} />
                </div>

                {/* main header body part for large device*/}
                <div className='relative  second_header flex justify-center items-center'>
                    <div className='container'>
                        <h1 className='text-center text-[34px] font-extrabold  text-white'>Tax Situation</h1>
                        <p className='text-[18px] text-center '>
                            <span className='cursor-pointer'>
                                <Link href="/"><a className={router.pathname === "/" ? " text-[#14AA40]" : "text-white"}>Home</a></Link>
                            </span>
                            <span className='text-white'> / </span>
                            <span className='cursor-pointer text-[#14AA40]'>{singleRole?.display_name ?? ""}</span>
                        </p>
                    </div>
                </div>

                <div className='container flex justify-center'>
                    <div className='lg:flex justify-between items-center gap-4 md:p-[5%]'>
                        {/* main site header data and subsite header data */}
                        <div className='lg:w-[600px] my-[10%]'>
                            <p className='text-[24px] md:text-[34px] mb-2 font-bold capitalize'>Hi {singleRole?.display_name ?? ''}</p>
                            <p className='md:text-[24px] mb-4 capitalize'>{situationPage?.hero_section_title ?? ''}</p>
                            <p className='md:text-[16px] capitalize'>{situationPage?.hero_section_title_Sub_title ?? ''} </p>
                            {/* file button link */}
                            <div className=''>
                                <div className='flex items-center justify-center rounded shadow-sm bg-[#14AA40] hover:bg-[#078e2f]   w-[200px] h-[50px] text-white text-[14px] md:text-[16px]'>
                                    {
                                        (userRoles.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                            <Link href="/user/"><a className='text-white capitalize'>
                                                File Your Taxes Online
                                            </a></Link>
                                            :
                                            <Link href="/login"><a className='text-white capitalize'>
                                                File Your Taxes Online
                                            </a></Link>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div className=' w-full md:w-1/2 mt-10 lg:mt-0 flex justify-center'> */}
                        <div className='relative h-[300px] w-[300px] md:h-[500px] md:w-[500px] mx-auto flex justify-center items-center'>
                            <img className='h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full subBanner' src={situationPage?.hero_section_image ?? ''} alt="" />
                            <img className='hidden md:block h-[250px] w-[] absolute top-1 -right-[20px] rounded' src='/codecayonImage/imageTop.png' alt="" />
                            <img className='hidden md:block h-[250px] w-[]  absolute bottom-2 -left-6  rounded' src='/codecayonImage/imageBtm.png' alt="" />
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondHeader;