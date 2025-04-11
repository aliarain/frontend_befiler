import React, {useState, useEffect} from 'react';
import {Modal} from 'antd';
import moment from 'moment';
import {CouponCodeUpdateAPI} from '../../../helpers/backend_helper';


const Coupon = ({cData, serviceData}) => {
    const {title, btnText} = cData;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {end_duration = false, start_duration = false, status} = serviceData?.coupon_code || {};
    const [showCoupon, setShowCoupon] = useState(null);
    const [couponToggle, setCouponToggle] = useState(false);
    const [refresh, setRefresh] = useState(null);

    const startDate = start_duration ? moment(start_duration).format() : false;
    const endDate = end_duration ? moment(end_duration).format() : false;
    const todayDate = moment(Date.now()).format();


    // coupon status
    useEffect(() => {
        if (!!startDate && !!endDate && status === 'active') {
            if (startDate <= todayDate) {
                if (endDate >= todayDate) {
                    setShowCoupon(pre => pre = serviceData?.coupon_code?.name);
                    setCouponToggle(pre => pre = true)
                } else {
                    // if date expired, the coupon will be auto disabled 
                    const query = {id: serviceData?.coupon_code?._id}
                    CouponCodeUpdateAPI({status: 'disabled'}, query).then(data => {
                        if (data?.status === true) {
                            setShowCoupon(pre => pre = 'Not Available')
                            setRefresh(true)
                        }
                    })
                }
            } else {
                setShowCoupon(pre => pre = 'Will Be Released Soon...')
            }
        } else if (status === 'active' && (!startDate && !endDate)) {
            setShowCoupon(pre => pre = serviceData?.coupon_code?.name);
            setCouponToggle(pre => pre = true)
        } else {
            setShowCoupon(pre => pre = "Not Available")
        }
        setRefresh(null)
    }, [serviceData?.coupon_code?.end_duration, refresh])
    // end of coupon status


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="bg-[#292828] h-[380px] -mt-10">
                <img src="/v2/v2.png" alt="taxstick" className='w-[274px] h-[285px] lg:block hidden ml-24 pt-10'/>

                <div className="container mx-auto">
                    <div className="flex absolute flex-col lg:flex-row lg:py-0 py-4">
                        <div className="header_4 text-white lg:-mt-36 min-[1400px]:w-[871px] lg:w-[720px] w-[345px]">
                            {title}
                        </div>

                        <div className="lg:-mt-32 lg:ml-32 lg:pt-0 pt-10">
                            <button onClick={showModal}
                                    className="focus:outline-none bg-hover text-white paragraph_1 py-3 px-28 rounded-md">
                                {btnText}
                            </button>
                        </div>

                        <Modal destroyOnClose={true} title={serviceData?.coupon_code?.name || "No Data"}
                               open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} visible={isModalOpen}>
                            <div className='flex justify-center items-center hero_font_family '>
                                {
                                    serviceData?.coupon_code ?
                                        <div className=''>
                                            {
                                                couponToggle === true &&
                                                <p className='text-[18px] font-medium mb-0 text-center'>Please copy the
                                                    code :</p>
                                            }
                                            <p className='text-[20px] font-semibold mb-0 text-[#14AA40] flex justify-center mt-2'>
                                                {
                                                    <span
                                                        className={`${showCoupon === "Not Available" ? "text-red-500" : ""}`}>{showCoupon}</span>
                                                }
                                            </p>
                                        </div>
                                        :
                                        <p className='text-[34px] text-hover font-mono'>Not Available!</p>
                                }
                            </div>
                        </Modal>
                    </div>
                </div>
                <img src="/v2/v2.png" alt="taxstick"
                     className='w-[158px] h-[164px] lg:block hidden ml-auto -mt-20 mr-4'/>
            </div>
        </>
    );
};

export default Coupon;