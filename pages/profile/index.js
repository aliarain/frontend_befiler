import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layout/adminLayout';
import { MdPerson } from "react-icons/md";
import UpdateForm from '../../components/admin/profile/updateForm';
import ProfilePic from '../../components/admin/profile/profilePic';
import { Form } from 'antd';
import { verifyUserAPI } from '../../helpers/backend_helper';
import { ToastContainer } from 'react-toastify';
import UserPassword from './password';
import {useUserContext} from "../../contexts/user";


const Index = () => {
    const [form] = Form.useForm();
    const [refreshData, setRefreshData] = useState(null)
    const [user, setUser] = useState({});
    const {getProfile} = useUserContext()

    // fetch login user data and verify from backend
    useEffect(() => {
        verifyUserAPI().then((data) => {
            if (data?.status === true) {
                setUser(data?.data);
                setRefreshData(null)
                getProfile()
            }
        });
    }, [refreshData])


    useEffect(() => {
        form.setFieldsValue({
            ...user
        });
    }, [user])


    return (
        <div>
            {/* user form part */}
            <div className='md:grid md:grid-cols-3 gap-4 m-8'>
                <div className='md:col-span-2 relative shadow-lg rounded p-3 bg-white'>
                    <div className=''>
                        <div className='w-[70px] h-[72px] absolute -top-6 bg-[#C73F3C] rounded shadow-lg flex justify-center items-center'><MdPerson className='text-2xl text-white' /></div>
                    </div>
                    <p className='pl-20 text-lg text-gray-500'>Edit Profile-<span className='text-sm font-semibold'>Complete your profile</span></p>
                    <UpdateForm user={user} form={form} setRefreshData={setRefreshData} />

                    <div className='h-10'>
                        <h4 className="text-lg text-gray-500 border-b">Change Password</h4>
                    </div>
                    <UserPassword />
                </div>

                {/* user image part */}
                <div className='shadow-lg rounded bg-white text-center h-[550px] p-10'>
                    <ProfilePic user={user} setRefreshData={setRefreshData} />
                </div>
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
        </div>
    );
};
Index.layout = AdminLayout
export default Index;