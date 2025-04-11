import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';
import { AWSFileUploadAPI, getNewUserRoleManageAPI, updateNewUserRoleManageAPI } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';


const EditUserRoleInformatioin = ({ userRoleId, setRefreshPage, onClose }) => {
    const [form] = Form.useForm();
    const [userRole, setUserRole] = useState({})
    const [roleLogo, setRoleLogo] = useState(null);
    const [toggle, setToggle] = useState(false);

    // fetch all roles
    useEffect(() => {
        const data = { id: userRoleId }
        getNewUserRoleManageAPI(data).then(res => {
            if (res?.status === true) {
                setUserRole(res?.data)
            }
        })

        setRefreshPage(null)
    }, [userRoleId])


    // form data loading, if exist
    useEffect(() => {
        form.setFieldsValue({
            ...userRole
        })
    }, [userRole])


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


    // submit form
    const onFinish = (values) => {
        if (!!roleLogo) {
            values.logo = roleLogo
        }

        const data = { id: userRoleId }
        updateNewUserRoleManageAPI(values, data).then(res => {
            if (res?.status === true) {
                setRefreshPage(res?.status)
                toast.success('Updated successful');
                setTimeout(() => {
                    onClose()
                }, 3000);

            } else {
                toast.success('Something wrong! Try again...');
            }
        })
    }


    return (
        <div>
            <Form
                form={form}
                onFinish={onFinish}
                layout='vertical'
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
                    <button className='px-3 py-1 bg-purple-500 hover:bg-purple-600 rounded-md text-white text-[16px] mt-4'>Update Role</button>

                    {
                        toggle === true &&
                        <span className="absolute top-6 left-44">
                            <ClipLoader color="purple" size={30} />
                        </span>
                    }

                </div>

            </Form>

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
    );
};

export default EditUserRoleInformatioin;