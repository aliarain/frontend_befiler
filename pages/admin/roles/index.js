import React, { useEffect, useState } from 'react';
import { MdAccountCircle } from "react-icons/md";
import Table from '../../../components/admin/table/table';
import AdminLayout from '../../../layout/adminLayout';
import { TiEdit } from "react-icons/ti";
import { getRoleManagementAPI } from '../../../helpers/backend_helper';
import { useRouter } from 'next/router';
import { useFetch } from '../../../helpers/hooks';
import Head from 'next/head';
import CustomerContact from "../setting/contact";


// display all user-role and it's functionality
const AdminRules = () => {
    const router = useRouter();
    const [rolesData, getRolesData, { loading, error }] = useFetch(getRoleManagementAPI);
    const [refreshData, setRefreshData] = useState(null);

    // fetch all relevant data and update state
    useEffect(() => {
        const data = {
            size: 10
        }
        getRolesData(data)

        setRefreshData(null)
    }, [refreshData])

    // edit
    const editHandleAction = (role) => {
        router.push(`/admin/roles/edit?role=${role}`)
    }

    const column = [
        {
            dataField: '_id', headerName: 'Name', formatter: _id => (
                <div className='flex justify-center'>
                    <span className='capitalize font-mono text-sm'>{_id}</span>
                </div>
            )
        },
        {
            dataField: 'display_name', headerName: 'Display Name', formatter: display_name => (
                <div className='flex justify-center'>
                    <span className='capitalize font-mono text-sm'>{display_name}</span>
                </div>
            )
        },
        {
            dataField: 'total', headerName: 'Users with this role', formatter: total => (
                <div className='flex justify-center'>
                    <span className='capitalize font-mono text-sm bg-purple-600 px-3 pt-1  rounded-md text-white pb-[1px]'>{total}</span>
                </div>
            )
        },
        {
            dataField: '_id', headerName: 'Actions', formatter: _id => (
                <div className='flex justify-around'>
                    <span className='inline-block bg-[#9333EA] hover:bg-[#801fdb] p-[4px] rounded-[3px] text-white px-3 text-center cursor-pointer' onClick={() => editHandleAction(_id)} title="Update role info"><TiEdit size={20} /></span>
                </div>
            )
        },
    ]


    return (
        <>
            <section className='bg-gray-100 mx-2 rounded-md pt-12 min-h-screen'>
                <Head>
                    <title>Role-wise Number of Users</title>
                </Head>

                <div className='p-4 bg-gray-50 m-4 relative'>
                    <div className='h-12'>
                        <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                            <span> <MdAccountCircle size={35} /> </span>
                        </div>

                        <span className='capitalize ml-20'>All Roles</span>
                    </div>
                    <Table
                        columns={column}
                        data={rolesData}
                        pagination={true}
                        loading={loading}
                        onReload={getRolesData}
                    />
                </div>
            </section>
        </>
    );
};
AdminRules.layout = AdminLayout
export default AdminRules;