import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Checkbox, Form, Input, Radio, Select } from 'antd';
import { HiMail } from "react-icons/hi";
import { MdLockOutline, MdOutlineFace, MdLocalPhone } from "react-icons/md";
import { GiCharacter } from "react-icons/gi";
import Link from "next/link";
import { directLoginAPI, getAllUserRoleExceptAdminAPI, getOneAboutContentAPI, userAccountLogin, verifyUserAPI } from '../../helpers/backend_helper';
import { useEnv } from '../../contexts/envContext';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
import Head from 'next/head';
const { Option } = Select;


const Signup = () => {
    const router = useRouter()
    const [value, setValue] = useState();
    const [userRole, setUserRole] = useState();
    const [isUserloading, setIsUserloading] = useState(false);
    const [siteData, setSiteData] = useState({});
    const [userRole2, setUserRole2] = useState(null);

    // home page data
    useEffect(() => {
        getOneAboutContentAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    // existence new user role data
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then((data) => {
            setUserRole(data?.data);
        })
    }, [])

    // catch new role
    const onChange = (e) => {
        setUserRole2(e.target.value);
    };


    // Registar form submit handler
    const onFinish = (values) => {
        setIsUserloading(true)

        if (userRole2 === "accountant") {
            values.role = userRole2;
        }
        values.phone = `+${values.phone}`

        createUserAccount(values).then(data => {
            if (data?.status === true) {
                setIsUserloading(false)
                toast.success(data?.message);
                setTimeout(() => {
                    router.push('/login')
                }, 3000);
            } else {
                setIsUserloading(false)
                toast.info(data?.message);
            }
        })
    };


    return (
        <div>
            <Head>
                <title>Signup</title>
            </Head>


            <div className='w-full h-full md:h-screen flex justify-center items-center bg-gray-100'>
                <div className='md:absolute w-full md:w-[80%] bg-gray-50 md:h-[80%] md:shadow-2xl md:flex justify-center items-center'>
                    <div className='w-full md:w-[35%] h-full flex flex-col justify-center items-center bg-[#3B3A3A]'>
                        {/* site name and logo section */}

                        <img className='w-[160px] mb-10' src="/v2/Logo.png" alt="" />
                        <br />
                        <img className='w-[300px] mt-6' src="/v2/login.png" alt="" />


                    </div>
                    <div className='w-full md:w-[65%] scrollbar h-full bg-[#292828]'>
                        <div className='lg:mx-[10%] lg:my-[10%]'>
                            <div className="text-center">
                                <h2 className="header_3 font-bold text-hover">Sign Up</h2>
                            </div>

                            <div className='mx-4'>
                                {/* Registar form */}
                                <Radio.Group onChange={onChange} className='pb-4'>
                                    <Radio value="user" className='text-white'>New User</Radio>
                                    <Radio value="accountant" className='text-white'>Accountant</Radio>
                                </Radio.Group>

                                <Form
                                    layout="vertical"
                                    onFinish={onFinish}
                                >

                                    {/* select user role */}
                                    {
                                        userRole2 === 'user' &&
                                        <div className='flex'>
                                            <GiCharacter className='mt-2 text-[#F5E3DD]' size={24} />
                                            <Form.Item
                                                name="role"
                                                className='border-b-2 w-full'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input user role!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="Please Select Yours Role" bordered={false} className='text-white'>
                                                    {
                                                        userRole?.map((role, i) =>
                                                            <Option key={i + 15345345} value={role?.name} >
                                                                {role?.display_name}
                                                            </Option>
                                                        )
                                                    }
                                                </Select>
                                            </Form.Item>

                                        </div>
                                    }

                                    {/* new user name */}
                                    <div className='flex'>
                                        <span ><MdOutlineFace className='mt-2 text-[#F5E3DD]' size={24} /></span>
                                        <Form.Item
                                            name="username"
                                            className='border-b-2  w-full'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your username!',
                                                },
                                            ]}
                                        >
                                            <Input className='text-white' placeholder='Enter username, Ex: sabbir185 or riaz_mahmud' bordered={false} noStyle={false} />
                                        </Form.Item>
                                    </div>
                                    {/* new user email */}
                                    <div className='flex'>
                                        <span ><HiMail className='mt-2 text-[#F5E3DD]' size={24} /></span>
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
                                            <Input className='text-white' placeholder='Enter Email Here...' bordered={false} noStyle={false} />
                                        </Form.Item>
                                    </div>
                                    {/* new user phone number */}
                                    <div className='flex relative'>
                                        <span ><MdLocalPhone className='mt-2 text-[#F5E3DD]' size={24} /></span>
                                        <Form.Item
                                            name="phone"
                                            className='border-b-2  w-full'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your email!',
                                                },
                                            ]}
                                        >
                                            <PhoneInput
                                                placeholder="Phone number ..."
                                                inputStyle={{ marginLeft: "10px", width: "auto", border: "none", borderRight: "none", borderRadius: '0', outline: '0', outlineOffset: '0', outlineColor: '0', outlineStyle: '0' }}
                                                buttonStyle={{ border: 'none', marginLeft: '9px', backgroundColor: '#F2F2F2' }}
                                                country={'ca'}
                                                value={value}
                                                onChange={setValue}
                                                isValid={(value, country) => {
                                                    if (value.match(/12345/)) {
                                                        return 'Invalid value: ' + value + ', ' + country.name;
                                                    } else if (value.match(/1234/)) {
                                                        return false;
                                                    } else {
                                                        return true;
                                                    }
                                                }}
                                            />
                                        </Form.Item>
                                    </div>
                                    {/* new user password */}
                                    <div className='flex'>
                                        <span><MdLockOutline className='mt-2 text-[#F5E3DD]' size={24} /></span>
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
                                            <Input.Password placeholder='Password...' bordered={false} noStyle={false} className='text-white' />
                                        </Form.Item>
                                    </div>
                                    {/* new user confirm password */}
                                    <div className='flex'>
                                        <span><MdLockOutline className='mt-2 text-[#F5E3DD]' size={24} /></span>
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
                                            <Input.Password placeholder='Confirm Password...' bordered={false} noStyle={false} className='text-white' />
                                        </Form.Item>
                                    </div>
                                    {/* trems and condition */}
                                    <Form.Item
                                        name="terms_conditions"
                                        valuePropName="checked"
                                        rules={[
                                            {
                                                validator: (_, value) =>
                                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                            },
                                        ]}
                                        style={{ marginLeft: 5 }}
                                    >
                                        <Checkbox style={{ color: "#A7A7A7" }}>
                                            I have read the <a href="no-underline text-hover">agreement</a>
                                        </Checkbox>
                                    </Form.Item>

                                    {/* login and resiter pager link */}
                                    <div className='text-[#A7A7A7] flex flex-wrap justify-between items-center'>
                                        <Form.Item>
                                            <button type="submit" className='bg-hover hover:bg-hover text-white px-6 py-2 rounded shadowHover'>
                                                Register Here
                                            </button>
                                        </Form.Item>
                                        <Link href='/v2/login'>
                                            <p className='hover:cursor-pointer hover:underline'>Already Have an account?</p>
                                        </Link>
                                    </div>

                                </Form>
                            </div>
                            {/* loader */}
                            {isUserloading && <span className="absolute top-[35%] left-[40%]">
                                <HashLoader color="purple" size={50} className='ml-7' />
                                <span className='text-hover font-bold text-[20px]'>Processing...</span>
                            </span>}
                        </div>
                    </div>
                </div>
                {/* alert */}
                <ToastContainer
                    position="top-center"
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
        </div>
    );
};

export default Signup;