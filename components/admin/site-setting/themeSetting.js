import React, {useEffect, useState} from 'react';
import {Form} from "antd";
import FormSelect from "../../form/select";
import {getSiteSettingInformationAPI, postSetting} from "../../../helpers/backend_helper";
import {FaImages} from "react-icons/fa";
import {userAction} from "../../../helpers/hooks";
import {Col, Row} from "react-bootstrap";
import FormInput from "../../form/input";
import {AiOutlineReload} from "react-icons/ai";
import Button from "../../common/button";
import {getTheme} from "../../version3/utils/get_version";


const ThemeSetting = () => {
    const [form] = Form.useForm();
    const [siteInformationData, setSiteInformation] = useState({})
    const [refreshPage, setRefreshPage] = useState(false);
    const [taxVersion, setTaxVersion] = useState();
    const [taxTheme, setTaxTheme] = useState([]);

    useEffect(() => {
        if (taxVersion) {
            const theme = getTheme(taxVersion)
            setTaxTheme(theme)
        }
    }, [taxVersion])

    // fetch existing data
    useEffect(() => {
        getSiteSettingInformationAPI().then(data => {
            setSiteInformation(data?.data)
        })
        setRefreshPage(false)
    }, [refreshPage])

    // update the form data
    useEffect(()=> {
        if(!!siteInformationData?._id) {
            form.setFieldsValue({
                theme: siteInformationData?.theme,
                recaptcha: siteInformationData?.recaptcha,
                update_version: {...siteInformationData?.update_version},
            })
            const theme = getTheme(siteInformationData?.update_version?.number)
            setTaxTheme(theme)
        }
    },[siteInformationData?._id])

    return (
        <div className={'pt-[3%]'}>
            <Form
                form={form}
                layout={'vertical'}
                className={'md:w-2/3 mx-auto py-4'}
                onFinish={values => {
                    return userAction(
                        postSetting,
                        {
                            _id: siteInformationData?._id,
                            ...values
                        },
                        () => {
                            setRefreshPage(true)
                        }
                    )
                }}
            >
                <div className={'px-10 md:px-20 bg-white shadow-sm py-5'}>
                    <h5 className={'flex items-center gap-3'}><FaImages className={'text-purple-700'}/> Change Website
                        Theme</h5>
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
                    />
                </div>

                {/*// Recaptcha*/}
                <div className={'px-10 md:px-20 bg-white mt-3 shadow-sm py-5'}>
                    <h5 className={'flex items-center gap-3'}><AiOutlineReload className={'text-purple-700'}/> Google
                        Recaptcha</h5>
                    <Row>
                        <Col md={6}>
                            <FormSelect
                                placeholder={'Login Recaptcha'}
                                name={['recaptcha', 'login_recaptcha']}
                                label={'Login Recaptcha'}
                                options={[{label: 'Active', value: true}, {label: 'Inactive', value: false}]}
                            />
                        </Col>
                        <Col md={6}>
                            <FormSelect
                                placeholder={'Register Recaptcha'}
                                name={['recaptcha', 'register_recaptcha']}
                                label={'Register Recaptcha'}
                                options={[{label: 'Active', value: true}, {label: 'Inactive', value: false}]}
                            />
                        </Col>
                    </Row>
                    <FormInput name={['recaptcha', 'site_key']} label="Recaptcha Site Key"
                               placeholder="Enter Recaptcha Site Key" type={'password'}/>
                </div>

                <div className={'px-10 md:px-20 bg-white shadow-sm mt-3 py-3'}>
                    <Button type={'submit'}>Update</Button>
                </div>
            </Form>
        </div>
);
};

export default ThemeSetting;