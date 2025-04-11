import React from 'react';


const TaxCard = ({ taxCards }) => {

    
    return (
        <div>
            <div className='bg-white p-3 h-20 rounded shadow-lg'>
                <div className='flex justify-between'>
                    <div className='relative'>
                        <div className={`absolute -top-10 border h-20 w-20 shadow ${taxCards?.bgColor} flex justify-center items-center rounded`}>
                            <taxCards.icon className='text-4xl text-white' />
                        </div>
                    </div>
                    <div className='text-right'>
                        <p className='text-[#9A9A9A] text-[16px] mb-0'>{taxCards?.data}</p>
                        <p className='text-[#131212] text-[18px] mb-0'>{taxCards?.tittle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxCard;