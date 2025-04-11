import React, { useEffect, useState } from 'react';
import { MdAccountCircle } from "react-icons/md";
import { BsFillBellFill, BsX } from "react-icons/bs";
import { Checkbox, Form } from 'antd';
import AdminLayout from '../../../layout/adminLayout';
import { getAllPermissionAPI, permissionCreateAPI, updatePermissionAPI } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';
import Head from 'next/head';
import AddProvince from "../province/create";


const AdminPermissions = () => {
    const [warningToggle, setWarningToggle] = useState(false);
    const [refreshData, setRefreshData] = useState(null);

    // for onchange value state management
    const [admin_admin, setAdmin_admin] = useState(false);
    const [admin_accountant, setAdmin_accountant] = useState(false);

    const [accountant_admin, setAccountant_admin] = useState(false);
    const [accountant_accountant, setAccountant_accountant] = useState(false);


    // catch on change values
    const onChangeAdminAdmin = (e) => setAdmin_admin(e.target.checked);
    const onChangeAdminAccountant = (e) => setAdmin_accountant(e.target.checked);

    const onChangeAccountantAdmin = (e) => setAccountant_admin(e.target.checked);
    const onChangeAccountantAccountant = (e) => setAccountant_accountant(e.target.checked);


    // handle warning message
    const handlePermissionCancelWarning = () => {
        setWarningToggle(true);
    }

    const [permissionData, setPermissionData] = useState({});
    const { admin, student, accountant } = permissionData;
    // fetch permission data and set initial onChange value(checkbox button)
    useEffect(() => {
        getAllPermissionAPI().then(data => {
            if (data?.status === true) {

                setPermissionData(data?.data[0])

                const { admin, student, accountant } = data?.data[0];

                setAdmin_admin(admin?.admin_admin);
                setAdmin_accountant(admin?.admin_accountant);

                setAccountant_admin(accountant?.accountant_admin);
                setAccountant_accountant(accountant?.accountant_accountant);
            }
        })

        setRefreshData(null)
    }, [refreshData])


    // submit handler
    const onFinish = (values) => {
        values.admin = {
            admin_admin, admin_accountant
        }

        values.accountant = {
            accountant_admin, accountant_accountant
        }

        if (permissionData?._id) {
            const queryValue = { id: permissionData?._id }
            updatePermissionAPI(values, queryValue).then(data => {
                if (data?.status) {
                    toast.success(data?.message);
                    setRefreshData(data?.status)
                } else {
                    toast.success(data?.message);
                }
            })

        } else {
            permissionCreateAPI(values).then(data => {
                if (data?.status === true) {
                    toast.success(data?.message);
                    setRefreshData(data?.status)
                } else {
                    toast.success(data?.message);
                }
            })
        }
    };



    return (
        <>
            <section className='bg-gray-100 mx-2 rounded-md pt-6 min-h-screen'>
                <Head>
                    <title>Permission Control</title>
                </Head>


                {/* warning message */}
                {
                    warningToggle === false && <div className='bg-red-500 text-stone-50 p-2 rounded text-base m-4 relative'>
                        <p className='text-justify px-5 pt-2'>Please do not update the permissions of the SUPER ADMIN otherwise you will lose your access on this page. Only update the permissions of other role like accountant.</p>

                        <div className='absolute h-8 w-8 bg-slate-50 rounded-full text-red-500 flex items-center justify-center -top-5 left-5 shadow-lg'>
                            <BsFillBellFill size={18} />
                        </div>


                        <div className='absolute h-8 w-8 rounded-full text-gray-300 flex items-center justify-center -top-0 right-0 shadow-lg hover:text-gray-100 cursor-pointer' onClick={handlePermissionCancelWarning}>
                            <BsX size={22} />
                        </div>

                    </div>
                }


                <div className='mt-16'></div>
                <div className='p-4 bg-gray-50 m-4 relative'>
                    <div className='h-12'>
                        <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                            <span> <MdAccountCircle size={35} /> </span>
                        </div>

                        <span className='capitalize ml-20'>Roles Permissions</span>
                    </div>


                    {/* input form + table */}
                    <section className='mr-0 md:mr-20 lg:mr-28 w-2/3 mx-auto'>
                        <div className='grid grid-cols-4 pb-2 space-y-0'>
                            <span>Role Name</span>
                            <span>Admin</span>
                            <span>Accountant</span>
                        </div>

                        <Form
                            name="roles"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                            className='space-y-0'

                        >
                            <Form.Item
                                name="admin"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your username!',
                                    },
                                ]}
                                className='border-t mb-0'
                            >
                                <div className='grid grid-cols-4 h-12 items-center'>
                                    <span className='inline-block'>Admin</span>
                                    <Checkbox checked={admin_admin} onChange={onChangeAdminAdmin}></Checkbox>

                                    <Checkbox checked={admin_accountant} onChange={onChangeAdminAccountant}></Checkbox>
                                </div>
                            </Form.Item>


                            <Form.Item
                                name="accountant"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your username!',
                                    },
                                ]}
                                className='border-b'
                            >
                                <div className='grid grid-cols-4 h-12 items-center'>
                                    <span className='inline-block'>Accountant</span>
                                    <Checkbox checked={accountant_admin} onChange={onChangeAccountantAdmin}></Checkbox>

                                    <Checkbox checked={accountant_accountant} onChange={onChangeAccountantAccountant}></Checkbox>
                                </div>
                            </Form.Item>



                            {/* button */}
                            <Form.Item
                                wrapperCol={{
                                    offset: 0,
                                    span: 16,
                                }}
                            >
                                <button type="submit" className='bg-[#F33527] hover:bg-[#DF2F25] text-white px-6 py-2 rounded-3xl shadowHover transition duration-300 mt-5'>
                                    Save Role Permissions
                                </button>
                            </Form.Item>
                        </Form>
                    </section>

                </div>

                <ToastContainer
                    position="bottom-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </section>
        </>
    );
};
AdminPermissions.layout = AdminLayout
export default AdminPermissions;