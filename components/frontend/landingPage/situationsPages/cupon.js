import React from 'react';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { CouponCodeUpdateAPI } from '../../../../helpers/backend_helper';


const Coupon = ({ handleCancel, data }) => {
    const { end_duration = false, start_duration = false, status } = data?.coupon_code || {};
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
                    setShowCoupon(pre => pre = data?.coupon_code?.name);
                    setCouponToggle(pre => pre = true)
                } else {
                    // if date expired, the coupon will be auto disabled 
                    const query = { id: data?.coupon_code?._id }
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
        } else if(status === 'active' && (!startDate && !endDate)) {
            setShowCoupon(pre => pre = data?.coupon_code?.name);
            setCouponToggle(pre => pre = true)
        } else {
            setShowCoupon(pre => pre = "Not Available")
        }
        setRefresh(null)
    }, [data?.coupon_code?.end_duration, refresh])


    return (
        <div className='flex justify-center items-center hero_font_family '>
            {
                data?.coupon_code ?
                    <div className=''>
                        {
                            couponToggle === true &&
                            <p className='text-[18px] font-medium mb-0 text-center'>Please copy the code :</p>
                        }
                        <p className='text-[20px] font-semibold mb-0 text-[#14AA40] flex justify-center mt-2'>
                            {
                                <span className={`${showCoupon === "Not Available" ? "text-red-500" : ""}`}>{showCoupon}</span>
                            }
                        </p>
                    </div>
                    :
                    <p className='text-[34px] text-purple-500 font-mono'>Not Available!</p>
            }
        </div>
    );
};

export default Coupon;