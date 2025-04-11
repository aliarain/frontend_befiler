import React, { useEffect, useState } from 'react';
import Table from '../table/table';
import { Input, Select, Tooltip } from 'antd';
const { Search } = Input;
const { Option } = Select;
import { MdAccountCircle } from "react-icons/md";
import FileExportHome from '../../files/export';
import { getAllUserRoleExceptAdminAPI } from '../../../helpers/backend_helper';


const TableManage = ({
    titleData, data, columns,
    handleSortData, onSearch, handleDataShow,
    ID, handleAccountantSelectChange, assignAccount = false,
    accountantData = [], assignAccountant, downloadSelectedFile = false,
    oneTaxFileSelectedIDs = [], taxFileID, downloadAllFile = false,
    pagination, loading = false, onReload, handlerFilterUser, ratting,
    handleRatting, show_data, selectedTaxFileData, allChecked = false, SNSort
}) => {

    // fetch all user-role except admin
    const [userRoleData, setUserRoleData] = useState([]);
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(info => {
            if (info?.status === true) {
                setUserRoleData(info?.data)
            }
        })
    }, []);


    return (
        <section className='bg-gray-50 m-4 rounded-t'>

            <div className='relative p-6 mb-10'>
                {/* upper design */}
                <div className='h-12 md:flex md:justify-between'>
                    <div>
                        <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                            <span> <MdAccountCircle size={35} /> </span>
                        </div>

                        <span className='capitalize whitespace-pre ml-20'>{titleData}</span>
                    </div>

                    <div className='block h-5 md:hidden md:h-0'></div>

                    <div className='space-x-3'>
                        {/* download files */}
                        {
                            (downloadSelectedFile === true && allChecked === false) &&
                            <div className=' bg-green-500 px-2 py-1 rounded-md hover:bg-green-600 cursor-pointer inline-block'>
                                <FileExportHome finalData={selectedTaxFileData} allFile={true} />
                            </div>
                        }
                        <div className='block h-2 md:hidden md:h-0'></div>
                        {
                            allChecked === true &&
                            <div className=' bg-green-500 px-2 py-1 rounded-md hover:bg-green-600 cursor-pointer inline-block'>
                                <FileExportHome finalData={data?.docs} allFile={true} titleAll='All-TaxFile' />
                            </div>
                        }

                        {
                            downloadAllFile === true &&
                            <div className='bg-purple-500 px-2 py-1 rounded-md hover:bg-purple-600 cursor-pointer inline-block'>
                                <FileExportHome finalData={data?.docs} titleAll='All-TaxFile' downloadAll={true} />
                            </div>
                        }
                    </div>
                </div>

                <div className={`block ${titleData==="all Tax Files"? "h-20":"h-0"} md:hidden md:h-0`}></div>

                {/* pagination and search */}
                <div className='input-container__employee md:flex md:justify-between'>
                    <div className='data-show-employee'>
                        {
                            show_data === false ?
                                <></>
                                :
                                <div>
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
                        }
                    </div>

                    <div className='block h-2 md:hidden md:h-0'></div>

                    <div className='input-search-employee md:flex md:gap-2'>
                        {
                            handlerFilterUser && <div className=''>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{
                                        width: 140,
                                    }}
                                    className='w-full'
                                    placeholder='Filter User'
                                    optionFilterProp="children"
                                    onChange={handlerFilterUser}
                                >
                                    {
                                        userRoleData?.map((role, ind) => <Option value={role?.name} key={role?._id}>{role?.display_name}</Option>)
                                    }
                                </Select>
                            </div>
                        }

                        <div className='block h-2 md:hidden md:h-0'></div>
                        
                        {
                            ratting ?
                                <Select
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={handleRatting}
                                    placeholder='Filter by ratting'
                                    allowClear
                                >
                                    <Option value={1}>1</Option>
                                    <Option value={2}>2</Option>
                                    <Option value={3}>3</Option>
                                    <Option value={4}>4</Option>
                                    <Option value={5}>5</Option>
                                </Select>
                                :
                                <Search
                                    placeholder="Search"
                                    onChange={onSearch}
                                    style={{
                                        width: 200,
                                    }}
                                    allowClear
                                />
                        }
                    </div>
                </div>


                {/* data show in table */}
                <Table
                    data={data}
                    columns={columns}
                    handleSortData={handleSortData}
                    ID={ID}
                    oneTaxFileSelectedIDs={oneTaxFileSelectedIDs}
                    taxFileID={taxFileID}
                    pagination={pagination}
                    loading={loading}
                    onReload={onReload}
                    SNSort={SNSort}
                />


                {/* assign to accountant */}
                {
                    assignAccount === true &&
                    <div className='mt-4'>
                        <Tooltip placement="top"
                            title={(oneTaxFileSelectedIDs.length === 0 && allChecked === false) && 'Please select at least one tax file'}
                            color='#26C158'
                        >
                            <Select
                                className='w-full md:w-1/3'
                                onChange={handleAccountantSelectChange}
                                placeholder='Select an accountant'
                                disabled={(oneTaxFileSelectedIDs.length === 0 && allChecked === false) && true}
                            >
                                {
                                    accountantData?.map(ac => <Option value={ac?._id} key={ac?._id} className='w-full'
                                    >
                                        {ac?.ID} - {ac?.username} - {ac?.email}
                                    </Option>)
                                }
                            </Select>
                        </Tooltip>

                        <button className='bg-green-500 text-white px-3 py-2 rounded-sm ml-0 md:ml-2 text-[13px] font-medium mt-2 md:mt-0 hover:bg-green-600 hover:shadow-md' onClick={assignAccountant}>ASSIGN ACCOUNTANT</button>
                    </div>
                }


                {/* download files */}
                {
                    (downloadSelectedFile === true && allChecked === false) &&
                    <div className='items-center gap-2 text-base bg-green-500 hover:bg-green-600 text-white rounded p-2 inline-block mt-5'>
                        <FileExportHome finalData={selectedTaxFileData} allFile={true} />
                    </div>
                }

                {
                    allChecked === true &&
                    <div className='items-center gap-2 text-base bg-green-500 hover:bg-green-600 text-white rounded p-2 inline-block mt-5'>
                        <FileExportHome finalData={data?.docs} allFile={true} titleAll='All-TaxFile' />
                    </div>
                }

            </div>

        </section>
    );
};

export default TableManage;