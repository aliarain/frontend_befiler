import Image from 'next/image';
import React from 'react';

const services = [
    {
        id: 1,
        title: '24/7 Support',
        description: 'Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
        imageSrc: '/v3/support/1.svg',
    },
    {
        id: 2,
        title: '100% customer satisfaction',
        description: 'Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
        imageSrc: '/v3/support/2.svg',
    },
    {
        id: 3,
        title: 'Unlimited tax advice',
        description: 'Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
        imageSrc: '/v3/support/3.svg',
    },
];

const SupportService = () => {
    return (
        <section className='max-w-[1302px] -mt-14 mx-auto pb-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   md:gap-10 lg:gap-16 px-8 lg:px-0'>
                {services.map(service => (
                    <div key={service.id} className='flex gap-3 lg:gap-5'>
                        <div>
                            <div className='bg-black w-8 h-8 rounded-full relative top-6 left-0'>
                                <p className='text-white px-1 py-[2px] text-xl'>{String(service.id).padStart(2, '0')}</p>
                            </div>
                            <div className='bg-[#F1F7F8] border-2 w-[114px] h-[102px] rounded-tl-[40px] rounded-br-[40px]'>
                                <div className='mx-auto py-5 h-[50px] w-[50px] relative bottom-6' >
                                <Image  src={service.imageSrc} width={50} height={50} alt='support image' />
                                </div>
                                
                            </div>
                        </div>
                        <div className='mt-8'>
                            <h3 className='support-text'>{service.title}</h3>
                            <p className='description !text-[#5D666F] !text-justify'>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SupportService;
