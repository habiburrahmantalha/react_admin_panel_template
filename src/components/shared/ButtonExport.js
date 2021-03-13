import React from "react";
import {ButtonX} from "./ButtonX";
import {AppstoreAddOutlined, DownloadOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import AuthBloc from "../../bloc/AuthBloc";
import {BASEURL, MenuNames} from "../../utils/Constants";
import {getApiList, getApiListExport} from "../../utils/RouterUtils";
import {prepareUrlWithFilter} from "../../utils/Utils";
import axiosWrapper, {getToken} from "../../utils/AxiosWrapper";
import LoadingBloc from "../../bloc/LoadingBloc";
import ErrorBloc from "../../bloc/ErrorBloc";
import JsFileDownloader from 'js-file-downloader';
export class ButtonExport extends React.Component {

    render() {
        const {search, name, param} = this.props;
        //console.log(to)
        const filter = prepareUrlWithFilter(search, param)
        return AuthBloc.instance.isAdmin() ? (
            <div style={{width:120}}>
                {/*<a href={BASEURL+ getApiListExport(name, filter)}>*/}
                    <ButtonX
                        onClick={()=>{

                            new JsFileDownloader({
                                url: BASEURL+ getApiListExport(name, filter),
                                headers: [
                                    { name: 'Authorization', value: `Bearer ${getToken()}` }
                                ],
                                nameCallback: function(text) {
                                    return name + text + ".csv";
                                }
                            })
                                .then(function () {
                                    // Called when download ended
                                })
                                .catch(function (error) {
                                    // Called when an error occurred
                                });

                        }}
                        iconRight={<DownloadOutlined />}
                        name="create"
                        text="Export"
                        className={"button-default-accent"}/>
                {/*</a>*/}
            </div>
        ): <div/>;
    }
}