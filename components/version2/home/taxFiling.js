import React from 'react';
import VideoComponent from './videoComponent';


const TaxFiling = ({ siteData }) => {
    return (
        <>
            <div className='bg-[#FAF7F6]'>
                <div className='py-20 container hero_font_family'>
                    <div className='py-16'>
                        <div className='lg:grid lg:grid-cols-2 gap-[10%] p-[2%]'>
                            <div key={siteData?._id}>
                                <h3 className='header_6 text-hover'>File Taxes</h3>
                                <h1 className="focus:outline-none header_2 pr-10 mt-2">
                                    How to File Tax?
                                </h1>
                                <p className="focus:outline-none mt-5 pr-2 paragraph text-secondary_gray">
                                    {siteData?.how_to_file_tax_title}
                                </p>

                                <p className="focus:outline-none mt-5 pr-2 paragraph text-secondary_gray">
                                    {siteData?.how_to_file_tax_short_description}
                                </p>
                            </div>
                            <div className='mt-10 lg:mt-0'>
                                <VideoComponent siteData={siteData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TaxFiling;
