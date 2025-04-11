import React, {useState} from 'react';
import AdminLayout from "../../../../layout/adminLayout";
import Table from "../../../../components/common/table";
import PageTitle from "../../../../components/common/page-title";
import {Form, Popover,} from "antd";
import {userAction, useFetch} from "../../../../helpers/new_hooks";
import {useRouter} from "next/router";
import {delMarketingEmail, fetchAllMails} from "../../../../helpers/backend_helper";
import Button from "../../../../components/common/button";
import {TiTick} from "react-icons/ti";
import {ImCross} from "react-icons/im";

const ScheduledEmails = () => {

    const [form] = Form.useForm();
    const router = useRouter();
    const [allMails, gtAllMails] = useFetch(fetchAllMails, {status: 'scheduled'});
    const columns = [
        {
            dataField: 'subject',
            text: 'Subject',
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
            dataField: 'content',
            text: 'Content',
            formatter: (cell) => (
                <span className='capitalize'>
                    <Popover content={<div className='max-w-sm'>{extractContent(cell)}</div>}>
                <span
                    className='capitalize'>{extractContent(cell)?.length > 20 ? `${extractContent(cell).slice(0, 20)}...` : extractContent(cell)}
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
            dataField: 'individual_mail',
            text: 'To Individual',
        },
        {
            dataField: 'group',
            text: 'To Group',
            formatter: (cell, row) =>
                cell?.name ? <Button
                    className={'text-md font-semibold'}
                    onClick={() => router.push(`/admin/marketing/manage_group/group_manage/${cell?._id}`)}>{cell?.name}
                </Button> : '...'
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

    return (<div>
            <PageTitle title="Schedule Email"/>
            <div className='bg-white rounded p-4'>
                <Table
                    pagination
                    columns={columns}
                    data={allMails}
                    onDelete={delMarketingEmail}
                    shadow={false}
                    onReload={gtAllMails}
                    // loading={loading}
                />
            </div>
        </div>
    );
};

ScheduledEmails.layout = AdminLayout;
export default ScheduledEmails;


function extractContent(htmlString) {
    var span = document.createElement('span');
    span.innerHTML = htmlString;
    return span.textContent || span.innerText;
};
