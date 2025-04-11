import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getOneAboutContentAPI } from '../../../helpers/backend_helper';
import AboutTop from '../../../components/frontend/about/aboutTop';
import AboutGoal from '../../../components/frontend/about/aboutGoal';
import Cards from '../../../components/frontend/about/cards';
import CompanyCards from '../../../components/frontend/about/company';
import Footer from '../../../components/frontend/shared/footer';
import Head from 'next/head';


const AboutPage = () => {
    const router = useRouter();
    const [aboutContent, setAboutContent] = useState({});

    // about content show all data
    useEffect(() => {
        getOneAboutContentAPI().then((data) => {

            if (data?.status === true) {
                setAboutContent(data?.data);
            }
        })
    }, [])

    // contact page link
    const handleContact = () => {
        router.push('/home/contact')
    }

    
    return (
        <div>
            <Head>
                <title>About</title>
            </Head>

            {/* about page hero section */}
            <AboutTop aboutContent={aboutContent} />

            {/* company AboutPage and goal */}
            <AboutGoal aboutContent={aboutContent} />

            {/* company coFounder AboutPage and company Accounting Affiliates card*/}
            <Cards aboutContent={aboutContent} />


            {/* contact page link up section*/}
            <div className='container md:flex md:justify-around bg-[#F6F6FC] hero_font_family p-[5%]'>
                <p className='text-xl md:w-[70%]'>Join thousands of other satisfied clients and start your journey towards better tax returns and maximum benefits.</p>  
                    <button onClick={() => handleContact()} className='bg-[#14AA40] h-[60px] w-[200px]  shadow-lg rounded hover:bg-[#02852a] text-lg font-bold text-white'>Contact</button>
            </div>

            {/* company portfolio */}
            <CompanyCards aboutContent={aboutContent} />

            {/* footer */}
            <Footer />
        </div>
    );
};

export default AboutPage;