import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Pagination, } from 'swiper/modules';
import { FaUserGraduate } from "react-icons/fa6";
import Contact from './Contact';
import Trusted1 from './common/Trusted1';
import SectionHeader from './common/SectionHeader';
import PricingCard from '../card/PricingCard';

const bg = '#fff';
const text = '#1C2539';
const hoverBg = '#10B981';
const itemText = '#1C2539';
const textColor = '#1C2539';

const Pricing = ({ taxPriceData, siteData }) => {
    const swipperRef = useRef(null);
    useEffect(() => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.update();
        }
    }, []);
    const IconImage = FaUserGraduate;
    return (
        <div>
            <SectionHeader heading="Pricing" title="Pricing" heading2="Home" />
            <div className='max-w-[1320px] mx-auto mt-16 md:mt-20 lg:mt-24 xl:mt-[150px] px-8 lg:px-0'>
                <h1 className={`inner-heading !text-[${textColor}] `}>Pricing Plans</h1>

                {/* Pricing slider  */}
                <div className='pricing'>
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
                        className="mt-8 lg:mt-10 xl:mt-12"
                    >
                        {taxPriceData?.map((plan, index) => (
                            <SwiperSlide key={index} className='flex h-full' >
                                <PricingCard
                                    
                                    plan={plan}
                                    bg={bg}
                                    hoverBg={hoverBg}
                                    itemText={itemText}
                                    text={text}
                                    iconText='#fff'
                                    buttonText='#10B981'
                                    hoverButton='#fff'
                                    IconImage ={IconImage}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {/* Contact  */}
            <div className='mt-20  max-w-[1320px] mx-auto rounded-[40px]'>
                <Contact textColor='text-[#EEE]' inputBg='bg-transparent' bgImage='/v3/Why/bg.svg' cardText='#10B981' />
            </div>
            {/* branded */}
            <div> <Trusted1 siteData={siteData} /> </div>
        </div>
    );
};

export default Pricing;