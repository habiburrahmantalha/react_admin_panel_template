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
import {areaFilterParams} from "../area/AreaConstants";
import LocationBloc from "../../bloc/LocationBloc";

export class TownCreatePage extends React.Component{


    formRef = React.createRef();
    constructor(props) {
        super(props);
        //console.log(props);

        this.state = {
            title: InputFields.title,
            region_id: InputFields.region_id,
            area_id: InputFields.area_id
        };

        if(this.props.edit){
            const {id} = this.props.match.params;
            CrudBloc.instance.getDetails(id, MenuNames.town.lower);
        }else{
            CrudBloc.instance.clearDetails(MenuNames.town.lower);
        }

        CrudBloc.instance.getList("", MenuNames.region.lower, []);
        //CrudBloc.instance.getList("", MenuNames.area.lower, [])
        CrudBloc.instance.clearList(MenuNames.area.lower);

    }

    componentDidMount() {

        let formRef = this.formRef;
        if(this.props.edit){
            SettingsBloc.instance.setCurrentPageTitle("Town Update");
            this.townSubcription = CrudBloc.instance.town.subscribe({
                next(x) {
                    if (x){
                        CrudBloc.instance.clearList(MenuNames.area.lower);
                        //CrudBloc.instance.getList({region_id: x.region_id}, MenuNames.area.lower, areaFilterParams)
                        LocationBloc.instance.onSelectLocation(MenuNames.region.upper, x.region_id);
                        LocationBloc.instance.onSelectLocation(MenuNames.area.upper, x.area_id);
                        formRef.current?.setFieldsValue({ region_id: x.region_id });
                        formRef.current?.setFieldsValue({ area_id: x.area_id });
                    }
                },
            });
        }else {
            SettingsBloc.instance.setCurrentPageTitle("Create new Town");
            const history = this.props.history;
            this.createResponseSubscription = CrudBloc.instance.createResponse.subscribe({
                next(x) {
                    if (x){
                        history.push(getRouteList(MenuNames.town.lower));
                        CrudBloc.instance.clearCreateResponseData();
                    }
                },
            });
        }
        this.selectRegionSubscription = LocationBloc.instance.selectedRegion.subscribe({
            next(x) {
                if (x){
                    CrudBloc.instance.clearList(MenuNames.area.lower);
                    CrudBloc.instance.getList({region_id: x}, MenuNames.area.lower, areaFilterParams)
                }
            },
        });

    }
    componentWillUnmount() {
        console.log("Unmount")
        this.townSubcription?.unsubscribe()
        this.createResponseSubscription?.unsubscribe();
        this.selectRegionSubscription?.unsubscribe();
    }

    onFinish = (values) => {
        console.log('Success:', values);
        if(this.props.edit){
            const {id} = this.props.match.params;
            CrudBloc.instance.update(id, values, MenuNames.town.lower);
        }else{
            CrudBloc.instance.createNew(values, MenuNames.town.lower);
        }

    };

    render() {
        return (
            <Spin spinning={false}>
                <BlocBuilder
                    subject = {CrudBloc.instance.town}
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
                                    //console.log(snapshotRegion.data);
                                    return  <InputSelect
                                        onSelect={(id)=> {
                                                LocationBloc.instance.onSelectLocation(MenuNames.region.upper, id);
                                                const areaId = this.props.edit && snapshot.data && id === snapshot.data[this.state.region_id.name] ? snapshot.data[this.state.area_id.name] : undefined;
                                                this.formRef.current?.setFieldsValue({ area_id: undefined});
                                            }
                                        }
                                        values={this.state.region_id}
                                        options={snapshotRegion.data ? snapshotRegion.data.list : []}
                                    />
                                }}/>

                            <BlocBuilder
                                subject = {CrudBloc.instance.areaList}
                                builder = {(snapshotAgency) => {
                                    //console.log(snapshotAgency.data);
                                    return  <InputSelect
                                        values={this.state.area_id}
                                        options={snapshotAgency.data ? snapshotAgency.data.list : []}
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