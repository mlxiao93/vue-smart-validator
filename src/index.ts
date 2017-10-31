import validatorDirective from './validator.directive'
import {Rule} from "./rule";

export default class Validator {
    install = function (Vue) {
        Vue.directive('validator', validatorDirective)
    };
    constructor({ rules, defaultTrigger }:{rules?: Object, defaultTrigger?: string} = {}) {
        Rule.extendRules(rules);
    }
}