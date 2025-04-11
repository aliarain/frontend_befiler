import React, { useEffect, useState } from 'react';
import CardWithIcon from '../../components/admin/dashboardCard/cardWithIcon';
import AdminLayout from '../../layout/adminLayout';
import Card from '../../components/admin/dashboardCard/card';
import { useRouter } from 'next/router';
import { getAllPaymentHistoriesAPI, getTotalCount } from '../../helpers/backend_helper';
import { MdWeekend, MdEqualizer, MdLocalOffer, MdUpdate } from "react-icons/md";
import { BsTwitter, } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Head from 'next/head';
import { useFetch } from '../../helpers/hooks';
import Table from '../../components/admin/table/table';
import moment from 'moment';

// time greeting
const welcomeTime = (date) => {
    return (date < 12 && date >= 5) ? 'Good Morning' :
        (date < 15 && date >= 12) ? 'Good Noon' :
            (date < 18 && date >= 15) ? 'Good afternoon' :
                (date < 24 && date >= 18) ? 'Good Evening' : "It's Midnight"
}


const Admin = () => {
    const router = useRouter();
    const [totalData, setTotalData] = useState({});
    const [refreshData, setRefreshData] = useState(null);
    const [getTransactionsHistory, setTransactionsHistory, { loading, error }] = useFetch(getAllPaymentHistoriesAPI);

    const date = new Date().getHours();
    const welcomeDate = welcomeTime(date)

    // update state
    useEffect(() => {
        const data = { size: 5 }
        setTransactionsHistory(data)

        setRefreshData(null)
    }, []);

    useEffect(() => {
        getTotalCount().then(data => {
            if (data?.status === true) {
                setTotalData(data)
            }
        })
    }, [])

    //handle component linkup function
    const handleOnClick = (link) => { router.push(`${link}`) }

    //dashboard card with icons
    const iconCards = [
        { tittle: "Total Users", number: `${totalData?.totalUsers ?? 0}`, warning: 'Total registered' +
                ' user', icon1: MdWeekend, icon2: FaUser, bgColor: 'firstRowSubCardAdminHome1', waringIconColor: 'text-purple-400', bgClr: 'firstRowCardAdminHome1' },
        { tittle: "Total TaxFiles", number: `${totalData?.totalTaxFile ?? 0}`, warning: 'Total submitted tax files', icon1: MdEqualizer, icon2: MdLocalOffer, bgColor: 'firstRowSubCardAdminHome2', waringIconColor: 'text-red-400', bgClr: 'firstRowCardAdminHome2' },
        { tittle: "Completed Files", number: `${totalData?.totalTaxFileComplete ?? 0}`, warning: 'Just Updated', icon1: BsTwitter, icon2: MdUpdate, bgColor: 'firstRowSubCardAdminHome3', waringIconColor: 'text-green-400', bgClr: 'firstRowCardAdminHome3' },
    ]

    //dashboard card with link up button
    const cardsData = [
        { tittle: 'All Users', btntext: 'Click To See', btnBgColor: 'bg-[#FF607A]', btnbgHover: 'hover:bg-[#DF2F25]', link: '/admin/users/', bgClr: 'secondRowCardAdminHome1' },
        { tittle: 'All Submitted Tax Files', btntext: 'Click To See', btnBgColor: 'bg-green-500', btnbgHover: 'hover:bg-[#47A44B]', link: '/admin/taxfiles/', bgClr: 'secondRowCardAdminHome2' },
        { tittle: 'User Form Fields', btntext: 'Click To See', btnBgColor: 'bg-cyan-500', btnbgHover: 'hover:bg-[#00AEC5]', link: '/admin/user-form-fields/', bgClr: 'secondRowCardAdminHome3' },
        { tittle: 'All Province', btntext: 'Click To See', btnBgColor: 'bg-orange-400', btnbgHover: 'hover:bg-[#F08F00]', link: '/admin/province/', bgClr: 'secondRowCardAdminHome4' },
    ]

    const column = [
        {
            dataField: "first_name", headerName: "User Name",
            formatter: (name, data) => (
                <span
                    className={`whitespace-pre flex justify-center`}
                >
                    {data?.user?.username}{" "}
                </span>
            ),
        },
        {
            dataField: "updatedAt", headerName: "Email",
            formatter: (name, data) => (
                <span
                    className={`whitespace-pre flex justify-center`}
                >
                    {data?.user?.email}{" "}
                </span>
            ),
        },
        {
            dataField: "updatedAt", headerName: "TaxFile ID",
            formatter: (name, data) => (
                <span
                    className={`whitespace-pre flex justify-center`}
                >
                    {data?.tax_file?.ID}
                </span>
            ),
        },
        {
            dataField: "updatedAt", headerName: "Amount",
            formatter: (name, data) => (
                <span
                    className={`whitespace-pre flex justify-center`}
                >
                    {data?.amount}
                </span>
            ),
        },
        {
            dataField: "updatedAt", headerName: "Payment Method",
            formatter: (name, data) => (
                <span
                    className={`whitespace-pre flex justify-center`}
                >
                    {data?.payment_method}
                </span>
            ),
        },
        {
            dataField: "updatedAt", headerName: "Payment Date",
            formatter: (name, data) => (
                <span
                    className={`whitespace-pre flex justify-center`}
                >
                    {moment(data?.createdAt).format('MM-DD-YYYY')}
                </span>
            ),
        },
    ];

    return (
        <>
            <div className='min-h-screen -mt-2 bg-[#F8F9FA]'>
                <Head>
                    <title>Admin Dashboard</title>
                </Head>

                {/* dashboard tittle */}
                <div className='p-8'>
                    <div className='mb-12'>
                        <p className='text-3xl font-normal text-gray-600'>Hi Admin, {welcomeDate} !</p>
                    </div>

                    {/* dashboard cards with icon display */}
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 my-12'>
                        {
                            iconCards?.map((iconCard, index) => <CardWithIcon iconCards={iconCard} key={index + 11} />)
                        }
                    </div>
                </div>

                {/* dashboard cards with linkup button display */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 px-8'>
                    {
                        cardsData?.map((card, index) => <Card key={index + 1122} cards={card} handleOnClick={() => handleOnClick(card?.link)} />)
                    }

                </div>

                {/* payment histories */}
                <div className='h-auto w-auto rounded-md mt-10 mx-8 px-4 bg-white'>
                    <span className='py-2 px-1 inline-block border-b-2 border-purple-600 mt-2'>Recent Payment Records</span>
                    <Table
                        columns={column}
                        data={getTransactionsHistory}
                        pagination
                        loading={loading}
                        onReload={setTransactionsHistory}
                        ID={true}
                    />
                </div>
            </div>
        </>
    );
};
Admin.layout = AdminLayout
export default Admin;