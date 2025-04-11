import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Tabs } from 'antd';
import { AWSFileUploadAPI, createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';
const { Option } = Select;
import { ClipLoader, DotLoader } from "react-spinners";
import { AiOutlineCheck } from 'react-icons/ai';
import Link from 'next/link';
import { FaDownload } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';


const EnvironmentSetting = () => {
    const [form] = Form.useForm();
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const [refreshPage, setRefreshPage] = useState(null);
    const [getEnvInfo, setEnvInfo] = useState({});

    const [websiteLogo, setWebsiteLogo] = useState();
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);


    // fetch existing data
    useEffect(() => {
        environmentVariablesInfo().then(data => {
            setEnvInfo(data?.data)
        })

        setRefreshPage(null);
    }, [refreshPage])


    // form data loading, if exist
    useEffect(() => {
        form.setFieldsValue({
            ...getEnvInfo
        })
    }, [getEnvInfo])


    // web site logo
    const handleWebsiteLogo = async (e) => {
        setFileLoading(true);

        const data = new FormData()
        data.append('file', e.target.files[0])

        AWSFileUploadAPI(data).then(url => {
            if (url?.url) {
                setWebsiteLogo(url?.url)
                setIsPhotoUploaded(true)
                setFileLoading(false)

            } else {
                setIsPhotoUploaded(false)
                setFileLoading(false)
            }
        });
    }


    // submit data
    const onFinish = (values) => {
        setLoadSpinner(true)

        values.logo_url = websiteLogo;

        // if data exist, so update document
        if (getEnvInfo?._id) {
            const queryValue = { id: getEnvInfo?._id }
            updateEnvironmentInfo(values, queryValue).then(data => {
                if (data?.status === true) {
                    toast.success('Successfully Updated');
                    setLoadSpinner(false)
                    setRefreshPage(data)

                } else {
                    setLoadSpinner(false)
                    toast.error(data?.message)
                }
            })

        } else {
            // if data not exist, so create document
            createEnvironmentInfo(values).then(data => {
                if (data?.status === true) {
                    toast.success('Successfully Created');
                    setLoadSpinner(false)
                    setRefreshPage(data)
                } else {
                    setLoadSpinner(false)
                    toast.error(data?.message)
                }
            })
        }
    };


    return (
        <div>
            <div className='pt-3'>
                <Tabs defaultActiveKey="1" centered>

                    {/* Email sender information */}
                    <Tabs.TabPane tab="Environment Setup Information" key="1">
                        <Form
                            form={form}
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                        >
                            <div className='p-5'>
                                {/* company email section */}
                                <Form.Item
                                    name="company_email"
                                    label='Company Email'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Company Email!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Company email address' />
                                </Form.Item>

                                {/*logo url section */}
                                <Form.Item
                                    label="Company Logo"
                                    name="logo_url"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please Input Company Logo!',
                                        },
                                    ]}
                                >
                                    <div className="flex items-center gap-2 relative">
                                        <input type='file'
                                            placeholder='Company Logo'
                                            style={{
                                                width: '200px', backgroundColor: '#A14EE7', color: '#fff', borderRadius: '5px', paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px'
                                            }}
                                            onChange={handleWebsiteLogo}

                                        />
                                        {
                                            isPhotoUploaded > 0 && <span className="text-green-500 pl-5">
                                                <AiOutlineCheck size={20} />
                                            </span>
                                        }

                                        {
                                            fileLoading === true &&
                                            <span className="flex justify-center absolute top-0 left-72">
                                                <ClipLoader color="purple" size={30} />
                                            </span>
                                        }

                                        {
                                            getEnvInfo?.logo_url &&
                                            <span className="flex justify-center items-center absolute top-0 left-72" title='Download logo'>
                                                <Link href={getEnvInfo?.logo_url}>
                                                    <a>
                                                        <FaDownload size={20} className='text-purple-500 cursor-pointer' />
                                                    </a>
                                                </Link>
                                            </span>
                                        }
                                    </div>
                                </Form.Item>


                                {/* Auth email Information */}
                                <div>
                                    <Form.Item
                                        name="admin_email"
                                        label='Super Admin Email Address'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Admin Email!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Super Admin Email Address' />
                                    </Form.Item>

                                    <Form.Item
                                        name="admins_email_list"
                                        label='Admin Email List'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input Admin Email List!',
                                            },
                                        ]}
                                        extra='To receive email at a same time. Use comma (,) to separate email address'
                                    >
                                        <Input placeholder="All admin's email address also included super admin" />
                                    </Form.Item>

                                </div>


                                <Form.Item
                                    name="payment_redirect"
                                    label='After Payment, Redirect URL'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Payment Redirect!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="For example: http://taxstick.com/" />
                                </Form.Item>

                                {/* Redirect Url section */}
                                <Form.Item
                                    name="redirect_url"
                                    label='Your Login Redirect URL'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Redirect Url!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='For example: http://taxstick.com/login/' />
                                </Form.Item>

                                {/* twak to src */}
                                <Form.Item
                                    name="twak_to_src_url"
                                    label='Your Tawk To Source URL'
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input url!',
                                        },
                                    ]}
                                    extra='For example: https://embed.tawk.to/1234567890/abc12356789'
                                >
                                    <Input placeholder='tawk to script src' />
                                </Form.Item>


                                <div className='relative'>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className='mt-4'>
                                            Submit
                                        </Button>
                                    </Form.Item>

                                    {
                                        loadingSpinner == true &&
                                        <div className="flex justify-center absolute top-0 left-[40%]">
                                            <div>
                                                <DotLoader color="purple" size={20} className='ml-5' />
                                                <p className='text-purple-700 font-semibold text-[14px]'>Please Wait...</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Form>
                    </Tabs.TabPane>
                </Tabs>
            </div >

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

export default EnvironmentSetting;