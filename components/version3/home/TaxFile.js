import React from 'react';
import VideoComponent from '../common/videoComponent';

const TaxFile = ( {siteData} ) => {
    const title= siteData?.how_to_file_tax_title;
    const description = siteData?.how_to_file_tax_short_description;
   
    return (
        <section
            className="relative bg-cover bg-center  overflow-hidden" 
            style={{ backgroundImage: "url('/v3/taxFile/taxBg.png')" }}
        >
            <div className="absolute inset-0 taxFileBg" />
         
            <div className="max-w-[1320px] mx-auto relative py-8 md:py-12 lg:py-24">
                <div className="flex flex-col md:flex-row items-center md:gap-5 lg:gap-10 px-4 md:px-8 lg:px-0">
                    <div className="w-full md:w-2/5 !text-white ">
                        <p className="tax-file">File tax</p>
                        <h2 className="header mt-6 md:mt-8 lg:!mt-10  !text-white">{title}</h2>
                        <p className="description !font-normal !text-justify mt-7 md:mt-9 lg:mt-12">{description}</p>
                    </div>
                    <div className="w-full md:w-3/5">
                        <div className=" mt-6 md:mt-0">
                            <VideoComponent siteData={siteData}/>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
};

export default TaxFile;