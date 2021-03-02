import React from "react";
import {Form, Radio, Select} from "antd";
import "./FormComponent.css";

const {Option} = Select;

export class InputRadio extends React.Component {

  render() {

    const {value, isFetching, options, onSelect} = this.props;
    const {name, label, placeholder, rules, prefixIcon} = this.props.values;

    return (
      <Form.Item
          label={label}
          name={name}
          rules={rules}>
          <Radio.Group>
            {options.map((e, i)=><Radio key={i} value={e.id ? e.id : ""}>{e.title ? e.title : e }</Radio>)}
          </Radio.Group>
      </Form.Item>
    );
  }
}
