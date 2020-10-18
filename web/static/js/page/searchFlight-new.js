import {searchFlightApi as sfApi} from "../api/searchFilght-api.js";
import {Ticket, TicketDetail} from "../utils/controls-new.js";
import {
    StorageUtils,
    WindowUtils,
    antiShake as shake
} from "../utils/utils.js";

"use strict";
let loadSearchFlightPage = (form, layDate) => {


    //cityName储存到本地的key标识
    let cityNameKey = 'cityName',
        //cityName值
        cityNames,
        //存储城市信息的下拉框
        sel = $('select[city]'),
        //日期选择框
        datePicker = $('#datePicker'),
        //机票容器
        ticketContainer = $('#tickets'),
        //机票详情容器
        ticketDetail = new TicketDetail($('#ticket-detail')),
        //上一次点击的票
        preTicket,
        /**
         * 清空页面上的所有数据
         */
        clearPage = function () {
            ticketContainer.html('');
        },
        /**
         * 渲染页面加载时需要渲染的控件
         */
        pageRender = () => {
            layDate.render({
                elem: '#datePicker',
                lang: 'en'
            });
            form.render();
        },
        /**
         * 设置城市下拉框的值
         * @param values
         */
        valueForSelect = (values) => {
            $.each(values, (i, valve) => {
                sel.each((i, v) => {
                    $(v).append($(`<option value="${valve}">${valve}</option>`));
                });
            });
            form.render('select');
        }
    ;
    //添加一个窗口关闭时执行的事件
    WindowUtils.addUnloadEvent(() => {
        //将本地储存的cityName信息移除
        StorageUtils.remove(cityNameKey);
    });
    //判断本地储存里面有没有cityName的信息
    if ((cityNames = StorageUtils.get(cityNameKey))) {
        //直接设置
        valueForSelect(cityNames);
    } else {
        //访问后台查询到cityName数据并设置
        sfApi.getCityName((content, code) => {
            valueForSelect(content);
            //将查询到的cityName信息储存到本地，避免频繁访问后台数据库照成资源浪费
            StorageUtils.put(cityNameKey, content);
        });
    }
    cityNames = null;
    //渲染layui元素
    pageRender();
    ticketDetail.show();


    //使用layui的form工具拦截表单对应lay-filter id的submit按钮
    form.on('submit(search)', data => {
        //获取表单类的各个input框的数据
        let field = data.field;
        try {
            //将所要执行的事件添加防抖
            shake(() => {
                if ('' === field.from && '' === field.to) {
                    layer.msg('please select a city!');
                    return;
                }
                //日期为空则默认查询当前的日期
                if ('' === field.date) {
                    datePicker.val(field.date = new Date().format('yyyy-MM-dd'));
                }
                //后台查询对应信息
                sfApi.searchTicket(field, (content, code) => {
                    //清空tickets显示区域的所有信息
                    clearPage();
                    if (404 === code) {
                        layer.msg('No ticket for this voyage！');
                        return;
                    }
                    if (500 === code) {
                        layer.msg('Server Exception!');
                        return;
                    }
                    ticketDetail.reset();
                    //遍历查询到的数据并创建ticket对象添加到ticket显示区域
                    for (let flightType in content) {
                        for (let tic of content[flightType]) {
                            //创建Ticket对象并设置ticket的点击事件
                            new Ticket(flightType, tic, (ticket, data) => {
                                if (preTicket) {
                                    //将之前选择的ticket设置为未选中状态
                                    preTicket.unselected();
                                }
                                //设置当前ticket为选中状态
                                ticket.selected();
                                preTicket = ticket;
                            }, ticketDetail).appendTo(ticketContainer);
                        }
                    }
                })
            });
        } catch (e) {
            console.log(e);
        } finally {
            //始终阻止表单跳转
            return false;
        }
    });
};

export {loadSearchFlightPage}