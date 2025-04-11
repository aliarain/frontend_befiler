import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Marquee from 'react-fast-marquee'; // Ensure this import is present after installation

const Trusted3 = ({siteData}) => {
    const TrustedData = [
        { image: `${siteData?.partner_ships[0]}` },
        { image: `${siteData?.partner_ships[1]}` },
        { image: `${siteData?.partner_ships[2]}` },
        { image: `${siteData?.partner_ships[3]}` },
        { image: `${siteData?.partner_ships[4]}` },
        { image: `${siteData?.partner_ships[5]}` },
        { image: `${siteData?.partner_ships[6]}` },
    ];

    return (
        <section className=' overflow-hidden '>
            <div className='flex items-center justify-between 2xl:-mt-16'>
                <div className='hidden xl:flex items-center justify-end '>
                    <Image src='/v3/trusted/left.svg' width={160} height={415} alt='Right site style' />
                </div>
                <div className='max-w-[1320px] mx-auto px-8 lg:px-0 pt-20'>
                    <div className="max-w-[450px] mx-10 -ml-16 sm:ml-0 sm:!mx-auto">
                        <h4 className="text-white  sm:max-w-[450px] text-[16px] md:text-xl lg:text-2xl font-semibold border-b-2 border-[#10B981] pb-2  !text-center">Trusted by 100k+ Investors Company </h4>
                    </div>
                    <Marquee gradient={false} pauseOnHover={true}>
                        <div className='trusted-brand flex gap-x-[50px]'> 
                            {TrustedData.map((data, index) => (
                                <Link key={index} href='' passHref>
                                    <Image src={data.image} width={135} height={48} alt='Brand Image' />
                                </Link>
                            ))}
                        </div>
                    </Marquee>
                </div>
                <div className='hidden xl:flex items-center justify-end '>
                    <Image src='/v3/trusted/right.svg' width={160} height={415} alt='Right site style' />
                </div>
            </div>
        </section>
    );
};

export default Trusted3;
