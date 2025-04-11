import React, {useEffect, useState} from 'react';
import Table from "../../../../components/common/new_table";
import {Form, Modal, Switch} from "antd";
import Button from "../../../../components/common/button";
import FormInput, {HiddenFormItem} from "../../../../components/form/input";
import {userAction, useFetch} from "../../../../helpers/new_hooks";
import {deltTicketSettings, fetchTicketDepartments, postTicketDepartment,} from "../../../../helpers/backend_helper";
import {useI18n} from "../../../../contexts/i18n";

const Departments = () => {
    const i18n = useI18n()
    const [form] = Form.useForm();
    const [modal_toggle, SetModal_toggle] = useState(false);

    const [departments, setDepartments] = useState([{}])
    const [data, getDepartmens] = useFetch(fetchTicketDepartments);

    useEffect(() => {
        let d = data
        if (!!data?.docs) {
            d.docs = data.docs.filter((item) => {
                if (!item?.parent)
                    return item
            })
        }
        setDepartments(d)
    }, [data?.docs])

    const [isEdit, setIsEdit] = useState(false);
    const onFinish = async (values) => {
        return userAction(postTicketDepartment, values, () => {
            getDepartmens()
            form.resetFields();
            SetModal_toggle(false);
        })
    }

    return (
        <div>
            <Table
                indexed
                pagination
                data={departments}
                columns={
                    [
                        {
                            dataField: "name", text: "Name",
                        },
                        {
                            dataField: "active", text: "Status", formatter: (d, dd) => (<Switch
                                checked={d}
                                onChange={(value) => onFinish({
                                    _id: dd._id, active: value
                                })}
                            />)
                        },
                    ]
                }

                onEdit={
                    values => {
                        setIsEdit(true);
                        form.resetFields();
                        form.setFieldsValue(values);
                        form.setFieldsValue({_id: values._id})
                        SetModal_toggle(true);
                    }
                }
                action={
                    <div className={'flex space-x-4'}>
                        <Button onClick={() => {
                            setIsEdit(false);
                            form.resetFields();
                            SetModal_toggle(true)
                        }}> Add Departments</Button>
                    </div>
                }
                onDelete={deltTicketSettings}
                onReload={getDepartmens}
            />
            <Modal visible={modal_toggle} onCancel={() => SetModal_toggle(false)} footer={null}
                   title={isEdit ? 'Edit Department' : "Add Department"}>
                <Form form={form} layout="vertical" className="mt-4" onFinish={onFinish}>
                    <HiddenFormItem name={'_id'}/>
                    <FormInput name={"name"} label="Name" required/>
                    <Button>Submit</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default Departments;
