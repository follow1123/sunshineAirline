import {fsmApi} from "../../api/administrator/flightScheduleManagement-api.js";
import {LayuiUtils} from "../../utils/layuiUtils.js";
import {StorageUtils} from "../../utils/utils.js";
import {TicketSalesDetail} from "../../utils/controls.js";

export let loadFlightScheduleManagementPage = (form, layDate, table) => {

    let
        fu = LayuiUtils.getFormUtil(form),
        selFrom = $('#p1-from'),
        selTo = $('#p1-to'),
        swap = $('#swap'),
        inpDate = $('#p1-datePicker'),
        btnKey = $('#btnKey'),
        btnSearch = $('#p1-search'),
        aDetail,
        btnCOC,
        cityNames,
        IATACode,
        preTR,
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
                        cityNames = data;
                    }
                });
                fsmApi.getIATACode((data, code) => {
                    if (code === 200) {
                        StorageUtils.put('IATACode', data);
                        IATACode = data;
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
            {field: 'status', title: 'Status', unresize: true, align: 'center',},
            {
                title: 'Detail',
                unresize: true,
                align: 'center',
                templet: d => `<a class="layui-table-link" detail sch="${d.scheduleId}">Detail</a>`
            }
        ]],
        skin: 'line',
        method: 'post',
        title: 'Flight Status',
        height: 530,
        toolbar: `<div><button type="button" id="coc" schId class="layui-btn layui-btn-sm layui-btn-disabled">Change Status</button></div>`,
        defaultToolbar: ['filter', 'print', 'exports'],
        page: true,
        done: () => {
            btnCOC = $('#coc').click(function () {
                //表格初始化完成执行的操作
                fsmApi.setStatus({
                        scheduleId: $(this).attr('schId'),
                        status: `${$(this).text()}ed`
                    },
                    (data, code) => {
                        if (code === 200) {
                            layer.msg('Successfully modified!');
                            btnSearch.click();
                        } else {
                            layer.msg('modified fail!');
                        }
                    }
                )
            });
            $('a[detail]').click(function () {
                let id = $(this).attr('sch');
                fsmApi.getSeats(id, (data1) => {
                    fsmApi.getScheduleInfo(id, (data2) => {
                        layer.open({
                            title: 'Ticket Sales Detail',
                            type: 1,
                            area: ['80%', "90%"],
                            content: new TicketSalesDetail(data1.content, data2.content).getTemplate()
                        })
                    })
                });
            });
        }
    });
    //交换两个输入框内的值
    swap.click(() => {
        let temp = selFrom.val();
        selFrom.val(selTo.val());
        selTo.val(temp);
        form.render('select');
    });
    //表格的每行点击事件
    table.on('row(p1-flightScheduleInfo)', obj => {
        btnCOC.removeClass('layui-btn-disabled');
        btnCOC.text(obj.data.status === 'Confirmed' ? 'Cancel' : 'Confirm');
        btnCOC.attr('schId', obj.data.scheduleId);
        if (preTR) {
            preTR.css('background-color', 'white');
        }
        preTR = $(obj.tr).css('background-color', '#e2e2e2');
    });
    //搜索按钮点击事件
    fu.onSubmit('p1-search', data => {
        fsmApi.getFlightSchedule(data.field, (data, code) => {
            table.reload('p1-flightScheduleInfo', {data: data});
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