'use client'
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Pagination, } from 'swiper/modules';
import TestimonialCard3 from '../card/TestimonialCard3';
import CommonHeading3 from '../common/CommonHeading3';

const Testimonial3 = ({siteData}) => {
    const swipperRef = useRef(null);
    useEffect(() => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.update();
        }
    }, []);
    return (
        <section className=''>
            <div className='max-w-[1320px] mx-auto px-8 lg:px-0 py-10 '>
                <CommonHeading3 heading1='Testimonials' heading2="What Our Client Say's about us" marginX='auto' align='center' textColor='white'/>
                <div className='expertTeam3'>
                    <Swiper
                        keyboard={{
                            enabled: true,
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
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}

                        pagination={{
                            clickable: true,
                        }}
                        modules={[Keyboard, Pagination]}
                        ref={swipperRef}
                        className="mt-6"
                    >
                        {siteData?.testimonials?.map((data) => (
                            <SwiperSlide key={data?._id}>
                                <TestimonialCard3 data= {data} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


            </div>

        </section>
    );
};

export default Testimonial3;

