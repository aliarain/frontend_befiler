import React from 'react';
import { Select } from 'antd';
const { Option } = Select;


const ProvinceDrawerContainer = ({ provinceInfo, setRefreshData }) => {


    return (
        <section>
            <div className='-space-y-2 mb-5'>
                <p className='bg-purple-500  text-center text-white py-1 text-[16px] rounded-md'>Province Name : <span className='capitalize'>{provinceInfo?.name}</span></p>
                <p className='bg-purple-500  text-center text-white py-1 text-[16px] rounded-md'>User Role : <span className='capitalize'>{provinceInfo?.user_role?.split('_').join(' ') || ""}</span></p>
            </div>


            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-center">
                                Tax name
                            </th>
                            <th scope="col" className="py-3 px-6 text-center">
                                Percentage (%)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            provinceInfo?.tax_info?.map((data, i) =>
                                <tr key={i + 789} className="bg-white border-b hover:bg-gray-100">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-center">
                                        {data?.tax_name}
                                    </th>

                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-center">
                                        {data?.tax_percentage}
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default ProvinceDrawerContainer;