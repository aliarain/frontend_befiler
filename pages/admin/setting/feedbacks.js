import React, { useState } from 'react';
import TableManage from '../../../components/admin/manage/tableManage';
import AdminLayout from '../../../layout/adminLayout';
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllFeedbackAPI } from '../../../helpers/backend_helper';
import { useFetch } from '../../../helpers/hooks';
import { useEffect } from 'react';
import swalAlert from '../../../components/common/swalAlert';
import deleteAction from '../../../components/common/delete';
import Head from 'next/head';
import AdminSettingFrontendPages from "./frontend-pages";



const AdminSettingFeedbacks = () => {
    const [feedbacksData, getFeedbacksData, { loading, error }] = useFetch(getAllFeedbackAPI);
    const [rattingValue, setRattingValue] = useState(null);
    const [refreshData, setRefreshData] = useState(null)

    // fetch all relevant data and update state
    useEffect(() => {
        const data = {
            size: 20,
            ratting: rattingValue
        }
        getFeedbacksData(data)

        setRefreshData(null)
    }, [rattingValue, refreshData])


    const handleRatting = (e) => {
        setRattingValue(e)
    }

    // delete
    const deleteHandleAction = async (id) => {
        let { isConfirmed } = await swalAlert.confirm(
            "Are you want to delete this feedbacks?",
            "Yes, Delete"
        );
        if (isConfirmed) {
            const data = { id };
            await deleteAction(data, "feedbacks", setRefreshData);
        }
    };

    const column = [
        {
            dataField: 'email', headerName: 'Email', formatter: (_, data) => (
                <span>{data?.user?.email}</span>
            )
        },
        {
            dataField: 'name', headerName: 'Ratting', formatter: (_, data) => (
                <span className='flex justify-center text-purple-600 font-semibold'>{data?.ratting}</span>
            )
        },
        {
            dataField: 'name', headerName: 'Comment', formatter: (_, data) => (
                <span>{data?.comment?.slice(0, 100)}</span>
            )
        },
        {
            dataField: '_id', headerName: 'Actions', formatter: _id => (
                <div className='flex justify-around'>
                    <span className='inline-block bg-[#E02D1B] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => deleteHandleAction(_id)} title="Delete this account"><RiDeleteBin6Line /></span>
                </div>
            )
        }
    ]


    return (
        <>
            <section className='bg-gray-100 mx-2 rounded-md pt-12 min-h-screen'>
                <Head>
                    <title>User Feedbacks</title>
                </Head>


                <TableManage
                    titleData='all feedbacks'
                    columns={column}
                    data={feedbacksData}
                    ratting={true}
                    handleRatting={handleRatting}
                    onReload={getFeedbacksData}
                    pagination
                    show_data={false}
                />
            </section>
        </>
    );
};
AdminSettingFeedbacks.layout = AdminLayout
export default AdminSettingFeedbacks;