import Image from 'next/image';
import React from 'react';
import CommonHeading3 from '../common/CommonHeading3';

const ExpertFile3 = ({ siteData }) => {
    return (
        <section className=''>
            <div className='max-w-[1320px] mx-auto px-8 lg:px-0  '>
                <CommonHeading3 heading1='file with an expert' heading2='Choose Your Way To File Taxes' marginX='auto' align='center' textColor='white' />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-10 lg:mt-12 '>
                    {siteData?.way_to_file_tax?.map((data, index) => (
                        <div key={index} className='flex flex-col bg-[#012A2B] h-full rounded-xl overflow-hidden '>
                        
                                <div className='  w-full lg:w-[424px] h-[190px] !'> <Image className='rounded-t-xl object-cover' src={data?.image} width={796} height={455} alt='Expert Image ' /></div>
                                <div className='relative bottom-10 md:bottom-7 lg:bottom-6 xl:bottom-4 '>
                                    <div className='flex gap-6 bg-[#012A2B]'>
                                        <div className='relative right-3 bottom-5 w-20 h-20 rounded-full bg-[#10B981] '>
                                            <div className='ml-5 pt-3'>  <Image src='/v3/expertFile3/moneyIcon.svg' width={40} height={40} alt='Office Icon' /></div>
                                        </div>
                                        <h3 className='text-white text-xl md:text-2xl lg:text-[28px] font-bold pt-3 capitalize'>{data?.title}</h3>
                                    </div>
                                    <div className='bg-[#012A2B] relative bottom-8 rounded-b-xl'>
                                        <p className='testimonials-text !pt-6 !pb-1'>{data?.description}</p>
                                    </div>
                                </div>
                        
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertFile3;