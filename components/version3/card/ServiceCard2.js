import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { getSiteHomeAPI } from '../../../helpers/backend_helper';

const ServiceCard2 = ({ data }) => {
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
        <div
            className="group rounded-2xl mb-20 flex flex-col bg-white pt-8 pb-14 border-[1px] hover:border-[#10B981] mx-auto  max-w-[424px] h-full min-h-[470px] transition-all duration-300"
            style={{ boxShadow: '0px 4px 20px 0px #00000014' }}
        >
            <div className="relative mx-auto w-20 h-20 mb-6 rounded-full bg-[#fff] group-hover:bg-[#10B981] flex items-center justify-center transition-all duration-300">
                <div className="transition-all duration-300 group-hover:invert group-hover:brightness-0">
                    <Image
                        className="w-[50px] lg:h-[50px]"
                        width={50}
                        height={50}
                        src={data?.logo || ' '}
                        alt="icon image"
                    />
                </div>
            </div>
            <div className="w-full h-[23px]">
                <Image src="/v3/service/border.png" width={424} height={23} alt="border Image" />
            </div>

            <h4 className="capitalize text-center text-[16px] md:text-xl lg:text-2xl font-semibold mt-3">
                {data?.title?.length > 30 ? `${data.title.slice(0, 30)}...` : data?.title ?? ""}
            </h4>
            <p className="mt-4 description !text-center !font-normal !text-[#5D666F] !max-w-[300px] mx-auto">
                {data?.description
                    ? data.description.length > 100
                        ? `${data.description.slice(0, 100)}...`
                        : data.description
                    : ""}
            </p>
            <div className="flex-1"></div>
            <div className="py-8">
                <div className="read group-hover:text-[#10B981] flex justify-center items-center">
                    <div className="flex items-center justify-center gap-3 group-hover:text-[#10B981] duration-300">
                        <span onClick={() => handleModal(data?._id)}>
                            <button onClick={showModal} className="cursor-pointer tracking-wide leading-normal text-xl font-semibold -mt-[6px] pl-[4px]">
                                Read More
                            </button>
                        </span>
                        <svg
                            className="fill-current text-[#1C2539] group-hover:text-[#10B981]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            width="16"
                            height="16"
                        >
                            <path d="M0 16L5 8L-1.4687e-06 9.53674e-07L3 8.91229e-07L8 8L3 16L0 16Z" />
                            <path d="M8 16L13 8L8 9.53674e-07L11 8.66252e-07L16 8L11 16L8 16Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <Modal
                className="custom-modal"
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

export default ServiceCard2;
