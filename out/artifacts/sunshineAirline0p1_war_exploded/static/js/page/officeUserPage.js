import {
    loadSearchFlightPage,
    onSearchFlightPageSwitched
} from "./searchFlight-new.js";
import {WindowUtils} from "../utils/utils.js";
import {onFoodServicesPageSwitched} from "./foodServices-new.js";

"use strict";

/**
 *格式化日期
 * @param fmt
 * @returns {void | string | *}
 * @constructor
 */
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
//窗口加载事件
$(() => {
    //初始化页面记录对象方便存入每个页面的临时信息
    window.pageRecord = {};
    //页面公共容器
    let contentBody = $('#content-body'),
        //当前页面标识
        curPage = 'searchFlight',
        //各个页面的模板
        pageTemplates = {
            searchFlight: $('#searchFlight').text(),
            foodServices: $('#foodServices').text()
        },

        switchedEvents = {
            searchFlight: onSearchFlightPageSwitched,
            foodServices: onFoodServicesPageSwitched
        },
        foodServicesPageInit = form => form.render(),
        //切换页面里面的模板元素
        switchPage = (page, event) => {
            contentBody.html(pageTemplates[page]);
            if (event) event();
        }
    ;
    //使用layui的相应工具
    layui.use(['element', 'laydate', 'form'], (ele, laydate, form) => {
        //切换的航班查询页面
        switchPage('searchFlight', () => loadSearchFlightPage(form, laydate));
        //导航栏切换事件
        ele.on('nav(head)', data => {
            switchedEvents[curPage]();
            //判断当前导航栏的模板id是否和当前显示的模板一样
            let page = data.attr('page');
            if (curPage === page) return;
            curPage = page;
            //根据当前导航栏的模板id显示对应页面，并执行对应页面的初始化事件
            switch (page) {
                case'searchFlight':
                    switchPage(page, () => loadSearchFlightPage(form, laydate));
                    break;
                case'foodServices':
                    switchPage(page, () => foodServicesPageInit(form));
                    break;
            }
        });

    });
    //注册窗口关闭事件
    WindowUtils.registerUnload();
});