import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import {TableList} from "../shared/table/TableList";
import SettingsBloc from "../../bloc/SettingsBloc";
import {Row} from "antd";
import FilterPopup from "../shared/Filter/FilterPopup";
import {Box} from "../shared/Box";
import {user_groupFilterParams, user_groupListAttributes, user_groupQueryFilterParams} from "./UserGroupConstants";
import {MenuNames} from "../../utils/Constants";
import {regionFilterParams} from "../region/RegionConstants";
import {ButtonCreateNew} from "../shared/ButtonCreateNew";
import {getRouteCreate} from "../../utils/RouterUtils";

export class UserGroupListPage extends React.Component{

    componentDidMount() {
        SettingsBloc.instance.setCurrentPageTitle("UserGroup List")
        CrudBloc.instance.getList(this.props.location.search, MenuNames.user_group.lower, user_groupFilterParams);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currentSearch = this.props.location.search;
        const previousSearch = prevProps.location.search;
        if (currentSearch !== previousSearch) {
            CrudBloc.instance.getList(this.props.location.search, MenuNames.user_group.lower, user_groupFilterParams);
        }
    }

    render() {
        return <div>
            <Row type="flex" justify={"space-between"}>
                <ButtonCreateNew to={getRouteCreate(MenuNames.user_group.lower)}/>
                <FilterPopup
                    history = {this.props.history}
                    location = {this.props.location}
                    filterParams = {user_groupFilterParams}
                    queryFilterParams = {user_groupQueryFilterParams()}
                />
            </Row>
            <Box y={16}/>
            <BlocBuilder
            subject = {CrudBloc.instance.user_groupList}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                return  <TableList
                    history={this.props.history}
                    location={this.props.location}
                    total = {snapshot.data ? snapshot.data.total: 0}
                    list={snapshot.data ? snapshot.data.list : []}
                    isFetching={false}
                    isFailed={false}
                    attributes={user_groupListAttributes}
                />
            }}/>
        </div>
    }
}

