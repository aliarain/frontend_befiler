import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import UserLayout from '../../../../layout/userLayout';
import {
    getAllCouponAPI,
    getOneTaxFilesAPI,
    getSpecificTaxPricingAPI
} from '../../../../helpers/backend_helper';
import PaymentDetails from '../../../../components/user/taxPayment/paymentDetails';
import {toast, ToastContainer} from 'react-toastify';
import Head from 'next/head';
import {Skeleton} from "antd";


const Step3Payment = () => {
    const router = useRouter();
    const {query = {}} = router;
    const [taxFileFormData, setTaxFileFormData] = useState({});
    const [taxPricingData, setTaxPricingData] = useState({});
    const [couponData, setCouponData] = useState([]);

    // fetch one tax filing data
    useEffect(() => {
        const queryValue = {id: query?.formID};
        getOneTaxFilesAPI(queryValue).then(data => {
            if (data?.status === true) {
                setTaxFileFormData(data?.data)
            }
        })
    }, [query?.formID])

    // fetch tax pricing data
    useEffect(() => {
        const userRole = {user_role: taxFileFormData?.user?.role}
        getSpecificTaxPricingAPI(userRole).then(data => {
            if (data?.status === true) {
                setTaxPricingData(data?.data)
            }
        })
    }, [taxFileFormData?.user?.role])

    // fetch coupon data
    useEffect(() => {
        getAllCouponAPI().then(data => {
            if (data?.status === true) {
                setCouponData(data?.data?.docs)
            }
        })
    }, [query?.formID])

    // handle Cancel Payment
    const handleCancelPayment = () => {
        router.push('/user/submitted-tax-file')
    }

    return (
        <div>
            <section className='min-h-screen p-4'>
                <Head>
                    <title>Tax File Form Step 3</title>
                </Head>

                <div className='main-form__container relative pb-5 pt-4 my-4'>
                    {/* header section of form */}
                    <div className=''>
                        <div className='-space-y-5'>
                            <p className='text-center text-gray-600 text-[24px]'>Make Payment to proceed</p>
                            <p className='text-center text-gray-600 text-[16px]'>This information will let us know more
                                about you.</p>
                        </div>
                        <div className='grid grid-cols-1 mt-4 text-center absolute -left-2 w-full shadow-md'>
                            <div className='bg-red-600 py-3 rounded-sm text-white font-semibold'>MAKE PAYMENT HERE</div>
                        </div>
                    </div>

                    {/* payment details */}
                    {
                        !!taxPricingData?.taxfees ?
                            <PaymentDetails
                                taxPricingData={taxPricingData}
                                couponData={couponData}
                                handleCancelPayment={handleCancelPayment}
                                userEmail={taxFileFormData?.user?.email}
                                taxFileId={taxFileFormData?._id}
                                province={taxFileFormData?.province_name}
                                taxFileFormData={taxFileFormData}
                            />
                            :
                            <Skeleton className={'mt-32 px-4'} active />
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
            </section>
        </div>
    );
};
Step3Payment.layout = UserLayout;
export default Step3Payment;