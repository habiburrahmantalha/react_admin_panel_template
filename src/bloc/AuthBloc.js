import * as rxjs from "rxjs";
import {BASEURL} from "../utils/Constants";
import {apiLogin} from "../utils/RouterUtils";
import axiosWrapper from "../utils/AxiosWrapper";
import {localStorageKey} from "../utils/LocalStorage";

export default class AuthBloc{

    static instance = new AuthBloc();

    constructor(){
        this.authToken = new rxjs.BehaviorSubject(null);
        this.user = new rxjs.BehaviorSubject(null);
        this.errorText = new rxjs.BehaviorSubject(null);
    }

    setUser = (user) => {
        this.user.next(user)
    }

    setToken = (token) =>{
        this.authToken.next(token)
    }

    //the error function with deal with sending an error through the subject
    error = (error) => {
        console.log(error.data +"Error");
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            this.errorText.next(error.response.data.message)
        }else{
            this.errorText.next(error.data)
        }

        //this.productSubject.error(error)
    };

    onLoginSuccess = (response) => {
        this.setUser(response.data.user)
        this.setToken(response.data.access_token)
        localStorage.setItem(localStorageKey.AUTH_TOKEN, response.data.access_token);
        localStorage.setItem(localStorageKey.USER, JSON.stringify(response.data.user));
    }

    login(values) {
        this.errorText.next(null)
        axiosWrapper
            .post(BASEURL+ apiLogin, values)
            .then(this.onLoginSuccess)
            .catch(this.error);
    }

     isLoggedIn() {
        if(localStorage.getItem(localStorageKey.AUTH_TOKEN) && localStorage.getItem(localStorageKey.USER)){
            console.log(JSON.parse(localStorage.getItem(localStorageKey.USER)))
            AuthBloc.instance.setToken(localStorage.getItem(localStorageKey.AUTH_TOKEN));
            AuthBloc.instance.setUser(JSON.parse(localStorage.getItem(localStorageKey.USER)));
        }else{
            localStorage.clear();
            AuthBloc.instance.setToken(null);
        }
    }

    logout(){
        localStorage.clear();
        AuthBloc.instance.setToken(null);
    }

    isAdmin(){
        return this.user.value.user_group_id === 6;
    }

    isAgency(){
        return this.user.value.user_group_id === 3;
    }
}