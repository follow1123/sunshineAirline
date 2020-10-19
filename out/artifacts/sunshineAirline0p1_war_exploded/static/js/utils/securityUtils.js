/**
 * 按钮防抖
 * 该防抖方式使用setTimeout函数实现
 * 将需要的参数直接定义为window对象的属性类似全局变量
 * 使用setTimeout模拟线程延时监测对应数据的变化实现延时操作
 * 缺点：
 *  每次点击需要延时150毫秒执行，降低类效率
 *  因为window对象里面的属性全局都可以使用
 *  每个设置了防抖的按钮点击时会出现a，b按钮互相交替点击时两个按钮执行的事件互换
 *  多线程环境下不可用
 * @param event
 */
function antiShake(event) {
    // 设置全局变量
    if (!('shakeParam' in window)) {
        window.shakeParam = {
            // 需要执行的事件
            event: event,
            // 防抖是否可用
            available: true,
            // 点击次数
            clickTimes: 0,
            // 延时操作
            delay: () => {
                setTimeout(function () {
                    // 延时150毫秒后判断点击次数是否为一次
                        if (window.shakeParam.clickTimes <= 1) {
                        // 为一次则正常执行事件
                        window.shakeParam.event();
                        // 重置相应的变量
                        window.shakeParam.available = true;
                        window.shakeParam.event = null;
                    } else {
                        // 否则说明用户在多次点击
                        window.shakeParam.clickTimes--;
                        // 点击次数减一后继续进行延时直到用户停止点击
                        window.shakeParam.delay();
                    }
                }, 150);
            }
        }
    }
    if (!window.shakeParam.event) {
        // 对事件进行赋值保证延时到最后的事件内的数据始终为最后一次点击所获取的数据
        window.shakeParam.event = event;
    }
    // 点击次数加一
    window.shakeParam.clickTimes++;
    //判断当前防抖是否可用
    if (window.shakeParam.available) {
        // 进入后将防抖设为不可用
        window.shakeParam.available = false;
        // 开始延时
        window.shakeParam.delay();
    }
}

/**
 * 防抖
 * 解决了每次点击需要延时150毫秒执行
 * 其他问题一样
 * @param event
 */
function antiShake1(event) {
    if (!('shakeParam' in window)) {
        window.shakeParam = {
            event: event,
            available: true,
            clickTimes: 0,
            delay: () => {
                setTimeout(function () {
                    if (shakeParam.clickTimes > 1){
                        if(shakeParam.available) {
                            shakeParam.available = false;
                        }
                        shakeParam.clickTimes--;
                        shakeParam.delay();
                    }else {
                        if (!shakeParam.available) {
                            shakeParam.event();
                        }
                        shakeParam.available = true;
                        shakeParam.clickTimes = 0;
                    }
                }, 170);
            }
        }
    }
    shakeParam.event = event;
    shakeParam.clickTimes++;
    if (shakeParam.clickTimes === 1){
        event();
        shakeParam.delay();
    }
}

/**
 * 防抖
 * 使用匿名函数自执行方式节省window空间
 * @type {function(...[*]=)}
 */
let antiShake3 = (() => {
    let available = true,
        clickTimes = 0,
        event,
        delay = () => {
            setTimeout(() => {
                if (clickTimes > 1) {
                    if (available) {
                        available = false;
                    }
                    clickTimes--;
                    delay();
                } else {
                    if (!available) {
                        event();
                    }
                    available = true;
                    clickTimes = 0;
                }
            }, 170)
        };
    return (e) => {
        event = e;
        clickTimes++;
        if (clickTimes === 1) {
            event();
            delay();
        }
    }
})();
export {antiShake3, antiShake1};