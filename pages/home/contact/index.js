import Head from 'next/head';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Address from '../../../components/frontend/contact/address';
import ContactTop from '../../../components/frontend/contact/contactTop';
import Partnership from '../../../components/frontend/home/taxFiling/partnership';
import Footer from '../../../components/frontend/shared/footer';
import { getOneSiteSettingAPI, getSiteHomeAPI } from '../../../helpers/backend_helper';

const ContactPage = () => {
    const [contactContent, setContactContent] = useState({});
    const [siteData, setSiteData] = useState({});

    // about content show all data
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {

            if (data?.status === true) {
                setContactContent(data?.data);
            }
        })
    }, [])

    // partner-shift data
    useEffect(() => {
        getSiteHomeAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])


    return (
        <div>
            <Head>
                <title>Contact</title>
            </Head>

            {/* contact page hero section */}
            <ContactTop contactContent={contactContent} />

            {/* address */}

            <Address contactContent={contactContent} />

            {/* company partnership */}
            <Partnership siteData={siteData} />

            {/* footer */}
            <Footer />
        </div>
    );
};

export default ContactPage;