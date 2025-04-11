import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import { Select, Form } from "antd";
import {
    AiOutlineCloudDownload,
    AiFillCarryOut,
} from "react-icons/ai";
import { SiFastapi, SiSpringsecurity } from "react-icons/si";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import moment from "moment";
import { useRouter } from "next/router";
import UserLayout from "../../layout/userLayout";
import { toast, ToastContainer } from 'react-toastify';
import Head from "next/head";
import { useEnv } from "../../contexts/envContext";
const { Option } = Select;

// time greeting
const welcomeTime = (date) => {
    return (date < 12 && date >= 5) ? 'Good Morning' :
        (date < 15 && date >= 12) ? 'Good Noon' :
            (date < 18 && date >= 15) ? 'Good afternoon' :
                (date < 24 && date >= 18) ? 'Good Evening' : 'Mid-Night'
}


const UserHome = () => {
    const { user } = useUser();
    const [_, environmentVariable] = useEnv();

    const date = new Date().getHours();
    const welcomeDate = welcomeTime(date)

    const router = useRouter();
    const [year, setYear] = useState(null);
    const yearData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];


    // get year and redirect into form submission process
    const onFinish = (values) => {
        if (!!year) {
            router.push(`/user/submitted-tax-file/create/step1?year=${year}`);

        } else {
            toast.error('Please select year first !')
        }
    };

    const handleChange = (value) => {
        setYear(`${value}`);
    };

    // tawk to service connection (for messaging from user-panel to admin/accountant)
    useEffect(() => {
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = environmentVariable?.twak_to_src_url;
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, [environmentVariable?.twak_to_src_url])


    return (
        <div>
            <section className="min-h-screen p-4">
                <Head>
                    <title>Dashboard</title>
                </Head>

                <h1 className="text-[24px] font-serif text-gray-600">
                    {welcomeDate} !
                </h1>

                {/* year selection */}
                <div className="flex justify-center my-16">
                    <Form
                        layout="horizontal"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div className="md:flex md:items-center md:gap-5">
                            <div>
                                <h6 className="text-gray-500">Tax File Year</h6>
                            </div>

                            <div className="my-3 md:my-0">
                                <Select
                                    onChange={handleChange}
                                    style={{
                                        width: 200,
                                    }}
                                    placeholder="Select Tax File Year"
                                >
                                    {yearData?.map((year, i) => (
                                        <Option
                                            value={
                                                Number(
                                                    moment().format("YYYY")
                                                ) + 1 -
                                                year
                                            }
                                            key={i + 3991}
                                        >
                                            {Number(moment().format("YYYY")) + 1 -
                                                year}
                                        </Option>
                                    ))}
                                </Select>
                            </div>

                            <div>
                                <button
                                    type="primary"
                                    className=" bg-red-600 px-3 py-2 rounded hover:bg-red-700 transition text-[14px] text-white"
                                >
                                    <div className="flex items-center">
                                        <AiOutlineCloudDownload size={20} />
                                        <span className="ml-3">
                                            LETS GET STARTED
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>

                {/* timeline design show */}
                <div className="pb-10">
                    <VerticalTimeline>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{}}
                            contentArrowStyle={{}}
                            date=""
                            iconStyle={{ background: "#BF40BF", color: "#fff" }}
                            icon={<SiFastapi />}
                        >
                            <span className="px-3 bg-cyan-600 text-white rounded py-1">
                                FAST
                            </span>
                            <p className="text-justify">
                                5-10 minutes process for tax filing.
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{}}
                            contentArrowStyle={{}}
                            date=""
                            iconStyle={{
                                background: "rgb(243, 12, 00)",
                                color: "#fff",
                            }}
                            icon={<AiFillCarryOut />}
                        >
                            <span className="px-3 bg-red-500 text-white rounded py-1">
                                SIMPLE
                            </span>
                            <p className="text-justify">
                                Take pictures of your documents and submit to
                                accountants.
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{}}
                            contentArrowStyle={{}}
                            date=""
                            iconStyle={{
                                background: "#2ED069 ",
                                color: "#fff",
                            }}
                            icon={<SiSpringsecurity />}
                        >
                            <span className="px-3 bg-green-500 text-white rounded py-1">
                                SECURE
                            </span>
                            <p className="text-justify">
                                With 5 layers of security, your documents are
                                safely transmitted to accountants for tax
                                filing.
                            </p>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </div>

            </section>


            {/* toast message */}
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
UserHome.layout = UserLayout;
export default UserHome;
