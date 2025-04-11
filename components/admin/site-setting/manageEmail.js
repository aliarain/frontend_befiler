import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Tabs } from 'antd';
import SendGridManageEmail from '../site-settings-actions/sendGrid';
import OtherProviderManageEmail from '../site-settings-actions/otherEmailProvider';
const { Option } = Select;
import { AWSFileUploadAPI, createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';
import { ClipLoader, DotLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import GmailEmailProvider from '../site-settings-actions/gmailProvider';
import { AiOutlineCheck } from 'react-icons/ai';
import Link from 'next/link';
import { FaDownload } from 'react-icons/fa';


const ManageEmail = () => {
    const [form] = Form.useForm();
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [websiteLogo, setWebsiteLogo] = useState();
    const [refreshPage, setRefreshPage] = useState(null);
    const [getEnvInfo, setEnvInfo] = useState({});

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
        values.logo_url = websiteLogo || undefined;
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
                }
            })
        }
    };


    return (
        <div className='pt-3'>
            <Tabs defaultActiveKey="1" centered>

                {/* Email sender information */}
                <Tabs.TabPane tab="General Information" key="1">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        {/* Auth email Information */}
                        <div className='p-5'>
                            <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]"></p>

                            {/* Auth email section */}
                            <Form.Item
                                name="website_name"
                                label='Website Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input website name!',
                                    },
                                ]}
                            >
                                <Input placeholder='For example: taxstick' />
                            </Form.Item>


                            <Form.Item
                                name="website_domain_name"
                                label='Website Domain Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required!',
                                    },
                                ]}
                            >
                                <Input placeholder='For example: http://taxstick.com/' />
                            </Form.Item>

                            <Form.Item
                                label="Company Logo"
                                name="logo_url"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Website Logo!',
                                    },
                                ]}
                                extra='This logo will show in the email'
                            >
                                <div className="flex items-center gap-2 relative">
                                    <input type='file'
                                        placeholder='Website Logo'
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
                                        <span className="flex justify-center items-center absolute top-0 left-52 md:left-72" title='Download logo'>
                                            <Link href={getEnvInfo?.logo_url}>
                                                <a>
                                                    <FaDownload size={25} className='text-purple-500 cursor-pointer' />
                                                </a>
                                            </Link>
                                        </span>
                                    }
                                </div>
                            </Form.Item>

                            {/* Welcome Message section */}
                            <Form.Item
                                name="welcome_message"
                                label='Welcome Message (Email Subject)'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input welcome message!',
                                    },
                                ]}
                                extra='When a new user signup, this text will show in email subject'
                            >
                                <Input placeholder='For example: Welcome to Taxstick' />
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


                {/* SendGrid */}
                <Tabs.TabPane tab="Email Option 1" key="2">
                    <SendGridManageEmail />
                </Tabs.TabPane>

                {/* Other's Provider */}
                <Tabs.TabPane tab="Email Option 2" key="3">
                    <GmailEmailProvider />
                </Tabs.TabPane>


                {/* Other's Provider */}
                <Tabs.TabPane tab="Email Option 3" key="4">
                    <OtherProviderManageEmail />
                </Tabs.TabPane>
            </Tabs>


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
        </div >
    );
};

export default ManageEmail;