import React from 'react';
import {Form, Input,} from 'antd';
import "./FormComponent.css";

const { TextArea } = Input;

export class InputTextArea extends React.Component {
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
          <TextArea prefix={prefixIcon} placeholder={placeholder} type={type}/>
        </Form.Item>
    );
  }
}
