import React, {useState, useEffect} from 'react';
import { Modal } from 'antd';
import { getSiteHomeServiceBlogsAPI } from '../../../helpers/backend_helper';


const WhyUs = ({ siteData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [siteServiceData, setServiceSiteData] = useState([]);
    const [id, setId] = useState(null);

    // home page data
    useEffect(() => {
        getSiteHomeServiceBlogsAPI().then((data) => {
            setServiceSiteData(data?.data?.way_to_file_tax);
        })
    }, [])

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
    }

    const serviceData = siteServiceData?.find(service => service?._id === id);
  
    return (
        <>
            <div className="bg-[#FAF7F6] pt-36 pb-52">
                <div className="flex flex-col items-center">
                    <div className="text-hover paragraph">
                        File With An Expart
                    </div>
                </div>
                <div className="flex flex-col text-center pt-[8px] pb-3">
                    <div className="header_2">
                        Choose Your Way To
                    </div>
                    <div className="header_2">
                        File Taxes
                    </div>
                </div>
                <div className="container mx-auto pt-20 pb-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-12 xl:gap-x-12">
                    {
                        siteData?.way_to_file_tax?.map((item) => {
                            return (
                                <div key={item._id} className="mt-12 xl:mt-8 lg:mt-8 md:w-[380px] md:h-[455px] w-w-min h-w-min transition ease-in-out delay-75 bg-white hover:!bg-[#292828] hover:-translate-y-6 hover:scale-110 duration-150 group pt-12 px-6 items-end rounded-3xl border-b-2 border-hover hover:border-b-8 hover:border-hover">
                                    <img className="text-gray-700 group-hover:stroke-white dark:text-gray-400 w-[64px] h-[64.64px]" src={item?.image} alt="" />
                                    <div className="py-[20px]">
                                        <h3 className="leading-4 header_5 group-hover:text-white py-[8px]">{item?.title ?? ""}</h3>
                                        <p className='items-start text-gray-500 pt-[16px] group-hover:text-white paragraph'>{item?.description.slice(0, 200) ?? ""}</p>
                                        <div className="flex items-center group-hover:text-hover">
                                            <span onClick={() => handleModal(item?._id)}>
                                                <button onClick={showModal} className="paragraph tracking-wide leading-normal pl-1 underline">Read More</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Modal  destroyOnClose={true} title={serviceData?.title} maskStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.45)",
                    }} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                        <p>{serviceData?.description}</p>
                    </Modal>

                    
                </div>
            </div>
        </>
    );
};

export default WhyUs;
