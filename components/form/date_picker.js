import React, {useState} from "react"
import {Form, Select, Radio, DatePicker, Space} from "antd"

const onOk = (value) => {
  
};

const onChange = (date, dateString) => {
    
};

const FormDatePicker = ({
                       name,
                       label,
                       initialValue,
                       onChange,
                   }) => {

    return (
        <Form.Item
            name={name}
            label={label}
            initialValue={initialValue || ''}
        >
            <DatePicker showTime onOk={onOk} />

        </Form.Item>
    )
}
export default FormDatePicker




