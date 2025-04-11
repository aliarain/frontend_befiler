import PageTitle from "../../../../components/common/page-title";
import {Form} from "antd";
import {Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useI18n} from "../../../../contexts/i18n";
import AdminLayout from "../../../../layout/adminLayout";
import {fetchMarketingSettings} from "../../../../helpers/backend_helper";
import SmsApiGateway from "./sms_api_gateway";
import {useFetch} from "../../../../helpers/new_hooks";

const Index = () => {
    const i18n = useI18n()
    const [form] = Form.useForm()
    const [settings] = useFetch(fetchMarketingSettings)
    const [logo,setLogo] = useState('/img/shops.png')

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
            label: 'SMS settings',
            field: <SmsApiGateway/>
        },
    ]
    return (
        <>
            <PageTitle
                title="SMS Settings"
                breadcrumbs={[
                    {
                        label: 'Dashboard',
                        href: '/admin'
                    },
                    {label: 'Settings'}
                ]}
            />
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
