import {fsmApi} from "../../api/administrator/flightScheduleManagement-api.js";
import {LayuiUtils} from "../../utils/layuiUtils.js";
import {StorageUtils} from "../../utils/utils.js";

export let loadFlightScheduleManagementPage = (form, layDate, table) => {

    let
        fu = LayuiUtils.getFormUtil(form),
        selFrom = $('#p1-from'),
        selTo = $('#p1-to'),
        swap = $('#swap'),
        inpDate = $('#p1-datePicker'),
        btnKey = $('#btnKey'),
        btnSearch = $('#p1-search'),
        cityNames,
        IATACode,
        /**
         * 页面恢复
         * @param value
         */
        reducingRecord = (value) => {
            if ('City' === value.key) {
                btnKey.click();
            }
            selFrom.val(value.from);
            selTo.val(value.to);
            inpDate.val(value.date);
            form.render();
            btnSearch.click();
        },
        /**
         * 设置下拉框内的值
         * @param value
         */
        setSelectValue = (value) => {
            selFrom.html('<option value="">From</option>');
            selTo.html('<option value="">To</option>');
            if (value) {
                $.each(value, (i, v) => {
                    selFrom.append($(`<option value="${v}">${v}</option>`));
                    selTo.append($(`<option value="${v}">${v}</option>`));
                });
            }
            form.render('select');
        },
        /**
         * 页面初始化操作
         */
        pageInit = () => {

            if ((cityNames = StorageUtils.get('cityName'))) {
                setSelectValue(cityNames);
                IATACode = StorageUtils.get('IATACode');
            } else {
                fsmApi.getCityName((data, code) => {
                    if (code === 200) {
                        setSelectValue(data);
                        StorageUtils.put('cityName', data);
                    }
                });
                fsmApi.getIATACode((data, code) => {
                    if (code === 200) {
                        StorageUtils.put('IATACode', data);
                    }
                });
            }


            layDate.render({
                elem: '#p1-datePicker',
                lang: 'en'
            });

            form.render();

        }
    ;

    //页面初始化
    pageInit();
    btnKey.click(function () {
        let t = $(this).children('span'),
            temp = t.text();
        t.text(t.attr('key'));
        t.attr('key', temp);
        if (temp === 'City') {
            setSelectValue(IATACode);
            selFrom.prop('name', 'aFrom');
            selTo.prop('name', 'aTo');
        } else {
            setSelectValue(cityNames);
            selFrom.prop('name', 'cFrom');
            selTo.prop('name', 'cTo');
        }
    });
    //初始化表格
    table.init('p1-flightScheduleInfo', {
        cols: [[
            {field: 'date', title: 'Date', unresize: true, align: 'center'},
            {field: 'time', title: 'Time', unresize: true, align: 'center'},
            {field: 'from', title: 'From', unresize: true, align: 'center'},
            {field: 'to', title: 'To', unresize: true, align: 'center'},
            {field: 'aircraft', title: 'Aircraft', unresize: true, align: 'center'},
            {field: 'economyPrice', title: 'Economy Price', unresize: true, align: 'center'},
            {field: 'flightNumber', title: 'Flight  Number', unresize: true, align: 'center'},
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
    //交换两个输入框内的值
    swap.click(() => {
        let temp = selFrom.val();
        selFrom.val(selTo.val());
        selTo.val(temp);
        form.render('select');
    });
    //搜索按钮点击事件
    fu.onSubmit('p1-search', data => {
        fsmApi.getFlightSchedule(data.field, (data, code) => {
            table.reload('p1-flightScheduleInfo', {data: data})
        });
        pageRecord.flightScheduleManagementRecord.searchOptions = {
            from: data.field[selFrom.prop('name')],
            to: data.field[selTo.prop('name')],
            date: data.field.date,
            key: btnKey.children('span').attr('key')
        };
    }, true);
    //判断是否需要缓存数据
    if (!(pageRecord.flightScheduleManagementRecord = StorageUtils.get('flightScheduleManagement'))) {
        pageRecord.flightScheduleManagementRecord = {};
    } else {
        reducingRecord(pageRecord.flightScheduleManagementRecord.searchOptions);
    }


};