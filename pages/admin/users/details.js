import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../layout/adminLayout';
import { getOneUserData } from '../../../helpers/backend_helper';
import { MdAssignment } from "react-icons/md";
import EditUser from "./edit";


const UserDetails = () => {
    const router = useRouter();
    const { query } = router;
    const [user, setUser] = useState({});

    // fetch user data by user id
    useEffect(() => {
        const data = { userId: query?.id }
        getOneUserData(data).then(data => {
            setUser(data?.data);
        })
    }, [query?.id])


    return (
        <>
            <section className='md:flex m-8 gap-4 pb-10 '>
                <div className='shadow-lg md:w-1/2 relative rounded bg-white p-4'>
                    {/* upper style */}
                    <div className='h-12'>
                        <div className='absolute w-16 h-16 shadow flex justify-center rounded -top-5 items-center bg-[#C44540]'>
                            <span><MdAssignment size={30} className='text-white' /></span>
                        </div>
                    </div>
                    {/* user personal information */}
                    <div className='w-full h-auto text-gray-500 text-base pb-2'>
                        <div className='grid grid-cols-3 border-b pt-2 px-2'>
                            <p>ID</p><p className='col-span-2 '>{user?.ID}</p>
                        </div>
                        <div className='grid grid-cols-3 border-b pt-2 px-2'>
                            <p>User Name</p><p className='col-span-2 '>{user?.username}</p>
                        </div>
                        <div className='grid grid-cols-3 border-b pt-2 px-2'>
                            <p>Email</p><p className='col-span-2 '>{user?.email}</p>
                        </div>
                        <div className='grid grid-cols-3 border-b pt-2 px-2'>
                            <p>Status</p>
                            {user?.userStatus === "active" ?
                                <div className='col-span-2 '><span className='bg-green-500 text-white capitalize rounded px-1.5 py-0.5 text-sm'>{user?.userStatus}</span></div>
                                :
                                <div className='col-span-2'><span className='bg-red-500 text-white capitalize rounded px-1.5 py-0.5 text-sm'>{user?.userStatus}</span></div>
                            }
                        </div>
                        <div className='grid grid-cols-3 border-b pt-2 px-2'>
                            <p>Role</p><p className='col-span-2 capitalize'>{user?.role}</p>
                        </div>
                        <div className='grid grid-cols-3 border-b pt-2 px-2' >
                            <p>First Name</p><p className='col-span-2 '>{user?.firstName}</p>
                        </div>
                        <div className='grid grid-cols-3 border-b pt-2 px-2'>
                            <p>Last Name</p><p className='col-span-2 '>{user?.lastName}</p>
                        </div>
                        <div className='grid grid-cols-3 pt-2 px-2'>
                            <p>City</p><p className='col-span-2 '>{user?.city}</p>
                        </div>
                    </div>
                </div>
                {/* user picture */}
                <div className='shadow-lg md:w-1/2 mt-14 md:mt-0 relative rounded p-4 bg-white'>
                    <div className='h-12'>
                        <div className='absolute w-16 h-16 shadow flex justify-center rounded -top-5 items-center bg-[#C44540]'>
                            <span><MdAssignment size={30} className='text-white' /></span>
                        </div>
                    </div>
                    <div className='w-full h-auto text-gray-500 text-base'>
                        <div className='grid grid-cols-3 border-b px-2 pt-2 '>
                            <p>Country</p><p className='col-span-2 '>{user?.country}</p>
                        </div>
                        <div className='grid grid-cols-3 border-b px-2 pt-2'>
                            <p>About Me</p><p className='col-span-2 '>{user?.introduction}</p>
                        </div>
                        <div className='grid grid-cols-3 px-2 pt-2'>
                            <div className='flex items-center'><p >Avatar</p></div>
                            <div className='col-span-2 my-auto shadow h-48 w-48 '>
                                <img className='h-48 w-48' src={`${user?.profile_img ? user?.profile_img : '/images/default-avatar.png'}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
UserDetails.layout = AdminLayout
export default UserDetails;