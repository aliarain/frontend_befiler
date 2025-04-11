import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { environmentVariablesInfo, getAllSiteSettingAPI } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEnv } from '../../../contexts/envContext';
import { useFetch } from '../../../helpers/hooks';

// load js script
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


const RazorPay = ({
    handleCancelPayment,
    userEmail,
    grandTotol,
    total,
    taxFileId,
    setConfirmPayment,
    usermode,
    countryCurrency,
}) => {
    const [environmentVariable] = useFetch(environmentVariablesInfo);
    const router = useRouter();
    const [paypalDetails, setPaypalDetails] = useState(null);
    const [product, setProduct] = useState({});
    const [siteLogo, setSiteLogo] = useState('');


    // data initialization
    useEffect(() => {
        setProduct({
            name: `Tax file filled by ${usermode}`,
            price: grandTotol !==null ? grandTotol : total,
            taxFileId: taxFileId,
            countryCurrency
        })

    }, [userEmail, grandTotol, total, taxFileId, usermode, countryCurrency])


    // fetch organization logo
    useEffect(() => {
        getAllSiteSettingAPI().then(res => {
            if (res?.status === true) {
                setSiteLogo(res?.data[0]?.logo)
            }
        })
    }, [])


    // payment verification
    const initPayment = (data) => {
        const options = {
            key: environmentVariable?.razorpay_client_id,
            amount: product.price,
            currency: product.countryCurrency,
            name: product.name,
            description: userEmail,
            image: siteLogo ?? '/images/siteDetaultLogo.png',
            order_id: data.id,
            handler: async (response) => {
                try {
                    const token = `Bearer ${localStorage.getItem('taxstickToken')}`
                    const config = {
                        headers: { Authorization: token }
                    };
                    const razorPayData = {response, product}
                    const verifyUrl = `${process.env.BACKEND_URL}api/payment/razorpay-verify`;
                    const { data } = await axios.post(verifyUrl, razorPayData, config);
  
                    if(data?.status === true) {
                        toast.success(data?.message)
                        setTimeout(() => {
                            router.push('/user/submitted-tax-file/')
                        }, 4000);
                    }

                } catch (error) {
                    console.log("error ", error);
                }
            },
            theme: {
                color: "#5D3FD3",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    const handlePayment = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (res === false) {
            alert('Razorpay SDK failed to load!')
            return
        }

        try {
            const token = `Bearer ${localStorage.getItem('taxstickToken')}`
            const config = {
                headers: { Authorization: token }
            };
            const orderUrl = `${process.env.BACKEND_URL}api/payment/razorpay-order`;
            const { data } = await axios.post(orderUrl, { amount: product.price, currency: product.countryCurrency }, config);
            initPayment(data.data);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='text-center  mt-20 mr-5'>
            <button className='rounded-[3px] bg-[#3F52BE] py-2 px-3 text-white hover:shadow-lg transition duration-300 shadow-md' onClick={handlePayment}>
                <div className='flex items-center justify-center gap-3'>
                    <img src="/images/razorpay.png" alt="razorpay logo" className='w-36' />
                </div>
            </button>

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

export default RazorPay;