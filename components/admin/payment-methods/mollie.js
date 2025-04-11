import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
const { Option } = Select;
import { createEnvironmentInfo, environmentVariablesInfo, updateEnvironmentInfo } from '../../../helpers/backend_helper';


const MolliePaymentMethod = ({ setRefreshData }) => {
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
                    label="Live API key"
                    name="mollie_live_api_key"
                    rules={[
                        {
                            required: true,
                            message: 'Please input live api key!',
                        },
                    ]}
                >
                    <Input type={'password'} placeholder='Please Provide Mollie Live API key' />
                </Form.Item>


                <Form.Item
                    label="Status"
                    name="mollie_status"
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

export default MolliePaymentMethod;