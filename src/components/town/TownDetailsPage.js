import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import SettingsBloc from "../../bloc/SettingsBloc";
import {TableDetails} from "../shared/table/TableDetails";
import {townDetailsAttributes} from "./TownConstants";
import {MenuNames} from "../../utils/Constants";


export class TownDetailsPage extends React.Component{
    componentDidMount() {
        const {id} = this.props.match.params;
        SettingsBloc.instance.setCurrentPageTitle("Town Details")
        CrudBloc.instance.getDetails(id, MenuNames.town.lower);
    }

    render() {
        return <BlocBuilder
            subject = {CrudBloc.instance.town}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                let details = snapshot.data;
                if(snapshot.data){
                    details.region_title = snapshot.data.region.title;
                    details.area_title = snapshot.data.area.title;
                }
                return  <TableDetails
                    history={this.props.history}
                    location={this.props.location}
                    data={details}
                    isFetching={false}
                    isFailed={false}
                    attributes={townDetailsAttributes}
                />
            }}/>
    }
}

