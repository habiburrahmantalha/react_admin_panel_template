import React from "react";
import SettingsBloc from "../../bloc/SettingsBloc";

export class HomePage extends React.Component{

    componentDidMount() {
        SettingsBloc.instance.setCurrentPageTitle("Home")
    }

    render() {
        return <div>Home</div>
    }
}