import React, { useEffect, useState } from 'react';
import Table from '../../../components/admin/table/table';
import AdminLayout from '../../../layout/adminLayout';
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from 'next/router';
import { getAllFrontPageAPI } from '../../../helpers/backend_helper';
import deleteAction from '../../../components/common/delete';
import swalAlert from '../../../components/common/swalAlert';
import Head from 'next/head';
import AdminSettingTaxFilePricing from "./taxfile-pricing";


const AdminSettingFrontendPages = () => {
    const router = useRouter();
    const [frontPage, setFrontPage] = useState([]);
    const [refreshData, setRefreshData] = useState(null);

    useEffect(() => {
        getAllFrontPageAPI().then(data => {
            setFrontPage(data?.data);
            setRefreshData(null)
        })
    }, [refreshData])

    // add new page 
    const handleAddNewPage = () => {
        router.push('/admin/setting/pageCreate/editor/')
    }

    // details
    const detailsHandleAction = (id) => {
        router.push(`/admin/setting/pageCreate/details?id=${id}`)
    }
    // edit
    const editHandleAction = (id) => {
        router.push(`/admin/setting/pageCreate/edit?id=${id}`)
    }

    // delete
    const deleteHandleAction = async (id) => {
        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this coupon?', 'Yes, Delete')
        if (isConfirmed) {
            const data = { id }
            await deleteAction(data, 'frontPage', setRefreshData)
        }
    }

    const column = [
        { dataField: 'ID', headerName: 'ID' },
        { dataField: 'name', headerName: 'Name' },
        { dataField: 'type', headerName: 'Type', },
        {
            dataField: '_id', headerName: 'Actions', formatter: _id => (
                <div className='flex justify-evenly'>
                    <span className='inline-block bg-[#16d650] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => detailsHandleAction(_id)} title="Details of this page"><AiFillEye /></span>
                    <span className='inline-block bg-[#2C9FAF] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => editHandleAction(_id)} title="Edit this page"><TiEdit /></span>
                    <span className='inline-block bg-[#E02D1B] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => deleteHandleAction(_id)} title="Delete this page"><RiDeleteBin6Line /></span>
                </div>
            )
        },
    ]


    return (
        <>
            <section className='bg-gray-100 mx-2 rounded-md pt-12 min-h-screen'>
                <Head>
                    <title>Frontend Page Setup</title>
                </Head>


                {/* new create page button */}
                <div className='flex justify-end mr-6'>
                    <button className='btn-taxants__red text-white' onClick={handleAddNewPage}>
                        <span className='flex items-center justify-center'>
                            <span className='mr-2'> <MdAccountCircle size={18} /></span>
                            <span>Create New Page</span>
                        </span>
                    </button>
                </div>


                <div className='bg-gray-50 m-4 rounded-t'>

                    <div className='relative p-6' >
                        {/* upper design */}
                        <div className='h-12'>
                            <div className='absolute w-16 h-16 bg-[#C34742] shadow-md rounded flex items-center justify-center text-white -top-5'>
                                <span> <MdAccountCircle size={35} /> </span>
                            </div>

                            <span className='capitalize ml-20'>More page for live website</span>
                        </div>

                        {/* data show in table */}
                        <Table data={frontPage} columns={column} />
                    </div>

                </div>
            </section>
        </>
    );
};
AdminSettingFrontendPages.layout = AdminLayout
export default AdminSettingFrontendPages;