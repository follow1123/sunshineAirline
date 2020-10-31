import {post} from "../../utils/apiUtil.js";

export let flightStatusApi = {
    getFlightStatus: (params, event) => {
        params.pathName = 'FST/flightStatus';
        post(params, event);
    }
};