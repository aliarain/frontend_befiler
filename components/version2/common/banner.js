import React from 'react';

const Banner = ({name, title, sub_title}) => {
    return (
        <>
            <div className="w-full table absolute top-0 -z-10 ">
                <div className="grid grid-cols-3 max-w-[1920px]">
                    <div className="top-0 lg:h-[648px]" style={{ backgroundImage: `url('../../v2/img/1.png')` }}>
                        <div className="!bg-[#1e1d2bf2] lg:h-[648px] h-[540px]"></div>
                    </div>
                    <div className="top-0 lg:h-[648px] col-span-2" style={{ backgroundImage: `url('../../v2/img/2.png')` }}>
                        <div className="!bg-[#12181be6] lg:h-[648px] h-[540px]"></div>

                    </div>
                </div>
            </div>

            <div className="container h-[560px]">
                <div className='text-center py-24'>
                    <h1 className="text-white my-[20px] header_1">
                        {name}
                    </h1>
                    <p className="text-white header_6 text-center"> {title} / <span className="text-hover">{sub_title}</span></p>
                </div>
            </div>
        </>
    );
};

export default Banner;