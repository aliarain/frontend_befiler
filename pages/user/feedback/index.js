import React, {useEffect, useState} from 'react';
import UserLayout from '../../../layout/userLayout';
import {Button, Form, Rate, Select, Skeleton} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {createFeedback, getUserFeedbackAPI} from '../../../helpers/backend_helper';
import {toast, ToastContainer} from 'react-toastify';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {useFetch} from "../../../helpers/hooks";

const {Option} = Select;


const FeedbackPage = () => {
    const router = useRouter();
    const [userFeedback, setUserFeedback, {loading, error}] = useFetch(getUserFeedbackAPI);

    const onFinish = (values) => {
        createFeedback(values).then(data => {
            if (data?.status === true) {
                toast.success(data?.message)
                setTimeout(() => {
                    router.push('/user/')
                }, 3300);

            } else if (data?.exist === true) {
                toast.warning(data?.message)

            } else {
                toast.error(data?.message)
            }
        })
    };


    return (
        <div>
            <section className="min-h-screen">
                <Head>
                    <title>Feedback</title>
                </Head>

                <div className='bg-gray-50 md:w-2/3 mx-auto p-10 mt-5 rounded-md'>
                    <h5 className='text-center '>Please give us your <span className=''>valuable</span> opinion</h5>

                    <Form
                        onFinish={onFinish}
                        layout='vertical'
                    >
                        <Form.Item
                            label="Ratting out of 5"
                            name="ratting"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a number!',
                                },
                            ]}
                            className={'tracking-wide'}
                        >
                            <Select
                                placeholder='Select'
                                style={{
                                    width: '100%',
                                }}
                                // onChange={handleChange}
                            >
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                                <Option value={5}>5</Option>
                            </Select>
                        </Form.Item>

                        <div className='mt-10'></div>

                        <Form.Item
                            label="Comment"
                            name="comment"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                            className={'tracking-wide'}
                        >
                            <TextArea placeholder='You can give us at most 1 feedback!' cols={5} rows={5}/>
                        </Form.Item>

                        <Form.Item

                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className={'mt-5'}>
                        {
                            loading ?
                                <Skeleton/>
                                :
                                <fieldset className="border border-solid border-gray-300 p-3 rounded-md">
                                    <legend className="tracking-wide">Feedback</legend>
                                    <h6 className={'tracking-wide'}>Ratting: <Rate value={userFeedback?.ratting}/>
                                    </h6>
                                    <h6 className={'tracking-wide mt-2'}>Comment: {userFeedback?.comment} </h6>
                                </fieldset>
                        }
                    </div>
                </div>


                {/* toast message */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </section>
        </div>
    );
};
FeedbackPage.layout = UserLayout;
export default FeedbackPage;