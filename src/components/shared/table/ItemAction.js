import React from "react";
import {Link} from "react-router-dom";
import "./itemAction.css";
import {Dropdown, Menu} from 'antd';
import {DeleteOutlined, EditOutlined, FolderViewOutlined, MoreOutlined} from "@ant-design/icons";

export const TableActionTypes = {
  VIEW: "VIEW",
  DELETE: "DELETE",
  EDIT: "EDIT",
};
export class ItemAction extends React.Component {

  render() {

    const {details, update, alternateUpdate, remove} = this.props;
    const menu = (
      <Menu >
        {
          this.props.actions.map(function (action) {
            switch (action.type) {
            case TableActionTypes.VIEW:
              return (
                <Menu.Item key={action.type}>
                  <Link key={action.type} to={details}>
                    {<FolderViewOutlined />} {action.title}
                  </Link>
                </Menu.Item>
              );
            case TableActionTypes.EDIT:
              return (
                <Menu.Item key={action.type}>
                  <Link key={action.type} to={update}>
                    {<EditOutlined />} {alternateUpdate ? alternateUpdate : action.title}
                  </Link>
                </Menu.Item>
              );
            case TableActionTypes.DELETE:
              return (
                <Menu.Item key={action.type}>
                  <Link key={action.type} to={remove}>
                    {<DeleteOutlined />} {action.title}
                  </Link>
                </Menu.Item>
              );
            default:
              return "";
            }
          })
        }
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="topLeft">
        <MoreOutlined />
      </Dropdown>
    );
  }
}
