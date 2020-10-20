// class TicketCla {
//     create(params) {
//         let data = params.data;
//         return e.build({
//             className: 'ticket-wrapper',
//             parent: params.parent,
//             onclick: function () {
//                 if (params.click) {
//                     params.click(this, data);
//                 }
//             },
//             child: l.buildLayout({
//                 layout: [5, 2, 5],
//                 content: [
//                     e.build({
//                         className: 'ticket-left',
//                         child: [
//                             e.build({
//                                 className: 'ticket-from',
//                                 innerText: data.from
//                             }),
//                             e.build({
//                                 className: 'ticket-start-time',
//                                 innerText: data.departureDate
//                             })
//                         ]
//                     }),
//                     e.build({
//                         className: 'ticket-mid',
//                         child: [
//                             e.build({
//                                 className: 'ticket-line',
//                                 innerText: '______'
//                             }),
//                             e.build({
//                                 className: 'ticket-inventory',
//                                 innerText: (data.first + data.economy + data.business) > 0 ? 'have' : 'no'
//                             })
//                         ]
//                     }),
//                     e.build({
//                         className: 'ticket-right',
//                         child: [
//                             e.build({
//                                 className: 'ticket-to',
//                                 innerText: data.to
//                             }),
//                             e.build({
//                                 className: 'ticket-price',
//                                 innerText: data.price
//                             })
//                         ]
//                     }),
//                 ],
//             })
//         });
//     }
// }
import {antiShake1 as shake} from "./securityUtils.js";

class TicketDetail {
    #transferData;
    #sid;
    #data;
    #parent;
    #detailWrapper;
    #layuiTab = $('<div class="layui-tab layui-tab-brief" style="margin: 0;"></div>');
    #layuiTabTitle = $('<ul class="layui-tab-title" style="margin: 0 8px"><li class="layui-this" data="firstTicket">First Ticket</li><li data="nextTicket">Next Ticket</li></ul>');
    #detailTemplate = {
        from: $('<div class="detail-from">---</div>'),
        to: $('<div class="detail-to">---</div>'),
        departureDate: $('<div class="detail-departure-date">---</div>'),
        arrivalDate: $('<div class="detail-arrival-date">---</div>'),
        flightNumber: $('<div class="detail-flight-number">---</div>'),
        cabinType: $('<div class="detail-cabin-type">---</div>'),
        flightType: $('<div class="detail-flight-type">---</div>'),
        totalTime: $('<div class="detail-total-time">---</div>'),
        availableTicket: $('<div class="detail-available-ticket">---</div>'),
        price: $('<div class="detail-price">---</div>')
    };

    #appendOne() {
        if (!this.#detailWrapper) {
            this.#detailWrapper = $('<div style="height: 90.8%"></div>');
            for (let v in this.#detailTemplate) {
                this.#detailWrapper.append(this.#detailTemplate[v]);
            }
        }
        this.#parent.append(this.#detailWrapper);
    }

    #appendRound() {
        this.#appendOne();
        this.#parent.append(this.#layuiTab
            .append(this.#detailWrapper)
            .append(this.#layuiTabTitle)
        );
    }

    get sId() {
        return this.#data.scheduleId;
    }

    #init(parent, data) {
        this.#parent = parent;
        this.#parent.html('');
        this.#sid = this.#getSid(data);
    }

    #getSid(data) {
        let sid;
        if ('scheduleId' in data) {
            sid = data.scheduleId;
        } else {
            sid = data.firstTicket.scheduleId + ' ' + data.nextTicket.scheduleId;
        }
        return sid;
    }

    equalData(data) {
        let sid = this.#getSid(data);
        return sid === this.#sid;
    }

    bindData(parent, data) {
        this.#init(parent, data);
        if (data.flightType === Ticket.ONE_WAY) {
            this.#data = data;
            this.#appendOne();
            this.#setOneWay();
        } else if (data.flightType === Ticket.ROUND_WAY) {
            this.#data = data.firstTicket;
            this.#transferData = data;
            this.#appendRound();
            this.#setRoundWay(data);
        }
    }

    #setOneWay() {
        let data = this.#data;
        for (let v in data) {
            if (v in this.#detailTemplate) {
                this.#detailTemplate[v].text(data[v]);
            }
        }
        this.#detailTemplate.cabinType.text('Economy');
        this.#detailTemplate.availableTicket.text(data.economy);
    }

    #changeData(thi, name) {
        thi.#data = thi.#transferData[name];
        thi.#setOneWay()
    }

    #setRoundWay() {
        this.#setOneWay();
        let ch = this.#changeData,
            thi = this;
        $('li[data]').click(function () {
            shake(() => {
                ch(thi, $(this).attr('data'));
            });
        });
    }

    #setCabinType(ct, spread) {
        this.#detailTemplate.cabinType.text(ct);
        this.#detailTemplate.availableTicket.text(this.#data[ct.toLowerCase()]);
        this.#detailTemplate.price.text((Number.parseFloat(this.#data.price) * spread));
    }

    click(td, t) {
        td.#setCabinType(t.val(), Number.parseFloat(t.attr('spread')));
    }
}

class Ticket {

    data;
    flag;
    click;
    ticket;
    parent;

    constructor() {
        this.#assignParams(arguments);
        this.ticket = $(this.getTicketTemplate()).click(() => {
            this.click(this.ticket, this.data);
        }).appendTo(this.parent);
    }

    #assignParams(params) {
        for (let v of params) {
            if (this.#is$(v)) {
                this.parent = v;
            } else if (typeof v === 'object') {
                this.data = this.#dataParse(v);
            } else if (typeof v === 'function') {
                this.click = v;
            } else if (typeof v === 'string') {
                this.flag = v;
            }
        }
    }

    getTicketTemplate() {
        if (Ticket.ONE_WAY === this.flag) {
            return this.#oneWayTicketTemplate();
        } else if (Ticket.ROUND_WAY === this.flag) {
            return this.#roundWayTicketTemplate();
        }
    }

    #oneWayTicketTemplate() {
        let data = this.data;
        return `
            <div class="ticket-wrapper">
                <l-layout layout="5-2-5">
                    <div class="ticket-left">
                        <div class="ticket-from">${data.from}</div>
                        <div class="ticket-start-time">${data.departureDate}</div>
                    </div>
                    <div class="ticket-mid">
                        <div class="ticket-line">______</div>
                        <div class="ticket-inventory">${(data.first + data.economy + data.business) > 0 ? (data.first + data.economy + data.business) : 'no'}</div>
                    </div>
                    <div class="ticket-right">
                        <div class="ticket-to">${data.to}</div>
                        <div class="ticket-price">${data.price}</div>
                    </div>
                </l-layout>
            </div>`;
    }

    #roundWayTicketTemplate() {
        let firstData = this.data.firstTicket;
        let nextData = this.data.nextTicket;
        return `
        <div class="ticket-wrapper">
            <l-layout layout="5-2-5">
                    <div class="ticket-left">
                        <div class="ticket-from">${firstData.from}</div>
                        <div class="ticket-start-time">${firstData.departureDate}</div>
                    </div>
                    <div class="ticket-mid">
                        <div class="ticket-line">______</div>
                        <div class="ticket-inventory">${(firstData.first + firstData.economy + firstData.business) > 0 ? (firstData.first + firstData.economy + firstData.business) : 'no'}</div>
                    </div>
                    <div class="ticket-right">
                        <div class="ticket-to">${firstData.to}</div>
                        <div class="ticket-price">${firstData.price}</div>
                    </div>
                </l-layout>
                <div class="ticket-transfer-info">${this.data.transferInfo}</div>
                <l-layout layout="5-2-5">
                    <div class="ticket-left">
                        <div class="ticket-from">${nextData.from}</div>
                        <div class="ticket-start-time">${nextData.departureDate}</div>
                    </div>
                    <div class="ticket-mid">
                        <div class="ticket-line">______</div>
                        <div class="ticket-inventory">${(nextData.first + nextData.economy + nextData.business) > 0 ? (nextData.first + nextData.economy + nextData.business) : 'no'}</div>
                    </div>
                    <div class="ticket-right">
                        <div class="ticket-to">${nextData.to}</div>
                        <div class="ticket-price">${nextData.price}</div>
                    </div>
                </l-layout>
        </div>
        `
    }

    #is$(ele) {
        return ele[0] && ele[0] instanceof HTMLElement;
    }

    #dataParse(data) {
        if (this.flag === Ticket.ONE_WAY) {
            return this.#oneWayDateParse(data);
        } else if (this.flag === Ticket.ROUND_WAY) {
            return this.#roundWayDataParse(data);
        }
    }

    #oneWayDateParse(data) {
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
            flightType: this.flag
        }
    }

    #roundWayDataParse(data) {
        let finalData = {
            firstTicket: this.#oneWayDateParse(data.firstTicket),
            nextTicket: this.#oneWayDateParse(data.nextTicket)
        };
        let transferTime =
            Date.parse(finalData.nextTicket.departureDate) -
            Date.parse(finalData.firstTicket.arrivalDate);
        finalData.transferInfo = this.#getDate(transferTime) +
            ' Transfer in ' + finalData.firstTicket.to;
        finalData.flightType = Ticket.ROUND_WAY;
        return finalData;
    }

    #getDate() {
        if (arguments.length === 1) {
            return new Date(Date.parse('2020-01-01 00:00:00') + arguments[0]).format('HH\h mm') + 'm';
        } else if (arguments.length === 2) {
            return new Date(Date.parse(arguments[0]) + arguments[1]).format('yyyy-MM-dd HH:mm:ss')
        }
    }

}

class Food {
    #pathName = './static/img/food/';
    #data;
    #parent;
    #click;

    get data() {
        return this.#data;
    }

    constructor() {
        this.#assignParams(arguments);
        this.#data.img = this.#pathName + this.#data.img;
        let data = this.#data;
        this.#parent.append($(`<div class="food-content-wrapper">
                        <div class="food-img-wrapper">
                            <img title="${data.description}" src="${data.img}" class="food-img">
                        </div>
                        <div class="food-info">
                            <div class="food-name">${data.name}</div>
                            <div class="food-price">${data.price}</div>
                            <i class="layui-icon layui-icon-cart-simple food-buy"></i>
                        </div>
                    </div>`).click(() => this.#click(this.#data)));
    }

    #assignParams(params) {
        for (let v of params) {
            if (this.#is$(v)) {
                this.#parent = v;
            } else if (typeof v === 'object') {
                this.#data = v;
            } else if (typeof v === 'function') {
                this.#click = v;
            }
        }
    }

    #is$(ele) {
        if (ele[0]) {
            return ele[0] instanceof HTMLElement;
        }
    }
}

export {
    Ticket, TicketDetail, Food
}