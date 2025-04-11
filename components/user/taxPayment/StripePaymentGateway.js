import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {BsArrowRight} from 'react-icons/bs';
import StripeCheckout from 'react-stripe-checkout';
import {toast, ToastContainer} from "react-toastify";
import {environmentVariablesInfo, getAllSiteSettingAPI, makePaymentStripeAPI} from '../../../helpers/backend_helper';
import {useFetch} from '../../../helpers/hooks';
import {Skeleton} from "antd";


const StripePaymentGateway = ({handleCancelPayment, userEmail, grandTotol, total, taxFileId, setConfirmPayment, usermode, countryCurrency = ''}) => {
    const router = useRouter()
    const [environmentVariable] = useFetch(environmentVariablesInfo);
    const [product, setProduct] = useState({});

    useEffect(() => {
        setProduct({
            name: `Tax file filled by ${usermode}`,
            price: grandTotol !== null ? grandTotol : total,
            taxFileId: taxFileId,
            countryCurrency
        })
    }, [userEmail, grandTotol, total, taxFileId, usermode, countryCurrency])

    const handleStripePayment = async (token) => {
        const paymentData = {
            token,
            product,
            progress_number: 50,
            steps: 3
        }
        if (product?.price) {
            setConfirmPayment(true)
            makePaymentStripeAPI(paymentData).then(data => {
                if (data?.status === true) {
                    setConfirmPayment(false)
                    toast.success("Payment Success! Check emails for details");
                    setTimeout(() => {
                        router.push('/user/submitted-tax-file')
                    }, 3700);

                } else {
                    setConfirmPayment(false)
                    toast.error("Payment failed! Something went wrong, try again.");
                }
            })
        }
    };

    // load organization name / site setting
    const [organizationName, setOrganizationName] = useState('');
    useEffect(() => {
        getAllSiteSettingAPI().then(res => {
            if (res?.status === true) {
                setOrganizationName(res?.data[0].username)
            }
        })
    }, [])


    const [stripKey, setStripKey] = useState();
    useEffect(() => {
        if (!!organizationName && !!environmentVariable?.stripe_publishable_key) {
            setStripKey(environmentVariable?.stripe_publishable_key)
        }
    }, [environmentVariable?.stripe_publishable_key, organizationName])

    return (
        <div>
            <div className='text-center mt-20 mr-5'>
                {
                    !!stripKey ?
                        <StripeCheckout
                            name={organizationName}
                            image="https://stripe.com/img/documentation/checkout/marketplace.png"
                            shippingAddress
                            billingAddress
                            description={`Your Total is ${product?.price} ${countryCurrency}`}
                            amount={Math.round(product?.price * 100)}
                            currency={countryCurrency}
                            stripeKey={stripKey}
                            token={handleStripePayment}
                            email={userEmail}
                        >
                            <button
                                className='rounded-[3px] bg-[#7269E0] py-2 px-3 text-white hover:shadow-lg transition duration-300'>
                                <div className='flex items-center justify-center gap-3'>
                                    <span className='text-[18px] font-semibold'> <BsArrowRight/> </span>
                                    <span className='custom_front'> Pay With Stripe </span>
                                </div>
                            </button>
                        </StripeCheckout>
                        :
                        <Skeleton/>
                }
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
        </div>
    );
};

export default StripePaymentGateway;