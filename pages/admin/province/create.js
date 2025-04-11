import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdLocationCity } from "react-icons/md";
import { Form, Input, message, Select, Button, Space } from 'antd';
const { Option } = Select;
import AdminLayout from '../../../layout/adminLayout';
import { getAllUserRoleExceptAdminAPI, provinceCreateAPI, updateProvinceAPI } from '../../../helpers/backend_helper';
import { useRouter } from 'next/router';
import { MinusCircleOutlined } from '@ant-design/icons';


const AddProvince = ({ id, form, update = null }) => {
    const { push } = useRouter();
    const [userRoleData, setUserRoleData] = useState([]);

    // get all user role except admin
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(info => {
            if (info?.status === true) {
                setUserRoleData(info?.data)
            }
        })
    }, []);

    // add new province form handler
    const onFinish = (values) => {
        if (!!update && !!id) {
            const query = { id };
            updateProvinceAPI(values, query).then(data => {
                if (data?.status === true) {
                    message.success(data?.message);
                    push('/admin/province')
                } else {
                    message.error(data?.message);
                }
            })

        } else {
            provinceCreateAPI(values).then(data => {
                if (data?.status === true) {
                    message.success(data?.message);
                    push('/admin/province')
                }
            })
        }
    };


    return (
        <>
            <section className='m-8'>
                <div>
                    <h1 className='text-3xl font-light text-gray-700'> {update ? "Update Province" : "Add New Province"}</h1>
                    <div className='px-4 text-lg text-gray-500'>
                        <Link href='/admin/province/'><span className='text-[#9124A3] hover:cursor-pointer'>Province </span></Link>
                        <span>/</span>
                        <span> {update ? "Update Province" : "Add New Province"}</span>
                    </div>
                </div>
            </section>

            <section className='mx-8 my-16 pb-15 min-h-screen'>
                <div className='shadow-lg relative rounded bg-white p-4'>
                    {/* upper style */}
                    <div className='h-12'>
                        <div className='absolute w-16 h-16 shadow flex justify-center rounded -top-5 items-center bg-[#9124A3]'>
                            <span><MdLocationCity size={30} className='text-white' /></span>
                        </div>
                        <span className='ml-20 text-xl text-gray-500'>Province Details</span>
                    </div>
                    {/* add new province  */}
                    <div className='w-full h-auto md:flex justify-center text-gray-500 text-base pb-2'>
                        <div className='md:w-full lg:w-1/2'>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                initialValues={{ remember: true }}
                            >
                                {/* username field */}
                                <Form.Item
                                    label="Country / State / Province Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your province name!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter country or state or province name" bordered={false} style={{ borderBottom: "1px solid #A7A7A7" }} />
                                </Form.Item>

                                <Form.Item
                                    label="Select a Role"
                                    name="user_role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select user!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        className='w-full'
                                        placeholder="Select a user role"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    >
                                        {
                                            userRoleData?.map((role, ind) => <Option value={role?.name} key={role?._id}>{role?.display_name}</Option>)
                                        }
                                    </Select>
                                </Form.Item>

                                {/* tax name and percentage */}
                                <Form.List name="tax_info">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} className='block' align="baseline">
                                                    <div className='grid grid-cols-2 gap-3'>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'tax_name']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Tax name is required'
                                                                },
                                                            ]}
                                                            extra={'For example: GST or HST etc tax name'}
                                                        >
                                                            <Input placeholder='Tax Name' />
                                                        </Form.Item>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'tax_percentage']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Tax value is required'
                                                                },
                                                            ]}
                                                            extra={'For example: 5 or 10 etc decimal number'}
                                                        >
                                                            <Input placeholder='Tax Percentage (%)' />
                                                        </Form.Item>
                                                    </div>

                                                    <p className='text-red-500 font-bold'><MinusCircleOutlined onClick={() => remove(name)} /></p>
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block>
                                                    <span className='text-green-700'> + Add Tax</span>

                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                                <div className='flex justify-end'>
                                    <Form.Item style={{ width: '100%', marginTop: '20px' }}>
                                        <button type="submit" className='bg-[#9C27B0] hover:bg-[#9124A3] text-white w-48 mr-14 px-6 py-2 rounded'>
                                            Save
                                        </button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
AddProvince.layout = AdminLayout
export default AddProvince;