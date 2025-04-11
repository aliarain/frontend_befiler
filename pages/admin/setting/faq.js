import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { Form, Input } from 'antd';
import Table from '../../../components/admin/table/table';
import { faqCreateAPI, getAllFaqAPI } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';
import swalAlert from '../../../components/common/swalAlert';
import deleteAction from '../../../components/common/delete';
import { useFetch } from '../../../helpers/hooks';
import Head from 'next/head';
import AdminSettingFeedbacks from "./feedbacks";
const { Search } = Input;


const AdminSettingFAQ = () => {
    const [faqs, getFaqs, { loading, error }] = useFetch(getAllFaqAPI);
    const [refreshData, setRefreshData] = useState(null);
    const [searchValue, setSearchValue] = useState(null)

    // fetch all relevant data and update state
    useEffect(() => {
        const data = {
            searchValue: searchValue,
            size: 10
        }
        getFaqs(data)

        setRefreshData(null);
    }, [refreshData, searchValue])

    // handle on search 
    const onSearch = (e) => {
        const value = (e.target.value).trim();
        setSearchValue(value)
    }

    // submit faq to db
    const onFinish = (values) => {
        faqCreateAPI(values).then(data => {
            if (data?.status === true) {
                toast.success(data?.message);
                setRefreshData(data?.data)

            } else {
                toast.success(data?.message);
            }
        })
    };

    // delete
    const deleteHandleAction = async (id) => {
        let { isConfirmed } = await swalAlert.confirm(
            "Are you want to delete this faq?",
            "Yes, Delete"
        );
        if (isConfirmed) {
            const data = { id };
            await deleteAction(data, "faq", setRefreshData);
        }
    };

    const column = [
        { dataField: 'question', headerName: 'Question' },
        {
            dataField: 'answer', headerName: 'Answer', formatter: answer => (

                <span>{answer?.slice(0, 60)}...</span>
            )
        },
        {
            dataField: '_id', headerName: 'Actions', formatter: _id => (
                <div className='flex justify-around'>
                    <span className='inline-block bg-[#E02D1B] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => deleteHandleAction(_id)} title="Delete this account"><RiDeleteBin6Line /></span>
                </div>
            )
        },
    ]


    return (
        <>
            <section className='bg-gray-100 mx-2 rounded-md pt-12 min-h-screen'>
                <Head>
                    <title>User FAQ</title>
                </Head>


                <div className='bg-gray-50 m-4 rounded-t shadow-sm'>
                    <div className='relative p-6' >
                        {/* upper design */}
                        <div className='h-12'>
                            <div className='absolute w-16 h-16 bg-purple-600 shadow-md rounded flex items-center justify-center text-white -top-5'>
                                <span> <MdAccountCircle size={35} /> </span>
                            </div>

                            <span className='capitalize font-medium text-[16px] ml-20'>frequently asked question</span>
                        </div>
                    </div>

                    {/* question and answer form */}
                    <div className='px-10 pb-4'>
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                                remember: false,
                            }}
                        >
                            <Form.Item
                                label="Question"
                                name="question"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder='Write your question here...' style={{}} />
                            </Form.Item>

                            <Form.Item
                                label="Answer"
                                name="answer"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder='Answer your question here...' style={{}} />
                            </Form.Item>

                            <Form.Item>
                                <button className='btn-taxants text-white mt-4'> <span>Create New Question</span></button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                {/* answers here */}
                <div className='bg-gray-50 m-4 rounded-t shadow-sm px-10 pb-4'>
                    {/* search box */}
                    <div className='flex justify-end pt-3'>
                        <Search
                            placeholder="Search Question"
                            onChange={onSearch}
                            style={{
                                width: 200,
                            }}
                            allowClear
                        />
                    </div>

                    <Table
                        columns={column}
                        data={faqs}
                        pagination={true}
                        loading={loading}
                        onReload={getFaqs}
                    />
                </div>


                {/* // toast message */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </section>
        </>
    );
};
AdminSettingFAQ.layout = AdminLayout
export default AdminSettingFAQ;