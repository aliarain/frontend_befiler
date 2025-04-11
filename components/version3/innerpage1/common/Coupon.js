import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import { CouponCodeUpdateAPI } from '../../../../helpers/backend_helper';

const Coupon = ({ serviceData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { end_duration = false, start_duration = false, status } = serviceData?.coupon_code || {};
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
                    const query = { id: serviceData?.coupon_code?._id }
                    CouponCodeUpdateAPI({ status: 'disabled' }, query).then(data => {
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
            <div className="bg-cover bg-center px-4 md:px-0  mx-auto h-[400px] xl:h-[620px] flex flex-col mt-20  justify-center items-center"
                style={{ backgroundImage: `url('/v3/Why/bg.svg')` }}>
                <div className='flex flex-col sm:flex-row space-x-2 md:space-x-8 lg:space-x-72 '>
                    <h1 className='text-[24px] md:text-[30px]lg:text-[36px] mt-8 text-[#fff] font-semibold max-w-[700px]'>{`Whether you want a Tax Expert’s help or to doit yourself, we’ve got a discount for you.`}</h1>
                    <div>

                        <div className=" lg:ml-32 lg:pt-0 pt-10">
                            <button onClick={showModal}
                                className='bg-white  text-[#10B981] text-[16px] font-bold px-10 py-4 rounded-full whitespace-pre'>
                                Get coupon
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
                                            <p className='text-[20px] font-semibold mb-0 text-primary flex justify-center mt-2'>
                                                {
                                                    <span
                                                        className={`${showCoupon === "Not Available" ? "text-red-500" : ""}`}>{showCoupon}</span>
                                                }
                                            </p>
                                        </div>
                                        :
                                        <p className='text-[34px] text-primary font-mono'>Not Available!</p>
                                }
                            </div>
                        </Modal>
                    </div>
                </div>

        
            </div>
        </>
    );
};

export default Coupon;