import React from 'react';
import Table from "../../../../components/common/table";
import PageTitle from "../../../../components/common/page-title";
import AdminLayout from "../../../../layout/adminLayout";
import {useRouter} from "next/router";
import {delWhatsappMessage, fetchAllWhatsappMessage} from "../../../../helpers/backend_helper";
import  {useFetch} from "../../../../helpers/new_hooks";
import {Popover} from "antd";

const ScheduledWhatsappMessages = () => {

    const router = useRouter();
    const [allMails, gtAllMails] = useFetch(fetchAllWhatsappMessage, {status: 'scheduled'});

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
            dataField: 'scheduled_date',
            text: 'Scheduled Time',
            formatter: (cell) => new Date(cell).toLocaleString()
        },
        {
            dataField: 'group',
            text: 'Group Name',
            formatter: (cell, row) => <span
                className={'text-md font-semibold'}
                onClick={() => router.push(`/admin/marketing/manage_group/group_manage/${cell?._id}`)}>{cell?.name}</span>
        },
        {
            dataField: 'individual_number',
            text: 'Individual Number',
            formatter: (cell, row) => <span className={'text-md font-semibold'}>{cell}</span>
        },

        {
            dataField: 'status',
            text: 'Status',
            formatter: (cell) => cell === 'success' ?
                <span className={'text-md font-semibold text-green-500'}>{cell}</span> :
                <span className={'text-md font-semibold text-red-500'}>{cell}</span>
        }
    ];

    return (
        <div>
            <PageTitle title="Schedule Whatsapp Messages"/>
            <div className='bg-white rounded p-4'>
                <Table
                    pagination
                    columns={columns}
                    data={allMails}
                    onDelete={delWhatsappMessage}
                    shadow={false}
                    onReload={gtAllMails}
                />
            </div>
        </div>
    );
};

ScheduledWhatsappMessages.layout = AdminLayout;
export default ScheduledWhatsappMessages;
