import Link from 'next/link';
import React from 'react';


const AboutHome = ({aboutContent}) => {
    return (
        <div className='bg-[#FAF7F6] -mt-24'>
            <div className="container mx-auto">
                    <div className='pb-40 pt-10'>
                        <div className='lg:grid lg:grid-cols-2 gap-[12%] mt-32'>
                            <div className="-ml-10 bg-no-repeat -mt-10 bg-center md:w-full sm:w-1/2 rounded-3xl items-center">
                                <div>
                                    <img src="/v2/Image.png" alt="about" className="xl:w-[653px] sm:w-[653px] rounded-3xl sm:h-[640px] -mb-15" />
                                </div>
                            </div>
                            <div className=''>
                                <h3 className='header_6 text-hover'>About {aboutContent?.name}</h3>
                                <h5 className="header_2 mt-[4px] text-start">
                                {aboutContent?.title}
                                </h5>
                                <p className="focus:outline-none mt-5 paragraph text-secondary_gray text-justify">
                                    {aboutContent?.about}
                                </p>
                                <Link href="/v2/about">
                                <button className="mt-[20px] pr-8 bg-hover text-white py-2 px-5 text-center items-center rounded-md shadow-2xl paragraph">
                                    Learn More
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default AboutHome;