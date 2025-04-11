import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Experience from '../home/Experience';
import TaxFile from '../home/TaxFile';
import Trusted1 from './common/Trusted1';
import ExpertTeam from '../home/ExpertTeam';
import Contact from './Contact';
import SectionHeader from './common/SectionHeader';
import {getSiteSettingInformationAPI} from "../../../helpers/backend_helper";

const About = ({ siteData, aboutContent }) => {
    const [siteInformationData, setSiteInformation] = useState({})

    useEffect(() => {
        getSiteSettingInformationAPI().then(data => {
            setSiteInformation(data?.data)
        })
    }, [])
    
    const yearData = [
        { number: `${siteInformationData?.year_of_experience}`, title: 'YEARS EXPERIENCE' },
        { number:  `${siteInformationData?.per_month_filled}`, title: 'FILLED TAX PER MONTH' },
        { number: `${siteInformationData?.total_user}`, title: 'HAPPY CLIENTS' },
        { number:  `${siteInformationData?.expert_member}`, title: 'EXPERT MEMBERS' },
    ]

    return (
        <div>
            <SectionHeader heading='About' title='About' heading2='Home' />
            <div className='max-w-[1320px] mx-auto mt-16  px-6 '>
                <h1 className="inner-heading !text-[#1C2539]">About Us</h1>
            </div>

            {/* About */}
            <div className='relative -top-5'> <Experience siteData={siteData} /></div>
            {/* Number */}
            <div className='max-w-[1320px] mx-auto mt-20 md:mt-24'>
                <div className='flex justify-between items-center flex-col md:flex-row'>
                    {yearData.map((data, index) => (
                        <div key={index} className='mt-8 md:mt-0'>
                            <h1 className='number-heading text-center !text-[#1C2539]'>{data.number}</h1>
                            <p className='number-title mt-3 md:mt-4 lg:mt-6 !text-[#10B981]'>{data.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Goal */}
            <div className='mt-20 md:mt-24 bg-cover bg-center rounded-[40px] lg:mt-28 max-w-[1320px]  xl:h-[620px] p-6  mx-auto' style={{ backgroundImage: "url('/v3/Why/bg.svg')" }}>
                <div className='flex flex-col md:flex-row gap-6 lg:pt-14 xl:pt-10'>
                    <div className='w-full md:w-2/5 '>
                        <div className='border hidden xl:flex relative w-full lg:w-[292px] h-full lg:h-[392px] z-50 rounded-[20px] ml-10'>
                        </div>
                        <div className='relative hidden xl:flex -mt-20 -ml-3'>
                            <Image src='/v3/goal/design.svg' width={164} height={154} alt='card Image' />
                        </div>
                        <div className='w-full lg:w-[374px] h-auto lg:h-[456px] z-50 xl:-mt-[445px] relative xl:left-16 rounded-[20px] group-hover:!opacity-20'>
                            <Image src='/v3/goal/1.svg' width={374} height={456} alt='card Image' />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 xl:w-3/5  md:mt-24 lg:my-[175px]'>
                        <h2 className='inner-heading'>Our Company Goal</h2>
                        <p className='inner-description !text-white'>
                            {aboutContent?.our_goal}
                        </p>
                    </div>
                </div>
            </div>
            <div> <ExpertTeam siteData={siteData} /> </div>
            {/* Contact  */}
            <div className='mt-20  max-w-[1320px] mx-auto rounded-[40px]'>
                <Contact textColor='text-[#EEE]' inputBg='bg-transparent' bgImage='/v3/Why/bg.svg' />
            </div>
            {/* taxfile */}
            <div className='mt-16'><TaxFile siteData={siteData} /></div>
            {/* Team Meeting */}
            <div className='mt-20 md:mt-24 lg:mt-28 max-w-[1320px] mx-auto'>
                <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                    {aboutContent?.photo_gallery?.map((data, index) => (
                        <div key={index} className='relative mx-auto group'>
                            <Image
                                className='w-full rounded-[20px] group-hover:!opacity-20'
                                src={data?.image}
                                width={312}
                                height={350}
                                alt='card Image'
                            />
                            <div className='team-bg absolute inset-0 opacity-0 group-hover:!opacity-100 group-hover:duration-500 '>
                                <h2 className='meeting-header'>{data?.title}</h2>
                                <p className='inner-description mt-6 md:mt-7 lg:mt-8 xl:mt-10 text-center px-6'>{data?.deatils}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* branded */}
            <div> <Trusted1 siteData={siteData} /> </div>
        </div>
    );
};

export default About;
