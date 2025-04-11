import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Modal } from 'antd';
import { getSiteHomeServiceBlogsAPI } from '../../../../helpers/backend_helper';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true

            }
        },
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: true,
            }
        },
        {
            breakpoint: 810,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: true,
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
            }
        }
    ]
};


const ServiceSingle = ({ siteData }) => {
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [siteServiceData, setServiceSiteData] = useState([]);
    const [id,setId]= useState(null);

    // home page data
    useEffect(() => {
        getSiteHomeServiceBlogsAPI().then((data) => {
            setServiceSiteData(data?.data?.services);
        })
    }, [])

    const showModal = () => {
        setIsServiceModalOpen(true);

    };
    const handleOk = () => {
        setIsServiceModalOpen(false);
    };
    const handleCancel = () => {
        setIsServiceModalOpen(false);
    };

    const handleModal = async (_id) => {
        setId(_id);
    }

    const serviceData = siteServiceData?.find(service => service?._id ===id);

    return (
        <>

            <Slider {...settings}>
                {
                    siteData?.services?.map((val) => {
                        return (
                            <>
                                <div key={val?._id} className="mt-[52px] lg:mt-16 mx-5">
                                    <div className="md:w-[380px]  lg:w-[425px] transition ease-in-out delay-75 lg:mb-14 mb-12 bg-white hover:-translate-y-2 hover:scale-100 duration-150 group items-center rounded-2xl  border-hover hover:border-b-8 hover:border-hover">
                                        <div className="text-gray-700 md:h-[500px] lg:h-[624px] group-hover:stroke-white dark:text-gray-400">
                                            <img src={val?.logo ?? ""} alt="" className='w-full rounded-lg h-[292px] object-cover' />
                                            <div className="container mx-auto px-10 py-8">
                                                <p className='header_5 text-[#191919]'>{val?.title ?? ""}</p>
                                                <p className='items-start pt-[25px] paragraph text-[#696161] text-justify'>{val?.description?.slice(0, 200) ?? ""}.</p>
                                                <div className="flex items-center mt-[12px] mb-6 lg:mb-[8px] group-hover:text-hover">
                                                <span onClick={() => handleModal(val?._id)}>
                                                    <button onClick={showModal}  className="cursor-pointer paragraph tracking-wide leading-normal pl-[4px] underline">Read More</button>
                                                </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <Modal destroyOnClose={true} title={serviceData?.title} maskStyle={{
                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                                }} visible={isServiceModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                                        <p>{serviceData?.description}</p>
                                    </Modal>
                            </>
                        )
                    })
                }
            </Slider>
        </>
    );
}
export default ServiceSingle;