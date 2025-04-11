import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Tabs } from 'antd';
const { Option } = Select;
import { createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';
import { DotLoader } from "react-spinners";
import { toast, ToastContainer } from 'react-toastify';
import swalAlert from '../../common/swalAlert';


const GmailEmailProvider = () => {
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
        if (values?.gmail_provider_status === 'enable') {
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
        <div >
            <Form
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                {/* Auth email Information */}
                <div className='p-5'>
                    <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]">Gmail Provider</p>

                    {/* Auth email section */}
                    <Form.Item
                        name="auth_email"
                        label='Email Address'
                        rules={[
                            {
                                required: true,
                                message: 'Please input email!',
                            },
                        ]}
                    >
                        <Input placeholder='Please input email address' />
                    </Form.Item>


                    <Form.Item
                        name="auth_email_password"
                        label='Email App Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input Auth Email Password!',
                            },
                        ]}
                    >
                        <Input type='password' placeholder='Please input app password' />
                    </Form.Item>

                    {/* Auth Service Provider section */}
                    <Form.Item
                        name="auth_service_provider"
                        label='Service Provider'
                        initialValue='gmail'
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Input disabled defaultValue='gmail' placeholder='Please input service provider name' />
                    </Form.Item>


                    <Form.Item
                        name="gmail_provider_status"
                        label='Provider Status'
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Select placeholder="Please Select Provider Status">
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

export default GmailEmailProvider;