import React, { useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { updateDeleteArrayContentAboutAPI } from '../../../../helpers/backend_helper';
import swalAlert from '../../../common/swalAlert';
import { RiDeleteBinLine } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import { Modal } from 'antd';
import ServiceAndWayModalViewDetails from './modalViewDetailsServiceAndWay';



const ExecutiveAndAffiliate = ({ actionTitle, actionData, setRefreshPage, onClick }) => {

    // handle multiple delete
    const handleDelete = async (deleteFile) => {
        let deleteInfo;
        if (actionTitle === 'executive_team') {
            deleteInfo = { id: deleteFile?._id, executive_team: deleteFile?._id, action: 'executive_team' }

        } else if (actionTitle === 'accounting_affiliates') {
            deleteInfo = { id: deleteFile?._id, accounting_affiliates: deleteFile?._id, action: 'accounting_affiliates' }

        } else if (actionTitle === 'photo_gallery') {
            deleteInfo = { id: deleteFile?._id, photo_gallery: deleteFile?._id, action: 'photo_gallery' }

        }

        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this user?', 'Yes, Delete')
        if (isConfirmed) {
            updateDeleteArrayContentAboutAPI(deleteInfo, { id: deleteInfo?.id }).then(data => {
                if (data?.status === true) {
                    setRefreshPage(data?.status,)
                    onClick()
                }
            })
        }
    }


    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalData, setIsModalData] = useState(false);

    const showModal = (dt) => {
        setIsModalVisible(true);
        setIsModalData(dt)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <div>
            {/* display data in table(executive and affiliate) and perform delete functionalities */}
            {
                (actionTitle === 'executive_team' || actionTitle === 'accounting_affiliates') &&
                <table className="table-auto w-full">
                    <thead className='pb-5'>
                        <tr>
                            <th className='py-2'>Name</th>
                            <th className='py-2'>Title</th>
                            <th className='py-2'>LinkedIn</th>
                            <th className='py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            actionData?.map((data, i) =>
                                <tr key={2435 + i} className='pb-3'>
                                    <td className='py-1'>
                                        <span className='text-purple-500'>{`${data?.user?.first_name ?? 'N/A'} ${data?.user?.last_name ?? ''}`}</span>
                                    </td>
                                    <td className='py-1'>
                                        <span className=''>{`${data?.title ?? 'N/A'}`}</span>
                                    </td>
                                    <td className='py-1'>
                                        <a href={`${data?.user?.linkedIn ?? "#"}`} target="__blank">
                                            <span className='flex justify-center'>
                                                <AiFillLinkedin size={20} />
                                            </span>
                                        </a>
                                    </td>
                                    <td className='py-1 text-center' onClick={() => handleDelete(data)}>
                                        <a>
                                            <span className='text-red-500 hover:text-red-600 flex justify-center'>
                                                <RiDeleteBinLine size={20} />
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }


            {/* photo Gallery data */}
            {
                actionTitle === 'photo_gallery' &&
                <table className="table-auto w-full ">
                    <thead className='pb-5'>
                        <tr>
                            <th className='py-2'>
                                Contents
                            </th>

                            <th className='py-2 text-center'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            actionData?.map((data, i) =>
                                <tr key={95355 + i} className='pb-3 border-t'>
                                    <td className='py-2'>
                                        <span onClick={() => showModal(data)} className='text-purple-500 underline cursor-pointer'>
                                            View Details
                                        </span>
                                    </td>
                                    <td className='py-2 text-center' onClick={() => handleDelete(data)}>
                                        <a>
                                            <span className='text-red-500 hover:text-red-600 flex justify-center'>
                                                <RiDeleteBinLine size={20} />
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }


            {/* modal`` */}
            <Modal title="Details View" visible={isModalVisible} onCancel={handleCancel} footer={null} destroyOnClose>
                <ServiceAndWayModalViewDetails isModalData={isModalData} />
            </Modal>


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

export default ExecutiveAndAffiliate;