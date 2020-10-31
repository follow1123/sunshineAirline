import {post} from "../utils/apiUtil.js";

let
    getCityNames = (event)=>{
        post('FSM/cityNames' ,event);
    };

export {
    getCityNames
}