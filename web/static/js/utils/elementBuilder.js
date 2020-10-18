class ElementBuilder {
    static #element;
    static #metadata_parent = null;
    static #metadata_child = [];

    //
    // /**
    //  * 将中划线命名方式转换为驼峰命名方式
    //  * @param prop
    //  * @returns {string}
    //  */
    // static #lineToHump(prop) {
    //     let split = prop.split('-');
    //     for (let i = 1; i < split.length; i++) {
    //         split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1, split[i].length);
    //     }
    //     return split.join('');
    // }
    //
    // /**
    //  * 将css字符串转换为properties对象的属性
    //  * @param style
    //  * @returns {{}}
    //  */
    // static #cssToProp(prop, style) {
    //     let split = style.split(';');
    //     split.pop();
    //     for (let i of split) {
    //         let declare = i.split(':');
    //         prop[this.#lineToHump(declare[0].trim())] = declare[1].trim();
    //     }
    // }
    /**
     * 重置元属性
     */
    static #clear() {
        this.#element = null;
        this.#metadata_parent = null;
        this.#metadata_child = [];
    }
    /**
     * 验证参数并初始化
     */
    static #verificationAndInit(params) {
        if (!params) {
            throw 'no parameter';
        }
        if (params.name && typeof params.name !== 'string') {
            throw 'name must be string!';
        }
        this.#element =
            document.createElement(!params.name ? 'div' : params.name);
        params.name = null;
        if (params.parent) {
            if (!(params.parent instanceof HTMLElement)) {
                throw 'parent must be a htmlElement!';
            } else {
                this.#metadata_parent = params.parent;
                params.parent = null;
            }
        }
        if (params.child) {
            if (params.child instanceof Array && params.child.length > 0) {
                for (let i = 0, j = 0; i < params.child.length; i++) {
                    if (!(params.child[i] instanceof HTMLElement)) {
                        throw 'childNode must be a htmlElement!';
                    } else {
                        this.#metadata_child[j++] = params.child[i];
                    }
                }
            }else if (params.child instanceof HTMLElement) {
                this.#metadata_child[0] = params.child;
            }
            params.child = null;
        }
        if (params.style) {
            let curStyle = params.style;
            params.style = null;
            switch (typeof curStyle) {
                case "string":
                    // this.#cssToProp(params, curStyle);
                    this.#element.style = curStyle;
                    break;
                case "object":
                    params = Object.assign(params, curStyle);
                    break;
                default:
                    throw 'style must be string or object!';
            }
        }
        if (params.props) {
            if (typeof params.props !== 'object') {
                throw 'props must be object!';
            } else {
                let curProp = params.props;
                params.props = null;
                params = Object.assign(params, curProp);
            }
        }
    }

    /**
     * 创建一个标签
     * @param params
     * @returns {*}
     */
    static build(params) {
        this.#clear();
        this.#verificationAndInit(params);
        this.#assort(params);
        this.#attachParent();
        this.#appendChildNodes();
        return this.#element;
    }

    /**
     * 添加子标签
     */
    static #appendChildNodes() {
        if (this.#metadata_child.length > 0) {
            for (let child of this.#metadata_child) {
                this.#element.appendChild(child);
            }
        }
    }

    /**
     * 依附到父标签
     */
    static #attachParent() {
        if (this.#metadata_parent && 'appendChild' in this.#metadata_parent) {
            this.#metadata_parent.appendChild(this.#element);
        }
    }

    /**
     * 将属性和style分别赋值给已创建好的标签
     * @param params
     */
    static #assort(params) {
        for (let pName in params) {
            if (params[pName]) {
                if (pName in this.#element) {
                    this.#element[pName] = params[pName];
                }
                if (pName in this.#element.style) {
                    this.#element.style[pName] = params[pName];
                }
            }
        }
    }
}

var e = ElementBuilder;