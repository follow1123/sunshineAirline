import {foodServicesApi as fsApi} from "../api/foodService-api.js";
import {Food, FoodChoose, TotalInfoOperator} from "../utils/controls.js";
import {StorageUtils} from "../utils/utils.js";

let loadFoodServicesPage = (form) => {

    let
        //idType 选择radio
        radIdType = $('input[name="idType"]'),
        //idTypeNumber 输入框
        inpIdTypeNum = $('#idTypeNumber'),
        //flightInfo 下拉框
        selFlightInfo = $('#flightInfo'),
        btnEmpty = $('#empty'),
        btnConfirm = $('#confirm'),
        preIdTypeNum,
        curReservationId,
        totalInfo = new TotalInfoOperator(),
        foodItems = StorageUtils.get('foodItems'),
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
        },
        /**
         * 设置食物信息
         * @param data
         */
        setFoodItems = data => {
            $.each(data, (i, v) => {
                new Food(v).bindInfoOperator(totalInfo).appendTo(foodCols[i % 3]);
            });
        }
    ;
    if (foodItems) {
        setFoodItems(foodItems);
    } else {
        /**
         * 获取食物信息
         */
        fsApi.getFood({}, (content, code) => {
            StorageUtils.put('foodItems', content);
            setFoodItems(content);
        });
    }
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
    btnEmpty.click(() => {
        $('button[delete]').click();
    });

    //确认按钮，提交预订的食物
    btnConfirm.click(() => {
        let foodOrder = totalInfo.foodOrder;
        for (let i = 0; i < foodOrder.length;i++){
            delete foodOrder[i].price;
            foodOrder[i].reservationId = curReservationId;
        }
        $.each(foodOrder, (i, v)=>{
           fsApi.setFoodOrder(v);
        });
    });

    form.on('submit(load)', (data) => {
        fsApi.getFoodReservation({reservationId: data.field.flight}, (content, code) => {
            console.log(content);
            console.log(code);
        });
        return false;
    });
    //航班选择时获取航班的预订id号
    form.on('select(flightReservation)', data => curReservationId = data.value);
    //订餐确认点击事件
    form.render();
};

export {
    loadFoodServicesPage
}
