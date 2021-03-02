import React from "react";

export class Box extends React.Component {
    render() {
        const {x = 0, y = 0} = this.props;

        return <div style={{height:y, width: x}}/>
    }
}