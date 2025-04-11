import React from 'react';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { ClipLoader, DotLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import TextArea from 'antd/lib/input/TextArea';
import { AWSFileUploadAPI, updateArrayContentAboutAPI } from '../../../helpers/backend_helper';



const PhotoGallery = ({ onClick, setRefreshPage, contentAboutData }) => {
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
                    }
                });

            } else {
                toast.warning('Wrong file uploaded! Only jpg, jpeg, png are allowed')
            }

        } else {
            toast.warning('File size is too long!')
        }
    }


    const onFinish = (values) => {
        setLoadSpinner(true)

        const queryValue = { id: contentAboutData?._id }
        const contentData = {
            photo_gallery: [
                {
                    image: photos,
                    title: values.title,
                    deatils: values.deatils
                }
            ],
        }

        if (contentAboutData?._id) {
            if (!!photos) {
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
                toast.warning("Please select Image")
                setLoadSpinner(false)
            }
        } else {
            toast.warning("Please set title, about or goal first")
            setLoadSpinner(false)
        }
    };



    return (
        <div>
            <Form onFinish={onFinish} layout='vertical'>

                <Form.Item
                    label="Image"
                    name="logo"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input Website Logo!',
                        },
                    ]}
                >
                    <div className="flex items-center gap-2 relative">
                        <input type='file'
                            placeholder='Website Logo'
                            style={{
                                width: '200px', backgroundColor: '#A14EE7', color: '#fff', borderRadius: '5px', paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px'
                            }}
                            onChange={handlePhoto}

                        />
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
                    <Input placeholder='Image title' />
                </Form.Item>

                <Form.Item
                    label="Detaiils"
                    name="deatils"
                    rules={[
                        {
                            required: false,
                            message: 'Please Input Short description!',
                        },
                    ]}
                >
                    <TextArea placeholder='Short description' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Upload
                    </Button>
                </Form.Item>
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

export default PhotoGallery;