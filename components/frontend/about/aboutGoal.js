import React from 'react';
import { TbGridDots } from 'react-icons/tb';


const AboutGoal = ({ aboutContent }) => {

    return (
        <div className='container hero_font_family '>
            {/* compnay about */}
            <div className='flex justify-center my-[5%]'>
                <div className='lg:grid lg:grid-cols-2 gap-4'>
                    <div className='flex justify-center items-center my-[5%]'>
                        {/* about section data */}
                        <div className=' bg-white rounded  px-10 py-4 '>
                            <p className='text-xl font-bold capitalize text-[#14AA40] flex items-center gap-2'><span><TbGridDots /></span> About {aboutContent?.name ?? ""}</p>
                            <h5 className=' my-4 text-xl text-start leading-relaxed'>{aboutContent?.title ?? ""}</h5>
                            <p className='my-4 text-base text-justify leading-relaxed'>{aboutContent?.about ?? ""}</p>
                        </div>
                    </div>
                    {/* section related image */}
                    <img className='bg-gray-100 shadow-xl rounded md:h-[400px] ' src="/codecayonImage/cry.png" alt="" />
                </div>
            </div>

            {/* company goal */}
            <div className='flex justify-center items-center py-[5%]'>
                <div className='lg:grid lg:grid-cols-2 gap-4'>
                    {/* section related image */}
                    <img className='bg-gray-100 shadow-xl rounded md:h-[400px]' src="/codecayonImage/goal.png" alt="" />
                    {/* about section data */}
                    <div className='flex justify-center items-center my-[5%]'>
                        <div className=' bg-white'>
                            <p className='text-xl font-bold capitalize text-[#14AA40] flex items-center gap-2'><span><TbGridDots /></span> Our Compnay Goal</p>
                            <p className='my-4 text-base text-justify leading-relaxed'>{aboutContent?.our_goal ?? ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutGoal;