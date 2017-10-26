import { inBrowser } from './util/dom'
import validatorDirective from './validator.directive'

export default class Validator {
    static install (Vue) {
        Vue.directive('validator', validatorDirective)
    }
}

if (inBrowser && (<any>window).Vue) {
    (<any>window).Vue.use(Validator)
}