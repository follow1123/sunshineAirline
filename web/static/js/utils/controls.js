import {antiShake} from "./utils.js";

/**
 * 基础控件定义控件通用的方法
 */
class BaseControl {
    element;

    /**
     * 将当前元素添加到父标签
     * @param parent
     */
    appendTo(parent) {
        this.element.appendTo(parent);
    }
}

/**
 * 机票模板
 */
class Ticket extends BaseControl {
    //该控件
    #ticketElement;
    //该控件内的数据
    #data;
    #ticketDetail;

    constructor(flightType, data, clickEvent, ticketDetail) {
        super();
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
        this.element = $(ticketTemplate).click(() => {
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
        this.element.css('background-color', '#5FB878');
    }

    /**
     * 设置该控件为未选中状态
     */
    unselected() {
        this.element.css('background-color', '#1E9FFF');
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
}

/**
 * 机票详情模板
 */
class TicketDetail extends BaseControl {

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
        super();
        this.#parent = parent;
        this.element = $(this.#getDetailTemplate());
        this.#roundWayTab = this.#getRoundWayTab();
        this.#haveTab = false;
    }

    /**
     * 显示该控件
     */
    show() {
        this.#parent.html('');
        this.appendTo(this.#parent);
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
class Food extends BaseControl {
    //食物图片存放的根目录
    #rootPath = './static/img/food/';
    #data;
    //食物总计区域的操作器
    #infoOperator;

    constructor(data) {
        super();
        this.#data = data;
        data.img = this.#rootPath + data.img;
        this.element = $(this.#getFoodTemplate(data));
    }

    /**
     * 绑定食物总计区域的操作器
     * @param totalInfo
     * @returns {Food}
     */
    bindInfoOperator(totalInfo) {
        this.#infoOperator = totalInfo;
        return this;
    }

    /**
     * 根据数据生成食物模板
     * @param data
     * @returns {string}
     */
    #getFoodTemplate(data) {
        return `
        <div class="food-content-wrapper" food-id="${data.foodId}">
            <div class="food-img-wrapper">
                <img title="${data.description}" src="${data.img}" class="food-img">
            </div>
            <div class="food-info">
                <div class="food-name" title="${data.name}">${data.name}</div>
                <div class="food-price">${data.price}</div>
                <i class="layui-icon layui-icon-cart-simple food-buy layui-anim layui-anim-scaleSpring"
                anim="layui-anim-scaleSpring"></i>
            </div>
        </div>
        `;
    }

    appendTo(parent) {
        super.appendTo(parent);
        this.#setEvent(this.#data);
    }

    /**
     * 设置元素内的事件
     * @param data
     */
    #setEvent(data) {
        //设置购买按钮点击时的动画和点击事件
        $(`.food-content-wrapper[food-id="${data.foodId}"] .food-buy`).mousedown(function () {
            $(this).removeClass($(this).attr('anim'));
        }).mouseup(function () {
            $(this).addClass($(this).attr('anim'));
        }).click(() => {
            let childClass = `.food-choose[food-id="${data.foodId}"]`,
                foodChooseContainer = $('#food-choose-container')
            ;
            //点击时添加一个foodChoose控件到对应区域
            if (!foodChooseContainer.children(childClass).length) {
                new FoodChoose(data).bindInfoOperator(this.#infoOperator).appendTo(foodChooseContainer);
            }
            $(`${childClass} button[ope="1"]`).click();
        });
    }
}

/**
 * 选择的食物模板
 */
class FoodChoose extends BaseControl {
    #data;
    //食物总计区域的操作器
    #infoOperator;

    constructor(data) {
        super();
        this.#data = data;
        this.element = $(this.#getFoodSelectedTemplate(data));
    }

    /**
     * 绑定食物总计区域的操作器
     * @param totalInfo
     * @returns {FoodChoose}
     */
    bindInfoOperator(totalInfo) {
        this.#infoOperator = totalInfo;
        return this;
    }

    appendTo(parent) {
        super.appendTo(parent);
        this.#setEvent(this.#data);
    }

    /**
     * 获取被选择的食物模板
     * @param data
     * @returns {string}
     */
    #getFoodSelectedTemplate(data) {
        return `
        <div class="layui-row layui-anim layui-anim-fadein food-choose" food-id="${data.foodId}">
            <div class="layui-col-md4 food-img-wrapper-choose">
                <img class="food-img-choose" src="${data.img}" title="${data.description}">
            </div>      
            <div class="layui-col-md8 food-info-choose">
            <div class="food-name-wrapper-choose layui-input-inline">
                <div class="food-name-choose" title="${data.name}">${data.name}</div>
            </div>
                <div amount anim="layui-anim-upbit" class="food-amount-choose layui-anim layui-anim-upbit">0</div>
                <div class="food-operating">
                    <div class="food-price-choose" price="${data.price}">${data.price}</div>
                    <div class="food-operating-btn">
                        <button type="button" delete class="layui-btn layui-btn-primary layui-btn-xs">
                            <i class="layui-icon">&#xe640;</i>
                        </button>
                        <div class="layui-btn-group">
                            <button type="button" ope="-1" class="layui-btn layui-btn-primary layui-btn-xs">
                                <i class="layui-icon">&#xe67e;</i>
                            </button>
                            <button style="color: #009E94" type="button" amount
                                    class="layui-btn layui-btn-primary layui-btn-xs  layui-btn-disabled">0
                            </button>
                            <button type="button" ope="1" class="layui-btn layui-btn-primary layui-btn-xs">
                                <i class="layui-icon">&#xe654;</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    /**
     * 设置被选择的食物模板内各个按钮的点击事件
     * @param data
     */
    #setEvent(data) {
        //获取需要操作的元素
        let parentClass = `.food-choose[food-id="${data.foodId}"]`,
            btnAmount = $(`${parentClass} button[amount]`),
            divAmount = $(`${parentClass} div[amount]`),
            divPrice = $(`${parentClass} div[price]`),
            btnDelete = $(`${parentClass} button[delete]`);

        //删除按钮点击事件
        btnDelete.click(e => {
            $(e.currentTarget).parents(parentClass).remove();
            this.#infoOperator.removeItem(data.foodId);
            console.log(this.#infoOperator.foodOrder);
        });
        //添加、减去按钮点击事件
        $(`${parentClass} button[ope]`).click(e => {
            let th = $(e.currentTarget),
                curAmount = Number.parseInt(btnAmount.text()),
                num = Number.parseInt(th.attr('ope')),
                price = Number.parseFloat(divPrice.attr('price')),
                amount = curAmount + num
            ;
            if (amount < 1) {
                return;
            }
            this.#infoOperator.addItem(data.foodId, num, (price * num));
            btnAmount.text(amount);
            divAmount.text(amount);
            divPrice.text(price * amount);
            console.log(this.#infoOperator.foodOrder);
        });
        //设置添加数量时的动画
        $(`${parentClass} button[ope="1"]`).mousedown(() =>
            divAmount.removeClass(divAmount.attr('anim'))
        ).mouseup(() =>
            divAmount.addClass(divAmount.attr('anim'))
        );
    }
}

/**
 * 食物总计区域操作器对象
 */
class TotalInfoOperator {
    #spanItem = $('#total-info .total-item');
    #spanAmount = $('#total-info .total-amount');
    #spanPrice = $('#total-info .total-price');
    #foodOrder;

    constructor() {
        this.#foodOrder = new Map();
        this.foodOrder.set('total', {item: 0, amount: 0, price: 0});
    }

    get foodOrder() {
        return this.#foodOrder;
    }

    #toInt(param) {
        if (typeof param === 'string') {
            return Number.parseInt(param);
        }
        return param
    }

    #toFloat(param) {
        if (typeof param === 'string') {
            return Number.parseFloat(param);
        }
        return param
    }

    /**
     * 设置食物总计区域的值
     * @param total
     */
    #setValue(total) {
        this.#spanAmount.text(total.amount);
        this.#spanPrice.text(total.price);
        this.#spanItem.text(total.item);
    }

    /**
     * 对食物订单里面的数据进行修改
     * @param id
     * @param amount
     * @param price
     */
    addItem(id, amount, price) {
        let food, total = this.#foodOrder.get('total');
        amount = this.#toInt(amount);
        price = this.#toFloat(price);
        if ((food = this.#foodOrder.get(id))) {
            food.amount += amount;
            food.price += price;
        } else {
            this.#foodOrder.set(id, {foodId: id, amount: amount, price: price});
            total.item += 1;
        }
        total.amount += amount;
        total.price += price;
        this.#setValue(total);
    }

    /**
     * 移除一个已选择的食物
     * @param id
     */
    removeItem(id) {
        let food = this.#foodOrder.get(id)
            , total = this.#foodOrder.get('total');
        console.log(food);
        total.amount -= food.amount;
        total.price -= food.price;
        total.item -= 1;
        this.#setValue(total);
        this.#foodOrder.delete(id);
    }

}


export {Ticket, TicketDetail, Food, FoodChoose, TotalInfoOperator}