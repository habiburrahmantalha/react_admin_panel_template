import React from "react";
import BlocBuilder from "bloc-builder-react/src";
import SettingsBloc from "../../bloc/SettingsBloc";
import AuthBloc from "../../bloc/AuthBloc";
import {Form, Spin} from "antd";
import {Colors} from "../../css/Colors";
import {TextX} from "../shared/TextX";
import {InputText} from "../shared/FormComponent/InputText";
import {Box} from "../shared/Box";
import {ButtonX} from "../shared/ButtonX";
import {InputFields} from "../../utils/InputFields";
import CrudBloc from "../../bloc/CrudBloc";
import {MenuNames} from "../../utils/Constants";
import {getRouteList} from "../../utils/RouterUtils";


export class RegionCreatePage extends React.Component{

    formRef = React.createRef();
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            title: InputFields.title
        };

        if(this.props.edit){
            const {id} = this.props.match.params;
            CrudBloc.instance.getDetails(id, MenuNames.region.lower);
        }else{
            CrudBloc.instance.clearDetails(MenuNames.region.lower);
        }
    }

    componentDidMount() {
        if(this.props.edit) {
            SettingsBloc.instance.setCurrentPageTitle("Region Update");
        } else {
            SettingsBloc.instance.setCurrentPageTitle("Create new Region");
            const history = this.props.history;
            CrudBloc.instance.createResponse.subscribe({
                next(x) {
                    console.log(x);
                    if(x) {
                        history.push(getRouteList(MenuNames.region.lower));
                        CrudBloc.instance.clearCreateResponseData();
                    }
                },
                error(err) { console.error('something wrong occurred: ' + err); },
                complete() { console.log('done'); }
            });
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
        if(this.props.edit) {
            const {id} = this.props.match.params;
            CrudBloc.instance.update(id, values, MenuNames.region.lower);
        } else {
            CrudBloc.instance.createNew(values, MenuNames.region.lower);
        }
    };

    render() {
        return (
            <Spin spinning={false}>
                <BlocBuilder
                    subject = {CrudBloc.instance.region}
                    builder = {(snapshot) => {
                        console.log(snapshot.data);
                        console.log(snapshot.data ? snapshot.data[this.state.title.name] : null);
                        return   !this.props.edit ||  snapshot.data ? <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} layout="vertical" className="login-form">
                            <InputText values={this.state.title} value={this.props.edit && snapshot.data ? snapshot.data[this.state.title.name] : null}/>
                            <Box y={10}/>
                            <Form.Item>
                                <ButtonX
                                    htmlType="submit"
                                    name="submit"
                                    text="Submit" className={"button-default-accent"}/>
                            </Form.Item>
                            <BlocBuilder
                                subject = {AuthBloc.instance.errorText}
                                builder = {(snapshot) => {
                                    console.log(snapshot.data);
                                    return  <TextX text={snapshot.data} color={Colors.water_blue}/>
                                }}/>
                        </Form> : <Spin/>
                    }}/>
            </Spin>
        );
    }
}