import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllUserRoleExceptAdminAPI, verifyUserAPI } from "../../../../helpers/backend_helper";

const TaxBeneficiary1 = ({ position = 'md:flex-row',image, title, paragraph }) => {
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
        <div className="max-w-[1320px] mx-auto pt-20 lg:pt-56 px-6 xl:px-0 ">
           <div className={`flex flex-col ${position && `${position}`} justify-between items-center max-w-[1320px] mx-auto gap-8 xl:gap-12`}>
                {/* Left Div: Headings and Paragraphs */}
                <div className="w-full md:w-1/2">
                    <div className="mb-14">
                        <h2 className="text-[38px] text-[#1C2539] font-bold mb-8"> {title} </h2>
                        <p className=" text-[#5D666F] leading-[170%] text-[16px]">
                            {paragraph}
                        </p>
                    </div>
                    <div className="relative justify-center lg:justify-end">
                        {
                            (userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
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

                {/* Right Div: Image */}
                <div className="w-full md:w-1/2">

                    <div>
                        <div className=" ml-96 hidden xl:flex "><Image src="/v3/goalMission/circle.svg" alt="Like Icon" height={194} width={194} /></div>
                        <div className="lg:-mt-40 relative z-50 h-auto xl:h-[438px]">
                            {
                                image && (
                                    <Image src={image} alt="Like Icon" height={438} width={624} className="rounded-xl" />
                                )
                            }

                        </div>
                        <div className="-mt-36 ml-10 hidden xl:flex "><Image src="/v3/goalMission/decaration.svg" alt="Like Icon" height={194} width={194} /></div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TaxBeneficiary1;