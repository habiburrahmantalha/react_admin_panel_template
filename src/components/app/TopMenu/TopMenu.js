import React, {Component} from 'react'
import './TopMenu.css';
import {Col, Layout, Row} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import SettingsBloc from "../../../bloc/SettingsBloc";
import BlocBuilder from "bloc-builder-react/src";
import {TextX} from "../../shared/TextX";
import AuthBloc from "../../../bloc/AuthBloc";

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
                                <div style={{marginRight: 20}}><Col>
                                    <Row><TextX text={snapshot.data.name} size={16}/></Row>
                                    <Row><TextX text={snapshot.data.email} size={14}/></Row>
                                    <Row><TextX text={snapshot.data.user_group.title} size={14}/></Row>
                                </Col></div>
                        }}/>
                </Row>
            </Header>
        )
    }
}