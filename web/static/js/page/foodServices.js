import {formUtils} from "../utils/layuiUtils.js";
import {foodServicesApi as fsApi} from "../api/foodService-api.js";
import {Food} from "../utils/controls.js";

$(function () {
    let from,
        sel = $('#flightInfo'),
        typeNum = $('input[name="idTypeNumber"]'),
        foodCols = [$('#food-col0'), $('#food-col1'), $('#food-col2')]
    ;

    typeNum.blur(()=>{
        let params = {
            idTypeNumber: typeNum.val()
        };
        $('input[name="idType"]').each((i, v)=>{
            if ($(v).prop('checked')){
                params.idType =  $(v).val();
            }
        });

        fsApi.getFightInfo(params, c=>{
            sel.html('');
            sel.append($(`<option value="">${c.length} Flights</option>`));
            $.each(c, function (i, v) {
                sel.append($(`<option value="${v.reservationId}">${v.flightNumber},${v.from}-${v.to},${v.date.split('.')[0]},${v.cabinType}</option>`));
            });
            from.render('select');
        });
    });


    fsApi.getFood(null, function (content, code) {
        for (let i in content){
            new Food(foodCols[i % 3], content[i], d=>{
                console.log(d);
            });
        }
    });
    formUtils.use(function (f, u) {
        from = f;
    });
});