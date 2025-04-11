import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal } from 'antd';
import { getSiteHomeAPI} from '../../../helpers/backend_helper';

const ServiceCard = ({ val, number }) => {
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [siteServiceData, setServiceSiteData] = useState([]);
    const [id, setId] = useState(null);

    // Home page data
    useEffect(() => {
        getSiteHomeAPI().then((data) => {
            setServiceSiteData(data?.data?.services);
        });
    }, []);

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
    };

    const serviceData = siteServiceData?.find(service => service?._id === id);

    return (
        <div className="flex justify-center"> 
            <div className="max-w-[424px] h-[550px] flex flex-col border rounded-tl-[40px] group rounded-tr-[40px] transform transition-transform duration-300">
                <div className='flex flex-col flex-grow'> 
                    <div className='h-[330px] md:h-[240px] lg:h-[220px] xl:h-[271px]'>
                        <Image
                            className='w-[424px] lg:h-[200px] xl:h-[251px] rounded-tr-[40px] border rounded-tl-[40px]'
                            width={424}
                            height={251}
                            src={val?.logo || defaultImage}
                            alt='serviceImage'
                        />
                    </div>

                    <p className="capitalize text-center text-[16px] md:text-xl lg:text-2xl font-semibold -mt-10 md:mt-6">
                        {val?.title?.length > 30 ? `${val.title.slice(0, 30)}...` : val?.title ?? ""}
                    </p>
                    <p className=" max-w-[350px] description !font-normal mx-auto !text-center !text-[#5D666F]">{val?.description?.slice(0, 180) ?? ""}</p>
                </div>

                <div className="flex justify-between items-center border-t pt-4 px-4 group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300">
                    <p className="number mt">0 {number}</p>
                    <div className='group'>
                        <div className='flex items-center justify-center gap-3 mb-4 group-hover:text-white transition-all duration-300'>
                            <div className="flex items-center mt-[12px] mb-6 lg:mb-[8px] group-hover:text-hover">
                                <span onClick={() => handleModal(val?._id)}>
                                    <button onClick={showModal} className="cursor-pointer tracking-wide leading-normal text-xl font-semibold mt-[4px] lg:-mt-[8px]  pl-[4px]">Read More</button>
                                </span>
                            </div>
                            <Image
                                className="transition-all duration-300 group-hover:invert group-hover:brightness-0"
                                src='/v3/service/aero.svg'
                                alt='icon'
                                width={16}
                                height={16}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="custom-modal"
                destroyOnClose={true}
                title={serviceData?.title}
                maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                visible={isServiceModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <p>{serviceData?.description}</p>
            </Modal>
        </div>
    );
};

export default ServiceCard;
