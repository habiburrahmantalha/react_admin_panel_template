import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import {TableList} from "../shared/table/TableList";
import SettingsBloc from "../../bloc/SettingsBloc";
import {Row} from "antd";
import FilterPopup from "../shared/Filter/FilterPopup";
import {regionFilterParams, regionListAttributes, regionQueryFilterParams} from "./RegionConstants";
import {Box} from "../shared/Box";
import {ButtonCreateNew} from "../shared/ButtonCreateNew";
import {MenuNames} from "../../utils/Constants";
import {getRouteCreate} from "../../utils/RouterUtils";

export class RegionListPage extends React.Component{

    componentDidMount() {
        SettingsBloc.instance.setCurrentPageTitle("Region List")
        CrudBloc.instance.getList(this.props.location.search, MenuNames.region.lower, regionFilterParams);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currentSearch = this.props.location.search;
        const previousSearch = prevProps.location.search;
        if (currentSearch !== previousSearch) {
            CrudBloc.instance.getList(this.props.location.search, MenuNames.region.lower, regionFilterParams);
        }
    }

    render() {
        return <div>
            <Row type="flex" justify={"space-between"}>
                <ButtonCreateNew to={getRouteCreate(MenuNames.region.lower)}/>

                <FilterPopup
                    history = {this.props.history}
                    location = {this.props.location}
                    filterParams = {regionFilterParams}
                    queryFilterParams = {regionQueryFilterParams()}
                />
            </Row>
            <Box y={16}/>
            <BlocBuilder
            subject = {CrudBloc.instance.regionList}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                return  <TableList
                    history={this.props.history}
                    location={this.props.location}
                    total = {snapshot.data ? snapshot.data.total: 0}
                    list={snapshot.data ? snapshot.data.list : []}
                    isFetching={false}
                    isFailed={false}
                    attributes={regionListAttributes}
                    name={MenuNames.region.lower}
                />
            }}/>
        </div>
    }
}

