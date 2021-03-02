import * as rxjs from "rxjs";


export default class LoadingBloc {

    static instance = new LoadingBloc();

    constructor(){
        this.isLoading = new rxjs.BehaviorSubject({});
        this.list = {};
    }

    start(name){
        this.list[name] = true;
        this.isLoading.next(this.list);
    }

    end(name){
        this.list[name] = false;
        this.isLoading.next(this.list);
    }

}