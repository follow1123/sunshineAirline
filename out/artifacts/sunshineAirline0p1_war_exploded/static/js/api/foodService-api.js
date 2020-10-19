import {post} from "./general-api.js";


export let foodServicesApi = {
    getFightInfo: function (params, event) {
        params.pathName = '/FS/flightInfo';
        post(params, event);
    },
    getFood: function (params, event) {
        let pathName = '/FS/food';
        if (params) {
            params.pathName = pathName;
            post(params, event);
        } else {
            post(pathName, event);
        }
    }
};