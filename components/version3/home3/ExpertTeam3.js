import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Pagination, } from 'swiper/modules';
import ExpertTeamCard3 from '../card/ExpertTeamCard3';
import CommonHeading3 from '../common/CommonHeading3';

const ExpertTeam3 = ({siteData}) => {
    const swipperRef = useRef(null);
    useEffect(() => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.update();
        }
    }, []);
    return (
        <section className='mb-28'>
            <div className='max-w-[1320px] mx-auto  '>
                <CommonHeading3 heading1='Expert Team' heading2='Meet Our Expert Member' marginX='auto' align='center' textColor='white'/>

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
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                        }}

                        pagination={{
                            clickable: true,
                        }}
                        modules={[Keyboard, Pagination]}
                        ref={swipperRef}
                        className="mt-12"
                    >
                        {siteData?.team_members?.executive_team?.map((data) => (
                            <SwiperSlide >
                                <ExpertTeamCard3 data ={data} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default ExpertTeam3;
