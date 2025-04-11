import {Checkbox, DatePicker, Form, Modal} from 'antd';
import moment from 'moment';
import Head from 'next/head';
import React, {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import Button from '../../../components/common/button';
import Table from '../../../components/common/new_table';
import FormInput, {HiddenFormItem} from '../../../components/form/input';
import FormSelect from '../../../components/form/select';
import {useI18n} from '../../../contexts/i18n';
import {useSite} from '../../../contexts/site';
import {
    delUser,
    fetchDepartmentOrCategoryWise,
    fetchDepartmentShortList,
    fetchEmployee, fetchRole,
    postEmployee,
} from '../../../helpers/backend_helper';
import {useFetch, userAction} from '../../../helpers/new_hooks';
import PhoneNumberInput from '../../../components/form/PhoneInput';
import AdminLayout from "../../../layout/adminLayout";
import {useRouter} from "next/router";


const Employee = () => {
    const site = useSite();
    const router = useRouter();
    const i18n = useI18n();
    const [form] = Form.useForm();
    const [employees, getEmployees, {loading, error}] = useFetch(fetchEmployee);
    const [departmentElements, getDepartmentElements] = useFetch(fetchDepartmentShortList);
    const [roles, getRoles] = useFetch(fetchDepartmentOrCategoryWise);
    const [role, getRole] = useFetch(fetchRole);
    const [isAccountant, setAccountant] = useState(false)

    let columns = [
        {
            dataField: 'key', text: 'Employee ID',
            formatter: key => <span className=''>{key}</span>
        },
        {
            dataField: 'username', text: 'Name',
            formatter: (username, data) => <span className='capitalize'>{username ?? data?.firstName+" "+data.lastNameame}</span>
        },
        {
            dataField: 'email', text: 'Email',
            formatter: email => <span className=''>{email}</span>
        },
        {
            dataField: 'phone', text: 'Phone',
            formatter: phone => <span className='capitalize'>{phone}</span>
        },
        {
            dataField: 'department', text: 'Department',
            formatter: department => <span className='capitalize'>{department?.name}</span>
        },
        {
            dataField: 'permission', text: 'Role Type',
            formatter: permission => <span className='capitalize'>{permission?.name}</span>
        },
        {
            dataField: 'joining_date', text: 'Joining Date',
            formatter: joining_date => <span className='capitalize'>{moment(joining_date).format('ll')}</span>
        },
        {
            dataField: 'userStatus', text: 'Status',
            formatter: (userStatus, data) => (<div className=''>
                <span>{userStatus ? userStatus : 'No'}</span>
            </div>)
        },
    ];

    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    let action = (
        <div className="flex">
            <Button
                className="mr-2"
                onClick={() => {
                    getRole()
                    form.resetFields();
                    setIsModalVisible(true);
                    setIsEdit(false)
                }}>{!!i18n && i18n?.t("Add Employee")}</Button>
        </div>
    )


    return (
        <main>
            <section className='bg-gray-100 mx-2 rounded-md min-h-screen'>
                <div className='p-4 bg-gray-50 my-4 relative'>
                    <section className='bg-white min-h-screen rounded-md'>
                        <Head>
                            <title>Employee</title>
                        </Head>

                            <Table
                                columns={columns}
                                data={employees}
                                pagination={true}
                                noActions={false}
                                action={action}
                                indexed={true}
                                shadow={false}
                                onEdit={(data) => {
                                    form.resetFields();
                                    form.setFieldsValue({
                                        ...data,
                                        department: data?.department?._id,
                                        permission: data?.permission?._id,
                                        joining_date: moment(data?.joining_date),
                                    });
                                    setIsModalVisible(true);
                                    setIsEdit(true)
                                    getRoles({department: data?.department?._id})
                                }}
                                onDelete={delUser}
                                onReload={getEmployees}
                                error={error}
                                loading={loading}
                            />
                    </section>
                </div>
            </section>

            {/* status updated modal */}
            <Modal title={!!i18n && i18n?.t("Employee Details")} visible={isModalVisible} onCancel={handleCancel} destroyOnClose
                footer={null} width={569}>
                <div className={'pb-1 border-b-2 mb-3'}>
                    <h6>Accountant :  <Checkbox onChange={e => setAccountant(e.target.checked)} className={'pl-5'}/> </h6>
                </div>

                <Form
                    form={form}
                    onFinish={(values) => {
                        values.role = isAccountant === true ? "accountant" : "employee";
                        return userAction(postEmployee, values, () => {
                            getEmployees();
                            setIsModalVisible(false);
                        })
                    }}
                    layout='vertical'
                >
                    <HiddenFormItem name="_id" />
                    <FormInput name='username' placeholder='Example: sabbir185' label='Username' required />
                    <Row>
                        <Col md={6}>
                            <FormInput name='firstName' placeholder='Enter first name' label='First Name' required />
                        </Col>
                        <Col md={6}>
                            <FormInput name='lastName' placeholder='Enter last name' label='Last Name' required />
                        </Col>
                    </Row>
                    <PhoneNumberInput
                        name='phone' placeholder='Enter phone number' label='Phone' required
                    />
                    <Row>
                        <Col md={6}>
                            <FormInput name='email' type='email' placeholder='Enter email' label='Email' required />
                        </Col>
                        <Col md={6}>
                            <Form.Item name='joining_date' label='Joining Data' rules={[{required: true}]}>
                                <DatePicker style={{width: '100%'}} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormInput name='password' type='password' placeholder='Input strong password'
                                label='Password' required={!isEdit} />
                        </Col>
                        <Col md={6}>
                            <FormInput
                                name='confirm_password'
                                type='password'
                                placeholder='Confirm password'
                                label='Confirm Password'
                                rules={[
                                    {
                                        required: !isEdit,
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Incorrect Password!")
                                        }
                                    })
                                ]}
                                hasFeedback
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            isEdit === false &&
                            <Col md={12}>
                                <FormInput name='key' placeholder='Auto' label='Employee Id' disabledDate readOnly />
                            </Col>
                        }
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormSelect
                                name="department" label='Select Department'
                                required={true}
                                placeholder={'Select a department'}
                                options={departmentElements}
                                onSelect={e => {
                                    getRoles({department: e})
                                }}
                                clearable
                            />
                        </Col>
                        <Col md={6}>
                            <FormSelect
                                name="permission"
                                label='Designation'
                                placeholder='Select permission type'
                                options={roles?.docs}
                                required={true}
                                clearable
                                onSelect={e => {
                                    getRole({_id: e})
                                }}
                            />
                        </Col>
                    </Row>

                    <Button>{isEdit ? !!i18n && i18n?.t("Edit Employee") : !!i18n && i18n?.t("Add Employee")}</Button>
                </Form>
            </Modal>
        </main>
    );
};
Employee.layout = AdminLayout;
export default Employee;