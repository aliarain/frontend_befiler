import React, { useEffect, useState } from 'react';
import { getSiteHomeAPI } from '../../../helpers/backend_helper';


const WhyTaxstick = ({ siteData, aboutContent }) => {
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
        <div className='-mt-20 flex flex-col items-center'>
            <div className="lg:h-[702px] lg:w-[1280px] h-[700px] lg:px-10 px-6 bg-no-repeat bg-center rounded-xl" style={{ backgroundImage: `url('../../v2/img/BG.png')` }}>
                <div className="md:flex-col lg:flex-row sm:flex-row flex flex-col">
                    <div className="flex flex-col pt-10 pb-10 md:pt-24 md:pb-24 lg:pt-64 lg:pb-72 lg:pl-0 ">
                        <div className="header_2 text-white md:w-fit lg:w-fit w-fit">
                            WHY {aboutContent?.name ?? ""} ?
                        </div>
                        <div className="paragraph text-white lg:w-[480px] w-fit pt-8">
                        {siteData?.why ?? ""}
                        </div>
                    </div>
                    <div className="pb-[76px] pt-[120px] lg:-ml-[27rem] hidden lg:block">
                        <img src="/v2/img/Group61.png" alt="group" />
                    </div>
                    <div className="grid xl:grid-flow-row lg:auto-rows-[112px] md:py-12 lg:py-36 py-[4px] header_6 px-[8px] text-[#EAEBEC] list-decimal lg:list-none">
                        {
                            data?.map((item) => {
                                return (
                                    <li className="" key={item._id}>
                                        {item?.tittle ?? ""}
                                    </li>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyTaxstick;
