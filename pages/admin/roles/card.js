import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import {
    FaRegAddressCard,
    FaCreativeCommonsNd,
    FaCreativeCommonsShare,
} from "react-icons/fa";
import { updateManyActionAPI } from "../../../helpers/backend_helper";
import { useRouter } from "next/router";


// view specific user-role and update
const RoleCard = ({ data, query, setRefreshData }) => {
    const router = useRouter();
    const [form] = Form.useForm();

    // form initial value set
    useEffect(() => {
        form.setFieldsValue({
            ...data,
        });
    }, [data, form]);

    // form submission
    const onFinish = (values) => {
        const data = {
            display_name: values?.display_name || "",
            description: values?.description || "",
        };
        if (!!query) {
            updateManyActionAPI(data, query).then((data) => {
                if (data?.status === true) {
                    message.success(data?.message);
                    router.push("/admin/roles");
                }
            });
        }
    };


    return (
        <section>
            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-3">
                    <div className="bg-white rounded mt-3 md:mt-0 relative h-40 w-full shadow-md">
                        <div className="bg-red-700 h-16 w-16 rounded absolute -top-5 left-5 flex justify-center items-center text-white shadow">
                            <FaRegAddressCard size={30} />
                        </div>
                        <span className="absolute top-5 left-24 text-[18px] font-base text-gray-700">
                            Role (Not changeable)
                        </span>
 
                        <div className="pt-24 px-5">
                            <Form.Item
                                name="_id"
                                rules={[
                                    {
                                        required: false,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        borderBottom: "1px solid #A7A7A7",
                                    }}
                                    bordered={false}
                                    disabled
                                    className="capitalize text-purple-500 font-semibold"
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="bg-white rounded mt-3 md:mt-0 relative h-40 w-full shadow-md">
                        <div className="bg-red-700 h-16 w-16 rounded absolute -top-5 left-5 flex justify-center items-center text-white shadow">
                            <FaCreativeCommonsNd size={30} />
                        </div>
                        <span className="absolute top-5 left-24 text-[18px] font-base text-gray-700">
                            Display Name
                        </span>

                        <div className="pt-24 px-5">
                            <Form.Item
                                name="display_name"
                                rules={[
                                    {
                                        required: false,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        borderBottom: "1px solid #A7A7A7",
                                    }}
                                    bordered={false}
                                    className="capitalize"
                                    placeholder="Set a display name"
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="bg-white rounded mt-3 md:mt-0 relative h-40 w-full shadow-md">
                        <div className="bg-red-700 h-16 w-16 rounded absolute -top-5 left-5 flex justify-center items-center text-white shadow">
                            <FaCreativeCommonsShare size={30} />
                        </div>
                        <span className="absolute top-5 left-24 text-[18px] font-base text-gray-700">
                            Description
                        </span>

                        <div className="pt-24 px-5">
                            <Form.Item
                                name="description"
                                rules={[
                                    {
                                        required: false,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        borderBottom: "1px solid #A7A7A7",
                                    }}
                                    bordered={false}
                                    className="capitalize"
                                    placeholder="Write short description"
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <Form.Item>
                    <button
                        className="btn-taxants__red text-white ml-4 mt-20 px-20"
                    >
                        Update Role Info
                    </button>
                </Form.Item>
            </Form>
        </section>
    );
};

export default RoleCard;
