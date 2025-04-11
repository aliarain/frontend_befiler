import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import {Input, Select, Switch, message, Checkbox, Drawer, Space, Button} from 'antd';
const { Search } = Input;
const { Option } = Select;
import { MdAccountCircle } from "react-icons/md";
import { getAllUserRoleExceptAdminAPI, getOnePdfExcelAPI, getUserFormControllerAPI, pdfExcelCreateAPI, updatePdfExcelAPI, updateUserFormControllerAPI } from '../../../helpers/backend_helper';
import moment from 'moment';
import { useFetch } from '../../../helpers/hooks';
import { useRouter } from 'next/router';
import FieldsTable from '../../../components/admin/table/fieldsTable';
import { RiDeleteBin6Line } from 'react-icons/ri';
import swalAlert from '../../../components/common/swalAlert';
import deleteAction from '../../../components/common/delete';
import Head from 'next/head';
import ViewAll from "./view-all";
import CreateNewField from "./create";


const StudentFields = () => {
    const router = useRouter();
    const [formFieldsData, setFormFieldsData, { loading, error }] = useFetch(getUserFormControllerAPI);
    const [refreshData, setRefreshData] = useState(null);
    const [fieldId, setFieldId] = useState(null)
    const [userRoleData, setUserRoleData] = useState([]);
    const [userFieldID, setUserFieldID] = useState('');
    const [pdfExcelData, setPdfExcelData] = useState([]);


    // reload or refresh state with data
    useEffect(() => {
        setFormFieldsData({
            size: 100,
            id: userFieldID
        })

        setRefreshData(null)
    }, [refreshData, userFieldID])


    // fetch all user-role except admin
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(info => {
            if (info?.status === true) {
                setUserRoleData(info?.data)
            }
        })
    }, []);


    // fetch specific pdf/excel data
    useEffect(() => {
        getOnePdfExcelAPI({ user_role: userFieldID }).then(res => {
            if (res?.status === true) {
                setPdfExcelData(res?.data?.pdf_excel_fields)
            }
        })

        setRefreshData(null)
    }, [userFieldID, refreshData]);


    // update form status
    const onChange = (checked, step) => {
        const data = { status: checked, step }
        const queryValue = { id: fieldId }
        updateUserFormControllerAPI(data, queryValue).then(data => {
            if (data?.status === true) {
                setRefreshData(data?.data);
                message.success('Status has changed!')
            }
        })

    };

    // user selection id
    const onChangeSearch = (value) => {
        setUserFieldID(value);
    };

    // view all fields
    const handleViewAll = () => {
        router.push('/admin/user-form-fields/view-all')
    }

    // delete
    const deleteHandleAction = async (id, step) => {
        let { isConfirmed } = await swalAlert.confirm(
            "Are you want to delete the tax file",
            "Yes, Delete"
        );
        if (isConfirmed) {
            const data = { id, step_name: step, user_name: userFieldID };
            await deleteAction(data, "deleteUserFormFieldFromSpecificUser", setRefreshData);
        }
    };

    // handle Pdf Excel Sheet Data -> add or remove to/from DB
    const handlePdfExcelSheetData = (e, data) => {
        const bodyData = {
            user_role: userFieldID,
            add_field: data
        }

        if (e.target.checked === true) {
            bodyData.add_field.checked = true;
            pdfExcelCreateAPI(bodyData).then(res => {
                if (res?.status === true) {
                    message.success(res?.message)
                    setRefreshData(res?.message)
                } else {
                    message.success(res?.message)
                }
            })

        } else {
            updatePdfExcelAPI(data, { id: userFieldID }).then(res => {
                if (res?.status === true) {
                    message.success(res?.message)
                    setRefreshData(res?.message)
                } else {
                    message.success(res?.message)
                }
            })
        }
    }

    // check; is it included into pdf Database, or not? (form fields)
    function checkField(dt) {
        for (let i = 0; i < pdfExcelData?.length; i++) {
            let ele = pdfExcelData[i];
            if (ele?._id === dt?._id) {
                return true
            }
        }
    }

    // step one
    const column1 = [
        {
            dataField: 'input_name', headerName: 'Name', formatter: input_name => (
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
            dataField: 'field_required', headerName: 'Required', formatter: (_, data) => (
                <div className='flex justify-center'>
                    <span className=''>{data?.field_required == true ? <span className='text-green-500 font-semibold'>Yes</span> : <span className='text-purple-500 font-semibold'>No</span>}</span>
                </div>
            )
        },
        {
            dataField: 'status', headerName: 'Status', formatter: (status, data) =>
            (
                <div className='flex justify-center'>
                    {
                        status === true ?

                            <Switch onChange={(e) => onChange(e, 'step_one')} onFocus={() => setFieldId(data?._id)} defaultChecked />
                            :
                            <Switch onChange={(e) => onChange(e, 'step_one')} onFocus={() => setFieldId(data?._id)} />
                    }
                </div>
            )
        },
        {
            dataField: 'status', headerName: 'PDF/Excel', formatter: (status, data) =>
            (
                <span className='flex justify-center' title='Add this field in pdf or excel file'>
                    <Checkbox
                        checked={checkField(data)}
                        onChange={(e) => handlePdfExcelSheetData(e, data)}
                    />
                </span>
            )
        },
        {
            dataField: 'status', headerName: 'Action', formatter: (status, data) =>
            (
                <span className='flex justify-center' onClick={() => deleteHandleAction(data?._id, 'step_one')} title="Delete this tax file">
                    <RiDeleteBin6Line size={22} className='text-red-500 hover:text-red-600 cursor-pointer' title='Delete this field' />
                </span>
            )
        },
    ]

    // step two
    const column2 = [
        {
            dataField: 'input_name', headerName: 'Name', formatter: input_name => (
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
            dataField: 'field_required', headerName: 'Required', formatter: (_, data) => (
                <div className='flex justify-center'>
                    <span className=''>{data?.field_required == true ? <span className='text-green-500 font-semibold'>Yes</span> : <span className='text-purple-500 font-semibold'>No</span>}</span>
                </div>
            )
        },
        {
            dataField: 'status', headerName: 'Status', formatter: (status, data) =>
            (
                <div className='flex justify-center'>
                    {
                        status === true ?

                            <Switch onChange={(e) => onChange(e, 'step_two')} onFocus={() => setFieldId(data?._id)} defaultChecked />
                            :
                            <Switch onChange={(e) => onChange(e, 'step_two')} onFocus={() => setFieldId(data?._id)} />
                    }
                </div>
            )
        },
        {
            dataField: 'status', headerName: 'PDF/Excel', formatter: (status, data) =>
            (
                <span className='flex justify-center' title='Add this field in pdf or excel file'>
                    <Checkbox
                        checked={checkField(data)}
                        onChange={(e) => handlePdfExcelSheetData(e, data)}
                    />
                </span>
            )
        },
        {
            dataField: 'status', headerName: 'Action', formatter: (status, data) =>
            (
                <span className='flex justify-center' onClick={() => deleteHandleAction(data?._id, 'step_two')} title="Delete this tax file">
                    <RiDeleteBin6Line size={22} className='text-red-500 hover:text-red-600 cursor-pointer' title='Delete this field' />
                </span>
            )
        },
    ]

    // drawer state and open, close control
    const [visible, setVisible] = useState(false);
    const showDrawer = (data) => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    // drawer responsive
    const [drawerWidth, setDrawerWidth] = useState(null)
    useEffect(() => {
        if (window.innerWidth > 700) {
            setDrawerWidth(700)
        } else {
            setDrawerWidth(400)
        }
    }, [])

    useEffect(() => {
        if(userRoleData?.length > 0) {
            setUserFieldID(userRoleData[0]?._id);
        }
    },[userRoleData])

    return (
        <>
            <section className='bg-gray-100 mx-2 rounded-md pt-12 min-h-screen'>
                <Head>
                    <title>Form Fields</title>
                </Head>

                <div className='relative p-6' >
                    {/* upper design */}
                    <div className='h-12 md:flex md:justify-between mb-8 md:mb-0'>
                        <div>
                            <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                                <span> <MdAccountCircle size={35} /> </span>
                            </div>
                            <span className='capitalize ml-20'>User Form Fields</span>
                        </div>

                        <div className='block h-2 md:hidden md:h-0'></div>

                        <div className=''>
                            <span className='bg-purple-500 hover:bg-purple-600 px-2 py-2 rounded-md cursor-pointer text-white inline-block mr-2' onClick={showDrawer}>Add New Field</span>
                            <span className='bg-purple-500 hover:bg-purple-600 px-2 py-2 rounded-md cursor-pointer text-white inline-block' onClick={handleViewAll}>View Common Fields</span>
                        </div>
                    </div>

                    {/* select user */}
                    <div className='mx-auto'>
                        <div className='w-full md:w-2/3 mx-auto flex items-center'>
                            <span className='text-[16px] w-[150px] text-center'>Select User : </span>
                            <Select
                                showSearch
                                className='w-full'
                                placeholder={!!userRoleData ? userRoleData[0]?.display_name :"Select One"}
                                optionFilterProp="children"
                                onChange={onChangeSearch}
                                allowClear
                            >
                                {
                                    userRoleData?.map((role, ind) => <Option value={role?._id} key={role?._id}>{role?.display_name}</Option>)
                                }
                            </Select>
                        </div>
                    </div>

                    {/* step one */}
                    <div className='-space-y-4'>
                        <span className='bg-green-500 text-white rounded-md px-2 py-1 shadow-sm text-[16px] inline-block mt-10 border-b-2'>Form Input : Step One </span>
                        {/* data show in table */}
                        <FieldsTable
                            data={formFieldsData?.step_one}
                            columns={column1}
                            pdfExcelData={pdfExcelData}
                            onReload={setFormFieldsData}
                            pagination={false}
                        />
                    </div>

                    {/* step two */}
                    <div className='-space-y-4'>
                        <span className='bg-purple-500 text-white  rounded-md px-2 py-1 shadow-sm text-[16px] inline-block mt-10 border-b-2'>Form Input : Step Two </span>
                        {/* data show in table  */}
                        <FieldsTable
                            data={formFieldsData?.step_two}
                            columns={column2}
                            onReload={setFormFieldsData}
                            pagination={false}
                            pdfExcelData={pdfExcelData}
                        />
                    </div>
                </div>

                {/* drawer open */}
                <Drawer
                    title="Create a new form field"
                    width={drawerWidth}
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{
                        paddingBottom: 80,
                    }}
                    destroyOnClose
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>

                        </Space>
                    }
                >
                    <CreateNewField setRefreshData={setRefreshData} onClose={onClose} />
                </Drawer>
            </section>
        </>
    );
};
StudentFields.layout = AdminLayout
export default StudentFields;