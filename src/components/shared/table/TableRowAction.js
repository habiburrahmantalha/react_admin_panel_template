import React from "react";
import {Link} from "react-router-dom";
import "./itemAction.css";
import {Dropdown, Menu} from 'antd';
import {FileExcelOutlined, MoreOutlined} from "@ant-design/icons";


export class TableRowAction extends React.Component {

  render() {

    const {actions} = this.props;
    const menu = (
      <Menu >
        {
          actions.map((action) =>
            <Menu.Item key={action.title}>
              <Link key={action.title} to={action.url}>
                {action.icon ? <FileExcelOutlined /> : null} {action.title}
              </Link>
            </Menu.Item>
          )
        }
      </Menu>
    );


    return (
      actions.length === 0 ? <div/> : <Dropdown overlay={menu} placement="topLeft">
        <a><MoreOutlined/></a>
      </Dropdown>
    );
  }
}
