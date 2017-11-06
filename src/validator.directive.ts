import {DirectiveParamParser} from './param-parser'
import {Validator} from "./validator";
import Validators from "./validators";
import scopedEval from './util/scoped-eval'
import {isEmpty} from "./util/data";

export default {
    bind(el, { value, modifiers, expression }, { context, data }, oldVnode) {
        let paramParser = new DirectiveParamParser({modifiers, value, directives: data.directives});
        let validator = new Validator({context, rules: paramParser.rules, options: paramParser.options, vModelKey: paramParser.vModelKey});
        let $validator = Validators.getInstance(context._uid);
        $validator.setContext(context);
        $validator.addValidator({validator, options: paramParser.options, vModelKey: paramParser.vModelKey});
        context.$validator = $validator;
        console.log(context);
        let triggers = validator.getExistsTriggers();
        // triggers.map(trigger => {
        //     el.addEventListener(trigger, () => {
        //         let error = validator.check({modelValue: scopedEval(paramParser.vModelKey, context), trigger}).getError();
        //         if (isEmpty(error)) {
        //             console.log('OK');
        //         } else {
        //             console.error(error);
        //         }
        //     });
        // });
    }
}