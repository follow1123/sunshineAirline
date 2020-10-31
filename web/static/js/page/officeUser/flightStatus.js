import {flightStatusApi as fstApi} from "../../api/officeUser/flightStatus-api.js";
import {LayuiUtils} from "../../utils/layuiUtils.js";
import {StorageUtils} from "../../utils/utils.js";

let loadFlightStatusPage = (form, table, layDate) => {
    console.log('flight status 页面加载');
    let
        fu = LayuiUtils.getFormUtil(form),
        inpDate = $('#p3-datePicker'),
        btnSearch = $('#p3-search'),
        /**
         * 当前页面初始化
         */
        pageInit = () => {
            //渲染日期选择框
            layDate.render({
                elem: '#p3-datePicker',
                lang: 'en'
            });
            //初始化表格
            table.init('statusInfo', {
                cols: [[
                    {field: 'flightNumber', title: 'Flight Number', sort: true, unresize: true, align: 'center'},
                    {field: 'from', title: 'From', unresize: true, align: 'center'},
                    {field: 'to', title: 'To', unresize: true, align: 'center'},
                    {field: 'scheduleStart', title: 'Schedule Start', unresize: true, align: 'center'},
                    {field: 'scheduleArrival', title: 'Schedule Arrival', unresize: true, align: 'center'},
                    {field: 'actualArrival', title: 'Actual Arrival', unresize: true, align: 'center'},
                    {field: 'gate', title: 'Gate', unresize: true, align: 'center'},
                    {field: 'status', title: 'Status', unresize: true, align: 'center'},
                ]],
                skin: 'line',
                title: 'Flight Status',
                height: 530,
                toolbar: true,
                defaultToolbar: ['filter', 'print', 'exports'],
                page: true,
            });
        },
        parseStatus = (num, prefix) => {
            if (num === 0) {
                return 'On Time';
            }
            let str;
            if (num < 0) {
                return parseStatus(num * -1, 'Delay');
            }
            if (num <= 60) {
                str = `${num} minutes`;
            } else if (num <= 60 * 24) {
                str = `${Math.floor(num / 60)} hours`;
            } else {
                str = `${Math.floor(num / (60 * 24))} day`;
            }
            if (prefix) {
                return `${prefix} ${str}`;
            } else {
                return `Early ${str}`;
            }
        }
    ;
    pageInit();
    //当前表单提交事件
    fu.onSubmit('p3-search', data => {
        fstApi.getFlightStatus(data.field, (data, code) => {
            for (let i = 0; i < data.length; i++) {
                data[i].status = parseStatus(data[i].status);
            }
            table.reload('statusInfo', {data: data})
        });
        pageRecord.flightStatusRecord.date = data.field.date;
    }, true);
    //初始化当前页面记录的对象
    if (!(pageRecord.flightStatusRecord = StorageUtils.get('flightStatus'))) {
        pageRecord.flightStatusRecord = {};
    } else {
        inpDate.val(pageRecord.flightStatusRecord.date);
        btnSearch.click();
    }
};

export {
    loadFlightStatusPage
}