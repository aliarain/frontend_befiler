import Image from 'next/image';
import React from 'react';

const CompanyGoal = ({bgImage, aboutContent }) => {
    return (
        <section className={`py-10 lg:py-40  bg-cover bg-center h-auto md:max-h-[830px] `}   style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="max-w-[1320px] mx-auto ">
            <div className="flex flex-col md:flex-row items-center pt-16 md:pt-0 mx-20 lg:px-0 gap-6  !pb-0 md:!pb-6">
                <div className="flex-1 ">
                    <div className="hidden lg:flex rounded-2xl -ml-8 border-2 border-[#10B981] lg:w-[292px] lg:h-[392px]"></div>
                    <div className="relative z-50 lg:-mt-[370px] w-full h-full lg:w-[374px] lg:h-[456px]">
                        <Image className="w-full h-full lg:w-[374px] lg:h-[456px]" src="/v3/about/girl.svg" width={788} height={990} alt="About Image" />
                    </div>
                    <div className="hidden lg:-ml-20 lg:-mt-44 lg:flex relative z-10">
                        <Image src="/v3/about/dot.svg" width={165} height={153} alt="Star" />
                    </div>
                </div>
                <div className='flex-1 !pb-10 pb:!mb-0'>
                    <h1 className="inner-heading !text-[#fff]">Our Company goals</h1>
                    <p className="inner-description1 !text-[#fff] mt-6 md:mt-8 lg:mt-10"> {aboutContent?.our_goal}</p>
                </div>
            </div>
        </div>
    </section>
    );
};

export default CompanyGoal;