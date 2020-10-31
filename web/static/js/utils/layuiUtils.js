import {antiShake} from "./utils.js";

class LayuiUtils {
    static #formUtil;

    static getFormUtil(form) {
        if (!this.#formUtil) {
            this.#formUtil = new FormUtil(form);
        }
        return this.#formUtil;
    }
}

class FormUtil {
    #form;

    constructor(form) {
        this.#form = form;
    }

    onSubmit(filter, event, btnAntiShake) {
        this.#form.on(`submit(${filter})`, data => {
            try {
                if (btnAntiShake) {
                    antiShake(() => {
                        event(data);
                    })
                } else {
                    event(data);
                }
            } catch (e) {
                console.error(e.message);
            } finally {
                return false;
            }
        });
    }
}

export {LayuiUtils}