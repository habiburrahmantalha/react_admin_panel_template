import React from "react";
import {Form, Row, Spin} from "antd";
import {TextX} from "../shared/TextX";
import {ButtonX} from "../shared/ButtonX";
import {InputText} from "../shared/FormComponent/InputText";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Colors} from "../../css/Colors";
import {Box} from "../shared/Box";
import AuthBloc from "../../bloc/AuthBloc";
import {prepareInput} from "../../utils/Utils";
import BlocBuilder from "bloc-builder-react/src";
import {InputPassword} from "../shared/FormComponent/InputPassword";
import {APP_NAME} from "../../utils/Constants";

export default class  LoginPage extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            email: prepareInput({
                name: 'email',
                label:  'Email Address',
                placeholder: 'Email Address',
                rules:  [{ required: true, message: 'Please input your email!' }],
                prefixIcon: <UserOutlined className="site-form-item-icon" />
            }),
            password: prepareInput({
                name: 'password',
                label: 'Password',
                rules: [{ required: true, message: 'Please input your Password!' }],
                placeholder: 'Enter Password',
                type: "password",
                prefixIcon: <LockOutlined className="site-form-item-icon" />}),
        };
    }

    componentDidMount() {
        if(AuthBloc.instance.authToken.value){
            this.props.history.push('/');
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(AuthBloc.instance.authToken.value){
            this.props.history.push('/');
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
        AuthBloc.instance.login(values);
    };

    render() {

        return  <Spin spinning={false}>
           <div style={{background: Colors.cloudy_blue, height:'100vh', paddingTop: 120}}>
               <Row justify={"center"}>
                   <TextX
                       align={"center"}
                       text={"Login to "+APP_NAME}
                       size="23"
                       color="var(--dark-grey-blue)"
                       font="SFProDisplay-Regular"
                   />
               </Row>
               <Row justify={"center"}>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} layout="vertical" className="login-form">
                    <InputText values={this.state.email}/>
                    <InputPassword values={this.state.password}/>
                    <Box y={10}/>
                    <Form.Item>
                        <ButtonX
                            htmlType="submit"
                            name="sign-in"
                            text="Sign in" className={"button-default-accent"}/>
                    </Form.Item>
                    <BlocBuilder
                        subject = {AuthBloc.instance.errorText}
                        builder = {(snapshot) => {
                            console.log(snapshot.data);
                            return  <TextX text={snapshot.data} color={Colors.water_blue}/>
                        }}/>
                </Form>
               </Row>
            </div>
        </Spin>;
    }

}
