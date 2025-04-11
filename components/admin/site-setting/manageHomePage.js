import React, { useEffect, useState } from 'react';
import {Button, Form, Input, Select, Modal, Drawer, Space, Divider} from 'antd';
import WayToFileTaxesAndServices from '../modal/wayToFileTaxesAndServices';
import TextArea from 'antd/lib/input/TextArea';
import FileTaxAndStudentClassVideos from '../modal/fileTaxAndStudentClassVideos';
import PartnerShipImages from '../modal/partnership_images';
import { AiOutlineCheck } from 'react-icons/ai';
import { createSiteHomeServiceBlogsAPI, getSiteHomeServiceBlogsAPI, updateSiteHomeServiceBlogsAPI } from '../../../helpers/backend_helper';
import { DotLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
const { Option } = Select;
import { BiEdit } from "react-icons/bi";
import LinksVideosAction from '../site-settings-actions/view-all/links_videos_action';
import ServiceAndWayToFile from '../site-settings-actions/view-all/serviceAndWayToFile';
import Link from 'next/link';
import FormSelect from "../../form/select";
import {FaImages} from "react-icons/fa";
import {getTheme} from "../../version3/utils/get_version";
import {getImageSize} from "../../../helpers/imageSize";
import CorporateStrategy from "../../version3/CorporateStrategy";


const ManageHomePage = () => {
    const [form] = Form.useForm();
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const [refreshPage, setRefreshPage] = useState(null);
    const [siteHomeServiceBlog, setSiteHomeServiceBlog] = useState({})
    const [taxVersion, setTaxVersion] = useState('v1');
    const [theme, setTheme] = useState("one");
    const [taxTheme, setTaxTheme] = useState([]);
    const [toggleLoader, setToggleLoader] = useState(false)

    useEffect(() => {
        if (taxVersion) {
            const theme = getTheme(taxVersion)
            setTaxTheme(theme)
        }
    }, [taxVersion])

    // fetch existing data
    useEffect(() => {
        const themeData = ({version: taxVersion, theme: theme})
        getSiteHomeServiceBlogsAPI(themeData).then(data => {
            setSiteHomeServiceBlog(data?.data)
        })
        setRefreshPage(null);
        setToggleLoader(false)
    }, [refreshPage,theme,taxVersion])

    // form data loading, if exist
    useEffect(() => {
        if(siteHomeServiceBlog) {
            form.setFieldsValue({
                ...siteHomeServiceBlog,
                update_version: {
                    number: siteHomeServiceBlog?.themeData?.version || taxVersion,
                    theme: siteHomeServiceBlog?.themeData?.theme || theme,
                },
            })
        } else {
            form.resetFields()
            form.setFieldsValue({
                update_version: {
                    number: siteHomeServiceBlog?.themeData?.version || taxVersion,
                    theme: siteHomeServiceBlog?.themeData?.theme || theme,
                },
            })
        }
    }, [siteHomeServiceBlog,theme,taxVersion])

    // modal show/off
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [toggleComponent, setToggleComponent] = useState('')
    const showModal = (data) => {
        setIsModalVisible(true);
        setToggleComponent(data)
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // form submission
    const onFinish = (values) => {
        setLoadSpinner(true)
        const themeData = ({version: taxVersion, theme: theme})
        // if data exist, so update document
        if (siteHomeServiceBlog?._id) {
            const queryValue = { id: siteHomeServiceBlog?._id }
            updateSiteHomeServiceBlogsAPI({...values, themeData}, queryValue).then(data => {
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
            createSiteHomeServiceBlogsAPI({...values, themeData}).then(data => {
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

    // Drawer
    const [visible, setVisible] = useState(false);
    const [drawerData, setDrawerData] = useState(null)

    const onClose = () => {
        setVisible(false);
    };

    // handle details view and actions
    const handleDetailsFiles = (id, data, titleFor) => {
        const dataDW = {
            id,
            data,
            titleFor
        }
        setVisible(true);
        setDrawerData(dataDW)
    }

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

                    {/*theme selection*/}
                    <div className={'border p-3 rounded-md'}>
                        <h5 className={'flex items-center gap-3'}>
                            <FaImages className={'text-purple-700'}/>
                            Select Theme
                        </h5>
                        <FormSelect
                            name={['update_version', 'number']}
                            placeholder={'Select category'}
                            label={'Select theme category'}
                            options={[
                                {label: 'TaxHive', value: 'v1'},
                                {label: 'TaxNexus', value: 'v2'},
                                {label: 'ZenTax', value: 'v3'},
                            ]}
                            required
                            onChange={(values) => {
                                return setTaxVersion(values)
                            }}
                        />

                        <FormSelect
                            name={['update_version', 'theme']}
                            placeholder={'Select theme'}
                            label={'Select a theme'}
                            options={taxTheme}
                            required
                            onChange={(values) => {
                                return setTheme(values)
                            }}
                        />
                    </div>
                    <Divider />
                    {
                        !siteHomeServiceBlog && <div className={""}>
                            <p className={"font-semibold bg-gray-100 rounded text-center py-3 w-full"}>Data Not Found!</p>
                        </div>
                    }
                    <>
                            <Form.Item
                                label="Hero Section Title"
                                name="header_title"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Header Title!',
                                    },
                                ]}
                            >
                                <Input placeholder='Short Title'/>
                            </Form.Item>

                            <Form.Item
                                label="Hero Section Sub-Title"
                                name="header_Sub_title_"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Header Sub-Title!',
                                    },
                                ]}
                            >
                                <Input placeholder='Sub-Title'/>
                            </Form.Item>

                            <Form.Item
                                label="Add Hero Section Images"
                                name="hero_section_images"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please upload hero section image!',
                                    },
                                ]}
                                extra='Two latest images will show in hero section page'
                            >
                                <div className="flex items-center gap-2">
                            <span
                                className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer'
                                onClick={() => showModal("hero_section_images")}> <span
                                className='font-semibold'> + </span> Add image</span>


                                    {
                                        siteHomeServiceBlog?.hero_section_images?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2"> <span
                                            className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{siteHomeServiceBlog?.hero_section_images?.length}</span> <AiOutlineCheck
                                            size={20}/> </span>
                                    }

                                    {
                                        siteHomeServiceBlog?.hero_section_images?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer"
                                              title='View Details and actions'
                                              onClick={() => handleDetailsFiles(siteHomeServiceBlog?._id, siteHomeServiceBlog?.hero_section_images, 'hero_section_images')}> <BiEdit
                                            size={22} className='text-cyan-500 hover:text-cyan-600'/> </span>
                                    }
                                </div>
                            </Form.Item>

                            {/*// corporate strategy*/}
                            {
                                taxVersion === "v3" &&
                                <CorporateStrategy data={siteHomeServiceBlog}/>
                            }

                            <Form.Item
                                label="Way To File Tax"
                                name="way_to_file_tax"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Way To File Tax!',
                                    },
                                ]}
                            >
                                <div className="flex items-center gap-2">
                            <span
                                className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer'
                                onClick={() => showModal("way_to_file_tax")}> <span className='font-semibold'>+</span> Add </span>
                                    {
                                        siteHomeServiceBlog?.way_to_file_tax?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2"> <span
                                            className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{siteHomeServiceBlog?.way_to_file_tax?.length}</span> <AiOutlineCheck
                                            size={20}/> </span>
                                    }

                                    {
                                        siteHomeServiceBlog?.way_to_file_tax?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer"
                                              title='View Details and actions'
                                              onClick={() => handleDetailsFiles(siteHomeServiceBlog?._id, siteHomeServiceBlog?.way_to_file_tax, 'way_to_file_tax')}> <BiEdit
                                            size={22} className='text-cyan-500 hover:text-cyan-600'/> </span>
                                    }
                                </div>
                            </Form.Item>

                            {/* why section */}
                            <Form.Item
                                label="Why? (briefly)"
                                name="why"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Why!',
                                    },
                                ]}
                            >
                                <TextArea placeholder='About Your Service' rows={3} cols={5}/>
                            </Form.Item>

                            <Form.Item
                                label="Why? point 1"
                                name="why_point1"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input service 1',
                                    },
                                ]}
                            >
                                <Input placeholder='Add a point about your service 1'/>
                            </Form.Item>
                            <Form.Item
                                label="Why? point 2"
                                name="why_point2"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input service 2',
                                    },
                                ]}
                            >
                                <Input placeholder='Add a point about your service 2'/>
                            </Form.Item>
                            <Form.Item
                                label="Why? point 3"
                                name="why_point3"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input service 3',
                                    },
                                ]}
                            >
                                <Input placeholder='Add a point about your service 3'/>
                            </Form.Item>
                            <Form.Item
                                label="Why? point 4"
                                name="why_point4"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input service 4',
                                    },
                                ]}
                            >
                                <Input placeholder='Add a point about your service 4'/>
                            </Form.Item>


                            {/* service section */}
                            <Form.Item
                                label="Add Services"
                                name="services"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please InputServices!',
                                    },
                                ]}
                            >
                                <div className="flex items-center gap-2">
                            <span
                                className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer'
                                onClick={() => showModal("services")}> <span
                                className='font-semibold'>+</span> Add </span>

                                    {
                                        siteHomeServiceBlog?.services?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2"> <span
                                            className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{siteHomeServiceBlog?.services?.length}</span> <AiOutlineCheck
                                            size={20}/> </span>
                                    }

                                    {
                                        siteHomeServiceBlog?.services?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer"
                                              title='View Details and actions'
                                              onClick={() => handleDetailsFiles(siteHomeServiceBlog?._id, siteHomeServiceBlog?.services, 'services')}> <BiEdit
                                            size={22} className='text-cyan-500 hover:text-cyan-600'/> </span>
                                    }
                                </div>
                            </Form.Item>

                            <div className='flex gap-2 mb-0'>
                                <span className='mb-2 inline-block'>More Information Videos. Video Upload Guide Line:</span>
                                <p><Link href="https://appstick-resources.s3.ap-southeast-1.amazonaws.com/Group+131.png"><a
                                    target="_blank" rel="noopener noreferrer">Click here</a></Link></p>
                            </div>

                            <Form.Item

                                name="student_class_videos"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Student Class Videos!',
                                    },
                                ]}
                            >
                                <div className="flex items-center gap-2">
                            <span
                                className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer'
                                onClick={() => showModal("student_class_videos")}> <span
                                className='font-semibold'> + </span> Add links</span>

                                    {
                                        siteHomeServiceBlog?.student_class_videos?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2"> <span
                                            className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{siteHomeServiceBlog?.student_class_videos?.length}</span> <AiOutlineCheck
                                            size={20}/> </span>
                                    }

                                    {
                                        siteHomeServiceBlog?.student_class_videos?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer"
                                              title='View Details and actions'
                                              onClick={() => handleDetailsFiles(siteHomeServiceBlog?._id, siteHomeServiceBlog?.student_class_videos, 'student_class_videos')}> <BiEdit
                                            size={22} className='text-cyan-500 hover:text-cyan-600'/> </span>
                                    }
                                </div>
                            </Form.Item>

                            <Form.Item
                                label="Partner-Ships logo"
                                name="partner_ships"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Partner Ships!',
                                    },
                                ]}
                            >
                                <div className="flex items-center gap-2">
                            <span
                                className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer'
                                onClick={() => showModal("partner_ships")}> <span className='font-semibold'> + </span> Add image</span>


                                    {
                                        siteHomeServiceBlog?.partner_ships?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2"> <span
                                            className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{siteHomeServiceBlog?.partner_ships?.length}</span> <AiOutlineCheck
                                            size={20}/> </span>
                                    }

                                    {
                                        siteHomeServiceBlog?.partner_ships?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer"
                                              title='View Details and actions'
                                              onClick={() => handleDetailsFiles(siteHomeServiceBlog?._id, siteHomeServiceBlog?.partner_ships, 'partner_ships')}> <BiEdit
                                            size={22} className='text-cyan-500 hover:text-cyan-600'/> </span>
                                    }
                                </div>
                            </Form.Item>

                            <div className='flex gap-2 mb-0'>
                                <span className='mb-2 inline-block'>File Tax Videos. Video Upload Guide Line:</span>
                                <p><Link href="https://appstick-resources.s3.ap-southeast-1.amazonaws.com/Group+131.png"><a
                                    target="_blank" rel="noopener noreferrer">Click here</a></Link></p>
                            </div>
                            <Form.Item
                                name="file_tax_videos"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input File Tax Videos!',
                                    },
                                ]}
                            >
                                <div className="flex items-center gap-2">
                            <span
                                className='bg-purple-500 px-5 py-1 rounded-md text-white text-[16px] shadow-sm border-[1px] border-green-500 hover:bg-purple-600 cursor-pointer'
                                onClick={() => showModal("file_tax_videos")}> <span className='font-semibold'> + </span> Add links</span>

                                    {
                                        siteHomeServiceBlog?.file_tax_videos?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2"> <span
                                            className="bg-purple-500 w-5 h-5 rounded-full text-center text-white font-semibold inline-block">{siteHomeServiceBlog?.file_tax_videos?.length}</span> <AiOutlineCheck
                                            size={20}/> </span>
                                    }

                                    {
                                        siteHomeServiceBlog?.file_tax_videos?.length > 0 &&
                                        <span className="text-green-500 pl-5 flex items-center gap-2 cursor-pointer"
                                              title='View Details and actions'
                                              onClick={() => handleDetailsFiles(siteHomeServiceBlog?._id, siteHomeServiceBlog?.file_tax_videos, 'file_tax_videos')}> <BiEdit
                                            size={22} className='text-cyan-500 hover:text-cyan-600'/> </span>
                                    }
                                </div>
                            </Form.Item>


                            <Form.Item
                                label="How To File Tax Title"
                                name="how_to_file_tax_title"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Title!',
                                    },
                                ]}
                            >
                                <Input placeholder='Short Title'/>
                            </Form.Item>

                            <Form.Item
                                label="How To File Tax Short Description"
                                name="how_to_file_tax_short_description"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please Input Short Description!',
                                    },
                                ]}
                            >
                                <TextArea placeholder='Max words 300' cols={3} rows={3}/>
                            </Form.Item>
                        </>
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
                        <DotLoader color="purple" size={60}/>
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


            {/* modal */}
            <Modal
                title={`${toggleComponent === "way_to_file_tax" && 'Add Way To File Tax' || toggleComponent === "services" && 'Add Service' || toggleComponent === "student_class_videos" && 'Add Student Class Video Link' || toggleComponent === "file_tax_videos" && 'Add File Tax Video' || toggleComponent === "partner_ships" && 'Partner Ships Link' || toggleComponent === "hero_section_images" && `Hero Section Image ${getImageSize({version: taxVersion, theme: theme, toggleComponent})}`}`}
                visible={isModalVisible} destroyOnClose onOk={handleOk} onCancel={handleCancel} footer={null}>
                {
                    toggleComponent === "way_to_file_tax" &&
                    < WayToFileTaxesAndServices onCancel={handleCancel} siteHomeServiceBlog={siteHomeServiceBlog}
                                                setRefreshPage={setRefreshPage} titleData='way'/>
                }
                {
                    toggleComponent === "services" &&
                    < WayToFileTaxesAndServices onCancel={handleCancel} siteHomeServiceBlog={siteHomeServiceBlog}
                                                setRefreshPage={setRefreshPage} titleData='services'/>
                }
                {
                    toggleComponent === "student_class_videos" &&
                    < FileTaxAndStudentClassVideos onCancel={handleCancel} siteHomeServiceBlog={siteHomeServiceBlog}
                                                   setRefreshPage={setRefreshPage} titleData='student_class_videos'/>
                }
                {
                    toggleComponent === "file_tax_videos" &&
                    < FileTaxAndStudentClassVideos onCancel={handleCancel} siteHomeServiceBlog={siteHomeServiceBlog}
                                                   setRefreshPage={setRefreshPage} titleData='file_tax_videos'/>
                }
                {
                    toggleComponent === "partner_ships" &&
                    < PartnerShipImages onCancel={handleCancel} setIsPhotoUploaded={setIsPhotoUploaded}
                                        siteHomeServiceBlog={siteHomeServiceBlog} setRefreshPage={setRefreshPage}
                                        titleData='partnership'/>
                }
                {
                    toggleComponent === "hero_section_images" &&
                    < PartnerShipImages onCancel={handleCancel} setIsPhotoUploaded={setIsPhotoUploaded}
                                        siteHomeServiceBlog={siteHomeServiceBlog} setRefreshPage={setRefreshPage}
                                        titleData='hero_section'/>
                }

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
                {
                    drawerData?.titleFor === 'file_tax_videos' &&
                    <LinksVideosAction DWData={drawerData} setRefreshPage={setRefreshPage} onClose={onClose}/>
                }
                {
                    drawerData?.titleFor === 'partner_ships' &&
                    <LinksVideosAction DWData={drawerData} setRefreshPage={setRefreshPage} onClose={onClose}/>
                }
                {
                    drawerData?.titleFor === 'student_class_videos' &&
                    <LinksVideosAction DWData={drawerData} setRefreshPage={setRefreshPage} onClose={onClose}/>
                }
                {
                    drawerData?.titleFor === 'way_to_file_tax' &&
                    <ServiceAndWayToFile DWData={drawerData} setRefreshPage={setRefreshPage} onClose={onClose}/>
                }
                {
                    drawerData?.titleFor === 'services' &&
                    <ServiceAndWayToFile DWData={drawerData} setRefreshPage={setRefreshPage} onClose={onClose}/>
                }
                {
                    drawerData?.titleFor === 'hero_section_images' &&
                    <LinksVideosAction DWData={drawerData} setRefreshPage={setRefreshPage} onClose={onClose}/>
                }
            </Drawer>
        </section>
    );
};

export default ManageHomePage;