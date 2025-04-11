import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { getAllSiteSettingAPI } from '../../../helpers/backend_helper';
import { BsArrowRight } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

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


const MolliePayment = ({
    handleCancelPayment,
    userEmail,
    grandTotol,
    total,
    taxFileId,
    setConfirmPayment,
    usermode,
    countryCurrency,

}) => {
    const router = useRouter();
    const [product, setProduct] = useState({});
    const [siteLogo, setSiteLogo] = useState('')
    const [mollieUrl, setMollieUrl] = useState(null)

    // data initialization
    useEffect(() => {
        setProduct({
            name: `Tax file filled by ${usermode}`,
            price: grandTotol !== null ? grandTotol : total,
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


    const handlePayment = async () => {
        const paymentData = {
            name: `Tax file filled by ${usermode}`,
            price: !!grandTotol ? grandTotol : total,
            taxFileId: taxFileId,
            countryCurrency
        }

        const token = `Bearer ${localStorage.getItem('taxstickToken')}`
        const config = {
            headers: { Authorization: token }
        };
        const { data } = await axios.post(`${process.env.BACKEND_URL}api/payment/mollie-payment`, paymentData, config)

        window.open(data, 'popUpWindow', 'height=700,width=600,left=100,top=100, resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

        router.push('/user/submitted-tax-file/')
    }


    return (
        <div className='text-center mt-20 mr-5'>
            <button className='rounded-[3px] bg-black py-2 px-3 text-white hover:shadow-lg transition duration-300' onClick={handlePayment}>
                <div className='flex items-center justify-center gap-3'>
                    <span className='text-[18px] font-semibold'> <BsArrowRight /> </span>
                    <span className='custom_front'> Pay With Mollie </span>
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

export default MolliePayment;