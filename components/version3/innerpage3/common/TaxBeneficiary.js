import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllUserRoleExceptAdminAPI, verifyUserAPI } from "../../../../helpers/backend_helper";

const TaxBeneficiary = ({ image1, image2 ,title1,paragraph, title, position = 'md:flex-row' }) => {
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
            <div className='max-w-[1320px] mx-auto mt-16 md:mt-20 lg:mt-40  px-8 lg:px-[1px]'>
           
                <div className={`flex flex-col ${position} items-center gap-6 mt-10 lg:mt-12 xl:mt-14`}>
               
                    <div className='flex-1'>
                        <div className='sm:flex sm:gap-4 md:gap-5 lg:gap-8 flex-col sm:flex-row'>
                            <div className=''>
                                <div className="relative w-full lg:w-[280px] h-auto left-3 ">

                                    {
                                        image1 && (
                                            <Image src={image1} alt="Like Icon" height={431} width={280}  className='about1 w-full h-auto z-20 object-cover'/>
                                        )
                                    }

                                </div>
                                <div className='div1 relative left-3 z-10 hidden lg:flex -mt-60'></div>
                                <p className='relative z-20 hidden lg:flex justify-center -mt-14 !text-white text-xl font-bold'>{title} Tax Planning</p>
                            </div>
                            <div>
                                <div className='hidden lg:flex !top-7 !left-10 relative z-50'>
                                    <Image src='/v3/About3/frame.svg' width={240} height={81} alt='background frame' cl />
                                </div>
                                <div className='mt-0 lg:-mt-[115px]'>
                                    <div className='hidden relative left-[2px] sm:flex w-full'>
                                        
                                        {
                                            image2 && (
                                                <Image src={image2} alt="Like Icon" height={431} width={280} className='relative left-2 z-20 about2 mt-0 lg:mt-[90px] w-full lg:w-[280px] object-cover' />
                                            )
                                        }
                                    </div>
                                    <div className='relative z-10  div2 hidden lg:flex -mt-[515px]'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 md:mt-0 flex-1'>
                        <h1 className='tax-heading'>{title}</h1>
                        <p className='mt-6 inner-description1 text-[#C6CED1]'>{paragraph}</p>
                        {
                            (
                                userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                <Link href="/user/">
                                    <button className="button text-[#10B981] hover:!text-white  px-10 py-[22px] rounded">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                                :
                                <Link href="/login">
                                    <button className="button text-[#10B981] hover:!text-white  px-10 py-[22px] rounded">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxBeneficiary;