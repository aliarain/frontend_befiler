import React, { useState, useEffect } from 'react';
import HomeLayout from '../../layout/home';
import AboutHome from '../../components/version2/home/about_home';
import Experience from '../../components/version2/about/experiance';
import OurGoal from '../../components/version2/about/our_goal';
import Members from '../../components/version2/home/members';
import Testimonials from '../../components/version2/home/testimonials';
import Contact from '../../components/version2/home/contact';
import Section from '../../components/version2/about/section';
import Banner from '../../components/version2/common/banner';
import { getOneAboutContentAPI } from '../../helpers/backend_helper';
import Link from 'next/link';
import Brands from '../../components/version2/home/brands';

const About = () => {
    const [aboutContent, setAboutContent] = useState({});

    useEffect(() => {
        getOneAboutContentAPI().then(res => {
            if (res?.status === true) {
                setAboutContent(res?.data)
            }
        })
    }, [])

    return (
        <>
            <Banner name="About Us" title="Home" sub_title="About Us" />
            <AboutHome aboutContent={aboutContent} />
            <Experience />
            <div className="mb-10 mt-5">
                <OurGoal aboutContent={aboutContent} />
            </div>
            <Members aboutContent={aboutContent} />
            <div className="">
                <Testimonials />
            </div>

            <div className="bg-[#292828] h-[380px] -mt-10">
                <img src="/v2/v2.png" alt="taxstick" className='w-[274px] h-[285px] lg:block hidden ml-24 pt-10' />
                <div className="container2 mx-auto">
                    <div className="flex absolute flex-col lg:flex-row lg:py-[0px] py-[16px]">
                        <div className="header_4 text-white lg:-mt-36 xl:w-[871px] lg:w-[720px] w-[345px]">
                            Join thousands of other satisfied clients and start your journey towards better tax returns and maximum benefits.
                        </div>
                        <div className="lg:-mt-32 lg:ml-32 lg:pt-[0px] pt-10">
                            <Link href='/v2/contact' >
                                <a className="focus:outline-none bg-hover text-white paragraph_1 py-[12px] px-28 rounded-md">
                                    Contact
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <img src="/v2/v2.png" alt="taxstick" className='w-[158px] h-[164px] lg:block hidden ml-auto -mt-20 mr-[16px]' />
            </div>

            <Contact />

            <div className="mb-24">
                <Section aboutContent={aboutContent} />
            </div>

           
                <Brands/>
        </>
    );
};

About.layout = HomeLayout;
export default About;
