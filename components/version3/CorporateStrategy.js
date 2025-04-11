import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal} from "antd";
import { toast, ToastContainer } from 'react-toastify';
import {
    AWSFileUploadAPI,
    createSiteHomeServiceBlogsAPI,
    updateSiteHomeServiceBlogsAPI
} from "../../helpers/backend_helper";
import {AiOutlineCheck} from "react-icons/ai";
import {ClipLoader, DotLoader} from "react-spinners";
import Link from "next/link";
import {FaDownload} from "react-icons/fa";
import FormInput from "../form/input";

const CorporateStrategy = ({data, isOpen}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const [refreshPage, setRefreshPage] = useState(null);
    const [corporateImages, setCorporateImages] = useState({img1: undefined, img2: undefined});
    const [isPhotoUploaded1, setIsPhotoUploaded1] = useState(false);
    const [isPhotoUploaded2, setIsPhotoUploaded2] = useState(false);
    const [fileLoading1, setFileLoading1] = useState(false);
    const [fileLoading2, setFileLoading2] = useState(false);
    const [themeData, setThemeData] = useState();
    const [isFormImageUploaded, setIsFormImageUploaded] = useState(false);
    const [form] = Form.useForm();

    // form submission
    const onFinish = (values) => {
        setLoadSpinner(true)
        const payload = {...values?.corporate_strategy, ...corporateImages}
        // if data exist, so update document
        if (data?._id) {
            const queryValue = {id: data?._id}
            updateSiteHomeServiceBlogsAPI({_id: values?._id, corporate_strategy: payload}, queryValue).then(data => {
                if (data?.status === true) {
                    setLoadSpinner(false)
                    setRefreshPage(data)

                } else {
                    setLoadSpinner(false)
                    toast.success(data?.message)
                }
            })

        } else {
            // if data not exist, so create document
            createSiteHomeServiceBlogsAPI({corporate_strategy: payload}).then(data => {
                if (data?.status === true) {
                    setLoadSpinner(false)
                    setRefreshPage(data)
                } else {
                    setLoadSpinner(false)
                    toast.error(data?.message)
                }
            })
        }
        setModalVisible(false)
    };

    // form data loading, if exist
    useEffect(() => {
        if(data?._id) {
            form.resetFields();
            form.setFieldsValue({
                ...data
            })
            setThemeData(form.getFieldValue().themeData)
        }
    }, [data?._id])

    const handleImage1 = async (e) => {
        setFileLoading1(true);
        const data = new FormData()
        data.append('file', e.target.files[0])
        AWSFileUploadAPI(data).then(url => {
            if (url?.url) {
                setCorporateImages(pre => ({...pre, img1: url?.url}))
                setIsPhotoUploaded1(true)
                setFileLoading1(false)

            } else {
                setIsPhotoUploaded1(false)
                setFileLoading1(false)
            }
        });
    }

    const handleImage2 = async (e) => {
        setFileLoading2(true);
        const data = new FormData()
        data.append('file', e.target.files[0])
        AWSFileUploadAPI(data).then(url => {
            if (url?.url) {
                setCorporateImages(pre => ({...pre, img2: url?.url}))
                setIsPhotoUploaded2(true)
                setFileLoading2(false)

            } else {
                setIsPhotoUploaded2(false)
                setFileLoading2(false)
            }
        });
    }

    return (
        <>
            <div className="flex items-center mb-4">
                <span
                    className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer'
                    onClick={() => {
                        setModalVisible(true)
                        if(themeData?.version === "v3" && themeData?.theme === "two") {
                            setIsFormImageUploaded(false)
                        } else {
                            setIsFormImageUploaded(true)
                        }
                    }}
                >
                    <span className='font-semibold'> + </span>
                    Add Corporate Strategy
                </span>
            </div>

            <Modal
                title={'Add Corporate Strategy Information'}
                visible={modalVisible}
                destroyOnClose
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form
                    onFinish={onFinish}
                    form={form}
                    layout={'vertical'}
                >
                    {/* image 1 */}
                    <Form.Item
                        label="Image 1"
                        name={['corporate_strategy', "img1"]}
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Company Logo!',
                            },
                        ]}
                    >
                        <div className="flex items-center gap-2 relative">
                            <input type='file'
                                   placeholder='Company Logo'
                                   style={{
                                       width: '200px',
                                       backgroundColor: '#A14EE7',
                                       color: '#fff',
                                       borderRadius: '5px',
                                       paddingLeft: '5px',
                                       paddingTop: '2px',
                                       paddingBottom: '2px'
                                   }}
                                   onChange={handleImage1}

                            />
                            {
                                isPhotoUploaded1 > 0 && <span className="text-green-500 pl-5">
                                                <AiOutlineCheck size={20}/>
                                            </span>
                            }

                            {
                                fileLoading1 === true &&
                                <span className="flex justify-center absolute top-0 left-72">
                                                <ClipLoader color="purple" size={30}/>
                                            </span>
                            }

                            {
                                data?.corporate_strategy?.img1 &&
                                <span className="flex justify-center items-center absolute top-0 left-72"
                                      title='Download logo'>
                                                <Link href={data?.corporate_strategy?.img1}>
                                                    <a>
                                                        <FaDownload size={20}
                                                                    className='text-purple-500 cursor-pointer'/>
                                                    </a>
                                                </Link>
                                            </span>
                            }
                        </div>
                    </Form.Item>

                    {/* image 2 */}
                    {
                        isFormImageUploaded &&
                        <Form.Item
                            label="Image 2"
                            name={['corporate_strategy', "img2"]}
                            rules={[
                                {
                                    required: false,
                                    message: 'Please Input Company Logo!',
                                },
                            ]}
                        >
                            <div className="flex items-center gap-2 relative">
                                <input type='file'
                                       placeholder='Company Logo'
                                       style={{
                                           width: '200px',
                                           backgroundColor: '#A14EE7',
                                           color: '#fff',
                                           borderRadius: '5px',
                                           paddingLeft: '5px',
                                           paddingTop: '2px',
                                           paddingBottom: '2px'
                                       }}
                                       onChange={handleImage2}

                                />
                                {
                                    isPhotoUploaded2 > 0 && <span className="text-green-500 pl-5">
                                                <AiOutlineCheck size={20}/>
                                            </span>
                                }

                                {
                                    fileLoading2 === true &&
                                    <span className="flex justify-center absolute top-0 left-72">
                                                <ClipLoader color="purple" size={30}/>
                                            </span>
                                }

                                {
                                    data?.corporate_strategy?.img2 &&
                                    <span className="flex justify-center items-center absolute top-0 left-72"
                                          title='Download logo'>
                                                <Link href={data?.corporate_strategy?.img2}>
                                                    <a>
                                                        <FaDownload size={20}
                                                                    className='text-purple-500 cursor-pointer'/>
                                                    </a>
                                                </Link>
                                            </span>
                                }

                            </div>
                        </Form.Item>
                    }

                    <div className={'border rounded-md px-3 pt-3'}>
                        <FormInput
                            name={['corporate_strategy', "title"]}
                            placeholder={'Corporate title'}
                            label={'Corporate title'}
                            required
                        />
                        <FormInput
                            name={['corporate_strategy', "description"]}
                            placeholder={'Corporate description'}
                            label={'Corporate description'}
                            required
                            type={'textArea'}
                            rows={2}
                        />
                    </div>

                    {/*section*/}
                    <div className={'border rounded-md px-3 pt-3 mt-3'}>
                        <FormInput
                            name={['corporate_strategy', "section1"]}
                            placeholder={'Corporate section1 title'}
                            label={'Section1 title'}
                            required
                        />
                        <FormInput
                            name={['corporate_strategy', "section1_des"]}
                            placeholder={'Corporate section1 description'}
                            label={'Section1 description'}
                            type={'textArea'}
                            rows={2}
                        />
                        <FormInput
                            name={['corporate_strategy', "section2"]}
                            placeholder={'Corporate section2 title'}
                            label={'Section2 title'}
                            required
                        />
                        <FormInput
                            name={['corporate_strategy', "section2_des"]}
                            placeholder={'Corporate section2 description'}
                            label={'Section2 description'}
                            type={'textArea'}
                            rows={2}
                        />
                    </div>

                    <div className='mt-3 flex justify-center '>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </div>
                    {/* spinner loader */}
                    {
                        loadingSpinner &&
                        <span className="absolute top-[40%] left-[40%]">
                        <DotLoader color="purple" size={60}/>
                    </span>
                    }
                </Form>
            </Modal>

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
        </>
    );
};

export default CorporateStrategy;