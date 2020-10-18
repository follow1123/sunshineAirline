import {post} from "./general-api.js";

export let searchFlightApi =  {
    searchTicket: function (params, event) {
        params.pathName = '/SF/search';
        post(params, event);
    },
    buyTicket: function () {
        post()
    },
    getCityName: function (event) {
        post('/SF/cityName', event);
    }
};
