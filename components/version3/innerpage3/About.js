import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExpertTeam3 from '../home3/ExpertTeam3';
import TaxFile3 from '../home3/TaxFile3';
import Contact from '../innerpage1/Contact';
import Number from '../innerpage2/common/Number';
import { getSiteSettingInformationAPI } from '../../../helpers/backend_helper';
import TeamMeetingContent from '../innerpage2/common/TeamMeatingContent';
import SectionHeader from './common/SectionHeader';

const About = ({siteData, aboutContent}) => {
    const [siteInformationData, setSiteInformation] = useState({})

    useEffect(() => {
        getSiteSettingInformationAPI().then(data => {
            setSiteInformation(data?.data)
        })
    }, [])
    const aboutData = [
        {
            title: 'Our Goal',
            description:`${aboutContent?.our_goal}`
        }
        
    ];
    const yearData = [
        { number: `${siteInformationData?.year_of_experience}`, title: 'YEARS EXPERIENCE' },
        { number:  `${siteInformationData?.per_month_filled}`, title: 'FILLED TAX PER MONTH' },
        { number: `${siteInformationData?.total_user}`, title: 'HAPPY CLIENTS' },
        { number:  `${siteInformationData?.expert_member}`, title: 'EXPERT MEMBERS' },
    ]

    const [activeIndex, setActiveIndex] = useState(0); 

    return (
        <div>
            <SectionHeader heading='About' title='About' heading2="Home" />
            <div className='max-w-[1320px] mx-auto mt-16 md:mt-20 lg:mt-24 px-8 lg:px-0'>
                <h1 className="inner-heading">About Us</h1>
            </div>

            {/* About */}
            <div className='mt-[80px] max-w-[1320px] mx-auto '>
                    <section className=''>
                        <div className='flex flex-col md:flex-row md:gap-10 lg:gap-20 xl:gap-[92px]'>
                            <div className='flex-1'>
                                <div className='sm:flex lg:gap-8 flex-col sm:flex-row'>
                                    <div className='relative -top-5'>
                                        <div className='relative !w-full about1 lg:w-[280px]'>
                                            <Image className='about1 !w-full' src='/v3/About3/about1.svg' width={260} height={440} alt='about image 1' />
                                        </div>
                                        <div className='div1 hidden lg:flex -mt-60'> </div>
                                        <p className='plan-heading hidden lg:flex justify-center -mt-14'>Best tax planning</p>
                                    </div>
                                    <div>
                                        <div className='w-full relative left-12 top-5 z-50 hidden lg:flex'>
                                            <Image className='' src='/v3/About3/frame.svg' width={220} height={81} alt='background frame' />
                                        </div>
                                        <div className='mt-0 lg:-mt-[115px]'>
                                            <div className='relative -left-[2px] hidden md:flex'>
                                                <Image className='about2 hidden md:flex mt-0 lg:mt-[90px] w-full lg:w-[290px]' src='/v3/About3/about2.svg' width={265} height={431} alt='about image 2' />
                                            </div>
                                            <div className='div2 hidden lg:flex -mt-[540px]'> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='md:-mt-16'>
                                <h1 className="inner-heading mt-3 md:-mt-6">{aboutContent?.title}</h1>
                                <p className='inner-description mt-6 md:mt-8 lg:!mt-10'>
                                {aboutContent?.about}
                                </p>
                                <div className='mt-7 md:mt-8 lg:mt-10 xl:mt-12'>
                                    <div className='flex items-center gap-6 md:gap-10 lg:gap-12 xl:gap-14'>
                                        {aboutData.map((data, index) => (
                                            <div key={index}>
                                                <button
                                                    onClick={() => setActiveIndex(index)}
                                                    className={`font-bold text-[16px] md:text-[18px] lg:text-xl ${activeIndex === index ? 'underline !text-[#10B981]' : 'text-white'
                                                        }`}
                                                >
                                                    {data.title}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mt-6'>
                                        <p className='inner-description'>
                                            {aboutData[activeIndex].description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            {/* Number */}
 
            <div className='-mt-8'>
                <Number numberData={yearData} descriptionText='#ffff' headingText='#ffff'/>
            </div>

            {/* Goal */}
             <div className='mt-20 md:mt-24  max-w-[1320px] mx-auto '>
                <div className='py-16 md:py-[150px] lg:py-[180px] xl:py-[208px] relative'>
                    <div className='absolute inset-0 rounded-[20px] bg-cover bg-center' style={{ backgroundImage: "url('/v3/taxFile/bg.svg')" }} />
                    <div className='absolute inset-0 rounded-[20px] bg-[#000000CC]' />

                    <div className='relative w-[90%] lg:w-[80%] xl:w-[75%] mx-auto'>
                        <h2 className='inner-heading'>Our Company Goal</h2>
                        <p className='inner-description'>
                        {aboutContent?.our_goal}
                        </p>
                    </div>
                </div>
            </div> 
            {/* Contact  */}
            <div className='mt-6'>
                <Contact bgColor='bg-[#012A2B]' textColor='text-white' inputBg='bg-[#012A2B]' cardBg='#10B981' cardText='#ffff' />
            </div> 

            {/* Expert Team  */}
            <div className='-mt-8'>
                    <ExpertTeam3 siteData={siteData} />
                </div> 

            {/* Tax file  */}
           <div className='-mt-32 lg:-mt-24 xl:-mt-20'>
                    <TaxFile3 siteData={siteData} />
                </div> 
                
            {/* Team Meeting */}
            <section className='mt-[100px] md:mt-[120px] !pb-10'>
                <TeamMeetingContent  aboutContent={aboutContent} bg='#012A2B' />
            </section>

        </div>
    );
};

export default About;

