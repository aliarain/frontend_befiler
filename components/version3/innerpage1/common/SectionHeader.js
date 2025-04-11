import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";

const SectionHeader = ({heading, title ,heading2}) => {
    return (
        <section
            className="-mt-24 relative bg-[url('/v3/InnerPage/about1/bg.svg')] bg-cover bg-center bg-no-repeat"
            style={{ backgroundColor: '#00000099' }}
        >
            <div className="bg-[#00000099] w-full h-full absolute top-0 left-0"></div>
            <div className="relative flex flex-col justify-center items-center max-w-[1320px] px-8 lg:px-0 mx-auto pt-[165px] pb-[85.5px]">
                <h1 className="inner-heading !mx-auto">{heading}</h1>
                <div className='mt-[18.5px] flex items-center gap-2  '>
                    <div className='inner-title text-[#10B981] '>
                        <IoHomeOutline className='-mt-4' />
                        <p>{heading2}</p>
                    </div>
                    <div className='inner-title text-white'>
                        <FaChevronRight className='-mt-4' />
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionHeader;