import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Select } from "antd";
import { getAllUserRoleExceptAdminAPI } from '../../../helpers/backend_helper';
const { Option } = Select;

function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}


const TaxFilePrice = ({ form, onFinish, setTaxPricingName, additionalFees = [] }) => {
    const [userRoleData, setUserRoleData] = useState([]);
    const [userRole, setUserRole] = useState('');

    // user role data fetch
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(info => {
            if (info?.status === true) {
                setUserRoleData(info?.data)
            }
        })
    }, []);


    // change select
    const onChange = (e) => {
        setUserRole(e);
        setTaxPricingName(e)
    }

    useEffect(() => {
        if(userRoleData?.length > 0) {
            setUserRole(userRoleData[0]?.name);
            setTaxPricingName(userRoleData[0]?.name)
        }
    },[userRoleData])


    return (
        <div className="pb-4">

            <Form
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                labelCol={{ span: 11 }}

            // wrapperCol={{span: 28}}
            >
                <div className='w-3/4'>
                    <Form.Item
                        label="Select User"
                        name="user_role"
                        rules={[
                            {
                                required: true,
                                message: 'Please select user!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            className='w-1/2'
                            placeholder="Select User"
                            onChange={onChange}
                        >
                            {
                                userRoleData?.map((role, ind) =>
                                    <Option value={role?.name} key={ind + 986785}>{role?.display_name}
                                    </Option>)
                            }
                        </Select>
                    </Form.Item>
                </div>


                <Form.Item
                    label={`${userRole?.split('_')?.join(" ") || ''} Tax fees`}
                    name="taxfees"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input taxfee!",
                        },
                    ]}
                    style={{ border: '0' }}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>


                <Form.Item
                    label="Service charges"
                    name="service_charges"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>


                <Form.Item
                    label="Welcome Benefit"
                    name="welcome_benefit"
                    rules={[
                        {
                            required: false,
                            message:
                                "Please input your username!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "150px" }} />
                </Form.Item>


                <div>
                    {
                        additionalFees?.map((additional, i) =>
                            <div key={i + 9099}>
                                <Form.Item
                                    label={capitalizeFirstLetter(additional?.additional_fee_name?.split(' ').join('_'))}
                                    name={additional?.additional_fee_name}
                                    rules={[
                                        {
                                            required: false,
                                            message: "Please input your username!",
                                        },
                                        
                                    ]}
                                    initialValue={additional?.additional_fee} 
                                >
                                    <InputNumber type='number' style={{ width: "150px" }} />
                                </Form.Item>
                            </div>
                        )
                    }
                </div>
                

                <div className="flex justify-center">
                    <Form.Item
                        wrapperCol={{ span: 28 }}
                    >
                        <button className="btn-taxants__red text-white mt-4 inline-block uppercase">
                            <span style={{ fontSize: '14px' }}>Update TaxFile Pricing</span>
                        </button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default TaxFilePrice;