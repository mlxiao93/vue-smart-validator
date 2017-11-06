import validatorDirective from './validator.directive'
import {Rule} from "./rule";
import {Validator} from "./validator";
import Validators from "./validators";

export default class Index {
    install(Vue) {
        Vue.mixin({
            beforeCreate() {
                this.$validator = Validators.getInstance('default');
            }
        });
        Vue.directive('validator', validatorDirective)
    };
    constructor({ rules, defaultTrigger }:{rules?: Object, defaultTrigger?: string} = {}) {
        Rule.extendRules(rules);
        if (defaultTrigger) Validator.defaultTrigger = defaultTrigger;
    };
}