import React, { useState } from "react"
import {Form, Checkbox, Upload} from "antd"

const FormCheckbox = ({ name, label, initialValue }) => {
    const [checked, setChecked] = useState(initialValue || false);



    return (
        <Form.Item
            name={name}
            label={label}

            initialValue={initialValue || ''}
        >
           <Input/>
        </Form.Item>
    )
}


const Input = ({value, onChange}) => {


    return (
        <Checkbox value={value}  onChange={(e) => {
            onChange(e.target.checked);
        }} />
    )
}


export default FormCheckbox