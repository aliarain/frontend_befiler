import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form } from "antd";
import { getOneCouponAPI } from "../../../helpers/backend_helper";
import AddCoupon from "./create";
import moment from "moment";
import AdminLayout from "../../../layout/adminLayout";


const EditCoupon = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [couponData, setCouponData] = useState({});
    const { query } = router;

    // fetch one coupon data
    useEffect(() => {
        getOneCouponAPI(query).then((data) => {
            setCouponData(data?.data);
        });
    }, [query, query.id]);


    // form initial value set
    useEffect(() => {
        if (couponData) {
            form.setFieldsValue({
                ...couponData,
                start_duration: moment(couponData?.start_duration),
                end_duration: moment(couponData?.end_duration)
            });
        }
    }, [couponData, form]);


    return (
        <div>
            <AddCoupon id={query?.id} form={form} update='request' editTrue={true}/>
        </div>
    );
};
EditCoupon.layout = AdminLayout
export default EditCoupon;
