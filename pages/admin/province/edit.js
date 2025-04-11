import React, { useEffect, useState } from "react";
import AddProvince from "./create";
import { useRouter } from "next/router";
import { Form } from "antd";
import { getOneProvinceAPI } from "../../../helpers/backend_helper";
import AdminLayout from "../../../layout/adminLayout";


const EditProvince = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [provinceData, setProvinceData] = useState({});
    const { query } = router;

    useEffect(() => {
        getOneProvinceAPI(query).then((data) => {
            setProvinceData(data?.data);
        });
    }, [query, query.id]);

    // form initial value set
    useEffect(() => {
        if (provinceData) {
            form.setFieldsValue({
                ...provinceData,
            });
        }
    }, [form, provinceData]);


    return (
        <div>
            <AddProvince id={query?.id} form={form} update='request'/>
        </div>
    );
};
EditProvince.layout = AdminLayout
export default EditProvince;
