import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { AiOutlineCheck } from 'react-icons/ai';
import { ClipLoader, DotLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import { AWSFileUploadAPI, updateArrayContentAboutAPI } from '../../../helpers/backend_helper';
const { Option } = Select;



const AccountingAffiliates = ({ onClick, contentAboutData, setRefreshPage }) => {
    const [photos, setPhotos] = useState(null);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [loadingSpinner, setLoadSpinner] = useState(false);


    const handlePhoto = (e) => {
        if (e?.target?.files[0]?.size <= 5242880) {
            const files = ['image/jpeg', 'image/png', 'image/jpg']

            if (files.includes(e?.target?.files[0]?.type)) {
                setFileLoading(true);

                const data = new FormData()
                data.append('file', e.target.files[0])

                AWSFileUploadAPI(data).then(url => {
                    if (url?.url) {
                        setPhotos(url?.url)
                        setIsPhotoUploaded(true)
                        setFileLoading(false)

                    } else {
                        setIsPhotoUploaded(false)
                        setFileLoading(false)
                    };
                });

            } else {
                toast.warning('Wrong file uploaded! Only jpg, jpeg, png are allowed')
            };

        } else {
            toast.warning('File size is too long!')
        };
    };


    const onFinish = (values) => {
        setLoadSpinner(true)

        const user = {
            short_brief: values.short_brief,
            linkedIn: values.linkedIn,
            twitter: values.twitter,
            facebook: values.facebook,
            first_name: values.first_name,
            last_name: values.last_name,
            image: photos
        }
        const title = values.title;
        const university = values.university;

        const contentData = {
            accounting_affiliates: [
                {
                    user, title, university
                }
            ],
        }

        const queryValue = { id: contentAboutData?._id }

        if (contentAboutData?._id) {
            updateArrayContentAboutAPI(contentData, queryValue).then(data => {
                if (data?.status === true) {
                    toast.success("File uploaded successfully")
                    setLoadSpinner(false)
                    setRefreshPage(data)
                    onClick()

                } else {
                    setLoadSpinner(false)
                }
            })
        } else {
            toast.warning("Please set title, about or goal first")
            setLoadSpinner(false)
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
                    label="Short Brief"
                    name="short_brief"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input Short Brief of User!',
                        },
                    ]}
                >
                    <TextArea rows={3} cols={5} placeholder='Short Brief of User' />
                </Form.Item>

                <Form.Item
                    label="LinkedIn"
                    name="linkedIn"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input LinkedIn!',
                        },
                    ]}
                >
                    <Input placeholder='LinkedIn' />
                </Form.Item>

                <Form.Item
                    label="Twitter(x)"
                    name="twitter"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input twitter!',
                        },
                    ]}
                >
                    <Input placeholder='twitter account url' />
                </Form.Item>

                <Form.Item
                    label="Facebook"
                    name="facebook"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input facebook!',
                        },
                    ]}
                >
                    <Input placeholder='facebook account url' />
                </Form.Item>

                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input First Name!',
                        },
                    ]}
                >
                    <Input placeholder='First Name' />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input Last Name!',
                        },
                    ]}
                >
                    <Input placeholder='Last Name' />
                </Form.Item>

                <Form.Item
                    label="Upload Image"
                    name="image"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input Upload Image!',
                        },
                    ]}
                    className=''
                >
                    <div className="flex items-center gap-2 relative">
                        <Input type='file' onChange={handlePhoto} className='text-white px-1' style={{ backgroundColor: '#A14EE7', borderRadius: '10px', width: '250px' }} />
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
                    label="University Name"
                    name="university"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input University Name!',
                        },
                    ]}
                >
                    <Input placeholder='University Name' />
                </Form.Item>


                <div className='mt-5'>
                    <button type="primary" className='px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-[18px rounded-md ] shadow-sm  border-[1px] border-cyan-500 focus:shadow-md'>
                        Add New Member
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

export default AccountingAffiliates;