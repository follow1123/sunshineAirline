import {post} from "./general-api.js";


export let foodServicesApi = {
    getFightInfo: (params, event)=> {
        params.pathName = '/FS/flightInfo';
        post(params, event);
    },
    getFood: (params, event)=> {
        let pathName = '/FS/food';
        if (params) {
            params.pathName = pathName;
            post(params, event);
        } else {
            post(pathName, event);
        }
    },
    getFoodReservation: (params, event)=>{
        params.pathName = '/FS/foodReservation';
        post(params, event);
    }
};