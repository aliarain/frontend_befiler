import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const TeamCard3 = ({ data }) => {
    return (
        <div className='group'>
            <div className='bg-[#0B0A0E] rounded-t-xl px-3 pt-[9px]'>
                <div className='!rounded-t-xl border-t border-l border-r group-hover:border-[#10B981] border-b-0 border-[#0B0A0E] flex justify-center'>
                    <Image
                        className='w-[200px] h-[255px] mx-auto pt-4 !rounded-t-xl'
                        src={data?.user?.image}
                        width={185}
                        height={255}
                        alt='Team Image'
                    />
                </div>
            </div>
            <div className='bg-[#012A2B] py-10 flex flex-col justify-center items-center rounded-b-xl'>
                <h3 className='team-name'>{data?.user?.first_name} {data?.user?.last_name}</h3>
                <p className='team-title'>{data?.title}</p>
                <div className='pt-4 flex items-center justify-center space-x-6'>
                    <Link href={data?.user?.linkedIn}><FaInstagram className='text-2xl  w-9 h-9 p-2 rounded-full flex items-center justify-center cursor-pointer  hover:!bg-[#10B981] text-white    transition-colors duration-300 ' /></Link>
                    <Link href={data?.user?.twitter}><FaTwitter className='text-2xl  w-9 h-9 p-2 rounded-full flex items-center justify-center cursor-pointer  hover:!bg-[#10B981] text-white   transition-colors duration-300 ' /></Link>
                    <Link href={data?.user?.facebook}><FaFacebookF className='text-2xl  w-9 h-9 p-2 rounded-full flex items-center justify-center cursor-pointer hover:!bg-[#10B981] text-white   transition-colors duration-300 ' /></Link>
                </div>
            </div>
        </div>
    );
};

export default TeamCard3;
