import React, { useEffect, useState } from 'react';
import Table from '../../../components/admin/table/table';
import AdminLayout from '../../../layout/adminLayout';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { getAllProvinceAPI, getAllUserRoleExceptAdminAPI } from '../../../helpers/backend_helper';
import deleteAction from '../../../components/common/delete';
import swalAlert from '../../../components/common/swalAlert';
import { useRouter } from 'next/router';
import { useFetch } from '../../../helpers/hooks';
import { Avatar, Button, Col, Divider, Drawer, List, Row, Space } from 'antd';
import ProvinceDrawerContainer from '../../../components/admin/province/province';
import TableManage from '../../../components/admin/manage/tableManage';
import RoleInfoEdit from "../roles/edit";



const AdminProvince = () => {
    const router = useRouter();
    const [provinceData, getProvinceData, { loading, error }] = useFetch(getAllProvinceAPI);
    const [refreshData, setRefreshData] = useState(null);
    const [userRoleData, setUserRoleData] = useState([]);
    const [provinceInfo, setProvinceInfo] = useState(null)
    const [searchValue, setSearchValue] = useState('')


    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(info => {
            if (info?.status === true) {
                setUserRoleData(info?.data)
            }
        })
    }, [])


    useEffect(() => {
        const data = {
            size: 10, searchValue: searchValue
        }
        getProvinceData(data)

        setRefreshData(null)
    }, [refreshData, searchValue])


    // search input
    const onSearch = (s) => {
        setSearchValue(s.target.value)
    }

    // create/add new province
    const handleAddNewProvince = () => {
        router.push('/admin/province/create')
    }

    // edit
    const editHandleAction = (id) => {
        router.push(`/admin/province/edit?id=${id}`)
    }

    // delete
    const deleteHandleAction = async (id) => {
        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this province?', 'Yes, Delete')
        if (isConfirmed) {
            const data = { id }
            await deleteAction(data, 'province', setRefreshData)
        }
    }


    // handle drawer
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const handleDrawer = (dWdata) => {
        setProvinceInfo(dWdata)
        setVisible(true);
    }


    const column = [
        {
            dataField: 'ID', headerName: '#ID', formatter: ID => (
                <div className='flex justify-center gap-4'>
                    <span className='capitalize'>{ID}</span>
                </div>
            )
        },
        {
            dataField: 'name', headerName: 'Name', formatter: name => (
                <div className='flex justify-center gap-4'>
                    <span className='capitalize'>{name}</span>
                </div>
            )
        },
        {
            dataField: 'user_role', headerName: 'User Role', formatter: user_role => (
                <div className='flex justify-center gap-4'>
                    <span className='capitalize'>{user_role}</span>
                </div>
            )
        },
        {
            dataField: 'gst_tax_rate', headerName: 'View Details', formatter: (_, data) => (
                <div className='flex justify-center gap-4'>
                    <span className='text-purple-500 hover:text-purple-600 underline cursor-pointer' onClick={() => handleDrawer(data)}>More</span>
                </div>
            )
        },
        {
            dataField: '_id', headerName: 'Actions', formatter: _id => (
                <div className='flex justify-center gap-3'>
                    <span className='inline-block bg-[#2C9FAF] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => editHandleAction(_id)} title="Edit this account"><TiEdit /></span>
                    <span className='inline-block bg-[#E02D1B] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => deleteHandleAction(_id)} title="Delete this account"><RiDeleteBin6Line /></span>
                </div>
            )
        },
    ]



    return (
        <>
            <section className='bg-gray-100 mx-2 rounded-md pt-12 min-h-screen'>
                <div className='p-4 bg-gray-50 my-4 relative'>
                    <div className='md:absolute md:top-3 md:right-5'>
                        <button className='btn-taxants text-white' onClick={handleAddNewProvince}>
                            Add New Province
                        </button>
                    </div>

                    <div className='block h-5 md:hidden md:h-0'></div>

                    <TableManage
                        titleData="Province Tax Information"
                        columns={column}
                        ID={true}
                        data={provinceData}
                        pagination={true}
                        loading={loading}
                        onReload={getProvinceData}
                        onSearch={onSearch}
                    />
                </div>
            </section>


            {/* drawer calling for more details view */}
            <Drawer
                title="Province Details"
                placement="right"
                closable={false}
                width={500}
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
                <ProvinceDrawerContainer provinceInfo={provinceInfo} setRefreshData={setRefreshData} />

            </Drawer>

        </>
    );
};
AdminProvince.layout = AdminLayout
export default AdminProvince;