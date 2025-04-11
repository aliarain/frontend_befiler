import React, { useEffect, useState } from 'react';
import { MdPerson } from "react-icons/md";
import UpdateForm from '../../../components/accountant/profile/updateForm';
import ProfilePic from '../../../components/accountant/profile/profilePic';
import { Form } from 'antd';
import { verifyUserAPI } from '../../../helpers/backend_helper';
import AccountantLayout from '../../../layout/accountantLayout';
import Head from 'next/head';
import UserPassword from '../../profile/password';
import {useUserContext} from "../../../contexts/user";


const Index = () => {
    const [form] = Form.useForm();
    const [refreshData, setRefreshData] = useState(null)
    const [user, setUser] = useState({});
    const {getProfile} = useUserContext()

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
            <Head>
                <title> Assigned Taxfiles </title>
            </Head>

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
            </div>
        </div>
    );
};
Index.layout = AccountantLayout;
export default Index;