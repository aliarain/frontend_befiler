import Image from 'next/image';
import React from 'react';

const TaxPlan = () => {
    const taxPlanData = [
        { image: '/v3/plan/1.svg', heading: 'Tax Planning', title: 'There are many variations of the passage available; the majority have suffered alteration.' },
        { image: '/v3/plan/2.svg', heading: 'personal tax', title: 'There are many variations of the passage available; the majority have suffered alteration.' },
        { image: '/v3/plan/3.svg', heading: 'insurance tax', title: 'There are many variations of the passage available; the majority have suffered alteration.' },

    ]
    return (
        <section className=''>
            <div className='max-w-[1320px] mx-auto px-8 mb-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-10 lg:mt-12'>
                    {taxPlanData.map((data, index) => (
                        <div key={index} className=''>
                            <div className='relative hidden xl:flex left-0 z-20 div-bg h-full w-[55px] rounded-l-xl'> </div>
                            <div className="z-10 tax-plan xl:relative bottom-[215px]">
                                <div className="flex items-center gap-7">
                                    <Image src={data.image} width={48} height={48} alt="Planning Icon" />
                                    <h4 className="text-white plan-heading">{data.heading}</h4>
                                </div>
                                <p className="mt-4 md:mt-5 lg:mt-6 text-gray-300 tax-description">{data.title} </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TaxPlan;