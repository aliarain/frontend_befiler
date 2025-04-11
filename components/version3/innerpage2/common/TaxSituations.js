import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllUserRoleExceptAdminAPI, verifyUserAPI } from "../../../../helpers/backend_helper";

const TaxSituation = ({ position = 'md:flex-row',image, title, paragraph }) => {
    const [user, setUser] = useState({});
    const [userRole, setUserRoles] = useState([]);

    useEffect(() => {
        verifyUserAPI().then((userData) => {
            if (userData?.status === true) {
                setUser(userData?.data)
            }
        })
    }, [])

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

    return (
        <div>
            <section className='max-w-[1320px] mx-auto pt-10 md:pt-16 lg:pt-20 xl:py-[100px]'>

                <div
                    className={` flex flex-col ${position} items-center px-8 lg:px-0 gap-6 lg:gap-24 xl:gap-36 `}
                >
                    <div className='flex-1'>
                        <div className='hidden xl:flex relative z-50 justify-end top-12 -left-6'>
                            <Image src='/v3/about/design1.svg' width={100} height={100} alt='design Image' />
                        </div>
                        <div className='relative hidden lg:flex rounded-2xl border-[1px] border-[#10B981] w-[397px] h-[531px] ml-[112px]'></div>
                        <div className='relative z-40 lg:-mt-[520px] w-full lg:w-[488px] h-auto sm:h-[595px]'>
                            {
                                image && (
                                    <Image src={image} alt="Like Icon" height={990} width={788} className="rounded-xl" />
                                )
                            }
                        </div>
                        <div className='hidden relative xl:flex z-0 justify-end -mt-52 -left-5'>
                            <Image src='/v3/about/dot.svg' width={165} height={153} alt='Star' />
                        </div>
                    </div>
                    <div className='flex-1 w-full'>
                        <h1 className='inner-heading !text-[#1C2539]'>{title}</h1>
                        <p className='inner-description1  !text-[#5D666F] mt-4 md:mt-5 lg:mt-8 xl:mt-10'>  {paragraph}</p>
                        {
                            (
                                userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                <Link href="/user/">
                                    <button className="button text-black hover:!text-white  px-10 py-[22px] rounded">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                                :
                                <Link href="/login">
                                    <button className="button text-black hover:!text-white  px-10 py-[22px] rounded">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                        }
                    </div>
                </div>

            </section>
        </div>
    );
};

export default TaxSituation;