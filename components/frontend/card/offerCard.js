import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Blog from './blog';


const OfferCard = ({ offerCards }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    return (
        <div className='w-[300px] h-[450px] lg:w-[330px] mx-auto my-4 shadow-lg  rounded bg-white'>
            {/* upper style */}
            <div >
                <img src={offerCards?.logo ?? "/codecayonImage/card1.png"} className='h-[200px] w-full' style={{ objectFit: 'cover', objectPosition: '50% 0%' }} />
            </div>
            {/* inner style */}
            <div className='bg-white px-4 py-2'>
                <p className='text-justify mb-2 text-[18px] font-bold hero_font_family'>{offerCards?.title ?? ""}</p>
                <p className='text-[14px] mb-0  text-justify hero_font_family'>{offerCards?.description?.slice(0, 200) ?? ""}</p>
                <p className=' text-[16px] mb-0 cursor-pointer text-right text-[#14AA40]' onClick={showModal}>More</p>
            </div>
            <Modal title={offerCards?.title ?? ""} visible={isModalOpen} onCancel={handleCancel} destroyOnClose footer={null}>
                <Blog data={offerCards} />
            </Modal>
        </div>
    );
};

export default OfferCard;