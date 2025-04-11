import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Autoplay } from 'swiper/modules';
import CommonHeading from '../common/CommonHeading';
import TestimonialCard from '../card/TestimonialCard';

const Testimonials = ({siteData}) => {
    const swipperRef = useRef(null);
    useEffect(() => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.update();
        }
    }, []);
    return (
        <section className='mt-24 overflow-hidden'>
            <CommonHeading heading1='TESTIMONIAL' heading2='What Our Client Says about us' textColor='black' bgClass='expertHeading' />
            <div className='hidden lg:flex justify-end relative -right-3  -top-12'>
                <Image className='lg:w-[277px] lg:h-[277px] ' src='/v3/testimonial/circle.svg' height={277} width={277} alt="circle" />
            </div>
            <div className="max-w-[1320px] mx-auto px-4 lg:px-0 md:-mt-16 lg:-mt-48">
                <div className=''>
                    <Swiper
                        keyboard={{
                            enabled: true,
                        }}
                        autoplay={{
                            delay: 2000, 
                            disableOnInteraction: false, 
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            },
                            668: {
                                slidesPerView: 2,
                                spaceBetween: 12,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                        }}

                        modules={[Keyboard, Autoplay]}
                        ref={swipperRef}
                        className='p-1'
                    >
                        {siteData?.testimonials?.map((data) => (
                            <SwiperSlide key={data?._id} >
                                <TestimonialCard data={data} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;