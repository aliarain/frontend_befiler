import React from 'react';
import { MdOutlinePersonOutline } from "react-icons/md";


const Sidebar = () => {

    return (
        <div>
            <div className='border-b m-3 p-3 flex justify-center'>
                <img src='/images/logo-new.png' alt="logo" />
            </div>
            <div className='border-b m-3 pb-1 text-white flex justify-center items-center'>
                <MdOutlinePersonOutline className='text-4xl border rounded-full p-1' />
                <p className='my-2 mx-2'>Welcome Admin</p>
            </div>
        </div>
    );
};

export default Sidebar;