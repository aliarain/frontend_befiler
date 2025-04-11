import React from 'react';
import Contact from '../innerpage1/common/Contact';
import Trusted1 from '../innerpage1/common/Trusted1';

const ContactPage = ({siteData}) => {
    return (
        <div>

            {/* Contact */}
            <div className=' '>
                <Contact bgImage='/v3/contact2/contacbg.svg' bgColor='' bg='#101928' textColor='text-[#fff]' inputBg='bg-transparent' />
            </div>

            {/* Trusted */}
            <div> <Trusted1 siteData={siteData}/> </div>

        </div>
    );
};

export default ContactPage;
