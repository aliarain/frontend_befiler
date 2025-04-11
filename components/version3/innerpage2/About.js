import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExpertTeam2 from '../home2/ExpertTeam2';
import Testimonials2 from '../home2/Testimonial2';
import Trusted1 from '../innerpage1/common/Trusted1';
import CommonHeading2 from '../common/CommonHeading2';
import TeamMeetingContent from './common/TeamMeatingContent';
import Contact from '../home2/Contact';
import CompanyGoal from './common/CompanyGoal';
import Number from './common/Number';
import { getSiteSettingInformationAPI } from '../../../helpers/backend_helper';

const About = ({siteData, aboutContent}) => {
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

            <section className='max-w-[1320px] mx-auto mt-16 lg:mt-20'>
                <div className='flex flex-col md:flex-row px-8 lg:px-0 gap-6 lg:gap-24 xl:gap-36'>
                    <div className='flex-1'>
                        <div className='hidden xl:flex relative z-50 justify-end top-12 -left-6'>
                            <Image src='/v3/about/design1.svg' width={100} height={100} alt='design Image' />
                        </div>
                        <div className='relative hidden lg:flex rounded-2xl border-[1px] border-[#10B981] w-[397px] h-[531px] ml-[112px]'></div>
                        <div className='relative z-40 lg:-mt-[520px] w-full lg:w-[488px] h-auto sm:h-[595px]'>
                            <Image className='w-full h-[595px]' src='/v3/about/girl.svg' width={788} height={990} alt='About Image' />
                        </div>
                        <div className='hidden relative xl:flex z-0 justify-end -mt-52 -left-5'>
                            <Image src='/v3/about/dot.svg' width={165} height={153} alt='Star' />
                        </div>
                    </div>

                    <div className='flex-1 w-full mt-10 md:mt-28'>
                        <CommonHeading2 heading1='About Company' heading2='Your Partner in Corporate Strategy Achievement' />
                        <p className='inner-description1 !text-[#5D666F] mt-6 md:mt-8 lg:mt-10 '>{aboutContent?.our_goal}</p>
                        <p className='inner-description1 !text-[#5D666F] mt-6 md:mt-8 lg:mt-10 '>We specialize in empowering businesses to achieve their long-term goals through tailored corporate strategies with decades of experience, our team of seasoned consultants is dedicated to help companies navigate complex business</p>
                        <button className='about-button border-2 relative z-50 border-[#10b981] text-[#101928] hover:text-white  hover:bg-[#10B981] !mt-6 md:!mt-8 lg:!mt-10 xl:!mt-12'>learn More</button>
                    </div>
                </div>

                {/* Number section */}
                <div className='mb-14 xl:mb-24 mt-0 md:mt-14'> <Number numberData={yearData} descriptionText='#10B981'/> </div>
            </section>

            {/* company Goal */}
            <div > <CompanyGoal aboutContent={aboutContent} bgImage='/v3/About3/goalbg.svg' /> </div>

            {/*  Expert Team 2  */}
            <section>
                <ExpertTeam2 siteData={siteData} />
            </section>

            {/*  Testimonials 2 */}
            <section className='mt-10 md:mt-16 lg:mt-20 xl:mt-[100px]'>
                <Testimonials2  siteData={siteData} />
            </section>

            {/* contact  */}
            <section className='mt-10 md:mt-16 lg:mt-20 xl:mt-[100px]'>
                <Contact bgImage='/v3/contact2/bg.svg' />
            </section>

            {/* Team Meeting  */}
            <section className='mt-10 md:mt-16 lg:mt-20 xl:mt-[110px]'>
                <TeamMeetingContent  aboutContent={aboutContent} bg='#10B981' />
            </section>

            {/*  Trusted2  */}
            <section>
                <Trusted1 siteData={siteData}/>
            </section>

        </div>
    );
};

export default About;