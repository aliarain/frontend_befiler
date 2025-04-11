import Link from 'next/link';
import React from 'react';
import {MdAssignment, MdOutlineFileDownload} from "react-icons/md";


// about tax file details -> left side info of card
const TaxFileLeft = ({taxFileData}) => {

    return (
        <div>
            <div className='bg-white p-3 rounded shadow-lg'>
                <div className='relative h-16'>
                    <div
                        className={`absolute -top-10 border h-20 w-20 shadow bg-red-600 flex justify-center items-center rounded`}>
                        <MdAssignment className='text-4xl text-white'/>
                    </div>
                    <h5 className={'absolute top-o left-24'}>User Information</h5>
                </div>

                {/* form data display */}
                <div className='border-t-2'>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>ID</p>
                        <p className=''>{taxFileData?.user?.ID}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Username</p>
                        <p className=''>{taxFileData?.user?.username}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Full Name</p>
                        <p className=''>{`${taxFileData?.user?.firstName ?? ''} ${taxFileData?.user?.lastName ?? ''}`}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Role</p>
                        <p className=''>{taxFileData?.role}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Email</p>
                        <p className=''>{taxFileData?.user?.email}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Phone Number</p>
                        <p className=''>{taxFileData?.user?.phone}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>User Image</p>
                        <p className=''>
                            <Link href={`${taxFileData?.user?.profile_img}`}>
                                <a target="_blank"
                                   className='hover:cursor-pointer text-purple-500 hover:text-purple-600'>
                                    <MdOutlineFileDownload size={18} className='hover:shadow-md'/>
                                </a>
                            </Link>
                        </p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Country</p>
                        <p className=''>{taxFileData?.user?.country}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>City</p>
                        <p className='capitalize'>{taxFileData?.user?.city}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Accountant Details</p>
                        {
                            !!taxFileData?.assigned_accountant ?
                                <div>
                                    <p className=''>
                                        <span className=''>
                                            {taxFileData?.assigned_accountant?.ID}
                                        </span>
                                    </p>
                                    <p className=''>
                                        <span className=''>
                                            {taxFileData?.assigned_accountant?.username}
                                        </span>
                                    </p>
                                    {
                                        !!taxFileData?.assigned_accountant?.firstName &&
                                        <p className=''>
                                            <span className=''>
                                                {taxFileData?.assigned_accountant?.firstName ?? ''}{" "}{taxFileData?.assigned_accountant?.lastName ?? ''}
                                            </span>
                                        </p>
                                    }
                                    <p className=''>
                                        <span className=''>
                                            {taxFileData?.assigned_accountant?.email}
                                        </span>
                                    </p>
                                    <p className=''>
                                        <span className=''>
                                            {taxFileData?.assigned_accountant?.phone}
                                        </span>
                                    </p>
                                </div>
                                :
                                <p className=''><span className='bg-red-500 text-white px-2 py-1 rounded'>N/A</span></p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxFileLeft;