import React, {useState} from 'react';
import Table from "../../../../components/common/table";
import PageTitle from "../../../../components/common/page-title";
import {Form, Popover} from "antd";
import AdminLayout from "../../../../layout/adminLayout";
import {useRouter} from "next/router";
import {delMarketingSMS, fetchAllSMS} from "../../../../helpers/backend_helper";
import moment from "moment/moment";
import {TiTick} from "react-icons/ti";
import {ImCross} from "react-icons/im";
import {useFetch} from "../../../../helpers/new_hooks";


const FailedSms = () => {
    const router = useRouter();
    const [allMails, gtAllMails] = useFetch(fetchAllSMS, {status: 'failed'});
    const columns = [
        {
            dataField: 'content',
            text: 'Message Content',
            formatter: (cell) => (
                <span className='capitalize'>
                    <Popover content={<div className='max-w-sm'>{cell}</div>}>
                <span
                    className='capitalize'>{cell?.length > 20 ? `${cell.slice(0, 20)}...` : cell}
                </span>
            </Popover>
                </span>
            )
        },
        {
            dataField: 'updatedAt',
            text: 'Sent Time',
            formatter: (cell) => moment(cell).format('YYYY-MM-DD HH:mm')
        },
        {
            dataField: 'group',
            text: 'Group Name',
            formatter: (cell, row) =>
                <span
                    className={'text-md font-semibold'}
                    onClick={() => router.push(`/admin/marketing/manage_group/group_manage/${cell?._id}`)}
                >
                    {cell?.name}
                </span>
        }, {
            dataField: 'individual_number',
            text: 'Individual Number',
            formatter: (cell, row) =>
                <span className={'text-md font-semibold'}
                >
                    {cell}
                </span>
        },
        
        {
            dataField: 'status',
            text: 'Status',
            formatter: (cell) =>
                cell === 'success' ?
                    <span className={'text-md font-semibold text-green-500'}>{cell}</span> :
                    <span className={'text-md font-semibold text-red-500'}>{cell}</span>
        }
    ];

    return (
        <div>
            <PageTitle title=" Failed SMS"/>
            <div className='bg-white rounded p-4'>
                <Table
                    pagination
                    columns={columns}
                    data={allMails}
                    onDelete={delMarketingSMS}
                    shadow={false}
                    onReload={gtAllMails}
                />
            </div>
        </div>
    );
};

FailedSms.layout = AdminLayout;
export default FailedSms;
