import React from 'react';
import {useEffect, useState} from 'react';
import CardWithIcon from '../../components/accountant/card/cardWithIcon';
import {fetchAccountantDashboardData} from '../../helpers/backend_helper';
import moment from 'moment';
import {useFetch} from '../../helpers/hooks';
import {MdAccountCircle} from "react-icons/md";
import AccountantLayout from '../../layout/accountantLayout';
import {useEnv} from '../../contexts/envContext';
import Head from 'next/head';
import Table from "../../components/common/table";


const Accountant = () => {
        const [taxData, setTaxData, {loading, error}] = useFetch(fetchAccountantDashboardData, {size: 10});
        const [_, environmentVariable] = useEnv();

        // tawk to service connection (for messaging from user-panel to admin/accountant)
        useEffect(() => {
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function () {
                var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = environmentVariable?.twak_to_src_url;
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
            })();
        }, [environmentVariable?.twak_to_src_url])


        let columns = [
            {
                dataField: 'first_name', text: 'Name',
                formatter: (_, data) => <span className='whitespace-pre'>{
                    (data?.first_name || '') + " " + (data?.middle_name ?? '') + " " + (data?.last_name || '')
                }</span>
            },
            {
                dataField: 'taxfile_status', text: 'File Status',
                formatter: (taxfile_status, data) => <div className=''>
                    {
                        taxfile_status !== "completed" ?
                            <span className='bg-red-500 p-[1%] text-white rounded-sm px-2 py-1 rounded-md'>{taxfile_status} </span>
                            :
                            <span className='bg-green-500 p-[1%] text-white rounded-sm px-2 py-1 rounded-md'>
                                {taxfile_status}
                            </span>
                    }
                </div>
            },
            {
                dataField: 'updatedAt', text: 'Added',
                formatter: (updatedAt) => <span
                    className='capitalize whitespace-pre'>{moment(new Date()).from(moment(updatedAt), 'hours')} ago</span>
            },
        ];


        return (
            <div>
                <Head>
                    <title>Welcome to Accountant Panel</title>
                </Head>

                <div className='m-[2%] min-h-screen'>
                    <div>
                        <CardWithIcon/>
                    </div>

                    <div className='lg:grid lg:grid-cols-3 gap-[1%] my-[2%] mt-14'>
                        <div className='bg-gray-50 rounded flex justify-center items-center p-[3%] shadow-2xl'>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46137.89726066856!2d-79.67198126016748!3d43.71847508879094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b1592c8409d1b%3A0x5922b2a3b65b5df5!2sTaxants!5e0!3m2!1sen!2sbd!4v1659003935842!5m2!1sen!2sbd"
                                className='w-full h-full lg:w-[500px] lg:h-[400px]' style={{border: "0"}} allowFullScreen=""
                                loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                        </div>
                        <div className='col-span-2 rounded bg-gray-50 mt-[5%] lg:mt-0'>
                            <div className='relative p-6'>
                                {/* upper design */}
                                <div className='h-12'>
                                    <div
                                        className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                                        <span> <MdAccountCircle size={35}/> </span>
                                    </div>

                                    <span className='capitalize ml-20 text-lg'>Recent Assigned and Activities</span>
                                </div>
                                <Table
                                    columns={columns}
                                    data={taxData?.docs}
                                    noActions={true}
                                    indexed={true}
                                    shadow={false}
                                    onReload={setTaxData}
                                    error={error}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;
Accountant.layout = AccountantLayout;
export default Accountant;