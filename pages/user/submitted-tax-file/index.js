import React, { useEffect, useState } from "react";
import UserLayout from "../../../layout/userLayout";
import {
    BsCardText
} from "react-icons/bs";
import { getAllTaxFilesUserwiseAPI } from "../../../helpers/backend_helper";
import SubmissionCard from "../../../components/user/submission/submissionCard";
import Head from "next/head";
import {FallingLines} from "react-loader-spinner";


const MyTaxFile = () => {
    const [userTaxFiles, setUserTaxFiles] = useState([]);
    const [refreshData, setRefreshData] = useState(null);

    // fetch all submitted tax file data by user-wise
    useEffect(() => {
        getAllTaxFilesUserwiseAPI().then((data) => {
            setUserTaxFiles(data?.data);
            setRefreshData(null)
        });
    }, [refreshData]);


    return (
        <div>
            <section className="min-h-screen">
                <Head>
                    <title>Tax File Form</title>
                </Head>

                <div className="mx-5 mt-12 bg-slate-50 rounded-md relative">
                    <div className="bg-red-600 h-16 w-16 rounded-md text-[24px] text-white flex items-center justify-center absolute -top-4 left-10 inline-block">
                        <BsCardText size={30} />
                    </div>
                    <span className="absolute top-5 left-28 text-[20px] text-gray-500">
                        My Tax Submissions
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0 lg:gap-0 pt-24 pl-10 pb-12">
                        {
                            userTaxFiles?.length > 0 ?
                                 userTaxFiles?.map((data, i) => <SubmissionCard key={data?._id} userTaxFiles={data} setRefreshData={setRefreshData} />)
                                :
                                <div className={""}>
                                    <FallingLines
                                        color="#4fa94d"
                                        width="70"
                                        visible={true}
                                        ariaLabel='falling-lines-loading'
                                    />
                                </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};
MyTaxFile.layout = UserLayout;
export default MyTaxFile;
