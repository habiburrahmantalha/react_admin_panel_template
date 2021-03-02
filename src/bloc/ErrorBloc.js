import * as rxjs from "rxjs";


export default class ErrorBloc {

    static instance = new ErrorBloc();

    constructor(){

        this.errorText = new rxjs.BehaviorSubject(null);
    }

    error = (error) => {
        console.log(error);
        if (error?.response) {

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            this.errorText.next(error.response.data.message)
        }else{
            //this.errorText.next(error.data)
        }
    };
}