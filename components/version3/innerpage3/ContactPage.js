import React from 'react';
import Contact from '../home2/Contact';
import Trusted3 from '../home3/Trusted';
import SectionHeader1 from './common/SectionHeader';

const ContactPage = ({siteData}) => {
    return (
        <div>
            <SectionHeader1 heading="Contact" title="Contact" heading2='Home' />
            <div className='max-w-[1320px] mx-auto mt-16 md:mt-20 lg:mt-24  px-8 lg:px-0'>
                <h1 className="inner-heading">Contact</h1>
            </div>

            {/* Contact */}
            <div className=' mx-auto '>
                <Contact bgColor='bg-[#012A2B]' textColor='text-white' inputBg='bg-[#012A2B]' />
            </div>

            {/* Trusted */}
            <div className='mx-auto -mt-16 2xl:-mt-28  px-8 lg:px-0'>
                <Trusted3 siteData={siteData}/>
            </div>
        </div>
    );
};

export default ContactPage;
