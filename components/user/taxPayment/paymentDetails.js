import { Button, Drawer, Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";
import DrawerPaymentContainer from './drawerPaymentContainer';
import Head from 'next/head';


const PaymentDetails = ({ taxPricingData = {}, couponData = [], handleCancelPayment, userEmail, taxFileId, taxFileFormData = {} }) => {

    const [confirmPayment, setConfirmPayment] = useState(false);

    const { service_charges, additional_fees, taxfees } = taxPricingData;
    const { user, province_name } = taxFileFormData;
    const { tax_info } = province_name ?? {};

    const tax_filing_st = taxPricingData?.taxfees;
    const service_charge = taxPricingData?.service_charges;
    const welcome_benefit = taxPricingData?.welcome_benefit;

    let sumAdditionalFees = 0;
    taxPricingData?.additional_fees?.forEach(additional => {
        sumAdditionalFees += additional?.additional_fee;
    })

    const sub_total = Number(sumAdditionalFees) + Number(tax_filing_st) + Number(service_charge) + Number(welcome_benefit);

    let totalTaxSum = 0;
    tax_info?.forEach(tx => {
        totalTaxSum += Number(tx.tax_percentage);
    })

    const tax = Number((sub_total * (totalTaxSum / 100)).toFixed(2));
    let total = Number((Number(sub_total) + Number(tax)).toFixed(2));

    // after applied coupon code  
    let [grandTotol, setGrandTotal] = useState(null);
    let [couponCount, setCouponCount] = useState(1);
    const [displayCouponCode, setDisplayCouponCode] = useState(null);
    // coupon check and validity
    const onFinish = (values) => {
        const couponValue = values?.coupon.trim();
        let coupon_valid = false;

        if (couponCount === 1) {
            couponData?.map((coupon, i) => {
                if (coupon?.name === couponValue) {
                    if (coupon?.status === 'active') {
                        if (coupon?.type === 'percentage' && (Number(coupon?.value) <= 100)) {
                            const offerValue = (total * (coupon?.value / 100));
                            total = total - offerValue;
                            setGrandTotal(pre => pre = Number((total).toFixed(2)))
                            toast.success(`Success! You have achieved ${coupon?.value}% offer`);
                            setDisplayCouponCode(`You have achieved ${coupon?.value}% offer`)
                            setCouponCount(20)

                        } else if (coupon?.type === 'amount' && (Number(total) >= Number(coupon?.value))) {
                            total = Number((total - coupon?.value).toFixed(2));
                            toast.success(`Success! You have achieved $${coupon?.value} offer`);
                            setDisplayCouponCode(`You have achieved $${coupon?.value} offer`)
                            setGrandTotal(total)
                            setCouponCount(20)

                        } else {
                            toast.error('Invalid coupon! Try again...')
                        }
                        coupon_valid = true
                    } else {
                        coupon_valid = true
                        toast.error('Coupon code expired!')
                    }
                }
            });
            if (coupon_valid === false) {
                toast.error('Invalid coupon!')
            }
        } else {
            toast.success(`Coupon has Already Applied!`)
        }
    };

    // drawer open and close
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    // if price any less than 0
    let isPriceZero = false;
    if (grandTotol < 0) {
        isPriceZero = true
        toast.warning(`Price can not be zero!`)
    } else if (total < 0) {
        isPriceZero = true
        toast.warning(`Price can not be zero!`)
    }

    return (
        <section>
            <Head>
                <title>Tax File Form Step 3</title>
            </Head>

            <div className='mt-24 px-5 relative'>
                <div className="flex justify-between border-b pt-3 pb-2">
                    <h6 className="font-normal text-[16px] text-purple-500">Details</h6>
                    <span className="inline-block mr-16 text-[16px] text-purple-500">Total</span>
                </div>

                <div className="flex justify-between border-b pt-3 pb-2">
                    <h6 className="font-normal text-sm text-gray-600">Tax filing fee ({user?.role})</h6>
                    <span className="inline-block mr-16 text-gray-600">${taxfees}</span>
                </div>

                <div className="flex justify-between border-b pt-3 pb-2">
                    <h6 className="font-normal text-sm text-gray-600">Service charges</h6>
                    <span className="inline-block mr-16 text-gray-600">${service_charges}</span>
                </div>

                <div className="flex justify-between border-b pt-3 pb-2">
                    <h6 className="font-normal text-sm text-gray-600">Welcome Benefit Fee</h6>
                    <span className="inline-block mr-16 text-gray-600">${welcome_benefit}</span>
                </div>

                <div className="flex justify-between border-b pt-3 pb-2">
                    <h6 className="font-normal text-sm text-gray-600">Additional Fee : </h6>
                </div>


                {
                    additional_fees?.map((additional, i) =>
                        <div className="flex justify-between border-b pt-3 pb-2" key={i + 234450}>
                            <h6 className="font-normal text-sm text-gray-600">{additional?.additional_fee_name}</h6>
                            <span className="inline-block mr-16 text-gray-600">${additional?.additional_fee}</span>
                        </div>
                    )
                }

                <div className="flex justify-between border-b pt-3 pb-2">
                    <h6 className="font-normal text-sm text-gray-600">Sub Total</h6>
                    <span className="inline-block mr-16 text-gray-600">${sub_total}</span>
                </div>

                <div className="flex justify-between border-b pt-3 pb-2">
                    <h6 className="font-normal text-sm text-gray-600">Tax ({totalTaxSum}%)</h6>
                    <span className="inline-block mr-16 text-gray-600">${tax}</span>
                </div>

                <div className="flex justify-between pt-3 pb-2">
                    <h6 className="font-normal text-sm text-gray-600">Total</h6>
                    <span className="inline-block mr-16 text-gray-600">${grandTotol !== null ? grandTotol : total}</span>
                </div>

                {/* coupon code */}
                <Form
                    name='form'
                    onFinish={onFinish}
                >
                    <div className='flex justify-between gap-5 mt-3 relative'>
                        <Form.Item
                            name='coupon'
                            style={{ width: '100%' }}
                        >
                            <Input placeholder='Coupon' style={{ width: '100%', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} />
                        </Form.Item>

                        <button className='block w-52 h-8 border rounded-md bg-[#39A551] hover:shadow-lg transition duration-300 focus:'>
                            <span className='block text-[12px] text-white'>APPLY COUPON</span>
                        </button>

                        {
                            displayCouponCode &&
                            <small className='text-purple-600 absolute top-10 left-0'>* {displayCouponCode}</small>
                        }
                    </div>
                </Form>


                {
                    confirmPayment &&
                    <span className='absolute top-[40%] left-[45%]'>
                        <p className='ml-5'><ScaleLoader color="purple" size={30} /></p>
                        <h6 className='text-purple-900'>Please wait...</h6>
                    </span>
                }

            </div>


            {/* footer -> cancel and payment methods selection */}
            <div className='text-end mt-3 mr-5'>
                <button className='rounded-[3px] bg-[#FF992C] py-2 px-3 mr-2 text-white hover:shadow-lg transition duration-300' onClick={handleCancelPayment}>
                    <div className='flex items-center justify-center gap-3'>
                        <span className='text-[18px]'> <BsArrowLeft />
                        </span> CANCEL
                    </div>
                </button>


                {
                    isPriceZero === false ?
                        <button className='rounded-[3px] bg-[#39A551] py-2 px-3 text-white hover:shadow-lg transition duration-300'>
                            <div className='flex items-center justify-center gap-3' onClick={showDrawer}>
                                <span className='text-[18px]'> <BsArrowRight /> </span>
                                <span className='text-[16px] font-normal'> Choose Payment Methods </span>
                            </div>
                        </button>
                        :
                        <button className='rounded-[3px] bg-[#b61c11] py-2 px-3 text-white hover:shadow-lg transition duration-300'>
                            <div className='flex items-center justify-center gap-3'>
                                <span className='text-[18px]'> <BsArrowRight /> </span>
                                <span className='text-[16px] font-normal'> Incorrect Price! </span>
                            </div>
                        </button>
                }

            </div>


            {/* Drawer UI */}
            <Drawer
                title=""
                width={500}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    padding: 5
                }}
                destroyOnClose
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                <DrawerPaymentContainer
                    handleCancelPayment={handleCancelPayment}
                    userEmail={userEmail}
                    grandTotol={grandTotol}
                    total={total}
                    taxFileId={taxFileId}
                    setConfirmPayment={setConfirmPayment}
                    usermode={taxFileFormData?.user?.role}
                    countryCurrency={taxPricingData?.currency}
                    closeDrawer={onClose}
                />

            </Drawer>


            {/* toast message */}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    );
};

export default PaymentDetails;