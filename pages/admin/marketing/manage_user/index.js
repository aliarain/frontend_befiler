import AdminLayout from "../../../../layout/adminLayout";
import PageTitle from "../../../../components/common/page-title";
import {Form, Tabs} from "antd";
import {Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useI18n} from "../../../../contexts/i18n";
import {fetchMarketingSettings} from "../../../../helpers/backend_helper";
import AllUser from "./all_user";
import BannedUser from "./banned_user";
import ActiveUser from "./active_user";
import SubscribedUsers from "./subscribed_users";
import {useFetch} from "../../../../helpers/new_hooks";

const Index = () => {
    const i18n = useI18n()
    const [form] = Form.useForm()
    const [settings, getSettings] = useFetch(fetchMarketingSettings)
    const [logo, setLogo] = useState('/img/shops.png')

    useEffect(() => {
        if (settings) {
            form.setFieldsValue({
                ...settings,
                logo: undefined,
            })
            setLogo(settings?.logo || '/img/shops.png')
        }
    }, [settings])

    const [active, setActive] = useState(0)

    const options = [
        {
            label: 'All Users',
            field: <AllUser/>
        },
        {
            label: 'Active Users',
            field: <ActiveUser/>
        },
        {
            label: 'Banned Users',
            field: <BannedUser/>
        },
        {
            label: 'Subscribed Users',
            field: <SubscribedUsers/>
        },
    ]
    return (
        <>
            <PageTitle title="Manage User" breadcrumbs={[{label: 'Dashboard', href: '/admin'}, {label: 'Settings'}]}/>
            <Row>
                <Col md={3}>
                    <div className="bg-white rounded overflow-hidden shadow-sm">
                        {options?.map((option, index) => (
                            <div
                                onClick={() => setActive(index)}
                                className={`px-4 py-2 text-sm ${active === index ? 'bg-off_purple text-white' : ''}`}
                                role="button" key={index}>
                                {i18n.t(option.label)}
                            </div>
                        ))}
                    </div>
                </Col>
                <Col md={9}>
                    {options[active]?.field}
                </Col>
            </Row>

        </>
    )
}

Index.layout = AdminLayout
export default Index
