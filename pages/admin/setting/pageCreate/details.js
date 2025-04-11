import React, { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { useRouter } from "next/router";
import AdminLayout from '../../../../layout/adminLayout';
import { getOneFrontPageAPI } from '../../../../helpers/backend_helper';
import Head from 'next/head';
import DraftEditor from "./editor";

const FrontEndPageDetails = () => {
    const router = useRouter();
    const [frontPage, setFrontPage] = useState({});
    const { query } = router;

    // fetch one front page data
    useEffect(() => {
        getOneFrontPageAPI(query).then((data) => {
            setFrontPage(data?.data);
        });
    }, [query, query.id]);

    
    return (
        <>
            <div className="shadow-lg  rounded bg-white p-4 m-4 ">
                <Head>
                    <title>Frontend Page Details</title>
                </Head>

                {/* upper style */}
                <div className="h-12 relative">
                    <div className="absolute w-16 h-16 shadow flex justify-center rounded -top-10 items-center bg-[#C34742]">
                        <span className='text-white'><MdPerson size={35} /></span>
                    </div>
                    <p className='ml-20 text-xl'>Show Page</p>
                </div>
                {/* body */}
                <div className='m-4'>
                    <p className='text-gray-500 text-base'>ID: {frontPage?.ID}</p>
                    <p className='text-gray-500 capitalize text-base'>Name: {frontPage?.name}</p>
                    <p className='text-gray-500 text-base'>Contents:</p>
                    <p dangerouslySetInnerHTML={{ __html: frontPage?.contents }}></p>
                </div>
            </div>
        </>
    );
};
FrontEndPageDetails.layout = AdminLayout
export default FrontEndPageDetails;