import {searchFlightApi as sfApi} from "../api/searchFilght-api.js";
import {formUtils} from "../utils/layuiUtils.js";
import {antiShake3 as shake} from "../utils/securityUtils.js";
import {TicketDetail, Ticket} from "../utils/controls.js";


Date.prototype.format = function (fmt) { //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
$(function () {
    //layui form对象
    let form,
        //
        preTicket,

        ticketDetail = new TicketDetail(),

        datePicker = $('#datePicker'),

        ticketContainer = $('#tickets'),

        fromSelect = $('#from'),

        toSelect = $('#to'),

        ticketDetailContainer = $('#ticket-detail'),

        radioReset = function () {
            $('input[spread="1"]').prop('checked', true);
        },

        switchColor = function (t) {
            if (preTicket) {
                preTicket.css('background-color', '#1E9FFF')
            }
            t.css('background-color', '#5FB878');
            preTicket = t;
        },

        clearPage = function () {
            ticketContainer.html('');
            ticketDetailContainer.html('');
        },

        radioDisable = function (disable) {
            for (let v of $('input[spread]')) {
                $(v).prop('disabled', disable);
            }
            if (disable) {
                radioReset();
            }
            form.render('radio');
        },

        switchDate = function () {
            shake(() => {
                let num = Number.parseInt($(this).attr('day')),
                    date = datePicker.val();
                if (date && '' !== date) {
                    datePicker.val(new Date(Date.parse(date) + num).format('yyyy-MM-dd'));
                    $('#search').click();
                }
            });
        },
        createTicket = function (flag, data) {
            new Ticket(flag, ticketContainer, data, (t, d) => {
                shake(() => {
                    if (ticketDetail.equalData(data)) {
                        return;
                    }
                    radioReset();
                    ticketDetail.bindData(ticketDetailContainer, d);
                    radioDisable(false);
                    switchColor(t);
                });
            })
        },
        appendCityName = function () {
            let arg = arguments;
            sfApi.getCityName((content, code) => {
                if (200 !== code){
                    return;
                }
                $.each(arg, (i, select)=> {
                    $.each(content, (i, v)=>{
                        select.append($(`<option value="${v}">${v}</option>`));
                    })
                });
                form.render('select');
            });
        }
    ;

    $('input[day]').click(switchDate);
    formUtils.use(function (f, u) {
        form = f;

        appendCityName(fromSelect, toSelect);

        u.filter('cabinType', (data) =>
            shake(() =>
                ticketDetail.click(ticketDetail, $(data.elem))));
        /**
         * 拦截搜索按钮执行相应的事件
         */
        u.filter('search', data => {
            let field = data.field;
            try {
                shake(() => {
                    //出发城市和到达城市不能同时为空
                    if ('' === field.from && '' === field.to) {
                        layer.msg('please select a city!');
                        return;
                    }
                    //日期为空则默认查询当前的日期
                    if ('' === field.date) {
                        datePicker.val(field.date = new Date().format('yyyy-MM-dd'));
                    }
                    sfApi.searchTicket(field, (content, code) => {
                        clearPage();
                        if (404 === code) {
                            layer.msg('No ticket for this voyage！');
                            return;
                        } else if (500 === code) {
                            layer.msg('Server Exception!');
                            return;
                        }
                        console.log(content);
                        radioDisable(true);
                        for (let flag in content) {
                            for (let tic of content[flag]) {
                                createTicket(flag, tic);
                            }
                        }
                    })
                });
            }catch (e) {
                console.log(e.message);
            }finally {

            return false;
            }
        });

        u.filter('buyTicket', data => {
            data.field.scheduleId = ticketDetail.sId;
            console.log(data);
            return false;
        });
    });

    // layui.use('form', function (innerForm) {
    //     form = innerForm;
    //     f = formUtils.init(form);
    //     f.filter('cabinType', (data) =>
    //             shake(() =>
    //             ticketDetail.click(ticketDetail, $(data.elem))));
    //     /**
    //      * 拦截搜索按钮执行相应的事件
    //      */
    //     f.filter('search', data => {
    //         let field = data.field;
    //         shake(() => {
    //             //出发城市和到达城市不能同时为空
    //             if ('' === field.from && '' === field.to) {
    //                 layer.msg('please select a city!');
    //                 return;
    //             }
    //             //日期为空则默认查询当前的日期
    //             if ('' === field.date) {
    //                 datePicker.val(field.date = new Date().format('yyyy-MM-dd'));
    //             }
    //             sfApi.searchTicket(field.from, field.to, field.date, (content, code) => {
    //                 clearPage();
    //                 if (404 === code) {
    //                     layer.msg('No ticket for this voyage！');
    //                     return;
    //                 } else if (500 === code) {
    //                     layer.msg('Server Exception!');
    //                     return;
    //                 }
    //                 radioDisable(true);
    //                 for (let flag in content) {
    //                     for (let tic of content[flag]) {
    //                         createTicket(flag, tic);
    //                     }
    //                 }
    //             })
    //         });
    //
    //         return false;
    //     });
    //     f.filter('buyTicket', data => {
    //         data.field.scheduleId = ticketDetail.sId;
    //         console.log(data);
    //         return false;
    //     });
    //     innerForm.render();
    // });
});
