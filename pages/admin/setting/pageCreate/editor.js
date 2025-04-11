import React from 'react';
import { MdPerson } from 'react-icons/md';
import AdminLayout from '../../../../layout/adminLayout';
import { Form, Input, message } from 'antd';
import { frontPageCreateAPI, updateFrontPageAPI } from '../../../../helpers/backend_helper';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import SiteSettingIndex from "../site-setting";

const DraftBoard = dynamic(() => import('../../../../components/admin/draftEditor/draftBoard'), {
    ssr: false
})


const DraftEditor = ({ id, form, update = null }) => {
    const router = useRouter();

    // draft form submission -> create or update
    const onFinish = (values) => {
        if (!!update && !!id) {
            const query = { id }
            updateFrontPageAPI(values, query).then(data => {
                if (data?.status === true) {
                    message.success(data?.message);
                    router.push('/admin/setting/frontend-pages')
                } else {
                    message.error(data?.message);
                }
            })

        } else {
            frontPageCreateAPI(values).then(data => {
                if (data?.status === true) {
                    message.success(data?.message);
                    router.push('/admin/setting/frontend-pages')
                } else {
                    message.success(data?.message);
                }
            })
        }

    };



    return (
        <>
            <div className="shadow-lg  rounded bg-white p-4 m-4 ">
                {/* upper style */}
                <div className="h-12 relative">
                    <div className="absolute w-16 h-16 shadow flex justify-center rounded -top-10 items-center bg-[#C34742]">
                        <span className='text-white'><MdPerson size={35} /></span>
                    </div>
                    <p className='ml-20 text-xl'>Create New Page</p>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        name="name"
                        className=''
                    >
                        <Input placeholder='Name'
                            bordered={false} style={{ borderBottom: "2px solid #DBDCDB" }} />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        className=''
                    >
                        <Input placeholder='Type(menu or footer)'
                            bordered={false} style={{ borderBottom: "2px solid #DBDCDB" }} />
                    </Form.Item>

                    {/* Draft Board */}
                    <Form.Item
                        label="Contents"
                        name="contents"
                        className=''
                    >
                        <DraftBoard />
                    </Form.Item>
                    <div className='text-[#A7A7A7] flex justify-end items-center'>
                        <Form.Item>
                            <button type="submit" className='bg-[#C34742] hover:bg-[#DF2F25] text-base text-white px-6 py-2 rounded shadowHover'>
                                Save
                            </button>
                        </Form.Item>
                    </div>

                </Form>
            </div>
        </>
    );
};
DraftEditor.layout = AdminLayout
export default DraftEditor;