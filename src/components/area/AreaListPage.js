import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import {TableList} from "../shared/table/TableList";
import SettingsBloc from "../../bloc/SettingsBloc";
import {Row} from "antd";
import FilterPopup from "../shared/Filter/FilterPopup";
import {Box} from "../shared/Box";
import {areaFilterParams, areaListAttributes, areaQueryFilterParams} from "./AreaConstants";
import {ButtonCreateNew} from "../shared/ButtonCreateNew";
import {getRouteCreate} from "../../utils/RouterUtils";
import {MenuNames} from "../../utils/Constants";

export class AreaListPage extends React.Component{

    componentDidMount() {
        SettingsBloc.instance.setCurrentPageTitle("Area List")
        CrudBloc.instance.getList(this.props.location.search, MenuNames.area.lower, areaFilterParams);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currentSearch = this.props.location.search;
        const previousSearch = prevProps.location.search;
        if (currentSearch !== previousSearch) {
            CrudBloc.instance.getList(this.props.location.search, MenuNames.area.lower, areaFilterParams);
        }
    }

    render() {
        return <div>
            <Row type="flex" justify={"space-between"}>
                <ButtonCreateNew to={getRouteCreate(MenuNames.area.lower)}/>
                <FilterPopup
                    history = {this.props.history}
                    location = {this.props.location}
                    filterParams = {areaFilterParams}
                    queryFilterParams = {areaQueryFilterParams()}
                />
            </Row>
            <Box y={16}/>
            <BlocBuilder
            subject = {CrudBloc.instance.areaList}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                return  <TableList
                    history={this.props.history}
                    location={this.props.location}
                    total = {snapshot.data ? snapshot.data.total: 0}
                    list={snapshot.data ? snapshot.data.list : []}
                    isFetching={false}
                    isFailed={false}
                    attributes={areaListAttributes}
                    name={MenuNames.area.lower}
                />
            }}/>
        </div>
    }
}

