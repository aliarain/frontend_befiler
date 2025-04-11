import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Drawer, Space } from 'antd';
const { Option } = Select;
import ExecutiveTeam from '../drawer/executiveTeam';
import AccountingAffiliates from '../drawer/accountingAffiliates';
import PhotoGallery from '../drawer/photoGallery';
import { AiOutlineCheck } from "react-icons/ai";
import { createSiteContentAboutAPI, getSiteContentAboutAPI, updateSiteContentAboutAPI } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';
import { DotLoader } from 'react-spinners';
import TextArea from 'antd/lib/input/TextArea';
import { BiEdit } from 'react-icons/bi';
import ExecutiveAndAffiliate from '../site-settings-actions/view-all/executiveAndAffiliate';



const ManageContent = () => {
    const [form] = Form.useForm();
    const [refreshPage, setRefreshPage] = useState(null);
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const [contentAboutData, setContentAboutData] = useState({})


    // fetch existing data
    useEffect(() => {
        getSiteContentAboutAPI().then(data => {
            setContentAboutData(data?.data)
        })

        setRefreshPage(null);
    }, [refreshPage])

    // form data loading, if exist
    useEffect(() => {
        form.setFieldsValue({
            ...contentAboutData
        })
    }, [contentAboutData])


    // Drawer
    const [visible, setVisible] = useState(false);
    const [toggleComponent, setToggleComponent] = useState('')

    // actions and table view
    const [actionData, setActionData] = useState(null)
    const [actionTitle, setActionTitle] = useState('')

    const showDrawer = (data) => {
        setVisible(true);
        setToggleComponent(data)

        setActionTitle('')
    };
    const onClose = () => {
        setVisible(false);
    };

    const handleUserAction = (acData, acTitle) => {
        setActionTitle(acTitle);
        setActionData(acData);
        setVisible(true);

        setToggleComponent('')
    }

    // form submission
    const onFinish = (values) => {
        const contentData = {
            about: values.about,
            title: values.title,
            our_goal: values.our_goal,
            name: values.name
        }

        // if data exist, so update document
        if (contentAboutData?._id) {
            const queryValue = { id: contentAboutData?._id }
            updateSiteContentAboutAPI(contentData, queryValue).then(data => {
                if (data?.status === true) {
                    toast.success('Updated Successfully');
                    setLoadSpinner(false)
                    setRefreshPage(data)

                } else {
                    setLoadSpinner(false)
                    toast.success(data?.message)
                }
            })

        } else {
            // if data not exist, so create document
            createSiteContentAboutAPI(contentData).then(data => {
                if (data?.status === true) {
                    toast.success('Created Successfully');
                    setLoadSpinner(false)
                    setRefreshPage(data)
                } else {
                    setLoadSpinner(false)
                    toast.error(data?.message)
                }
            })
        }
    };


    return (
        <section className="p-5">
            <div className='relative'>
                <Form
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                    className=''
                >
                    <Form.Item
                        label="Website Name"
                        name="name"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Website Name!',
                            },
                        ]}
                    >
                        <Input placeholder='Website Name' />
                    </Form.Item>

                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Title!',
                            },
                        ]}
                    >
                        <Input placeholder='Title' />
                    </Form.Item>

                    <Form.Item
                        label="About"
                        name="about"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input About!',
                            },
                        ]}
                    >
                        <TextArea placeholder='About' cols={5} rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Our Goal"
                        name="our_goal"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Our Goal!',
                            },
                        ]}
                    >
                        <Input placeholder='Our Goal' />
                    </Form.Item>


                    {/* execute upload  */}
                    <Form.Item
                        label="Add New Executive Team Member"
                        name="executive_team"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Executive Team!',
                            },
                        ]}
                    >
                        <div className="flex items-center gap-2">
                            <span className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer' onClick={() => showDrawer("executive_team")}> <span className='font-semibold'>+</span> Add </span>

                            {
                                contentAboutData?.executive_team?.length > 0 && <span className="text-green-500 pl-5 flex items-center gap-2"> <span className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{contentAboutData?.executive_team?.length}</span> <AiOutlineCheck size={20} /> </span>
                            }

                            {
                                contentAboutData?.executive_team?.length > 0 && <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer" title='View Details and actions' onClick={() => handleUserAction(contentAboutData?.executive_team, 'executive_team')}> <BiEdit size={22} className='text-cyan-500 hover:text-cyan-600' /> </span>
                            }
                        </div>
                    </Form.Item>


                    {/* affiliate upload  */}
                    <Form.Item
                        label="Add New Accounting Affiliate"
                        name="accounting_affiliates"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Accounting Affiliates!',
                            },
                        ]}
                    >
                        <div className="flex items-center gap-2">
                            <span className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer' onClick={() => showDrawer("accounting_affiliates")}> <span className='font-semibold'>+</span> Add </span>

                            {
                                contentAboutData?.accounting_affiliates?.length > 0 && <span className="text-green-500 pl-5 flex items-center gap-2"> <span className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{contentAboutData?.accounting_affiliates?.length}</span> <AiOutlineCheck size={20} /> </span>
                            }

                            {
                                contentAboutData?.accounting_affiliates?.length > 0 && <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer" title='View Details and actions' onClick={() => handleUserAction(contentAboutData?.accounting_affiliates, 'accounting_affiliates')}> <BiEdit size={22} className='text-cyan-500 hover:text-cyan-600' /> </span>
                            }
                        </div>
                    </Form.Item>

                    {/* image upload  */}
                    <Form.Item
                        label="Add New Photo for Photo Gallery"
                        name="photo_gallery"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Photo Gallery!',
                            },
                        ]}
                    >
                        <div className="flex items-center gap-2">
                            <span className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer' onClick={() => showDrawer("photo_gallery")}> <span className='font-semibold'>+</span> Add </span>
                            {
                                contentAboutData?.photo_gallery?.length > 0 && <span className="text-green-500 pl-5 flex items-center gap-2"> <span className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{contentAboutData?.photo_gallery?.length}</span> <AiOutlineCheck size={20} /> </span>
                            }

                            {
                                contentAboutData?.photo_gallery?.length > 0 && <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer" title='View Details and actions' onClick={() => handleUserAction(contentAboutData?.photo_gallery, 'photo_gallery')}> <BiEdit size={22} className='text-cyan-500 hover:text-cyan-600' /> </span>
                            }
                        </div>
                    </Form.Item>


                    <div className='mt-5'>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </div>

                </Form>

                {/* spinner loader */}
                {
                    loadingSpinner &&
                    <span className="absolute top-[40%] left-[40%]">
                        <DotLoader color="purple" size={60} />
                    </span>
                }
            </div>


            {/* Drawer UI */}
            <Drawer
                title={
                    `               
                ${toggleComponent === "executive_team" && 'Add One or More New Executive Team Member' || toggleComponent === "accounting_affiliates" && 'Add New Accounting Affiliate' || toggleComponent === "photo_gallery" && 'Add New Photos' || ""}  
                
                ${((actionTitle === "executive_team") || (actionTitle === "accounting_affiliates")) ? "User Details" : ''}
                
                ${(actionTitle === "photo_gallery") ? "Photo Gallery" : ''}

                `}

                width={500}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                destroyOnClose
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                {
                    toggleComponent === "executive_team" &&
                    < ExecutiveTeam onClick={onClose} setRefreshPage={setRefreshPage} contentAboutData={contentAboutData} />
                }
                {
                    toggleComponent === "accounting_affiliates" &&
                    < AccountingAffiliates onClick={onClose} setRefreshPage={setRefreshPage} contentAboutData={contentAboutData} />
                }
                {
                    toggleComponent === "photo_gallery" &&
                    < PhotoGallery onClick={onClose} setRefreshPage={setRefreshPage} contentAboutData={contentAboutData} />
                }


                {/* user action + table view */}
                {
                    actionTitle === "executive_team" &&
                    < ExecutiveAndAffiliate actionTitle={actionTitle} actionData={actionData} setRefreshPage={setRefreshPage} onClick={onClose} />
                }
                {
                    actionTitle === "accounting_affiliates" &&
                    < ExecutiveAndAffiliate actionTitle={actionTitle} actionData={actionData} setRefreshPage={setRefreshPage} onClick={onClose} />
                }
                {
                    actionTitle === "photo_gallery" &&
                    < ExecutiveAndAffiliate actionTitle={actionTitle} actionData={actionData} setRefreshPage={setRefreshPage} onClick={onClose} />
                }
            </Drawer>


            {/* toast message */}
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
    );
};

export default ManageContent;