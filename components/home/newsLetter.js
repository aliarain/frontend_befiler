import {Form} from "antd";
import React from "react";
import {useI18n} from "../../contexts/i18n";
import {postMarketingSubscribers} from "../../helpers/backend_helper";
import {userAction} from "../../helpers/new_hooks";
import FormInput from "../form/input";

const NewsLetter = () => {
    const i18n = useI18n()
    const [form] = Form.useForm();

    return (

        <div className="container">
            <div className="my-20 bg-twPrimary-shade50 rounded-md py-12 border-2 border-green-200">
                <h4 className="mb-10 font-medium text-4xl text-twContent text-center">
                    {"Get Subscribe for Newsletter"}
                </h4>
                <div className="flex justify-center">
                    <Form
                        form={form}
                        onFinish={(values) =>
                            userAction(postMarketingSubscribers, values, () => {
                                form.resetFields();
                            })
                        }
                        className="px-[20px] flex flex-col lg:flex-row gap-x-5 newsletter"
                    >
                        <div className="lg:w-[700px] md:w-[600px] w-[250px]">
                            <FormInput
                                layout="vertical"
                                name={"email"}
                                isEmail
                                placeholder="Enter your email"
                                required
                                style={{
                                    padding: '21px'
                                }
                                }
                            />
                        </div>

                        <button
                            className=" mt-[12px] mx-auto h-fit lg:mt-0 md:ml-[20px] px-10 py-[18px] bg-green-500 hover:bg-twSecondary-shade700 text-white text-lg lg:text-xl font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                            {"Subscribe"}
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;
