import React from 'react';


const CardWithIcon = ({ iconCards }) => {


    return (
        <div>
            <div className='bg-white p-3 h-40 2xl:h-36 lg:w-full rounded shadow-lg  my-2 lg:my-0'>
                <div className='h-18 flex justify-between'>
                    <div className='relative'>
                        <div className={`absolute -top-10 border lg:h-16 lg:w-16 h-20 w-20 xl:h-24 xl:w-24 shadow ${iconCards?.bgColor} flex justify-center items-center rounded `}>
                            <iconCards.icon1 className='text-4xl text-white' />
                        </div>
                    </div>
                    <div className='text-right'>
                        <p className='text-[#9A9A9A] text-[16px] mb-0'>{iconCards?.tittle}</p>
                        <p className='text-xl text-gray-700'>{iconCards?.number}</p>
                    </div>
                </div>
                <div className="flex items-end border-t-2 py-2 text-[#9A9A9A]">
                    <div className='flex'>
                        <iconCards.icon2 className={`${iconCards?.waringIconColor} text-base mt-1 mr-2`} />
                        <p>{iconCards?.warning}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardWithIcon;