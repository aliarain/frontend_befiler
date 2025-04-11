import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Tabs } from 'antd';
import { createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';
const { Option } = Select;
import { DotLoader } from "react-spinners";
import { toast, ToastContainer } from 'react-toastify';


const ManageSMS = () => {
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
    const onFinish = (values) => {
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
    };
    

    return (
        <div>
            <div className='pt-3'>
                <Tabs defaultActiveKey="1" centered>

                    {/* Email sender information */}
                    <Tabs.TabPane tab="Twilio Information" key="1">
                        <Form
                            form={form}
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                        >
                            <div className='p-5'>
                                {/* Twilio Number section */}
                                <Form.Item
                                    name="twilio_number"
                                    label='Twilio Number'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input  twilio number!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Twilio Number' />
                                </Form.Item>


                                {/* Twilio Auth Token section */}
                                <Form.Item
                                    name="twilio_auth_token"
                                    label='Twilio Auth Token'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Twilio Auth Token!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Auth Token' />
                                </Form.Item>

                                {/* Twilio Account Sid section */}
                                <Form.Item
                                    name="twilio_account_sid"
                                    label='Twilio Account SID'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Twilio Account SID!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Account SID' />
                                </Form.Item>


                                {/* Twilio Status */}
                                <Form.Item
                                    name="twilio_status"
                                    label='Twilio Status'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Twilio Status!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Please Select Twilio Status">
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

export default ManageSMS;