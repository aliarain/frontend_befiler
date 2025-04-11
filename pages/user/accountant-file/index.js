import React, { useEffect, useState } from 'react';
import Table from '../../../components/user/table/table';
import { getAllCompleteFileAPI, updateReviewAPI } from '../../../helpers/backend_helper';
import UserLayout from '../../../layout/userLayout';
import { FaDownload, FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';
import { Switch } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import Head from 'next/head';
import {useRouter} from "next/router";


const AccountantFile = () => {
    const router = useRouter()
    const [completeTaxFile, setCompleteTaxFile] = useState([]);
    const [refreshData, setRefreshData] = useState(null);

    // fetch user completed files which are coming from accountant 
    useEffect(() => {
        getAllCompleteFileAPI().then((data) => {
            setCompleteTaxFile(data?.data);
        });
        setRefreshData(null)
    }, [refreshData]);


    // user's tax file review turn off and turn on
    const onChange = (checked, dt) => {
        const data = {
            taken_a_review: checked
        };
        const queryValue = { id: dt._id };
        updateReviewAPI(data, queryValue).then(data => {
            if (data?.status) {
                toast.success(data?.message)
                setRefreshData(data?.message)
            } else {
                toast.error(data?.message)
            }
        })
    };


    const column = [
        {
            dataField: 'ID', headerName: '#ID', formatter: (ID, data) => (
                <div className='flex justify-center gap-4 underline cursor-pointer' title={'details'}>
                    <span onClick={() => router.push('/user/submitted-tax-file/details?id='+data?._id)} className='capitalize'>{ID}</span>
                </div>
            )
        },
        {
            dataField: 'year', headerName: 'Submission Year', formatter: year => (
                <div className='flex justify-center gap-4'>
                    <span className=''>{year}</span>
                </div>
            )
        },
        {
            dataField: 'download', headerName: 'Download', formatter: (_, data) => (
                <div className='flex justify-center gap-4'>
                    <Link href={data?.file_from_accountant}>
                        <span className='text-purple-600 cursor-pointer' title={'download'}>
                            <FaDownload size={16} />
                        </span>
                    </Link>
                </div>
            )
        },
        {
            dataField: 'pst_tax_rate', headerName: <span className='flex items-center justify-center gap-2' title='You can take at most 2 review!'> Take a Review <FaQuestionCircle title='You can take at most 2 review!' className='text-purple-600 cursor-help'/> </span>, formatter: (_, data) => (
                <div className='flex justify-center gap-4'>
                    <span className='' title='You can take at most 2 review!'>
                        <Switch checked={data?.taken_a_review || false} onChange={(e) => onChange(e, data)} />
                    </span>
                </div>
            )
        },
    ]


    return (
        <div>
            <div className='min-h-screen'>
                <Head>
                    <title>Files</title>
                </Head>

                <div className='mx-10 md:mx-20 mt-8 md:mt-16 bg-gray-100 p-10 rounded-md'>
                    <Table
                        columns={column}
                        data={completeTaxFile}
                    />
                </div>

                {/* toast message */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    );
};
AccountantFile.layout = UserLayout;
export default AccountantFile;