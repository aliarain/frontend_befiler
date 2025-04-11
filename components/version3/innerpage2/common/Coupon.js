import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import { CouponCodeUpdateAPI } from '../../../../helpers/backend_helper';

const Coupon = ({ serviceData, bgImage = '/v3/About3/goalbg.svg', bgColor = '' }) => {
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
        <section
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "20px",
            }}
        >
            <div className={`py-10 bg-[${bgColor}] !rounded-xl md:py-20 lg:py-40 xl:py-44 flex items-center justify-between max-w-[1320px] flex-col sm:flex-row mx-auto px-8  mt-10 md:mt-16 lg:mt-20 xl:mt-[100px]`}>
                <h1 className='inner-heading !normal-case !leading-[150%] !text-white w-full sm:w-[60%] lg:w-[70%] xl:w-[80%] mt-5 md:mt-0'>
                    {`Whether you want a Tax Expert’s help or to doit yourself, we’ve got a discount for you.`}
                </h1>
                <div>
                    <button onClick={showModal}
                        className='button !mt-10  !text-[#fff] hover:!text-[#fff] px-10 py-[22px] !rounded-[100px] whitespace-pre'>
                        Get coupon
                    </button>

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
        </section>
    );
};

export default Coupon;