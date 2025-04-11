
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getRoleManagementAPI } from "../../../helpers/backend_helper";
import AdminLayout from "../../../layout/adminLayout";
import RoleCard from "./card";
import AdminRules from "./index";


const RoleInfoEdit = () => {
    const [rolesData, setRolesData] = useState([]);
    const [refreshData, setRefreshData] = useState(null)
    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        getRoleManagementAPI().then((data) => {
            setRolesData(data?.data?.docs);
            setRefreshData(null)
        });
    }, [query?.role, refreshData]);

    const data = rolesData?.find((d) => d._id === query?.role);


    return (
        <>
            <div className="mt-5 min-h-screen">
                <Head>
                    <title>Partial Role Edit</title>
                </Head>

                <RoleCard data={data} query={query} setRefreshData={setRefreshData} />
            </div>
        </>
    );
};
RoleInfoEdit.layout = AdminLayout
export default RoleInfoEdit;
