import React, { useEffect } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { Button, Drawer, Form, Input, Space } from 'antd';
import { useState } from 'react';
import { ClipLoader } from "react-spinners";
import { AiOutlineDelete } from 'react-icons/ai';
import { AWSFileUploadAPI, createNewUserRoleManageAPI, getAllNewUserRoleManageAPI } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { FaDownload } from 'react-icons/fa';
import swalAlert from '../../../components/common/swalAlert';
import deleteAction from '../../../components/common/delete';
import { RiEdit2Line } from 'react-icons/ri';
import EditUserRoleInformatioin from './edit';
import Head from 'next/head';
import { MdOutlineFormatColorFill } from 'react-icons/md';
import { useRouter } from 'next/router';
import {TableImage} from "../../../components/common/table";


const AddNewRole = () => {
    const router = useRouter()
    const [form] = Form.useForm();
    const [roleData, setRoleData] = useState([]);
    const [roleLogo, setRoleLogo] = useState('');
    const [refreshPage, setRefreshPage] = useState(null);
    const [toggle, setToggle] = useState(false);

    // fetch all roles
    useEffect(() => {
        getAllNewUserRoleManageAPI().then(res => {
            if (res?.status === true) {
                setRoleData(res?.data?.docs)
            }
        })

        setRefreshPage(null)
    }, [refreshPage]);

    // Update form
    useEffect(() => {
        form.setFieldsValue({
            display_name: '',
            name: '',
            c_logo: ''
        })
    }, [refreshPage])

    // upload image to the 3rd party server
    const handleLogo = async (e) => {
        setToggle(true)
        const data = new FormData()
        data.append('file', e.target.files[0])

        AWSFileUploadAPI(data).then(url => {
            if (url?.url) {
                setRoleLogo(url?.url)
            }
            setToggle(false)
        });
    }

    // delete image
    const handleDelete = async (id) => {
        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this role?', 'Yes, Delete')
        if (isConfirmed) {
            const data = { id }
            await deleteAction(data, 'user_role', setRefreshPage)
        }
    }

    // drawer
    const [visible, setVisible] = useState(false);
    const [userRoleId, setUserRoleId] = useState(null);

    const showDrawer = (roleId) => {
        setVisible(true);
        setUserRoleId(roleId)
    };
    const onClose = () => {
        setVisible(false);
    };


    // submit form data
    const onFinish = (values) => {
        setToggle(true);
        const data = {
            name: values?.name?.trim().split(" ").join("_").toLowerCase(),
            display_name: values?.display_name?.trim(),
            logo: roleLogo,
        }
        if (data?.name !== 'admin') {
            createNewUserRoleManageAPI(data).then(dt => {
                if (dt?.status === true) {
                    setToggle(false);
                    setRefreshPage(dt?.status)
                    toast.success(dt?.message);

                } else {
                    setToggle(false);
                    toast.error('Something wrong! Try again');
                }
            })

        } else {
            setToggle(false);
            toast.warning("The admin role is not allowed");
        }
    };

    // drawer responsive
    const [drawerWidth, setDrawerWidth] = useState(null)
    useEffect(() => {
        if (window.innerWidth > 700) {
            setDrawerWidth(500)
        } else {
            setDrawerWidth(350)
        }
    }, [])

    const configureRole = () => {
        router.push('/admin/setting/site-setting/')
    }


    return (
        <>
            <div className='min-h-screen'>
                <Head>
                    <title>Add New Role</title>
                </Head>


                <div className='w-full md:w-2/3 px-10 mx-auto bg-gray-50 rounded-md mt-[5%] py-10 h-auto'>
                    <Form
                        onFinish={onFinish}
                        layout='vertical'
                        form={form}
                    >
                        <Form.Item
                            label="Role Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input new user role name!',
                                },
                            ]}
                        >
                            <Input placeholder='Enter role name' />
                        </Form.Item>

                        <Form.Item
                            label="Display Name"
                            name="display_name"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input display name!',
                                },
                            ]}
                        >
                            <Input placeholder='Enter display name' />
                        </Form.Item>

                        <Form.Item
                            label="Upload Logo"
                            name='c_logo'
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input logo!',
                                },
                            ]}
                        >
                            <input type='file' onChange={handleLogo} style={{ backgroundColor: 'purple', width: '80%', color: 'white', }} className="py-1 rounded-md px-2" />
                        </Form.Item>


                        <div className='relative w-full h-auto'>
                            <button className='px-3 py-1 bg-purple-500 hover:bg-purple-600 rounded-md text-white text-[16px] mt-4'>Add New Role</button>

                            {
                                toggle === true &&
                                <span className="absolute top-6 left-44">
                                    <ClipLoader color="purple" size={30} />
                                </span>
                            }

                        </div>

                    </Form>


                    <div className='mt-10 mx-auto w-full h-auto text-center'>
                        <table className="table-auto border-collapse border-0 border-slate-500 test-center tableContainer w-full overflow-scroll">
                            <thead className='pb-5'>
                                <tr>
                                    <th className='py-2 border'>Role </th>
                                    <th className='py-2 border'>Display Name </th>
                                    <th className='py-2 border'>Logo</th>
                                    <th className='py-2 border'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roleData?.map((role, i) =>
                                        <tr key={3300 + i} className='pb-3 border-b hover:bg-gray-100'>
                                            <td className='py-1'>
                                                <span>{role?.name}</span>
                                            </td>
                                            <td className='py-1'>
                                                <span className={'capitalize'}>{role?.display_name}</span>
                                            </td>
                                            <td className='py-1'>
                                                <div className={'flex items-center justify-center gap-3'}>
                                                    <TableImage url={role?.logo} />
                                                    <Link href={role?.logo ?? '#'}>
                                                        <a className='flex justify-center' target='_blank'>
                                                            <FaDownload size={16} className='text-purple-500 cursor-pointer' />
                                                        </a>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className='py-1 flex justify-center gap-4'>

                                                <span className='cursor-pointer text-green-500 hover:text-green-600 font-semibold' onClick={() => showDrawer(role?._id)} title='Edit'>
                                                    <RiEdit2Line size={20} />
                                                </span>

                                                <span className='cursor-pointer text-cyan-500 hover:text-cyan-600 font-semibold' onClick={configureRole} title='Configure this role'>
                                                    <MdOutlineFormatColorFill size={20} />
                                                </span>

                                                <span className='cursor-pointer text-red-500 hover:text-red-600 font-semibold'
                                                    onClick={() => handleDelete(role?._id)} title='Delete'>
                                                    <AiOutlineDelete size={20} />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>


                {/* edit user-role info */}
                <Drawer
                    title='Edit User Role Information'
                    width={drawerWidth}
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{
                        paddingBottom: 80,
                    }}
                    destroyOnClose
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                        </Space>
                    }
                >
                    <EditUserRoleInformatioin userRoleId={userRoleId} setRefreshPage={setRefreshPage} onClose={onClose} />
                </Drawer>


                {/* toast message */}
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
            </div>
        </>
    );
};
AddNewRole.layout = AdminLayout
export default AddNewRole;