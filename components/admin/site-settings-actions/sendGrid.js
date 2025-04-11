import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Tabs } from 'antd';
const { Option } = Select;
import { createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';
import { DotLoader } from "react-spinners";
import { toast, ToastContainer } from 'react-toastify';
import swalAlert from '../../common/swalAlert';


const SendGridManageEmail = () => {
    const [form] = Form.useForm();
    const [loadingSpinner, setLoadSpinner] = useState(false);
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


    // submit data
    const onFinish = async (values) => {
        let makePermission;
        if (values?.sendgrid_status === 'enable') {
            let { isConfirmed } = await swalAlert.confirm(
                "Make sure that you have already disabled other provider's status",
                "Yes, active this service"
            );
            makePermission = isConfirmed;
        } else {
            makePermission = true;
        }

        if (makePermission) {
            setLoadSpinner(true)

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
        }
    };


    return (
        <div className='pt-0'>
            <Form
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                <div className='p-5'>
                    <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]">SendGrid  SMTP</p>

                    <Form.Item
                        name="email_host"
                        label='Email Host Address / Server'
                        rules={[
                            {
                                required: true,
                                message: 'Please input host email!',
                            },
                        ]}
                    >
                        <Input placeholder='Please input host email' />
                    </Form.Item>
                    {/* Email Port section */}
                    <Form.Item
                        name="email_port"
                        label='Email Port Number'
                        rules={[
                            {
                                required: true,
                                message: 'Please input email port!',
                            },
                        ]}
                    >
                        <Input placeholder='Please input email port' />
                    </Form.Item>
                    {/* Email Username section */}
                    <Form.Item
                        name="email_username"
                        label='Email Username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input email username!',
                            },
                        ]}
                    >
                        <Input placeholder='Please input email username' />
                    </Form.Item>
                    {/* Email Password section */}
                    <Form.Item
                        name="email_password"
                        label='Email Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input email password!',
                            },
                        ]}
                    >
                        <Input type='password' placeholder='Please input email password' />
                    </Form.Item>
                    {/* Email Sender section */}
                    <Form.Item
                        name="email_sender"
                        label='Sender Email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input email sender!',
                            },
                        ]}
                    >
                        <Input placeholder='Please input sender email' />
                    </Form.Item>

                    <Form.Item
                        name="sendgrid_status"
                        label='SendGrid Status'
                        rules={[
                            {
                                required: true,
                                message: 'Please input stripe status!',
                            },
                        ]}
                    >
                        <Select placeholder="Please Select SendGrid Status">
                            <Option value='disable'>Disable</Option >
                            <Option value='enable'>Enable</Option >
                        </Select>
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
        </div >
    );
};

export default SendGridManageEmail;