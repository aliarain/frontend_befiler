import React, { useState, useEffect } from 'react';
import HomePageContact from '../../components/frontend/home/contact';
import OfferServices from '../../components/frontend/home/services';
import StudentClass from '../../components/frontend/home/studentClass/studentClass';
import Partnership from '../../components/frontend/home/taxFiling/partnership';
import TaxFiling from '../../components/frontend/home/taxFiling/taxtFiling';
import Testimonials from '../../components/frontend/home/testimonials';
import WhyChoose from '../../components/frontend/home/whyChoose';
import ServiceFileExport from '../../components/frontend/landingPage/fileexport';
import LandingPageHeader from '../../components/frontend/landingPage/header';
import Footer from '../../components/frontend/shared/footer';
import { useEnv } from '../../contexts/envContext';
import { getOneAboutContentAPI, getSiteHomeAPI } from '../../helpers/backend_helper';
import NewsLetter from "../../components/home/newsLetter";



const LandingPage = () => {
    const [siteData, setSiteData] = useState({});
    const [aboutContent, setAboutContent] = useState({});
    const [_, environmentVariable] = useEnv();

    // home page data
    useEffect(() => {
        getSiteHomeAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    // about content show all data
    useEffect(() => {
        getOneAboutContentAPI().then((data) => {
            if (data?.status === true) {
                setAboutContent(data?.data);
            }
        })
    }, [])

    return (
        <div className=''>
            {/* navigation bar and header banner  */}
            <LandingPageHeader siteData={siteData} />

            {/* file expert component */}
            <div className='pt-[15%] md:pt-[5%] lg:pt-[1%] container' >
                <ServiceFileExport siteData={siteData} />
            </div>

            {/* why use tax file  */}
            <WhyChoose siteData={siteData} aboutContent={aboutContent} />

            {/* services offer card display */}
            <OfferServices siteData={siteData} />

            {/* testimonial */}
            <Testimonials siteData={siteData} />

            {/* student class */}
            <StudentClass siteData={siteData} />

            {/* contact section */}
            <HomePageContact />

            {/* how to fix tax file */}
            <TaxFiling siteData={siteData} />

            {/* sponsor or partnership */}
            <Partnership siteData={siteData} />

            <NewsLetter />

            {/* footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
