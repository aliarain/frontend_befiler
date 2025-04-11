import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getSiteHomeAPI } from '../../../../helpers/backend_helper';


const WhyChoose = ({ siteData, aboutContent }) => {
    const [whyData, setWhyData] = useState({});

    useEffect(()=>{
        getSiteHomeAPI().then(data => {
            setWhyData(data?.data)
        })
    },[])

    // card data
    const data = [
        {
            tittle: whyData?.why_point1,
            image: '/codecayonImage/g5.png',
        },
        {
            tittle: whyData?.why_point2,
            image: '/codecayonImage/g6.png',
        },
        {
            tittle: whyData?.why_point3,
            image: '/codecayonImage/g7.png',
        },
        {
            tittle: whyData?.why_point4,
            image: '/codecayonImage/g8.png',
        },
    ]


    return (
        <div className='flex justify-center items-center px-[5%] lg:px-[10%] py-[5%] whyBg'>
            <div className='container'>
                <div className='lg:grid lg:grid-cols-2 gap-[5%] text-white'>
                    {/* section header and sub tittle */}
                    <div className='my-auto text-base'>
                        <p className='uppercase text-[24px] md:text-[28px] lg:text-[34px] font-semibold hero_font_family'>Why {aboutContent?.name ?? ""} ??</p>
                        <p className='text-justify text-[16px]  hero_font_family'>{siteData?.why ?? ""}</p>

                    </div>
                    {/* card section */}
                    <div className='my-[5%] lg:my-0'>
                        {
                            data.map((d, i) =>
                                <div key={i + 1} className='flex gap-4 my-2'>
                                    <div className='flex justify-center items-center bg-white w-[80px] h-[80px] rounded' >
                                        <img className='w-[40px] h-[40px]' src={d?.image ?? ""} alt="" />
                                    </div>
                                    <div className='w-[85%] flex items-center text-[17px]  hero_font_family'>
                                        <p className='mb-0 hero_font_family'>{d?.tittle ?? ""} </p>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChoose;