import rules from './rules'
import { isEmpty } from './util/data'
import { DirectiveParamParser } from './param-parser'

export default {
    bind (el, { arg, modifiers, expression }, { context }, oldVnode) {
        let paramParser = new DirectiveParamParser({ modifiers, expression, context });
        console.log(paramParser.options);
        console.log(paramParser.rules);
        el.addEventListener('blur', () => {
            let message = rules.required({value: el.value});
            if (message) {
                console.error(message)
            } else {
                console.log('OK');
            }
        })
    }
}