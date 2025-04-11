import React from 'react';
import { Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import { fileUploadAWS } from '../../common/fileUploadAWS';
import { AiOutlineCheck } from 'react-icons/ai';
import { ClipLoader, DotLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import { createSiteHomeServiceBlogsAPI, updateArrayHomeServiceBlogsAPI } from '../../../helpers/backend_helper';
const { Option } = Select;



const WayToFileTaxesAndServices = ({ onCancel, siteHomeServiceBlog, setRefreshPage, titleData = '' }) => {
    const [imageUpload, setImageUpload] = useState(null);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [loadingSpinner, setLoadSpinner] = useState(false);


    // picture upload aws s3 bucket
    const handleImageUpload = async (e) => {
        if (e?.target?.files[0]?.size <= 204800) {
            const files = ['image/jpeg', 'image/png', 'image/jpg']

            if (files.includes(e?.target?.files[0]?.type)) {
                await fileUploadAWS(setFileLoading, e, setImageUpload, setIsPhotoUploaded, false);

            } else {
                toast.warning('Wrong file uploaded! Only jpg, jpeg, png are allowed')
            }

        } else {
            toast.warning('File size is too long!')
        }
    }


    // submit form info for create or update
    const onFinish = (values) => {
        setLoadSpinner(true)
        let valData;

        if (titleData === 'way') {
            valData = {
                way_to_file_tax: {
                    image: imageUpload,
                    title: values.title,
                    description: values.description,
                }
            }

        } else if (titleData === 'services') {
            valData = {
                services: {
                    logo: imageUpload,
                    title: values.title,
                    description: values.description,
                }
            }
        }

        // if data exist, so update document
        if (siteHomeServiceBlog?._id) {
            const queryValue = { id: siteHomeServiceBlog?._id }
            updateArrayHomeServiceBlogsAPI(valData, queryValue).then(data => {
                if (data?.status === true) {
                    toast.success('Updated Successfully');
                    setLoadSpinner(false)
                    setRefreshPage(data)
                    onCancel()

                } else {
                    setLoadSpinner(false)
                }
            })

        } else {
            // if data not exist, so create document
            createSiteHomeServiceBlogsAPI(values).then(data => {
                if (data?.status === true) {
                    toast.success('Create Successfully');
                    setLoadSpinner(false)
                    setRefreshPage(data)
                    onCancel()
                } else {
                    setLoadSpinner(false)
                }
            })
        }
    };


    return (
        <div>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
                className=''
            >
                <Form.Item
                    label="Upload PNG Image/Logo [Optional]"
                    name="image"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input Upload Image!',
                        },
                    ]}
                    className=''
                    extra='Max file size 200KB'
                >
                    <div className='flex items-center gap-2 relative'>
                        <Input type='file' onChange={handleImageUpload} className='text-white px-1' style={{ backgroundColor: '#A14EE7', borderRadius: '10px' }} />
                        {
                            isPhotoUploaded > 0 && <span className="text-green-500 pl-5">
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
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input Description!',
                        },
                    ]}
                >
                    <TextArea rows={3} cols={5} placeholder='Description' />
                </Form.Item>


                <div className='mt-5'>
                    <button type="primary" className='px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-[18px rounded-md ] shadow-sm  border-[1px] border-cyan-500 focus:shadow-md'>
                        Submit
                    </button>
                </div>

            </Form>


            {/* spinner loader */}
            {
                loadingSpinner &&
                <span className="absolute top-[40%] left-[40%]">
                    <DotLoader color="purple" size={60} />
                </span>
            }

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
        </div>
    );
};

export default WayToFileTaxesAndServices;