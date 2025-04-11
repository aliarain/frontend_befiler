import React from 'react';
import Slider from "react-slick";
import { Rate } from 'antd';

// slider settings
const settings = {
    className: "relative z-10",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
};


const TestimonialSlider = ({ feedBack }) => {

    return (
        <>
            <div className='md:w-[500px] lg:w-[60%]'>
                <Slider {...settings}>
                    {
                        feedBack?.map((t, i) => <div key={i + 1} className='hero_font_family  h-[300px] p-8 italic font-normal relative'>
                            {/* slider data */}
                            <div className=''>
                                <p className='md:text-[18px]'>{t?.comment ?? ""}</p>
                            </div>
                            {/* user image */}
                            <div className='flex gap-3 absolute right-0 bottom-0 '>
                                <div className='w-24 h-24 md:w-32 md:h-32 rounded-t-full rounded-l-full border-2 border-[#F6F6FC] bg-[#ECB9C5] flex justify-center items-center'>
                                    <img className='w-24 h-24 md:w-32 md:h-32 rounded-t-full rounded-l-full' src={t?.user?.profile_img ? `${t?.user?.profile_img}` : '/codecayonImage/military.png'} style={{ objectFit: 'cover', objectPosition: '50% 0%' }} alt="" />
                                </div>
                                <div>
                                    <Rate allowHalf value={t?.ratting ?? ""} />
                                    <p className='md:text-[16px] italic '>{t?.user?.username ?? ""}</p>
                                </div>
                            </div>

                        </div>)
                    }

                </Slider>
            </div>
        </>
    );
};

export default TestimonialSlider;