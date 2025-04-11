import React from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import {useState} from 'react';
import {environmentVariablesInfo, paypalPaymentStatus} from '../../../helpers/backend_helper';
import {toast, ToastContainer} from 'react-toastify';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useFetch} from '../../../helpers/hooks';
import {Skeleton} from "antd";


const PaypalCheckout = ({product, closeDrawer}) => {
    const [environmentVariable] = useFetch(environmentVariablesInfo);
    const router = useRouter();
    const [paypalError, setPaypalError] = useState(null);
    const [initialOptions, setInitialOptions] = useState({});

    useEffect(() => {
        if (!!product?.countryCurrency && !!environmentVariable?.paypal_client_id) {
            setInitialOptions({
                "client-id": environmentVariable?.paypal_client_id,
                currency: `${product?.countryCurrency}`,
                intent: "capture",
            })
        }
    }, [environmentVariable?.paypal_client_id, product?.countryCurrency])

    // paypal database info submit
    const handlePaymentPaypal = (details) => {
        const paymentData = {
            details,
            product,
            progress_number: 50,
            steps: 3,
            payment_method: 'Paypal'
        }
        paypalPaymentStatus(paymentData).then(res => {
            if (res?.status === true) {
                toast.success("Payment Successful, Thanks");
                closeDrawer()
                setTimeout(() => {
                    router.push('/user/submitted-tax-file/')
                }, 4000);
            } else {
                toast.warning(res.message);
            }
        })
    }

    if (!!paypalError) {
        alert(paypalError)
    }

    return (
        <div>
            {
                !!initialOptions?.currency ?
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: `${product?.price}`,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                const order = await actions.order.capture();
                                handlePaymentPaypal(data)
                            }}
                            onError={(err) => {
                                setPaypalError(err)
                            }}
                        />
                    </PayPalScriptProvider>
                    :
                    <Skeleton/>
            }

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

export default PaypalCheckout;