/**
 * 浏览器本地存储工具
 */
class WindowLocalStorageUtils {
    /**
     * 添加一个键值对，value根据情况转换为字符串
     * @param key
     * @param value
     */
    static put(key, value) {
        if (!key || !value || $.isEmptyObject(value)){
            return;
        }
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(key, value);
    }

    /**
     * 根据键获取值，默认取出转换为对象
     * @param key
     * @returns {any}
     */
    static get(key) {
        return JSON.parse(window.localStorage.getItem(key));
    }

    /**
     * 根据键取出值， 直接取出
     * @param key
     * @returns {string}
     */
    static getString(key) {
        return window.localStorage.getItem(key);
    }

    /**
     * 根据键移除值
     * @param key
     */
    static remove(key) {
        window.localStorage.removeItem(key);
    }

    /**
     * 清空所有本地数据
     */
    static clear(){
        window.localStorage.clear();
    }
}

class WindowUtils {
    /**
     * 将一个事件添加到窗口关闭事件内
     * @param e
     * @param priority 优先级：0最大表示该事件第一个执行，以此类推
     */
    static addUnloadEvent(e, priority) {
        if (typeof e !== "function") {
            return;
        }
        if ('unloadEvents' in window) {
            if (priority !== undefined) {
                WindowUtils.insert(window.unloadEvents, priority, e);
            } else {
                window.unloadEvents.push(e);
            }
        } else {
            window.unloadEvents = [e];
        }
    }

    /**
     * 将一个值根据下标插入到数组对应的位置2
     * @param arr
     * @param index
     * @param value
     */
    static insert = (arr, index, value) => {
        if (!arr[index]) {
            arr[index] = value;
        } else {
            for (let i = arr.length - 1; i > index - 1; i--) {
                arr[i + 1] = arr[i];
            }
            arr[index] = value;
        }
    };

    /**
     * 注册window的beforeunload事件将添加的事件全部执行
     */
    static registerUnload() {
        if (!('unloadEvents' in window) || !window.unloadEvents || window.unloadEvents.length === 0) {
            return;
        }
        $(window).bind('beforeunload', () => {
            $(window.unloadEvents).each((i, v) => {
                if (v)v();
            });
        })
    }
}

/**
 * 防抖
 * 使用匿名函数自执行方式节省window空间
 * @type {function(...[*]=)}
 */
let antiShake = (() => {
    //当前防抖函数是否为可用状态
    let available = true,
        //当前事件的点击次数
        clickTimes = 0,
        //当前事件
        event,
        //延时函数
        delay = () => {
            //延时170毫秒
            setTimeout(() => {
                //判断当前点击次数是超过一次
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
export {
    WindowLocalStorageUtils as StorageUtils,
    WindowUtils,
    antiShake
}