import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { ClipLoader, DotLoader } from 'react-spinners';
import { fileUploadAWS } from '../../common/fileUploadAWS';
import { toast, ToastContainer } from 'react-toastify';
import { createSiteHomeServiceBlogsAPI, updateArrayHomeServiceBlogsAPI } from '../../../helpers/backend_helper';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};


const PartnerShipImages = ({ onCancel, siteHomeServiceBlog, setRefreshPage, titleData = '' }) => {
    const [photos, setPhotos] = useState([]);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [loadingSpinner, setLoadSpinner] = useState(false);

    // picture upload aws s3 bucket
    const handlePhoto = async (e) => {
        if (e?.target?.files[0]?.size <= 512000) {
            const files = ['image/jpeg', 'image/png', 'image/jpg']

            if (files.includes(e?.target?.files[0]?.type)) {
                await fileUploadAWS(setFileLoading, e, setPhotos, setIsPhotoUploaded, true);

            } else {
                toast.warning('Wrong file uploaded! Only jpg, jpeg, png are allowed')
            }

        } else {
            toast.warning('File size is too long!')
        }
    }

    // submit form info for create or update
    const onFinish = (values) => {
        let picData;
        if (titleData === 'partnership') {
            picData = {
                partner_ships: photos
            }

        } else if (titleData === 'hero_section') {
            picData = {
                hero_section_images: photos
            }
        }

        // if data exist, so update document
        if (siteHomeServiceBlog?._id) {
            const queryValue = { id: siteHomeServiceBlog?._id }
            updateArrayHomeServiceBlogsAPI(picData, queryValue).then(data => {
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
            createSiteHomeServiceBlogsAPI(picData).then(data => {
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
        <div className='relative'>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                <Form.List
                    name="photo"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                    return Promise.reject(new Error('At least 1 photo'));
                                }
                            },
                        },
                    ]}

                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Photo : ' : ''}
                                    required={false}
                                    key={field.key}
                                    extra='Max file size 500KB'
                                >
                                    <div className='flex items-center'>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: false,
                                                    whitespace: true,
                                                    message: "Please upload photo.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <input
                                                onChange={handlePhoto}
                                                type='file'
                                                placeholder="upload photo"
                                                style={{
                                                    width: '250px', backgroundColor: '#A14EE7', color: '#fff', borderRadius: '5px'
                                                }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <span>
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                    style={{ color: 'red' }}
                                                />
                                            </span>
                                        ) : null}
                                    </div>

                                </Form.Item>
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{
                                        width: '60%',
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}

                </Form.List>


                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>



            {/* single file upload loader */}
            {
                fileLoading === true &&
                <span className="absolute top-[20%] left-[40%]">
                    <DotLoader color="purple" size={50} />
                </span>
            }


            {/* spinner loader for submission time*/}
            {
                loadingSpinner &&
                <span className="absolute top-[30%] left-[40%]">
                    <DotLoader color="purple" size={60} />
                </span>
            }

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

export default PartnerShipImages;