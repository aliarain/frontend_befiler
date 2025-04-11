import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { BsFillKeyFill } from "react-icons/bs";
import Link from "next/link";
import { getOneAboutContentAPI, userPasswordResetEmailAPI } from '../helpers/backend_helper';
import { message } from 'antd';
import DotLoader from "react-spinners/DotLoader";
import Head from 'next/head';


const ResetEmail = () => {
    const [waitingSpinner, setWaitingSpinner] = useState(false);
    const [siteData, setSiteData] = useState({});

    // home page data
    useEffect(() => {
        getOneAboutContentAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    // reset email send
    const onFinish = async (values) => {
        setWaitingSpinner(true)
        if (!!values?.email) {
            userPasswordResetEmailAPI(values).then(data => {
                setWaitingSpinner(false);

                if (data?.status === true) {
                    message.success(data?.message);
                } else {
                    message.error(data?.message);
                }
            })
        }
    };

    return (
        <div>
            <Head>
                <title>Reset Email</title>
            </Head>
            <div className='w-full h-full md:h-screen flex justify-center items-center bg-gray-100'>
                <div className='md:absolute w-full md:w-[70%] bg-gray-50 md:h-[70%] md:shadow-2xl md:flex justify-center items-center'>
                    <div className='w-full  border-r-[1px]  md:w-[35%] h-full flex justify-center items-center'>
                        {/* site name and logo section */}
                        <div className=''>
                            <img className='w-[300px] ' src="/codecayonImage/siunup.jpg" alt="" />
                            <p className='text-[#14A940] text-[34px] text-center font-bold'>{siteData?.name}</p>
                        </div>
                    </div>
                    <div className='w-full md:w-[65%]  h-full flex justify-center items-center '>
                        <div className='max-w-md w-full h-2/3 '>
                            <div className="text-center">
                                <h2 className="mt-6 text-4xl py-4 font-normal text-[#14A940]">Enter Your Email</h2>
                            </div>
                            <div className='mx-4'>
                                {/* Password reset form */}
                                <Form
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    {/* input user email */}
                                    <div className='flex'>
                                        <span ><BsFillKeyFill className='text-2xl mt-2' /></span>
                                        <Form.Item
                                            name="email"
                                            className='border-b-2 lg:w-[340px] w-full'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your username!',
                                                },
                                                {
                                                    type: 'email'
                                                }
                                            ]}
                                        >
                                            <Input placeholder='Reset Email...' bordered={false} noStyle={false} />
                                        </Form.Item>
                                    </div>
                                    <div className='flex justify-center'>
                                        <Form.Item>
                                            <button type="submit" className='bg-[#14A940] hover:bg-[#038028] text-white px-6 py-2 text-[18px] rounded shadowHover capitalize'>
                                                Send Password Reset Link
                                            </button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                            {/* login and register page link */}
                            <div>
                                <div className='text-[#A7A7A7] flex justify-around'>
                                    <Link href='/signup'><p className='hover:cursor-pointer h hover:underline'>New User?</p></Link>
                                    <Link href='/login'>
                                        <p className='hover:cursor-pointer  hover:underline'>Login?</p>
                                    </Link>
                                </div>
                            </div>

                            <span className='absolute top-[40%] left-[40%]'>
                                {waitingSpinner && <DotLoader color='green' size={50} />}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetEmail;