import * as rxjs from "rxjs";

export default class SettingsBloc{

    static instance = new SettingsBloc();


    constructor(){
        this.sideBarCollapsed = new rxjs.BehaviorSubject(false);
        this.currentPageTitle = new rxjs.BehaviorSubject("");

    }

    toggleSizeBar = () => this.sideBarCollapsed.next(!this.sideBarCollapsed.value)

    setCurrentPageTitle = (title) => this.currentPageTitle.next(title)

    error = (error) => {
        console.log(error);
    };

}