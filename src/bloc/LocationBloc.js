import * as rxjs from "rxjs";
import {MenuNames} from "../utils/Constants";


export default class LocationBloc {

    static instance = new LocationBloc();

    constructor(){

        for (const key of Object.keys(MenuNames)) {
            this[`selected${MenuNames[key].upper}`] = new rxjs.BehaviorSubject(null);
        }
    }

    onSelectLocation(name, id){
        this[`selected${name}`].next(id);
        console.log(`selected${name}: ${id}`);
    }



}