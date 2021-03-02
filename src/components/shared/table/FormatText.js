import React from "react";
import moment from "moment";
import Moment from "react-moment";
import TimeAgo from "react-timeago";
import {tableContentType} from "./table_utils";
import {TextX} from "../TextX";
import {Link} from "react-router-dom";
import {Image} from "antd";
import {IMAGE_URL} from "../../../utils/Constants";


export class FormatText extends React.Component {
    isValidDate(item) {

        let date = moment(item, "YYYY-MM-DDTHH:mm:ssZ");

        return date.isValid();
    }

    isValidJson(item) {
        if (typeof item !== "string") return false;
        try {
            item = JSON.parse(item);
        } catch (e) {
            return false;
        }
        if (typeof item === "object" && item !== null) {
            return true;
        }
        return false;
    }

    isArray(item) {
        return item instanceof Array;
    }

    prepareText(data, type, record) {

        switch (type) {
            case tableContentType.ID:
                return (<Link key={data} to={record.detailsPath}> <TextX text={data} color="var(--azure)" size={"13"}/></Link>);
            case tableContentType.LINK:
                return data;
            case tableContentType.TIME_AGO:
                return <TimeAgo date={data} />;
            case tableContentType.DATE_TIME:
                if (this.isValidDate(data)) {
                    return <TextX text={ <Moment format="Y-M-D hh:mm:ss A">{data}</Moment>} color="var(--slate-grey)" font="Eina-Semibold" size={"13"}/>;

                } else {
                    return <TextX text={data} color="var(--slate-grey)" font="Eina-Semibold" size={"13"}/>;
                }
            case tableContentType.PRICE:
                return <TextX text={data ? "USD $" + data : "Please Sync"} color="var(--dark-grey-blue)" size={"15"}/>;

            case tableContentType.TEXT:
                return <TextX text={data} color="var(--slate-grey)" font="Eina-Semibold" size={"13"}/>;
            case tableContentType.STATUS:
                return data === 'Expired' ? <TextX text={data} color="var(--tomato)" font="Eina-Regular" size={"13"}/> : data;
            case tableContentType.POP_OVER:
                return <TextX data={data} record={record}/>;
            case tableContentType.TITLE:
                return <TextX text={record.title} color="var(--dark-grey-blue)" size={'15'} />;
            case tableContentType.IMAGE:
                console.log(IMAGE_URL+data)
                return <Image
                    width={200}
                    src={IMAGE_URL+data}
                />
            default:
                return data + "";
        }
    }

    render() {
        let {data, type, record} = this.props;
        return this.prepareText(data, type, record);
    }
}
