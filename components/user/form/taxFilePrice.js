import React from 'react';
import { Form, InputNumber } from "antd";


const TaxFilePrice = ({ form, onFinish }) => {

    
    return (
        <div className="pb-4">
            <Form
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                initialValues={{
                    remember: true,
                }}
                labelCol={{ span: 11 }}
            // wrapperCol={{span: 28}}
            >
                <Form.Item
                    label="Tax fees if student"
                    name="taxfees_student"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                    style={{ border: '0' }}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    label="Tax fees if not student"
                    name="taxfees_not_student"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    label="Tax fees if uber driver"
                    name="taxfees_uber_driver"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    label="Service charges"
                    name="service_charges"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    label="Taxes Percentage"
                    name="tax_percentage"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    label="Additional T4"
                    name="additional_t4"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    label="Additional T4 T2202A"
                    name="additional_t4_t2202a"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>

                <Form.Item
                    label="Welcome Canada Benefit"
                    name="welcome_canada_benefit"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>

                <div className="flex justify-center">
                    <Form.Item
                        wrapperCol={{ span: 28 }}
                    >
                        <button className="btn-taxants__red text-white mt-4 inline-block uppercase">
                            <span style={{fontSize: '14px'}}>Update TaxFile Pricing</span>
                        </button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default TaxFilePrice;