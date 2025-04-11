import React from 'react';
import { Checkbox, Form, Input } from 'antd';
import { editUserAPI } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';
const { TextArea } = Input;


const UpdateForm = ({ user, form, setRefreshData }) => {

    // profile update form handler
    const onFinish = (values) => {
        const queryValue = { userId: user?._id }
        if (queryValue) {
            editUserAPI(values, queryValue).then(data => {
                if (data?.status) {
                    toast.success(data?.message);
                    setRefreshData(data?.data)
                } else {
                    toast.error(data?.message);
                }
            })
        }
    };


    return (
        <div>
            <div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                >
                    {/* user name field */}
                    <div className='mb-0'>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input username" bordered={false} style={{ borderBottom: "1px solid #A7A7A7" }} />
                        </Form.Item>
                    </div>

                    {/* first name and last name field */}
                    <div className="md:grid md:grid-cols-2 gap-4 pb-0">
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    message: 'Please input your firstName!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input first name" bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    message: 'Please input your lastName!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input last name" bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                        </Form.Item>
                    </div>

                    {/* city and country field */}
                    <div className="md:grid md:grid-cols-2 gap-4 pb-0">
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[
                                {
                                    message: 'Please input your city!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input city" bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                        </Form.Item>
                        <Form.Item
                            label="Country"
                            name="country"
                            rules={[
                                {
                                    message: 'Please input your country!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input country" bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                        </Form.Item>
                    </div>
                    <div className='mb-0'>
                        <p className='mb-0'>About me</p>
                        <Form.Item
                            label="Details Introduction About You"
                            name="introduction"
                            rules={[
                                {
                                    message: 'Please input your introduction!',
                                },
                            ]}
                        >
                            <TextArea placeholder={`You are ${user?.role} now`} bordered={false} style={{ borderBottom: "1px solid #A7A7A7" }} />
                        </Form.Item>
                    </div>
                    <div className='flex justify-end '>
                        <Form.Item>
                            <button type="submit" className='bg-[#F33527] hover:bg-[#DF2F25] text-white px-6 py-2 rounded'>
                                Update Profile
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </div>

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
        </div>
    );
};

export default UpdateForm;