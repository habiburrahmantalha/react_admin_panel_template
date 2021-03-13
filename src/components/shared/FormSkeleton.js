import React from "react";
import {Skeleton} from "antd";

export class FormSkeleton extends React.Component {
    render() {
        const {line} = this.props;

        return <Skeleton active title={{width:150}} paragraph={{rows: 1, width:300}} />
    }
}