import Image from 'next/image';
import React from 'react';

const ExpertFileCard2 = ({ image, heading, description }) => {
    return (
        <div className="group h-full min-h-[540px] flex flex-col ">
            <div className="office-heading">
                <Image
                    className="transition duration-300 group-hover:brightness-0 group-hover:invert"
                    src={image}
                    width={80}
                    height={80}
                    alt="Icon Image"
                />
                <h3 className="text-[28px] font-semibold text-[#1C2539] group-hover:text-white capitalize">
                    {heading}
                </h3>
            </div>
            <div className="mx-8 -mt-3 bg-white shadow-xl border border-white rounded-2xl flex-1 flex flex-col justify-between">
                <p className="office-description">{description.slice(0,300)}</p>
                
                <div className="mx-auto my-10 h-1 w-[35%] opacity-40 transition duration-300 group-hover:opacity-100 bg-[#10B981]">
                    <br />
                </div>
            </div>
        </div>
    );
};

export default ExpertFileCard2;
