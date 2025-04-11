import React from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';

const CustomerQueryDetails = ({ customerEmail }) => {

    
    return (
        <div>
            <div className='p-4 bg-gray-50 relative rounded'>
                <div className='h-12'>
                    <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                        <span> <HiOutlineMailOpen size={35} /> </span>
                    </div>

                    <span className='capitalize ml-20 text-[18px] font-bold'>View Quote Details Information</span>
                </div>
                <div className='px-[5%] py-[3%] bg-gray-200 rounded'>
                    <p className='text-[14px] font-mono'>Status :
                    {
                        customerEmail?.status === "complete" ?
                        <span className='bg-green-600 text-white p-[1%] rounded-md ml-1'>{customerEmail?.status}</span>
                        :
                        <span className='bg-red-600 text-white p-[1%] rounded-md ml-1'>{customerEmail?.status}</span>
                    }
                    </p>
                    <p className='text-[14px] font-mono'>Client Name : {`${customerEmail?.firstname}` + ` ` + `${customerEmail?.lastname}`}</p>
                    <p className='text-[14px] font-mono'>Client Email : {customerEmail?.email}</p>
                    <p className='text-[14px] font-mono'>Subject : {customerEmail?.subject}</p>
                    <div className='px-[4%] py-[2%] rounded bg-gray-50 text-[14px] text-justify'>
                        <span dangerouslySetInnerHTML={{ __html: customerEmail?.message }}></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerQueryDetails;