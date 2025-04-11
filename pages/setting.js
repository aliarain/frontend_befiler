import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { MdLocalPhone, MdLockOutline, MdOutlineFace } from 'react-icons/md';
import { HiMail } from 'react-icons/hi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from "next/router";
import { DotLoader, ScaleLoader } from "react-spinners";
import Head from 'next/head';


const Setting = () => {
    const router = useRouter();
    const [getSetting, setSetting] = useState(false);
    const [getLoader, setLoader] = useState(false)

    // checking server env file 
    useEffect(() => {
        const checkEnvFile = async () => {
            const { data } = await axios.get(process.env.BACKEND_URL);

            if (data?.status === true && data?.env === false) {
                setSetting(pre => pre = true);

            } else {
                router.push('/')
            }
        }
        checkEnvFile();
    }, [])

    // setting data submit to backend
    const onFinish = async (values) => {
        setLoader(pre => pre = true)

        const adminInfo = {};
        adminInfo["username"] = values.username;
        adminInfo["email"] = values.email;
        adminInfo["phone"] = values.phone;
        adminInfo["password"] = values.password;
        adminInfo["confirmPassword"] = values.confirmPassword;

        delete values["username"]
        delete values["email"]
        delete values["phone"]
        delete values["password"]
        delete values["confirmPassword"]

        const DB_String = values.database_string;

        // string form
        const valueString = (
            values.database_string + "\n \n"

            + values.aws_bucket_name + "\n"
            + values.aws_access_key_id + "\n"
            + values.aws_secret_access_key + "\n"
            + values.aws_region + "\n"

            + values.website_name + "\n"
        )

        const { data } = await axios.post(process.env.BACKEND_URL + 'setting', { valueString, adminInfo, DB_String })

        if (data?.status === true && data?.env === true) {
            toast.success('Setup Successful, Please Restart Backend Server');

        } else {
            toast.warning(data?.message)
        }
        setLoader(pre => pre = false)
    };


    if (getSetting === true) {
        return (
            <div className='flex justify-center items-center pb-[5%] pt-[3%] bg-gray-200 min-h-screen relative'>
                <div className='h-auto md:w-1/2 border rounded p-10 hero_font_family bg-white shadow scrollbar'>
                    <h3 className='text-center text-[#14AA40] pb-4 border-b-[1px] border-b-[#14AA40]'>Quick Setup</h3>
                    <p className='text-center'> --- Please avoid auto suggestion --- </p>
                    <Form
                        layout="horizontal"
                        onFinish={onFinish}
                        className='my-4'
                    >

                        {/* admin sign up */}
                        <div className='mb-5'>
                            <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]">Create Admin</p>

                            {/* name */}
                            <div className='flex'>
                                <span ><MdOutlineFace className='text-2xl mt-2 mr-2' /></span>
                                <Form.Item
                                    name="username"
                                    className='border-b-2 w-full'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Enter Username for Example: yourname_123 or yourname123' bordered={false} />
                                </Form.Item>
                            </div>


                            {/* email */}
                            <div className='flex'>
                                <span ><HiMail className='text-2xl mt-2 mr-2' /></span>
                                <Form.Item
                                    name="email"
                                    className='border-b-2  w-full'
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
                                    <Input placeholder='Admin Email...' bordered={false} />
                                </Form.Item>
                            </div>


                            {/* new user phone number */}
                            <div className='flex relative'>
                                <span ><MdLocalPhone className='text-2xl mt-2 mr-2' /></span>
                                <Form.Item
                                    name="phone"
                                    className='border-b-2  w-full'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Admin Phone Number...' bordered={false} />
                                </Form.Item>
                            </div>


                            {/* new user password */}
                            <div className='flex'>
                                <span><MdLockOutline className='text-2xl mt-2 mr-2' /></span>
                                <Form.Item
                                    name="password"
                                    // style={{ width: '50%' }}
                                    className='border-b-2  w-full'
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
                                    <Input.Password placeholder='Password...' bordered={false} />
                                </Form.Item>
                            </div>


                            {/* new user confirm password */}
                            <div className='flex'>
                                <span><MdLockOutline className='text-2xl mt-2 mr-2' /></span>
                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={["password"]}
                                    // style={{ width: '50%' }}
                                    className='border-b-2  w-full'
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
                                    <Input.Password placeholder='Confirm Password...' bordered={false} />
                                </Form.Item>
                            </div>
                        </div>



                        <div className='mb-5'>
                            <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]">Database Setup</p>
                            <Form.Item
                                name="database_string"
                                label='Database String'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input database string!',
                                    },
                                ]}
                            >
                                <Input defaultValue={"DB_STRING="} />
                            </Form.Item>

                            {/* website_name */}
                            <Form.Item
                                name="website_name"
                                label='Website Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Required!',
                                    },
                                ]}
                                extra='For example: taxstick'
                            >
                                <Input defaultValue={"WEBSITE_NAME="} />
                            </Form.Item>
                        </div>


                        {/* AWS Bucket Information */}
                        <div>
                            <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]">AWS Bucket Information</p>
                            {/* AWS Bucket Name section */}
                            <Form.Item
                                name="aws_bucket_name"
                                label='AWS Bucket Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input AWS Bucket Name!',
                                    },
                                ]}
                            >
                                <Input defaultValue={"AWS_BUCKET_NAME="} />
                            </Form.Item>
                            {/* AWS Access Key  section */}
                            <Form.Item
                                name="aws_access_key_id"
                                label='AWS Access Key'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input AWS Access Key!',
                                    },
                                ]}
                            >
                                <Input defaultValue={"AWS_ACCESS_KEY_ID="} />
                            </Form.Item>
                            {/* AWS Secret Access Key section */}
                            <Form.Item
                                name="aws_secret_access_key"
                                label='AWS Secret Access Key'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input AWS Secret Access Key!',
                                    },
                                ]}
                            >
                                <Input defaultValue={"AWS_SECRET_ACCESS_KEY="} />
                            </Form.Item>
                            {/* AWS Region section */}
                            <Form.Item
                                name="aws_region"
                                label='AWS Region'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input AWS Region!',
                                    },
                                ]}
                            >
                                <Input defaultValue={"AWS_REGION="} />
                            </Form.Item>
                        </div>


                        <div className='relative'>
                            <Form.Item>
                                <button type="submit" className='bg-[#14A940] hover:bg-[#038028] text-white px-6 py-2 rounded shadowHover mt-5'>
                                    Submit
                                </button>
                            </Form.Item>

                            {
                                getLoader == true &&
                                <div className="flex justify-center absolute top-0 left-[40%]">
                                    <div>
                                        <DotLoader color="purple" size={20} className='ml-5' />
                                        <p className='text-purple-700 font-semibold text-[14px]'>Please Wait...</p>
                                    </div>
                                </div>
                            }
                        </div>

                    </Form>
                </div>


                {/* toast message */}
                <ToastContainer
                    position="top-center"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }


    return (
        <div>
            <Head>
                <title>Website Setting</title>
            </Head>

            {
                <div className="flex justify-center pt-[10%]">
                    <div>
                        <ScaleLoader color="purple" size={20} className='ml-5' />
                        <p className='text-purple-700 font-semibold text-[14px]'>Please Wait...</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Setting;