if (!('projectPath' in window)) {
    window.projectPath = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
}
/**
 * 封装post请求
 */
let post = function () {
        let url, func;
        $.each(arguments, (i, v) => {
            if (typeof v === 'object') {
                url = paramParser(v);
            } else if (typeof v === 'function') {
                func = v;
            } else if (typeof v === 'string') {
                url = projectPath + v;
            }
        });
        if (func) {
            $.post(url, data => {
                data = JSON.parse(data);
                func(data.content, data.code);
            });
        } else {
            $.post(url);
        }
    },
    /**
     * 异步发送请求
     */
    asyncPost = function () {
        $.post(getParam(arguments));
    },

    /**
     * 同步的发送请求并返回结果
     * @returns {*}
     */
    syncPost = function () {
        let data;
        let param = getParam(arguments, false);
        param.success = function (d) {
            data = d;
        };
        $.post(param);
        return data;
    },

    /**
     * 获取ajax请求的参数对象
     * @param args
     * @param async
     * @returns {{}}
     */
    getParam = function (args, async = true) {
        let obj = {};
        $.each(args, (i, v) => {
            if (typeof v === 'object') {
                obj.data = v;
            } else if (typeof v === 'function') {
                obj.success = v;
            } else if (typeof v === 'string') {
                obj.url = projectPath + v;
            }
        });
        obj.dataType = 'json';
        obj.async = async;
        return obj;
    },
    /**
     * 将参数对象里面非法的值清空里面
     * @param obj
     */
    emptyToNull = obj => {
        $.each(obj, function (k, v) {
            obj[k] = v ? (typeof v === 'string' && '' === v.trim() ? null : v) : null;
        })
    },
    /**
     * 将js对象里面的属性值解析为url请求格式
     * 例：
     *      {name:jack,age:18}
     *      解析为  ?name=jack&age=18
     * @param obj
     * @returns {string}
     */
    paramParser = obj => {
        emptyToNull(obj);
        let url = projectPath + obj.pathName + '?';
        obj.pathName = null;
        $.each(obj, function (k, v) {
            if (v) {
                url += `${k}=${v}&`;
            }
        });
        return url.substr(0, url.length - 1);
    }
;

export {post, emptyToNull, paramParser, asyncPost, syncPost};