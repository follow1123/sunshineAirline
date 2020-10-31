import {post} from "../utils/apiUtil.js";

export let loginApi = {
    login:function (params, event) {
        params.pathName = '/user/login';
        post(params, event);
    }
};