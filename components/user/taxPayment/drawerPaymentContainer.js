import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import StripePaymentGateway from './StripePaymentGateway';
import { toast, ToastContainer } from 'react-toastify';
import RazorPay from './razorpay';
import MolliePayment from './mollie';
import PaypalCheckout from './paypal';
import { environmentVariablesInfo } from '../../../helpers/backend_helper';


const DrawerPaymentContainer = ({
    handleCancelPayment,
    userEmail,
    grandTotol,
    total,
    taxFileId,
    setConfirmPayment,
    usermode,
    countryCurrency,
    closeDrawer
}) => {
    const [product, setProduct] = useState({});
    const [getPaymentOptions, setPaymentOptions] = useState(null);


    // load initial data
    useEffect(() => {
        setProduct({
            name: `Tax file filled by ${usermode}`,
            price: grandTotol !== null ? grandTotol : total,
            taxFileId: taxFileId,
            countryCurrency,
            email: userEmail,
            user_role: usermode
        })

    }, [userEmail, grandTotol, total, taxFileId, usermode, countryCurrency])


    // fetch payment method option
    useEffect(() => {
        environmentVariablesInfo().then(res => {
            if (res?.status === true) {
                setPaymentOptions(res?.data)
            }
        })

    }, [])

    useEffect(() => {},[product?.price])

    return (
        <section className="min-h-screen w-full relative" >
            <div className="payment_container__main ">
                <p className='text-center mt-2 text-[16px] border-b mx-[10%] pb-2 border-cyan-300'>Please Choose a <span className='bg-green-200 px-2 rounded-md text-purple-700'>Payment</span> Method</p>

                <div className='mt-4'></div>

                {/* switch payment methods */}
                <Tabs defaultActiveKey="1" centered>
                    {/* Stripe payment method */}
                    {
                        getPaymentOptions?.stripe_status === "enable" &&
                        <Tabs.TabPane tab="Stripe with Card" key="1">
                            <StripePaymentGateway
                                handleCancelPayment={handleCancelPayment}
                                userEmail={userEmail}
                                grandTotol={grandTotol}
                                total={total}
                                taxFileId={taxFileId}
                                setConfirmPayment={setConfirmPayment}
                                usermode={usermode}
                                countryCurrency={countryCurrency}
                            />
                        </Tabs.TabPane>
                    }


                    {/* PayPal payment method */}
                    {
                        (getPaymentOptions?.paypal_status === "enable" && !!product) &&
                        <Tabs.TabPane tab="PayPal" key="2">
                            <PaypalCheckout
                                product={product}
                                closeDrawer={closeDrawer}
                            />
                        </Tabs.TabPane>
                    }


                    {/* Razorpay payment method */}
                    {
                        getPaymentOptions?.razorpay_status === "enable" &&
                        <Tabs.TabPane tab="Razorpay" key="3">
                            <RazorPay
                                handleCancelPayment={handleCancelPayment}
                                userEmail={userEmail}
                                grandTotol={grandTotol}
                                total={total}
                                taxFileId={taxFileId}
                                setConfirmPayment={setConfirmPayment}
                                usermode={usermode}
                                countryCurrency={countryCurrency}

                            />
                        </Tabs.TabPane>
                    }


                    {/* Mollie payment method */}
                    {
                        getPaymentOptions?.mollie_status === "enable" &&
                        <Tabs.TabPane tab="Mollie" key="4">
                            <MolliePayment
                                handleCancelPayment={handleCancelPayment}
                                userEmail={userEmail}
                                grandTotol={grandTotol}
                                total={total}
                                taxFileId={taxFileId}
                                setConfirmPayment={setConfirmPayment}
                                usermode={usermode}
                                countryCurrency={countryCurrency}
                            />
                        </Tabs.TabPane>
                    }
                </Tabs>

            </div>


            {/* // bg logic */}
            <div className="payment_container min-h-screen absolute top-0 left-0 w-full">

            </div>

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


export default DrawerPaymentContainer;