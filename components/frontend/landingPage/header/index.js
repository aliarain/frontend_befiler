import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '../../../../contexts/userContext';
import { getAllUserRoleExceptAdminAPI } from '../../../../helpers/backend_helper';
import Menu from '../../menu/menu';
import TopHead from '../../shared/topHead/tophead';


const LandingPageHeader = ({ siteData, singleRole }) => {
    const { user } = useUser();
    const { hero_section_images = [] } = siteData || {};

    const banneerOne = hero_section_images[0] || "/codecayonImage/hero2.png";
    const banneerTwo = hero_section_images[1] || "/codecayonImage/hero1.png";


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
        <>
            <div className='h-14 lg:h-24'>
                <TopHead />
                {/* main menu with sidebar */}
                <Menu siteData={siteData} />
            </div>

            {/* main header body part */}
            <div className='relative lg:h-[600px] 2xl:h-[800px] hero hero-section z-10 w-full main-header flex justify-center '>
                <div className='grid grid-cols-1 lg:grid-cols-2 site_container extra_small'>
                    <div className='h-[300px] lg:h-full hero-section-div-weight'>
                        <img className='hidden lg:block lg:absolute lg:left-0 h-[300px]' src="/codecayonImage/ellipse.png" alt="" />
                        <div className='h-[300px] lg:h-[500px] flex items-center'>
                            <div className=''>
                                {/* hero section header data */}
                                <div className='hero-font-alignment hero_font_family capitalize'>
                                    <p className='text-[34px] lg:text-[44px] mb-1 font-bold  '>{siteData?.header_title ? `${siteData?.header_title}` : ''}</p>
                                    <p className='text-[16px] md:text-xl'>{siteData?.header_Sub_title_} ...</p>
                                </div>
                                {/* file button link */}
                                <div className='flex items-center justify-center lg:justify-start'>
                                    <div className='flex items-center justify-center rounded shadow-sm bg-[#14AA40] hover:bg-[#017426] hero_font_family w-[200px] h-[50px] text-white text-[14px] md:text-[16px]'>
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
                    </div>
                    <div className='relative h-[400px] lg:h-full hero-section-div-weight flex justify-center '>
                        <img className='absolute left-[10%] md:left-[15%] lg:left-10  top-[20%] z-20 hero-section-banner-image hero-section-banner-image-object' src={`${banneerOne}`} alt="" />
                        <img className='hidden 
                         hero-section-small-banner-image hero-section-banner-image-object' src={`${banneerOne}`} alt="" />

                        <img className='absolute top-[5%] z-10 hero-section-banner-image' src='/codecayonImage/rectangle1.png' alt="" />

                        <img className='absolute top-[10%] right-[10%] md:right-[20%] lg:right-10   z-20 hero-section-banner-image hero-section-banner-image-object' src={`${banneerTwo}`} alt="" />

                        <img className='hidden lg:block absolute z-10 bottom-[20%] h-[100px] right-0' src="/codecayonImage/vector1.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPageHeader;