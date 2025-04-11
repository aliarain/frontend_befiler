import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { BsFillKeyFill } from "react-icons/bs";
import Link from "next/link";
import { getOneAboutContentAPI, verifyOTPAPI, verifyUserAPI } from "../helpers/backend_helper";
import { message } from "antd";
import { useRouter } from "next/router";
import Head from "next/head";


const OTPForm = () => {
    const router = useRouter();
    const [siteData, setSiteData] = useState({});

    // home page data
    useEffect(() => {
        getOneAboutContentAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    // OTPForm form submit handler
    const onFinish = async (values) => {
        let username = (await localStorage?.getItem("taxantsUsername")) ?? "";
        if (!!username) {
            const data = { otp: values.otp, username };
            verifyOTPAPI(data).then((data1) => {
                if (data1?.status === true) {
                    localStorage.removeItem("taxantsUsername");
                    localStorage.setItem("taxstickToken", data1?.token);
                    message.success(data1?.message);
                    const token = data1?.token;
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
                    message.error(data?.message);
                }
            });
        }
    };


    return (
        <div>
            <Head>
                <title>OTP</title>
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
                                <h2 className="mt-6 text-4xl py-4 font-normal text-[#14A940]">
                                    Enter One Time PassCode from phone
                                </h2>
                            </div>
                            <div className='mx-4'>
                                {/* OTPForm form */}
                                <Form
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    {/* OTP input section */}
                                    <div className="flex">
                                        <span>
                                            <BsFillKeyFill className="text-2xl mt-2" />
                                        </span>
                                        <Form.Item
                                            name="otp"
                                            className='border-b-2 w-full'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your OTP!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="OTP..."
                                                bordered={false}
                                                noStyle={false}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="flex justify-center">
                                        <Form.Item>
                                            <button
                                                type="submit"
                                                className='bg-[#14A940] hover:bg-[#038028] text-white px-6 py-2 text-[18px] rounded shadowHover capitalize'
                                            >
                                                Validate &amp; login
                                            </button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                            {/* login and register page link */}
                            <div>
                                <div className="text-[#A7A7A7] flex justify-around">
                                    <Link href="/singup">
                                        <p className="hover:cursor-pointer hover:underline">
                                            New User?
                                        </p>
                                    </Link>
                                    <Link href="/login">
                                        <p className="hover:cursor-pointer hover:underline">
                                            Login?
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OTPForm;
