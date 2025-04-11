import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { getOneFrontPageAPI } from '../../../../helpers/backend_helper';
import { useRouter } from "next/router";
import DraftEditor from './editor';
import Head from 'next/head';
import AdminLayout from "../../../../layout/adminLayout";
import HomeLayout from "../../../../layout/home";


const FrontPageEdit = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [frontPageData, setFrontPageData] = useState({});
    const { query } = router;
    const [update, setUpdate] = useState(1);

    // fetch one frontPage data
    useEffect(() => {
        getOneFrontPageAPI(query).then((data) => {
            setFrontPageData(data?.data);
        });
    }, [query, query.id]);

    // form initial value set
    useEffect(() => {
        if (frontPageData) {
            form.setFieldsValue({
                ...frontPageData,
            });
            setUpdate(update + 1)
        }
    }, [frontPageData, form]);


    return (
        <div>
            <Head>
                <title>Edit Page</title>
            </Head>

            <DraftEditor id={query?.id} form={form} key={update} update='request' />
        </div>
    );
};
FrontPageEdit.layout = AdminLayout;
export default FrontPageEdit;