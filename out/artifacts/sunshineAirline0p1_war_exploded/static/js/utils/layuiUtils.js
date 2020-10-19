// class LayuiUtils {
//     #ver(params){
//         if (params.layout.length !== params.content.length){
//             throw 'parameter asymmetry!';
//         }
//         for (let c of params.content){
//             if (!(c instanceof HTMLElement)){
//                 throw 'child must be html element!';
//             }
//         }
//         if (params.layout instanceof Array) {
//             let sum = 0;
//             for (let i in params.layout) {
//                 sum += params.layout[i];
//             }
//             if (sum > 12) {
//                 throw 'max is 12!';
//             }
//         }else {
//             throw 'layout must be array!';
//         }
//     }
//     buildLayout(params){
//         this.#ver(params);
//         let childs = [];
//         for (let i in params.layout) {
//             childs.push(e.build({
//                 className: 'layui-col-md'+ params.layout[i],
//                 child: params.content[i]
//             }));
//         }
//         return e.build({
//             className: 'layui-row',
//             child: childs,
//             parent: params.parent
//         })
//     }
// }
// var l = new LayuiUtils();
class FormUtils {
    #form;
    init(form){
        this.#form = form;
    }
    use(event){
        let util = this;
        layui.use('form', function (form) {
            util.init(form);
            event(form,  util);
            form.render();
        });

    }
    #getInputType(name, filter){
        return $(`input[${filter}="${name}"]`).prop('type');
    }
    filter(name,event, filter = 'lay-filter'){
        this.#form.on(`${this.#getInputType(name, filter)}(${name})`, function (data) {
            return event(data);
        });
    }
}

let formUtils = new FormUtils();

export {formUtils}























