import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import EnvironmentSetting from '../../../../components/admin/site-setting/environmentSetting';
import ManageContent from '../../../../components/admin/site-setting/manageContent';
import ManageEmail from '../../../../components/admin/site-setting/manageEmail';
import ManageHomePage from '../../../../components/admin/site-setting/manageHomePage';
import ManageSMS from '../../../../components/admin/site-setting/manageSMS';
import ManageTaxSituation from '../../../../components/admin/site-setting/manageTaxSituation';
import WebsiteInformation from '../../../../components/admin/site-setting/websiteInformation';
import AdminLayout from '../../../../layout/adminLayout';
import { SiWebmoney } from "react-icons/si";
import {FaHome, FaAppStore, FaImages} from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { MdOutlineMarkEmailRead, MdOutlineSms, MdOutlineSettings } from "react-icons/md";
import ThemeSetting from "../../../../components/admin/site-setting/themeSetting";


const SiteSettingIndex = () => {
    const [siteInformationToggle, setSiteInformationToggle] = useState('info')

    // navigation button control
    const handleToggleSubPage = (data) => {
        setSiteInformationToggle(data)
    }


    return (
        <>
            <section className='min-h-screen'>
                <Head>
                    <title>Website Configuration</title>
                </Head>


                {/* navigation button */}
                <div className='grid grid-cols-1 md:grid-cols-3 '>
                    <div className='col-span-1 border flex justify-center items-center bg-slate-50 mx-4 md:h-[500px] h-[100%] rounded-md'>
                        <div className='w-auto space-y-6'>
                            <div className={`${siteInformationToggle === 'info' && 'bg-purple-500 px-2 rounded-md inline-block text-purple-600'}`}>
                                <span className='text-[16px] gap-2 flex items-center  px-10 py-1 rounded-md hover:shadow-md cursor-pointer  bg-slate-200  active:bg-purple-300 focus:outline-none focus:ring focus:ring-violet-300 border-[1px] border-gray-300 shadow-sm' onClick={() => handleToggleSubPage('info')}> <span className=''> <SiWebmoney /> </span> Website Information </span>
                            </div>


                            <div className={`${siteInformationToggle === 'home_page' && 'bg-purple-500 px-2 rounded-md inline-block text-purple-600'}`}>
                                <span className='text-[16px] gap-2 flex items-center bg-slate-200 px-10 py-1 rounded-md hover:shadow-md  cursor-pointer  active:bg-purple-300 focus:outline-none focus:ring focus:ring-violet-300 border-[1px] border-gray-300 shadow-sm' onClick={() => handleToggleSubPage('home_page')}> <span> <FaHome /> </span> Manage Home Page </span>
                            </div>


                            <div className={`${siteInformationToggle === 'content' && 'bg-purple-500 px-2 rounded-md inline-block text-purple-600'}`}>
                                <span className='text-[16px] gap-2 flex items-center bg-slate-200 px-10 py-1 rounded-md hover:shadow-md cursor-pointer  active:bg-purple-300 focus:outline-none focus:ring focus:ring-violet-300 border-[1px] border-gray-300 shadow-sm' onClick={() => handleToggleSubPage('content')}> <span>  <FaAppStore /> </span> Manage About Page </span>
                            </div>

                            <div className={`${siteInformationToggle === 'tax_situation' && 'bg-purple-500 px-2 rounded-md inline-block text-purple-600'}`}>
                                <span className='text-[16px] gap-2 flex items-center bg-slate-200 px-10 py-1 rounded-md hover:shadow-md cursor-pointer  active:bg-purple-300 focus:outline-none focus:ring focus:ring-violet-300 border-[1px] border-gray-300 shadow-sm' onClick={() => handleToggleSubPage('tax_situation')}> <span> <BsCoin /> </span> Manage Tax Beneficiary </span>
                            </div>

                            <div className={`${siteInformationToggle === 'smtp_setting' && 'bg-purple-500 px-2 rounded-md inline-block text-purple-600'}`}>
                                <span className='text-[16px] gap-2 flex items-center bg-slate-200 px-10 py-1 rounded-md hover:shadow-md cursor-pointer  active:bg-purple-300 focus:outline-none focus:ring focus:ring-violet-300 border-[1px] border-gray-300 shadow-sm' onClick={() => handleToggleSubPage('smtp_setting')}> <span> <MdOutlineMarkEmailRead /> </span> Manage SMTP Setting </span>
                            </div>

                            <div className={`${siteInformationToggle === 'sms_setting' && 'bg-purple-500 px-2 rounded-md inline-block text-purple-600'}`}>
                                <span className='text-[16px] gap-2 flex items-center bg-slate-200 px-10 py-1 rounded-md hover:shadow-md cursor-pointer  active:bg-purple-300 focus:outline-none focus:ring focus:ring-violet-300 border-[1px] border-gray-300 shadow-sm' onClick={() => handleToggleSubPage('sms_setting')}> <span> <MdOutlineSms /> </span> Manage SMS Setting </span>
                            </div>

                            <div className={`${siteInformationToggle === 'env_setting' && 'bg-purple-500 px-2 rounded-md inline-block text-purple-600'}`}>
                                <span className='text-[16px] gap-2 flex items-center bg-slate-200 px-10 py-1 rounded-md hover:shadow-md cursor-pointer  active:bg-purple-300 focus:outline-none focus:ring focus:ring-violet-300 border-[1px] border-gray-300 shadow-sm' onClick={() => handleToggleSubPage('env_setting')}>  <span> <MdOutlineSettings /> </span> Environment Setting </span>
                            </div>

                            <div className={`${siteInformationToggle === 'theme' && 'bg-purple-500 px-2 rounded-md inline-block text-purple-600'}`}>
                                <span className='text-[16px] gap-2 flex items-center bg-slate-200 px-10 py-1 rounded-md hover:shadow-md cursor-pointer  active:bg-purple-300 focus:outline-none focus:ring focus:ring-violet-300 border-[1px] border-gray-300 shadow-sm' onClick={() => handleToggleSubPage('theme')}>  <span> <FaImages /> </span> Theme and Recaptcha </span>
                            </div>

                        </div>
                    </div>


                    {/* details information and create, update, delete */}
                    <div className='col-span-2'>
                        <div className='bg-slate-50 min-h-screen rounded-md mr-4'>
                            {
                                siteInformationToggle === 'info' &&
                                <WebsiteInformation />
                            }
                            {
                                siteInformationToggle === 'content' &&
                                <ManageContent />
                            }

                            {
                                siteInformationToggle === 'home_page' &&
                                <ManageHomePage />
                            }

                            {
                                siteInformationToggle === 'tax_situation' &&
                                <ManageTaxSituation />
                            }

                            {
                                siteInformationToggle === 'smtp_setting' &&
                                <ManageEmail />
                            }

                            {
                                siteInformationToggle === 'sms_setting' &&
                                <ManageSMS />
                            }

                            {
                                siteInformationToggle === 'env_setting' &&
                                <EnvironmentSetting />
                            }

                            {
                                siteInformationToggle === 'theme' &&
                                <ThemeSetting />
                            }
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};
SiteSettingIndex.layout = AdminLayout
export default SiteSettingIndex;