import React from "react";
import CrudBloc from "../../bloc/CrudBloc";
import BlocBuilder from "bloc-builder-react/src";
import SettingsBloc from "../../bloc/SettingsBloc";
import {TableDetails} from "../shared/table/TableDetails";
import {regionDetailsAttributes} from "./RegionConstants";
import {MenuNames} from "../../utils/Constants";

export class RegionDetailsPage extends React.Component{
    componentDidMount() {
        const {id} = this.props.match.params;
        SettingsBloc.instance.setCurrentPageTitle("Region Details")
        CrudBloc.instance.getDetails(id, MenuNames.region.lower);
    }

    render() {
        return <BlocBuilder
            subject = {CrudBloc.instance.region}
            builder = {(snapshot) => {
                console.log(snapshot.data);
                return  <TableDetails
                    history={this.props.history}
                    location={this.props.location}
                    data={snapshot.data ? snapshot.data : null}
                    isFetching={false}
                    isFailed={false}
                    attributes={regionDetailsAttributes}
                />
            }}/>
    }
}

