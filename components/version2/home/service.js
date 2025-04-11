import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceSingle from './Data/serviceSingle';


const Service = ({siteData}) => {
    return (
        <div className='bg-[#292828]'>
            <p className='header_6 text-[#F5E3DD] text-center pb-3 pt-16'>Our Service</p>
            <h2 className='header_2 text-white text-center'>What Services We Provide</h2>
            <div className="container pb-20 ">
                <ServiceSingle siteData={siteData} />
            </div>
        </div>
    );
};
export default Service;

