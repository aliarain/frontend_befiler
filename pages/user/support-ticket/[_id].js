import React, {useEffect, useState} from 'react';
import PageTitle from "../../../components/common/page-title";
import {userAction, useFetch} from "../../../helpers/new_hooks";
import {
    fetchTicketDepartment,
    featchTickets,
    fetchTicketType,
    getTicketPriorities,
    verifyUserAPI,
    postTicketMessage, getSiteSettingInformationAPI, postTicketNote
} from "../../../helpers/backend_helper";
import FormInput, {HiddenFormItem} from "../../../components/form/input";
import Button from "../../../components/common/button";
import {useI18n} from "../../../contexts/i18n";
import {useRouter} from "next/router";
import {Col, Form, Modal, Row} from "antd";
import moment from "moment";
import From from "../../../components/ticket/message_body/from";
import To from "../../../components/ticket/message_body/to";
import UserLayout from "../../../layout/userLayout";
import socket, {io} from "socket.io-client";

const Ticket = () => {
    const i18n = useI18n()
    const [form] = Form.useForm()
    const [form1] = Form.useForm()
    const {query} = useRouter()
    const [tickets, getTickets] = useFetch(featchTickets, {}, false)
    const [department, getDepartment] = useFetch(fetchTicketDepartment)
    const [types, getType] = useFetch(fetchTicketType)
    const [ticketPriorities, getPriorities] = useFetch(getTicketPriorities)
    const [userProfile] = useFetch(verifyUserAPI)
    const [id, setId] = useState('')

    const [user_id, setUser_id] = useState('')
    //initialize socket url
    const [SOCKET_URL, setSOCKET_URL] = useState('')

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = () => {
        verifyUserAPI().then((userData) => {
            if (userData?.status === true) {
                setUser_id(userData?.data._id)

            }
        })
        getSiteSettingInformationAPI().then((data) => {
            if (!!data?.data?.socket_url) {
                setSOCKET_URL(data?.data?.socket_url)

            }
        })

    }

    useEffect(() => {
        if (query._id) {
            getTickets({_id: query._id})
            setId(query._id)
        }
    }, [query._id]);

    useEffect(() => {
        if (!!SOCKET_URL) {
            // Connect to the Socket.io server
            const socket = io(String(SOCKET_URL));
            // Listen for the "notification" event
            socket.on('ticket_msg', data => {
                getTickets({_id: query._id})
            });
            // Disconnect from the server when the component unmounts
            return () => {
                socket.disconnect();
            };
        }
    }, [SOCKET_URL]);


    // modal
    const [noteModal, setNoteModal] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    const [file, setFile] = useState('');

    const handleMessages = async (values) => {
        const payload = {
            ...values,
            ticket_id: tickets?.docs[0]?._id,
            user_id: user_id
        }
        form1.resetFields()
        userAction(postTicketMessage, payload, () => {
            getTickets()
        }, false)
        getTickets()
    }

    const handleNoteSubmit = async (values) => {
        const payload = {
            ...values,
            ticket_id: tickets?.docs[0]?._id,
            user_id: user_id
        }
        form1.resetFields()
        userAction(postTicketNote, payload, () => {
            getTickets()
            setNoteModal(false)
        }, false)
    }

    return (
        <>
            <PageTitle title="Support Ticket"/>
            <section>
                <div className={'grid grid-col-1 lg:grid-cols-3 gap-4'}>
                    <div className='p-4 bg-white border rounded border-2  m-1 shadow-sm '>
                        <div className="h-full overflow-hidden py-4">
                            {tickets?.docs[0]?.answered ? <div className="flex flex-col h-full w-full bg-white ">
                                {/*msg body section */}
                                <div className="h-[550px] overflow-hidden ">
                                    <div className="h-full overflow-y-auto">
                                        <div className="grid grid-cols-12 gap-y-2 flex flex-col">
                                            {tickets?.docs[0]?.messages?.map((item, index) => {
                                                return (
                                                    <>
                                                        {item?.user === user_id ?
                                                            (<To key={index} msg={item.msg}/>)
                                                            :
                                                            (<From key={index} msg={item.msg}/>)
                                                        }
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/*send box*/}
                                {tickets?.docs[0]?.status !== 'closed' ?
                                    <div className="">
                                        <Form
                                            form={form1}
                                            onFinish={handleMessages}
                                            layout='horizontal'
                                        >
                                            <Row gutter={6} className={'mt-4'}>
                                                <Col span={20}>
                                                    <FormInput
                                                        name={"message"}
                                                        required
                                                        placeholder={"Type your message...."}
                                                    />
                                                </Col>
                                                <Col span={4}>
                                                    <button
                                                        className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-white">
                                                        <svg className="w-5 h-5 transform rotate-90 -mr-px"
                                                             fill="none"
                                                             stroke="currentColor"
                                                             viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                                        </svg>
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div> :
                                    <p className={'w-full font-bold text-center text-green-600'}>Ticket Closed</p>}
                            </div> : "Please wait for admin replay"}
                        </div>
                    </div>

                    <div className='p-4 bg-white rounded rounded border-2  m-1 shadow-sm '>
                        <div className={'w-full flex justify-end'}>
                            <button onClick={() => {
                                form.resetFields();
                                setNoteModal(true)
                            }}
                                    className={'px-3 py-2 mb-2 rounded bg-off_purple text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'}>
                                Add Notes
                            </button>
                        </div>
                        {/*each notes box*/}
                        <div className='h-[650px] overflow-y-scroll'>
                            {tickets?.docs[0]?.notes?.map((note, index) => (
                                <>
                                    {note?.user === user_id ?
                                        (<div className={'my-4 rounded shadow p-4 flex flex-col '}>
                                                <h3 className={'text-xl font-bold'}>{note.title}</h3>
                                                <p>{note.description}</p>
                                            </div>
                                        ) : (
                                            null
                                        )
                                    }
                                </>
                            ))}
                        </div>

                        {/*modal for notes*/}
                        <Modal
                            title={`Add Notes`}
                            visible={noteModal}
                            onCancel={() => setNoteModal(false)}
                            destroyOnClose
                            footer={null}
                            width={569}
                        >
                            <Form
                                form={form}
                                onFinish={handleNoteSubmit}
                                layout='vertical'
                            >
                                <HiddenFormItem name="_id" initialValue={id}/>
                                <FormInput
                                    label="Titile"
                                    name={"title"}
                                    required
                                    placeholder={'Enter Title'}
                                />
                                <FormInput
                                    label="Description"
                                    name={"description"}
                                    required
                                    textArea
                                    placeholder={'Enter Notes'}
                                />
                                <Button>{"Add Notes"}</Button>
                            </Form>
                        </Modal>
                    </div>

                    <div className='p-4 bg-white rounded border-2  m-1 shadow-sm '>

                        <Row gutter={[12, 8]}>
                            <Col sm={24} md={12}>
                                <p className={'font-bold'}>Ticket No:</p>
                                {tickets && <p>{tickets?.docs[0]?._id}</p>}
                            </Col>
                            <Col span={12}>
                                <p className={'font-bold'}>Name</p>
                                <p>{tickets?.docs[0]?.name}</p>
                            </Col>


                            <Col span={12} className={'overflow-hidden'}>
                                <p className={'font-bold'}>Email</p>
                                <p>{tickets?.docs[0]?.email}</p>
                            </Col>
                            <Col span={12}>
                                <p className={'font-bold'}>Department</p>
                                {tickets &&
                                    <p>{department?.filter(e => e._id === tickets?.docs[0]?.department)[0]?.name}</p>}
                            </Col>


                            <Col span={12}>
                                <p className={'font-bold'}>Type</p>
                                {tickets && <p>{types?.filter(e => e._id === tickets?.docs[0]?.type)[0]?.name}</p>}
                            </Col>

                            <Col span={12}>
                                <p className={'font-bold'}>Status</p>
                                {tickets && <p>{tickets?.docs[0]?.status ? "Active" : "False"}</p>}
                            </Col>
                            <Col span={12}>
                                <p className={'font-bold'}>Priorities</p>
                                {tickets &&
                                    <p>{ticketPriorities?.filter(e => e._id === tickets?.docs[0]?.priorities)[0]?.name}</p>}
                            </Col>

                            <Col span={12}>
                                <p className={'font-bold'}>Date</p>
                                {tickets && <p>{moment(tickets?.docs[0]?.createdAt).format("MMM Do YY")}</p>}
                            </Col>

                        </Row>

                        <div className={'mt-2 w-full flex flex-col '}>
                            <p className={'font-bold'}>Body</p>
                            {tickets?.docs[0]?.body}
                        </div>

                        <Row gutter={6} className={'mt-3'}>
                            {tickets?.docs[0]?.files?.map((f, index) => (<Col span={12}>
                                <img key={index} src={f} alt="f" onClick={() => {
                                    setFile(f);
                                    setFileModal(true)
                                }}/>
                            </Col>))}
                        </Row>
                    </div>
                </div>

                {/*modal for files*/}
                <Modal
                    visible={fileModal}
                    onCancel={() => setFileModal(false)}
                    destroyOnClose
                    footer={null}
                    width={1400}>
                    <img
                        src={file}
                        alt="f"
                        className={'h-full w-full'}
                        onClick={() => {
                            setFile(file);
                        }}
                    />
                </Modal>
            </section>
        </>
    );
}
Ticket.layout = UserLayout;
export default Ticket;
