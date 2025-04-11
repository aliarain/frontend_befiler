import React from 'react';
import { FaBars, FaTh } from "react-icons/fa";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { MdPerson, MdOutlineNotificationsNone, MdSettings } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useUser } from '../../../contexts/userContext';
import { useRouter } from 'next/router';
import { FaSignOutAlt } from "react-icons/fa";
import Link from 'next/link';
import { verifyUserAPI } from '../../../helpers/backend_helper';
import { useState } from 'react';
import { useEffect } from 'react';

function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}


const Header = () => {
    const router = useRouter();
    const { logout } = useUser();

    //get user data
    const [user, setUser] = useState({});
    useEffect(() => {
        verifyUserAPI().then((userData) => {
            if (userData?.status === true) {
                setUser(userData?.data)
            }
        })
    }, [])

    const handleRouteChange = () => {
        router.push('')
    }

    // dropdown menu of profile
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <Link href="/user/profile">
                            <a rel="noopener noreferrer" className='flex gap-2 px-2 py-1'>
                                <span>
                                    <MdPerson size={20} />
                                </span>
                                <span>
                                    Profile
                                </span>
                            </a>
                        </Link>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <Link href="/user/submitted-tax-file">
                            <a rel="noopener noreferrer" href="#" className='flex gap-2 px-2 py-1'>
                                <span>
                                    <MdSettings size={20} />
                                </span>
                                <span>
                                    My Activities
                                </span>
                            </a>
                        </Link>
                    ),
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: (
                        <a rel="noopener noreferrer" className='flex gap-2 ml-1 px-2 py-1' onClick={logout}>
                            <span>
                                <FaSignOutAlt size={18} />
                            </span>
                            <span>
                                Logout
                            </span>
                        </a>
                    ),
                    key: '3',
                    disabled: false,
                },
            ]}

            className='mt-2'
        />
    );



    return (
        <div className='header flex items-center'>
            <div className='pl-6'>
                <FaBars size={22} role="button" onClick={() => {
                    document.querySelector('.dashboard')?.classList.toggle(window.innerWidth >= 1024 ? 'mini' : 'mobile')
                }} />

            </div>

            <span className='pl-8 text-purple-700 text-[16px]'><FiPhoneCall /></span>
            <span className='font-sans pl-2 text-purple-700 text-[16px] whitespace-pre'> {user?.phone} </span>

            <div className='hidden md:block'>
                <span className='flex items-center gap-2 ml-4 bg-purple-500 px-2 py-1 rounded-md text-white'>
                    User: <span className='inline-block'> {capitalizeFirstLetter(user?.role)} </span>
                </span>
            </div>

            <div className='flex items-end justify-end w-full mr-10'>
                <div className='mr-5 md:mr-8 relative'>
                    <Link href="https://dashboard.tawk.to/">
                        <a target="_blank" className="text-green-500">
                            <MdOutlineNotificationsNone size={22} role="button" />
                        </a>
                    </Link>
                    <div className='absolute -top-1 -right-1 bg-red-600 rounded-full h-4 w-4 flex items-center justify-center text-white'>
                        <span className='text-[11px] font-semibold'>0</span>
                    </div>
                </div>


                <Dropdown overlay={menu}>
                    <a onClick={e => e.preventDefault()} className="text-gray-700 hover:text-purple-600">
                        <Space>
                            {/* Hover me */}
                            <MdPerson size={22} role="button" className='inline-block' />
                            <DownOutlined className='inline-block' />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;