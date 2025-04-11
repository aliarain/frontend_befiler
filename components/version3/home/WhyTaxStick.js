import Image from 'next/image';
import React from 'react';

const WhyTaxStick = ({ bgImage1, bgImage2, showDiv= false , siteData }) => {
    const point1 = siteData?.why_point1;
    const point2 = siteData?.why_point2;
    const point3 = siteData?.why_point3;
    const point4 = siteData?.why_point4;
    
    const data = [
        { id: '01', imgSrc: '/v3/Why/img1.png', text: point1 },
        { id: '02', imgSrc: '/v3/Why/img2.png', text: point2 },
        { id: '03', imgSrc: '/v3/Why/img3.png', text: point3 },
        { id: '04', imgSrc: '/v3/Why/img4.png', text: point4 }
    ];

    return (
        <div className="bg-cover bg-center  mx-auto h-full xl:h-[620px] flex flex-col mt-20  justify-center items-center"
            style={{ backgroundImage: `url(${bgImage2})` }}>

            <div
                className="bg-cover bg-center max-w-[1320px] mx-auto h-full xl:h-[620px] rounded-[40px]  flex flex-col justify-center items-center"
                style={{ backgroundImage: `url(${bgImage1})` }}>
                <h1 className="!text-2xl !text-white md:heading48 pt-16 md:pt-24">WHY TAXSTICK ??</h1>
                <div className="grid grid-cols-1 mx-4 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-6 text-center mb-16">

                    {data.map(({ id, imgSrc, text }) => (


                        <div key={id} className="flex flex-col items-center relative z-20">
                            <p className="text-lg  font-semibold font-[Urbanist] text-primary whyShape bg-white w-[42px] h-[42px] flex items-center justify-center relative top-14 right-16">
                                {id}
                            </p>
                            <div className="border-[3px] border-dotted p-3 rounded-full flex justify-center items-center">
                                <Image src={imgSrc} alt={`Image ${id}`} width={126} height={126} className='rounded-full' />
                            </div>
                            <p className="mt-5   max-w-[300px] text-white text-lg leading-[166%] font-semibold">{text}</p>
                        </div>
                    ))}
                    {showDiv && (
                        <div className={`h-[1px] z-10 w-[1175px] bg-[#FFFFFF80] hidden 2xl:flex relative bottom-60 left-[73px] overflow-hidden`}></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WhyTaxStick;
