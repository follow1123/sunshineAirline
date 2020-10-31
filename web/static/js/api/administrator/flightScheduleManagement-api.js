import {getCityNames} from "../common-api.js";
import {post} from "../../utils/apiUtil.js";


export let fsmApi = {
    getCityName: getCityNames,
    getIATACode: (event) => {
        post('FSM/IATACode', event);
    },
    getFlightSchedule : (params, event)=>{
        params.pathName = 'FSM/flightSchedule';
        post(params, event);
    }
};