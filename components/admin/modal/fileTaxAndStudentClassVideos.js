import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { DotLoader } from 'react-spinners';
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



const FileTaxAndStudentClassVideos = ({ onCancel, siteHomeServiceBlog, setRefreshPage, titleData = '' }) => {
    const [loadingSpinner, setLoadSpinner] = useState(false);

    const onFinish = (values) => {
        setLoadSpinner(true)

        // if data exist, so update document
        if (siteHomeServiceBlog?._id) {
            const queryValue = { id: siteHomeServiceBlog?._id }
            updateArrayHomeServiceBlogsAPI(values, queryValue).then(data => {
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
            <p className='text-center mb-4 border-b-[1px] border-red-500'>Please copy <span className='text-red-500 font-semibold'>Embedded code</span> to copy video link.</p>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                <Form.List
                    name={titleData}
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                    return Promise.reject(new Error('At least 1 video'));
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
                                    label={index === 0 ? 'Video Link : ' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <div className='flex items-center'>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: false,
                                                    whitespace: true,
                                                    message: "Please upload video.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="Video Link"
                                                style={{
                                                    width: '100%',
                                                    height: '60px',
                                                    overflow: 'scroll'
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


export default FileTaxAndStudentClassVideos;