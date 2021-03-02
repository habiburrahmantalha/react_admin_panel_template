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
                            {this.prepareMenu(routes[0])}
                            {this.prepareMenu(routes[7])}
                            <SubMenu key="user" icon={<UserOutlined />} title="User">
                                {this.prepareSubMenu(routes[5])}
                                {this.prepareSubMenu(routes[6])}

                            </SubMenu>
                            <SubMenu key="locations" icon={<ShopOutlined />} title="Locations">
                                {this.prepareSubMenu(routes[1])}
                                {this.prepareSubMenu(routes[2])}
                                {this.prepareSubMenu(routes[3])}
                                {this.prepareSubMenu(routes[4])}
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

const routes = [
    {key: MenuNames.home.lower, label: MenuNames.home.upper, to: routeHome, icon: <HomeOutlined />},
    {key: MenuNames.region.lower, label: MenuNames.region.upper, to: getRouteList(MenuNames.region.lower), icon: <HomeOutlined />},
    {key: MenuNames.area.lower, label: MenuNames.area.upper, to: getRouteList(MenuNames.area.lower), icon: <HomeOutlined />},
    {key: MenuNames.town.lower, label: MenuNames.town.upper, to: getRouteList(MenuNames.town.lower), icon: <HomeOutlined />},
    {key: MenuNames.agency.lower, label: MenuNames.agency.upper, to: getRouteList(MenuNames.agency.lower), icon: <HomeOutlined />},
    {key: MenuNames.user.lower, label: MenuNames.user.upper, to: getRouteList(MenuNames.user.lower), icon: <HomeOutlined />},
    {key: MenuNames.user_group.lower, label: MenuNames.user_group.upper, to: getRouteList(MenuNames.user_group.lower), icon: <HomeOutlined />},
    {key: MenuNames.profile.lower, label: MenuNames.profile.upper, to: getRouteList(MenuNames.profile.lower), icon: <HomeOutlined />},
]