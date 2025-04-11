import {Checkbox, Modal, Select, Spin, Tooltip} from 'antd';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import Table, {TableImage} from '../../../components/common/table';
import {
    fetchAccountantDashboardData,
    fetchTaxFile,
    fetchTaxFileList,
    fileUploadAC,
    getAllAccountant,
    getSiteSettingInformationAPI,
    updateTaxFile,
} from '../../../helpers/backend_helper';
import {useFetch} from '../../../helpers/hooks';
import {useI18n} from '../../../contexts/i18n';
import Card from "../../../components/common/card";
import {ImFileExcel, ImFilePdf} from "react-icons/im";
import {TbBrandWhatsapp} from "react-icons/tb";
import Link from "next/link";
import {handleInvoicePrint, InvoiceDetails} from "../../../components/files/invoice";
import {exportExcelFormatDynamic} from "../../../components/files/excel-sheet/single";
import moment from "moment/moment";
import {multiExportExcelFormatDynamic} from "../../../components/files/excel-sheet/multiple";
import {toast, ToastContainer} from 'react-toastify';
import AccountantLayout from "../../../layout/accountantLayout";
import {MdEmail} from "react-icons/md";
import SendEmail from "../../../components/accountant/modal/sendEmail";
import {BiCheckCircle} from "react-icons/bi";
import {FiCheck} from "react-icons/fi";
import {BsClock} from "react-icons/bs";
import swalAlert from "../../../components/common/swalAlert";
import {AiOutlineClose} from "react-icons/ai";
import deleteAction from "../../../components/accountant/delete/delete";

const {Option} = Select;


const TaxFiles = () => {
    const i18n = useI18n();
    const {push} = useRouter();
    const [studentTaxFile, setStudentTaxFile, {loading, error}] = useFetch(fetchAccountantDashboardData);
    const [loaderAllDownload, setLoaderAllDownload] = useState(false);
    const [loaderSelectedDownload, setLoaderSelectedDownload] = useState(false);
    const [invoice, setInvoice] = useState()
    const [selectedFile, setSelectedFile] = useState([])
    const [accountantData, setAccountantData] = useState([])

    const [formId, setFormId] = useState('');
    const [fileLoading, setFileLoading] = useState(false)

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

    // modal action
    const [userEmail, setUserEmail] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (email) => {
        setUserEmail(email);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // upload file
    const handleAccountantFile = (e) => {
        setFileLoading(true)

        const formData = new FormData();
        formData.append('file', e.target.files[0])
        formData.append('id', formId)

        fileUploadAC(formData).then(data => {
            setFileLoading(false)
            setStudentTaxFile(data)
            if (data?.status === true) {
                toast.success(data?.message);

            } else {
                toast.error(data?.message);
            }
        })
    }

    // handle file complete status
    const handleFileCompleteStatus = async (id) => {
        let {isConfirmed} = await swalAlert.sureMeg(
            "Do you want to mark as completed", ""
        );
        if (isConfirmed) {
            const queryValue = {id}
            const data = {taxfile_status: 'completed', taken_a_review: false}
            updateTaxFile(data, queryValue).then(data => {
                if (data?.status === true) {
                    toast.success("successfully marked as complete")
                    setStudentTaxFile(data)
                } else {
                    toast.warning(data?.message)
                }
            })
        }
    }

    // handle file rejection status
    const handleFileRejection = async (id) => {
        let {isConfirmed} = await swalAlert.confirm(
            "Are you want to delete this tax file?",
            "Yes, Delete"
        );
        if (isConfirmed) {
            const data = {id};
            await deleteAction(data, "accountant_rejection", setStudentTaxFile);
        }
    }

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
            dataField: "email", text: "Email", formatter: (email, data) =>
                <div className='flex justify-center'>
                    <span onClick={() => showModal(data?.user?.email)}
                          className=' bg-green-600 px-2 py-1 rounded-md hover:cursor-pointer text-white'>
                        <MdEmail size={16}/>
                    </span>
                </div>

        },
        {dataField: "ID", text: "ID"},
        {
            dataField: "first_name", text: "Name", formatter: (first_name, data) =>
                <span className='whitespace-pre capitalize'>
                    {(data?.first_name || '') + " " + (data?.middle_name ?? '') + " " + (data?.last_name || '')}
                </span>
        },
        {
            dataField: "city", text: "City",
            formatter: (city, data) => (<span className='whitespace-pre'>{data?.province_name?.name}</span>)
        },
        {
            dataField: "phone_number", text: "Phone",
            formatter: (phone_number, data) => (<span
                className='whitespace-pre'>{data?.phone_number || data?.phone || data?.mobile || data?.mobile_number}</span>)
        },
        {
            dataField: "file_from_accountant",
            text: "Send File",
            formatter: (_, data) => <div className='relative'>

                <input type="file" onChange={handleAccountantFile} onFocus={() => setFormId(data?._id)}/>

                {
                    (data?._id === formId && fileLoading == true) &&
                    <div className='absolute top-0 right-2'>
                        <Spin/>
                    </div>
                }

                {
                    data?.file_from_accountant &&
                    <div
                        className={`absolute top-1 right-4 ${data?.taken_a_review === true ? 'text-yellow-500' : 'text-green-500'}`}>
                        <Link href={data?.file_from_accountant}>
                            <BiCheckCircle size={20} title='File has sent'
                                           className='cursor-pointer hover:scale-110 transition duration-500'/>

                        </Link>
                    </div>
                }

            </div>
        },
        {
            dataField: "taxfile_status", text: "Status",
            formatter: (taxfile_status, data) =>
                <>
                    {
                        (data?.taken_a_review === true && data?.taken_review_count <= 2) ?
                            <span className='text-white bg-yellow-500 whitespace-pre px-2 py-1 rounded '>Taken a Review ({data?.taken_review_count})</span>
                            :
                            <div className='flex justify-center'>
                                {
                                    taxfile_status === "completed" ?
                                        <Tooltip placement="top" title='Completed'>
                                            <span
                                                className=' bg-green-500 hover:bg-green-600 hover:shadow-md px-2 py-1 hover:cursor-pointer text-white rounded-md'>
                                                <FiCheck size={16}/>
                                            </span>
                                        </Tooltip>
                                        :
                                        <Tooltip placement="top" title='Mark as Completed'>
                                            <span
                                                className=' bg-cyan-500 hover:bg-cyan-600 hover:shadow-md px-2 py-1 hover:cursor-pointer text-white rounded-md'
                                                onClick={() => handleFileCompleteStatus(data?._id)}>
                                                <BsClock size={16}/>
                                            </span>
                                        </Tooltip>
                                }
                            </div>
                    }
                </>
        },
        {
            dataField: "taxfile_status", text: "Reject File",
            formatter: (taxfile_status, data) =>
                <div className='flex justify-center'>
                    {
                        taxfile_status !== "completed" ?

                            <Tooltip placement="top" title='Reject the File'>
                                <span
                                    className='bg-red-500 hover:bg-red-600 hover:shadow-md px-2 py-1 hover:cursor-pointer text-white rounded-md'
                                    onClick={() => handleFileRejection(data?._id)}>
                                    <AiOutlineClose size={16}/>
                                </span>
                            </Tooltip>

                            :
                            <span className=''>
                                Completed
                            </span>
                    }
                </div>

        },
        {
            dataField: "stripe_payment", text: "Payment",
            formatter: (payment) => <div className='flex justify-center'>
                {
                    payment === 'paid' ?
                        <span className='bg-green-500 px-2 mx-2 py-1 rounded-md text-white text-[12px]'>Success</span>
                        :
                        <span className='bg-red-500 px-2 mx-2 py-1 rounded-md text-white text-[10px]'>N/A</span>
                }
            </div>
        },
        {
            dataField: "createdAt",
            text: "Submitted",
            formatter: (createdAt) => <span
                className='capitalize whitespace-pre'>{moment(new Date()).from(moment(createdAt), 'hours')} ago</span>,
        },
        {
            dataField: "updatedAt",
            text: "Last Updated",
            formatter: (updatedAt) => <span
                className='capitalize whitespace-pre'>{moment(new Date()).from(moment(updatedAt), 'hours')} ago</span>,
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
                        <span
                            className={'font-semibold text-[13px]'}>{!!i18n && i18n?.t("Download Selected Files")}</span>
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
                            name: (data?.first_name ?? '') + " " + (data?.middle_name ?? '') + " " + (data?.last_name ?? ''),
                            id: data?.ID,
                            submitted_date: !!data && moment(data?.createdAt).format('ll'),
                            year: data?.year,
                            payment_status: data?.stripe_payment,
                            total_review_taken: data?.taken_review_count,
                            accountant: data?.assigned_accountant?.username,
                        }
                        delete res?.data?.name;
                        delete res?.data?.first_name;
                        delete res?.data?.last_name;
                        delete res?.data?.middle_name;
                        exportExcelFormatDynamic({
                            excelData: res?.data,
                            title: `${getSiteData?.username}-`+(data?.first_name ?? '') + " " + (data?.middle_name ?? '') + " " + (data?.last_name ?? ''),
                            extraData: extraData
                        })
                    }}>
                <ImFileExcel className='cursor-pointer text-green-600'/>
            </button>

            <button className="btn btn-outline-secondary btn-sm focus:shadow-none me-2"
                    title="PDF download"
                    onClick={async () => {
                        const res = await fetchTaxFile({_id: data?._id});
                        setInvoice({payment_status: data?.stripe_payment, ...res?.data})
                        window.setTimeout(() => {
                            handleInvoicePrint()
                        }, 300)
                    }}>
                <ImFilePdf className='cursor-pointer text-amber-600 hover:text-white'/>
            </button>
            <button className="btn btn-outline-info btn-sm focus:shadow-none me-2" title="Whatsapp">
                <Link href={`https://wa.me/${data?.phone_number}`}>
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
            <Card className='shadow-md' title={'All Tax Files'}>
                <Table
                    columns={columns}
                    data={studentTaxFile}
                    pagination={true}
                    actions={actions}
                    noActions={false}
                    action={action}
                    indexed={true}
                    shadow={false}
                    onView={async (data) => {
                        await push(`/accountant/taxfiles/details?id=${data?._id}`);
                    }}
                    onReload={setStudentTaxFile}
                    error={error}
                    loading={loading}
                />
            </Card>

            <Modal title="Send Email" visible={isModalVisible} onCancel={handleCancel} destroyOnClose footer={null}>
                <SendEmail email={userEmail} onCancel={handleCancel}/>
            </Modal>

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

TaxFiles.layout = AccountantLayout;
export default TaxFiles;