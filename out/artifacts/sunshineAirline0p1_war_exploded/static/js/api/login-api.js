import {post} from "./general-api.js";

export let loginApi = {
    login:function (params, event) {
        params.pathName = '/user/login';
        post(params, event);
    }
};