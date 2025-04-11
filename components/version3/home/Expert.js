/* eslint-disable react/no-unescaped-entities */
import CommonHeading from '../common/CommonHeading';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Modal } from 'antd';

const Expert = ( {siteData} ) => {
    const [id, setId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const swipperRef = useRef(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleModal = async (_id) => {
        setId(_id);
        showModal();
    };

    const serviceData = siteData?.way_to_file_tax?.find(service => service?._id === id);

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
        <div className='bg-[#E8EDF0] pt-10 xl:pt-0 pb-32 mb-24 overflow-hidden'>
            <div className='max-w-[1320px] mx-auto'>
                <div className='hidden xl:flex -ml-80 -mt-10'>
                    <Image src='/v3/expert/vector.svg' alt="vector" width={350} height={250} />
                </div>
                <div className='hidden xl:flex justify-end -mr-40 -mt-40'>
                    <Image src='/v3/expert/design.svg' alt="design" width={50} height={80} />
                </div>
                <CommonHeading heading1="File with an Expert" heading2="Choose Your Way To File Taxes" bgClass="expertHeading" textColor='#090909' />
                <div className='mt-10 expert'>
                    <Swiper
                        keyboard={{ enabled: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            },
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 24,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                        pagination={{ clickable: true }}
                        modules={[Keyboard, Pagination, Navigation]}
                        ref={swipperRef}
                    >
                        {siteData?.way_to_file_tax?.map((item) => (
                            <SwiperSlide key={item._id}>
                                <div className="flex justify-center">
                                    <div
                                        className="w-full lg:max-w-[380px] h-[444px] mx-2 rounded-[20px] bg-cover mt-10 bg-bottom bg-no-repeat"
                                        style={{ backgroundImage: `url('/v3/expert/rectangle.svg')` }}
                                    >
                                        <div className="bg-[#F3F3F5] flex items-center pr-4 relative bottom-[10px] left-[10px] rounded-[20px] shadow-md w-full lg:max-w-[380px] h-[444px] group border-t-[10px] border-r-[10px] border-t-[#fff] border-r-[#fff] transition-all duration-[2000ms] ease-in-out">
                                            <div className="bg-[#10B98133] group-hover:bg-primary rounded-b-[20px] -ml-[146px] w-[410px] -rotate-90 transition-all duration-[2000ms] ease-in-out">
                                                <h2 className="text-[18px] flex justify-center items-center pb-2 font-bold py-3 group-hover:text-[#fff] duration-[500ms] h-full mx-auto uppercase whitespace-pre text-gray-800">
                                                    {item?.title}
                                                </h2>
                                            </div>
                                            <div className="flex flex-col items-center justify-start -ml-44 w-full space-x-16">
                                                <div className="w-[118px] h-[118px]">
                                                    <Image
                                                        src={item?.image}
                                                        alt={item?.title}
                                                        width={118}
                                                        height={118}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                                <p className="paragraph mt-6">
                                                    {item?.description.slice(0, 150)}
                                                </p>
                                                <button onClick={() => handleModal(item?._id)} className="paragraph tracking-wide leading-normal relative right-[82px] hover:text-primary ">
                                                    Read More
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Modal
                        className="custom-modal" // Custom class to apply styles
                        destroyOnClose={true}
                        title={serviceData?.title}
                        maskStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.45)",
                        }}
                        visible={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <p>{serviceData?.description}</p>
                    </Modal>

                    <div className='hidden md:flex relative justify-end z-20 right-3 items-center space-x-6 -mt-8'>
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
                </div>
            </div>
        </div>
    );
};

export default Expert;
