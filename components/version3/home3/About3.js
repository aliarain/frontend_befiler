import Image from 'next/image';
import React from 'react';
import CommonHeading3 from '../common/CommonHeading3';
import Link from 'next/link';

const About3 = ({ siteData }) => {
    const image1 = siteData?.corporate_strategy?.img1;
    const image2 = siteData?.corporate_strategy?.img2;
    const title = siteData?.corporate_strategy?.title;
    const description = siteData?.corporate_strategy?.description;
    const section1 = siteData?.corporate_strategy?.section1;
    const section1_des = siteData?.corporate_strategy?.section1_des;
    const section2 = siteData?.corporate_strategy?.section2;
    const section2_des = siteData?.corporate_strategy?.section2_des;

    return (
        <section className=' pt-10 pb-2 xl:pt-20'>
            <div className='max-w-[1320px] mx-auto px-8 lg:px-0 '>
                <div className='flex flex-col md:flex-row items-center md:gap-8 lg:gap-12 mb-16 '>
                    <div className='flex-1 mb-16 md:mb-0'>
                        <div className='sm:flex sm:gap-4 md:gap-5 lg:gap-8 flex-col sm:flex-row'>
                            <div className=''>
                                <div className="relative w-full lg:w-[280px] h-auto left-3 ">
                                    <Image
                                        className='about1 w-full h-auto z-20 object-cover'
                                        src={image1}
                                        width={280}
                                        height={431}
                                        alt='about image 1'
                                    />
                                </div>
                                <div className='div1 relative left-3 z-10 hidden lg:flex -mt-60'></div>
                                <p className='relative z-20 hidden lg:flex justify-center -mt-14 !text-white text-xl font-bold'>Best tax planning</p>
                            </div>
                            <div>
                                <div className='hidden lg:flex !top-7 !left-10 relative z-50'>
                                    <Image src='/v3/About3/frame.svg' width={240} height={81} alt='background frame' />
                                </div>
                                <div className='mt-0 lg:-mt-[115px]'>
                                    <div className='hidden relative left-[2px] sm:flex w-full'>
                                        <Image className='relative left-2 z-20 about2 mt-0 lg:mt-[90px] w-full lg:w-[280px] object-cover' src={image2} width={280} height={431} alt='about image 2' />
                                    </div>
                                    <div className='relative z-10  div2 hidden lg:flex -mt-[515px]'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' 2xl:-mt-10'>
                        <CommonHeading3 heading1='About Company' heading2={title} textColor='white' />
                        <p className='description !text-[#C6CED1] mt-6 md:mt-8 lg:!mt-10 '>{description}</p>
                        <div className='flex items-center gap-10 mt-7 md:mt-9 lg:mt-11'>
                            <div className=''>
                                <div className='flex space-x-2 items-center '>
                                    <Image src='/v3/about/okay.svg' width={24} height={24} alt='About Image' />
                                    <p className='feature-text !mt-3 !text-white'>{section1}</p>
                                </div>
                                <p className='!mt-6 description  !text-[#C6CED1] max-w-[250px]'>{section1_des} </p>
                            </div>
                            <div className=''>
                                <div className='flex gap-2'>
                                    <Image className='' src='/v3/about/okay.svg' width={24} height={24} alt='About Image' />
                                    <p className='feature-text !mt-3 !text-white'>{section2}</p>
                                </div>
                                <p className='!mt-6 description  !text-[#C6CED1] max-w-[250px]'>{section2_des}</p>
                            </div>

                        </div>
                        <Link href='/v3/about'>
                            <div><button className='about-button border-2 relative z-50 border-[#10b981]  text-white  hover:bg-[#10B981]'>About More</button></div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default About3;