import React, { useEffect, useState } from 'react';
import { MdLocationCity } from "react-icons/md";
import { InputNumber, Form, Input, Select, Button, Space } from 'antd';
const { Option } = Select;
import AdminLayout from '../../../layout/adminLayout';
import { createTaxPricingAPI, getAllUserRoleExceptAdminAPI } from '../../../helpers/backend_helper';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { MinusCircleOutlined } from '@ant-design/icons';
import { ClipLoader } from 'react-spinners';
import currencies from 'currency-codes';
import Head from 'next/head';
import AdminSettingFAQ from "./faq";


const CreateTaxfilePrice = ({ id, form, update = null }) => {
    const router = useRouter();
    const [spinnerToggle, setSpinnerToggle] = useState(false);
    const currency = currencies.codes() ?? [];

    // user role data fetch
    const [userRoleData, setUserRoleData] = useState([]);

    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(info => {
            if (info?.status === true) {
                setUserRoleData(info?.data)
            }
        })
    }, []);


    // add new province form handler
    const onFinish = (values) => {
        setSpinnerToggle(true)
        createTaxPricingAPI(values).then(data => {
            if (data?.status === true) {
                setSpinnerToggle(false)
                toast.success(data?.message);
                setTimeout(() => {
                    router.push('/admin/setting/taxfile-pricing')
                }, 3000);

            } else {
                toast.success(data?.message);
            }
        })
    };


    return (
        <>

            <section className='mx-8 my-16 pb-15 min-h-screen'>
                <Head>
                    <title>Create Tax Pricing</title>
                </Head>

                <div className='shadow-lg relative rounded bg-white p-4'>
                    {/* upper style */}
                    <div className='h-12'>
                        <div className='absolute w-16 h-16 shadow flex justify-center rounded -top-5 items-center bg-[#9124A3]'>
                            <span><MdLocationCity size={30} className='text-white' /></span>
                        </div>
                        <span className='ml-20 text-xl text-gray-500'>Add Taxfile Price</span>
                    </div>
                    {/* add new province  */}
                    <div className='w-full h-auto md:flex justify-center text-gray-500 text-base pb-2'>
                        <div className='md:w-full lg:w-1/2'>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={{ remember: true }}
                            >

                                <Form.Item
                                    label="Select User"
                                    name="user_role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select user!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        className='w-full'
                                        placeholder="Select user"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    >
                                        {
                                            userRoleData?.map((role, ind) => <Option value={role?.name} key={role?._id}>{role?.display_name}</Option>)
                                        }
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Select Currency"
                                    name="currency"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select currency!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        className='w-full'
                                        placeholder="Select currency"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    >
                                        {
                                            currency?.map((crr, ind) => <Option value={crr} key={ind + 4423234}>{crr}</Option>)
                                        }
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={`Tax fees`}
                                    name="taxfees"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input tax fees!",
                                        },
                                    ]}
                                    style={{ border: '0' }}
                                >
                                    <InputNumber style={{ width: "100%" }} placeholder='Please input tax fees' />
                                </Form.Item>


                                <Form.Item
                                    label="Service charges"
                                    name="service_charges"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input service charges!",
                                        },
                                    ]}
                                    extra='if not required, make it zero(0)'
                                >
                                    <InputNumber style={{ width: "100%" }} placeholder='Please input service charges' />
                                </Form.Item>

                                <Form.Item
                                    label="Welcome Benefit"
                                    name="welcome_benefit"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input welcome benefit fees!",
                                        },
                                    ]}
                                    extra='if not required, make it zero(0)'
                                >
                                    <InputNumber style={{ width: "100%" }} placeholder='Please input welcome benefit fees' />
                                </Form.Item>


                                {/* tax name and percentage */}
                                <Form.List name="additional_fees">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} className='block' align="baseline">
                                                    <div className='grid grid-cols-2 gap-3'>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'additional_fee_name']}
                                                        >

                                                            <Input placeholder='Additional Fees Name' />
                                                        </Form.Item>


                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'additional_fee']}

                                                        >

                                                            <InputNumber placeholder='Input fees' />

                                                        </Form.Item>
                                                    </div>

                                                    <p className='text-red-500 font-bold'><MinusCircleOutlined onClick={() => remove(name)} /></p>
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block>
                                                    <span className='text-green-700'> + Add Additional Fees</span>

                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>


                                <div className='flex justify-end relative'>
                                    <Form.Item style={{ width: '100%', marginTop: '20px' }}>
                                        <button type="submit" className='bg-[#9C27B0] hover:bg-[#9124A3] text-white w-48 mr-14 px-6 py-2 rounded'>
                                            Save
                                        </button>
                                    </Form.Item>

                                    {
                                        spinnerToggle === true &&
                                        <span className="absolute top-[20%] right-[20%] md:right-[30%]">
                                            <ClipLoader color="purple" size={50} />
                                        </span>
                                    }
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>

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
CreateTaxfilePrice.layout = AdminLayout
export default CreateTaxfilePrice;