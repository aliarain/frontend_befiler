import React from 'react';
import VideoComponent from './videoComponent';


const TaxFiling = ({ siteData }) => {

    return (
        <div className='container hero_font_family'>
            <div className='py-16'>
                {/* section header data */}
                <p className='text-center text-[20px] mb-0 text-[#13A03C]'>File Taxes</p>
                <p className='text-[24px] md:text-[34px] text-center font-bold '>How To File Tax?</p>
                {/* video component rendering */}
                <div className='lg:grid lg:grid-cols-2 gap-[4%] text-justify p-[2%]'>
                    <div className=''>
                        <h1 className='text-[24px] font-bold'>{siteData?.how_to_file_tax_title}</h1>
                        <p className='text-[16px]'>{siteData?.how_to_file_tax_short_description}</p>
                    </div>
                     <VideoComponent siteData={siteData} />
                </div>
            </div>
        </div>
    );
};

export default TaxFiling;