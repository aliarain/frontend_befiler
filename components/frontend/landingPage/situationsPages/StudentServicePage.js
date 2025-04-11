import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '../../../../contexts/userContext';
import { getAllUserRoleExceptAdminAPI } from '../../../../helpers/backend_helper';


const StudentServicePage = ({ situationPage }) => {
    const { user } = useUser();

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
        <div className='hero_font_family container  py-[5%]'>
            <div className='relative z-20'>
                {/* card body part */}
                <div className='lg:flex justify-between gap-10'>
                    {/* card image part */}
                    <div className='relative z-20 md:w-1/2 flex md:justify-end justify-center my-[5%]'>
                        <div className='absolute -top-4 right-6 -z-10 bg-[#14AA40] rounded-[55px] w-[300px] h-[300px] lg:w-[450px] lg:h-[475px]'></div>
                        <img className=' right-28 w-[300px] h-[300px] lg:w-[450px] lg:h-[475px] rounded-[55px]' src={situationPage?.section_2_image} style={{objectFit:'cover',objectPosition: '50% 0%'}} alt="" />
                    </div>
                    {/* card description part */}
                    <div className=' lg:w-1/2 flex items-center text-justify'>
                        <div>
                            <h1 className='text-[22px] md:text-[32px] font-semibold mb-4'>{situationPage?.section_2_title}</h1>
                            <h1 className='text-[14px] md:text-[16px] font-normal leading-loose'>{situationPage?.section_2_sub_title}</h1>
                            <div className='flex items-center justify-center rounded shadow-sm bg-[#14AA40] hover:bg-[#03972f] font-semibold  w-[200px] h-[50px] text-white text-[14px] md:text-[16px]'>
                                {
                                    (userRoles.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                        <Link href="/user/"><a className='text-white capitalize'>
                                            Find on office
                                        </a></Link>
                                        :
                                        <Link href="/login"><a className='text-white capitalize'>
                                            Find on office
                                        </a></Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <img className='lg:block hidden landing-page-card-trasition absolute -top-32 left-0' style={{ zIndex: '-1' }} src="/codecayonImage/shed4.png" alt="" />
                    </div>
                </div>
            </div>
            <div className='relative my-[5%]'>
                {/* card body part */}
                <div className='lg:flex justify-between gap-10'>

                    {/* card description part */}
                    <div className='lg:w-1/2 flex items-center text-justify'>
                        <div>
                            <h1 className='text-[22px] md:text-[32px] font-semibold mb-4'>{situationPage?.section_3_title}</h1>
                            <h1 className='text-[14px] md:text-[16px] font-normal leading-loose'>{situationPage?.section_3_sub_title}</h1>
                            <div className='flex items-center justify-center rounded shadow-sm bg-[#14AA40] hover:bg-[#03972f] font-semibold  w-[200px] h-[50px] text-white text-[14px] md:text-[16px]'>
                                {
                                    (userRoles.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                        <Link href="/user/"><a className='text-white capitalize'>
                                            Find on office
                                        </a></Link>
                                        :
                                        <Link href="/login"><a className='text-white capitalize'>
                                            Find on office
                                        </a></Link>
                                }
                            </div>
                        </div>
                    </div>
                    {/* card image part */}
                    <div className='relative md:w-1/2 z-20 flex md:justify-start justify-center my-10'>
                        <div className='absolute -top-4 left-6 -z-10 bg-[#14AA40] rounded-[55px] w-[300px] h-[300px] lg:w-[450px] lg:h-[475px]'></div>
                        <img className=' right-28 w-[300px] h-[300px] lg:w-[450px] lg:h-[475px] rounded-[55px]' src={situationPage?.section_3_image} style={{objectFit:'cover',objectPosition: '50% 0%'}} alt="" />
                    </div>
                    <div>
                        <img className='lg:block hidden landing-page-card-trasition absolute -bottom-10 right-0' style={{ zIndex: '-1' }} src="/codecayonImage/shed4.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentServicePage;