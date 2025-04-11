import React from 'react';
import Trusted1 from './common/Trusted1';
import Contact from './common/Contact';
import SectionHeader from './common/SectionHeader';

const ContactPage = ({siteData}) => {
    return (
        <div>
             <SectionHeader heading='Contact' title='Contact' heading2='Home' />
            {/* Contact */}
            
            <div className=' '>
                <Contact bgImage='/v3/Why/bg.svg' bgColor='' bg='#10B981' textColor='text-[#fff]' inputBg='bg-transparent' />
            </div>

            {/* Trusted */}
            <div> <Trusted1 siteData={siteData} /> </div>

        </div>
    );
};

export default ContactPage;
