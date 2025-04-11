import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { MdLockOutline,  } from "react-icons/md";
import Link from "next/link";
import { getOneAboutContentAPI, userPasswordResetAPI } from '../helpers/backend_helper';
import { message } from 'antd';
import { useRouter } from 'next/router';
import Head from 'next/head';


const ResetPassword = () => {
    const router = useRouter();
    const { query } = router;
    const [siteData, setSiteData] = useState({});

    // home page data
    useEffect(() => {
        getOneAboutContentAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    // reset email send
    const onFinish = async (values) => {
        const token = query?.token;
        if (!!token) {
            localStorage.setItem('taxstickToken', token)
            userPasswordResetAPI(values).then(data => {
                if (data?.status === true) {
                    message.success(data?.message, 5)
                    localStorage.removeItem('taxstickToken')
                    router.push('/login')

                } else if (data?.message === "Authentication failed!") {
                    message.error("Resetting Time Out!")

                } else {
                    message.warning(data?.message)
                }
            })
        }
    };


    return (
        <div>
            <Head>
                <title>Reset Password</title>
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
                                <h2 className="mt-6 text-4xl py-4 font-normal text-[#14A940]">Enter New Password</h2>
                            </div>
                            <div className='mx-4'>
                                {/* new password set form */}
                                <Form
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    <div className='flex'>
                                        <span><MdLockOutline className='text-2xl mt-2' /></span>
                                        <Form.Item
                                            name="password"
                                            className='border-b-2 lg:w-[340px] w-full'
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
                                            <Input.Password placeholder='Password...' bordered={false} noStyle={false} />
                                        </Form.Item>
                                    </div>
                                    <div className='flex'>
                                        <span><MdLockOutline className='text-2xl mt-2' /></span>
                                        <Form.Item
                                            name="confirmPassword"
                                            dependencies={["password"]}
                                            className='border-b-2 lg:w-[340px] w-full'
                                            rules={[
                                                {
                                                    required: true,
                                                },
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
                                            <Input.Password placeholder='Confirm Password...' bordered={false} noStyle={false} />
                                        </Form.Item>
                                    </div>

                                    <div className='flex justify-center mt-4'>
                                        <Form.Item>
                                            <button type="submit" className='bg-[#14A940] hover:bg-[#038028] text-white px-6 py-2 text-[18px] rounded shadowHover capitalize'>
                                                Change Password
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;