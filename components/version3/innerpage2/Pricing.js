import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Pagination, } from 'swiper/modules';
import { FaUserGraduate } from "react-icons/fa6";
import PricingCard from '../card/PricingCard';
import Trusted1 from '../innerpage1/common/Trusted1';
import Contact from '../innerpage1/common/Contact';
import SectionHeader from '../innerpage3/common/SectionHeader';

const text = '#1C2539';
const borderBg = '#10B981';
const itemText = '#1C2539';
const iconText = '#1C2539';
const textColor = '#1C2539';
const IconImage = FaUserGraduate;

const Pricing = ({taxPriceData,siteData}) => {
    const swipperRef = useRef(null);
    useEffect(() => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.update();
        }
    }, []);
    return (
        <div>
            <SectionHeader heading="Pricing" title="Pricing" heading2="Home" bgImage="/v3/InnerPage/About/bg2.svg" />
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
                            <SwiperSlide  key={index} >
                                <PricingCard     
                                    plan={plan}
                                    IconImage ={IconImage}
                                    borderBg={borderBg}
                                    itemText={itemText}
                                    text={text}
                                    iconText={iconText}
                                    radius='20px'
                                    buttonText='#10B981'
                                    hoverButton='#fff'
                                    itemHover ='#1C2539'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {/* Contact  */}
            <div className='max-w-[1320px] mx-auto rounded-[40px]'>
                <Contact bgImage='/v3/contact2/contacbg.svg' bgColor='' bg='#101928' textColor='text-[#fff]' inputBg='bg-transparent' />
            </div>
            {/* branded */}
            <div> <Trusted1 siteData={siteData}/> </div>
        </div>
    );
};

export default Pricing;