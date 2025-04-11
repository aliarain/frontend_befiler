import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getSiteSettingInformationAPI } from '../../../helpers/backend_helper';

const Header = () => {
    const [getSiteSettingData, setSiteSettingData] = useState({});
    useEffect(() => {
        getSiteSettingInformationAPI().then(res => {
            if (res?.status === true) {
                setSiteSettingData(res?.data)

            }
        })
    }, [])

    const headerData = {
        address: { icon: "/v3/header/map.svg", text: `${getSiteSettingData?.office_address ?? ""}`},
        email: { icon: "/v3/header/envelope.svg", text: `${getSiteSettingData?.contact_email ?? ""}` },
        hours: { icon: "/v3/header/clock.svg", text: "Sat - Thu 10:00 AM - 06:00 PM", },
        socialMedia: [
            { icon: "/v3/header/facebook-f.svg", alt: "Facebook", link: `${getSiteSettingData?.facebook}` },
            { icon: "/v3/header/linkedin-in.svg", alt: "LinkedIn", link: `${getSiteSettingData?.linkedIn}` },
            { icon: "/v3/header/twitter.svg", alt: "Twitter", link: `${getSiteSettingData?.twitter}` },
            
        ]
    };

    return (
        <div className='bg-[#10B981] relative z-20 h-auto lg:h-[50px] mb-[20px] '>
            <div className='max-w-[1320px] px-2 md:px-0 mx-auto '>
                <div className='flex flex-wrap lg:flex-row justify-between items-center'>

                    <div className='flex space-x-3 sm:space-x-5 md:space-x-10'>
                        <div className='flex space-x-2 items-center '>
                            <div className='w-[14px] h-[18px] sm:w-[18px] sm:h-[22px] ' >
                                <Image src={headerData.address.icon} alt="address icon" width={18} height={22}
                                />
                            </div>
                            <p className='pt-[14px] sm:pt-3 text-white font-lg text-[12px] sm:text-[16px] sm:font-semibold'>{headerData.address.text}</p>
                        </div>
                        <div className='flex space-x-2 items-center'>
                            <div className='w-[12px] h-[12px] sm:w-[18px] sm:h-[18px] mb-1 sm:mb-0'>
                                <Image src={headerData.email.icon} alt="email icon" width={18} height={18}
                                />
                            </div>
                            <p className='pt-[14px] sm:pt-3 text-white font-lg text-[12px] sm:text-[16px] sm:font-semibold'>{headerData.email.text}</p>
                        </div>
                    </div>

                    <div className='flex flex-wrap flex-row space-x-3 sm:space-x-5 md:space-x-10 lg:mt-0'>
                        <div className='flex space-x-2 items-center'>
                            <div className='w-[12px] h-[12px] sm:w-[18px] sm:h-[18px] mb-1 sm:mt-1'>
                                <Image src={headerData.hours.icon} alt="hours icon" width={18} height={18}
                                />
                            </div>
                            <p className='pt-[12px] text-white font-lg text-[12px] sm:text-[16px] sm:font-semibold'>{headerData.hours.text}</p>
                        </div>

                        <div className='flex space-x-3 items-center sm:mb-0'>
                            {headerData.socialMedia.map((social, index) => (
                                <a key={index} className='w-[12px] h-[12px] sm:w-[18px] sm:h-[18px]' href={social.link} target="_blank" rel="noopener noreferrer">
                                    <Image src={social.icon} alt={social.alt} width={18} height={18}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
