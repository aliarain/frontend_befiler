import React, { useState } from 'react';
import Coupon from '../../../../components/frontend/landingPage/situationsPages/cupon';
import Slider from "react-slick";
import { Button, Modal } from 'antd';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// slider settings
const settings = {
    className: '',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
};


const MilitaryServicePage = ({ situationPage, singleRole }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    }


    const handleCancel = () => {
        setIsModalOpen(false);
    }

    
    return (
        <div className='container p-10 border bg-cover bg-center bg-no-repeat bg-[url("/codecayonImage/bg2.png")] hero_font_family'>
            <div className='lg:flex lg:justify-around lg:items-center'>
                <div className='lg:w-1/2 p-6'>
                    <div className='text-[24px] md:text-[28px] font-semibold'>{situationPage?.work_process_title}</div>
                    {/* slider rendering */}
                    <Slider {...settings}>
                        {
                            situationPage?.work_process_description?.map((d, index) =>
                                <div key={index + 1} className='processDetails' dangerouslySetInnerHTML={{ __html: d?.processDetails ?? "" }}></div>
                            )}
                    </Slider>
                </div>
                <div className=' w-full lg:w-1/2 flex justify-center items-center mt-4 lg:mt-0'>
                    <div className=' w-[200px] h-[60px] flex justify-center items-center bg-[#14AA40] cursor-pointer rounded' onClick={showModal}>
                        <p className='text-white text-[16px] mb-0'>Get Coupon</p>
                    </div>

                    {/* coupon modal section */}
                    <Modal title={singleRole?.coupon_code?.coupon_description} visible={isModalOpen} onCancel={handleCancel} destroyOnClose footer={null}>
                        <Coupon data={singleRole} handleCancel={handleCancel} />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default MilitaryServicePage;