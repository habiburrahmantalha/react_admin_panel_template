import React from 'react';
import {Form, Input,} from 'antd';
import "./FormComponent.css";

const { TextArea } = Input;

export class InputTextArea extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { disabled, values = {} } = this.props;
    const { name, label, placeholder, rules, extra, value, validateTrigger = "onChange" } = values;

    return (
      <Form.Item className="no-bottom-margin" label={label} extra={extra}>
        {getFieldDecorator(name, {
          rules: rules,
          initialValue: value,
          validateTrigger: validateTrigger,
        })(<TextArea placeholder={placeholder} disabled={disabled} />)}
      </Form.Item>
    );
  }
}
