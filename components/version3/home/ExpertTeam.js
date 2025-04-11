import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Keyboard, Navigation } from 'swiper/modules';
import TeamCard from '../card/TeamCard';
import CommonHeading from '../common/CommonHeading';
import Image from 'next/image';

const ExpertTeam = ({siteData}) => {
    const swipperRef = useRef(null);
    useEffect(() => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.update();
        }
    }, []);
    const Next = () => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.slideNext();
        }
    };
    const Previous = () => {
        if (swipperRef.current && swipperRef.current.swiper) {
            swipperRef.current.swiper.slidePrev();
        }
    };

    return (
        <section className='relative overflow-hidden' >
            <div className='grid grid-cols-1 md:grid-cols-3  max-w-[1320px] mx-auto mt-28'>
            <div className='team-slider px-4 md:px-8 lg:px-0 '>

                <div className='rounded-md !w-full'>
                    <CommonHeading heading1='Expert Team' heading2='Meet Our Expert Member' align='left' marginX='mx-0' />

                </div>

                <div className='flex items-center space-x-6 mt-10'>
                    <button onClick={Previous} className='swipper-button group'>
                        <svg
                            className="mx-auto fill-current text-[#7D7D7D] group-hover:text-white transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                        >
                            <path d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" />
                        </svg>
                    </button>
                    <button onClick={Next} className='swipper-button group'>
                        <svg
                            className="rotate-180 mx-auto fill-current text-[#7D7D7D] group-hover:text-white transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                        >
                            <path d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" />
                        </svg>
                    </button>
                </div>
               <div className='hidden xl:flex relative left-80 -top-10'> <Image alt='icon' width={100} height={203}  src='/v3/ExpertTeam/design.svg' className=' h-[203px] w-[100px] ' /></div>
                {/* <img  src='/Team/shape.svg' alt='shape' /> */}
            </div>
            <div className='mx-auto   w-[350px]  sm:w-[650px] md:w-[700px] lg:w-[990px] xl:w-[1120px] 2xl:w-[1320px] overflow-hidden '>
                <Swiper
                    slidesPerView={2}
                    keyboard={{
                        enabled: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 24,
                        },
                        668: {
                            slidesPerView: 2,
                           
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1480: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}

                    pagination={{
                        clickable: true,
                    }}
                    modules={[Keyboard, Navigation]}
                    ref={swipperRef}
                >
                    {siteData?.team_members?.executive_team?.map((data) => (
                        <SwiperSlide className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mt-10'>
                            <TeamCard data ={data}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            </div>
        </section>
    );
};

export default ExpertTeam;