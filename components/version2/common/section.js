import React from 'react';
import { useEffect, useState } from "react";
import { getAllUserRoleExceptAdminAPI, verifyUserAPI } from "../../../helpers/backend_helper";
import Link from "next/link";


const Section = ({ taxSituation }) => {

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

    return (
        <>
            <div className='lg:grid lg:grid-cols-2 pb-10'>
                <div className="relative">
                    <div className="w-[200px] h-[182px] bg-hover rounded-[10px] lg:-ml-2 -ml-4"></div>
                    <div className="lg:w-[627px] w-fit lg:h-[468px] h-fit">
                        <img className='-mt-40 lg:ml-4 rounded-md relative' src={taxSituation?.hero_section_image} alt='civilian' />
                        <img src='/v2/v1.png' alt="taxstick" className='w-[191.33px] h-[198.75px] ml-[32rem] -mt-[9rem] lg:block hidden' />
                    </div>
                </div>
                <div className='pt-12 lg:pl-32 pl-4'>
                    <h1 className="focus:outline-none header_4 mt-2">
                        {taxSituation?.hero_section_title}
                    </h1>
                    <p className="focus:outline-none my-8 pr-12 paragraph">
                        {taxSituation?.hero_section_title_Sub_title}
                    </p>
                    <div className="mt-10">
                        
                        {
                            (userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                <Link href="/user/">
                                    <button className="focus:outline-none bg-hover text-white paragraph_1 py-3 px-20 rounded-md">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                                :
                                <Link href="/login">
                                    <button className="focus:outline-none bg-hover text-white paragraph_1 py-3 px-20 rounded-md">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                        }
                    </div>

                </div>

            </div>

            <div className='lg:grid lg:grid-cols-2 lg:pt-8 pt-4 lg:pb-24 pb-8'>

                <div className='lg:pt-52 pt-8 pl-4'>
                    <h1 className="focus:outline-none header_4 mt-2">
                        {taxSituation?.section_2_title}
                    </h1>
                    <p className="focus:outline-none my-8 pr-12 paragraph">
                        {taxSituation?.section_2_sub_title}
                    </p>
                    <div className="mt-10">
                           
                    {
                            (userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                <Link href="/user/">
                                    <button className="focus:outline-none bg-hover text-white paragraph_1 py-3 px-20 rounded-md">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                                :
                                <Link href="/login">
                                    <button className="focus:outline-none bg-hover text-white paragraph_1 py-3 px-20 rounded-md">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                        }
                    </div>
                </div>

                <div className="relative pt-10 ml-0 md:-ml-10 min-[1400px]:ml-4 lg:pl-24">
                    <div className="w-[200px] h-[182px] bg-hover rounded-[10px] lg:ml-[28rem] -ml-4"></div>
                    <div className="xl:w-[627px] w-fit lg:h-[468px] h-fit">
                        <img className='-mt-40 rounded-md relative' src={taxSituation?.section_2_image} alt='civilian' />
                        <img src="/v2/v1.png" alt="taxstick" className='w-[191.33px] h-[198.75px] -ml-[5rem] -mt-[9rem] lg:block hidden' />
                    </div>
                </div>
            </div>

            <div className='lg:grid lg:grid-cols-2 pb-10'>
                <div className="relative">
                    <div className="w-[200px] h-[182px] bg-hover rounded-[10px] lg:-ml-2 -ml-4"></div>
                    <div className="lg:w-[627px] w-fit lg:h-[468px] h-fit">
                        <img className='-mt-40 lg:ml-4 rounded-md relative' src={taxSituation?.section_3_image} alt='civilian' />
                        <img src='/v2/v1.png' alt="taxstick" className='w-[191.33px] h-[198.75px] ml-[32rem] -mt-[9rem] lg:block hidden' />
                    </div>
                </div>
                <div className='pt-12 lg:pl-32 pl-4'>
                    <h1 className="focus:outline-none header_4 mt-2">
                        {taxSituation?.section_3_title}
                    </h1>
                    <p className="focus:outline-none my-8 pr-12 paragraph">
                        {taxSituation?.section_3_sub_title}
                    </p>
                    <div className="mt-10">
                           
                    {
                            (userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) ?
                                <Link href="/user/">
                                    <button className="focus:outline-none bg-hover text-white paragraph_1 py-3 px-20 rounded-md">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                                :
                                <Link href="/login">
                                    <button className="focus:outline-none bg-hover text-white paragraph_1 py-3 px-20 rounded-md">
                                        File Your Taxes Online
                                    </button>
                                </Link>
                        }
                    </div>
                </div>

            </div>
        </>
    );
};
export default Section;