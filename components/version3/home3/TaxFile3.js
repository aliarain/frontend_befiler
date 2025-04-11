import Image from 'next/image';
import React, { useState } from 'react';
import { Modal } from 'antd';
import VideoComponent from '../common/videoComponent';

const TaxFile3 = ({siteData}) => {
    const title= siteData?.how_to_file_tax_title;
    const description = siteData?.how_to_file_tax_short_description;
    const video = siteData?.file_tax_videos;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className=' pt-24 mb-10  '>
            <div className='max-w-[1320px] mx-auto px-8 lg:px-0 py-12 md:py-16 lg:py-20 relative'>
                <div className='absolute inset-0 rounded-[20px] bg-cover bg-center' style={{ backgroundImage: "url('/v3/taxFile/bg.svg')" }} />
                <div className='absolute inset-0 rounded-[20px] bg-[#000000CC]' />
                
                <div className='relative ml-6 md:ml-10 lg:ml-16 text-white'>
                    <Image 
                        src='/v3/taxFile/videoIcon.svg' 
                        width={80} 
                        height={80} 
                        alt='video icon' 
                        className='cursor-pointer'
                        onClick={openModal} 
                    />
                    <h2 className=' !text-[#fff] mt-8 uppercase'>{title}</h2>
                    <p className='tax-description mt-6 md:mt-8 lg:mt-10 w-full md:w-[50%] lg:w-[40%]'>
                        {description}
                    </p>
                </div>
            </div>

            <Modal
                title={null}
                visible={isModalOpen}
                onCancel={closeModal}
                footer={null}
                // width="31%"
                centered
                bodyStyle={{ padding: 0 }}
                className='!w-full md:!w-[65%] lg:!w-[20%} xl:!w-[40%]'
            >
                <VideoComponent siteData={siteData}/>
            </Modal>
        </section>
    );
};

export default TaxFile3;