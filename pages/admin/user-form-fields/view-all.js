import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { Input, Space, Select, Modal, Switch, message, Drawer, Button } from 'antd';
const { Search } = Input;
const { Option } = Select;
import { MdAccountCircle } from "react-icons/md";
import Table from '../../../components/admin/table/table';
import { getAllFormFieldAPI, updateFormFieldAPI } from '../../../helpers/backend_helper';
import moment from 'moment';
import { useFetch } from '../../../helpers/hooks';
import { IoReturnUpBack } from "react-icons/io5";
import { useRouter } from 'next/router';
import CreateNewField from './create';
import { RiDeleteBin6Line } from 'react-icons/ri';
import swalAlert from '../../../components/common/swalAlert';
import deleteAction from '../../../components/common/delete';
import UserDetails from "../users/details";


const ViewAll = () => {
    const router = useRouter();
    const [formFieldsData, setFormFieldsData, { loading, error }] = useFetch(getAllFormFieldAPI);
    const [refreshData, setRefreshData] = useState(null);
    const [fieldId, setFieldId] = useState(null)


    // fetch relevant data and state update
    useEffect(() => {
        setFormFieldsData({
            size: 100
        })

        setRefreshData(null);
    }, [refreshData])


    // update form field status
    const onChange = (checked) => {
        const data = { status: checked }
        const queryValue = { id: fieldId }
        updateFormFieldAPI(data, queryValue).then(data => {
            if (data?.status === true) {
                setRefreshData(data?.data);
                message.success('Status has changed!')
            }
        })

    };

    const handleBack = () => {
        router.push('/admin/user-form-fields')
    }

    // delete
    const deleteHandleAction = async (id) => {
        let { isConfirmed } = await swalAlert.confirm(
            "Are you want to delete the tax file",
            "Yes, Delete"
        );
        if (isConfirmed) {
            const data = { id };
            await deleteAction(data, "userFormField", setRefreshData);
        }
    };

    const column = [
        {
            dataField: 'field_name', headerName: 'Name', formatter: input_name => (
                <div className='text-left pl-5'>
                    <span className='capitalize'>{input_name.split('_').join(' ')}</span>
                </div>
            )
        },
        {
            dataField: 'input_type', headerName: 'Type', formatter: input_type => (
                <div className='flex justify-center'>
                    <span className='capitalize text-left'>{input_type}</span>
                </div>
            )
        },
        {
            dataField: 'createdAt', headerName: 'Added', formatter: createdAt => (
                <div className='flex justify-center'>
                    <span className='capitalize'>{moment(createdAt).format('L')}</span>
                </div>
            )
        },
        {
            dataField: 'field_required', headerName: 'Required', formatter: (_,data) => (
                <div className='flex justify-center'>
                    <span className=''>{data?.field_required==true ? <span className='text-green-500 font-semibold'>Yes</span> : <span className='text-purple-500 font-semibold'>No</span>}</span>
                </div>
            )
        },
        {
            dataField: 'step_name', headerName: 'Step', formatter: step_name => (
                <div className='flex justify-center'>
                    {
                        step_name === 'step_one' ?
                            <span className='capitalize bg-emerald-500 text-white px-2 py-1 rounded-md'>{step_name}</span>
                            :
                            <span className='capitalize bg-purple-500 text-white px-2 py-1 rounded-md'>{step_name}</span>
                    }
                </div>
            )
        },
        {
            dataField: 'status', headerName: 'Status', formatter: (status, data) =>
            (
                <div className='flex justify-center'>
                    {
                        status === true ?

                            <Switch onChange={onChange} onFocus={() => setFieldId(data?._id)} defaultChecked />
                            :
                            <Switch onChange={onChange} onFocus={() => setFieldId(data?._id)} />
                    }
                </div>
            )


        },
        {
            dataField: 'status', headerName: 'Action', formatter: (status, data) =>
            (
                <span className='flex justify-center' onClick={() => deleteHandleAction(data?._id)} title="Delete this tax file">
                    <RiDeleteBin6Line size={22} className='text-red-500 hover:text-red-600 cursor-pointer' title='Delete this field' />
                </span>
            )


        },
    ]



    return (
        <>
            <section className='bg-gray-50 m-4 rounded-t min-h-screen'>

                <div className='relative p-6' >
                    {/* upper design */}
                    <div className='h-12 flex justify-between'>
                        <div>
                            <div>
                                <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                                    <span> <MdAccountCircle size={35} /> </span>
                                </div>

                                <span className='capitalize ml-20'>User Form Fields</span>
                            </div>

                            <span className='my-3 underline flex items-center gap-1 cursor-pointer' onClick={handleBack}> <span> <IoReturnUpBack /> </span> <span>Back</span> </span>
                        </div>
                    </div>

                    <Table
                        data={formFieldsData}
                        columns={column}
                        onReload={setFormFieldsData}
                        pagination={false}
                        loading={loading}
                    />
                </div>
            </section>
        </>
    );
};

ViewAll.layout = AdminLayout
export default ViewAll;