import './App.css';
import React, {Component} from 'react';
import LeftSideBar from "./components/app/LeftSideBar/LeftSideBar";
import {TopMenu} from "./components/app/TopMenu/TopMenu";
import {Layout} from "antd";
import MainWindow from "./components/app/MainWindow";

const { Content } = Layout;

export default class App extends Component {

  // componentDidMount(){
  //     setTimeout(function() {
  //         AuthBloc.instance.setToken(null)
  //     }, 10000);
  // }

  render() {
    return (
        // <div className={"App"}>
        //     Hi, FU
        //     {/*<TopMenu/>*/}
        //     {/*<LeftSideBar/>*/}
        //     {/*<MainWindow location={this.props.location} />*/}
        // </div>
        <Layout style={{height:'100vh'}}>
          <LeftSideBar/>
          <Layout className="site-layout">
            <TopMenu/>

            <Content
                className="site-layout-background"
                style={{
                  margin: '8px 8px 0px 8px',
                  padding: '8px 8px 8px 8px',
                  minHeight: 280,
                }}
            >
              <MainWindow location={this.props.location} />
            </Content>
          </Layout>
        </Layout>
    )
  }
}
