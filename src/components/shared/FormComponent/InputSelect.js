import React from "react";
import {Form, Select} from "antd";
import "./FormComponent.css";

const {Option} = Select;

export class InputSelect extends React.Component {

  render() {

    const {value, isFetching, options, onSelect} = this.props;
    const {name, label, placeholder, rules, prefixIcon} = this.props.values;

    return (
      <Form.Item
                 label={label}
          name={name}
          rules={rules}>
          <Select
              showSearch
                  allowClear={true}
                  placeholder={placeholder}
                  size='large'
                  loading={isFetching}
                  onSelect={onSelect}
              >
            {options.map((e, i)=><Option key={i} value={e.id ? e.id : ""}>{e.title ? e.title : e }</Option>)}
          </Select>
      </Form.Item>
    );
  }
}
