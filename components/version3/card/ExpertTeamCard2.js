import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const ExpertTeamCard2 = ({ data }) => {
    return (
        <div className="group">
            <div className=" xl:max-w-[312px] h-auto sm:max-w-[400px] sm:h-[383px] md:max-w-[450px] lg:max-w-[500px]">
                <div className="opacity-100 group-hover:opacity-50 expertTeam2 z-10 h-[383] w-full">
                    <Image
                        className="group-hover:opacity-50 z-10 rounded-t-xl"
                        width={500}
                        height={583}
                        layout="responsive"
                        src={data?.user?.image}
                        alt="team"
                    />
                </div>
            </div>
            <div className="bg-white shadow-xl relative bottom-24 z-50 flex flex-col items-center w-[232px] md:w-[232px] sm:w-[300px]  h-[94px] py-3 px-4 sm:px-12 rounded-lg mx-auto">
                <p className="text-lg sm:text-xl font-bold">{data?.user?.first_name} {data?.user?.last_name}</p>
                <p className="speech -mt-2 sm:-mt-6">{data?.title}</p>
            </div>
            {/* Social media icons with responsive layout */}
            <div className="relative opacity-0 group-hover:!opacity-100 -mt-60 sm:-mt-52 -right-20 sm:-right-28 -top-48 sm:-top-40 transform transition-opacity duration-300 flex flex-col gap-6 z-20">
                <Link href={data?.user?.linkedIn}><FaInstagram className='text-2xl w-9 h-9 p-2 bg-white hover:!bg-[#10B981] hover:!text-white  text-[#10B981] rounded-full  mx-auto  cursor-pointer   transition-colors duration-300' /></Link>
                <Link href={data?.user?.twitter}><FaTwitter className='text-2xl  w-9 h-9 p-2 rounded-full mx-auto cursor-pointer bg-white hover:!bg-[#10B981] hover:!text-white text-[#10B981]  transition-colors duration-300 ' /></Link>
                <Link href={data?.user?.facebook}><FaFacebookF className='text-2xl  w-9 h-9 p-2 rounded-full mx-auto cursor-pointer bg-white hover:!bg-[#10B981] hover:!text-white  text-[#10B981]  transition-colors duration-300 ' /></Link>
            </div>
        </div>
    );
};

export default ExpertTeamCard2;
