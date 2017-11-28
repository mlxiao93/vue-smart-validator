import {DirectiveParamParser} from './param-parser'
import {Validator} from "./validator";
import Validators from "./validators";
import ErrorTrigger from  './error-trigger'

export default {
    bind(el, { value, modifiers, expression }, { context, data }) {
        let paramParser = new DirectiveParamParser({modifiers, value, directives: data.directives});
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
        let oldModalVal = oldVnode.data.directives.filter(item => item.name === 'model')[0].value;
        let newModalVal = vnode.data.directives.filter(item => item.name === 'model')[0].value;
        if (oldModalVal !== newModalVal) {
            el.errorTrigger.triggerChange();
        }

    },
    unbind(el) {

    }
}