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
import {InputSelect} from "../shared/FormComponent/InputSelect";
import LocationBloc from "../../bloc/LocationBloc";
import {areaFilterParams} from "../area/AreaConstants";
import {townFilterParams} from "../town/TownConstants";
import {InputPassword} from "../shared/FormComponent/InputPassword";

export class UserCreatePage extends React.Component{


    formRef = React.createRef();
    constructor(props) {
        super(props);
        //console.log(props);

        this.state = {
            email: InputFields.email,
            name: InputFields.name,
            password: InputFields.password,
            region_id: InputFields.region_id,
            area_id: InputFields.area_id,
            town_id: InputFields.town_id,
            agency_id: InputFields.agency_id,
            role: InputFields.role
        };

        if(this.props.edit){
            const {id} = this.props.match.params;
            CrudBloc.instance.getDetails(id, MenuNames.user.lower);
        }else{
            CrudBloc.instance.clearDetails(MenuNames.user.lower);
        }

        CrudBloc.instance.getList("", MenuNames.region.lower, [])
        CrudBloc.instance.getList("", MenuNames.agency.lower, [])
        CrudBloc.instance.getList("", MenuNames.user_group.lower, [])
        CrudBloc.instance.clearList(MenuNames.area.lower);
        CrudBloc.instance.clearList(MenuNames.town.lower);
    }

    componentDidMount() {
        if(this.props.edit){
            SettingsBloc.instance.setCurrentPageTitle("User Update");
        }else {
            SettingsBloc.instance.setCurrentPageTitle("Create new User");
            const history = this.props.history;
            this.createResponseSubscription = CrudBloc.instance.createResponse.subscribe({
                next(x) {
                    if (x){
                        history.push(getRouteList(MenuNames.user.lower));
                        CrudBloc.instance.clearCreateResponseData();
                    }
                },
            });
            this.selectRegionSubscription = LocationBloc.instance.selectedRegion.subscribe({
                next(x) {
                    if (x){
                        CrudBloc.instance.clearList(MenuNames.area.lower);
                        CrudBloc.instance.getList({region_id: x}, MenuNames.area.lower, areaFilterParams)
                    }
                },
            });
            this.selectAreaSubscription = LocationBloc.instance.selectedArea.subscribe({
                next(x) {
                    if (x){
                        CrudBloc.instance.clearList(MenuNames.town.lower);
                        CrudBloc.instance.getList({area_id: x}, MenuNames.town.lower, townFilterParams)
                    }
                },
            });
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
        if(this.props.edit){
            const {id} = this.props.match.params;

            CrudBloc.instance.update(id, values, MenuNames.user.lower);
        }else{
            values.c_password = values.password;
            CrudBloc.instance.createNew(values, MenuNames.user.lower);
        }

    };

    render() {
        return (
            <Spin spinning={false}>
                <BlocBuilder
                    subject = {CrudBloc.instance.user}
                    builder = {(snapshot) => {
                        console.log(snapshot.data);
                        //console.log(snapshot.data ? snapshot.data[this.state.title.name] : null);
                        return   !this.props.edit ||  snapshot.data ? <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} layout="vertical" className="login-form">
                            <InputText
                                values={this.state.email}
                                value={this.props.edit && snapshot.data ? snapshot.data[this.state.email.name] : null}/>

                            <InputText
                                values={this.state.name}
                                value={this.props.edit && snapshot.data ? snapshot.data[this.state.name.name] : null}/>

                            <InputPassword
                                values={this.state.password}
                                value={this.props.edit && snapshot.data ? snapshot.data[this.state.name.name] : null}/>

                            <BlocBuilder
                                subject = {CrudBloc.instance.regionList}
                                builder = {(snapshotRegion) => {
                                    //console.log(snapshotRegion.data);
                                    return  <InputSelect
                                        onSelect={(id)=> {
                                            LocationBloc.instance.onSelectLocation(MenuNames.region.upper, id);
                                            const areaId = this.props.edit && snapshot.data && id === snapshot.data[this.state.region_id.name] ? snapshot.data[this.state.area_id.name] : undefined;
                                            this.formRef.current?.setFieldsValue({ area_id: undefined});
                                            const townId = this.props.edit && snapshot.data && areaId === snapshot.data[this.state.area_id.name] ? snapshot.data[this.state.town_id.name] : undefined;
                                            this.formRef.current?.setFieldsValue({ town_id: undefined});
                                        }}
                                        values={this.state.region_id}
                                        options={snapshotRegion.data ? snapshotRegion.data.list : []}
                                    />
                                }}/>

                            <BlocBuilder
                                subject = {CrudBloc.instance.areaList}
                                builder = {(snapshotArea) => {
                                    //console.log(snapshotAgency.data);
                                    return  <InputSelect
                                        onSelect={(id)=> {
                                            LocationBloc.instance.onSelectLocation(MenuNames.area.upper, id);
                                            const townId = this.props.edit && snapshot.data && id === snapshot.data[this.state.area_id.name] ? snapshot.data[this.state.town_id.name] : undefined;
                                            this.formRef.current?.setFieldsValue({ town_id: undefined});
                                        }}
                                        values={this.state.area_id}
                                        options={snapshotArea.data ? snapshotArea.data.list : []}
                                    />
                                }}/>
                            <BlocBuilder
                                subject = {CrudBloc.instance.townList}
                                builder = {(snapshotTown) => {
                                    //console.log(snapshotAgency.data);
                                    return  <InputSelect
                                        values={this.state.town_id}
                                        options={snapshotTown.data ? snapshotTown.data.list : []}
                                    />
                                }}/>
                            <BlocBuilder
                                subject = {CrudBloc.instance.agencyList}
                                builder = {(snapshotAgency) => {
                                    return  <InputSelect
                                        values={this.state.agency_id}
                                        options={snapshotAgency.data ? snapshotAgency.data.list : []}
                                    />
                                }}/>
                            <BlocBuilder
                                subject = {CrudBloc.instance.roleList}
                                builder = {(snapshotRole) => {
                                    return  <InputSelect
                                        values={this.state.role}
                                        options={snapshotRole.data ? snapshotRole.data.list : []}
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