import {loginApi} from "../api/login-api.js";

$(function () {
    layui.use('form', form => {
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
        form.on('submit(login)', data => {
            try {
                loginApi.login(data.field, function (content, code) {
                    if (code === 404) {
                        layer.msg('用户名或密码错误！');
                    }
                    if (content) {
                        layer.msg('登录成功！');
                    }
                });
            } catch (e) {
                console.log(e.message);
            } finally {
                return false;
            }


        });
    });
});
