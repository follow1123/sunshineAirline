import {loginApi} from "../api/login-api.js";
import {LayuiUtils} from "../utils/layuiUtils.js";

$(function () {
    layui.use('form', form => {
        let fu = LayuiUtils.getFormUtil(form);
        form.verify({
            email: function (value) {
                if (value == null || '' === value) {
                    return '用户名不能为空！';
                }
            },
            password: function (value) {
                if (value == null || '' === value) {
                    return '密码不能为空！';
                }
            }
        });
        fu.onSubmit('login', data=>{
            loginApi.login(data.field, function (content, code) {
                if (code === 404) {
                    layer.msg('用户名或密码错误！');
                }
                if (content) {
                    layer.msg('登录成功！');
                }
            });
        }, true);
    });
});
