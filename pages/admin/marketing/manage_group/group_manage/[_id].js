import React, {useEffect, useState} from 'react';
import AdminLayout from "../../../../../layout/adminLayout";
import PageTitle from "../../../../../components/common/page-title";
import {useRouter} from "next/router";
import {
    fetchAvailableSMSUsers, fetchMarketingGroups, postSMSUsers
} from "../../../../../helpers/backend_helper";
import {userAction, useFetch} from "../../../../../helpers/new_hooks";
import {Form, Modal,} from "antd";
import Button from "../../../../../components/common/button";
import Table from "../../../../../components/common/new_table";
import {Checkbox} from 'antd';


const SMSGroup = () => {
    const {query} = useRouter()
    const [group, getGroup, {loading, error}] = useFetch(fetchMarketingGroups, {}, false)
    const [availableUsers, getAvailableUsers] = useFetch(fetchAvailableSMSUsers, {}, false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (query._id) {
            getGroup({_id: query._id})
            getAvailableUsers({_id: query._id})
        }
    }, [query._id]);

    const columns = [
        {
            dataField: 'username', text: 'User Name',
        },
        {
            dataField: 'phone', text: 'Contacts',
        },
        {
            dataField: 'email', text: 'Email'
        },
    ];

    const userAddColumns = [
        {
            dataField: 'name',
            text: 'Select',
            formatter: (text, record) => <div>
                <Checkbox
                    onChange={() => {
                        const newa = [...users];
                        newa.push(record._id);
                        setUsers(newa);
                    }}
                />
            </div>
        },
        {
            dataField: 'username', text: 'User Name'
        },
        {
            dataField: 'phone', text: 'Contacts',
        },
        {
            dataField: 'email', text: 'Email'
        },
    ];

    const handleUser = async (values) => {
        let payload = {_id: group._id, userId: values._id}
        await userAction(postSMSUsers, payload, () => {
            getAvailableUsers();
            getGroup();
        })
    }
    const handleMultipleUser = async () => {
        let payload = {_id: group._id, userId: users}
        await userAction(postSMSUsers, payload, () => {
            setUsers([]);
            getAvailableUsers();
            getGroup();
        })
    }

    return (
        <>
            <PageTitle title={`${group?.name} Group`}/>
            <Table
                pagination
                columns={columns}
                data={group}
                noActions={false}
                action={
                    <div className="flex">
                        <Button
                            className="mr-2"
                            onClick={() => {
                                form.resetFields();
                                setIsModalVisible(true);
                                setUsers([])

                            }}>
                            Add User
                        </Button>
                    </div>}
                shadow={false}
                onDelete={async (data) => {
                    let payload = {_id: group._id, userId: data._id, delete: true}
                    return postSMSUsers(payload)
                }}
                onReload={getGroup}
                loading={loading}
            />
            <Modal
                title={`Add User to Group`}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false)
                    getAvailableUsers({search: ''})
                }}
                footer={null} width={999}
            >
                <Table
                    pagination
                    columns={userAddColumns}
                    actions={(values) =>
                        <div
                            className="bg-off_purple px-2 py-1 text-white rounded cursor-pointer"
                            onClick={() => {
                                setUsers([])
                                handleUser(values)
                            }}
                        >
                            Add to Group
                        </div>
                    }
                    action={
                        <div className="flex">
                            {users.length > 0 &&
                                <Button
                                    className="mr-2"
                                    onClick={handleMultipleUser}
                                >
                                    Save
                                </Button>}
                        </div>
                    }
                    data={availableUsers}
                    noActions={false}
                    onReload={getAvailableUsers}
                    loading={loading}
                />
            </Modal>
        </>);
};

SMSGroup.layout = AdminLayout;
export default SMSGroup;

