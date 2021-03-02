import React from "react";
import FilterInputTypes from "./FilterInputTypes";
import {Button, Col, Form, Input, Layout, Popover, Row, Select, Switch} from "antd";
import listUtils from "../../../utils/ListUtils";
import queryString from 'query-string';
import {CaretDownOutlined} from "@ant-design/icons";
import './filter_popup.css'
import {ButtonX} from "../ButtonX";

const {Option} = Select;
const {Content} = Layout;
export default class FilterPopup extends React.Component {
  constructor(props) {
    super(props);

      const {location, queryFilterParams } = this.props;
      let filtersParams= listUtils.currentFilters(location.search, queryFilterParams);
    this.state = {
      ...filtersParams,
      _visible: false,
    };

  }

  handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value});
  };

  handleChangeNameLess(name, value) {
    this.setState({[name]: value});
  }

    handleOpen = () => this.setState({_visible: true});

    handleClose = () => this.setState({_visible: false});

    prepareOptions(options) {
    	return options.map(e => <Option key={e.value} value={e.value}>{e.title}</Option>);
    }

    resetFilters = () => {
    	let oldState = this.state;
    	Object.keys(oldState).forEach(k => {
    		if (k !== "_visible") {
    			oldState[k] = "";
    		}
    	});
    	this.setState(oldState);
    };

    handleSearch = () => {
        const {queryFilterParams, history } = this.props;
        this.handleClose();
        let pathname = this.props.location.pathname;
        let searchParams = new URLSearchParams(this.props.location.search);
        // console.log(searchParams.toString());
        // console.log(this.state);
        // console.log(queryFilterParams);
        queryFilterParams.forEach(e => {
            if(this.state[e]) searchParams.set(e, this.state[e]);
            else searchParams.delete(e);
        } );
        searchParams.set("page", "1");
        history.push({
            pathname: pathname,
            search: searchParams.toString(),
        });
    };


    handleCancel = () => {
    	this.handleClose();
    };

    componentDidUpdate (prevProps, prevState, snapshot) {
        if(prevProps.location !== this.props.location) {
            const values = queryString.parse(this.props.location.search);
            const { queryFilterParams } = this.props;
            queryFilterParams.forEach(e => {
                if (!values[e])
                    this.handleChangeNameLess(e, "");
            });
        }
    }

    render() {
        const {location, filterParams} = this.props;
        let formParams = listUtils.searchModalFormParams(location.search, filterParams);

    	const form = <Content style ={{width: 200}}>
    		<Row>
    			<Form layout="vertical" className={"filter-form"}>
    				{
    					formParams.map((e) => {
    						switch (e.type) {
    						case FilterInputTypes.TEXT_INPUT:
    							return (
    								<Form.Item key={e.name} label={e.label}>
    									<Input name={e.name} placeholder={e.placeholder} value={this.state[e.name]} onChange={this.handleChange}/>
    								</Form.Item>
    							);
    						case FilterInputTypes.SELECT_INPUT:
    							return (
    								<Form.Item key={e.name} label={e.label} hasFeedback>
    									<Select allowClear name={e.name} value={this.state[e.name] ? this.state[e.name] : undefined } placeholder={e.placeholder ? e.placeholder : ""} onChange={(value) => this.handleChangeNameLess(e.name, value)}>
    										{this.prepareOptions(e.options)}
    									</Select>
    								</Form.Item>
    							);
    						case FilterInputTypes.TOGGLE_INPUT:
    							return (
    								<Switch defaultChecked onChange={(evt) => this.handleChangeNameLess(e.key, !this.state[e.key])} />

    							);
    						default:
    							alert("not supported yet");
    							return null;
    						}

    					})
    				}
    			</Form>
    		</Row>
    		<Row type="flex" justify="space-between" style={{marginTop: 16}} align="middle">

    			<Button type="link" size="small" onClick={this.resetFilters}> Reset </Button>
    			<Col>
    				<Button type="link" size="small" onClick={this.handleCancel}> Cancel </Button>
    				<Button type="primary" onClick={this.handleSearch} size="small">Apply</Button>
    			</Col>
    		</Row>
    	</Content>;

    	return (
    		<Popover placement="bottomRight"
    			content={form}
    			trigger="click"
    			visible={this.state._visible}>
    			<ButtonX
                    style={{height: 40}}
                    onClick={this.handleOpen}
                    iconRight={<CaretDownOutlined />}
                    text={"Filter"} className={"button-filter"}/>
    		</Popover>
    	);
    }

}



