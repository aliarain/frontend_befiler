import React, { useEffect, useState } from 'react';
import TaxCard from '../../../components/admin/taxFileDetails/taxCard';
import DataCard from '../../../components/admin/taxFileDetails/taxFileLeft';
import TaxDataCard from '../../../components/admin/taxFileDetails/taxFileRight';
import AdminLayout from '../../../layout/adminLayout';
import { VscArrowLeft } from 'react-icons/vsc';
import { FaLifeRing, FaStoreAlt } from 'react-icons/fa';
import { MdPayment, MdWeekend } from 'react-icons/md';
import { useRouter } from 'next/router';
import {
    fetchTaxFileDetails,
    getAllAccountant,
    getOneTaxFilesAPI,
    getSiteSettingInformationAPI
} from '../../../helpers/backend_helper';
import Head from 'next/head';


function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}


const TaxFileDetails = () => {
    const router = useRouter();
    const { query } = router;
    const [taxFileData, setTaxFileData] = useState({});
    const [accountantData, setAccountantData] = useState([])

    // get getAllAccountant
    useEffect(() => {
        const data = {role: "accountant", userStatus: "active"}
        getAllAccountant(data).then(data => {
            setAccountantData(data?.data)
        })
    }, [])

    useEffect(() => {
        const data = { _id: query?.id }
        fetchTaxFileDetails(data).then(data => {
            setTaxFileData(data?.data);
        })
    }, [query?.id])

    // site setting data
    const [getSiteData, setSitSetting] = useState({});
    useEffect(() => {
        getSiteSettingInformationAPI().then(res => {
            if (res?.status === true) {
                setSitSetting(res?.data)
            }
        })
    }, [])

    const handlebackbtn = () => {
        router.push('/admin/taxfiles/')
    }

    const handleAboutUs = () => {
        router.push(`/home/about/`)
    }

    //assigned tax top card
    const topCard = [
        { tittle: 'Status', data: `${taxFileData?.status ?? ''}`, icon: MdWeekend, bgColor: 'bg-green-500' },
        { tittle: 'Payment', data: `${taxFileData?.payment === 'paid' ? 'Success' : 'Pending'}`, icon: MdPayment, bgColor: 'bg-red-500' },
        { tittle: 'Assigned', data: `${taxFileData?.assigned_accountant?._id ? 'Yes' : 'No'}`, icon: FaStoreAlt, bgColor: 'bg-green-500' },
        { tittle: 'Step Completed', data: `${taxFileData?.step_completed ?? 0}`, icon: FaLifeRing, bgColor: 'bg-cyan-500' },
    ];


    return (
        <>
            <section className="bg-gray-200 pt-12 min-h-screen">
                <Head>
                    <title>Tax File Details</title>
                </Head>

                <div className='px-4'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-4 my-12'>
                        {
                            topCard.map((card, index) => <TaxCard key={index + 1112} taxCards={card} />)
                        }
                    </div>

                    <div className='md:grid md:grid-cols-2 gap-4'>
                        {/* left side data */}
                        <DataCard taxFileData={taxFileData} />

                        {/* right side data */}
                        <TaxDataCard
                            taxFileData={taxFileData}
                            admin={true}
                            accountantData={accountantData}
                        />
                    </div>

                    <div className='flex items-center gap-2 bg-red-500 text-white rounded px-2 w-24 h-10 my-4 h hover:bg-red-600 hover:shadow-lg cursor-pointer' onClick={() => handlebackbtn()}>
                        <span ><VscArrowLeft size={20} className='text-[14px] ml-2' /></span>
                        <button className='text-[14px]'>Back</button>
                    </div>

                    <div className='border-t border-white'></div>
                </div>

                <footer className='flex justify-between mx-4 py-3'>
                    <button onClick={() => handleAboutUs()} className='font-[16px] font-mono'>About Us</button>
                    <p className='text-center font-[16px] font-mono'>&copy; {capitalizeFirstLetter(getSiteData?.username)} {new Date().getFullYear()}</p>
                </footer>
            </section>
        </>
    );
};
TaxFileDetails.layout = AdminLayout
export default TaxFileDetails;