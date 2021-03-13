import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import SettingsBloc from "../../bloc/SettingsBloc";
import {TableDetails} from "../shared/table/TableDetails";
import {user_groupDetailsAttributes} from "./UserGroupConstants";
import {MenuNames} from "../../utils/Constants";


export class UserGroupDetailsPage extends React.Component{
    componentDidMount() {
        const {id} = this.props.match.params;
        SettingsBloc.instance.setCurrentPageTitle("UserGroup Details")
        CrudBloc.instance.getDetails(id, MenuNames.user_group.lower);
    }

    render() {
        return <BlocBuilder
            subject = {CrudBloc.instance.user_group}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                let details = snapshot.data;
                return  <TableDetails
                    history={this.props.history}
                    location={this.props.location}
                    data={details}
                    isFetching={false}
                    isFailed={false}
                    attributes={user_groupDetailsAttributes}
                />
            }}/>
    }
}

