import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { BsFillKeyFill } from "react-icons/bs";
import Link from "next/link";
import { message } from 'antd';
import DotLoader from "react-spinners/DotLoader";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getOneAboutContentAPI, userPasswordResetEmailAPI } from '../../helpers/backend_helper';


const ResetEmail = () => {
    const router = useRouter();
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
                <div className='w-full md:w-[35%] h-full flex flex-col justify-center items-center bg-[#3B3A3A]'>
                        {/* site name and logo section */}
                        <img className='w-[160px] mb-10' src="/v2/Logo.png" alt="" />
                        <br />
                        <img className='w-[300px] mt-6' src="/v2/login.png" alt="" />
                    </div>
                    <div className='w-full md:w-[65%]  h-full flex justify-center items-center bg-[#292828]'>
                        <div className='max-w-md w-full h-2/3 '>
                            <div className="text-center">
                                <h2 className="mt-6 py-4 text-hover header_3">Enter Your Email</h2>
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
                                        <span ><BsFillKeyFill className='text-2xl mt-2 text-[#F5E3DD]' /></span>
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
                                            <Input placeholder='Reset Email...' bordered={false} noStyle={false} className='text-white' />
                                        </Form.Item>
                                    </div>
                                    <div className='flex justify-center'>
                                        <Form.Item>
                                            <button type="submit" className='bg-hover hover:bg-hover text-white px-6 py-2 text-[18px] rounded shadowHover capitalize'>
                                                Send Password Reset Link
                                            </button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                            {/* login and register page link */}
                            <div>
                                <div className='text-[#A7A7A7] flex justify-around'>
                                    <Link href='/v2/signup'><p className='hover:cursor-pointer h hover:underline'>New User?</p></Link>
                                    <Link href='/v2/login'>
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