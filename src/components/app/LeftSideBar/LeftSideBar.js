import {Link} from 'react-router-dom'
import React, {Component} from 'react';
import './LeftSideBar.css';
import {getRouteList, routeHome} from '../../../utils/RouterUtils';
import {Layout, Menu} from "antd";
import {HomeOutlined, LogoutOutlined, ShopOutlined, UserOutlined} from "@ant-design/icons";
import BlocBuilder from "bloc-builder-react/src";
import SettingsBloc from "../../../bloc/SettingsBloc";
import AuthBloc from "../../../bloc/AuthBloc";
import {MenuNames} from "../../../utils/Constants";

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;


class LeftSideBar extends Component {

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        return (
            <BlocBuilder
                subject = {SettingsBloc.instance.sideBarCollapsed}
                builder = {(snapshot) => {
                    return   <Sider trigger={null} collapsible collapsed={snapshot.data}>
                        <div className="side-logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            {this.prepareMenu(routes.home)}
                            <SubMenu key="user" icon={<UserOutlined />} title="User">
                                {this.prepareSubMenu(routes.user)}
                                {this.prepareSubMenu(routes.user_group)}

                            </SubMenu>
                            <SubMenu key="locations" icon={<ShopOutlined />} title="Locations">
                                {this.prepareSubMenu(routes.region)}
                                {this.prepareSubMenu(routes.area)}
                            </SubMenu>

                            <Menu.Item key={"logout"} icon={<LogoutOutlined />} onClick={()=> AuthBloc.instance.logout()}>
                                {"Logout"}
                            </Menu.Item>
                        </Menu>
                    </Sider>
                }}/>
        )
    }

    prepareSubMenu = (item) => {
        return <Menu.Item key={item.key}>
            <Link key={item.key+"-link"} to={item.to}>{item.label}</Link>
        </Menu.Item>
    };

    prepareMenu = (item) => {
        return <Menu.Item key={item.key} icon={item.icon}>
            <Link key={item.key+"-link"} to={item.to}>{item.label}</Link>
        </Menu.Item>
    };
}

export default LeftSideBar;

const routes = {
    home: {key: MenuNames.home.lower, label: MenuNames.home.upper, to: routeHome, icon: <HomeOutlined />},
    region: {key: MenuNames.region.lower, label: MenuNames.region.upper, to: getRouteList(MenuNames.region.lower), icon: <HomeOutlined />},
    area: {key: MenuNames.area.lower, label: MenuNames.area.upper, to: getRouteList(MenuNames.area.lower), icon: <HomeOutlined />},
    user: {key: MenuNames.user.lower, label: MenuNames.user.upper, to: getRouteList(MenuNames.user.lower), icon: <HomeOutlined />},
    user_group: {key: MenuNames.user_group.lower, label: MenuNames.user_group.upper, to: getRouteList(MenuNames.user_group.lower), icon: <HomeOutlined />},
}