import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const TeamCard = ({ data}) => {
    return (
        <div className='relative group'>
            <div className='relative w-[316px] h-[369px]'>
                <Image width={315} height={368} className='image-shape' src={data?.user?.image} alt='Team' />
                <div className=" ">
                    <div className='absolute right-0 bottom-0 w-14 h-14 p-3 rounded-full bg-[#10B981] z-50'>
                        <Image width={32} height={32} className='mx-auto w-10 ' src='/v3/ExpertTeam/Frame.svg' alt='Team' />
                    </div>
                    <div className='absolute  opacity-[0.00005] group-hover:opacity-100 bottom-[70px] right-3 transform transition-opacity duration-300 flex flex-col gap-6'>

                        <Link href={data?.user?.linkedIn}><FaInstagram className='text-2xl  w-9 h-9 p-2 rounded-full flex items-center justify-center cursor-pointer bg-white hover:!bg-[#10B981] hover:!text-white  text-[#10B981]  transition-colors duration-300 ' /></Link>
                        <Link href={data?.user?.twitter}><FaTwitter className='text-2xl  w-9 h-9 p-2 rounded-full flex items-center justify-center cursor-pointer bg-white hover:!bg-[#10B981] hover:!text-white  text-[#10B981]  transition-colors duration-300 ' /></Link>
                        <Link href={data?.user?.facebook}><FaFacebookF className='text-2xl  w-9 h-9 p-2 rounded-full flex items-center justify-center cursor-pointer bg-white hover:!bg-[#10B981] hover:!text-white  text-[#10B981]  transition-colors duration-300 ' /></Link>

                    </div>
                </div>
            </div>
            <div className=' absolute opacity-[0.00005] group-hover:opacity-100 transform transition-transform duration-300 bottom-5 left-5 team w-60 h-20 rounded-lg  !p-2'>
                <p className='team-name capitalize'> {data?.user?.first_name} {data?.user?.last_name}</p>
                <p className='team-title capitalize relative bottom-4'> {data?.title}</p>
            </div>
        </div>
    );
};

export default TeamCard;