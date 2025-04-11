import React from 'react';
import AdminLayout from "../../../../layout/adminLayout";
import PageTitle from "../../../../components/common/page-title";
import {useRouter} from "next/router";
import {fetchAllMarketingUsers, postMarketingUser,} from "../../../../helpers/backend_helper";
import {userAction, useFetch} from "../../../../helpers/new_hooks";
import Table from "../../../../components/common/table";

const BannedUsers = () => {
    const {query} = useRouter()
    const [allUsers, getAlleUsers] = useFetch(fetchAllMarketingUsers, {marketing_status: 'banned'})
    const columns = [
        {
            dataField: 'username', text: 'User Name',
        },
        {
            dataField: 'phone', text: 'Contacts',
        },
        {
            dataField: 'email', text: 'Email'
        },

        {
            dataField: 'marketing_status', text: 'Status', formatter: (d, dd) => {
                return <div
                    className="text-red-600 font-semibold">Banned</div>
            }
        }
    ];

    const handleUser = async (values) => {
        const payload = {_id: values._id, marketing_status: 'active'}
        userAction(postMarketingUser, payload, () => getAlleUsers());
    }

    return (
        <>
            <PageTitle title={`Banned Users`}/>
            <Table
                pagination
                columns={columns}
                actions={(values) => <div
                    className="bg-off_purple px-2 py-1 bg-green-600 text-white rounded cursor-pointer"
                    onClick={() => handleUser(values)}>Make User Active
                </div>}
                data={allUsers}
                shadow={false}
                onReload={getAlleUsers}
            />
        </>
    );
};

BannedUsers.layout = AdminLayout;
export default BannedUsers;

