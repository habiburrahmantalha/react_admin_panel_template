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
import {getRouteList} from "../../utils/RouterUtils";
import {InputSelect} from "../shared/FormComponent/InputSelect";
import {MenuNames} from "../../utils/Constants";

export class AreaCreatePage extends React.Component{


    formRef = React.createRef();
    constructor(props) {
        super(props);
        //console.log(props);

        this.state = {
            title: InputFields.title,
            region_id: InputFields.region_id,
            agency_id: InputFields.agency_id
        };

        if(this.props.edit){
            const {id} = this.props.match.params;
            CrudBloc.instance.getDetails(id, MenuNames.area.lower);
        }else{
            CrudBloc.instance.clearDetails(MenuNames.area.lower);
        }

        CrudBloc.instance.getList("", MenuNames.region.lower, [])
        CrudBloc.instance.getList("", MenuNames.agency.lower, [])
    }

    componentDidMount() {
        if(this.props.edit){
            SettingsBloc.instance.setCurrentPageTitle("Area Update");
        }else {
            SettingsBloc.instance.setCurrentPageTitle("Create new Area");
            const history = this.props.history;
            CrudBloc.instance.createResponse.subscribe({
                next(x) {
                    if (x){
                        history.push(getRouteList(MenuNames.area.lower));
                        CrudBloc.instance.clearCreateResponseData();
                    }
                },
                error(err) {
                    console.error('something wrong occurred: ' + err);
                },
                complete() {
                    console.log('done');
                }
            });
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
        if(this.props.edit){
            const {id} = this.props.match.params;
            CrudBloc.instance.update(id, values, MenuNames.area.lower);
        }else{
            CrudBloc.instance.createNew(values, MenuNames.area.lower);
        }

    };

    render() {
        return (
            <Spin spinning={false}>
                <BlocBuilder
                    subject = {CrudBloc.instance.area}
                    builder = {(snapshot) => {
                        console.log(snapshot.data);
                        //console.log(snapshot.data ? snapshot.data[this.state.title.name] : null);
                        return   !this.props.edit ||  snapshot.data ? <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} layout="vertical" className="login-form">
                            <InputText
                                values={this.state.title}
                                value={this.props.edit && snapshot.data ? snapshot.data[this.state.title.name] : null}/>
                            <BlocBuilder
                                subject = {CrudBloc.instance.regionList}
                                builder = {(snapshotRegion) => {
                                    console.log(snapshotRegion.data);
                                    return  <InputSelect
                                        values={this.state.region_id}
                                        options={snapshotRegion.data ? snapshotRegion.data.list : []}
                                        value={this.props.edit && snapshot.data ? snapshot.data[this.state.region_id.name] : null}
                                    />
                                }}/>
                            <BlocBuilder
                                subject = {CrudBloc.instance.agencyList}
                                builder = {(snapshotAgency) => {
                                    console.log(snapshotAgency.data);
                                    return  <InputSelect
                                        values={this.state.agency_id}
                                        options={snapshotAgency.data ? snapshotAgency.data.list : []}
                                        value={this.props.edit && snapshot.data ? snapshot.data[this.state.agency_id.name] : null}
                                    />
                                }}/>
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
                        </Form> : <Spin/>
                    }}/>
            </Spin>
        );
    }
}