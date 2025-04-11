import React from 'react';
import AdminLayout from "../../../../layout/adminLayout";
import PageTitle from "../../../../components/common/page-title";
import {useRouter} from "next/router";
import {fetchAllMarketingUsers, postMarketingUser,} from "../../../../helpers/backend_helper";
import {userAction, useFetch} from "../../../../helpers/new_hooks";
import Table from "../../../../components/common/table";

const AllUser = () => {
    const {query} = useRouter()
    const [allUsers, getAlleUsers] = useFetch(fetchAllMarketingUsers,)
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
            dataField: 'marketing_status',
            text: 'Status',
            formatter: (d, dd) =>
                dd.marketing_status === 'active' ? (
                        <p
                            className="text-green-600 font-semibold">
                            Active
                        </p>
                    ) :
                    (
                        <div className="text-red-600 font-semibold">
                            Banned
                        </div>
                    )
        }
    ];

    const handleUser = async (values) => {
        const payload = {_id: values._id, marketing_status: 'banned'}
        userAction(postMarketingUser, payload, () => getAlleUsers());
    }

    return (
        <>
            <PageTitle title={`All Users`}/>
            <Table
                pagination
                columns={columns}
                data={allUsers}
                onReload={getAlleUsers}
                noActions
                shadow={false}
            />
        </>
    );
};

AllUser.layout = AdminLayout;
export default AllUser;

