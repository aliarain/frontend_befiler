import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Navigation, Pagination, } from 'swiper/modules';
import ExpertTeamCard2 from '../card/ExpertTeamCard2';
import CommonHeading2 from '../common/CommonHeading2';

const ExpertTeam2 = ({siteData}) => {
    const swipperRef = useRef(null);
    useEffect(() => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.update();
        }
    }, []);

    return (
        <section className='max-w-[1320px] mx-auto mt-24'>
           <CommonHeading2 heading1='Expert Team' heading2='Meet Our Expert Member'  align='center' marginX='auto'/>
            <div className='team2'>
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
                    modules={[Keyboard, Pagination, Navigation]}
                    ref={swipperRef}
                    className="mt-12"
                >
                    {siteData?.team_members?.executive_team?.map((data) => (
                        <SwiperSlide >
                            <ExpertTeamCard2 data={data} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ExpertTeam2;