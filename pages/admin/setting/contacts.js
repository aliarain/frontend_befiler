import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from 'next/router';
import { getAllCustomerQueryAPI } from '../../../helpers/backend_helper';
import deleteAction from '../../../components/common/delete';
import swalAlert from '../../../components/common/swalAlert';
import moment from 'moment';
import {  Modal } from 'antd';
import { ToastContainer } from 'react-toastify';
import TableManage from '../../../components/admin/manage/tableManage';
import { useFetch } from '../../../helpers/hooks';
import StatusUpdateModal from '../../../components/admin/modal/statusUpdateModal';
import { FaEdit, FaReplyAll } from 'react-icons/fa';
import Head from 'next/head';
import CreateTaxfilePrice from "./create-taxfile-price";


const CusmoterEmailContact = () => {
    const router = useRouter();
    const [contactMgs, setContactMgs, { loading, error }] = useFetch(getAllCustomerQueryAPI);
    const [refreshData, setRefreshData] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [displayNumber, setDisplayNumber] = useState('');
    const [sortData, setSortData] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // fetch all relevant data and update state
    useEffect(() => {
        const data = { searchValue: searchValue, numberOfRow: displayNumber, sortData, size: 30 }
        setContactMgs(data)

        setRefreshData(null)
    }, [searchValue, displayNumber, refreshData, sortData]);


    const editHandleAction = (id) => {
        router.push(`/admin/setting/contact/?id=${id}`)
    }

    // modal
    const [updateStatus, setUpdateStatus] = useState(false);
    const updateStatusHandleAction = (id) => {
        setUpdateStatus(id);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setRefreshData(true)
    }

    // delete
    const deleteHandleAction = async (id) => {
        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this email?', 'Yes, Delete')
        if (isConfirmed) {
            const data = { id }
            await deleteAction(data, 'customerQuery', setRefreshData)
        }
    }

    const column = [
        {
            dataField: "email", headerName: "Email",
            formatter: (email, data) => <span className="whitespace-pre">{email}</span>
        },
        {
            dataField: "status", headerName: "Status",

        },
        {
            dataField: "createdAt",
            headerName: "Added",
            formatter: (createdAt) => <span>{moment(createdAt).format("l")}</span>,
        },
        {
            dataField: '_id', headerName: 'Actions', formatter: (_id, data) => (
                <div className='flex justify-center gap-4'>
                    <span className='inline-block bg-[#2C9FAF] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => editHandleAction(_id)} title="Reply the email"><FaReplyAll /></span>
                    <span className='inline-block bg-green-500 p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => updateStatusHandleAction(data?._id)} title="Update email status"><FaEdit /></span>
                    <span className='inline-block bg-[#E02D1B] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => deleteHandleAction(_id)} title="Delete this email"><RiDeleteBin6Line /></span>
                </div>
            )
        },
    ];

    // handle Sorting data
    const handleSort = () => {
        setSortData(!sortData);
    };

    const onSearch = (e) => {
        const value = (e.target.value).trim();
        setSearchValue(value)
    }

    // handle display number
    const handleDataShow = e => {
        setDisplayNumber(e)
    }


    return (
        <>
            <section className='min-h-screen'>
                <Head>
                    <title>User Query Reply</title>
                </Head>


                <div className='bg-gray-50 rounded-t'>
                    <div className='' >
                        <section className="bg-gray-100 mx-2 rounded-md pt-12 min-h-screen">
                            <TableManage
                                titleData="all customer query"
                                data={contactMgs}
                                columns={column}
                                handleSort={handleSort}
                                assignAccount={false}
                                onSearch={onSearch}
                                handleDataShow={handleDataShow}
                                pagination
                                loading={loading}
                                onReload={setContactMgs}
                                refreshData={refreshData}

                            />

                            {/* status updated modal */}
                            <Modal title="" visible={isModalVisible} onCancel={handleCancel} destroyOnClose footer={null}>
                                <StatusUpdateModal status={updateStatus} setRefreshData={setRefreshData} handleCancel={handleCancel} />
                            </Modal>


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
                        </section>
                    </div>

                </div>
            </section>
        </>
    );
};
CusmoterEmailContact.layout = AdminLayout
export default CusmoterEmailContact;