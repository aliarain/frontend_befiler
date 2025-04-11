import Image from 'next/image';
import React from 'react';

const TeamMeetingContent = ({ aboutContent, bg }) => {
    return (
        <div className='max-w-[1320px] mx-auto'>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between'>
                {aboutContent?.photo_gallery?.map((data, index) => (
                    <div key={index} className='relative mx-auto group'>
                        <Image className='w-full rounded-[20px] transition-all duration-300 group-hover:!opacity-20' src={data?.image} width={312} height={350} alt='card Image' />
                        <div className={`rounded-[20px] absolute inset-0 opacity-0 transition-all duration-300 group-hover:bg-[${bg}] group-hover:bg-opacity-70 group-hover:!opacity-100`}>
                            <h2 className='meeting-header'>{data?.title}</h2>
                            <p className='inner-description !text-[#fff] mt-6 md:mt-7 lg:mt-8 xl:mt-10 text-center px-6'>{data?.deatils}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamMeetingContent;