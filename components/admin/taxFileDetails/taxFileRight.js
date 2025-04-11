import React, {useEffect, useState} from 'react';
import {MdAssignment, MdOutlineFileDownload} from "react-icons/md";
import Link from 'next/link';
import {capitalizeFirstLetter, isValidUrl} from "../../common/utilities";
import { GrTransaction } from "react-icons/gr";
import {Form} from "antd";
import LoaderButton from "../../common/loaderButton";
import FormSelect from "../../form/select";
import {userAction} from "../../../helpers/new_hooks";
import {postTransferFileBetweenAccountant} from "../../../helpers/backend_helper";
import {useI18n} from "../../../contexts/i18n";
import {useRouter} from "next/router";


const TaxFileRight = ({taxFileData, accountantData, admin}) => {
    const [form] = Form.useForm();
    const [transferLoading, setTransferLoading] = useState(false);
    const router = useRouter()
    const i18n = useI18n();
    const image = taxFileData?.document?.profile_image
    const user_name = capitalizeFirstLetter(taxFileData?.document?.first_name ?? '') + " " + capitalizeFirstLetter(taxFileData?.document?.middle_name ?? '') + " " + capitalizeFirstLetter(taxFileData?.document?.last_name ?? '')

    delete taxFileData?.document?.profile_image
    delete taxFileData?.document?.first_name
    delete taxFileData?.document?.middle_name
    delete taxFileData?.document?.last_name

    const keys = Object?.keys(taxFileData?.document ?? {})
    const values = Object?.values(taxFileData?.document ?? {})

    useEffect(() => {
        if(taxFileData?._id && accountantData) {
            form.setFieldsValue({
                accountant: taxFileData?.assigned_accountant?._id
            })
        }
    }, [taxFileData?._id, accountantData]);

    return (
        <div className='mt-10 md:mt-0'>
            <div className='bg-white p-3 rounded shadow-lg'>
                <div className='relative h-16'>
                    <div
                        className={`absolute -top-10 border h-20 w-20 shadow bg-red-600 flex justify-center items-center rounded`}>
                        <MdAssignment className='text-4xl text-white'/>
                    </div>
                    <h5 className={'absolute top-o left-24'}>Taxfiling Information</h5>
                </div>

                {/*transfer file*/}
                {
                    accountantData &&
                    <div className={''}>
                        <div className={'flex items-center gap-2 !text-purple-500'}>
                            <h6><GrTransaction color={"#F87A53"} /></h6>
                            <h6 className={"text-teal-500 font-semibold"}>{i18n?.t('Transfer to')}</h6>
                        </div>
                        <Form
                            form={form}
                        >
                            <LoaderButton loadingRequest={transferLoading}>
                                <FormSelect
                                    name="accountant"
                                    placeholder={'Please select an accountant'}
                                    options={accountantData?.map(d => ({
                                        label: `${d?.department?.name || "N/A"} - ${d?.permission?.name || "N/A"} - ${d?.username || "N/A"} - ${d?.email || "N/A"}`,
                                        value: d?._id
                                    }))}
                                    required
                                    search
                                    onSelect={async (value) => {
                                        setTransferLoading(true)
                                        const data = {
                                            taxfile_id: taxFileData?._id,
                                            accountant_id: value,
                                        }
                                        await userAction(postTransferFileBetweenAccountant, data, () => {
                                            setTimeout(() => {
                                                const redirect = admin ? "/admin/taxfiles" : "/accountant/taxfiles"
                                                router.push(redirect)
                                            }, 3000)
                                        })
                                        setTransferLoading(false)
                                    }}
                                />
                            </LoaderButton>
                        </Form>
                    </div>
                }

                {/* form data display */}
                <div className='border-t-2'>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Payment</p>
                        {
                            taxFileData?.payment === 'paid' ?
                                <p className=''><span
                                    className='bg-green-500 text-white px-2 py-1 rounded'>Success</span></p>
                                :
                                <p className=''><span className='bg-red-500 text-white px-2 py-1 rounded'>N/A</span></p>
                        }
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Tax Filing Year</p>
                        <p className=''>{taxFileData?.year}</p>
                    </div>


                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Name</p>
                        <p className=''>{user_name}</p>
                    </div>

                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Profile Image</p>
                        <p className=''>
                            <Link href={`${image ?? ""}`}>
                                <a target="_blank"
                                   className='hover:cursor-pointer text-purple-500 hover:text-purple-600'>
                                    <MdOutlineFileDownload size={18} className='hover:shadow-md'/>
                                </a>
                            </Link>
                        </p>
                    </div>

                    {/*dynamic form data*/}
                    <div className={''}>
                        {
                            keys?.map((d, i) => <div key={i}>
                                {
                                    isValidUrl(values[i]) ?
                                        <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                                            <p className='font-bold'>{capitalizeFirstLetter(d?.split("_").join(' '))}</p>
                                            <p className=''>
                                                <Link href={`${values[i] ?? ''}`}>
                                                    <a target="_blank"
                                                       className='hover:cursor-pointer text-purple-500 hover:text-purple-600'>
                                                        <MdOutlineFileDownload size={18} className='hover:shadow-md'/>
                                                    </a>
                                                </Link>
                                            </p>
                                        </div>
                                        :
                                        <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                                            <p className='font-bold'>{capitalizeFirstLetter(d?.split("_").join(' '))}</p>
                                            <p style={{paddingLeft: '5px'}}>{typeof values[i] === "boolean" ? values[i] === true ? "yes" : "no" : values[i]}</p>
                                        </div>
                                }
                            </div>)
                        }
                    </div>

                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Tax File Status</p>
                        {
                            taxFileData?.status === "New File" ?
                                <p>
                                    <span className='bg-red-500 px-2 py-1 text-white rounded-md'>
                                        Pending
                                    </span>
                                </p>
                                :
                                <p>
                                    <span className='bg-green-500 px-2 py-1 text-white rounded-md'>
                                        {taxFileData?.status}
                                    </span>
                                </p>
                        }
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Assigned To Accountant</p>
                        {
                            !!taxFileData?.assigned_accountant ?
                                <p className=''><span className='bg-green-500 text-white px-2 py-1 rounded'>Yes</span>
                                </p>
                                :
                                <p className=''><span className='bg-red-500 text-white px-2 py-1 rounded'>No</span></p>
                        }
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Submission Date</p>
                        <p className=''>{new Date(taxFileData?.createdAt).toLocaleString()}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Last Updated</p>
                        <p className=''>{new Date(taxFileData?.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className='grid grid-cols-2 px-2 pt-2 border-b-2'>
                        <p className='font-bold'>Progress</p>
                        <p className=''>{taxFileData?.progress_number}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxFileRight;