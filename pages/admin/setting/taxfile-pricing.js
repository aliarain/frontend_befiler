import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layout/adminLayout";
import { MdAccountCircle } from "react-icons/md";
import { Form, Tabs } from "antd";
import { createPaymentMethodOptionAPI, getAllPaymentMethodOptionAPI, getOneTaxPricingAPI, updatePaymentMethodOptionAPI, updateTaxPricingAPI } from "../../../helpers/backend_helper";
import TaxFilePrice from "../../../components/admin/form/taxFilePrice";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import StripePaymentMethod from "../../../components/admin/payment-methods/stripe";
import RezorPayPaymentMethod from "../../../components/admin/payment-methods/rezorpay";
import PaypalPaymentMethod from "../../../components/admin/payment-methods/paypal";
import MolliePaymentMethod from "../../../components/admin/payment-methods/mollie";
import Head from "next/head";
import TaxFileDetails from "../taxfiles/details";


const AdminSettingTaxFilePricing = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [taxPricingData, setTaxPricingData] = useState({});
    const [refreshData, setRefreshData] = useState(null);
    const [taxPricingName, setTaxPricingName] = useState(null);
    const [getPaymentOption, setPaymentOption] = useState(null);
    const [getPaymentOptionValue, setPaymentOptionValue] = useState(0);


    // fetch data
    useEffect(() => {
        const data = { fileName: taxPricingName }
        getOneTaxPricingAPI(data).then(data => {
            if (data?.status === true) {
                setTaxPricingData(data?.data)
            } else {
                setTaxPricingData([])
            }
        })

        setRefreshData(null)
    }, [taxPricingName, refreshData])


    // update tax-pricing
    const onFinish = (values) => {
        const queryId = { id: taxPricingData?._id };
        if (queryId) {
            updateTaxPricingAPI(values, queryId).then(data => {
                if (data?.status === true) {
                    toast.success(data?.message);
                    setRefreshData(data?.data)
                }
            })
        }
    };


    // form initial value set
    useEffect(() => {
        if (!!taxPricingData) {
            form.resetFields()
            form.setFieldsValue({
                ...taxPricingData
            });
        }

    }, [taxPricingData, taxPricingName]);


    const handleAddNewProvince = () => {
        router.push('/admin/setting/create-taxfile-price')
    }

    // fetch payment method option
    useEffect(() => {
        getAllPaymentMethodOptionAPI().then(res => {
            if (res?.status === true) {
                setPaymentOption(res?.data[0])
                setPaymentOptionValue(pre => pre = res?.data[0]?.payment_method)
            }
        })

    }, [refreshData])


    // handle radio payment
    const handleRadioPayment = (e) => {
        const dataV = { payment_method: Number(e.target.value) }

        if (!!getPaymentOption) {
            const queryV = { id: getPaymentOption?._id };
            updatePaymentMethodOptionAPI(dataV, queryV).then(res => {
                setPaymentOption()
                if (res?.status === true) {
                    toast.success(res?.message);
                    setRefreshData(res?.message)
                }
            })

        } else {
            createPaymentMethodOptionAPI(dataV).then(res => {
                setPaymentOption()
                if (res?.status === true) {
                    toast.success(res?.message);
                    setRefreshData(res?.message)
                }
            })
        }
    }


    // tax calculate (overview)
    const tax_filing_st = taxPricingData?.taxfees;
    const service_charge = taxPricingData?.service_charges;
    const welcome_benefit = taxPricingData?.welcome_benefit;

    let sumAdditionalFees = 0;
    taxPricingData?.additional_fees?.forEach(additional => {
        sumAdditionalFees += additional?.additional_fee;
    })

    const sub_total = Number(sumAdditionalFees) + Number(tax_filing_st) + Number(service_charge) + Number(welcome_benefit);


    return (
        <>
            <section className="bg-gray-100 mx-2 rounded-md pt-12 min-h-screen px-4">
                <Head>
                    <title>Tax Pricing & Payment</title>
                </Head>


                <div className="lg:grid lg:grid-cols-2 lg:gap-2 xl:gap-6">
                    <div className="bg-gray-50 pl-4 m-4 lg:w-full lg:m-0 rounded-t shadow-sm">
                        <div className="relative p-6">
                            {/* upper design */}
                            <div className="h-12">
                                <div className="absolute w-16 h-16 bg-red-600 shadow-md rounded flex items-center justify-center text-white -top-5">
                                    <span>
                                        {" "}
                                        <MdAccountCircle size={35} />{" "}
                                    </span>
                                </div>

                                <span className="capitalize ml-20">
                                    Tax File Pricing
                                </span>
                            </div>

                            {/* add new tax price */}
                            <div className='absolute top-3 right-5'>
                                <button className='btn-taxants text-white' onClick={handleAddNewProvince}>
                                    Add Tax Price
                                </button>
                            </div>
                        </div>

                        {/* question and answer form */}
                        <TaxFilePrice form={form} additionalFees={taxPricingData?.additional_fees} onFinish={onFinish} setTaxPricingName={setTaxPricingName} />
                    </div>

                    {/* calculation part */}
                    <div className="bg-gray-50 m-4 lg:m-0 rounded-t shadow-sm">
                        <div className="relative p-6">
                            {/* upper design */}
                            <div className="h-12">
                                <div className="absolute w-16 h-16 bg-red-600 shadow-md rounded flex items-center justify-center text-white -top-5">
                                    <span>
                                        {" "}
                                        <MdAccountCircle size={35} />{" "}
                                    </span>
                                </div>

                                <span className="capitalize ml-20">
                                    Overview
                                </span>
                            </div>

                            <div className="border-b mt-3 mr-20"></div>

                            <div className="flex justify-between border-b pt-3 pb-2">
                                <h6 className="font-semibold text-sm capitalize">Tax filing fees</h6>
                                <span className="inline-block mr-16">{tax_filing_st}</span>
                            </div>

                            <div className="flex justify-between border-b pt-3 pb-2">
                                <h6 className="font-semibold text-sm capitalize">Service charges</h6>
                                <span className="inline-block mr-16">{service_charge}</span>
                            </div>

                            <div className="flex justify-between border-b pt-3 pb-2">
                                <h6 className="font-semibold text-sm capitalize">Welcome Benefit</h6>
                                <span className="inline-block mr-16">{welcome_benefit}</span>
                            </div>

                            {
                                taxPricingData?.additional_fees?.map((additional, i) =>
                                    <div className="flex justify-between border-b pt-3 pb-2" key={i + 234232}>
                                        <h6 className="font-semibold text-sm capitalize">{additional?.additional_fee_name}</h6>
                                        <span className="inline-block mr-16">{additional?.additional_fee}</span>
                                    </div>
                                )
                            }


                            <div className="flex justify-between pt-3 pb-2">
                                <h6 className="font-semibold text-sm">Sub Total</h6>
                                <span className="inline-block mr-16">{sub_total ? sub_total : 0}</span>
                            </div>

                        </div>
                    </div>
                </div>


                {/* payment method selection */}
                <div className="h-auto bg-gray-50 px-10 rounded-md mx-4 pb-3 relative">

                    <p className="pt-3"></p>
                    <p className="md:absolute md:top-4 md:left-5 px-2 text-center py-1 font-mono text-[16px] outline outline-purple-200 rounded-md">Payment Setting</p>


                    {/* payment methods information for backend */}
                    <div className="mt-3 w-full md:w-2/3 mx-auto pb-4">
                        <Tabs defaultActiveKey="1" centered>
                            {/* Stripe payment method */}
                            <Tabs.TabPane tab="Stripe" key="1">
                                <StripePaymentMethod setRefreshData={setRefreshData} />
                            </Tabs.TabPane>


                            {/* PayPal payment method */}
                            <Tabs.TabPane tab="PayPal" key="2">
                                <PaypalPaymentMethod setRefreshData={setRefreshData} />
                            </Tabs.TabPane>


                            {/* Razorpay payment method */}
                            <Tabs.TabPane tab="Razorpay" key="3">
                                <RezorPayPaymentMethod setRefreshData={setRefreshData} />
                            </Tabs.TabPane>


                            {/* Mollie payment method */}
                            <Tabs.TabPane tab="Mollie" key="4">
                                <MolliePaymentMethod setRefreshData={setRefreshData} />
                            </Tabs.TabPane>

                        </Tabs>
                    </div>
                </div>

                <div className="h-20"></div>

                {/* toast message */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </section>

        </>
    );
};
AdminSettingTaxFilePricing.layout = AdminLayout
export default AdminSettingTaxFilePricing;
