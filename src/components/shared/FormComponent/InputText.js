import React from 'react';
import {Form, Input, InputNumber} from 'antd';
import "./FormComponent.css";

export class InputText extends React.Component {
    render() {

        const {value} = this.props;
        const {name, label, placeholder, rules, prefixIcon, type = "text"} = this.props.values;
        
        return (
            <Form.Item
                label={label}
                name={name}
                rules={rules}
                initialValue={value}
            >
                {type === 'number' ?<InputNumber prefix={prefixIcon} placeholder={placeholder}/>:
                <Input prefix={prefixIcon} placeholder={placeholder} type={type}/>}
            </Form.Item>
        );
    }
}
