import {foodServicesApi as fsApi} from "../api/foodService-api.js";
import {Food, FoodChoose} from "../utils/controls.js";

let loadFoodServicesPage = (form) => {

    let
        //idType 选择radio
        radIdType = $('input[name="idType"]'),
        //idTypeNumber 输入框
        inpIdTypeNum = $('#idTypeNumber'),
        //flightInfo 下拉框
        selFlightInfo = $('#flightInfo'),
        preIdTypeNum,
        foodCols = [$('#food-col0'), $('#food-col1'), $('#food-col2')],
        foodSelected = $('#food-selected'),
        /**
         * 重置FlightInfo下拉框里面的值
         * @param value
         */
        resetFlightInfoValue = () => {
            selFlightInfo.html('<option value="">Please Enter ID Type Number First</option>');
            form.render('select');
        },
        /**
         * 设置FlightInfo下拉框里面的值
         * @param value
         */
        setFlightInfoValue = value => {
            selFlightInfo.html('');
            selFlightInfo.append($(`<option value="">You have ${value.length} Flights</option>`));
            $.each(value, (i, v) => {
                selFlightInfo.append($(`<option value="${v.reservationId}">${v.flightNumber},${v.from}-${v.to},${v.date.split('.')[0]},${v.cabinType}</option>`));
            });
            form.render('select');
        };
        //idTypeNumber框失去焦点时的事件
    inpIdTypeNum.blur(() => {
        let param = {
            idType: radIdType,
            idTypeNumber: inpIdTypeNum.val(),
        };
        if (!param.idTypeNumber || param.idTypeNumber === '') {
            layer.msg('Please Enter ID Type Number!');
            return;
        }
        if (preIdTypeNum && param.idTypeNumber === preIdTypeNum) return;
        preIdTypeNum = param.idTypeNumber;
        $.each(radIdType, (i, v) => {
            if ($(v).prop('checked')) param.idType = $(v).val();
        });
        fsApi.getFightInfo(param, (content, code) => {
            if (code !== 200) {
                layer.msg('no flights!');
                resetFlightInfoValue();
                return;
            }
            setFlightInfoValue(content);

        })
    });
    //清空按钮的点击事件，将选择的食物全部清空
    $('#empty').click(function () {
        $('button[delete]').click();
    });

    /**
     * 获取食物信息
     */
    fsApi.getFood({}, (content, code) => {
        $.each(content, (i, v) => {
            new Food(v).appendTo(foodCols[i % 3]);
        });
    });
    form.render();
};

export {
    loadFoodServicesPage
}
