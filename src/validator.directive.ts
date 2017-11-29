import {DirectiveParamParser} from './param-parser'
import {Validator} from "./validator";
import Validators from "./validators";
import ErrorTrigger from  './error-trigger'

export default {
    bind(el, bindings, vnode) {
        let { value, modifiers, expression } = bindings;
        let {context, data} = vnode;
        let paramParser = new DirectiveParamParser({modifiers, value, data});
        let validator = new Validator({
            targetEl: el,
            errorEl: el,
            context,
            rules: paramParser.rules,
            options: paramParser.options,
            vModelKey: paramParser.vModelKey
        });
        let $validator = Validators.getInstance(context._uid);
        $validator.setContext(context);
        $validator.addValidator({validator, options: paramParser.options, vModelKey: paramParser.vModelKey});
        context.$validator = $validator;

        // 触发校验
        el.errorTrigger = new ErrorTrigger({validator});
        el.errorTrigger.register();
    },
    update(el, bindings, vnode, oldVnode) {
        let oldModal = oldVnode.data.model || oldVnode.data.directives.filter(item => item.name === 'model')[0];
        let newModal = vnode.data.model || vnode.data.directives.filter(item => item.name === 'model')[0];
        if (oldModal.value !== newModal.value) {
            el.errorTrigger.triggerChange();
        }

    },
    unbind(el) {

    }
}