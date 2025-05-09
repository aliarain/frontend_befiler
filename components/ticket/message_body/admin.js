// import React, {useEffect, useState} from 'react';
// import PageTitle from "../../../../components/common/page-title";
// import {useAction, useFetch} from "../../../../helpers/hooks";
// import {
//     fetchTicketDepartment,
//     featchTickets,
//     fetchTicketType,
//     postTicket,
//     getTicketPriorities,
//     fetchProfile,
//     postTicketMessage, fetchSettings
// } from "../../../../helpers/backend_helper";
// import FormInput, {HiddenFormItem} from "../../../../components/form/input";
// import Button from "../../../../components/common/button";
// import {useI18n} from "../../../../contexts/i18n";
// import {useRouter} from "next/router";
// import {Col, Form, Modal, Row} from "antd";
// import moment from "moment";
// import From from "../../../../components/ticket/message_body/from";
// import To from "../../../../components/ticket/message_body/to";
// import socket, {io} from "socket.io-client";
// import AdminLayout from "../../../../layout/adminLayout";
//
//
// const Ticket = () => {
//     const i18n = useI18n()
//     const [form] = Form.useForm()
//     const [form1] = Form.useForm()
//     const {query} = useRouter()
//     const [tickets, getTickets] = useFetch(featchTickets, {}, false)
//     const [department] = useFetch(fetchTicketDepartment)
//     const [types] = useFetch(fetchTicketType)
//     const [ticketPriorities] = useFetch(getTicketPriorities)
//     const [userProfile] = useFetch(fetchProfile)
//     const [id, setId] = useState('')
//     const [user_id, setUser_id] = useState('')
//     // modal
//     const [noteModal, setNoteModal] = useState(false);
//     const [fileModal, setFileModal] = useState(false);
//     const [file, setFile] = useState('');
//
//     //initialize socket url
//     const [SOCKET_URL, setSOCKET_URL] = useState('')
//     const [settings, getSettings] = useFetch(fetchSettings)
//     useEffect(() => {
//         if (settings?.url?.socket_url) {
//             setSOCKET_URL(settings?.url?.socket_url)
//         }
//     }, [settings]);
//
//     useEffect(() => {
//         if (userProfile?._id) {
//             setUser_id(userProfile._id);
//         }
//     }, [userProfile]);
//
//     useEffect(() => {
//         if (query._id) {
//             getTickets({_id: query._id})
//             setId(query._id)
//         }
//     }, [query._id]);
//
//     // useEffect(() => {
//     //     if (!!SOCKET_URL) {
//     //         // Connect to the Socket.io server
//     //         const socket = io(String(SOCKET_URL));
//     //         // Listen for the "notification" event
//     //         socket.on('ticket_msg', data => {
//     //             getTickets({_id: query._id})
//     //         });
//     //         // Disconnect from the server when the component unmounts
//     //         return () => {
//     //             socket.disconnect();
//     //         };
//     //     }
//     // }, [SOCKET_URL]);
//
//     const handleNoteSubmit = async (values) => {
//         await useAction(postTicket, {...values, flag: 'notes'}, () => {
//             getTickets()
//         })
//     }
//
//     return (
//         <>
//             <Row gutter={8}>
//                 <Col span={21}> <PageTitle title="Ticket Details" /></Col>
//                 <Col span={3}>
//                     <div>
//
//                         <button onClick={() => {
//                             useAction(postTicket, {
//                                 _id: id,
//                                 flag: tickets?.docs[0]?.status === 'closed' ? 'open' : 'closed'
//                             }, () => {
//                                 getTickets()
//                             })
//                         }}
//                             className={`px-3 mt-1 py-3 w-full rounded  ${tickets?.docs[0]?.status === "closed" ? "bg-green-600" : "bg-red-600"} text-white      h-full`}>{tickets?.docs[0]?.status === 'closed' ? 'Open This Ticket' : 'Close  Ticket'}
//                         </button>
//                     </div>
//                 </Col>
//             </Row>
//
//             <section>
//                 <div className={'grid lg:grid-cols-3 gap-4'}>
//                     <div className='p-4 bg-white '>
//                         <div className="h-full overflow-hidden py-4">
//                             <div className="flex flex-col h-full w-full bg-white ">
//                                 {/*msg body section */}
//                                 <div className="h-[550px] overflow-hidden ">
//                                     <div className="h-full overflow-y-auto">
//                                         <div className="grid grid-cols-12 gap-y-2">
//                                             {tickets?.docs[0]?.messages?.map((item, index) => {
//                                                 return (< >
//                                                     {item?.user === user_id ? (
//                                                         <To msg={item.message} />) : (<From msg={item.message} />)}
//                                                 </>)
//                                             })}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/*send box*/}
//                                 {tickets?.docs[0]?.status !== 'closed' ?
//                                     <div className="">
//                                         <Form
//                                             form={form1}
//                                             onFinish={(values => {
//                                                 const payload = {
//                                                     ...values,
//                                                     ticket_id: tickets?.docs[0]?._id,
//                                                     user_id: user_id
//                                                 }
//                                                 form1.resetFields()
//                                                 useAction(postTicketMessage, payload, () => {
//                                                     getTickets()
//                                                 }, false)
//                                             })}
//                                             layout='horizontal'
//                                         >
//                                             <Row gutter={6} className={'mt-4'}>
//                                                 <Col span={20}>
//                                                     <FormInput
//                                                         name={"message"}
//                                                         required
//                                                         placeholder={"Type your message...."}
//                                                     />
//                                                 </Col>
//                                                 <Col span={4}>
//                                                     <button
//                                                         className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white">
//                                                         <svg className="w-5 h-5 transform rotate-90 -mr-px"
//                                                             fill="none"
//                                                             stroke="currentColor"
//                                                             viewBox="0 0 24 24"
//                                                             xmlns="http://www.w3.org/2000/svg">
//                                                             <path stroke-linecap="round"
//                                                                 stroke-linejoin="round"
//                                                                 stroke-width="2"
//                                                                 d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
//                                                         </svg>
//                                                     </button>
//                                                 </Col>
//                                             </Row>
//                                         </Form>
//                                     </div> :
//                                     <p className={'w-full font-bold text-center text-green-600'}>Ticket Closed</p>}
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className='p-4 bg-white rounded '>
//                         <div className={'w-full flex justify-end'}>
//                             <button onClick={() => setNoteModal(true)} className={'px-3 py-2 rounded bg-main2'}>Add
//                                 Notes
//                             </button>
//                         </div>
//                         {/*each notes box*/}
//                         {tickets?.docs[0]?.notes?.map((note, index) => (
//                             <div key={index} className={'my-4 rounded shadow p-4 flex flex-col '}>
//                                 <h3 className={'text-xl font-bold'}>{note.title}</h3>
//                                 <p>{note.description}</p>
//                                 {/*<h4 className={'mt-2 font-semi-bold'}>{moment(tickets.createdAt).format("MMM Do YY")}</h4>*/}
//                             </div>
//                         )
//                         )}
//                         {/*modal for notes*/}
//                         <Modal title={`Add Notes`} visible={noteModal} onCancel={() => setNoteModal(false)}
//                             destroyOnClose
//                             footer={null}
//                             width={569}>
//                             <Form
//                                 form={form}
//                                 onFinish={handleNoteSubmit}
//                                 layout='vertical'
//                             >
//                                 <HiddenFormItem name="_id" initialValue={id} />
//                                 <FormInput
//                                     label="Titile"
//                                     name={"title"}
//                                     required
//                                     placeholder={'Enter Title'}
//                                 />
//                                 <FormInput
//                                     label="Description"
//                                     name={"description"}
//                                     required
//                                     textArea
//                                     placeholder={'Enter Notes'}
//                                 />
//                                 <Button>{"Add Notes"}</Button>
//                             </Form>
//                         </Modal>
//                     </div>
//                     <div className='p-4 bg-white rounded '>
//
//                         <Row gutter={[12, 8]}>
//                             <Col span={12}>
//                                 <p className={'font-bold'}>Ticket No:</p>
//                                 {tickets && <p>{tickets?.docs[0]?._id}</p>}
//                             </Col>
//                             <Col span={12}>
//                                 <p className={'font-bold'}>Name</p>
//                                 <p>{tickets?.docs[0]?.name}</p>
//                             </Col>
//
//
//                             <Col span={12} className={'overflow-hidden'}>
//                                 <p className={'font-bold'}>Email</p>
//                                 <p>{tickets?.docs[0]?.email}</p>
//                             </Col>
//                             <Col span={12}>
//                                 <p className={'font-bold'}>Department</p>
//                                 {tickets &&
//                                     <p>{department?.filter(e => e._id === tickets?.docs[0]?.department)[0]?.name}</p>}
//                             </Col>
//
//
//                             <Col span={12}>
//                                 <p className={'font-bold'}>Type</p>
//                                 {tickets && <p>{types?.filter(e => e._id === tickets?.docs[0]?.type)[0]?.name}</p>}
//                             </Col>
//
//                             <Col span={12}>
//                                 <p className={'font-bold'}>Status</p>
//                                 {tickets && <p>{tickets?.docs[0]?.status ? "Active" : "False"}</p>}
//                             </Col>
//                             <Col span={12}>
//                                 <p className={'font-bold'}>Priorities</p>
//                                 {tickets &&
//                                     <p>{ticketPriorities?.filter(e => e._id === tickets?.docs[0]?.priorities)[0]?.name}</p>}
//                             </Col>
//
//                             <Col span={12}>
//                                 <p className={'font-bold'}>Date</p>
//                                 {tickets && <p>{moment(tickets?.docs[0]?.createdAt).format("MMM Do YY")}</p>}
//                             </Col>
//
//                         </Row>
//                         <Row gutter={6} className={'mt-2 flex flex-col'}>
//                             <p className={'font-bold'}>Body</p>
//                             <p>{tickets?.docs[0]?.body}</p>
//                         </Row>
//
//                         <Row gutter={6} className={'mt-3'}>
//                             {tickets?.docs[0]?.files?.map((f, index) => (<Col span={12}>
//                                 <img key={index} src={f} alt="f" onClick={() => {
//                                     setFile(f);
//                                     setFileModal(true)
//                                 }} />
//                             </Col>))}
//                         </Row>
//                     </div>
//                 </div>
//
//                 {/*modal for files*/}
//                 <Modal
//                     visible={fileModal}
//                     onCancel={() => setFileModal(false)}
//                     destroyOnClose
//                     footer={null}
//                     width={1400}
//                 >
//                     <img
//                         src={file}
//                         alt="f"
//                         className={'h-full w-full'}
//                         onClick={() => {
//                             setFile(file);
//                         }}
//                     />
//                 </Modal>
//             </section>
//         </>
//     );
// };
// Ticket.layout = AdminLayout;
// export default Ticket;
