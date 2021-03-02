import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import SettingsBloc from "../../bloc/SettingsBloc";
import {TableDetails} from "../shared/table/TableDetails";
import {areaDetailsAttributes} from "./AreaConstants";
import {MenuNames} from "../../utils/Constants";

export class AreaDetailsPage extends React.Component{
    componentDidMount() {
        const {id} = this.props.match.params;
        SettingsBloc.instance.setCurrentPageTitle("Area Details")
        CrudBloc.instance.getDetails(id, MenuNames.area.lower);
    }

    render() {
        return <BlocBuilder
            subject = {CrudBloc.instance.area}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                let details = snapshot.data;
                if(snapshot.data){
                    details.region_title = snapshot.data.region.title;
                    details.agency_title = snapshot.data.agency.title;
                }
                return  <TableDetails
                    history={this.props.history}
                    location={this.props.location}
                    data={details ?? null}
                    isFetching={false}
                    isFailed={false}
                    attributes={areaDetailsAttributes}
                />
            }}/>
    }
}

