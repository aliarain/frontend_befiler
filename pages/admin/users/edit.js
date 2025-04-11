import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { editUserAPI, getAllNewUserRoleManageAPI, getAllUsersData, getOneUserData, passwordChangeByAdminAPI } from '../../../helpers/backend_helper';
import { MdAssignment } from "react-icons/md";
import AdminLayout from '../../../layout/adminLayout';
import { Form, Input, message, Select } from 'antd';
import { useFetch } from '../../../helpers/hooks';
import UserPassword from '../../profile/password';
import Admin from "../index";

const { TextArea } = Input;
const { Option } = Select;


const EditUser = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { query } = router;
    const [user, setUser] = useState({});
    const [role] = useFetch(getAllUsersData);

    // fetch user data by user id
    useEffect(() => {
        const data = { userId: query?.id }
        getOneUserData(data).then(data => {
            setUser(data?.data);
        })
    }, [query?.id])

    // edit user information form handler
    const onFinish = (values) => {
        const queryValue = { userId: query?.id }
        editUserAPI(values, queryValue).then(data => {
            if (data?.status === true) {
                message.success(data?.message);
                router.push('/admin/users')
            }
        })
    };

    // form data load, if exist
    useEffect(() => {
        form.setFieldsValue({
            ...user
        })
    }, [user?._id, query?.id])


    return (
        <>
            <section className='m-8'>
                <div className='shadow-lg relative rounded bg-white p-4'>
                    {/* upper style */}
                    <div className='h-12'>
                        <div className='absolute w-16 h-16 shadow flex justify-center rounded -top-5 items-center bg-[#C44540]'>
                            <span><MdAssignment size={30} className='text-white' /></span>
                        </div>
                        <span className='ml-20 text-lg text-gray-500'>User Information</span>
                    </div>
                    {/* user personal information */}
                    <div className='w-full h-auto text-gray-500 text-base pb-2'>
                        <Form
                            form={form}
                            layout="horizontal"
                            onFinish={onFinish}
                            initialValues={{ remember: true }}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 19 }}
                        >
                            {/* user name field */}
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder={user?.username} bordered={false} style={{ borderBottom: "1px solid #A7A7A7" }} />
                            </Form.Item>
                            {/* user email field */}
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input placeholder={user?.email} bordered={false} style={{ borderBottom: "1px solid #A7A7A7" }} />
                            </Form.Item>
                            {/* first name and last name field */}
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[
                                    {
                                        message: 'Please input your firstName!',
                                    },
                                ]}
                            >
                                <Input placeholder={user?.firstName} bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[
                                    {
                                        message: 'Please input your lastName!',
                                    },
                                ]}
                            >
                                <Input placeholder={user?.lastName} bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                            </Form.Item>
                            {/* city and country field */}
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[
                                    {
                                        message: 'Please input your city!',
                                    },
                                ]}
                            >
                                <Input placeholder={user?.city} bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                            </Form.Item>
                            <Form.Item
                                label="Country"
                                name="country"
                                rules={[
                                    {
                                        message: 'Please input your country!',
                                    },
                                ]}
                            >
                                <Input placeholder={user?.country} bordered={false} className='inputWidth' style={{ borderBottom: "1px solid #A7A7A7" }} />
                            </Form.Item>

                            {/* user role field */}
                            <Form.Item name="role" label="Role" >
                                <Select
                                    bordered={false}
                                    className='rounded-full bg-cyan-800 text-white'
                                    placeholder={`You are ${user?.role?.toUpperCase()} now, Do you want to change role? Please, Select User Role`
                                    }
                                >
                                    {
                                        role?.docs?.map((role, i) => <Option className='capitalize' key={i + 4348} value={role?.role}>{role?.role}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                            {/* user status field */}
                            <Form.Item name="userStatus" label="Status" >
                                <Select
                                    bordered={false}
                                    className='rounded-full bg-[#7a178b] text-white'
                                    placeholder={`You are ${user?.userStatus?.toUpperCase()} now, Do you want to change status? Please, Select Status`
                                    }
                                >
                                    <Option value="active">Active</Option>
                                    <Option value="banned">Banned</Option>
                                    <Option value="unconfirmed">Unconfirmed</Option>
                                </Select>
                            </Form.Item>
                            {/* user information field*/}
                            <Form.Item
                                label="About"
                                name="information"
                                rules={[
                                    {
                                        message: 'Please input your introduction!',
                                    },
                                ]}
                            >
                                <TextArea placeholder={` ${user?.ID} `} bordered={false} style={{ borderBottom: "1px solid #A7A7A7" }} />
                            </Form.Item>
                            <div className='flex justify-end '>
                                <Form.Item>
                                    <button type="submit" className='bg-[#F33527] hover:bg-[#DF2F25] text-white w-48 mr-14 px-6 py-2 rounded'>
                                        Update User
                                    </button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>

                    <div className='md:px-6'>
                        <h4 className="text-lg text-gray-500 border-b md:mx-6">Change Your Password</h4>
                        <UserPassword titleData="admin" API={passwordChangeByAdminAPI} userID={user?._id} />
                    </div>
                </div>
            </section>
        </>
    );
};
EditUser.layout = AdminLayout
export default EditUser;