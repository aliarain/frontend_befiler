import React from 'react';
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";


const AboutCard = ({ aboutCards }) => {

    return (
        <>
            <div className='card-flip hero_font_family my-2 container'>
                <div className="flip-box flip-box-height">
                    <div className="flip-box-inner shadow-md">
                        <div className="flip-box-front">
                            <div className='flex justify-center '>
                                {/* card image section */}
                                <img className='h-[300px] flip-image' src={aboutCards?.user?.image ? `${aboutCards?.user?.image}` : "/images/team1.png"} alt="" />
                            </div>
                            {/* card bacis data */}
                            <div className=' bg-white  w-full h-[100px] absolute bottom-0 flex items-center justify-center'>
                                <div className='text-center'>
                                    <p className='text-xl mb-0 capitalize'>{`${aboutCards?.user?.first_name}  ${aboutCards?.user?.last_name}`}</p>
                                    <p className='text-base mb-0 capitalize'>{aboutCards?.title}</p>
                                </div>
                            </div>
                        </div>
                        {/* card back flip data */}
                        <div className="flip-box-back h-72 w-60 rounded relative ">
                            <div className='p-4'>
                                <p className='text-base capitalize mb-2'>University : {aboutCards?.university}</p>
                                <p className='text-sm text-justify overflow-auto'>{aboutCards?.user?.short_brief?.slice(0,300)}</p>
                            </div>
                            <div className=' flex justify-center cursor-pointer'>
                                <div className='absolute bottom-4 bg-white rounded-full w-10 h-10  shadow-md cursor-pointer flex justify-center items-center '>
                                    <div className='bg-[#14AA40] h-8 w-8 my-auto rounded-full flex justify-center items-center cursor-pointer'>
                                        <Link href={aboutCards?.user?.linkedIn ?? "#"}>
                                            <a target="_blank" className='flex justify-center m-2 text-white text-center'>
                                                <FaLinkedinIn size={20} />
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutCard;