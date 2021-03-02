import * as rxjs from "rxjs";
import axiosWrapper from "../utils/AxiosWrapper";
import {BASEURL, MenuNames} from "../utils/Constants";
import _ from 'lodash';
import {prepareUrlWithFilter} from "../utils/Utils";
import {userFilterParams} from "../components/user/UserConstants";
import {getApiDetails, getApiList, getRouteDetails} from "../utils/RouterUtils";


export default class UserBloc {

    static instance = new UserBloc();

    constructor(){
        this.userList = new rxjs.BehaviorSubject({list:[], total: 0});
        this.user = new rxjs.BehaviorSubject(null);
    }

    getUserList(search){
        const filter = prepareUrlWithFilter(search, userFilterParams)
        axiosWrapper
            .get(BASEURL+ getApiList(MenuNames.user.lower, filter))
            .then((response) => {
                let list = _.cloneDeep(response.data.data);
                list = list && Array.isArray(list)? list.map((e)=> {
                    e.detailsPath = getRouteDetails(MenuNames.user.lower, e.id);
                    //e.region_title = e.region.title
                    e.actions = [
                        {
                            url: getRouteDetails(MenuNames.user.lower, e.id),
                            title: "View",
                        },
                    ];
                    return e;
                }) : [];
                this.userList.next({list: list, total: list.length})
            })
            .catch(this.error);
    }

    getUser(id){
        axiosWrapper
            .get(BASEURL+ getApiDetails(MenuNames.user.lower, id))
            .then((response) => this.user.next(response.data.data))
            .catch(this.error);
    }

    error = (error) => {
        console.log(error);
    };

}