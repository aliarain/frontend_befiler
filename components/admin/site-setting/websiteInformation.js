import React, { useState } from 'react';
import {Button, Form, Input, TimePicker, Select, InputNumber} from 'antd';
import { AiOutlineCheck } from 'react-icons/ai';
import { AWSFileUploadAPI, createSiteSettingInformationAPI, getSiteSettingInformationAPI, updateSiteSettingInformationAPI } from '../../../helpers/backend_helper';
import { ClipLoader, DotLoader } from 'react-spinners';
import { useEffect } from 'react';
const { Option } = Select;
import { FaDownload } from "react-icons/fa";
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';


const WebsiteInformation = () => {
    const [form] = Form.useForm();
    const [timeFrom, setTimeFrom] = useState()
    const [timeTo, setTimeTo] = useState()
    const [workingDayFrom, setWorkingDayFrom] = useState()
    const [workingDayTo, setWorkingDayTo] = useState();
    const [websiteLogo, setWebsiteLogo] = useState();
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [loadingSpinner, setLoadSpinner] = useState(false);

    const [refreshPage, setRefreshPage] = useState(null);
    const [siteInformationData, setSiteInformation] = useState({})


    // fetch existing data
    useEffect(() => {
        getSiteSettingInformationAPI().then(data => {
            setSiteInformation(data?.data)
        })

        setRefreshPage(null);
    }, [refreshPage])

    // form data loading, if exist
    useEffect(() => {
        form.setFieldsValue({
            ...siteInformationData
        })
    }, [siteInformationData])

    // working time
    const onChangeTimeFrom = (time, timeString) => {
        setTimeFrom(timeString);
    };
    const onChangeTimeTo = (time, timeString) => {
        setTimeTo(timeString);
    };

    // working day
    const handleChangeDayFrom = (value) => {
        setWorkingDayFrom(value);
    };
    const handleChangeDayTo = (value) => {
        setWorkingDayTo(value);
    };

    // web site logo
    const handleWebsiteLogo = async (e) => {
        setFileLoading(true);

        const data = new FormData()
        data.append('file', e.target.files[0])

        AWSFileUploadAPI(data).then(url => {
            if (url?.url) {
                setWebsiteLogo(url?.url)
                setIsPhotoUploaded(true)
                setFileLoading(false)

            } else {
                setIsPhotoUploaded(false)
                setFileLoading(false)
            }
        });
    }

    // submit information to the backend
    const onFinish = (values) => {
        setLoadSpinner(true)
        values.working_time = (timeFrom && timeTo) ? [timeFrom, timeTo] : values.working_time;
        values.working_day = (workingDayFrom && workingDayTo) ? [workingDayFrom, workingDayTo] : values.working_day;
        values.logo = websiteLogo;

        // if data exist, so update document
        if (siteInformationData?._id) {
            const queryValue = { id: siteInformationData?._id }
            updateSiteSettingInformationAPI(values, queryValue).then(data => {
                if (data?.status === true) {
                    setLoadSpinner(false)
                    setRefreshPage(data)
                    toast.success(data?.message)
                } else {
                    setLoadSpinner(false)
                    toast.error(data?.message)
                }
            })

        } else {
            // if data not exist, so create document
            createSiteSettingInformationAPI(values).then(data => {
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
                        name="username"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Project Name!',
                            },
                        ]}
                    >
                        <Input placeholder='Project Name' />
                    </Form.Item>

                    <Form.Item
                        label="Website domain Name/URL"
                        name="website"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Website Full Name/URL!',
                            },
                        ]}
                    >
                        <Input placeholder='Website Full Name/URL' />
                    </Form.Item>

                    <Form.Item
                        label="Website Logo"
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
                                onChange={handleWebsiteLogo}

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

                            {
                                siteInformationData?.logo &&
                                <span className="flex justify-center items-center absolute top-0 left-52 md:left-72" title='Download logo'>
                                    <Link href={siteInformationData?.logo}>
                                        <a>
                                            <FaDownload size={25} className='text-purple-500 cursor-pointer' />
                                        </a>
                                    </Link>
                                </span>
                            }
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Contact Number"
                        name="contact_number"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Contact Number!',
                            },
                        ]}
                    >
                        <Input placeholder='Contact Number' />
                    </Form.Item>

                    <Form.Item
                        label="Contact Email"
                        name="contact_email"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Contact Email!',
                            },
                        ]}
                    >
                        <Input placeholder='Contact Email' />
                    </Form.Item>

                    <Form.Item
                        label="Office Address"
                        name="office_address"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Office Address!',
                            },
                        ]}
                    >
                        <Input placeholder='Office Address' />
                    </Form.Item>


                    <Form.Item
                        label="Facebook Link"
                        name="facebook"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Facebook Link!',
                            },
                        ]}
                    >
                        <Input placeholder='Facebook Link' />
                    </Form.Item>

                    <Form.Item
                        label="Twitter Link"
                        name="twitter"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Twitter Link!',
                            },
                        ]}
                    >
                        <Input placeholder='Twitter Link' />
                    </Form.Item>

                    <Form.Item
                        label="Instagram Link"
                        name="instagram"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Instagram Link!',
                            },
                        ]}
                    >
                        <Input placeholder='Instagram Link' />
                    </Form.Item>

                    <Form.Item
                        label="LinkedIn Link"
                        name="linkedIn"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input LinkedIn Link!',
                            },
                        ]}
                    >
                        <Input placeholder='LinkedIn Link' />
                    </Form.Item>
                    <Form.Item
                        label="Socket Url"
                        name="socket_url"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input socket url!',
                            },
                        ]}
                    >
                        <Input placeholder='Socket Url' />
                    </Form.Item>


                    <Form.Item
                        label="Whatsapp Number"
                        name="whatsapp"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Whatsapp Number!',
                            },
                        ]}
                    >
                        <Input placeholder='Whatsapp Number' />
                    </Form.Item>

                    <Form.Item
                        label="Fax"
                        name="fax"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Fax!',
                            },
                        ]}
                    >
                        <Input placeholder='Fax Number' />
                    </Form.Item>


                    <Form.Item
                        label="Working Time"
                        name="working_time"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Working Time!',
                            },
                        ]}
                    >
                        <div className='space-x-2'>
                            <TimePicker use12Hours format="h:mm a" onChange={onChangeTimeFrom} placeholder={siteInformationData?._id ? siteInformationData?.working_time[0] : "From"} />
                            <TimePicker use12Hours format="h:mm a" onChange={onChangeTimeTo} placeholder={siteInformationData?._id ? siteInformationData?.working_time[1] : "To"} />
                        </div>
                    </Form.Item>


                    <Form.Item
                        label="Working Day"
                        name="working_day"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Working Day!',
                            },
                        ]}
                    >
                        <div className='space-x-2'>
                            <Select
                                placeholder={siteInformationData?._id ? siteInformationData?.working_day[0] : "From"}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChangeDayFrom}
                                allowClear
                            >
                                <Option value="Saturday">Saturday</Option>
                                <Option value="Sunday">Sunday</Option>
                                <Option value="Monday">Monday</Option>
                                <Option value="Tuesday">Tuesday</Option>
                                <Option value="Wednesday">Wednesday</Option>
                                <Option value="Thursday">Thursday</Option>
                                <Option value="Friday">Friday</Option>
                            </Select>

                            <Select
                                placeholder={siteInformationData?._id ? siteInformationData?.working_day[1] : "To"}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChangeDayTo}
                                allowClear
                            >
                                <Option value="Saturday">Saturday</Option>
                                <Option value="Sunday">Sunday</Option>
                                <Option value="Monday">Monday</Option>
                                <Option value="Tuesday">Tuesday</Option>
                                <Option value="Wednesday">Wednesday</Option>
                                <Option value="Thursday">Thursday</Option>
                                <Option value="Friday">Friday</Option>
                            </Select>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Year of Experience"
                        name="year_of_experience"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Year of Experience!',
                            },
                        ]}
                    >
                        <Input type={'number'} placeholder='Enter number of year. Ex. 3' />
                    </Form.Item>

                    <Form.Item
                        label="Filled Tax Per Month"
                        name="per_month_filled"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Filled Tax Per Month!',
                            },
                        ]}
                    >
                        <Input type={'number'} placeholder='Enter number of per month tax filled. Ex. 750' />
                    </Form.Item>

                    <Form.Item
                        label="Total User"
                        name="total_user"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Total User!',
                            },
                        ]}
                    >
                        <Input type={'number'} placeholder='Enter number of total user. Ex. 12000' />
                    </Form.Item>

                    <Form.Item
                        label="Number of Expert Member"
                        name="expert_member"
                        rules={[
                            {
                                required: false,
                                message: 'Please Input Number of Expert Member!',
                            },
                        ]}
                        className={'w-full'}
                    >
                        <Input type={'number'} placeholder='Enter number of expert member. Ex. 25' />
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
        </section>
    );
};

export default WebsiteInformation;
