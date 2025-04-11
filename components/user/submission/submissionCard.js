import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { MdCloudDownload } from "react-icons/md";
import { Tooltip, Progress } from "antd";
import swalAlert from "../../common/swalAlert";
import deleteAction from "../delete/delete";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify';
import Link from "next/link";
import { FaCentos } from "react-icons/fa";



const SubmissionCard = ({ userTaxFiles, setRefreshData }) => {
    const router = useRouter();

    // delete tax form
    const handleDeleteTaxForm = async (id) => {
        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this tax form?', 'Yes, Delete')
        if (isConfirmed) {
            const data = { id }
            await deleteAction(data, 'taxfile', setRefreshData)
        }
    }

    // handle Edit
    const handleEdit = (id, year) => {
        if (!!id && !!year) {
            router.push(`/user/submitted-tax-file/create/step2/?formID=${id}&year=${year}`)
        }
    }

    // handle stripe payment
    const handleStripePayment = (formStatus) => {
        if (formStatus === 'done') {
            router.push(`/user/submitted-tax-file/create/step3-payment/?formID=${userTaxFiles?._id}`)

        } else {
            toast.warning('Please complete the tax form by the edit button')
        }
    }

    // tooltip notification
    const textDel = <span>Delete File</span>;
    const textEdit = <span>Edit Info</span>;
    const textPayDone = <span>Your payment has received. Thanks!</span>;
    let progressTitle;
    if (userTaxFiles?.progress_number === 15) {
        progressTitle = <span>Please give us more information.</span>;

    } else if (userTaxFiles?.progress_number === 25) {
        progressTitle = <span>Please complete your payment process.</span>;

    } else if (userTaxFiles?.progress_number === 50) {
        progressTitle = <span>Your file has been received and is now processing....</span>;

    } else if (userTaxFiles?.progress_number === 75) {
        progressTitle = <span>Your file has been submitted to an accountant!</span>;

    } else if (userTaxFiles?.progress_number === 100) {
        progressTitle = <span>Complete! Thanks for staying with us</span>;

    }

    const text = <span className={'underline cursor-pointer'} onClick={() => router.push('/user/submitted-tax-file/details?id='+userTaxFiles?._id)}>
        {`Tax File ID : ${userTaxFiles?.ID}`}
    </span>


    return (
        <div className="h-80 w-64 border-2 rounded-md p-4 shadow-sm bg-slate-50 relative">
            <Tooltip placement="top" title={text} color="purple">
                <span className="absolute top-1 right-1">
                    <FaCentos size={16} className="text-purple-500 hover:text-purple-500 cursor-pointer" />
                </span>
            </Tooltip>

            {/* tax file submitted card */}
            <div className="-space-y-2 text-gray-500">
                <p className="text-center">SUBMISSION YEAR {userTaxFiles?.year}</p>
                <p className="inline-block text-[12px] text-center">
                    We will notify you when your form will proceed.
                </p>

                {/* card complete status and edit and delete actions */}
                <div className="flex justify-center gap-4 items-center mt-4">
                    {
                        userTaxFiles?.form_fill_up === 'done' &&
                        <div className="w-12 h-auto flex justify-center hover:bg-green-100 cursor-pointer rounded-md hover:shadow-sm">
                            <span className="text-green-500 py-1">
                                <AiOutlineCheck size={18} />
                            </span>
                        </div>
                    }
                    {
                        userTaxFiles?.form_fill_up === 'pending' &&
                        <Tooltip placement="top" title={textDel}>
                            <div className="w-12 h-auto flex justify-center hover:bg-red-100 cursor-pointer rounded-md hover:shadow-sm" onClick={() => handleDeleteTaxForm(userTaxFiles?._id)}>
                                <span className="text-red-500 py-1">
                                    <AiOutlineClose size={18} />
                                </span>
                            </div>
                        </Tooltip>
                    }
                    {
                        userTaxFiles?.form_fill_up === 'pending' &&
                        <Tooltip placement="top" title={textEdit}>
                            <div className="w-12 h-auto flex justify-center hover:bg-cyan-100 cursor-pointer rounded-md hover:shadow-sm" onClick={() => handleEdit(userTaxFiles?._id, userTaxFiles?.year)}>
                                <span className="text-sky-500 py-1">
                                    <BsPencilFill size={18} />
                                </span>
                            </div>
                        </Tooltip>
                    }
                </div>

                {/* progress bar */}
                <Tooltip placement="top" title={progressTitle} color='blue'>
                    <div
                        style={{
                            width: '100%',
                        }}
                        className="mt-2 cursor-pointer"
                    >
                        <Progress percent={userTaxFiles?.progress_number} size="small" status="active" />
                    </div>
                </Tooltip>


                {
                    userTaxFiles?.file_from_accountant ?

                        <div className="mt-4 flex justify-center cursor-pointer">
                            <Link href={userTaxFiles?.file_from_accountant}>
                                <Tooltip placement="top" title='Download your file' color='#26C158'>
                                    <div className="h-14 w-14 rounded-full border flex justify-center items-center hover:bg-gray-100 hover:scale-110 transition duration-500 hover:shadow-sm">
                                        <span className="text-red-600">
                                            <MdCloudDownload size={28} />
                                        </span>
                                    </div>
                                </Tooltip>
                            </Link>
                        </div>
                        :

                        <div className="mt-4 flex justify-center cursor-wait">
                            <Tooltip placement="top" title='Not ready yet!' color={"volcano"}>
                                <div className="h-14 w-14 rounded-full border flex justify-center items-center">
                                    <span className="text-red-600">
                                        <MdCloudDownload size={28} />
                                    </span>
                                </div>
                            </Tooltip>
                        </div>
                }


                <div className="mt-4 flex justify-center">
                    {
                        userTaxFiles?.stripe_payment === 'paid' &&
                        <Tooltip placement="top" title={textPayDone}>
                            <div className="flex justify-center items-center gap-2 bg-green-500 text-white px-2 py-1 rounded-md hover:shadow-lg cursor-pointer">
                                <span>
                                    <AiOutlineCheck />
                                </span>
                                <span className="text-[12px]">
                                    PAID
                                </span>
                            </div>
                        </Tooltip>
                    }
                    {
                        userTaxFiles?.stripe_payment === 'pending' &&
                        <div className="flex justify-center items-center gap-2 bg-[#f5a021] text-white px-2 py-1 rounded-md hover:bg-[#F08F00] hover:shadow-lg cursor-pointer" onClick={() => handleStripePayment(userTaxFiles?.form_fill_up)}>
                            <span>
                                <BsPencilFill />
                            </span>
                            <span className="text-[12px]">
                                CONFIRM YOUR PAYMENT
                            </span>
                        </div>
                    }
                </div>
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
        </div>
    );
};

export default SubmissionCard;
