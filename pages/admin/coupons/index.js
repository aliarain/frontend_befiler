import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { AiOutlineClose, AiFillCheckCircle } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
import Table from '../../../components/admin/table/table';
import { GiCheckMark } from "react-icons/gi";
import { useRouter } from 'next/router';
import { CouponCodeUpdateAPI, couponSetToUserRole, getAllCouponAPI, getAllUserRoleExceptAdminAPI } from '../../../helpers/backend_helper';
import swalAlert from '../../../components/common/swalAlert';
import deleteAction from '../../../components/common/delete';
import { useFetch } from '../../../helpers/hooks';
import { Select } from 'antd';
const { Option } = Select;
import { toast, ToastContainer } from 'react-toastify';
import AdminPermissions from "../permissions";


// display all coupon data and it's functionalities
const AdminCoupon = () => {
    const router = useRouter();
    const [couponData, getCouponData, { loading, error }] = useFetch(getAllCouponAPI);
    const [refreshData, setRefreshData] = useState(null);
    const [allUserRoleData, setAllUserRoleData] = useState([]);


    // fetch all relevant data and update state
    useEffect(() => {
        const data = {
            size: 10
        }
        getCouponData(data)

        setRefreshData(null)
    }, [refreshData])


    // fetch all user-role data
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(res => {
            if (res?.status === true) {
                setAllUserRoleData(res?.data)
            }
        })

        setRefreshData(null)
    }, [refreshData])


    // add new coupon code
    const handleAddNewCoupon = () => {
        router.push('/admin/coupons/create')
    }

    // edit
    const editHandleAction = (id) => {
        router.push(`/admin/coupons/edit?id=${id}`)
    }

    // user-role id and coupon id -> update user-role
    const onChangeSelection = (value, couponID) => {
        if ( !!value && !!couponID) {
            const bodyData = { couponID: couponID }
            const queryValue = { userRoleID: value }

            couponSetToUserRole(bodyData, queryValue).then(res => {
                if (res?.status === true) {
                    if (res?.update === 'deleted') {
                        toast.error(res?.message)
                    } else {
                        toast.success(res?.message)
                    }
                    setRefreshData(res?.update)
                } else {
                    toast.warning(res?.message)
                }
            })
        }
    };

    // handle delete
    const handleDeleteAction = async (id) => {
        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this coupon?', 'Yes, Delete')
        if (isConfirmed) {
            const data = { id }
            await deleteAction(data, 'coupon', setRefreshData)
        }
    }

    // control actions
    const actionHandler = async (id, value) => {
        if (value === 'disabled') {
            let { isConfirmed } = await swalAlert.confirm('Do you want to disable coupon?', "Yes, Disable");
            if (isConfirmed) {
                const data = { status: value }
                const query = { id }
                CouponCodeUpdateAPI(data, query).then(data => {
                    if (data?.status === true) {
                        setRefreshData(data?.data)
                    }
                })
            }

        } else {
            let { isConfirmed } = await swalAlert.confirm('Do you want to active coupon?', "Yes, Active");
            if (isConfirmed) {
                const data = { status: value }
                const query = { id }
                CouponCodeUpdateAPI(data, query).then(data => {
                    if (data?.status === true) {
                        setRefreshData(data?.data)
                    }
                })
            }
        }

    }


    const column = [
        {
            dataField: 'name', headerName: 'Coupon Name', formatter: name => (
                <div className='flex justify-center gap-4'>
                    <span className=''>{name}</span>
                </div>
            )
        },
        {
            dataField: 'value', headerName: 'Coupon Value', formatter: value => (
                <div className='flex justify-center gap-4'>
                    <span className='capitalize'>{value}</span>
                </div>
            )
        },
        {
            dataField: 'type', headerName: 'Coupon Type', formatter: type => (
                <div className='flex justify-center gap-4'>
                    <span className='capitalize'>{type}</span>
                </div>
            )
        },
        {
            dataField: 'assign', headerName: 'Assign Coupon', formatter: (_, data) => (
                <div className='flex justify-center gap-4 items-center'>
                    <Select
                        showSearch
                        allowClear
                        className='w-full'
                        placeholder="Select One"
                        optionFilterProp="children"
                        onChange={(e) => onChangeSelection(e, data?._id)}
                    >
                        {
                            allUserRoleData?.map((role, ind) => <Option value={role?._id} key={role?._id}>
                                <span className="flex gap-2 items-center">
                                    {role?.display_name}

                                    {
                                        role?.coupon_code?._id === data?._id &&
                                        <span className='text-green-500 cursor-pointer' title={`Already this coupon has been assigned`}> <AiFillCheckCircle size={15} /> </span>
                                    }
                                </span>
                            </Option>)
                        }
                    </Select>
                </div>
            )
        },
        {
            dataField: 'status', headerName: 'Coupon Status', formatter: status => (
                <div className='flex justify-center gap-4'>
                    <span className='capitalize'>{status}</span>
                </div>
            )
        },
        {
            dataField: '_id', headerName: 'Actions', formatter: _id => (
                <div className='flex justify-center gap-3'>
                    <span className='inline-block bg-cyan-500 hover:bg-cyan-600 p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => editHandleAction(_id)} title="Edit coupon code"><TiEdit /></span>
                    <span className='inline-block bg-green-500 hover:bg-green-600 p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => actionHandler(_id, 'active')} title="Active coupon code"><GiCheckMark /></span>
                    <span className='inline-block bg-yellow-500 hover:bg-yellow-600 p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => actionHandler(_id, 'disabled')} title="Disabled coupon code"><BiBlock /></span>
                    <span className='inline-block bg-red-500 hover:bg-red-600 p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => handleDeleteAction(_id)} title="Disabled coupon code"><AiOutlineClose /></span>
                </div>
            )
        },
    ]


    return (
        <>
            <section className='bg-gray-100 mx-2 rounded-md pt-12 min-h-screen'>
                <div className='p-4 bg-gray-50 m-4'>
                    <button className='btn-taxants text-white' onClick={handleAddNewCoupon}> <span>Add New Coupon</span></button>
                    <Table
                        columns={column}
                        data={couponData}
                        pagination={true}
                        loading={loading}
                        onReload={getCouponData}
                    />
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <small className={'text-purple-600 font-mono -tracking-wider'}>* You can't assign multiple coupon at a time for a user role</small>
                </div>
            </section>

            {/* toast message */}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};
AdminCoupon.layout = AdminLayout
export default AdminCoupon;