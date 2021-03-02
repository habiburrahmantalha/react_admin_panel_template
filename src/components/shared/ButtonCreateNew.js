import React from "react";
import {ButtonX} from "./ButtonX";
import {AppstoreAddOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import AuthBloc from "../../bloc/AuthBloc";
import {MenuNames} from "../../utils/Constants";

export class ButtonCreateNew extends React.Component {

    render() {
        const {to} = this.props;
        console.log(AuthBloc.instance.isAgency())
        console.log(to)
        return AuthBloc.instance.isAdmin() || (AuthBloc.instance.isAgency() && to.includes(MenuNames.profile.lower)) ? (
            <div style={{width:120}}>
                <Link to={to}>
                    <ButtonX
                        iconRight={<AppstoreAddOutlined />}
                        name="create"
                        text="Create New"
                        className={"button-default-accent"}/>
                </Link>
            </div>
        ): <div/>;
    }
}