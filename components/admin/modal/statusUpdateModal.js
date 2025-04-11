import React from 'react';
import { MdContacts } from 'react-icons/md';
import { Form, Select, message } from "antd";
import { updateCustomerQueryAPI } from '../../../helpers/backend_helper';
const { Option } = Select;


const StatusUpdateModal = ({ status, setRefreshData, handleCancel }) => {

    // customer contact status update -> pending or complete
    const onFinish = (values) => {
        const data = { id: status }
        if (!!status) {
            updateCustomerQueryAPI(values, data).then(data => {
                message.success(data?.message);
                setRefreshData(true);
                handleCancel();
            })
        }
    }


    return (
        <div className='p-3'>
            <div className='bg-white rounded shadow-lg'>
                <div className='relative h-16 p-4'>
                    <div className={`absolute -top-5 border h-20 w-20 shadow bg-green-600 flex justify-center items-center rounded`}>
                        <MdContacts className='text-4xl text-white' />
                    </div>
                    <div className='ml-24'><p className='text-xl font-semibold text-gray-500'>Update Status</p></div>
                </div>
                <div className='mt-4 pb-2'>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item name="status" className='m-4' label="Update Email Status" >
                            <Select placeholder='Change Status'>
                                <Option value="pending">Pending</Option>
                                <Option value="complete">Complete</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className='flex justify-center bg-green-600 rounded m-4'>
                            <button className='text-base w-full text-white' type="submit">
                                Submit
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default StatusUpdateModal;