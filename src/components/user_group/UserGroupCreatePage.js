import React from "react";
import BlocBuilder from "bloc-builder-react/src";
import SettingsBloc from "../../bloc/SettingsBloc";

import AuthBloc from "../../bloc/AuthBloc";
import {Form, Row, Select, Spin} from "antd";
import {Colors} from "../../css/Colors";
import {TextX} from "../shared/TextX";
import {InputText} from "../shared/FormComponent/InputText";
import {Box} from "../shared/Box";
import {ButtonX} from "../shared/ButtonX";
import {InputFields} from "../../utils/InputFields";
import CrudBloc from "../../bloc/CrudBloc";
import {MenuNames} from "../../utils/Constants";
import {getRouteList} from "../../utils/RouterUtils";
import {InputSelect} from "../shared/FormComponent/InputSelect";
import {InputFieldOptions} from "../../utils/InputFieldOptions";
import {FormSkeleton} from "../shared/FormSkeleton";

export class UserGroupCreatePage extends React.Component{


    formRef = React.createRef();
    constructor(props) {
        super(props);
        //console.log(props);

        this.state = {
            name: InputFields.name,
            status: InputFields.status,
        };

        if(this.props.edit){
            const {id} = this.props.match.params;
            CrudBloc.instance.getDetails(id, MenuNames.user_group.lower);
        }else{
            CrudBloc.instance.clearDetails(MenuNames.user_group.lower);
        }

    }

    componentDidMount() {

        let formRef = this.formRef;
        if(this.props.edit){
            SettingsBloc.instance.setCurrentPageTitle("UserGroup Update");
            this.user_groupSubcription = CrudBloc.instance.user_group.subscribe({
                next(x) {
                    if (x){

                        //formRef.current?.setFieldsValue({ area_id: x.area_id });
                    }
                },
            });
        }else {
            SettingsBloc.instance.setCurrentPageTitle("Create new UserGroup");
            const history = this.props.history;
            this.createResponseSubscription = CrudBloc.instance.createResponse.subscribe({
                next(x) {
                    if (x){
                        history.push(getRouteList(MenuNames.user_group.lower));
                        CrudBloc.instance.clearCreateResponseData();
                    }
                },
            });
        }

    }
    componentWillUnmount() {
        console.log("Unmount")
        this.user_groupSubcription?.unsubscribe()
        this.createResponseSubscription?.unsubscribe();
    }

    onFinish = (values) => {
        console.log('Success:', values);
        if(this.props.edit){
            const {id} = this.props.match.params;
            CrudBloc.instance.update(id, values, MenuNames.user_group.lower);
        }else{
            CrudBloc.instance.createNew(values, MenuNames.user_group.lower);
        }

    };

    render() {
        return (
            <Spin spinning={false}>
                <BlocBuilder
                    subject = {CrudBloc.instance.user_group}
                    builder = {(snapshot) => {
                        console.log(snapshot.data);
                        //console.log(snapshot.data ? snapshot.data[this.state.title.name] : null);
                        return   !this.props.edit ||  snapshot.data ? <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} layout="vertical" className="login-form">
                            <InputText
                                values={this.state.name}
                                value={this.props.edit && snapshot.data ? snapshot.data[this.state.name.name] : null}/>

                            <InputSelect
                                values={this.state.status}
                                options={InputFieldOptions.status}
                            />
                            <Box y={10}/>
                            <Form.Item>
                                <ButtonX
                                    htmlType="submit"
                                    name="submit"
                                    text="Submit" className={"button-default-accent"}/>
                            </Form.Item>
                            <BlocBuilder
                                subject = {AuthBloc.instance.errorText}
                                builder = {(snapshotError) => {
                                    //console.log(snapshotError.data);
                                    return  <TextX text={snapshotError.data} color={Colors.water_blue}/>
                                }}/>
                        </Form> : <FormSkeleton line={2}/>
                    }}/>
            </Spin>
        );
    }
}