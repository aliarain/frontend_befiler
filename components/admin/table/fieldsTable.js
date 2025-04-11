import React, { useEffect, useState } from 'react';
import { BsArrowDownUp } from 'react-icons/bs';
import ReactPaginate from "react-paginate";
import PulseLoader from "react-spinners/PulseLoader";


const FieldsTable = ({
    data,
    columns,
    handleSortData,
    ID,
    oneTaxFileSelected,
    taxFileID,
    pagination,
    loading = false,
    onReload,
    SNSort,
    pdfExcelData
}) => {
    let [hiddenSpinner, setHiddenSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setHiddenSpinner(false)
        }, 3000);
    }, [])

    
    return (
        <div className='h-full overflow-auto'>
            <table className='table-auto border-collapse border-0 border-slate-500 w-full test-center tableContainer mt-4'>
                <thead>
                    <tr>
                        {!!ID ? "" : <th className={`border border-slate-300 p-2 text-center`}> SN </th>}

                        {
                            columns?.map((column, index) => (
                                <th key={index} className="border border-slate-300 p-2">
                                    <div className={`flex ${column.icon ? 'justify-between' : 'justify-center'} items-center`}>
                                        <span>{column.headerName}</span>
                                        {column.icon && <column.icon className='cursor-pointer opacity-40 hover:opacity-70' size={10} />}
                                    </div>
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                {
                    data?.length >= 1 ?
                        <tbody className='text-left text-gray-600'>
                            {

                                data?.map((d, index) => (
                                    <tr key={index} className={`${((d?.assigned_accountant?._id)) ? 'bg-gray-200' : 'hover:bg-slate-100'}`}>
                                        {!!ID ? "" : <td className={`border p-2 ${SNSort&& 'text-center'} text-center`}>{index + 1}</td>}
                                        {
                                            columns?.map((col, ind) => (
                                                <td key={ind} className={`border p-2`}>
                                                    {
                                                        typeof col?.formatter === 'function' ?
                                                            col?.formatter(d[col.dataField], d)
                                                            :
                                                            d[col.dataField]
                                                    }
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                        :
                        <tbody className='bg-[#F2F2F2]'>
                            <tr className='text-center'>
                                <td colSpan={`${+columns?.length + 1}`} className='w-full py-2 text-base font-semibold text-[#858796]'>
                                    {
                                        hiddenSpinner &&
                                        <span className='flex justify-center'>
                                            <PulseLoader color='green' size={15} />
                                        </span>
                                    }
                                    {
                                        (hiddenSpinner === false) && <p> No Data </p>
                                    }
                                </td>
                            </tr>
                        </tbody>
                }
            </table>

            {
                pagination &&
                <div className="flex justify-between pt-4 pb-2 border-t">
                    <p className="mb-0 text-sm text-gray-500">
                        Showing{" "}
                        {(pagination ? (data?.page - 1) * data?.limit : 0) + 1 || 0}
                        {" "}to{" "}
                        {Math.min(
                            data?.totalDocs,
                            pagination ? data?.page * data?.limit : 0
                        ) || 0}
                        {" "}of {data?.totalDocs || 0} entries
                    </p>
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel="Previous"
                        disabledLinkClassName="text-gray-300"
                        previousLinkClassName="text-sm bg-gray-100  hover:bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-l"
                        nextLinkClassName="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-r"
                        pageLinkClassName="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 px-4"
                        activeLinkClassName="text-primary"
                        nextLabel="Next"
                        className="flex"
                        onPageChange={({ selected }) =>
                            onReload({ page: selected + 1 })
                        }
                        pageRangeDisplayed={5}
                        pageCount={data?.totalPages || 1}
                        renderOnZeroPageCount={null}
                    />
                </div>
            }
        </div>
    );
};

export default FieldsTable;