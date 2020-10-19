if (!('projectPath' in window)){
    window.projectPath = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
}
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
        $.post(url, data => {
            data = JSON.parse(data);
            func(data.content, data.code);
        });
    }, emptyToNull = obj => {
        $.each(obj, function (k, v) {
            obj[k] = (v && typeof v === 'string') ? ('' !== v.trim() ? v : null) : null;
        })
    }, paramParser = obj => {
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

export {post, emptyToNull, paramParser};