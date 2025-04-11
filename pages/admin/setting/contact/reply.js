import React from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { Form, Input, message } from "antd";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { emailSendToSpecificUserAPI } from '../../../../helpers/backend_helper';
const DraftBoard = dynamic(() => import('../../../../components/admin/draftEditor/draftBoard'), {
    ssr: false
})
import PuffLoader from "react-spinners/PuffLoader";
import { useState } from 'react';



const ReplyQuery = ({ customerEmail }) => {
    const [form] = Form.useForm();
    const [isLoadingAPI, setIsLoadingAPI] = useState(false)

    // form submission and email send through backend
    const onFinish = (values) => {
        const emailData = {
            email: values.email,
            subject: values.subject,
            message: values.message,
        }
        setIsLoadingAPI(true)
        emailSendToSpecificUserAPI(emailData).then(data => {
            if (data?.status === true) {
                message.success(data?.message);
                setIsLoadingAPI(false)
            } else {
                message.error(data?.message);
                setIsLoadingAPI(false)
            }
        })
    }

    // form initial value set
    useEffect(() => {
        form.setFieldsValue({
            email: customerEmail?.email
        })
    }, [customerEmail?.email])



    return (
        <div>
            <div className='p-4 bg-gray-50 relative rounded'>
                <div className='h-12'>
                    <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                        <span> <HiOutlineMailOpen size={35} /> </span>
                    </div>

                    <span className='capitalize ml-20 text-[18px] font-bold'>Customer Query</span>
                </div>
                <div className='p-[2%] bg-gray-200 rounded'>
                    <div className='bg-gray-50 px-[4%] py-[2%] rounded shadow'>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="email"
                                label="Email To"
                                defaultValue={customerEmail?.data?.user?.email}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="subject" label="Subject">
                                <Input />
                            </Form.Item>
                            <Form.Item name="message" label="Message">
                                <DraftBoard />
                            </Form.Item>
                            <Form.Item className='flex justify-center bg-green-600 rounded'>
                                <button className='text-base w-full text-white' type="submit">
                                    Send
                                </button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                {
                    isLoadingAPI && <span className='absolute top-[40%] left-[40%]'>
                        <PuffLoader color="purple" size={70} />
                    </span>
                }
            </div>
        </div>
    );
};

export default ReplyQuery;