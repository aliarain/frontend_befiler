import React, { useEffect, useState } from "react";
import TableManage from "../../../components/admin/manage/tableManage";
import AdminLayout from "../../../layout/adminLayout";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { BsArrowDownUp } from "react-icons/bs";
import moment from "moment";
import { getAllUsersData } from "../../../helpers/backend_helper";
import swalAlert from "../../../components/common/swalAlert";
import deleteAction from "../../../components/common/delete";
import { useRouter } from "next/router";
import { useFetch } from "../../../helpers/hooks";
import Head from "next/head";
import { UserDataSortingHelper } from "../../../components/files/sorting";
import Admin from "../index";


const AdminUsersPage = () => {
    const { push } = useRouter();
    const [usersData, getUsersData, { loading, error }] = useFetch(getAllUsersData);
    const [refreshData, setRefreshData] = useState(null);

    const [searchValue, setSearchValue] = useState(null)
    const [displayNumber, setDisplayNumber] = useState('')
    const [sortData, setSortData] = useState(false)
    const [filterUser, setFilterUser] = useState('');

    // fetch all relevant data and update state
    useEffect(() => {
        const data = {
            searchValue: searchValue,
            numberOfRow: displayNumber,
            sortData,
            filterUser,
            size: 50
        }
        getUsersData(data)

        setRefreshData(null);
    }, [refreshData, searchValue, displayNumber, sortData, filterUser]);

    // details view
    const handleDetails = (id) => {
        push(`/admin/users/details?id=${id}`);
    };

    // edit
    const editHandleAction = (id) => {
        push(`/admin/users/edit?id=${id}`);
    };

    // delete
    const deleteHandleAction = async (id) => {
        let { isConfirmed } = await swalAlert.confirm(
            "Are you want to delete the current user?",
            "Yes, Delete"
        );
        if (isConfirmed) {
            const data = { userId: id };
            await deleteAction(data, "admin", setRefreshData);
        }
    };

    // handle on search 
    const onSearch = (e) => {
        const value = (e.target.value).trim();
        setSearchValue(value)
    }

    // filter user
    const handlerFilterUser = (user) => {
        setFilterUser(user)

    }

    // handle Sorting data
    const handleSort = () => {
        setSortData(!sortData)
    };

    // handle display number
    const handleDataShow = e => {
        setDisplayNumber(e)
    }


    // handle Accountant Sorting data
    const [sortToggle, setSortToggle] = useState(false);
    const handleSortData = async (data) => {
        await UserDataSortingHelper(data, sortToggle, setSortData, setSortToggle)
    };


    const column = [
        {
            dataField: "username", headerName: <span className='flex justify-between items-center gap-4 cursor-pointer' onClick={() => handleSortData('username')}>Username {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>,
            formatter: (username, data) => <span className="whitespace-pre">{username}</span>
        },
        {
            dataField: "email", headerName: <span className='flex justify-between items-center gap-4 cursor-pointer' onClick={() => handleSortData('email')}>Email {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>,
            formatter: (email, data) => <span className="whitespace-pre">{email}</span>
        },
        {
            dataField: "userStatus",
            headerName: <span className='flex justify-between items-center gap-4 cursor-pointer' onClick={() => handleSortData('userStatus')}>Status {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>,
            formatter: (statusData) => (
                <span
                    className={`${statusData === "active"
                        ? "bg-green-500"
                        : statusData === 'banned' ? 'bg-red-500' : "bg-amber-500"
                        } text-white px-2 py-1 rounded text-[12px] font-mono capitalize`}
                >
                    {statusData}
                </span>
            ),
        },
        {
            dataField: "role", headerName: <span className='flex justify-between items-center gap-4 cursor-pointer' onClick={() => handleSortData('role')}>Role {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>, formatter: (role, data) => <span className="flex justify-center">{role}</span>
        },
        {
            dataField: "city", headerName: <span className='flex justify-between items-center gap-4 cursor-pointer' onClick={() => handleSortData('city')}>City {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>,
            formatter: (_, data) =>
                <div>
                    {
                        data?.city ?
                            <span className="flex justify-center">{data?.city}</span>
                            :
                            <span className="flex justify-center">N/A</span>
                    }
                </div>
        },
        {
            dataField: "country", headerName: <span className='flex justify-between items-center gap-4 cursor-pointer' onClick={() => handleSortData('country')}>Country {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>,
            formatter: (_, data) =>
                <div>
                    {
                        data?.country ?
                            <span className="flex justify-center">{data?.country}</span>
                            :
                            <span className="flex justify-center">N/A</span>
                    }
                </div>
        },
        {
            dataField: "steps", headerName: <span className='flex justify-between items-center gap-4 cursor-pointer' onClick={() => handleSortData('steps')}>Steps {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>,
            formatter: (_, data) => <span className="flex justify-center">{data?.steps}</span>

        },
        {
            dataField: "createdAt",
            headerName: <span className='flex justify-between items-center gap-4 cursor-pointer' onClick={() => handleSortData('createdAt')}>Created {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>,
            formatter: (createdAt) => <span className="flex justify-center">{moment(createdAt).format("l")}</span>,
        },
        {
            dataField: "updatedAt",
            headerName: <span className='flex justify-between items-center gap-3 cursor-pointer' onClick={() => handleSortData('updatedAt')}> <span className="whitespace-pre">Last Update</span> {" "} <BsArrowDownUp className='text-gray-500 hover:text-gray-700 hover:cursor-pointer' size={12} /> </span>,
            formatter: (updatedAt) => <span className="flex justify-center">{moment(updatedAt).format("l")}</span>,
        },
        {
            dataField: "_id",
            headerName: "Actions",
            formatter: (_id, data) => (
                <div className="flex justify-around gap-2">
                    <span
                        className="inline-block bg-green-500 hover:bg-green-600 p-[4px] rounded-[3px] text-white cursor-pointer"
                        onClick={() => handleDetails(_id)}
                        title="Details of this account"
                    >
                        <AiFillEye />
                    </span>
                    <span
                        className="inline-block bg-orange-500 hover:bg-orange-600 p-[4px] rounded-[3px] text-white cursor-pointer"
                        onClick={() => editHandleAction(_id)}
                        title="Edit this account"
                    >
                        <TiEdit />
                    </span>
                    {
                        data?.role !== 'admin' && <span
                            className="inline-block bg-red-500 hover:bg-red-600 p-[4px] rounded-[3px] text-white cursor-pointer"
                            onClick={() => deleteHandleAction(_id)}
                            title="Delete this account"
                        >
                            <RiDeleteBin6Line />
                        </span>
                    }
                </div>
            ),
        },
    ];


    return (
        <>
            <section className="bg-gray-100 mx-2 rounded-md pt-12 min-h-screen">
                <Head>
                    <title>All User</title>
                </Head>

                <TableManage
                    titleData="all users"
                    data={usersData}
                    columns={column}
                    onSearch={onSearch}
                    setRefreshData={setRefreshData}
                    handleSort={handleSort}
                    handleDataShow={handleDataShow}
                    pagination={true}
                    loading={loading}
                    onReload={getUsersData}
                    handlerFilterUser={handlerFilterUser}
                />
            </section>
        </>
    );
};
AdminUsersPage.layout = AdminLayout
export default AdminUsersPage;
