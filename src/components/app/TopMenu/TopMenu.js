import React, {Component} from 'react'
import './TopMenu.css';
import {Col, Dropdown, Layout, Row, Menu, Avatar, Space} from "antd";
import {LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import SettingsBloc from "../../../bloc/SettingsBloc";
import BlocBuilder from "bloc-builder-react/src";
import {TextX} from "../../shared/TextX";
import AuthBloc from "../../../bloc/AuthBloc";
import {Box} from "../../shared/Box";

const { Header, Footer, Sider, Content } = Layout;
export class TopMenu extends Component {

    toggle = () => {
        SettingsBloc.instance.toggleSizeBar();
    };

    render() {

        return (
            <Header className="site-layout-background" style={{padding: 0}}>
                <Row align={"middle"} justify={"space-between"}>
                    <Row align={"middle"}>
                        <BlocBuilder
                            subject={SettingsBloc.instance.sideBarCollapsed}
                            builder={(snapshot) => {
                                return React.createElement(snapshot.data ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: this.toggle,
                                })
                            }}/>
                        <BlocBuilder
                            subject={SettingsBloc.instance.currentPageTitle}
                            builder={(snapshot) => {
                                return <TextX text={snapshot.data} size={20}/>
                            }}/>
                    </Row>
                    <BlocBuilder
                        subject={AuthBloc.instance.user}
                        builder={(snapshot) => {
                            return snapshot.data &&
                                <Dropdown overlay={this.prepareMenu(snapshot.data)} placement="bottomRight" arrow>
                                    <div className={'user-menu'}>
                                        {/*<Col>*/}
                                        {/*    <Row><TextX text={snapshot.data.name} size={16}/></Row>*/}
                                        {/*    <Row><TextX text={snapshot.data.email} size={14}/></Row>*/}
                                        {/*    <Row><TextX text={snapshot.data.user_group.title} size={14}/></Row>*/}
                                        {/*</Col>*/}
                                        <Row align={'middle'}><Avatar style={{backgroundColor: '#87d068'}}
                                                                      icon={<UserOutlined/>}/>
                                            <Box x={10}/>
                                            <TextX text={snapshot.data.name} size={16}/>
                                        </Row>
                                    </div>
                                </Dropdown>
                        }}/>
                </Row>
            </Header>
        )
    }

    prepareMenu = (data) =>{
        return <Menu>
            <Menu.Item>
                <TextX text={data.email} size={14}/>
            </Menu.Item>
            <Menu.Item>
                <TextX text={data.user_group.title} size={14}/>
            </Menu.Item>
            <Menu.Item key={"logout"} icon={<LogoutOutlined />} onClick={()=> AuthBloc.instance.logout()}>
                {"Logout"}
            </Menu.Item>
        </Menu>
    }
}