import React from "react";
import {Pagination, Row, Table} from 'antd';
import './tableList.css';
import {localStorageKey} from "../../../utils/LocalStorage";
import {tableContentType} from "./table_utils";
import {TableRowAction} from "./TableRowAction";
import {FormatText} from "./FormatText";
import {TextX} from "../TextX";
import BlocBuilder from "bloc-builder-react/src";
import LoadingBloc from "../../../bloc/LoadingBloc";

export class TableList extends React.Component {

    onChange = page => {
    	let pathname = this.props.location.pathname;
    	let searchParams = new URLSearchParams(this.props.location.search);
		const pageSize = localStorage.getItem(localStorageKey.LIMIT) ?? 10;
    	searchParams.set("page", page);
		searchParams.set("limit", pageSize);
    	this.props.history.push({
    		pathname: pathname,
    		search: searchParams.toString(),
    	});
    };

    getCurrentPage = () => {
    	const query = new URLSearchParams(this.props.location.search);
    	const token = query.get('page');
    	return token ? Number(token) : 1;
    }

	onShowSizeChange = (current, pageSize) => {
		console.log(current, pageSize);
		localStorage.setItem(localStorageKey.LIMIT, pageSize);
		let pathname = this.props.location.pathname;
		let searchParams = new URLSearchParams(this.props.location.search);
		console.log(pathname);
		console.log(this.props.location);
		console.log(searchParams);
		searchParams.set("limit", pageSize);
		searchParams.set("page", "1");
		console.log(searchParams);
		this.props.history.push({
			pathname: pathname,
			search: searchParams.toString(),
		});
	}

    render() {

    	let {
    		isFetching,
    		isFailed,
    		list,
    		attributes,
    		pagination,
    		total,
			name
    	} = this.props;

    	const columns = attributes.map((e, i) => {
    		switch (e.type) {

    		case tableContentType.ACTION:
    			return {
    				title: e.title,
    				dataIndex: e.field,
    				render: (text, record, index) => (<TableRowAction actions={record.actions}/>),
    				width: 1,
    			};
    		default:
    			return {
    				title: e.title,
    				dataIndex: e.field,
    				render: (text, record) => (<FormatText data={text} type={e.type} record={record}/>),
    			};
    		}
    	});
		const pageSize = parseInt(localStorage.getItem(localStorageKey.LIMIT) ?? "10");
    	return (
			<BlocBuilder
				subject = {LoadingBloc.instance.isLoading}
				builder = {(snapshot) => {
					return <Table
						rowKey={record => record.id}
						className="table-list"
						columns={columns}
						dataSource={list}
						loading={!!isFetching || (snapshot.data && snapshot.data[name])}
						bordered={true}
						pagination={false}
						size="small"
						footer={list.length >= 0 && pagination !== false ? () =>
							<Row className="footer-row" justify="space-between" type="flex" align="middle">
								<TextX text={`Total: ${total}`}/>
								<Pagination
									showSizeChanger
									onShowSizeChange={this.onShowSizeChange}
									pageSize={pageSize ?? 10}
									total={total}
									pageSizeOptions={[5, 10, 20]}
									onChange={this.onChange} current={this.getCurrentPage()}/>
							</Row> : undefined
						}
					/>
				}}/>
    	);
    }
}





