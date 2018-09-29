import {DirectiveParamParser} from './param-parser'
import {Validator} from "./validator";
import Validators from "./validators";
import ErrorTrigger from  './error-trigger'
import {uuid} from './util/data'

export default {
    bind(el, bindings, vnode) {
        let { value, modifiers } = bindings;
        let {context, data, componentInstance} = vnode;
        let paramParser = new DirectiveParamParser({modifiers, value, data, el});
        let validator = new Validator({
            targetEl: el,
            errorEl: el,
            context,
            componentInstance,
            vnode,
            rules: paramParser.rules,
            options: paramParser.options,
            vModelKey: paramParser.vModelKey
        });
        let $validator = Validators.getInstance(context._uid);
        $validator.setContext(context);
        $validator.addValidator({validator, options: paramParser.options, vModelKey: paramParser.vModelKey});
        context.$validator = $validator;
        data.$validator = validator;

        // 触发校验
        el.errorTrigger = new ErrorTrigger({validator});
        el.errorTrigger.register();

        // 钩子之间共享validator对象
        let validatorUUid = uuid();
        el.setAttribute('data-validator-uuid', validatorUUid);
        context.$validatorTmp = context.$validatorTmp || {};
        context.$validatorTmp[validatorUUid] = validator;
    },
    update(el, bindings, vnode, oldVnode) {
        let { value, modifiers } = bindings;
        let {data, context} = vnode;

        let oldModal = oldVnode.data.directives.filter(item => item.name === 'model')[0] || oldVnode.data.model;
        let newModal = vnode.data.directives.filter(item => item.name === 'model')[0] || vnode.data.model;

        let paramParser = new DirectiveParamParser({modifiers, value, data, el});

        // 更新validator对象
        let validator = context.$validatorTmp[el.getAttribute('data-validator-uuid')];
        validator.refresh({
            rules: paramParser.rules,
            options: paramParser.options,
            context: vnode.context,
            vnode
        });

        if (oldModal.value !== newModal.value) {
            el.errorTrigger.triggerChange();
        }

    },
    unbind(el, bindings, vnode) {
        let validator = vnode.context.$validatorTmp[el.getAttribute('data-validator-uuid')];
        validator.clearError();
        vnode.context.$validator.removeValidator({validator});
    }
}