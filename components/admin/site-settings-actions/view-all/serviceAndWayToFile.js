import React, { useState } from 'react';
import { deleteFromArrayHomeServiceBlogsAPI } from '../../../../helpers/backend_helper';
import swalAlert from '../../../common/swalAlert';
import { toast, ToastContainer } from 'react-toastify';
import { Modal } from 'antd';
import ServiceAndWayModalViewDetails from './modalViewDetailsServiceAndWay';


const ServiceAndWayToFile = ({ DWData, setRefreshPage, onClose }) => {

    // handle multiple delete functionalities
    const handleDelete = async (deleteFile) => {
        let deleteInfo;

        if (DWData?.titleFor === 'services') {
            deleteInfo = { id: DWData?.id, services: deleteFile?._id, action: 'services' }

        } else if (DWData?.titleFor === 'way_to_file_tax') {
            deleteInfo = { id: DWData?.id, way_to_file_tax: deleteFile?._id, action: 'way_to_file_tax' }

        }

        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this content?', 'Yes, Delete')
        if (isConfirmed) {
            deleteFromArrayHomeServiceBlogsAPI(deleteInfo).then(data => {
                if (data?.status === true) {
                    setRefreshPage(data?.status)
                    onClose()

                } else {
                    toast.error('Something went wrong! try again...')
                }
            })
        }
    }

    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalData, setIsModalData] = useState(false);

    const showModal = (dt) => {
        setIsModalVisible(true);
        const viewData = { dt }
        setIsModalData(dt)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <div>
            {/* display data, show in Modal for view details and delete functionalities */}
            <table className="table-auto w-full mx-10">
                <thead className='pb-5'>
                    <tr>
                        <th className='py-2'>Contents</th>
                        <th className='py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        DWData?.data?.map((data, i) =>
                            <tr key={2424435 + i} className='pb-3'>
                                <td className='py-1'>
                                    <span className='underline text-purple-500 cursor-pointer' onClick={() => showModal(data)}> View Details </span>
                                </td>
                                <td className='py-1' onClick={() => handleDelete(data)}>
                                    <span className='bg-red-500 px-3 py-1 rounded-md text-white cursor-pointer hover:bg-red-600'>
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>


            {/* modal for display details */}
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

export default ServiceAndWayToFile;