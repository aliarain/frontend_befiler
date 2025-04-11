import { message } from 'antd';
import React from 'react';
import { deleteTaxSituationFromArrayAPI } from '../../../../helpers/backend_helper';


const WorkProcessSituation = ({ workProcessData, setRefreshPage }) => {

    // handle delete
    const handleDeleteWorkProcess = (data) => {
        const queryV = { id: workProcessData?._id }
        deleteTaxSituationFromArrayAPI(data, queryV).then(res => {
            if (res?.status === true) {
                message.success(res?.message)
                setRefreshPage(res?.message)

            } else {
                message.warning(res?.message)
            }
        })
    }


    return (
        <div>
            {
                workProcessData?.work_process_description?.map((data, i) =>
                    <div key={i + 53645} className='border border-slate-300 mb-2 p-2 relative' >
                        <div dangerouslySetInnerHTML={{ __html: data?.processDetails ?? "" }} ></div>
                        <span className='absolute top-5 right-5 cursor-pointer bg-red-500 hover:bg-red-600 px-2 py-1 text-white rounded-md inline-block' onClick={() => handleDeleteWorkProcess(data)}>Delete</span>
                    </div>
                )
            }
        </div>
    );
};

export default WorkProcessSituation;