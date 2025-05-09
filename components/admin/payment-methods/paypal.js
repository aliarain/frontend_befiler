import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
const { Option } = Select;
import { createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';


const PaypalPaymentMethod = ({ setRefreshData }) => {
    const [form] = Form.useForm();
    const [getStripePaymentInfo, setStripePaymentInfo] = useState({});

    // fetch data
    useEffect(() => {
        environmentVariablesInfo().then(res => {
            if (res?.status === true) {
                setStripePaymentInfo(res?.data)
            }
        })
    }, [])

    // form initial data load
    useEffect(() => {
        form.setFieldsValue({
            ...getStripePaymentInfo
        })
    }, [getStripePaymentInfo])


    // update or create action
    const onFinish = (values) => {
        if (getStripePaymentInfo?._id) {
            updateEnvironmentInfo(values, { id: getStripePaymentInfo?._id }).then(res => {
                if (res?.status === true) {
                    message.success(res?.message)
                    setRefreshData()
                } else {
                    message.warning(res?.message)
                }
            })
        } else {
            createEnvironmentInfo(values).then(res => {
                if (res?.status === true) {
                    message.success(res?.message)
                    setRefreshData()
                } else {
                    message.warning(res?.message)
                }
            })
        }
    };


    return (
        <div className='border p-5'>
            <Form
                form={form}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                <div className='relative'>
                    <Form.Item
                        label="Paypal Live Base URL"
                        name="paypal_base_url"
                        rules={[
                            {
                                required: true,
                                message: 'Please input paypal base url link!',
                            },
                        ]}
                    >
                        <Input placeholder='For Example: https://api-m.sandbox.paypal.com' />
                    </Form.Item>

                    <small className='text-gray-500 absolute top-0 right-0'>Collect Live link here : <a href='https://developer.paypal.com/api/rest/urls/' target="_blank" rel="noreferrer">Click</a></small>
                </div>

                <Form.Item
                    label="Client ID"
                    name="paypal_client_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please input client_id!',
                        },
                    ]}
                >
                    <Input type={'password'} placeholder='Please Provide Client ID' />
                </Form.Item>

                <Form.Item
                    label="Secret Key"
                    name="paypal_secret_key"
                    rules={[
                        {
                            required: true,
                            message: 'Please input secret key!',
                        },
                    ]}
                >
                    <Input type={'password'} placeholder='Please Provide Secret Key' />
                </Form.Item>


                <Form.Item
                    label="Status"
                    name="paypal_status"
                    rules={[
                        {
                            required: true,
                            message: 'Please select payment status!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select Payment Status"

                    >
                        <Option value="enable">Enable</Option>
                        <Option value="disable">Disable</Option>
                    </Select>
                </Form.Item>


                <div className='pt-4'></div>

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

            </Form>
        </div>
    );
};

export default PaypalPaymentMethod;