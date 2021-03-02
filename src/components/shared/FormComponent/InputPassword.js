import React from "react";
import {Form, Input} from "antd";
import "./FormComponent.css";

export class InputPassword extends React.Component {
  render() {

    const {value} = this.props;
    const {name, label, placeholder, rules, prefixIcon, type = "text"} = this.props.values;

    console.log(value);
    return (
        <Form.Item
            label={label}
            name={name}
            rules={rules}
            initialValue={value}
        >
          <Input.Password prefix={prefixIcon} placeholder={placeholder} type={type}/>
        </Form.Item>
    );
  }
}
