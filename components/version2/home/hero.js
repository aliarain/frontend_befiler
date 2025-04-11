import { useEffect, useState } from "react";
import { getAllUserRoleExceptAdminAPI, getOneSiteSettingAPI, verifyUserAPI } from "../../../helpers/backend_helper";
import Link from "next/link";
import { Skeleton } from "antd";

const Hero = ({siteData={}}) => {
    const { hero_section_images = [] } = siteData || {};
    const [user, setUser] = useState({});
    useEffect(() => {
        verifyUserAPI().then((userData) => {
            if (userData?.status === true) {
                setUser(userData?.data)
            }
        })
    }, [])

    const [userRole, setUserRoles] = useState([]);
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(res => {
            if (res?.status === true) {
                let arrayOfRole = [];
                res?.data?.forEach(el => {
                    arrayOfRole.push(el.name)
                })
                setUserRoles(arrayOfRole)
            }
        })
    }, [user?.role])

    const [getSiteSettingData, setSiteSettingData] = useState({});
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {
            setSiteSettingData(data?.data);
        })
    }, [])

    return (
        <>
            <div className="w-full table absolute top-0 -z-10 ">
                <div className="grid grid-cols-3 max-w-[1920px]">
                    <div className="top-0 h-[1015px]" style={{ backgroundImage: `url('../../v2/img/1.png')` }}>
                        <div className="!bg-[#1E1D2BF2] h-[1015px]"></div>
                    </div>
                    <div className="top-0 h-[1015px] col-span-2" style={{ backgroundImage: `url('../../v2/img/2.png')` }}>
                        <div className="!bg-[#12181be6] h-[1015px]"></div>

                    </div>
                </div>
            </div>
            <div className="container2">
                <div className="grid grid-rows-1 lg:grid-cols-2 gap-5">
                    <div className="flex flex-col items-center lg:block hidden">
                        {
                            !!hero_section_images ?
                            <img src={hero_section_images[0]} alt="hero" height={830} width={576} className="hidden lg:block" />
                            :
                            <Skeleton active />
                        }
                    </div>
                    <div className="flex justify-start lg:justify-center">
                        <div className="lg:mt-32">
                            <h3 className='text-hover header_5 lg:mt-32 mt-20'>Welcome to {getSiteSettingData?.username ?? ''}!</h3>
                            <h1 className="text-white my-[25px] lg:text-[52px] lg:leading-[77px] header_3 text-start">
                                Connecting Taxpayers To Accountants
                            </h1>
                            <p className="text-white header_6">
                                Let Us File Your Tax ...
                            </p>

                            {
                                (userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                    <Link href="/user/">
                                        <button className="bg-hover text-white py-[12px] mb-[32px] px-10 rounded-md hover:bg-hover">
                                            Fill Your Tax Online
                                        </button>
                                    </Link>
                                    :
                                    <Link href="/login">
                                        <button className="bg-hover text-white py-[12px] mb-[32px] px-10 rounded-md hover:bg-hover">
                                            Fill Your Tax Online
                                        </button>
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero

