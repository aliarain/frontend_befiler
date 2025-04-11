import React from 'react';
import { MdContacts } from 'react-icons/md';
import { Form, Input } from "antd";
import { useEffect } from 'react';
import { useState } from 'react';
import { emailSendToSpecificUserAPI } from '../../../helpers/backend_helper';
const { TextArea } = Input;
import { toast, ToastContainer } from 'react-toastify';
import PuffLoader from "react-spinners/PuffLoader";


const SendEmail = ({ email, onCancel }) => {
    const [isloading, setIsloading] = useState(false)
    const [form] = Form.useForm();


    const onFinish = (values) => {
        setIsloading(true)
        emailSendToSpecificUserAPI(values).then(data => {
            if (data?.status === true) {
                setIsloading(false)
                toast.success(data?.message)
                onCancel()
            } else {
                toast.error(data?.message)
                setIsloading(false)
            }
        })
    }

    useEffect(() => {
        form.setFieldsValue({
            email
        })
    }, [email])



    return (
        <div className='p-3'>
            <div className='bg-white rounded shadow-lg relative'>
                <div className='relative h-16 p-4'>
                    <div className={`absolute -top-5 border h-20 w-20 shadow bg-green-600 flex justify-center items-center rounded`}>
                        <MdContacts className='text-4xl text-white' />
                    </div>
                    <div className='ml-24'><p className='text-xl font-semibold text-gray-500'>Compose Email</p></div>
                </div>
                <div className='mt-4 pb-2'>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item name="email" label="Email To">
                            <Input defaultValue={email} />
                        </Form.Item>
                        <Form.Item name="subject" label="Subject" initialValue=''>
                            <Input />
                        </Form.Item>
                        <Form.Item name="message" label="Message" initialValue=''>
                            <TextArea />
                        </Form.Item>
                        <Form.Item className='flex justify-center bg-green-600 rounded m-4'>
                            <button className='text-base w-full text-white' type="submit">
                                Submit
                            </button>
                        </Form.Item>
                    </Form>
                </div>

                {
                    isloading && <span className="absolute top-[40%] left-[40%]">
                        <PuffLoader color="purple" size={50} />
                    </span>
                }
            </div>



            {/* toast show */}
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

export default SendEmail;