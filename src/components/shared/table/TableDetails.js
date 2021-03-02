import React from "react";
import {Table} from 'antd';
import "./tableDetails.css";
import {FormatText} from "./FormatText";
import {tableContentType} from "./table_utils";

export class TableDetails extends React.Component {

  render() {
    let {data, isFetching, isFailed, attributes} = this.props;

    console.log(data)
    const result = attributes.map((e, i) => { return {
      key: i,
      title: e.title,
      value: data ? data[e.field]: ""
    };});
    console.log(result)
    const columns = [
      {
        dataIndex: "title",
        render: (text, record, index) => (<FormatText type={tableContentType.TITLE} record={record}/>),
        width: 200,
      },
      {
        dataIndex: "value",
        render: (text, record, index) => (<FormatText type={data ? attributes[index].type : tableContentType.SHIMMER} record={record} data={text}/>),
      },
    ];
    return <Table className="table-details" dataSource={result} loading={false} columns={columns} showHeader={false} bordered={true} pagination={false}/>;
  }
}

