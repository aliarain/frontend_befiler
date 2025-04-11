import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Tabs } from 'antd';
const { Option } = Select;
import { createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';
import { DotLoader } from "react-spinners";
import { toast, ToastContainer } from 'react-toastify';
import swalAlert from '../../common/swalAlert';


const OtherProviderManageEmail = () => {
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
        if(values?.hostinger_email_provider_status === 'enable') {
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
                    <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]">Hostinger / Other Email Provider</p>

                    <Form.Item
                        name="hostinger_email_host"
                        label='Email Host Address'
                        rules={[
                            {
                                required: true,
                                message: 'Please input host email!',
                            },
                        ]}
                    >
                        <Input placeholder='For example: smtp.hostinger.in' />
                    </Form.Item>

                    {/* Email Port section */}
                    <Form.Item
                        name="hostinger_email_port"
                        label='Email Port Number'
                        rules={[
                            {
                                required: true,
                                message: 'Please input email port!',
                            },
                        ]}
                    >
                        <Input placeholder='For example: 587' />
                    </Form.Item>

                    {/* Auth email section */}
                    <Form.Item
                        name="hostinger_email_address"
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
                        name="hostinger_password"
                        label='Email Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input Email Password!',
                            },
                        ]}
                    >
                        <Input type='password' placeholder='Please input email password' />
                    </Form.Item>

                    {/* Auth Service Provider section */}
                    <Form.Item
                        name="hostinger_email_provider_name"
                        label='Service Provider'
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Select placeholder="Please Select a Provider">
                            <Option value='hostinger'>Hostinger</Option >
                            <Option value='other'>Other Provider</Option >
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="hostinger_email_provider_status"
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

export default OtherProviderManageEmail;