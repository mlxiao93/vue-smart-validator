import { DirectiveParamParser } from './param-parser'
import { Rule } from "./rule";
import { Validator } from "./validator";

export default {
    bind (el, { arg, modifiers, expression }, { context }, oldVnode) {
        let paramParser = new DirectiveParamParser({ modifiers, expression, context });
        let validator = new Validator({ rules: paramParser.rules, options: paramParser.options });
        el.addEventListener('blur', () => {
            let message = Rule.rules.required({value: el.value});
            if (message) {
                console.error(message)
            } else {
                console.log('OK');
            }
        })
    }
}