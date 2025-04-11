import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Modal, Drawer, Space } from 'antd';
import { AWSFileUploadAPI, createTaxSituationAPI, getAllUserRoleExceptAdminAPI, getOneTaxSituationAPI, updateTaxSituationAPI } from '../../../helpers/backend_helper';
import { AiFillQuestionCircle, AiOutlineCheck } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import AddProcessDescription from '../site-settings-actions/addProcessDescription';
import WorkProcessSituation from '../site-settings-actions/view-all/workProcessSituation';
import Link from 'next/link';
const { Option } = Select;


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
    },
};


const ManageTaxSituation = ({ }) => {
    const [form] = Form.useForm();
    const [getUserRoleID, setUserRoleID] = useState(null);
    const [refreshPage, setRefreshPage] = useState(null);
    const [allUserRoleData, setAllUserRoleData] = useState([]);
    const [getOneTaxSituationData, setOneTaxSituationData] = useState({});
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [fileLoading2, setFileLoading2] = useState(false);
    const [fileLoading3, setFileLoading3] = useState(false);
    const [taxSituationImages, setTaxSituationImages] = useState([]);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [isPhotoSection2, setIsPhotoSection2] = useState(false);
    const [isPhotoSection3, setIsPhotoSection3] = useState(false);


    // fetch tax situation data by selected user-role based id
    useEffect(() => {
        const userRoleID = { userRoleID: getUserRoleID }
        getOneTaxSituationAPI(userRoleID).then(res => {
            if (res?.status === true) {
                setOneTaxSituationData(res?.data)
            }
        })

        setRefreshPage(null);
    }, [refreshPage, getUserRoleID])


    // fetch all user-role data
    useState(() => {
        getAllUserRoleExceptAdminAPI().then(res => {
            if (res?.status === true) {
                setAllUserRoleData(res?.data)
            }
        })
    }, [])


    // form data loading, if exist
    useEffect(() => {
        form.setFieldsValue({
            ...getOneTaxSituationData
        })
    }, [getOneTaxSituationData])

    // user selection id
    const onChangeSelection = (value) => {
        setUserRoleID(value);
    };


    // image upload and store in array
    const handleWebsiteLogo = async (e, fieldName) => {
        if (fieldName === 'hero_section_image') {
            setFileLoading(true)
        } else if (fieldName === 'section_2_image') {
            setFileLoading2(true)
        } else if (fieldName === 'section_3_image') {
            setFileLoading3(true)
        }

        const data = new FormData()
        data.append('file', e.target.files[0])

        AWSFileUploadAPI(data).then(url => {
            if (url?.url) {

                const obj = {};
                obj[fieldName] = url?.url;

                setTaxSituationImages(pre => [...pre, obj])

                if (fieldName === 'hero_section_image') {
                    setIsPhotoUploaded(true)
                    setFileLoading(false)
                } else if (fieldName === 'section_2_image') {
                    setIsPhotoSection2(true)
                    setFileLoading2(false)
                } else if (fieldName === 'section_3_image') {
                    setIsPhotoSection3(true)
                    setFileLoading3(false)
                }
            }
            setFileLoading(false)
            setFileLoading2(false)
            setFileLoading3(false)
        });
    }

    // draft text catch
    const [processDetails, setProcessDetails] = useState(null);
    const [allDetails, setAllDetails] = useState([]);
    const onChangeDraft = (v) => {
        setProcessDetails(v)
    }

    // modal view
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setAllDetails(pre => [...pre, { processDetails }])
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    // drawer open
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    };

    // submit information to the backend
    const onFinish = (values) => {
        setLoadSpinner(true)
        taxSituationImages?.forEach(imageData => values[Object.keys(imageData)[0]] = Object.values(imageData)[0])

        values.work_process_description = allDetails;

        // if data exist, so update document
        if (getOneTaxSituationData?._id) {
            const queryValue = { id: getOneTaxSituationData?._id }
            updateTaxSituationAPI(values, queryValue).then(data => {
                if (data?.status === true) {
                    toast.success('Updated Successfully');
                    setLoadSpinner(false)
                    setRefreshPage(data)

                } else {
                    setLoadSpinner(false)
                    toast.error(data?.message)
                }
            })

        } else {
            // if data not exist, so create document
            values.user_role = getUserRoleID;
            createTaxSituationAPI(values).then(data => {
                if (data?.status === true) {
                    toast.success('Create Successfully');
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
        <section className="p-5 mb-5">
            {/* select user */}
            <div className='mx-auto mb-4'>
                <div className='w-full md:w-2/3 mx-auto flex items-center'>
                    <span className='text-[16px] w-[150px] text-center'>Select User : </span>
                    <Select
                        showSearch
                        className='w-full'
                        placeholder="Please select user role first"
                        optionFilterProp="children"
                        onChange={onChangeSelection}
                    >
                        {
                            allUserRoleData?.map((role, ind) => <Option value={role?._id} key={role?._id}>{role?.display_name}</Option>)
                        }
                    </Select>
                </div>
            </div>

            {/* tax situation information/form */}
            <div>
                <Form
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                    className=''
                >
                    <Form.Item
                        label="Hero section Title"
                        name="hero_section_title"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input hero section title!',
                            },
                        ]}
                    >
                        <Input placeholder='Title' />
                    </Form.Item>

                    <Form.Item
                        label="Hero section Sub-Title"
                        name="hero_section_title_Sub_title"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input hero section sub-title!',
                            },
                        ]}
                    >
                        <Input placeholder='Sub-Title' />
                    </Form.Item>


                    {/* hero section image */}
                    <Form.Item
                        label="Hero Section Image"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input hero section image!',
                            },
                        ]}
                    >
                        <div className="flex items-center gap-2 relative">
                            <input type='file'
                                placeholder='Hero Section Image'
                                style={{
                                    width: '200px', backgroundColor: '#A14EE7', color: '#fff', borderRadius: '5px', paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px'
                                }}
                                onChange={(e) => handleWebsiteLogo(e, "hero_section_image")}

                            />
                            {
                                isPhotoUploaded === true && <span className="text-green-500 pl-5">
                                    <AiOutlineCheck size={20} />
                                </span>
                            }

                            {
                                fileLoading === true &&
                                <span className="flex justify-center absolute top-0 left-72">
                                    <ClipLoader color="purple" size={30} />
                                </span>
                            }
                        </div>
                    </Form.Item>

                    {/* section 2 */}
                    <Form.Item
                        label="Section2 Title"
                        name="section_2_title"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input section2 title!',
                            },
                        ]}
                    >
                        <Input placeholder='Title' />
                    </Form.Item>

                    <Form.Item
                        label="Section2 Description"
                        name="section_2_sub_title"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input section2 sub-title!',
                            },
                        ]}
                    >
                        <Input placeholder='Sub Description' />
                    </Form.Item>

                    <Form.Item
                        label="Section2 Image"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input image!',
                            },
                        ]}
                    >
                        <div className="flex items-center gap-2 relative">
                            <input type='file'
                                placeholder='Section Image'
                                style={{
                                    width: '200px', backgroundColor: '#A14EE7', color: '#fff', borderRadius: '5px', paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px'
                                }}
                                onChange={(e) => handleWebsiteLogo(e, "section_2_image")}

                            />
                            {
                                isPhotoSection2 === true && <span className="text-green-500 pl-5">
                                    <AiOutlineCheck size={20} />
                                </span>
                            }

                            {
                                fileLoading2 === true &&
                                <span className="flex justify-center absolute top-0 left-72">
                                    <ClipLoader color="purple" size={30} />
                                </span>
                            }
                        </div>
                    </Form.Item>

                    {/* section 3 */}
                    <Form.Item
                        label="Section3 Title"
                        name="section_3_title"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input section3 title!',
                            },
                        ]}
                    >
                        <Input placeholder='Title' />
                    </Form.Item>

                    <Form.Item
                        label="Section3 Description"
                        name="section_3_sub_title"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input section3 sub-title!',
                            },
                        ]}
                    >
                        <Input placeholder='Sub Description' />
                    </Form.Item>

                    <Form.Item
                        label="Section3 Image"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input image!',
                            },
                        ]}
                    >
                        <div className="flex items-center gap-2 relative">
                            <input type='file'
                                placeholder='Section Image'
                                style={{
                                    width: '200px', backgroundColor: '#A14EE7', color: '#fff', borderRadius: '5px', paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px'
                                }}
                                onChange={(e) => handleWebsiteLogo(e, "section_3_image")}

                            />
                            {
                                isPhotoSection3 === true && <span className="text-green-500 pl-5">
                                    <AiOutlineCheck size={20} />
                                </span>
                            }

                            {
                                fileLoading3 === true &&
                                <span className="flex justify-center absolute top-0 left-72">
                                    <ClipLoader color="purple" size={30} />
                                </span>
                            }
                        </div>
                    </Form.Item>

                    {/* work process */}
                    <Form.Item
                        label="Work Process Section: Title"
                        name="work_process_title"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input section3 title!',
                            },
                        ]}
                    >
                        <Input placeholder='Title' />
                    </Form.Item>


                    {/* dynamic form input */}
                    <div className='flex gap-2'>
                        <span className='mb-2 inline-block'>Work Process section: Add Description</span>
                        <p><Link href="https://appstick-resources.s3.ap-southeast-1.amazonaws.com/workdemo.png"><a target="_blank" rel="noopener noreferrer">Click here</a></Link></p>
                    </div>


                    {/* Draft Board */}
                    <div className="flex items-center gap-2">
                        <span className='bg-purple-500 px-4 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer inline-block' onClick={showModal} >
                            <span className='font-semibold'> + </span>
                            Add Process Details
                        </span>


                        {
                            allDetails?.length > 0 && <span className="text-green-500 pl-5 flex items-center gap-2"> <span className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{allDetails?.length}</span> <AiOutlineCheck size={20} /> </span>
                        }

                        {
                            getOneTaxSituationData?.work_process_description?.length > 0 &&
                            <span className='text-purple-500 underline ml-5 cursor-pointer' onClick={() => setVisible(true)}>View All</span>
                        }
                    </div>


                    <div className='mt-5'>
                        <Button type="primary" htmlType="submit">
                            Create or Update
                        </Button>
                    </div>

                </Form>
            </div>


            <Modal title="Write Short Description" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose bodyStyle={{ height: 350 }}>
                <AddProcessDescription onChangeDraft={onChangeDraft} />
            </Modal>

            {/* Drawer UI for more details and actions */}
            <Drawer
                title='All Contents'
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
                <WorkProcessSituation workProcessData={getOneTaxSituationData} setRefreshPage={setRefreshPage} />
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

export default ManageTaxSituation;