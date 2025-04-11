import React, {useEffect, useState} from 'react';
import {getSiteSettingInformationAPI} from "../../../helpers/backend_helper";

const Experience = () => {
    const [siteInformationData, setSiteInformation] = useState({})

    // fetch existing data
    useEffect(() => {
        getSiteSettingInformationAPI().then(data => {
            setSiteInformation(data?.data)
        })
    }, [])

    return (
        <>
            <div className='bg-[#FAF7F6] pt-32 pb-64 -mt-32'>
                <div className="container mx-auto">
                    <div className=''>
                    <div className="flex md:flex-row flex-col justify-around">
                        <div className="flex flex-col items-center">
                            <h3 className='header_2'>{siteInformationData?.year_of_experience}</h3>
                            <h5 className="header_6 mt-[4px] text-hover">
                            YEARS EXPERIENCE
                            </h5>
                        </div>

                        <div className="flex flex-col items-center">
                            <h3 className='header_2'>{siteInformationData?.per_month_filled}</h3>
                            <h5 className="header_6 mt-[4px] text-hover">
                            FILLED TAX PER MONTH
                            </h5>
                        </div>

                        <div className="flex flex-col items-center">
                            <h3 className='header_2'>{siteInformationData?.total_user}</h3>
                            <h5 className="header_6 mt-[4px] text-hover">
                            HAPPY USERS
                            </h5>
                        </div>

                        <div className="flex flex-col items-center">
                            <h3 className='header_2'>{siteInformationData?.expert_member}</h3>
                            <h5 className="header_6 mt-[4px] text-hover">
                            EXPERT MEMBERS
                            </h5>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Experience;