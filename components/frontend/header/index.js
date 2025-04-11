import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { getAllUserRoleExceptAdminAPI } from '../../../helpers/backend_helper';
import { useUser } from '../../contexts/userContext';
import Menu from '../menu/menu';


const HomePageHeader = ({ siteData }) => {
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
        <div className=''>
            {/* compnay address top header part */}
            <div className=' lg:h-16 '>
                {/* main menu with sidebar */}
                <Menu siteData={siteData} />
            </div>

            {/* main header body part */}
            <div className='relative top-16 lg:top-0  h-[500px] lg:h-screen w-full flex justify-around items-center bg-no-repeat bg-right bg-cover bg-[url("/codecayonImage/background7.png")] '>
                <div className='lg:w-1/2 p-[5%]'>
                    <div className='w-[90%]'>
                        <p className='text-[24px] md:text-[38px] mb-1 lg:text-[50px] font-bold text-[#022853] capitalize'>{siteData?.header_title}</p>
                        <p className='text-xl capitalize'>{siteData?.header_Sub_title_} ...</p>
                        <div className=''>
                            <div className='flex items-center justify-center rounded shadow-sm bg-[#016EED] hover:bg-[#002B81] font-semibold  w-[200px] h-[50px] text-white text-[14px] md:text-[16px]'>
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
                </div>
                <div ></div>
            </div>
        </div >
    );
};

export default HomePageHeader;