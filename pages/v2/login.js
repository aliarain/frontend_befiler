import React, { useEffect } from 'react';
import { Checkbox, Form, Input } from 'antd';
import { HiMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { message } from 'antd';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Head from 'next/head';
import { directLoginAPI, getOneAboutContentAPI, userAccountLogin, verifyUserAPI } from '../../helpers/backend_helper';
import { useEnv } from '../../contexts/envContext';
import { useRouter } from 'next/router';


const Login = () => {
    const router = useRouter();
    const [siteData, setSiteData] = useState({});
    const [_, envPubliclyAccessible] = useEnv();

    // home page data
    useEffect(() => {
        getOneAboutContentAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    // login form submit handler
    const onFinish = (values) => {
        if (envPubliclyAccessible?.twilio_status === "enable") {
            // when twilio service is on by admin
            userAccountLogin(values).then(data => {
                if (data?.status === true) {
                    if (data?.userStatus === 'active') {
                        message.info(data?.message);
                        localStorage.setItem('taxantsUsername', data?.username)
                        router.push('/otp')
                    } else {
                        toast.warning("Please check your email to active A/C");
                    }
                } else {
                    message.error(data?.message);
                }
            })
        } else {
            // when twilio service is off by admin
            directLoginAPI(values).then(data => {
                if (data?.error === false) {
                    if (data?.userStatus === 'active') {
                        message.info(data?.msg);
                        localStorage.setItem("taxstickToken", data?.token);
                        verifyUserAPI().then((data2) => {
                            if (data2?.status === true) {
                                if (data2?.data?.role === "admin") {
                                    router.push(`/admin/`);

                                } else if (data2?.data?.role === "accountant") {
                                    router.push(`/accountant/`);

                                } else {
                                    router.push(`/user/`);
                                }
                            } else {
                                message.warning(data?.message)
                            }
                        });
                    } else {
                        toast.warning("Please check your email to active A/C");
                    }
                } else {
                    message.error(data?.msg);
                }
            })
        }
    };

    const handleForgotPassword = () => {
        router.push('/resetEmail')
    }


    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>

            <div className='w-full h-full md:h-screen flex justify-center bg-gray-100 items-center '>
                <div className='md:absolute w-full md:w-[80%] md:h-[80%]  md:shadow-2xl md:flex justify-center items-center'>
                    <div className='w-full md:w-[35%] h-full flex flex-col justify-center items-center bg-[#3B3A3A]'>
                        {/* site name and logo section */}

                        <img className='w-[160px] mb-10' src="/v2/Logo.png" alt="" />
                        <br />
                        <img className='w-[300px] mt-6' src="/v2/login.png" alt="" />


                    </div>


                    <div className='w-full md:w-[65%] h-full flex justify-center items-center scrollbar bg-[#292828]'>
                        <div className='lg:w-[80%] w-full'>
                            <Link href='/'><a className='flex gap-1 items-center text-hover paragraph'> <BsArrowLeft /> <span>Home</span></a></Link>
                            <div className="text-center">
                                <h2 className="my-6 header_2 font-bold text-hover">Login</h2>
                            </div>
                            <div className='mx-4 '>
                                {/* login form */}
                                <Form
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    {/* user name section */}
                                    <div className='flex'>
                                        <span ><HiMail className='text-2xl mt-2 text-[#F5E3DD]' /></span>
                                        <Form.Item
                                            name="username"
                                            className='border-b-2  w-full text-[#F5E3DD]'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your username!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='Email or Phone Here...' bordered={false} noStyle={false} className='text-white' />
                                        </Form.Item>
                                    </div>
                                    {/* password giving section */}
                                    <div className='flex'>
                                        <span><MdLockOutline className='text-2xl mt-2 text-[#F5E3DD]' /></span>
                                        <Form.Item
                                            name="password"
                                            className='border-b-2 w-full text-[#F5E3DD]'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                        >
                                            <Input.Password placeholder='Password...' bordered={false} noStyle={false} className='text-white'/>
                                        </Form.Item>
                                    </div>
                                    {/* remember me check box */}
                                    <Form.Item
                                        name="remember_me"
                                        valuePropName="checked"
                                        className='pl-4'
                                    >
                                        <Checkbox style={{ color: "#A7A7A7" }}>Remember me</Checkbox>
                                    </Form.Item>

                                    <Form.Item>
                                        <button type="submit" className='bg-hover hover:bg-hover text-white px-6 py-2 rounded shadowHover paragraph lg:w-[30%] lg:h-14'>
                                            Login Here
                                        </button>
                                    </Form.Item>
                                </Form>
                            </div>
                            {/* Forgot Password page and register page link */}
                            <div>
                                <div className='text-[#F5E3DD] flex justify-around'>
                                    <Link href='/v2/signup'><p className='hover:cursor-pointer hover:underline'>New User?</p></Link>
                                    <p onClick={() => handleForgotPassword()} className='hover:cursor-pointer hover:underline'>Forgot Password?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
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

export default Login;