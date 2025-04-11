import Image from 'next/image';
import React from 'react';
import CommonHeading2 from '../common/CommonHeading2';
import Link from 'next/link';

const AboutCompany = ({siteData}) => {
    const image1 = siteData?.corporate_strategy?.img1;
    const title = siteData?.corporate_strategy?.title;
    const description = siteData?.corporate_strategy?.description;
    const section1 = siteData?.corporate_strategy?.section1;
    const section1_des = siteData?.corporate_strategy?.section1_des;
    const section2 = siteData?.corporate_strategy?.section2;
    const section2_des = siteData?.corporate_strategy?.section2_des;
    return (
        <section className='max-w-[1320px] mx-auto -mt-4 lg:mt-28 mb-10'>
            <div className='flex flex-col md:flex-row px-8 lg:px-0 gap-6 lg:gap-20 '>
                <div className='mb-52 md:mb-0 mt-20 lg:mt-0'>
                    <div className='hidden lg:flex rounded-2xl border-[1px] border-[#10B981] w-[397px] h-[531px] ml-[112px]'></div>
                   <div className='hidden lg:flex z-50 relative bottom-[580px] left-[450px]'>
                   <Image  src='/v3/about/design1.svg' width={100} height={100} alt='design Image' />
                   </div>
                    <div  className='z-40 lg:relative bottom-60 md:bottom-[610px] w-full lg:w-[488px] h-auto sm:h-[595px]'>
                    <Image className='w-full h-[595px]' src={image1} width={788} height={990} alt='About Image' />
                    </div>
                    <div className='hidden lg:flex z-10 relative bottom-[800px] left-[400px]'>
                    <Image src='/v3/about/dot.svg' width={165} height={153} alt='Star' />
                    </div>
                </div>

                <div className='-mt-48  md:mt-10'>
                   <CommonHeading2 heading1='About Company' heading2={title}/>
                    <p className='description !text-[#5D666F] mt-6 md:mt-8 lg:!mt-10 '>{description}</p>
                    <div className='flex items-center gap-10 mt-7 md:mt-9 lg:mt-11'>
                        <div className=''>
                            <div className='flex space-x-2 items-center'>
                                <Image src='/v3/about/okay.svg' width={24} height={24} alt='About Image' />
                                <p className='feature-text !mt-3'>{section1}</p>
                            </div>
                            <p className='!mt-6 description  !text-[#5D666F] max-w-[250px]'>{section1_des}</p>
                        </div>
                        <div className=''>
                            <div className='flex gap-2'>
                                <Image className='' src='/v3/about/okay.svg' width={24} height={24} alt='About Image' />
                                <p className='feature-text !mt-3'>{section2}</p>
                            </div>
                            <p className='!mt-6 description  !text-[#5D666F] max-w-[250px]'>{section2_des}</p>
                        </div>
                        
                    </div>
                    <Link href='/v3/about'>
                    <div><button className='about-button border-2 relative z-50 border-[#10b981] text-[#101928] hover:text-white  hover:bg-[#10B981]'>About More</button></div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutCompany;