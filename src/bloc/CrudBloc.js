import * as rxjs from "rxjs";
import axiosWrapper from "../utils/AxiosWrapper";
import {BASEURL, MenuNames} from "../utils/Constants";
import _ from 'lodash';
import {prepareUrlWithFilter} from "../utils/Utils";
import {
    getApiCreate,
    getApiDetails,
    getApiList,
    getApiUpdate,
    getRouteDetails,
    getRouteUpdate
} from "../utils/RouterUtils";
import ErrorBloc from "./ErrorBloc";
import AuthBloc from "./AuthBloc";
import LoadingBloc from "./LoadingBloc";

export default class CrudBloc {

    static instance = new CrudBloc();

    constructor(){

        for (const key of Object.keys(MenuNames)) {
            //console.log(key + " -> " + MenuNames[key])
            this[`${key}List`] = new rxjs.BehaviorSubject({list:[], total: 0});
            this[`${key}`] = new rxjs.BehaviorSubject(null);
        }

        this.createResponse = new rxjs.BehaviorSubject(null);

    }

    getDetails(id, name){
        this.clearDetails(name);
        axiosWrapper
            .get(BASEURL+ getApiDetails(name, id))
            .then((response) => this[name].next(response.data.data))
            .catch(ErrorBloc.instance.error);
    }

    getList(search, name, filterParam){
        LoadingBloc.instance.start(name);
        LoadingBloc.instance.start(name);
        const filter = prepareUrlWithFilter(search, filterParam)
        axiosWrapper
            .get(BASEURL+ getApiList(name, filter))
            .then((response) => {
                this.prepareList(response, name);
                LoadingBloc.instance.end(name);
                LoadingBloc.instance.end(name);
            })
            .catch((error) => {
                ErrorBloc.instance.error(error);
                LoadingBloc.instance.end(name);
                LoadingBloc.instance.end(name);
            });
    }

    prepareList = (response, name) => {

        let list = _.cloneDeep(response.data.data);

        list = list && Array.isArray(list)? list.map((e) => {
            e.detailsPath = getRouteDetails(name, e.id);
            switch (name){

                case MenuNames.area.lower:
                    e.region_title = e.region.title
                    break;
                case MenuNames.town.lower:
                    e.region_title = e.region.title
                    e.area_title = e.area.title
                    break;

                case MenuNames.user.lower:
                    e.region_title = getTitlesFromList(e.region)
                    e.area_title = getTitlesFromList(e.area)
                    e.town_title = getTitlesFromList(e.town)
                    e.user_group_title = e.user_group?.title
                    break;
                default:
                    list = [];
                    break;
            }
            e.actions = [
                {
                    url: getRouteDetails(name, e.id),
                    title: "View",
                },
                {
                    url: getRouteUpdate(name, e.id),
                    title: "Edit",
                }
            ];
            console.log(AuthBloc.instance.isAdmin())
            if(AuthBloc.instance.isAdmin() === false){
                e.actions = e.actions.slice(0,1)
            }

            return e;
        }) : [];


        //console.log(response.data.message.split("#")[1])
        this[`${name}List`].next({list: list, total: response.data.message.split("#")[1]})
    }


    createNew(values, name) {
        ErrorBloc.instance.error(null);
        axiosWrapper
            .post(BASEURL+ getApiCreate(name), values)
            .then((response) => this.createResponse.next(response.data.data))
            .catch(ErrorBloc.instance.error);

    }
    update(id, values, name) {
        ErrorBloc.instance.error(null);
        axiosWrapper
            .put(BASEURL+ getApiUpdate(name, id), values)
            .then((response) => this[name].next(response.data.data))
            .catch(ErrorBloc.instance.error);
    }

    clearDetails(name) {
        this[name].next(null);
    }
    clearCreateResponseData(){
        this.createResponse.next(null);
    }

    clearList(name) {
        this[`${name}List`].next({list: [], total: 0})
    }
}

function getTitlesFromList(list){
    let res = "";
    list && list.forEach(e =>{
        if(res.length === 0)
        res += e.title;
        else
            res += ", "+e.title;

    })
    return res;
}