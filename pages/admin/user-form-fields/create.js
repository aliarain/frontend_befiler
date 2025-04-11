import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { useRouter } from 'next/router';
import { formFieldCreateAPI, getAllUserRoleExceptAdminAPI } from '../../../helpers/backend_helper';
const { Option } = Select;
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';


const CreateNewField = ({ setRefreshData, onClose }) => {
    const router = useRouter();
    const [userRoleData, setUserRoleData] = useState([]);
    const [userFieldID, setUserFieldID] = useState('');
    const [inputTypeSelect, setInputTypeSelect] = useState(false);

    // fetch all user except admin
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(info => {
            if (info?.status === true) {
                setUserRoleData(info?.data)
            }
        })
    }, []);

    // user search
    const onChangeSearch = (value) => {
        setUserFieldID(value);
    };

    // handle input type
    const catchInputType = (input_type) => {
        setInputTypeSelect(input_type)
    }

    // submit form
    const onFinish = (values) => {
        values.userRoleID = { id: userFieldID }

        if (!!values && (!!userFieldID || values.action_for === 'all')) {
            formFieldCreateAPI(values).then(res => {
                if (res?.status === true) {
                    setRefreshData(values)
                    toast.success(res?.message);
                    setTimeout(() => {
                        onClose()
                    }, 3000);
                } else {
                    toast.success(res?.message);
                }
            })

        } else {
            toast.warning("Invalid user input!");
        }
    };


    return (
        <div>
            <section className='min-h-screen'>
                <div className='bg-gray-50 p-10 shadow-md rounded-md'>

                    <div className=''>
                        <h6 className='text-purple-500 underline text-center pb-4'>Add New Field</h6>
                    </div>

                    <Form
                        onFinish={onFinish}
                        layout='vertical'
                    >
                        <div className='w-full md:w-2/3 mx-auto flex items-center mb-4'>
                            <span className='text-[16px] w-[150px] text-center'>Select User : </span>
                            <Select
                                showSearch
                                className='w-full'
                                placeholder="Select One"
                                optionFilterProp="children"
                                onChange={onChangeSearch}
                            >
                                {
                                    userRoleData?.map((role, ind) => <Option value={role?._id} key={role?._id}>{role?.display_name}</Option>)
                                }
                            </Select>
                        </div>


                        <Form.Item
                            label="Input Name"
                            name="input_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name!',
                                },
                            ]}
                        >
                            <Input placeholder='Input Name' />
                        </Form.Item>

                        <Form.Item
                            label="Input Type"
                            name="input_type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input type!',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder='Select'
                                onChange={catchInputType}
                            >
                                <Option value='text'>Text</Option>
                                <Option value='boolean'>Boolean</Option>
                                <Option value='file'>File</Option>
                                <Option value='number'>Number</Option>
                                <Option value='password'>Password</Option>
                                <Option value='textarea'>Textarea</Option>
                                <Option value='image'>Image</Option>
                                <Option value='date'>Date</Option>
                                <Option value='time'>Time</Option>
                                <Option value='select'>Select</Option>
                                <Option value='checkbox'>Checkbox</Option>
                                <Option value='switch'>Switch</Option>
                                <Option value='radio_button'>Radio Button</Option>
                                <Option value='digital_signature'>Digital Signature</Option>
                            </Select>
                        </Form.Item>


                        {/* option name */}
                        {
                            (inputTypeSelect === 'select' || inputTypeSelect === 'radio_button') &&
                            <Form.List name="select_options">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} className='block' align="baseline">
                                                <div>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name]}
                                                        className='w-full md:w-[500px] lg:w-[500px]'
                                                    >

                                                        <Input placeholder='Name of Option' />
                                                    </Form.Item>
                                                </div>

                                                <p className='text-red-500 font-bold'><MinusCircleOutlined onClick={() => remove(name)} /></p>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block>
                                                <span className='text-green-700'> + Add New Option</span>

                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        }

                        {/* link add, if needed for checkbox */}
                        {
                            (inputTypeSelect === 'checkbox') &&
                            <Form.Item
                                label="Add link"
                                name="link"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Add a link!',
                                    },
                                ]}
                            >
                                <Input placeholder='Add a link, if needed' />
                            </Form.Item>
                        }


                        <Form.Item
                            label="Input Placeholder"
                            name="placeholder"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input placeholder!',
                                },
                            ]}
                        >
                            <Input placeholder='Placeholder title that you want to show in input field' />
                        </Form.Item>

                        <Form.Item
                            label="Is it require?"
                            name="field_required"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input required option!',
                                },
                            ]}
                            extra="If it is mandatory, select 'Yes'"
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder='Select'
                            >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        </Form.Item>


                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                placeholder='Select'
                            >
                                <Option value={true}>True</Option>
                                <Option value={false}>False</Option>
                            </Select>
                        </Form.Item>

                        <div className='md:grid md:grid-cols-3 md:gap-4'>
                            <Form.Item
                                label="Select Step"
                                name="step_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input type!',
                                    },
                                ]}
                                className="col-span-2"
                            >
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder='In which steps do you want to show?'
                                >
                                    <Option value='step_one'>1st Step</Option>
                                    <Option value='step_two'>2nd Step</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Select Action"
                                name="action_for"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input type!',
                                    },
                                ]}
                            >
                                <Select
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder='Select Action For'
                                >
                                    <Option value='only'>Only For This User</Option>
                                    <Option value='all'>For All User</Option>
                                </Select>
                            </Form.Item>
                        </div>


                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    <div>
                        <small>*We have provided some common fields, please check those first.</small>
                    </div>
                </div>
            </section>

            <ToastContainer
                position="bottom-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default CreateNewField;