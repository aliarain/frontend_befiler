import React from 'react';
import { Form, Input } from 'antd';
import { userProfilePasswordChangeAPI } from '../../helpers/backend_helper';
import { userAction } from '../../helpers/hooks';
import { useEffect } from 'react';


const UserPassword = ({ titleData = null, API=false, userID='' }) => {
    const API_URL = !!API ? API : userProfilePasswordChangeAPI;
    const [form] = Form.useForm();
    
    useEffect(() => {
        form.resetFields();
    }, [])


    return (
        <div className='bg-white p-4 rounded'>
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    values.id = userID
                    return userAction(API_URL, values, (d) => {
                        form.resetFields();
                    })
                }}
                initialValues={{
                    remember: true,
                }}
            >
                {/* password and confirm password field */}
                {
                    titleData !== "admin" && (<Form.Item
                        label="Current Password"
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input Valid Password!',
                            },
                            {
                                min: 6,
                                message: 'Please provide at least 6 characters'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Old Password...' bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                    </Form.Item>)
                }
                <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Valid Password!',
                        },
                        {
                            min: 6,
                            message: 'Please provide at least 6 characters'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='New Password...' bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("Incorrect Password!")
                            }
                        })
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Confirm Password...' className='inputWidth' bordered={false} style={{ borderBottom: "1px solid #A7A7A7" }} />
                </Form.Item>
                <div className='flex justify-end '>
                    <Form.Item>
                        <button type="submit" className='bg-[#F33527] hover:bg-red-600 text-white px-6 py-2 rounded'>
                            Update Password
                        </button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default UserPassword;