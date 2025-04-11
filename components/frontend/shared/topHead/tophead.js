import Link from 'next/link';
import React from 'react';
import { BsTelephoneFill, BsTwitter } from 'react-icons/bs';
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';
import { useUser } from '../../../../contexts/userContext';
import { getOneSiteSettingAPI } from '../../../../helpers/backend_helper';


const TopHead = () => {
    const { user } = useUser();
    const [siteData, setSiteData] = useState();
    //get one  site data
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    
    return (
        <div className='border-b-[1px] hidden xl:px-[10%] z-40 bg-[#58617b] text-[#20eef9] lg:block text-[14px] font-mono'>
            {/* top header */}
            <div className='flex justify-between items-center hero_font_family'>
                <div className='flex '>
                    <div className='flex items-center p-1 border-r-[1px] hover:text-[#14A940]' >
                        <MdEmail size={20} className='mr-1' />
                        <Link href={`mailto:${siteData?.contact_email}`}><span className='lg:mr-6 hover:cursor-pointer font-[Montserrat]'>{siteData?.contact_email ?? ""}</span></Link>
                    </div>
                    <div className='flex items-center  p-1 hover:text-[#14A940]'>
                        <BsTelephoneFill className='mr-1' />
                        <Link href='tel:+1 647 987 4025'><span className='lg:mr-6 hover:cursor-pointer font-[Montserrat]'>{siteData?.contact_number ?? ""}</span></Link>
                    </div>
                </div>
                <div className='flex items-center justify-center border-gray-500 p-1 text-gray-500'>
                    {
                        siteData?.facebook ?
                            <Link href={`${siteData?.facebook ?? ""}`}><a target="_blank" className='anchor-color'><FaFacebookF size={15} className='mx-2  hover:cursor-pointer  ' /></a></Link>
                            :
                            <span></span>
                    }
                    {
                        siteData?.twitter ?
                            <Link href={`${siteData?.twitter ?? ""}`}><a target="_blank" className='anchor-color'><BsTwitter size={15} className='mx-2 hover:cursor-pointer  ' /></a></Link>
                            :
                            <span></span>
                    }
                    {
                        siteData?.instagram ?
                            <Link href={`${siteData?.instagram ?? ""}`}><a target="_blank" className='anchor-color'><AiFillInstagram size={15} className='mx-2  hover:cursor-pointer  ' /></a></Link>
                            :
                            <span></span>
                    }
                    {
                        siteData?.whatsapp ?
                            <Link href={`https://wa.me/${siteData?.whatsapp}`}><a target="_blank" className='anchor-color'><FaWhatsapp size={15} className='mx-2  hover:cursor-pointer ' /></a></Link>
                            :
                            <span></span>
                    }
                </div>
            </div>
        </div>
    );
};

export default TopHead;