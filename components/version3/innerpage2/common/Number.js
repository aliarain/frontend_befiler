import React from 'react';

const Number = ({ numberData, headingText='#1C2539', descriptionText='#1C2539' }) => {
    return (
        <div className='max-w-[1320px] mx-auto'>
            <div className='mt-20 md:mt-24 lg:mt-28 xl:mt-32 px-8 lg:px-0'>
                <div className='flex justify-between items-center flex-col md:flex-row'>
                    {numberData.map((data, index) => (
                        <div key={index} className='mt-8 md:mt-0'>
                            <h1 className={`number-heading text-center !text-[${headingText}]`}>{data.number}</h1>
                            <p className={`number-title mt-3 md:mt-4 lg:mt-6 !text-[${descriptionText}]`}>{data.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Number;