import React from 'react';
import HomePageContactForm from "../../frontend/form/contactForm/homeForm ";

const Contact = () => {
    const fromStyle = {
        bgcolor: 'white',
        textColor: 'black',
    }
    return (
        <div className='max-w-[1440px] mx-auto py-32'>
            <div className="p-[5%] lg:h-[730px] lg:bg-[url('/v2/contact.png')] lg:w-full">
                <div className='w-full lg:w-[600px] lg:pl-10 lg:h-[750px] h-[900px] relative items-start'>
                    <div className='lg:absolute z-20 bg-[#292828] hero_font_family flex h-full rounded-3xl'>
                        <div className='rounded-lg my-10 mx-8 pb-20'>
                            <p className='header_6 text-hover'>Contact Us</p>
                            <p className='text-[24px] text-white'>Send Us a Message</p>
                            <p className='paragraph text-[#fff]'>Please do not hesitate to send us a message, We are looking forward to hearing from you! We reply within 24 hours.</p>
                            {/* form component rendering */}
                            <div className='pb-10'>
                                <HomePageContactForm color={fromStyle} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src="/v2/v3.png" alt="taxstick" className='w-[345.73px] h-[359.07px] lg:block hidden -mt-48 left-0 ml-44 absolute'/>
        </div>
    );
};
export default Contact;
