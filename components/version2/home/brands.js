import React, { useEffect, useState } from 'react';
import { getSiteHomeAPI } from '../../../helpers/backend_helper';

const Brands = () => {
    const [siteData, setSiteData] = useState({});
    // home page data
    useEffect(() => {
        getSiteHomeAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    return (
        <>
            <div className="container pb-20 pt-4 bg-white">
                <div className="flex flex-wrap xl:justify-between lg:justify-around md:justify-center justify-around xl:w-full lg:w-11/12 w-11/12 mx-auto xl:mx-0 lg:mx-auto pb-6">
                    {
                        siteData?.partner_ships?.map((val, i) => {
                            return(
                                <div key={i + 1}>
                                    <img src={val ?? "/v2/codecayonImage/partnership1.png"} alt="brand" className='w-[150px] h-[70px] px-4 mt-4' />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Brands
