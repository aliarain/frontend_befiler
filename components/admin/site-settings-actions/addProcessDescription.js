import React from 'react';
import { Form } from 'antd';
import dynamic from 'next/dynamic';
const DraftBoard = dynamic(() => import('../../admin/draftEditor/draftBoard.js'), {
    ssr: false
})


const AddProcessDescription = ({ onChangeDraft }) => {

    return (
        
        <Form.Item
            name="contents"
            className='h-60'
        >
            <DraftBoard onChange={onChangeDraft} />
        </Form.Item>
    );
};

export default AddProcessDescription;