import Image from 'next/image';
import React from 'react';

const ExpertCard = ({ bgImage, imageUrl, title, description }) => {
    return (
        <div
            className="w-full lg:max-w-[380px] h-[444px] mx-2 rounded-[20px] bg-cover mt-10 bg-bottom bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="bg-[#F3F3F5] flex items-center pr-4 relative bottom-[10px] left-[10px] rounded-[20px] shadow-md w-full lg:max-w-[380px] h-[444px] group border-t-[10px] border-r-[10px] border-t-[#fff] border-r-[#fff] transition-all duration-[2000ms] ease-in-out">
                <div className="bg-[#10B98133] group-hover:bg-primary rounded-b-[20px] -ml-[146px] w-[410px] -rotate-90 transition-all duration-[2000ms] ease-in-out">
                    <h2 className="text-[28px] flex justify-center items-center pb-2 font-bold py-3 h-full mx-auto uppercase whitespace-pre text-gray-800">
                        {title}
                    </h2>
                </div>

                <div className="flex flex-col items-center justify-start -ml-44 w-full space-x-16">
                    <div className="w-[118px] h-[118px]">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={118}
                            height={118}
                            className="rounded-full"
                        />
                    </div>

                    <p className="paragraph mt-6">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExpertCard;
