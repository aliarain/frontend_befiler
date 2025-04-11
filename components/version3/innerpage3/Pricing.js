import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Pagination, } from 'swiper/modules';
import { FaUserGraduate } from "react-icons/fa6";
import Contact from '../home2/Contact';
import Trusted3 from '../home3/Trusted';
import PricingCard from '../card/PricingCard';
import SectionHeader from './common/SectionHeader';

const bg = '#ffff';
const hoverBg = '#10B981';
const itemText = '#C6CED1';
const IconImage = FaUserGraduate;

const Pricing = ({taxPriceData ,siteData}) => {
    const swipperRef = useRef(null);
    useEffect(() => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.update();
        }
    }, []);
    return (
        <div>
            <SectionHeader heading='Home' title='Pricing ' />
            <div className='max-w-[1320px] mx-auto mt-16 md:mt-20 lg:mt-24 px-8 lg:px-0'>
                <h1 className="inner-heading">Pricing Plans</h1>

                {/* Pricing slider  */}
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
                        className="mt-8 lg:mt-10 xl:mt-12"
                    >
                        {taxPriceData?.map((plan, index) => (
   
                            <SwiperSlide key={index} >
                                <PricingCard
                                    IconImage={IconImage}
                                    plan={plan}
                                    bg={bg}
                                    hoverBg={hoverBg}
                                    itemText={itemText}
                                    text='#fff'
                                    borderBg='#012A2B'
                                    hoverButton ='#ffff'
                                    buttonText='#10B981'
                                    divBg='#012A2B'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

             {/* Trusted  */}
            <div className='mx-auto px-8 lg:px-0 pb-16 2xl:pb-0'>
                <Trusted3 siteData={siteData} />
            </div>

             {/* Contact  */}
            <div className='mx-auto px-8 lg:px-0 -mt-28'>
                <Contact bgColor='bg-[#012A2B]' textColor='text-white' inputBg='bg-[#012A2B]' />
            </div>

        </div>
    );
};

export default Pricing;