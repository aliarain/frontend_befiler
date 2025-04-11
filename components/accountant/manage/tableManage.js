import React, { useState } from 'react';
import Table from '../table/table';
import { Input, Space, Select, Modal, Radio, Divider } from 'antd';
const { Search } = Input;
const { Option } = Select;
import { MdAccountCircle } from "react-icons/md";


const TableManage = ({ titleData,
    data,
    columns,
    handleSort,
    onSearch,
    handleDataShow,
    ID,
    pagination,
    loading = false,
    onReload
}) => {


    return (
        <section className='bg-gray-50 m-4 rounded-t'>

            <div className='relative p-6' >
                {/* upper design */}
                <div className='h-12'>
                    <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                        <span> <MdAccountCircle size={35} /> </span>
                    </div>

                    <span className='capitalize ml-20 text-lg'>{titleData}</span>
                </div>

                {/* pagination and search */}
                <div className='input-container__employee md:flex md:justify-between'>
                    <div className='data-show-employee'>
                        <span className='text-gray-500 font-semibold mr-2'>Show</span>
                        <Select
                            placeholder='Select'
                            style={{
                                width: 120,
                            }}
                            onChange={handleDataShow}
                        >
                            <Option value="10">10</Option>
                            <Option value="25">25</Option>
                            <Option value="50">50</Option>
                            <Option value="100">100</Option>
                        </Select>
                        <span className='text-gray-500 font-semibold ml-2'>entries</span>
                    </div>
                    <div className='input-search-employee'>
                        <Search
                            placeholder="Search With ID"
                            onChange={onSearch}
                            allowClear
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                </div>
        
                {/* data show in table */}
                <Table
                    data={data}
                    columns={columns}
                    handleSort={handleSort}
                    ID={ID}
                    pagination={pagination}
                    loading={loading}
                    onReload={onReload}
                />
            </div>

        </section>
    );
};

export default TableManage;