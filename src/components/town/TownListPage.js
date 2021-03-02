import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import {TableList} from "../shared/table/TableList";
import SettingsBloc from "../../bloc/SettingsBloc";
import {Row} from "antd";
import FilterPopup from "../shared/Filter/FilterPopup";
import {Box} from "../shared/Box";
import {townFilterParams, townListAttributes, townQueryFilterParams} from "./TownConstants";
import {ButtonCreateNew} from "../shared/ButtonCreateNew";
import {getRouteCreate} from "../../utils/RouterUtils";
import {MenuNames} from "../../utils/Constants";

export class TownListPage extends React.Component{

    componentDidMount() {
        SettingsBloc.instance.setCurrentPageTitle("Town List")
        CrudBloc.instance.getList(this.props.location.search, MenuNames.town.lower, townFilterParams);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currentSearch = this.props.location.search;
        const previousSearch = prevProps.location.search;
        if (currentSearch !== previousSearch) {
            CrudBloc.instance.getList(this.props.location.search, MenuNames.town.lower, townFilterParams);
        }
    }

    render() {
        return <div>
            <Row type="flex" justify={"space-between"}>
                <ButtonCreateNew to={getRouteCreate(MenuNames.town.lower)}/>
                <FilterPopup
                    history = {this.props.history}
                    location = {this.props.location}
                    filterParams = {townFilterParams}
                    queryFilterParams = {townQueryFilterParams()}
                />
            </Row>
            <Box y={16}/>
            <BlocBuilder
            subject = {CrudBloc.instance.townList}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                return  <TableList
                    history={this.props.history}
                    location={this.props.location}
                    total = {snapshot.data ? snapshot.data.total: 0}
                    list={snapshot.data ? snapshot.data.list : []}
                    isFetching={false}
                    isFailed={false}
                    attributes={townListAttributes}
                    name={MenuNames.town.lower}
                />
            }}/>
        </div>
    }
}

