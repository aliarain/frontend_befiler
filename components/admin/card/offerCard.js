import React from 'react';
import { MdOutlineNavigateNext } from "react-icons/md";


const OfferCard = ({ offerCards, handleBlog }) => {
    
    return (
        <div className='w-[340px] h-[450px] lg:w-[300px] '>
            <div className='shadow-lg relative rounded bg-white p-4 '>
                {/* upper style */}
                <div className='h-[300px]'>
                    <div className='h-32'>
                        <div className='absolute w-20 h-20 shadow flex justify-center rounded -top-5 items-center bg-[#E9090E]'>
                            <span><offerCards.icon className='text-center text-white' size={35} /></span>
                        </div>
                        <div className='ml-24'>
                            <span className='text-justify text-lg font-bold'>{offerCards?.tittle}</span>
                        </div>
                    </div>
                    <div className=' text-justify'>
                        <p className='text-base'>{offerCards?.description}</p>
                    </div>
                </div>
                <div className='flex justify-center items-end'>
                    <button onClick={handleBlog} className='flex text-[#E9090E] text-[16px] font-bold'>
                        Read More <MdOutlineNavigateNext className='text-xl mt-1' /> </button>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;