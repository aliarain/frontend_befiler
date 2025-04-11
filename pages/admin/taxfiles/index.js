import {Checkbox, Form, Select, Spin} from 'antd';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import Table, {TableImage} from '../../../components/common/table';
import {useSite} from '../../../contexts/site';
import {
    deleteTaxFilesAPI, fetchTaxFile, fetchTaxFileList,
    fetchTaxFiles, getAllAccountant, getSiteSettingInformationAPI, updateManyTaxFile,
} from '../../../helpers/backend_helper';
import {useFetch} from '../../../helpers/hooks';
import AdminLayout from "../../../layout/adminLayout";
import {useI18n} from '../../../contexts/i18n';
import Card from "../../../components/common/card";
import {ImFileExcel, ImFilePdf} from "react-icons/im";
import {TbBrandWhatsapp} from "react-icons/tb";
import Link from "next/link";
import {handleInvoicePrint, InvoiceDetails} from "../../../components/files/invoice";
import {exportExcelFormatDynamic} from "../../../components/files/excel-sheet/single";
import moment from "moment/moment";
import {multiExportExcelFormatDynamic} from "../../../components/files/excel-sheet/multiple";
import FormSelect from "../../../components/form/select";
import {toast, ToastContainer} from 'react-toastify';
import {InfinitySpin} from "react-loader-spinner";

const {Option} = Select;


const TaxFiles = () => {
    const i18n = useI18n();
    const {push} = useRouter();
    const [taxFiles, getTaxFiles, {loading, error}] = useFetch(fetchTaxFiles);
    const [accountantAssignmentLoading, setAccountantAssignmentLoading] = useState(false);
    const [loaderAllDownload, setLoaderAllDownload] = useState(false);
    const [loaderSelectedDownload, setLoaderSelectedDownload] = useState(false);
    const [invoice, setInvoice] = useState()
    const [selectedFile, setSelectedFile] = useState([])
    const [accountantData, setAccountantData] = useState([])

    const [getSiteData, setSitSetting] = useState({});
    useEffect(() => {
        getSiteSettingInformationAPI().then(res => {
            if (res?.status === true) {
                setSitSetting(res?.data)
            }
        })
    }, [])

    // get getAllAccountant
    useEffect(() => {
        const data = {role: "accountant", userStatus: "active"}
        getAllAccountant(data).then(data => {
            setAccountantData(data?.data)
        })
    }, [])

    let columns = [
        {
            dataField: '_id', text: 'Select', formatter: (_id, data) => (
                <Checkbox onClick={(e) => setSelectedFile(pre => {
                    if (pre?.includes(_id)) {
                        return e.target.checked === false ? pre = [...pre].filter(d => d !== _id) : [...pre]
                    } else {
                        return [...pre, _id]
                    }
                })}/>
            ),
        },
        {
            dataField: 'profile_image', text: 'Image',
            formatter: d => <TableImage url={d}/>
        },
        {
            dataField: 'name', text: 'Name', formatter: (name) => (
                <span className={`whitespace-pre capitalize`}>
                    {name}
                </span>
            ),
        },
        {
            dataField: 'city', text: 'City', formatter: (city) => (
                <span className={`whitespace-pre capitalize`}>
                    {city}
                </span>
            )
        },
        {
            dataField: 'phone', text: 'Phone', formatter: (phone) => (
                <span className={`whitespace-pre`}>
                    {phone}
                </span>
            )
        },
        {
            dataField: 'accountant', text: 'Accountant', formatter: (accountant) => (
                <span className={`whitespace-pre capitalize`}>
                    {accountant !== 'N/A' ? <span className="text-green-600">{accountant}</span> :
                        <span className='text-purple-500'>N/A</span>}
                </span>
            )
        },
        {
            dataField: 'steps', text: 'Steps', formatter: (steps) => (
                <span className={`whitespace-pre capitalize`}>
                    {steps}
                </span>
            )

        },
        {
            dataField: 'status', text: 'Status', formatter: (status, data) => (
                <span className={`whitespace-pre capitalize`}>
                    <>
                    {
                        (data?.taken_a_review === true && data?.taken_review_count <= 2) ?
                            <span className='text-white bg-yellow-500 whitespace-pre px-2 py-1 rounded '>Taken a Review ({data?.taken_review_count})</span>
                            :
                            <div>
                                {
                                    (status === 'New File') && <span
                                        className='text-white bg-gray-500 whitespace-pre px-2 py-1 rounded '>{status}</span>
                                }
                                {
                                    (status === 'Submitted to Accountant') && <span
                                        className='text-white bg-purple-500 whitespace-pre px-2 py-1 rounded '>{status}</span>
                                }
                                {
                                    (status === 'Tax Filed') && <span
                                        className='text-white bg-green-500 whitespace-pre px-2 py-1 rounded '>{status}</span>
                                }
                            </div>
                    }
                </>
                </span>
            )
        },
        {
            dataField: 'payment', text: 'Payment', formatter: (payment) => (
                <span className={`whitespace-pre capitalize`}>
                    <span className='block text-center capitalize'>
                        {payment === 'success' ?
                            <span className='bg-green-500 text-white px-2 py-1 rounded-md'>success</span> :
                            <span className='bg-red-500 text-white px-2 py-1 rounded-md'>{payment}</span>}
                    </span>
                </span>
            )
        },
        {
            dataField: 'updated', text: 'Last Updated', formatter: (updated) => (
                <span className={`whitespace-pre capitalize`}>
                    {updated}
                </span>
            )
        },
        {
            dataField: 'submitted', text: 'Submitted', formatter: (submitted) => (
                <span className={`whitespace-pre capitalize`}>
                    {submitted}
                </span>
            )
        },
    ];


    let action = (
        <div className="flex">
            <button className="btn btn-primary btn-sm focus:shadow-none me-2"
                    onClick={async () => {
                        setLoaderSelectedDownload(pre => pre = true)
                        const res = await fetchTaxFileList({files: selectedFile});
                        setLoaderSelectedDownload(pre => pre = false)
                        if (res?.error === false) {
                            multiExportExcelFormatDynamic({excelData: res?.data, title: 'Taxfiles'})
                        }
                    }}>
                {
                    loaderSelectedDownload === false ?
                        <span className={'font-semibold text-[13px]'}>{!!i18n && i18n?.t("Download Selected Files")}</span>
                        :
                        <span className={'font-semibold text-[13px]'}>Please Wait <Spin/></span>
                }
            </button>
            <button className="btn btn-success btn-sm focus:shadow-none me-2"
                    onClick={async () => {
                        setLoaderAllDownload(pre => pre = true)
                        const res = await fetchTaxFileList();
                        setLoaderAllDownload(pre => pre = false)
                        if (res?.error === false) {
                            multiExportExcelFormatDynamic({excelData: res?.data, title: 'Taxfiles'})
                        }
                    }}>
                {
                    loaderAllDownload === false ?
                        <span className={'font-semibold text-[13px]'}>{!!i18n && i18n?.t("Download All")}</span>
                        :
                        <span className={'font-semibold text-[13px]'}>Please Wait <Spin/></span>
                }
            </button>
        </div>)

    let actions = (data) => (
        <div className="flex">
            <button className="btn btn-outline-warning btn-sm focus:shadow-none me-2"
                    title="Excel download"
                    onClick={async () => {
                        const res = await fetchTaxFile({_id: data?._id});
                        const extraData = {
                            name: data?.name,
                            id: data?.ID,
                            submitted_date: !!data && moment(data?.createdAt).format('ll'),
                            year: data?.year,
                            payment_status: data?.payment,
                            total_review_taken: data?.taken_review_count,
                            accountant: data?.accountant,
                        }
                        delete res?.data?.name;
                        delete res?.data?.first_name;
                        delete res?.data?.last_name;
                        delete res?.data?.middle_name;
                        exportExcelFormatDynamic({
                            excelData: res?.data,
                            title: `${getSiteData?.username}-${data?.name}`,
                            extraData: extraData
                        })
                    }}>
                <ImFileExcel className='cursor-pointer text-green-600'/>
            </button>

            <button className="btn btn-outline-secondary btn-sm focus:shadow-none me-2"
                    title="PDF download"
                    onClick={async () => {
                        const res = await fetchTaxFile({_id: data?._id});
                        setInvoice({payment_status: data?.payment, ...res?.data})
                        window.setTimeout(() => {
                            handleInvoicePrint()
                        }, 300)
                    }}>
                <ImFilePdf className='cursor-pointer text-amber-600 hover:text-white'/>
            </button>
            <button className="btn btn-outline-info btn-sm focus:shadow-none me-2" title="Whatsapp">
                <Link href={`https://wa.me/${data?.phone}`}>
                    <a target='_blank'>
                            <span className="" title="Send message">
                                <TbBrandWhatsapp className={'text-green-600 hover:text-black'}/>
                            </span>
                    </a>
                </Link>
            </button>
        </div>)


    return (
        <section className={'p-3'}>
            <Head>
                <title>Tax filing list</title>
            </Head>
            <InvoiceDetails invoice={invoice} getSiteData={getSiteData}/>
            <Card className='shadow-md' title={'All tax files'}>
                <Table
                    columns={columns}
                    data={taxFiles}
                    pagination={true}
                    actions={actions}
                    noActions={false}
                    action={action}
                    indexed={true}
                    shadow={false}
                    onView={async (data) => {
                        await push(`/admin/taxfiles/details?id=${data?._id}`);
                    }}
                    onDelete={deleteTaxFilesAPI}
                    onReload={getTaxFiles}
                    error={error}
                    loading={loading}
                />
            </Card>

            {/* assign to accountant */}
            <div className='my-2 pb-10'>
                <Card className='shadow-md' title={'Assign tax files to the accountant'}>
                    <Form
                        layout={'vertical'}
                        onFinish={(values) => {
                            setAccountantAssignmentLoading(true)
                            if (!!values.accountant && selectedFile.length > 0) {
                                const files = {taxFiles: selectedFile, accountant: values.accountant};
                                updateManyTaxFile(files).then(data => {
                                    if (data?.status === true) {
                                        setAccountantAssignmentLoading(false)
                                        toast.success("Accountant assigned successfully!");
                                        getTaxFiles()
                                    } else {
                                        setAccountantAssignmentLoading(false)
                                        toast.warning(data?.message);
                                    }
                                })
                            } else {
                                setAccountantAssignmentLoading(false)
                                toast.warning('Please select file and an accountant')
                            }
                        }}
                    >
                        <FormSelect
                            name={'accountant'}
                            placeholder={'Select an accountant'}
                            className={'w-full md:w-1/3'}
                            disabled={(selectedFile?.length === 0) && true}
                            options={accountantData?.map(d => ({
                                label: `${d?.ID} - ${d?.username} - ${d?.email}`,
                                value: d?._id
                            }))}
                            label={'Assign an accountant'}
                            extra={(selectedFile?.length === 0) && 'Please select at least one tax file'}
                        />

                        <button
                            className={`relative bg-green-500 text-white px-3 py-2 rounded-sm ml-0 md:ml-2 text-[13px] font-semibold mt-2 md:mt-0 hover:bg-green-600 hover:shadow-md ${(selectedFile?.length === 0) && "cursor-wait"} `}
                            disabled={(selectedFile?.length === 0) && true}
                            title={(selectedFile?.length === 0) ? 'Please select at least one tax file' : ''}
                        >
                            Assign

                            {
                                accountantAssignmentLoading === true &&
                                <span className="absolute -top-7 left-28">
                                <InfinitySpin
                                    width='200'
                                    color="#4fa94d"/>
                                </span>
                            }
                        </button>
                    </Form>
                </Card>
            </div>

            {/* toast message */}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    );
};

TaxFiles.layout = AdminLayout;
export default TaxFiles;