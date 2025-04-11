import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
const { TextArea } = Input;
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScaleLoader } from "react-spinners";
import { emailSendToUserAPI } from '../../../../helpers/backend_helper';


const ContactForm = ({ color }) => {
    const [form] = Form.useForm();
    const [refreshState, setRefreshState] = useState(false);
    const [spinnerLoading, setSpinnerLoading] = useState(false)

    const onFinish = (values) => {
        setSpinnerLoading(pre => pre = true)
        emailSendToUserAPI(values).then(data => {
            if (data?.status === true) {
                toast.success("Message has sent to the support, thanks");
                setRefreshState(true);    
                setSpinnerLoading(pre => pre = false)
            } else {
                toast.error(data?.message);
                setSpinnerLoading(pre => pre = false)
            }
        })
    };


    useEffect(() => {
        form.setFieldsValue({
            firstname: '', lastname: '', email: '',
            phone: '', subject: '', message: ''
        })
    }, [refreshState])


    return (
        <div >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    remember: true,
                }}
                className='relative'
            >
                <div className='flex gap-2'>
                    <Form.Item
                        name="firstname"
                        className='w-1/2'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your firstname!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter First Name Here...' style={{ backgroundColor: `${color?.bgcolor}`, padding: '10px', color: `${color?.textColor}` }} />

                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        className='w-1/2'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your lastname!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter Last Name Here...'
                            style={{ backgroundColor: `${color?.bgcolor}`, padding: '10px', color: `${color?.textColor}` }} />

                    </Form.Item>
                </div>

                <div className='flex gap-2'>
                    <Form.Item
                        name="email"
                        className='w-1/2'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email'
                            }
                        ]}
                    >

                        <Input placeholder='Enter Email Here...' style={{ backgroundColor: `${color?.bgcolor}`, padding: '10px', color: `${color?.textColor}` }} />

                    </Form.Item>
                    <Form.Item
                        name="phone"
                        className='w-1/2'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            }
                        ]}
                    >

                        <Input placeholder='Enter Phone Here...' style={{ backgroundColor: `${color?.bgcolor}`, padding: '10px', color: `${color?.textColor}` }} />

                    </Form.Item>
                </div>
                <Form.Item
                    name="subject"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your subject!',
                        }
                    ]}
                >

                    <Input placeholder='Enter Subject Here...' style={{ backgroundColor: `${color?.bgcolor}`, padding: '10px', color: `${color?.textColor}` }} />

                </Form.Item>

                <Form.Item
                    name="message"
                >

                    <TextArea placeholder='Write Message Here...' style={{ backgroundColor: `${color?.bgcolor}`, padding: '10px', color: `${color?.textColor}` }} />

                </Form.Item>

                <div className='text-[#A7A7A7] flex justify-between items-center'>
                    <Form.Item>
                        <button type="submit" className='bg-[#14AA40]  hover:bg-[#0b9835] text-base text-white px-12 py-2 rounded shadowHover'>
                            Submit
                        </button>
                    </Form.Item>
                </div>

                <span className='absolute top-[10%] left-[40%]'>
                    {
                        spinnerLoading && <ScaleLoader color='purple' size={50} />
                    }
                </span>

            </Form>

            <ToastContainer
                position="bottom-center"
                autoClose={4000}
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

export default ContactForm;