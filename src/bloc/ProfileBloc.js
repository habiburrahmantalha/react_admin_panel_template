import * as rxjs from "rxjs";

export default class ProfileBloc {

    static instance = new ProfileBloc();

    constructor(){

        this.isApproved = new rxjs.BehaviorSubject(false);
        this.errorTextPhoto = new rxjs.BehaviorSubject("");
        this.errorTextPhotoNid = new rxjs.BehaviorSubject("");
    }

    setErrorPhoto(){
        this.errorTextPhoto.next("Please select photo");
    }

    setErrorPhotoNid(){
        this.errorTextPhotoNid.next("Please select photo");
    }

    onReject(value){
        this.isApproved.next(value);
    }

    clear(){
        this.errorTextPhoto.next("");
        this.errorTextPhotoNid.next("");
    }

}