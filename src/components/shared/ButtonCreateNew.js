import React from "react";
import {ButtonX} from "./ButtonX";
import {AppstoreAddOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import AuthBloc from "../../bloc/AuthBloc";

export class ButtonCreateNew extends React.Component {

    render() {
        const {to} = this.props;
        return AuthBloc.instance.isAdmin() ? (
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