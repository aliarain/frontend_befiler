import React from 'react';
import { deleteFromArrayHomeServiceBlogsAPI } from '../../../../helpers/backend_helper';
import swalAlert from '../../../common/swalAlert';


const LinksVideosAction = ({ DWData, setRefreshPage, onClose }) => {

    // handle multiple delete action
    const handleDelete = async (deleteFile) => {
        let deleteInfo;
        if (DWData?.titleFor === 'file_tax_videos') {
            deleteInfo = { id: DWData?.id, file_tax_videos: deleteFile, action: 'file_tax_videos' }

        } else if (DWData?.titleFor === 'partner_ships') {
            deleteInfo = { id: DWData?.id, partner_ships: deleteFile, action: 'partner_ships' }

        } else if (DWData?.titleFor === 'student_class_videos') {
            deleteInfo = { id: DWData?.id, student_class_videos: deleteFile, action: 'student_class_videos' }

        } else if (DWData?.titleFor === 'services') {
            deleteInfo = { id: DWData?.id, services: deleteFile, action: 'services' }

        } else if (DWData?.titleFor === 'way_to_file_tax') {
            deleteInfo = { id: DWData?.id, way_to_file_tax: deleteFile, action: 'way_to_file_tax' }

        } else if (DWData?.titleFor === 'hero_section_images') {
            deleteInfo = { id: DWData?.id, hero_section_images: deleteFile, action: 'hero_section_images' }

        }

        let { isConfirmed } = await swalAlert.confirm('Are you want to delete this content?', 'Yes, Delete')
        if (isConfirmed) {
            deleteFromArrayHomeServiceBlogsAPI(deleteInfo).then(data => {
                if (data?.status === true) {
                    setRefreshPage(data?.status)
                    onClose()
                }
            })
        }
    }


    return (
        <div>
            {/* display all links and delete functionalities */}
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
                                    <a href={data ?? "#"} target="__blank">{
                                        `${((DWData?.titleFor === 'partner_ships') || (DWData?.titleFor === 'hero_section_images')) ?
                                            (DWData?.titleFor === 'partner_ships' ? 'View logo' : 'View hero image') : 'View video'}`
                                    }</a>
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

        </div>
    );
};

export default LinksVideosAction;