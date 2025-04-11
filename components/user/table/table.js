import React, { useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect } from 'react';


const Table = ({ data, columns, handleSort, ID }) => {
    let [hiddenSpinner, setHiddenSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setHiddenSpinner(false)
        }, 5000);
    }, [])


    return (
        <div className='h-full overflow-auto'>
            <table className='table-auto border-collapse border-0 border-slate-500 w-full test-center tableContainer mt-4'>
                <thead>
                    <tr>
                        {!!ID ? "" : <th className={`border border-slate-300 p-2 text-left`}>SN</th>}
                        {
                            columns?.map((column, index) => (
                                <th key={index} className="border border-slate-300 p-2">
                                    <div className={`flex ${column.icon ? 'justify-between' : 'justify-center'} items-center`}>
                                        <span>{column.headerName}</span>
                                        {column.icon && <column.icon className='cursor-pointer opacity-40 hover:opacity-70' size={10} onClick={handleSort} />}
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
                                    <tr key={index}>
                                        {!!ID ? "" : <td className='border p-2'>{index + 1}</td>}
                                        {
                                            columns?.map((col, ind) => (
                                                <td key={ind} className='border p-2'>
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
        </div>
    );
};

export default Table;