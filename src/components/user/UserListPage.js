import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import {TableList} from "../shared/table/TableList";
import SettingsBloc from "../../bloc/SettingsBloc";
import {Row} from "antd";
import FilterPopup from "../shared/Filter/FilterPopup";
import {Box} from "../shared/Box";
import {userFilterParams, userListAttributes, userQueryFilterParams} from "./UserConstants";
import {MenuNames} from "../../utils/Constants";
import {ButtonCreateNew} from "../shared/ButtonCreateNew";
import {getRouteCreate} from "../../utils/RouterUtils";

export class UserListPage extends React.Component{

    componentDidMount() {
        SettingsBloc.instance.setCurrentPageTitle("User List")
        CrudBloc.instance.getList(this.props.location.search, MenuNames.user.lower, userFilterParams);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const currentSearch = this.props.location.search;
        const previousSearch = prevProps.location.search;
        if (currentSearch !== previousSearch) {
            CrudBloc.instance.getList(this.props.location.search, MenuNames.user.lower, userFilterParams);
        }
    }

    render() {
        return <div>
            <Row type="flex" justify={"space-between"}>
                <ButtonCreateNew to={getRouteCreate(MenuNames.user.lower)}/>
                <FilterPopup
                    history = {this.props.history}
                    location = {this.props.location}
                    filterParams = {userFilterParams}
                    queryFilterParams = {userQueryFilterParams()}
                />
            </Row>
            <Box y={16}/>
            <BlocBuilder
            subject = {CrudBloc.instance.userList}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                return  <TableList
                    history={this.props.history}
                    location={this.props.location}
                    total = {snapshot.data ? snapshot.data.total: 0}
                    list={snapshot.data ? snapshot.data.list : []}
                    isFetching={false}
                    isFailed={false}
                    attributes={userListAttributes}
                    name={MenuNames.user.lower}
                />
            }}/>
        </div>
    }
}

