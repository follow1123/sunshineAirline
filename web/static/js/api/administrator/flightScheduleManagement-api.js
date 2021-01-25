import {getCityNames} from "../common-api.js";
import {post, asyncPost} from "../../utils/apiUtil.js";


export let fsmApi = {
    getCityName: getCityNames,
    getIATACode: (event) => {
        post('FSM/IATACode', event);
    },
    getFlightSchedule: (params, event) => {
        params.pathName = 'FSM/flightSchedule';
        post(params, event);
    },
    setStatus: (params, event) => {
        params.pathName = 'FSM/setStatus';
        post(params, event);
    },
    getSeats: (id, event) => {
        asyncPost('FSM/getSeats', {id: id}, event);
    },
    getScheduleInfo: (id, event) => {
        asyncPost('FSM/getScheduleInfo', {id: id}, event);
    }
};