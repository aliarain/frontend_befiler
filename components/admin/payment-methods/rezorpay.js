import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
const { Option } = Select;
import { createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';


const RezorPayPaymentMethod = ({ setRefreshData }) => {
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
                <Form.Item
                    label="Public Key ID"
                    name="razorpay_client_id"
                    rules={[
                        {
                            required: true,
                            message: 'Please input public key ID!',
                        },
                    ]}
                >
                    <Input type={'password'} placeholder='Please Provide Public Key ID' />
                </Form.Item>

                <Form.Item
                    label="Secret Key"
                    name="razorpay_secret_key"
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
                    name="razorpay_status"
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

export default RezorPayPaymentMethod;