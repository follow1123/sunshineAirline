
/**
 * 自定义标签父类
 *  拥有部分通用工具
 */
class BaseElement extends HTMLElement {
    constructor() {
        super();
    }

    transferAttributes(t, attributes) {
        for (let v of attributes) {
            t.attr(v.name, v.value);
        }
    }

    removeAttributes(t, ...attributes) {
        for (let v of attributes) {
            t.removeAttr(v);
        }
    }

    clear(t, child) {
        if (child) {
            t.after(child);
        }
        t.remove();
    }
}

/**
 * 自定义初始化
 *  初始化自定义标签创建时所需要的值
 */
class CusInitElement extends BaseElement {
    constructor() {
        super();
        let t = $(this),
            path;
        if ((path = t.attr('path'))) {
            if ('projectPath' in window) {
                throw 'Parameter name conflict, name \'projectPath\' is already used'
            } else {
                window.projectPath = window.location.origin + path;
            }
        }else{
            throw 'init failed!';
        }
        this.clear(t);
    }
}

/**
 * 自定义布局
 *  可以根据layout属性内的值分配相应的布局
 */
class CusLayoutElement extends BaseElement {
    constructor() {
        super();
        let t = $(this),
            layRow = $('<div class="layui-row"></div>'),
            layout;
        if ((layout = t.attr('layout'))) {
            let curSize = layout.split('-');
            if (this.#verLayout(curSize)) {
                layout = [];
                for (let v of curSize) {
                    layout.push($(`<div class="layui-col-md${v}"></div>`))
                }
            }
        }
        let children = t.children();
        for (let i = 0; i < layout.length; i++) {
            $(children[i]).appendTo(layout[i]);
            layRow.append(layout[i]);
        }

        this.removeAttributes(t, 'layout');
        this.transferAttributes(layRow, this.attributes);
        this.clear(t, layRow);
    }

    #verLayout = function(curSize) {
        let size = 0;
        for (let v of curSize) {
            size += Number.parseInt(v);
        }
        return size <= 12;
    }
}

/**
 * 自定义表单
 *  默认使用layui基础表单的样式
 *  该表单默认使用post方式提交到当前页面
 *  因为生成该表单时需要将该标签下的所有子元素用一个class为layui-input-inline/block标签包裹
 *  所以更改这些标签需在自定义表单标签上添加属性格式为`子标签下标>style语句`多个语句使用逗号分隔
 *  orientation属性
 *      值为"hor" 表单内的所有标签水平显示
 *      值为"ver" 表单内的所有标签水垂直显示
 *      就是class layui-input-inline、layui-input-block的使用
 *  例：
 *      <l-form orientation="hor" innerStyle="0 1>margin-left:5px,2>background-color:red; border:solid 1px">
 *          <div id="c1"></div>
 *          <div id="c2"></div>
 *          <div id="c3"></div>
 *      </l-form>
 *      最终生成：
 *      <form class="layui-form" action="#" method="post">
 *          <div class="layui-input-inline" style="margin-left:5px">
 *              <div id="c1"></div>
 *          </div>
 *          <div class="layui-input-inline" style="margin-left:5px">
 *              <div id="c2"></div>
 *          </div>
 *          <div class="layui-input-inline" style="background-color:red; border:solid 1px">
 *              <div id="c3"></div>
 *          </div>
 *      </form>
 */
class CusFormElement extends BaseElement {
    styleReg = /([0-9 ]+)>([a-z-: ;0-9]+)/g;

    constructor() {
        super();
        let t = $(this),
            form = $('<form class="layui-form" action="#" method="post"></form>'),
            orientation,
            eleClass;
        let innerStyle = t.attr('innerStyle');
        let styleSheet = this.styleParser(innerStyle);
        let child = t.children();
        if ((orientation = t.attr('orientation'))) {
            if ('hor' === orientation) {
                eleClass = 'layui-input-inline';
            } else if ('ver' === orientation) {
                eleClass = 'layui-input-block';
            }
        }

        for (let i = 0; i < child.length; i++) {
            form.append($(`<div class="${eleClass}" ${styleSheet[i] ? 'style=' + styleSheet[i] : ''}></div>`).append(child[i]));
        }
        this.removeAttributes(t, 'orientation', 'innerStyle');
        this.transferAttributes(form, this.attributes);
        this.clear(t, form);
    }

    styleParser(style) {
        let styleSheet = [], match;
        while ((match = this.styleReg.exec(style))) {
            if (match[1].length > 1) {
                let ind = match[1].split(' ');
                for (let v of ind) {
                    styleSheet[v] = match[2];
                }
            } else {
                styleSheet[Number.parseInt(match[1])] = match[2];
            }
        }
        return styleSheet;
    }
}

/**
 * 自定义日期下拉框
 *  默认生成layui下拉框样式
 */
class CusDatePickerElement extends BaseElement {
    constructor() {
        super();
        let t = $(this),
            datePicker = $(`<input type="text">`),
            id;
        id = t.attr('id');
        this.transferAttributes(datePicker, this.attributes);
        this.clear(t, datePicker);
        layui.use('laydate', () => {
            layui.laydate.render({elem: '#' + id, lang: 'en'})
        });
    }

}

customElements.define('l-init', CusInitElement);
customElements.define('l-layout', CusLayoutElement);
customElements.define('l-form', CusFormElement);
customElements.define('l-datepicker', CusDatePickerElement);
