import {antiShake} from "./utils.js";

/**
 * 机票模板
 */
class Ticket {
    //该控件
    #ticketElement;
    //该控件内的数据
    #data;
    #ticketDetail;

    constructor(flightType, data, clickEvent, ticketDetail) {
        this.#ticketDetail = ticketDetail;
        let ticketTemplate;
        if ('None Stop' === flightType) {
            this.#data = this.#parseOneWay(data);
            ticketTemplate = this.#oneWayTicketTemplate();
        } else if ('One Stop' === flightType) {
            this.#data = this.#parseRoundWay(data);
            ticketTemplate = this.#roundWayTicketTemplate();
        }
        this.#data.flightType = flightType;
        let ticket = this;
        this.#ticketElement = $(ticketTemplate).click(() => {
            antiShake(() => {
                clickEvent(ticket, this.#data)
            });
            this.#ticketDetail.bindTicket(this.#data);
        });
    }

    /**
     * 获取票的通用模板
     * @param ticket
     * @returns {string}
     */
    #getTicketTemplate(ticket) {
        return `
        <div class="layui-row">
            <div class="layui-col-md5">
                <div class="ticket-from">${ticket.from}</div>
                <div class="ticket-start-time">${ticket.departureDate}</div>
            </div>
            <div class="layui-col-md2">
                <div class="ticket-line">______</div>
                <div class="ticket-inventory">${(ticket.first + ticket.economy + ticket.business) > 0 ? (ticket.first + ticket.economy + ticket.business) : 'no'}</div>
            </div>
            <div class="layui-col-md5">
                <div class="ticket-to">${ticket.to}</div>
                <div class="ticket-price">${ticket.price}</div>
            </div>
        </div>
        `
    }

    /**
     * 获取单程票的模板
     * @returns {string}
     */
    #oneWayTicketTemplate() {
        return `
            <div class="ticket-wrapper">
                ${this.#getTicketTemplate(this.#data)}
            </div>`;
    }

    /**
     * 获取多程票模板
     * @returns {string}
     */
    #roundWayTicketTemplate() {
        return `
        <div class="ticket-wrapper">
            ${this.#getTicketTemplate(this.#data.firstTicket)}
            <div class="ticket-transfer-info">${this.#data.transferInfo}</div>
            ${this.#getTicketTemplate(this.#data.nextTicket)}
        </div>
        `
    }

    /**
     * 解析数据为单程票的数据
     * @param data
     * @returns {{business: *, totalTime: (string|undefined), economy: *, flightType, arrivalDate: (string|undefined), flightNumber: *, price: *, from: *, to: Document.to, departureDate: string, flightTime: *, first: *, scheduleId: *}}
     */
    #parseOneWay(data) {
        return {
            from: data.from,
            to: data.to,
            departureDate: data.departureDate + ' ' + data.depTime.split('.')[0],
            arrivalDate: this.#getDate(data.departureDate + ' ' + data.depTime, data.flightTime * 60 * 1000),
            flightTime: data.flightTime,
            totalTime: this.#getDate(data.flightTime * 60 * 1000),
            first: data.cabinType[2],
            economy: data.cabinType[0],
            business: data.cabinType[1],
            price: data.price,
            flightNumber: data.flightTime,
            scheduleId: data.scheduleId,
        }
    }

    /**
     * 解析数据为多程票的数据
     * @param data
     * @returns {{firstTicket: {business: *, totalTime: (string|undefined), economy: *, flightType, arrivalDate: (string|undefined), flightNumber: *, price: *, from: *, to: Document.to, departureDate: string, flightTime: *, first: *, scheduleId: *}, nextTicket: {business: *, totalTime: (string|undefined), economy: *, flightType, arrivalDate: (string|undefined), flightNumber: *, price: *, from: *, to: Document.to, departureDate: string, flightTime: *, first: *, scheduleId: *}}}
     */
    #parseRoundWay(data) {
        let finalData = {
            firstTicket: this.#parseOneWay(data.firstTicket),
            nextTicket: this.#parseOneWay(data.nextTicket)
        };
        let transferTime =
            Date.parse(finalData.nextTicket.departureDate) -
            Date.parse(finalData.firstTicket.arrivalDate);
        finalData.transferInfo = this.#getDate(transferTime) +
            ' Transfer in ' + finalData.firstTicket.to;
        return finalData;
    }

    /**
     * 设置该控件为选中状态
     */
    selected() {
        this.#ticketElement.css('background-color', '#5FB878');
    }

    /**
     * 设置该控件为未选中状态
     */
    unselected() {
        this.#ticketElement.css('background-color', '#1E9FFF');
    }

    /**
     * 将日期转换成固定的格式
     * @returns {string|void|*}
     */
    #getDate() {
        if (arguments.length === 1) {
            return new Date(Date.parse('2020-01-01 00:00:00') + arguments[0]).format('HH\h mm') + 'm';
        } else if (arguments.length === 2) {
            return new Date(Date.parse(arguments[0]) + arguments[1]).format('yyyy-MM-dd HH:mm:ss')
        }
    }

    /**
     * 将该控件添加到夫容器内
     * @param parent
     */
    appendTo(parent) {
        this.#ticketElement.appendTo(parent);
    }
}

/**
 * 机票详情模板
 */
class TicketDetail {

    //ticket detail显示区域
    #ticketDetailElement;
    //显示区域的html元素
    #detailData;
    //夫标签
    #parent;
    //多程票tab
    #roundWayTab;
    //ticket detail显示区域是否存在多程票tab
    #haveTab;
    //cabinType切换按钮
    #cabinTypeSwitch;
    //layuiform表单工具
    #form;
    //当前显示区域所显示的数据
    #data;

    constructor(parent) {
        this.#parent = parent;
        this.#ticketDetailElement = $(this.#getDetailTemplate());
        this.#roundWayTab = this.#getRoundWayTab();
        this.#haveTab = false;
    }

    /**
     * 显示该控件
     */
    show() {
        this.#parent.html('');
        this.#parent.append(this.#ticketDetailElement);
        this.#detailData = this.#getDetailDataElement();
    }

    /**
     * 重置控件内的布局
     */
    reset() {
        this.#resetDetailData();
        this.#removeTab();
    }

    /**
     * 添加tab元素
     */
    #putTab() {
        if (!this.#haveTab) {
            this.#parent.append(this.#roundWayTab);
            this.#haveTab = true;
        }
    }

    /**
     * 移除tab元素
     */
    #removeTab() {
        if (this.#haveTab) {
            this.#parent.children().last().remove();
            this.#haveTab = false;
        }
    }

    /**
     * 关联一个ticket，并显示该ticket的具体信息
     * @param data
     */
    bindTicket(data) {
        if ('None Stop' === data.flightType) {
            this.#removeTab();
            this.#setData(data);
        } else if ('One Stop' === data.flightType) {
            this.#putTab();
            this.#setData(data.firstTicket);
            this.#tabClick(data);
        }
        this.#resetCabinTypeSwitch();
    }

    /**
     * 判断当前ticket detail的显示区域是否显示数据
     * @returns {*}
     */
    haveData() {
        return this.#data;
    }

    /**
     * 设置票内的信息
     * @param data
     */
    #setData(data) {
        this.#data = data;
        $.each(this.#detailData, (k, v) => {
            if (k in data) {
                v.text(data[k]);
            }
        });
        this.#detailData.cabinType.text('Economy');
        this.#detailData.avaTickets.text(data.economy);
    }

    /**
     * 重置ticket detail内的信息
     */
    #resetDetailData() {
        $.each(this.#detailData, (k, v) => {
            v.text('---');
        })
    }

    /**
     * 获取票的模板
     * @returns {string}
     */
    #getDetailTemplate() {
        return `
        <div id="detail-wrapper">
            <div class="detail-from">---</div>
            <div class="detail-to">---</div>
            <div class="detail-departure-date">---</div>
            <div class="detail-arrival-date">---</div>
            <div class="detail-flight-number">---</div>
            <div class="detail-cabin-type">---</div>
            <div class="detail-flight-type">---</div>
            <div class="detail-total-time">---</div>
            <div class="detail-available-ticket">---</div>
            <div class="detail-price">---</div>
        </div>
        `
    }

    /**
     * 获取票的全部信息的对象
     * @returns {{avaTickets: (*|jQuery|HTMLElement), totalTime: (*|jQuery|HTMLElement), price: (*|jQuery|HTMLElement), from: (*|jQuery|HTMLElement), to: (*|jQuery|HTMLElement), departureDate: (*|jQuery|HTMLElement), flightType: (*|jQuery|HTMLElement), cabinType: (*|jQuery|HTMLElement), arrivalDate: (*|jQuery|HTMLElement), flightNumber: (*|jQuery|HTMLElement)}}
     */
    #getDetailDataElement() {
        return {
            from: $('#detail-wrapper div.detail-from'),
            to: $('#detail-wrapper div.detail-to'),
            departureDate: $('#detail-wrapper div.detail-departure-date'),
            arrivalDate: $('#detail-wrapper div.detail-arrival-date'),
            flightNumber: $('#detail-wrapper div.detail-flight-number'),
            cabinType: $('#detail-wrapper div.detail-cabin-type'),
            flightType: $('#detail-wrapper div.detail-flight-type'),
            totalTime: $('#detail-wrapper div.detail-total-time'),
            avaTickets: $('#detail-wrapper div.detail-available-ticket'),
            price: $('#detail-wrapper div.detail-price')
        };
    }

    /**
     * 获取多程票的tab元素
     * @returns {*|jQuery|HTMLElement}
     */
    #getRoundWayTab() {
        return $(`
            <div class="layui-tab layui-tab-brief" style="margin-top: 50px;">
                <ul class="layui-tab-title" style="margin: 0 8px">
                    <li class="layui-this" data="firstTicket">First Ticket</li>
                    <li data="nextTicket">Next Ticket</li>
                </ul>
            </div>
        `);
    }

    /**
     * 设置多程票的选票按钮的点击事件
     * @param data
     */
    #tabClick(data) {
        $('li[data]').click((e) => {
            antiShake(() => {
                this.#setData((this.#data = data[$(e.currentTarget).attr('data')]));
                this.#resetCabinTypeSwitch();
            });
        })
    }

    /**
     * 绑定cabinType按钮实现点击切换cabinType等功能
     * @param form
     * @param cabinTypeSwitch
     */
    bindCabinType(form, cabinTypeSwitch) {
        this.#cabinTypeSwitch = cabinTypeSwitch;
        this.#form = form;
        form.on('radio(cabinType)', data => {
            antiShake(() => {
                if (this.haveData()) {
                    this.#detailData.cabinType.text(data.value);
                    this.#detailData.avaTickets.text(this.#data[data.value.toLowerCase()]);
                    this.#detailData.price.text((this.#data.price * Number.parseFloat($(data.elem).attr('spread'))));
                }
            });
        })
    }

    /**
     * 重置cabinType选项的状态
     */
    #resetCabinTypeSwitch() {
        this.#cabinTypeSwitch.prop('checked', true);
        this.#form.render('radio');
    }
}

/**
 * 食物模板
 */
class Food {
    //食物图片存放的根目录
    #rootPath = './static/img/food/';
    #foodElement;
    constructor(data) {
        data.img = this.#rootPath + data.img;
        this.#foodElement = $(this.#getFoodTemplate(data));
    }

    /**
     * 将当前元素添加到父标签
     * @param parent
     */
    appendTo(parent){
        this.#foodElement.appendTo(parent);
    }

    /**
     * 根据数据生成食物模板
     * @param data
     * @returns {string}
     */
    #getFoodTemplate(data){
        return`
        <div class="food-content-wrapper">
            <div class="food-img-wrapper">
                <img title="${data.description}" src="${data.img}" class="food-img">
            </div>
            <div class="food-info">
                <div class="food-name">${data.name}</div>
                <div class="food-price">${data.price}</div>
                <i class="layui-icon layui-icon-cart-simple food-buy layui-anim layui-anim-scaleSpring"
                anim="layui-anim-scaleSpring"></i>
            </div>
        </div>
        `;
    }

}
export {Ticket, TicketDetail, Food}