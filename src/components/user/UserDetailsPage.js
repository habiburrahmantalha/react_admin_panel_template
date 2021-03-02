import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import SettingsBloc from "../../bloc/SettingsBloc";
import {TableDetails} from "../shared/table/TableDetails";
import {userDetailsAttributes} from "./UserConstants";
import {MenuNames} from "../../utils/Constants";


export class UserDetailsPage extends React.Component{
    componentDidMount() {
        const {id} = this.props.match.params;
        SettingsBloc.instance.setCurrentPageTitle("User Details")
        CrudBloc.instance.getDetails(id, MenuNames.user.lower);
    }

    render() {
        return <BlocBuilder
            subject = {CrudBloc.instance.user}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                let details = snapshot.data;
                if(snapshot.data){
                    details.region_title = snapshot.data.region?.title
                    details.area_title = snapshot.data.area?.title
                    details.town_title = snapshot.data.town?.title
                    details.agency_title = snapshot.data.agency?.title
                    details.user_group_title = snapshot.data.user_group?.title
                }


                return  <TableDetails
                    history={this.props.history}
                    location={this.props.location}
                    data={details}
                    isFetching={false}
                    isFailed={false}
                    attributes={userDetailsAttributes}
                />
            }}/>
    }
}

