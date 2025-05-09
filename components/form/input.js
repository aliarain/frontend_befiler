import React from "react"
import { DatePicker, Form, TimePicker } from "antd"
import { useI18n } from "../../contexts/i18n";

const FormInput = ({ name, label, className, rows, type = 'text', required = false, initialValue = '', rules = [], dependencies = [], isEmail, readOnly, onChange, placeholder, textArea = false, style, disabledDate, autoComplete, extra, disableInput = false, max = '' }) => {
    const i18n = useI18n()
    let initRules = [
        { required: required, message: `Please provide ${label?.toLowerCase() || 'a value'}` },
    ]
    if (isEmail === true) {
        initRules.push({type: 'email', message: !!i18n.t ? i18n.t('Please enter a valid email address') : ''})
    }
    return (
        <Form.Item
            name={name}
            className={className}
            label={!!i18n.t && label ? i18n.t(label) : label}
            dependencies={dependencies}
            initialValue={initialValue}
            rules={[...initRules, ...rules]}
            extra={extra}
        >
            {type === 'time' ? (
                <TimePicker format="hh:mm a" className="form-input" />
            ) : type === 'date' ?
                (
                    <DatePicker className="form-input" disabledDate={disabledDate} />
                ) : type === 'textArea' ? (<textarea rows={rows} readOnly={readOnly} onChange={onChange} placeholder={placeholder} className="form-input" />) : (
                    <input type={type} readOnly={readOnly} onChange={onChange} placeholder={placeholder} style={style} autoComplete={autoComplete} className="form-input" disabled={disableInput} />
                )}

        </Form.Item>
    )
}
export default FormInput

export const HiddenFormItem = ({ name, initialValue = '' }) => {
    return (
        <Form.Item name={name} initialValue={initialValue} hidden>
            <input />
        </Form.Item>
    )
}
